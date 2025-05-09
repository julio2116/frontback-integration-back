import alterItem from './alterItem.js';

function teste(list) {
    const zonas = document.querySelectorAll('.zona');
    const searchBar = document.querySelector('#search-bar');

    list.addEventListener('dragstart', (event) => {
        const item = event.target;
        item.classList.add('dragging');
        event.dataTransfer.setData('text/plain', item.id);
    });
    list.addEventListener('dragend', (event) => {
        const item = event.target;
        item.classList.remove('dragging');
    });

    zonas.forEach(zona => {
        zona.addEventListener('dragleave', () => {
            zona.classList.remove('dragover')
        });

        zona.addEventListener('dragover', (event) => {
            event.preventDefault();
            zona.classList.add('dragover');
        });

        zona.addEventListener('drop', (event) => {
            event.preventDefault();

            if (zona.id === 'view') {
                async function fetchData() {
                    zona.classList.remove('dragover')
                    const dataFetch = await fetch(`http://localhost:8000/api/v1/products/${event.dataTransfer.getData('text')}`);
                    const data = await dataFetch.json();
                    // return data.data
                    zona.innerHTML = '';
                    let { id, imagem, nome, preco } = data.data;
                    preco = preco.toString().replace(".", ",")
                    zona.appendChild(document.createElement('div')).setAttribute('id', id);
                    const item = zona.querySelector(`#${id}`);
                    item.classList.add('product')
                    item.appendChild(document.createElement('div')).classList.add('img-container');

                    const imgContainer = item.querySelector('.img-container')

                    imgContainer.appendChild(document.createElement('img')).setAttribute('src', imagem);
                    item.appendChild(document.createElement('div')).setAttribute('id', 'info');
                    const div = item.querySelector(`#info`);

                    div.appendChild(document.createElement('span')).textContent = nome;
                    div.appendChild(document.createElement('span')).textContent = preco;

                    alterItem(...[data.data])
                }
                fetchData()
            }

            if (zona.id === 'delete') {
                const confirmation = confirm('Tem certeza que deseja apagar?');
                if (!confirmation) return
                async function deleteItem() {
                    const dataFetch = await fetch(`http://localhost:8000/api/v1/products/${event.dataTransfer.getData('text')}`, {
                        method: 'DELETE',
                    });
                    const data = await dataFetch.json();
                    alert(data.status)
                }
                deleteItem()
            }
            list.innerHTML = '';
            list.style.display = 'none';
            searchBar.value = '';
        });
    });
}


export default {
    teste
}