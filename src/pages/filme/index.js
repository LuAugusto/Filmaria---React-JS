import {useEffect,useState} from 'react';
import './filme-info.css';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify';

export default function Filme(){

  const {id} = useParams();
  const history = useHistory();
  const [filme, setFilme] = useState([]);
  const [load,setLoad] = useState([true]);

  useEffect(() => {

    async function loadFilme(){
      const responses = await api.get(`/r-api/?api=filmes/${id}`);
      if(responses.data.length === 0){
        //tentou acessar com id que não existe
        history.replace('/');
        return;
      }
      setFilme(responses.data);
      setLoad(false);
    }

    loadFilme();

    return () => {
      console.log('Componente desmontado');
    }


    //Ao passar o id no parênteses do hook, toda alteração que houver no id, o hook executa novamente
  },[history, id]);

  function salvaFilme(){
    const minhaLista = localStorage.getItem('filmes');
    
    let filmesSalvos = JSON.parse(minhaLista) || [];

    //se tiver algum filme salvo com esse mesmo id
    //some devolve true ou falso
    const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id);

    if(hasFilme){
      toast.info('Você já possue esse filme!')
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!')
  }

  if(load){
    return (
      <div className="filme-info">
          <h1>Carregando Filme...</h1>
      </div>
    )
  }

  return(
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome}/>

      <h3>Sinopose</h3>
      {filme.sinopse}
      <div>
        <button onClick={salvaFilme}>Salvar</button>
        <button>
          <a target='blank' href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
              Trailer
          </a>
        </button>
      </div>
    </div>
  )
}