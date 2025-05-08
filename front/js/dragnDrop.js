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
        zona.addEventListener('dragleave', (event) => {
            zona.classList.remove('dragover')
        });
        
        zona.addEventListener('dragover', (event) => {
            event.preventDefault();
            zona.classList.add('dragover');
        });
        
        zona.addEventListener('drop', (event) => {
            zona.innerHTML = '';
            async function fetchData() {
                zona.classList.remove('dragover')
                const dataFetch = await fetch(`http://localhost:8000/api/v1/products/${event.dataTransfer.getData('text')}`);
                const data = await dataFetch.json();
                return data.data
            }
            fetchData().then((data)=>{
                zona.innerHTML = data.nome
                if (list && list.parentNode === itemsContainer) {
                    itemsContainer.removeChild(list);
                }
                searchBar.value = '';
            });
        });
    })
}

export default {
    teste
}