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
        console.log('mailId:', mailId)
        mailService.get(mailId)
            .then((mail) => setMail(mail))
            .catch((err) => {
                console.log('Had issues in mail details', err)
                navigate(-1)
            })

    }

    return <section className="mail-details">

        <h1>Hello from mail details</h1>
        <button onClick={onGoBack}>Go Back</button>
    </section>
}