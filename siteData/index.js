//import indexData from './pages/home';
//import galeriaData from './pages/galeria';\
import galeriaData from './pages/galeria';
import cardsData from './pages/cards';
import tablaData from './pages/tabla';
function context(page){
    console.log("Getting context for page:", page);
    let context = {
        title: "Mi sitio ABC Web",
    }
    switch(page){
        case "/index.html":
            context = {...context, ...cardsData, ...galeriaData, ...tablaData};
            
            break;
        case "/galeria.html":
            context = {...context, ...galeriaData};
            break;
    }
    console.log("Context: ", JSON.stringify(context, null, 2));
    return context;
}


export default context;