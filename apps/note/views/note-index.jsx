const { useState, useEffect } = React


import { NotePreview } from "../cmps/note-preview.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes(){
        
    }

    return <section>
        <div>here its gona be a niput to search an input to add </div>
        <NotePreview />
    </section>

}
