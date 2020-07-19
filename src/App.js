import React, { Component } from "react";
// import { Provider } from "react-redux";
// import store from "./store";
// import ChatApi from "./components/ChatApi";
// import BoxOrder from "./components/BoxOrder";
import Migration from "./components/MigrationData";

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
      // <Provider store={store}>
      //   <ChatApi />
      // </Provider>
      <Migration/>
        // <Ahihi/>
    );
  }
}

export default App;