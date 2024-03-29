import { useEffect, useCallback, useReducer, useRef, Key } from 'react';
import './App.css';
import Cell from './components/Cell';

import NextShapePreview from './components/NextShapePreview';
import { CellType, Color, TetrisState, Action, Source, Coordinate, Vector, Grid, Direction } from './types';

const randomColor = (): Color => {
    const arrayOfColors: Color[] = ["yellow", "orange", "purple", "blue", "red"];
    const color = arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
    return color
};

function emptyGrid(): Grid {
    const emptyCell: CellType = { isEmpty: true, isActive: false }
    const emptyRow = (): Grid => Array(12).fill({ ...emptyCell })
    return new Array(22).fill(emptyRow());
};

function emptyNextShapeGrid(): Grid {
    const rowsOfCells = new Array(6).fill({ isEmpty: true, isActive: false });
    return new Array(5).fill(rowsOfCells);
};

const initialState: TetrisState = {
    tetrisGrid: emptyGrid(),
    currentShapeColor: randomColor(),
    nextShapeGrid: emptyNextShapeGrid(),
    nextShapeColor: randomColor(),
    referenceCellCoordinate: [0, 5],
    status: 'In progress',
    firstRenderHappened: false
};

const tetrisGridWithActiveCellsDeactivated = (tetrisGrid: Grid): Grid => {

    const gridCopy = tetrisGridCopy(tetrisGrid)

    gridCopy.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell.isActive) {
                gridCopy[rowIndex][columnIndex] = { ...gridCopy[rowIndex][columnIndex], isActive: false }
            }
        })
    })

    return gridCopy;
}

const tetrisGridCleanedBeforeNewShape = (tetrisGrid: Grid): Grid => {

    const gridCopy = tetrisGridCopy(tetrisGrid)
    const emptyCell: CellType = { isEmpty: true, isActive: false }
    const isFull = (row: CellType[]): boolean => row.every((cell: CellType) => !cell.isEmpty)
    const emptyRow = (): Grid => Array(12).fill({ ...emptyCell })

    const tetrisGridWithFullRowsRemoved = (tetrisGrid: Grid): Grid => {
        const notFullRows = tetrisGrid.filter(row => !isFull(row))
        const numberOfRowsToRestore = tetrisGrid.length - notFullRows.length
        const rowsToRestore = Array(numberOfRowsToRestore).fill(emptyRow())

        return [...rowsToRestore, ...notFullRows]
    }

    return tetrisGridWithFullRowsRemoved(gridCopy)
};

const tetrisGridCopy = (tetrisGrid: Grid): Grid => tetrisGrid.map(row => [...row])

