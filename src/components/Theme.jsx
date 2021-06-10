import React, { useEffect, useState } from 'react'
import sun from '../images/icon-sun.svg'
import moon from '../images/icon-moon.svg'

export default function Theme(){
    const [isLight, setIsLight] = useState(true)
    // Create new link element
    useEffect(()=>{
        let chosenTheme = localStorage.getItem('todo-theme')
        if(chosenTheme === 'light'){
            document.body.classList.add('light_theme')
            setIsLight(true)
        } else {
            document.body.classList.add('dark_theme')
            setIsLight(false)
        }
    },[])

        
    function changeTheme(){
        // let head = document.querySelector("head > link:nth-child(7)")
        console.log('Theme Changed')
        if(isLight){
            document.body.classList.add('dark_theme')
            setIsLight(false)
            document.body.classList.remove('light_theme')
            localStorage.setItem('todo-theme','dark')
        } else {
            document.body.classList.add('light_theme')
            setIsLight(true)
            document.body.classList.remove('dark_theme')
            localStorage.setItem('todo-theme','light')
        }
    }

    return (
        <>
         <div onClick={()=> changeTheme()} className="theme-container">
             <img src={sun} alt='Sun' className="theme-icon" style={isLight ? {display:'none'}: null} />
             <img src={moon} alt='Moon' className="theme-icon" style={isLight ? null: {display:'none'}}/></div>
        </>
    )
}