

export function NoteVideo({ info }) {
    return <section className="note-video">
        <p>{info.title}</p>
        <video  className="note-vid" controls="" autoPlay muted> <source src={info.url} type="video/mp4" />
        </video>


    </section>
}


