#!/usr/bin/env node

/**
 * SISTEMA DE GESTIÓN CURRICULAR
 * MAESTRÍA EN MARKETING DIGITAL - ESPOCH IPEC
 * CLI de consulta y gestión de asignaturas, cronograma y evaluación
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DATA_PATH = path.join(__dirname, 'data.json');

function loadData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error cargando data.json:', err.message);
    process.exit(1);
  }
}

const data = loadData();

const FOUR_WEEK_SUBJECT_IDS = [
  'blended-marketing',
  'investigacion-analitica-mercados',
  'trabajo-tesis-fin-master',
  'redaccion-publicacion-articulos-ingles'
];

function printBanner() {
  console.log('\n================================================================');
  console.log('       MAESTRÍA EN MARKETING DIGITAL - ESPOCH (IPEC)           ');
  console.log('        Sistema Microcurricular, Cronograma y Calificación      ');
  console.log('================================================================\n');
}

function listSubjects() {
  console.log('--- ASIGNATURAS DEL PRIMER PERIODO ---');
  data.asignaturas.filter(s => s.periodo_academico === 1).forEach((s, i) => {
    const w = FOUR_WEEK_SUBJECT_IDS.includes(s.id) ? '4 sem' : '3 sem';
    console.log(`  [${i + 1}] ${s.nombre_asignatura} (${s.total_horas}h / ${s.total_creditos} cred · ${w})`);
  });

  console.log('\n--- ASIGNATURAS DEL SEGUNDO PERIODO ---');
  data.asignaturas.filter(s => s.periodo_academico === 2).forEach((s, i) => {
    const w = FOUR_WEEK_SUBJECT_IDS.includes(s.id) ? '4 sem' : '3 sem';
    console.log(`  [${i + 9}] ${s.nombre_asignatura} (${s.total_horas}h / ${s.total_creditos} cred · ${w})`);
  });
  console.log('\n');
}

function distributeUnitsIntoWeeks(units, numWeeks) {
  const weeks = [];
  const total = units.length;
  let startIndex = 0;
  for (let i = 0; i < numWeeks; i++) {
    const remainingUnits = total - startIndex;
    const remainingWeeks = numWeeks - i;
    const count = Math.ceil(remainingUnits / remainingWeeks);
    const weekUnits = units.slice(startIndex, startIndex + count);
    startIndex += count;
    weeks.push({
      semana: i + 1,
      unidades: weekUnits
    });
  }
  return weeks;
}

function showSubject(nameOrId, forceWeeks = null) {
  const query = nameOrId.toLowerCase().trim();
  const subject = data.asignaturas.find(s => 
    s.id.toLowerCase() === query ||
    s.nombre_asignatura.toLowerCase().includes(query)
  );

  if (!subject) {
    console.log(`❌ No se encontró ninguna asignatura con el término: "${nameOrId}"`);
    console.log('Ejecute `node cli.js --list` para ver el catálogo completo.');
    return;
  }

  const numWeeks = forceWeeks ? parseInt(forceWeeks) : (FOUR_WEEK_SUBJECT_IDS.includes(subject.id) ? 4 : 3);
  const weeksData = distributeUnitsIntoWeeks(subject.unidades, numWeeks);
  const hoursPerWeek = (subject.total_horas / numWeeks).toFixed(1).replace('.0', '');

  console.log('\n================================================================');
  console.log(`  FICHA MICROCURRICULAR: ${subject.nombre_asignatura.toUpperCase()}`);
  console.log('================================================================');
  console.log(`• Campo amplio:                            ${subject.campo_amplio}`);
  console.log(`• Periodo académico:                       ${subject.periodo_academico}`);
  console.log(`• Nombre de la asignatura:                 ${subject.nombre_asignatura}`);
  console.log(`• Unidad de organización curricular:       ${subject.unidad_organizacion_curricular}`);
  console.log(`• Docente asignado:                        ${subject.docente_asignado || '(Pendiente de asignar)'}`);
  console.log(`• Recursos didácticos y tiempo:            ${subject.recursos_didacticos_y_tiempo}`);
  console.log(`• Horas contacto con el docente (ACD):     ${subject.horas_contacto_docente} h`);
  console.log(`• Horas práctico-experimental (APEX):      ${subject.horas_aprendizaje_practico_experimental} h`);
  console.log(`• TOTAL DOCENTE (ACD + APEX):              ${subject.total_docente} h`);
  console.log(`• Horas aprendizaje autónomo (AAUT):       ${subject.horas_aprendizaje_autonomo} h`);
  console.log(`• Mínimo de horas clase en vivo:           ${subject.minimo_horas_clase_en_vivo} h`);
  console.log(`• Total horas de la asignatura:            ${subject.total_horas} h`);
  console.log(`• Total créditos:                          ${subject.total_creditos}`);
  console.log(`• Planificación temporal:                  ${numWeeks} SEMANAS (~${hoursPerWeek}h / semana)`);
  console.log('----------------------------------------------------------------');

  console.log(`\n📚 ESTRUCTURA DE CONTENIDOS DIVIDIDA EN ${numWeeks} SEMANAS:`);
  weeksData.forEach(w => {
    const isFinal = (w.semana === numWeeks);
    console.log(`\n================== [ SEMANA ${w.semana} ${isFinal ? '(CIERRE Y EVALUACIÓN FINAL)' : ''} ] ==================`);
    console.log(`  Horas estimadas: ~${hoursPerWeek} h totales`);
    console.log(`  Unidades abordadas: ${w.unidades.map(u => 'Unidad ' + u.numero).join(', ')}`);

    w.unidades.forEach(u => {
      console.log(`\n  * Unidad ${u.numero}: ${u.titulo}`);
      console.log(`    - Objetivo: ${u.objetivo}`);
      console.log(`    - Horas sincrónicas: ${u.horas_en_vivo} h`);
      console.log(`    - Temas:`);
      u.temas_subtemas.forEach(t => console.log(`        • ${t}`));
      console.log(`    - Material de investigación: ${u.material_investigacion}`);
      console.log(`    - Tareas evaluadas (35%): ${u.tareas}`);
    });

    if (isFinal) {
      console.log('\n  [!] Hito de Cierre de la Asignatura:');
      console.log('      Evaluación Final Obligatoria (30%) - Proyecto final aplicado o examen sumativo.');
    } else {
      console.log('\n  [!] Hito de la semana: Avance de tareas (35%) y participación en foros/lecciones (35%).');
    }
  });

  console.log('\n----------------------------------------------------------------');
  console.log('⚖️ MODALIDAD DE CALIFICACIÓN OFICIAL ESPOCH (Acumulativo):');
  data.programa.modalidad_evaluacion.forEach(m => {
    console.log(`  • ${m.componente} [${m.porcentaje}]: ${m.descripcion}`);
  });
  console.log(`\n  • Nota mínima para aprobar: ${data.programa.nota_minima_aprobacion} / 10.00`);
  console.log(`  • Asistencia mínima en línea: ${data.programa.asistencia_minima_porcentaje}%`);
  console.log(`  • Límites de similitud: Antiplagio máx. ${data.programa.antiplagio_max_porcentaje}%, IA máx. ${data.programa.ia_max_porcentaje}%`);
  console.log('================================================================\n');
}

// Argumentos CLI
const args = process.argv.slice(2);
printBanner();

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log('Uso:');
  console.log('  node cli.js --list                    (Lista las 16 asignaturas)');
  console.log('  node cli.js "Nombre Asignatura"       (Muestra datos y contenidos por semanas)');
  console.log('  node cli.js "Nombre Asignatura" 3     (Fuerza división en 3 semanas)');
  console.log('  node cli.js "Nombre Asignatura" 4     (Fuerza división en 4 semanas)');
  console.log('  node cli.js --interactive             (Modo interactivo en consola)\n');
} else if (args[0] === '--list' || args[0] === '-l') {
  listSubjects();
} else if (args[0] === '--interactive' || args[0] === '-i') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  listSubjects();
  rl.question('Ingrese el nombre o número de la asignatura: ', (answer) => {
    rl.question('¿Desea ver en 3 o 4 semanas? [3/4] (Enter para automático): ', (weeksAns) => {
      const num = parseInt(answer.trim());
      const forceW = weeksAns.trim() ? parseInt(weeksAns.trim()) : null;
      if (!isNaN(num) && num >= 1 && num <= data.asignaturas.length) {
        showSubject(data.asignaturas[num - 1].id, forceW);
      } else {
        showSubject(answer, forceW);
      }
      rl.close();
    });
  });
} else {
  const lastArg = args[args.length - 1];
  let forceWeeks = null;
  let subjectArgs = args;
  if (lastArg === '3' || lastArg === '4') {
    forceWeeks = lastArg;
    subjectArgs = args.slice(0, -1);
  }
  showSubject(subjectArgs.join(' '), forceWeeks);
}
