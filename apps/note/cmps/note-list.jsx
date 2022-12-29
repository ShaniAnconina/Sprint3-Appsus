import { NotePreview } from "../cmps/note-preview.jsx"

const { useParams } = ReactRouterDOM
const { useRef, useEffect } = React






export function NoteList({ notes, onRemoveNote, onEditNote }) {
    const { noteId } = useParams()
    const elNoteRef = useRef(null)


    useEffect(() => {
       console.log(elNoteRef.current)
    }, [notes])

    return <section className='note-list'>
        {notes.map(note => <article style={{backgroundColor: note.style.backgroundColor}} ref={elNoteRef} className={noteId === note.id ? "note-preview-container  edit-mode" : "note-preview-container"} key={note.id} onClick={() => onEditNote(note.id)}><NotePreview note={note} />

            <div className='preview-ntn'>
                <button onClick={() => { onRemoveNote(note.id) }}>X</button>
            </div>
        </article>)}


    </section>
}
