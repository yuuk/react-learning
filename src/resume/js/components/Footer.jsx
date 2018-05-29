import React, {Component} from 'react'

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <footer className="resume-footer">
                <p>{ this.props.children }</p>
            </footer>
        )
    }
}

export default Footer