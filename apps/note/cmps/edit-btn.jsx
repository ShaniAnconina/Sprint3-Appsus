export function EditBtn({note, onRemoveNote, onDuplicatNote }){
    return  <div className='preview-btn'>
        <button className="fa-regular delete" onClick={(ev) => {
            ev.stopPropagation()
            onRemoveNote(note.id)
        }}></button>

        <button className="fa-regular duplicat" onClick={(ev) => {
            ev.stopPropagation()
            onDuplicatNote(note.id)
        }}></button>

        <button className="fa-solid palette" onClick={(ev) => {
            ev.stopPropagation()
            console.log(note.id)
        }}></button>

        <button className="fa-regular send" onClick={(ev) => {
            ev.stopPropagation()
            console.log(note.id)
        }}></button>
    </div>
}