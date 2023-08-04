import { useState, useEffect, useContext } from 'react'
import { getNote, deleteNote, favoriteNote } from '../services/notes'
import { GlobalContext } from '../context/globalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/fontawesome-free-solid'

import defaults from '../assets/defaults.json'

function Preview({note, getSetNotes, styles}) {
  const [state, setState] = useContext(GlobalContext)

  async function handleNoteClick(e, record_id) {
		let { statusCode, note } = await getNote(record_id)
		if(statusCode === 200) setState(state => ({...state, mode: 'update', note: note}))
  }

  async function handleDeleteNoteClick(e, record_id) {
    e.stopPropagation()
		let { statusCode } = await deleteNote(record_id)
		switch(statusCode) {
			case 204: 
				getSetNotes(); 
				if(record_id === state.note.record_id) setState(state => ({mode: null, note: defaults.note})); 
				break;
      default: 
        getSetNotes();
		}
  }

  async function handleFavoriteClick(e, record_id) {
    e.stopPropagation()
		let { statusCode, note } = await favoriteNote(record_id)
		switch(statusCode) {
			case 200: 
        getSetNotes()
				if(record_id === state.note.record_id) setState(state => ({...state, note: note})); 
				break;
    }
  }

  return ( 
    <> 
      <li id={note.record_id} className="Preview rounded" onClick={e => handleNoteClick(e, note.record_id)} style={{...styles, cursor: "pointer"}}>
        {note.title}
        <div>
          <button className="bttn rounded" onClick={e => handleFavoriteClick(e, note.record_id)} style={{cursor: "pointer"}}><FontAwesomeIcon icon={faHeart} style={{color: note.favorite ? "red" : "var(--secondary-color)"}}/></button>
          <button className="bttn rounded" onClick={e => handleDeleteNoteClick(e, note.record_id)} style={{cursor: "pointer", marginLeft: "1rem"}}>X</button>
        </div>
      </li> 
    </>
  )
}

export default Preview;
