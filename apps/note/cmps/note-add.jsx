const { useState } = React

import { noteService } from "../services/note.service.js"

import { NoteTypeImg } from "./note-type-img.jsx"
import { NoteTypeTxt } from "./note-type-txt.jsx"



export function NoteAdd({ loadNotes }) {
    const [typeNoteToEdit, setTypeNoteToEdit] = useState('note-txt')

    function DynamicCmp({typeNoteToEdit}) {
        switch (typeNoteToEdit) {
            case 'note-txt':
                return <NoteTypeTxt loadNotes={loadNotes} setTypeNoteToEdit={setTypeNoteToEdit} />;
    
            case 'note-img':
                return <NoteTypeImg loadNotes={loadNotes} setTypeNoteToEdit={setTypeNoteToEdit} />;
        }
    }
    


    return <section className="note-add">

        <DynamicCmp typeNoteToEdit={typeNoteToEdit} />

        <button onClick={() => setTypeNoteToEdit('note-img')} className="fa-solid img" ></button>
        {/* <button className="fa-solid img" ></button>
            <button className="fa-solid img" ></button> */}

    </section >

}




