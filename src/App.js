import { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import { Nutrition } from './Nutrition';
import { LoaderPage } from './LoaderPage';
import Swal from 'sweetalert2';


function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = "8f7cf633";
  const APP_KEY = "12cc09660b22059c90771dd7b38a6ee1";
  const APP_URL = "https://api.edamam.com/api/nutrition-details";

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
      console.log(data)
    } else {
      setStateLoader(false);
      Swal.fire("Ingredients entered incorrectly!");
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])

return (
    <div>
    {stateLoader && <LoaderPage/>}

    <h1>Nutrition Analysis</h1>
    <form onSubmit={finalSearch}>
      <input
        placeholder="Search..."
        onChange={myRecipeSearch}
      />
      <button type="submit" className='btn'>Search</button>
    </form>
    <div className="parContainer">
      {
        myNutrition && <p className='par'>{myNutrition.calories} total kcal</p>
      }
       {
        myNutrition && <p className='par'>{myNutrition.totalWeight.toFixed(2)} total gramms</p>
      }
      {
        myNutrition && Object.values(myNutrition.totalNutrients)
          .map(({ label, quantity, unit}, index) =>
            <Nutrition
              key={index}
              label={label}
              quantity={quantity}
              unit={unit}
            />
          )
      }
    </div>
  </div>
  );
}

export default App;


// https://api.edamam.com/api/nutrition-details?app_id=4e1c9e3c&app_key=%207f26ffebc9e182eb8ef5e0a528b49ac3
// https://api.edamam.com/api/nutrition-details
// MY_ID - 4e1c9e3c
// MY_KEY - 7f26ffebc9e182eb8ef5e0a528b49ac3	

// 2nd APP_ID - 8f7cf633
// 2ND APP_KEY - 12cc09660b22059c90771dd7b38a6ee1	
// 2ND APP_URL -  https://api.edamam.com/api/nutrition-details