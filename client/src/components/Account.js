import { useState, useEffect, useContext} from 'react'
import { GlobalContext } from '../context/globalState'
import { Navigate, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/fontawesome-free-solid'
import { login } from '../services/auth'

import { Row, Col, Form, Button} from 'react-bootstrap';


function Account() {
  const [state, setState] = useContext(GlobalContext)
	const [isReadOnly, setReadOnly] = useState(true)

	useEffect(() => {
	}, [])

	function handleClickEdit(e) {
		setReadOnly(false)
	}
	function handleClickSave(e) {
		setReadOnly(true)
	}

	return ( 
		<>
			<div className="Account">
				<div className="h-25 mb-5 d-flex flex-column justify-content-between">
					<FontAwesomeIcon icon={faUser} style={{color: "black", fontSize: "10rem"}} />
					<h1 className="w-100 text-center" style={{fontSize: "3rem"}}>Account</h1>
				</div>
				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" disabled={isReadOnly} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" value={123} disabled={isReadOnly} />
					</Form.Group>
					{ isReadOnly ? <Button variant="primary" onClick={handleClickEdit}>Edit</Button> : <Button variant="primary" onClick={handleClickSave}>Save</Button> }
				</Form>	
			</div>
		</>
	)

}

export default Account;
