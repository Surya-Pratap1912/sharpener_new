const form = document.getElementById("myform");
// document.gete

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const mail = document.getElementById("mailId").value;
  const password = document.getElementById("psw").value;
  const cnfPassword = document.getElementById("cnf-psw").value;
  console.log("working");

  if (password !== cnfPassword) {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode("passwords didn't match"));
    p.style.color = "red";
    form.appendChild(p);
    p.id = "para";
    p.style.color = "red";
    p.style.marginTop = "10px";

    document.getElementById("userName").value = name;
    document.getElementById("mailId").value = mail;
    document.getElementById("psw").value = "";
    document.getElementById("cnf-psw").value = "";

  } else {
    const para = document.getElementById("para");
    if (para) form.removeChild(para);
    const user = {
      name,
      mail,
      password,
      
    };
    console.log(user);
    axios.post('http://localhost:3000/users/add-user',user)
    .then(res =>{
      window.alert(res.data);
      location.reload();
    })
    .catch(err=>{
      console.log(err);
    })
  }
});


