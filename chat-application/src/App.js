import React from "react"
import './App.css';
import {Switch, Route} from "react-router-dom"
import {Join} from "./Component/Join/Join"
import { Chat } from "./Component/Chat/Chat";


function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path = "/">
          <Join  />
        </Route>

        <Route path = "/chat" >
          <Chat/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
