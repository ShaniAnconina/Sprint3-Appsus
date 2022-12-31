import { NoteFilter } from "./note-filter.jsx"

export function NoteHeader({ setFilterBy }) {
    return <header className="note-header">
        <div className="left-side">
            <span className="fa-solid hamburger"></span>
            <img  src="../../assets/img/icons/google-keep.png" />
        </div>

        <div className="search-container"><NoteFilter setFilterBy={setFilterBy} /></div>

    </header>
}