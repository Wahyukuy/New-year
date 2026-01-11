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
    alert("Menampilkan Jadwal Hari Ini!");
    toggleMenu(); // Menutup menu setelah klik
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
