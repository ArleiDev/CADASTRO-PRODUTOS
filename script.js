document.addEventListener("DOMContentLoaded", function() {
    const produtos = [];

    // Função para carregar os produtos do localStorage ao iniciar a página
    function carregarProdutosDoLocalStorage() {
        const produtosArmazenados = JSON.parse(localStorage.getItem("produtos"));
        if (produtosArmazenados) {
            produtos.push(...produtosArmazenados);
        }
    }

    // Carrega os produtos do localStorage ao iniciar a página
    carregarProdutosDoLocalStorage();

    // Função para carregar o nome do grupo de produto do localStorage
    function carregarNomeGrupoProduto() {
        const grupoProduto = localStorage.getItem("grupoProduto");
        if (grupoProduto) {
            document.getElementById("grupoProduto").value = grupoProduto;
        }
    }

    // Função para salvar o nome do grupo de produto no localStorage
    function salvarNomeGrupoProduto() {
        const grupoProduto = document.getElementById("grupoProduto").value;
        localStorage.setItem("grupoProduto", grupoProduto);
    }

    // Função para atualizar a tabela de produtos
    function atualizarTabelaProdutos() {
        const tabelaProdutos = document.getElementById("tabelaProdutos");
        const tbody = tabelaProdutos.querySelector("tbody");
        tbody.innerHTML = "";

        produtos.forEach(function(produto) {
            const row = tbody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);

            cell1.innerHTML = produto.nome;
            cell2.innerHTML = produto.grupo;
            cell3.innerHTML = produto.valor;
            cell4.innerHTML = produto.tipoUnidade;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "x";
            deleteButton.addEventListener("click", function() {
                const rowIndex = row.rowIndex;
                produtos.splice(rowIndex - 1, 1);
                atualizarTabelaProdutos();
                localStorage.setItem("produtos", JSON.stringify(produtos));
            });
            cell5.appendChild(deleteButton);
        });
    }

    // Carrega o nome do grupo de produto do localStorage
    carregarNomeGrupoProduto();

    // Adicione o evento de clique ao botão de adicionar produto
    document.getElementById("adicionarBotao").addEventListener("click", function() {
        adicionarProduto();
        atualizarTabelaProdutos();
    });

    // Adicione o evento de clique ao botão de exportar para Excel
    document.getElementById("exportarBotao").addEventListener("click", exportarParaExcel);

    // Função para adicionar um novo produto
    function adicionarProduto() {
        const nomeProduto = document.getElementById("nomeProduto").value;
        const grupoProduto = document.getElementById("grupoProduto").value;
        const valorProduto = document.getElementById("valorProduto").value;
        const tipoUnidade = document.getElementById("tipoUnidade").value;

        produtos.push({ nome: nomeProduto, grupo: grupoProduto, valor: valorProduto, tipoUnidade: tipoUnidade });

        document.getElementById("nomeProduto").value = "";
        document.getElementById("valorProduto").value = "";
        document.getElementById("tipoUnidade").value = "";

        // Salvar o nome do grupo de produto no localStorage após a adição de um produto
        salvarNomeGrupoProduto();

        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    // Função para exportar produtos para Excel
    function exportarParaExcel() {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(produtos);
        XLSX.utils.book_append_sheet(wb, ws, "Produtos");
        XLSX.writeFile(wb, "produtos.xlsx");
    }

    // Carrega os produtos e a tabela ao iniciar a página
    atualizarTabelaProdutos();
});
