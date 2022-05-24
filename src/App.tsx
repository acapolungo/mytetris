import React, { useEffect, useState } from 'react';

import './App.css';
import Cell from './components/Emptycell/Cell';


function emptyGrid() {
  const rowsOfBoxes = new Array(11).fill({ color: "" });
  return new Array(22).fill(rowsOfBoxes)
}



function App() {
  const [tetrisGrid, updateTetrisGrid] = useState(emptyGrid());
  const [count, setCount] = useState(0);

  const updateGrid = () => {
    // 1. Make a shallow copy of the array
    const arrayCopy = [...tetrisGrid]
    // 2. Make a shallow copy of the element you want to mutate
    const currentRow = [...arrayCopy[count]];
    // const isEmpty = Object.keys(currentRow[5].color).length === 0;
    // console.log(isEmpty)
    // 3. Update the property you're interested in
    currentRow[5] = { color: 'orange', rounded: 'rounded-md' };
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    arrayCopy[count] = currentRow;
    // 5. Set the state to our new copy
    updateTetrisGrid(arrayCopy)
    // 6. SetTimeout the state to remove colored box after 1s

    if (arrayCopy[count+1]) {
      const nextRow = arrayCopy[count+1];
      // console.log(nextRow[5].color !== "")
      if (nextRow[5].color !== "") {
        console.log('la prochaine est colorée')
        setCount(0)
      } else {
        setTimeout(function () {
          currentRow[5] = { color: '' }
          updateTetrisGrid(arrayCopy)
        }, 500)
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count + 1);
      updateGrid()
    }, 500);

    if (count > 21) {
      setCount(0)
    }
    return () => clearInterval(interval);
  }, [updateGrid]);


  return (

    <div className="mx-auto h-screen flex justify-center items-center bg-gradient-to-br from-purplebg to-cyanbg">

      <div className="w-[35rem] h-[42rem] p-[1.75rem] bg-gradient-to-br from-magenta via-purple to-cyan flex justify-between drop-shadow-xl">

        <section className="w-[19.25rem] h-[100%] bg-greybg grid grid-cols-11 grid-rows-22 text-white">
          {/* {tetrisGrid.flat().map((box, index) => <div key={index} className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid ${box.color}`}></div>)} */}
          {tetrisGrid.flat().map((box, index) => <Cell key={index} color={box.color} roundedshape={box.rounded} />)}
          {/* <div className="w-[1.75rem] h-[1.75rem] border-bordergrid border-[0.05rem] rounded bg-s-yellow"></div> */}
        </section>

        <section className="w-[10.5rem] h-[100%] rounded-sm flexflex-wrap">
          <h1 className="text-[2.5rem] h-[12%] text-cyan">my<span className="font-bold">Tetris</span></h1>
          <section className="w-[100%]">
            <h3 className="w-[10.5rem] text-[1.5rem] text-white shadow-lg drop-shadow-md-black">Next</h3>
            <div className="w-[100%] h-[7rem] bg-greybg rounded-md flex flex-wrap justify-center items-center content-center">
              <div className="w-[100%] flex justify-center">
                <div className="w-[1.75rem] h-[1.75rem] border-redbg border-[0.05rem] rounded bg-gradient-orange"></div>
              </div>
              <div className="w-[1.75rem] h-[1.75rem] border-redbg border-[0.05rem] rounded bg-gradient-orange"></div>
              <div className="w-[1.75rem] h-[1.75rem] border-redbg border-[0.05rem] rounded bg-gradient-orange"></div>
              <div className="w-[1.75rem] h-[1.75rem] border-redbg border-[0.05rem] rounded bg-gradient-orange"></div>
            </div>
          </section>
          <section className="w-[100%] mt-[1rem]">
            <h3 className="w-[10.5rem] text-[1.5rem] text-white shadow-lg drop-shadow-md-black">Score</h3>
            <div className="w-[100%] h-[2.625rem] text-[1.5rem] text-grey-txt flex items-center bg-greybg rounded-md text-white px-[10px]">125</div>
          </section>
        </section>
      </div>

    </div >
  );
}

export default App;



// const arrayOfGradients = ['bg-gradient-yellow', 'bg-gradient-orange','bg-gradient-purple','bg-gradient-blue','bg-gradient-red',]
// const row = document.querySelector(`#row${counter}`);
// row?.classList.add(gradients[Math.floor(Math.random() * gradients.length)])
// const interval = setInterval(() => {
//   setCounter(counter => counter + 1)

//   if (counter <= 22) {
//     console.log(row)
//     console.log(counter)
//     row?.classList.add('bg-gradient-orange')
//   } else {
//     setCounter(1)
//     // setColor(arrayOfGradients[Math.floor(Math.random() * arrayOfGradients.length)])
//   }
// }, 1000);

// setTimeout(function () {
//   row?.classList.remove('bg-gradient-orange');
// }, 2000);

// return () => clearInterval(interval);