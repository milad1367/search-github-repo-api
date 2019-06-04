import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { async } from 'q';


function GithubSearchRepo() {
  const [data, setData] = useState([]);
  const [query,setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=> {
      if(!query) {
        setData([]);
      }
      if(query) {
        const fetchData = async () => {
          setIsLoading(true);
          const result = await axios(
            `https://api.github.com/search/repositories?client_id=38c7c059e19a5727a298&client_secret=49498106f79f65fc73a2520087b68a40f525b3c8&q=${query}`,
          );
          setData(result.data.items);
          setIsLoading(false);
        }
      fetchData();
      
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