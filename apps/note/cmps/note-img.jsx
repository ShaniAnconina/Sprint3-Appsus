

export function NoteImg({info}){

    return <section className="note-img">
        <p>{info.title}</p>
        <img src={info.url} alt="" />
    </section>
}