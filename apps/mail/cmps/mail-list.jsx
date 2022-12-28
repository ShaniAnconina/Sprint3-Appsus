import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails,onRemoveMail }) {
    return <section className='mail-list'>
        <h1>Mails</h1>
        <ul>
            {mails.map(mail => <li key={mail.id}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail}/>
                {/* <button onClick={onRemoveMail}>Delete</button> */}
            </li>)}
        </ul>
    </section>
}
