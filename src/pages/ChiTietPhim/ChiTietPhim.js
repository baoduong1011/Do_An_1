import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router'
import { chiTietHeThongRap, chiTietPhimSer, layThongTinLichChieu, thongTinRapSer } from '../../services/service';
import './css/ChiTietPhim.css';
import Video1 from './chitietphim.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { a } from '@react-spring/web';
import DAT_VE_REDUCER from '../../redux/actions/action';
import LOGO_RAP_PHIM from '../../redux/actions/action';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {WOW} from 'wowjs';
import Loader from '../../components/loader/Loader';
// import {} from 'wow'
export default function ChiTietPhim(props) {
    let maPhim = props.match.params.idFilm;
    // console.log(maPhim);
    const [chiTietPhim, setChiTietPhim] = useState({
        chiTiet: {},
        heThongRapChieu: [{ maHeThongRap: 'Chọn rạp', tenHeThongRap: 'Chọn rạp' }],
        maHeThongRap: [],
        maHeThongRap: '',
        cumRapChieu: [],
        maCumRap: '',
        arrayMaCumRap: [{ maCumRap: 'Reload lại tại đây trước khi chọn', tenCumRap: 'Reload lại tại đây trước khi chọn' }],
        lichChieu: [{ ngayChieuGioChieu: 'Reload lại tại đây trước khi chọn', maLichChieu: 'Reload lại tại đây trước khi chọn' }],
        maLichChieu: '',
        tenCumRap: '',
        tenHeThongRap: '',
        logo: '',
    })

    useEffect(() => {

        const wow = new WOW(
            { // default
            offset:       100,          // default
            mobile:       false,       // default
            live:         true        // default
          }
          )
          wow.init();



        Aos.init({duration:2000});
        chiTietPhimSer.LoadChiTietPhim(maPhim).then(res => {
            setChiTietPhim({ ...chiTietPhim, chiTiet: res.data });
        })
            .catch(err => {
                console.log(err.response.data);
            })
    }, [])

    useEffect(() => {
        layThongTinLichChieu.LoadThongTinLichChieu(maPhim).then(res => {
            let newHeThongRapChieu = [];
            newHeThongRapChieu = res.data.heThongRapChieu;
            // console.log(res.data.heThongRapChieu)
            setChiTietPhim({ ...chiTietPhim, heThongRapChieu: newHeThongRapChieu })
        })
            .catch(err => {
                console.log(err.response.data);
            })
    }, [chiTietPhim.chiTiet])

    // console.log(chiTietPhim.heThongRapChieu);

    // console.log('Ma He Thong Rap: ',chiTietPhim.maHeThongRap);

    let onnChange1 = (e) => {
        setChiTietPhim({ ...chiTietPhim, maHeThongRap: e.target.value, tenHeThongRap: e.target.name });
    }


    let renderChange1 = () => {
        return chiTietPhim.heThongRapChieu.map((rap, index) => {
            return <option value={rap.maHeThongRap} name={rap.tenHeThongRap}>
                {rap.tenHeThongRap}
            </option>
        })
    }


    useEffect(() => {
        let newLogo = '';
        thongTinRapSer.LoadThongTinRap(chiTietPhim.maHeThongRap).then(res => {
            for(let key of res.data) {
                dispatch({
                    type: 'LOGO_RAP_PHIM',
                    logo: key.logo
                })
            }
        })

        for (let key of chiTietPhim.heThongRapChieu) {
            if (key.maHeThongRap === chiTietPhim.maHeThongRap) {
                setChiTietPhim({ ...chiTietPhim, cumRapChieu: key.cumRapChieu,logo: newLogo })
            }
        }
    }, [chiTietPhim.maHeThongRap])



    useEffect(() => {
        let arrayTemp = [{ maCumRap: 'Reload lại tại đây trước khi chọn', tenCumRap: 'Reload lại tại đây trước khi chọn' }];
        for (let key of chiTietPhim.cumRapChieu) {
            arrayTemp.push({
                tenCumRap: key.tenCumRap,
                maCumRap: key.maCumRap
            })
        }
        setChiTietPhim({ ...chiTietPhim, arrayMaCumRap: arrayTemp });
    }, [chiTietPhim.cumRapChieu])



    let handleChange2 = (e) => {
        setChiTietPhim({ ...chiTietPhim, maCumRap: e.target.value })
    }

    let renderChange2 = () => {
        return chiTietPhim.arrayMaCumRap.map((rap, index) => {
            return <option value={rap.maCumRap}>
                {rap.tenCumRap}
            </option>
        })
    }

    // useEffect(() => {
    //     thongTinRapSer.LoadThongTinRap(chiTietPhim.maHeThongRap).then(res => {
    //         setChiTietPhim({...chiTietPhim,logo: res.data.logo});
    //     })
    // },[chiTietPhim.maHeThongRap])

    // console.log('logo: ',chiTietPhim.logo);


    useEffect(() => {
        for (let key of chiTietPhim.cumRapChieu) {
            if (key.maCumRap === chiTietPhim.maCumRap) {
                let arrayTemp = key.lichChieuPhim;
                arrayTemp.push({ ngayChieuGioChieu: 'Reload lại tại đây trước khi chọn', maLichChieu: 'Reload lại tại đây trước khi chọn' });
                setChiTietPhim({ ...chiTietPhim, lichChieu: arrayTemp })
            }
        }
    }, [chiTietPhim.maCumRap])

    let renderChange3 = () => {
        return chiTietPhim.lichChieu.map((lichChieu, index) => {
            return <option value={lichChieu.maLichChieu}>
                {moment(lichChieu.ngayChieuGioChieu).format('DD-MM-YYYY hh:mm A')}
            </option>
        })
    }

    

    let handleChange3 = (e) => {
        setChiTietPhim({ ...chiTietPhim, maLichChieu: e.target.value });
    }
    const dispatch = useDispatch();

    let maCumRap = useSelector(state => state.DatVeReducer.maCumRap);

    let logo = useSelector(state => state.DatVeReducer.logo);
    return (
        <div className='main-chi-tiet-film'>
            <Loader/>
            <div className='container-fluid bg1-chi-tiet-phim'>
                <div className='row'>
                    <div className='col-12 col-xl-12 text-center wow animate__tada'  data-wow-duration="1s" data-wow-delay="0s">
                        <iFrame src={chiTietPhim.chiTiet.trailer} width="680" height="480" allowfullscreen></iFrame>
                    </div>

                    <div className='col-12 col-xl-12 body-text'>
                        <div className='body-text-chi-tiet-phim'>
                            <h1 data-text={chiTietPhim.chiTiet.tenPhim} className='text-center'> <i class="fa fa-film"></i> {chiTietPhim.chiTiet.tenPhim}</h1>
                        </div>
                        <div className='borderName'>
                            <div className='mo-ta-chi-tiet-phim text-center'>
                                <h4  data-wow-duration="1s" data-wow-delay="0s" className='wow animate__wobble text-center'> <i class="fa fa-calendar-alt"></i> Ngày chiếu: {moment(chiTietPhim.chiTiet.ngayKhoiChieu).format('DD-MM-YYYY')} </h4>

                                
                                <h5 data-wow-duration="1s" data-wow-delay="0s" className='text-center wow animate__wobble'>Mô tả: {chiTietPhim.chiTiet.moTa}</h5>
                                    <div style={{ marginLeft: '0%' }} className='text-warning text-center'>
                                        <div>
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg2-main-chi-tiet-phim'>
                <div className='bg2-video'>
                    <video  autoPlay muted loop>
                        <source src={Video1} type="video/mp4" />
                    </video>
                    <div className='quan-ly-rap'>
                        <div className='header'>
                            <h1 data-aos="slide-down" className='text-warning text-center'>CHỌN CỤM RẠP CHIẾU</h1>
                        </div>
                        {/* {renderRapPhim()} */}
                        <div className='selectAction'>
                            <div className='container'>
                                <div className='row'>
                                    <div data-aos="fade-up" className='text-center col-12 col-md-6 col-lg-3'>
                                        <select className='text-center' onChange={onnChange1}>
                                            {renderChange1()}
                                        </select>
                                    </div>

                                    <div data-aos="fade-up" className='text-center col-12 col-md-6 col-lg-3'>
                                        <select className='text-center' onChange={handleChange2}>
                                            {renderChange2()}
                                        </select>
                                    </div>

                                    <div data-aos="fade-up" className='text-center col-12 col-md-6 col-lg-3'>
                                        <select className='text-center' onChange={handleChange3}>
                                            {renderChange3()}
                                        </select>
                                    </div>
                                    <div className='text-center col-12 col-md-6 col-lg-3'>
                                        <Link style={{width:'100%'}} to={`/datve/${chiTietPhim.maLichChieu}`}  onClick={() => {
                                            dispatch({
                                                type: 'DAT_VE_REDUCER',
                                                maLichChieu: chiTietPhim.maLichChieu,
                                                maCumRap: chiTietPhim.maCumRap,
                                                maHeThongRap: chiTietPhim.maHeThongRap
                                            })
                                        }} className='btn btn-success btnDatVe text-center'>Đặt vé</Link>
                                    </div>
                                </div>

                                <div className='thong-tin-dat-ve'>
                                   <div className='container'>
                                        <div data-aos="flip-down" className='row'>
                                            <div className='col-lg-12 col-xl-4'>
                                            <i class="fab fa-android"></i>
                                             Film Studio rất vui vì được đón tiếp quý vị. Là web được kết nối với tất cả các rạp nổi tiếng với nhiều bọ phim ra mắt hấp dẫn bom tấn nhất thời đại.
                                            </div>

                                            <div className='col-lg-12 col-xl-4'>
                                            <i class="fa fa-code"></i> Đây là đồ án được thực hiện bở hai sinh viên UIT đến từ khoa Mạng Máy Tính và Truyền thông
                                            </div>

                                            <div className=' col-lg-12 col-xl-4'>
                                            <i class="fa fa-people-carry"></i> Dương Tuấn Bảo và Nguyễn Lê Hy hiện đang là sinh viên năm 2 của ngành An Toàn Thông Tin
                                            </div>
                                        </div>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
