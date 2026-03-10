// ===== Đếm ký tự họ tên =====

let fullname = document.getElementById("fullname")
let count = document.getElementById("count")

fullname.addEventListener("input", function(){

count.innerText = fullname.value.length

})


// ===== Hiện / Ẩn mật khẩu =====

let password = document.getElementById("password")
let toggle = document.getElementById("togglePass")

toggle.addEventListener("click", function(){

if(password.type === "password"){
password.type = "text"
}
else{
password.type = "password"
}

})


// ===== Password Strength =====

let strengthBar = document.getElementById("strengthBar")

password.addEventListener("input", function(){

let value = password.value
let strength = 0

if(value.length >= 6){
strength++
}

if(/[A-Z]/.test(value)){
strength++
}

if(/[0-9]/.test(value)){
strength++
}

if(strength === 1){
strengthBar.style.width = "33%"
strengthBar.style.background = "red"
}

else if(strength === 2){
strengthBar.style.width = "66%"
strengthBar.style.background = "orange"
}

else if(strength === 3){
strengthBar.style.width = "100%"
strengthBar.style.background = "green"
}

else{
strengthBar.style.width = "0%"
}

})