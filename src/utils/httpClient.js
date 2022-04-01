//REALIZA UN FETCH A LA API, RECIBE EL PATH AL QUE DESEA ACCEDER Y
//EL TIPO DE SOLICITUD QUE DESEA IMPLEMENTAR

import { getRandomArbitrary,  } from './libraries';
const API = "https://rickandmortyapi.com/api"; //Base de la API a consumir

export async function requestApi(path, req, isPaginated) {
  const page = isPaginated ? "/?page=" + getRandomArbitrary(1, 43) : "/?page=" + 1;

      //path y tipo de solicitud
  if (req === "GET") {
    //Se concatena api y path
    const resultado = await fetch(API + path + page, {      
      mode: "cors",
    }); 

    return resultado
      ? await resultado.json()
      : await { error: 400, errorMsg: "Error en el servidor" };
  }
}

let newArrayCharacters = []; //Var for only characters  from Rick & Morty API
export async function getAllCharacters(path, page) { //Get all characters 

  //Request using fetch
  const resultado = await fetch(API + path + "/?page=" + page, {
    mode: "cors",
  });

  //Res ok
  if (resultado) {
    const characters = await resultado.json().catch((e)=> {console.log('Error en Server: ', e)}); //Save like JSON
    newArrayCharacters = [...newArrayCharacters, ...characters.results]; //Saving all characters with recursivity

    if (page === 1) { //In page 1
      
      return newArrayCharacters; //Ends
    } else {
      return getAllCharacters(path, page - 1);//recursion
    }
  } else {
    return await { error: 400, errorMsg: "Error en el servidor" }; //Error in server
  }
}