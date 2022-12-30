import { MailHeader } from "../cmps/mail-header.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
// const { useParams, useNavigate } = ReactRouterDOM


export function MailDetails({ mailId, setSelcetedMail,onRemoveMail }) {
    const [mail, setMail] = useState(null)
    // const { mailId } = useParams()
    // const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    function onGoBack() {
        setSelcetedMail(null)
        // navigate('/mail/')
    }

    function loadMail() {
        mailService.get(mailId)
            .then((mail) => setMail(mail))
            .catch((err) => {
                console.log('Had issues in mail details', err)
                setSelcetedMail(null)
            })
    }

    function onRemove() {
                setSelcetedMail(null)
                onRemoveMail(mail.id)
    }


    if (!mail) return <div>Loading...</div>
    return <section className="mail-details">
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
            <button onClick={onGoBack} className="fa-solid back"></button>
            <button onClick={onRemove} className="fa-regular delete"></button>
        </div>
    </section>
}