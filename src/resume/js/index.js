import '../css/index.less'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Title from './components/Title.jsx'
import Case from './components/CaseItem.jsx'
import Skill from './components/SkillItem.jsx'

const caseData = [{
    img: require('../images/logo/zbj.png'),
    url: 'https://cloud.zbj.com/',
    desc: `
        <p><b>项目名称：</b>八戒云</p>
        <p><b>所属公司：</b>重庆猪八戒网络有限公司</p>
        <p><b>技术介绍：</b>前端采用jQuery+seajs，并使用fis3作为打包构建工具，中间层采用nodejs调用后端dubbo接口并渲染页面，实现完全意义上的前后端分离。</p>
    `
}, {
    img: require('../images/logo/koukua.png'),
    url: 'http://www.koukua.com/',
    desc: `
    <p><b>项目名称：</b>口夸网</p>
    <p><b>所属公司：</b>个人项目</p>
    <p><b>技术介绍：</b>最初采用传统jQuery+gulp开发，后面逐渐改造成webpack+vuejs的多页面开发模式。</p>
    `
}, {
    img: require('../images/logo/asinrank.png'),
    url: 'http://www.asinrank.com/',
    desc: `
        <p><b>项目名称：</b>Asinrank</p>
        <p><b>所属公司：</b>个人项目</p>
        <p><b>技术介绍：</b>口夸网的海外版本，使用webpack+vuejs开发，部分页面为了方便SEO采用的多页面开发模式，控制面板采用SPA模式开发。</p>
    `
}, {
    img: require('../images/logo/zaful.png'),
    url: 'http://www.zaful.com/',
    desc: `
        <p><b>项目名称：</b>Zaful</p>
        <p><b>所属公司：</b>环球易购电子商务有限公司</p>
        <p><b>技术介绍：</b>前端使用jquery开发，构建工具采用gulp实现雪碧图合并、压缩，js、css预编译及打包、html压缩、动态版本号、热更新等。</p>
    `
}, {
    img: require('../images/logo/rosegal.png'),
    url: 'http://www.rosegal.com/',
    desc: `
        <p><b>项目名称：</b>Rosegal</p>
        <p><b>所属公司：</b>环球易购电子商务有限公司</p>
        <p><b>技术介绍：</b>电商类型网站，前端使用jquery开发，采用gulp作为构建工具实现雪碧图合并、压缩，js、css预编译及打包、html压缩、版本号更新等。</p>
    `
}, {
    img: require('../images/logo/pdm.png'),
    url: 'http://www.430115.com/project/pdm/html/',
    desc: `
        <p><b>项目名称：</b>环球易购产品数据管理系统</p>
        <p><b>所属公司：</b>环球易购电子商务有限公司</p>
        <p><b>技术介绍：</b>使用jquery + less + boostrap全家桶开发。</p>
    `
}];

