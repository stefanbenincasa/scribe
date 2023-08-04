import { getNotes } from '../services/notes'
import { validateToken } from '../services/auth'
import { GlobalContext } from '../context/globalState'
import { useState, useEffect, useContext } from 'react'
import { Link, Routes, Route, useNavigate} from "react-router-dom"

import Header from './Header'
import Preview from './Preview'
import Controls from './Controls'
import Menu from './Menu'
import Note from './Note'

function Home() {
	const [state, setState] = useContext(GlobalContext)
	const [notes, setNotes] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		getSetNotes()
	}, [setNotes])

	async function getSetNotes() {
		let { statusCode, notes } = await getNotes()
		if(statusCode === 200) {
			if(notes.length > 1) notes = notes.sort((a, b) => a.title.localeCompare(b.title))
			setNotes(notes)
		} 
		else if(statusCode === 404) {
			setNotes([]) 
		}
	}
	
	async function handleFavoriteToggle(e) {
    let { statusCode, notes } = await getNotes()
    if(statusCode === 200) {
			notes = notes.sort((a, b) => a.title.localeCompare(b.title))
			if(e.target.checked) notes = notes.filter(note => note.favorite === true)	
			setNotes(notes)
    }
  }


	return (
			<div className="Home">
				<Header title="Scribe" />
				<div className="Previews"> 
					<Controls getSetNotes={getSetNotes} handleFavoriteToggle={handleFavoriteToggle} />
					<ul>
						{ 
							notes.length === 0 ? 
							<div>
								<div className="rounded" style={{height: "46px", padding: "1rem", backgroundColor: "rgba(17, 101, 48, 1)"}}>Looking empty here...</div>
								<br></br>
								<div className="rounded" style={{height: "46px", padding: "1rem", backgroundColor: "rgba(17, 101, 48, .6)"}}></div>
								<br></br>
								<div className="rounded" style={{height: "46px", padding: "1rem", backgroundColor: "rgba(17, 101, 48, .3)"}}></div> 
							</div>
							:
							notes.map((note, index) => 
								<Preview 
								key={note.record_id} 
								note={note} 
								getSetNotes={getSetNotes}
								styles={{backgroundColor: "var(--secondary-color)"}}/> 
							) 
						}
					</ul>
				</div>
				<Note />
			</div>
	);
}

export default Home;
