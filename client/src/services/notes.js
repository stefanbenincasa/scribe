import helpers from "../helpers/validation"

const createNote = async function(note) {
  let token, method, headers, body, response, responseNote

  token = sessionStorage.getItem("token")
  headers = { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}`}
  method = 'POST' 
  body = JSON.stringify(helpers.removeFalsyValues(note))

  try {
    response = await fetch(`http://localhost:3001/note`, {method, headers, body}) 
    if(response.status === 201) {
      responseNote = await response.json()
      return { statusCode: response.status, note: responseNote}
    }
    else {
      throw new Error()
    }
  } catch (error) {
    console.error(error)
  }
}

const getNotes = async function() {
  let token, method, headers, notes, response  

  token = sessionStorage.getItem("token")
  headers = { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}`}
  method = 'GET' 

  try {
    response = await fetch(`http://localhost:3001/note`, {method, headers}) 
    if(response.status === 200) notes = await response.json()
    return { statusCode: response.status, notes }
  } catch (error) {
    console.error(error)
  }
}

const getNote = async function(record_id) {
  let token, method, headers, note, response  

  token = sessionStorage.getItem("token")
  headers = { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}`}
  method = 'GET' 

  try {
    response = await fetch(`http://localhost:3001/note/${record_id}`, {method, headers}) 
    if(response.status === 200) note = await response.json()
    return { statusCode: response.status, note }
  } catch (error) {
    console.error(error)
  }
}

const patchNote = async function(record_id, note) {
  let token, method, headers, body, response, responseNote

  token = sessionStorage.getItem("token")
  headers = { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}`}
  method = 'PATCH' 
  body = JSON.stringify(helpers.removeFalsyValues(note))

  try {
    response = await fetch(`http://localhost:3001/note/${record_id}`, {method, headers, body}) 
    if(response.status === 200) {
      responseNote = await response.json()
      return { statusCode: response.status, note: responseNote}
    }
    else {
      throw new Error()
    }
  } catch (error) {
    console.error(error)
  }
}

const deleteNote = async function(record_id) {
  let token, method, headers, response 

  token = sessionStorage.getItem("token")
  headers = { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}`}
  method = 'DELETE'

  try {
    response = await fetch(`http://localhost:3001/note/${record_id}`, {method, headers}) 
    return { statusCode: response.status }
  } catch (error) {
    console.error(error)
  }
}

const favoriteNote = async function(record_id) {
  let token, method, headers, response, responseNote

  token = sessionStorage.getItem("token")
  headers = { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}`}
  method = 'PATCH' 

  try {
    response = await fetch(`http://localhost:3001/note/favorite/${record_id}`, {method, headers}) 
    if(response.status === 200) {
      responseNote = await response.json()
      return { statusCode: response.status, note: responseNote}
    }
    else {
      throw new Error()
    }
  } catch (error) {
    console.error(error)
  }
}

export { createNote, getNote, getNotes, deleteNote, patchNote, favoriteNote }