class App extends Component {
    render() {
        return (
            <div className="resume">
                <Header />
                <main className="resume-body">
                    <section className="resume-body-skill">
                        <Title title="职业技能" subtitle="My Skills" />
                        <div className="progress">
                            <Skill color="#39F" value="0.95">
                                <p className="value">95%</p>
                                <p className="type">HTML</p>
                            </Skill>
                            <Skill color="#f60" value="0.95">
                                <p className="value">95%</p>
                                <p className="type">CSS</p>
                            </Skill>
                            <Skill color="#722ed1" value="0.8">
                                <p className="value">80%</p>
                                <p className="type">JS</p>
                            </Skill>
                            <Skill color="#e14d43" value="0.9">
                                <p className="value">90%</p>
                                <p className="type">jQuery</p>
                            </Skill>
                            <Skill color="#42b983" value="0.9">
                                <p className="value">90%</p>
                                <p className="type">Vuejs</p>
                            </Skill>
                            <Skill color="#61dafb" value="0.5">
                                <p className="value">50%</p>
                                <p className="type">Reactjs</p>
                            </Skill>
                        </div>
                        <div className="desc">
                            <p>1、精通HTML、CSS，对网页w3c规范、web标准、性能优化以及各浏览器的兼容性有着较深的认识；</p>
                            <p>2、熟练使用PS以及一些设计常用的软件，拥有网页设计经验；</p>
                            <p>3、精通Javascript及一些广泛使用的开源库及框架，如：Reactjs、vuejs、jQuery、seajs、bootstrap；理解oop思想及mvvm模式；对ES6、ES7语法也有所了解及使用；</p>
                            <p>4、拥有丰富的PC端及移动端web开发经验，对响应式布局、自适应布局理解透彻，熟练运用html5及css3的新特性；</p>
                            <p>5、熟练使用前端构建工具，如gulp、webpack、fis3，并能根据不同项目结构编写打包配置、熟练使用git、svn项目管理工具；</p>
                            <p>6、熟悉nodejs的开发及部署，熟悉Linux操作系统。</p>
                        </div>
                    </section>

                    <section className="resume-body-case">
                        <Title title="项目展示" subtitle="My Cases" />
                        <div className="list">
                            <ul>
                                {caseData.map((item, index) => <Case key={index} url={item.url} img={item.img} desc={item.desc} />)}
                            </ul>
                        </div>
                    </section>

                    <section className="resume-body-experience clearfix">
                        <Title title="工作经历" subtitle="Work Expenerces" />
                        <div className="list">
                            <div className="item">
                                <h3>2017</h3>
                                <ul>
                                    <li>
                                        <span>7月27日</span>
                                        <p>
                                            <span>
                                                加入<a href="https://www.zbj.com">【重庆猪八戒网络有限公司】</a>担任高级前端开发工程师一职，主要工作内容如下：<br />
                                                1、负责八戒云（cloud.zbj.com）从无到有的开发和后期日常的开发维护工作；<br />
                                                2、负责八戒云合作伙伴系统从无到有的开发和后期日常的开发维护工作；<br />
                                                3、在基于前后端分离的开发模式上定制一些通用UI组件以便于后期更高效的开发；<br />
                                                4、使用nodejs调用dubbo接口，实现基础业务逻辑的编排及接口定义、页面渲染等。
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="item">
                                <h3>2015</h3>
                                <li>
                                    <span>4月01日</span>
                                    <p>
                                        <span>
                                            加入<a href="http://www.globalegrow.com/" target="_blank">【深圳环球易购有限公司】</a>，主要职责如下：<br />
                                            1、负责公司数个跨境电商平台的日常维护（如rosegal.com、zaful.com、gearbest.com等）;<br />
                                            2、独立负责公司内部系统研发（产品系统、图片上传系统等）;<br />
                                            3、小组内部前端组长(小组内前端7人) ，负责前端工作协调、规范文档撰写以及不定期的组织技术分享会等;<br />
                                            4、推进过公司的技术栈，如gulp构建工具及vuejs的使用；<br />
                                            5、提出过一些解决方案，如webp格式的应用、前端报错监控的实现；<br />
                                        </span>
                                    </p>
                                </li>
                            </div>
                            <div className="item">
                                <h3>2014</h3>
                                <li><span>5月04日</span><p><span>加入<a href="http://www.gg-led.com/default_index_new.php" target="_blank">【深圳高工产业研究有限公司】</a>，正式转职为前端开发，负责开发公司o2o商城系统，主要负责该系统的用户前端页面开发、经销商/供应商后台的前端页面开发、移动端web商城开发。</span></p></li>
                            </div>
                            <div className="item">
                                <h3>2013</h3>
                                <li>
                                    <span>3月03日</span>
                                    <p><span>离开武汉来到深圳，并于3月03日加入<a href="http://www.aipiao.cn/" target="_blank">【深圳鹏讯网络科技有限公司】</a>公司主营网站是 深圳论坛 和 爱票网、主营业务是运营公司旗下的网站和票务，爱票网的前端所有工作均由我完成，偶尔需要负责维护一下公司其他网站。</span></p>
                                </li>
                            </div>
                            <div className="item">
                                <h3>2012</h3>
                                <li><span>3月12日</span><p><span>3月12日加入<a href="http://www.ywhl.cn/" target="_blank">【武汉亿网互联】</a>，该公司主营业务是IDC和建站服务，我在该公司基本上属于打杂的，一个人身兼多职，页面设计、静态页面变编写、套程序模板（开源cms）、项目上线都由我一个人完成。在该公司独立完成了项目【武汉在线】</span></p></li>
                            </div>
                        </div>
                    </section>

                    <section className="resume-body-intro">
                        <Title title="自我介绍" subtitle="My Introduction" />
                        <div className="content">
                            <blockquote>热爱互联网行业和前端技术，有着十分饱满的工作热情，抗压能力还算不错，有较强的学习能力。工作中，能够和团队成员良好的沟通，有较强的团队协作精神，并且经常提出自己的想法及意见供大家参考，尽可能保质保量完成公司的项目。工作之余喜欢上github和一些技术论坛关注新技术和趋势，偶尔写写blog记录下工作中遇到的问题以及学习心得。一直相信只有不断学习才能不断成长。</blockquote>
                        </div>
                    </section>
                </main>
                <Footer>Designed by Yuuk and coded by Yuuk. </Footer>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
