// js/editar-aluno.js

import { getAlunoById, atualizarAluno, isAuthenticated, logout } from './api.js';

// ID do aluno a ser editado (normalmente viria da URL)
let alunoId;

// Verifica autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
  if (!isAuthenticated()) {
    window.location.href = '../index.html';
    return;
  }

  // Obtém o ID do aluno da URL, por exemplo: ?id=123
  const urlParams = new URLSearchParams(window.location.search);
  alunoId = urlParams.get('id');

  if (!alunoId) {
    alert('ID do aluno não fornecido');
    window.location.href = './index.html';
    return;
  }

  // Carrega os dados do aluno
  try {
    const aluno = await getAlunoById(alunoId);
    preencherDadosAluno(aluno);
  } catch (error) {
    alert(`Erro ao carregar dados do aluno: ${error.message}`);
  }

  // Configura botão de logout
  document.querySelector('.logout a').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });

  // Configura botão de confirmar edição
  document.querySelector('.confirm-button').addEventListener('click', salvarEdicao);
});

// Preenche os dados do aluno no formulário
function preencherDadosAluno(aluno) {
  // Atualiza a foto do perfil (se disponível)
  if (aluno.photoUrl) {
    document.querySelector('.profile-pic').src = aluno.photoUrl;
  }

  // Preenche as informações na caixa de detalhes
  const infoBox = document.querySelector('.info-box');
  infoBox.innerHTML = `
    <p><strong>Nome Completo:</strong> ${aluno.name}</p>
    <p><strong>Data Nascimento:</strong> ${formatarData(aluno.birthDate)}</p>
    <p><strong>Telefone:</strong> ${aluno.phone || '-'}</p>
    <p><strong>Email:</strong> ${aluno.email || '-'}</p>
    <p><strong>Nome Responsável:</strong> ${aluno.guardianName || '-'}</p>
  `;

  // Atualiza as tags
  const tagsContainer = document.querySelector('.tags');
  tagsContainer.innerHTML = '';

  if (aluno.gender) {
    tagsContainer.innerHTML += `<span class="tag">${aluno.gender}</span>`;
  }

  if (aluno.schooling) {
    tagsContainer.innerHTML += `<span class="tag">${formatarEscolaridade(aluno.schooling)}</span>`;
  }

  // Status tag (ativo/inativo)
  document.querySelector('.status-tag').textContent = aluno.active ? 'Ativo' : 'Inativo';
  if (!aluno.active) {
    document.querySelector('.status-tag').classList.add('inactive');
  }
}

// Formata data YYYY-MM-DD para DD/MM/YYYY
function formatarData(dataString) {
  if (!dataString) return '-';

  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR');
}

// Formata o código da escolaridade para texto legível
function formatarEscolaridade(codigo) {
  const mapeamento = {
    'INFANTIL': 'Educação Infantil',
    'FUNDAMENTAL': 'Ensino Fundamental',
    'MEDIO': 'Ensino Médio',
    'SUPERIOR': 'Ensino Superior',
    'NAO_SE_APLICA': 'Não se aplica'
  };

  return mapeamento[codigo] || codigo;
}

// Salva as alterações do aluno
async function salvarEdicao() {
  // Aqui você implementaria a lógica para capturar os dados editados
  // e enviá-los para o backend
  // Neste exemplo, vamos apenas fingir uma atualização bem-sucedida

  alert('Alterações salvas com sucesso!');
  // Redireciona de volta para a lista de alunos
  window.location.href = './index.html';
}
