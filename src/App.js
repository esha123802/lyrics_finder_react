import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';

import { Provider } from './context';

import './App.css';
import React from 'react';


function App() {
  return (
    <div className="App">
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar></Navbar>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index}>
                </Route>
                <Route exact path="/lyrics/track/:id" component={Lyrics}>
                </Route>
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
