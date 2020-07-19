import React, { Component } from "react";
import styles from "./MigrationBox.css";
import * as constants from "./constants";
import Button from "./UI/Button";
var xml2js = require("xml2js");
// const _dirname = 'C:\\ProgramData\\Razer\\Razer Central\\Accounts\\RZR_0280070540119463a0a7bff12753\\Emily3\\Devices'
// const PID = [2594,2595]
const xml1 = `<?xml version="1.0"?>
<Profile xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Name>PC-CHIVO-Default</Name>
  <ProfileId>50dc1d43-4f32-4451-936b-4ace334e1417</ProfileId>
</Profile>`;
// const xml2 = `<?xml version="1.0" encoding="UTF-8" ?>
//             <user id="1">
//                 <name>John Doe</name>
//                 <email>john.doe@example.com</email>
//                 <roles>
//                     <role>Member</role>
//                     <role>Admin</role>
//                 </roles>
//                 <admin>true</admin>
//             </user>`;

class Migration extends Component {
  constructor(props) {
    super();
    this.text = window.location;
    this.result = "";
    this.state = {
      isChanged: false,
    };
    // this.titleRef = React.createRef();
  }

  componentDidMount() {
    this.text = this.text.toString();
  }
  converterOne = () => {
    // var parsessr = new xml2js.Parser();
    // let json= parsessr.parseString(xml1, function (err, result) {
    //   console.log(err, result)
    // })
    // console.log('xxxx ', json)
    xml2js.parseString(xml1, { trim: true }, (err, result) => {
      if (err) {
        throw err;
      }
      // `result` is a JavaScript object
      // convert it to a JSON string
      const json = JSON.stringify(result.Profile);
      let titleRef = document.getElementById("title");
      titleRef.innerText = json;
      console.log("xxxxx \n", json);
      // log JSON string
      // console.log(result.Profile);
    });
  };

  convertManually = () => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml1, "text/xml");
    console.log("dmcs", xmlDoc);
    // let titleRef = document.getElementById("title");
    // titleRef.innerText = xmlDoc;
    console.log("dmcs", xmlDoc.getElementsByTagName("Name")[0]);
    // this.checkIsEmpty(xmlDoc.getElementsByTagName("Name")[0].textContent)
  };
  // readDirName = () => {
  //   return new Promise(function(resolve, reject) {
  //     fsEx.readdir(_dirname, function(err, filenames){
  //         if (err)
  //             reject(err);
  //         else
  //             resolve(filenames);
  //     });
  // });
  // }
  getText = () => {
    let abc = document.getElementById("fName");
    if (abc === null) return;
    this.checkDataType(abc.value);
    // console.log(abc.value)
  };
  clearText = () => {
    let abc = document.getElementById("fName");
    abc.value = ''
    this.setState({isChanged: false})
  }
  fetchDataFromApi = () => {
    // const data = { userId: 1 };
    fetch("http://jsonplaceholder.typicode.com/posts", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.checkDataType(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  checkDataType = (data) => {
    //     null
    // undefined
    // NaN
    // empty string ("")
    // 0
    // false
    // if(typeof )
    let checked = {};
    if(typeof data === 'string') {
      checked = "string"
    }
    if(typeof data === 'object') {
      checked = "object"
    }
    if(Array.isArray(data)) {
      console.log("this a array")
      checked = "array"
    }
    console.log(checked)
    switch (checked) {

      case "array":
        this._proceedingArray(data)
        break;
      case "object":
        this._proceedingObject(data)
        break;
      case "string":
        this._proceedingString(data)
        break;

      default:
        break;

    }
  };

  _proceedingArray = (array) => {
    console.log("Proceeding array here.....")
  }

  _proceedingObject = (object) => {
    console.log("Proceeding object here.....")
  }
  _proceedingString = (string) => {
    if (string === "") {
      this.result = "null String";
    } else {
      string = string.replace(/^\s+/, "").replace(/\s+$/, "");
      if (string === "") {
        this.result = "this a string include spaces";
      } else {
        this.result = "String input: \n" + string;
      }
    }
    this.setState({isChanged: true})
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.box_container}>
          <Button className={styles.button_one} onClick={this.converterOne} name="XML2JS"/>
          <Button className={styles.button_one} onClick={this.convertManually} name="Parser"/>
          <Button className={styles.button_one} onClick={this.fetchDataFromApi} name="Fetch Data"/>
        </div>
        <div id="title" className={styles.box_1} ref={this.titleRef}>
          <input id="fName" type="text" placeholder="Input Text Here"></input>
          <button onClick={this.clearText}>Clear</button>
          <button onClick={this.getText}>Ok</button>
          <span id="result" style={{margin: "30px 20px"}} text={this.result}>{this.state.isChanged ? this.result : `${constants.TEXT_RESULTS}`}</span>
        </div>

      </React.Fragment>
    );
  }
}

export default Migration;
