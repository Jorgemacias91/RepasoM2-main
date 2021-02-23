import React from "react";


// REDUCER _________________________------------
const myCities={
  cities:[],
};


export const reducer=(state,action) => {

  
}

// ACTIONS -----------------------
// por como esta diseñado el test, el id de la ciudad deberian colocarla al momento de agregarlo en el reducer
 export const addCity= ()=>{
  
 }

 export const removeCity=()=>{
 }


 // COMPONENTE _--------------------
 // La idea es hacer una app donde uds mismos puedan ingresar una ciudad y renderizarlas en esta misma
 // hoja. Deberian hacer el form y renderizar lo que tendrian en el "estado local de redux"
 // la manera en la que pueden unir los componentes es al momento de agregar una ciudad es llamarlo de la siguiente
 // manera "onClick={reducer(EstadoActual,Accion(payload))}"
 // PARA QUE PASEN LOS TESTS ES NECESARIO USAR React.useState en lugar de useState solo
 // Recuerden que la idea es practicar y tener conceptos claros, con que entiendan los tests y sientan que entendieron
 // es suficiente.
export const App=() => {

  return(
    <h1>Repaso</h1>
  )

}

export default App;
