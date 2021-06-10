import React, { useEffect, useState } from 'react'


export default function ActionBar(props){
  const [taskCount, setTaskCount] = useState(0)

  useEffect(()=>{
    //Changes the task count, whenever the number of tasks changes
    let itemsLeft = props.tasks.filter(el => el.status === 'Open').length
    setTaskCount(itemsLeft)
  },[props.tasks])

    return (
        <>
        <div className="action-bar task-container" id='actionBar'>
          <div className=''>{taskCount} items left</div>
          <div className="main-filters">
            <span onClick={()=> props.setFilter('ALL')}
              className={props.filter === 'ALL' ? 'active-filter':null}
            >All</span>
            <span onClick={()=> props.setFilter('ACTIVE')}
              className={props.filter === 'ACTIVE' ? 'active-filter':null}
            >Active</span>
            <span onClick={()=> props.setFilter('COMPLETE')}
              className={props.filter === 'COMPLETE' ? 'active-filter':null}
            >Complete</span>
          </div>
          <div className="clear-completed">
            <span onClick={()=> props.setFilter('CLEAR-COMPLETE')}>Clear Completed</span>
          </div>
        </div>
        <div className='drag-text'>
          Drag and drop to reorder list
        </div>
        </>
    )
}