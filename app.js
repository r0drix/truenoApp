import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


document.getElementById('orden').addEventListener('submit', async function (e){
    e.preventDefault();

    const nombreApellido = document.getElementById('nombreApellido').value;
    const contacto = document.getElementById('contacto').value;
    const modeloReparacion = document.getElementById('modeloReparacion').value;
    const problema = document.getElementById('problema').value;
    const presupuesto = document.getElementById('presupuesto').value;



    const { data, error } = await supabase 
        .from('registroOrdenes')
        .insert([
            { nombre_apellido: nombreApellido,numero_contacto:contacto, modelo:modeloReparacion, 
              problema: problema, presupuesto: presupuesto  
            }
        ]);
    if (error) {
        console.error('Error al insertar datos:', error.message);
    } else {
        console.log('Datos insertados correctamente:', data);
    }

    //////////////////////////////////////////////////////////////////////////////////////
    const now = new Date();
    const fechaHora = now.toLocaleDateString('es-ES') + ` ` + now.toLocaleTimeString('es-Es');
     // Generar el contenido para imprimir
     const reciboHTML = `
<html>
     <head>
         <style>
             body {
                 font-family: monospace;
                 width: 80mm; /* Ajustar el ancho para impresoras de 80mm */
                 margin: 0;
                 padding: 10px;
             }
             .titulo {
                 text-align: center;
                 font-size: 1.2em;
                 font-weight: bold;
             }
            .subtitulo {
                text-align: center;
                 font-size: 1.0em;
                 font-weight: bold;
            }
             .detalle {
                 margin-bottom: 10px;
             }
             .total {
                 font-weight: bold;
             }
             .policies {
            max-width: 600px;
            margin: 0 auto;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .policy-item {
            margin-bottom: 10px;
        }
        @media print {
            body {
                margin: 0;
            }
            .policies {
                border: none;
                padding: 0;
            }
        }
         </style>
         
     </head>
     <body>
         <div class="titulo">OXYGEN CELULARES</div>
         <div class="titulo">0985745745</div>
         <div class="subtitulo">Orden de Reparacion</div>
         <div class="detalle">------------------------------------------</div>
         <div class="detalle"><strong>Nombre y Apellido:</strong> ${nombreApellido}</div>
         <div class="detalle"><strong>Contacto:</strong> ${contacto}</div>
         <div class="detalle"><strong>Modelo:</strong> ${modeloReparacion}</div>
         <div class="detalle"><strong>Problema:</strong> ${problema}</div>
         <div class="detalle"><strong>Presupuesto:</strong> ${presupuesto}</div>
         <div class="detalle"><strong>Fecha y Hora:</strong> ${fechaHora}</div>
         <div class="total">Gracias por su confianza!</div>


         <h1>Políticas de Reparación</h1>
    <div class="policies">
        <div class="policy-item">
            <h2>1. Registro del Dispositivo:</h2>
            <p>El cliente debe proporcionar toda la información necesaria sobre el dispositivo y el problema que presenta.</p>
        </div>
        <div class="policy-item">
            <h2>2. Tiempo de Reparación:</h2>
            <p>El tiempo estimado para la reparación puede variar según la disponibilidad de piezas y la complejidad del problema. Los tiempos de reparación son aproximados y pueden cambiar. Se informará al cliente sobre cualquier modificación en el plazo estimado.</p>
        </div>
        <div class="policy-item">
            <h2>3. Costo de Reparación:</h2>
            <p>El costo final de la reparación se determinará una vez que se haya diagnosticado el problema. Los costos adicionales deben ser aprobados por el cliente antes de proceder.</p>
        </div>
        <div class="policy-item">
            <h2>4. Garantía de Reparación:</h2>
            <p>Todas las reparaciones están cubiertas por una garantía limitada. La duración y los términos de la garantía se especificarán en el recibo de reparación. La garantía no cubre daños adicionales causados por mal uso, accidentes o daños posteriores.</p>
        </div>
        <div class="policy-item">
            <h2>5. Responsabilidad:</h2>
            <p>No nos hacemos responsables por pérdida de datos, fotos, contactos u otra información almacenada en el dispositivo. Se recomienda realizar una copia de seguridad antes de la reparación. Los dispositivos deben ser recogidos en el plazo indicado en el ticket. Si el dispositivo no se recoge en el tiempo establecido, se aplicarán cargos por almacenamiento.</p>
        </div>
        <div class="policy-item">
            <h2>6. Pérdida o Daño del Dispositivo:</h2>
            <p>En caso de pérdida o daño del dispositivo mientras está en nuestras instalaciones, la responsabilidad se limitará al valor de reparación del dispositivo.</p>
        </div>
        <div class="policy-item">
            <h2>7. Cancelación de Reparación:</h2>
            <p>Si el cliente desea cancelar la reparación después de que se haya iniciado, se pueden aplicar cargos por diagnóstico o costos incurridos.</p>
        </div>
        <div class="policy-item">
            <h2>8. Modificaciones y Adiciones:</h2>
            <p>Cualquier modificación en los términos de reparación o solicitudes adicionales deben ser discutidas y acordadas por ambas partes antes de que se realicen.</p>
        </div>
        <div class="policy-item">
            <h2>9. Política de Devolución:</h2>
            <p>Las reparaciones realizadas no son reembolsables una vez completadas, salvo en casos de garantía.</p>
        </div>
        <div class="policy-item">
            <h2>10. Información de Contacto:</h2>
            <p>Asegúrese de proporcionar información de contacto actualizada para notificaciones relacionadas con el estado de la reparación.</p>
        </div>
    </div>
     </body>
</html>
 `;

 // Abrir una nueva ventana para imprimir
 const ventanaImpresion = window.open('', '', 'width=300,height=400');
 ventanaImpresion.document.open();
 ventanaImpresion.document.write(reciboHTML);
 ventanaImpresion.document.close();
 ventanaImpresion.focus();
 ventanaImpresion.print();


    document.getElementById('orden').reset()
});