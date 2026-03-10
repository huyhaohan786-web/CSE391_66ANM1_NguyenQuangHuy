const form = document.getElementById("registerForm");

function showError(field,msg){

const error = document.getElementById(field+"Error");
const input = document.getElementById(field);

error.textContent = msg;
error.style.display = "block";

if(input){
input.classList.add("invalid");
input.classList.remove("valid");
}

}

function clearError(field){

const error = document.getElementById(field+"Error");
const input = document.getElementById(field);

error.textContent = "";
error.style.display = "none";

if(input){
input.classList.remove("invalid");
input.classList.add("valid");
}

}

function validateFullname(){

const name = document.getElementById("fullname").value.trim();
const regex = /^[a-zA-ZÀ-ỹ\s]+$/;

if(name === ""){
showError("fullname","Không được để trống");
return false;
}

if(name.length < 3){
showError("fullname","Phải ≥ 3 ký tự");
return false;
}

if(!regex.test(name)){
showError("fullname","Chỉ chứa chữ cái");
return false;
}

clearError("fullname");
return true;

}

function validateEmail(){

const email = document.getElementById("email").value.trim();
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email === ""){
showError("email","Không được để trống");
return false;
}

if(!regex.test(email)){
showError("email","Email không hợp lệ");
return false;
}

clearError("email");
return true;

}

function validatePhone(){

const phone = document.getElementById("phone").value.trim();
const regex = /^0[0-9]{9}$/;

if(phone === ""){
showError("phone","Không được để trống");
return false;
}

if(!regex.test(phone)){
showError("phone","SĐT phải 10 số và bắt đầu bằng 0");
return false;
}

clearError("phone");
return true;

}

function validatePassword(){

const pass = document.getElementById("password").value;
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(pass === ""){
showError("password","Không được để trống");
return false;
}

if(!regex.test(pass)){
showError("password","≥8 ký tự, có chữ hoa, thường và số");
return false;
}

clearError("password");
return true;

}

function validateConfirm(){

const pass = document.getElementById("password").value;
const confirm = document.getElementById("confirm").value;

if(confirm === ""){
showError("confirm","Không được để trống");
return false;
}

if(pass !== confirm){
showError("confirm","Mật khẩu không khớp");
return false;
}

clearError("confirm");
return true;

}

function validateGender(){

const gender = document.querySelector("input[name='gender']:checked");

if(!gender){
document.getElementById("genderError").textContent = "Phải chọn giới tính";
document.getElementById("genderError").style.display = "block";
return false;
}

document.getElementById("genderError").style.display = "none";
return true;

}

function validateTerms(){

const terms = document.getElementById("terms").checked;

if(!terms){
document.getElementById("termsError").textContent = "Phải đồng ý điều khoản";
document.getElementById("termsError").style.display = "block";
return false;
}

document.getElementById("termsError").style.display = "none";
return true;

}

document.getElementById("fullname").addEventListener("blur",validateFullname);
document.getElementById("email").addEventListener("blur",validateEmail);
document.getElementById("phone").addEventListener("blur",validatePhone);
document.getElementById("password").addEventListener("blur",validatePassword);
document.getElementById("confirm").addEventListener("blur",validateConfirm);

document.querySelectorAll("input").forEach(el=>{
el.addEventListener("input",()=>{
const span = document.getElementById(el.id+"Error");
if(span){
span.style.display="none";
}
el.classList.remove("invalid");
});
});

form.addEventListener("submit",function(e){

e.preventDefault();

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms();

if(valid){

form.style.display="none";

document.getElementById("success").textContent =
"Đăng ký thành công 🎉 Xin chào " +
document.getElementById("fullname").value;

}

});