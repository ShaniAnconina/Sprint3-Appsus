import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM


export function MailPreview({ mail,onRemoveMail }) {

    const [currMail, setCurrMail] = useState(mail)
    const navigate = useNavigate()

    let read = (mail.isRead) ? 'read' : ''

    function onReadMail() {
        mail.isRead = true
        setCurrMail(mail)
        navigate(`/mail/${mail.id}`)
    }

    function onDelete(ev){
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }

    return <section className={`mail-preview ${read}`} onClick={onReadMail}>
        <div className="msg-prev">
            <p className="from">{mail.from}</p>
            <p className="subject">{mail.subject} </p>
            <p className="body">{mail.body}</p>
        </div>
        <button onClick={onDelete}>Delete</button>
    </section>
}