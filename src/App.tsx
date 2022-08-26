import { useEffect, useCallback, useReducer, useState, useRef, Key } from 'react';
import './App.css';
import Cell from './components/Cell';

import NextShapePreview from './components/NextShapePreview';
import { CellType, Color, TetrisState, ShapeAction, Source, Coordinate, Vector, Grid, Direction } from './types';

const randomColor = (): Color => {
    const arrayOfColors: Color[] = ["yellow", "orange", "purple", "blue", "red"];
    const color = arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
    return color
};

function emptyGrid(): Grid {
    const rowsOfCells = new Array(12).fill({ isEmpty: true, isActive: false });
    return new Array(22).fill(rowsOfCells);
}

function emptyNextShapeGrid(): Grid {
    const rowsOfCells = new Array(6).fill({ color: '', rounded: '' });
    return new Array(5).fill(rowsOfCells);
}

const initialState = {
    tetrisGrid: emptyGrid(),
    currentShapeColor: randomColor(),
    nextShapeGrid: emptyNextShapeGrid(),
    nextShapeColor: randomColor(),
    referenceCellCoordinate: [0, 5]
}

const findAllCoordinatesOfActiveCells = (grid: Grid): Coordinate[] => {
    const coordinates: Coordinate[] = []

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell.isActive) {
                const activeCellCoordinates: Coordinate = [rowIndex, columnIndex]
                coordinates.push(activeCellCoordinates)
            }
        })
    })
    return coordinates
}

const tetrisGridWithActiveCellsDeactivated = (tetrisGrid: Grid): Grid => {

    tetrisGrid.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell.isActive) {
                tetrisGrid[rowIndex][columnIndex].isActive = false
            }
        })
    })

    return tetrisGrid
}

const tetrisGridCopy = (tetrisGrid: Grid): Grid => tetrisGrid.map(row => [...row])

const reducer = (state: TetrisState, action: ShapeAction): TetrisState => {

    const { tetrisGrid, nextShapeColor, referenceCellCoordinate, currentShapeColor } = state;
    const { type } = action;
    const activeCellsCoordinates = findAllCoordinatesOfActiveCells(tetrisGridCopy(tetrisGrid))
    const activeCell: CellType = { color: currentShapeColor, isActive: true, isEmpty: false }

    switch (type) {
        case 'INTRODUCE_SHAPE':

            const activeCurrentCell: CellType = { color: nextShapeColor, isActive: true, isEmpty: false }
            const newplayableShape = tetrisgridIntroduceShape(tetrisGridWithActiveCellsDeactivated(tetrisGridCopy(tetrisGrid)), activeCurrentCell)
            return {
                ...state,
                currentShapeColor: nextShapeColor,
                tetrisGrid: newplayableShape,
                nextShapeColor: randomColor(),
                referenceCellCoordinate: [0, 5]
            }
        case 'TRY_MOVE_SHAPE':
            const { direction, source, clearCurrentTimeout, fallbackCallback } = action.payload;

            if (source === 'player') {
                clearCurrentTimeout()
            }

            switch (direction) {
                case 'left':
                    if (moveLeftIsPossible(tetrisGridCopy(tetrisGrid), activeCellsCoordinates)) {

                        return {
                            ...state,
                            tetrisGrid: tetrisGridMoveShapesDirection(tetrisGridCopy(tetrisGrid), referenceCellCoordinate, activeCell, direction),
                            referenceCellCoordinate: coordinateMovedByDirection(referenceCellCoordinate, direction)
                        }
                    } else {
                        fallbackCallback()
                    }
                    return state

                case 'right':

                    if (moveRightIsPossible(tetrisGridCopy(tetrisGrid), activeCellsCoordinates)) {

                        return {
                            ...state,
                            tetrisGrid: tetrisGridMoveShapesDirection(tetrisGridCopy(tetrisGrid), referenceCellCoordinate, activeCell, direction),
                            referenceCellCoordinate: coordinateMovedByDirection(referenceCellCoordinate, direction)
                        }
                    } else {
                        fallbackCallback()
                    }
                    return state

                case 'down':
                    if (moveDownIsPossible(tetrisGrid, activeCellsCoordinates) && activeCellsCoordinates.length !== 0) {

                        return {
                            ...state,
                            tetrisGrid: tetrisGridMoveShapesDirection(tetrisGridCopy(tetrisGrid), referenceCellCoordinate, activeCell, direction),
                            referenceCellCoordinate: coordinateMovedByDirection(referenceCellCoordinate, direction),
                        }
                    } else {
                        fallbackCallback()
                    }
                    return state

                default:
                    return state
            }
        default:
            return state
    }
}
const tetrisGridWithoutShapeApplied = (tetrisGrid: Grid): Grid => {
    const activeCellsCoordinates = findAllCoordinatesOfActiveCells(tetrisGrid)
    const tetrisGridCopy = tetrisGrid.map(row => [...row])
    const emptyCell: CellType = { isEmpty: true, isActive: false }

    activeCellsCoordinates.forEach((coordinates) => {
        let [rowIndex, columnIndex] = coordinates

        tetrisGridCopy[rowIndex][columnIndex] = emptyCell
    })

    return tetrisGridCopy
}

