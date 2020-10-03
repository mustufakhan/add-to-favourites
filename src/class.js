import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


class App extends React.Component {
  constructor(){
    super();
    this.state={
      data:[],
      input:''
    }
  }

  componentDidMount() {
    fetch("https://nl-static-site-assets.s3.ap-south-1.amazonaws.com/reports.json")
    .then(res=> res.json())
    .then(res=>{
      console.log(res)
      this.setState({data:res.items})
    })
  
  }

  change = (e) => {
    this.setState({
      input:e.target.value
    })
  }

  render(){

    const filtered = this.state.data.filter(val => {
      return val.item.headline.toString().toLowerCase().indexOf(this.state.input.toString().toLowerCase()) !== -1;
    });

    return (
      <div className="App">
        <div className="search" onSubmit={this.submit}>
          <form className="search-form" >
            <input type="text" placeholder="Search for news, authors, categories and more.." value={this.state.input} onChange={this.change} />
            <input type="submit" />
          </form>
        </div>    
      <div className="box">
        {
          filtered.map((res, i) =>
        
            <div className="card">
          <FontAwesomeIcon icon={faHeart} className="icon" size="3x"/>
              <img src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" alt="Denim Jeans" width="100%" height="200px" />
              <h2>{res.item.headline}</h2>
              <a className="price" href={res.story.url}>Url link: {res.story.url}</a>
              <p>Author: {res.story['author-name']}</p>
              <p><button id={res.id}>Add to Favourite</button></p>
            </div>

          )
        }
         </div>  
      </div>

  );
  }
}

export default App;

