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
            "01. Alumno 01: Pendiente",
            "02. Alumno 02: Pendiente",
            "03. Alumno 03: Pendiente",
            "04. Alumno 04: Pendiente",
            "05. Alumno 05: Pendiente",
            "06. Alumno 06: Pendiente",
            "07. Alumno 07: Pendiente",
            "08. Alumno 08: Pendiente",
            "09. Alumno 09: Pendiente",
            "10. Alumno 10: Pendiente",
            "11. Alumno 11: Pendiente",
            "12. Alumno 12: Pendiente",
            "13. Alumno 13: Pendiente",
            "14. Alumno 14: Pendiente",
            "15. Alumno 15: Pendiente",
            "16. Alumno 16: Pendiente",
            "17. Alumno 17: Pendiente",
            "18. Alumno 18: Pendiente",
            "19. Alumno 19: Pendiente",
            "20. Alumno 20: Pendiente",
            "21. Alumno 21: Pendiente",
            "22. Alumno 22: Pendiente",
            "23. Alumno 23: Pendiente",
            "24. Alumno 24: Pendiente",
            "25. Alumno 25: Pendiente",
            "26. Alumno 26: Pendiente",
            "27. Alumno 27: Pendiente",
            "28. Alumno 28: Pendiente",
            "29. Alumno 29: Pendiente",
            "30. Alumno 30: Pendiente",
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