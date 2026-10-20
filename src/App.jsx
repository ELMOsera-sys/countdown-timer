import { useState,useEffect } from 'react'

function Animation({name, time, animated}){


  return (
    <div className='flex flex-col items-center gap-2'>
          <div className='flex flex-col items-center justify-center text-6xl md:text-8xl p-2
          text-pink-100 relative'>
            <span key={time} className={`absolute h-[48%] w-full top-0 z-[-1] bg-slate-700
            rounded-b-lg animate__animated animate__slideInDown
             `}
            ></span>

            <span className='absolute h-[48%] w-full bottom-0 z-[-1] bg-slate-700
            rounded-t-lg'></span>
            {time<10?<span>0{time}</span>:<span>{time}</span>}
          </div>
          <span>{name}</span>
        </div>
  )
}
function App() {
  const [time, setTime] = useState({
    Days: 8,
    Hours: 23,
    Minutes: 55,
    Seconds: 41});

  const launchAt = Date.now() + 14 * 86_400_000;


   function timeLeft() {
      const s = Math.max(0, Math.floor((launchAt - Date.now()) / 1000));
     return {
    Days: Math.floor(s / 86400),
    Hours: Math.floor(s / 3600) % 24,
    Minutes: Math.floor(s / 60) % 60,
    Seconds: s % 60,
  };
}

    useEffect(() => {
  const interval = setInterval(() => {
    setTime(timeLeft())
  }, 1000);

  return () => clearInterval(interval);
}, []);

  return (
    <main className='flex flex-col items-center justify-center gap-10 pb-50'>
      <h1 className='text-3xl md:text-5xl text-slate-100 px-4'>WE'RE LAUNCHING SOON</h1>
      <div className='flex gap-6 md:gap-10'>
        {time.Days===0 ? time.Days: (
          Object.entries(time).map(([name, val]) => (
          <Animation key={name} name={name} time={val} />
        ))
        )}
      </div>
      
    </main>
  )
}

export default App
