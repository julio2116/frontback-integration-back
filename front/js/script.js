const filter = document.querySelector('#filter');

let sapatos = [];

const renderContent = (sapatos) => {
  const list = document.querySelector('#list');
  const main = document.querySelector('main');
  if(list)main.removeChild(list);

  const father = document.createElement('ul');
  const element = document.querySelector('main');
  element.appendChild(father).setAttribute('id', 'list');
  const listItens = document.querySelector("#list");
  
  for (const sapato of sapatos) {
    let { id, imagem, nome, preco } = sapato;
    preco = preco.toString().replace(".", ",")
    listItens.appendChild(document.createElement('li')).setAttribute('id', id);
    const item = listItens.querySelector(`#${id}`);
    item.classList.add('product')
    item.appendChild(document.createElement('div')).classList.add('img-container');

    const imgContainer = item.querySelector('.img-container')

    imgContainer.appendChild(document.createElement('img')).setAttribute('src', imagem);
    item.appendChild(document.createElement('div')).setAttribute('id', 'info');
    const div = item.querySelector(`#info`);

    div.appendChild(document.createElement('span')).textContent = nome;
    div.appendChild(document.createElement('span')).textContent = preco;
  }
}

async function fetchData() {
  const dataFetch = await fetch("http://localhost:8000/api/v1/products");
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