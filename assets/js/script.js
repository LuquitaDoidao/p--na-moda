// Pegando os elementos necessários
const modal = document.querySelector('.modal_inserir');
const btnCadastro = document.querySelector('#cadastro');
const btnFecharModal = document.querySelector('.x'); // Botão para fechar a modal
const formInserir = document.querySelector('.inserir_form');

// Variáveis globais
let calçadoEmEdição = null;

// Função para abrir a modal de cadastro
btnCadastro.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Função para fechar a modal de cadastro
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
    const genero = event.target.querySelector('select').value; // Pegando o valor de "Masculino" ou "Feminino"

    // Criando um novo elemento de calçado
    const novoCalçado = document.createElement('div');
    novoCalçado.classList.add('quadro');

    novoCalçado.innerHTML = `
        <img src="${urlImagem}" alt="${nome}" class="imagemCalçado">
        <div>
            <p class="nome">${nome}</p>
            <p class="preco">R$ ${preco}</p>
        </div>
    `;

    // Adicionando um evento para abrir a modal de edição quando o calçado for clicado
    novoCalçado.addEventListener('click', () => {
        mostrarModal(nome, preco, descricao, urlImagem, genero);
    });

    // Adicionando o novo calçado ao catálogo baseado no gênero
    const secaoCatalogo = document.querySelector(`section.d-flex[data-genero="${genero}"]`);  // Usando atributo para selecionar a seção
    secaoCatalogo.appendChild(novoCalçado);

    // Fechar a modal após adicionar o calçado
    modal.style.display = 'none';

    // Limpar os campos do formulário
    formInserir.reset();
});

// Função para abrir a modal com as informações do calçado (agora funciona tanto para exibição quanto para edição)
function mostrarModal(nome, preco, descricao, imagem, genero) {
    // Preenchendo os dados da modal com as informações do calçado
    document.getElementById('modalNome').innerText = nome;
    document.getElementById('modalPreco').innerText = preco;
    document.getElementById('modalDescri').innerText = descricao;
    document.getElementById('modalImg').src = imagem;

    // Exibindo a modal
    document.getElementById('modalSombra').style.display = 'flex';

    // Preenchendo os campos de edição
    document.querySelector('.inserir_form input[type="url"]').value = imagem;
    document.querySelector('.inserir_form input[type="text"]:nth-child(1)').value = nome;
    document.querySelector('.inserir_form input[type="text"]:nth-child(3)').value = descricao;
    document.querySelector('.inserir_form input[type="number"]').value = preco;
    document.querySelector('.inserir_form select').value = genero;

    // Salvando o calçado atual para edição
    calçadoEmEdição = {
        nome,
        preco,
        descricao,
        imagem,
        genero
    };
}

// Função para fechar a modal
document.getElementById('fecharModal')?.addEventListener('click', function() {
    document.getElementById('modalSombra').style.display = 'none';
});

// Adicionar evento para fechar a modal quando clicar fora dela
document.getElementById('modalSombra')?.addEventListener('click', function(event) {
    if (event.target === this) {
        document.getElementById('modalSombra').style.display = 'none';
    }
});

// Função para salvar as alterações no calçado
document.getElementById('editar').addEventListener('click', function() {
    if (!calçadoEmEdição) return; // Evita erros caso não haja calçado para editar

    // Pegando os dados do formulário de edição
    const urlImagem = document.querySelector('.inserir_form input[type="url"]').value;
    const nome = document.querySelector('.inserir_form input[type="text"]:nth-child(1)').value;
    const descricao = document.querySelector('.inserir_form input[type="text"]:nth-child(3)').value;
    const preco = document.querySelector('.inserir_form input[type="number"]').value;
    const genero = document.querySelector('.inserir_form select').value;

    // Atualizando o calçado no catálogo
    const calçadoEditado = document.querySelector(`.quadro img[src="${calçadoEmEdição.imagem}"]`).parentElement;
    calçadoEditado.querySelector('.nome').innerText = nome;
    calçadoEditado.querySelector('.preco').innerText = `R$ ${preco}`;
    calçadoEditado.querySelector('img').src = urlImagem;

    // Fechar a modal
    document.getElementById('modalSombra').style.display = 'none';

    // Atualizando o objeto do calçado editado
    calçadoEmEdição = null; // Resetando para não haver dados antigos.
});

// Função para deletar o calçado
document.getElementById('deletar').addEventListener('click', function() {
    if (!calçadoEmEdição) return; // Evita erros caso não haja calçado para deletar

    // Deletando o calçado
    const calçadoImagem = document.querySelector('.quadro-modal img').src;
    const calçadoParaDeletar = document.querySelector(`.quadro img[src="${calçadoImagem}"]`).parentElement;
    calçadoParaDeletar.remove(); // Remove o calçado do catálogo

    // Fechar a modal
    document.getElementById('modalSombra').style.display = 'none';
});
