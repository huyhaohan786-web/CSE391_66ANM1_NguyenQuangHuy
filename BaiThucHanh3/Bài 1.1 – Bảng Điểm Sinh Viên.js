const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");

const tableBody = document.getElementById("tableBody");

const totalSpan = document.getElementById("total");
const avgSpan = document.getElementById("avg");

let students = [];

function getRank(score){

    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";

}

function renderTable(){

    tableBody.innerHTML = "";

    students.forEach((student,index)=>{

        const tr = document.createElement("tr");

        if(student.score < 5){
            tr.classList.add("weak");
        }

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${student.name}</td>
        <td>${student.score}</td>
        <td>${getRank(student.score)}</td>
        <td>
        <button class="deleteBtn" data-index="${index}">Xóa</button>
        </td>
        `;

        tableBody.appendChild(tr);

    });

    updateStat();
}

function updateStat(){

    const total = students.length;

    let sum = 0;

    students.forEach(student=>{
        sum += student.score;
    });

    const avg = total ? (sum / total).toFixed(2) : 0;

    totalSpan.textContent = total;
    avgSpan.textContent = avg;
}

function addStudent(){

    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if(name === ""){
        alert("Họ tên không được để trống");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    renderTable();

    nameInput.value = "";
    scoreInput.value = "";

    nameInput.focus();
}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keyup", function(e){

    if(e.key === "Enter"){
        addStudent();
    }

});

tableBody.addEventListener("click", function(e){

    if(e.target.classList.contains("deleteBtn")){

        const index = e.target.getAttribute("data-index");

        students.splice(index,1);

        renderTable();

    }

});