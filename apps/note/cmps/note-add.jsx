const { useState } = React

import { noteService } from "../services/note.service.js"

import { NoteTypeImg } from "./note-type-img.jsx"
import { NoteTypeTodos } from "./note-type-todos.jsx"
import { NoteTypeTxt } from "./note-type-txt.jsx"
import { NoteTypeVideo } from "./note-type-video.jsx"



export function NoteAdd({ loadNotes }) {
    const [typeNoteToEdit, setTypeNoteToEdit] = useState('note-txt')
    let type

    switch (typeNoteToEdit) {
        case 'note-txt':
            type = 'txt'
            break
        case 'note-img':
            type = 'img'
            break
        case 'note-video':
            type = 'img'
            break
        case 'note-todos':
            type = 'todos'
            break
    }

    function DynamicCmp({ typeNoteToEdit }) {
        switch (typeNoteToEdit) {
            case 'note-txt':
                return <NoteTypeTxt loadNotes={loadNotes} setTypeNoteToEdit={setTypeNoteToEdit} />;

            case 'note-img':
                return <NoteTypeImg loadNotes={loadNotes} setTypeNoteToEdit={setTypeNoteToEdit} />;

            case 'note-video':
                return <NoteTypeVideo loadNotes={loadNotes} setTypeNoteToEdit={setTypeNoteToEdit} />;

            case 'note-todos':
                return <NoteTypeTodos loadNotes={loadNotes} setTypeNoteToEdit={setTypeNoteToEdit} />;
        }
    }



    return <section className={`note-add ${type}`} >


        <DynamicCmp typeNoteToEdit={typeNoteToEdit} />

        <button onClick={() => setTypeNoteToEdit('note-txt')} className="fa-solid txt" ></button>
        <button onClick={() => setTypeNoteToEdit('note-img')} className="fa-regular img" ></button>
        <button onClick={() => setTypeNoteToEdit('note-video')} className="fa-regular video" ></button>
        <button onClick={() => setTypeNoteToEdit('note-todos')} className="fa-solid todo" ></button>

    </section >

}




