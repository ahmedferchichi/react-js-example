import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./component/user/ListUserComponent";
import AddUserComponent from "./component/user/AddUserComponent";
import EditUserComponent from "./component/user/EditUserComponent";
import ListThematicComponent from "./component/thematic/ListThematicComponent";
import AddThematicComponent from "./component/thematic/AddThematicComponent";
import EditThematicComponent from "./component/thematic/EditThematicComponent";

function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-9">
                  <h1 className="text-center" style={style}>React User Application</h1>
                  <Switch>
                      <Route path="/" exact component={ListUserComponent} />
                      <Route path="/users" component={ListUserComponent} />
                      <Route path="/add-user" component={AddUserComponent} />
                      <Route path="/edit-user" component={EditUserComponent} />
                      <Route path="/themes" exact component={ListThematicComponent} />
                      <Route path="/add-thematic" exact component={AddThematicComponent} />
                      <Route path="/edit-thematic" exact component={EditThematicComponent} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

const style = {
    color: 'red',
    margin: '10px'
}

export default App;
