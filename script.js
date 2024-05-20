document.addEventListener('DOMContentLoaded', function() {
    // Configurações do carrossel
    var slideIndex = 0;
    var slides = document.getElementsByClassName("slide");
    var totalSlides = slides.length;
    var slideInterval = 2000; // Intervalo entre os slides em milissegundos
    var autoPlay = true; // Define se o carrossel deve trocar automaticamente os slides
    var pauseOnHover = true; // Define se o carrossel deve pausar quando o mouse estiver sobre ele
    var timer;

    // Mostra o slide atual e avança para o próximo slide
    function showSlides() {
        // Esconde todos os slides
        for (var i = 0; i < totalSlides; i++) {
            slides[i].style.display = "none";  
        }

        // Avança para o próximo slide
        slideIndex++;
        if (slideIndex > totalSlides) {
            slideIndex = 1;
        }    

        // Exibe o slide atual
        slides[slideIndex - 1].style.display = "block";  

        // Define o próximo slide
        if (autoPlay) {
            clearTimeout(timer);
            timer = setTimeout(showSlides, slideInterval);
        }
    }

    // Inicia o carrossel
    if (autoPlay) {
        timer = setTimeout(showSlides, slideInterval);
    }

    // Pausa o carrossel quando o mouse estiver sobre ele
    if (pauseOnHover) {
        var carouselContainer = document.querySelector('.carrossel');
        carouselContainer.addEventListener('mouseenter', function() {
            clearTimeout(timer);
        });

        carouselContainer.addEventListener('mouseleave', function() {
            timer = setTimeout(showSlides, slideInterval);
        });
    }

    // Botões de controle do carrossel
    var prevButton = document.querySelector('.carousel-prev');
    var nextButton = document.querySelector('.carousel-next');

    if (prevButton && nextButton) {
        // Evento de clique no botão anterior
        prevButton.addEventListener('click', function() {
            slideIndex--;
            if (slideIndex = -1) {
                slideIndex = totalSlides;
            }
            showSlides();
        });

        // Evento de clique no botão próximo
        nextButton.addEventListener('click', function() {
            slideIndex++;
            if (slideIndex > totalSlides) {
                slideIndex = 1;
            }
            showSlides();
        });
    }

    // Função para lidar com a pesquisa
    function handleSearch() {
        var searchInput = document.getElementById('search-input').value.toLowerCase(); // Obtém o valor da barra de pesquisa
        var elementsToSearch = document.querySelectorAll('.searchable'); // Selecione os elementos que você deseja pesquisar

        elementsToSearch.forEach(function(element) {
            var text = element.textContent.toLowerCase(); // Obtém o texto dentro do elemento

            if (text.includes(searchInput)) {
                element.style.display = "block"; // Exibe o elemento se o texto corresponder à pesquisa
            } else {
                element.style.display = "none"; // Oculta o elemento se o texto não corresponder à pesquisa
            }
        });
    }

    // Adiciona um evento de escuta para o evento input na barra de pesquisa
    document.getElementById('search-input').addEventListener('input', function() {
        handleSearch();
    });

    // Evento de clique no botão "Criar conta"
    document.getElementById('criar-conta-button').addEventListener('click', function() {
        document.querySelector('.registro-container').style.display = 'block';
    });

    // Evento de submissão do formulário de registro
    document.getElementById('registro-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtém os valores do formulário
        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;

        // Envia os dados para o servidor local MySQL
        fetch('http://localhost:3000/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, senha: senha })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Exibe mensagem de sucesso ou erro
        })
        .catch(error => {
            console.error('Erro ao registrar usuário:', error);
        });
    });
});
