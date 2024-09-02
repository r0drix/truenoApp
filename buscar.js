import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Función para obtener y mostrar datos basados en la búsqueda
async function buscarDatos(termino) {
    try {
        if (!termino.trim()) {
            console.warn('El término de búsqueda está vacío');
            return;
        }   

        const filtro = [
            `nombre_apellido.ilike.%${termino}%`,
            `numero_contacto.ilike.%${termino}%`,
            `modelo.ilike.%${termino}%`,
            `problema.ilike.%${termino}%`
        ].join(',');


        // Consulta a la tabla "registroOrdenes" filtrando por el término de búsqueda en múltiples columnas
        const { data, error } = await supabase
            .from('registroOrdenes')
            .select('*')
            .or(filtro);

        if (error) {
            console.error('Error al obtener los datos:', error.message);
            return;
        }
        console.log(data)
        // Obtener referencia al cuerpo de la tabla
        const tbody = document.getElementById('datosTabla').getElementsByTagName('tbody')[0];
       // tbody.innerHTML = ''; // Limpia el cuerpo de la tabla

        // Iterar sobre los datos y agregarlos a la tabla
        data.forEach(row => {
            const tr = document.createElement('tr');

            // Crear celdas para cada columna
            const tdId = document.createElement('td');
            tdId.textContent = row.id;
            tr.appendChild(tdId);

            const tdNombre = document.createElement('td');
            tdNombre.textContent = row.nombre_apellido;
            tr.appendChild(tdNombre);

            const tdContacto = document.createElement('td');
            tdContacto.textContent = row.numero_contacto;
            tr.appendChild(tdContacto);

            const tdModelo = document.createElement('td');
            tdModelo.textContent = row.modelo;
            tr.appendChild(tdModelo);

            const tdProblema = document.createElement('td');
            tdProblema.textContent = row.problema;
            tr.appendChild(tdProblema);

            const tdPresupuesto = document.createElement('td');
            tdPresupuesto.textContent = row.presupuesto;
            tr.appendChild(tdPresupuesto);

            // Agregar la fila a la tabla
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al procesar los datos:', error);
    }
}

// Manejar el envío del formulario de búsqueda
document.getElementById('busquedaFormulario').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío del formulario

    // Obtener el valor del campo de búsqueda
    const termino = document.getElementById('busquedaInput').value;

    // Buscar datos con el término ingresado
    buscarDatos(termino);
});

