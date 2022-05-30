import { useNavigate } from "react-router-dom";
import onboarding1 from "../assets/img/undraw1.svg";
import onboarding2 from "../assets/img/undraw2.svg";
import onboarding3 from "../assets/img/undraw3.svg";
// import Swiper core and required modules
import { Navigation, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, Navigate } from "react-router-dom";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {

  const navigate = useNavigate();

  function handleClick (){
    navigate(`/opret-bruger`)
  }

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><img src= {onboarding2} alt="nav icon" ></img><p>Velkommen til Havenem, en app der gør det nemt for dig at låne eller udlåne ting</p></SwiperSlide>
      <SwiperSlide><img src= {onboarding1} alt="nav icon" ></img><p>Ved at låne ting hjælper du både miljøet og din pengepung</p></SwiperSlide>
      <SwiperSlide><img src= {onboarding3} alt="nav icon" ></img><p>Kom i gang med at poste dine ting til låns (husk at tillade gps lokation for at finde ting nær dig)</p><button onClick={handleClick}>Næste</button></SwiperSlide>
    </Swiper>
  );
};

