import React, { Component } from "react";
import "./App.css";
import Search from "./components/search-bar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search type="anime"></Search>
        <Search type="manga"></Search>
      </div>
    );
  }
}

export default App;
