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
    phone : "9232202233",
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

function displayProfile(data, status){
    profileDisplayFunc.displayName(data.name);
    profileDisplayFunc.displayAge(data.age);
    profileDisplayFunc.displayGender(data.gender);
    profileDisplayFunc.displayAddress(data.address);
    profileDisplayFunc.displayStatus(status);
}

let profileDisplayFunc ={
    displayName(data) {
        let Name = document.querySelector("#name");
        Name.innerText = data;
    },
    displayAge(data) {
        let Age = document.querySelector("#age");
        Age.innerText = data;
    },
    displayGender(data){
        let Gender = document.querySelector('#gender');
        Gender.innerText = data;
    },
    displayAddress(data){
        let Address = document.querySelector('#location');
        Address.innerText = data;
    },
    displayStatus(data){
        let heart = document.querySelector(".status");
        let ecgPath = document.querySelector('.ecg-line path');
        let ecg = document.querySelector('.ecg');
        if(data == 1){
            heart.classList.add("available");
            ecg.classList.add("ecg-active");
            ecgPath.setAttribute('stroke', 'red');
            this.displayAvailabilityToggle(data);
        }else{
            heart.classList.remove("available");
            ecg.classList.remove("ecg-active");
            ecgPath.setAttribute('stroke', '');
            this.displayAvailabilityToggle(data);
        }
    },
    displayAvailabilityToggle(data){
        let avButton = document.querySelector('.avButton');
        if(data == 1){
            avButton.classList.add('active');
        }else{
            avButton.classList.remove('active');
        }
    }
}

// calling the function with local variable values
displayProfile(profile, bloodDetails.Status);

// function to display emergency contact details from fetched data
function displayEmergencyDetails(data){
    emergencyDisplayFunc.displayMobile(data.phone);
    emergencyDisplayFunc.displayEmail(data.email);
    emergencyDisplayFunc.displayEmergencyStatus(data.emergencyAvailability);
}

let emergencyDisplayFunc ={
    displayMobile(data) {
        let Mobile = document.querySelector("#phone");
        Mobile.innerText = data;
    },
    displayEmail(data) {
        let Email = document.querySelector("#email");
        Email.innerText = data;
    },
    displayEmergencyStatus(data){
        let EmergencyStatus = document.querySelector('#status');
        let emergencyButton = document.querySelector('.emergencyButton');
        if(data == 1){
            EmergencyStatus.innerText = "Available for emergency";
            emergencyButton.classList.add('active');

        }else{
            EmergencyStatus.innerText = "Disabled for emergency";
            emergencyButton.classList.remove('active');
        }
    }
}

// calling the function with local variable data
displayEmergencyDetails(emergencyDetails);


