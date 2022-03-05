import React from "react";
import { Carousel } from "react-bootstrap";
import image from "../fakeServer/image-temp/image.png";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={image} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={image} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={image} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
