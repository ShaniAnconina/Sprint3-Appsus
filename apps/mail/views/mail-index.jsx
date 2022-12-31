const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailHeader } from '../cmps/mail-header.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailDetails } from './mail-details.jsx'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [selcetedMail, setSelcetedMail] = useState(null)
    const [isModal, setIsModal] = useState(false)
    const [countUnreadedMails, setCountUnreadedMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [filterBy])

    useEffect(() => {
        unreadedMailsCount()
    }, [countUnreadedMails])

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

    function onRemoveMail(mail, mailId) {
        if (mail.isTrashed) {
            mailService.remove(mailId)
                .then(() => {
                    const updatedMails = mails.filter(mail => mail.id !== mailId)
                    setMails(updatedMails)
                    showSuccessMsg('Email deleted successfully!')
                })
                .catch(() => {
                    showErrorMsg('Email deleted failed')
                })
        } else {
            mail.isTrashed = true
            mailService.save(mail)
                .then(() => {
                    const updatedMails = mails.filter(mail => mail.id !== mailId)
                    setMails(updatedMails)
                    showSuccessMsg('Email moved to trash!')
                })
                .catch(() => {
                    showErrorMsg('Action failed')
                })
        }
    }

    function unreadedMailsCount() {
        return mailService.getUnreadMailsCount()
            .then(setCountUnreadedMails)
    }

    function onSort({ target }) {
        let { value } = target
        if (value === 'title') {
            mails.sort((a, b) => {
                const subject1 = a.subject.toUpperCase()
                const subject2 = b.subject.toUpperCase()
                if (subject1 < subject2) return -1
                if (subject1 > subject2) return 1
                return 0
            })
        }
        if (value === 'date') {
            mails.sort((a, b) => b.sentAt - a.sentAt)
        }
        setMails(mails.map(mail => mail))
    }


    return <section className="mail-index">
        <MailHeader onSort={onSort} setFilterBy={setFilterBy} />
        <div className='page-container'>
            <div className='sidebar'>
                <MailFolderList countUnreadedMails={countUnreadedMails} setSelcetedMail={setSelcetedMail} isModal={isModal} setIsModal={setIsModal} setFilterBy={setFilterBy} />
            </div>
            <div className='main-container'>
                {isLoading && <div>Loading..</div>}
                {(!selcetedMail && mails) && <MailList setCountUnreadedMails={setCountUnreadedMails} mails={mails} isModal={isModal} setIsModal={setIsModal} onRemoveMail={onRemoveMail} loadMails={loadMails} onSelectingMail={onSelectingMail} />}
                {selcetedMail && <MailDetails isModal={isModal} setIsModal={setIsModal} mailId={selcetedMail.id} setSelcetedMail={setSelcetedMail} onRemoveMail={onRemoveMail} loadMails={loadMails} />}
            </div>
        </div>
    </section>
}

