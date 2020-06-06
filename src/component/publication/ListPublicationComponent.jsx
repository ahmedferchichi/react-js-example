import React, { Component } from 'react'
import PublicationApiService from "../../service/PublicationApiService";

class ListPublicationComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            checked: false,
            publications: [],
            message: null
        }
        this.deletePublication = this.deletePublication.bind(this);
        this.editPublication = this.editPublication.bind(this);
        this.addPublication = this.addPublication.bind(this);
        this.reloadPublicationList = this.reloadPublicationList.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.check = this.check.bind(this);
        this.overlook = this.overlook.bind(this);
    }

    componentDidMount() {
        this.reloadPublicationList();
    }

    reloadPublicationList() {
        PublicationApiService.fetchPublications()
            .then((res) => {
                this.setState({publications: res.data.result})
            });
    }

    deletePublication(id) {
        PublicationApiService.deletePublication(id)
                    .then(res => {
                        this.setState({message : 'Publication deleted successfully.'});
                        this.setState({publications: this.state.publications.filter(publication => publication.id !== id)});
                    });
    }

    editPublication(id) {
        window.localStorage.setItem("publicationId", id);
        this.props.history.push('/edit-publication');
    }

    addPublication() {
        window.localStorage.removeItem("publicationId");
        this.props.history.push('/add-publication');
    }

    show() {
        this.setState({visible : true});
    }

    hide() {
        this.setState({visible : false});
    }

    check() {
        this.setState({checked : true});
    }

    overlook() {
        this.setState({checked : false});
    }

    render() {
        let showButton;
        let checkButton;
        this.state.visible ? showButton = <button title="Show" onClick={() => this.hide()} style={{marginLeft: '20px'}}><i class="fa fa-eye-slash" aria-hidden="true"></i></button>
            : showButton = <button title="Hide" onClick={() => this.show()} style={{marginLeft: '20px'}}><i class="fa fa-eye" aria-hidden="true"></i></button>
        this.state.checked ? checkButton = <button title="mark as important" onClick={() => this.overlook()} style={{marginLeft: '20px'}}><i class="fa fa-thumbs-down" aria-hidden="true"></i></button>
            : checkButton = <button title="mark as not important" onClick={() => this.check()} style={{marginLeft: '20px'}}><i class="fa fa-thumbs-up" aria-hidden="true"></i></button>
        return (
            <div>
                <h2 className="text-center">Publication Details</h2>
                <button className="btn btn-danger" style={{width:'100px'}} onClick={() => this.addPublication()}> Add Publication </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Editor</th>
                            <th>Date</th>
                            <th>Thematic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.publications.map(
                        publication =>
                                    <tr key={publication.id}>
                                        <td>{publication.title}</td>
                                        <td>{publication.content}</td>
                                        <td>{publication.editor}</td>
                                        <td>{publication.date}</td>
                                        <td>{publication.thematics.map(item => (
                                            // Sans la `key`, React produira un avertissement spécifique
                                            <React.Fragment key={item.id}>
                                                <dd>{item.title}</dd>
                                            </React.Fragment>
                                        ))}</td>
                                        <td>
                                            <button title="Delete" onClick={() => this.deletePublication(publication.id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            <button title="Edit" onClick={() => this.editPublication(publication.id)} style={{marginLeft: '10px'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                            {showButton}
                                            {checkButton}
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

export default ListPublicationComponent;