// 1. Khởi tạo mảng dữ liệu gốc
let students = [];
let sortDirection = 0; // 0: none, 1: asc, -1: desc

// Các phần tử DOM
const btnAdd = document.getElementById('btnAdd');
const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const studentBody = document.getElementById('studentBody');
const searchName = document.getElementById('searchName');
const filterRank = document.getElementById('filterRank');
const sortScore = document.getElementById('sortScore');

// --- CHỨC NĂNG CHÍNH ---

// Thêm sinh viên
function addStudent() {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    const student = {
        id: Date.now(), // Unique ID
        name: name,
        score: score,
        rank: getRank(score)
    };

    students.push(student);
    resetForm();
    applyFilters(); // Render lại sau khi thêm
}

// Xếp loại dựa trên điểm
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// Hàm tổng hợp: Lọc + Tìm kiếm + Sắp xếp
function applyFilters() {
    let keyword = searchName.value.toLowerCase();
    let rankValue = filterRank.value;

    // 1. Lọc theo tên và xếp loại
    let filtered = students.filter(s => {
        const matchName = s.name.toLowerCase().includes(keyword);
        const matchRank = (rankValue === "all" || s.rank === rankValue);
        return matchName && matchRank;
    });

    // 2. Sắp xếp điểm nếu có yêu cầu
    if (sortDirection !== 0) {
        filtered.sort((a, b) => (a.score - b.score) * sortDirection);
    }

    renderTable(filtered);
    updateStats(filtered);
}

// Vẽ bảng dữ liệu
function renderTable(dataList) {
    studentBody.innerHTML = "";

    if (dataList.length === 0) {
        studentBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Không có kết quả</td></tr>`;
        return;
    }

    dataList.forEach((s, index) => {
        const row = document.createElement('tr');
        if (s.score < 5) row.classList.add('low-score');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${s.name}</td>
            <td>${s.score.toFixed(1)}</td>
            <td><span class="badge ${getRankBadge(s.rank)}">${s.rank}</span></td>
            <td><button class="btn btn-danger btn-sm btn-delete" data-id="${s.id}">Xóa</button></td>
        `;
        studentBody.appendChild(row);
    });
}

// Cập nhật thống kê
function updateStats(dataList) {
    document.getElementById('totalStudents').textContent = dataList.length;
    const avg = dataList.length > 0 
        ? dataList.reduce((sum, s) => sum + s.score, 0) / dataList.length 
        : 0;
    document.getElementById('avgScore').textContent = avg.toFixed(2);
}

// Helper: Màu sắc cho Badge xếp loại
function getRankBadge(rank) {
    switch(rank) {
        case "Giỏi": return "bg-success";
        case "Khá": return "bg-primary";
        case "Trung bình": return "bg-info";
        default: return "bg-danger";
    }
}

function resetForm() {
    txtName.value = "";
    txtScore.value = "";
    txtName.focus();
}

// --- SỰ KIỆN (EVENTS) ---

// Sự kiện Thêm
btnAdd.addEventListener('click', addStudent);

// Nhấn Enter trong ô điểm
txtScore.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addStudent();
});

// Tìm kiếm realtime
searchName.addEventListener('input', applyFilters);

// Lọc theo xếp loại
filterRank.addEventListener('change', applyFilters);

// Sắp xếp điểm (Toggle: Không -> Tăng -> Giảm)
sortScore.addEventListener('click', () => {
    const icon = document.getElementById('sortIcon');
    if (sortDirection === 0 || sortDirection === -1) {
        sortDirection = 1; // Tăng dần
        icon.textContent = "▲";
    } else {
        sortDirection = -1; // Giảm dần
        icon.textContent = "▼";
    }
    applyFilters();
});

// Event Delegation cho nút Xóa
studentBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = parseInt(e.target.getAttribute('data-id'));
        students = students.filter(s => s.id !== idToDelete);
        applyFilters();
    }
});