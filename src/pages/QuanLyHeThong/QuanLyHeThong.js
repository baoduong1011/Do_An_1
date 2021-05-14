import { animated, useSpring } from '@react-spring/web';
import React from 'react'
import { BrowserRouter, Link, NavLink, Redirect, Route, Router, Switch } from 'react-router-dom'
import Loader from '../../components/loader/Loader';
import './css/QuanLyHeThong.css';
import LichSuDatVe from './LichSuDatVe/LichSuDatVe';
import QuanLyFilm from './QuanLyFilm/QuanLyFilm';
import QuanLyUser from './QuanLyUser/QuanLyUser';
import TaoLichChieu from './TaoLichChieu/TaoLichChieu';
import TimKiemNguoiDung from './TimKiemThongTinNguoiDung/TimKiemNguoiDung';
export default function QuanLyHeThong() {

    const propsAnimtion1 = useSpring({
        opacity:1,
        from: {
            opacity:0
        },
        config: {
            duration:3000
        }
      })
      

      let maLoaiNguoiDung = localStorage.getItem('maLoaiNguoiDung');

      if( localStorage.getItem('taiKhoan') && maLoaiNguoiDung === "QuanTri") {
        return (
            <animated.div  className='quan-ly-he-thong-main'>
                <Loader/>
              <div style={{height:'100%',backgroundColor:'black'}} className='container-fluid'>
                    <div className='row'>
                    <BrowserRouter>
                        <div className='col-2'>
                            <NavLink className='link' to='/quanlyfilm'> <i class="fa fa-plus"></i> Quản lý Film</NavLink>
                            <br/>
                            <NavLink className='link' to='/quanlyuser'> <i class="fa fa-caret-square-right"></i> Quản lý User</NavLink>
                            <br/>
                            <NavLink className='link' to='/timkiemnguoidung'> <i class="fa fa-search"></i> Tìm kiếm</NavLink>
                            <br />
                            {/* <NavLink className='link' to='/taolichchieu'>Tạo lịch chiếu</NavLink> */}
                            {/* <NavLink className='link' to='/lichsudatve'> <i class="fa fa-ticket-alt"></i> Vé Film</NavLink> */}
                        </div>
    
                        <div className='col-10'>
                            <Switch>
                            <Route exact path='/quanlyuser' component={QuanLyUser} />
                            <Route exact path='/quanlyfilm' component={QuanLyFilm} />
                            <Route exact path='/timkiemnguoidung' component={TimKiemNguoiDung} />
                            <Route exact path='/quanlyhethong' component={QuanLyFilm} />
                            {/* <Route exact path='/taolichchieu' component={TaoLichChieu} /> */}
                            {/* <Route exact path='/lichsudatve' component={LichSuDatVe} /> */}
                            </Switch>
                        </div>
    
                    </BrowserRouter>
                    </div>
              </div>
            </animated.div>
        )
    }
    else {
        alert('Bạn không có quyền truy cập vào hệ thống (*)');
        return <Redirect to='/trangchu' />
    }
}
