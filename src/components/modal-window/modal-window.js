import React from 'react'

import './modal-window.css'

const ModalWindow = React.forwardRef((props, ref) => {

    const { left, top, onClickDeleteButton, onClickRenameButton } = props

    const styles = {
        top: top,
        left: left
    }
    return (
        <div className="modal-window" style={styles} ref={ref}>
            <button onClick={onClickRenameButton}>
                Rename
            </button>
            <button onClick={onClickDeleteButton}>
                Delete
            </button>
        </div>
    )
})

export default ModalWindow