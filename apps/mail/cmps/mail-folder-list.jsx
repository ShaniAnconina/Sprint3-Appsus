const { useEffect, useRef, useState } = React

export function MailFolderList({ countUnreadedMails, setIsModal, setFilterBy, setSelcetedMail }) {
    // const elInputRef = useRef(null)

    // useEffect(() => {
    //     elInputRef.current.focus()
    // }, [])

    function onFilterFolders(folder) {
        setSelcetedMail(null)
        setFilterBy((prevFilter) => {
            return { ...prevFilter, folder }
        })
    }



    return <section className="mail-folder-list">
        <button onClick={() => setIsModal(true)} title='Compose new email' className="fa-solid compose"><p className='text'>Compose</p></button>
        <div className="folders">
            {/* <button ref={elInputRef} className="inbox" onClick={() => onFilterFolders('inbox')} ><span className="fa-solid inbox-icon"></span> Inbox</button> */}
            <button className="inbox" onClick={() => onFilterFolders('inbox')} ><span className="fa-solid inbox-icon"></span>Inbox {countUnreadedMails}</button>
            <button className="sent" onClick={() => onFilterFolders('sent')} ><span className="fa-regular sent-icon"></span>Sent</button>
            <button className="trash" onClick={() => onFilterFolders('trash')} ><span className="fa-regular trash-icon"></span>Trash</button>
            <button className="draft" onClick={() => onFilterFolders('draft')} ><span className="fa-regular draft-icon"></span>Draft</button>
        </div>
    </section>
}