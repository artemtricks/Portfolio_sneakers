import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from  "./Swiper.module.scss";
import  "swiper/css";

export default function Swip() {
  return (
    <>
      <Swiper  watchSlidesProgress={true} slidesPerView={3} className={styles.custom}>
        <SwiperSlide><img src="./img/1.jpg" alt="" /></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide><img src="./img/2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </>
  );
}
