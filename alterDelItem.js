const form = document.querySelector("form");
const itemsContainer = document.querySelector("#items-container");
const buttonDelete = document.querySelector("#main button");
let id = "";
let allData = [];
let searchTerm = "";

form.addEventListener("input", (event) => {
  async function fetchData() {
    searchTerm = event.target.value.toLowerCase();
    let allItems = [];
    const parent = document.querySelector("#items-container");
    let shoeList = parent.querySelector("ul");
    if (shoeList) parent.removeChild(shoeList);

    if (searchTerm.length > 0) {
      const dataFetch = await fetch("http://localhost:8000/api/v1/teste");
      const data = await dataFetch.json();
      allData = data.data;
      allItems = data.data.filter((el) =>
        el.nome.toLowerCase().includes(searchTerm)
      );
      let names = allItems.map((el) => [el.id, el.nome]);
      let teste = "ul";
      names = Object.fromEntries(names);
      itemsContainer.appendChild(document.createElement(teste));

      let sugestItems = [];

      for (const [id, nome] of Object.entries(names)) {
        sugestItems.push(["li", id, nome]);
      }
      const list = itemsContainer.querySelector("ul");

      sugestItems.forEach((el) => {
        list.appendChild(document.createElement(el[0]));
        const item = list.lastChild;
        item.setAttribute("id", el[1]);
        item.innerText = el[2];
      });
    }

    shoeList = parent.querySelector("ul");

    shoeList.addEventListener("click", (event) => {
      const searchBar = document.querySelector("#search-bar");
      searchBar.value = event.target.innerText;

      if (shoeList) parent.removeChild(shoeList);
      let item = {};
      searchTerm = form.querySelector('input').value.toLowerCase();
      if (allData) {
        item = allData.find((el) => (el.nome.toLowerCase() === searchTerm));
        id = item.id;
      }
    });
    buttonDelete.addEventListener("click", () => {
      if (id) {
        async function deleteData(id) {
          const fetchData = await fetch(
            `http://localhost:8000/api/v1/teste/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await fetchData.json();
        }
        deleteData(id);
      }
    });
  }
  fetchData();
});
