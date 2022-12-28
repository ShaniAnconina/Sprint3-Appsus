import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"
import { NoteTxt } from "./note-txt.jsx"

export function DynamicCmp({type, info}){
    switch (type) {
        case 'note-txt':
            return <NoteTxt info={info} />
        case 'note-todos':
            return <NoteTodos info={info} />
        case 'note-img':
            return <NoteImg info={info} />
    }
}