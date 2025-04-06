const listItens = document.getElementsByTagName("ul")[0];
const filter = document.getElementById('filter');

let sapatos = [];

const renderContent = (sapatos) => {
  listItens.innerHTML = '';
  
  for (const sapato of sapatos) {
    const { id, imagem, nome, preco } = sapato;
    listItens.innerHTML += `
    <li id='${id}'>
    <img src='${imagem}'>
    <div>
    <span>${nome}</span>
    <span>${preco}</span>
    </div>
    </li>`;
  }
};

async function fetchData() {
  const dataFetch = await fetch("http://localhost:8000/api/v1/teste");
  const data = await dataFetch.json();

  sapatos = data.data;
  renderContent(data.data);
}

filter.addEventListener('change', (event)=>{
  filterValue = event.target.value;
  let ordenados = [...sapatos];

  if(filterValue === 'menorPreco'){
    ordenados?.sort((a, b) => a.preco - b.preco);
  }
  if(filterValue === 'maiorPreco'){
    ordenados?.sort((a, b) => b.preco - a.preco);
  }
  renderContent(ordenados)
})

fetchData();