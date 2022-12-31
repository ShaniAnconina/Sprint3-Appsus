export function EditBtn({note, onRemoveNote, onDuplicatNote }){
    return  <div className='preview-btn'>
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
            console.log(note.id)
        }}></button>

        <button className="fa-solid send" onClick={(ev) => {
            ev.stopPropagation()
            console.log(note.id)
        }}></button>
    </div>
}