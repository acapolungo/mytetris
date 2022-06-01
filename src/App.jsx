import { useEffect, useCallback, useReducer } from 'react';

import './App.css';
import Cell from './components/Emptycell/Cell';


const randomColor = () => {
  const arrayOfColors = ["yellow", "orange", "purple", "blue", "red"];
  return arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
};

function emptyGrid() {
  const rowsOfCells = new Array(11).fill({ color: '', rounded: '' });
  return new Array(22).fill(rowsOfCells);
}

const initialState = {
  tetrisGrid: emptyGrid(),
  currentRowIndex: 0,
  currentShapeColor: randomColor()
}

const reducer = (state = initialState, action) => {

  const {newColor, newGrid, rowIndex} = action.payload;

  switch (action.type) {
    case 'FIRSTSHAPECOLOR':
      return {
        ...state,
        currentShapeColor: newColor,
        tetrisGrid: newGrid,
        currentRowIndex: 0,
      }
    case 'NEXTMOVESHAPE':
      return {
        ...state,
        tetrisGrid: newGrid,
        currentRowIndex: state.currentRowIndex + rowIndex,
      }
      default:
        throw new Error();
  }
}

const checkIfRowBelowExist = (grid, rowIndex) => grid[rowIndex + 1];
const checkIfRowBelowIsTaken = (grid, rowIndex) => grid[rowIndex + 1][5].color === '' ? true : false;

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const introduceShape = useCallback(() => {
    const randomizedColor = randomColor()
    const tetrisGridCopy = [...state?.tetrisGrid];
    const firstRow = [...tetrisGridCopy[0]];

    firstRow[5] = { color: randomizedColor, rounded: 'rounded-md' };
    tetrisGridCopy[0] = firstRow;

    dispatch({
      type: 'FIRSTSHAPECOLOR',
      payload: {
        newColor: randomizedColor,
        newGrid: tetrisGridCopy
    }})

    // setState({
    //   ...state,
    //   currentShapeColor: newColor,
    //   tetrisGrid: tetrisGridCopy,
    //   currentRowIndex: 0
    // })
    // setCurrentRowIndex(0);
    // setCurrentShapeColor(randomColor())
    // setTetrisGrid(tetrisGridCopy);
  }, [state?.tetrisGrid])

  const moveShape = useCallback(() => {
    const tetrisGridCopy = [...state?.tetrisGrid]
    const currentRowCopy = [...tetrisGridCopy[state?.currentRowIndex]];
    const inactiveCellStyle = { color: '', rounded: '' };
    const activeCellStyle = { color: state?.currentShapeColor, rounded: 'rounded-md' };

    if (checkIfRowBelowExist(tetrisGridCopy, state?.currentRowIndex) && checkIfRowBelowIsTaken(tetrisGridCopy, state?.currentRowIndex)) {
      const nextRowCopy = [...tetrisGridCopy[state?.currentRowIndex + 1]];

      currentRowCopy[5] = inactiveCellStyle;
      nextRowCopy[5] = activeCellStyle;
      tetrisGridCopy[state?.currentRowIndex] = currentRowCopy;
      tetrisGridCopy[state?.currentRowIndex + 1] = nextRowCopy;

      dispatch({
        type: 'NEXTMOVESHAPE',
        payload: {
          newGrid: tetrisGridCopy,
          rowIndex: 1
      } })
      // setCurrentRowIndex(rowIndex => rowIndex + 1);
      // setTetrisGrid(tetrisGridCopy);
    } else {
      introduceShape();
    }
  }, [introduceShape, state?.currentRowIndex, state?.currentShapeColor, state?.tetrisGrid])

  useEffect(() => {
    const interval = setInterval(() => {
      moveShape();
    }, 500);
    return () => clearInterval(interval);
  }, [moveShape]);

  useEffect(() => {
    introduceShape();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <div className="mx-auto h-screen flex justify-center items-center bg-gradient-to-br from-purplebg to-cyanbg">

      <div className="w-[35rem] h-[42rem] p-[1.75rem] bg-gradient-to-br from-magenta via-purple to-cyan flex justify-between drop-shadow-xl">
        <section className="w-[19.25rem] h-[100%] bg-greybg grid grid-cols-11 grid-rows-22 text-white">
          {state?.tetrisGrid.flat().map((box, index) => <Cell key={index} color={box.color} roundedshape={box.rounded} />)}
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