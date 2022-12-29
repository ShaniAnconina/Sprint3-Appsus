import { DynamicCmp } from "./dynamic-cmp.jsx"


export function NotePreview({ note }) {
    return <div className="note-preview">
   {/* <DynamicCmp type={note.type} info={note.info} onChangeInfo={info => onChangeInfo(note.id, info)} /> */}
   <DynamicCmp type={note.type} info={note.info} />
    </div>
}