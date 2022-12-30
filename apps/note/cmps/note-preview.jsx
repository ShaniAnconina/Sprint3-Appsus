import { DynamicCmp } from "./dynamic-cmp.jsx"

export function NotePreview({ noteId, onPinNote, note, onRemoveNote, onEditNote, onDuplicatNote }) {
    return <article
        style={{ backgroundColor: note.style.backgroundColor }}
        className={noteId === note.id ? "note-preview-container  edit-mode" : "note-preview-container"}
        onClick={() => onEditNote(note.id)}>

        <button onClick={(ev) => { onPinNote(ev, note.id) }} className="fa-solid pin"></button>

        <div className="note-preview">
            {/* <DynamicCmp type={note.type} info={note.info} onChangeInfo={info => onChangeInfo(note.id, info)} /> */}
            <DynamicCmp type={note.type} info={note.info} />
        </div>

        <div className='preview-btn'>
            <button className="fa-solid delete" onClick={(ev) => {
                ev.stopPropagation()
                onRemoveNote(note.id)
            }}></button>

            <button className="fa-solid duplicat" onClick={(ev) => {
                ev.stopPropagation()
                onDuplicatNote(note.id)
            }}></button>

            <button className="fa-solid palette" onClick={(ev) => {
                ev.stopPropagation()
                console.log(note.id);
            }}></button>

            <button className="fa-solid send" onClick={(ev) => {
                ev.stopPropagation()
                console.log(note.id);
            }}></button>
        </div>
    </article>


}