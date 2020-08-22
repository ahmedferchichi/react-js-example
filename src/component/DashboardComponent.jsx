import React, { Component } from 'react';

import ToolbarComponent from "./ToolbarComponent";
import PublicationApiService from "../service/PublicationApiService";
import Publication from "./publication/Publication";

class DashboardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            publications: [],
        }
    }

    componentDidMount() {
        PublicationApiService.fetchPublications().then((res) => {
            this.setState({publications: res.data.result});
        });
    }

    render () {
        return (
            <div className="container">
                <div className="col-md-9">
                    <ToolbarComponent/>
                    <div>
                        {this.state.publications.map( (publication, index) => {
                            return <Publication element={publication}/>}
                        )}
                    </div>
                    <footer>
                        <button title="Publications list" style={{textAlign: 'end'}}><i class="fa fa-list-ul"></i></button>
                    </footer>
                </div>
            </div>
        );
    }
}
export default DashboardComponent;