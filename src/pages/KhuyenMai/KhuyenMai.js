import React, { useEffect } from 'react'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'
import { useSpring, animated } from 'react-spring'
import './KhuyenMai.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { duration } from 'moment';
import Loader from '../../components/loader/Loader';
export default function KhuyenMai() {


    useEffect(() => {
        Aos.init({duration: 2000});
    },[])

    const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
    const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
    const [props, set, stop] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    return (
        <div className='khuyen-mai-main'>
            <Loader/>
            <div className='khuyen-mai'>
                <div className='container-fluid'>
                    <div className='row body'>
                        <div className='col-6' id='root'>
                            <animated.div className="card" onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                                style={{ transform: props.xys.interpolate(trans) }} />
                        </div>
                        <div data-aos="fade-down-right" className='col-6'>
                            <h2 className='text-bold p-5'> C'MONDAY - CINESTAR HAPPY DAY</h2>
                            <p>- Giá vé ưu đãi: 45.000 đ/vé 2D và 55.000 đ/vé 3D.</p>
                            <br />
                            <p>- Thời gian: Áp dụng cho tất cả các suất chiếu ngày Thứ Hai hàng tuần.</p>
                            <br />
                            <p>- Lưu ý: Không áp dụng cho các ngày lễ/tết.</p>
                        </div>
                    </div>
                </div>

                <div className='container-fluid'>
                    <div className='row body1'>
                        <div data-aos="fade-down-right" className='col-6'>
                            <h2 className='text-bold p-5'>COMBO BIG STAR - ƯU ĐÃI THỨ BA</h2>
                            <p>- Combo BIG STAR ưu đãi vào ngày thứ Ba hàng tuần, bao gồm: 1 vé xem phim, 1 ly nước 22oz, 1 bắp 44oz</p>
                            <br/>
                            <p>Giá combo áp dụng: </p>
                            <br />
                            <p>- Tại Cinestar Sinh Viên, Mỹ Tho và Huế: 79,000đ </p>
          
                            <p>- Tại Cinestar Hai Bà Trưng, Quốc Thanh và Đà Lạt: 99,000đ </p>
            
                            <p>Điều kiện: </p>
                
                            <p>- Không áp dụng đồng thời với các chương trình khuyến mãi khác.</p>
 
                            <p>- Chỉ áp dụng khi mua trực tiếp tại quầy.</p>
                        </div>

                        <div className='col-6' id='root1'>
                            <animated.div className='card1'  />
                        </div>
                    </div>
                </div>

                <div className='container-fluid'>
                    <div className='row body2'>

                        <div className='col-6' id='root2'>
                            <animated.div className='card2' onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                                style={{ transform: props.xys.interpolate(trans) }} />
                        </div>


                        <div data-aos="fade-down-right" className='col-6'>
                            <h2 className='text-bold p-5'>COMBO BIG STAR - ƯU ĐÃI THỨ BA</h2>
                            <p>- Combo BIG STAR ưu đãi vào ngày thứ Ba hàng tuần, bao gồm: 1 vé xem phim, 1 ly nước 22oz, 1 bắp 44oz</p>
                            <br />
                            <p>Giá combo áp dụng: </p>
                            <br />
                            <p>- Tại Cinestar Sinh Viên, Mỹ Tho và Huế: 79,000đ </p>
                            
                            <p>- Tại Cinestar Hai Bà Trưng, Quốc Thanh và Đà Lạt: 99,000đ </p>
                            
                            <p>Điều kiện: </p>
                            
                            <p>- Không áp dụng đồng thời với các chương trình khuyến mãi khác.</p>
                            <br/>
                            <p>- Chỉ áp dụng khi mua trực tiếp tại quầy.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Contact />
            <Footer />
        </div>
    )
}
