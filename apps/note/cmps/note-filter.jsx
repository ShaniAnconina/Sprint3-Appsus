import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React


export function NoteFilter({ setFilterBy }) {
    const [filter, setFilter] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        setFilterBy(filter)
    }, [filter])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilter((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }
    return <section className="mail-filter">
        <form>
            <div>
                <div className="fa-solid search"></div>
                <input type="text"
                    id="txt"
                    name="txt"
                    className="txt"
                    placeholder="Search all conversations"
                    value={filter.txt}
                    onChange={handleChange} />
            </div>

            <select className="folder" name="folder" id="folder" value={filter.folder} onChange={handleChange}>
                <option value="all">All</option>
                <option value="note-todos">Todos</option>
                <option value="note-img">Img</option>
                <option value="note-video">Video</option>
                <option value="note-txt">Text</option>
            </select>
        </form>
    </section>
}