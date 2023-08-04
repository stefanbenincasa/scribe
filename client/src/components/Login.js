import { useState, useEffect, useContext} from 'react'
import { GlobalContext } from '../context/globalState'
import { Navigate, useNavigate } from 'react-router-dom'
import { login } from '../services/auth'

import { Row, Col, Form, Button} from 'react-bootstrap';

function Login() {
  const [state, setState] = useContext(GlobalContext)
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")

	const navigate = useNavigate()

	useEffect(() => {
		if(sessionStorage.getItem("token")) navigate("/") 
	}, [setEmail])

	async function handleLogin(e) {
		e.preventDefault()
		const { statusCode } = await login(email, pass)
		if(statusCode === 200) {
			navigate("/")
		}
		else {
			alert("Invalid credentials!")	
		}
	}

	return ( 
		<>
			<div className="Login">
				<Row className="h-100 d-flex justify-content-center">
					<Col xs={12} className="d-flex align-items-center justify-content-center">
						<h1>Login</h1>
					</Col>
					<Col xs={12}> 
						<Form className="d-flex flex-column justify-content-center rounded" onSubmit={handleLogin}>
							<Form.Label className='text-center w-100' style={{color: "white"}}>Email address</Form.Label>
							<Form.Control className="mb-5" type="email" placeholder="Enter email" 
							value={email} onChange={e => setEmail(e.target.value)} style={{color: "var(--secondary-color)"}}/>
							<Form.Label className='text-center w-100' style={{color: "white"}}>Password</Form.Label>
							<Form.Control className="mb-5" type="password" placeholder="Enter password"
							value={pass} onChange={e => setPass(e.target.value)} style={{color: "var(--secondary-color)"}}/>
							<button type="submit" className="w-25 m-auto rounded bttn" style={{fontSize: '1.5rem'}}>Submit</button>
						</Form>
					</Col>
				</Row>
			</div>
		</>
	)

}

export default Login;
