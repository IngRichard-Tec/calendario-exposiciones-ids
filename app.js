        /* ==========================================
           CONFIGURACIÓN Y DATOS DE ENTRADA
           ========================================== */

        // 1. Datos Generales (Puedes cambiarlos aquí directamente)
        const CONFIG = {
            materia: "Ingeniería de Software",
            profesor: "Ing. Ricardo Arturo Elizalde Hernández",
            logoUrl: "img/tecmi.png" // O ruta local: "img/logo.png"
        };

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
            /* miércoles */
            "13. Roberto Carlos Garcia Alanis",
            "14. Melissa Yaretzi Hernandez Flores",
            "15. Ricardo Aldair Delgado de la Fuente",
            "16. César Gabriel Montoya Caballero",
            "17. Daniel Espinosa Sanchez*",
            "18. Alejandro Garcia Pelayo Banda",
            /* jueves */
            "19. Gael Alejandro Castro",
            "20. Daniel Espinoza Sanchez",
            "21. Arturo Uriel Gonzalez Villarreal",
            "22. Emilio Gil Garcia*",
            "23. Andres Herrera Garza",
            "24. Diego Eduardo Garcia Mireles",
            /* viernes */
            "25. Diego Emilio Salas Cruz",
            "26. Daniel Alejandro Gonzalez Salazar",
            "27. Alvaro Marcelo Silva Amaro",
            "28. Areli Soraya Perdue Centeno",
        ];

       // 1. Estructura de Días con estado de completado
const DIAS = [
    { nombre: "Lunes", fecha: "28 de Septiembre", completado: true },  // CAMBIA A true/false SEGÚN EL DÍA
    { nombre: "Martes", fecha: "29 de Septiembre", completado: false },
    { nombre: "Miércoles", fecha: "30 de Septiembre", completado: false },
    { nombre: "Jueves", fecha: "1 de Octubre", completado: false },
    { nombre: "Viernes", fecha: "2 de Octubre", completado: false }
];

// 2. Cargar Información en el Encabezado
document.getElementById('materia-nombre').textContent = CONFIG.materia;
document.getElementById('profesor-nombre').textContent = CONFIG.profesor;
document.getElementById('logo-uni').src = CONFIG.logoUrl;

// 3. Generar Horarios
function generarHorarios(horaInicioMinutos, cantidad, duracionMinutos) {
    const horarios = [];
    let actual = horaInicioMinutos;

    for (let i = 0; i < cantidad; i++) {
        let inicioHoras = Math.floor(actual / 60);
        let inicioMins = actual % 60;
        
        let finTemp = actual + duracionMinutos;
        let finHoras = Math.floor(finTemp / 60);
        let finMins = finTemp % 60;

        let formatoInicio = `${inicioHoras}:${inicioMins === 0 ? '00' : inicioMins}`;
        let formatoFin = `${finHoras}:${finMins === 0 ? '00' : finMins}`;

        horarios.push(`${formatoInicio} - ${formatoFin}`);
        actual += duracionMinutos;
    }
    return horarios;
}

const horariosExpos = generarHorarios(14 * 60 + 30, 6, 20);

// 4. Renderizar Calendario
const calendarContainer = document.getElementById('calendar');
let expoIndex = 0;

DIAS.forEach((dia) => {
    const dayColumn = document.createElement('div');
    // Agrega la clase 'dia-pasado' si completado es true
    dayColumn.className = `day-column ${dia.completado ? 'dia-pasado' : ''}`;

    dayColumn.innerHTML = `
        <div class="day-header">
            <h2>${dia.nombre} ${dia.completado ? '✓' : ''}</h2>
            <span>${dia.fecha}</span>
        </div>
    `;

    const expoList = document.createElement('div');
    expoList.className = 'expo-list';

    for (let i = 0; i < 6; i++) {
        const tituloExpo = EXPOSICIONES[expoIndex] || "Espacio Libre / Por asignar";
        const horario = horariosExpos[i];

        const card = document.createElement('div');
        card.className = 'expo-card';
        card.innerHTML = `
            <span class="expo-time">🕒 ${horario} hrs</span>
            <div class="expo-title">${tituloExpo}</div>
        `;

        expoList.appendChild(card);
        expoIndex++;
    }

    dayColumn.appendChild(expoList);
    calendarContainer.appendChild(dayColumn);
});