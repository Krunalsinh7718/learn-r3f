import { useKeyboardControls } from "@react-three/drei"
import useGame from './stores/useGame.js';
import { useEffect, useState, useRef } from "react";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
    const time = useRef();

     const forward = useKeyboardControls((state) => state.forward);
     const backward = useKeyboardControls((state) => state.backward);
     const rightward = useKeyboardControls((state) => state.rightward);
     const leftward = useKeyboardControls((state) => state.leftward);
     const jump = useKeyboardControls((state) => state.jump);

     
     const phase = useGame((state) => state.phase);
     const restart = useGame((state) => state.restart);
  
     useEffect(() => {

        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState();
            let elapsedTime = 0;
            if(state.phase === 'playing'){
                elapsedTime = Date.now() - state.startTime;
            }else if(state.phase === 'ended'){
                elapsedTime = state.endTime - state.startTime;
            }

            elapsedTime /= 1000;
            elapsedTime = elapsedTime.toFixed(2);
            // console.log(elapsedTime);

            if(time.current){
                time.current.textContent = elapsedTime;
            }
            
            
         })
  
         return () => {
            unsubscribeEffect()
         }
     },[])

    


    return <div className="Interface">
        {/* Time */}
        <div className="time" ref={time}>0.00</div>
        {/* Restart */}
       { phase === 'ended' && <div className="restart" onClick={ () => {
           console.log("restart clicked and phase is "+ phase);
           restart()
            console.log("phase changed to "+ phase);
            
        }}>Restart</div>}
        {/* Controls */}
        <div className="controls">
            <div className="raw">
                <div className={`key ${forward ? 'active' : ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key ${leftward ? 'active' : ''}`}></div>
                <div className={`key ${backward ? 'active' : ''}`}></div>
                <div className={`key ${rightward ? 'active' : ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key large ${jump ? 'active' : ''}`}></div>
            </div>
        </div>
    </div>
}