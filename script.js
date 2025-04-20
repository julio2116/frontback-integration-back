const filter = document.querySelector('#filter');

let sapatos = [];

const renderContent = (sapatos) => {
  const father = document.createElement('ul')
  const element = document.querySelector('body');
  element.appendChild(father).setAttribute('id', 'list');
  const listItens = document.querySelector("#list");
  
  for (const sapato of sapatos) {
    const { id, imagem, nome, preco } = sapato;
    listItens.appendChild(document.createElement('li')).setAttribute('id', id);
    const item = listItens.querySelector(`#${id}`);

    item.appendChild(document.createElement('img')).setAttribute('src', imagem);
    item.appendChild(document.createElement('div'));
    const div = item.querySelector(`div`);

    div.appendChild(document.createElement('span')).textContent = nome;
    div.appendChild(document.createElement('span')).textContent = preco;
  }
}

async function fetchData() {
  const dataFetch = await fetch("http://localhost:8000/api/v1/teste");
  const data = await dataFetch.json();

  sapatos = data.data;
  console.log(data.data)
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