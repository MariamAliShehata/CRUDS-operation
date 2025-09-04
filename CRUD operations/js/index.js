let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let catagory = document.getElementById("catagory");
let total = document.getElementById("total");
let create = document.getElementById("create");
let mood = "Create";
let index;
let searchMood = "title";

let products = [];

if(localStorage.getItem("ourProducts") != null){
    products = JSON.parse(localStorage.getItem("ourProducts"));
    displayData();

}
    

// console.log(title , price, taxes, ads,discount, count, catagory);

function getTotal(){
    if(price.value != ""){

        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.classList.replace("btn-danger","btn-success")
    }
    else{
        total.innerHTML ="";
        total.classList.replace("btn-success","btn-danger")

    }
}


function addProduct(){
    
    let product = {
        title: title.value.toLowerCase(),
        price:price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount: discount.value,
        total: total.innerHTML,
        catagory:catagory.value.toLowerCase(),
        count : count.value
    };
    if (mood ==="Create"){
        
        if(product.count > 1){
            for(let i = 0 ; i< product.count; i++){
                products.push(product);

            }
        }
        else{
        products.push(product);

        }
        total.classList.replace("btn-success","btn-danger")
    }else{
        products[index] = product;
        mood = "Create";
        create.innerText = "Create";
        create.classList.replace("btn-success" , "btn-primary");
        count.style.display = "block";
        total.classList.replace("btn-success","btn-danger")
    }
    

    localStorage.setItem("ourProducts" , JSON.stringify(products));
    clearData();
    displayData();

}

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    catagory.value = "";
    total.innerHTML = "";

}

function displayData(){
    let tableBody = '';
    for(let i = 0 ; i< products.length ; i++){
        tableBody += 
                    `
                        <tr >
                            <td>${i}</td>
                            <td>${products[i].title}</td>
                            <td>${products[i].price}</td>
                            <td>${products[i].taxes}</td>
                            <td>${products[i].ads}</td>
                            <td>${products[i].discount}</td>
                            <td>${products[i].total}</td>
                            <td>${products[i].catagory}</td>
                            <td><a href="#" class="btn btn-success" onClick="updateData(${i})">UPDATE</a></td>
                            <td><a  class="btn btn-danger" onClick="deleteData(${i})">DELETE</a></td>
                        </tr>
                    `
    }
    document.getElementById("tbody").innerHTML = tableBody;

    let deleteAllBtn = document.getElementById("deleteAll");
    if(products.length >0 ){
        deleteAllBtn.innerHTML = `<button class="btn btn-danger w-100 " id="deleteAllBtn" onclick="deleteAll()">Delete All (${products.length})</button>`

    }else{
        deleteAllBtn.innerHTML = "";
    }
}

async function deleteData(i) {
    const confirmed = await showModal();
    if (confirmed) {
        products.splice(i, 1);
        localStorage.setItem("ourProducts", JSON.stringify(products));
        displayData();
    }
}


async function deleteAll() {
    const confirmed = await showModal();
    if (confirmed) {
        products = [];
        localStorage.setItem("ourProducts", JSON.stringify(products));
        displayData();
    }
}

function updateData(i){
    index=i;
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    catagory.value = products[i].catagory;
    getTotal();
    create.innerText = "Update";
    create.classList.replace("btn-primary" , "btn-success");
    mood = "Update";
    count.style.display = "none";


}

function getSearchMood(id){
    let search = document.getElementById("search");
    if(id === "searchTitle"){
        searchMood = "title"
    }
    else{
        
        searchMood = "category";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    displayData();
}

function searchData(value){
    let tableBody = "";
    if(searchMood === "title"){
        for (let i = 0 ; i<products.length ; i++){
            if(products[i].title.includes(value.toLowerCase())){
                
                tableBody += 
                        `
                            <tr >
                                <td>${i}</td>
                                <td>${products[i].title}</td>
                                <td>${products[i].price}</td>
                                <td>${products[i].taxes}</td>
                                <td>${products[i].ads}</td>
                                <td>${products[i].discount}</td>
                                <td>${products[i].total}</td>
                                <td>${products[i].catagory}</td>
                                <td><a href="#" class="btn btn-success" onClick="updateData(${i})">UPDATE</a></td>
                                <td><a  class="btn btn-danger" onClick="deleteData(${i})">DELETE</a></td>
                            </tr>
                        `
            }
        }
    }
    else{
        for (let i = 0 ; i<products.length ; i++){
            if(products[i].catagory.includes(value.toLowerCase())){
                
                tableBody += 
                        `
                            <tr >
                                <td>${i}</td>
                                <td>${products[i].title}</td>
                                <td>${products[i].price}</td>
                                <td>${products[i].taxes}</td>
                                <td>${products[i].ads}</td>
                                <td>${products[i].discount}</td>
                                <td>${products[i].total}</td>
                                <td>${products[i].catagory}</td>
                                <td><a href="#" class="btn btn-success" onClick="updateData(${i})">UPDATE</a></td>
                                <td><a  class="btn btn-danger" onClick="deleteData(${i})">DELETE</a></td>
                            </tr>
                        `
            }
        }
    }
    document.getElementById("tbody").innerHTML = tableBody;
}

// light and dark mode :)

const body = document.getElementById("pageBody");
const lamp = document.getElementById("lampIcon");

if (localStorage.getItem("theme") === "light") {
    body.setAttribute("data-bs-theme", "light");
    lamp.classList.add("glow");
}

function onOff() {
    
    if (body.getAttribute("data-bs-theme") === "dark") {
            body.setAttribute("data-bs-theme", "light");  
            lamp.classList.add("glow"); 
            localStorage.setItem("theme", "light");
    } else {
        body.setAttribute("data-bs-theme", "dark"); 
        lamp.classList.remove("glow"); 
        localStorage.setItem("theme", "dark");
    }
    
}

function showModal() {
    return new Promise((resolve) => {
        const modalEl = document.getElementById("confirmDeleteModal");
        const modal = new bootstrap.Modal(modalEl);

        const confirmBtn = modalEl.querySelector("#deleteBtn");
        const cancelBtn = modalEl.querySelector("#cancelBtn");

        
        confirmBtn.onclick = () => {
            modal.hide();
            resolve(true);
        };

        
        cancelBtn.onclick = () => {
            modal.hide();
            resolve(false);
        };

        
        
        modal.show();
    });
}




