// Função para exibir alertas de validação
function showAlert(message) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message; // Define a mensagem do alerta
    alertBox.style.display = 'block'; // Mostra o alerta

    // Remove o alerta automaticamente após 3 segundos
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// Função para validar CPF
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

// Função para validar e formatar o número de telefone
function validarTelefone(telefone) {
    const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato: (00) 00000-0000
    return regexTelefone.test(telefone);
}

// Formata o telefone enquanto o usuário digita
document.getElementById('telefone').addEventListener('input', function (event) {
    let telefone = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (telefone.length > 11) telefone = telefone.slice(0, 11);
    if (telefone.length > 6) {
        telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
    } else if (telefone.length > 2) {
        telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    }
    event.target.value = telefone;
});

// Formata o CPF enquanto o usuário digita
document.getElementById('cpf').addEventListener('input', function (event) {
    let cpf = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length > 11) cpf = cpf.slice(0, 11);
    if (cpf.length > 9) {
        cpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    } else if (cpf.length > 6) {
        cpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    } else if (cpf.length > 3) {
        cpf = `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    }
    event.target.value = cpf;
});

// Evento de submissão do formulário
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário para validação

    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const gmail = document.getElementById('gmail').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Valida os campos obrigatórios
    if (!nome) {
        showAlert('Por favor, preencha o campo Nome.');
        return;
    }
    if (!sobrenome) {
        showAlert('Por favor, preencha o campo Sobrenome.');
        return;
    }
    if (!telefone || !validarTelefone(telefone)) {
        showAlert('Por favor, insira um número de telefone válido no formato (00) 00000-0000.');
        return;
    }
    if (!cpf || !validarCPF(cpf)) {
        showAlert('Por favor, insira um CPF válido.');
        return;
    }
    if (!gmail) {
        showAlert('Por favor, preencha o campo Gmail.');
        return;
    }
    if (!dataNascimento) {
        showAlert('Por favor, preencha o campo Data de Nascimento.');
        return;
    }
    if (!senha) {
        showAlert('Por favor, preencha o campo Senha.');
        return;
    }

    // Exibe mensagem de sucesso
    showAlert(`Registro realizado com sucesso! Bem-vindo(a), ${nome} ${sobrenome}!`);
});
