import React from 'react'
import { CellType } from '../types'
import EmptyCell from './EmptyCell'
import OccupiedCell from './OccupiedCell';

export default function Cell(cell: CellType) {
  const isOccupied = 'color' in cell
  return (
    <>
      {isOccupied ? <OccupiedCell {...cell} /> : <EmptyCell />}
    </>
  )
}
