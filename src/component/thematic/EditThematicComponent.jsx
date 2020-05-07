import React, { Component } from 'react'
import ThematicApiService from "../../service/thematic/ThematicApiService";

class EditThematicComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            title: ''
        }
        this.saveThematic = this.saveThematic.bind(this);
        this.loadThematic = this.loadThematic.bind(this);
    }

    componentDidMount() {
        this.loadThematic();
    }

    loadThematic() {
        ThematicApiService.fetchThematicById(window.localStorage.getItem("thematicId"))
            .then((res) => {
                let thematic = res.data.result;
                this.setState({
                id: thematic.id,
                title: thematic.title
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveThematic = (e) => {
        e.preventDefault();
        let thematic = {id: this.state.id, title: this.state.title};
        ThematicApiService.editThematic(thematic)
            .then(res => {
                this.setState({message : 'Thematic added successfully.'});
                this.props.history.push('/themes');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Thematic</h2>
                <form>

                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" placeholder="title" name="title" className="form-control" defaultValue={this.state.title} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveThematic}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditThematicComponent;