import React from 'react';
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
  const vehicles = [
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
  ];

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
