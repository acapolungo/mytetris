import React, { useEffect, useState } from 'react';
import './App.css';



function App() {

  const [color, setColor] = useState("")
  const [counter, setCounter] = useState(1);

  // const currentGradient = gradients[Math.floor(Math.random() * gradients.length)];
  // console.log(currentGradient)
  // var randomColor = Math.floor(Math.random()*16777215).toString(16);

  useEffect(() => {
    const arrayOfGradients = ['bg-gradient-yellow', 'bg-gradient-orange','bg-gradient-purple','bg-gradient-blue','bg-gradient-red',]
    const row = document.querySelector(`#row${counter}`);
    // row?.classList.add(gradients[Math.floor(Math.random() * gradients.length)])
    const interval = setInterval(() => {
        setCounter(counter => counter+1)

        if (counter <= 22 ) {
          console.log(row)
          console.log(counter)
          row?.classList.add('bg-gradient-orange')
        } else {
          setCounter(1)
          setColor(arrayOfGradients[Math.floor(Math.random() * arrayOfGradients.length)])
        }
    }, 1000);

    setTimeout(function() {
      row?.classList.remove('bg-gradient-orange');
    }, 2000);
    
    return () => clearInterval(interval);

  }, [counter]);


  return (

    <div className="mx-auto h-screen flex justify-center items-center bg-gradient-to-br from-purplebg to-cyanbg">

      <div className="w-[35rem] h-[42rem] p-[1.75rem] bg-gradient-to-br from-magenta via-purple to-cyan flex justify-between drop-shadow-xl">
        <section className="w-[19.25rem] h-[100%] bg-greybg grid grid-cols-11 grid-rows-22 text-white">
          <div className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid`}></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row1" className={`w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid`}></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row2" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row3" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row4" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row5" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row6" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row7" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row8" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row9" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row10" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row11" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row12" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row13" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row14" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row15" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row16" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row17" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row18" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row19" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row20" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row21" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>

          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div id="row22" className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          <div className="w-[1.75rem] h-[1.75rem] border-[0.05rem] border-bordergrid"></div>
          {/* <div className="w-[1.75rem] h-[1.75rem] border-bordergrid border-[0.05rem] rounded bg-s-yellow"></div> */}

        </section>
        <section className="w-[10.5rem] h-[100%] rounded-sm flexflex-wrap">
          <h1 className="text-[2.5rem] h-[12%] text-cyan">my<span className="font-bold">Tetris</span></h1>
          <section className="w-[100%]">
            <h3 className="w-[10.5rem] text-[1.5rem] text-white shadow-lg drop-shadow-md-black">Next</h3>
            <div className="w-[100%] h-[7rem] bg-greybg rounded-md flex flex-wrap justify-center items-center content-center">
              <div className="w-[100%] flex justify-center">
                <div className="w-[1.75rem] h-[1.75rem] border-redbg border-[0.05rem] rounded bg-gradient-orange"></div>
              </div>
              <div className="w-[1.75rem] h-[1.75rem] border-redbg border-[0.05rem] rounded bg-gradient-orange"></div>
              <div className="w-[1.75rem] h-[1.75rem] border-redbg border-[0.05rem] rounded bg-gradient-orange"></div>
              <div className="w-[1.75rem] h-[1.75rem] border-redbg border-[0.05rem] rounded bg-gradient-orange"></div>
            </div>
          </section>
          <section className="w-[100%] mt-[1rem]">
            <h3 className="w-[10.5rem] text-[1.5rem] text-white shadow-lg drop-shadow-md-black">Score</h3>
            <div className="w-[100%] h-[2.625rem] text-[1.5rem] text-grey-txt flex items-center bg-greybg rounded-md text-white px-[10px]">125</div>
          </section>
        </section>
      </div>

    </div >
  );
}

export default App;