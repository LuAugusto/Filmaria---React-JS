import React,{useEffect,useState} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './home.css';

function Home() {

  const [filmes,setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes(){
      const responses = await api.get('/r-api/?api=filmes')
      setFilmes(responses.data);
    }

    loadFilmes();
  },[]);

  return (
   <div className="container">
     <div className="lista-filmes">
        {filmes.map((filme) => {
          return(
            <article key={filme.id}>
              <strong>{filme.nome}</strong>
              <img src={filme.foto} alt={filme.nome}/>
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
     </div>
   </div>
  );
}

export default Home;
