import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/globalState'

function Layout({children}) {
  const [state, setState] = useContext(GlobalContext)

  return ( 
		<div className="Layout">
			{children}
		</div>
  )
}

export default Layout;
