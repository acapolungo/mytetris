import { useEffect, useCallback, useReducer } from 'react';
import './App.css';
import Cell from './components/Emptycell/Cell';
import NextShapePreview from './components/NextShapePreview/NextShapePreview';


const randomColor = () => {
  const arrayOfColors = ["yellow", "orange", "purple", "blue", "red"];
  return arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
};

function emptyGrid() {
  const rowsOfCells = new Array(11).fill({ color: '', rounded: '' });
  return new Array(22).fill(rowsOfCells);
}

function emptyNextShapeGrid() {
  const rowsOfCells = new Array(6).fill({ color: '', rounded: '' });
  return new Array(5).fill(rowsOfCells);
}

const initialState = {
  tetrisGrid: emptyGrid(),
  currentRowIndex: 0,
  currentShapeColor: randomColor(),
  nextShapeGrid: emptyNextShapeGrid(),
  nextShapeColor: randomColor(),
}

const reducer = (state = initialState, action) => {
  const { tetrisGrid, currentRowIndex, currentShapeColor, nextShapeColor } = state;

  switch (action.type) {
    case 'INTRODUCE_SHAPE':
      const tetrisGridCopy = [...tetrisGrid];
      const firstRow = [...tetrisGridCopy[0]];

      firstRow[5] = { color: nextShapeColor, rounded: 'rounded-md' };
      tetrisGridCopy[0] = firstRow;

      return {
        ...state,
        currentShapeColor: nextShapeColor,
        tetrisGrid: tetrisGridCopy,
        currentRowIndex: 0,
        nextShapeColor: randomColor()
      }
    case 'MOVE_COLOR_SHAPE':
      const secondTetrisGridCopy = [...tetrisGrid]
      const currentRowCopy = [...secondTetrisGridCopy[currentRowIndex]];
      const nextRowCopy = [...secondTetrisGridCopy[currentRowIndex + 1]];
      const inactiveCellStyle = { color: '', rounded: '' };
      const activeCellStyle = { color: currentShapeColor, rounded: 'rounded-md' };

      currentRowCopy[5] = inactiveCellStyle;
      nextRowCopy[5] = activeCellStyle;
      secondTetrisGridCopy[currentRowIndex] = currentRowCopy;
      secondTetrisGridCopy[currentRowIndex + 1] = nextRowCopy;
      return {
        ...state,
        tetrisGrid: secondTetrisGridCopy,
        currentRowIndex: currentRowIndex + 1,
      }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const checkIfNextMovePossible = (grid, rowIndex) => {

  const checkIfRowBelowExist = (grid, rowIndex) => grid[rowIndex + 1];
  const checkIfRowBelowIsTaken = (grid, rowIndex) => grid[rowIndex + 1][5].color === '';

  return checkIfRowBelowExist(grid, rowIndex) && checkIfRowBelowIsTaken(grid, rowIndex)
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const introduceShape = useCallback(() => {
    dispatch({
      type: 'INTRODUCE_SHAPE'
    })
  }, [])

  const moveShape = useCallback(() => {
    const { tetrisGrid, currentRowIndex } = state;

    if (checkIfNextMovePossible(tetrisGrid, currentRowIndex)) {
      dispatch({
        type: 'MOVE_COLOR_SHAPE'
      })
    } else {
      introduceShape();
    }
  }, [introduceShape, state])

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
        <section className="w-[19.25rem] h-[100%] bg-greybg grid grid-cols-11 grid-rows-22">
          {state.tetrisGrid.flat().map((cell, index) => <Cell key={index} color={cell.color} roundedshape={cell.rounded} />)}
        </section>

        <section className="w-[10.5rem] h-[100%] rounded-sm flexflex-wrap">
          <h1 className="text-[2.5rem] h-[12%] text-cyan">my<span className="font-bold">Tetris</span></h1>
          <section className="w-[100%]">
            <h3 className="w-[100%] text-[1.5rem] text-white shadow-lg drop-shadow-md-black">Next</h3>
            <div className="w-[10.5rem] h-[8.75rem] bg-greybg rounded-md flex flex-wrap justify-center items-center content-center">
              <section className="w-[100%] h-[100%] bg-greybg grid grid-cols-6 grid-rows-4">
                <NextShapePreview nextShapeColor={state.nextShapeColor} />
              </section>
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