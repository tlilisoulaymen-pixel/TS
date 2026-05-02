"use client";

import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, Plane, Sphere } from "@react-three/drei";
import { ExternalLink, X, Code2, Cpu } from "lucide-react";

/* ── Types ──────────────────────────────────────────────────────────────── */
export type Project = {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
  tags: string[];
  status: "Active" | "Completed" | "Research";
  link: string;
  color: string;
};

type ProjectContextType = {
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  projects: Project[];
};

/* ── Context ─────────────────────────────────────────────────────────────── */
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
}

function ProjectProvider({ children, projects }: { children: React.ReactNode, projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject, projects }}>
      {children}
    </ProjectContext.Provider>
  );
}

/* ── Starfield Background ────────────────────────────────────────────────── */
function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x050506, 1);
    mountRef.current.appendChild(renderer.domElement);

    const geo = new THREE.BufferGeometry();
    const count = 8000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2000;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, sizeAttenuation: true });
    const stars = new THREE.Points(geo, mat);
    scene.add(stars);
    camera.position.z = 10;

    let id = 0;
    const animate = () => {
      id = requestAnimationFrame(animate);
      stars.rotation.y += 0.00008;
      stars.rotation.x += 0.00004;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(id);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}

/* ── Floating Project Card ───────────────────────────────────────────────── */
function FloatingProjectCard({
  project,
  position,
}: {
  project: Project;
  position: { x: number; y: number; z: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedProject } = useProject();

  useFrame(({ camera }) => {
    if (groupRef.current) groupRef.current.lookAt(camera.position);
  });

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto"; }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-44 h-56 rounded-xl overflow-hidden select-none flex flex-col"
          style={{
            background: "rgba(10,10,12,0.95)",
            boxShadow: hovered
              ? `0 25px 50px ${project.color}55, 0 0 30px ${project.color}33`
              : "0 15px 30px rgba(0,0,0,0.7)",
            border: hovered
              ? `2px solid ${project.color}88`
              : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="relative h-32 overflow-hidden flex-shrink-0">
            <img
              src={project.imageUrl}
              alt={project.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span
              className="absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm"
              style={{
                backgroundColor: `${project.color}33`,
                color: "#ffffff",
                border: `1px solid ${project.color}88`,
                textShadow: "0 1px 2px rgba(0,0,0,0.8)"
              }}
            >
              {project.status}
            </span>
          </div>
          <div className="p-2 flex-1 flex flex-col justify-between">
            <p className="text-white text-[10px] font-semibold leading-tight line-clamp-2">
              {project.title}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.tags.slice(0, 2).map((t) => (
                <span key={t} className="text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

/* ── Project Detail Modal ────────────────────────────────────────────────── */
function ProjectModal() {
  const { selectedProject, setSelectedProject } = useProject();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!selectedProject) return null;

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 12;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * -12;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out";
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  const statusColor: Record<string, string> = {
    Active: "bg-green-500/20 text-green-400 border-green-500/30",
    Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Research: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setSelectedProject(null); }}
    >
      <div className="relative max-w-md w-full">
        <button
          onClick={() => setSelectedProject(null)}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-[16px] p-5 transition-all duration-500 ease-out w-full"
            style={{
              transformStyle: "preserve-3d",
              background: "rgba(15, 15, 18, 0.95)",
              border: `1px solid ${selectedProject.color}44`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${selectedProject.color}22`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                alt={selectedProject.alt}
                src={selectedProject.imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] to-transparent" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                 <span className={`text-[10px] px-2.5 py-1 rounded-full border backdrop-blur-md ${statusColor[selectedProject.status]}`}>
                  {selectedProject.status}
                </span>
              </div>
            </div>

            <h3 className="text-white text-xl font-orbitron font-semibold mb-2">{selectedProject.title}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{selectedProject.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
               {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <div className="flex gap-3">
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg text-sm font-medium text-white outline-none transition duration-300 ease-out hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: selectedProject.color }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>View Repository</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Project Galaxy (3D Layout) ──────────────────────────────────────────── */
function ProjectGalaxy() {
  const { projects } = useProject();

  const projectPositions = useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = [];
    const numProjects = projects.length;
    // We only have 5 projects, so we'll position them nicely in a ring or spread out
    
    for (let i = 0; i < numProjects; i++) {
      const angle = (i / numProjects) * Math.PI * 2;
      const radius = 15;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      // alternate heights
      const y = (i % 2 === 0 ? 1 : -1) * 3;

      positions.push({ x, y, z });
    }
    return positions;
  }, [projects.length]);

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[18, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.03} wireframe />
      </Sphere>

      {projects.map((project, i) => (
        <FloatingProjectCard key={project.id} project={project} position={projectPositions[i]} />
      ))}
    </>
  );
}

/* ── Main Component Export ───────────────────────────────────────────────── */
export default function StellarProjectGallery({ projects }: { projects: Project[] }) {
  return (
    <ProjectProvider projects={projects}>
      <div className="w-full h-[80vh] min-h-[600px] relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 5, 25], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto";
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <ProjectGalaxy />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={35}
              autoRotate={true}
              autoRotateSpeed={0.5}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <ProjectModal />

        <div className="absolute top-6 left-6 z-20 text-white pointer-events-none drop-shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-violet-400" />
            <p className="text-xs tracking-widest uppercase text-violet-300 font-orbitron">Interactive Gallery</p>
          </div>
          <p className="text-sm text-gray-400 max-w-xs">Drag to explore • Scroll to zoom • Click cards to view details</p>
        </div>
      </div>
    </ProjectProvider>
  );
}
