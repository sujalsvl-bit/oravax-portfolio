import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface GardenEnvironmentProps {
  reducedMotion: boolean;
}

// Procedural high-resolution early-morning panoramic sky texture
function createEarlyMorningSkyTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Smooth vertical morning gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0.0, '#42688E');   // Deep early morning sky
  grad.addColorStop(0.4, '#6B94B5');   // Morning blue
  grad.addColorStop(0.68, '#B8CFDC');  // Soft atmospheric mist
  grad.addColorStop(0.84, '#F2CEB0');  // Dawn peach glow
  grad.addColorStop(0.93, '#F8E0C4');  // Golden horizon
  grad.addColorStop(1.0, '#E4D5C6');   // Ground haze
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft radiant rising sun glow in east
  const sunX = canvas.width * 0.75;
  const sunY = canvas.height * 0.77;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 280);
  sunGrad.addColorStop(0.0, 'rgba(255, 252, 238, 0.95)');
  sunGrad.addColorStop(0.25, 'rgba(255, 232, 185, 0.65)');
  sunGrad.addColorStop(0.55, 'rgba(255, 205, 155, 0.25)');
  sunGrad.addColorStop(1.0, 'rgba(255, 205, 155, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.needsUpdate = true;
  return texture;
}

// Procedural rich organic soil texture
function createSoilTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#38281D';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2.2 + 0.6;
    const shade = Math.random() > 0.5 ? '#281C14' : '#463426';
    ctx.fillStyle = shade;
    ctx.fillRect(x, y, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 24);
  return texture;
}

