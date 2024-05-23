document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registro-form').addEventListener('submit', function(event) {
        event.preventDefault();

        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;

        fetch('http://localhost:3000/register', {
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