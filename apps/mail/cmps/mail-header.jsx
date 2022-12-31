import { MailFilter } from "./mail-filter.jsx";

export function MailHeader({ setFilterBy, onSort }) {
    return <header className="mail-header">
        <div className="search-container"><MailFilter onSort={onSort} setFilterBy={setFilterBy} /></div>
    </header>
}