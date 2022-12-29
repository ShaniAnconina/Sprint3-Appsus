const { useState, useEffect } = React

import { MailHeader } from '../cmps/mail-header.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        setIsLoading(true)
        mailService.query(filterBy)
            .then((mailsToUpdate => {
                setMails(mailsToUpdate)
                setIsLoading(false)
            }))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                const updatedMails = mails.filter(mail => mail.id !== mailId)
                setMails(updatedMails)
            })
    }

    return <section className="mail-index">
        <MailHeader onSetFilter={onSetFilter} />
        {mails && <MailList mails={mails} onRemoveMail={onRemoveMail} onSetFilter={onSetFilter} loadMails={loadMails} />}
        {isLoading && <div>Loading..</div>}
    </section>
}

