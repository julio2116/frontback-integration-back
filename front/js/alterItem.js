function alterItem({id, imagem, nome, preco}){
    const view = document.querySelector('#view');
    const form = document.createElement('form');
    view.appendChild(form);
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

        inputEl.value = value;
    }


}
export default alterItem