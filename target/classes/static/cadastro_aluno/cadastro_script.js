// js/cadastro_script.js

import { cadastrarAluno, isAuthenticated, logout } from './api.js';

// Verifica autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated()) {
        window.location.href = '../index.html';
        return;
    }

    // Inicializa os manipuladores de eventos
    initializeEventHandlers();

    // Configura os botões de logout
    document.querySelectorAll('.logout a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    });
});

// Inicializa os manipuladores de eventos do formulário
function initializeEventHandlers() {
    // Manipulação da navegação por abas
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe 'active' de todos os botões e conteúdos
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Adiciona classe 'active' ao botão clicado
            button.classList.add('active');

            // Mostra o conteúdo correspondente
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Upload de imagem
    const uploadBtn = document.querySelector('.upload-btn');
    const fileInput = document.getElementById('profile-upload');
    const preview = document.getElementById('profile-preview');

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    document.querySelector('.delete-btn').addEventListener('click', () => {
        preview.src = "https://via.placeholder.com/150/3498db/FFFFFF?text=Foto";
        fileInput.value = '';
    });

    // Formatação de telefone
    const phoneInputs = document.querySelectorAll('input[name="phone"], input[name="guardianPhone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);

            // Formata o número de telefone
            if (value.length > 2) {
                value = `(<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>v</mi><mi>a</mi><mi>l</mi><mi>u</mi><mi>e</mi><mi mathvariant="normal">.</mi><mi>s</mi><mi>u</mi><mi>b</mi><mi>s</mi><mi>t</mi><mi>r</mi><mi>i</mi><mi>n</mi><mi>g</mi><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">{value.substring(0, 2)}) </annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">u</span><span class="mord mathnormal">e</span><span class="mord">.</span><span class="mord mathnormal">s</span><span class="mord mathnormal">u</span><span class="mord mathnormal">b</span><span class="mord mathnormal">s</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mord mathnormal">in</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">2</span><span class="mclose">)</span></span><span class="mclose">)</span></span></span></span>{value.substring(2)}`;
            }
            if (value.length > 10) {
                value = `<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>v</mi><mi>a</mi><mi>l</mi><mi>u</mi><mi>e</mi><mi mathvariant="normal">.</mi><mi>s</mi><mi>u</mi><mi>b</mi><mi>s</mi><mi>t</mi><mi>r</mi><mi>i</mi><mi>n</mi><mi>g</mi><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mn>10</mn><mo stretchy="false">)</mo></mrow><mo>−</mo></mrow><annotation encoding="application/x-tex">{value.substring(0, 10)}-</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">u</span><span class="mord mathnormal">e</span><span class="mord">.</span><span class="mord mathnormal">s</span><span class="mord mathnormal">u</span><span class="mord mathnormal">b</span><span class="mord mathnormal">s</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mord mathnormal">in</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">10</span><span class="mclose">)</span></span><span class="mord">−</span></span></span></span>{value.substring(10)}`;
            }

            e.target.value = value;
        });
    });

    // Manipulador do formulário de cadastro
    document.querySelector('.save-btn').addEventListener('click', async (e) => {
        e.preventDefault();

        // Validação básica
        const requiredFields = ['registerName', 'birthDate'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            // Prepara os dados do formulário
            const alunoData = {
                name: document.getElementById('registerName').value,
                displayName: document.getElementById('socialName').value || document.getElementById('registerName').value,
                birthDate: document.getElementById('birthDate').value,
                gender: document.getElementById('gender').value || null,
                race: document.getElementById('race').value || null,
                schooling: document.getElementById('schooling').value || null,
                userRole: 'ALUNO', // Tipo de usuário fixo como ALUNO
                phone: document.getElementById('phone').value || null,
                email: document.getElementById('email').value || null,
                guardianName: document.getElementById('guardianName').value || null,
                guardianRelationship: document.getElementById('guardianRelationship').value || null,
                guardianPhone: document.getElementById('guardianPhone').value || null,
                // Adicione os campos médicos e de contato aqui quando implementar as outras abas
                active: true
            };

            // Envia para a API
            await cadastrarAluno(alunoData);

            alert('Aluno cadastrado com sucesso!');
            // Redireciona para a lista de alunos
            window.location.href = '../alunos_ativos/alunos_ativos.html';
        } catch (error) {
            alert(`Erro ao cadastrar aluno: ${error.message}`);
        }
    });

    // Manipulação do accordion do menu
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();

            const parent = toggle.parentElement;
            parent.classList.toggle('active');

            // Fecha outros accordions
            document.querySelectorAll('.accordion').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                }
            });
        });
    });
}
