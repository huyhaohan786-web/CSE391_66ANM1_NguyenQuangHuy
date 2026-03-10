// 1. Khai báo bảng giá
const prices = {
    "Áo": 150000,
    "Quần": 200000,
    "Giày": 500000
};

// 2. Lấy các phần tử cần dùng
const orderForm = document.getElementById("orderForm");
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const totalEl = document.getElementById("total");
const note = document.getElementById("note");
const counter = document.getElementById("noteCounter");

// --- CÁC HÀM BỔ TRỢ ---

// Hàm hiện lỗi
function showError(id, msg) {
    const errorSpan = document.getElementById(id + "Error");
    const inputField = document.getElementById(id);
    errorSpan.textContent = msg;
    errorSpan.style.display = "block";
    if (inputField) inputField.classList.add("invalid");
}

// Hàm ẩn lỗi
function clearError(id) {
    const errorSpan = document.getElementById(id + "Error");
    const inputField = document.getElementById(id);
    errorSpan.style.display = "none";
    if (inputField) {
        inputField.classList.remove("invalid");
        inputField.classList.add("valid");
    }
}

// --- CÁC HÀM KIỂM TRA (VALIDATION) ---

function validateForm() {
    let isValid = true;

    // Kiểm tra Sản phẩm
    if (product.value === "") {
        showError("product", "Vui lòng chọn sản phẩm");
        isValid = false;
    } else {
        clearError("product");
    }

    // Kiểm tra Số lượng
    const q = Number(quantity.value);
    if (q < 1 || q > 99 || !Number.isInteger(q)) {
        showError("quantity", "Số lượng từ 1 đến 99");
        isValid = false;
    } else {
        clearError("quantity");
    }

    // Kiểm tra Ngày (Không được ở quá khứ)
    const dateVal = document.getElementById("date").value;
    const selectedDate = new Date(dateVal);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (!dateVal) {
        showError("date", "Vui lòng chọn ngày");
        isValid = false;
    } else if (selectedDate < today) {
        showError("date", "Không chọn ngày trong quá khứ");
        isValid = false;
    } else {
        clearError("date");
    }

    // Kiểm tra Địa chỉ
    const addr = document.getElementById("address").value.trim();
    if (addr.length < 10) {
        showError("address", "Địa chỉ phải từ 10 ký tự trở lên");
        isValid = false;
    } else {
        clearError("address");
    }

    // Kiểm tra Phương thức thanh toán
    const payment = document.querySelector("input[name='payment']:checked");
    const payError = document.getElementById("paymentError");
    if (!payment) {
        payError.textContent = "Vui lòng chọn phương thức thanh toán";
        payError.style.display = "block";
        isValid = false;
    } else {
        payError.style.display = "none";
    }

    return isValid;
}

// --- XỬ LÝ SỰ KIỆN ---

// Tính tiền khi thay đổi sản phẩm hoặc số lượng
function updatePrice() {
    const p = product.value;
    const q = Number(quantity.value);
    if (prices[p] && q > 0) {
        let total = prices[p] * q;
        totalEl.textContent = total.toLocaleString("vi-VN");
    } else {
        totalEl.textContent = "0";
    }
}

product.addEventListener("change", updatePrice);
quantity.addEventListener("input", updatePrice);

// Đếm số ký tự ghi chú
note.addEventListener("input", function() {
    let len = note.value.length;
    counter.textContent = len + "/200";
    counter.style.color = len > 200 ? "red" : "black";
});

// Xử lý khi nhấn nút Đặt hàng
orderForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Ngăn trang web load lại

    if (validateForm()) {
        const summary = document.getElementById("summary");
        summary.style.display = "block";
        summary.innerHTML = `
            <h3>Xác nhận đơn hàng</h3>
            <p>Sản phẩm: ${product.value}</p>
            <p>Số lượng: ${quantity.value}</p>
            <p>Tổng tiền: ${totalEl.textContent} VNĐ</p>
            <button id="btnConfirm">Xác nhận mua</button>
            <button id="btnCancel">Hủy</button>
        `;

        // Nút xác nhận cuối cùng
        document.getElementById("btnConfirm").onclick = function() {
            document.getElementById("success").textContent = "Đặt hàng thành công! 🎉";
            summary.style.display = "none";
            orderForm.style.display = "none";
        };

        // Nút hủy trong bảng tóm tắt
        document.getElementById("btnCancel").onclick = function() {
            summary.style.display = "none";
        };
    }
});