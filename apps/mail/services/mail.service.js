import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
}

function query() {
    return storageService.query(MAIL_KEY)
        .then(mail => {
            return mail
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

function getEmptyMail(subject = 'Miss you!', body = 'Would love to catch up sometimes', from = 'Shani') {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        from,
        to: 'momo@momo.com'
    }
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
    return getEmptyMail(subject, body, from)
}