// toggle for the donor status .. available for donation or nota
let heart = document.querySelector(".status");
heart.addEventListener("click", function() {
    heart.classList.toggle("available");
    let ecgPath = document.querySelector('.ecg-line path');
    let currentStroke = ecgPath.getAttribute('stroke');

    console.log(currentStroke);
    let ecg = document.querySelector('.ecg');
    ecg.classList.toggle('ecg-active');
    if (currentStroke === "red") {
        ecgPath.setAttribute('stroke', '');
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
    
    // Add Accept/Delete Button if in requests section
    if (Element.id === "requests") {
        const userName = data.find(obj => obj.name === "Name")?.value;
        createActionButton(historyDetail, 'accept');
        
        
    }
    
    addToggle(history, historyDetail);
}

function createActionButton(object, action){
    let actionButton = document.createElement('button');
    actionButton.classList.add('historyInfo')
    if(action === 'delete'){
        actionButton.classList.add('actionDelete');
        actionButton.innerHTML ='<i class="fa-solid fa-trash"></i>';
    }else if (action === 'accept'){
        actionButton.classList.add('actionAccept');
        actionButton.innerHTML ='<i class="fa-solid fa-check-to-slot"></i>';
    }
    
    object.appendChild(actionButton);
}

function createInfo(object, data, isRequest){
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

const editButton = document.querySelector('#editProfile'); // your edit icon
const editButton2 = document.querySelector('#editEmergencyDetails');
const sidebar = document.getElementById('editSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const editForm = document.getElementById('editForm');

// Prefill with existing data
editButton.addEventListener('click', () => {
    sidebar.classList.add('active');
    editForm.innerHTML = ''; // Clear previous content

    // Helper function to create label + input
    function createInputField(labelText, id, type, value) {
        const label = document.createElement('label');
        label.innerHTML = `${labelText}: <input type="${type}" id="${id}" value="${value}" />`;
        return label;
    }

    // create submit button
    let Submit = document.createElement('button')
    Submit.setAttribute('type', 'submit');
    Submit.innerText = "Save Changes";

    // Create fields dynamically from the profile object
    editForm.appendChild(createInputField('Name', 'editName', 'text', profile.name));
    editForm.appendChild(createInputField('Age', 'editAge', 'number', profile.age));
    editForm.appendChild(createInputField('Gender', 'editGender', 'text', profile.gender));
    editForm.appendChild(createInputField('Address', 'editAddress', 'text', profile.address));
    editForm.appendChild(Submit);

    editForm.setAttribute('data-edit-type', 'profile');
});

// same thing for Emergency details

editButton2.addEventListener('click', () => {
    sidebar.classList.add('active');
    editForm.innerHTML = ''; // Clear previous content

    // Helper function to create label + input
    function createInputField(labelText, id, type, value) {
        const label = document.createElement('label');
        label.innerHTML = `${labelText}: <input type="${type}" id="${id}" value="${value}" />`;
        return label;
    }

    // create submit button
    let Submit = document.createElement('button')
    Submit.setAttribute('type', 'submit');
    Submit.innerText = "Save Changes";

    // Create fields dynamically from the emergency details object
    editForm.appendChild(createInputField('Phone', 'editPhone', 'text', emergencyDetails.phone));
    editForm.appendChild(createInputField('Email', 'editEmail', 'email', emergencyDetails.email));
    editForm.appendChild(Submit);

    editForm.setAttribute('data-edit-type', 'emergency');

});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Save changes
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = editForm.getAttribute('data-edit-type');

    if (type === 'profile') {
        profile.name = document.getElementById('editName').value;
        profile.age = document.getElementById('editAge').value;
        profile.gender = document.getElementById('editGender').value;
        profile.address = document.getElementById('editAddress').value;
    }

    if (type === 'emergency') {
        emergencyDetails.mobile = document.getElementById('editMobile').value;
        emergencyDetails.email = document.getElementById('editEmail').value;
    }

    sidebar.classList.remove('active');

    alert('changes are saved locally')
});

// icon section toggles

let avButton = document.querySelector('.avButton');
avButton.addEventListener('click', ()=>{
    if(avButton.classList.contains('active') ){
        avButton.classList.remove('active');
        bloodDetails.Status = 0;
    }else{
        avButton.classList.add('active');
        bloodDetails.Status = 1;
    }
    displayBloodDetails(bloodDetails);
})

let emergencyButton = document.querySelector('.emergencyButton');
emergencyButton.addEventListener('click', ()=>{
    if(emergencyButton.classList.contains('active') ){
        emergencyButton.classList.remove('active');
        emergencyDetails.emergencyAvailability = 0;
    }else{
        emergencyButton.classList.add('active');
        emergencyDetails.emergencyAvailability = 1;
    }
    displayEmergencyDetails(emergencyDetails);
})

const notificationButton = document.querySelector('.notification');
const notificationPanel = document.getElementById('notificationPanel');

notificationButton.addEventListener('click', () => {
    notificationPanel.classList.toggle('active');
});
const notificationList = document.getElementById('notificationList');

// Example notification
function createNotification(title, message, details = {}, showActions = false) {
    const li = document.createElement('li');
    li.className = 'notification card';

    li.innerHTML = `
        <div class="notif-header">
            <span class="notif-title">${title}</span>
            <button class="notif-close">&times;</button>
        </div>
        <div class="notif-body">
            <p>${message}</p>
            ${
                Object.keys(details).length
                    ? `<div class="notif-details">` +
                      Object.entries(details)
                          .map(([key, val]) => `<p><strong>${key}:</strong> ${val}</p>`)
                          .join('') +
                      `</div>`
                    : ''
            }
            ${
                showActions
                    ? `<div class="notif-actions">
                        <button class="notif-btn accept">Accept</button>
                        <button class="notif-btn reject">Reject</button>
                    </div>`
                    : ''
            }
        </div>
    `;

    // Add close functionality
    li.querySelector('.notif-close').addEventListener('click', () => {
        li.remove();
    });

    document.getElementById('notificationList').appendChild(li);
}

// You can test it
createNotification(
    "New Blood Request",
    "Rahul Sharma needs O+ blood urgently.",
    { Location: "City Hospital", "Contact": "+91 9876543210" },
    true
  );
  
  createNotification(
    "New Blood Request",
  );

//   logout button logic 
document.querySelector('.logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});