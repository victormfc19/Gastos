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
    const cantidad = Number(document.querySelector('#cantidad').value);
    
    if(nombre === '' || cantidad === '')
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    else if (cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error');
    }

    const gasto = {nombre,cantidad,id: Date.now()};
    presupuesto.nuevoGasto( gasto );

    // mensaje de confirmacion
    ui.imprimirAlerta('Gasto agregado correctamente');

    // imprimir los gastos
    const {gastos, restante} = presupuesto;

    ui.AgregarGastoListado( gastos );
    ui.actualizarRestante( restante );

    formulario.reset();
    
}

// Clases

class Presupuesto{

    constructor( presupuesto ){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto( gasto ){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce( (total,gasto) => total + gasto.cantidad, 0 );
        this.restante = this.presupuesto - gastado;
    }
}

class UI{

    insertarPresupuesto( cantidad ){
        const {presupuesto, restante } = cantidad;

        document.querySelector('#total').textContent = presupuesto;  
         
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

    AgregarGastoListado( gastos ){
        this.limpiarHTML();

        gastos.forEach(gasto => {
            const {cantidad, nombre, id } = gasto;

            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            nuevoGasto.innerHTML = `${nombre} <span class = "badge badge-primary badge-pill"> ${cantidad} </span>`;

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';

            nuevoGasto.appendChild(btnBorrar);

            gastoListado.appendChild(nuevoGasto);
        });
    }

    actualizarRestante( restante ){
        document.querySelector('#restante').textContent = restante;
    }

    limpiarHTML(){
        while( gastoListado.firstChild ){
            gastoListado.removeChild( gastoListado.firstChild );
        }
    }
}

const ui = new UI();
let presupuesto;
// Funciones