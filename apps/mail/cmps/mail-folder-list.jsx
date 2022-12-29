import { mailService } from "../services/mail.service.js"


export function MailFolderList(){
    loadMails()
    const loggedinUser = mailService.getLoggedinUser()

    function loadMails(){
        mailService.query()
        .then((mails)=> {
            const inboxMails = mails.filter(mail=> mail.to ===loggedinUser.email)
            console.log('inboxMails:', inboxMails)
        })
    }

    return <section className="mail-folder-list">
        <h1>Hello from mail folder list</h1>
    </section>
}