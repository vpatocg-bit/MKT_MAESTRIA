# MAESTRÍA EN MARKETING DIGITAL - ESPOCH IPEC
## Sistema de Gestión Microcurricular, Cronograma y Modalidad de Calificación

Sistema integral diseñado para la gestión académica de la **Maestría en Marketing Digital** de la **Escuela Superior Politécnica de Chimborazo (ESPOCH) - IPEC** (Modalidad en línea, Resolución 096.CP.2023, 30 Créditos, 1440 Horas).

---

## 📁 Estructura del Directorio

```text
MAESTRIA EN MARKETING DIGITAL/
│
├── index.html        # Aplicación Web Interactiva completa (Dashboard)
├── data.json         # Base de datos microcurricular de las 16 asignaturas
├── cli.js            # Herramienta de línea de comandos (Node.js)
├── server.js         # Servidor HTTP local ligero (http://localhost:3000)
└── README.md         # Documentación de uso y normativa
```

---

## 🌟 Características Implementadas

### 1. Ficha Microcurricular Oficial (13 Campos Requeridos)
Al seleccionar o ingresar cualquier asignatura, el sistema despliega automáticamente:
1. **Campo amplio:** `04 Administración`
2. **Periodo académico:** Semestre 1 o Semestre 2
3. **Nombre de la asignatura** (16 asignaturas oficiales)
4. **Unidad de organización curricular:** (Formación Disciplinar Avanzada / Integración Curricular / Investigación)
5. **Docente asignado:** Campo editable con guardado automático y persistencia local
6. **Recursos didácticos y tiempo:** Plataformas, herramientas de demostración y duración
7. **Horas contacto con el docente (ACD):** `48 h`
8. **Horas aprendizaje práctico-experimental (APEX):** `20 h`
9. **TOTAL DOCENTE (ACD + APEX):** `68 h`
10. **Horas aprendizaje autónomo (AAUT):** `22 h`
11. **Mínimo de horas clase en vivo:** `35 h` (≥ 51% de las 68 h de contacto)
12. **Total horas de la asignatura:** `90 h`
13. **Total créditos:** `1.875 créditos` (1 crédito = 48 h; 90 h = 1.875)

---

### 2. Cronograma de Clases, Horarios y Enlaces Zoom
Permite registrar y programar sesiones con:
- **Fechas de clase:** Selector de fecha calendario.
- **Franjas horarias reglamentarias:**
  - *Viernes:* 17:00 a 21:00 (4 horas)
  - *Sábados:* 08:00 a 12:00 (4 horas) y 14:00 a 18:00 (4 horas)
  - *Domingos:* 08:00 a 12:00 (4 horas) y 14:00 a 18:00 (4 horas)
- **Enlaces de Zoom:** URLs directas clickeables para unirse a las sesiones.
- **Credenciales:** ID de reunión y Código de acceso (Passcode).
- **Temas por sesión:** Mapeo con las unidades curriculares.

---

### 3. Estructura de Clases: Material de Investigación & Tareas
Cada unidad cuenta con:
- **Objetivo formativo** de la unidad.
- **Desglose de temas y subtemas**.
- **Horas de clase en vivo** asignadas.
- **Material de investigación:** Lecturas científicas recomendadas, bases de datos (Scopus, Web of Science, SciELO), frameworks y bibliografía especializada.
- **Tareas y actividades de aprendizaje:** Ensayos reflexivos, estudios de caso, talleres aplicados, tableros en Power BI/Looker Studio y proyectos prácticos.

---

### 4. Modalidad de Calificación Oficial (Sistema Acumulativo ESPOCH)
El sistema integra la calculadora con las ponderaciones oficiales de posgrado:
| Componente | Ponderación | Descripción |
| :--- | :---: | :--- |
| **Trabajos de investigación y tareas** | **35%** | Informes de investigación autónoma, ensayos críticos, talleres aplicados, resolución de problemas complejos y casos |
| **Exámenes parciales y participación** | **35%** | Evaluación formativa continua: exámenes parciales teóricos/prácticos, lecciones, foros y simulaciones |
| **Evaluación final obligatoria** | **30%** | Evaluación sumativa individual escrita holística o Proyecto final aplicado |
| **TOTAL** | **100%** | **Nota sobre 10.00 puntos** |

#### Reglas de Aprobación y Ética Académica:
- **Nota mínima de aprobación:** `7.00 / 10.00`
- **Asistencia sincrónica mínima:** `75%`
- **Examen de recuperación:** Por una sola vez, dentro de los 8 días posteriores al registro de notas, previa tutoría de refuerzo.
- **Políticas de integridad:**
  - Coincidencia máxima antiplagio: **10%**
  - Contenido generado por Inteligencia Artificial: máximo **5%**

#### Escala de Valoración:
- `9.50 a 10.00`: Excelente (Aprueba)
- `8.50 a 9.49`: Muy bueno (Aprueba)
- `7.50 a 8.49`: Bueno (Aprueba)
- `7.00 a 7.49`: Regular (Aprueba mínimo)
- `Menor a 7.00`: Insuficiente (Reprueba)

---

## 🚀 Cómo Usar el Sistema

### Opción A: Aplicación Web (Recomendada)
1. **Abrir directamente:**
   Haga doble clic en el archivo [index.html](file:///C:/Users/HOME/.gemini/antigravity/scratch/MAESTRIA%20EN%20MARKETING%20DIGITAL/index.html) desde el Explorador de Windows para abrirlo en su navegador preferido (Chrome, Edge, etc.).

2. **O iniciar con servidor local:**
   En PowerShell o Terminal:
   ```powershell
   cd "C:\Users\HOME\.gemini\antigravity\scratch\MAESTRIA EN MARKETING DIGITAL"
   node server.js
   ```
   Luego abra su navegador en `http://localhost:3000`.

---

### Opción B: Consola / Terminal (CLI)
Para consultar cualquier asignatura directamente desde PowerShell:

```powershell
cd "C:\Users\HOME\.gemini\antigravity\scratch\MAESTRIA EN MARKETING DIGITAL"

# Ver catálogo completo de las 16 asignaturas:
node cli.js --list

# Consultar una asignatura en específico:
node cli.js "Blended Marketing"
node cli.js "Business Intelligence"
node cli.js "E-Commerce"
node cli.js "Neuropsicología"
node cli.js "Tesis"

# Modo interactivo:
node cli.js --interactive
```
