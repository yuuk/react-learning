import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Drag from './Drag';

import '../css/index.less';


class Index extends Component {
    render() {
        return (
            <div>
                <Drag><img src="https://png.icons8.com/office/2x/sheep.png"/></Drag>
                <Drag><img src="https://png.icons8.com/office/2x/cow.png"/></Drag>
                <Drag><img src="https://png.icons8.com/color/2x/grasshopper.png"/></Drag>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));
