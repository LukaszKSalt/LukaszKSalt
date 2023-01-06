function getCustomers(element) {
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
        const buttonText = document.createTextNode("Update customer");
        updateButton.appendChild(buttonText);
        updateButton.setAttribute('property', data[i].id);
        updateButton.onclick = function() {updateCustomer(updateButton.getAttribute('property'))};
        
        customerList.appendChild(updateButton);
        customerH1.textContent = `Name: ${data[i].name} Email: ${data[i].email} Age: ${data[i].age}`;
        customerH1.setAttribute('property', data[i].id)
        customerList.appendChild(customerH1);
    }
    return customerList;
}
function search() {
    var input, filter, div, h1, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    div = document.getElementById('myDiv');
    h1 = div.getElementsByTagName('h1');
    buttons = div.getElementsByTagName('button');

    for(let i = 0; i < h1.length; i++) {
        txtValue = h1[i].textContent;
        if(txtValue.toUpperCase().indexOf(filter) > -1) {
            h1[i].style.display = "";
            buttons[i].style.display = "";
        } else {
            h1[i].style.display = "none";
            buttons[i].style.display = "none";
        }
    }
}
function reloadCustomer(Customer) {
    var myDiv = document.getElementById('myDiv');
    var customers = myDiv.getElementsByTagName('h1');
    console.log(customers);
    for(let i = 0; i < customers.length; i++){
        if(customers[i].getAttribute('property') == Customer.id){
            customers[i].textContent = "";
            customers[i].textContent = `Name: ${Customer.name} 
            Email: ${Customer.email} 
            Age: ${Customer.age}`
        }
    }
    alert("Customer updated!");
}
function updateCustomer(customerID) {
    const Customer = {
        id: customerID,
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        age: document.getElementById('customerAge').value
    }
    const putRequest = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Customer)
    }
    fetch('http://localhost:8080/api/v1/customers', putRequest);
    reloadCustomer(Customer);
}
function addCustomer(customerID) {
    const Customer = {
        id: customerID,
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        age: document.getElementById('customerAge').value
    }
    const postRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Customer)
    }
    fetch('http://localhost:8080/api/v1/customers', postRequest);
    addNewCustomer(Customer);
}
function addNewCustomer(Customer){
    var myDiv = document.getElementById('myDiv');
    const customerH1 = document.createElement('h1');

    const updateButton = document.createElement('button');
    updateButton.setAttribute('class', 'updateButton');
    const buttonText = document.createTextNode("Update customer");
    updateButton.appendChild(buttonText);
    updateButton.setAttribute('property', data[i].id);
    updateButton.onclick = function() {updateCustomer(updateButton.getAttribute('property'))};
    
    myDiv.appendChild(updateButton);
    customerH1.textContent = `Name: ${data[i].name} Email: ${data[i].email} Age: ${data[i].age}`;
    customerH1.setAttribute('property', data[i].id)
    myDiv.appendChild(customerH1);
}
