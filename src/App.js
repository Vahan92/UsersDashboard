import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Panel from './components/Panel';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Panel />
        </div>
      </Provider>
    );
  }
}

export default App;
