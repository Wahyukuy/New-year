// Fungsi untuk membuka/menutup menu dropdown
function toggleMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Menutup menu jika user mengklik di luar area menu
window.onclick = function(event) {
    if (!event.target.matches('.menu-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Fungsi tambahan untuk tombol jadwal
function showSchedule() {
    // 1. Ambil data hari saat ini
    const daftarHari = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
    const hariIni = daftarHari[new Date().getDay()];

    // 2. Sembunyikan layar kutipan, tampilkan layar jadwal
    document.getElementById("welcome-screen").style.display = "none";
    const scheduleCard = document.getElementById("schedule-card");
    scheduleCard.style.display = "block";

    // 3. Filter jadwal
    const semuaBaris = document.querySelectorAll("#jadwal-body tr");
    let adaJadwal = false;

    semuaBaris.forEach(baris => {
        if (baris.getAttribute("data-hari") === hariIni) {
            baris.style.display = "table-row";
            adaJadwal = true;
        } else {
            baris.style.display = "none";
        }
    });

    // 4. Update Judul
    const judul = document.getElementById("judul-jadwal");
    if (adaJadwal) {
        judul.innerText = "Jadwal Hari " + hariIni;
    } else {
        judul.innerText = "Hari Ini Libur! 🌊";
    }

    toggleMenu(); // Tutup dropdown
}

// Fungsi untuk kembali ke tampilan kutipan
function goBack() {
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("schedule-card").style.display = "none";
}
// Membuat efek gelembung secara otomatis
function createBubbles() {
    const ocean = document.getElementById('ocean');
    if (!ocean) return;

    // Membuat 20 gelembung awal
    for (let i = 0; i < 20; i++) {
        addBubble();
    }

    // Terus menambah gelembung secara berkala
    setInterval(addBubble, 2000);
}

function addBubble() {
    const ocean = document.getElementById('ocean');
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 30 + 10 + "px";
    bubble.style.width = size;
    bubble.style.height = size;
    bubble.style.left = Math.random() * 100 + "vw";
    
    // Kecepatan gelembung acak
    const duration = Math.random() * 5 + 7 + "s";
    bubble.style.animationDuration = duration;
    
    ocean.appendChild(bubble);

    // Hapus elemen gelembung setelah animasi selesai agar tidak membebani RAM
    setTimeout(() => {
        bubble.remove();
    }, parseFloat(duration) * 1000);
}

// Jalankan fungsi gelembung saat halaman dimuat
document.addEventListener('DOMContentLoaded', createBubbles);
