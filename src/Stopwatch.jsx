import React, { useState, useRef } from "react";

const Stopwatch = ({ vehicleName, costPerMinute, history, setHistory }) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + calculateIncrement(prevTimer));
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + calculateIncrement(prevTimer));
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
        price: Math.ceil(timer / 60) * costPerMinute,
        time: Math.ceil(timer / 60),
      },
    ]);
  };

  const calculateIncrement = (currentTimer) => {
    const currentSecond = currentTimer % 60;

    if (currentSecond >= 10 && currentSecond < 20) {
      return 1.2;
    }

    return 1;
  };

  const formatTime = () => {
    const getSeconds = `0${Math.floor(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const seconds = timer % 60 <= 5 ? 0 : costPerMinute;

  return (
    <>
      <div className="column-left__car-timer">
        <p>{formatTime()}</p>
        {!isPaused && isActive && <p className="column-left__total-price">Cena: {Math.floor(timer / 60) * costPerMinute + seconds}rsd</p>}
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
        <button className="column-left__button" onClick={handleReset} disabled={!isActive}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Stopwatch;
