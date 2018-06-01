import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Skill extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="progress-item">
                <svg className="progress-item-circle " viewBox="0 0 100 100">
                    <path className="progress-item-circle-trail" d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke="#f3f3f3" strokeWidth="6" fillOpacity="0" style={{strokeDasharray: '295.31px, 295.31px', strokeDashoffset: '0px'}}></path>
                    <path className="progress-item-circle-path" d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" strokeLinecap="round" stroke={ this.props.color } strokeWidth="6" fillOpacity="0" style={{strokeDasharray: `${(this.props.value * 295.31).toFixed(2)}px, 295.31px`, strokeDashoffset: '0px'}}></path>
                </svg>
                <div className="progress-item-text">{this.props.children}</div>
            </div>
        )
    }
}



Skill.propTypes = {
    color: PropTypes.string,
    value: PropTypes.number
}

export default Skill