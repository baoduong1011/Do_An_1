import { animated , useSpring } from 'react-spring'
import React, { useEffect, useReducer, useState } from 'react'
import propsAnimtion1 from '../../animtionPackages/Animation'
import './css/DangNhap.css';
import {userLoginService} from '../../services/service'
import { useSelector } from 'react-redux';
import Contact from '../../components/contact/Contact';
import Footer from '../../components/footer/Footer';
import swal from 'sweetalert';
import { Redirect } from 'react-router';
import Axios from 'axios';
export default function DangNhap(props) {
    const propsAnimtion1 = useSpring({
        opacity:1,
        from: {
            opacity:0
        },
        config: {
            duration:3000
        }
      })

    const [userLogin,setUser] = useState({
        values: {
            taiKhoan:'',
            matKhau:''
        },
        errors: {
            taiKhoan:'',
            matKhau:''
        },
        valid:false

    })

    let maLichChieu = useSelector(state => state.DatVeReducer.maLichChieu);
    console.log(maLichChieu);

    let handleChange = (e) => {
        let errorMessage = '';
        let {name,value} = e.target;
        if(value.trim() === '') {
            if(name === 'taiKhoan') {
                errorMessage = 'Tài khoản bạn chưa nhập';
            }
            if(name === 'matKhau') {
                errorMessage = 'Mật khẩu bạn chưa nhập';
            }
        }

        let newValues = {...userLogin.values,[name]:value};
        let newErrors = {...userLogin.errors,[name]:errorMessage};

        setUser({
            ...userLogin,
            values: newValues,
            errors: newErrors
        })
    }

    let checkValid = () => {
        let valid = true;
        for(let key in userLogin.errors) {
            if(userLogin.errors[key] !== "" || userLogin.values[key] === '') {
                valid = false;
            }
        }
        setUser({...userLogin,valid:valid});
    }

    useEffect(() => {
        checkValid();
    },[userLogin.errors]);

    let handleSubmit = () => {
        userLoginService.DangNhap(userLogin.values).then(res => {
            localStorage.setItem('taiKhoan',userLogin.values.taiKhoan);

            localStorage.setItem('accessToken',res.data.accessToken);
            localStorage.setItem('maLoaiNguoiDung',res.data.maLoaiNguoiDung);
            // console.log(res.data);
            swal({
                title: "Đăng nhập thành công",
                text: "Chào mừng bạn đến với Film Studio!",
                icon: "success",
                button: "OK",
            })
            // alert(`Hello ${res.data.taiKhoan}`);
            // window.location.reload();
            setTimeout(function() {
                window.location.replace('/trangchu');
            },2500)
            // props.history.push('/trangchu');
        })
        .catch(err => {
            let stringNotify = `${err.response.data}`;
            swal(`${stringNotify}`);
        })
    }

    if(localStorage.getItem('taiKhoan')) {
        swal({
            title: "Bạn đã đăng nhập",
            text: "Hãy đăng xuất để đăng nhập lại",
            icon: "error",
            button: "OK",
        })
        return <Redirect to='/trangchu' />
    }
    
    else return (
        <animated.div style={propsAnimtion1}>
            <div className='main-dang-nhap-web'>
                <div className='dang-nhap-container'>
                    <h2>ĐĂNG NHẬP</h2>
                    <div className='row100'>
                        <div className='col'>
                            <div className='inputBox'>
                                <input autocomplete="off" onChange={handleChange} type='text' required='required' 
                                name='taiKhoan'
                                 />
                                 <span className='text'>Tài khoản</span>
                                 <span className='line'></span>
                            </div>
                        </div>
                        <p className='text-center text-danger'>{userLogin.errors.taiKhoan}</p>
                    </div>

                    <div className='row100'>
                        <div className='col'>
                            <div className='inputBox'>
                                <input autocomplete="off" type='password' required='required' name='matKhau'
                                onChange={handleChange}
                                 />
                                 <span className='text'>Mật khẩu</span>
                                 <span className='line'></span>
                            </div>
                        </div>
                        <p className='text-center text-danger'>{userLogin.errors.matKhau}</p>
                    </div>

                    <div className='submit text-center'>
                        {userLogin.valid ? <button onClick={() => {
                            handleSubmit()
                        }} className='btn'>Đăng nhập</button> : <button disabled style={{cursor:'not-allowed'}} className='btn'>Đăng nhập</button>}
                    </div>
                </div>
            </div>
            <Contact/>
            <Footer/>
        </animated.div>
    )
}
