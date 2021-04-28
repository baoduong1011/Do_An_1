import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import './QuanLyFilm.css';
import Axios from 'axios';
import { chinhSuaPhim, danhSachPhim, taoLichChieu, xoaPhim } from '../../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import TaoLichChieu from '../TaoLichChieu/TaoLichChieu';
import swal from 'sweetalert';
import Loader from '../../../components/loader/Loader';
export default function QuanLyFilm() {
    let maLoaiNguoiDung = localStorage.getItem('maLoaiNguoiDung');

    let [film, setFilm] = useState({
        values: {
            maPhim: '',
            tenPhim: '',
            trailer: '',
            moTa: '',
            maNhom: 'GP01',
            ngayKhoiChieu: '',
            danhGia: '',
            hinhAnh: {},
            bidanh: ''
        },
        errors: {
            maPhim: '',
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            danhGia: '',
            hinhAnh: '',
        },
        dsPhim: [],
        valid: false,
        flag: 0,
        valuesDate: {
            maPhim:'',
            ngayChieuGioChieu:'',
            maRap:'',
            giaVe:''
        },
        errorsDate: {
            maPhim:0,
            ngayChieuGioChieu:'',
            maRap:0,
            giaVe:0
        },
        validDate:false
    })

    let handleChangeDate = (e) => {
        let {name,value} = e.target;
        let errorMessage = "";
        if(value.trim() === "") {
            if(name === "maPhim") {
                errorMessage = "Mã phim không được bỏ trống  (*)";
            }

            if(name === "ngayChieuGioChieu") {
                errorMessage = "Ngày chiếu giờ chiếu không được bỏ trống  (*)";
            }

            if(name === "maRap") {
                errorMessage = "Mã rạp không được bỏ trống  (*)";
            }

            if(name === "giaVe") {
                errorMessage = "Giá vé không được bỏ trống  (*)";
            }
        }

        let newError = {...film.errorsDate,[name]:errorMessage};
        let newValue = {...film.valuesDate,[name]:value};

        setFilm({
            ...film,
            valuesDate: newValue,
            errorsDate: newError
        })

    }


    let submitLichChieuMoi = () => {
        let promise = Axios({
            method:'POST',
            url:'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu',
            data: film.valuesDate,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
        })

        promise.then(res => {
            swal({
                title: "Thêm lịch thành công",
                text: "Dữ liệu của bạn đã được ghi lại",
                icon: "success",
              });
              setTimeout(function() {
                  window.location.reload();
              },3000)
        })

        promise.catch(err => {
            alert(err.response.data);
        })
    }

    let handleChange = (e) => {
        let { name, type, value } = e.target;
        let errorMessage = '';
        if (value.trim() === '') {
            if (name === 'maPhim') {
                errorMessage = 'Mã phim không được để trống (*)';
            }
            if (name === 'tenPhim') {
                errorMessage = 'Tên phim không được để trống (*)';
            }
            if (name === 'trailer') {
                errorMessage = 'Trailer không được để trống (*)';
            }
            if (name === 'moTa') {
                errorMessage = 'Mô tả không được để trống (*)';
            }
            if (name === 'hinhAnh') {
                errorMessage = 'Hình ảnh không được để trống (*)';
            }

            if (name === 'danhGia') {
                errorMessage = 'Đánh giá không được để trống (*)';
            }
        }

        let newHinhAnh = {};

        if (name === 'hinhAnh') {
            newHinhAnh = e.target.files[0];
        }

        let values = { ...film.values, [name]: value, ['hinhAnh']: newHinhAnh };
        let errors = { ...film.errors, [name]: errorMessage };
        setFilm({ ...film, values: values, errors: errors });
    }

    useEffect(() => {
        danhSachPhim.LoadDanhSach().then(res => {
            setFilm({ ...film, dsPhim: res.data });
        })
            .catch(err => {
                alert(err.response.data);
            })
    }, [])

    let checkValidDate = () => {
        let valid = true;
        for(let key in film.errorsDate) {
            if(film.errorsDate[key] !== "" || film.valuesDate[key] === '') {
                valid = false;
            }
        }

        setFilm({...film,validDate: valid})
    }

    useEffect(() => {

        checkValidDate();
    },[film.errorsDate])

    let handleSubmit = () => {
        var form_data = new FormData();
        for (let key in film.values) {
            form_data.append(key, film.values[key]);
        }

        let promise = Axios({
            url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh',
            method: 'POST',
            data: form_data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        })
        promise.then(res => {
            swal({
                title: "Thêm thành công",
                text: "Dữ liệu của bạn đã được ghi lại",
                icon: "success",
              });
              setTimeout(function() {
                  window.location.reload();
              },3000)
            
        })

        promise.catch(err => {
        let string = `${err.response.data}`;
        swal(`${string}`);
        })
    }

    let dispatch = useDispatch();

    // let filmEdit = useSelector(state => state.FilmReducer.film);

    useEffect(() => {
        setFilm({ ...film, values: filmEdit })
    }, [film.flag])

    let renderDanhSachPhim = () => {
        return film.dsPhim.map((film1, index) => {
            return <tr className='text-light' key={index}>
                <td>{index + 1}</td>
                <td>{film1.maPhim}</td>
                <td>{film1.tenPhim}</td>
                <td><button onClick={() => {
                    dispatch({
                        type: 'CHINH_SUA_FILM',
                        data: film1
                    })
                    let newFlag = film.flag + 1;
                    setFilm({ ...film, flag: newFlag });

                }} className='btn btn-info'>Sửa</button></td>
                <td><button onClick={() => {
                    xoaPhim.XoaPhim(film1.maPhim).then(res => {
                        swal({
                            title: "Xóa thành công",
                            text: "Dữ liệu của bạn đã được ghi lại",
                            icon: "success",
                            button: "OK",
                        })
                        setTimeout(function() {
                            window.location.reload();
                        },3000)
                    })
                        .catch(err => {
                            let string = `${err.response.data}`;
                            swal(`${string}`);
                        })
                }} className='btn btn-danger'>Xóa</button></td>
                <td><button type="button" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => {
                    // dispatch({
                    //     type:"TAO_LICH_PHIM",
                    //     maPhim: film1.maPhim
                    // })
                    // window.location.replace('/taolichchieu');

                }} className='btn btn-warning'>Tạo lịch</button></td>

            <div className='tao-lich-chieu-main'>
            <div style={{background:'rgba(0, 0, 0, 0.564)'}} className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div style={{maxHeight:'500px',height:'500px'}} className="modal-content bg-dark">
                            <div className="modal-header">
                                <h5 className="modal-title text-dark text-center" id="exampleModalLongTitle"></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='box'>
                                    <h2 className='text-center'>Tạo lịch chiếu</h2>
                                    <form>
                                        <div className='inputBox'>
                                            <input onChange={handleChangeDate} type='text' name="maPhim" required />
                                            <label>Mã phim</label>
                                            <p className='text-center text-danger'>{film.errorsDate.maPhim}</p>
                                        </div>

                                        <div className='inputBox'>
                                            <input onChange={handleChangeDate} type='text' name="ngayChieuGioChieu" required />
                                            <label>Ngày chiếu giờ chiếu</label>
                                            <p className='text-center text-danger'>{film.errorsDate.ngayChieuGioChieu}</p>
                                        </div>

                                        <div className='inputBox'>
                                            <input onChange={handleChangeDate} type='text' name="maRap" required />
                                            <label>Mã rạp</label>
                                            <p className='text-center text-danger'>{film.errorsDate.maRap}</p>
                                        </div>

                                        <div className='inputBox'>
                                            <input onChange={handleChangeDate} type='text' name="giaVe" required />
                                            <label>Giá vé</label>
                                            <p className='text-center text-danger'>{film.errorsDate.giaVe}</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                {film.validDate ? <button onClick={() => {
                                    submitLichChieuMoi();
                                }}  className="btn btn-primary">Tạo lịch</button> : <button disabled style={{cursor:'not-allowed'}} className="btn btn-primary">Tạo lịch</button>}
                            </div>
                        </div>
                    </div>
                </div>
        </div>


            </tr>
        })
    }

    let filmEdit = useSelector(state => state.FilmReducer.film);
    console.log('Film: ', filmEdit);

    if (localStorage.getItem('taiKhoan') && maLoaiNguoiDung === "QuanTri") {
        return (
            <div className='body-quan-ly-film'>
                {/* <Loader/> */}
                <div className='main-quan-ly-film'>
                    <div className='quan-ly-film-container'>
                        <h2>QUẢN LÝ PHIM</h2>
                        <div className='row100'>
                            <div className='col'>
                                <div className='inputBox'>
                                    <input value={film.values.maPhim} value={film.values.maPhim} onChange={handleChange} style={{ color: 'wheat' }} type='text' name='maPhim' />
                                    <span className='text'>Mã phim</span>
                                    <span className='line'></span>
                                </div>
                            </div>
                            <p className='text-center text-danger'>{film.errors.maPhim}</p>
                        </div>

                        <div className='row100'>
                            <div className='col'>
                                <div className='inputBox'>
                                    <input value={film.values.tenPhim} value={film.values.tenPhim} onChange={handleChange} style={{ color: 'wheat' }} type='text' name='tenPhim' />
                                    <span className='text'>Tên phim</span>
                                    <span className='line'></span>
                                </div>
                            </div>
                            <p className='text-center text-danger'>{film.errors.tenPhim}</p>
                        </div>

                        <div className='row100'>
                            <div className='col'>
                                <div className='inputBox'>
                                    <input value={film.values.trailer} onChange={handleChange} style={{ color: 'wheat' }} type='text' name='trailer' />
                                    <span className='text'>Trailer</span>
                                    <span className='line'></span>
                                </div>
                            </div>
                            <p className='text-center text-danger'>{film.errors.trailer}</p>
                        </div>


                        <div className='row100'>
                            <div className='col'>
                                <div className='inputBox'>
                                    <input value={film.values.moTa} onChange={handleChange} style={{ color: 'wheat' }} type='text' name='moTa' />
                                    <span className='text'>Mô tả</span>
                                    <span className='line'></span>
                                </div>
                            </div>
                            <p className='text-center text-danger'>{film.errors.moTa}</p>
                        </div>

                        <div className='row100'>
                            <div className='col'>
                                <div className='inputBox'>
                                    <input onChange={handleChange} style={{ color: 'wheat' }} type='file' name='hinhAnh' />
                                    <span className='text'>Hình ảnh</span>
                                    <span className='line'></span>
                                </div>
                            </div>
                            <p className='text-center text-danger'>{film.errors.hinhAnh}</p>
                        </div>

                        <div className='row100'>
                            <div className='col'>
                                <div className='inputBox'>
                                    <input value={film.values.danhGia} onChange={handleChange} style={{ color: 'wheat' }} type='text' name='danhGia' />
                                    <span className='text'>Đánh giá</span>
                                    <span className='line'></span>
                                </div>
                            </div>
                            <p className='text-center text-danger'>{film.errors.danhGia}</p>
                        </div>
                        <button onClick={() => {
                            handleSubmit();
                        }} className='btn btn-info'>Thêm</button>

                        <button onClick={() => {
                            var form_data = new FormData();
                            for (let key in film.values) {
                                form_data.append(key, film.values[key]);
                            }
                            chinhSuaPhim.ChinhSuaPhim(form_data).then(res => {
                                swal({
                                    title: "Chỉnh sửa thành công",
                                    text: "Dữ liệu của bạn đã được lưu lại!",
                                    icon: "success",
                                    button: "OK",
                                })
                                setTimeout(function() {
                                    window.location.reload();
                                },3000)
                            })
                                .catch(err => {
                                    console.log(err.response.data);
                                })
                        }} className='btn btn-warning ml-4'>Chỉnh sửa</button>
                    </div>
                </div>

                <div className='thong-tin-film text-light'>
                    <h1 className='text-center'>DANH SÁCH NGƯỜI DÙNG</h1>
                    <table className='table'>
                        <thead>
                            <tr className='text-light'>
                                <td>STT</td>
                                <td>Mã phim</td>
                                <td>Tên phim</td>
                                <td>Sửa</td>
                                <td>Xóa</td>
                                <td>Lịch chiếu</td>
                            </tr>
                        </thead>

                        <tbody>
                            {renderDanhSachPhim()};
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
    else {
        alert('Bạn không có quyền truy cập vào hệ thống (*)');
        return <Redirect to='/trangchu' />
    }
}
