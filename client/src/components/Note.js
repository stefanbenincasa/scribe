import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/globalState'
import { getNote } from '../services/notes'

// New data from this Note needs to be able to get 
// to the /create or /update endpoint, via service

function Note() {
  const [state, setState] = useContext(GlobalContext)
	const [initialState, setInitialState] = useState(true)

	useEffect(() => {
		if(state.mode) setInitialState(false)
		else setInitialState(true)
	}, [state.mode])

	function handleChange(e) {
		setState(state => ({...state, note: { ...state.note, [e.target.id]: e.target.value}}))
	}

	// Subtitle can be NULL
  return (
    <div className="Note" 
		style={initialState ? {justifyContent : "center", alignItems : "center"} : {}}>
      { 
				initialState ? 
				<div id="blankNote"><figure className="overlay">...Now where was I?</figure></div>
				:
				<> 
					<input id="title" className="rounded" type="text" value={state.note.title} placeholder="Title" onChange={handleChange} /> 

					<input id="subtitle" className="rounded" type="text" value={!state.note.subtitle ? "" : state.note.subtitle} placeholder="Subtitle (optional)" onChange={handleChange} /> 

					<textarea id="body" className="rounded" type="text" placeholder="..." value={state.note.body} onChange={handleChange}></textarea>
				</> 
			}
    </div>
  )
}

export default Note;
