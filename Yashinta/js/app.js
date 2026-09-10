const stories = [
    {
        image: "img/1.jpg",
        text: "Bawang Putih adalah gadis yang rajin dan baik hati. Setiap hari, ia dituntut melakukan pekerjaan rumah tangga yang berat, seperti mencuci pakaian di tepi sungai dekat desanya, sementara Bawang Merah dan ibunya mengawasinya dengan iri dan tidak suka."
    },
    {
        image: "img/2.jpg",
        text: "Ibu tiri dan Bawang Merah yang kejam selalu mencari-cari kesalahan Bawang Putih. Mereka menyuruhnya bekerja lebih keras tanpa rasa iba dan sering kali memarahinya di tepi sungai."
    },
    {
        image: "img/3.jpg",
        text: "Suatu hari, ketika Bawang Putih sedang mencuci pakaian keluarga di sungai, salah satu kain kesayangan milik ibu tirinya secara tidak sengaja terlepas dari pegangan dan terbawa arus air yang deras."
    },
    {
        image: "img/4.jpg",
        text: "Takut dimarahi oleh ibu tirinya, Bawang Putih memberanikan diri menyusuri aliran sungai sendirian hingga masuk semakin jauh ke dalam hutan mistis untuk menemukan kain tersebut."
    },
    {
        image: "img/5.jpg",
        text: "Di dalam hutan, Bawang Putih menemukan kain tersebut diambil oleh seorang Nenek Tua penyendiri. Nenek tersebut bersedia mengembalikan kain itu dengan syarat Bawang Putih mau membantunya membersihkan rumah dan memasak."
    },
    {
        image: "img/6.jpg",
        text: "Karena Bawang Putih sangat rajin, sopan, dan tulus membantunya, Nenek Tua mengembalikan kain tersebut dan menawarkan hadiah berupa satu dari dua labu, besar atau kecil. Bawang Putih yang tidak serakah memilih labu yang berukuran kecil."
    },
    {
        image: "img/7.jpg",
        text: "Setibanya di rumah, Bawang Putih membelah labu kecil itu di hadapan ibu tiri dan saudaranya. Betapa terkejutnya mereka saat mengetahui isi labu tersebut penuh dengan perhiasan emas dan permata yang berkilauan."
    },
    {
        image: "img/8.jpg",
        text: "Melihat harta karun tersebut, timbul rasa iri dan serakah dalam diri ibu tiri dan Bawang Merah. Ibu tiri langsung menyuruh Bawang Merah pergi ke sungai untuk sengaja menghanyutkan kain agar bisa mendapatkan hadiah yang lebih besar dari Nenek Tua."
    },
    {
        image: "img/9.jpg",
        text: "Bawang Merah pergi ke hutan dan bertemu Nenek Tua. Namun, karena sifatnya yang malas, pemarah, dan tidak sopan saat melakukan pekerjaan, ia menolak membantu Nenek Tua dan menuntut hadiah secara paksa."
    },
    {
        image: "img/10.jpg",
        text: "Dengan sengaja, Bawang Merah memilih labu yang paling besar dan membawanya pulang. Saat dibelah di rumah bersama ibunya dengan penuh harapan, bukannya emas yang keluar, melainkan peti berisi hal-hal mengerikan dan mematikan sebagai balasan atas keserakahan dan sifat buruk mereka."
    }
];


let currentIndex = 0;


// ==========================================
// AMBIL ELEMENT HTML
// ==========================================

const storyImage =
    document.getElementById("story-image");

const storyText =
    document.getElementById("story-text");

const pageIndicator =
    document.getElementById("page-indicator");

const prevBtn =
    document.getElementById("prev-btn");

const nextBtn =
    document.getElementById("next-btn");

const stopBtn =
    document.getElementById("stop-btn");

const backsound =
    document.getElementById("backsound");

const dots =
    document.getElementById("dots");


// ==========================================
// SUARA
// ==========================================

let speech = null;


// ==========================================
// UPDATE STORY
// ==========================================

function updateStory() {

    const story = stories[currentIndex];


    // --------------------------------------
    // GANTI GAMBAR
    // --------------------------------------

    storyImage.src = story.image;


    // --------------------------------------
    // GANTI TEKS
    // --------------------------------------

    storyText.innerText = story.text;


    // --------------------------------------
    // NOMOR HALAMAN
    // --------------------------------------

    pageIndicator.innerText =
        `Halaman ${currentIndex + 1} dari ${stories.length}`;


    // --------------------------------------
    // TOMBOL SEBELUMNYA
    // --------------------------------------

    prevBtn.disabled =
        currentIndex === 0;


    // --------------------------------------
    // TOMBOL SELANJUTNYA
    // --------------------------------------

    nextBtn.disabled =
        currentIndex === stories.length - 1;


    if (currentIndex === stories.length - 1) {

        nextBtn.innerText = "Selesai";

    } else {

        nextBtn.innerText = "Selanjutnya ▶";
    }


    // --------------------------------------
    // UPDATE TITIK
    // --------------------------------------

    updateDots();


    // --------------------------------------
    // BACA CERITA
    // --------------------------------------

    speakStory();
}


// ==========================================
// TITIK HALAMAN
// ==========================================

function updateDots() {

    let html = "";

    for (let i = 0; i < stories.length; i++) {

        if (i === currentIndex) {

            html += "● ";

        } else {

            html += "○ ";
        }
    }

    dots.innerHTML = html;
}


// ==========================================
// TEXT TO SPEECH
// ==========================================

function speakStory() {

    // Hentikan suara halaman sebelumnya
    window.speechSynthesis.cancel();


    // Cek dukungan browser
    if (!("speechSynthesis" in window)) {

        console.log(
            "Browser tidak mendukung pembacaan suara."
        );

        return;
    }


    const text =
        stories[currentIndex].text;


    speech =
        new SpeechSynthesisUtterance(text);


    // Bahasa Indonesia
    speech.lang = "id-ID";


    // Kecepatan membaca
    speech.rate = 0.9;


    // Nada suara
    speech.pitch = 1;


    // Volume
    speech.volume = 1;


    // Jalankan suara
    window.speechSynthesis.speak(speech);
}


// ==========================================
// NEXT
// ==========================================

function nextPage() {

    if (currentIndex < stories.length - 1) {

        currentIndex++;

        updateStory();

        startBacksound();
    }
}


// ==========================================
// PREVIOUS
// ==========================================

function prevPage() {

    if (currentIndex > 0) {

        currentIndex--;

        updateStory();

        startBacksound();
    }
}


// ==========================================
// BERHENTI
// ==========================================

function stopStory() {

    // Hentikan pembacaan
    window.speechSynthesis.cancel();


    // Hentikan backsound
    backsound.pause();
}


// ==========================================
// BACKSOUND
// ==========================================

function startBacksound() {

    backsound.play().catch(function () {

        console.log(
            "Audio menunggu interaksi pengguna."
        );

    });
}


// ==========================================
// TOMBOL BERHENTI
// ==========================================

stopBtn.addEventListener(
    "click",
    function () {

        stopStory();

    }
);


// ==========================================
// MULAI
// ==========================================

updateStory();
