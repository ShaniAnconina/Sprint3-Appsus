const { useState } = React

import { noteService } from "../services/note.service.js"

export function NoteTypeImg({ loadNotes }) {
    const [noteInfoToEdit, setNoteInfoToEdit] = useState(noteService.getEmptyNoteInfoForImg())

    function handleChange({ target }) {
        let { value, name: field } = target
        setNoteInfoToEdit((prevNote) => ({ ...prevNote, [field]: value }))
    }

    function saveNote(ev) {
        ev.preventDefault()
        const note = noteService.getEmptyNoteImg()
        console.log('here');
        note.info = noteInfoToEdit
        noteService.save(note)
            .then(() => {
                setNoteInfoToEdit(noteService.getEmptyNoteInfoForImg())
                loadNotes()
            })
    }

    return <section className="note-add">
        <form onSubmit={saveNote}>
            <input type="text"
                name="title"
                id="title"
                value={noteInfoToEdit.title}
                onChange={handleChange}
                onClick={(ev) => { ev.stopPropagation() }}
                placeholder="Enter the title..."
            />
  
            <input type="text"
                name="url"
                id="url"
                value={noteInfoToEdit.url}
                onChange={handleChange}
                onClick={(ev) => { ev.stopPropagation() }}
                placeholder="Enter the img url..."
            />

            <button hidden={true}></button>
        </form>

    </section >
}