export function GardenEnvironment({ reducedMotion }: GardenEnvironmentProps) {
  const { scene } = useThree();
  const grassRef = useRef<THREE.InstancedMesh>(null);
  const foliageRef = useRef<THREE.Group>(null);

  // Early morning atmospheric mist
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#C4D4CB', 0.016);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  const skyTexture = useMemo(() => createEarlyMorningSkyTexture(), []);
  const soilTexture = useMemo(() => createSoilTexture(), []);

  // Continuous stone flagstone path from Gate (z = 6) down to Shed (z = -56)
  const pathStones = useMemo(() => {
    const stones = [];
    for (let z = 6.2; z >= -56; z -= 1.15) {
      const x = Math.sin(z * 0.14) * 1.5;
      const rotY = Math.sin(z * 0.35) * 0.18;
      const width = 1.05 + Math.cos(z * 0.4) * 0.18;
      const length = 0.88 + Math.sin(z * 0.6) * 0.18;
      const colorVariants = ['#888073', '#968E80', '#7A7265', '#9E9688', '#70685C'];
      const color = colorVariants[Math.abs(Math.floor(z * 7)) % colorVariants.length];
      stones.push({ x, z, rotY, width, length, color });
    }
    return stones;
  }, []);

  // Cobblestone path border edgings
  const pathEdgings = useMemo(() => {
    const edges = [];
    for (let z = 6.2; z >= -56; z -= 0.6) {
      const centerX = Math.sin(z * 0.14) * 1.5;
      const leftX = centerX - 1.25;
      const rightX = centerX + 1.25;
      edges.push({ x: leftX, z, rotY: Math.random() * 0.2 });
      edges.push({ x: rightX, z, rotY: Math.random() * 0.2 });
    }
    return edges;
  }, []);

  // Instanced grass blades
  const grassCount = 420;
  const grassTransforms = useMemo(() => {
    const dummy = new THREE.Object3D();
    const matrices: THREE.Matrix4[] = [];

    for (let i = 0; i < grassCount; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = 5.5 - Math.random() * 61;
      const centerX = Math.sin(z * 0.14) * 1.5;
      const distFromCenter = 1.35 + Math.random() * 4.5;
      const x = centerX + side * distFromCenter;
      const y = 0.05;

      dummy.position.set(x, y, z);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.rotation.x = (Math.random() - 0.5) * 0.18;
      dummy.rotation.z = (Math.random() - 0.5) * 0.18;
      const s = 0.7 + Math.random() * 0.65;
      dummy.scale.set(s, s * (0.8 + Math.random() * 0.5), s);
      dummy.updateMatrix();
      matrices.push(dummy.matrix.clone());
    }
    return matrices;
  }, []);

  useEffect(() => {
    if (!grassRef.current) return;
    grassTransforms.forEach((matrix, i) => {
      grassRef.current?.setMatrixAt(i, matrix);
    });
    grassRef.current.instanceMatrix.needsUpdate = true;
  }, [grassTransforms]);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (foliageRef.current) {
      foliageRef.current.rotation.z = Math.sin(t * 1.1) * 0.008;
    }
  });

  return (
    <group>
      {/* Early Morning Realistic Lighting */}
      <ambientLight intensity={0.52} color="#DDEAE5" />
      <hemisphereLight args={['#DFECF4', '#382B1E', 0.88]} />
      
      {/* Low-angle golden morning sun */}
      <directionalLight
        position={[14, 18, 12]}
        intensity={1.8}
        color="#FFF1DD"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0008}
        shadow-camera-near={0.5}
        shadow-camera-far={90}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      {/* Atmospheric early morning sky dome */}
      <mesh scale={[-100, -100, -100]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshBasicMaterial map={skyTexture} side={THREE.BackSide} />
      </mesh>

      {/* Uneven organic ground terrain (Soil & Earth) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -25]} receiveShadow>
        <planeGeometry args={[65, 90, 32, 32]} />
        <meshStandardMaterial
          map={soilTexture}
          color="#35261C"
          roughness={0.92}
          metalness={0.04}
        />
      </mesh>

      {/* Lush grass planting beds on left & right sides */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.8, -0.02, -25]} receiveShadow>
        <planeGeometry args={[12, 88, 16, 16]} />
        <meshStandardMaterial color="#3A5627" roughness={0.88} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.8, -0.02, -25]} receiveShadow>
        <planeGeometry args={[12, 88, 16, 16]} />
        <meshStandardMaterial color="#3A5627" roughness={0.88} />
      </mesh>

      {/* Stone Flagstone Path with beveled pavers */}
      <group>
        {pathStones.map((stone, i) => (
          <mesh
            key={`stone-${i}`}
            position={[stone.x, 0.025, stone.z]}
            rotation={[-Math.PI / 2, 0, stone.rotY]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[stone.width, stone.length, 0.05]} />
            <meshStandardMaterial color={stone.color} roughness={0.82} />
          </mesh>
        ))}

        {/* Cobblestone path border curbs */}
        {pathEdgings.map((edge, i) => (
          <mesh
            key={`edge-${i}`}
            position={[edge.x, 0.035, edge.z]}
            rotation={[0, edge.rotY, 0]}
            receiveShadow
          >
            <boxGeometry args={[0.16, 0.08, 0.45]} />
            <meshStandardMaterial color="#686154" roughness={0.85} />
          </mesh>
        ))}
      </group>

      {/* Dense instanced grass blades */}
      <instancedMesh
        ref={grassRef}
        args={[undefined, undefined, grassCount]}
        receiveShadow
      >
        <coneGeometry args={[0.07, 0.45, 4]} />
        <meshStandardMaterial color="#44662E" roughness={0.78} />
      </instancedMesh>

      {/* Walled Kitchen Garden Perimeter: Weathered Red Brick Walls with Stone Coping */}
      <group>
        {/* Left Wall */}
        <mesh position={[-6.8, 1.4, -25]} receiveShadow castShadow>
          <boxGeometry args={[0.45, 2.8, 86]} />
          <meshStandardMaterial color="#723E30" roughness={0.9} />
        </mesh>
        <mesh position={[-6.8, 2.85, -25]} receiveShadow>
          <boxGeometry args={[0.55, 0.12, 86]} />
          <meshStandardMaterial color="#9E9688" roughness={0.82} />
        </mesh>

        {/* Right Wall */}
        <mesh position={[6.8, 1.4, -25]} receiveShadow castShadow>
          <boxGeometry args={[0.45, 2.8, 86]} />
          <meshStandardMaterial color="#723E30" roughness={0.9} />
        </mesh>
        <mesh position={[6.8, 2.85, -25]} receiveShadow>
          <boxGeometry args={[0.55, 0.12, 86]} />
          <meshStandardMaterial color="#9E9688" roughness={0.82} />
        </mesh>

        {/* Rear Wall behind Shed */}
        <mesh position={[0, 1.6, -58.5]} receiveShadow castShadow>
          <boxGeometry args={[14, 3.2, 0.45]} />
          <meshStandardMaterial color="#723E30" roughness={0.9} />
        </mesh>
        <mesh position={[0, 3.25, -58.5]} receiveShadow>
          <boxGeometry args={[14.2, 0.12, 0.55]} />
          <meshStandardMaterial color="#9E9688" roughness={0.82} />
        </mesh>
      </group>

      {/* 
        Realistic Architectural Garden Gate at Entrance (z = 4.0)
        Dressed Ashlar Limestone Piers with Carved Pyramidal Capstones
        Wrought-Iron Open-work Gate Wings Swung Invitingly Inward
      */}
      <group position={[0, 0, 4.0]}>
        {/* Left Ashlar Stone Pier */}
        <mesh position={[-1.65, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.65, 2.8, 0.65]} />
          <meshStandardMaterial color="#928A7D" roughness={0.85} />
        </mesh>
        {/* String course & Base plinth */}
        <mesh position={[-1.65, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.4, 0.75]} />
          <meshStandardMaterial color="#847C70" roughness={0.85} />
        </mesh>
        <mesh position={[-1.65, 2.85, 0]} castShadow>
          <boxGeometry args={[0.75, 0.12, 0.75]} />
          <meshStandardMaterial color="#847C70" roughness={0.82} />
        </mesh>
        {/* Pyramidal Capstone with Ball Finial */}
        <mesh position={[-1.65, 3.12, 0]} castShadow>
          <coneGeometry args={[0.52, 0.45, 4]} />
          <meshStandardMaterial color="#888073" roughness={0.8} />
        </mesh>
        <mesh position={[-1.65, 3.42, 0]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#888073" roughness={0.8} />
        </mesh>

        {/* Right Ashlar Stone Pier */}
        <mesh position={[1.65, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.65, 2.8, 0.65]} />
          <meshStandardMaterial color="#928A7D" roughness={0.85} />
        </mesh>
        <mesh position={[1.65, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.4, 0.75]} />
          <meshStandardMaterial color="#847C70" roughness={0.85} />
        </mesh>
        <mesh position={[1.65, 2.85, 0]} castShadow>
          <boxGeometry args={[0.75, 0.12, 0.75]} />
          <meshStandardMaterial color="#847C70" roughness={0.82} />
        </mesh>
        <mesh position={[1.65, 3.12, 0]} castShadow>
          <coneGeometry args={[0.52, 0.45, 4]} />
          <meshStandardMaterial color="#888073" roughness={0.8} />
        </mesh>
        <mesh position={[1.65, 3.42, 0]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#888073" roughness={0.8} />
        </mesh>

        {/* Left Wrought-Iron Gate Wing (Swung open 55° inward into garden) */}
        <group position={[-1.32, 0, 0]} rotation={[0, 0.95, 0]}>
          {/* Main Iron Rails: Top, Mid, Bottom */}
          <mesh position={[0.55, 2.15, 0]} castShadow>
            <boxGeometry args={[1.15, 0.05, 0.03]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.85} roughness={0.35} />
          </mesh>
          <mesh position={[0.55, 1.1, 0]} castShadow>
            <boxGeometry args={[1.15, 0.04, 0.03]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.85} roughness={0.35} />
          </mesh>
          <mesh position={[0.55, 0.15, 0]} castShadow>
            <boxGeometry args={[1.15, 0.05, 0.03]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.85} roughness={0.35} />
          </mesh>

          {/* Vertical Iron Spindles with Spearheads */}
          {[0.08, 0.22, 0.36, 0.5, 0.64, 0.78, 0.92, 1.04].map((sx, idx) => (
            <group key={`lgate-spindle-${idx}`} position={[sx, 0, 0]}>
              <mesh position={[0, 1.15, 0]} castShadow>
                <cylinderGeometry args={[0.015, 0.015, 2.05, 6]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.85} roughness={0.35} />
              </mesh>
              {/* Spearhead Finial */}
              <mesh position={[0, 2.25, 0]} castShadow>
                <coneGeometry args={[0.035, 0.14, 4]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.3} />
              </mesh>
            </group>
          ))}
          {/* Iron Pintle Hinges */}
          <mesh position={[0.02, 1.9, 0.02]} castShadow>
            <boxGeometry args={[0.15, 0.06, 0.04]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0.02, 0.3, 0.02]} castShadow>
            <boxGeometry args={[0.15, 0.06, 0.04]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>

        {/* Right Wrought-Iron Gate Wing (Swung open 55° inward into garden) */}
        <group position={[1.32, 0, 0]} rotation={[0, -0.95, 0]}>
          {/* Main Iron Rails: Top, Mid, Bottom */}
          <mesh position={[-0.55, 2.15, 0]} castShadow>
            <boxGeometry args={[1.15, 0.05, 0.03]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.85} roughness={0.35} />
          </mesh>
          <mesh position={[-0.55, 1.1, 0]} castShadow>
            <boxGeometry args={[1.15, 0.04, 0.03]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.85} roughness={0.35} />
          </mesh>
          <mesh position={[-0.55, 0.15, 0]} castShadow>
            <boxGeometry args={[1.15, 0.05, 0.03]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.85} roughness={0.35} />
          </mesh>

          {/* Vertical Iron Spindles with Spearheads */}
          {[-0.08, -0.22, -0.36, -0.5, -0.64, -0.78, -0.92, -1.04].map((sx, idx) => (
            <group key={`rgate-spindle-${idx}`} position={[sx, 0, 0]}>
              <mesh position={[0, 1.15, 0]} castShadow>
                <cylinderGeometry args={[0.015, 0.015, 2.05, 6]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.85} roughness={0.35} />
              </mesh>
              {/* Spearhead Finial */}
              <mesh position={[0, 2.25, 0]} castShadow>
                <coneGeometry args={[0.035, 0.14, 4]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.3} />
              </mesh>
            </group>
          ))}
          {/* Iron Pintle Hinges */}
          <mesh position={[-0.02, 1.9, 0.02]} castShadow>
            <boxGeometry args={[0.15, 0.06, 0.04]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[-0.02, 0.3, 0.02]} castShadow>
            <boxGeometry args={[0.15, 0.06, 0.04]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* Background Mature Orchard Trees Peeking Over Walls */}
      <group>
        {[-48, -38, -26, -14, -2].map((tz, i) => (
          <group key={`btree-left-${i}`} position={[-8.5, 0, tz]}>
            <mesh position={[0, 3.5, 0]} castShadow>
              <sphereGeometry args={[2.2, 10, 10]} />
              <meshStandardMaterial color="#2E4A23" roughness={0.85} />
            </mesh>
            <mesh position={[0, 1.5, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.3, 3, 6]} />
              <meshStandardMaterial color="#4A3728" roughness={0.9} />
            </mesh>
          </group>
        ))}
        {[-44, -32, -20, -8].map((tz, i) => (
          <group key={`btree-right-${i}`} position={[8.5, 0, tz]}>
            <mesh position={[0, 3.5, 0]} castShadow>
              <sphereGeometry args={[2.2, 10, 10]} />
              <meshStandardMaterial color="#2E4A23" roughness={0.85} />
            </mesh>
            <mesh position={[0, 1.5, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.3, 3, 6]} />
              <meshStandardMaterial color="#4A3728" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
