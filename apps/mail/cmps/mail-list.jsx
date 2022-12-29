const { useState } = React

import { MailHeader } from './mail-header.jsx'
import { MailPreview } from './mail-preview.jsx'
import { MailCompose } from './mail-compose.jsx'
// const { useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onSetFilter,loadMails }) {
    const [isModal, setIsModal] = useState(false)
    // const navigate = useNavigate()

    return <section className="mail-list">
        {/* <MailHeader onSetFilter={onSetFilter} /> */}
        <div className="inbox-container">
            <button onClick={() => setIsModal(true)}>New email</button>
            <div>unread emails:</div>
            <ul>
                {mails.map(mail => <li key={mail.id}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                </li>)}
            </ul>
            {isModal && <MailCompose setIsModal={setIsModal} loadMails={loadMails} />}
        </div>
    </section>
}
