import React, { useState , useEffect} from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() =>{
    api.get('repositories').then( response =>{
      setRepository(response.data)
    });
  },[]);

  async function handleAddRepository() {
    const object = {
      title: `Desafio Node.js ${Date.now()}`, 
	    url: "http://github.com/", 
	    techs: ["Node.js", "..."]
    };
    api.post('repositories',object).then( response =>{
      setRepository([...repositories,response.data])
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then( response =>{
      console.log('handleRemoveRepository response ',response);
      if(response.status === 204){
        const repositoryIndex = repositories.findIndex(repository => repository.id === id);
        repositories.splice(repositoryIndex,1);
        setRepository([...repositories]);
      }

    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        
      )}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
