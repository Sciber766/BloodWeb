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
