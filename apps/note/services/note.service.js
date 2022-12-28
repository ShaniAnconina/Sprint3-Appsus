import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


const NOTE_KEY = 'noteDB'
_createNote()


export const noteService = {
    query,
}

function query() {
    return storageService.query(NOTE_KEY)
}

function _createNote() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            { id: "n101", type: "note-txt", isPinned: true, info: { txt: "Fullstack Me Baby!" } },
            { id: "n102", type: "note-img", info: { url: "http://some-img/me", title: "Bobi and Me" }, style: { backgroundColor: "#00d" } },
            { id: "n103", type: "note-todos", info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] } }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}