const reducer = (state: TetrisState, action: Action): TetrisState => {

    const { tetrisGrid, nextShapeColor, referenceCellCoordinate, currentShapeColor } = state;
    const { type } = action;
    const activeCellsCoordinates = cellCoordinates(referenceCellCoordinate, currentShapeVectors())
    const introduceShapeCellsCoordinates = cellCoordinates(initialState.referenceCellCoordinate, currentShapeVectors())
    const activeCell: CellType = { color: currentShapeColor, isActive: true, isEmpty: false }
    const { clearCurrentTimeout } = action.payload

    switch (type) {
        case 'TRY_INTRODUCE_SHAPE':

            const activeCurrentCell: CellType = { color: nextShapeColor, isActive: true, isEmpty: false }

            if (firstShapeCanBeIntroduced(tetrisGrid, introduceShapeCellsCoordinates)) {
                return {
                    ...state,
                    currentShapeColor: nextShapeColor,
                    tetrisGrid: tetrisGridWithIntroducedShape(tetrisGridWithActiveCellsDeactivated(tetrisGrid), activeCurrentCell),
                    nextShapeColor: randomColor(),
                    referenceCellCoordinate: initialState.referenceCellCoordinate,
                    status: 'In progress',
                    firstRenderHappened: true
                }
            } else { 
                if (clearCurrentTimeout) {
                    clearCurrentTimeout()
                }

                return {
                    ...state,
                    tetrisGrid: tetrisGrid,
                    status: 'Game over',
                }
            }
        case 'RESET':
            return initialState
        case 'TRY_MOVE_SHAPE':
            const { direction, source, fallbackCallback } = action.payload;

            if (source === 'player') {
                if (clearCurrentTimeout) {
                    clearCurrentTimeout()
                }
                
            }

            switch (direction) {
                case 'left':
                    if (moveLeftIsPossible(tetrisGrid, activeCellsCoordinates)) {

                        return {
                            ...state,
                            tetrisGrid: tetrisGridWithShapeMoved(tetrisGrid, referenceCellCoordinate, activeCell, direction),
                            referenceCellCoordinate: movedCoordinate(referenceCellCoordinate, direction)
                        }
                    } else {
                        fallbackCallback()
                        return state
                    }
                    

                case 'right':

                    if (moveRightIsPossible(tetrisGrid, activeCellsCoordinates)) {

                        return {
                            ...state,
                            tetrisGrid: tetrisGridWithShapeMoved(tetrisGrid, referenceCellCoordinate, activeCell, direction),
                            referenceCellCoordinate: movedCoordinate(referenceCellCoordinate, direction)
                        }
                    } else {
                        fallbackCallback()
                        return state
                    }
                    

                case 'down':
                    if (moveDownIsPossible(tetrisGrid, activeCellsCoordinates)) {

                        return {
                            ...state,
                            tetrisGrid: tetrisGridWithShapeMoved(tetrisGrid, referenceCellCoordinate, activeCell, direction),
                            referenceCellCoordinate: movedCoordinate(referenceCellCoordinate, direction),
                        }
                    } else {
                        fallbackCallback()

                        return {
                            ...state,
                            tetrisGrid: tetrisGridCleanedBeforeNewShape(tetrisGrid),
                        }
                    }

                default:
                    return state
            }
        default:
            return state
    }
}
const tetrisGridWithoutShapeApplied = (tetrisGrid: Grid, referenceCellCoordinate: Coordinate): Grid => {

    const gridCopy = tetrisGridCopy(tetrisGrid)
    const activeCellsCoordinates = cellCoordinates(referenceCellCoordinate, currentShapeVectors())
    const emptyCell: CellType = { isEmpty: true, isActive: false }

    activeCellsCoordinates.forEach((coordinates) => {
        let [rowIndex, columnIndex] = coordinates

        gridCopy[rowIndex][columnIndex] = emptyCell
    })

    return gridCopy
}

const currentShapeVectors = (): Vector[] => {
    return [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ]
}

const tetrisGridWithIntroducedShape = (tetrisGrid: Grid, activeCell: CellType) => {
    const firstRow = [...tetrisGrid[0]];
    const secondRow = [...tetrisGrid[1]];
    firstRow[5] = activeCell
    firstRow[6] = activeCell
    secondRow[5] = activeCell
    secondRow[6] = activeCell
    tetrisGrid[0] = firstRow;
    tetrisGrid[1] = secondRow;

    return tetrisGrid
}

const tetrisGridWithShapeMoved = (tetrisGrid: Grid, referenceCellCoordinate: Coordinate, activeCell: CellType, direction: Direction): Grid => {
    const gridCopy = tetrisGridCopy(tetrisGrid)

    return tetrisGridWithShapeApplied(
        tetrisGridWithoutShapeApplied(gridCopy, referenceCellCoordinate),
        movedCoordinate(referenceCellCoordinate, direction),
        currentShapeVectors(),
        activeCell
    )
}

const tetrisGridWithShapeApplied = (tetrisGrid: Grid, referenceCellCoordinate: Coordinate, vectors: Vector[], activeCell: CellType): Grid => {

    cellCoordinates(referenceCellCoordinate, vectors).forEach((coordinates) => {
        let [rowIndex, columnIndex] = coordinates

        return tetrisGrid[rowIndex][columnIndex] = activeCell
    })
    return tetrisGrid
}

const cellCoordinates = (referenceCellCoordinate: Coordinate, currentShapeVectors: Vector[]): Coordinate[] => {

    const [referenceCellRowIndex, referenceCellColumnIndex] = referenceCellCoordinate

    return currentShapeVectors.map((vector) => {
        const [rowVariation, columnVariation] = vector
        return [referenceCellRowIndex + rowVariation, referenceCellColumnIndex + columnVariation]
    })
}

const movedCoordinate = (coordinate: Coordinate, direction: Direction): Coordinate => {

    let [rowIndex, columnIndex] = coordinate

    switch (direction) {
        case 'down':
            return [rowIndex + 1, columnIndex]
        case 'left':
            return [rowIndex, columnIndex - 1]
        case 'right':
            return [rowIndex, columnIndex + 1]

        default:
            break;
    }
    return coordinate
}

