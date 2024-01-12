document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-produto');
    const feedback = document.getElementById('feedback');
    const produtosCadastrados = document.getElementById('produtos-cadastrados');

    form.onsubmit = async function(e) {
        e.preventDefault();
        const produto = document.getElementById('nome').value;
        let valor = document.getElementById('valor').value;
        const descricao = document.getElementById('descricao').value;

    
        valor = valor.replace(',', '.');
        let valorEmNumero = parseFloat(valor);
        
        if (!isNaN(valorEmNumero)) {
            // Converter o número para uma string com duas casas decimais
            valor = valorEmNumero.toFixed(2);
            valor = valor.replace('.', ',');
        } else {
            feedback.textContent = "Por favor, insira um valor numérico válido.";
            feedback.style.color = "red";
            return;
        }
        
        try {
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ produto, valor: valorEmNumero, descricao }) // Enviar valor como número
            });

            const data = await response.json();

            if (data.json) {
                feedback.textContent = "Produto cadastrado com sucesso!";
                feedback.style.color = "green";
                form.reset(" ");

                const produtoElement = document.createElement('div')
                produtoElement.textContent = `Produto: ${produto}, Valor: R$ ${valor}, Descrição: ${descricao}`;
                produtosCadastrados.appendChild(produtoElement);
            } else {
                throw new Error('Falha no cadastro do produto.');
            }
        } catch (error) {
            feedback.textContent = error.message;
            feedback.style.color = "red";
        }
    };
});