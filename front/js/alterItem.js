function alterItem({id, imagem, nome, preco, cor, categoria, tamanho}){
    const view = document.querySelector('#view');
    const form = document.createElement('form');
    view.appendChild(form).setAttribute('id', 'formAlter');
    const formEl = view.querySelector('form');

    for(const [key, value] of Object.entries({imagem, nome, preco, cor, categoria, tamanho})){
        // console.log
        const label = document.createElement('label');
        const input = document.createElement('input');        
        const div = document.createElement('div');
        formEl.appendChild(div)

        div.appendChild(label).setAttribute('for', `${id}-${key}`);
        div.lastElementChild.textContent = key;

        if(key != 'tamanho'){
            div.appendChild(input).setAttribute('id', `${id}-${key}`);
            const inputEl = document.querySelector(`#${id}-${key}`);
            inputEl.setAttribute('name', key);
            inputEl.value = value;
        }

        if(key == 'tamanho'){
            for(let i = 0; i < 5; i++){
                if(tamanho[i]){
                    div.appendChild(document.createElement('input')).setAttribute('id', `input-${i}`)
                    const input = document.querySelector(`#input-${i}`);
                    input.setAttribute('name', key)
                    input.value = tamanho[i];
                } else {
                    div.appendChild(document.createElement('input')).setAttribute('id', `input-${i}`)
                    const input = document.querySelector(`#input-${i}`);
                    input.setAttribute('name', key)
                }
            }
        }
    }

    formEl.appendChild(document.createElement('button')).textContent = 'submit'
    
    async function patchItem(){
        const formData = document.querySelector('#formAlter');
        const objectData = new FormData(formData);
        const tamanhos = objectData.getAll("tamanho").filter(el=>el);
        const object = Object.fromEntries(objectData);
        object.tamanho = tamanhos;

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