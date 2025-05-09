import testeObject from './dragnDrop.js';
const { teste } = testeObject;

const form = document.querySelector("form");
let list = document.querySelector("#items-container");
let id = "";
let allData = [];
let searchTerm = "";
let eventsExistents = false;

form.addEventListener("input", (event) => {
  async function fetchData() {
    searchTerm = event.target.value.toLowerCase();
    let allItems = [];

    list.innerHTML = '';

    if (searchTerm.length > 0) {
      const dataFetch = await fetch("http://localhost:8000/api/v1/products");
      const data = await dataFetch.json();
      allData = data.data;
      allItems = data.data.filter((el) =>
        el.nome.toLowerCase().includes(searchTerm)
      );
      let names = allItems.map((el) => [el.id, el.nome]);
      names = Object.fromEntries(names);

      let sugestItems = [];

      for (const [id, nome] of Object.entries(names)) {
        sugestItems.push(["li", id, nome]);
      }

      list.style.display = 'block';

      sugestItems.forEach((el) => {
        list.appendChild(document.createElement(el[0]));
        const item = list.lastChild;
        [['id', el[1]], ['draggable', 'true']].forEach(el=>item.setAttribute(el[0], el[1]));
        item.innerText = el[2];
      });

      (()=>{
        if (eventsExistents){
          return;
        }
        teste(list);
        eventsExistents = true;
      })()
    }

    if (list) {
      list.addEventListener("click", (event) => {
        console.log('clicou')
        const searchBar = document.querySelector("#search-bar");
        searchBar.value = event.target.innerText;

        list.style.display = 'none';
        list.innerHTML = '';

        let item = {};
        searchTerm = form.querySelector('input').value.toLowerCase();
        if (allData) {
          item = allData.find((el) => (el.nome.toLowerCase() === searchTerm));
          id = item.id;
        }
      });
    }
  }
  fetchData();
});
