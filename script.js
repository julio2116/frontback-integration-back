const page = document.getElementsByTagName("ul")[0];

const filter = document.getElementById('filter');


let sapatos = [];

const teste = (sapatos) => {
  const menorPreco = sapatos;
  console.log(menorPreco)
  page.innerHTML = '';
  
  for (const sapato of sapatos) {
    const { id, imagem, nome, preco } = sapato;
    page.innerHTML += `
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
  teste(data.data);
}

filter.addEventListener('change', (event)=>{
  valor = event.target.value;
  let ordenados = [...sapatos];
  
  if(valor === 'menorPreco'){
    ordenados?.sort((a, b) => a.preco - b.preco);
  }
  if(valor === 'maiorPreco'){
    ordenados?.sort((a, b) => b.preco - a.preco);
  }
  teste(ordenados)
})

fetchData();