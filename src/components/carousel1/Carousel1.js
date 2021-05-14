import React, { useEffect, useState } from 'react';
import Video1 from './video1.mp4';
import './css/Carousel1.css';
import { danhSachPhim } from '../../services/service';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
// import './scss/Carousel2.scss';
import moment from 'moment';
export default function Carousel1() {
    useEffect(() => {
        danhSachPhim.LoadDanhSach().then(res => {
            setDsPhim({ ...dsPhim, films: res.data })
        })
            .catch(err => {
                console.log(err.response.data);
            })
    },[])
    const [dsPhim, setDsPhim] = useState({
        films: []
    })

    const dispatch = useDispatch();


    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2
    };


    const settings2 = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    // console.log(dsPhim.films);

    let renderDanhSachPhim = () => {
        return dsPhim.films?.map((film,index) => {
            return <div className='text-center' key={index}>
                <div className='img-film'>
                    <img src={film.hinhAnh} />
                    <div className='sub-film text-center'>
                <div>
                <h6 className='text-light text-center'>{film.tenPhim}</h6>
                <p className='text-warning'>{moment(film.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                <Link to={`/chitietphim/${film.maPhim}`} className='btn  dat-ve'>Đặt Vé</Link>
                </div>
                </div>
                </div>
                
            </div>
        })
    }

    return (
        <div className='main-carousel1 text-center'>
            <div className='video-background-carousel1'>
                <video width='100%' height='100%' autoPlay muted loop>
                    <source src={Video1} type="video/mp4" />
                </video>
                <div className='body-carousel1 text-center'>
                    <h1 style={{padding:'60px 0px'}} className='text-warning'>PHIM HOT THÁNG NÀY</h1>
                    <div className='responsiveTemp1'>
                    <div className='container text-center'>
                        <Slider className='text-center' {...settings}>
                            {renderDanhSachPhim()}
                        </Slider>
                    </div>
                    </div>

                    <div className='responsiveTemp2'>
                        <div className='container text-center'>
                            <Slider className='text-center' {...settings2} >
                                {renderDanhSachPhim()}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
