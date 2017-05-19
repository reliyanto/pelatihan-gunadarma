-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Inang: 127.0.0.1
-- Waktu pembuatan: 19 Mei 2017 pada 12.08
-- Versi Server: 5.5.32
-- Versi PHP: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Basis data: `compiler_java`
--
CREATE DATABASE IF NOT EXISTS `compiler_java` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `compiler_java`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `user_admin` varchar(225) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id_admin`, `user_admin`, `password`) VALUES
(1, 'reliadma', 'reli123');

-- --------------------------------------------------------

--
-- Struktur dari tabel `soal_java`
--

CREATE TABLE IF NOT EXISTS `soal_java` (
  `id_soal` int(11) NOT NULL AUTO_INCREMENT,
  `judul_soal` varchar(225) NOT NULL,
  `soal` text NOT NULL,
  `jawaban` text NOT NULL,
  PRIMARY KEY (`id_soal`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data untuk tabel `soal_java`
--

INSERT INTO `soal_java` (`id_soal`, `judul_soal`, `soal`, `jawaban`) VALUES
(2, 'test', '<p> m,hkjhkjhkjgfg bghjhgg</p>', 'testtttt'),
(3, 'Menentukan Luas Segitiga', '<p>Tentukan Luas segitiga dengan ketentuan sebagai berikut :</p><pre class="ql-syntax" spellcheck="false">Alas = 6 dan tinggi = 10\n</pre>', 'Luas Segitiga = 30.0');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `no_mahasiswa` varchar(225) NOT NULL,
  `user_id` char(225) NOT NULL,
  `user_name` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `nilai_praktikan` float NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `no_mahasiswa`, `user_id`, `user_name`, `password`, `nilai_praktikan`) VALUES
(2, '123456 ', 'relizzz', 'reli yanto', 'reli123', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_jawaban_java`
--

CREATE TABLE IF NOT EXISTS `user_jawaban_java` (
  `id_soal` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(225) NOT NULL,
  `jawaban_user` varchar(255) DEFAULT NULL,
  `hasil_compile` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_soal`),
  KEY `jawaban_user` (`jawaban_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data untuk tabel `user_jawaban_java`
--

INSERT INTO `user_jawaban_java` (`id_soal`, `user_id`, `jawaban_user`, `hasil_compile`, `status`) VALUES
(2, 'reli', NULL, NULL, NULL),
(3, 'reli', 'public class Main {\r\npublic static void main(String[] args) {\r\n   int alas = 6 ;\r\n   int tinggi = 10;\r\n   double luas;\r\n   luas = ((alas * tinggi)/2);\r\n   System.out.println("Luas Segitiga = " +luas);\r\n    }\r\n}', 'Luas Segitiga = 30.0\n', 'Jawaban Anda Benar');

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `user_jawaban_java`
--
ALTER TABLE `user_jawaban_java`
  ADD CONSTRAINT `fk_id_soal` FOREIGN KEY (`id_soal`) REFERENCES `soal_java` (`id_soal`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
