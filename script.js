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

function showSchedule() {
    // 1. Dapatkan hari ini dalam bahasa Indonesia
    const daftarHari = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
    const hariIni = daftarHari[new Date().getDay()];

    // 2. Ambil semua baris jadwal
    const semuaBaris = document.querySelectorAll("#jadwal-body tr");
    let ditemukan = false;

    semuaBaris.forEach(baris => {
        // 3. Sembunyikan semua baris dulu
        baris.style.display = "none";

        // 4. Jika hari di baris cocok dengan hari ini, tampilkan!
        if (baris.getAttribute("data-hari") === hariIni) {
            baris.style.display = "table-row";
            ditemukan = true;
        }
    });

    if (!ditemukan) {
        alert("Hari ini (" + hariIni + ") tidak ada jadwal pelajaran. Waktunya istirahat! 🌊");
        // Tampilkan semua jika libur agar tidak kosong banget
        semuaBaris.forEach(baris => baris.style.display = "table-row");
    } else {
        alert("Menampilkan jadwal khusus hari " + hariIni);
    }

    toggleMenu(); // Tutup menu dropdown
}

// --- LOGIKA EDIT JADWAL OFFLINE ---

// 1. Fungsi Simpan Jadwal
function saveJadwalOffline() {
    const isiJadwal = document.getElementById('jadwal-body').innerHTML;
    localStorage.setItem('dataJadwalUser', isiJadwal);
    alert("Jadwal berhasil disimpan di HP kamu! 🌊");
}

// 2. Fungsi Load Jadwal saat aplikasi dibuka
function loadJadwalOffline() {
    const savedJadwal = localStorage.getItem('dataJadwalUser');
    if (savedJadwal) {
        document.getElementById('jadwal-body').innerHTML = savedJadwal;
    }
}

// --- LOGIKA TUGAS (TO-DO LIST) ---

function addTask() {
    const input = document.getElementById('taskInput');
    if (input.value === '') return;
    
    const taskObj = {
        id: Date.now(),
        text: input.value
    };

    renderTask(taskObj);
    saveTask(taskObj);
    input.value = '';
}

function renderTask(task) {
    const li = document.createElement('li');
    li.style.cssText = "background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;";
    li.innerHTML = `
        <span contenteditable="true">${task.text}</span>
        <button onclick="removeTask(${task.id}, this)" style="background: #ff4d4d; color: white; border: none; border-radius: 5px; padding: 5px 10px;">Hapus</button>
    `;
    document.getElementById('taskList').appendChild(li);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasks.push(task);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function removeTask(id, element) {
    element.parentElement.remove();
    let tasks = JSON.parse(localStorage.getItem('myTasks'));
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// --- JALANKAN SEMUA SAAT START ---
window.onload = function() {
    createBubbles();      // Efek laut
    loadJadwalOffline();  // Ambil jadwal yang pernah diedit
    
    // Load tugas yang tersimpan
    const savedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    savedTasks.forEach(t => renderTask(t));

    showSchedule();       // Tetap jalankan filter hari otomatis
};
