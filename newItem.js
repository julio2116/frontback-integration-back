const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const dataForm = new FormData(form);
  const tamanhos = dataForm.getAll("tamanho");
  const data = Object.fromEntries(dataForm);
  data.tamanho = tamanhos;

  async function createNewItem(item) {
    const sendFetch = await fetch("http://localhost:8000/api/v1/teste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const dataReceived = await sendFetch.json();
    console.log(dataReceived);
  }
  createNewItem(data);
});
