let steps=document.querySelectorAll(".step")
let current=0

let progressBar=document.getElementById("progressBar")
let stepText=document.getElementById("stepText")

function showStep(index){

steps.forEach(function(step){
step.classList.remove("active")
})

steps[index].classList.add("active")

progressBar.style.width=((index+1)/steps.length)*100+"%"

stepText.innerText="Bước "+(index+1)+" / "+steps.length

}


// ===== STEP 1 VALIDATION =====

document.getElementById("next1").onclick=function(){

let name=document.getElementById("fullname").value.trim()
let birth=document.getElementById("birthday").value
let gender=document.querySelector('input[name="gender"]:checked')

let valid=true

document.getElementById("nameError").innerText=""
document.getElementById("birthError").innerText=""
document.getElementById("genderError").innerText=""

if(name===""){
document.getElementById("nameError").innerText="Vui lòng nhập họ tên"
valid=false
}

if(birth===""){
document.getElementById("birthError").innerText="Vui lòng chọn ngày sinh"
valid=false
}

if(!gender){
document.getElementById("genderError").innerText="Vui lòng chọn giới tính"
valid=false
}

if(!valid) return

current=1
showStep(current)

}


// ===== QUAY LẠI STEP 1 =====

document.getElementById("back1").onclick=function(){

current=0
showStep(current)

}


// ===== STEP 2 VALIDATION =====

document.getElementById("next2").onclick=function(){

let email=document.getElementById("email").value.trim()
let pass=document.getElementById("password").value
let confirm=document.getElementById("confirm").value

let valid=true

document.getElementById("emailError").innerText=""
document.getElementById("passError").innerText=""
document.getElementById("confirmError").innerText=""

if(email===""){
document.getElementById("emailError").innerText="Vui lòng nhập email"
valid=false
}

if(pass.length<6){
document.getElementById("passError").innerText="Mật khẩu ít nhất 6 ký tự"
valid=false
}

if(pass!==confirm){
document.getElementById("confirmError").innerText="Mật khẩu không khớp"
valid=false
}

if(!valid) return

current=2
showStep(current)

showResult()

}


// ===== QUAY LẠI STEP 2 =====

document.getElementById("back2").onclick=function(){

current=1
showStep(current)

}


// ===== HIỂN THỊ THÔNG TIN BƯỚC 3 =====

function showResult(){

let name=document.getElementById("fullname").value
let birth=document.getElementById("birthday").value
let gender=document.querySelector('input[name="gender"]:checked').value
let email=document.getElementById("email").value

let html=`

<p><b>Họ tên:</b> ${name}</p>
<p><b>Ngày sinh:</b> ${birth}</p>
<p><b>Giới tính:</b> ${gender}</p>
<p><b>Email:</b> ${email}</p>

`

document.getElementById("result").innerHTML=html

}