import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

const toolbarStyle = {
  display: 'flex',
  backgroundColor: '#d6e2ea',
  padding: '6px 8px'
};

class ToolbarComponent extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div style={toolbarStyle}>
                <button><i class="fa fa-bars" aria-hidden="true"></i></button>
                <div style={{ flex: 1 }}></div>
                <button title="Login" onClick={() => this.login()}><i class="fa fa-user-o"></i></button>
            </div>
        );
    }
}

export default withRouter(ToolbarComponent);