const currentShapeVectors = (): Vector[] => {
    return [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ]
}

const tetrisgridIntroduceShape = (tetrisGrid: Grid, activeCell: CellType) => {
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

const tetrisGridMoveShapesDirection = (tetrisGrid: Grid, referenceCellCoordinate: Coordinate, activeCell: CellType, direction: Direction): Grid => {

    return tetrisGridWithShapeApplied(
        tetrisGridWithoutShapeApplied(tetrisGridCopy(tetrisGrid)),
        coordinateMovedByDirection(referenceCellCoordinate, direction),
        currentShapeVectors(),
        activeCell
    )
}

const tetrisGridWithShapeApplied = (tetrisGrid: Grid, referenceCellCoordinate: Coordinate, currentShapeVectors: Vector[], activeCell: CellType): Grid => {

    coordinatesOfCellsToActivate(referenceCellCoordinate, currentShapeVectors).forEach((coordinates) => {
        let [rowIndex, columnIndex] = coordinates

        return tetrisGrid[rowIndex][columnIndex] = activeCell
    })
    return tetrisGrid
}

const coordinatesOfCellsToActivate = (referenceCellCoordinate: Coordinate, currentShapeVectors: Vector[]): Coordinate[] => {

    const [referenceCellRowIndex, referenceCellColumnIndex] = referenceCellCoordinate

    return currentShapeVectors.map((vector) => {
        const [rowVariation, columnVariation] = vector
        return [referenceCellRowIndex + rowVariation, referenceCellColumnIndex + columnVariation]
    })
}

const coordinateMovedByDirection = (coordinate: Coordinate, direction: Direction): Coordinate => {

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
    const [{ tetrisGrid, nextShapeColor }, dispatch] = useReducer(reducer, initialState);
    const [firstRenderHappened, setFirstRenderHappened] = useState(false)
    const currentTimeoutIdRef = useRef<number | null>(null);

    const clearCurrentTimeout = useCallback(() => {
        if (currentTimeoutIdRef.current) {
            clearTimeout(currentTimeoutIdRef.current)
            currentTimeoutIdRef.current = null
        }
    }, []);

    const introduceShape = useCallback(() => {
        dispatch({ type: 'INTRODUCE_SHAPE' })
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

    useEffect(() => {
        if (!firstRenderHappened) {
            introduceShape();
            setFirstRenderHappened(true)
        } else {
            orderNextMove()
        }
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

    useEffect(() => {
        document.addEventListener("keydown", handleUserKeyPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mx-auto h-screen flex justify-center items-center bg-gradient-to-br from-purplebg to-cyanbg">
            <div className="w-[37rem] h-[42rem] p-[1.75rem] bg-gradient-to-br from-magenta via-purple to-cyan flex justify-between drop-shadow-xl">
                <section className="w-[21rem] h-[100%] bg-greybg grid grid-cols-12 grid-rows-22">
                    {tetrisGrid.flat().map((cell: CellType, index: Key | null | undefined) => <Cell key={index} {...cell} />)}
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
                        <h3 className="w-[10.5rem] text-[1.5rem] text-white shadow-lg drop-shadow-md-black">score</h3>
                        <div className="w-[100%] h-[2.625rem] text-[1.5rem] text-grey-txt flex items-center bg-greybg rounded-md text-white px-[10px]">125</div>
                    </section>
                </section>
            </div>

        </div >
    );
}

export default App;