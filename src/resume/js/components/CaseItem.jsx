import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CaseItem extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <li>
                <a href={ this.props.url } target="_blank">
                    <img src={ this.props.img } />
                    <div dangerouslySetInnerHTML={{__html: this.props.desc}}></div>
                </a>
            </li>
        )
    }
}

CaseItem.propTypes = {
    img: PropTypes.string,
    url: PropTypes.string,
    desc: PropTypes.any.isRequired
}

export default CaseItem