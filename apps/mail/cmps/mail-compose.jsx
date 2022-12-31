const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"
import { eventBusService, showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

export function MailCompose({ setIsModal, loadMails }) {
    const [mail, setMail] = useState(mailService.getEmptyMail())

    // let intervalDraftRef = useRef(null)

    // useEffect(() => {
    //     console.log('mail:', mail)
    //     if (mail.subject || mail.body) return
    //     intervalDraftRef.current = setInterval(() => {
    //         console.log('save')
    //         draftAutoSave()
    //         // mailService.draftAutoSave(mail)
    //     }, 5000)

    //     // return () => {
    //     //     clearInterval(intervalDraftRef.current)
    //     // }
    // }, [mail])

    // function draftAutoSave() {
    //     mail.isDraft = true
    //     mailService.save(mail)
    //         .then(console.log)
    // }

    function onCloseNewMail() {
        setIsModal(false)
    }

    function onSendMail(ev) {
        ev.preventDefault()
        mailService.save(mail)
            .then(() => {
                setIsModal(false)
                loadMails()
                clearInterval(intervalDraftRef.current)
                showSuccessMsg('Email sent successfully!')
            })
            .catch(() => {
                showErrorMsg('Email send failed')
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
            <button onClick={onCloseNewMail} title='Close'>X</button>
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
                    <button type="button" title="Delete" className="fa-regular delete" onClick={onCloseNewMail}></button>
                </div>
            </form>
        </div>
    </section>
}