import React from 'react'
import { bgGradientColor } from '../../utils/colors'

export default function Cell({ color, roundedshape }) {
  return (
    <div className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid ${bgGradientColor(color)} ${roundedshape}`}></div>
  )
}
