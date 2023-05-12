import { useState, useEffect } from 'react';
import axios from 'axios';

function Landing({ user }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    axios.get('/api/drinks')
      .then(({ data }) => {

        if (user) {
          const drink_ids = user.favorites.map(fav => fav._id);
          const filtered = data.map(drink => ({
            ...drink,
            favorited: drink_ids.includes(drink._id)
          }));

          setDrinks(filtered);
        } else setDrinks(data);
      });
  }, [user]);

  const saveFavorite = async (drink) => {

  }

  return (
    <main>
      <div className="hero text-center">
        <h1>The Ultimate Drink Sharing App</h1>
        {!user && <p>Log in to save your favorites!</p>}
      </div>

      <div className="drinks">
        {drinks.map(drink => (
          <div key={drink._id} className="drink">
            <h3>{drink.name}</h3>
            <p>Category: {drink.category}</p>
            <p>Ingredients: {drink.ingredients}</p>
            <p>Instructions: {drink.instructions}</p>
            {user && (
              drink.favorited ? (
                <button disabled>Favorited</button>
              ) : <button onClick={() => saveFavorite(drink)}>Save To Favorites</button>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Landing;