import { useEffect, useState, useCallback } from 'react';

import './App.css';
import Cell from './components/Emptycell/Cell';

function emptyGrid() {
  const rowsOfBoxes = new Array(11).fill({ color: "" });
  return new Array(22).fill(rowsOfBoxes)
}

const checkIfRowBelowExist = (grid: any[], count: number) => {
  const nextLineRow = grid[count + 1]
  if (nextLineRow) {
    return true
  }
  return false
}


function App() {
  const [tetrisGrid, setTetrisGrid] = useState(emptyGrid());
  const [count, setCount] = useState(0);

  const addShapeColor = useCallback(() => {
    const tetrisGridCopy = [...tetrisGrid]
    const currentRow = [...tetrisGridCopy[count]];

    currentRow[5] = { color: 'orange', rounded: 'rounded-md' };
    tetrisGridCopy[count] = currentRow;

    setTetrisGrid(tetrisGridCopy)

    // if (checkIfRowBelowExist(tetrisGridCopy, count)) {
    //   const nextRow = tetrisGridCopy[count + 1];

    //   if (nextRow[5].color !== "") {
    //     console.log('la prochaine est colorée')
    //     setCount(0)
    //   } else {
    //     setTimeout(function () {
    //       currentRow[5] = { color: '' }
    //       setTetrisGrid(tetrisGridCopy)
    //     }, 500)
    //   }
    // }
  }, [tetrisGrid, count])

  const removeShapeColor = useCallback((interval: NodeJS.Timeout) => {
    const tetrisGridCopy = [...tetrisGrid]
    const currentRow = [...tetrisGridCopy[count]];
    if (checkIfRowBelowExist(tetrisGridCopy, count)) {
      const nextRow = tetrisGridCopy[count+1];

      if (nextRow[5].color !== "") {
        console.log('la prochaine est colorée')
        setCount(0)
      } else {
        setTimeout(function () {
          currentRow[5] = { color: '' }
          setTetrisGrid(tetrisGridCopy)
        }, 480)
      }
    }
  }, [tetrisGrid, count])
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (count <= 21) {
        setCount(count => count + 1);
        addShapeColor()
        removeShapeColor(interval)
      } else {
        setCount(0)
      }
    }, 500);

    return () => clearInterval(interval);
  }, [addShapeColor, removeShapeColor, count]);


  return (

    <div className="mx-auto h-screen flex justify-center items-center bg-gradient-to-br from-purplebg to-cyanbg">

      <div className="w-[35rem] h-[42rem] p-[1.75rem] bg-gradient-to-br from-magenta via-purple to-cyan flex justify-between drop-shadow-xl">

        <section className="w-[19.25rem] h-[100%] bg-greybg grid grid-cols-11 grid-rows-22 text-white">
          {tetrisGrid.flat().map((box, index) => <Cell key={index} color={box.color} roundedshape={box.rounded} />)}
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



    // 1. Make a shallow copy of the array
    // 2. Make a shallow copy of the element you want to mutate
    // 3. Update the property you're interested in
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    // 5. Set the state to our new copy
    // 6. SetTimeout the state to remove colored box after 1s
    // 7. the next line is colored then we start again at count 0 otherwise we setTimeout and remove the style