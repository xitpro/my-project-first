import React, {Component} from 'react';
import boxStyles from './BoxOrder.css';
import Logger from "./../utilities/Logger";
// import axios from "axios";
// import Background  from './2.jpg';
class BoxOrder extends Component {
    constructor(props) {
        super();

        this.state = {
        };
        this.refImageUpload = React.createRef();
        this.imageRef = React.createRef();
        this.canvasRef = React.createRef();
        this._usingFileReader = this._usingFileReader.bind(this)
        this.drawImageCanvas = this.drawImageCanvas.bind(this)
        this.logger = new Logger("BoxOrder.js");
    }

    componentDidMount() {
        console.log('xxxxx ', this.imageRef.current)
    }

    _usingFileReader = (event) =>  {
        let selectedFile = event.target.files[0];
        if(!selectedFile) return;
        let reader = new FileReader();
        var imgtag = this.imageRef.current;
        
        imgtag.title = selectedFile.name;
        /*  add image to canvas  
            npm install canvas 
            This project is an implementation of the Web Canvas API and implements that API as closely as possible. 
            For API documentation, please visit Mozilla Web Canvas API. 
            (See Compatibility Status for the current API compliance.) All utility methods and non-standard APIs are documented below.
        */
        console.log('xxx ', imgtag.title)
        reader.onload = (event) => {
          console.log('xxxx ', event.target.result)
          imgtag.src = event.target.result;
          
          // this._usingImageObj(imgtag)
          setTimeout(() =>this.drawImageCanvas(imgtag), 50)
          
        };
        // reader.readAsDataURL(selectedFile);
        reader.readAsArrayBuffer(selectedFile)
        console.log('xxxxx ', imgtag)
        
        // let imageX = 69;
        // let imageY = 50;
        // var imageWidth = imgtag.width;
        // var imageHeight = imgtag.height;
        // var imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight);
        // console.log('xxxx ', imageData)
        // var data = imageData.data;
        // console.log('xxx ', data)
    };

    _usingImageObj = (imgtag) => {
        console.log('xxxxx ', imgtag);
        // let selectedFile = event.target.files[0];
        // console.log('xxxx ', event.target.files)
        var imageObj = new Image();
        imageObj.src = imgtag.src
        imageObj.onload = () => {
          this.drawImage(this);
        };
        
    }
    drawImage = (imageObj) => {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var imageX = 69;
        var imageY = 50;
        var imageWidth = imageObj.width;
        var imageHeight = imageObj.height;

        context.drawImage(imageObj, imageX, imageY);

        var imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight);
        var data = imageData.data;

        // iterate over all pixels
        for(var i = 0, n = data.length; i < n; i += 4) {
          var red = data[i];
          var green = data[i + 1];
          var blue = data[i + 2];
          var alpha = data[i + 3];
        }

        // pick out pixel data from x, y coordinate
        var x = 20;
        var y = 20;
        var red = data[((imageWidth * y) + x) * 4];
        var green = data[((imageWidth * y) + x) * 4 + 1];
        var blue = data[((imageWidth * y) + x) * 4 + 2];
        var alpha = data[((imageWidth * y) + x) * 4 + 3];
        
        // iterate over all pixels based on x and y coordinates
        for(var y = 0; y < imageHeight; y++) {
          // loop through each column
          for(var x = 0; x < imageWidth; x++) {
            var red = data[((imageWidth * y) + x) * 4];
            var green = data[((imageWidth * y) + x) * 4 + 1];
            var blue = data[((imageWidth * y) + x) * 4 + 2];
            var alpha = data[((imageWidth * y) + x) * 4 + 3];
          }
        }
    }
    drawImageCanvas = (imgtag) => {
      const style = {
        background: "white"
      }
        var canvas = this.canvasRef.current;
        let context = canvas.getContext('2d');
        console.log('xxxx ', context)
        context.drawImage(imgtag,90, 130, 250, 300);
    }
    funcDownload = () => {
        fetch({
            url: 'https://drive.google.com/file/d/11dx97qKriaydsVkX7yjnZToamLErW7sE/view?usp=sharing', //google drive link
            method: 'GET',
            responseType: 'arraybuffer', // important
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/pdf'
            // }
          }).then((response) => {
            console.log('xxxxx ', response)
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
            //  console.log('xxxxx ', url)
             link.href = url;
             link.setAttribute('download', 'file.pdf'); //or any other extension
             document.body.appendChild(link);
             link.click();
            // let arraybit = new Uint8Array(response.data)
            // console.log('xxxxx ', arraybit)
          });
    }
    render() {
        // const {refs} = this.imageRef;
        return (
            <div className={boxStyles.box_container}>
                <div className={boxStyles.box} style={{background: 'black', height: '50px'}}> 
                    <button onClick={this.funcDownload}>
                        Click DownLoad
                    </button>
                    <input type="file" id="fileUpload" style={{background: 'green'}}
                    size="24"
                    onChange={this._usingFileReader}></input>
                    {/* <input type="file" id="fileUpload" style={{background: 'green'}}
                    size="24"
                    onChange={this._usingImageObj}></input> */}
                </div>
                <div className={boxStyles.box} style={{background: 'yellow', height: '300px'}}>
                
                <img height="250px" width="500px" ref={this.imageRef} alt="imagehack"></img>
                </div>
                <div className={boxStyles.containerfour} >
                <div className={boxStyles.box} style={{height: '500px', width: '1200px', }}>
                <canvas id="myCanvas" width="1200px" height="500px" ref={this.canvasRef}></canvas>
                {/* backgroundImage: `url(${Background})`  */}
                {/* <img src="2.jpg" alt="BackgroundImage" width="800" height="500"></img> */}
                </div>
                {/* <div className={boxStyles.box} style={{height: '500px', width: '300px'}}> This is Box 5</div> */}
                </div>
                {/* <div className={boxStyles.box} 
                    style={{background: 'green', 
                    height: '50px',
                    float: 'bottom'}}> This is Box 6</div> */}
            </div>
            
          );
    }
}
 
export default BoxOrder;
