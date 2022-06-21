import React, { useState, useEffect } from 'react'

function bgGradientColor(color) {
  let className;
  switch (color) {
    case 'yellow':
      className = 'bg-gradient-yellow'
      break;
    case 'orange':
      className = 'bg-gradient-orange'
      break;
    case 'purple':
      className = 'bg-gradient-purple'
      break;
    case 'blue':
      className = 'bg-gradient-blue'
      break;
    case 'red':
      className = 'bg-gradient-red'
      break;

    default:
      break;
  }
  return className;
}

const nextShapeGrid = () => {
  const rowsOfCells = new Array(6).fill({ color: '', rounded: '' });
  return new Array(5).fill(rowsOfCells);
}

export default function NextShape({nextShapeColor}) {

  const [nextShape, updateNextShape] = useState(nextShapeGrid());

  useEffect(() => {
    updateNextShape(arr => {
      const nextShapeCopy = [...arr];
      const nextShapeRow = [...arr[3]];
      const nextShapeStyle = { color: nextShapeColor, rounded: 'rounded-md' };

      nextShapeRow[2] = nextShapeStyle;
      nextShapeRow[3] = nextShapeStyle;
      nextShapeRow[4] = nextShapeStyle;
      nextShapeCopy[2] = nextShapeRow;
      arr = nextShapeCopy;

      return arr;
    }
    );
  }, [nextShapeColor])


  return (
    <>{nextShape.flat().map((cell, index) => {
      return <div key={index} className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid ${bgGradientColor(cell.color)} ${cell.rounded}`}></div>
    })}</>
  )
}
