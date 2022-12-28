import { NotePreview } from "../cmps/note-preview.jsx"


export function NoteList({ notes }) {
    return <section>
        {notes.map(note => <div key={note.id}><NotePreview note={note} /></div> )}
    </section>
}
