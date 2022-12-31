const { useState } = React

import { mailService } from "../services/mail.service.js"

export function MailPreview({ setCountUnreadedMails, mail, onRemoveMail, onSelectingMail }) {
    const [isMailReaded, setMailReaded] = useState(mail.isRead)
    const passedTime = mailService.getTimePassed(mail.sentAt)

    function onReadMail(ev) {
        if (ev) ev.stopPropagation()
        mail.isRead = !mail.isRead
        mailService.save(mail)
        setMailReaded(mail.isRead)
        setCountUnreadedMails()
    }

    function onOpenMail() {
        mail.isRead = true
        mailService.save(mail)
        setMailReaded(mail.isRead)
        onSelectingMail(mail)
        setCountUnreadedMails()
    }

    function onDelete(ev) {
        ev.stopPropagation()
        onRemoveMail(mail, mail.id)
        setCountUnreadedMails()
    }

    return <section className={mail.isRead ? 'mail-preview read' : 'mail-preview'} onClick={onOpenMail}>
        <div className="msg-prev">
            <p className="from">{mail.from}</p>
            <p className="subject">{mail.subject} </p>
            <p className="body">{mail.body.substring(0, 200) + '...'}</p>
        </div>
        <div className="passed-time">
            {passedTime}
        </div>
        <div className="prev-btns">
            <button onClick={onDelete} title='Delete' className="fa-regular delete"></button>
            <button onClick={onReadMail} title={`${mail.isRead ? 'Mark as unread' : 'Mark as read'}`} className={`fa-regular ${mail.isRead ? 'read' : 'unread'}`}></button>
        </div>
    </section>
}