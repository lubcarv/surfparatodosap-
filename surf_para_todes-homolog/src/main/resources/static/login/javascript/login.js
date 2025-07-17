// js/login.js

// Importe as funções do arquivo api.js
import { login } from 'static/api';

// Verifica se o usuário já está logado
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        // Se já estiver logado, redirecione para o dashboard
        window.location.href = './Dashboard/dashboard.html';
        return; // importante para evitar continuar executando
    }

    // Limpa os campos de email e senha (garantia extra)
    document.querySelector('input[name="email"]').value = '';
    document.querySelector('input[name="password"]').value = '';
    document.getElementById('message').textContent = '';
});

// Manipulador do formulário de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;
    const messageElement = document.getElementById('message');

    try {
        messageElement.textContent = 'Autenticando...';
        messageElement.style.color = '#666';

        // Chama a API de login
        await login(email, password);

        // Se o login for bem-sucedido, redireciona para o dashboard
        window.location.href = '../Dashboard/dashboard.html';
    } catch (error) {
        // Exibe mensagem de erro
        messageElement.textContent = error.message || 'Credenciais inválidas. Tente novamente.';
        messageElement.style.color = '#e74c3c';
    }
});
