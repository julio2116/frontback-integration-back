const page = document.getElementsByTagName("ul")[0];
const teste = (sapatos) => {
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

  teste(data.data);
}
fetchData();
