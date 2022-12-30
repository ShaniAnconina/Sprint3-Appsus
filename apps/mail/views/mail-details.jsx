import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailDetails({ mailId, setSelcetedMail, onRemoveMail, setIsModal, loadMails,isModal }) {
    const [mail, setMail] = useState(null)

    useEffect(() => {
        loadMail()
    }, [])

    function onGoBack() {
        setSelcetedMail(null)
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
        onRemoveMail(mail, mail.id)
    }


    if (!mail) return <div>Loading...</div>
    const passedTime = mailService.getTimePassed(mail.sentAt)
    return <section className="mail-details">
        <div className="mail-container">
            <div className="info">
                <div className="from-to">
                    <img src="../assets/img/user.png" />
                    <div>
                        <p className="from">From: {mail.from}</p>
                        <p className="to"> To: {mail.to}</p>
                    </div>
                </div>
                <div className="passed-time">
                    {passedTime}
                </div>
            </div>
            <div className="mail-content">
                <h1>{mail.subject}</h1>
                <p>{mail.body}</p>
            </div>
            <button onClick={onGoBack} title="Go back" className="fa-solid back"></button>
            <button onClick={onRemove} title="Delete" className="fa-regular delete"></button>
        </div>
        {isModal && <MailCompose setIsModal={setIsModal} loadMails={loadMails} />}
    </section>
}