function redirectTo(page) {
    window.location.href = page;
}

let data = {}

function loadData (){

}
function displayBloodGroup(data){
    let bloodGroup = document.querySelector("#Bgroup");
    console.log(bloodGroup.value);
    bloodGroup.value = data;
    bloodGroup.innerText = data;
}

function displayStatus(data){
    let Status = document.querySelector("#DonationStatus");
    console.log(Status.value);
    if (data == "1") {
        Status.value = 'Available';
        Status.innerText = 'Available';
    }
    else if (data == "0") {
        Status.value = 'Not Available';
        Status.innerText = 'Not Available';
    }
    else {
        Status.value = 'Unknown';
        Status.innerText = 'Unknown';
    }
    
}


function displayDOB(data) {
    let DOB = document.querySelector('#DOB')
    DOB.innerText = data;
    DOB.value = data;
    console.log(DOB.innerText);
}

function displayDonorStatus(data){
    let DonorStatus = document.querySelector('#DonorType');
    DonorStatus.innerText = data;
    DonorStatus.value = data;
    console.log(DonorStatus.innerText);
}

let heart = document.querySelector(".status");
heart.addEventListener("click", function() {
    heart.classList.toggle("available");
    let ecgPath = document.querySelector('.ecg-line path');
    let currentStroke = ecgPath.getAttribute('stroke');

    console.log(currentStroke);
    let ecg = document.querySelector('.ecg');
    ecg.classList.toggle('ecg-active');
    if (currentStroke === "red") {
        ecgPath.setAttribute('stroke', '#d0cfcf');
    } else {
        ecgPath.setAttribute('stroke', 'red');
    }
});

let salesHis = [
    [
        {
            name : "O+",
            value : "12-12-2005"
        },
        {
            name : "Name",
            value : "Rahul Maurya"
        },
        {
            name : "Urgency",
            value : "2"
        },
        {
            name : "Location",
            value : "Satna"
        },
        {
            name : "Status",
            value : "Verified"
        },
    ],
    [
        {
            name : "Seller",
            value : "12-12-2005"
        },
        {
            name : "Customer",
            value : "buyer1"
        },
        {
            name : "VCH101",
            value : "2"
        },
        {
            name : "Dual",
            value : "1"
        },
        {
            name : "Satelite Disk",
            value : "1"
        },
        {
            name : "Cable",
            value : "50m"
        },
    ]
    
]


for(let i = salesHis.length - 1; i >= 0; i--){
    addHistory(salesHis[i]);
}

function addHistory(salesHis){
    let sales = document.querySelector('.requests')
    let history = document.createElement('div');
    history.classList.add('bullet', 'history');
    sales.appendChild(history);
    createInfo(history, salesHis[0]);
    
    let historyDetail = document.createElement('div');
    historyDetail.classList.add('historyDetail');
    history.appendChild(historyDetail);
    for(i = 1; i<salesHis.length; i++ ){
        createInfo(historyDetail, salesHis[i]);
    }
    addToggle(history, historyDetail);

}

function createInfo(object, data){
    let historyInfo = document.createElement('div');
    historyInfo.classList.add('historyInfo');

    let name = document.createElement('span');
    name.classList.add('name');
    name.innerText = data.name;
    historyInfo.appendChild(name);

    let value = document.createElement('span');
    value.classList.add('value');
    value.innerText = data.value;
    historyInfo.appendChild(value);

    object.appendChild(historyInfo);
}


function addToggle(toggleBox, child) {
    toggleBox.addEventListener('click', ()=>{
        if (child.style.maxHeight){
            child.style.maxHeight = null;
        }else{
            child.style.maxHeight = child.scrollHeight + "px";
        }
    })
}