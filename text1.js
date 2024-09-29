let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
//let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let khashaba = document.getElementsByClassName("khashaba")
let tmp;

//get total
function gettotal() {
  if (price.value > 0 && price.value.length <= 10 && taxes.value.length <= 10 && discount.value.length <= 10 ) {
    let result = +price.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = " red";
    total.innerHTML = " ";
  }
}

//create product
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  
  if(price.value.length > 10 || taxes.value.length > 10 || discount.value.length > 10 ){
    price.value = "" ; taxes.value = "" ; discount.value = "" ; title.value = "عدد زائد"
  }else if(price.value == 0){title.value = "السعر فارغ"}
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if(mood === 'انشاء'){
    if (newpro.count > 1) {
      for (let u = 0; u < newpro.count; u++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
  }else{
    datapro[tmp]= newpro
    mood = 'انشاء'
    submit.innerHTML = 'انشاء'
    count.style.display = 'block'
  }
  
  localStorage.setItem("product", JSON.stringify(datapro));
  showdata();
  cleardata();
};

//save localstorage
//clear input
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  //ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read

function showdata() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
      <td>${i+1}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button onclick="updatedata(${i})" id="update">تعديل</button></td>
      <td><button onclick='deletedata(${i})' id="delete">حذف</button></td>
    </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btndelet = document.getElementById("deleteall");
  if (datapro.length > 0) {
    btndelet.innerHTML = `
    <button onclick="deleteall()">(${datapro.length})حذف كل</button>
    `;
  } else {
    btndelet.innerHTML = "";
  }
}
showdata();
//delete
function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}
function deleteall() {
  localStorage.clear();
  datapro.splice(0);
  showdata();
}

//update
let mood = 'انشاء'

function updatedata(i){
  title.value = datapro[i].title
  price.value = datapro[i].price
  taxes.value = datapro[i].taxes
  discount.value = datapro[i].discount
  gettotal()  
  count.style.display = 'none'
  category.value = datapro[i].category
  submit.innerHTML = 'تعديل'
  mood = 'تعديل'
  tmp = i
  scroll({
    top:0,
    behavior: 'smooth',
  })
  
}


//search
let searchmood = "title";
let search = document.getElementById("search");
function getsearchmood(id) {
  if (id == "searchtitle") {
    searchmood = "title";
    search.placeholder = "البحث بالعنوان";
  } else {
    searchmood = "category";
    search.placeholder = "البحث بالنوع";
  }
  search.focus();
  search.value = "";
  showdata();
}

function searchdata(value) {
  let table = "";
  if (searchmood == "title") {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>
          <td><button onclick="updatedata(${i})" id="update">تعديل</button></td>
          <td><button onclick='deletedata(${i})' id="delete">حذف</button></td>
        </tr>
          `;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>
          <td><button onclick="updatedata(${i})" id="update">تعديل</button></td>
          <td><button onclick='deletedata(${i})' id="delete">حذف</button></td>
        </tr>
          `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//scroll
let scrollup1 = document.getElementById('scrollup')

window.onscroll = function(){
  if(this.scrollY>=277){
    scrollup1.classList.add('show')
  }else{
    scrollup1.classList.remove('show')
  }
}
function scrollup(){
  window.scrollTo({
    top : 0,
    behavior: 'smooth',
  })
}


// fetch('https://api.ipify.org?format=json')
//   .then(response => response.json())
//   .then(data => console.log(data.ip));