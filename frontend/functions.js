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

        customerH1.textContent = `${data[i].name} ${data[i].age}`;
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

    for(let i = 0; i < h1.length; i++) {
        txtValue = h1[i].textContent;
        if(txtValue.toUpperCase().indexOf(filter) > -1) {
            h1[i].style.display = "";
        } else {
            h1[i].style.display = "none";
        }
    }
}
