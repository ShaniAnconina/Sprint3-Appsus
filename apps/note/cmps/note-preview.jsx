import { DynamicCmp } from "./dynamic-cmp.jsx"
import { EditBtn } from "./edit-btn.jsx"

export function NotePreview({ noteId, onPinNote, note, onRemoveNote, onEditNote, onDuplicatNote }) {
    return <article
        style={{ backgroundColor: note.style.backgroundColor }}
        className={noteId === note.id ? "note-preview-container  edit-mode" : "note-preview-container"}
        onClick={() => onEditNote(note.id)}>

        <button onClick={(ev) => { onPinNote(ev, note.id) }} className="fa-solid pin"></button>
        
        <div className="note-preview">
            <DynamicCmp type={note.type} info={note.info} note={note} />
        </div>

        <EditBtn note={note} onRemoveNote={onRemoveNote} onDuplicatNote={onDuplicatNote} />

    </article>


}