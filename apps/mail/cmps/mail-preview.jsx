import { mailService } from "../services/mail.service.js"
import { eventBusService,showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState } = React
const { useNavigate } = ReactRouterDOM


export function MailPreview({ mail, onRemoveMail }) {
    const [isMailReaded, setMailReaded] = useState(mail.isRead)
    const navigate = useNavigate()
    const passedTime = mailService.getTimePassed(mail.sentAt)

    function onReadMail(ev) {
        if (ev) ev.stopPropagation()
        mail.isRead = !mail.isRead
        mailService.save(mail)
        setMailReaded(mail.isRead)
    }

    function onOpenMail() {
        navigate(`/mail/${mail.id}`)
    }

    function onDelete(ev) {
        ev.stopPropagation()
        onRemoveMail(mail.id)
        showSuccessMsg('Email sent')
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
        <div>
            {passedTime}
        </div>
        <div className="prev-btns">
            <button onClick={onDelete}>Delete</button>
            <button onClick={onReadMail}>{mail.isRead ? 'Mark as read' : 'Mark as unread'}</button>
        </div>
    </section>
}