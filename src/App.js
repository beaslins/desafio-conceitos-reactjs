import React from "react";
import api from "./services/api";

import "./styles.css";
import { useState, useEffect } from "react";

function App() {
  // listar projetos
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRepositories(response.data)
    })
  }, []);
  
  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: 'Novo',
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
      techs: ['node', 'reactjs', 'react native']
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    try {

      await api.delete(`repositories/${id}`, {});
      setRepositories(repositories.filter(repositories => repositories.id !== id))

    } catch (error) {
      alert('Erro ao deletar')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
