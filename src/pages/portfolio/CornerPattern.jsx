import CornerPatternEffect from "./CornerPatternEffect"

export default function CornerPattern(props){
    const effect = new CornerPatternEffect(props);
    return <primitive ref={props.ref} object={effect}/>
}