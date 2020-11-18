import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function MenuBar() {
    // Path
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'pokemonlist' : pathname.substr(1)

    // Use State
    const [activeItem, setActiveItem] = useState(path)

    // Set state
    const handleItemClick = (e, { name }) => setActiveItem(name)

    // Menu Bar
    return (
        <Menu pointing secondary size="massive" color="grey">
            <Menu.Menu position='left'>
                <Menu.Item
                name='pokemonlist'
                active={activeItem === 'pokemonlist'}
                onClick={handleItemClick}
                as={Link}
                to="/"
                />
                <Menu.Item
                name='mypokemon'
                active={activeItem === 'mypokemon'}
                onClick={handleItemClick}
                as={Link}
                to="/mypokemon"
                />
            </Menu.Menu>
        </Menu>
    )
}

// Export
export default MenuBar