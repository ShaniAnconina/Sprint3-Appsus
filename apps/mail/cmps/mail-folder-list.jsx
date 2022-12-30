const { useState } = React

import { mailService } from "../services/mail.service.js"

export function MailFolderList({setIsModal}) {

    loadMails()
    const loggedinUser = mailService.getLoggedinUser()

    function loadMails() {
        mailService.query()
            .then((mails) => {
                const inboxMails = mails.filter(mail => mail.to === loggedinUser.email)
                console.log('inboxMails:', inboxMails)
            })
    }

    return <section className="mail-folder-list">
            <button onClick={() => setIsModal(true)} className="fa-solid compose"><p className='text'>Compose</p></button>
    </section>
}