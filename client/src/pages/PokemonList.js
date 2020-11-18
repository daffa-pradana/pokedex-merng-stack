import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import '../App.css'

class PokemonList extends Component {
    
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Default state
    state = {
        loading: true,
        pokemonLists: null,
        isCatchingNow: false,
        isPokemonCatched: null,
        pokemonCatched: '',
        pokemonCatchedName: '',
    }

    // Fetch pokemon data
    async componentDidMount() {
        const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50"
        const res = await fetch(url)
        const data = await res.json()
        this.setState({ pokemonLists: data.results, loading: false })
    }

    // Change handle
    handleChange(event) {
        this.setState({pokemonCatchedName: event.target.value})
    }

    // Submit handle
    handleSubmit(event) {
        event.preventDefault()
    }

    // Render
    render() {

        // Catch a pokemon
        const catchPokemon = async (name) => {
            // Catch probability
            const prob = await Math.random() <= 0.5
            if (prob) {
                this.setState({ isCatchingNow: true ,isPokemonCatched: true, pokemonCatched: name })
            } else {
                this.setState({ isCatchingNow: true, isPokemonCatched: false })
            }
        }

        // Disable light box
        const disableLightBox = async () => {
            this.setState({ isCatchingNow: false })
        }

        // List of pokemons
        return (
            <div>
                {
                    !this.state.isCatchingNow ?
                    (<div> </div>) : 
                    (<div className="customLightBox">
                        { 
                            this.state.isPokemonCatched ?
                            (
                                <Fragment>
                                    <h1> Gotcha! </h1>
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="hidden" value={this.state.pokemonCatched} />
                                        <input type="text"
                                                placeholder="Give your pokemon a name.."
                                                value={this.state.pokemonCatchedName}
                                                onChange={this.handleChange}
                                        />
                                        <button type="submit" onClick={() => disableLightBox()}> Save pokemon</button>
                                    </form>
                                </Fragment>
                            ) :
                            (   
                                <Fragment>
                                    <h1> Uh oh! </h1>
                                    <button onClick={() => disableLightBox()}> Try again </button>
                                </Fragment>
                            ) 
                        }
                    </div>) 
                }

                {this.state.loading || !this.state.pokemonLists ? 
                (<div>Loading..</div>) :
                (<div>
                    {
                        this.state.pokemonLists.map(
                            pokemon =>
                            <div className="customList" key={pokemon.name}>
                                <Link to={"/pokemondetail/"+pokemon.name} >
                                    <li className="customListLeft"> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} </li>
                                </Link>
                                <li className="customListRight" onClick={() => catchPokemon(pokemon.name)}> Catch </li>
                            </div>
                        )
                    }
                </div>)}
            </div>
        )
    }
}

const SAVE_POKEMON = gql `
    mutation savePokemon(
        $name: String!
        $pokemonName: String!
    ) {
        savePokemon(
            pokemonInput: {
                name: $name
                pokemonName: $pokemonName
            }
        ) {
            id name pokemonName
        }
    }

`

export default PokemonList