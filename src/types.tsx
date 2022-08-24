
export type CellType = { color?: Color; isActive?: boolean; isEmpty: boolean }
export type Grid = CellType[][]
export type Color = "yellow" | "orange" | "purple" | "blue" | "red";
export type Direction = "down" | "left" | "right"
export type Source = "player" | "auto"
export type Status = "In progress" | "Idle" | "Finished"
export type Coordinate = number[]
export type Vector = [number, number]
export type ShapeAction = { type: "INTRODUCE_SHAPE" } | {
    type: 'TRY_MOVE_SHAPE';
    payload: { direction: Direction, fallbackCallback: Function, source: Source, clearCurrentTimeout: Function }
}
export type TetrisState = {
    tetrisGrid: CellType[][];
    currentShapeColor: Color;
    nextShapeGrid: CellType[][]
    nextShapeColor: Color;
    referenceCellCoordinate: Coordinate;
}