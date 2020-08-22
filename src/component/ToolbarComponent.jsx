import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

//import ThemesList from "./thematic/ThemesList";

const toolbarStyle = {
  display: 'flex',
  backgroundColor: '#d6e2ea',
  padding: '6px 8px'
};

class ToolbarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
        this.login = this.login.bind(this);
        this.login = this.login.bind(this);
    }

    drawMenu() {
        this.setState({opened: !this.state.opened})
    }

    login() {
        this.props.history.push('/login');
    }

    navigate() {
        this.props.history.push('/');
    }


    render() {
        return (
           /*<div>*/
            <div style={toolbarStyle}>
                <button onClick={() => this.drawMenu()}><i class="fa fa-bars" aria-hidden="true"></i></button>
                <div style={{ flex: 1 }}></div>
                <button title="Home" onClick={() => this.navigate()} style={{marginRight: '10px'}}><i class="fa fa-home"></i></button>
                <button title="Login" onClick={() => this.login()}><i class="fa fa-user-o"></i></button>
            </div>
            /*<div>
                {!this.state.opened ? <ThemesList/> : null}
            </div>
            </div>*/
        );
    }
}

export default withRouter(ToolbarComponent);