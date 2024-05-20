document.addEventListener('DOMContentLoaded', function() {
    
    var slideIndex = 0;
    var slides = document.getElementsByClassName("slide");
    var totalSlides = slides.length;
    var slideInterval = 2000; 
    var autoPlay = true; 
    var pauseOnHover = true; 
    var timer;

    
    function showSlides() {
      
        for (var i = 0; i < totalSlides; i++) {
            slides[i].style.display = "none";  
        }

      
        slideIndex++;
        if (slideIndex > totalSlides) {
            slideIndex = 1;
        }    

        
        slides[slideIndex - 1].style.display = "block";  

        
        if (autoPlay) {
            clearTimeout(timer);
            timer = setTimeout(showSlides, slideInterval);
        }
    }

    
    if (autoPlay) {
        timer = setTimeout(showSlides, slideInterval);
    }

    
    if (pauseOnHover) {
        var carouselContainer = document.querySelector('.carrossel');
        carouselContainer.addEventListener('mouseenter', function() {
            clearTimeout(timer);
        });

        carouselContainer.addEventListener('mouseleave', function() {
            timer = setTimeout(showSlides, slideInterval);
        });
    }

 
    var prevButton = document.querySelector('.carousel-prev');
    var nextButton = document.querySelector('.carousel-next');

    if (prevButton && nextButton) {
   
        prevButton.addEventListener('click', function() {
            slideIndex--;
            if (slideIndex = -1) {
                slideIndex = totalSlides;
            }
            showSlides();
        });

      
        nextButton.addEventListener('click', function() {
            slideIndex++;
            if (slideIndex > totalSlides) {
                slideIndex = 1;
            }
            showSlides();
        });
    }

   
    function handleSearch() {
        var searchInput = document.getElementById('search-input').value.toLowerCase(); 
        var elementsToSearch = document.querySelectorAll('.searchable'); 

        elementsToSearch.forEach(function(element) {
            var text = element.textContent.toLowerCase(); 

            if (text.includes(searchInput)) {
                element.style.display = "block"; 
            } else {
                element.style.display = "none"; 
            }
        });
    }

    
    document.getElementById('search-input').addEventListener('input', function() {
        handleSearch();
    });

    
    document.getElementById('criar-conta-button').addEventListener('click', function() {
        document.querySelector('.registro-container').style.display = 'block';
    });

    
    document.getElementById('registro-form').addEventListener('submit', function(event) {
        event.preventDefault();

       
        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;

        
        fetch('http://localhost:3000/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, senha: senha })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); 
        })
        .catch(error => {
            console.error('Erro ao registrar usuário:', error);
        });
    });
});
