import { MailHeader } from './mail-header.jsx'
import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onRemoveMail }) {
    return <section className="mail-list">
        <MailHeader />
        <div className="inbox-container">
            <h1>Mails</h1>
            <ul>
                {mails.map(mail => <li key={mail.id}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                </li>)}
            </ul>
        </div>
    </section>
}
