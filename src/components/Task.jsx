import React, { useEffect, useState } from 'react'

export default function Task(props){
    const [state, setState] = useState({})
    const [isClosed, setIsClosed] = useState(null)

    useEffect(()=> {
        // When component loads, it creates a state and adds the task
        setState(props.task)
        
    },[props])

    function handleClick(){
        props.changeTaskStatus(props.task)
    }

    function handleDelete(){
        // console.log(state)
        props.handleTasks({type:'DELETE', payload:props.task})
    }

    return (
        <>
        
        <div className="task-container" >
          <input id={props.task.id} className='checkmark-container' checked={props.task.status === 'Closed'} type='checkbox' />
          <label htmlFor={props.task.id} onClick={()=> handleClick()}></label>
          <div className="task-description" id='task-description' onClick={()=> handleClick()}>{props.task.task}</div>
          <div className="delete-icon" onClick={()=> handleDelete()}></div>
        </div>
        
        </>
    )
}