import Axios from 'axios';
class LayLichChieuTheoRap {
    LoadLichChieu(maRap) {
        return Axios({
            url:`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maRap}&maNhom=GP01`,
            method:'GET'
        })
    }
}
export default LayLichChieuTheoRap;