import React, { Component } from "react";
import styles from "./MigrationBox.css";
import * as constants from "./constants";
import Button from "./UI/Button";
// import { func } from "prop-types";
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
    this.dataResponse = [];
    this.state = {
      isChanged: false,
      value: '',
    };
    // this.titleRef = React.createRef();
    this.inputDom = React.createRef();
  }

  componentDidMount() {
    this.text = this.text.toString();
    // var input = document.getElementById("inputSearch");
    // input.addEventListener("keyup", function (e) {
    //   if (e.keyCode === 13) {
    //     e.preventDefault();
    //     console.log(e.target)

    //   }
    // });
  }
  componentDidUpdate(prevProps) {}
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
      let titleRef = document.getElementById("box-1");
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
    let abc = document.getElementById("inputData");
    if (abc === null) return;
    this.checkDataType(abc.value);
    // console.log(abc.value)
  };
  clearText = () => {
    let abc = document.getElementById("inputData");
    abc.value = "";
    this.setState({ isChanged: false });
  };
  fetchDataFromApi = () => {
    console.log(new Date().getMilliseconds());
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
        this.dataResponse = data;
        console.log(new Date().getMilliseconds());
        this.checkDataType(this.dataResponse);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(new Date().getMilliseconds());
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
    if (typeof data === "string") {
      checked = "string";
    }
    if (typeof data === "object") {
      checked = "object";
    }
    if (Array.isArray(data)) {
      console.log("this a array");
      checked = "array";
    }
    console.log(checked);
    switch (checked) {
      case "array":
        this._proceedingArray(data);
        break;
      case "object":
        this._proceedingObject(data);
        break;
      case "string":
        this._proceedingString(data);
        break;

      default:
        break;
    }
  };

  _proceedingArray = (dataResponse) => {
    console.log("filer UserID");
    let filterObject = dataResponse.filter((obj) => obj.userId === 2);
    this.result = filterObject[0].title;
    this.setState({ isChanged: true });
    console.log("Proceeding array here.....", filterObject);
  };

  _proceedingObject = (object) => {
    console.log("Proceeding object here.....");
  };

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
    this.setState({ isChanged: true });
  };
  handleChange = e => {
    // alert()
    var v = e.target.value;
    this.setState({ value: v });
  };
  handleBlur = (e) => {
    var v = e.target.value;
    if (e.target.value === "") return;
    this.handleSearch(v);
  };
  handleKeyDown = (e) => {
    // fire blur event when Enter or ESC
    if (e.keyCode === 13) {
      this.inputDom.current.blur();
    }
    if (e.keyCode === 27) {
      this.handleSearch(this.state.value);
    }
  };
  handleSearch = (userId) => {
    alert("UserId search have title...   " + userId);
  };

  validate(e) {
    var theEvent = e || window.event;
    console.log(theEvent.type)
    // Handle paste
    if (e.type === "paste") {
      key = e.clipboardData.getData("text/plain");
      alert('Dont try pass something here ' + key)
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      alert('Dont try enter character '+ key)
    }
    
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.box_container}>
          <Button btnType="Danger" clicked={this.converterOne} name="XML2JS" />
          <Button
            btnType="Success"
            clicked={this.convertManually}
            name="Parser"
          />
          <Button
            btnType="Success"
            clicked={this.fetchDataFromApi}
            name="Fetch Data"
          />
          <input
            ref={this.inputDom}
            id="inputSearch"
            type="text"
            placeholder="Go Search"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            onKeyPress={this.validate}
            onPaste={this.validate}
            style={{
              height: "25px",
              borderRadius: "3px",
              fontWeight: "bold",
              width: "50%",
            }}
          ></input>
        </div>
        <div id="box-1" className={styles.box_1} ref={this.titleRef}>
          <div>
            <input
              id="inputData"
              type="text"
              placeholder="Input Text Here"
              style={{
                height: "50px",
                borderRadius: "3px",
                fontWeight: "bold",
              }}
            ></input>
            <span
              id="result"
              style={{
                margin: "10px 20px",
                font: "italic small-caps bold 12px/30px Georgia, serif",
                // style
              }}
            >
              {this.state.isChanged ? this.result : `${constants.TEXT_RESULTS}`}
            </span>
          </div>
          <Button clicked={this.clearText} name="Clear" />
          <Button clicked={this.getText} name="Proceed" />
        </div>
      </React.Fragment>
    );
  }
}

export default Migration;
