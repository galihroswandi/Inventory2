// cek session login
const session = sessionStorage.getItem('id');
if( !session ){
    document.location.href = '../login.html';
}

// Event ketika tombol logout di klik
const btn_out = document.querySelector('#btn-out');
btn_out.addEventListener('click', () => {
    if( confirm('Apakah Yakin Ingin Keluar ?') ){
        logout();
    }
})

const logout = () => {

    document.cookie = "id=''";
    sessionStorage.setItem('id', '');
    sessionStorage.setItem('I', '');

    document.location.href = '../login.html';
}

$(document).ready(function(){

    const readData = async () => {
        const url = "../../php/pengajuan/GetData.php";
        await fetch(url, {method:"GET"})
        .then(response => {
            if( !response.ok ){
                alert('Sever bermasalah !');
            }
            return response.json()
        })
        .then(response => console.log(response))
    }

    readData();
})