const { useState } = React

import { mailService } from "../services/mail.service.js"
import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"

export function MailCompose({ setIsModal, loadMails }) {
    const [mail, setMail] = useState(mailService.getEmptyMail())


    function onCloseNewMail() {
        setIsModal(false)
    }

    function onSendMail(ev) {
        ev.preventDefault()
        mailService.save(mail)
            .then(() => {
                setIsModal(false)
                loadMails()
                // showSuccessMsg('Email sent')
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setMail((prevMail) => {
            return { ...prevMail, [field]: value }
        })
    }

    return <section className="mail-compose">
        <div className="new-mail">
            <p>New email</p>
            <button onClick={onCloseNewMail}>X</button>
        </div>
        <div className="mail-content">
            <form onSubmit={onSendMail}>

                <input type="email"
                    name="to"
                    className="to"
                    placeholder="To"
                    onChange={handleChange} />

                <input type="text"
                    name="subject"
                    className="subject"
                    placeholder="Subject"
                    onChange={handleChange} />

                <input type="text"
                    name="body"
                    className="content"
                    onChange={handleChange} />

                <div className="send-delete">
                    <button className="send">Send</button>
                    <button type="button">Delete</button>
                </div>
            </form>
        </div>
    </section>
}