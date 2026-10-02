export default function RealisticProjBase(){
    return <>
        <mesh receiveShadow rotation={[Math.PI * -0.5, 0.0, 0]}  position={[0,-1,0]}>
            <circleGeometry args={[5.2, 100]}/>
            <meshStandardMaterial color={'#078d77'}/>
        </mesh>
    </>
}