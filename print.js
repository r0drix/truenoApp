document.getElementById('orden').addEventListener('submit', function (e) {
     // Evita el envío del formulario

    // Captura los datos del formulario
    const nombreApellido = document.getElementById('nombreApellido').value;
    const contacto = document.getElementById('contacto').value;
    const modelo = document.getElementById('modeloReparacion').value;
    const problema = document.getElementById('problema').value;
    const presupuesto = document.getElementById('presupuesto').value;

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
                .detalle {
                    margin-bottom: 10px;
                }
                .total {
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="titulo">Orden de Reparación</div>
            <div class="detalle"><strong>Nombre y Apellido:</strong> ${nombreApellido}</div>
            <div class="detalle"><strong>Contacto:</strong> ${contacto}</div>
            <div class="detalle"><strong>Modelo:</strong> ${modelo}</div>
            <div class="detalle"><strong>Problema:</strong> ${problema}</div>
            <div class="detalle"><strong>Presupuesto:</strong> ${presupuesto}</div>
            <div class="total">Gracias por su compra!</div>
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
});