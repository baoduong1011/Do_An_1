import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { lichSuDatVe, timKiem } from '../../../services/service';
import './TimKiem.css';
export default function TimKiemNguoiDung() {


    const [key, setKey] = useState({
        taiKhoan: '',
        info: [],
        taiKhoanDatVe:'',
        thongTinDatVe:[]
    })

    let handleChange = (e) => {
        let { name, value } = e.target;
        setKey({ ...key, taiKhoan: value });
    }

    let dispatch = useDispatch();

    let taiKhoanDatVe = useSelector(state => state.UserReducer.taiKhoanDatVe);

    let renderResults = () => {
        return key.info.map((tk, index) => {
            return <tr className='text-light' key={index}>
                <td>{index + 1}</td>
                <td>{tk.taiKhoan}</td>
                <td>{tk.soDt}</td>
                <td>{tk.email}</td>
                <td><button onClick={() => {
                    dispatch({
                        type:'LICH_SU_DAT_VE',
                        taiKhoanDatve: tk.taiKhoan
                    })
                    clickLichSuDatVe();
                }} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" className='btn btn-info'>Vé phim</button></td>
            </tr>
        })
    }

    let clickLichSuDatVe = () => {
        let obj = {
            "taiKhoan": taiKhoanDatVe
        }
        lichSuDatVe.LichSuDatVe(obj).then(res => {
            // console.log(res.data.thongTinDatVe);
            setKey({...key,thongTinDatVe: res.data.thongTinDatVe})
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }

    // useEffect(() => {
    //     clickLichSuDatVe();
    // },[])

    let renderLichSuVe = () => {
        return key.thongTinDatVe?.map((ve,index) => {
            return <tr key={index}>
                <td>{index+1}</td>
                <td>{ve.tenPhim}</td>
                <td>{ve.ngayDat}</td>
            </tr>

        })
    }


    return (
        <div style={{height:'100%',backgroundColor:'black'}} className='tim-kiem-nguoi-dung-main'>
            <h3 className='text-center text-light pt-4'>TÌM KIẾM NGƯỜI DÙNG</h3>
            <div className='search-box'>
                <input onChange={handleChange} className='search-txt' type='text' name='taiKhoan' placeholder="Nhập tên người dùng..." />
                <a onClick={() => {
                    timKiem.TimKiem(key.taiKhoan).then(res => {
                        setKey({ ...key, info: res.data });
                    })
                        .catch(err => {
                            alert(err.response.data);
                        })
                }} className='search-btn' href="#">
                    <i class="fa fa-search"></i>
                </a>
            </div>

            <div>
                <table style={{ marginTop: '100px', paddingTop: '100px' }} className='table'>
                    <thead>
                        <tr className='text-light'>
                            <td>STT</td>
                            <td>Tên người dùng</td>
                            <td>Số điện thoại</td>
                            <td>Email</td>
                            <td>Lịch sử đặt vé</td>
                        </tr>
                    </thead>

                    <tbody>
                        {renderResults()}
                        <div style={{background:'rgba(0, 0, 0, 0.564)'}} className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div style={{maxWidth:'700px',width:'700px'}} className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-center" id="exampleModalLabel">Lịch sử đặt vé của bạn</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <td>STT</td>
                                                    <td>Tên Phim</td>
                                                    <td>Ngày đặt</td>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {renderLichSuVe()}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
