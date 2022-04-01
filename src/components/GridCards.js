import styles from '../css/GridCards.module.css';
import { Card, CardMedia, Box } from '@mui/material';
import { getRandomArbitrary } from '../utils/libraries';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './Button';

export function GridCards( { randomListCharacter, setRandomListCharacter, setRefresh, setCount, gridOfCards }) { 

    const [ duplicatedCharactersList, setDuplicatedCharactersList ] = useState(null);
    const [tableGridCards, setTableGridCards] = useState(null);
    const [allShuffleCards, setAllShuffleCards] = useState(null);
    // if(duplicatedCharactersList) console.log('duplicatedCharactersList', duplicatedCharactersList);
    // console.log('randomListCharacter', randomListCharacter);

    // const msg = randomListCharacter.length > 0 ? {'error' : null, randomListCharacter} : {'error' : true, message: 'Array de personajes vacío'};
    const numCards = randomListCharacter ? randomListCharacter.length * 2: null;
    // const factors = getNumbersFactorsOfANumber(numCards, 1);

    const randomListCharacterReverse = useCallback( ()=>{
        
        const newObjCharacter = [];

        randomListCharacter.map((character)=>{
            const newCharacter = {};

            for (const key in character) {
                if(key === 'id') {
                    newCharacter.id = character.id * 1000;
                    newCharacter.oldid = character.id;                    
                } else {
                    newCharacter[key] = character[key]
                }
            }
            newObjCharacter.push(newCharacter);
            return '';
        });

        return newObjCharacter;

    }, [randomListCharacter]); 

    useEffect(()=>{

        if(randomListCharacter){
            const newObjCharacter = randomListCharacterReverse();

            newObjCharacter.length > 0 
                ? setDuplicatedCharactersList([...randomListCharacter, ...newObjCharacter]) 
                : setDuplicatedCharactersList([]) ;
        }

    },[randomListCharacter, randomListCharacterReverse]);

   /*************************************************************
   * GENERATE A TABLE WITH CARDS
   *************************************************************/  
   useEffect(()=>{
        let table = [];
        const arrayOfCards = [];

        const createCards = ()=>{            

            if(duplicatedCharactersList && duplicatedCharactersList.length === gridOfCards.rows * gridOfCards.columns ){                

                if(arrayOfCards.length === duplicatedCharactersList.length){
                    console.log('duplicatedCharactersList', duplicatedCharactersList);
                    console.log('arrayOfCards', arrayOfCards);
                    return arrayOfCards;
                } else {
                    const randomKey = getRandomArbitrary(0, (duplicatedCharactersList.length));
                    const id = duplicatedCharactersList[randomKey].id;
                    let isFound = [];

                    if(arrayOfCards.length > 0){
                        isFound = arrayOfCards.filter((e) => {
                            return e.id === id;
                        });
                        if(isFound.length === 0){
                            // arrayOfCards.push(duplicatedCharactersList[randomKey]);
                            arrayOfCards.push( 
                                // <Card>
                                {
                                    'id': duplicatedCharactersList[randomKey].id,
                                    'card': <CardMedia
                                        component="img"
                                        alt={duplicatedCharactersList[randomKey].name}
                                        image={duplicatedCharactersList[randomKey].image}
                                        className={`${styles.itemCardMedia}`}
                                    />}
                                // </Card>
                            );
                        };
                    } else {
                        // arrayOfCards.push(duplicatedCharactersList[0]);
                        arrayOfCards.push(
                            // <Card>
                                {
                                    'id': duplicatedCharactersList[0].id,
                                    'card': <CardMedia
                                    component="img"
                                    alt={duplicatedCharactersList[0].name}
                                    image={duplicatedCharactersList[0].image}
                                    className={`${styles.itemCardMedia}`}
                                />}
                            // </Card>
                        );
                    };                    
                    return createCards();
                };
            };
        };

        const arrayCards = createCards();
        // console.log('arrayCards',arrayCards);
        let count = 0;
        // arrayCards ? setAllShuffleCards(arrayCards) : setAllShuffleCards(null);

        const createTable = ()=>{
            for(let i = 1; i <= gridOfCards.rows; i++){
                const rowsArray = [];
                
                for(let j = 1; j <= gridOfCards.columns; j++){
                    // const cellObj = {};
                    // cellObj.id = arrayCards[count].id;
                    // cellObj.name = arrayCards[count].id;
                    // rowsArray.push(cellObj);
                    // console.log(count, arrayCards[count]); 
                    // duplicatedCharactersList ? console.log(duplicatedCharactersList.length) : console.log("");
                    rowsArray.push(arrayCards[count]);
                    count++;
                }
                table.push(rowsArray);
            }
        };
        
        if(arrayCards)
            createTable();

        table.length > 0 ? setTableGridCards(table) : setTableGridCards([]);
  }, [gridOfCards, duplicatedCharactersList]);
  /*************************************************************
   * END GENERATE A TABLE FOR CARDS
   *************************************************************/

    const handleBtnRefresh = (e) => {
        e.preventDefault();
        setRefresh(true);    
        setCount(1);
        setRandomListCharacter(null);
    };

    return duplicatedCharactersList !== null ? 
    // return tableGridCards !== null ?
    (<Box className={`${styles.main}`}  >        
        <Box className={`${styles.menuContainer}`}>
            <p style= {{marginBottom: "30px"}} >Menú del juego</p>
            <Button 
                regular
                handleBtn={handleBtnRefresh}                        
            >
                Refresh
            </Button>
        </Box>

        <Box className={`${styles.cardContainer}`} >            
            {/* {console.log('gridOfCards',gridOfCards)}
            {console.log('tableGridCards',tableGridCards)}
            {console.log('tableGridCards[0]',tableGridCards[0][0])} */}
            <table>
                <tbody>
            {
                tableGridCards.map((row, index)=>{
                    return (
                        <tr key={index}>
                            {tableGridCards[index].map((column, i)=>{
                                return (                                    
                                    <td key={i}>
                                        {/* <div className={`${styles.itemCard}`}> {column.name} </div> */}
                                        {console.log(column.id)}
                                        {column.card}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })
            }

                </tbody>
            </table>

            {/* <ul className={`${styles.ulCards}`} > */}
                {/*duplicatedCharactersList.map((character)=>{
                return (
                    <li className={`${styles.itemCard}`} key={character.id.toString()} >
                            <Card >
                                <CardMedia
                                    component="img"
                                    alt={character.name}
                                    // width="50"
                                    // height="50"
                                    image={character.image}
                                    className={`${styles.itemCardMedia}`}
                                />
                            </Card>

                    </li>)
                })*/}
            {/* </ul> */}
        </Box> 
    </Box>            
    ) : 
    (<Box className={`${styles.main}`} /> );
};