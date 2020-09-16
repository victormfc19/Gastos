// variables y selectores

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos

addEventListener();

function addEventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

function preguntarPresupuesto(){
    const presupuestoUsuario =  prompt('¿Cual es tu presupuesto?');
    
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario))  
        window.location.reload(); // Recargue la pagina hasta que ingrese algun valor

    presupuesto = new Presupuesto( presupuestoUsuario );
    console.log(presupuesto)
}


// Clases

class Presupuesto{

    constructor( presupuesto ){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

let presupuesto;
// Funciones