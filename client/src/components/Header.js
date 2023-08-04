import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/globalState'

function Header({title}) {
  const [state, setState] = useContext(GlobalContext)
	
  return ( 
    <>
      <div className="Header">
				<h1>{title}</h1>
      </div>
    </>
  )
}

export default Header;
