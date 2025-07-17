// js/api.js

// Configurações da API
const API_BASE_URL = 'http://localhost:3535'; // Ajuste para a URL do seu servidor Spring Boot

// Função para obter o token JWT do localStorage
function getToken() {
    return localStorage.getItem('authToken');
}

// Função para verificar se o usuário está autenticado
function isAuthenticated() {
    return getToken() !== null;
}

// Função para fazer login
async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha na autenticação');
        }

        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        return data;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}

// Função para logout
function logout() {
    localStorage.removeItem('authToken');
    window.location.href = '../index.html';
}

// Funções para alunos
async function getAlunos(active = true) {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Usuário não autenticado');
        }

        const url = active
            ? `${API_BASE_URL}/api/users/type/ALUNO`
            : `${API_BASE_URL}/api/users/alunos/inativos`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar alunos');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        throw error;
    }
}

// Função para obter detalhes de um aluno pelo ID
async function getAlunoById(id) {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Usuário não autenticado');
        }

        const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        if (!response.ok) {
            throw new Error('Falha ao buscar dados do aluno');
        }

        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar aluno ID ${id}:`, error);
        throw error;
    }
}

// Função para cadastrar aluno
async function cadastrarAluno(alunoData) {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Usuário não autenticado');
        }

        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(alunoData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao cadastrar aluno');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        throw error;
    }
}

// Função para atualizar aluno
async function atualizarAluno(id, alunoData) {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Usuário não autenticado');
        }

        const response = await fetch(`<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>A</mi><mi>P</mi><msub><mi>I</mi><mi>B</mi></msub><mi>A</mi><mi>S</mi><msub><mi>E</mi><mi>U</mi></msub><mi>R</mi><mi>L</mi></mrow><mi mathvariant="normal">/</mi><mi>a</mi><mi>p</mi><mi>i</mi><mi mathvariant="normal">/</mi><mi>u</mi><mi>s</mi><mi>e</mi><mi>r</mi><mi>s</mi><mi mathvariant="normal">/</mi></mrow><annotation encoding="application/x-tex">{API_BASE_URL}/api/users/</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">B</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathnormal">A</span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">U</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathnormal" style="margin-right:0.00773em;">R</span><span class="mord mathnormal">L</span></span><span class="mord">/</span><span class="mord mathnormal">a</span><span class="mord mathnormal">p</span><span class="mord mathnormal">i</span><span class="mord">/</span><span class="mord mathnormal">u</span><span class="mord mathnormal">sers</span><span class="mord">/</span></span></span></span>{id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(alunoData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao atualizar aluno');
        }

        return await response.json();
    } catch (error) {
        console.error(`Erro ao atualizar aluno ID ${id}:`, error);
        throw error;
    }
}

// Funções para turmas
async function getTurmas() {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Usuário não autenticado');
        }

        const response = await fetch(`${API_BASE_URL}/api/classrooms`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar turmas');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar turmas:', error);
        throw error;
    }
}

// Exportar todas as funções
export {
    login,
    logout,
    isAuthenticated,
    getToken,
    getAlunos,
    getAlunoById,
    cadastrarAluno,
    atualizarAluno,
    getTurmas
};
