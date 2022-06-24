import React, { useState, useEffect } from 'react'
import { bgGradientColor } from '../../utils/colors';


const emptyNextShapeGrid = () => {
  const rowsOfCells = new Array(6).fill({ color: '', rounded: '' });
  return new Array(5).fill(rowsOfCells);
}

export default function NextShape({ nextShapeColor }) {

  const [nextShapeGrid, updateNextShapeGrid] = useState(emptyNextShapeGrid());

  useEffect(() => {
    updateNextShapeGrid(arr => {
      const nextShapeCopy = [...arr];
      const nextShapeRow = [...arr[3]];
      const nextShapeStyle = { color: nextShapeColor, rounded: 'rounded-md' };

      nextShapeRow[2] = nextShapeStyle;
      nextShapeCopy[2] = nextShapeRow;
      arr = nextShapeCopy;

      return arr;
    }
    );
  }, [nextShapeColor])


  return (
    <>{nextShapeGrid.flat().map((cell, index) => {
      return <div key={index} className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid ${bgGradientColor(cell.color)} ${cell.rounded}`}></div>
    })}</>
  )
}
