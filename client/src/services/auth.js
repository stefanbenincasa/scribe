const login = async function(email, pass) {
  let method, headers, body

  headers = { 'Content-Type' : 'application/json' }
  method = 'POST'
	body = JSON.stringify({email: email, pass: pass})

  try {
    const response = await fetch(`http://localhost:3001/login`, {method, headers, body}) 
		const { token } = await response.json()
    sessionStorage.setItem("token", token)

    return { statusCode: response.status }
  } catch (error) {
    console.error(error)
  }
}

const validateToken = async function() {
  let token, method, headers, body

  token = sessionStorage.getItem("token")
  headers = { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}`}
  method = 'GET'

  try {
    const response = await fetch(`http://localhost:3001/validate_token`, {method, headers}) 
    return { statusCode: response.status }
  } catch (error) {
    console.error(error)
  }
}

export { login, validateToken }
