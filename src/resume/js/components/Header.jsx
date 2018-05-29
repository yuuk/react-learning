import React, {Component} from 'react'

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <header className="resume-header">
                <div className="resume-header-avatar">
                    <img src={ require('../../images/avatar.jpg?v=1') }/>
                </div>
                <h1 className="resume-header-position">Web前端开发求职简历<span>Kevin Yu's Web front-end development Resume</span></h1>
                <div className="resume-header-contacts">
                    <p><i className="iconfont">&#xe601;</i>余 凯&nbsp;&nbsp;Kevin Yu</p>
                    <p><i className="iconfont">&#xe603;</i><a href="http://wpa.qq.com/msgrd?v=3&uin=645481746&site=qq&menu=yes" title="点击联系QQ">645-481-746</a></p>
                    <p><i className="iconfont">&#xe602;</i><a href="mailto:yuuk520@gmail.com" title="点击给我发邮件">yuuk520@gmail.com</a></p>
                    <p><i className="iconfont">&#xe600;</i>+86 159-7200-1483</p>
                </div>
            </header>
        )
    }
}

export default Header