import ReactDOM from 'react-dom/client'; //importamos desestructurado solo el createroot
import  React,{useState} from 'react';


import App from './App';


const app = document.getElementById('root'); //obtenems del index html, el id root raiz

const root = ReactDOM.createRoot (app); //creamos la raiz a partir de app

root.render( //renderizmos ahora lo que vamos a crear en nuestro DOM
  <App></App>


)

