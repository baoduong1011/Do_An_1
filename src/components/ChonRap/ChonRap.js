import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './ChonRap.css'
import { layLichChieuTheoRap } from '../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import lstCumRap from './lstCumRap';
import moment from 'moment';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import {WOW} from 'wowjs';
export default function ChonRap() {


    const [rap, setRap] = useState({
        heThongRap: [],
        activeMaRap:'',
        danhSachRap:[],
        danhSachMaRap:[],
        maDiaChi:'',
        maRap:'',
        danhSachPhim:[],
        arrayBHD:[],
        flag:false
    })

    // let ActiveDiaChi1 = () => {
    //     let promise = Axios({
    //         url:'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=BHDStar',
    //         method:'GET'
    //     })
    //     promise.then(res => {
    //         setRap({...rap,arrayBHD: res.data});
    //     })
    //     promise.catch(err => {
    //         console.log(err.response.data);
    //     })
    // }

    let layHeThongRap = () => {
        let promise = Axios({
            url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap',
            method: 'GET'
        })

        promise.then(res => {
            setRap({ ...rap, heThongRap: res.data,activeMaRap:'BHDStar',maRap:'BHDStar'});
        })

        promise.catch(err => {
            alert(err.response.data);
        })
    }

    let layThongTinRap = (maHeThongRap) => {
        let promise = Axios({
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
            method: 'GET'
        })

        promise.then(res => {
            setRap({ ...rap, danhSachRap: res.data })
        })

        promise.catch(err => {
            console.log(err.response.data);
        })
    }

    // console.log('rap: ',rap.activeMaRap);


    useEffect(() => {
        Aos.init({duration: 2000,offset: 300});
        layHeThongRap();
        const wow = new WOW(
            { // default
            offset:       100,          // default
            mobile:       false,       // default
            live:         true        // default
          }
          )
          wow.init();

         
         
    }, [])


    // console.log('dsRap',rap.)

    useEffect(() => {
        layThongTinLichChieu(rap.activeMaRap);
        layThongTinRap(rap.activeMaRap);
    }, [rap.activeMaRap])

    


    let handleClick = (maHeThongRap) => {
        setRap({ ...rap, activeMaRap: maHeThongRap});
    }

    let renderHethongRap = () => {
        return rap.heThongRap.map((r, index) => {
            if (index === 0) {
                // setRap({ ...rap, activeMaRap: r.maHeThongRap});  
                return <active  style={{ padding: '0px' }} className='p-3 nav-item active'  key={index}>
                    <div style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => {
                        setRap({ ...rap, activeMaRap: r.maHeThongRap});
                    }} className="nav-link active" aria-current="page"><img src={r.logo} style={{ width: '50px', height: '50px', padding: '0px', margin: '0px' }} /></div>
                </active>
            }
            else {
                return <li className='p-3 nav-item active' key={index}>
                    <div className='active' style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => {
                        handleClick(r.maHeThongRap)
                    }} className="nav-link" aria-current="page"><img src={r.logo} style={{ width: '50px', height: '50px' }} /></div>
                </li>
            }
        })
    }

    let dispatch = useDispatch();

    let autoDispatch = (rapData) => {
        dispatch({
            type:'LIST_RAP',
            rap:rapData
        })
    }

    // useEffect(() => {
    //     autoDispatch();
    // },[])

    let renderDanhSachDiaChiRap = () => {
        return rap.danhSachRap.map((rap,index) => {
            return <li data-wow-duration="1s" data-wow-delay="0s" className='p-1 nav-item diaChi wow animate__zoomInUp active' key={index}>
                <div onClick={() => {
                    // setRap({...rap,flag:true})
                    // setRap({...rap,danhSachMaRap: rap.danhSachRap})
                    // autoDispatch(rap);
                    dispatch({
                        type:'LIST_RAP',
                        data: rap.danhSachRap,
                        maCumRap: rap.maCumRap
                    })
                }} className='nav-link active' style={{cursor:'pointer'}}>
                    <h4>{rap.tenCumRap}</h4>
                    <p>{rap.diaChi}</p>
                </div>
            </li>
        })
    }

    // console.log(rap.danhSachMaRap);

    // let renderDanSachMaRap = () => {
    //     return rap.danhSachMaRap.map((r,index) => {
    //         return <li className='p-2 nav-item' key={index}>
    //             <button className='btn btn-success p-1'> 
    //                 {r.tenRap}
    //             </button>
    //         </li>
    //     })
    // }

    // console.log('ds', rap.dsMaRap);\

    let arrayMaRap = useSelector(state => state.FilmReducer.arrayMaRap);
    console.log(arrayMaRap);
    let renderDanSachMaRap = () => {
            return arrayMaRap.map((r,index) => {
                return <div className='p-2 nav-item col-6' key={index}>
                    <button onClick={() => {
                        setRap({...rap,maRap:r.maRap})
                    }} className='btn btn-success p-1'> 
                        {r.tenRap}
                    </button>
                </div>
            })
        }

    let layThongTinLichChieu = (maRap) => {
        let promise = Axios({
            url:`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maRap}&maNhom=GP01`,
            method:'GET'
        })
        promise.then(res => {
            dispatch({
                type:"LST_HANDLE",
                data: res.data
            })
        })
        promise.catch(err => {
            console.log(err.response.data);
        })
    }

    let lstCumRap = useSelector(state => state.FilmReducer.lstCumRap);
    console.log('lst: ',lstCumRap);

    let maCumRap = useSelector(state => state.FilmReducer.maCumRap);
    console.log('maRap: ',maCumRap)

   for(let key of lstCumRap) {
    //    let newDanhSachPhim = [];
       if(key.maCumRap === maCumRap) {
           dispatch({
               type:'DANH_SACH_PHIM',
               data: key.danhSachPhim
           })
       }

    //    console.log(newDanhSachPhim);
   }

   

   let dsPhim = useSelector(state => state.FilmReducer.dsPhim);
   console.log(dsPhim);
   let renderLichChieu = () => {
       return dsPhim.map((phim,index) => {
           return <div className='col-12 p-4 lich-chieu' key={index}>
               <div className='row'>
                    <div className='col-3'>
                    <img  src={phim.hinhAnh} style={{width:'100px',height:'100px',borderRadius:'0 30px 0 30px'}} />   
                    </div>

                    <div className='col-9'>
                        <h4 className='text-left'> {phim.tenPhim}</h4>
                        <p className='text-left'><i class="fa fa-film"></i> <span className='text-success pl-4 text-bold'>2D</span></p>
                        <p>Phụ đề</p>
                    </div>
               </div>
               <div>
                   {phim.lstLichChieuTheoPhim.map((film,index) => {
                       return <Link onClick={() => {
                           dispatch({
                               type:'DAT_VE_REDUCER',
                               maLichChieu:film.maLichChieu,
                               maHeThongRap:rap.activeMaRap
                           })
                       }} to={`/datve/${film.maLichChieu}`} style={{width:'80px',height:'40px'}} style={{background:'rgb(224, 85, 20)'}} className='btn  m-1'>
                           {moment(film.ngayChieuGioChieu).format('hh:mm')}
                       </Link>
                   })}
               </div>
           </div>
       })
   }

    // useEffect(() => {
    //     layThongTinLichChieu(rap.activeMaRap);
    // },[rap.maRap])

   
    return (
        <div className='chon-rap-main text-light'>
            <div className='container'>
                <h1 className='text-center text-warning p-5' >CỤM RẠP</h1>
                <div className='row'>
                    <div className='col-5 col-md-1 col-xl-1'>
                        <div className='rap-phim'>
                            <h4 className='text-center p-3'>RẠP</h4>
                            <ul data-aos="slide-up" className="navbar-nav cumRap">
                                {renderHethongRap()}
                            </ul>
                        </div>
                    </div>
                    <div className='col-7 col-md-3 col-xl-5'>
                    <h4 className='text-center p-3'>ĐỊA CHỈ</h4>
                        <ul data-aos="slide-up" className='diaChiRap navbar-nav'>
                            {renderDanhSachDiaChiRap()}
                        </ul>
                    </div>
                    
                    <div className='col-12 col-md-8 col-xl-6'>
                    <h4 className='text-center p-3'>LỊCH CHIẾU</h4>
                        <div data-aos="slide-up" className='row lichChieu'>
                            {/* {rap.flag ? "" : <h3>Hãy chọn địa điểm chiếu</h3>} */}
                            {renderLichChieu()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
