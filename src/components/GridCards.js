import styles from "../css/GridCards.module.css";
import { Card, CardMedia, Box } from "@mui/material";
import { getRandomArbitrary } from "../utils/libraries";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./Button";

export function GridCards({
  randomListCharacter,
  setRandomListCharacter,
  setRefresh,
  setCount,
  numberOfCards,
  gridOfCards,
}) {

    const [arrayCharactersDouble, setArrayCharactersDouble] = useState(null);

    useEffect(()=>{
        // const rows = { "--rows": gridOfCards.rows }

        if(!arrayCharactersDouble){
            if(randomListCharacter && randomListCharacter.length === numberOfCards ) 
                setArrayCharactersDouble([...randomListCharacter, ...randomListCharacter.reverse()]);
        };
    }, [randomListCharacter]);
    
  const handleBtnRefresh = (e) => {
    e.preventDefault();
    setRefresh(true);
    setCount(1);
    setRandomListCharacter(null);
    setArrayCharactersDouble(null);
  };

  return arrayCharactersDouble ? (
    <Box className={`${styles.main}`}>
      <Box className={`${styles.menuContainer}`}>
        <p style={{ marginBottom: "30px" }}>Menú del juego</p>
        <Button regular handleBtn={handleBtnRefresh}>
          <p style={{padding: "5px 8px", fontSize: "1.3rem"}}>Refresh</p>
        </Button>
      </Box>
      <Box className={`${styles.cardContainer}`}>
        {console.log('randomListCharacter', randomListCharacter)}
        {console.log('arrayCharactersDouble', arrayCharactersDouble)}
        {console.log('numberOfCards', numberOfCards)}
        {console.log('gridOfCards', gridOfCards)}
        {<ul className={`${styles.ulCards}`} style={{ '--rows': `${gridOfCards.rows}`, '--columns': `${gridOfCards.columns}` }}>
                {arrayCharactersDouble.map((character, i)=>{
                return (
                    <li className={`${styles.itemCard}`} key={(character.id+''+i).toString()} >
                            <Card >
                                <CardMedia
                                    component="img"
                                    alt={character.name}
                                    image={character.image}
                                    className={`${styles.itemCardMedia}`}
                                />
                            </Card>
                    </li>)
                })}
            </ul>}
      </Box>
    </Box>
  ) : 
  (<Box className={`${styles.main}`} /> );
}
