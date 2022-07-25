import { useEffect, useCallback, useReducer } from 'react';
import './App.css';
import Cell from './components/Emptycell/Cell';
import NextShapePreview from './components/NextShapePreview/NextShapePreview';

interface CellInterface {
    color: string;
    rounded: string;
}

type Color = "yellow" | "orange" | "purple" | "blue" | "red";

interface ShapeAction {
    type: 'INTRODUCE_SHAPE' | 'MOVE_COLOR_SHAPE' | 'MOVE_LEFT' | 'MOVE_RIGHT';
}

type TetrisState = {
    tetrisGrid: CellInterface[][];
    currentRowIndex: number;
    currentShapeColor: string;
    nextShapeGrid: CellInterface[][];
    nextShapeColor: string;
    startingPositionInGrid: number;
}

const randomColor = (): Color => {
    const arrayOfColors: Color[] = ["yellow", "orange", "purple", "blue", "red"];
    return arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
};

function emptyGrid(): CellInterface[][] {
    const rowsOfCells = new Array(11).fill({ color: '', rounded: '' });
    return new Array(22).fill(rowsOfCells);
}

function emptyNextShapeGrid(): CellInterface[][] {
    const rowsOfCells = new Array(6).fill({ color: '', rounded: '' });
    return new Array(5).fill(rowsOfCells);
}

const initialState = {
    tetrisGrid: emptyGrid(),
    currentRowIndex: 0,
    currentShapeColor: randomColor(),
    nextShapeGrid: emptyNextShapeGrid(),
    nextShapeColor: randomColor(),
    startingPositionInGrid: 5,
}

