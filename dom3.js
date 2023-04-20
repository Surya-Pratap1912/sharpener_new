// getting to the form

var form = document.getElementById("my-form");
var btn1 = document.getElementById("btn1");

btn1.addEventListener("click", additem);

function additem(e) {
  e.preventDefault();
  // take input of the name

  var name = document.getElementById("name").value;
  var mail = document.getElementById("email").value;

  localStorage.setItem(name, mail);
  localStorage.getItem;
  alert("submitted");
}

//creating a box to fetch the details of a user if existing

var div = document.createElement("div");
div.className = "getdetails";

var lbl = document.createElement("label");
lbl.innerHTML = '<label for="details">Get Details:</label>';
div.appendChild(lbl);

// console.log(div.firstChild);
var inp = document.createElement("input");
inp.className = "getdetails";
inp.id = "inp";
inp.type = "text";
inp.placeholder = "enter user name";
inp.style.boxSizing = "10 20";
// console.log (inp);

div.appendChild(inp);
console.log(div);
form.appendChild(div);

// to create a get button
var btn = document.createElement("button");
btn.className = "btn";
btn.id = "btn2";
btn.type = "submit";
btn.value = "submit";
btn.innerText = "get";

div.appendChild(btn);

// adding functionality to get btn
var btn2 = document.getElementById("btn2");
btn2.addEventListener("click", getitem);
var newt = document.createElement("div");
newt.appendChild(document.createTextNode("output is shown here"));
function getitem(e) {
  e.preventDefault();
    
  var itm = document.getElementById("inp").value;
  var fnd = localStorage.getItem(itm);
  if (fnd != null) {
    // console.log(fnd);
    // var newt = document.createElement("div");
    // newt.appendChild(document.createTextNode(itm + "    " + fnd));
    // newt.appendChild(document.createTextNode(fnd));
    // newt.innerHTML= '<div> <h3>fnd</h3>  </div> ';
    newt.childNodes.innerText=itm+fnd;
    
  } 
  else {
    // var newt = document.createElement("div");
    // newt.appendChild(document.createTextNode(itm + "    "));
    // newt.appendChild(document.createTextNode("NOT FOUND"));
    newt.childNodes.innerText="NOT FOUND";

    // form.appendChild(newt);
  }
  form.appendChild(newt);
}

  // serialising to a string and deserializing for storing an object into localstorage

  let myobj = {
    name: "aman",
    age: 22,
  };

  //now make string

  let myobj_str = JSON.stringify(myobj);

  console.log(myobj_str);

  localStorage.setItem("myobj", myobj_str);

  console.log(localStorage);

  //to deserialize

  let str = JSON.parse(localStorage.getItem("myobj")); //to an object
  console.log(str);

  // to remove an item from localstorage
  var btn3 = document.createElement("button");
  btn3.className = "btn";
  btn3.id = "btn3";
  btn3.type = "submit";
  btn3.value = "submit";
  btn3.innerText = "remove";
  div.appendChild(btn3);

  console.log(div);

  btn3.addEventListener("click", remove);
  function remove(e) {
    e.preventDefault();
    var itm = document.getElementById("inp").value;
    localStorage.removeItem(itm);
    //   var fnd = localStorage.getItem(itm);
  }



  // adding a sibling to the form that shows all the existing items in the storage
//   document.getElementsByClassName('container').style.display='inline-block';
var sec=document.getElementById('cont');
  var dshbd= document.createElement('div');

  dshbd.className='container';
  dshbd.id='dsh-id';

  console.log(dshbd);
sec.appendChild(dshbd);
