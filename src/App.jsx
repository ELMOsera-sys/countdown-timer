import { useState,useEffect } from 'react'

function Animation({name, time}){
  const [animated, setAnimated]=useState(false);

  useEffect(()=>{
    const interval = setInterval(() => {
      setAnimated(!animated)
    }, 1000);
    return () => clearInterval(interval);
  },[time])

  return (
    <div className='flex flex-col items-center gap-2'>
          <div className='flex flex-col items-center justify-center text-6xl md:text-8xl p-2
          text-pink-100 relative'>
            <span className={`absolute h-[48%] w-full top-0 z-[-1] 
            rounded-b-lg animate__animated
             ${animated?"animate__slideInDown bg-slate-700":"bg-white"}`}
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

    useEffect(
      ()=>{
        const interval = setInterval(() => {
          setTime({
            Days: time.Hours===0? (time.Days===0?"hey stop waiting":time.Hours-1):time.Days,
            Hours: time.Minutes===0? (time.Hours===0?23:time.Hours-1):time.Hours,
            Minutes: time.Seconds===0? (time.Minutes===0?59:time.Minutes-1):time.Minutes,
            Seconds: time.Seconds===0? 59:time.Seconds-1})
        }, 1000);

        return () => clearInterval(interval);
      },[time]
    )

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
