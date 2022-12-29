

export function MailCompose() {

    return <section className="mail-compose">
        <div className="new-mail">
            <p>New email</p>
            <button>X</button>
        </div>
        <div className="mail-content">
            <form>
                <input type="text" className="to" placeholder="To" />
                <hr />
                <input type="text" className="subject" placeholder="Subject" />
                <hr />
                <input type="text" className="content" />
                <div className="send-delete">
                    <button className="send">Send</button>
                    <button>Delete</button>
                </div>
            </form>
        </div>
    </section>
}