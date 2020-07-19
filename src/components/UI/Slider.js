import React, { Component } from "react";
import styles from "./slider.css";
class Slider extends Component {
  state = {};
  render() {
    return (
      <div class="range-slider" id="range_slider">
        <input
          type="range"
          orient="vertical"
          id="desire"
          name="desire"
          min="{{min}}"
          max="{{max}}"
        />
        <div class="range-slider__bar">
          <div class="slider-text">My Desire</div>
        </div>
        <div class="range-slider-text">Header Two</div>
        <div class="range-slider__thumb"></div>

        <div class="bubble" id="me" >
          slide to provide your feedback
        </div>
        <div class="range-slider__thumb_start"></div>    

        <div class="range-slider__line"></div>
      </div>
    );
  }
}

export default Slider;
