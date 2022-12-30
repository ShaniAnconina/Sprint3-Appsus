import { MailPreview } from './mail-preview.jsx'
import { MailCompose } from './mail-compose.jsx'

export function MailList({ mails, onRemoveMail, loadMails, onSelectingMail, isModal, setIsModal }) {


    return <section className="mail-list">
        <div className="inbox-container">
            <ul>
                {mails.map(mail => <li key={mail.id}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} onSelectingMail={onSelectingMail} />
                </li>)}
            </ul>
            {isModal && <MailCompose setIsModal={setIsModal} loadMails={loadMails} />}
        </div>
    </section>
}
