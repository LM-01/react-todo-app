import React, { useEffect, useState } from "react";
import Header from './components/Input-Header.jsx';
import Task from "./components/Task.jsx";
import ActionBar from "./components/ActionBar.jsx";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './css/style.css'

// TODO:
//  [] Add a 'ADD TASKS' section if no tasks available
//  [] Fix mobile version action bar

function App() {
  const [tasks, setTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [filter, setFilter] = useState('ALL')


  useEffect(()=>{
    // Initial state of the application
    // Checks for saved state in local storage
    if(allTasks.length === 0){
      let tasksList = JSON.parse(localStorage.getItem('todo-taskList'))
      if(tasksList !== null){
        setTasks(tasksList)
        setAllTasks(tasksList)
      }
      let initialTasks = [{id:1, task:'Go to grocery store', status:'Open'},
                          {id:2, task:'Wash Car', status: 'Closed'},
                          {id:3, task:'Write book report', status: 'Open'}]
        setTasks(initialTasks)
        setAllTasks(initialTasks)

      setFilter('ALL')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=> {
    // Saves the task on load
    saveTasks()
  },[allTasks])

  function handleTasks(action){
    // Creates and deletes tasks
    switch (action.type){
      case 'CREATE':
        // console.log('CREATE STUFF')
        setAllTasks(prevTasks => [...prevTasks, action.payload])
        setTasks(prevTasks => [...prevTasks, action.payload]) 
        break;

      case 'DELETE':
        // For Tasks
        let i = tasks.findIndex(e => e.id === action.payload.id)
        let temp = tasks
        temp.splice(i,1)
        // console.log(temp)
        setTasks([...temp]) 
        
        // For all tasks
        let i1 = allTasks.findIndex(e => e.id === action.payload.id)
        let temp1 = Array.from(allTasks)
        temp1.splice(i1,1)
        // console.log(temp)
        setAllTasks([...temp1])    
        break;

      default:
        setTasks(allTasks)
        return
    }

  }

  function saveTasks(){
    // Saves tasks to local storage for persistance
    localStorage.setItem('todo-taskList',JSON.stringify(allTasks))
  }

  function handleFilter(msg){
    // Uses the filters to create a new array that will be used to display the tasks
    setFilter(msg)
  
    if(msg==='ALL'){
      setTasks(allTasks)
    }

    if(msg === 'ACTIVE'){
      let temp = allTasks.filter(e => e.status === 'Open')
      setTasks(temp)
    }

    if(msg === 'COMPLETE'){
      let temp = allTasks.filter(e => e.status === 'Closed')
      setTasks(temp)
    }

    if(msg === 'CLEAR-COMPLETE'){
      setAllTasks(allTasks.filter(el => el.status === 'Open'))
      setTasks(tasks.filter(el => el.status === 'Open'))
      setFilter('ALL')
    }
  }

  const onDragEnd = result => {
    const {draggableId, source, destination} = result
    console.log(draggableId, source, destination)
    // Return if user dragged object outside of field
    if(!destination){
      return
    }

    // Return if nothing has really changed
    if(source.index === source.destination){
      return
    }

    //Reordering array
    let newArr = [...tasks]
    const sourceEle = newArr.splice(source.index,1)
    newArr.splice(destination.index,0,...sourceEle)
    
    //Save to State
    if(filter === 'ALL'){
      setTasks(newArr)
      setAllTasks(newArr)
    }

  }

const changeTaskStatus = (tObj) => {  
  let newObj = {...tObj}
  if(newObj.status === 'Open'){
    newObj.status = 'Closed'
  } else {
    newObj.status = 'Open'
  }
  let newStateArr = Array.from(allTasks)
  //console.log(tObj)
  //console.log(newObj)
  let eli = newStateArr.findIndex(obj => obj.id === newObj.id)
  //console.log(newStateArr)
  //console.log(eli)
  newStateArr.splice(eli,1,newObj)
  //console.log(newStateArr)
  setAllTasks(newStateArr)
  setTasks(newStateArr)
  //setFilter(filter)

}

  return (
    <>
    <div id='main-div'>
    <div className='background-header'/>
    <div className='grid-container'>
      <Header handleTasks={handleTasks}/>
      <div className='mt-md'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='main-tasklist-1' type='TASK'>
          {(provided) => (
            <ul className='task-list' ref={provided.innerRef} {...provided.droppableProps}>  

              { tasks.map((task, ind) => 
                  
                    <Draggable draggableId={task.task} index={ind} key={task.id}>
                      {(provided) => (
                     
                        <li  ref={provided.innerRef} index={ind}  {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Task task={task}  handleTasks={handleTasks} saveTasks={saveTasks} changeTaskStatus={changeTaskStatus}/>
                        </li>
                 
                 )}
                    </Draggable>  
                 
                 )}

              {provided.placeholder}
            </ul> 
            
            )}
        </Droppable>
      </DragDropContext>

        <ActionBar tasks={tasks} handleTasks={handleTasks} filter={filter} setFilter={handleFilter}/>
      </div>  
    </div>
    </div>
    </>
  );
}

export default App;
