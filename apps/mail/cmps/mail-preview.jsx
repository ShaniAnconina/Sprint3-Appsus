const { useState } = React

import { mailService } from "../services/mail.service.js"
import { eventBusService,showSuccessMsg } from "../../../services/event-bus.service.js"

export function MailPreview({ mail, onRemoveMail,onSelectingMail }) {
    const [isMailReaded, setMailReaded] = useState(mail.isRead)
    const passedTime = mailService.getTimePassed(mail.sentAt)

    function onReadMail(ev) {
        if (ev) ev.stopPropagation()
        mail.isRead = !mail.isRead
        mailService.save(mail)
        setMailReaded(mail.isRead)
    }

    function onOpenMail() {
        onSelectingMail(mail)
    }

    function onDelete(ev) {
        ev.stopPropagation()
        onRemoveMail(mail.id)
        // showSuccessMsg('Email sent')
    }

    return <section className={mail.isRead ? 'mail-preview read' : 'mail-preview'} onClick={(ev) => {
        onReadMail(ev)
        onOpenMail()
    }}>
        <div className="msg-prev">
            <p className="from">{mail.from}</p>
            <p className="subject">{mail.subject} </p>
            <p className="body">{mail.body.substring(0, 200) + '...'}</p>
        </div>
        <div className="passed-time">
            {passedTime}
        </div>
        <div className="prev-btns">
            <button onClick={onDelete} className="fa-regular delete"></button>
            <button onClick={onReadMail} className={`fa-regular ${mail.isRead ? 'read' : 'unread'}`}></button>
        </div>
    </section>
}