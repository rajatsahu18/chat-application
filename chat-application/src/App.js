import React from "react"
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import {Join} from "./Component/Join/Join"
import { Chat } from "./Component/Chat/Chat";


function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path = "/">
          <Join  />
        </Route>

        <Route path = "/chat" >
          <Chat/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
