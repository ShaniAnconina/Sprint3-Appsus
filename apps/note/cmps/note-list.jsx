import { NotePreview } from "../cmps/note-preview.jsx"


export function NoteList({ notes, onRemoveNote, onEditNote }) {
    return <section className='note-list'>
        {notes.map(note => <div key={note.id} onClick={() => onEditNote(note.id)}><NotePreview note={note} />
            <div className='preview-ntn'>
                <button onClick={() => { onRemoveNote(note.id) }}>X</button>
            </div>
        </div>)}


    </section>
}
