let form = document.querySelector('form');
let out = document.getElementById('output');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await axios.get("https://crudcrud.com/api/ec39e02f4aba49be858a663f83b32e88/candies");
    for (let i = 0; i < res.data.length; i++) {
      showdata(res.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
});

function showdata(data) {
  console.log(data);
  let div = document.createElement('div');
  out.appendChild(div);

  let txt = document.createTextNode(data.name + " " + data.description + " " + data.price + " " + data.quantity + " ");
  txt.id = "tx";
  div.appendChild(txt);

  let by1 = document.createElement('button');
  by1.type = 'button';
  by1.innerText = 'buy1';
  by1.addEventListener('click', async (buy) => {
    if (data.quantity >= 1) {
      objnew = {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: +data.quantity - 1,
      }
      const newqt = +data.quantity - 1;
      console.log(objnew);
      try {
        await axios.put(`https://crudcrud.com/api/ec39e02f4aba49be858a663f83b32e88/candies/${data._id}`, objnew);
        console.log(div.firstElementChild);
        div.firstChild.textContent = `${data.name} ${data.description} ${data.price} ${newqt} `;
        console.log(div.firstChild);
        location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  })

  let by2 = document.createElement('input');
  by2.type = 'button';
  by2.value = 'buy 2';
  by2.addEventListener('click', async (buy) => {
    if (data.quantity >= 2) {
      objnew = {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: +data.quantity - 2,
      }
      const newqt = +data.quantity - 2;
      console.log(objnew);
      try {
        await axios.put(`https://crudcrud.com/api/ec39e02f4aba49be858a663f83b32e88/candies/${data._id}`, objnew);
        console.log(div.firstElementChild);
        div.firstChild.textContent = `${data.name} ${data.description} ${data.price} ${newqt} `;
        console.log(div.firstChild);
        location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  })

  let by3 = document.createElement('input');
  by3.type = 'button';
  by3.value = 'buy 3';
  by3.addEventListener('click', async (buy) => {
    if (data.quantity >= 3) {
      objnew = {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: +data.quantity - 3,
      }
      const newqt = +data.quantity - 3;
      console.log(objnew);
      try {
        await axios.put(`https://crudcrud.com/api/ec39e02f4aba49be858a663f83b32e88/candies/${data._id}`, objnew);
        console.log(div.firstElementChild);
        div.firstChild.textContent = `${data.name} ${data.description} ${data
