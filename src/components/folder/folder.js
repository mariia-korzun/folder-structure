import React, { Component } from 'react'

import Node from '../node'
import Title from '../title'
import './folder.css'


export default class Folder extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
        this.toogleFolder = () => {
            this.setState(({ open }) => {
                return { open: !open }
            })
        }
    }


    render() {
        const { open } = this.state
        const { itemId, openModalWindow, renameDeeperTitle,
            renameThisItemTitle, renamedTitleId,
            onItemRename, data: { title, children } } = this.props

        let img = <i className="bi bi-folder"></i>
        let content = null
        if (open) {

            img = <i className="bi bi-folder2-open"></i>
            content = <Node content={children} level={itemId} {...{ openModalWindow, onItemRename, renameTitle:renameDeeperTitle, renamedTitleId }} />

        }

        const onClick = renameThisItemTitle ? null : this.toogleFolder

        return (
            < li >
                <div onClick={onClick} onContextMenu={(event) => { openModalWindow(event, itemId) }}>
                    {img}
                    <Title {...{ title, renameThisItemTitle, onItemRename }} />
                </div>

                <ul>
                    {content}
                </ul>
            </li>

        )
    }

}

