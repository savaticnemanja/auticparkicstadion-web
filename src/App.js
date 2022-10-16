import React, { useState, useEffect } from 'react';
import './index.scss';
import {
  singleSeater1,
  singleSeater2,
  twoSeater1,
  twoSeater2,
  twoSeater3,
} from './assets/index';
import StopWatch from './Stopwatch';
import StopWatch2 from './Stopwatch2';

function App() {
  const [stop, setStop] = React.useState(false);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      type: 1,
      img: singleSeater1,
    },
    {
      id: 2,
      type: 1,
      img: singleSeater2,
    },
    {
      id: 3,
      type: 2,
      img: twoSeater1,
    },
    {
      id: 4,
      type: 2,
      img: twoSeater2,
    },
    {
      id: 5,
      type: 2,
      img: twoSeater3,
    },
  ]);

  function stopTimer(status) {
    setStop(status);
  }
  const handleTimerStart = (id) => {
    const newState = vehicles.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          startTime: new Date(),
        };
      }
      return el;
    });
    setVehicles(newState);
  };

  const handleTimerStop = (id) => {
    const newState = vehicles.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          endTime: new Date(),
        };
      }
      return el;
    });
    setVehicles(newState);
  };

  const handleTimerReset = () => {
    console.log('test');
  };

  useEffect(() => {
    console.log(vehicles);
  }, [vehicles]);

  return (
    <>
      <div className="wrapper">
        <div className="column-wrapper">
          <div className="column-left">
            <div className="column-left__car">
              <p className="top-heading">Za jednu osobu (40 rsd/min)</p>
            </div>
            {vehicles
              ?.filter((el) => el.type === 1)
              .map((el) => (
                <div key={el.id} className="column-left__car">
                  <img src={el.img} alt="" />
                  <StopWatch />
                </div>
              ))}
          </div>
          <div className="column-right">
            <div className="column-right__car">
              <p className="top-heading">Za dve osobe (50 rsd/min)</p>
            </div>
            {vehicles
              ?.filter((el) => el.type === 2)
              .map((el) => (
                <div key={el.id} className="column-left__car">
                  <img src={el.img} alt="" />
                  <StopWatch2 />
                </div>
              ))}
          </div>
        </div>
        <div className="bottom-bar">
          <button onClick={() => document.body.requestFullscreen()}>
            POVEĆAJ EKRAN
          </button>
          <button onClick={() => document.exitFullscreen()}>
            SMANJI EKRAN
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
