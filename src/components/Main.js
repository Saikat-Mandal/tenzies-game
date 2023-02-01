import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
export default function Main() {
  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // getting random array

  function getRandomArray() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateDie());
    }
    return arr;
  }

  // creating array with state
  const [diceArray, setDiceArray] = useState(getRandomArray());

  //handleClick
  function handleClick() {
    setDiceArray((prevArr) =>
      prevArr.map((item) => {
        return item.isHeld ? item : generateDie();
      })
    );
  }

  //holdDie function to console log id
  function holdDie(newId) {
    setDiceArray((prevArr) =>
      prevArr.map((item) => {
        return item.id === newId ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  const finalArray = diceArray.map((item) => {
    return (
      <Die
        key={item.id}
        value={item.value}
        isHeld={item.isHeld}
        clickEvent={() => {
          holdDie(item.id);
        }}
      />
    );
  });

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{finalArray}</div>
      <button className="roll-btn" type="" onClick={handleClick}>
        Roll
      </button>
    </main>
  );
}
