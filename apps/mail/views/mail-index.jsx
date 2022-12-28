const { useState, useEffect } = React

import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
    
    loadMails()
    function loadMails() {
        mailService.query
            .then(console.log('lalalala'))
    }
    return <section className="mail-index">
        <MailList />
    </section>
}

