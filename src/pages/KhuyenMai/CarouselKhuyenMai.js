import React, { useEffect } from 'react'
import Aos from 'aos';
import 'aos/dist/aos.css';
import {WOW} from 'wowjs';
export default function CarouselKhuyenMai() {
    useEffect(() => {
        const wow = new WOW(
            { // default
            offset:       200,          // default
            mobile:       false,       // default
            live:         true        // default
          }
          )
          wow.init();
          Aos.init({duration: 2000,});
    },[])
    return (
        <div className='carousel_Khuyen_Mai'>
            <section>
                <img  data-wow-duration="3s"  className='wow animate__fadeIn'  src='./img/img2/stars2.png' id="stars2" />
                <img data-wow-duration="3s"  className='wow bounceInUp'  src='./img/img2/moon.png' id="moon" />
                <h4 data-wow-duration="1s"  className='wow animate__slideInRight' id="text">Tuesday for fun</h4>
                <img data-wow-duration="3s"  className='wow animate__rotateIn' src='./img/img2/rock.png' id="rock" />
                <img  data-wow-duration="3s"  className='wow animate__fadeInDown'  src='./img/img2/masjid.png' id="masjid" />
                <img  data-wow-duration="3s"  className='wow bounceInUp'  src='./img/img2/bottom.png' id="bottom" />
                <img  data-wow-duration="3s"  className='wow animate__shakeY' src='./img/img2/lamp.png' id="lamp" />
                
                {/* <img src='./img/img2/stars2.png' id="stars2" /> */}
                
            </section>
        </div>
    )
}
