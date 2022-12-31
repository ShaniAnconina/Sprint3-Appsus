const { useState } = React

import { noteService } from "../services/note.service.js"

import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

export function NoteTodos({ info, note }) {

    const [isChange, setIsChange] = useState(null)

    return <section className="note-todos">
        <p>{info.title}</p>
        <ul>
            {info.todos.map((todo) => <li onClick={() => {
                if (todo.doneAt) todo.doneAt = null
                else todo.doneAt = Date.now()
                noteService.save(note)
                    .then(() => {
                        showSuccessMsg('1 Toso done!')
                        setIsChange(!isChange)
                    })
            }} key={todo.id} className={todo.doneAt ? 'done' : ''}>{todo.txt}</li>)}
        </ul>
    </section>
}