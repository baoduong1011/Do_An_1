import { useSpring, animated } from 'react-spring'
import React, { useEffect, useState } from 'react'
import propsAnimtion1 from '../../animtionPackages/Animation';
import './css/DangKy.css';
import { userRegisterService } from '../../services/service';
import Contact from '../../components/contact/Contact';
import Footer from '../../components/footer/Footer';
import swal from 'sweetalert';
import Loader from '../../components/loader/Loader';
export default function DangKy() {

   


    const propsAnimtion1 = useSpring({
        opacity:1,
        from: {
            opacity:0
        },
        config: {
            duration:3000
        }
      })
      const [userRegister,setUserRegister] = useState({
          values:{
              taiKhoan:'',
              matKhau:'',
              email:'',
              soDt:'',
              maNhom:'GP01',
              maLoaiNguoiDung:'',
              hoTen:''
          },
          errors: {
            taiKhoan:'',
            matKhau:'',
            email:'',
            soDt:'',
            maNhom:'',
            maLoaiNguoiDung:'',
            hoTen:''
          },
          valid:false
      })
      let handleChange = (e) => {
            let {name,value,type} = e.target;
            let errorMessage = '';
            if(type === 'email') {
                const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

                if (!regex.test(value)) {
                errorMessage = 'Email' + ' không đúng định dạng';
                }
            }

            if(name === 'soDt') {
                const regex =/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if(!regex.test(value)) {
                    errorMessage = 'Số Điện Thoại' + ' không đúng định dạng số'
                }
            }

            if(value.trim() === '') {
                if(name === 'hoTen') {
                    errorMessage = 'Họ tên không được để trống (*)';
                }
                if(name === 'taiKhoan') {
                    errorMessage = 'Tài khoản không được để trống (*)';
                }
                if(name === 'matKhau') {
                    errorMessage = 'Mật khẩu không được để trống (*)';
                }
                if(name === 'maLoaiNguoiDung') {
                    errorMessage = 'Mã loại người dùng không được để trống (*)';
                }
                if(name === 'soDt') {
                    errorMessage = 'Số điện thoại không được để trống (*)';
                }
                if(name === 'email') {
                    errorMessage = 'Email không được để trống (*)';
                }

            }

            let values = {...userRegister.values,[name]:value};
            let errors = {...userRegister.errors,[name]:errorMessage};

            setUserRegister({
                ...userRegister,
                values: values,
                errors: errors
            })


      }

      let checkValid = () => {
        let valid = true;
        for(let key in userRegister.errors) {
            if(userRegister.errors[key] !== "" || userRegister.values[key] === '') {
                valid = false;
            }
        }
        setUserRegister({...userRegister,valid:valid});
    }

      useEffect(() => {
            checkValid();
      },[userRegister.errors]);
      let handleSubmit = (e) => {
        // e.preventDefault();
        userRegisterService.DangKy(userRegister.values).then(res => {
            swal("Đăng ký thành công!", "Chúc bạn có những trải nghiệm vui vẻ!", "success");
            setTimeout(function() {
                window.location.reload();
            },4000);
        })
        .catch(err => {
            alert(err.response.data);   
        })
      }
    return (
        <animated.div>
            <Loader/>
            <div className='body-dang-ky-web'>
            <div className='main-dang-ky-web'>
                <div className='dang-ky-container'>
                    <h2>ĐĂNG KÝ</h2>
                    <div className='row100'>
                        <div className='col'>
                            <div className='inputBox'>
                                <input autocomplete="off" style={{color:'wheat'}} onChange={handleChange} type='text' name='taiKhoan' />
                                <span className='text'>Tài khoản</span>
                                <span className='line'></span>
                            </div>
                        </div>
                        <p className='text-center text-danger'>{userRegister.errors.taiKhoan}</p>
                    </div>

                    <div className='row100'>
                        <div className='col'>
                            <div className='inputBox'>
                                <input autocomplete="off" style={{color:'wheat'}} onChange={handleChange} type='password' name='matKhau' />
                                <span className='text'>Mật khẩu</span>
                                <span className='line'></span>
                            </div>
                        </div>
                        <p className='text-center text-danger'>{userRegister.errors.matKhau}</p>
                    </div>

                    <div className='row100'>
                        <div className='col'>
                            <div className='inputBox'>
                                <input autocomplete="off" style={{color:'wheat'}} onChange={handleChange} type='text' name='hoTen' />
                                <span className='text'>Họ tên</span>
                                <span className='line'></span>
                            </div>
                        </div>
                        <p className='text-center text-danger'>{userRegister.errors.hoTen}</p>
                    </div>

                    <div className='row100'>
                        <div className='col'>
                            <div className='inputBox'>
                                <input autocomplete="off" style={{color:'wheat'}} onChange={handleChange} type='email' name='email' />
                                <span className='text text-center'>Email</span>
                                <span className='line'></span>
                            </div>
                        </div>
                        <p className='text-center text-danger'>{userRegister.errors.email}</p>
                    </div>

                    <div className='row100'>
                        <div className='col'>
                            <div className='inputBox'>
                                <input autocomplete="off" style={{color:'wheat'}} onChange={handleChange} type='soDt' name='soDt' />
                                <span className='text text-center'>Số điện thoại</span>
                                <span className='line'></span>
                            </div>
                        </div>
                        <p className='text-center text-danger'>{userRegister.errors.soDt}</p>
                    </div>

                    <div className='row100'>
                        <div className='col'>
                            <div className='inputBox'>
                                <input autocomplete="off" style={{color:'wheat'}} onChange={handleChange} type='maLoaiNguoiDung' name='maLoaiNguoiDung' />
                                <span className='text'>Mã loại người dùng</span>
                                <span className='line'></span>
                            </div>
                        </div>
                        <p className='text-center text-danger'>{userRegister.errors.maLoaiNguoiDung}</p>
                    </div>

                    <div className='submit text-center'>
                        {userRegister.valid ? <button onClick={() => {
                            handleSubmit()
                        }} className='btn'>Đăng ký</button> : <button disabled style={{cursor:'not-allowed'}} className='btn'>Đăng ký</button>}
                    </div>
                </div>
            </div>
            </div>
            <Contact/>
            <Footer/>
        </animated.div>
    )
}
