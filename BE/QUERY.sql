CREATE DATABASE pemiskuas;
USE pemiskuas;

CREATE TABLE articles
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    content     TEXT         NOT NULL,
    category    VARCHAR(50),
    date        DATE,
    author      VARCHAR(100),
    location    VARCHAR(255)
);

SHOW TABLES;
SELECT *
FROM articles;

-- Contoh data untuk tabel `articles`
INSERT INTO articles (title, description, content, category, date, author, location)
VALUES
-- Artikel 1
('Gempa Bumi di Jawa Barat',
 'Gempa berkekuatan 6,5 SR mengguncang wilayah Jawa Barat pada pukul 18:30 WIB.',
 'Pada pukul 18:30 WIB, gempa bumi berkekuatan 6,5 SR mengguncang wilayah Jawa Barat. Pusat gempa berada di kedalaman 10 km di bawah permukaan laut dan berpotensi tsunami. Warga diimbau untuk tetap tenang dan menjauhi pantai.',
 'Gempa',
 '2024-12-30',
 'BNPB',
 'Jawa Barat'),
-- Artikel 2
('Banjir di Jakarta',
 'Banjir melanda beberapa wilayah Jakarta setelah hujan deras selama 5 jam.',
 'Hujan deras yang mengguyur Jakarta selama lebih dari 5 jam menyebabkan banjir setinggi 1 meter di beberapa wilayah seperti Kemang, Kelapa Gading, dan Cengkareng. Warga dievakuasi ke tempat yang lebih aman.',
 'Banjir',
 '2024-12-29',
 'Media Lokal',
 'Jakarta'),
-- Artikel 3
('Kebakaran Hutan di Kalimantan',
 'Kebakaran hutan terjadi di Kalimantan Tengah, diduga akibat cuaca kering.',
 'Kebakaran hutan melanda Kalimantan Tengah dan telah membakar lebih dari 500 hektar lahan. BNPB dan tim pemadam kebakaran bekerja keras untuk memadamkan api, namun angin kencang memperumit proses pemadaman.',
 'Kebakaran',
 '2024-12-28',
 'BNPB',
 'Kalimantan Tengah'),
-- Artikel 4
('Longsor di Sukabumi',
 'Longsor terjadi di kawasan Sukabumi setelah hujan deras selama dua hari berturut-turut.',
 'Hujan deras yang terjadi selama dua hari berturut-turut memicu longsor di Sukabumi. Longsor menimbun 10 rumah di Desa Cisarua, menyebabkan 15 orang terluka dan 5 orang hilang. Tim SAR terus melakukan pencarian.',
 'Longsor',
 '2024-12-27',
 'Tim SAR',
 'Sukabumi'),
-- Artikel 5
('Letusan Gunung Merapi',
 'Gunung Merapi mengalami letusan kecil, status meningkat menjadi siaga.',
 'Gunung Merapi meletus pada pukul 07:45 WIB dengan tinggi kolom abu mencapai 1.500 meter. PVMBG meningkatkan status gunung menjadi siaga. Warga diimbau untuk mengenakan masker dan menjauhi radius 5 km dari puncak gunung.',
 'Letusan Gunung',
 '2024-12-26',
 'PVMBG',
 'Yogyakarta');

select *
from articles;

ALTER TABLE articles
    ADD link_img VARCHAR(255);

ALTER TABLE articles modify link_img text;