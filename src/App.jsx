import './App.css'
import {extend, useThree} from '@react-three/fiber'
import {Stats, OrbitControls} from '@react-three/drei'
import {Canvas, useFrame} from '@react-three/fiber'
import {useEffect, useRef, useState} from "react";


const bigSphereSize = 1.5
const secondBigSphereSize = 1.3
const mediumSphereSize = 0.4
const littleSphereSize = 0.2
const littleStarDispersion = 100
const littleStarProximite = 0

function App() {

    return (
        <>
            <Canvas
                camera={{fov: 75, near: 0.1, far: 1000, position: [5, 0, 10]}}
            >
                <CameraController position={[20, 0, 20]}></CameraController>
                {/*<gridHelper/>*/}
                <OrbitControls enableDamping={true} damping={0.5}/>
                <ambientLight intensity={2} color="white"/>
                <camera position={[0, 0, 75]}/>
                <Background quantity={2000}></Background>
                <BigSphere size={bigSphereSize}></BigSphere>


                <MovingSphere size={mediumSphereSize} position={[1, 1, 1]} color="white"/>

                <MovingSphere size={littleSphereSize} position={[-1.5, -1, -1]} color="white"/>
                <MovingSphere size={secondBigSphereSize} position={[-0.2, -0.2, -0.2]}
                              color="white"/>


                <MovingSphere size={littleSphereSize} position={[-1.2, -2, -1.4]} decalage={2} color="white"/>
                <MovingSphere size={secondBigSphereSize} decalage={2}
                              position={[-0.2, -0.2, -0.2]} color="white"/>

                <MovingSphere size={littleSphereSize} position={[-0.6, 0.8, 3]} color="white"/>
                <MovingSphere size={secondBigSphereSize} decalage={0.2}
                              position={[-0.3, 0.2, 0.3]} color="white"/>


                <MovingSphere size={mediumSphereSize} position={[-0.6, -6, 2]} decalage={2} color="white"/>
                <MovingSphere size={secondBigSphereSize} position={[-0.3, -0.2, 0.2]}
                              color="white"/>

                <MovingSphere size={littleSphereSize} position={[-5, -2, -1.4]} decalage={2} color="white"/>
                <MovingSphere size={secondBigSphereSize} decalage={2}
                              position={[0.3, -0.2, 0.2]} color="white"/>


                <MovingSphere size={littleSphereSize} position={[2, -1, 3]} decalage={2} color="white"/>

                <MovingSphere size={mediumSphereSize} position={[4, -4, -1]} decalage={5} color="white"/>
                <MovingSphere size={littleSphereSize} position={[-2, 3, 1]} decalage={15} color="white"/>

                <MovingSphere size={littleSphereSize} position={[-4, 1, 2]} color="white"/>

                <MovingSphere size={mediumSphereSize} position={[1.2, -3.2, 0.8]} decalage={2.5} color="white"/>
            </Canvas>
        </>
    )
}

function CameraController({position}) {
    const {camera} = useThree()
    useFrame(({clock}) => {
        let time = clock.elapsedTime / 5
        camera.position.x = Math.sin(time) * position[0]
        camera.position.z = Math.cos(time) * position[2]
        camera.lookAt(0, 0, 0)
    })
    return null
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
        <mesh position={[0, 0, 0]} ref={sphere}>
            <icosahedronGeometry args={[size, 10]}/>
            <meshStandardMaterial color={color}/>
        </mesh>
    )
}

function getRandom(min,max) {
    let positif = Math.random() < 0.5

    // get number between ex 2 and 100
    let nb = Math.floor(Math.random() * (max - min)) + min

    // we can get between -2 and 100
    if (!positif) {
        nb = -nb
    }
    return nb
}

function getRandomTint() {

    const arrayOfColorFunctions = "0123456789abcdef";
    let index = Math.floor(Math.random() * 16);
    let value = arrayOfColorFunctions[index];
    let index2 = Math.floor(Math.random() * 16);
    let value2 = arrayOfColorFunctions[index2];
    return "#" + (value + value2).repeat(3)
}

function Background({quantity}) {
    let refs = useRef([])
    const [spheres, setSpheres] = useState([])
    useEffect(() => {
        let spheresData = []
        for (let i = 0; i < quantity; i++) {
            spheresData.push({
                position: [getRandom(littleStarProximite,littleStarDispersion), getRandom(littleStarProximite,littleStarDispersion), getRandom(littleStarProximite,littleStarDispersion)],
                size: Math.abs( getRandom(0.1,0.5)),
                color: getRandomTint()
            })
        }

        setSpheres(spheresData)
    }, []);

    console.log(spheres)


    return (
        spheres.map((sphere, index) => {
                return (
                    <mesh key={index} position={sphere.position} ref={refs.current[index]}>
                        <icosahedronGeometry args={[sphere.size, 10]}/>
                        <meshStandardMaterial color={sphere.color}/>
                    </mesh>
                )
            }
        )

    )


}

export default App
