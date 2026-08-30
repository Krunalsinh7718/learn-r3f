import { useEffect, useRef, useState } from "react";

export default function Clicker({keyName, increment, color}) {
    
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0));
    const btnRef = useRef(null);
    useEffect(() => {btnRef.current.style.backgroundColor = "black"},[])
    
    useEffect(() => {
       localStorage.setItem(keyName, count);
       
       return () => {
        localStorage.removeItem(keyName);
       }
    }, [count])

    function calcCount(){
        setCount(count => count + 1);
        increment();
    }

    return <>
        <button
            type="button"
            className="counter"
            onClick={() => calcCount()}
            style={{border : `1px solid ${color}`}}
            ref={btnRef}
        >
            Count is {count}
        </button>
    </>
}