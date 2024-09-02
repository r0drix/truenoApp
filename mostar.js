import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


async function obtenerDatos() {
    try {
        const hoy = new Date();
        const inicioDelDia = new Date(hoy.setHours(0, 0, 0, 0)).toISOString();
        const finDelDia = new Date(hoy.setHours(23, 59, 59, 999)).toISOString();
        // Consulta a la tabla "registroOrdenes"
        const { data, error } = await supabase
            .from('registroOrdenes')
            .select('*')
            .gte('created_at', inicioDelDia)
            .lte('created_at', finDelDia); 

        if (error) {
            console.error('Error al obtener los datos:', error.message);
            return;
        }

        // Obtener referencia al cuerpo de la tabla
        const tbody = document.getElementById('datosTabla').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Limpia el cuerpo de la tabla

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

// Llamar a la función para obtener y mostrar los datos
obtenerDatos();