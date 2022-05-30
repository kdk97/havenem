import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import onboarding1 from "../assets/img/undraw1.svg";


  export default function OnboardingPage() {

    const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });


    return(
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide"><img src= {onboarding1} alt="nav icon" ></img>Velkommen til Havenem, en app der gør det nemt for dig at låne eller udlåne ting</div>
            <div class="swiper-slide"><img src= {navhome} alt="nav icon" ></img>Ved at låne ting hjælper du både miljøet og din pengepung</div>
            <div class="swiper-slide"><img src= {navhome} alt="nav icon" ></img>Kom i gang med at poste dine ting til låns (tillad din gps lokation for at finde ting tæt på dig)</div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-scrollbar"></div>
        </div>
    )
}

