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
    console.log(data);
    for (let i = 0; i < data.length; i++){
        const customerDiv = document.createElement('div');

        customerDiv.appendChild(createCustomerHeading(data[i]));

        customerList.appendChild(customerDiv);
    }
    return customerList;
}
function createCustomerHeading(customer) {
    const customerHeading = document.createElement('h1');
    customerHeading.textContent = `${customer.name} ${customer.age}`;
    return customerHeading;
}