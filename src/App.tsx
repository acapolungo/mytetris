import { useEffect, useCallback, useReducer, useRef } from 'react';
import './App.css';
import Cell from './components/Emptycell/Cell';
import NextShapePreview from './components/NextShapePreview/NextShapePreview';

interface CellInterface {
    color: string;
    rounded: string;
}

type Color = "yellow" | "orange" | "purple" | "blue" | "red";

type Direction = "left" | "right" | "down"

type ShapeAction = { type: "INTRODUCE_SHAPE" } | {
    type: 'MOVE_SHAPE';
    payload: { direction: Direction }
}

type TetrisState = {
    tetrisGrid: CellInterface[][];
    currentRowIndex: number;
    currentShapeColor: string;
    nextShapeGrid: CellInterface[][];
    nextShapeColor: string;
    columnPosition: number;
}

const randomColor = (): Color => {
    const arrayOfColors: Color[] = ["yellow", "orange", "purple", "blue", "red"];
    const color = arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
    return color
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
    columnPosition: 5,
}

const reducer = (state: TetrisState, action: ShapeAction): TetrisState => {
    const { tetrisGrid, currentRowIndex, currentShapeColor, nextShapeColor, columnPosition } = state;
    const { type } = action;
    const tetrisGridCopy = [...tetrisGrid];
    const activeCellStyle = { color: currentShapeColor, rounded: 'rounded-md' }
    const inactiveCellStyle = { color: '', rounded: '' };
    let nextColumnPosition = columnPosition;

    switch (type) {
        case 'INTRODUCE_SHAPE':
            const firstRow = [...tetrisGridCopy[0]];
            firstRow[5] = { color: nextShapeColor, rounded: 'rounded-md' };
            tetrisGridCopy[0] = firstRow;

            return {
                ...state,
                currentShapeColor: nextShapeColor,
                tetrisGrid: tetrisGridCopy,
                currentRowIndex: 0,
                nextShapeColor: randomColor(),
                columnPosition: 5,
            }
        case 'MOVE_SHAPE':
            const { payload } = action;
            const currentRowCopy = [...tetrisGridCopy[currentRowIndex]];

            currentRowCopy[columnPosition] = inactiveCellStyle;

            if (payload?.direction === 'left' && moveLeftIsPossible(tetrisGrid, currentRowIndex, columnPosition)) {
                nextColumnPosition = columnPosition - 1
                currentRowCopy[nextColumnPosition] = activeCellStyle;
                tetrisGridCopy[currentRowIndex] = currentRowCopy;
                return {
                    ...state,
                    tetrisGrid: tetrisGridCopy,
                    columnPosition: nextColumnPosition,
                }
            } else if (payload?.direction === 'right' && moveRightIsPossible(tetrisGrid, currentRowIndex, columnPosition)) {
                nextColumnPosition = columnPosition + 1;
                currentRowCopy[nextColumnPosition] = activeCellStyle;
                tetrisGridCopy[currentRowIndex] = currentRowCopy;

                return {
                    ...state,
                    tetrisGrid: tetrisGridCopy,
                    columnPosition: nextColumnPosition,
                }
            } else if (payload?.direction === 'down' && moveDownIsPossible(tetrisGrid, currentRowIndex, columnPosition)) {
                const nextRowCopy = [...tetrisGridCopy[currentRowIndex + 1]]
                currentRowCopy[nextColumnPosition] = inactiveCellStyle;
                nextRowCopy[nextColumnPosition] = activeCellStyle;
                tetrisGridCopy[currentRowIndex] = currentRowCopy;
                tetrisGridCopy[currentRowIndex + 1] = nextRowCopy;
                return {
                    ...state,
                    tetrisGrid: tetrisGridCopy,
                    currentRowIndex: currentRowIndex + 1,
                }
            } else {
                return state
            }
    }
}

