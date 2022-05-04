import React from 'react';
import './App.css';

function App() {
  return (

    <div className="mx-auto h-screen flex justify-center items-center bg-gradient-to-br from-purplebg to-cyanbg">

      <div className="w-[35rem] h-[42rem] p-[1.75rem] bg-gradient-to-br from-magenta via-purple to-cyan flex justify-between drop-shadow-xl">
        <section className="w-[19.25rem] h-[100%] bg-greybg rounded-md grid grid-cols-11 grid-rows-22 text-white">
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">1</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">2</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">3</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">4</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">5</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">6</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">7</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">8</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">9</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">10</div>
          <div className="w-[1.75rem] h-[1.75rem] flex justify-center items-center border-redbg border-[0.1rem] rounded">11</div>

        </section>
        <section className="w-[10.5rem] h-[100%] rounded-sm flexflex-wrap">
          <h1 className="text-[2.5rem] h-[12%] text-cyan">my<span className="font-bold">Tetris</span></h1>
          <section className="w-[100%]">
            <h3 className="w-[10.5rem] text-[1.5rem] text-white">Next</h3>
            <div className="w-[100%] h-[7rem] bg-greybg rounded-md"></div>
          </section>
          <section className="w-[100%] mt-[1rem]">
            <h3 className="w-[10.5rem] text-[1.5rem] text-white">Score</h3>
            <div className="w-[100%] h-[2.625rem] text-[1.5rem] flex items-center bg-greybg rounded-md text-white">125</div>
          </section>
        </section>
      </div>

    </div >
  );
}

export default App;
