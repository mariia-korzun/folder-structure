import React, { Component } from 'react'

import Folder from '../folder'
import File from '../file'

import './node.css'

export default class Node extends Component {

    areEqualLevels(arrayOne, arrayTwo) {
        return (arrayOne.length === arrayTwo.length && arrayOne.every((item, index) => { return item === arrayTwo[index] }))
    }

    render() {

        const { content: children, level, openModalWindow, renameTitle, renamedTitleId, onItemRename } = this.props

        let content = null
        if (children) {

            content = children.map((item, id) => {
                const itemId = [...level]
                itemId.push(id)

                let renameThisItemTitle = false
                let renameDeeperTitle = false
                if (renameTitle) {
                    renameThisItemTitle = this.areEqualLevels(renamedTitleId, itemId)
                    if (!renameThisItemTitle) {
                        renameDeeperTitle = true
                    }
                }

                const newProps = {
                    data: item, itemId,
                    renameDeeperTitle,
                    renameThisItemTitle,
                    renamedTitleId,
                    openModalWindow, onItemRename,
                    key: item.key
                }

                let node = item.folder ?
                    <Folder  {...newProps} /> : <File  {...newProps} />

                    return <div className="node">{node}</div>
            })
        } else {

            content = <span>Folder is empty</span>
        }

        return (
            <ul>
                {content}
            </ul>
        )
    }
}
