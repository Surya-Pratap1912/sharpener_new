//examining document object
// console.dir(document);

// console.log("hello");
// console.log(document.domain);
// console.log(document.URL);
// console.log(document.title);

// document.title=123;

// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);

// getelement by id 
// console.log(document.getElementById('header-title'));
var id_main = document.getElementById('main');

// getelementbyclassname

var items= document.getElementsByClassName('list-group-item');
// var it1= document.getElementById('it-1');
// var it2= document.getElementById('it-2');
// var it3= document.getElementById('it-3');
// var it4= document.getElementById('it-4');

// console.log (items);
// console.log (items[0].tagName);
// console.log (items[1].textContent);
// console.log (items[2].innerHTML);
// console.log (items[3].innerText);

// it1.style.backgroundColor = 'green';
// it2.style.backgroundColor = 'green';
// it3.style.backgroundColor = 'green';
// it4.style.backgroundColor = 'yellow';
// it1.style.fontWeight = 'bold';
// it2.style.fontWeight = 'bold';
// it3.style.fontWeight = 'bold';
// it4.style.fontWeight = 'bold';

//using classname
// items[2].style.backgroundColor= 'green';
// items[1].style.fontWeight='bold';
// items[2].style.fontWeight='bold';
// items[3].style.fontWeight='bold';
// items[0].style.fontWeight='bold';

// //by using loop

// // items.style.backgroundColor='red';      //gives error

// for(let i=0;i<items.length;i++)
// {
    // items[i].style.backgroundColor='red';
//     items[i].style.fontWeight='bold';
// }

// getelementsbytagname

// same like classnames

//querySelectors

// var header=document.querySelector('#main-header');

// console.log(header);
// header.style.borderBottom='solid red 10px';

// var input= document.querySelector('input');
// input.value="yeah buoy";

// var in_submit= document.querySelector('input[type="submit"]');
// in_submit.value='done';
// in_submit.style.color='blue';

// var lst= document.querySelector('.list-group-item:first-child');
// var lst2= document.querySelector('.list-group-item:last-child');
// lst.style.color='red';
// lst2.style.color='blue';
// lst2.textContent='hiiiiiiiii';

// //que3rySelectorAll

// var odd=document.querySelectorAll('li:nth-child(odd)');
// var even=document.querySelectorAll('li:nth-child(even)');
// console.log(odd);
// for (var i = 0 ; i < odd.length ; i++)
// {
//     odd[i].style.backgroundColor = 'steelblue';
//     even[i].style.backgroundColor='grey';
// }