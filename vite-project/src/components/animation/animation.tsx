import { useEffect, useRef } from "react"; // IMPORTACION DE EFECTOS 
import * as THREE from "three"; // IMPORTACION DE LA LIBRERIA


const ThreeScene = () => { // CREAR COMPOSICION PARA ANIMAR Y RENDERIZAR
    const mountRef = useRef<HTMLDivElement | null>(null); // Tipado correcto
  
    useEffect(() => {
      if (!mountRef.current) return; // Validar que el contenedor no sea null

       // Crear la escena, la cámara y el renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( // SE CONFIGURA LOS ASPECTOS DE LA CAMARA
        75, // distancia focal
        window.innerWidth / window.innerHeight, // respecto ratio | tamaño de la escena
        0.1, // zoom cerca
        1000 // zoom lejos
         );
        const renderer = new THREE.WebGLRenderer();
  
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

         // Crear el cubo
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffe0 }); // 0x define que es un valor hexadecimal
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5; // la propiedad .position --> sirve para mover los elementos en diferentes planos x,y,z

        // Animación: Rotación básica en X
        const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01; // Incrementar la rotación en X
        renderer.render(scene, camera);
      };
  
      animate();

        renderer.render(scene, camera); // esta linea debe estar al final de los elementos para que empiece a renderizarlos


      // Limpieza de pantalla o recursos
        return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    }, []);
  
    return <div ref={mountRef} />;
  };
  
  export default ThreeScene;