const rowBelowExist = (grid: CellInterface[][], rowIndex: number): boolean => {
    return Boolean(grid[rowIndex + 1]);
}
const rowBelowIsFree = (grid: CellInterface[][], rowIndex: number, columnIndex: number): boolean => {
    return grid[rowIndex + 1][columnIndex].color === '';
}
const leftCellExist = (grid: CellInterface[][], rowIndex: number, columnIndex: number): boolean => {
    return grid[rowIndex][columnIndex - 1] !== undefined;
}
const leftCellIsFree = (grid: CellInterface[][], rowIndex: number, columnIndex: number): boolean => {
    return grid[rowIndex][columnIndex - 1].color === '';
};
const rightCellExist = (grid: CellInterface[][], rowIndex: number, columnIndex: number): boolean => {
    return grid[rowIndex][columnIndex + 1] !== undefined
}
const rightCellIsFree = (grid: CellInterface[][], rowIndex: number, columnIndex: number): boolean => {
    return grid[rowIndex][columnIndex + 1].color === "";
};
const moveDownIsPossible = (grid: CellInterface[][], rowIndex: number, columnIndex: number): boolean => {
    return rowBelowExist(grid, rowIndex) && rowBelowIsFree(grid, rowIndex, columnIndex);
}
const moveLeftIsPossible = (grid: CellInterface[][], rowIndex: number, columnIndex: number): boolean => {
    return leftCellExist(grid, rowIndex, columnIndex) && leftCellIsFree(grid, rowIndex, columnIndex);
}
const moveRightIsPossible = (grid: CellInterface[][], rowIndex: number, columnIndex: number): boolean => {
    return rightCellExist(grid, rowIndex, columnIndex) && rightCellIsFree(grid, rowIndex, columnIndex);
}

function App(): JSX.Element {
    const [{ tetrisGrid, currentRowIndex, columnPosition, nextShapeColor }, dispatch] = useReducer(reducer, initialState);

    const introduceShape = useCallback(() => { dispatch({ type: 'INTRODUCE_SHAPE' }) }, []);
    const moveShapeDown = () => dispatch({ type: 'MOVE_SHAPE', payload: { direction: 'down' } });
    const moveShapeLeft = () => dispatch({ type: 'MOVE_SHAPE', payload: { direction: 'left' } });
    const moveShapeRight = () => dispatch({ type: 'MOVE_SHAPE', payload: { direction: 'right' } });

    const tryMoveShapeLeft = useCallback(() => { moveShapeLeft() }, [])
    const tryMoveShapeRight = useCallback(() => { moveShapeRight() }, [])
    const tryMoveShapeDown = useCallback(() => {
        if (moveDownIsPossible(tetrisGrid, currentRowIndex, columnPosition)) {
            moveShapeDown();
        } else {
            introduceShape();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRowIndex, tetrisGrid, columnPosition])

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        intervalRef.current = setTimeout(() => tryMoveShapeDown(), 500);
        return () => {
            if (intervalRef.current !== null) {
                return clearInterval(intervalRef.current);
            }
        };
    }, [tryMoveShapeDown]);

    useEffect(() => {
        introduceShape();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUserKeyPress = useCallback((event: { preventDefault: () => void; code: string; }) => {
        event.preventDefault();
        if (event.code === "ArrowLeft") {
            tryMoveShapeLeft();
        }
        if (event.code === "ArrowRight") {
            tryMoveShapeRight();
        }
        if (event.code === "ArrowDown") {
            tryMoveShapeDown();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        document.addEventListener("keydown", handleUserKeyPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <div className="mx-auto h-screen flex justify-center items-center bg-gradient-to-br from-purplebg to-cyanbg">

            <div className="w-[35rem] h-[42rem] p-[1.75rem] bg-gradient-to-br from-magenta via-purple to-cyan flex justify-between drop-shadow-xl">
                <section className="w-[19.25rem] h-[100%] bg-greybg grid grid-cols-11 grid-rows-22">
                    {tetrisGrid.flat().map((cell, index) => <Cell key={index} color={cell.color} roundedshape={cell.rounded} />)}
                </section>

                <section className="w-[10.5rem] h-[100%] rounded-sm flexflex-wrap">
                    <h1 className="text-[2.5rem] h-[12%] text-cyan">my<span className="font-bold">Tetris</span></h1>
                    <section className="w-[100%]">
                        <h3 className="w-[100%] text-[1.5rem] text-white shadow-lg drop-shadow-md-black">Next</h3>
                        <div className="w-[10.5rem] h-[8.75rem] bg-greybg rounded-md flex flex-wrap justify-center items-center content-center">
                            <section className="w-[100%] h-[100%] bg-greybg grid grid-cols-6 grid-rows-4">
                                <NextShapePreview nextShapeColor={nextShapeColor} />
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