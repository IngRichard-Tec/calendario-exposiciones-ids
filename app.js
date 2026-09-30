        /* ==========================================
           CONFIGURACIÓN Y DATOS DE ENTRADA
           ========================================== */

        // 1a. Datos Generales (Puedes cambiarlos aquí directamente)
        const CONFIG = {
            materia: "Ingeniería de Software",
            profesor: "Ing. Ricardo Arturo Elizalde Hernández",
            logoUrl: "img/tecmi.png" // O ruta local: "img/logo.png"
        };

        // 1b. Cargar Información en el Encabezado (ESTO ES LO QUE LO LLAMA)
        document.addEventListener("DOMContentLoaded", () => {
            // Agregamos "Materia: " para que mantenga el prefijo dinámicamente
            document.getElementById('materia-nombre').textContent = `Materia: ${CONFIG.materia}`;
            document.getElementById('profesor-nombre').textContent = CONFIG.profesor;
            
            const logoImg = document.getElementById('logo-uni');
            if (logoImg) {
                logoImg.src = CONFIG.logoUrl;
            }
        });


        // 2. ARREGLO DE EXPOSICIONES (30 temas/alumnos en total = 6 por día × 5 días)
        // Puedes cambiar los nombres libremente. Se asignarán automáticamente en orden.
        const EXPOSICIONES = [
            /*  lunes */
            "01. Cesar Julian Esponceda Pantoja",
            "02. Jail Majorek Casas Sanchez",
            "03. Carlos Jesús Cepeda Coronado",
            "04. Hugo David Ruiz Moreno",
            "05. Diego Villarreal Martinez",
            "06. Carlos Gibran Sanchez Galvan",
            /* martes */
            "07. Alan Anduaga Lleverino",
            "08. Yamil Alejandro Ramirez Perez",
            "09. Sebastian Daniel Mata Treviño",
            "10. Katia Isabella Vazquez Vazquez",
            "11. Dana Elena Zertuche Castro",
            "12. Hector Emiliano Leal Prieto",
            "13. Areli Soraya Perdue Centeno",
            /* miércoles */
            "14. Roberto Carlos Garcia Alanis",
            "15. Melissa Yaretzi Hernandez Flores",
            "16. Ricardo Aldair Delgado de la Fuente",
            "17. César Gabriel Montoya Caballero",
            "18. Adriana Sarahi Malpica Ramos",
            "19. Alejandro Garcia Pelayo Banda",
            "21. Arturo Uriel Gonzalez Villarreal",
            /* jueves */
            "20. Gael Alejandro Castro",
            "22. Emilio Gil Garcia*",
            "23. Andres Herrera Garza",
            "24. Diego Eduardo Garcia Mireles",
            "25. Diego Emilio Salas Cruz",
            "26. Daniel Alejandro Gonzalez Salazar",
            "27. Alvaro Marcelo Silva Amaro",
            "28. Daniel Espinosa Sanchez*",
            /* viernes */


        ];

// 1. Estructura de Días con cantidad de exposiciones por día
const DIAS = [
    { nombre: "Lunes", fecha: "28 de Septiembre", completado: true, cantidadExpos: 6 },  
    { nombre: "Martes", fecha: "29 de Septiembre", completado: true, cantidadExpos: 7 },
    { nombre: "Miércoles", fecha: "30 de Septiembre", completado: false, cantidadExpos: 7 },
    { nombre: "Jueves", fecha: "1 de Octubre", completado: false, cantidadExpos: 8 },
    { nombre: "Viernes", fecha: "2 de Octubre", completado: false, cantidadExpos: 5 }
];

// 2. Función para calcular horarios dinámicos según el total de exposiciones del día
function generarHorariosDia(cantidad) {
    const horarios = [];
    const inicioTotal = 14 * 60 + 30; // 14:30 en minutos (870 min)
    const duracionTotal = 120;         // 120 minutos (de 14:30 a 16:30)
    const duracionPorExpo = duracionTotal / cantidad; // Calcula minutos por exposición

    let actual = inicioTotal;

    for (let i = 0; i < cantidad; i++) {
        let inicioHoras = Math.floor(actual / 60);
        let inicioMins = Math.round(actual % 60);
        
        let finTemp = actual + duracionPorExpo;
        let finHoras = Math.floor(finTemp / 60);
        let finMins = Math.round(finTemp % 60);

        // Formato con ceros a la izquierda para minutos (ej. 14:05)
        let strInicioMins = inicioMins < 10 ? `0${inicioMins}` : `${inicioMins}`;
        let strFinMins = finMins < 10 ? `0${finMins}` : `${finMins}`;

        horarios.push(`${inicioHoras}:${strInicioMins} - ${finHoras}:${strFinMins}`);
        actual += duracionPorExpo;
    }
    return horarios;
}

// 3. Renderizar Calendario
const calendarContainer = document.getElementById('calendar');
let expoIndex = 0;

DIAS.forEach((dia) => {
    const dayColumn = document.createElement('div');
    dayColumn.className = `day-column ${dia.completado ? 'dia-pasado' : ''}`;

    dayColumn.innerHTML = `
        <div class="day-header">
            <h2>${dia.nombre} ${dia.completado ? '✓' : ''}</h2>
            <span>${dia.fecha} (${dia.cantidadExpos} expos)</span>
        </div>
    `;

    const expoList = document.createElement('div');
    expoList.className = 'expo-list';

    // Genera horarios específicos para la cantidad de expos de ESTE día
    const horariosDelDia = generarHorariosDia(dia.cantidadExpos);

    for (let i = 0; i < dia.cantidadExpos; i++) {
        const tituloExpo = EXPOSICIONES[expoIndex] || "Espacio Libre / Por asignar";
        const horario = horariosDelDia[i];

        const card = document.createElement('div');
        card.className = 'expo-card';
        card.innerHTML = `
            <span class="expo-time">🕒 ${horario} hrs</span>
            <div class="expo-title">${tituloExpo}</div>
        `;

        expoList.appendChild(card);
        expoIndex++; // Pasa a la siguiente exposición del arreglo general
    }

    dayColumn.appendChild(expoList);
    calendarContainer.appendChild(dayColumn);
});