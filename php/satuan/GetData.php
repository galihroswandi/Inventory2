<?php
require_once '../config.php';

if( $_POST ){

    $id_satuan = $_POST['id_satuan'];

    $query = "SELECT * FROM tbl_barang JOIN tbl_kategori ON tbl_barang.kategori = tbl_kategori.id_kategori JOIN tbl_merk ON tbl_barang.merk = tbl_merk.id_merk JOIN tbl_satuan ON tbl_barang.satuan = tbl_satuan.id_satuan WHERE tbl_barang.satuan = '$id_satuan'";

    $sql = mysqli_query($conn, $query);

    $result = [];
    while($fetch = mysqli_fetch_array($sql)){
        $result[] = $fetch;
    }

    echo json_encode($result);
}