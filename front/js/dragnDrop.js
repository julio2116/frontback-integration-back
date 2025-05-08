function teste(itemsContainer) {
    const list = itemsContainer.querySelector('ul');
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
        zona.innerHTML = '';
        zona.addEventListener('dragleave', (event) => {
            zona.classList.remove('dragover')
        });
        
        zona.addEventListener('dragover', (event) => {
            event.preventDefault();
            zona.classList.add('dragover');
        });
        
        zona.addEventListener('drop', (event) => {
            zona.classList.remove('dragover')
            async function fetchData() {
                const dataFetch = await fetch(`http://localhost:8000/api/v1/products/${event.dataTransfer.getData('text')}`);
                const data = await dataFetch.json();
                zona.innerHTML = data.data.nome
                console.log(data.data);
            }
            fetchData();
            itemsContainer.hasChildNodes() && itemsContainer.removeChild(list);
            searchBar.value = '';
        });
    })
}

export default {
    teste
}