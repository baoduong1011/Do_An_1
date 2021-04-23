import React, { useEffect, useState } from 'react'
import Carousel1 from '../../components/carousel1/Carousel1';
import Caousel2 from '../../components/carousel2/Caousel2';
import Contact from '../../components/contact/Contact';
import Footer from '../../components/footer/Footer';
import TinTuc from '../../components/tintuc/TinTuc';
import Banner from '../Banner/Banner';
import Video1 from './video1.mp4';
import { animated , useSpring } from 'react-spring'
import ReactLoading from 'react-loading';
import { useLoading, Audio } from '@agney/react-loading';
import BackGround3D from '../BackGround3D/BackGround3D';
import ChatBubble from 'react-chat-bubble';
import ChonRap from '../../components/ChonRap/ChonRap';

export default function TrangChu() {

    const Example = ({ type, color }) => (
        <ReactLoading type={type} color={color} height={667} width={375} />
    );

    const [message,setMessage] = useState({
        messages: [[{
            "type" : 0,
            "image": "cat.jpg",
            "text": "Hello! Good Morning!"
        }, {
            "type": 1,
            "image": "dog.jpg",
            "text": "Hello! Good Afternoon!"
        }]]
    })

    const propsAnimtion1 = useSpring({
        opacity:1,
        from: {
            opacity:0
        },
        config: {
            duration:3000
        }
      })
      useEffect(() => {
          Example(String,String);
      },[])
    return (
       <animated.div style={propsAnimtion1}>
          <div style={{background:'black'}} className='main-trang-chu'>
            <Carousel1/>
            <BackGround3D/>
            <ChonRap/>
            <TinTuc/>
            <Contact/>
            <Banner/>
            <Footer/>
            {/* <Caousel2/> */}
            <div className='chatBubble'>
            {/* <ChatBubble style={{}} message={message.messages} /> */}
            </div>
        </div>  
       </animated.div>
    )
}
