import React from 'react'

import Title from '../title'

import './file.css'


const File = (props) => {

    const { openModalWindow, renameThisItemTitle,
        onItemRename,
        itemId, data: { title } } = props

    return (
        <li>
            <div onContextMenu={(event) => { openModalWindow(event, itemId) }}>
                <i className="bi bi-file-earmark"></i>
                <Title {...{ title, renameThisItemTitle, onItemRename }} />
            </div>
        </li>
    )
}

export default File