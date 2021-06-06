import React, { useEffect, useState } from 'react'

export default function Task(props){
    const [state, setState] = useState({})
    const [isClosed, setIsClosed] = useState(null)

    useEffect(()=> {
        // console.log(props.task)
        setState(props.task)
        
    },[])

    useEffect(()=> {
        if(props.task.status === 'Open'){
            setIsClosed(false)
        } else {
            setIsClosed(true)
        }
        props.saveTasks()
    })

    const handleClick = () => {
        if(isClosed){
            setIsClosed(!isClosed)
            setState(prevState => {
                prevState.status = 'Open'
                return prevState;
            })
        } else {
            setIsClosed(!isClosed)
            setState(prevState => {
                prevState.status = 'Closed'
                return prevState;
            })
        }
    }

    function handleDelete(){
        // console.log(state)
        props.handleTasks({type:'DELETE', payload:state})
    }

    return (
        <>
        
        <div className="task-container" >
          <input id={state.id} className='checkmark-container' checked={isClosed} type='checkbox' />
          <label for={state.id} onClick={()=> handleClick()}></label>
          <div className="task-description" id='task-description' onClick={()=> handleClick()}>{state.task}</div>
          <div className="delete-icon" onClick={()=> handleDelete()}></div>
        </div>
        
        </>
    )
}