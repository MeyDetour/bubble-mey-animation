import {useRef, useState} from 'react'
import './App.css'

import {Canvas, useFrame} from '@react-three/fiber'

function App() {

    return (
        <>
            <Canvas>
                <ambientLight intensity={1}/>
                {/*  const light = new THREE.AmbientLight()
                light.intensity = 0.1 */}

                <mesh>
                    <boxGeometry args={[3, 3, 3]}/>
                    {/* new THREE.BoxGeometry(2, 2, 2)*/}
                    <meshStandardMaterial/>
                    {/*  mesh.material = new THREE.MeshStandardMaterial() */}
                </mesh>
            </Canvas>
        </>
    )
}

export default App
