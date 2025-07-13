
import React, {useState,useEffect,useRef} from "react";

function Stopwatch(){
    const [isRunning,setIsRunning] = useState(false);
    const [elapsedTime,setElapsedTime] =useState(0);
    const intervalIdRef=useRef(null);
    const startTimeRef=useRef(0);

    useEffect(()=>{
        if(isRunning){
           intervalIdRef.current= setInterval(()=>{
                setElapsedTime(Date.now()-startTimeRef.current)
            },10)
        }
        return()=>{
            clearInterval(intervalIdRef.current);
        }
    },[isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    
    function stop(){
        setIsRunning(false);
    }
    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }
    function formatTime(){
        let hours=Math.floor(elapsedTime/(1000*60*60));
        let minutes=Math.floor(elapsedTime/(1000*60)%60);
        let seconds=Math.floor(elapsedTime/(1000)%60);
        let milliseconds=Math.floor((elapsedTime%1000)/10);

        hours=String(hours).padStart(2,"0")
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return`${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (
      <div className="stopwatch">
        <div className="display">{formatTime()}</div>
        <div className="controls">
          <button onClick={start} className="start-button">
            start
          </button>
          <button onClick={stop} className="stop-button">
            stop
          </button>
          <button onClick={reset} className="reset-button">
            reset
          </button>
        </div>
      </div>
    );

}

export default Stopwatch;


// notes on how each component works

// useRef
// Main point is it doesn't rerender.
// - intervalIdRef.current 📌: Acts like a clipboard that holds the ID returned by setInterval(). You use this ID to call clearInterval() later, which stops the timer loop. It's like knowing which loop to shut down.
// - startTimeRef.current ⏱️: Stores the exact millisecond when the timer was started (or resumed). This is crucial for calculating how much time has passed on each tick without resetting or losing track—even if you pause and restart.


//🧼 padStart(2, "0") Magic
// Each line ensures that time units always have two characters, padding with a leading "0" if needed:
// String(hours).padStart(2, "0") // 1 → "01", 12 → "12"


// | Variable | Original Value | After padStart | Why It's Useful | 
// | hours | 1 | "01" | Aligns with standard clock format | 
// | minutes | 8 | "08" | Keeps digits consistently two-wide | 
// | seconds | 0 | "00" | Prevents UI from jumping due to width change | 
// | milliseconds | 5 | "05" | Looks cleaner in compact display | 


//let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
// - Converts milliseconds to hours.
// - 1000 ms = 1 sec, 60 sec = 1 min, 60 min = 1 hr → total: 1000 * 60 * 60

// let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
// - Converts milliseconds to minutes.
// - % 60 ensures it wraps around after 60 (so you don’t get 120 mins when it's 2 hours).


// let seconds = Math.floor((elapsedTime / 1000) % 60);
// - Converts milliseconds to seconds.
// - % 60 keeps it within 0–59 range.

// let milliseconds = Math.floor((elapsedTime % 1000) / 10);
// - Isolates the remaining milliseconds after full seconds.
// - Dividing by 10 gives you a 2-digit display (like 03 instead of 384).



