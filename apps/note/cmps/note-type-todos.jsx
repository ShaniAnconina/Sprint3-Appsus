const { useState } = React

import { noteService } from "../services/note.service.js"

export function NoteTypeTodos({ loadNotes }) {

    const [todos, setTodos] = useState([])
    const [todosToEdit, setTodosToEdit] = useState({ txt: '', doneAt: null })

    const [noteInfoToEdit, setNoteInfoToEdit] = useState(noteService.getEmptyNoteInfoForTodos())

    function onAddTodo() {
        todos.push(todosToEdit)
        setTodosToEdit({ txt: '', doneAt: null })
    }

    function handleChange({ target }) {
        let { value, name: field } = target

        if (field === 'txt') {
            setTodosToEdit((prevNote) => ({ ...prevNote, [field]: value }))
            return
        }
        setNoteInfoToEdit((prevNote) => ({ ...prevNote, [field]: value }))
    }

    function saveNote(ev) {
        ev.preventDefault()
        if(todosToEdit.txt) onAddTodo()
        const note = noteService.getEmptyNoteTodos()
        note.info = noteInfoToEdit
        note.info.todos = todos
        noteService.save(note)
            .then(() => {
                setNoteInfoToEdit(noteService.getEmptyNoteInfoForTodos())
                loadNotes()
            })
    }

    return <section className="note-add-input-todos">
        <form onSubmit={saveNote}>

            <input type="text"
                name="title"
                id="title"
                value={noteInfoToEdit.title}
                onChange={handleChange}
                onClick={(ev) => { ev.stopPropagation() }}
                placeholder="Enter the TODOS title..."
            />

            <input type="text"
                name="txt"
                id="txt"
                value={todosToEdit.txt}
                onChange={handleChange}
                onClick={(ev) => { ev.stopPropagation() }}
                placeholder="Enter the TODOS..."
            />

            <button type="button" onClick={onAddTodo} className="fa-solid add" ></button>

            <button hidden={true}></button>
        </form>

    </section >
}

