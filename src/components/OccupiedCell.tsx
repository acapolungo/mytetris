import React from 'react'
import { bgGradientColor } from '../utils/colors'
import { CellType } from '../types'

export default function OccupiedCell({ color }: CellType) {
    return (
        <div className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid rounded-md ${bgGradientColor(color)}`}></div>
    )
}
