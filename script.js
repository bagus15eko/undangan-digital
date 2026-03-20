


const weddingDate = new Date("Maret 30, 2026 09:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "ACARA SUDAH DIMULAI";
    }
}, 1000);

function kirimRSVP() {
    const nama = document.getElementById('nama-tamu').value;
    const kehadiran = document.getElementById('status-kehadiran').value;
    const pesan = document.getElementById('pesan-tamu').value;
    const nomorWA = "6289609123758"; 

    if (nama === "" || kehadiran === "") {
        alert("Mohon isi nama dan status kehadiran.");
        return;
    }

    const teks = `Halo, saya *${nama}* ingin mengonfirmasi bahwa saya *${kehadiran}* di acara pernikahan Anda.\\n\\nUcapan: ${pesan}`;
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`;

    window.open(url, '_blank');
}

function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imgSrc; 
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function bukaUndangan() {
    const musik = document.getElementById("musikUndangan");
    
    musik.play().catch(error => {
        console.log("Autoplay dicegah oleh browser, musik harus dimainkan manual.");
    });

    const overlay = document.getElementById("overlay");
    overlay.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 500);
}

function copyText(id) {
    const textToCopy = document.getElementById(id).innerText;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Nomor berhasil disalin: " + textToCopy);
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}

function addWish() {
    const name = document.getElementById('guestName').value;
    const wish = document.getElementById('guestWish').value;
    const display = document.getElementById('wishDisplay');

    if (name === "" || wish === "") {
        alert("Mohon isi nama dan ucapan Anda.");
        return;
    }

    const newWish = document.createElement('div');
    newWish.classList.add('wish-item');
    newWish.innerHTML = `<strong>${name}</strong><p>${wish}</p>`;

    display.prepend(newWish);

    document.getElementById('guestName').value = "";
    document.getElementById('guestWish').value = "";

    newWish.scrollIntoView({ behavior: 'smooth' });
}

const card = document.getElementById('tiltCard');
const container = document.querySelector('.container-3d');

if (container) {
  container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 20;
    
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  container.addEventListener('mouseleave', () => {
    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });

  container.addEventListener('mouseenter', () => {
    card.style.transition = "none";
  });
}

function openModal(src) {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("imgPopup").src = src;
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function handleKirim() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxALHJAGMfLp6sxE-3AFtacf1PItsxcJI2LZ6U9hxesEt5n04yrv1t28FJEVD0COUy5/exec';
  const form = document.getElementById('form-ucapan');
  const btnKirim = document.getElementById('btnKirim');
  const nama = document.getElementById('nama').value;
  const pesan = document.getElementById('pesan').value;

  if (nama.trim() === "" || pesan.trim() === "") {
    alert("Silakan isi nama dan pesan doa Anda.");
    return;
  }

  btnKirim.disabled = true;
  btnKirim.innerText = "Mengirim...";

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({
      "nama": nama,
      "ucapan": pesan
    }),
  })
  .then(response => {
    alert("Terima kasih! Ucapan Anda telah tersimpan.");
    form.reset();
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert("Maaf, terjadi kesalahan saat mengirim. Silakan coba lagi.");
  })
  .finally(() => {
    btnKirim.disabled = false;
    btnKirim.innerText = "Kirim Ucapan";
  });
}

