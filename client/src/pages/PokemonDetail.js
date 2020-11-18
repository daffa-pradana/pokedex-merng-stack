import React, { Component } from 'react'

import '../App.css'

class PokemonDetail extends Component {

    // Default state
    state = {
        loading: true,
        pokemonName: null,
        pokemonGivenName: null,
        pokemonTypes: [],
        pokemonMoves: [],
        pokemonImage: null,
    }

    // Fetch pokemon details
    async componentDidMount() {
        // Fetch URL
        const pathname = window.location.pathname.split("/")

        // Pokemon name
        const nameData = pathname[2]
        const capNameData = nameData.charAt(0).toUpperCase() + nameData.slice(1)

        // Fetch details
        const url1 = "https://pokeapi.co/api/v2/pokemon/" + nameData
        const res1 = await fetch(url1)
        const dataDetails = await res1.json()

        // Pokemon image
        const pokeID = dataDetails.id
        const imageData = "https://pokeres.bastionbot.org/images/pokemon/" + pokeID + ".png"
        
        // Pokemon types
        const typesData = dataDetails.types.map(
            type => type.type.name
        )

        // Pokemon moves
        const movesData = dataDetails.moves.slice(0, 5).map(
            move => move.move.name
        )
        
        // Set state
        this.setState({ 
            loading: false,
            pokemonName: capNameData,
            pokemonGivenName: "Unnamed",
            pokemonTypes: typesData,
            pokemonMoves: movesData,
            pokemonImage: imageData
        })
    }

    // Render
    render() {

        // Return
        return (
            <div className="customSegment">
                <div className="customSegmentDetails">
                    <img className="customSegmentImg"
                        src={this.state.pokemonImage}
                        alt="pokemon"/>
                </div>
                <div className="customSegmentDetails">
                    <h1>{this.state.pokemonName}</h1>
                    <h3>{this.state.pokemonGivenName}</h3>
                    <p>Types: {this.state.pokemonTypes[0]}, {this.state.pokemonTypes[1]}</p>
                    <p>Moves: 
                        {
                            this.state.pokemonMoves.map(
                                move => " " + move + ", "
                            )
                        }
                    </p>
                </div>
            </div>
        )

    }

}

export default PokemonDetail