import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


class App extends React.Component {
  constructor(){
    super();
    this.state={
      data:[],
      input:'',
      favId:[]
    }
  }

  componentDidMount() {
    fetch("https://nl-static-site-assets.s3.ap-south-1.amazonaws.com/reports.json")
    .then(res=> res.json())
    .then(res=>{
      console.log(res)
      this.setState({data:res.items})
    })

    this.setState({
      favId:JSON.parse(localStorage.getItem('fav'))
    })
   
  }

  change = (e) => {
    this.setState({
      input:e.target.value
    })
  }

  addFavorite = (res, e) =>{
    e.preventDefault();
    const id =  e.target.id;
    const {favId} = this.state;

    if(favId === undefined || favId === null){
      this.setState({
        favId:[id]
      })

    }
    else{
      if(favId.indexOf(id) === -1){
          this.setState({
        favId:[...favId, id]
      })
      }
    }
    
    localStorage.setItem('fav', JSON.stringify(favId));
  }

  remove = (res, e) =>{
    e.preventDefault();
    const id =  e.target.id;
    const {favId} = this.state;

    const index = favId.indexOf(id);
      if (index > -1) {
      favId.splice(index, 1);
      }

    this.setState({
      favId: favId
    })

    localStorage.setItem('fav', JSON.stringify(favId));
  }


  render(){
    const {data, input, favId} = this.state;

    const filtered = data.filter(val => {
      return val.item.headline.toString().toLowerCase().indexOf(input.toString().toLowerCase()) !== -1;
    });

    return (
      <div className="App">
        <div className="search" onSubmit={this.submit}>
          <form className="search-form" >
            <input type="text" placeholder="Search for news, authors, categories and more.." value={this.state.input} onChange={this.change} />
          </form>
        </div>    
        {favId.length > 0 ? <div className="fav">FAVOURITES : {favId.length}</div> :null    }
        <div className="box">
          { filtered.map((res, i) =>
            <div className="card">
              { favId && favId.includes(res.id) ?
               <FontAwesomeIcon
                 icon={faHeart}
                 className="icon"
                 size="3x"/>
                 : null
              }
              <img src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" alt="Denim Jeans" width="100%" height="200px" />
              <h2>{res.item.headline}</h2>
              <a className="price" href={res.story.url}>Url link: {res.story.url}</a>
              <p>Author: {res.story['author-name']}</p>
              <p>
                { favId && favId.includes(res.id) ? 
                  <button 
                    id={res.id}
                    onClick={(e)=> this.remove(res, e)}>
                    Remove from Favourite
                  </button> : 
                  <button 
                    id={res.id}
                    onClick={(e)=> this.addFavorite(res, e)}>
                    Add to Favourite
                  </button>
                }
              </p>
            </div>
           )}
        </div>  
      </div>

  );
  }
}

export default App;

