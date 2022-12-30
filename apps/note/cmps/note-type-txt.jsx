const { useState } = React

import { noteService } from "../services/note.service.js"

export function NoteTypeTxt({  loadNotes }) {
    const [noteInfoToEdit, setNoteInfoToEdit] = useState(noteService.getEmptyNoteInfoForTxt())

    function handleChange({ target }) {
        let { value, name: field } = target
        setNoteInfoToEdit((prevNote) => ({ ...prevNote, [field]: value }))
    }

    function saveNote(ev) {
        ev.preventDefault()
        const note = noteService.getEmptyNoteTxt()
        note.info = noteInfoToEdit
        noteService.save(note)
            .then(() => {
                setNoteInfoToEdit(noteService.getEmptyNoteInfoForTxt())
                loadNotes()
            })
    }

    return <section className="note-add">
        <form onSubmit={saveNote}>
            <input type="text"
                name="txt"
                id="title"
                value={noteInfoToEdit.txt}
                onChange={handleChange}
                onClick={(ev) => { ev.stopPropagation() }}
                placeholder="Enter your note..."
            />
        </form>
    </section >
}

