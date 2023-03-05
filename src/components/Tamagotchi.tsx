import { useState, useEffect } from "react";
import Modal from "react-modal";
import tama from "../img/tama.gif";
import tamacry from "../img/tamacry.gif";
import tamafeed from "../img/tamafeed.gif";
import tamadeath from "../img/tamadeath.gif";

const TamagotchiGame = () => {
  const [name, setName] = useState("Antonio");
  const [health, setHealth] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [hunger, setHunger] = useState(100);
  const [isDead, setIsDead] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [speed, setSpeed] = useState(1); // 1 = default 1x
  const [showAlert, setShowAlert] = useState(false);
  const [event, setEvent] = useState("");

  // Health scende di 5 punti ogni 10 sec
  // Se happiness o hunger sono sotto i 50 punti allora Health scende di 5 punti ogni 5 sec
  useEffect(() => {
    const healthTimer = setInterval(
      () => {
        if (!isDead) {
          // Controllo se il Tamagotchi è morto
          setHealth((health) => Math.max(health - 5, 0));
        }
      },
      happiness < 50 || hunger < 50 ? 5000 / speed : 10000 / speed
    );
    return () => clearInterval(healthTimer);
  }, [happiness, hunger, speed, isDead]);

  // Hunger scende di 10 punti ogni 15 sec
  useEffect(() => {
    const hungerTimer = setInterval(() => {
      if (!isDead) {
        // Controllo se il Tamagotchi è morto
        setHunger((hunger) => Math.max(hunger - 10, 0));
      }
    }, 15000 / speed);
    return () => clearInterval(hungerTimer);
  }, [speed, isDead]);

  // Happiness scende di 10 punti ogni 10 sec
  // Se hunger è sotto i 50 punti allora happiness scende di 10 punti ogni 5 sec
  useEffect(() => {
    const happinessTimer = setInterval(
      () => {
        // Controllo se il Tamagotchi è morto
        if (!isDead) {
          setHappiness((happiness) => Math.max(happiness - 10, 0));
        }
      },
      hunger < 50 ? 5000 / speed : 10000 / speed
    );
    return () => clearInterval(happinessTimer);
  }, [hunger, speed, isDead]);

  // Controllo di health ogni volta che si aggiorna ed in caso a 0 setta IsDead in true
  useEffect(() => {
    if (health <= 0) {
      setIsDead(true);
    }
  }, [health]);

  // Tasto CURE incrementa health di 10 e diminuiscee happiness di 5
  const cure = () => {
    setHealth((health) => Math.min(health + 10, 100));
    setHappiness((happiness) => Math.max(happiness - 5, 0));
  };

  // Tasto PLAY incrementa happiness di 10 e diminuiscee hunger di 5
  const play = () => {
    setHappiness((happiness) => Math.min(happiness + 10, 100));
    setHunger((hunger) => Math.max(hunger - 5, 0));
  };

  // Tasto FEED incrementa hunger di 10 e diminuiscee health di 5
  const feed = () => {
    setHunger((hunger) => Math.min(hunger + 10, 100));
    setHealth((health) => Math.max(health - 5, 0));
  };

  // Cambia immagine del tamagotchi quando è triste, affamato o morto
  const getTamagotchiImage = () => {
    if (isDead) {
      return tamadeath;
    } else if (happiness < 50) {
      return tamacry;
    } else if (hunger < 50) {
      return tamafeed;
    } else {
      return tama;
    }
  };

  // variabile per il tempo randomico tra 1 e 120000 / 2 minuti
  const getRandomTime = () => Math.floor(Math.random() * 120000) + 1;

  // generare imprevisti random
  const generateRandomEvent = () => {
    const events = [
      {
        type: "happiness",
        value: 10,
        message: `Oh no! ${name} had a nightmare. -10 to Happiness!`,
      },
      {
        type: "happiness",
        value: 20,
        message: `Oh no! ${name} has lost the episode of his favorite TV series. -20 to Happiness!`,
      },
      {
        type: "hunger",
        value: 10,
        message: `Oh no! ${name} remembered he didn't have a snack. -10 to Hunger!`,
      },
      {
        type: "hunger",
        value: 20,
        message: `Oh no! ${name} caught the cat eating his lunch. -20 to Hunger!`,
      },
      {
        type: "health",
        value: 10,
        message: `Oh no! ${name} has a sudden headache. -10 to Health!`,
      },
      {
        type: "health",
        value: 20,
        message: `Oh no! ${name} has diarrhea. -20 to Health!`,
      },
      {
        type: "health",
        value: 20,
        message: `Oh no! ${name} hit the table with his little toe. -20 to Health!`,
      },
    ];

    // imprevisto random tra gli events
    let randomEvent = events[Math.floor(Math.random() * events.length)];

    // Abbassa di 20 o di 10 una stat a seconda dell'evento e mostra il messagge in un allert
    if (randomEvent.type === "happiness") {
      setHappiness((prevState) => prevState - randomEvent.value);
    } else if (randomEvent.type === "hunger") {
      setHunger((prevState) => prevState - randomEvent.value);
    } else if (randomEvent.type === "health") {
      setHealth((prevState) => prevState - randomEvent.value);
    }
    setEvent(randomEvent.message);
    if (!isDead) {
      setShowAlert(true);
    }
  };

  // Genera un imprevisto random in un tempo random
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDead) {
        // Controllo se il Tamagotchi è morto
        generateRandomEvent();
      }
    }, getRandomTime() / speed);
    return () => clearInterval(interval);
  }, [isDead, name, speed]);

  // modal
  const modal = () => {
    setIsOpen(true);
  };

  // reset
  const resetGame = () => {
    setHealth(100);
    setHappiness(100);
    setHunger(100);
    setIsDead(false);
    setIsOpen(false);
    setSpeed(1);
  };

  return (
    <div className="flex flex-col mt-20 mb-60">
      <div className="modal-container">
        <Modal
          className="w-[310px] h-[310px] mx-auto text-white mt-[300px] border-4 bg-gradient-to-b p-10 from-[#0A0C0F] to-[#101820]"
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Settings Modal"
        >
          <div className="modal-header relative">
            <i
              onClick={() => setIsOpen(false)}
              className="text-4xl text-white cursor-pointer absolute left-[220px] -top-[28px] fas fa-times hover:text-violet-500"
            ></i>
            <div className="text-2xl mb-2 font-bold text-center">
              Change Name
            </div>
          </div>
          <div className="-ml-5 modal-content text-black font-bold flex justify-between">
            <input
              className="w-18"
              type="text"
              placeholder="Change Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="p-1 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 ml-3"
              onClick={() => setIsOpen(false)}
            >
              Save
            </button>
          </div>
          <div className="text-2xl mb-2 font-bold text-center mt-2">
            Change Velocity
          </div>
          <div className="flex flex-col mt-2 text-black font-bold">
            <button
              className="p-1 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 ml-3"
              onClick={() => setSpeed(1)}
            >
              Default
            </button>
            <button
              className="p-1 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 ml-3"
              onClick={() => setSpeed(3)}
            >
              Fast
            </button>
            <button
              className="p-1 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 ml-3"
              onClick={() => setSpeed(6)}
            >
              Very Fast
            </button>
          </div>
          <div className="mt-1 text-center">current velocity: {speed}x</div>
        </Modal>
      </div>
      <div className="text-white mx-auto flex flex-col items-center w-[458px] relative shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] border-4 border-y-teal-700 border-x-teal-500">
        {showAlert ? (
          <div
            className={
              "text-white px-6 py-4 w-[370px] absolute mb-4 right-10 top-[316px] bg-gradient-to-b from-[#0A0C0F] to-[#101820] border-4 border-y-teal-700 border-x-teal-500"
            }
          >
            <div className="text-xl mr-5">
              <i className="fas fa-bell mb-2" />
              <i
                onClick={() => setShowAlert(false)}
                className="text-2xl hover:text-violet-500 cursor-pointer fas fa-times absolute right-4 top-2"
              ></i>
            </div>
            <span className="mr-8">{event}</span>
          </div>
        ) : null}
        <i
          onClick={modal}
          className="text-3xl text-white hover:text-violet-500 cursor-pointer fas fa-bars absolute top-2 left-[398px]"
        ></i>
        {isDead && (
          <button
            onClick={() => resetGame()}
            className="absolute top-16 items-center border-4 border-y-teal-700 border-x-teal-500 bg-gradient-to-b from-[#0A0C0F] to-[#101820]"
          >
            <div className="p-4">
              <div className="text-6xl text-red-600 font-bold">Game over!</div>
              <div className="text-2xl text-white font-bold mt-2">
                Click HERE to reset the game
              </div>
            </div>
          </button>
        )}
        <div className="text-3xl font-bold w-[400px] my-2">
          <em className="text-teal-500 text-2xl">Name:</em> {name}
        </div>
        <div>
          <div className="mx-auto w-[400px] h-[400px] bg-[url('../template/tama_wall.png')] bg-cover border-4 border-y-teal-700 border-x-teal-500">
            <img
              src={getTamagotchiImage()}
              className="w-[240px] h-[240px] mt-10 mx-auto"
              alt="Img Tamagotchi"
            />
          </div>
          <div className="mt-2 flex justify-between text-2xl font-bold mb-4">
            <div>
              <div className="text-center">
                <div className="text-lime-700 underline underline-offset-4">
                  Health
                </div>
                <div className="mb-2">{health}</div>
              </div>
              <button
                disabled={isDead}
                className="p-2 w-32 border-4 border-lime-700 rounded hover:bg-lime-700 active:bg-lime-900"
                onClick={cure}
              >
                CURE
              </button>
            </div>
            <div>
              <div className="text-center">
                <div className="text-yellow-700 mx-2 underline underline-offset-4">
                  Happiness
                </div>
                <div className="mb-2">{happiness}</div>
              </div>
              <button
                disabled={isDead}
                className="p-2 w-32 border-4 border-yellow-700 rounded mx-2 hover:bg-yellow-700 active:bg-yellow-900"
                onClick={play}
              >
                PLAY
              </button>
            </div>
            <div>
              <div className="text-center">
                <div className="text-sky-700 underline underline-offset-4">
                  Hunger
                </div>
                <div className="mb-2">{hunger}</div>
              </div>

              <button
                disabled={isDead}
                className="p-2 w-32 border-4 border-sky-700 rounded hover:bg-sky-700 active:bg-sky-900"
                onClick={feed}
              >
                FEED
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TamagotchiGame;
