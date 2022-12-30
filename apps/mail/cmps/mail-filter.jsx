const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailFilter({ onSetFilter }) {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="mail-filter">
        <form>
            <input type="text"
                id="txt"
                name="txt"
                placeholder="Search all conversations"
                value={filterBy.txt}
                onChange={handleChange} />

            <select name="isRead" id="isRead" value={filterBy.isRead} onChange={handleChange}>
                <option value="all">All conversations</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </form>
    </section>
}