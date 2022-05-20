import React from 'react'
// import { useState } from 'react';

export default function Cell({color, roundedshape}) {

  return (
    <div className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid bg-gradient-${color} ${roundedshape}`}></div>
  )
}
