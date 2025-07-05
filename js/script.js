document.addEventListener('DOMContentLoaded', () => {
    console.log("Site carregado com sucesso!");

    //  Mensagem de Boas-Vindas 
    if (!sessionStorage.getItem("boasVindasMostrada")) {
        alert("Bem-vindo ao Bolters & Paints!");
        sessionStorage.setItem("boasVindasMostrada", "true");
    }

    //  Validação do Formulário 
    const form = document.getElementById('form-contato');
    const msgErro = document.getElementById('mensagem-erro');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (!nome || !email || !mensagem) {
                msgErro.textContent = 'Por favor, preencha todos os campos.';
                return;
            }

            if (!validarEmail(email)) {
                msgErro.textContent = 'Por favor, insira um e-mail válido.';
                return;
            }

            msgErro.textContent = '';
            alert('Mensagem enviada com sucesso!');
            form.reset();
        });

        function validarEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }

    // Efeito nas imagens
    const imagens = document.querySelectorAll("img");

    imagens.forEach(img => {
        img.addEventListener("mouseover", () => {
            img.style.transform = "scale(1.05)";
            img.style.transition = "transform 0.3s";
        });

        img.addEventListener("mouseout", () => {
            img.style.transform = "scale(1)";
        });
    });

    // Galeria Expansível e Navegação
    const container = document.createElement("div");
    container.id = "imagem-expandida-container";
    container.innerHTML = `
        <button id="fechar-galeria" aria-label="Fechar imagem ampliada">×</button>
        <button id="voltar-img" aria-label="Imagem anterior" class="seta-galeria">‹</button>
        <img />
        <button id="avancar-img" aria-label="Próxima imagem" class="seta-galeria">›</button>
    `;
    document.body.appendChild(container);

    const imagemExpandida = container.querySelector("img");
    const botaoFechar = container.querySelector("#fechar-galeria");
    const botaoVoltar = container.querySelector("#voltar-img");
    const botaoAvancar = container.querySelector("#avancar-img");

    const imagensGaleria = Array.from(document.querySelectorAll(".galeria img"));
    let indiceAtual = 0;

    // Função para abrir a imagem pelo índice
    function abrirImagem(indice) {
        if (indice < 0) indice = imagensGaleria.length - 1;   
        if (indice >= imagensGaleria.length) indice = 0;      
        indiceAtual = indice;
        imagemExpandida.src = imagensGaleria[indiceAtual].src;
        container.style.display = "flex";
    }

    // Evento de clique nas imagens da galeria
    imagensGaleria.forEach((img, i) => {
        img.addEventListener("click", () => {
            abrirImagem(i);
        });
    });

    // Fecha ao clicar no botão "×"
    botaoFechar.addEventListener("click", (e) => {
        e.stopPropagation();
        container.style.display = "none";
    });

    // Navegação pelos botões ‹ e ›
    botaoVoltar.addEventListener("click", (e) => {
        e.stopPropagation();
        abrirImagem(indiceAtual - 1);
    });

    botaoAvancar.addEventListener("click", (e) => {
        e.stopPropagation();
        abrirImagem(indiceAtual + 1);
    });

    // Fecha ao clicar fora da imagem 
    container.addEventListener("click", (e) => {
        if (e.target === container) {
            container.style.display = "none";
        }
    });

    // Navegação com teclado
    document.addEventListener("keydown", (e) => {
        if (container.style.display === "flex") {
            if (e.key === "ArrowRight") {
                abrirImagem(indiceAtual + 1);
            } else if (e.key === "ArrowLeft") {
                abrirImagem(indiceAtual - 1);
            } else if (e.key === "Escape") {
                container.style.display = "none";
            }
        }
    });

    const botaoVoltarTopo = document.getElementById("voltar-topo");

// Mostra o botão quando rolar a página para baixo
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        botaoVoltarTopo.style.display = "block";
    } else {
        botaoVoltarTopo.style.display = "none";
    }
});

// Volta ao topo 
botaoVoltarTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// Ativar menu mobile

     const botaoMenu = document.getElementById("botao-menu");
    const menuLinks = document.getElementById("menu-links");

    if (botaoMenu && menuLinks) {
        botaoMenu.addEventListener("click", () => {
            menuLinks.classList.toggle("aberto");
        });
    }

});




