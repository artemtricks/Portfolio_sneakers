import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Swiper.module.scss";
import "swiper/css";
import firstPic from "../../assets/1.jpg";
import secondPic from "../../assets/2.jpg";

export default function Swip() {
  return (
    <>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={3}
        className={styles.custom}
      >
        <SwiperSlide>
          <img src={firstPic} alt="Sneakers" />
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide>
          <img src={secondPic} alt="Sneakers" />
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </>
  );
}
