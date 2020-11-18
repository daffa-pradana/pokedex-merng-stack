import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import Jumbotron from './components/Jumbotron'
import MenuBar from './components/MenuBar'
import PokemonList from './pages/PokemonList'
import MyPokemon from './pages/MyPokemon'
import PokemonDetail from './pages/PokemonDetail';

function App() {
  return (
    <Router>
      <Container>
        <Jumbotron />
        <MenuBar />
        <Route exact path='/' component={ PokemonList }/>
        <Route exact path='/mypokemon' component={ MyPokemon }/>
        <Route exact path='/pokemondetail/:name' component={ PokemonDetail }/>
      </Container>
    </Router>
  );
}

export default App;
