import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
// import ChatApi from "./components/ChatApi";
// import BoxOrder from "./components/BoxOrder";
// import Migration from "./components/MigrationData";
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
				{/* <ErrorBoundary>
					<Authenticated renderView={this.renderView} />
					<Initializations />
				</ErrorBoundary> */}
      <Navigations/>
			</Provider>
      // <Migration/>
      // <Ahihi/>
      //   <ChatApi />
    );
  }
}

export default App;