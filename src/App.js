import React, { useEffect, useState } from "react";
import Header from './components/Header';
import Task from "./components/Task";
import ActionBar from "./components/ActionBar";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// TODO:
// [X] Local Storage of State
// [X] Delete tasks
// [X] Filter tasks
// [X] Task Filter Bar
// [X] Implement Theme Changes
// [X] Look into Drag and Drop functionality
// [X] Mobile Responsiveness
// [] Final Touches - Theming

// BUG:
// [X] Theming not working

function App() {
  const [tasks, setTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [filter, setFilter] = useState('ALL')
  

  useEffect(()=>{
    // Initial state of the application
    // Checks for saved state in local storage
    if(allTasks.length === 0){
      let tasksList = JSON.parse(localStorage.getItem('todo-taskList'))
      setTasks(tasksList)
      setAllTasks(tasksList)
      setFilter('ALL')
    }
  },[])

  useEffect(()=> {
    // Saves the task on load
    saveTasks()
  })

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
        let newArr = temp.splice(i,1)
        // console.log(temp)
        setTasks([...temp]) 
        
        // For all tasks
        let i1 = allTasks.findIndex(e => e.id === action.payload.id)
        let temp1 = allTasks
        let newArr1 = temp1.splice(i1,1)
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

  return (
    <>
    
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
                            <Task task={task}  handleTasks={handleTasks} saveTasks={saveTasks} />
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
    
    </>
  );
}

export default App;
