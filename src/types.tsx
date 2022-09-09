
export type CellType = { color?: Color; isActive?: boolean; isEmpty: boolean; status?: Status }
export type Grid = CellType[][]
export type Color = "yellow" | "orange" | "purple" | "blue" | "red" | "grey";
export type Direction = "down" | "left" | "right"
export type Source = "player" | "auto"
export type Status = "In progress" | "Idle" | "Finished" | "Game over"
export type Coordinate = number[]
export type Vector = [number, number]
export type ShapeAction = { type: "TRY_INTRODUCE_SHAPE" } | {
    type: 'TRY_MOVE_SHAPE';
    payload: { direction: Direction, fallbackCallback: Function, source: Source, clearCurrentTimeout: Function }
} | { type: "RESET" } | { type: 'STATUS'; payload: { status: Status } }
export type TetrisState = {
    tetrisGrid: CellType[][];
    currentShapeColor: Color;
    nextShapeGrid: CellType[][]
    nextShapeColor: Color;
    referenceCellCoordinate: Coordinate;
    status: Status;
    firstRenderHappened: Boolean;
}