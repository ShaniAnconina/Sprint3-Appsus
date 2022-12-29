import { DynamicCmp } from "./dynamic-cmp.jsx"

export function NotePreview({ noteId,onPinNote, note, onRemoveNote, onEditNote }) {
    return <article 
        style={{ backgroundColor: note.style.backgroundColor }}
        className={noteId === note.id ? "note-preview-container  edit-mode" : "note-preview-container"}
        onClick={() => onEditNote(note.id)}>

        <button onClick={(ev) => { onPinNote(ev, note.id) }} className="pin-btn">Pin</button>

        <div className="note-preview">
            {/* <DynamicCmp type={note.type} info={note.info} onChangeInfo={info => onChangeInfo(note.id, info)} /> */}
            <DynamicCmp type={note.type} info={note.info} />
        </div>

        <div className='preview-btn'>
            <button onClick={(ev) => {
                ev.stopPropagation()
                onRemoveNote(note.id)
            }}>X</button>
        </div>
    </article>


}