import { OrbitControls } from '@react-three/drei'
import GameLights from './GameLights.jsx'
import GameLevel, { BlockAxe, BlockLimbo, BlockSpinner } from './GameLevel.jsx';
import { Physics } from '@react-three/rapier';
import Player from './Player.jsx';

export default function GameExperience() {
    return <>
        <OrbitControls makeDefault />
        <Physics debug>
            <GameLights />
            <GameLevel />
            <Player />
        </Physics>
    </>;
}
