document.addEventListener('DOMContentLoaded', function() {
    // Evento de submissão do formulário de registro
    document.getElementById('registro-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtém os valores do formulário
        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;

        // Envia os dados para o servidor de teste
        fetch('http://localhost:3000/register', {
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