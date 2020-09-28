import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const ThemeContext = React.createContext({});

class ThemedButton extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {(context) => <button type="button">{context}</button>}
            </ThemeContext.Consumer>
        );
    }
}

class Toolbar extends Component {
    render() {
        return <ThemedButton />;
    }
}

class Form extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            img: null,
        };
    }

    handleChange = (e: any) => {
        const { value, files } = e.target;
        const reader = new FileReader();
        if (!value) return;
        reader.onload = () => {
            this.setState({ img: reader.result });
        };
        reader.readAsDataURL(files[0]);
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        console.warn(this);
    };

    render() {
        const { img } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    File:
                    {img ? <img width="100" src={img} /> : null}
                    <input type="file" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class App extends Component {
    render() {
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
                <Form />
            </ThemeContext.Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