const rowBelowExist = (grid: Grid, rowIndex: number): boolean => {
    return Boolean(grid[rowIndex + 1]);
}
const cellBelowIsFree = (grid: Grid, rowIndex: number, columnIndex: number): boolean | undefined => {
    return grid[rowIndex + 1][columnIndex].isEmpty || grid[rowIndex + 1][columnIndex].isActive
}
const moveDownIsPossible = (grid: Grid, activeCellsCoordinates: Coordinate[]): boolean => {

    return activeCellsCoordinates.every((activeCellCoordinates) => {
        const [rowIndex, columnIndex] = activeCellCoordinates
        return (rowBelowExist(grid, rowIndex) && cellBelowIsFree(grid, rowIndex, columnIndex));
    })
}

const cellIsEmpty = (grid: Grid, rowIndex: number, columnIndex: number): boolean => {
    return Boolean(grid[rowIndex][columnIndex].isEmpty)
}
const firstShapeCanBeIntroduced = (grid: Grid, referenceCellsCoordinates: Coordinate[]): boolean => {

    return referenceCellsCoordinates.every((referenceCellCoordinates) => {
        const [rowIndex, columnIndex] = referenceCellCoordinates
        return cellIsEmpty(grid, rowIndex, columnIndex);
    })
}

const leftCellExist = (grid: Grid, rowIndex: number, columnIndex: number): boolean => {
    return Boolean(grid[rowIndex][columnIndex - 1] !== undefined);
}
const leftCellIsFree = (grid: Grid, rowIndex: number, columnIndex: number): boolean | undefined => {
    return grid[rowIndex][columnIndex - 1].isEmpty || grid[rowIndex][columnIndex - 1].isActive;
};
const moveLeftIsPossible = (grid: Grid, activeCellsCoordinates: Coordinate[]): boolean => {
    return activeCellsCoordinates.every((activeCellCoordinates) => {
        let [rowIndex, columnIndex] = activeCellCoordinates
        return leftCellExist(grid, rowIndex, columnIndex) && leftCellIsFree(grid, rowIndex, columnIndex);
    })
}
const rightCellExist = (grid: Grid, rowIndex: number, columnIndex: number): boolean => {
    return grid[rowIndex][columnIndex + 1] !== undefined;
}
const rightCellIsFree = (grid: Grid, rowIndex: number, columnIndex: number): boolean | undefined => {
    return grid[rowIndex][columnIndex + 1].isEmpty || grid[rowIndex][columnIndex + 1].isActive;
};
const moveRightIsPossible = (grid: Grid, activeCellsCoordinates: Coordinate[]): boolean => {
    return activeCellsCoordinates.every((activeCellCoordinates) => {
        const [rowIndex, columnIndex] = activeCellCoordinates
        return rightCellExist(grid, rowIndex, columnIndex) && rightCellIsFree(grid, rowIndex, columnIndex);
    })
}

