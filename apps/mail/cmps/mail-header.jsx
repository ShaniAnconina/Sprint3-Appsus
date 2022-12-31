import { MailFilter } from "./mail-filter.jsx";

export function MailHeader({ setFilterBy, onSort }) {
    return <header className="gmail-header">
        <div className="left-side">
            <span className="fa-solid hamburger"></span>
            <img src="../../assets/img/icons/Gmail_icon.png" />
        </div>
        <div className="search-container"><MailFilter onSort={onSort} setFilterBy={setFilterBy} /></div>
    </header>
}