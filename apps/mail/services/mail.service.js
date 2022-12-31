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
                        mails.forEach(mail => mail.isRead = true)
                        break
                    case 'trash':
                        mails = mails.filter(mail => mail.isTrashed)
                        break
                    case 'draft':
                        // mails = mails.filter(mail => mail.to !== loggedinUser.email)
                        break
                }
            }
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

function getEmptyMail(subject = 'Miss you!', body = 'Would love to catch up sometimes', from = 'User', to = 'user@appsus.com') {
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
        mails.push(_createMail('Welcome to flaticon', 'From now on, you can enjoy millions of icons and thousands of stickers to use in your projects and make your work easier. Whether it\'s a mobile app interface, a website or anything else, we have what you are looking for.', 'Freepik Company'))
        mails.push(_createMail('NEW BRANDS IN PREMIUM TX: THRILLS & AUTRY', 'An Australian fashion brand founded by three creative and adventurous friends with a shared passion for music, art and vintage motorcycles.THRILLS clothing creates high quality fabrics, with lots of attention to detail, inspired by vintage for a timeless look.', 'TerminalX'))
        mails.push(_createMail('Shani, a magical visit awaits!', 'Shani, today\'s the day! We\'re so excited that you\'re finally here. Have a truly magical day at Disneyland® Paris!', 'Disneyland Paris'))
        mails.push(_createMail('You’re invited! Aug 24 Webinar', 'Find out how you can leverage static, headless technologies to optimize your WordPress websites to deliver the highest level of performance, scalability, and security. Join us for an exciting session on Strattic - Elementor’s advanced solution for static WordPress site generation and hosting. Discover why static and headless websites have exploded in popularity and how this 1-click solution might be the right choice for you.', 'Elementor'))
        mails.push(_createMail('Account confirmation: Your Google Cloud free trial', 'Welcome to Google Cloud.Learn the fundamentals with this tutorial and see what else you can do for free on Google Cloud with our Always Free tier. Welcome to your Google Cloud free trial. Beginning today, you have $300 USD in credit to spend on Google Cloud. With your free trial, you can: Use your credits to evaluate the platform risk-free* Explore a wide range of Google Cloud products and services – from Compute Engine and BigQuery to App Engine and industry-leading AI Easily check your credit usage by visiting the Cloud Billing section of your Google Cloud Console','Google Cloud'))
        mails.push(_createMail('Your order via Uber Eats from Saturday evening','Thanks for the order, Shani! This is your receipt for the order from the restaurant LA MANIFATTURA.','Uber Eats'))
        mails.push(_createMail('Guest list', 'Hey there, Please send me a list of all your guest for my wedding party ASAP. I need to know how many people to take into account. Thanks!','Emma'))

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, from) {
    const mail = getEmptyMail(subject, body, from)
    mail.id = utilService.makeId()
    return mail
}