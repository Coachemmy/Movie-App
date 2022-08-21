
import './App.css';
import React, {useState, useEffect} from 'react'
import MovieBox from './MovieBox.js' 
import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'



const API_SEARCH ="https://api.themoviedb.org/3/search/movie?api_key=ee4dd7300928a3a05e99619f20c7dcb5&query"
const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=ee4dd7300928a3a05e99619f20c7dcb5"
function App() {
  
  
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data =>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])


  const searchMovie = async(e) => {
    e.preventDefault();
    console.log('searching')
    try{
      const url = `https://api.themoviedb.org/3/search/movie?api_key=ee4dd7300928a3a05e99619f20c7dcb5&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);

    }
     
  
    }

    const changeHandler=(e)=> {
      setQuery(e.target.value);

  }

  return (
    <>
    <Navbar bg = 'dark' expand= 'lg' variant = 'dark'> 
      <Container fluid>
        <Navbar.Brand href= '/home'>EmmyB<span style={{color:'red'}}>MovieAPP</span> </Navbar.Brand>
        <Navbar.Brand href= ''>Trending</Navbar.Brand>
        <Navbar.Toggle aria-controls = 'navbarScroll'></Navbar.Toggle>
        <Navbar.Collapse id = 'navbarScroll'>
          <Nav className = 'me-auto my-2 my-lg-3' 
          style = {{maxHeight:'100px'}} 
          navbarScroll></Nav> 

          <Form className = 'd-flex' onSubmit = {searchMovie}>
            <FormControl type = 'search' 
                        placeholder = 'Movie Search'
                        className = 'me-2' 
                        aria-lable = 'search' 
                        name = 'query' 
                        value={query} onChange={changeHandler}
                        >
              </FormControl>
              
            <Button variant = 'secondary' type = 'submit'>Search</Button>
          </Form>


        </Navbar.Collapse>
        
      </Container>
    </Navbar>


    <div>
      {movies.length > 0 ? (

        <div className = 'container'>
        <div className = 'grid'>
        {movies.map((moviesReq) => 
        <MovieBox key = {moviesReq.id} {...moviesReq}/>)}
        </div>
      </div>

      ) : (
        <h2>Sorry 😭 No Movies Found</h2>
      )}

    
    </div>
    </>
  )
};

export default App;
