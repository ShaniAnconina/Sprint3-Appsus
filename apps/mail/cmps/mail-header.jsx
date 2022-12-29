import { MailFilter } from "./mail-filter.jsx";

export function MailHeader({ onSetFilter }) {
    return <header className="gmail-header">
        <div>
            <span>☰</span>
            <img src="../../assets/img/icons/Gmail_icon.png" />
        </div>
        <MailFilter onSetFilter={onSetFilter} />
    </header>
}