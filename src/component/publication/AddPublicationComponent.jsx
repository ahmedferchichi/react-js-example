import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import PublicationApiService from "../../service/PublicationApiService";
import ThematicApiService from "../../service/thematic/ThematicApiService";

class AddPublicationComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            title: '',
            content: '',
            editor: '',
            date: new Date(),
            thematics: [],
            message: null,
            thematicOptions: []
        }
        this.savePublication = this.savePublication.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentDidMount() {
        ThematicApiService.fetchThemes()
            .then((res) => {
                this.setState({thematicOptions: res.data.result})
            });
    }

    savePublication = (e) => {
        e.preventDefault();
        let publication = {title: this.state.title, content: this.state.content, editor: this.state.editor, date: this.state.date, thematics: this.state.thematics};
        PublicationApiService.addPublication(publication)
            .then(res => {
                this.setState({message : 'Publication added successfully.'});
                this.props.history.push('/publications');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    onSelect(selectedList, selectedItem) {
        this.setState({thematics: selectedList});
    }

    onRemove(selectedList, removedItem) {
        this.setState({thematics: selectedList});
    }

    render() {

        return(
            <div>
                <h2 className="text-center">Add Publication</h2>
                <form>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" placeholder="title" name="title" className="form-control" value={this.state.title} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Content:</label>
                    <input type="text" placeholder="content" name="content" className="form-control" value={this.state.content} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Editor:</label>
                    <input placeholder="editor" name="editor" className="form-control" value={this.state.editor} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Thematic:</label>
                    <Multiselect
                        options={this.state.thematicOptions} // Options to display in the dropdown
                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
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

export default AddPublicationComponent;