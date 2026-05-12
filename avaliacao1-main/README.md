# avaliacao1
Escolha um domínio de aplicação para o seu sistema web. No README_parte1.md,
descreva em até 10 linhas:
● O problema que a aplicação resolve
● Quem são os usuários principais
● Quais são as duas entidades de dados centrais da aplicação (ex: Produto e
Pedido; Paciente e Consulta)
Atenção: evite domínios extremamente genéricos (ex: "loja online" ou "rede social")
sem delimitação clara de escopo. Projetos com escopo mal definido terão pontuação
reduzida nas tarefas seguintes.

1.1 a aplicação
a aplicação será de um site de uma biblioteca de livros academicos, resolve o problema de livros pouco acessíveis para o publico de graduação  
os principais usuários são estudantes
todos os pontos do CRUD são igualmente importantes
no css foi usado o tailwind para poupar tempo de fazer o css na mão

1.2 dados mockados
são 2 entidades livros e emprestimos
livros:
{
  "id": "number (ID único do livro)",
  "titulo": "string (Nome da obra)",
  "autor": "string (Autor principal)",
  "area": "string (Ex: Cálculo, Física, Biologia)",
  "disponivel": "boolean (Se pode ser emprestado)"
}
emprestimos:
{
  "id": "number (ID da transação)",
  "livroId": "number (Referência ao livro)",
  "dataDevolucao": "string (Data limite)",
  "status": "string (Pendente, Ativo ou Concluído)"
}

1.3 codigo disponivel no git

obs: a interação com IA é o Google Gemini.html no git
