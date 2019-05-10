import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component{

  componentWillMount(){
    //console.log('will mount');
  }

  componentDidMount(){
    //console.log('did mount');
    this._getMovies();
  }

  state = {}

  _getMovies = async () => {
    await this._callApi();
    /*
    const movieList = await this._callApi();
    this.setState({
      movies: movieList
    })
    */
  }

  _callApi = () => {
    fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(res => res.json())
    /*
    .then(function(json) {
      console.log(json.data.movies)
      return json.data.movies
    })
    */
    //.then(json => json.data.movies)
    .then(json => this.setState({
      movies: json.data.movies
    }))
    .catch(err => console.log(err));
  }

  _renderMovie = () => {
    const movies = this.state.movies.map(movie => {
      //console.log(movie);
      return <Movie 
        key={movie.id} 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies;
  }

  render() {
    return(
      <div className={this.state.movies ? "App" : "App-Loading"}>
        {this.state.movies ? this._renderMovie() : 'Loading'}
      </div>
    )
  }
}

export default App;