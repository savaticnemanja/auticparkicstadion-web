import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./index.scss";
import {
  singleSeater1,
  singleSeater2,
  singleSeater3,
  singleSeater4,
  twoSeater1,
  twoSeater2,
  twoSeater3,
} from "./assets/index";
import StopWatch from "./Stopwatch";
import StopWatch2 from "./Stopwatch2";
import EndDayDialog from "./EndDayDialog";

function App() {
  const [history, setHistory] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const vehicles = [
    {
      id: 1,
      type: 1,
      img: singleSeater1,
      name: "Audi Q7",
    },
    {
      id: 2,
      type: 1,
      img: singleSeater2,
      name: "Džip",
    },
    {
      id: 3,
      type: 1,
      img: singleSeater3,
      name: "Quad",
    },
    {
      id: 4,
      type: 1,
      img: singleSeater4,
      name: "Motor",
    },
    {
      id: 5,
      type: 2,
      img: twoSeater1,
      name: "BMW X6",
    },
    {
      id: 6,
      type: 2,
      img: twoSeater2,
      name: "Mercedes GLC AMG",
    },
    {
      id: 7,
      type: 2,
      img: twoSeater3,
      name: "Mercedes GLS 63",
    },
  ];

  const totalEarnings = `${history?.reduce(
    (acc, el) => acc + el?.price,
    0
  )}rsd`;

  const templateParams = {
    date: new Date().toISOString().split("T")[0],
    totalEarnings: totalEarnings,
  };

  const sendEmail = () => {
    emailjs
      .send(
        "service_lpjbk0x",
        "template_wg0omcs",
        templateParams,
        "ScsG4p94Aq4ACY0h4"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  return (
    <>
      {isDialogOpen && (
        <EndDayDialog sendEmail={sendEmail} setIsDialogOpen={setIsDialogOpen} />
      )}
      <div className="wrapper">
        <div className="column-wrapper">
          <div className="column-left">
            <div className="column-left__car">
              <p className="top-heading">50 rsd/min</p>
            </div>
            {vehicles
              ?.filter((el) => el.type === 1)
              .map((el) => (
                <div key={el.id} className="column-left__car">
                  <img src={el.img} alt="" />
                  <StopWatch
                    vehicleName={el.name}
                    history={history}
                    setHistory={setHistory}
                  />
                </div>
              ))}
          </div>
          <div className="column-right">
            <div className="column-right__car">
              <p className="top-heading">50 rsd/min</p>
            </div>
            {vehicles
              ?.filter((el) => el.type === 2)
              .map((el) => (
                <div key={el.id} className="column-left__car">
                  <img src={el.img} alt="" />
                  <StopWatch2
                    vehicleName={el.name}
                    history={history}
                    setHistory={setHistory}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="bottom-bar">
          <button
            className="bottom-bar__button"
            onClick={() => document.body.requestFullscreen()}
          >
            POVEĆAJ EKRAN
          </button>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bottom-bar__button"
          >
            KRAJ RADNOG VREMENA
          </button>
          <button
            className="bottom-bar__button"
            onClick={() => document.exitFullscreen()}
          >
            SMANJI EKRAN
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
