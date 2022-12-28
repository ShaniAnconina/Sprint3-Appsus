import { MailHeader } from "../cmps/mail-header.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM


export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    function onGoBack() {
        navigate(-1)
    }

    function loadMail() {
        mailService.get(mailId)
            .then((mail) => setMail(mail))
            .catch((err) => {
                console.log('Had issues in mail details', err)
                navigate(-1)
            })
    }

    function onRemoveMail() {
        mailService.remove(mail.id)
            .then(() => {
                navigate(-1)
            })
    }


    if (!mail) return <div>Loading...</div>
    return <section className="mail-details">
        <MailHeader />

        <div className="mail-container">
            <h1>{mail.subject}</h1>
            <div className="info">
                <div className="time"></div>
                <div className="from-to">
                    <img src="../assets/img/user.png" />
                    <div>
                        <p className="from">From: {mail.from}</p>
                        <p className="to"> To: {mail.to}</p>
                    </div>
                </div>
            </div>
            <p className="mail-content">{mail.body}</p>
            <button onClick={onGoBack}>Back</button>
            <button onClick={onRemoveMail}>Delete</button>
        </div>
    </section>
}