const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailFilter({ onSort, setFilterBy }) {
    const [filter, setFilter] = useState(mailService.getDefaultFilter())

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

            <select className="isRead" name="isRead" id="isRead" value={filter.isRead} onChange={handleChange}>
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>

            <select className="sort" name="sort" id="sort" onChange={onSort}>
                <option value="all">Sort by</option>
                <option value="title">Title</option>
                <option value="date">Date</option>
            </select>
        </form>
    </section>
}