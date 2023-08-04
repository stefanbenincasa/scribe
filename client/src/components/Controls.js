import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/globalState'
import { createNote, getNotes, patchNote } from '../services/notes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faHeart } from '@fortawesome/fontawesome-free-solid'
import { MDBSwitch } from 'mdb-react-ui-kit';
import { Row, Col } from 'react-bootstrap'

import defaults from '../assets/defaults.json'

function Controls({getSetNotes, handleFavoriteToggle}) {
  const [state, setState] = useContext(GlobalContext)

  function handleSwapModeToCreate(e) {
    setState(state => ({...state, mode: 'create', note: defaults.note}))
  }

  async function handleCreateNoteClick(e) { 
    let { title, subtitle, body, favorite } = state.note
    const { statusCode, note } = await createNote({title, subtitle, body, favorite})
    if(statusCode === 201) {
      alert("Note created!")
      setState(state => ({mode: 'update', note: note}))
      getSetNotes()
    }
  }

  async function handleUpdateNoteClick(e) { 
    let { title, subtitle, body, favorite } = state.note
    const { statusCode, note } = await patchNote(state.note.record_id, {title, subtitle, body, favorite})
    if(statusCode === 200) {
      alert("Note updated!")
      setState(state => ({...state, note: note}))
      getSetNotes()
    }
  }
 
  return ( 
    <>
      <div className="Controls">
        <div className="d-flex justify-content-center align-items-center">
          <button className="rounded bttn p-2" onClick={handleSwapModeToCreate} style={{cursor: "pointer"}}>Create Note</button>
          { 
            state.mode && 
            <button className="rounded bttn p-2" 
            onClick={state.mode === "create" ? handleCreateNoteClick : handleUpdateNoteClick}
            style={{cursor: "pointer", marginLeft: "1rem"}}
            >
              Save Note
            </button>
          }
        </div>
        <div className="d-flex flex-column">
          Toggle Favourites
          <MDBSwitch id='flexSwitchCheckDefault' onClick={handleFavoriteToggle} style={{cursor: "pointer", marginLeft: ".1rem"}} />
        </div>
      </div>
    </>
  )
}

// <FontAwesomeIcon icon={faFilter} style={{fontSize: "1rem", marginRight: "1rem"}}></FontAwesomeIcon> Toggle Favorites
export default Controls;
