Pensando na integração da api com o front-end, os campos id (cada livro precisa de um registro único), titulo, autor e aluno são idênticos ao React e todos necessários sem omissões ou adições.
Os endpoints são:
POST /login: Público. Recebe credenciais e retorna um JWT. Credenciais: admin / 1234
-GET /livros: Público. Lista todos os livros. listar_livros()
[
  {"id": 1, "titulo": "Cálculo A", "autor": "Flemming", "area": "Exatas", "disponivel": true}
]
-POST /livros: Protegido. Adiciona um novo livro. adicionar_livro(livro: Livro)
{ "id": 3, "titulo": "Novo Livro", "autor": "Autor X", "area": "Tecnologia", "disponivel": true }
Status 201 Created com o objeto criado.
-GET /emprestimos: Público. Lista os empréstimos. listar_emprestimos()
-DELETE /emprestimos/{id}: Protegido. Remove um registro (exclusivo para administradores). cancelar_emprestimo(emp_id: int)

O GET do livros é para listar todos os livros disponíveis, o Post é para adicionar novos livros, o POST é protegido, pois só o administrador tem acesso aos dados de entrada de livros na biblioteca para adiciona-los, um usuário 
não teria essa informação e poderia prejudicar o banco de dados
O GET do empréstimos é para listar todos os empréstimos realizados, o DELETE remove um registro de empréstimo, endpoint protegido exclusivo de uso de administrador.
Esta operação (DELETE) é sensível pois altera o histórico de movimentação da biblioteca. O acesso é restrito a administradores para evitar que usuários apaguem registros de pendências ou multas.

