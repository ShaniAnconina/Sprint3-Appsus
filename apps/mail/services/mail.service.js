import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyMail,
    getTimePassed,
    getLoggedinUser,
    getUnreadMailsCount
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // mails.forEach(mail=> if(mail.to !== loggedinUser.email) mail.isRead = true)

            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.from) || regex.test(mail.body))
            }
            if (filterBy.isRead) {
                if (filterBy.isRead === 'read') {
                    mails = mails.filter(mail => mail.isRead && mail.to === loggedinUser.email)
                }
                if (filterBy.isRead === 'unread') {
                    mails = mails.filter(mail => !mail.isRead && mail.to === loggedinUser.email)
                }
            }
            if (filterBy.folder) {
                switch (filterBy.folder) {
                    case 'inbox':
                        mails = mails.filter(mail => mail.to === loggedinUser.email)
                        break
                    case 'sent':
                        mails = mails.filter(mail => mail.to !== loggedinUser.email)
                        break
                    case 'trash':
                        mails = mails.filter(mail => mail.isTrashed)
                        break
                    case 'draft':
                        // mails = mails.filter(mail => mail.to !== loggedinUser.email)
                        break
                }
            }
            // map.mails(mail.to !== loggedinUser.email)
            if (filterBy.folder && filterBy.folder !== 'trash') mails = mails.filter(mail => !mail.isTrashed)
            return mails
        })
}

function getUnreadMailsCount() {
     return storageService.query(MAIL_KEY)
        .then((mails) => {
            const unreadMails = mails.filter(mail => !mail.isRead && mail.to === loggedinUser.email && !mail.isTrashed)
            return unreadMails.length
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getLoggedinUser() {
    return loggedinUser
}

function getDefaultFilter() {
    return { txt: '', isRead: '', folder: 'inbox' }
}

function getEmptyMail(subject = 'Miss you!', body = 'Would love to catch up sometimes', from = 'Shani', to = 'user@appsus.com') {
    return {
        subject,
        body,
        isRead: false,
        isTrashed: false,
        sentAt: Date.now(),
        from,
        to,
    }
}

function getTimePassed(sentAtTime) {
    return utilService.getPastRelativeFrom(sentAtTime)
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Hello there', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Luli'))
        mails.push(_createMail('Hello Shani', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Pupi'))
        mails.push(_createMail('Hello Yovel', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Tuti'))
        mails.push(_createMail('Hello Puki', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Kuki'))
        mails.push(_createMail('Hello Muli', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'))

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, from) {
    const mail = getEmptyMail(subject, body, from)
    mail.id = utilService.makeId()
    return mail
}