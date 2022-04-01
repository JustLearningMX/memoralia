import { useEffect, useState, useCallback } from "react";
import styles from "../css/App.module.css";
import {
  requestApi,
  getAllCharacters  
} from "../utils/httpClient";
import { getRandomArbitrary } from '../utils/libraries';
import { Footer } from "./Footer";
import { GridCards } from "./GridCards";
import { Header } from "./Header";
import { Main } from "./Main";
import { CircularProgress, Box } from '@mui/material';

function App() {
  const [charactersImage, setcharactersImage] = useState(null); //Array with only all characters
  const [numberOfCards, setNumberOfCards] = useState(0); //Total of cards to play
  const [gridOfCards, setGridOfCards] = useState(null); //Numbers for paint a grid for Cards
  const [count, setCount] = useState(1); //Count to save characters in array
  const [randomListCharacter, setRandomListCharacter] = useState(null); //Array with random characters == numberOfCards
  const [isSave, setIsSave] = useState(false);
  const [jugar, setJugar] = useState(false);
  const [refresh, setRefresh] = useState(false);

  /****************************
   * GETTING DATA FROM API    
   * All Characters and their info  
   *  using useEffect & useCallback 
   ****************************/
  const getDataFromApi = useCallback(()=>{ //SE EJECUTA 1 VEZ
    
    const updatecharactersImage = (data2) => {
      setcharactersImage(data2);
    };

    const path = "/character";
    requestApi(path, "GET", false) //Function in ../utils/httpClient.js
      .then((data) => {
        if (data) { //Return a paginated characters info
          const page = data.info.pages;
          getAllCharacters(path, page) //Function in ../utils/httpClient.js
            .then((data2) => { //Save only characters from every page
              updatecharactersImage(data2);
            })
            .catch((e) => console.log(e));
        } else {
          console.log("Sin info: ", data);
        }
    });
  }, []);

  useEffect(() => { //SE EJECUTA 2 VECES
    
    if(charactersImage === null) //if have no characters      
      getDataFromApi()

  }, [getDataFromApi, charactersImage]);
  /**************************
   * END GET DATA FROM API
   **************************/


  /*************************************************************
   * GENERATE A RANDOM NUMBER 
   * Add this number like number for cards 
   *************************************************************/  
   useEffect(()=>{ //SE EJECUTA 1 VEZ

    const getNumbers = ()=>{          
      const rows = getRandomArbitrary(2, 6);
      const columns = getRandomArbitrary(2, 7);
      const randomNumber = (rows * columns)/2;

      if(randomNumber % 2 === 0){
        // console.log({rows, columns, randomNumber})
        return {rows, columns, randomNumber};
      } else {
        return getNumbers();
      }      
    };

    const numberOfCards = getNumbers();

    const updateNumberOfCards = ()=>{
      setNumberOfCards(numberOfCards.randomNumber);
      setGridOfCards({ rows: numberOfCards.rows, columns: numberOfCards.columns });
    };


    updateNumberOfCards();
    
  }, [refresh]);
  /*************************************************************
   * END GENERATE A RANDOM NUMBER
   *************************************************************/


  /*************************************************************
   * CREATE AN ARRAY WITH X RANDOM CHARACTERS | X = numberOfCards
   * From array charactersImage. We are going to use 
   * characters' "img" for cards. Using useEffect & useCallback 
   *************************************************************/
  const getInfoFromCharacters = useCallback((charImage)=>{ //SE EJECUTA DE ACUERDO AL NÚMERO RANDOM DE PERSONAJES

    const updateCount = (add) => {
      add ? setCount(count + 1) : setCount(count - 1);
    };

    const updateRandomListCharacter = (character) => {
      randomListCharacter ? setRandomListCharacter([...randomListCharacter, character[0]]) : setRandomListCharacter([character[0]]);
    };

    if(count > 0 && count <= numberOfCards) {

      //Get a random number for a character
      const totalChars = charImage.length;
      const min = 1;    
      const max = totalChars > 0 ? totalChars : 20;
      const randomCharacter = getRandomArbitrary(min, max); //Function in ../utils/libraries.js

      //If a character is already added in the new array so take other
      let isFound = false;
      if(randomListCharacter !== null){
        isFound = randomListCharacter.find((e) => {
          return e.id === randomCharacter ? true : false;
        })
      }

      if (!isFound) {
        const character = charImage.filter((char) => {
          return char['id'] === randomCharacter;
        })
        if(character) {
          updateRandomListCharacter(character); 
          updateCount(true);
        }
      }else{        
        updateCount(false); 
      };
    } else { //Ending saving characters in randomListCharacter
      setIsSave(true);
    }

  }, [count, numberOfCards, randomListCharacter]);

  useEffect(()=>{ //SE EJECUTA 2 VECES MÁS LOS X RANDOM CARDS

    if(charactersImage !== null) {
      getInfoFromCharacters(charactersImage);
    };     

  }, [charactersImage, getInfoFromCharacters]);
  /*************************************************************
   * END CREATE AN ARRAY WITH X RANDOM CHARACTERS | X = numberOfCards
   *************************************************************/


  /*************************************************************
   * REFRESH RANDOM CHARACTERS IN GRIDCARDS COMPONENT
   *************************************************************/
  useEffect(()=>{

    const updateRefresh = () => {
      setRefresh(false);
    };
    if(refresh)
      updateRefresh();

  }, [refresh, randomListCharacter]);
  /*************************************************************
   * END REFRESH RANDOM CHARACTERS IN GRIDCARDS COMPONENT
   *************************************************************/


  const componentAwaiting = isSave ? 
    <Main setJugar={setJugar} isSave={isSave}/> :
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-accent)' }}>
      <CircularProgress sx={{ color: '#FCECDD' }} size="4.5rem" thickness={5} />
    </Box>;

  return jugar  ? //&& randomListCharacter.length >= numberOfCards
   (      
    <div className={`${styles.App}`}>
      {/* {console.log('1. randomListCharacter:', randomListCharacter)};
      {console.log('2. count:', count)} */}
      <Header />
      <GridCards 
        randomListCharacter={randomListCharacter} 
        setRefresh={setRefresh} 
        setCount={setCount} 
        setRandomListCharacter={setRandomListCharacter}
        gridOfCards={gridOfCards}
      />
      <Footer />
    </div>
  )
  :
  (
    <div className={`${styles.App}`}>
      <Header />
      {componentAwaiting}
      <Footer />
    </div>
  );
}

export default App;
