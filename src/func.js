import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [fav, setFav] = useState(false);


 const change = (e)=>{
  setInput(e.target.value)
  const filterdata = data.filter(data=> {return data.item.headline.toLowerCase().includes(input.toLowerCase())
  })
  setData(filterdata)

   }
 
 const favourites = (e)=>{
  e.preventDefault();
  const id = e.target.id;
  setFav(!fav)

 }
   useEffect(() => {

    const fetchData = async () => {
      const response = await fetch("https://nl-static-site-assets.s3.ap-south-1.amazonaws.com/reports.json");
      const data = await response.json();
      setData(data.items);
    };

    fetchData();
  }, []);


   useEffect(()=>{
    const filtered = data.filter(val => {
      return val.item.headline.toString().toLowerCase().indexOf(input.toString().toLowerCase()) !== -1;
    });

   },[])
  return (
    <div>
    <div className="search">
        <input type="text" placeholder="Search for news, authors, categories and more.."  value={input} onChange={change}  />
        <input type="submit" value="Submit"/>
  
    </div>    

      {
        filter
        .map((res, i) =>
          <div className="card">
          {fav && <FontAwesomeIcon icon={faHeart} className="icon" size="3x"/>}
            <img src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" alt="Denim Jeans" width="100%" height="200px" />
            <h2>{res.item.headline}</h2>
            <a className="price" href={res.story.url}>Url link: {res.story.url}</a>
            <p>Author: {res.story['author-name']}</p>
            <p><button id={res.id} onClick={favourites}>Add to Favourite</button></p>
          </div>
        )
      }
    </div>
  );
}

export default App;
