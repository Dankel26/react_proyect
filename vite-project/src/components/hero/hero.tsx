import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import './hero.css'


const ThreeScene = () => { // CREAR COMPOSICION PARA ANIMAR Y RENDERIZAR
  const mountRef = useRef<HTMLDivElement>(null); // tipado correcto

  useEffect(() => {
    // if (!mountRef.current) return;  Validar que el contenedor no sea null
    const mount = mountRef.current;
    if (!mount) return;

    // Evitar renderizados duplicados
    // if (rendererRef.current) return;

    // Crear la escena, la cámara y el renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);

    // Cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3; // la propiedad .position --> sirve para mover los elementos en diferentes planos x,y,z

    // Render
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);


    // // Crear el cubo
    // const cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(),
    //   new THREE.MeshStandardMaterial({ color: 0x00ffcc })
    // );
    // scene.add(cube);

// Cargar modelo GLB/GLTF
const loader = new GLTFLoader();
loader.load(
  "model/sombrero.glb", // asegúrate de que la ruta sea correcta, el formato GLB es optimizado para web
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error("Error al cargar modelo:", error);
  }
);


    // Luz
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;


    // Animación: Rotación básica en X
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    renderer.render(scene, camera); // esta linea debe estar al final de los elementos para que empiece a renderizarlos


    // Limpieza de pantalla o recursos
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="model-container"></div>;
};

export default ThreeScene;