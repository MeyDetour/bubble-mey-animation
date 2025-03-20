import './App.css'
import {extend} from '@react-three/fiber'
import {Stats, OrbitControls} from '@react-three/drei'


import {Canvas, useFrame} from '@react-three/fiber'
import {useRef} from "react";

function App() {
    const bigSphereSize = 1.5
    const secondBigSphereSize = 1.3
    const mediumSphereSize = 0.4
    const littleSphereSize = 0.2
    return (
        <>
            <Canvas
            >
                {/*<gridHelper/>*/}
                <OrbitControls enableDamping={true} damping={0.5}/>
                <ambientLight intensity={2} color="white"/>
                <BigSphere size={bigSphereSize}></BigSphere>
                <MovingSphere size={mediumSphereSize} position={[1, 1, 1]} color="white"/>

                <MovingSphere size={littleSphereSize} position={[-1.5, -1, -1]}  color="white"/>
                <MovingSphere size={secondBigSphereSize}  position={[-0.2, -0.2, -0.2]}
                              color="white"/>


                <MovingSphere size={littleSphereSize} position={[-1.2, -2, -1.4]}  decalage={2} color="white"/>
                <MovingSphere size={secondBigSphereSize}  decalage={0.2}
                              position={[-0.2, -0.2, -0.2]} color="white"/>

                <MovingSphere size={littleSphereSize} position={[-0.6, 0.8, 3]} color="white"/>
                <MovingSphere size={secondBigSphereSize}  decalage={0.2}
                              position={[-0.3, 0.2, 0.3]} color="white"/>


                <MovingSphere size={mediumSphereSize} position={[-0.6, -6, 2]}  decalage={2} color="white"/>
                <MovingSphere size={secondBigSphereSize}  position={[-0.3, -0.2, 0.2]}
                              color="white"/>

                <MovingSphere size={littleSphereSize} position={[-5, -2, -1.4]} decalage={2} color="white"/>
                <MovingSphere size={secondBigSphereSize}  decalage={0.2}
                              position={[0.3, -0.2, 0.2]} color="white"/>


                <MovingSphere size={littleSphereSize} position={[2, -1, 3]} decalage={1.5} color="white" />

                <MovingSphere size={mediumSphereSize} position={[4, -4, -1]} decalage={2.3} color="white" />
                <MovingSphere size={littleSphereSize} position={[-2, 3, 1]} decalage={1} color="white" />

                 <MovingSphere size={littleSphereSize} position={[-4, 1, 2]} decalage={1.8} color="white" />

                <MovingSphere size={mediumSphereSize} position={[1.2, -3.2, 0.8]} decalage={2.5} color="white" />
                </Canvas>
        </>
    )
}

function BigSphere({size}) {

    return (
        <mesh>
            <icosahedronGeometry args={[size, 10]}/>
            <meshStandardMaterial color={"white"} flatShading={true}/>
        </mesh>
    )
}

function getPos(time, basePos) {
    let cos = 1 + Math.cos(time)
    let sin = 1 + Math.sin(time)
    // console.log("=============")
    // console.log(sin)
    // console.log(cos)
    let posX = sin * basePos[0]
    let posY = sin * basePos[1]
    let posZ = cos * basePos[2]
    return {x: posX, y: posY, z: posZ}
}

function MovingSphere({size, position, color, decalage = 0}) {
    const sphere = useRef()
    useFrame(({clock}) => {
        let time = clock.elapsedTime
        time = time - decalage
        if (time > 0) {
            let newPosition = sphere.current.position
            let pos = getPos(time, position)
            newPosition.x = pos.x
            newPosition.y = pos.y
            newPosition.z = pos.z
        }

    })
    return (
        <mesh position={[0,0,0]} ref={sphere}>
            <icosahedronGeometry args={[size, 10]}/>
            <meshStandardMaterial color={color} flatShading={true}/>
        </mesh>
    )
}

export default App
