import React, { Component } from 'react'
import ThematicApiService from "../../service/thematic/ThematicApiService";

class AddThematicComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            title: '',
            message: null
        }
        this.saveThematic = this.saveThematic.bind(this);
    }

    saveThematic = (e) => {
        e.preventDefault();
        let thematic = {title: this.state.title};
        ThematicApiService.addThematic(thematic)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/themes');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Thematic</h2>
                <form>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" placeholder="title" name="title" className="form-control" value={this.state.title} onChange={this.onChange}/>
                </div>
                <button className="btn btn-success" onClick={this.saveThematic}>Save</button>
            </form>
    </div>
        );
    }
}

export default AddThematicComponent;