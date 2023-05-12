import { useState, useEffect } from 'react';
import axios from 'axios';

function Landing(props) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    axios.get('/api/drinks')
      .then(res => {
        if (props.user) {
          const drink_ids = props.user.favorites.map(fav => fav._id);
          const filtered = res.data.map(drink => {
            return {
              ...drink,
              favorited: drink_ids.includes(drink._id)
            }
          });

          setDrinks(filtered);
        } else setDrinks(res.data);
      });
  }, []);

  const saveFavorite = (drink_id) => {

  };

  return (
    <main>
      <section className="hero">
        <h1>Pick Your Poison</h1>
        <p>The best drink sharing app on the market!</p>
      </section>

      <section className="drinks">
        {drinks.map(drink => (
          <div key={drink._id} className="drink">
            <h4>{drink.name}</h4>
            <p>Category: {drink.category}</p>
            <p>Ingredients: {drink.ingredients}</p>
            <p>Instructions: {drink.instructions}</p>
            <p>Added By: {drink.user.username}</p>
            {props.user && (
              drink.favorited ? <button disabled>Favorited</button> :
                <button onClick={() => saveFavorite(drink._id)}>Favorite This Drink</button>
            )}
          </div>
        ))}
      </section>
    </main>
  )
}

export default Landing;