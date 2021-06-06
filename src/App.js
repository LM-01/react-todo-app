import React from "react";
import './css/dark-theme.css'
import Header from './components/header'

function App() {
  return (
    <>
    <div className='background-header'></div>
    <div className='grid-container'>
    <Header/>
      <div className='task-list mt-md'>
        <div className="task-container">
          <div className="task-container--checkmark"></div>
          <div className="">Actual Task</div>
          <div className="">X</div>
        </div>
        <div className="task-container">New Task</div>
        <div className="task-container">New Task</div>
        <div className="task-container">Filters</div>
        </div>
      </div>
    </>
  );
}

export default App;
