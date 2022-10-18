import React, { useState, useRef } from 'react';

const Stopwatch2 = ({ vehicleName, history, setHistory }) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef(null);

  const handleStart = ({ history, setHistory }) => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(increment.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
    setHistory([
      ...history,
      {
        name: vehicleName,
        price: Math.ceil(timer / 60) * 50,
        time: Math.ceil(timer / 60),
      },
    ]);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <>
      <div className="column-left__car-timer">
        <p>{formatTime()}</p>
        {!isPaused && isActive && (
          <p className="column-left__total-price">
            Cena: {Math.ceil(timer / 60) * 50} rsd
          </p>
        )}
      </div>
      <div className="column-left__car-controls">
        {!isActive && !isPaused ? (
          <button className="column-left__button" onClick={handleStart}>
            Start
          </button>
        ) : isPaused ? (
          <button className="column-left__button" onClick={handlePause}>
            Pauziraj
          </button>
        ) : (
          <button className="column-left__button" onClick={handleResume}>
            Nastavi
          </button>
        )}
        <button
          className="column-left__button"
          onClick={handleReset}
          disabled={!isActive}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default Stopwatch2;
