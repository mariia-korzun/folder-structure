import React, { Component } from 'react'

import './title.css'

export default class Title extends Component {
    constructor() {
        super()
        this.state = {
            title: ''
        }
        this.ref = React.createRef()
        this.onChange = ({ target }) => {
            this.setState({
                title: target.value
            })
        }
    }
    componentDidMount() {
        this.setState({
            title: this.props.title
        })
    }
    onFocus({ target }) {
        target.setSelectionRange(0, this.state.title.length)
    }
    componentDidUpdate() {
        const { renameThisItemTitle: renameTitle } = this.props
        if (renameTitle) {
            this.ref.current.focus()
        }
    }

    render() {
        const { title } = this.state
        const { renameThisItemTitle: renameTitle, onItemRename } = this.props
        const disabled = !renameTitle
        const className = disabled ? "title-input-disabled" : "title-input-enabled"

        return (
            <form className="title-form"
                onSubmit={(event) => {
                    event.preventDefault()
                    onItemRename(title)
                }}>

                <input value={title}
                    ref={this.ref}
                    className={className}
                    disabled={disabled}
                    onFocus={(e)=>{this.onFocus(e)}} onChange={this.onChange} onBlur={() => { onItemRename(title) }} />

            </form>
        )
    }

}


