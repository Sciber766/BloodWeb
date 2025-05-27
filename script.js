const BASE_URL = 'https://bloodweb-dbackend.onrender.com';
const socket = io(BASE_URL)
const token = localStorage.getItem('token');
fetch(`${BASE_URL}/api/user/profile`, {
    headers: {
        Authorization: 'Bearer ' + token
    }
})
.then(res => res.json())
.then(data => {
    const userId = data._id;
    socket.emit('join', userId); // join the private room
});
socket.on('notification', (data) => {
    // use your existing function to show the notification
    createNotification(data.title, data.message, Object.fromEntries(data.details), true);
  });
  
document.addEventListener('DOMContentLoaded', () => {
    loadData();
  });
  
function checkLogin(token) {
    if (!token) {
        alert('You must be logged in.');
        window.location.href = 'login.html';
        return;
    } 
}
const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
};

function loadData() {
    checkLogin(token);
    // Fetch all data in parallel
    const profilePromise = fetch(`${BASE_URL}/api/user/profile`, { headers })
        .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
        });

    const bloodPromise = fetch(`${BASE_URL}/api/user/blood-details`, { headers })
        .then(res => {
        if (!res.ok) throw new Error('Failed to fetch blood details');
        return res.json();
        });

    const emergencyPromise = fetch(`${BASE_URL}/api/user/emergency`, { headers })
        .then(res => {
        if (!res.ok) throw new Error('Failed to fetch emergency details');
        return res.json();
        });

    // Combine all promises
    Promise.all([profilePromise, bloodPromise, emergencyPromise])
        .then(([profileData, bloodDetailsData, emergencyData]) => {
        displayProfile(profileData, bloodDetailsData.availability);
        displayBloodDetails(bloodDetailsData);
        displayEmergencyDetails(emergencyData);
    })
    .catch(err => {
        console.error('Error loading data:', err);
    });
}
  
// function to get blood details and display them

function displayBloodDetails(data){
    bloodDetailsFunc.displayBloodGroup(data.bloodGroup);
    bloodDetailsFunc.displayStatus(data.availability);
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

// functions to display profile details from the fetched data

function displayProfile(data, status){
    profileDisplayFunc.displayName(data.fullName);
    profileDisplayFunc.displayAge(data.age);
    profileDisplayFunc.displayGender(data.gender);
    profileDisplayFunc.displayAddress(data.location);
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
        if(data == true){
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
        if(data == true){
            avButton.classList.add('active');
        }else{
            avButton.classList.remove('active');
        }
    }
}

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

function updateAvailability(status) {
    
    fetch(`${BASE_URL}/api/user/availability`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ availability: status })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Failed to update availability'))
    .then(data => console.log('Availability updated', data))
    .then(() =>  loadData())
    .catch(err => alert(err));
}

function updateEmergencyStatus(status) {
    
    fetch(`${BASE_URL}/api/user/emergency`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emergencyAvailability: status })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Failed to update emergency status'))
    .then(data => console.log('Emergency status updated', data))
    .then(() =>  loadData())
    .catch(err => alert(err));
}

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
        updateAvailability(false);
    } else {
        ecgPath.setAttribute('stroke', 'red');
        updateAvailability(true);
    }
});

function formatRequestToArray(request, userName) {
    return [
      { name: request.bloodGroup, value: new Date(request.date).toLocaleDateString() },
      { name: "Name", value: request.name || "Unknown" },
      { name: "Urgency", value: request.urgency },
      { name: "Location", value: request.location },
      { name: "Status", value: request.status },
      { name: "_id", value: request._id }
    ];
  }
  
