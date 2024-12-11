import React, { Component } from "react";
import FileUpload from "./FileUpload";
import Visualization from "./Visualization";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  set_data = (csv_data) => {
    this.setState({ data: csv_data });
  };

  render() {
    return (
      <div>
        <FileUpload set_data={this.set_data}></FileUpload>
        <div className="parent">
          <Visualization csv_data={this.state.data}></Visualization>
        </div>
      </div>
    );
  }
}

export default App;
