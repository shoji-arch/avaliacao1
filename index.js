import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Importa o componente principal onde toda a lógica da avaliação será feita
import App from "./App";

// Opcional: Se estiver a usar um ficheiro CSS global ou utilitários locais
import "./styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
