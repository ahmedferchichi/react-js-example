import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import PublicationApiService from "../../service/PublicationApiService";
import ThematicApiService from "../../service/thematic/ThematicApiService";

class EditPublicationComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            title: '',
            content: '',
            thematics: [],
            thematicOptions: []
        }
        this.savePublication = this.savePublication.bind(this);
        this.loadPublication = this.loadPublication.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentDidMount() {
        this.loadPublication();
        ThematicApiService.fetchThemes()
            .then((res) => {
                this.setState({thematicOptions: res.data.result})
            }
        );
    }

    loadPublication() {
        PublicationApiService.fetchPublicationById(window.localStorage.getItem("publicationId"))
            .then((res) => {
                let publication = res.data.result;
                this.setState({
                id: publication.id,
                title: publication.title,
                content: publication.content,
                editor: publication.editor,
                date: publication.date,
                thematics: publication.thematics,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    onSelect(selectedList, selectedItem) {
        this.setState({thematics: selectedList});
    }

    onRemove(selectedList, removedItem) {
        selectedList.length !== 0 ? this.setState({thematics: selectedList}) : this.setState({thematics: []});
    }

    savePublication = (e) => {
        e.preventDefault();
        let publication = {id: this.state.id, title: this.state.title, content: this.state.content, thematics: this.state.thematics};
        PublicationApiService.editPublication(publication)
            .then(res => {
                this.setState({message : 'Publication added successfully.'});
                this.props.history.push('/publications');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Publication</h2>
                <form>

                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" placeholder="title" name="title" className="form-control" value={this.state.title} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Content:</label>
                        <input placeholder="content" name="content" className="form-control" value={this.state.content} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Editor:</label>
                        <input placeholder="editor" name="editor" className="form-control" readonly="true" defaultValue={this.state.editor}/>
                    </div>

                    <div className="form-group">
                        <label>Date:</label>
                        <input placeholder="date" name="date" className="form-control" readonly="true" defaultValue={this.state.date}/>
                    </div>

                    <div className="form-group">
                        <label>Thematic: </label>
                        <Multiselect
                            options={this.state.thematicOptions} // Options to display in the dropdown
                            selectedValues={this.state.thematics} // Preselected value to persist in dropdown
                            onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="title" // Property name to display in the dropdown options
                        />
                    </div>

                    <button className="btn btn-success" onClick={this.savePublication}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditPublicationComponent;