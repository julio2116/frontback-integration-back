function alterItem({id, imagem, nome, preco}){
    const view = document.querySelector('#view');
    const form = document.createElement('form');
    view.appendChild(form).setAttribute('id', 'formAlter');
    const formEl = view.querySelector('form');

    for(const [key, value] of Object.entries({imagem, nome, preco})){
        const label = document.createElement('label');
        const input = document.createElement('input');        
        const div = document.createElement('div');
        formEl.appendChild(div)

        div.appendChild(label).setAttribute('for', `${id}-${key}`);
        div.lastElementChild.textContent = key;

        div.appendChild(input).setAttribute('id', `${id}-${key}`);
        const inputEl = document.querySelector(`#${id}-${key}`);
        inputEl.setAttribute('name', key);

        
        inputEl.value = value;
    }
    formEl.appendChild(document.createElement('button')).textContent = 'submit'
    
    async function patchItem(){
        const formData = document.querySelector('#formAlter');
        const objectData = new FormData(formData)
        const object = Object.fromEntries(objectData)

        const fetchData = await fetch(`http://localhost:8000/api/v1/products/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
        const data = await fetchData.json();
        alert(data.status)
    }

    if(formEl){
        formEl.addEventListener('submit', (event)=>{
            event.preventDefault();
            patchItem()
        })
    }

}
export default alterItem