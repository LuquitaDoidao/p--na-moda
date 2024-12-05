// Pegando os elementos necessários
const modal = document.querySelector('.modal_inserir');
const btnCadastro = document.querySelector('#cadastro');
const btnFecharModal = document.querySelector('.x'); // Botão para fechar a modal
const formInserir = document.querySelector('.inserir_form');

// Função para abrir a modal
btnCadastro.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Função para fechar a modal
btnFecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Função para cadastrar novo calçado
formInserir.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio do formulário

    // Pegando os dados do formulário
    const urlImagem = event.target.querySelector('input[type="url"]').value;
    const nome = event.target.querySelector('input[type="text"]').value;
    const descricao = event.target.querySelector('input[type="text"]:nth-child(3)').value;
    const preco = event.target.querySelector('input[type="number"]').value;

    // Criando um novo elemento de calçado
    const novoCalçado = document.createElement('div');
    novoCalçado.classList.add('quadro');

    novoCalçado.innerHTML = `
        <img src="${urlImagem}" alt="${nome}">
        <div>
            <p class="nome">${nome}</p>
            <p class="preco">R$ ${preco}</p>
        </div>
    `;

    // Adicionando o novo calçado ao catálogo
    const secaoCatalogo = document.querySelector('section.d-flex');
    secaoCatalogo.appendChild(novoCalçado);

    // Fechar a modal após adicionar o calçado
    modal.style.display = 'none';

    // Limpar os campos do formulário
    formInserir.reset();
});
