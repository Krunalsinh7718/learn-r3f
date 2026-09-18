import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";


export default create(subscribeWithSelector((set) => {
    return {
        blocksCount : 10,
        blockSeed : 0,
        /**
         * time
         */
        startTime: 0,
        endTime: 0,
        /**
         * phases
         */
        phase: 'ready',
        start: () => {
            set((state) => {
                // console.log(state);
                if(state.phase === 'ready'){
                    // console.log("its playing");    
                    return {phase: 'playing', startTime : Date.now()}
                }

                return {}
            })
        },
        restart: () => {
            set((state) => {
                if(state.phase === 'playing' || state.phase === 'ended'){
                    // console.log("its restart");

                    return {phase: 'ready', blockSeed : Math.random()}
                }
                return {}
            })
        },
        end: () => {
            set((state) => {
                if(state.phase === 'playing'){
                    // console.log("its ended");
                    return {phase: 'ended', endTime : Date.now()}
                }

                return {}
            })
        }
    }
}))