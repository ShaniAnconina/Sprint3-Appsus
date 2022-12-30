const { useState, useEffect } = React

import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailHeader } from '../cmps/mail-header.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'
import { MailDetails } from './mail-details.jsx'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [selcetedMail, setSelcetedMail] = useState(null)
    const [isModal, setIsModal] = useState(false)

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

    function onSelectingMail(mail) {
        setSelcetedMail(mail)
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
        {isLoading && <div>Loading..</div>}
        <MailHeader onSetFilter={onSetFilter} />
        <div className='page-container'>
            <div className='sidebar'>
                <MailFolderList setIsModal={setIsModal} />
            </div>
            <div className='main-container'>
                {(!selcetedMail && mails) && <MailList mails={mails} isModal={isModal} setIsModal={setIsModal} onRemoveMail={onRemoveMail} onSetFilter={onSetFilter} loadMails={loadMails} onSelectingMail={onSelectingMail} />}
                {selcetedMail && <MailDetails mailId={selcetedMail.id} setSelcetedMail={setSelcetedMail} onRemoveMail={onRemoveMail} />}
            </div>
        </div>
    </section>
}

