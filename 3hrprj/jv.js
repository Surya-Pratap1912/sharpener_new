var btn1=document.getElementById('btn1');
btn1.addEventListener('click', submit_it);

var out = document.getElementById('div3');

function submit_it(e)
{
    e.preventDefault();
    var select = document.getElementById('cat');
    var txt = select.options[select.selectedIndex].text;
    var cst=document.getElementById('inp1').value;
    var desc =document.getElementById('inp2').value;
    let myobj = {
        cost : cst,
        des : desc,
        cat : txt,
      };
      let myobj_str = JSON.stringify(myobj);
      console.log(myobj_str);
      localStorage.setItem("myobj", myobj_str);

      var div = document.createElement('div');
      div.className='cont3 container';

      div.appendChild(document.createTextNode(cst + "  " + desc + "  " + txt));
      out.appendChild(div);
      console.log(out);
}


// let myobj_str = JSON.stringify(myobj);

//   console.log(myobj_str);

//   

//   console.log(localStorage);