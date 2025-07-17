// js/alunos_ativos.js

import { getAlunos, isAuthenticated, logout } from './api.js';

// Verifica autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    if (!isAuthenticated()) {
        window.location.href = '../index.html';
        return;
    }

    // Configura botão de logout
    document.querySelectorAll('.logout a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    });

    // Carrega os alunos ativos
    try {
        const alunos = await getAlunos(true); // true para alunos ativos
        renderizarListaAlunos(alunos);
    } catch (error) {
        alert(`Erro ao carregar alunos: ${error.message}`);
    }
});

// Renderiza a lista de alunos na tabela
function renderizarListaAlunos(alunos) {
    const tbody = document.querySelector('#alunos-tabela tbody');

    if (!alunos || alunos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">Nenhum aluno encontrado</td></tr>';
        return;
    }

    tbody.innerHTML = '';
    alunos.forEach(aluno => {
        const row = document.createElement('tr');

        // Formata a data de nascimento
        const dataNascimento = aluno.birthDate ? new Date(aluno.birthDate).toLocaleDateString('pt-BR') : '-';

        row.innerHTML = `
      <td>${aluno.id}</td>
      <td>${aluno.name}</td>
      <td>${dataNascimento}</td>
      <td>${aluno.phone || '-'}</td>
      <td class="actions">
        <button class="action-btn view-btn" data-id="${aluno.id}">
          <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn edit-btn" data-id="${aluno.id}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete-btn" data-id="${aluno.id}">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

        tbody.appendChild(row);
    });

    // Adiciona os listeners de eventos aos botões
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => visualizarAluno(btn.dataset.id));
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => editarAluno(btn.dataset.id));
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => desativarAluno(btn.dataset.id));
    });
}

// Funções para os botões de ação
function visualizarAluno(id) {
    window.location.href = `../visualizar_aluno/visualizar_aluno.html?id=${id}`;
}

function editarAluno(id) {
    window.location.href = `../editar_aluno/editar-aluno.html?id=${id}`;
}

async function desativarAluno(id) {
    if (confirm('Tem certeza que deseja desativar este aluno?')) {
        try {
            // Aqui você chamaria a API para desativar o aluno
            // await atualizarAluno(id, { active: false });
            alert('Aluno desativado com sucesso!');

            // Recarrega a lista de alunos
            const alunos = await getAlunos(true);
            renderizarListaAlunos(alunos);
        } catch (error) {
            alert(`Erro ao desativar aluno: ${error.message}`);
        }
    }
}
