import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DashboardComponent from "./component/DashboardComponent";
import AuthComponent from "./component/auth/AuthComponent";
import ListUserComponent from "./component/user/ListUserComponent";
import AddUserComponent from "./component/user/AddUserComponent";
import EditUserComponent from "./component/user/EditUserComponent";
import ListThematicComponent from "./component/thematic/ListThematicComponent";
import AddThematicComponent from "./component/thematic/AddThematicComponent";
import EditThematicComponent from "./component/thematic/EditThematicComponent";
import ListPublicationComponent from "./component/publication/ListPublicationComponent";
import AddPublicationComponent from "./component/publication/AddPublicationComponent";
import EditPublicationComponent from "./component/publication/EditPublicationComponent";

function App() {
  return (
      <div class="container">
          <Router>
              <div class="col-md-9">
                  <Switch>
                      <Route path="/" exact component={DashboardComponent} />
                      <Route path="/login" component={AuthComponent} />
                      <Route path="/users" component={ListUserComponent} />
                      <Route path="/add-user" component={AddUserComponent} />
                      <Route path="/edit-user" component={EditUserComponent} />
                      <Route path="/themes" exact component={ListThematicComponent} />
                      <Route path="/add-thematic" exact component={AddThematicComponent} />
                      <Route path="/edit-thematic" exact component={EditThematicComponent} />
                      <Route path="/publications" component={ListPublicationComponent} />
                      <Route path="/add-publication" component={AddPublicationComponent} />
                      <Route path="/edit-publication" component={EditPublicationComponent} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
