const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteEdit({ noteToEdit, setNoteToEdit, onRemoveNote }) {
    const navigate = useNavigate()
    const [noteInfoToEdit, setNoteInfoToEdit] = useState(noteToEdit.info)
    const [notestyleToEdit, setNoteIstyleToEdit] = useState(noteToEdit.style)


    function closeEditScreen() {
        saveEditNote()
    }


    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'text') {
            setNoteInfoToEdit((prevNote) => ({ ...prevNote, [field]: value }))
            return
        }
        if (type === 'color') setNoteIstyleToEdit((prevNoteStyle) => ({ ...prevNoteStyle, [field]: value }))
    }

    function saveEditNote() {
        noteToEdit.info = noteInfoToEdit
        noteToEdit.style = notestyleToEdit
        noteService.save(noteToEdit).then(() => {
            setNoteToEdit(null)
            navigate(`/note/`)
        })
    }

    return <section onClick={closeEditScreen} className="note-edit-screen">

        <article style={{ backgroundColor: noteToEdit.style.backgroundColor }} onClick={(ev) => ev.stopPropagation()} className="note-edit">
            <form onSubmit={(ev) => ev.preventDefault()} >
                <input type="text"
                    name="txt"
                    id="title"
                    placeholder="Enter your note..."
                    value={noteInfoToEdit.txt}
                    onChange={handleChange}
                />
                
            </form>

            <div className='edit-btn'>
                <button className="fa-solid delete" onClick={() => { onRemoveNote(noteToEdit.id) }}></button>


                <input type="color"
                    name="backgroundColor"
                    id="backgroundColor"
                    value={notestyleToEdit.backgroundColor}
                    onChange={handleChange}
                />
            </div>

        </article>

    </section>
}