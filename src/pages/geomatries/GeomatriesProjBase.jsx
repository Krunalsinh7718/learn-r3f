export default function GeomatriesProjBase(){
    return <>
        <mesh receiveShadow rotation={[Math.PI * -0.5, 0.0, 0]}  position={[0,-1,0]}>
            <circleGeometry args={[5.1, 100]}/>
            <meshStandardMaterial />
        </mesh>
    </>
}