export type CellType = { color?: Color; isActive?: boolean; isEmpty: boolean; status?: Status };
export type Grid = CellType[][];
export type Color = "yellow" | "orange" | "purple" | "blue" | "red" | "grey";
export type ShapeName = "i" | "o";
export type ShapeType = {
    name: ShapeName;
    positionIndex: number;
    positionVectors: Vector[][];
    previewReferenceCellCoordinate: Coordinate;
}
export type Direction = "down" | "left" | "right";
export type Source = "player" | "auto";
export type Status = "In progress" | "Idle" | "Finished" | "Game over";
export type Coordinate = number[];
export type Vector = [number, number];
export type Action =
    | { type: "TRY_INTRODUCE_SHAPE"; payload: { clearCurrentTimeout: Function; } }
    | { type: 'TRY_MOVE_SHAPE'; payload: { direction: Direction; fallbackCallback: Function; source: Source; clearCurrentTimeout: Function; } }
    | { type: 'TRY_ROTATE_SHAPE'; payload: { fallbackCallbackRotate: Function; source: Source; clearCurrentTimeout: Function; } }
    | { type: "RESET"; payload: { clearCurrentTimeout?: Function; } }
export type TetrisState = {
    tetrisGrid: CellType[][];
    currentShapeColor: Color;
    nextShapeGrid: CellType[][]
    nextShapeColor: Color;
    referenceCellCoordinate: Coordinate;
    status: Status;
    firstRenderHappened: Boolean;
    currentShape: ShapeType;
    nextShape: ShapeType;
}