const { useParams } = ReactRouterDOM
const { useState, useEffect } = React


import { NotePreview } from "../cmps/note-preview.jsx"
import { noteService } from "../services/note.service.js"

export function NoteList({ notes, onRemoveNote, onEditNote, loadNotes, onDuplicatNote }) {
    const [isPinnedList, setIsPinnedList] = useState(false)
    const { noteId } = useParams()

    let pinedsNotes = []
    let notPinedsNotes = []

    useEffect(() => {
        if (notes.some((note) => note.isPinned)) setIsPinnedList(true)
        else setIsPinnedList(false)
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
                noteService.save(note).then(() => loadNotes())
            })
    }

    return <section>
        {isPinnedList && <section>
            <h3>Pinned notes</h3>
            <div className="note-list">
                {pinedsNotes.map(note => <NotePreview key={note.id} onDuplicatNote={onDuplicatNote} noteId={noteId} onPinNote={onPinNote} onEditNote={onEditNote} onRemoveNote={onRemoveNote} note={note} />)}
            </div>
            <h3>Notes</h3>
            <div className="note-list">
                {notPinedsNotes.map(note => <NotePreview key={note.id} onDuplicatNote={onDuplicatNote} noteId={noteId} onPinNote={onPinNote} onEditNote={onEditNote} onRemoveNote={onRemoveNote} note={note} />)}
            </div>
        </section >}

        {!isPinnedList && <section className="note-list">{notes.map(note => <NotePreview key={note.id} onDuplicatNote={onDuplicatNote} noteId={noteId} onPinNote={onPinNote} onEditNote={onEditNote} onRemoveNote={onRemoveNote} note={note} />)} </section>}
    </section>
}
