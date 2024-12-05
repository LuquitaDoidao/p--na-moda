const cadastroButton = document.getElementById("cadastro")
const modalInserir = document.querySelector(".modal_inserir")
const form = document.querySelector(".inserir_form")


function abrirModal() {
    modalInserir.style.display = "flex" 
}


function fecharModal() {
    modalInserir.style.display = "none" 
}


cadastroButton.addEventListener("click", abrirModal)


form.addEventListener("submit", function(event) {
    event.preventDefault() 
    fecharModal() 
    alert("Produto cadastrado com sucesso!") 
})


modalInserir.addEventListener("click", function(event) {
    if (event.target === modalInserir) { 
        fecharModal()
    }
})
