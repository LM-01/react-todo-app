import React, { useEffect, useState } from 'react'

export default function Theme(){
    const [isLight, setIsLight] = useState(false)
    // Create new link element
    useEffect(()=> {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/dark-theme.css');
        link.setAttribute('id', 'theme-css')

        // Append to the `head` element
        document.head.appendChild(link);
    },[])
    
    function changeTheme(){
        // let head = document.querySelector("head > link:nth-child(7)")
        let head = document.querySelector('#theme-css')
        if(isLight){
            head.setAttribute('href','../css/dark-theme.css')
            setIsLight(false)
        } else {
            head.setAttribute('href','../css/light-theme.css')
            setIsLight(true)
        }
    }

    return (
        <>
         <div onClick={()=> changeTheme()} className="theme-container">
             <img src='../images/icon-sun.svg' alt='Sun' className="theme-icon" style={isLight ? {display:'none'}: null} />
             <img src='../images/icon-moon.svg' alt='Moon' className="theme-icon" style={isLight ? null: {display:'none'}}/></div>
        </>
    )
}