function App(): JSX.Element {
    const [{ tetrisGrid, nextShapeColor, firstRenderHappened, status }, dispatch] = useReducer(reducer, initialState);
    const currentTimeoutIdRef = useRef<number | null>(null);
    const gameIsOver = status === 'Game over';

    const clearCurrentTimeout = useCallback(() => {
        if (currentTimeoutIdRef.current) {
            clearTimeout(currentTimeoutIdRef.current)
            currentTimeoutIdRef.current = null
        }
    }, []);

    const introduceShape = useCallback(() => {
        dispatch({
            type: 'TRY_INTRODUCE_SHAPE',
            payload: { clearCurrentTimeout: clearCurrentTimeout }
        })
    }, [clearCurrentTimeout]);

    const resetGame = useCallback(() => {
        dispatch({ type: 'RESET', payload: {} })
    }, []);

    const tryMoveShapeDown = useCallback((source: Source) => {
        dispatch(
            {
                type: 'TRY_MOVE_SHAPE',
                payload: {
                    direction: 'down',
                    fallbackCallback: introduceShape,
                    source: source,
                    clearCurrentTimeout: clearCurrentTimeout
                }
            }
        )
    }, [clearCurrentTimeout, introduceShape])

    const orderNextMove = useCallback(() => {
        currentTimeoutIdRef.current = window.setTimeout(() => {
            tryMoveShapeDown('auto')
        }, 500);

    }, [tryMoveShapeDown])

    const tryMoveShapeLeft = useCallback(() => {
        dispatch({ type: 'TRY_MOVE_SHAPE', payload: { direction: 'left', fallbackCallback: orderNextMove, source: 'player', clearCurrentTimeout: clearCurrentTimeout } })
    }, [clearCurrentTimeout, orderNextMove])

    const tryMoveShapeRight = useCallback(() => {
        dispatch({ type: 'TRY_MOVE_SHAPE', payload: { direction: 'right', fallbackCallback: orderNextMove, source: 'player', clearCurrentTimeout: clearCurrentTimeout } })
    }, [clearCurrentTimeout, orderNextMove])

    const executeIntroduceShapeJustOnce = (() => {
        let executed = false;
        return () => {
            if (!executed) {
                executed = true;
                introduceShape();
            }
        };
    })();

    useEffect(() => {
        if (!firstRenderHappened) {
            executeIntroduceShapeJustOnce()
        }
        else if (gameIsOver) {
            clearCurrentTimeout()
        } else {
            orderNextMove()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tetrisGrid]);

    const handleUserKeyPress = useCallback((event: { preventDefault: () => void; code: string; }) => {
        event.preventDefault();

        if (event.code === "ArrowLeft") {
            tryMoveShapeLeft();
        }
        if (event.code === "ArrowRight") {
            tryMoveShapeRight();
        }
        if (event.code === "ArrowDown") {
            tryMoveShapeDown('player');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGameRestart = useCallback((event: { preventDefault: () => void }) => {
        event.preventDefault();
        resetGame()

    }, [resetGame])

    useEffect(() => {
        if (gameIsOver) {
            document.removeEventListener("keydown", handleUserKeyPress);
        } else {
            document.addEventListener("keydown", handleUserKeyPress);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameIsOver]);

    return (
        <div className="mx-auto h-screen flex justify-center items-center bg-gradient-to-br from-purplebg to-cyanbg">
            <div className="relative w-[37rem] h-[42rem] p-[1.75rem] bg-gradient-to-br from-magenta via-purple to-cyan flex justify-between drop-shadow-xl">
                <section className="relative w-[21rem] h-[100%] bg-greybg grid grid-cols-12 grid-rows-22">
                    {gameIsOver ?
                        <>
                            <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[2.5rem] text-white bg-gradient-to-b from-purple-0 to-pink-600 px-5 rounded-md shadow-white z-10">game<span className="font-bold">Over</span></h2>
                            <div className="w-[21rem] h-[100%] bg-greybg grid grid-cols-12 opacity-30">
                                {tetrisGrid.flat().map((cell: CellType, index: Key | null | undefined) => <Cell key={index} {...cell} status={status} />)}
                            </div>
                        </>
                        : tetrisGrid.flat().map((cell: CellType, index: Key | null | undefined) => <Cell key={index} {...cell} status={status} />)
                    }
                </section>
                <section className="w-[10.5rem] h-[100%] rounded-sm flexflex-wrap">
                    <h1 className="text-[2.5rem] h-[12%] text-cyan">my<span className="font-bold">Tetris</span></h1>
                    <section className="w-[100%]">
                        <h3 className="w-[100%] text-[1.5rem] text-white shadow-lg drop-shadow-md-black">Next</h3>
                        <div className="w-[10.5rem] h-[8.75rem] bg-greybg rounded-md flex flex-wrap justify-center items-center content-center">
                            <section className="w-[100%] h-[100%] bg-greybg grid grid-cols-6 grid-rows-4 rounded-md overflow-hidden">
                                {gameIsOver ?
                                    <div className="w-[10.5rem] h-[100%] bg-greybg grid grid-cols-6 rounded-md opacity-30">
                                        <NextShapePreview nextShapeColor={'grey'} />
                                    </div>
                                    : <NextShapePreview nextShapeColor={nextShapeColor} />
                                }
                            </section>
                        </div>
                    </section>
                    <section className="w-[100%] mt-[1rem]">
                        <h3 className="w-[10.5rem] text-[1.5rem] text-white shadow-lg drop-shadow-md-black">score</h3>
                        <div className="w-[100%] h-[2.625rem] text-[1.5rem] text-grey-txt flex items-center bg-greybg rounded-md text-white px-[10px]">125</div>
                    </section>
                    <section className="w-[100%] mt-[1rem]">
                        {gameIsOver ?
                            <button onClick={handleGameRestart} className="bg-greybg hover:bg-gray-100 hover:text-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow">Restart Game</button>
                            : ''
                        }

                    </section>
                </section>
            </div>

        </div >
    );
}

export default App;