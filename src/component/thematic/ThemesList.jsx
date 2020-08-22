import React, { Component } from 'react';

import ThematicApiService from "../../service/thematic/ThematicApiService";

class ThemesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            themes: [],
        }
        this.reloadThematicList = this.reloadThemesList.bind(this);
    }

    reloadThemesList() {
        ThematicApiService.fetchThemes()
            .then((res) => {
                this.setState({themes: res.data.result})
        });
    }

    render() {
        return (
            <div className="col-md-3">
                {
                    this.state.themes.map(
                        thematic =>
                            <div>{thematic.title}</div>
                    )
                }
            </div>
        );
    }
}
export default ThemesList;