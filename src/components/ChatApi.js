import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import styles from "./ChatApi.css";
import xitLoggers from "./../utilities/Logger";
import * as types from "../types/typeText";
import * as ApiHandler from '../libs/ApiHandler';

class ChatApi extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "xitpro",
      status: false,
      times: 20
    };
    this.logger = new xitLoggers("Chat-API.js");
  }

  _toggleChangeStatus = () => {
    let fnName = "_toggleChangeStatus";
    this.logger.printData(
      fnName,
      `fn.name:${this.state.name}, fn.status:${this.state.status}, fn.increase${this.state.times} `
    );
    this.setState({ status: !this.state.status });
    axios({
      url: 'https://drive.google.com/file/d/11dx97qKriaydsVkX7yjnZToamLErW7sE/view?usp=sharing', //google drive link
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'file.pdf'); //or any other extension
       document.body.appendChild(link);
       link.click();
    });
  };

  handleIncrease = () => {
    let fnName = "handleIncrease";
    this.logger.printData(
      fnName,
      `fn.name:${this.state.name}, fn.status:${this.state.status}, fn.increase${this.state.times} `
    );
    if (this.state.times < 30) {
      this.setState({
        times: this.state.times + 1
      });
    }
  };

  handleDecrease = () => {
    console.log("xxxxx increase", this.state.times);
    if (this.state.times > 0) {
      this.setState({
        times: this.state.times - 1
      });
    }
  };

  render() {
    return (
      <div className={styles.Chat}>
        <header className={styles.Chat_header}>
          <button
            className={
              this.state.status ? styles.buttonActive : styles.buttonDeActive
            }
            onClick={() => this._toggleChangeStatus()}
          >
            {this.state.status ? types.ACTIVE : types.NON_ACTIVE}
          </button>
        </header>
        <div className={styles.media_player}></div>
        <button onClick={() => this.handleIncrease()}>Increase</button>
        <button onClick={() => this.handleDecrease()}>Decrease</button>
        {this.state.status ? (
          <div className={styles.active}>Actived</div>
        ) : (
          <div className={styles.non_active}></div>
        )}

        <footer className={styles.Chat_footer}>
          <h1 className={styles.h1}>{this.state.times}</h1>
          {this.state.times === 0 ? (
            <div className={styles.Red}> Red </div>
          ) : this.state.times === 30 ? (
            <div className={styles.Green}> Green </div>
          ) : null}
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = dispatch => {
  return {
    ...ApiHandler
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatApi);
