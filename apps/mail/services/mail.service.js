import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
query,
}

function query(){
    return storageService.query(MAIL_KEY)
}

function getEmptyMail(subject = 'Miss you!', body = 'Would love to catch up sometimes') {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        to: 'momo@momo.com'
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    console.log(':')
    if (!mails || !mails.length) {
        console.log('mails:', mails)
        mails = []
        mails.push(_createMail('Hello there', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'))
        mails.push(_createMail('Hello Shani', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'))
        mails.push(_createMail('Hello Yovel', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'))
        mails.push(_createMail('Hello Puki', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'))
        mails.push(_createMail('Hello Muli', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'))

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body) {
    return getEmptyMail(subject, body)
}