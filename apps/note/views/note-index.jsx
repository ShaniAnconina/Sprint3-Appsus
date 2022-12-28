const { useState, useEffect } = React


import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes(){
        noteService.query().then((setNotes))
    }

    return <section>
        <div>here its gona be a niput to search an input to add </div>
        <NoteList notes={notes} />
    </section>

}
