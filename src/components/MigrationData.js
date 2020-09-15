import React, { Component } from "react";
import styles from "./MigrationBox.css";
import * as constants from "./constants";
import Button from "./UI/Button";

// import { func } from "prop-types";
var xml2js = require("xml2js");
const _dirname = 'C:\\ProgramData\\Razer\Razer Central\Accounts\\RZR_0280070540119463a0a7bff12753\\Emily3\\Devices'
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
      data: null
    };
    this.titleRef = React.createRef();
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
  converterAuto = () => {
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
  readDirName = () => {
    // return new Promise(function(resolve, reject) {
    //   fsEx.readdir(_dirname, function(err, filenames){
    //       if (err)
    //           reject(err);
    //       else
    //           resolve(filenames);
    //   });
    // });
    let xmlContent = '';
    fetch('profiles.xml').then((response) => {
      
      response.text().then((xml) => {
        console.log('xxxx ' , xml)  
        let parser = new DOMParser();
        let xmlDom = parser.parseFromString(xml, 'application/xml');
        let datas = xmlDom.querySelectorAll('Devices')
        console.log('xxxx ' , xmlDom)
        console.log('xxxx ' , datas)
      })
    })
  }

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(new Date().getMilliseconds());
  };

  render() {
    return (
      <React.Fragment>
        <div className={styles.box_container}>
          <Button btnType="Danger" clicked={this.converterAuto} name="XML2JS" />
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
          <Button
            btnType="Danger"
            clicked={this.readDirName}
            name="Read File"
          />
        </div>
        <div id="box-1" className={styles.box_1} ref={this.titleRef}></div>
      </React.Fragment>
    );
  }
}

export default Migration;
