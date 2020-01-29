import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';

class App extends Component {

  componentWillMount() {
    
    firebase.initializeApp({
        apiKey: "AIzaSyBuYvsEOqd_cutekzhTXa0egpOa-mQ7p6M",
        authDomain: "i-like-chat.firebaseapp.com",
        databaseURL: "https://i-like-chat.firebaseio.com",
        projectId: "i-like-chat",
        storageBucket: "i-like-chat.appspot.com",
        messagingSenderId: "13850578171",
        appId: "1:13850578171:web:6a605c2bc4137659e5745e",
        measurementId: "G-CLG0Y2VXSD"
    });
  }

  render() {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Routes />
        </Provider>
    );
  }
}

export default App;
