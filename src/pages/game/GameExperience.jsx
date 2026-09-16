import { OrbitControls } from '@react-three/drei'
import GameLights from './GameLights.jsx'
import GameLevel from './GameLevel.jsx';

export default function GameExperience() {
    return <>
        <OrbitControls makeDefault />
        <GameLights />
        <GameLevel />
    </>;
}
