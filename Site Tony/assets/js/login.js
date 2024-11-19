// Função para exibir alertas
function showAlert(message) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// Função para validar o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    // Valida o primeiro dígito
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    // Valida o segundo dígito
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Função para validar o número de telefone
function validarTelefone(telefone) {
    const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato: (00) 00000-0000
    return regexTelefone.test(telefone);
}

// Função para verificar se o valor inserido é válido (Gmail, Telefone ou CPF)
function validarIdentificacao(valor) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida email
    return validarCPF(valor) || validarTelefone(valor) || regexEmail.test(valor);
}

// Evento de submissão do formulário de login
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const identificacao = document.getElementById('identificacao').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Simulação de credenciais cadastradas
    const usuarioCadastrado = {
        gmail: 'usuario@gmail.com',
        telefone: '(11) 99999-9999',
        cpf: '123.456.789-09',
        senha: '123456'
    };

    // Verifica se a identificação é válida
    if (!validarIdentificacao(identificacao)) {
        showAlert('Por favor, insira um Gmail, Telefone ou CPF válido.');
        return;
    }

    // Verifica as credenciais
    if (
        (identificacao === usuarioCadastrado.gmail || 
         identificacao === usuarioCadastrado.telefone || 
         identificacao === usuarioCadastrado.cpf) &&
        senha === usuarioCadastrado.senha
    ) {
        showAlert('Login realizado com sucesso!');
        // Redireciona para a página principal
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showAlert('Credenciais incorretas. Tente novamente.');
    }
});
