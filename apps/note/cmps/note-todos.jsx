export function NoteTodos({ info }) {

    return <section className="note-todos">
        <p>{info.title}</p>
        <ul>
            {info.todos.map((todo) => <li key={todo.id}>{todo.txt}</li>)}
        </ul>
    </section>
}