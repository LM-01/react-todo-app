import React from 'react'


export default function Header(){
    return (
      <div className='header'>
        <div className='grid-row book-ends'><h1>TODO</h1> <span>ICON</span></div>
        <div className='grid-row task_input mt-md'>
          <input className='task-input'></input>
        </div>
      </div> 
    )
}