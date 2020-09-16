// variables y selectores

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos

addEventListener();

function addEventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto );
}

function preguntarPresupuesto(){
    const presupuestoUsuario =  prompt('¿Cual es tu presupuesto?');
    
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario))  
        window.location.reload(); // Recargue la pagina hasta que ingrese algun valor

    presupuesto = new Presupuesto( presupuestoUsuario );
    
    ui.insertarPresupuesto( presupuesto );
}

function agregarGasto(e){
    e.preventDefault(); // ya que es un evento submit

    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;
    
    if(nombre === '' || cantidad === '')
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    else if (cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error');
    }
}

// Clases

class Presupuesto{

    constructor( presupuesto ){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI{
    insertarPresupuesto( cantidad ){
        const {presupuesto, restante } = cantidad;

        document.querySelector('#total').textContent = presupuesto;  
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje,tipo){
        const divAlerta = document.createElement('div');
        divAlerta.classList.add('text-center','alert');

        if(tipo === 'error')
            divAlerta.classList.add('alert-danger');
        else
            divAlerta.classList.add('alert-success');

        divAlerta.textContent = mensaje;

        // insertar al HTML

        document.querySelector('.primario').insertBefore( divAlerta, formulario);

        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }
}

const ui = new UI();
let presupuesto;
// Funciones