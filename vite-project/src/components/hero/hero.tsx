import { useEffect, useRef, useState} from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import '../hero/hero'


const ThreeScene = () => { // CREAR COMPOSICION PARA ANIMAR Y RENDERIZAR
  const mountRef = useRef<HTMLDivElement>(null); // tipado correcto
   const [soundRef, setSoundRef] = useState<THREE.Audio | null>(null);
   const [isPlaying, setIsPlaying] = useState(false);



  useEffect(() => {
    // if (!mountRef.current) return;  Validar que el contenedor no sea null
    const mount = mountRef.current;
    if (!mount) return;

    // Evitar renderizados duplicados
    // if (rendererRef.current) return;

    // Crear la escena, la cámara y el renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020); // <----- REVISAAAAAAR
    // scene.fog = new THREE.Fog(0xff45f, 10, 15);

    // Cámara
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      // window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 4); // la propiedad .position --> sirve para mover los elementos en diferentes planos x,y,z

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
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);    
    
    // AUDIOS formato optimizado para web .ogg
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

  // create a global audio source
    const sound = new THREE.Audio(listener);


    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.8;


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