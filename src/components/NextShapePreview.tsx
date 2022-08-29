import React, { useState, useEffect } from 'react'
import { Color, Grid } from '../types';
import { bgGradientColor } from '../utils/colors';

const emptyNextShapeGrid = (): Grid => {
  const rowsOfCells = new Array(6).fill({ isEmpty: true, isActive: false });
  return new Array(5).fill(rowsOfCells);
}

export default function NextShape({ nextShapeColor }: { nextShapeColor: Color }) {
  const [nextShapeGrid, updateNextShapeGrid] = useState(emptyNextShapeGrid());

  useEffect(() => {
    updateNextShapeGrid(arr => {
      const nextShapeGridCopy = [...arr];
      const nextShapeFirstRowCopy = [...arr[1]];
      const nextShapeSecondRowCopy = [...arr[2]];
      const activeCell = { color: nextShapeColor, isActive: true, isEmpty: false }

      nextShapeFirstRowCopy[2] = activeCell
      nextShapeFirstRowCopy[3] = activeCell
      nextShapeSecondRowCopy[2] = activeCell;
      nextShapeSecondRowCopy[3] = activeCell;

      nextShapeGridCopy[1] = nextShapeFirstRowCopy
      nextShapeGridCopy[2] = nextShapeSecondRowCopy
      return arr = nextShapeGridCopy;
    }
    );
  }, [nextShapeColor])

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
