import React, { useState, useEffect } from 'react'
import { Color, Coordinate, Grid, Vector, CellType, ShapeType } from '../types';
import { bgGradientColor } from '../utils/colors';

const emptyNextShapeGrid = (): Grid => {
  const rowsOfCells = new Array(6).fill({ isEmpty: true, isActive: false });
  return new Array(6).fill(rowsOfCells);
}

const nextShapeGridCopy = (nextShapeGrid: Grid): Grid => nextShapeGrid.map(row => [...row])

const cellCoordinates = (referenceCellCoordinate: Coordinate, currentShapeVectors: Vector[]): Coordinate[] => {

  const [referenceCellRowIndex, referenceCellColumnIndex] = referenceCellCoordinate

  return currentShapeVectors.map((vector) => {
    const [rowVariation, columnVariation] = vector
    return [referenceCellRowIndex + rowVariation, referenceCellColumnIndex + columnVariation]
  })
}
const nextShapeGridWithIntroducedShape = (nextShapeGrid: Grid, nextShapeCellsCoordinates: Coordinate[], activeCell: CellType): Grid => {

  const gridCopy = nextShapeGridCopy(nextShapeGrid)
  nextShapeCellsCoordinates.forEach((coordinates) => {
    let [rowIndex, columnIndex] = coordinates

    gridCopy[rowIndex][columnIndex] = activeCell
  })
  return gridCopy
}

type PropType = {
  nextShapeColor: Color;
  nextShape: ShapeType;
  nextShapeVectors: Vector[]
}

export default function NextShape({ nextShapeColor, nextShape, nextShapeVectors }: PropType) {

  const [nextShapeGrid, updateNextShapeGrid] = useState(emptyNextShapeGrid());
  const { previewReferenceCellCoordinate } = nextShape

  useEffect(() => {
    updateNextShapeGrid(arr => {
      const activeCell = { color: nextShapeColor, isActive: true, isEmpty: false }
      const nextShapeCellsCoordinates = cellCoordinates(previewReferenceCellCoordinate, nextShapeVectors)
      return arr = nextShapeGridWithIntroducedShape(emptyNextShapeGrid(), nextShapeCellsCoordinates, activeCell);
    }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextShape])

  return (
    <>
      {nextShapeGrid.flat().map((cell, index) => {
        return cell.color ? (
          <div key={index} className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid rounded-md ${bgGradientColor(nextShapeColor)}`}></div>
        ) : (
          <div key={index} className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid`}></div>
        )
      })}
    </>
  );
}
