from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import jwt # Certifique-se de ter 'PyJWT' instalado
from datetime import datetime, timedelta

app = FastAPI()

# --- CONFIGURAÇÕES JWT (Tarefa 2.2) ---
SECRET_KEY = "biblioteca_secreta"
ALGORITHM = "HS256"

# --- MODELAGEM (Tarefa 2.2) ---
class Livro(BaseModel):
    id: int
    titulo: str
    autor: str
    area: str
    disponivel: bool = True

class Emprestimo(BaseModel):
    id: int
    livro_id: int
    aluno: str
    status: str

class LoginRequest(BaseModel):
    username: str
    password: str

# --- PERSISTÊNCIA EM MEMÓRIA (Tarefa 2.2) ---
livros_db = [
    {"id": 1, "titulo": "Cálculo Diferencial", "autor": "James Stewart", "area": "Exatas", "disponivel": True},
    {"id": 2, "titulo": "Antropologia Estrutural", "autor": "Lévi-Strauss", "area": "Humanas", "disponivel": True}
]
emprestimos_db = []

# --- LÓGICA DE SEGURANÇA JWT (Tarefa 2.2) ---

@app.post("/login")
def login(dados: LoginRequest):
    # Credenciais simples para a prova
    if dados.username == "admin" and dados.password == "1234":
        expiracao = datetime.utcnow() + timedelta(minutes=30)
        payload = {"sub": dados.username, "exp": expiracao}
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Credenciais inválidas")

def verificar_token_jwt(authorization: str = Header(...)):
    try:
        # Formato esperado: "Bearer <token>"
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Token JWT inválido ou expirado")

# --- ENDPOINTS ENTIDADE: LIVRO ---

@app.get("/livros", response_model=List[Livro])
def listar_livros():
    return livros_db

# Endpoint protegido: Apenas admin pode adicionar livros (Exigência 2 protegidos)
@app.post("/livros", status_code=201, dependencies=[Depends(verificar_token_jwt)])
def adicionar_livro(livro: Livro):
    livros_db.append(livro.dict())
    return livro

# --- ENDPOINTS ENTIDADE: EMPRESTIMO ---

@app.get("/emprestimos", response_model=List[Emprestimo])
def listar_emprestimos():
    return emprestimos_db

@app.post("/emprestimos", status_code=201)
def criar_emprestimo(emp: Emprestimo):
    emprestimos_db.append(emp.dict())
    return emp

# Endpoint protegido: Exigência do enunciado (Tarefa 2.2)
@app.delete("/emprestimos/{emp_id}", dependencies=[Depends(verificar_token_jwt)])
def cancelar_emprestimo(emp_id: int):
    global emprestimos_db
    inicial_len = len(emprestimos_db)
    emprestimos_db = [e for e in emprestimos_db if e["id"] != emp_id]
    
    if len(emprestimos_db) == inicial_len:
        raise HTTPException(status_code=404, detail="Empréstimo não encontrado")
    
    return {"detail": f"Empréstimo {emp_id} removido com sucesso"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)