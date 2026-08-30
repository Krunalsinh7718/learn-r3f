import { useEffect, useMemo, useRef, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Hello from './components/Hello'
import Clicker from './components/Clicker'
import People from './components/People'

function App({ clickersCount }) {

  const [visibleClicker, setVisibleClicker] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const previousCount = useRef();

  const colors = useMemo(() => {

    const colors = [];
    for (let i = 0; i < clickersCount; i++) {
      colors[i] = `hsl(${Math.random() * 360}deg, 100%, 70%)`;
    }
    return colors;
  }, [clickersCount])

  useEffect(() => {
    previousCount.current = totalCount;
  },[totalCount])

  function increment() {
    setTotalCount(count => count + 1);
  }

  return (
    <>
      <section className="center">

        <Hello></Hello>
      </section>
      <div className="ticks"></div>
      <section className="center border-top">
        <People></People>
      </section>
      <div className="ticks"></div>
      <section className="center border-top">
        <button onClick={() => setVisibleClicker(visibleClicker => !visibleClicker)}>Toggle Clicker</button>
        <span>Previous Count : {previousCount.current}</span>
        <span>Total Count : {totalCount}</span>
        {
          visibleClicker &&
          [...Array(clickersCount)].map(
            (element, index) =>
              <Clicker
                key={index}
                keyName={`counter${index}`}
                increment={increment}
                color={colors[index]}
              ></Clicker>
          )
        }
      </section>
      <div className="ticks"></div>

      <section id="spacer"></section>
    </>
  )
}

export default App
