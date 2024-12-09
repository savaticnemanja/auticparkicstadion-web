import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./index.scss";
import {
  empty1,
  empty2,
  empty3,
  empty4,
  empty5,
  empty6,
  singleSeater1,
  singleSeater2,
  singleSeater3,
  singleSeater4,
  singleSeater5,
  singleSeater6,
  twoSeater1,
  twoSeater2,
} from "./assets/index";
import Stopwatch from "./Stopwatch";
import EndDayDialog from "./EndDayDialog";

function App() {
  const [history, setHistory] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const vehicles = [
    // { id: 1, type: 1, img: singleSeater1, name: "Audi Q7", cost: 75 },
    { id: 3, type: 1, img: singleSeater3, name: "Quad", cost: 75 },
    { id: 4, type: 1, img: singleSeater4, name: "Motor", cost: 75 },
    { id: 5, type: 1, img: singleSeater5, name: "Motor", cost: 75 },
    { id: 6, type: 1, img: singleSeater6, name: "Motor", cost: 75 },
    { id: 2, type: 1, img: singleSeater2, name: "Džip", cost: 75 },
    { id: 2, type: 1, img: empty6, name: "Džip", cost: 75 },
    { id: 7, type: 2, img: twoSeater1, name: "BMW X6", cost: 80 },
    { id: 8, type: 2, img: twoSeater2, name: "Mercedes GLC AMG", cost: 80 },
    { id: 9, type: 2, img: empty1, name: "Mercedes GLC AMG", cost: 80 },
    { id: 10, type: 2, img: empty2, name: "Mercedes GLC AMG", cost: 80 },
    { id: 11, type: 2, img: empty3, name: "Mercedes GLC AMG", cost: 80 },
    { id: 12, type: 2, img: empty4, name: "Mercedes GLC AMG", cost: 80 },
  ];

  const totalEarnings = `${history?.reduce((acc, el) => acc + el?.price, 0)}rsd`;

  const templateParams = {
    date: new Date().toISOString().split("T")[0],
    totalEarnings,
  };

  const sendEmail = () => {
    emailjs.send("service_479xn4w", "template_wg0omcs", templateParams, "yXqwmaxm-PpofwIqK").then(
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
      {isDialogOpen && <EndDayDialog sendEmail={sendEmail} setIsDialogOpen={setIsDialogOpen} />}
      <div className="wrapper">
        <div className="column-wrapper">
          <div className="column-left">
            <div className="column-left__car">
              <p className="top-heading">Jednosed - 75 rsd/min</p>
            </div>
            {vehicles
              .filter((el) => el.type === 1)
              .map((el) => (
                <div key={el.id} className="column-left__car">
                  <img src={el.img} alt="" />
                  <Stopwatch vehicleName={el.name} costPerMinute={el.cost} history={history} setHistory={setHistory} />
                </div>
              ))}
          </div>
          <div className="column-right">
            <div className="column-right__car">
              <p className="top-heading">Dvosed - 80 rsd/min</p>
            </div>
            {vehicles
              .filter((el) => el.type === 2)
              .map((el) => (
                <div key={el.id} className="column-left__car">
                  <img src={el.img} alt="" />
                  <Stopwatch vehicleName={el.name} costPerMinute={el.cost} history={history} setHistory={setHistory} />
                </div>
              ))}
          </div>
        </div>
        <div className="bottom-bar">
          <button className="bottom-bar__button" onClick={() => document.body.requestFullscreen()}>
            POVEĆAJ EKRAN
          </button>
          <button onClick={() => setIsDialogOpen(true)} className="bottom-bar__button">
            KRAJ RADNOG VREMENA
          </button>
          <button className="bottom-bar__button" onClick={() => document.exitFullscreen()}>
            SMANJI EKRAN
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
