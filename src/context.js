import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${url}${searchTerm}`);
      const data = await resp.json();
      const { drinks } = data;
      if (drinks) {
        const newDrinks = drinks.map((drink) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            drink;
          return {
            id: idDrink,
            name: strDrink,
            img: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newDrinks);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [searchTerm, fetchData]);
  return (
    <AppContext.Provider
      value={{ setSearchTerm, searchTerm, loading, setLoading, cocktails }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
