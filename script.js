function redirectTo(page) {
    window.location.href = page;
}

function loadData (){

}

// user data which would later be fetched and served from database

let bloodDetails = {
    bloodGroup : "O+",
    Status : 1,
    lastDonation : "12-34-2255",
    donorStatus : "Regular"
};

let profile = {
    name : "Naman Tiwari",
    age : "19",
    gender : "Male",
    address : "Madhya Pradesh, Satna"

};

let emergencyDetails = {
    mobile : "9232202233",
    email : "example@gmail.com",
    emergencyAvailability : 1
}

// function to get blood details and display them

function displayBloodDetails(data){
    bloodDetailsFunc.displayBloodGroup(data.bloodGroup);
    bloodDetailsFunc.displayStatus(data.Status);
    bloodDetailsFunc.displayLastDonation(data.lastDonation);
    bloodDetailsFunc.displayDonorStatus(data.donorStatus);
}

let bloodDetailsFunc = {
    displayBloodGroup(data) {
        let bloodGroup = document.querySelector("#Bgroup");
        bloodGroup.innerText = data;
    },
    displayStatus(data){
        let Status = document.querySelector("#DonationStatus");
        if (data == "1") {
            Status.innerText = 'Available';
        }
        else if (data == "0") {
            Status.innerText = 'Not Available';
        }
        else {
            Status.innerText = 'Unknown';
        }
        
    },
    displayLastDonation(data) {
        let DOB = document.querySelector('#DOB')
        DOB.innerText = data;
    },
    displayDonorStatus(data){
        let DonorStatus = document.querySelector('#DonorType');
        DonorStatus.innerText = data;
    }

}

// displaying the local variable data
displayBloodDetails(bloodDetails);

// functions to display profile details from the fetched data
function displayName(data) {
    let Name = document.querySelector("#name");
    Name.innerText = data;
}

function displayAge(data) {
    let Age = document.querySelector("#age");
    Age.innerText = data;
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
        bloodDetails.Status = 0;
    } else {
        ecgPath.setAttribute('stroke', 'red');
        bloodDetails.Status = 1;
    }
    displayBloodDetails(bloodDetails);
});

let bloodRequests = [
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
            name : "AB+",
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
    ]
    
]


for(let i = bloodRequests.length - 1; i >= 0; i--){
    displayBloodRequests(bloodRequests[i]);
}
function displayBloodRequests(data){
    let requestContainer = document.querySelector('#requests');
    addHistory(data, requestContainer);
}

let recentDonations = [
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
            name : "AB+",
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
    ]

]

for(let i = recentDonations.length - 1; i>=0; i--){
    displayRecentDonations(recentDonations[i])
}

function displayRecentDonations(data){
    let recentDonationContainer = document.querySelector('#recentDonation');
    addHistory(data, recentDonationContainer);
}

function addHistory(data, Element){
    let sales = Element;
    let history = document.createElement('div');
    history.classList.add('bullet', 'history');
    sales.appendChild(history);
    createInfo(history, data[0]);
    
    let historyDetail = document.createElement('div');
    historyDetail.classList.add('historyDetail');
    history.appendChild(historyDetail);
    for(i = 1; i<data.length; i++ ){
        createInfo(historyDetail, data[i]);

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

const formContainer = document.getElementById('requestFormContainer');
const requestForm = document.getElementById('requestForm');
const cancelFormBtn = document.getElementById('cancelForm');
const addBtn = document.querySelector('#openForm'); // the '+' button

addBtn.addEventListener('click', () => {
    formContainer.classList.remove('hidden');
});

cancelFormBtn.addEventListener('click', () => {
    formContainer.classList.add('hidden');
});

requestForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(requestForm);
    const newRequest = [
        { name: formData.get("bloodGroup"), value: new Date().toLocaleDateString() },
        { name: "Name", value: formData.get("name") },
        { name: "Urgency", value: formData.get("urgency") },
        { name: "Location", value: formData.get("location") },
        { name: "Status", value: formData.get("status") }
    ];

    bloodRequests.push(newRequest);
    addHistory(newRequest);
    requestForm.reset();
    formContainer.classList.add('hidden');
});
