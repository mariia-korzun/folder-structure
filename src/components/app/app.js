import React, { Component } from 'react'

import data from '../data'
import { v4 as uuidv4 } from 'uuid'

import Node from '../node'
import ModalWindow from '../modal-window'

import './app.css'

export default class App extends Component {
    constructor() {
        super()
        this.level = []
        this.state = {
            data : this.addUniqueKeysToData(data),
            isOpenModalWindow: false,
            selectedItemId: null,
            modalWindowY: null,
            modalWindowX: null,
            renameTitle: false
        }

        this.modalWindowRef = React.createRef()

        this.onItemDelete = () => {
            this.setState(({ data, selectedItemId }) => {
                const newData = this.changeData(this.copyData(data), selectedItemId, (array, index) => {
                    return [...array.slice(0, index), ...array.slice(index + 1)]
                })
                return {
                    data: newData
                }
            })
        }

        this.onClickRenameButton = () => {
            this.setState({
                renameTitle: true
            })
            // this.closeModalWindow()
        }


        this.changeData = (data, itemId, func) => {

            let index = itemId[0]
            if (itemId.length == 1) {
                data = func(data, index)
            } else {
                data[index].children = this.changeData(data[index].children, itemId.slice(1), func)
            }

            return data
        }


        this.onItemRename = (value) => {

            this.setState(({ data, selectedItemId }) => {
                const newData = this.changeData(this.copyData(data), selectedItemId, (array, index) => {
                    array[index].title = value
                    return array
                })
                return {
                    data: newData,
                    renameTitle: false
                }
            })
        }

        this.openModalWindow = (event, id) => {
            event.preventDefault()

            const x = `${event.clientX}px`
            const y = `${event.clientY}px`
            this.setState({
                modalWindowY: y,
                modalWindowX: x,
                selectedItemId: id,
                isOpenModalWindow: true
            })
        }

        this.closeModalWindow = () => {
            this.setState({
                isOpenModalWindow: false
            })
        }

    }

    copyData(array) {
        return array.map(item => {
            if (item.children) {
                return { ...item, children: this.copyData(item.children) }
            } else {
                return { ...item }
            }
        })
    }

    addUniqueKeysToData(data) {
        return data.map(item => {
            let newItem = { ...item, key: uuidv4() }
            if (item.children) {
                newItem = { ...newItem, children: this.addUniqueKeysToData(item.children) }
            }
            return newItem
        })
    }

    componentDidMount() {
        document.addEventListener('click', ({ target }) => {
            const { isOpenModalWindow } = this.state
            if (isOpenModalWindow && target !== this.modalWindowRef.current) {

                this.closeModalWindow()
            }
        })
    }

    render() {
        const { data, isOpenModalWindow,
            modalWindowY, modalWindowX,
            renameTitle, selectedItemId } = this.state

        let modalWindow = null
        if (isOpenModalWindow) {
            modalWindow = <ModalWindow
                ref={this.modalWindowRef}
                left={modalWindowX} top={modalWindowY}
                onClickDeleteButton={this.onItemDelete}
                onClickRenameButton={this.onClickRenameButton}
            />
        }

        const { openModalWindow, level, onItemRename } = this
        const nodeProps = { openModalWindow, level, renameTitle, onItemRename, renamedTitleId: selectedItemId }

        return (
            <div className="app">
                <Node content={data} {...nodeProps} />

                {modalWindow}
            </div>
        )
    }
}
