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

// Event ketika tombol batal di klik
const btn_cancel = document.getElementById('btn-cancel');
btn_cancel.addEventListener('click', () => {
    document.location.href = 'barang.html';
})

const logout = () => {

    sessionStorage.removeItem('id');
    sessionStorage.removeItem('I');

    document.location.href = '../login.html';
}

$(document).ready(function(){
    
    getKategori();
    getGenerateKdBrg();
    getSatuan();
    getMerk();

    $('#submit').click(function(){
        tambahData();
    })

    function tambahData(){
        
        const kd_barang = $('#kd_brg').val();
        const nama_barang = $('#nama').val();
        const merk = $('#merk').val();
        const satuan = $('#satuan').val();
        const stok = $('#stok').val();
        const kategori = $('#kategori').val();
        const spesifikasi = $('#spesifikasi').val();
        
        // // DOM Success Notification
        const message = document.getElementById('notif');
        const pesan = document.querySelector('.pesan');
        const text = document.querySelector('.message');

        // DOM ERROR Notification
        const logo = document.querySelector('.pesan > .logo');
        const textErr = document.querySelector('.pesan > .message');
        const btn_close = document.querySelector('.pesan > .close');

        if( !kd_barang || !nama_barang || !merk || !satuan || !stok || !kategori || !spesifikasi ){
            alert('Data tidak boleh kosong !');
        }else{
            $.ajax({
                type : "POST",
                url : "../../php/barang/TambahDataBarang.php",
                data : `kd_brg=${kd_barang}&nama_barang=${nama_barang}&merk=${merk}&satuan=${satuan}&stok=${stok}&kategori=${kategori}&spesifikasi=${spesifikasi}`,
                dataType : "JSON",
                success : function(response){
                    if( response.status == '1' ){
                        message.style.transition = 'all 5s 5s ease-in-out';
                        message.style.opacity = '1';
                        message.style.display = 'flex';
                        pesan.style.top = '10%';
                        text.innerHTML = `<h1 class='capitalize'>${response.msg}</h1>`;
                        document.body.style.position = 'fixed';
                        btn_close.style.display = 'none';
                        resetForm();
                        setTimeout(() => {
                            document.location.href = 'barang.html';
                            message.style.display = 'none';
                            message.style.opacity = '0';
                            pesan.style.top = '-100rem';
                            document.body.style.position = 'relative';
                        }, 2000);
                    }else{
                        message.style.transition = 'all 5s 5s ease-in-out';
                        message.style.opacity = '1';
                        message.style.display = 'flex';
                        pesan.style.top = '10%';
                        logo.innerHTML = `<img src="../../assets/images/gif/error.gif" alt="">`;
                        logo.style.padding = '1rem';
                        logo.style.boxSizing = 'border-box';
                        textErr.innerHTML = `<h1 class='capitalize'>${response.msg}</h1>`;
                        document.body.style.position = 'fixed';
    
                        btn_close.addEventListener('click', () => {
                            message.style.transition = 'all 5s ease';
                            message.style.display = 'none';
                            message.style.opacity = '0';
                            pesan.style.top = '-100rem';
                            document.body.style.position = 'relative';
                        })
                    }
                }
            })
        }
    }

    function getGenerateKdBrg(){
        $.ajax({
            type : "GET",
            url : "../../php/barang/Get_kd_brg.php",
            dataType : "JSON",
            success : function(response){
                let kd_barang = response;
                $('#kd_brg').attr('value', `${kd_barang}`);
            }
        })
    }

    function getSatuan(){
        $.ajax({
            type : "GET",
            url : "../../php/barang/GetSatuanData.php",
            dataType : "JSON",
            success : function(response){
                let satuan = '';
                for(let i = 0; i < response.length; i++){
                    satuan += getShowSatuan(response, i);
                }
                $('#satuan').append(satuan);
            }
        })

    }

    function getKategori(){
        $.ajax({
            type : "GET",
            url : "../../php/barang/GetKategoriData.php",
            dataType : "JSON",
            success : function(response){
                let kategori = '';
                for(let i = 0; i < response.length; i++){
                    kategori += getShowKategori(response, i);
                }
                
                $('#kategori').append(kategori);
            }
        })
    }

    function getMerk(){
        $.ajax({
            type : "GET",
            url : "../../php/barang/GetMerk.php",
            dataType : "JSON",
            success : function(response){
                let merk = '';
                for(let i = 0; i < response.length; i++){
                    merk += getShowMerk(response, i);
                }
                $('#merk').append(merk);
            }
        })
    }

    function getShowMerk(response, i){
        return `<option value="${response[i].id_merk}">${response[i].nm_merk}</option>`
    }

    function getShowKategori(response, i){
        return `<option value="${response[i].id_kategori}">${response[i].nm_kategori}</option>`;
    }

    function getShowSatuan(response, i){
        return `<option value="${response[i].id_satuan}">${response[i].satuan}</option>`;
    }

    function resetForm(){
        $('#kd_brg').val('');
        $('#nama').val('');
        $('#merk').val('');
        $('#satuan').val('');
        $('#kategori').val('');
        $('#spesifikasi').val('');  
    }
})