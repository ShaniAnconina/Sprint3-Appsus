const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { EditBtn } from "./edit-btn.jsx"
import { NoteTypeImg } from "./note-type-img.jsx"
import { NoteTypeTxt } from "./note-type-txt.jsx"
import { NoteTypeTodos } from "./note-type-todos.jsx"
import { NoteTypeVideo } from "./note-type-video.jsx"


export function NoteEdit({ noteToEdit, setNoteToEdit, onRemoveNote, onDuplicatNote, loadNotes }) {

    const navigate = useNavigate()
    const [getNoteInfoToEdit, setGetNoteInfoToEdit] = useState(noteToEdit.info)

    function closeEditScreen() {
        saveEditNote()
    }

    function saveEditNote() {
        noteToEdit.info = getNoteInfoToEdit
        noteService.save(noteToEdit).then(() => {
            showSuccessMsg('Note saved')
            setNoteToEdit(null)
            navigate(`/note/`)
        })

            .catch(() => { showErrorMsg(`Note cano't save, tray again`) })
    }

    return <section onClick={closeEditScreen} className="note-edit-screen">

        <article style={{ backgroundColor: noteToEdit.style.backgroundColor }} onClick={(ev) => ev.stopPropagation()} className="note-edit">

            {noteToEdit.type === 'note-img' && <NoteTypeImg setGetNoteInfoToEdit={setGetNoteInfoToEdit} setNoteToEdit={setNoteToEdit} loadNotes={loadNotes} />}
            {noteToEdit.type === 'note-video' && <NoteTypeVideo setGetNoteInfoToEdit={setGetNoteInfoToEdit} setNoteToEdit={setNoteToEdit} loadNotes={loadNotes} />}
            {noteToEdit.type === 'note-txt' && <NoteTypeTxt setGetNoteInfoToEdit={setGetNoteInfoToEdit} setNoteToEdit={setNoteToEdit} loadNotes={loadNotes} />}
            {noteToEdit.type === 'note-todos' && <NoteTypeTodos setGetNoteInfoToEdit={setGetNoteInfoToEdit} setNoteToEdit={setNoteToEdit} loadNotes={loadNotes} />}

            <EditBtn note={noteToEdit} onRemoveNote={onRemoveNote} onDuplicatNote={onDuplicatNote} />
            
        </article>

    </section>
}