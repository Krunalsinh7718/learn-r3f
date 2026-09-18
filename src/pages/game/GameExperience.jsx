import GameLights from './GameLights.jsx'
import GameLevel, { BlockAxe, BlockLimbo, BlockSpinner } from './GameLevel.jsx';
import { Physics } from '@react-three/rapier';
import Player from './Player.jsx';
import useGame from './stores/useGame.js';

export default function GameExperience() {
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame((state) => state.blockSeed)
    
    return <>
        <color args={['skyblue']} attach="background"/>
        <Physics debug={false}>
            <GameLights />
            <GameLevel blocksCount={blocksCount} seed={blocksSeed}/>
            <Player />
        </Physics>
    </>;
}
