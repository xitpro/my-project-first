import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
// import ChatApi from "./components/ChatApi";
// import BoxOrder from "./components/BoxOrder";
import Migration from "./components/MigrationData";
import Navigations from "./components/UI/Navigations/Navigations";
class App extends Component {
  state = {}
  _handleActive = () => {
    this.setState({ status: true });
  };

  _handleDeActive = () => {
    this.setState({ status: false });
  };

  render() {
    return (
      <Provider store={store}>
        <Migration/>
      {/* <Navigations/> */}
			</Provider>
    );
  }
}

export default App;