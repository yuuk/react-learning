import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Title extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <header className="resume-section-title">
                <p className="cn-name">{ this.props.title }</p>
                <p className="en-name">{ this.props.subtitle }</p>
            </header>
        )
    }
}

Title.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
}

export default Title