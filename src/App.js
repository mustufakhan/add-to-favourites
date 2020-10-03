import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


class App extends React.Component {
  constructor(){
    super();
    this.state={
      data:[],
      input:''  ,
      favorites:[]
    }
  }

  componentDidMount() {
    fetch("https://nl-static-site-assets.s3.ap-south-1.amazonaws.com/reports.json")
    .then(res=> res.json())
    .then(res=>{
      console.log(res)
      this.setState({data:res.items})
    })

    // this.setState({
    //   favId:JSON.parse(localStorage.getItem('fav'))
    // })
   
  }

  change = (e) => {
    this.setState({
      input:e.target.value
    })
  }

  addFavorite = (res, id) => {
    const { favorites } = this.state;

    if (!favorites.some(alreadyFavorite => alreadyFavorite.id == res.id)) {
      this.setState({
        favorites: [...favorites, res.id]
      });
    }
    console.log("favorites",favorites)
  };

  // add = (res ,id) =>{
  //   const {favId} = this.state;

  //   if(favId == null){
  //     this.setState({
  //       favId:id
  //     })
  //   }
  //   else{
  //     this.setState({
  //       favId:[...favId, id]
  //     })
  //   }

  //   localStorage.setItem('fav', JSON.stringify(favId));
  // }

  // remove = (id) =>{
  //   const {favId} = this.state;

  //   const index = favId.indexOf(id);
  //     if (index > -1) {
  //     favId.splice(index, 1);
  //     }

  //   this.setState({
  //     favId: favId
  //   })

  //   localStorage.setItem('fav', JSON.stringify(favId));
  // }


  render(){
    const {data, input, fav, favorites} = this.state;

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
      <div className="box">
        { filtered.map((res, i) =>
          <div className="card">
          { favorites.includes(res.id) && <FontAwesomeIcon icon={faHeart} className="icon" size="3x"/>}
          <img src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" alt="Denim Jeans" width="100%" height="200px" />
          <h2>{res.item.headline}</h2>
          <a className="price" href={res.story.url}>Url link: {res.story.url}</a>
          <p>Author: {res.story['author-name']}</p>
          <p>
            {<button id={res.id} onClick={(e)=> this.addFavorite(res, e.target.id)}>Add to Favourite</button>}
          </p>
          </div>
        )}
         </div>  
      </div>

  );
  }
}

export default App;