const reducer = (state: TetrisState, action: ShapeAction): TetrisState => {
    const { tetrisGrid, currentRowIndex, currentShapeColor, nextShapeColor, startingPositionInGrid } = state;
    const tetrisGridCopy = [...tetrisGrid];
    const activeCellStyle = { color: currentShapeColor, rounded: 'rounded-md' }
    const inactiveCellStyle = { color: '', rounded: '' };
    const movementCounter = 1

    switch (action.type) {
        case 'INTRODUCE_SHAPE':
            const firstRow = [...tetrisGridCopy[0]];
            firstRow[startingPositionInGrid] = { color: nextShapeColor, rounded: 'rounded-md' };
            tetrisGridCopy[0] = firstRow;

            return {
                ...state,
                currentShapeColor: nextShapeColor,
                tetrisGrid: tetrisGridCopy,
                currentRowIndex: 0,
                nextShapeColor: randomColor()
            }
        case 'MOVE_COLOR_SHAPE':
            const currentRowCopy = [...tetrisGridCopy[currentRowIndex]];
            const nextRowCopy = [...tetrisGridCopy[currentRowIndex + 1]];;

            currentRowCopy[startingPositionInGrid] = inactiveCellStyle;
            nextRowCopy[startingPositionInGrid] = activeCellStyle;
            tetrisGridCopy[currentRowIndex] = currentRowCopy;
            tetrisGridCopy[currentRowIndex + 1] = nextRowCopy;

            return {
                ...state,
                tetrisGrid: tetrisGridCopy,
                currentRowIndex: currentRowIndex + 1,
            }
        case 'MOVE_LEFT':
            const currentRowCopy2 = [...tetrisGridCopy[currentRowIndex]];
            currentRowCopy2[startingPositionInGrid] = inactiveCellStyle;
            const newPositionToTheLeft = startingPositionInGrid - movementCounter
            currentRowCopy2[startingPositionInGrid - movementCounter] = activeCellStyle;
            tetrisGridCopy[currentRowIndex] = currentRowCopy2;

            return {
                ...state,
                tetrisGrid: tetrisGridCopy,
                startingPositionInGrid: newPositionToTheLeft,
            }
        case 'MOVE_RIGHT':
            const currentRowCopy3 = [...tetrisGridCopy[currentRowIndex]];
            currentRowCopy3[startingPositionInGrid] = inactiveCellStyle;
            const newPositionToTheRight = startingPositionInGrid + movementCounter
            currentRowCopy3[startingPositionInGrid + movementCounter] = activeCellStyle;
            tetrisGridCopy[currentRowIndex] = currentRowCopy3;

            return {
                ...state,
                tetrisGrid: tetrisGridCopy,
                startingPositionInGrid: newPositionToTheRight,
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

const checkIfRowBelowExist = (grid: CellInterface[][], rowIndex: number): CellInterface[] | undefined => grid[rowIndex + 1];
const checkIfRowBelowIsTaken = (grid: CellInterface[][], rowIndex: number, position: number): boolean => grid[rowIndex + 1][position].color === '';

const checkIfLeftMoveExist = (grid: CellInterface[][], rowIndex: number, move: number): boolean | undefined => {
    const findIndexOfFirstColoredShape = grid[rowIndex].findIndex(element => element.color !== '')
    const indexToTheLeft = findIndexOfFirstColoredShape - move
    return indexToTheLeft >= 0
}
const checkIfLeftCellIsTaken = (grid: CellInterface[][], rowIndex: number, move: number): boolean => {
    const findIndexOfFirstColoredShape = grid[rowIndex].findIndex(element => element.color !== '')
    const indexToTheLeft = findIndexOfFirstColoredShape - move
    return grid[rowIndex][indexToTheLeft].color === '';
};

const checkIfRightMoveExist = (grid: CellInterface[][], rowIndex: number, move: number): boolean | undefined => {
    const findIndexOfFirstColoredShape = grid[rowIndex].findIndex(element => element.color !== '')
    const indexToTheRight = findIndexOfFirstColoredShape + move
    return indexToTheRight < 11
}
const checkIfRightCellIsTaken = (grid: CellInterface[][], rowIndex: number, move: number): boolean => {
    const findIndexOfFirstColoredShape = grid[rowIndex].findIndex(element => element.color !== '')
    const indexToTheRight = findIndexOfFirstColoredShape + move
    return grid[rowIndex][indexToTheRight].color === '';
};

const checkIfNextMovePossible = (grid: CellInterface[][], rowIndex: number, position: number): boolean | undefined => {
    return checkIfRowBelowExist(grid, rowIndex) && checkIfRowBelowIsTaken(grid, rowIndex, position)
}

const checkGoToLeft = (grid: CellInterface[][], rowIndex: number): boolean | undefined => {
    return checkIfLeftMoveExist(grid, rowIndex, 1) && checkIfLeftCellIsTaken(grid, rowIndex, 1)
}

const checkGoToRight = (grid: CellInterface[][], rowIndex: number): boolean | undefined => {
    return checkIfRightMoveExist(grid, rowIndex, 1) && checkIfRightCellIsTaken(grid, rowIndex, 1)
}

function App(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);

    const introduceShape = useCallback(() => {
        dispatch({
            type: 'INTRODUCE_SHAPE'
        })
    }, [])

    const moveShape = useCallback(() => {
        const { tetrisGrid, currentRowIndex, startingPositionInGrid } = state;

        if (checkIfNextMovePossible(tetrisGrid, currentRowIndex, startingPositionInGrid)) {
            dispatch({
                type: 'MOVE_COLOR_SHAPE'
            })
        } else {
            introduceShape();
        }
    }, [introduceShape, state])

    const moveShapeLeft = useCallback(() => {
        const { tetrisGrid, currentRowIndex } = state;

        if (checkGoToLeft(tetrisGrid, currentRowIndex)) {
            dispatch({
                type: 'MOVE_LEFT'
            })
        } else {
            return
        }
    }, [state])

    const moveShapeRight = useCallback(() => {
        const { tetrisGrid, currentRowIndex } = state;

        if (checkGoToRight(tetrisGrid, currentRowIndex)) {
            dispatch({
                type: 'MOVE_RIGHT'
            })
        } else {
            return
        }
    }, [state])

    const moveShapeDown = useCallback(() => {
        const { tetrisGrid, currentRowIndex, startingPositionInGrid } = state;

        if (checkIfNextMovePossible(tetrisGrid, currentRowIndex, startingPositionInGrid)) {
            dispatch({
                type: 'MOVE_COLOR_SHAPE'
            })
        } else {
            return
        }
    }, [state])

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

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "ArrowLeft") {
                event.preventDefault();
                //console.log("Left key was pressed. Run your function.");
                // callMyFunction();
                moveShapeLeft()
            }
            if (event.code === "ArrowRight") {
                event.preventDefault();
                //console.log("Left key was pressed. Run your function.");
                // callMyFunction();
                moveShapeRight()
            }
            if (event.code === "ArrowDown") {
                event.preventDefault();
                //console.log("Left key was pressed. Run your function.");
                // callMyFunction();
                moveShapeDown()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [moveShapeLeft, moveShapeRight]);

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