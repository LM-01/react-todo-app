import React from "react";
import './css/dark-theme.css'

function App() {
  return (
    <>
    <div className='background-header'/>
    <div className='grid-container'>
      <div className='header'>
        <div className='grid-row book-ends'><h1>TODO</h1> <span>ICON</span></div>
        <div className='grid-row task_input mt-md'>
          <input className='task-input'></input>
        </div>
      </div>
      <div className='task-list mt-md'>
        <div className="task-container">
          <div className="">X</div>
          <div className="">Actual Task</div>
          <div className="">X</div>
        </div>
        <div className="task-container">New Task</div>
        <div className="task-container">New Task</div>
      </div>
    </div>
    </>
  );
}

export default App;
