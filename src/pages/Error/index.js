import {Link} from 'react-router-dom';
import './style.css';

export default function Error(){
  return(
    <div className="not-found">
      <h1>404</h1>
      <h3>Essa página não existe!</h3>
      <Link to="/">Veja todos os filmes!</Link>
    </div>
  );
}

