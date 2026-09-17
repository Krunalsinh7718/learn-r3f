import GameLights from './GameLights.jsx'
import GameLevel, { BlockAxe, BlockLimbo, BlockSpinner } from './GameLevel.jsx';
import { Physics } from '@react-three/rapier';
import Player from './Player.jsx';
import useGame from './stores/useGame.js';

export default function GameExperience() {
    const blocksCount = useGame(() => {})
    return <>
        <Physics debug={false}>
            <GameLights />
            <GameLevel />
            <Player />
        </Physics>
    </>;
}
