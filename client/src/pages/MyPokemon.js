import React from 'react'
import { Statistic } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import '../App.css'

function MyPokemon() {

    // Fetch pokemons from db
    const { loading, data } = useQuery(FETCH_POKEMONS_QUERY)

    return (
        <div>
            <div className="customHeadbar">
                <Statistic color='grey'>
                    <Statistic.Value> 
                    {
                        loading ? (<div></div>) : (data.getPokemons.length)
                    } 
                    </Statistic.Value>
                    <Statistic.Label>Pokemon catched</Statistic.Label>
                </Statistic>
            </div>

            {
                loading ? 
                ( <h1>Loading my pokemons...</h1> ) :
                ( data.getPokemons && data.getPokemons.map(
                    pokemon =>
                    <div className="customList">
                        <li className="customListLeft">{pokemon.pokemonName.charAt(0).toUpperCase() + pokemon.pokemonName.slice(1)}</li> 
                        <li className="customListLeft">&nbsp;( {pokemon.name} )</li>
                        <li className="customListRight"> Release </li>
                    </div>
                ) )
            }
        </div>
    )
}

// Fetch query
const FETCH_POKEMONS_QUERY = gql `
 {
    getPokemons {
     id 
     name 
     pokemonName
    }
 }
`

export default MyPokemon