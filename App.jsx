import React, { useState } from 'react';

// 1.2 MODELAGEM DOS DADOS MOCKADOS (Pelo menos 4 registros por entidade) [cite: 15, 18]
const LIVROS_MOCK = [
  { id: 1, titulo: "Cálculo Diferencial", autor: "James Stewart", area: "Exatas", disponivel: true },
  { id: 2, titulo: "Antropologia Estrutural", autor: "Claude Lévi-Strauss", area: "Humanas", disponivel: true },
  { id: 3, titulo: "Princípios de Bioquímica", autor: "Lehninger", area: "Biológicas", disponivel: false },
  { id: 4, titulo: "Introdução à Economia", autor: "N. Gregory Mankiw", area: "Humanas", disponivel: true },
];

const EMPRESTIMOS_MOCK = [
  { id: 101, aluno: "Ana Silva", livroId: 3, status: "Ativo" },
  { id: 102, aluno: "Bruno Costa", livroId: 1, status: "Pendente" },
  { id: 103, aluno: "Carla Souza", livroId: 4, status: "Concluído" },
  { id: 104, aluno: "Daniel Oliveira", livroId: 2, status: "Ativo" },
];

// 1.3 COMPONENTES FUNCIONAIS (Recebem dados via props) [cite: 25, 26]

// Componente 1: Exibe dados do Livro
const BookCard = ({ livro }) => (
  <div className="p-4 border border-gray-200 rounded shadow-sm bg-white">
    <h3 className="font-bold text-lg text-blue-900">{livro.titulo}</h3>
    <p className="text-sm text-gray-600">Autor: {livro.autor}</p>
    <p className="text-xs font-semibold uppercase mt-2">{livro.area}</p>
  </div>
);

// Componente 2: Exibe dados do Empréstimo
const LoanRow = ({ emprestimo }) => (
  <li className="flex justify-between p-2 border-b text-sm">
    <span>{emprestimo.aluno}</span>
    <span className={`font-medium ${emprestimo.status === 'Ativo' ? 'text-green-600' : 'text-gray-500'}`}>
      {emprestimo.status}
    </span>
  </li>
);

export default function App() {
  // GERENCIAMENTO DE ESTADO (useState para interação) [cite: 29]
  const [busca, setBusca] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Lógica de filtro (Interação do usuário) [cite: 29]
  const livrosFiltrados = LIVROS_MOCK.filter(livro => 
    livro.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  // Manipulação do formulário e feedback visual [cite: 28]
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem("Solicitação de reserva enviada com sucesso!");
    e.target.reset(); // Limpeza de campos [cite: 28]
    setTimeout(() => setMensagem(""), 3000); 
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen font-sans">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Sistema de Biblioteca Acadêmica</h1>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        
        {/* COMPONENTE DE LISTAGEM [cite: 27] */}
        <section>
          <h2 className="text-xl font-semibold mb-4 italic">Acervo Acadêmico</h2>
          <input 
            type="text" 
            placeholder="Pesquisar livro..." 
            className="w-full p-2 mb-6 border rounded shadow-inner"
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="grid gap-4">
            {livrosFiltrados.map(l => <BookCard key={l.id} livro={l} />)}
          </div>
        </section>

        <aside className="space-y-10">
          {/* COMPONENTE DE FORMULÁRIO [cite: 28] */}
          <section className="bg-white p-6 rounded-lg border shadow-md">
            <h2 className="text-lg font-bold mb-4">Nova Reserva</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nome do Aluno (Texto)</label>
                <input type="text" required className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Área de Interesse (Seleção)</label>
                <select className="w-full p-2 border rounded">
                  <option value="exatas">Ciências Exatas</option>
                  <option value="humanas">Ciências Humanas</option>
                  <option value="biologicas">Ciências Biológicas</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-bold hover:bg-blue-800 transition">
                Solicitar Livro
              </button>
            </form>
            {/* Feedback visual [cite: 28] */}
            {mensagem && <p className="mt-4 p-2 bg-green-100 text-green-800 text-center rounded text-sm font-medium">{mensagem}</p>}
          </section>

          {/* Listagem da segunda entidade [cite: 25] */}
          <section>
            <h2 className="text-lg font-bold mb-2">Status de Empréstimos</h2>
            <ul className="bg-white rounded border">
              {EMPRESTIMOS_MOCK.map(e => <LoanRow key={e.id} emprestimo={e} />)}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}