async function fetchMatchingRequests() {
    
    checkLogin(token);
  
    try {
      const res = await fetch(`${BASE_URL}/api/request/match`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
  
      if (!res.ok) throw new Error('Failed to fetch matching requests');
  
      const requests = await res.json();
      return requests;
    } catch (err) {
      console.error('Error fetching matching requests:', err);
      return [];
    }
  }
  
fetchMatchingRequests().then(requests => {
    for (request of requests) {
        let formatted = formatRequestToArray(request, request.userName);
        console.log(formatted);
        displayBloodRequests(formatted);  // displayBloodRequests expects an array
    }
});

async function fetchMyRequests() {
    
    checkLogin(token);
  
    try {
      const res = await fetch(`${BASE_URL}/api/request/mine`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
  
      if (!res.ok) throw new Error('Failed to fetch your requests');
  
      const requests = await res.json();
      return requests; // Array of request objects
    } catch (err) {
      console.error('Error fetching your requests:', err);
      return [];
    }
  }
  
fetchMyRequests().then(requests => {
    console.log(requests);
    for (request of requests) {
        let formatted = formatRequestToArray(request, request.userName);
        console.log(formatted);
        displayBloodRequests(formatted,true );  // displayBloodRequests expects an array
    }
});

function displayBloodRequests(data, isMyRequest){
    let requestContainer = document.querySelector('#requests');
    console.log(data);
    addHistory(data, requestContainer, isMyRequest);
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

function addHistory(data, Element, isMyRequest){
    let sales = Element;
    let history = document.createElement('div');
    history.classList.add('bullet', 'history');
    sales.appendChild(history);
    createInfo(history, data[0]);
    const requestIdObj = data.find(obj => obj.name.toLowerCase() === "_id");
    if (requestIdObj) {
        history.setAttribute('data-id', requestIdObj.value);
    }

    let historyDetail = document.createElement('div');
    historyDetail.classList.add('historyDetail');
    history.appendChild(historyDetail);
    for(i = 1; i<data.length; i++ ){
        createInfo(historyDetail, data[i]);

    }
    
    // Add Accept/Delete Button if in requests section
    if (isMyRequest) {
        const userName = data.find(obj => obj.name === "Name")?.value;
        createActionButton(historyDetail, 'delete');
    }else{
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

function createInfo(object, data){
    if (data.name === "_id") return
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
    toggleBox.addEventListener('click', (e)=>{
        if (e.target.closest('button')) return;
        if (child.style.maxHeight){
            child.style.maxHeight = null;
        }else{
            child.style.maxHeight = child.scrollHeight + "px";
        }
    })
}
let openForm = document.querySelector('#openForm');
openForm.addEventListener('click', () => {
    const formContainer = document.querySelector('#requestFormContainer');
    formContainer.classList.toggle('hidden');
});
let cancelForm = document.querySelector('#cancelForm');
cancelForm.addEventListener('click', () => {
    const formContainer = document.querySelector('#requestFormContainer');
    formContainer.classList.toggle('hidden');
});
requestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    
    if (!token) {
      alert('You must be logged in');
      return;
    }
  
    const formData = new FormData(requestForm);
    const requestData = {
      bloodGroup: formData.get("bloodGroup"),
      urgency: Number(formData.get("urgency")),
      location: formData.get("location")
    };
  
    try {
      const response = await fetch(`${BASE_URL}/api/request/blood-request`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) throw new Error('Failed to submit request');
  
      const savedRequest = await response.json();
      fetchMyRequests().then(requests => {
        console.log(requests);
        for (request of requests) {
            let formatted = formatRequestToArray(request, request.userName);
            console.log(formatted);
            displayBloodRequests(formatted,true );
        }
      });
  
      requestForm.reset();
      const formContainer = document.querySelector('#requestFormContainer');
      formContainer.classList.add('hidden');
      alert('Request submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error submitting request');
    }
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
        updateAvailability(false);
    }else{
        avButton.classList.add('active');
        updateAvailability(true);
    }
})

let emergencyButton = document.querySelector('.emergencyButton');
emergencyButton.addEventListener('click', ()=>{
    if(emergencyButton.classList.contains('active') ){
        emergencyButton.classList.remove('active');
        updateEmergencyStatus(false);
    }else{
        emergencyButton.classList.add('active');
        updateEmergencyStatus(true);
    }
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
         ${message !== undefined ? `<p>${message}</p>` : ''}
            
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
                        <button class="notif-btn donorAccept">Accept</button>
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
async function fetchNotifications() {
    
    if (!token) return;
  
    try {
      const res = await fetch(`${BASE_URL}/api/request/notifications`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
  
      if (!res.ok) throw new Error('Failed to fetch notifications');
  
      const data = await res.json();
      const notifications = data.notifications;
      console.log(notifications);
      notifications.forEach(notif => {
        createNotification(notif.title, notif.message, notif.details || [], notif.read);
      });
  
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }
  
  // Call on page load
  fetchNotifications();
  
  document.addEventListener('click', async (event) => {
    const deleteBtn = event.target.closest('.actionDelete');
    const acceptBtn = event.target.closest('.actionAccept');

    if (!deleteBtn && !acceptBtn) return;
    event.stopPropagation();
    const historyBlock = event.target.closest('.history');
    const requestId = historyBlock?.getAttribute('data-id');
    if (!requestId) {
        console.error("No request ID found in element.");
        return;
    }

    
    if (!token) {
        alert('You must be logged in.');
        return;
    }

    try {
        if (deleteBtn) {
            // DELETE request
            deleteBtn.disabled = true; // Immediately disable to prevent double click
            deleteBtn.textContent = "Deleting...";
            const res = await fetch(`${BASE_URL}/api/request/${requestId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!res.ok) throw new Error("Failed to delete request");

            // Remove the request from DOM
            historyBlock.remove();
            console.log("Request deleted:", requestId);
        }

        if (acceptBtn) {
            acceptBtn.disabled = true; // Immediately disable to prevent double click
            acceptBtn.textContent = "Accepting...";

            const res = await fetch(`${BASE_URL}/api/request/${requestId}/accept`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                
                if(errorData.message == "You have already accepted this request"){
                    acceptBtn.disabled = true;
                    acceptBtn.textContent = "Already Accepted";
                    console.error('Accept request error:', errorData.message);
                }else{
                    acceptBtn.disabled = false;
                    console.error('Accept request error:', errorData.message);
                    throw new Error(errorData.message);
                }
            }else{
                acceptBtn.textContent = "Accepted";
                alert("Request accepted successfully.");
            }
        }
        
    } catch (err) {
        console.error("Error:", err);
        alert(err.message);
    }
});

//   logout button logic 
document.querySelector('.logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});