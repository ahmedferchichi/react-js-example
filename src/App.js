import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ToolbarComponent from "./component/ToolbarComponent";
import LoginComponent from "./component/LoginComponent";
import ListUserComponent from "./component/user/ListUserComponent";
import AddUserComponent from "./component/user/AddUserComponent";
import EditUserComponent from "./component/user/EditUserComponent";
import ListThematicComponent from "./component/thematic/ListThematicComponent";
import AddThematicComponent from "./component/thematic/AddThematicComponent";
import EditThematicComponent from "./component/thematic/EditThematicComponent";
import ListPublicationComponent from "./component/publication/ListPublicationComponent";
import AddPublicationComponent from "./component/publication/AddPublicationComponent";
import EditPublicationComponent from "./component/publication/EditPublicationComponent";
import UploadFiles from "./component/upload-files.component";

function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-9">
                  <ToolbarComponent/>
                  <Switch>
                      <Route path="/" exact component={ListUserComponent} />
                      <Route path="/login" component={LoginComponent} />
                      <Route path="/users" component={ListUserComponent} />
                      <Route path="/add-user" component={AddUserComponent} />
                      <Route path="/edit-user" component={EditUserComponent} />
                      <Route path="/themes" exact component={ListThematicComponent} />
                      <Route path="/add-thematic" exact component={AddThematicComponent} />
                      <Route path="/edit-thematic" exact component={EditThematicComponent} />
                      <Route path="/publications" component={ListPublicationComponent} />
                      <Route path="/add-publication" component={AddPublicationComponent} />
                      <Route path="/edit-publication" component={EditPublicationComponent} />
                      <Route path="/upload" component={UploadFiles} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
