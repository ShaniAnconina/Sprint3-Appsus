import { mailService } from "../services/mail.service.js"

const { useNavigate } = ReactRouterDOM


export function MailPreview({ mail, onRemoveMail }) {
    const navigate = useNavigate()

    function onReadMail() {
        mail.isRead = true
        mailService.save(mail)
        navigate(`/mail/${mail.id}`)
    }

    function onDelete(ev) {
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }

    return <section className={mail.isRead ? 'mail-preview read' : 'mail-preview'} onClick={onReadMail}>
        <div className="msg-prev">
            <p className="from">{mail.from}</p>
            <p className="subject">{mail.subject} </p>
            <p className="body">{mail.body}</p>
        </div>
        <button onClick={onDelete}>Delete</button>
    </section>
}