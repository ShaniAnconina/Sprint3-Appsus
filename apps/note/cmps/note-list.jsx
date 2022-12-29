const { useParams } = ReactRouterDOM
const { useState, useEffect } = React


import { NotePreview } from "../cmps/note-preview.jsx"
import { noteService } from "../services/note.service.js"

export function NoteList({ notes, onRemoveNote, onEditNote, loadNotes }) {
    const [isPinnedList, setIsPinnedList] = useState(false)
    const { noteId } = useParams()

    let pinedsNotes = []
    let notPinedsNotes = []

    useEffect(() => {
        console.log(notes)
        if (notes.some((note) => note.isPinned)) setIsPinnedList(true)
    }, [notes])

    if (isPinnedList) {
        notes.forEach((note) => {
            if (note.isPinned) pinedsNotes.push(note)
            if (!note.isPinned) notPinedsNotes.push(note)
        })
    }

    function onPinNote(ev, noteId) {
        ev.stopPropagation()
        noteService.get(noteId)
            .then((note) => {
                note.isPinned = !note.isPinned
                noteService.save(note)
                    .then(loadNotes())
            })
    }


    return <section className="note-list">
        {isPinnedList && <section>
            <h3>Pinned notes</h3>
            {pinedsNotes.map(note => <article key={note.id}
                style={{ backgroundColor: note.style.backgroundColor }}
                className={noteId === note.id ? "note-preview-container  edit-mode" : "note-preview-container"}
                onClick={() => onEditNote(note.id)}>

                <button onClick={(ev) => { onPinNote(ev, note.id) }} className="pin-btn">Pin</button>

                <NotePreview note={note} />

                <div className='preview-btn'>
                    <button onClick={(ev) => {
                        ev.stopPropagation()
                        onRemoveNote(note.id)
                    }}>X</button>
                </div>
            </article>)}


            <h3>Notes</h3>
            {notPinedsNotes.map(note => <article key={note.id}
                style={{ backgroundColor: note.style.backgroundColor }}
                className={noteId === note.id ? "note-preview-container  edit-mode" : "note-preview-container"}
                onClick={() => onEditNote(note.id)}>

                <button onClick={(ev) => { onPinNote(ev, note.id) }} className="pin-btn">Pin</button>

                <NotePreview note={note} />

                <div className='preview-btn'>
                    <button onClick={(ev) => {
                        ev.stopPropagation()
                        onRemoveNote(note.id)
                    }}>X</button>
                </div>
            </article>)}
        </section >}


        {!isPinnedList && notes.map(note =>
            <article key={note.id}
                style={{ backgroundColor: note.style.backgroundColor }}
                className={noteId === note.id ? "note-preview-container  edit-mode" : "note-preview-container"}
                onClick={() => onEditNote(note.id)}>

                <button onClick={(ev) => { onPinNote(ev, note.id) }} className="pin-btn">Pin</button>

                <NotePreview note={note} />

                <div className='preview-btn'>
                    <button onClick={(ev) => {
                        ev.stopPropagation()
                        onRemoveNote(note.id)
                    }}>X</button>
                </div>
            </article>)}


    </section>
}
