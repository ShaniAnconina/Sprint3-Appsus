const { useState, useEffect } = React

import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        setIsLoading(true)
        mailService.query()
            .then((mails => {
                setMails(mails)
                setIsLoading(false)
            }))
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                const updatedMails = mails.filter(mail => mail.id !== mailId)
                setMails(updatedMails)
            })
    }

    return <section className="mail-index">
        {mails && <MailList mails={mails} onRemoveMail={onRemoveMail} />}
        {isLoading && <div>Loading..</div>}
    </section>
}

