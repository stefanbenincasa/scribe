import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/globalState'

import { Dropdown } from "react-bootstrap"
import { Link, Routes, Route, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'

function Menu({handleLogout}) {
  const [state, setState] = useContext(GlobalContext)

  const navigate = useNavigate()
	
  return ( 
    <>
      <div className="Menu">
        <Dropdown> 
          <Dropdown.Toggle style={{backgroundColor: "white", border: "none", outline: "none"}}> 
            <FontAwesomeIcon icon={faBars} style={{color: "var(--secondary-color)", fontSize: "2rem", border: "none", outline: "none"}} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            { document.location.pathname !== "/" && <Dropdown.Item href="/">Home</Dropdown.Item> }
            <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}

export default Menu;
