const stateDefault = {
    film: {
        maPhim: '',
        tenPhim: '',
        trailer: '',
        moTa: '',
        maNhom: 'GP01',
        ngayKhoiChieu: '',
        danhGia: '',
        hinhAnh:{}
    },
    maPhimTao:'',
    arrayMaRap:[],
    maCumRap:'',
    lstCumRap:[],
    dsPhim:[]
}

const FilmReducer = (state = stateDefault , action) => {
    switch(action.type) {
        case 'CHINH_SUA_FILM' : {
            let newObject = {
                maPhim: action.data.maPhim,
                tenPhim: action.data.tenPhim,
                trailer: action.data.trailer,
                moTa: action.data.moTa,
                maNhom:'GP01',
                ngayKhoiChieu: action.data.ngayKhoiChieu,
                danhGia: action.data.danhGia,
                hinhAnh: action.data.hinhAnh
            }

            // console.log(newObject);
            return {...state,film: newObject};
        }

        case 'TAO_LICH_PHIM' : {
            console.log(action);
            let newMaPhimTao = action.maPhim;
            state.maPhimTao = newMaPhimTao;
            return {...state}
        }

        case 'LIST_RAP' : {
            return {...state,arrayMaRap: action.data,maCumRap: action.maCumRap}
        }

        case 'LST_HANDLE' : {
            let lst = action.data;
            let lstNew = [];
            for(let key of lst) {
                lstNew = key.lstCumRap;
            }
            return {...state,lstCumRap: lstNew}
        }
        
        case 'DANH_SACH_PHIM' : {
            return {...state,dsPhim: action.data};
        }

        default: return {...state}
    }
}

export default FilmReducer;