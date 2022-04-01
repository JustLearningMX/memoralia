import styles from '../css/Main.module.css';
import { Stack  } from '@mui/material';
import { Button } from './Button'

export function Main({ setJugar, isSave }) {

  const handleBtnPlay = (e)=>{
    e.preventDefault();
    setJugar(true);
    // console.log('setJugar');
  };

  const BtnPlay = isSave ? 
  <Button 
  primary
  handleBtn={handleBtnPlay}
>
  Jugar
</Button> : "";

  return (
    <main >
      <Stack 
        spacing={1} 
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="80%"
        >
          <p >
              Main.
          </p>          
      </Stack>
      <Stack 
        justifyContent="center"
        alignItems="center"
        height="20%"
      >
        {BtnPlay}
        {/* <Button 
          primary
          handleBtn={handleBtnPlay}
        >
          Jugar
        </Button>     */}
      </Stack>
    </main>
  );
}