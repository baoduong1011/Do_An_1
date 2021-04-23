import React, { useEffect, useRef } from 'react';
import './BackGround3D.css';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Aos from 'aos';
import 'aos/dist/aos.css';
export default function BackGround3D() {
        useEffect(() => {
            Aos.init({duration: 3000,offset: 300});
        },[])
    return (
       <div  className='body-bg'>
            <div className='bg-3d-main'>
            <section>
                <img data-aos="fade-up"  src="./img/stars.png" id="stars" />
                <img data-aos="slide-up" src="./img/moon.png" id="moon" />
                <img data-aos="slide-left" src="./img/mountains_behind.png" id="mountains_behind" />
                <h2 className='text-center' data-aos="zoom-in-up" id='textBg'> <i class="fab fa-first-order"></i> Studio Film</h2>
                {/* <a data-aos="zoom-in" href="#sec" id='btnBg'>Explore</a> */}
                <img data-aos="slide-up" src="./img/mountains_front.png" id="mountains_front" />
            </section>
            <div className='sec' id='sec'>
                <h2 data-aos="fade-up">Film Studio xin chào quý khách!</h2>
                <p data-aos="fade-up">CINESTAR, KHÔNG GIAN GIẢI TRÍ TRẺ TRUNG VÀ SÔI ĐỘNG VỚI GIÁ CẢ HỢP LÝ.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
        </div>
        
       </div>
    )
}
