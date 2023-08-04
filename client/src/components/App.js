import { getNotes } from '../services/notes'
import { validateToken } from '../services/auth'
import { GlobalContext } from '../context/globalState'
import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"

import Layout from './Layout'
import Menu from './Menu'
import Home from './Home'
import Login from './Login'
import Account from './Account'

import '../styles/App.css'

function App() {
  const [state, setState] = useContext(GlobalContext)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const navigate = useNavigate() 

	useEffect(() => {
		console.log(state)
	}, [state])

	useEffect(() => {
		routingAuthCheck()
	}, [document.location.pathname])

	async function routingAuthCheck() {
			if(!sessionStorage.getItem("token")) {
				navigate("/login") 
				setIsLoggedIn(false)
				return
			}

			try {
				let { statusCode } = await validateToken()
				if(statusCode !== 200) {
					handleLogout()
					setIsLoggedIn(false)
					return
				}

				setIsLoggedIn(true)
			} 
			catch (error) {
				console.error(error.message)
				handleLogout()
				setIsLoggedIn(false)
			}
		}

	async function handleLogout() {
		sessionStorage.removeItem("token")
		navigate("/login")
	}

  return (
			<div className="App"> 

				<div className="custom_container">
					{isLoggedIn && <Menu handleLogout={handleLogout} /> }
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route exact path="/" element={<Home />} />
						<Route path="/*" element={<div>Page not found.</div>} />
					</Routes>
				</div>

			</div>
  );
}

export default App;
