import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createNote()

export const noteService = {
    query,
    remove,
    save,
    get,
    getEmptyNoteInfo,
    getEmptyNote

}

function save(note){
        if (note.id) {
            return storageService.put(NOTE_KEY, note)
        } else {
            return storageService.post(NOTE_KEY, note)
        }
}

function get(id) {
    return storageService.get(NOTE_KEY, id)
}

function getEmptyNoteInfo() {
    return { txt: '' }
}

function getEmptyNote() {
    return {
        type: "note-txt", isPinned: false
    }
}

function remove(id) {
    return storageService.remove(NOTE_KEY, id)
}


function query() {
    return storageService.query(NOTE_KEY)
}

function _createNote() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101", type: "note-txt", isPinned: true,
                info: { txt: "Fullstack Me Baby!" }
            },
            {
                id: "n102", type: "note-img",
                info: { url: "https://flxt.tmsimg.com/assets/p185008_b_h10_ai.jpg", title: "The office" },
                style: { backgroundColor: "#00d" }
            },
            {
                id: "n103", type: "note-todos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null, id: utilService.makeId() },
                        { txt: "Coding power", doneAt: 187111111, id: utilService.makeId() }
                    ]
                }
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}