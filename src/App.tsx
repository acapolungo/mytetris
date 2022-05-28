import { useEffect, useState, useCallback } from 'react';

import './App.css';
import Cell from './components/Emptycell/Cell';

function emptyGrid() {
  const rowsOfCells = new Array(11).fill({ color: '', rounded: '' });
  return new Array(22).fill(rowsOfCells);
}

const checkIfRowBelowExist = (grid: any[], rowIndex: number) => grid[rowIndex + 1] ? true : false;
const checkIfRowBelowisTaken = (grid: any[], rowIndex: number) => grid[rowIndex + 1][5].color === '' ? true : false;


function App() {
  const [tetrisGrid, setTetrisGrid] = useState(emptyGrid());
  const [rowIndex, setRowIndex] = useState(0);

  const introduceShape = useCallback(() => {
    const tetrisGridCopy = [...tetrisGrid]
    const firstRow = [...tetrisGridCopy[0]];

    firstRow[5]= { color: 'orange', rounded: 'rounded-md' }
    tetrisGridCopy[0] = firstRow;
    setTetrisGrid(tetrisGridCopy)
  }, [tetrisGrid])

  const addShapeColor = useCallback(() => {

    const tetrisGridCopy = [...tetrisGrid]
    const currentRow = [...tetrisGridCopy[rowIndex]];
    const activeCellStyle = { color: 'orange', rounded: 'rounded-md' }
    const inactiveCellStyle = { color: '', rounded: '' };

    if (checkIfRowBelowExist(tetrisGridCopy, rowIndex) && checkIfRowBelowisTaken(tetrisGridCopy, rowIndex)) {
      const nextRow = [...tetrisGridCopy[rowIndex + 1]];
      currentRow[5] = inactiveCellStyle;
      nextRow[5] = activeCellStyle;
      tetrisGridCopy[rowIndex] = currentRow;
      tetrisGridCopy[rowIndex + 1] = nextRow;

      setRowIndex(rowIndex => rowIndex + 1);
      setTetrisGrid(tetrisGridCopy)
    } else {
      setRowIndex(0)
      introduceShape()
    }

  }, [tetrisGrid, rowIndex, introduceShape])

  useEffect(() => {
    const interval = setInterval(() => {
      addShapeColor();
    }, 500);

    return () => clearInterval(interval);

    
  }, [addShapeColor]);

  useEffect(() => {
    introduceShape();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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