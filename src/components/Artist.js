import React from 'react'


// Using destructure to pass in the state from App component instead of using props
// Inside of artist in the state we have plenty of data - we can destructure those too
const Artist = ({artist}) => {

    // Problem here -> images will rendered null. 
    // The fix is: How does this work ?????
    // Because we set artist: null in the state so that is the defaul object.
    // So when it comes to grabbing images it is like saying artist.images = null.images = not valid Javascript
    // SAFEGUARD SOLUTION: by returning null if there is nothign there = nothing will be rendered.

    if(!artist)  return null
    const { images, name, followers, genres } = artist;

    const imageStyle = {
        width: 200,
        height: 200,
        borderRadius: 100,
        objectFit: "Cover"
    }

    return (

        <div>
            <h3>{name}</h3>
            <p>{followers.total} Followers</p>
            <p>Genre: {genres.join(', ')}</p>
            <img style={imageStyle} 
            src={images[0].url} 
            alt="profile" 
            />
        </div>
    )


}

export default Artist