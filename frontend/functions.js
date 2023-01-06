function getCustomers(element) {
    if(document.getElementById('myDiv') != null){
        document.getElementById('myDiv').remove()}
    fetch('http://localhost:8080/api/v1/customers')
        .then(Response => Response.json())
        .then(data => {
            const customerList = createCustomerList(data);
            element.appendChild(customerList);
        })
}
function createCustomerList(data) {
    const customerList = document.createElement('div');
    customerList.setAttribute('id', 'myDiv');
    console.log(data);
    for (let i = 0; i < data.length; i++){
        const customerH1 = document.createElement('h1');

        const updateButton = document.createElement('button');
        updateButton.setAttribute('class', 'updateButton');
        const updateButtonText = document.createTextNode("Update customer");
        updateButton.appendChild(updateButtonText);
        updateButton.setAttribute('property', data[i].id);
        updateButton.onclick = function() {updateCustomer(updateButton.getAttribute('property'))};

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'deleteButton');
        const deleteButtonText = document.createTextNode("Delete customer");
        deleteButton.appendChild(deleteButtonText);
        deleteButton.setAttribute('property', data[i].id);
        deleteButton.onclick = function() {deleteCustomer(deleteButton.getAttribute('property'))};
        
        customerList.appendChild(updateButton);
        customerList.appendChild(deleteButton);
        customerH1.textContent = `Name: ${data[i].name} Email: ${data[i].email} Age: ${data[i].age}`;
        customerH1.setAttribute('property', data[i].id)
        customerList.appendChild(customerH1);
    }
    document.getElementById('customerName').value = "";
    document.getElementById('customerEmail').value = "";
    document.getElementById('customerAge').value = "";
    return customerList;
}
function search() {
    var input, filter, div, h1, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    div = document.getElementById('myDiv');
    h1 = div.getElementsByTagName('h1');
    updateButtons = div.getElementsByClassName('updateButton');
    deleteButtons = div.getElementsByClassName('deleteButton');

    for(let i = 0; i < h1.length; i++) {
        txtValue = h1[i].textContent;
        if(txtValue.toUpperCase().indexOf(filter) > -1) {
            h1[i].style.display = "";
            updateButtons[i].style.display = "";
            deleteButtons[i].style.display = "";
        } else {
            h1[i].style.display = "none";
            updateButtons[i].style.display = "none";
            deleteButtons[i].style.display = "none";
        }
    }
}
function updateCustomer(customerID) {
    const Customer = {
        id: customerID,
        name: "",
        email: "",
        age: ""
    }
    if(required(document.getElementById('customerName'))){
        Customer.name = document.getElementById('customerName').value
    } else return;
    if(required(document.getElementById('customerEmail'))){
        Customer.email = document.getElementById('customerEmail').value
    } else return;
    if(required(document.getElementById('customerAge'))){
        Customer.age = document.getElementById('customerAge').value
    } else return;
    const putRequest = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Customer)
    }
    fetch('http://localhost:8080/api/v1/customers', putRequest).then(() => {
    const mainElement = document.querySelector('main');
    getCustomers(mainElement);
    })
}
function addCustomer() {
    const Customer = {
        name: "",
        email: "",
        age: ""
    }
    if(required(document.getElementById('customerName'))){
        Customer.name = document.getElementById('customerName').value
    } else return;
    if(required(document.getElementById('customerEmail'))){
        Customer.email = document.getElementById('customerEmail').value
    } else return;
    if(required(document.getElementById('customerAge'))){
        Customer.age = document.getElementById('customerAge').value
    } else return;
    const postRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Customer)
    }
    fetch('http://localhost:8080/api/v1/customers', postRequest).then(() => {
    const mainElement = document.querySelector('main');
    getCustomers(mainElement);
    })
}
function deleteCustomer(customerID) {
    const deleteRequest = {
        method: 'DELETE'
    }
    fetch('http://localhost:8080/api/v1/customers/' + customerID, deleteRequest).then(() => {
    const mainElement = document.querySelector('main');
    getCustomers(mainElement);
    })
}
function required(inputtx) {
    if (inputtx.value.length == 0){ 
         alert("Name, Email or Age fields cannot be empty!");  	
         return false; 
    }  	
    return true; 
}
