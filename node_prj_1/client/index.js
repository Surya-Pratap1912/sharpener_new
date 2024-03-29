const addExpanse = document.querySelector("#add-expanse");
const price = document.querySelector("#price");
const dish = document.querySelector("#dish");
const tab = document.querySelector("category");
const user1 = document.querySelector("#user1");
const user2 = document.querySelector("#user2");
const user3 = document.querySelector("#user3");

window.addEventListener("DOMContentLoaded", print);

// pushing data into server
addExpanse.addEventListener("click", onsubmit);

function onsubmit(e) {
  e.preventDefault();

  const price = document.getElementById("price").value;
  const dish = document.getElementById("dish").value;
  const tab = document.getElementById("category").value;

  obj = {
    price,dish,tab
  };
  axios
    .post("http://localhost:3000/push-data", obj)
    .then((result) => {
      // console.log(result);
    })
    .catch((err) => console.log(err));

  location.reload();
}

// printing data on the screen

function print() {
  axios.get("http://localhost:3000/get-data").then((response) => {
    console.log(response.data);
    response.data.forEach((element) => {
      printList(element);
    });
  });
}

function printList(obj) {
  const li = document.createElement("li");
  li.innerHTML = `<span class='me-3'>${obj.price}</span><span> ${obj.dish}</span><span> </span>`;


  li.style.fontWeight= 'bold';

  const btn = document.createElement("button");
  btn.className = 'bton2'
  btn.innerHTML = "Delete";
  li.appendChild(btn);

  const edit = document.createElement("button");
  edit.className = 'bton2'
  edit.innerHTML = "Edit";
  edit.classList.add("ms-5");
  li.appendChild(edit);

  const inpId = document.createElement("input");
  inpId.type = "hidden";
  inpId.value = "update";
  li.appendChild(inpId);

  // console.log(obj.tab, typeof(obj.tab));
  if(obj.tab === 'table 1')
  user1.appendChild(li);
  else if(obj.tab === 'table 2')
  user2.appendChild(li);
  else
  user3.appendChild(li)

  
  
  btn.addEventListener("click", (e) => {
    axios
      .post(`http://localhost:3000/delete-data/${obj.id}`)
      .then((res) => {
        window.alert(res.data);
      })
      .then(() => {
        location.reload();
      });
  });

  edit.addEventListener("click", (e) => {
    // axios.post(`http://localhost:3000/delete-data/${obj.id}`);

    document.getElementById("price").value=`${obj.price}`;
    document.getElementById("dish").value=`${obj.dish}`;
    document.getElementById("category").value=`${obj.tab}`;

    const upd = document.getElementById('update');
    upd.type='button';

    upd.addEventListener('click',(e)=>{
      e.preventDefault();
      const price = document.getElementById("price").value;
      const dish = document.getElementById("dish").value;
      const tab = document.getElementById("category").value;
      
      // console.log(price, dish, tab);

      const updData = {
        price,dish,tab
      }

      axios.post(`http://localhost:3000/update-data/${obj.id}`,updData)
      .then((res)=>{
        window.alert(res.data);
      })
      .then(()=>{
        location.reload();
      })
    })
  });
}
