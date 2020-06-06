import React, { Component } from 'react'
import ThematicApiService from "../../service/thematic/ThematicApiService";

class ListThematicComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            themes: [],
            message: null
        }
        this.deleteThematic = this.deleteThematic.bind(this);
        this.editThematic = this.editThematic.bind(this);
        this.addThematic = this.addThematic.bind(this);
        this.reloadThematicList = this.reloadThemesList.bind(this);
    }

    componentDidMount() {
        this.reloadThemesList();
    }

    reloadThemesList() {
        ThematicApiService.fetchThemes()
            .then((res) => {
                this.setState({themes: res.data.result})
            });
    }

    deleteThematic(id) {
        ThematicApiService.deleteThematic(id)
            .then(res => {
                this.setState({message : 'Thematic deleted successfully.'});
                this.setState({themes: this.state.themes.filter(thematic => thematic.id !== id)});
            });
    }

    editThematic(id) {
        window.localStorage.setItem("thematicId", id);
        this.props.history.push('/edit-thematic');
    }

    addThematic() {
        window.localStorage.removeItem("thematicId");
        this.props.history.push('/add-thematic');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Themes List</h2>
                <button className="btn btn-danger" style={{width:'100px'}} onClick={() => this.addThematic()}> Add Thematic </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                                <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.themes.map(
                                thematic =>
                                    <tr key={thematic.id}>
                                        <td>{thematic.title}</td>
                                        <td>
                                            <button title="Delete" onClick={() => this.deleteThematic(thematic.id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            <button title="Edit" onClick={() => this.editThematic(thematic.id)} style={{marginLeft: '20px'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>
                                )
                            }
                    </tbody>
                </table>

            </div>
        );
    }
}

export default ListThematicComponent;
