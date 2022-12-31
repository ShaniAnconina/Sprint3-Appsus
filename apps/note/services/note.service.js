import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createNote()

export const noteService = {
    query,
    remove,
    save,
    get,
    getEmptyNoteInfoForTxt,
    getEmptyNoteInfoForImg,
    getEmptyNoteInfoForTodos,
    getEmptyNoteTxt,
    getEmptyNoteImg,
    getEmptyNoteTodos,
    getDefaultFilter,

}

function getDefaultFilter() {
    return { txt: '', folder: '' }
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.info.title) || regex.test(note.info.txt))
            }
            if (filterBy.folder) {
                if (filterBy.folder === 'all') notes = notes
                else if (filterBy.folder === 'note-todos') notes = notes.filter(note => note.type === 'note-todos')
                else if (filterBy.folder === 'note-img') notes = notes.filter(note => note.type === 'note-img')
                else if (filterBy.folder === 'note-video') notes = notes.filter(note => note.type === 'note-video')
                else if (filterBy.folder === 'note-txt') notes = notes.filter(note => note.type === 'note-txt')

            }
            return notes
        })

}


function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        if (note.type === 'note-todos') note.info.todos.forEach((todo) => todo.id = utilService.makeId())
        return storageService.post(NOTE_KEY, note)
    }
}

function get(id) {
    return storageService.get(NOTE_KEY, id)
}

function getEmptyNoteInfoForTxt() {
    return { txt: '' }
}

function getEmptyNoteInfoForImg() {
    return { title: '', url: '' }
}

function getEmptyNoteInfoForTodos() {
    return { title: '', todos: [] }
}

function getEmptyNoteTxt() {
    return {
        type: "note-txt", isPinned: false, style: { backgroundColor: "#fff" }
    }
}

function getEmptyNoteImg() {
    return {
        type: "note-img", isPinned: false, style: { backgroundColor: "#fff" }
    }
}

function getEmptyNoteTodos() {
    return {
        type: "note-todos", isPinned: false, style: { backgroundColor: "#fff" }
    }
}

function remove(id) {
    return storageService.remove(NOTE_KEY, id)
}


function _createNote() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [{
            type: 'note-img',
            isPinned: false,
            info: {
                url: 'https://www.coding-academy.org/images/thumbnail-1200x630-v2.png',
                title: `Let's code`
            },
            style: { backgroundColor: '#00d' }
        },
        {
            createdAt: 1112222,
            type: 'note-txt',
            isPinned: true,
            style: { backgroundColor: '#00d' },
            info: { txt: 'Fullstack Me Baby!' }
        }, {
            type: 'note-img',
            isPinned: false,
            info: {
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEHVgGAKx5zZLOgfSKvgcEB_VEyZFeeEc9XQ&usqp=CAU',
                title: `Asi's Enter`
            },
            style: { backgroundColor: '#00d' }
        },
        {
            type: 'note-video',
            isPinned: false,
            info: {
                url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
                title: 'Bobi and Me'
            },
            style: { backgroundColor: '#00d' }
        },
        {
            createdAt: 1112222,
            type: 'note-txt',
            isPinned: true,
            style: { backgroundColor: '#00d' },
            info: { txt: 'Pashuti shecaze' }
        },
        {
            createdAt: 1112222,
            type: 'note-txt',
            isPinned: true,
            style: { backgroundColor: '#00d' },
            info: { txt: 'No woman, no cry' }
        }, {
            type: 'note-img',
            isPinned: false,
            info: {
                url: 'https://flxt.tmsimg.com/assets/p185008_b_h10_ai.jpg',
                title: 'The office'
            },
            style: { backgroundColor: '#00d' }
        },

        {
            type: 'note-todos',
            isPinned: false,
            info: {
                title: 'Get my stuff together',
                todos: [{

                    txt: 'Driving liscence',
                    doneAt: null
                }, {

                    txt: 'Let it be',
                    doneAt: 187111111
                },
                {
                    txt: 'Coding power',
                    doneAt: 187111111
                }]
            }
        },
        {
            createdAt: 1112222,
            type: 'note-txt',
            isPinned: true,
            style: { backgroundColor: '#00d' },
            info: { txt: 'Just remember, you ARE ugly' }
        }, {
            type: 'note-img',
            isPinned: true,
            info: {
                url: 'https://www.meme-arsenal.com/memes/92ddf1ced58cf6ba1992695b9c244726.jpg',
                title: 'My brain after this sprint'
            }
        },
        {
            type: 'note-video',
            isPinned: false,
            info: {
                url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/SintelVideo.mp4',
                title: 'Best movie ever'
            },
            style: { backgroundColor: '#00d' }
        }, {
            type: 'note-todos',
            isPinned: false,
            info: {
                title: 'Tasks for Monday',
                todos: [{

                    txt: 'Buy milk',
                    doneAt: null
                }, {

                    txt: 'Schedule appointment',
                    doneAt: null
                }, {

                    txt: 'Clean the house',
                    doneAt: 1231254
                }, {

                    txt: 'Spanish lesson',
                    doneAt: null
                }
                ]
            }
        },
        ]

        notes.forEach((note) => {
            note.id = utilService.makeId()
            note.style = { backgroundColor: "#fff" }
            if (note.type === 'note-todos') note.info.todos.forEach((todo) => todo.id = utilService.makeId())
        })
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}