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
            "05. Areli Soraya Perdue Centeno",
            "06. Diego Villarreal Martinez",
            /* martes */
            "07. Alan Anduaga Lleverino",
            "08. Yamil Alejandro Ramirez Perez",
            "09. Sebastian Daniel Mata Treviño",
            "10. Carlos Gibran Sanchez Galvan",
            "11. Katia Isabella Vazquez Vazquez",
            "12. Dana Elena Zertuche Castro",
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
            "25. Hector Emiliano Leal Prieto",
            "26. Diego Emilio Salas Cruz",
            "27. Daniel Alejandro Gonzalez Salazar",
            "28. Alvaro Marcelo Silva Amaro",
        ];

        // 3. Estructura de Días
        const DIAS = [
            { nombre: "Lunes", fecha: "28 de Septiembre" },
            { nombre: "Martes", fecha: "29 de Septiembre" },
            { nombre: "Miércoles", fecha: "30 de Septiembre" },
            { nombre: "Jueves", fecha: "1 de Octubre" },
            { nombre: "Viernes", fecha: "2 de Octubre" }
        ];

        /* ==========================================
           LÓGICA EN JAVASCRIPT
           ========================================== */

        // Cargar Información en el Encabezado
        document.getElementById('materia-nombre').textContent = CONFIG.materia;
        document.getElementById('profesor-nombre').textContent = CONFIG.profesor;
        document.getElementById('logo-uni').src = CONFIG.logoUrl;

        // Función para calcular los rangos de tiempo (14:30 a 16:30 repartido en 6 bloques = 20 min c/u)
        function generarHorarios(horaInicioMinutos, cantidad, duracionMinutos) {
            const horarios = [];
            let actual = horaInicioMinutos;

            for (let i = 0; i < cantidad; i++) {
                let inicioHoras = Math.floor(actual / 60);
                let inicioMins = actual % 60;
                
                let finTemp = actual + duracionMinutos;
                let finHoras = Math.floor(finTemp / 60);
                let finMins = finTemp % 60;

                // Formato hh:mm
                let formatoInicio = `${inicioHoras}:${inicioMins === 0 ? '00' : inicioMins}`;
                let formatoFin = `${finHoras}:${finMins === 0 ? '00' : finMins}`;

                horarios.push(`${formatoInicio} - ${formatoFin}`);
                actual += duracionMinutos;
            }
            return horarios;
        }

        // Generar 6 intervalos de 20 minutos empezando a las 14:30 (870 minutos acumulados desde las 00:00)
        const horariosExpos = generarHorarios(14 * 60 + 30, 6, 20);

        // Renderizar Calendario
        const calendarContainer = document.getElementById('calendar');
        let expoIndex = 0;

        DIAS.forEach((dia) => {
            // Crear columna del día
            const dayColumn = document.createElement('div');
            dayColumn.className = 'day-column';

            // Cabecera del día
            dayColumn.innerHTML = `
                <div class="day-header">
                    <h2>${dia.nombre}</h2>
                    <span>${dia.fecha}</span>
                </div>
            `;

            const expoList = document.createElement('div');
            expoList.className = 'expo-list';

            // Agregar las 6 exposiciones correspondientes al día
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