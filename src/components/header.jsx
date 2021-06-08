import React, { useState } from 'react'
import Theme from './Theme'


export default function Header(props){
    // const uuidv4 = require("uuid/v4")
    const [inputText, setInputText] = useState('')

    function handleChange(e){
        setInputText(e.target.value)
    }

    function handleKeyPress(e){
        if(e.target.value === ''){
            return
        }
        if (e.key === 'Enter' || e.keyCode === 13) {
            let obj = {status: 'Open', id: Date.now(), task: inputText}
            props.handleTasks({type:'CREATE', payload:obj})
            setInputText('')
        }
    }

    return (
        <div className='header'>
            <div className='grid-row book-ends'><h1 className='main-heading'>TODO</h1> <span><Theme/></span></div>
            <div className='grid-row task_input mt-md'>
                <div className='task-input'>
                    <span></span>
                    <input value={inputText} onKeyPress={handleKeyPress} onChange={handleChange}/>
                </div>
            </div>
        </div>
    )
}