import React, {useState, useEffect} from 'react';
import { search } from '../Utils/AxiosSerach'

function GithubSearchRepo() {
  const [data, setData] = useState([]);
  const [query,setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getData = async val => {
    setIsLoading(true);
    const res = await search(
      `https://api.github.com/search/repositories?client_id=38c7c059e19a5727a298&client_secret=49498106f79f65fc73a2520087b68a40f525b3c8&q=${val}`
    );
    if(res) {
      setData(res.items);
      setIsLoading(false);
    }
  };
  useEffect(()=> {
      if(!query) {
        setData([]);
        setIsLoading(false);
      }
      if(query) {
        getData(query);   
      }

  }, [query]);
    return(
      <div>
          <input 
            value={query}
            onChange={(e) => {e.preventDefault();
              setQuery(e.target.value);}}
          />
          {isLoading ? (
            <div>Loading ...</div>):
            (
              <ul>
                  {data.map(item => (
                      <li key={item.id}>
                          name: <span> {item.name}</span> <br/>
                          author: <span> {item.owner.login}</span> <br/>
                          link: <span> {item.html_url}</span> <br/>
                      </li>
                  ))}
              </ul>
            )}
      </div>
    )
}
export default GithubSearchRepo;