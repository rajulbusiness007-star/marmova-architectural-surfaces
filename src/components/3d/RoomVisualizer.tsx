/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { TILE_PRODUCTS, ROOM_PRESETS } from '../../data/products';
import { TileProduct, RoomPreset, RoomPresetId } from '../../types';
import {
  RotateCcw,
  Camera,
  Layers,
  Sparkles,
  Maximize2,
  Share2,
  Check,
  ChevronRight,
  Eye,
  Sliders,
  Compass,
} from 'lucide-react';

interface RoomVisualizerProps {
  initialTileId?: string;
  onOpenRfq?: (product: TileProduct, notes: string) => void;
  onSendWhatsApp?: (product: TileProduct, notes: string) => void;
}

export const RoomVisualizer: React.FC<RoomVisualizerProps> = ({
  initialTileId,
  onOpenRfq,
  onSendWhatsApp,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const floorMeshRef = useRef<THREE.Mesh | null>(null);
  const backWallMeshRef = useRef<THREE.Mesh | null>(null);
  const leftWallMeshRef = useRef<THREE.Mesh | null>(null);
  const rightWallMeshRef = useRef<THREE.Mesh | null>(null);
  const furnitureGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // User Interactive Settings
  const [activePresetId, setActivePresetId] = useState<RoomPresetId>('living-room');
  const [selectedFloorTileId, setSelectedFloorTileId] = useState<string>(
    initialTileId || 'marmova-statuario-imperial'
  );
  const [selectedWallTileId, setSelectedWallTileId] = useState<string>('marmova-nero-marquina-gold');
  const [targetSurface, setTargetSurface] = useState<'floor' | 'walls'>('floor');
  const [groutColor, setGroutColor] = useState<string>('#333842');
  const [groutSpacingMm, setGroutSpacingMm] = useState<number>(2);
  const [tileOrientation, setTileOrientation] = useState<'straight' | 'diagonal' | 'offset'>('straight');
  const [lightingPreset, setLightingPreset] = useState<'daylight' | 'evening-luxury' | 'gallery-spot'>('evening-luxury');
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);
  const [activeViewMode, setActiveViewMode] = useState<'3d' | 'comparison'>('3d');

  // Mouse interaction state for orbital camera
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAnglesRef = useRef<{ theta: number; phi: number; radius: number }>({
    theta: 0,
    phi: Math.PI / 4,
    radius: 7.5,
  });

  const activeFloorProduct = useMemo(
    () => TILE_PRODUCTS.find((p) => p.id === selectedFloorTileId) || TILE_PRODUCTS[0],
    [selectedFloorTileId]
  );

  const activeWallProduct = useMemo(
    () => TILE_PRODUCTS.find((p) => p.id === selectedWallTileId) || TILE_PRODUCTS[1],
    [selectedWallTileId]
  );

  const activePreset = useMemo(
    () => ROOM_PRESETS.find((r) => r.id === activePresetId) || ROOM_PRESETS[0],
    [activePresetId]
  );

  // Update initial tile if prop changes
  useEffect(() => {
    if (initialTileId) {
      setSelectedFloorTileId(initialTileId);
    }
  }, [initialTileId]);

  /**
   * Generates a procedural tile texture with realistic grain/veining, bump, and grout borders.
   */
  const createTileTexture = useCallback(
    (product: TileProduct, groutHex: string, groutMm: number, orientation: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Base background color of tile
      ctx.fillStyle = product.colorHex;
      ctx.fillRect(0, 0, 1024, 1024);

      // Tile dimensions ratio
      const aspect = product.lengthMm / (product.widthMm || 600);
      const cols = aspect > 2 ? 2 : aspect > 1.4 ? 2 : 3;
      const rows = aspect > 2 ? 6 : aspect > 1.4 ? 4 : 3;
      const cellW = 1024 / cols;
      const cellH = 1024 / rows;
      const groutPx = Math.max(2, Math.round((groutMm / 3) * 6));

      // Draw each individual tile with subtle shading & pattern
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let x = c * cellW;
          let y = r * cellH;

          // Offset / brick-bond shifting
          if (orientation === 'offset' && r % 2 === 1) {
            x += cellW * 0.5;
            if (x >= 1024) x -= 1024;
          }

          const tileInnerW = cellW - groutPx;
          const tileInnerH = cellH - groutPx;

          // Subtle gradient on each tile to simulate natural depth
          const grad = ctx.createLinearGradient(x, y, x + tileInnerW, y + tileInnerH);
          grad.addColorStop(0, product.colorHex);
          grad.addColorStop(1, product.colorHex);
          ctx.fillStyle = grad;
          ctx.fillRect(x, y, tileInnerW, tileInnerH);

          // Tile pattern details
          ctx.save();
          ctx.beginPath();
          ctx.rect(x, y, tileInnerW, tileInnerH);
          ctx.clip();

          if (product.texturePattern === 'marble-vein') {
            // Elegant marble vein curves
            ctx.strokeStyle = product.accentVeinColor;
            ctx.lineWidth = 3;
            ctx.globalAlpha = 0.55;
            ctx.beginPath();
            ctx.moveTo(x, y + tileInnerH * 0.2);
            ctx.bezierCurveTo(
              x + tileInnerW * 0.4,
              y + tileInnerH * 0.5,
              x + tileInnerW * 0.6,
              y + tileInnerH * 0.1,
              x + tileInnerW,
              y + tileInnerH * 0.8
            );
            ctx.stroke();

            // Hairline secondary veins
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.35;
            ctx.beginPath();
            ctx.moveTo(x + tileInnerW * 0.3, y);
            ctx.bezierCurveTo(
              x + tileInnerW * 0.5,
              y + tileInnerH * 0.4,
              x + tileInnerW * 0.2,
              y + tileInnerH * 0.7,
              x + tileInnerW * 0.7,
              y + tileInnerH
            );
            ctx.stroke();
          } else if (product.texturePattern === 'wood-linear') {
            // Straight organic wood grain lines
            ctx.strokeStyle = product.accentVeinColor;
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 1.5;
            for (let i = 0; i < 8; i++) {
              const lineY = y + (tileInnerH / 9) * (i + 1);
              ctx.beginPath();
              ctx.moveTo(x, lineY);
              ctx.quadraticCurveTo(x + tileInnerW * 0.5, lineY + (i % 2 === 0 ? 3 : -3), x + tileInnerW, lineY);
              ctx.stroke();
            }
          } else if (product.texturePattern === 'terrazzo-aggregate') {
            // Terrazzo aggregate chips
            ctx.fillStyle = product.accentVeinColor;
            ctx.globalAlpha = 0.6;
            for (let k = 0; k < 25; k++) {
              const chipX = x + Math.random() * tileInnerW;
              const chipY = y + Math.random() * tileInnerH;
              const chipR = 2 + Math.random() * 5;
              ctx.beginPath();
              ctx.arc(chipX, chipY, chipR, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            // Stone / Cleaved texture micro-grain
            ctx.fillStyle = product.accentVeinColor;
            ctx.globalAlpha = 0.25;
            for (let k = 0; k < 40; k++) {
              const sx = x + Math.random() * tileInnerW;
              const sy = y + Math.random() * tileInnerH;
              ctx.fillRect(sx, sy, 3, 2);
            }
          }
          ctx.restore();

          // Grout grid borders around tile
          ctx.strokeStyle = groutHex;
          ctx.lineWidth = groutPx;
          ctx.strokeRect(x, y, cellW, cellH);
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(3, 3);
      if (orientation === 'diagonal') {
        texture.rotation = Math.PI / 4;
      } else {
        texture.rotation = 0;
      }
      return texture;
    },
    []
  );

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0A0E18');
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.5);
    camera.lookAt(0, 1.0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    ambientLight.name = 'ambientLight';
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xfff6e5, 1.6);
    mainSun.position.set(4, 7, 3);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.width = 1024;
    mainSun.shadow.mapSize.height = 1024;
    mainSun.shadow.bias = -0.0005;
    mainSun.name = 'mainSun';
    scene.add(mainSun);

    const softFillLight = new THREE.PointLight(0xaad4ff, 0.8, 15);
    softFillLight.position.set(-3, 3, 2);
    softFillLight.name = 'softFillLight';
    scene.add(softFillLight);

    // 5. Room Architecture (Floor & Walls)
    const roomSize = 8;
    const wallHeight = 4.5;

    // Floor Mesh
    const floorGeo = new THREE.PlaneGeometry(roomSize, roomSize);
    const floorMat = new THREE.MeshStandardMaterial({
      roughness: activeFloorProduct.finish.includes('High Gloss') ? 0.08 : 0.45,
      metalness: 0.05,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    floorMeshRef.current = floorMesh;

    // Back Wall Mesh
    const backWallGeo = new THREE.PlaneGeometry(roomSize, wallHeight);
    const backWallMat = new THREE.MeshStandardMaterial({
      roughness: activeWallProduct.finish.includes('High Gloss') ? 0.1 : 0.6,
      metalness: 0.02,
    });
    const backWallMesh = new THREE.Mesh(backWallGeo, backWallMat);
    backWallMesh.position.set(0, wallHeight / 2, -roomSize / 2);
    backWallMesh.receiveShadow = true;
    scene.add(backWallMesh);
    backWallMeshRef.current = backWallMesh;

    // Left Wall Mesh
    const leftWallGeo = new THREE.PlaneGeometry(roomSize, wallHeight);
    const leftWallMat = backWallMat.clone();
    const leftWallMesh = new THREE.Mesh(leftWallGeo, leftWallMat);
    leftWallMesh.rotation.y = Math.PI / 2;
    leftWallMesh.position.set(-roomSize / 2, wallHeight / 2, 0);
    leftWallMesh.receiveShadow = true;
    scene.add(leftWallMesh);
    leftWallMeshRef.current = leftWallMesh;

    // Ceiling Base
    const ceilingGeo = new THREE.PlaneGeometry(roomSize, roomSize);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x111624,
      roughness: 0.9,
    });
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.y = wallHeight;
    scene.add(ceilingMesh);

    // Architectural Skirting & Molding Trim
    const baseboardGeo = new THREE.BoxGeometry(roomSize, 0.12, 0.04);
    const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x0c0f17, roughness: 0.4 });
    const baseboardBack = new THREE.Mesh(baseboardGeo, baseboardMat);
    baseboardBack.position.set(0, 0.06, -roomSize / 2 + 0.02);
    scene.add(baseboardBack);

    const baseboardLeft = new THREE.Mesh(baseboardGeo, baseboardMat);
    baseboardLeft.rotation.y = Math.PI / 2;
    baseboardLeft.position.set(-roomSize / 2 + 0.02, 0.06, 0);
    scene.add(baseboardLeft);

    // 6. Luxury Decorative Furniture Group
    const furnitureGroup = new THREE.Group();
    scene.add(furnitureGroup);
    furnitureGroupRef.current = furnitureGroup;

    // Base Modernist Architectural Pedestal / Low Credenza
    const credenzaGeo = new THREE.BoxGeometry(2.8, 0.45, 0.7);
    const credenzaMat = new THREE.MeshStandardMaterial({ color: 0x12151d, roughness: 0.3 });
    const credenza = new THREE.Mesh(credenzaGeo, credenzaMat);
    credenza.position.set(0, 0.225, -2.8);
    credenza.castShadow = true;
    credenza.receiveShadow = true;
    furnitureGroup.add(credenza);

    // Luxury Accent Ceramic Vase on credenza
    const vaseGeo = new THREE.CylinderGeometry(0.12, 0.22, 0.6, 32);
    const vaseMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Polished Gold Brass
      metalness: 0.9,
      roughness: 0.2,
    });
    const vase = new THREE.Mesh(vaseGeo, vaseMat);
    vase.position.set(0.8, 0.75, -2.8);
    vase.castShadow = true;
    furnitureGroup.add(vase);

    // Sculptural Lounger / Ottoman
    const sofaGeo = new THREE.BoxGeometry(2.0, 0.4, 0.9);
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x222733, roughness: 0.85 });
    const sofa = new THREE.Mesh(sofaGeo, sofaMat);
    sofa.position.set(-1.2, 0.2, 0.5);
    sofa.rotation.y = 0.25;
    sofa.castShadow = true;
    sofa.receiveShadow = true;
    furnitureGroup.add(sofa);

    // Modern Round Coffee Table with glass/brass reflection
    const tableTopGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.04, 32);
    const tableTopMat = new THREE.MeshStandardMaterial({
      color: 0x1e2433,
      metalness: 0.5,
      roughness: 0.1,
    });
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.set(0.6, 0.38, 0.8);
    tableTop.castShadow = true;
    furnitureGroup.add(tableTop);

    const tableLegGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.36, 16);
    const tableLegMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 });
    const tableLeg = new THREE.Mesh(tableLegGeo, tableLegMat);
    tableLeg.position.set(0.6, 0.18, 0.8);
    tableLeg.castShadow = true;
    furnitureGroup.add(tableLeg);

    // 7. Render Loop
    let angle = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (isRotating && cameraRef.current) {
        angle += 0.003;
        const radius = cameraAnglesRef.current.radius;
        cameraRef.current.position.x = Math.sin(angle) * (radius * 0.7);
        cameraRef.current.position.z = Math.cos(angle) * radius;
        cameraRef.current.lookAt(0, 1.0, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 580;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Update Floor Texture & Material
  useEffect(() => {
    if (!floorMeshRef.current) return;
    const texture = createTileTexture(activeFloorProduct, groutColor, groutSpacingMm, tileOrientation);
    const mat = floorMeshRef.current.material as THREE.MeshStandardMaterial;
    mat.map = texture;
    mat.roughness = activeFloorProduct.finish.includes('High Gloss') ? 0.08 : 0.45;
    mat.needsUpdate = true;
  }, [activeFloorProduct, groutColor, groutSpacingMm, tileOrientation, createTileTexture]);

  // Update Wall Texture & Material
  useEffect(() => {
    if (!backWallMeshRef.current || !leftWallMeshRef.current) return;
    const texture = createTileTexture(activeWallProduct, groutColor, groutSpacingMm, tileOrientation);
    const backMat = backWallMeshRef.current.material as THREE.MeshStandardMaterial;
    backMat.map = texture;
    backMat.roughness = activeWallProduct.finish.includes('High Gloss') ? 0.12 : 0.55;
    backMat.needsUpdate = true;

    const leftMat = leftWallMeshRef.current.material as THREE.MeshStandardMaterial;
    leftMat.map = texture;
    leftMat.roughness = backMat.roughness;
    leftMat.needsUpdate = true;
  }, [activeWallProduct, groutColor, groutSpacingMm, tileOrientation, createTileTexture]);

  // Update Lighting Preset
  useEffect(() => {
    if (!sceneRef.current) return;
    const ambient = sceneRef.current.getObjectByName('ambientLight') as THREE.AmbientLight;
    const sun = sceneRef.current.getObjectByName('mainSun') as THREE.DirectionalLight;
    const fill = sceneRef.current.getObjectByName('softFillLight') as THREE.PointLight;

    if (!ambient || !sun || !fill) return;

    if (lightingPreset === 'daylight') {
      ambient.intensity = 1.1;
      ambient.color.setHex(0xffffff);
      sun.intensity = 1.8;
      sun.color.setHex(0xfffaed);
      fill.intensity = 0.5;
    } else if (lightingPreset === 'evening-luxury') {
      ambient.intensity = 0.65;
      ambient.color.setHex(0xbad2ff);
      sun.intensity = 1.4;
      sun.color.setHex(0xffdfa8);
      fill.intensity = 0.9;
      fill.color.setHex(0xe8c17b);
    } else {
      // gallery-spot
      ambient.intensity = 0.4;
      ambient.color.setHex(0x94a3b8);
      sun.intensity = 2.2;
      sun.color.setHex(0xffffff);
      fill.intensity = 1.2;
      fill.color.setHex(0x38bdf8);
    }
  }, [lightingPreset]);

  // Mouse & Touch Orbit Camera handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
    setIsRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !cameraRef.current) return;
    const dx = e.clientX - prevMouseRef.current.x;
    const dy = e.clientY - prevMouseRef.current.y;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };

    cameraAnglesRef.current.theta -= dx * 0.006;
    cameraAnglesRef.current.phi = Math.max(
      0.15,
      Math.min(Math.PI / 2.1, cameraAnglesRef.current.phi - dy * 0.006)
    );

    const radius = cameraAnglesRef.current.radius;
    cameraRef.current.position.x = radius * Math.sin(cameraAnglesRef.current.phi) * Math.sin(cameraAnglesRef.current.theta);
    cameraRef.current.position.y = radius * Math.cos(cameraAnglesRef.current.phi);
    cameraRef.current.position.z = radius * Math.sin(cameraAnglesRef.current.phi) * Math.cos(cameraAnglesRef.current.theta);
    cameraRef.current.lookAt(0, 1.0, 0);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!cameraRef.current) return;
    cameraAnglesRef.current.radius = Math.max(3.5, Math.min(10, cameraAnglesRef.current.radius + e.deltaY * 0.005));
    const radius = cameraAnglesRef.current.radius;
    cameraRef.current.position.x = radius * Math.sin(cameraAnglesRef.current.phi) * Math.sin(cameraAnglesRef.current.theta);
    cameraRef.current.position.y = radius * Math.cos(cameraAnglesRef.current.phi);
    cameraRef.current.position.z = radius * Math.sin(cameraAnglesRef.current.phi) * Math.cos(cameraAnglesRef.current.theta);
    cameraRef.current.lookAt(0, 1.0, 0);
  };

  // Reset Camera
  const handleResetCamera = () => {
    if (!cameraRef.current) return;
    cameraAnglesRef.current = { theta: 0, phi: Math.PI / 3.8, radius: 7.2 };
    cameraRef.current.position.set(0, 2.2, 5.5);
    cameraRef.current.lookAt(0, 1.0, 0);
    setIsRotating(false);
  };

  // Snapshot Capture
  const handleCaptureSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `MARMOVA-3D-Surfaces-${activeFloorProduct.sku}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 3000);
  };

  return (
    <div className="w-full bg-[#090D16] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Visualizer Top Bar */}
      <div className="px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse" />
          <div>
            <h3 className="font-serif-luxury text-lg tracking-wider text-white">
              Studio 3D Room Visualizer
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Real WebGL Surface Shader</span>
              <span>·</span>
              <span>True-Scale Aspect Ratio</span>
              <span>·</span>
              <span>Grout Line Simulation</span>
            </div>
          </div>
        </div>

        {/* View Mode & Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveViewMode(activeViewMode === '3d' ? 'comparison' : '3d')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            {activeViewMode === '3d' ? 'Compare Real Photos' : 'Back to 3D Orbit'}
          </button>

          <button
            onClick={handleResetCamera}
            title="Reset Camera Angle"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            title="Auto-Rotate Room"
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
              isRotating
                ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                : 'bg-slate-800 text-slate-300 border-white/10 hover:bg-slate-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {isRotating ? 'Rotating' : 'Auto Orbit'}
          </button>

          <button
            onClick={handleCaptureSnapshot}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors flex items-center gap-1.5"
          >
            {snapshotTaken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />}
            {snapshotTaken ? 'Saved PNG' : 'Capture HD'}
          </button>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* 3D Canvas Viewport (8 Cols) */}
        <div className="lg:col-span-8 relative bg-black/60 overflow-hidden flex items-center justify-center">
          {activeViewMode === '3d' ? (
            <div
              ref={mountRef}
              className="w-full h-[580px] cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            />
          ) : (
            /* 2D Photo Comparison Fallback Mode */
            <div className="w-full h-[580px] p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0B0F19]">
              <div className="rounded-xl overflow-hidden border border-white/10 relative group">
                <img
                  src={activeFloorProduct.previewImageUrl}
                  alt={activeFloorProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                    Selected Floor Surface
                  </span>
                  <h4 className="text-white font-medium text-base">{activeFloorProduct.name}</h4>
                  <p className="text-xs text-slate-300">
                    {activeFloorProduct.lengthMm}×{activeFloorProduct.widthMm}mm · {activeFloorProduct.finish}
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 relative group">
                <img
                  src={activeWallProduct.previewImageUrl}
                  alt={activeWallProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                    Selected Wall Surface
                  </span>
                  <h4 className="text-white font-medium text-base">{activeWallProduct.name}</h4>
                  <p className="text-xs text-slate-300">
                    {activeWallProduct.lengthMm}×{activeWallProduct.widthMm}mm · {activeWallProduct.finish}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Floating Canvas Overlay Legend */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            <div className="glass-panel px-3.5 py-2 rounded-xl flex items-center gap-3 pointer-events-auto">
              <div className="text-xs">
                <span className="text-slate-400">Floor: </span>
                <span className="text-white font-medium">{activeFloorProduct.name}</span>
                <span className="text-slate-500 mx-1.5">|</span>
                <span className="text-slate-400">Walls: </span>
                <span className="text-white font-medium">{activeWallProduct.name}</span>
              </div>
            </div>

            <div className="glass-panel px-3 py-1.5 rounded-xl text-[11px] text-slate-400 pointer-events-auto flex items-center gap-2">
              <span>Drag to Orbit</span>
              <span>·</span>
              <span>Scroll to Zoom</span>
            </div>
          </div>
        </div>

        {/* Sidebar Controls (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0F1424] border-t lg:border-t-0 lg:border-l border-white/10 p-5 flex flex-col justify-between overflow-y-auto max-h-[580px]">
          <div className="space-y-5">
            {/* Surface Target Selector Tabs */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Apply Selected Tile To:
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-900/90 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setTargetSurface('floor')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    targetSurface === 'floor'
                      ? 'bg-[#D4AF37] text-slate-950 font-semibold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Floor ({activeFloorProduct.name.split(' ')[0]})
                </button>
                <button
                  onClick={() => setTargetSurface('walls')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    targetSurface === 'walls'
                      ? 'bg-[#D4AF37] text-slate-950 font-semibold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Walls ({activeWallProduct.name.split(' ')[0]})
                </button>
              </div>
            </div>

            {/* Tile Collection Swatches */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Select Architectural Surface:
                </label>
                <span className="text-[10px] text-[#D4AF37]">{TILE_PRODUCTS.length} Finishes</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {TILE_PRODUCTS.slice(0, 8).map((tile) => {
                  const isSelected =
                    targetSurface === 'floor'
                      ? tile.id === selectedFloorTileId
                      : tile.id === selectedWallTileId;

                  return (
                    <button
                      key={tile.id}
                      onClick={() => {
                        if (targetSurface === 'floor') setSelectedFloorTileId(tile.id);
                        else setSelectedWallTileId(tile.id);
                      }}
                      className={`relative group rounded-lg overflow-hidden aspect-square border transition-all ${
                        isSelected
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 scale-105'
                          : 'border-white/10 hover:border-white/30 opacity-75 hover:opacity-100'
                      }`}
                      title={`${tile.name} (${tile.lengthMm}x${tile.widthMm}mm)`}
                    >
                      <img
                        src={tile.previewImageUrl}
                        alt={tile.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                        </div>
                      )}
                      <div className="absolute bottom-1 left-1 right-1 text-[9px] text-white truncate font-medium drop-shadow">
                        {tile.name.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Room Presets */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Room Space Preset:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {ROOM_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setActivePresetId(preset.id);
                      setSelectedFloorTileId(preset.defaultFloorTileId);
                      setSelectedWallTileId(preset.defaultWallTileId);
                    }}
                    className={`p-2 rounded-lg text-left border transition-all text-xs ${
                      activePresetId === preset.id
                        ? 'bg-slate-800/90 border-[#D4AF37] text-white'
                        : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-medium truncate">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fine-Tuning Controls (Grout & Orientation & Lighting) */}
            <div className="pt-2 border-t border-white/5 space-y-3">
              {/* Tile Orientation */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Laying Pattern:
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {(['straight', 'offset', 'diagonal'] as const).map((pattern) => (
                    <button
                      key={pattern}
                      onClick={() => setTileOrientation(pattern)}
                      className={`py-1.5 px-2 rounded-md capitalize text-center border transition-colors ${
                        tileOrientation === pattern
                          ? 'bg-slate-800 border-[#D4AF37] text-white'
                          : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {pattern}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grout Color & Spacing */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Grout Joint:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[
                      { name: 'Charcoal', hex: '#22262E' },
                      { name: 'Platinum', hex: '#94A3B8' },
                      { name: 'Alabaster', hex: '#F1F5F9' },
                      { name: 'Sand', hex: '#C2B6A3' },
                    ].map((g) => (
                      <button
                        key={g.hex}
                        onClick={() => setGroutColor(g.hex)}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          groutColor === g.hex ? 'ring-2 ring-[#D4AF37] scale-110' : 'border-white/20'
                        }`}
                        style={{ backgroundColor: g.hex }}
                        title={g.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Joint Gap: {groutSpacingMm}mm
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={groutSpacingMm}
                    onChange={(e) => setGroutSpacingMm(parseInt(e.target.value, 10))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>
              </div>

              {/* Lighting Preset */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Architectural Lighting:
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'daylight', label: 'Daylight' },
                    { id: 'evening-luxury', label: 'Evening' },
                    { id: 'gallery-spot', label: 'Gallery' },
                  ].map((light) => (
                    <button
                      key={light.id}
                      onClick={() => setLightingPreset(light.id as any)}
                      className={`py-1.5 px-2 rounded-md text-center border transition-colors ${
                        lightingPreset === light.id
                          ? 'bg-slate-800 border-[#D4AF37] text-white'
                          : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {light.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Conversion CTAs */}
          <div className="pt-4 border-t border-white/10 space-y-2 mt-4">
            <button
              onClick={() => {
                if (onOpenRfq) {
                  onOpenRfq(
                    activeFloorProduct,
                    `Visualized floor tile: ${activeFloorProduct.name} (${activeFloorProduct.sku}) and wall tile: ${activeWallProduct.name} (${activeWallProduct.sku}) in ${activePreset.name}.`
                  );
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C07B] text-slate-950 font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
            >
              <Sparkles className="w-4 h-4" />
              Request Quote for This Room
            </button>

            <button
              onClick={() => {
                if (onSendWhatsApp) {
                  onSendWhatsApp(
                    activeFloorProduct,
                    `Floor: ${activeFloorProduct.name} (${activeFloorProduct.sku}) | Wall: ${activeWallProduct.name} (${activeWallProduct.sku}) | Preset: ${activePreset.name}`
                  );
                }
              }}
              className="w-full py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              Send Visualization via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
