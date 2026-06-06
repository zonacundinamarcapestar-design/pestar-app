// PESTAR — App Unificada v1.0
// Catálogo de Productos + Módulo de Capacitación
import { useState, useEffect, useRef } from "react";

// ─── DISTRIBUIDORES ───────────────────────────────────────────────────────────
const DISTRIBUIDORES = [
  { id: "D01", pin: "1234", nombre: "Agroveterinaria El Campo",   ciudad: "Medellín" },
  { id: "D02", pin: "5678", nombre: "Distribuciones AgroNorte",   ciudad: "Montería" },
  { id: "D03", pin: "9012", nombre: "VetSupplies del Llano",      ciudad: "Villavicencio" },
  { id: "D04", pin: "3456", nombre: "Casa Agrícola Palmira",      ciudad: "Palmira" },
  { id: "D05", pin: "7890", nombre: "Agrovex Caribe",             ciudad: "Barranquilla" },
];


// ─── PRODUCTOS (79) ─────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    nombre: "MASCLOXAM®",
    laboratorio: "Coaspharma",
    categoria: "Mastitis",
    especie: ["Bovinos"],
    principioActivo: "Cloxacilina benzatínica 700 mg + Ampicilina trihidrato 350 mg / 10 mL",
    presentaciones: ["Frasco 100 mL"],
    descripcionTecnica: "Suspensión intramamaria a base de Cloxacilina benzatínica 700 mg y Ampicilina trihidrato 350 mg por 10 mL. Indicado para control de mastitis por Streptococcus sp, Staphylococcus sp, Corynebacterium sp y E. coli en período seco. Vía intramamaria al final del último ordeño. Tiempo de retiro: 28 días en carne, 96 horas en leche tras finalizar tratamiento.",
    descripcionComercial: "La mastitis en período seco es una bomba de tiempo que explota en la siguiente lactancia. MASCLOXAM protege la ubre desde el secado hasta el parto con una doble acción: Cloxacilina contra estafilococos resistentes y Ampicilina contra gérmenes gram-negativos. Una sola aplicación por cuarto al secar y su vaca arranca la siguiente producción con la ubre limpia y sana.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["período seco", "intramamario", "doble acción"],
  },
  {
    id: 2,
    nombre: "CALMAYEC®",
    laboratorio: "Coaspharma",
    categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Gluconato de calcio 18.5 g + Glicerofosfato de magnesio 6.02 g + Dextrosa 16.5 g / 100 mL",
    presentaciones: ["Bolsa plástica x 500 mL con venoclisis"],
    descripcionTecnica: "Solución inyectable IV de Calcio-Magnesio-Fósforo-Dextrosa. Indicado en hipocalcemia, fiebre de leche y cetosis. Coadyuvante en raquitismo y osteomalacia. Dosis: bovinos y equinos 100 mL/100 kg PV; porcinos, ovinos y caninos 50 mL/50 kg PV. Administración intravenosa lenta.",
    descripcionComercial: "La fiebre de leche derriba a una vaca de alto mérito genético en cuestión de horas. CALMAYEC repone calcio, fósforo, magnesio y energía en una sola bolsa de 500 mL, directamente a la vena. Resultado en 20–30 minutos: la vaca se para, come y vuelve a producir. Tenga siempre CALMAYEC en la nevera de su cliente — es la diferencia entre salvar o perder una vaca.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["fiebre de leche", "hipocalcemia", "IV", "cetosis"],
  },
  {
    id: 3,
    nombre: "CEBADOR®",
    laboratorio: "Coaspharma",
    categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Complejo B (B1, B6, B12) + Vitamina E + Aminoácidos esenciales + Minerales (Mg, Zn, Cu) + Ácido oleico",
    presentaciones: ["20 mL", "50 mL", "100 mL", "250 mL", "500 mL"],
    descripcionTecnica: "Solución inyectable multivitamínica con complejo B (Tiamina 600 mg, Piridoxina 300 mg, B12 3 mg), Vitamina E 100 mg, 8 aminoácidos esenciales (Lisina 1000 mg, Metionina 210 mg, entre otros), minerales (Mg, Zn, Cu) y Ácido oleico 750 mg por 100 mL. Dosis SC: bovinos/equinos 10 mL; terneros/potros 5 mL; porcinos/ovinos 3 mL. Tres aplicaciones cada 30 días.",
    descripcionComercial: "El animal que no crece, no gana peso y siempre se ve opaco necesita CEBADOR. Es el reconstituyente más completo del mercado: vitaminas del grupo B para el sistema nervioso, aminoácidos esenciales para construir músculo, minerales para el metabolismo y Ácido oleico para proteger el hígado. Un solo frasco transforma el estado general del animal en cuestión de días. Ideal para posvacunación, pospartos, animales estresados o en recuperación.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["reconstituyente", "aminoácidos", "complejo B", "crecimiento"],
  },
  {
    id: 4,
    nombre: "COBALSOL 25®",
    laboratorio: "Coaspharma",
    categoria: "Antiparasitarios",
    especie: ["Bovinos", "Ovinos"],
    principioActivo: "Albendazol 25 g / 100 mL (suspensión oral)",
    presentaciones: ["20 mL"],
    descripcionTecnica: "Antihelmíntico oral de amplio espectro a base de Albendazol 25%. Actúa como larvicida, ovicida y vermicida inhibiendo la polimerización de tubulina. Controla nematodos gastrointestinales (Ostertagia, Haemonchus, Cooperia, etc.), pulmonares (Dictyocaulus viviparus formas adultas y L4) y Fasciola hepática adulta. Dosis: 1 mL/50 kg para parásitos GI; 2 mL/50 kg para Fasciola. Retiro: 14 días carne, 72 h leche. No usar en primeros 45 días de gestación en bovinos.",
    descripcionComercial: "La carga parasitaria invisible es la que más le roba al ganadero: menos leche, menos carne, más mortalidades. COBALSOL 25 es la solución oral de albendazol más potente del mercado, con acción comprobada contra gusanos de estómago, pulmón, tenias y mariposa del hígado. Fácil de administrar con pistola dosificadora, sin agujas, sin estrés para el animal. Desparasita el hato completo en una mañana.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["albendazol", "oral", "fasciola", "amplio espectro"],
  },
  {
    id: 5,
    nombre: "COMPLEVITAN®",
    laboratorio: "Coaspharma",
    categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Tiamina (B1) 10 mg + Riboflavina (B2) 4 mg + Nicotinamida (B3) 100 mg + Cianocobalamina (B12) 40 mcg / mL",
    presentaciones: ["500 mL"],
    descripcionTecnica: "Solución inyectable IM de Complejo B: Tiamina 10 mg, Riboflavina 4 mg, Nicotinamida 100 mg y B12 40 mcg por mL. Indicado en deficiencias vitamínicas del complejo B. Dosis: bovinos/equinos 1 mL/50 kg; terneros/potros/porcinos/ovinos 1 mL/25 kg; perros 0.5 mL/10 kg. Una vez al día por 5 días.",
    descripcionComercial: "Después de un tratamiento antibiótico largo, una diarrea severa o cualquier enfermedad que deprima el metabolismo, el animal pierde sus reservas de vitaminas B. COMPLEVITAN las repone todas en una sola inyección: B1 para el sistema nervioso, B2 para el metabolismo energético, B3 para la piel y mucosas, y B12 contra la anemia. El complemento ideal de cualquier tratamiento.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["complejo B", "postvacunación", "anemia", "metabólico"],
  },
  {
    id: 6,
    nombre: "ELECTROSUERO®",
    laboratorio: "Coaspharma",
    categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Complejo B + Electrolitos (Na, K, Ca, Mg) + Aminoácidos + Dextrosa 5000 mg / 100 mL",
    presentaciones: ["Bolsa plástica x 500 mL con venoclisis"],
    descripcionTecnica: "Solución IV de reposición hídrica y energética con vitaminas B (B2, B3, B6, B12), electrolitos balanceados (Na, K, Ca, Mg), 8 aminoácidos esenciales y Dextrosa 5 g/100 mL. Indicado en deshidratación, anemia, hipoglucemia y cetosis. Dosis: bovinos/equinos 100 mL/100 kg; pequeñas especies 1 mL/kg IV lenta.",
    descripcionComercial: "Un animal deshidratado pierde capacidad productiva por cada hora que pasa sin reposición. ELECTROSUERO actúa en múltiples frentes simultáneamente: rehidrata con electrolitos balanceados, aporta energía inmediata con dextrosa, vitaminas del grupo B para reactivar el metabolismo y aminoácidos para la recuperación tisular. El suero completo para cuando el animal lo necesita todo a la vez.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["deshidratación", "electrolitos", "IV", "cetosis"],
  },
  {
    id: 7,
    nombre: "PRECTIMEC® 3",
    laboratorio: "Coaspharma",
    categoria: "Antiparasitarios",
    especie: ["Bovinos"],
    principioActivo: "Ivermectina 3.15%",
    presentaciones: ["50 mL", "250 mL", "500 mL"],
    descripcionTecnica: "Solución inyectable SC de Ivermectina 3.15% (630 mcg/kg). Endectocida de amplio espectro con protección prolongada de hasta 120 días contra endoparásitos y ectoparásitos (garrapatas, ácaros, piojos). Dosis: 1 mL/50 kg SC. Retiro: 122 días en carne. No administrar en lactancia ni dentro de los 122 días previos al parto. Reg ICA No. 7420 MV.",
    descripcionComercial: "Una sola inyección y su ganado queda protegido por 120 días. PRECTIMEC 3 es la ivermectina de mayor concentración del mercado (3.15%), lo que significa menos volumen inyectado y mayor bienestar animal. Controla gusanos internos, garrapatas, ácaros y piojos en una sola aplicación. Ideal para ganaderías extensivas donde el manejo frecuente es difícil. Aplique hoy y despreocúpese por cuatro meses.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["ivermectina", "120 días", "garrapatas", "endectocida"],
  },
  {
    id: 8,
    nombre: "PRONALGIN®",
    laboratorio: "Coaspharma",
    categoria: "Analgésicos y Antipiréticos",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Dipirona sódica",
    presentaciones: ["Caja 12 frascos x 20 mL", "Frasco x 50 mL"],
    descripcionTecnica: "Analgésico, antipirético y antiespasmódico inyectable a base de Dipirona sódica. Inhibidor de COX no esteroideo, no opioide. Dosis: equinos 4–10 mL/100 kg; bovinos/caprinos/ovinos 2–4 mL/50 kg; porcinos 1.5–5 mL/50 kg; perros/gatos 0.5 mL/10 kg IM o IV lenta. Efecto hasta 1 hora, repetir cada 8 h. Retiro: 12 días carne, 96 h leche. Reg ICA No. 7512 MV.",
    descripcionComercial: "Fiebre alta, cólico intenso, dolor posvacinal: PRONALGIN actúa en minutos. Es el analgésico de confianza para el mostrador porque funciona en todas las especies, no requiere prescripción especial en manejo de rutina y tiene un excelente perfil de seguridad. El vendedor de mostrador puede recomendar PRONALGIN con seguridad cada vez que el productor llegue con un animal adolorido o con fiebre.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["dipirona", "fiebre", "cólico", "analgésico"],
  },
  {
    id: 9,
    nombre: "LIBIDOSEL®",
    laboratorio: "Coaspharma",
    categoria: "Reproductivos",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Fósforo (Fosforilcolamina) + Zinc + Yodo + Selenio + Nicotinamida (B3) / mL",
    presentaciones: ["500 mL"],
    descripcionTecnica: "Solución inyectable IV/IM con minerales reproductivos: Fosforilcolamina 100 mg (Fósforo 22 mg), Sulfato de Zinc 8.23 mg (Zinc 3 mg), Yoduro de Potasio 19.62 mg (Yodo 15 mg), Selenito de Sodio 0.22 mg (Selenio 0.1 mg) y Nicotinamida 35 mg por mL. Indicado en deficiencias minerales reproductivas. Dosis: 1 mL/10–20 kg PV por 3 a 5 días.",
    descripcionComercial: "El ganadero que tiene vacas que no repiten celo, toros con baja libido o altas tasas de mortalidad embrionaria, muchas veces tiene un problema mineral que no se ve a simple vista. LIBIDOSEL corrige de raíz las deficiencias de fósforo, zinc, yodo y selenio — los cuatro minerales que más afectan la reproducción en el trópico. Más preñeces, menos días abiertos, mejor calidad seminal. La rentabilidad empieza en la reproducción.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["fósforo", "selenio", "reproducción", "celo", "toros"],
  },
  {
    id: 10,
    nombre: "MODISAN",
    laboratorio: "Tecnocalidad",
    categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos"],
    principioActivo: "Vitaminas A, D3, E + ATP + Minerales (Ca, Mg, Zn, I, Cu, Co) + Complejo B + 8 Aminoácidos esenciales",
    presentaciones: ["50 mL", "100 mL", "250 mL", "500 mL"],
    descripcionTecnica: "Solución inyectable SC con vitaminas liposolubles (A 1.200.000 UI, D3 500.000 UI, E 1.000 UI), ATP 600 mg, minerales (Ca, Mg, Na, Zn, I, Cu, Co), complejo B (B1, B2, B3, B6, B12) y 8 aminoácidos esenciales (Lisina 1.000 mg, Metionina 230 mg, Arginina 250 mg entre otros) por 100 mL. Dosis: bovinos/equinos 2 mL/100 kg; ovinos/porcinos/caprinos 1 mL/20 kg SC. Repetir a los 30 días. Sin tiempo de retiro.",
    descripcionComercial: "MODISAN es el reconstituyente total: vitaminas liposolubles, complejo B, minerales traza, aminoácidos esenciales y ATP energético en un solo frasco. Para el vendedor de mostrador es la respuesta cuando el cliente llega diciendo que su animal 'está decaído, sin apetito y sin rendimiento'. Una sola inyección abarca todas las carencias posibles. Sin período de retiro, seguro en todas las etapas productivas.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["reconstituyente total", "vitaminas", "aminoácidos", "ATP"],
  },
  {
    id: 11,
    nombre: "QUINACILINA E",
    laboratorio: "Tecnocalidad",
    categoria: "Antibióticos",
    especie: ["Aves"],
    principioActivo: "Enrofloxacina 200 mg / mL",
    presentaciones: ["10 mL", "100 mL", "250 mL", "500 mL", "1000 mL", "Caja 12 goteros x 10 mL"],
    descripcionTecnica: "Solución oral de Enrofloxacina 200 mg/mL (como Clorhidrato 220.3 mg). Antibiótico fluoroquinolona de amplio espectro, bactericida por bloqueo de ADN-girasa. Indicado en pollos de engorde, pollas de reemplazo y productoras para Mycoplasma sp., Pasteurella sp., E. coli, Avibacterium sp., Pseudomona aeruginosa, Staphylococcus aureus y Streptococcus sp. Dosis: 10–20 mg/kg PV por 5 días (1–2 mL / 4 L agua). Retiro: 7 días. ICA No. 6837-MV.",
    descripcionComercial: "Cuando el galpón está en crisis respiratoria o digestiva, QUINACILINA E actúa rápido: va directo al agua de bebida y en horas empieza a controlar Mycoplasma, E. coli y los patógenos más frecuentes en avicultura. Alta concentración (200 mg/mL) = menor volumen, menor estrés de manejo, menor costo por ave. El antibiótico de elección para avicultores que no quieren perder conversión ni mortalidades.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["enrofloxacina", "aves", "agua de bebida", "respiratorio"],
  },
  {
    id: 12,
    nombre: "SULFEMIN",
    laboratorio: "Tecnocalidad",
    categoria: "Antibióticos",
    especie: ["Aves", "Bovinos", "Ovinos"],
    principioActivo: "Amprolio Clorhidrato 18.5 g + Sulfaquinoxalina sódica 17.93 g / 100 g (polvo oral)",
    presentaciones: ["Sobre trilaminado x 25 g", "Caja x 50 sobres x 25 g"],
    descripcionTecnica: "Polvo granulado oral con Amprolio Clorhidrato 18.5 g y Sulfaquinoxalina sódica 17.93 g por 100 g. Anticoccidial + antibiótico sulfonamida. En aves: 6 g/5 L agua por 5–7 días. En bovinos: 5 g/50 kg PV por 3–5 días. En ovinos: 3 g/10 kg PV por 3–5 días. Cubre Eimeria tenella, necatrix, acervulina (aves); Eimeria bovis y zuernii (bovinos/ovinos). Retiro: 10 días (aves). ICA No. 6710-MV.",
    descripcionComercial: "La coccidiosis mata silenciosamente: diarrea sanguinolenta, mortalidad repentina y pérdidas que no se recuperan. SULFEMIN combina dos mecanismos en uno — anticoccidial + sulfonamida — para cortar el brote rápido y prevenir infecciones bacterianas secundarias. Va en el agua o en el alimento, sin jeringas ni estrés. Clave para avicultores, terneros y corderos en sus primeras semanas de vida.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["coccidiosis", "aves", "terneros", "polvo oral"],
  },
  {
    id: 13,
    nombre: "VITAMINOCHOCK®",
    laboratorio: "Tecnocalidad",
    categoria: "Vitaminas y Minerales",
    especie: ["Aves", "Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Vitaminas A, D3, K3, B1-B6-B12, E, Biotina, Inositol + ATP + 17 Aminoácidos forma L + L-Carnitina / litro (oral)",
    presentaciones: ["20 mL", "100 mL", "1000 mL", "5000 mL", "20000 mL"],
    descripcionTecnica: "Suplemento oral líquido con vitaminas liposolubles (A 10.030.000 UI, D3 2.000.000 UI, K3, E) y complejo B completo (B1, B2, B3, B5, B6, B12, Biotina, Inositol), ATP 1.5 g, y 17 aminoácidos en forma L (Lisina 10.4 g, Leucina 8.7 g, L-Carnitina 1.5 g entre otros) por litro. Dosis aves: 1 mL/L agua/día. Bovinos: 1 mL/10 kg/día. Sin tiempo de retiro. ICA No. 21755AL.",
    descripcionComercial: "VITAMINOCHOCK es la vitamina más completa del mercado en presentación líquida oral: va al agua de bebida y llega a todos los animales sin excepción. Sus aminoácidos en forma L (levógira) tienen mayor biodisponibilidad que los convencionales — el cuerpo los absorbe mejor y los resultados se ven más rápido. Ideal para períodos de vacunación, estrés por calor, cambios de etapa productiva o recuperación post-enfermedad. Sin tiempo de retiro.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["oral", "agua de bebida", "multiespecies", "sin retiro"],
  },
  {
    id: 14,
    nombre: "HEMOMIL 600",
    laboratorio: "Tecnocalidad",
    categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Cianocobalamina (B12) 600 mcg + Hierro Dextrano 150 mcg + Complejo B (B1, B2, B3, B6) + Metionina + Lidocaína / mL",
    presentaciones: ["20 mL", "50 mL", "100 mL", "500 mL", "550 mL", "Caja 12 frascos x 20 mL"],
    descripcionTecnica: "Solución inyectable IM antianémica con Cianocobalamina 600 mcg, Hierro Dextrano 150 mcg, Complejo B (B1 125 mg, B2 2.4 mg, B3 100 mg, B6 5 mg), Metionina 10 mg y Lidocaína HCl 10 mg por mL. Indicado en anemias normocrómicas, normocíticas, macrocíticas y megaloblásticas. Coadyuvante en Anaplasmosis, Babesiosis y Tripanosomiasis. Dosis: bovinos/equinos 3–5 mL IM; terneros 2–3 mL. Sin tiempo de retiro. ICA No. 10285-MV.",
    descripcionComercial: "La anemia en bovinos es consecuencia de garrapatas, hemoparásitos o parasitismo severo — y HEMOMIL 600 es el antídoto. Con 600 mcg de B12 por mL (la concentración más alta del mercado), hierro dextrano y todo el complejo B, reactiva la producción de glóbulos rojos y acelera la recuperación. La Lidocaína en la fórmula reduce el dolor de la inyección — el animal no se estresa y usted puede aplicar sin problema. Imprescindible en el kit de recuperación post-Anaplasmosis.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["anemia", "B12", "hemoparásitos", "anaplasmosis"],
  },
  {
    id: 15,
    nombre: "MIOCAN T",
    laboratorio: "Tecnocalidad",
    categoria: "Analgésicos y Antipiréticos",
    especie: ["Mascotas"],
    principioActivo: "Meloxicam 150 mg / 100 mL (solución oral)",
    presentaciones: ["10 mL", "30 mL"],
    descripcionTecnica: "Solución oral de Meloxicam 1.5 mg/mL (150 mg/100 mL). AINE selectivo COX-2 para perros y gatos. Perros: día 1 dosis única 0.20 mg/kg (1 mL/7.5 kg); continuación 0.1 mg/kg/24h hasta 5 días. Gatos: dosis única 0.30 mg/kg (1 mL/5 kg) prequirúrgico. Oral, mezclado con alimento o directo en cavidad oral. No usar en animales deshidratados ni junto a glucocorticoides u otros AINEs. ICA No. 10262-MV.",
    descripcionComercial: "Para el vendedor de mostrador que atiende dueños de mascotas: MIOCAN T es el ibuprofeno veterinario de los perros y gatos. Controla el dolor articular crónico (displasia, artritis, osteoartrosis) y el dolor postoperatorio de castraciones y cirugías de tejidos blandos. Va mezclado con la comida — sin agujas, sin estrés, el dueño lo puede dar en casa. Alta rotación en veterinarias urbanas y tiendas de mascotas.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["meloxicam", "mascotas", "artritis", "postoperatorio"],
  },
  {
    id: 16,
    nombre: "NEO SERPA-RAT",
    laboratorio: "Comervet",
    categoria: "Salud Pública",
    especie: ["Instalaciones pecuarias"],
    principioActivo: "Brodifacouma 0.005% en cebo fresco con aceites vegetales",
    presentaciones: ["Sobre x 30 g (3 cebos)", "Sobre x 50 g (5 cebos)", "1 kg (100 cebos)", "Caja x 35 sobres x 30 g"],
    descripcionTecnica: "Rodenticida anticoagulante en cebo fresco de dosis única a base de Brodifacouma 0.005%. Presentación en bolsitas de papel filtro biodegradable con pasta de aceites vegetales de alta palatabilidad. Activo contra Rattus norvegicus, Rattus rattus, Mus musculus y Microtus arvalis. Una sola ingestión es letal; efectos a los 3–6 días. Colocar cerca de madrigueras, 2 bolsitas por cebadero. ICA 8590-MV / RGSP-309-2010.",
    descripcionComercial: "Las ratas en una granja o bodega no son solo una plaga: destruyen alimento, contaminan agua, transmiten leptospirosis y causan pérdidas silenciosas todos los días. NEO SERPA-RAT las elimina con una sola ingestión y sin generar desconfianza en la colonia — el animal no asocia el cebo con el daño, lo que maximiza la efectividad del control. Fácil de colocar, sin olor, biodegradable. El cebo profesional para granjas, bodegas y plantas de alimento.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["rodenticida", "ratas", "bodega", "granja"],
  },
  {
    id: 17,
    nombre: "ECOREX ALFA",
    laboratorio: "Comervet",
    categoria: "Salud Pública",
    especie: ["Instalaciones pecuarias"],
    principioActivo: "Alfacipermetrina 6.5% + Tetrametrina 3.5% + Butóxido de Piperonilo 17.5% (suspoemulsión)",
    presentaciones: ["30 mL", "120 mL", "500 mL", "1000 mL"],
    descripcionTecnica: "Suspoemulsión insecticida con doble acción: efecto choque inmediato (Tetrametrina + PBO) y efecto residual prolongado (Alfacipermetrina). Controla cucarachas, pulgas, moscas, mosquitos, garrapatas, piojos, ácaros, tábanos y avispas. Dosis habitual: 25 mL en 5 L agua/100 m². Infestaciones fuertes: 50 mL/5 L/100 m². Por pulverización o nebulización. Plazo de seguridad: 12 horas. INVIMA RGSP-0000002-2021.",
    descripcionComercial: "Un galpón o establo con moscas, cucarachas y garrapatas es un galpón enfermo. ECOREX ALFA los derriba en segundos con su efecto choque y los mantiene fuera por semanas con su residual de Alfacipermetrina. Un litro rinde para tratar hasta 400 m². Para el distribuidor, es el insecticida que se vende solo: el cliente lo aplica un viernes y el lunes llega a una instalación limpia.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["insecticida", "cucarachas", "moscas", "residual"],
  },
  {
    id: 18,
    nombre: "FLYBUSTER",
    laboratorio: "Comervet",
    categoria: "Salud Pública",
    especie: ["Instalaciones pecuarias"],
    principioActivo: "Atrayente natural: levadura Saccharomyces cerevisiae + bicarbonato de sodio (cebo líquido)",
    presentaciones: ["Trampa 2 L + cebo 50 g", "Trampa 10 L + cebo 250 g", "Sobre cebo x 50 g", "Sobre cebo x 250 g"],
    descripcionTecnica: "Atrayente natural en polvo a base de levadura Saccharomyces cerevisiae y bicarbonato de sodio. Sin insecticidas. Se activa disuelto en agua dentro de la trampa y se fermenta 48 horas al sol. Trampa 2 L (cebo 50 g): captura hasta 40.000 moscas, cubre 100 m², ubicar a 7–10 m del área a proteger. Trampa 10 L (cebo 250 g): hasta 3.000.000 moscas, 700 m², distancia entre trampas 25 m. Sin precauciones toxicológicas.",
    descripcionComercial: "Para el cliente que no quiere más químicos en su granja pero tiene un problema serio de mosca: FLYBUSTER es la solución 100% natural. Atrae y captura moscas de forma masiva usando fermentación natural — sin venenos, sin olores fuertes, sin riesgo para animales ni personas. Una trampa industrial de 10 litros puede capturar hasta 3 millones de moscas. Fácil de instalar, fácil de mantener, y el cliente lo ve funcionar desde el primer día.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["mosca", "natural", "sin veneno", "trampa"],
  },
  {
    id: 19,
    nombre: "MELOXICAM® 2 mg",
    laboratorio: "Coaspharma",
    categoria: "Analgésicos y Antipiréticos",
    especie: ["Mascotas"],
    principioActivo: "Meloxicam 2 mg / tableta (sabor a carne)",
    presentaciones: ["Caja x 10 tabletas"],
    descripcionTecnica: "Tableta oral sabor carne de Meloxicam 2 mg. AINE COX-2 selectivo del grupo oxicam. Inhibe síntesis de prostaglandinas con efectos antiinflamatorios, analgésicos, antiexudativos y antipiréticos. Inhibe COX-2 en mayor medida que COX-1, reduciendo el riesgo gastrointestinal. Propiedades antiendotóxicas por inhibición de tromboxano B2. Perros: dosis inicial 0.2 mg/kg (1 tableta/10 kg); continuación 0.1 mg/kg (½ tableta/10 kg) cada 24 h por 5–7 días. Vía oral o mezclado con alimento. Reg ICA No. 9894 MV.",
    descripcionComercial: "El dueño de un perro con artritis crónica necesita un analgésico que pueda dar en casa, sin agujas, sin estrés. MELOXICAM en tableta sabor carne es la solución: el perro la acepta sola o mezclada en la comida, una sola vez al día. COX-2 selectivo significa menos riesgo gástrico que los AINEs tradicionales — ideal para tratamientos prolongados. Para la veterinaria o el mostrador: alta rotación en pacientes geriátricos, posquirúrgicos y con displasia de cadera.",
    videoUrl: null,
    fichaUrl: "#",
    etiquetas: ["meloxicam", "tableta", "artritis", "COX-2", "mascotas"],
  },

  // ─── LÍNEA QUALIVET (Made in USA) ─────────────────────────────────────────
  {
    id: 20,
    nombre: "ENZY-PRO™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Pancreatina 4X (Amilasas 10.000 USP, Lipasas 2.500 USP, Proteasas 10.000 USP) + Lactobacillus acidophilus 200 mg / tableta",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Suplemento oral con enzimas digestivas pancreáticas (Pancreatina 4X 100 mg) y Lactobacillus acidophilus 200 mg por tableta de 2.900 mg. Optimiza la digestión de proteínas, grasas y carbohidratos. Previene síntomas de pancreatitis crónica. Perros <9 kg: 1 tableta/día; ≥9 kg: 1–2 tabletas/día. Reg. ICA No. 13524 SL. Made in USA.",
    descripcionComercial: "El perro que vomita seguido, tiene diarrea crónica o siempre parece con hambre a pesar de comer bien, probablemente tiene un problema de digestión enzimática. ENZY-PRO le da las enzimas que le faltan: descompone las proteínas, las grasas y los carbohidratos del alimento para que el cuerpo los aproveche al máximo. El probiótico incluido restaura la flora intestinal y fortalece las defensas. Tableta saborizada — el perro la acepta sola.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["enzimas", "digestión", "probiótico", "pancreatitis"],
  },
  {
    id: 21,
    nombre: "HEPA-TAB™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Silimarina 120 mg + Ácido Alfa Lipoico 25 mg + Alcachofa 10 mg + Complejo B (B1, B2, B6, B12) + Lecitina + Colina + L-Metionina / tableta",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta hepatoprotectora de 2.750 mg con Silimarina (cardo mariano) 120 mg, Ácido Alfa Lipoico 25 mg, Alcachofa 10 mg, complejo B, Lecitina 20 mg, Colina 25.14 mg y L-Metionina 10 mg. Protege y regenera el hígado, equilibra colesterol, mejora circulación. Dosis por peso: hasta 4.5 kg ½ tableta; 4.5–10 kg 1 tableta; 10–18 kg 1½; >18 kg 2 tabletas. Reg. ICA No. 13966 SL.",
    descripcionComercial: "El hígado del perro trabaja todo el tiempo — procesa medicamentos, toxinas y grasas. HEPA-TAB lo protege y lo regenera con la combinación más completa del mercado: Silimarina del cardo mariano (el hepatoprotector natural más estudiado), Ácido Alfa Lipoico antioxidante, Alcachofa para la vesícula, y complejo B para el metabolismo. Ideal post-tratamientos antibióticos prolongados, en perros con hígado graso o adultos mayores.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["hígado", "silimarina", "hepatoprotector", "antioxidante"],
  },
  {
    id: 22,
    nombre: "TRIPLE-OMEGA™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Omega 3 (EPA 20 mg + DHA 10 mg) + Omega 6 (Linoleico 100 mg + GLA 75 mg) + Zinc 10 mg + Vitaminas A, D3, E / tableta",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta de 2.780 mg con Omegas 3 y 6 balanceados: Ácido Linoleico 100 mg, GLA 75 mg, EPA 20 mg, DHA 10 mg, Gluconato de Zinc 10 mg, Vitamina A 2.500 UI, D3 300 UI, E 20 UI. Mejora piel, pelaje, función cerebral y cardiovascular. Reduce prurito en alergias hasta 40%. Dosis: hasta 5 kg ½ tableta; 6–15 kg 1 tableta; 16–22 kg 1½; 23–30 kg 2 tabletas. Reg. ICA No. 13370 SL.",
    descripcionComercial: "El pelaje opaco, la piel reseca y el prurito constante son las quejas más frecuentes en veterinarias urbanas. TRIPLE-OMEGA las resuelve desde adentro: Omegas 3 y 6 en proporción balanceada nutren la piel, dan brillo al pelaje y reducen la inflamación alérgica hasta en un 40%. El DHA mejora la función cerebral en perros mayores y el Zinc refuerza el sistema inmune. Un suplemento que el dueño ve funcionar en semanas.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["omega 3", "omega 6", "pelaje", "alergias", "piel"],
  },
  {
    id: 23,
    nombre: "ARTRI-VET™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Glucosamina HCl 600 mg + Condroitin Sulfato 500 mg + Colágeno Hidrolizado 50 mg + MSM 100 mg / tableta",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta condroprotectora de 2.920 mg con Glucosamina HCl 600 mg, Condroitin Sulfato 500 mg, Colágeno Hidrolizado 50 mg y MSM 100 mg. Indicado en osteoartritis, osteoartrosis, displasia de cadera, inflamación articular y recuperación postoperatoria. Dosis: hasta 5 kg ½ tab; 6–18 kg 1 tab; >19 kg 2 tab. Reg. ICA No. 13666 SL.",
    descripcionComercial: "La displasia de cadera y la artritis son las condiciones más dolorosas y frecuentes en perros medianos y grandes. ARTRI-VET lleva directamente al cartílago los cuatro ingredientes que necesita para regenerarse: Glucosamina como bloque constructor, Condroitina para retener agua en el cartílago, Colágeno para la estructura y MSM como antiinflamatorio natural. El dueño nota la diferencia en movilidad en 3–4 semanas. Alta rotación en clínicas y pet shops.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["articulaciones", "glucosamina", "displasia", "cartílago"],
  },
  {
    id: 24,
    nombre: "VITAMINAS + HIERRO™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Hemoglobina 50 mg + Hierro Carbonil 50 mg + Vitamina B12 500 mcg + B1 2 mg + B2 2 mg + B6 2 mg / tableta",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta de 3.000 mg antianémica con Hemoglobina 50 mg, Hierro Carbonil 50 mg, Vitamina B12 500 mcg, B1, B2 y B6 2 mg cada una. Favorece producción de glóbulos rojos, fortalece sistema inmune, mejora conversión de carbohidratos en energía. Dosis: <13 kg ½ tableta; >13 kg 1–2 tabletas. Reg. ICA No. 13943 SL.",
    descripcionComercial: "El perro que está siempre cansado, con las mucosas pálidas o que no recupera energía después de una enfermedad o cirugía, necesita hierro. VITAMINAS + HIERRO aporta hierro carbonil de alta absorción junto con Hemoglobina y todo el complejo B para que el organismo fabrique más glóbulos rojos y transporte mejor el oxígeno. El resultado es un perro con más energía, mejor apetito y recuperación más rápida.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["anemia", "hierro", "energía", "recuperación"],
  },
  {
    id: 25,
    nombre: "AMINOÁCIDOS + VITAMINAS™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "L-Triptófano 15 mg + L-Teanina 15 mg + Vitamina B6 10 mg + Vitamina B3 (Niacina) 10 mg / tableta",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta de 2.960 mg con L-Triptófano 15 mg (precursor de serotonina), L-Teanina 15 mg, Piridoxina 10 mg y Niacina 10 mg. Reduce ansiedad y agresividad, mejora comportamiento. Dosis: <4.5 kg ½ tableta; 4.5–11.5 kg 1 tableta; >11.5 kg 2 tabletas. Reg. ICA No. 13924 SL.",
    descripcionComercial: "El perro ansioso, agresivo o con miedo a los truenos y los viajes no tiene un problema de carácter — tiene un déficit de serotonina. AMINOÁCIDOS + VITAMINAS aporta L-Triptófano, el aminoácido que el organismo convierte en serotonina, más L-Teanina para un efecto calmante sin sedación. El dueño puede darlo antes de situaciones estresantes o como suplemento diario para perros con ansiedad crónica. Sin efectos secundarios, sin receta.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["ansiedad", "comportamiento", "triptófano", "serotonina"],
  },

  // ─── LÍNEA PERRITOS (Razas pequeñas) ──────────────────────────────────────
  {
    id: 26,
    nombre: "PERRITOS Hierro + Vitamina B12™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Vitamina B12 250 mcg + Hierro 25 mg + Cobalto 0.27 mg / tableta (razas pequeñas)",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta de 1.050 mg para razas pequeñas con B12 250 mcg, Hierro Carbonil 25 mg y Cobalto 0.27 mg. Reconstituyente antianémico, estimula apetito y desarrollo. Coadyuvante en recuperación de cirugías, traumas y estrés. Dosis: <2.5 kg 1 tab; 2.5–5 kg 1–2 tab; 5–10 kg 2–3 tab. Reg. ICA No. 16689 SL.",
    descripcionComercial: "Los perros de raza pequeña necesitan dosis precisas — un suplemento de perro grande puede ser excesivo para un Chihuahua o un Yorkshire. PERRITOS Hierro + B12 está formulado exactamente para ellos: combate la anemia, estimula el apetito y acelera la recuperación post-cirugía o post-enfermedad en las dosis correctas para su tamaño. Tableta pequeña y saborizada que el perrito acepta sin problema.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["razas pequeñas", "anemia", "B12", "posquirúrgico"],
  },
  {
    id: 27,
    nombre: "PERRITOS Calcio + Vitamina D3™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Calcio 123 mg + Fósforo 42 mg + Vitamina D3 30 UI / tableta (razas pequeñas)",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta de 1.100 mg para razas pequeñas con Calcio 123 mg, Fósforo 42 mg y Vitamina D3 30 UI. Mantiene huesos y dientes sanos, previene y trata osteoporosis y raquitismo. Indicado en gestación y lactancia para prevenir hipocalcemia postparto. Dosis: <2.5 kg 1 tab; 2.5–5 kg 1–2 tab; 5–10 kg 2–3 tab. Reg. ICA No. 16690 SL.",
    descripcionComercial: "Las perritas de raza pequeña en gestación o lactancia son las más vulnerables a la hipocalcemia — pueden convulsionar días después del parto si no reciben calcio adicional. PERRITOS Calcio + D3 previene este cuadro y también apoya el desarrollo óseo en cachorros y la salud articular en adultos mayores. Un básico que toda tienda de mascotas debería tener siempre en vitrina.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["calcio", "razas pequeñas", "gestación", "huesos"],
  },
  {
    id: 28,
    nombre: "PERRITOS Enzimas Digestivas + Probióticos™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Pancreatina 4X 250 mg (Amilasas 2.500 USP, Lipasas 625 USP, Proteasas 2.500 USP) + Lactobacillus acidophilus 1×10⁷ UFC / tableta",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta de 1.100 mg para razas pequeñas con Pancreatina 4X 250 mg y Lactobacillus acidophilus. Combate mal aliento, flatulencias y diarreas crónicas. Restaura flora intestinal y mejora absorción de nutrientes. Dosis: <2.5 kg 1 tab; 2.5–5 kg 1–2 tab; 5–10 kg 2–3 tab. Reg. ICA No. 16693 SL.",
    descripcionComercial: "El mal aliento y los gases en perros pequeños son una queja constante de los dueños — y muchas veces el problema está en el intestino, no en la boca. PERRITOS Enzimas + Probióticos restaura el equilibrio digestivo desde la raíz: enzimas para descomponer bien el alimento, y probióticos para repoblar la flora intestinal. Resultado en 2–3 semanas: mejor aliento, menos gases, heces más firmes y un perrito más activo.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["digestión", "probiótico", "mal aliento", "razas pequeñas"],
  },
  {
    id: 29,
    nombre: "PERRITOS Glucosamina + Condroitina + MSM + Colágeno™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Glucosamina 250 mg + Condroitin 200 mg + Colágeno Hidrolizado 50 mg + MSM 50 mg / tableta (razas pequeñas)",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta condroprotectora de 1.100 mg para razas pequeñas con Glucosamina 250 mg, Condroitin 200 mg, Colágeno Hidrolizado 50 mg y MSM 50 mg. Indicado en artritis, tendinitis, displasia de cadera y recuperación postoperatoria en perros adultos. Dosis: <2.5 kg 1 tab; 2.5–5 kg 1–2 tab; 5–10 kg 2–3 tab. Reg. ICA No. 16692 SL.",
    descripcionComercial: "Las razas pequeñas también sufren artritis y problemas articulares — especialmente Dachshunds, Chihuahuas y Bulldogs. PERRITOS Articular tiene la fórmula completa en la dosis exacta para su tamaño: Glucosamina + Condroitina + Colágeno + MSM para regenerar el cartílago, reducir la inflamación y devolverle movilidad al perro. Ideal para perros a partir de los 5–6 años como prevención, o en cualquier edad ante señales de dolor articular.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["articulaciones", "razas pequeñas", "glucosamina", "cartílago"],
  },
  {
    id: 30,
    nombre: "PERRITOS Silimarina + Ácido Lipoico + Complejo B + Alcachofa™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Silimarina 50 mg + Ácido Alfa Lipoico 7.5 mg + Alcachofa 5 mg + Complejo B (B1, B2, B6, B12) + Lecitina + Colina + L-Metionina / tableta",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta hepatoprotectora de 1.100 mg para razas pequeñas con Silimarina 50 mg, Ácido Alfa Lipoico 7.5 mg, Extracto de Alcachofa 5 mg, complejo B, Lecitina 5 mg, Colina 5 mg y L-Metionina 5 mg. Desintoxicante, protector y regenerador hepático. Facilita vaciamiento biliar y remoción de grasa. Reg. ICA No. 16705 SL.",
    descripcionComercial: "Los perros de razas pequeñas son especialmente sensibles al hígado graso y a la acumulación de toxinas — comen alimentos procesados, reciben múltiples medicamentos y viven en ambientes urbanos. PERRITOS Hepático los protege con Silimarina, el antioxidante hepático más efectivo, más alcachofa para la vesícula y complejo B para el metabolismo. Formulado en la dosis correcta para perros hasta 10 kg.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["hígado", "razas pequeñas", "silimarina", "desintoxicante"],
  },
  {
    id: 31,
    nombre: "PERRITOS Vitaminas + Minerales™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Vitaminas A, D3, E + Complejo B completo + Minerales (Ca, P, Fe, Cu, Co, I, Zn, Mn) / tableta (razas pequeñas)",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Multivitamínico mineral completo de 1.100 mg para razas pequeñas con Vitaminas A 500 UI, D3 30 UI, E 0.5 mg, complejo B completo (B1, B2, B6, B12, B5, Niacina, Ácido fólico, Colina) y minerales (Calcio, Fósforo, Hierro, Cobre, Cobalto, Yodo, Zinc, Manganeso). Estimula apetito. Indicado en perros débiles, gestantes, lactantes y mayores. Reg. ICA No. 16691 SL.",
    descripcionComercial: "El multivitamínico diario que todo perro pequeño debería tomar. PERRITOS Vitaminas + Minerales cubre todas las necesidades en un solo producto: vitaminas liposolubles, todo el complejo B y los 8 minerales esenciales. Especialmente útil para perros quisquillosos con la comida, en recuperación, gestantes o mayores de 7 años. El dueño lo da como premio — tableta saborizada a tocino que el perro busca él solo.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["multivitamínico", "razas pequeñas", "minerales", "apetito"],
  },
  {
    id: 32,
    nombre: "PERRITOS Omegas + Vitaminas + Zinc™",
    laboratorio: "QualiVet",
    categoria: "Suplementos Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Omega 6 (Linoleico 50 mg + GLA 30 mg) + Omega 3 (DHA 10 mg + EPA 5 mg) + Zinc 5 mg + Vitaminas A, D3, E / tableta (razas pequeñas)",
    presentaciones: ["60 tabletas saborizadas"],
    descripcionTecnica: "Tableta de 1.100 mg para razas pequeñas con Omegas 3 y 6: Linoleico 50 mg, GLA 30 mg, DHA 10 mg, EPA 5 mg, Zinc 5 mg, Vitamina A 500 UI, D3 30 UI, E 10 UI. Piel sana, pelo sedoso, previene alergias y pérdida de pelo. Mantiene bajos colesterol y triglicéridos. Reg. ICA No. 16706 SL.",
    descripcionComercial: "Los Yorkshires, Malteses y Poodles son razas especialmente propensas a perder pelo y tener piel sensible. PERRITOS Omegas + Zinc los cuida desde adentro: Omega 3 y 6 nutren el folículo piloso y la piel, el Zinc regula la producción de sebo y las vitaminas antioxidantes protegen contra el daño ambiental. En 4–6 semanas el dueño nota un pelaje más brillante, menos caída y menos rascado.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["omega", "pelaje", "razas pequeñas", "piel", "zinc"],
  },
  // ─── ANTIINFLAMATORIOS NUEVOS ───────────────────────────────────────────────
  {
    id: 33,
    nombre: "ALGILIS®", laboratorio: "Coaspharma", categoria: "Antiinflamatorios",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Salicilato de Metilo + Trementina + Guayacol + Alcanfor + Mentol (uso tópico)",
    presentaciones: ["Pote x 120 g", "Pote x 220 g", "Pote x 350 g"],
    descripcionTecnica: "Antiinflamatorio y analgésico tópico a base de Salicilato de Metilo, Trementina, Guayacol, Alcanfor y Mentol. Indicado en bovinos, equinos, ovinos, caprinos, porcinos, perros y gatos para procesos musculares, osteoarticulares y tendinosos no infecciosos. Coadyuvante en mastitis y edema de ubre postparto. Aplicar masajeando 2-3 veces/día. Reg. ICA No. 8990 MV.",
    descripcionComercial: "El antiinflamatorio que se aplica con las manos y el cliente ve funcionar al instante. ALGILIS alivia golpes, contusiones, dolor articular y muscular en cualquier especie — desde el caballo de paso fino hasta la mascota de la casa. Su fórmula con mentol y alcanfor genera calor terapéutico y mejora la circulación local. En la ubre postparto reduce el edema y facilita el ordeño. Sin agujas, sin estrés.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["tópico", "masaje", "antiinflamatorio", "golpes"],
  },
  {
    id: 34,
    nombre: "KETONEL®", laboratorio: "Coaspharma", categoria: "Antiinflamatorios",
    especie: ["Bovinos", "Equinos", "Porcinos", "Mascotas"],
    principioActivo: "Ketoprofeno 10% (100 mg/mL)",
    presentaciones: ["Frasco x 10 mL", "Frasco x 50 mL"],
    descripcionTecnica: "AINE inyectable a base de Ketoprofeno 10%. Indicado en equinos, perros y gatos para afecciones osteoarticulares no infecciosas. En bovinos como coadyuvante en mastitis clínica aguda. En porcinos como antipirético en afecciones respiratorias. Dosis: bovinos/porcinos 3 mL/100 kg IM/IV; equinos 1 mL/45 kg IV; perros/gatos 0.1 mL/5 kg IM/IV/SC. Reg. ICA No. 7511 MV.",
    descripcionComercial: "KETONEL lleva Ketoprofeno — uno de los antiinflamatorios más potentes y rápidos disponibles en veterinaria. Ideal para el mostrador cuando el cliente llega con un caballo con cólico, un perro con dolor articular agudo, o una vaca con mastitis clínica severa que necesita reducir la inflamación de inmediato. Frasco pequeño de 10 mL: perfecto para venta unitaria en clínicas pequeñas.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["ketoprofeno", "cólico", "mastitis", "antiinflamatorio"],
  },
  {
    id: 35,
    nombre: "MEGLUNIX®", laboratorio: "Coaspharma", categoria: "Antiinflamatorios",
    especie: ["Bovinos", "Equinos", "Porcinos"],
    principioActivo: "Flunixin Meglumina 5% (50 mg/mL)",
    presentaciones: ["Frasco x 50 mL"],
    descripcionTecnica: "AINE inyectable de Flunixin Meglumina 5%. Indicado en equinos como analgésico y antiinflamatorio en trastornos musculoesqueléticos y cólico. En bovinos como antipirético. En porcinos para inflamación, dolor y fiebre asociados a mastitis, metritis y desórdenes musculoesqueléticos. Dosis: bovinos/porcinos 2.2 mg/kg (2 mL/45 kg) cada 24 h; equinos 1.1 mg/kg (1 mL/45 kg) cada 24 h. Reg. ICA No. 7452 MV.",
    descripcionComercial: "MEGLUNIX con Flunixin Meglumina es el antiinflamatorio de referencia para cólico en equinos — es el que los veterinarios piden por nombre propio. También es clave en el tratamiento de la mastitis bovina severa y en porcinos con fiebre. Alta rotación en caballerizas, porcícolas y hatos lecheros de alta producción donde el control del dolor y la inflamación es parte del protocolo diario.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["flunixin", "cólico equino", "antipirético", "mastitis"],
  },

  // ─── ANTIBIÓTICOS NUEVOS ────────────────────────────────────────────────────
  {
    id: 36,
    nombre: "PENTRIVET® 10", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Penicilina G Benzatínica + Procaínica + Sódica (357.141 UI/mL)",
    presentaciones: ["Frasco ampolla 10'000,000 UI"],
    descripcionTecnica: "Antibiótico de triple acción penicilínica: Penicilina G Sódica (acción rápida), Procaínica (acción intermedia) y Benzatínica (acción prolongada). Dosis: 10.000 a 20.000 UI/kg, en práctica 1 mL/19 kg IM profunda. Para bovinos, equinos, ovinos, caprinos, porcinos y perros ante gérmenes sensibles a penicilinas. Reg. ICA No. 7438 MV.",
    descripcionComercial: "La penicilina clásica en su mejor versión: tres formas en un solo frasco para una cobertura completa. La Sódica actúa en minutos, la Procaínica sostiene el nivel por 24 h y la Benzatínica mantiene la protección por días. PENTRIVET® 10 es el antibiótico de emergencia que no debe faltar en ninguna veterinaria — para infecciones respiratorias, pie, piel y tejidos blandos por gérmenes gram-positivos.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["penicilina", "triple acción", "emergencia", "infecciones"],
  },
  {
    id: 37,
    nombre: "CEFTIOFUR®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Bovinos", "Porcinos"],
    principioActivo: "Ceftiofur HCL 50 mg/mL (cefalosporina 3ª generación)",
    presentaciones: ["Frasco x 50 mL", "Frasco x 100 mL"],
    descripcionTecnica: "Cefalosporina de 3ª generación inyectable. En bovinos: enfermedad respiratoria bovina, podostitis, mastitis severa, metritis, infecciones por Pasteurella, Haemophilus, E. coli, Salmonella, Fusobacterium. Dosis bovinos: 1–2 mg/kg IM (1–2 mL/50 kg) cada 24 h por 3–5 días. Porcinos: 3–5 mg/kg IM (0.6–1 mL/10 kg) cada 24 h por 3 días. Reg. ICA No. 9660 MV.",
    descripcionComercial: "CEFTIOFUR es la cefalosporina de referencia en ganadería bovina. Cuando las penicilinas y las tetraciclinas ya no bastan, CEFTIOFUR con su amplio espectro de 3ª generación elimina los gérmenes más resistentes del aparato respiratorio, el pie y el útero. Es el antibiótico que el ganadero pide cuando el animal no responde a los tratamientos habituales. Alta percepción de valor — justifica su precio.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["cefalosporina", "respiratorio bovino", "metritis", "resistencia"],
  },
  {
    id: 38,
    nombre: "ENFLOVET®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Aves", "Mascotas"],
    principioActivo: "Enrofloxacina 50 mg/mL (fluoroquinolona inyectable)",
    presentaciones: ["Frasco x 10 mL", "Frasco x 50 mL"],
    descripcionTecnica: "Fluoroquinolona inyectable de amplio espectro. Cubre E. coli, Proteus, Clostridium, Salmonella, Pasteurella, Bordetella, Mycoplasma, Staphylococcus y más. Dosis SC/IM/IV: bovinos 5 mL/100 kg; cerdos 0.5 mL/10 kg IM; ovinos/perros/gatos 0.5 mL/5 kg SC; pollos/gallinas 10 mg/kg IM (0.5 mL/2 kg). Reg. ICA No. 7503 MV.",
    descripcionComercial: "ENFLOVET es la enrofloxacina inyectable multiespecies: desde el becerro con diarrea fulminante hasta el perro con infección urinaria severa que no responde a antibióticos de primera línea. Un solo frasco, múltiples aplicaciones. Su amplio espectro cubre los gérmenes gram-negativos más problemáticos de la ganadería y la medicina de pequeñas especies. Venta de alta confianza para el mostrador.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["enrofloxacina", "amplio espectro", "multiespecies", "inyectable"],
  },
  {
    id: 39,
    nombre: "DEXAMICIN®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Penicilina G Procaínica + Potásica + Estreptomicina + Dexametasona",
    presentaciones: ["Frasco x 30 mL"],
    descripcionTecnica: "Combinación antibiótica con acción antiinflamatoria. Penicilina + Estreptomicina para cobertura gram-positiva y gram-negativa, más Dexametasona para reducir inflamación simultáneamente. Dosis: penicilina 10.000–20.000 UI/kg + estreptomicina 15–25 mg/kg; práctica 1 mL/10 kg IM. Indicado en infecciones generales en bovinos, equinos, porcinos, ovinos, caprinos y perros. Reg. ICA No. 7510 MV.",
    descripcionComercial: "Dos problemas, un solo frasco. DEXAMICIN combina el antibiótico más clásico con un corticoide: mientras la penicilina y la estreptomicina eliminan el germen, la dexametasona baja la inflamación y el animal mejora visiblemente más rápido. Muy valorado por ganaderos que quieren ver respuesta en las primeras 12 horas. Ideal para infecciones con componente inflamatorio importante.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["penicilina", "estreptomicina", "corticoide", "rápida respuesta"],
  },
  {
    id: 40,
    nombre: "PROMASTIT®", laboratorio: "Coaspharma", categoria: "Mastitis",
    especie: ["Bovinos"],
    principioActivo: "Lincomicina + Neomicina + Dexametasona (intramamario)",
    presentaciones: ["Caja x 12 jeringas x 10 mL"],
    descripcionTecnica: "Antibiótico intramamario triple para mastitis en lactancia. Lincomicina y Neomicina cubren E. coli, Corynebacterium bovis, Corynebacterium pyogenes y Streptococcus agalactiae. Dexametasona reduce inflamación. Aplicar previa desinfección y ordeño completo, masajear la ubre. Cada 12, 24 o 48 h según criterio veterinario. Reg. ICA No. 7507 MV.",
    descripcionComercial: "Mientras MASCLOXAM protege la ubre en período seco, PROMASTIT actúa durante la lactancia. Para la vaca que está produciendo leche y tiene mastitis clínica activa — con ubre caliente, dolor e inflamación — PROMASTIT combina dos antibióticos más un corticoide para atacar el germen y calmar la inflamación al mismo tiempo. En caja de 12 jeringas: económico para el ganadero y rentable para el distribuidor.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["mastitis lactancia", "intramamario", "triple acción", "ubre"],
  },
  {
    id: 41,
    nombre: "PROMACTYL 200®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Bovinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Tilosina Base 200 mg/mL (macrólido inyectable)",
    presentaciones: ["Frasco x 100 mL", "Frasco x 250 mL"],
    descripcionTecnica: "Macrólido inyectable IM de Tilosina 200 mg/mL. Indicado en bovinos para neumonía por Pasteurella; porcinos para neumonía y artritis por Mycoplasma; perros para infecciones respiratorias. Dosis: 10 mg/kg (1 mL/20 kg) IM. No inyectar más de 10 mL/sitio en bovinos, 5 mL en porcinos, 1 mL en perros. Máximo 5 días. Reg. ICA No. 7558 MV.",
    descripcionComercial: "PROMACTYL 200 es el antibiótico de elección cuando Mycoplasma está involucrado — un germen que no responde a penicilinas ni cefalosporinas. En porcinos con síndrome respiratorio o artritis, y en bovinos con neumonía por Pasteurella, PROMACTYL entra donde otros antibióticos no llegan. Su alta concentración (200 mg/mL) reduce el volumen a inyectar y el estrés del manejo.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["tilosina", "mycoplasma", "respiratorio", "macrólido"],
  },
  {
    id: 42,
    nombre: "SPIRAM-V®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Bovinos", "Porcinos", "Ovinos", "Aves", "Mascotas"],
    principioActivo: "Espiramicina 520.000 UI/mL (macrólido inyectable)",
    presentaciones: ["Frasco x 13'000,000 UI"],
    descripcionTecnica: "Macrólido inyectable de Espiramicina 520.000 UI/mL. Indicado para Streptococcus sp., Corynebacterium sp. y Mycoplasma sp. en bovinos, porcinos, ovinos y caninos; y Mycoplasma sp. en pollos/pollas. Dosis bovinos adultos: 30.000 UI/kg (1 mL/17 kg) IM, aplicación única o según severidad. Terneros/porcinos/perros/ovinos: 75.000 UI/kg (1 mL/7 kg). Reg. ICA No. 7526 MV.",
    descripcionComercial: "SPIRAM-V tiene un perfil único: macrólido con concentración muy alta que permite aplicación única en la mayoría de los casos. Un solo pinchazo y el tratamiento está completo — enorme ventaja para el ganadero que quiere minimizar el manejo. Especialmente efectivo contra Mycoplasma y estreptococos en pulmón, piel y vías respiratorias. Presentación de ampolla grande: ideal para tratamientos de rebaño.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["espiramicina", "dosis única", "mycoplasma", "macrólido"],
  },
  {
    id: 43,
    nombre: "TETRAX®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Aves", "Mascotas"],
    principioActivo: "Oxitetraciclina 50 mg/mL",
    presentaciones: ["Frasco x 50 mL", "Frasco x 500 mL"],
    descripcionTecnica: "Tetraciclina inyectable de amplio espectro (50 mg/mL). Para bovinos, equinos, porcinos, caprinos, ovinos: 1 mL/10 kg IM/IV/SC una vez al día por 5 días. Perros: 1.5 mL/10 kg. Para Anaplasmosis: 20 mL/100 kg. Aves: 1 mL/kg (50 mg/kg) diario por 5 días. Reg. ICA No. 7051 MV.",
    descripcionComercial: "TETRAX es la oxitetraciclina de amplio espectro, el antibiótico más versátil del portafolio: funciona en todas las especies y es especialmente efectivo en Anaplasmosis bovina, una enfermedad que cobra ganado cuando no se trata a tiempo. En aves se administra intramuscular para casos graves que no responden al agua de bebida. Presentación de 500 mL: excelente relación costo-eficacia para hatos grandes.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["oxitetraciclina", "anaplasmosis", "amplio espectro", "multiespecies"],
  },
  {
    id: 44,
    nombre: "TETRAX 200 NF®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Bovinos", "Porcinos", "Ovinos", "Aves"],
    principioActivo: "Oxitetraciclina 200 mg/mL (larga acción)",
    presentaciones: ["Frasco x 50 mL", "Frasco x 250 mL", "Frasco x 500 mL"],
    descripcionTecnica: "Oxitetraciclina de alta concentración (200 mg/mL). En bovinos/ovinos/caprinos/porcinos: 20 mg/kg (1 mL/10 kg) IM profunda; no exceder 10 mL/sitio en bovinos. En gallinas/pollos/pavos: 50 mg/kg (0.25 mL/kg) SC en región posterior del cuello; una sola aplicación da niveles terapéuticos por 5 días. Reg. ICA No. 8934 MV.",
    descripcionComercial: "La versión premium de la oxitetraciclina: 4 veces más concentrada que TETRAX estándar, menos volumen por animal y efecto prolongado. En aves, una sola inyección SC cubre 5 días de tratamiento — ideal para lotes grandes donde inyectar dos veces es inviable. En bovinos, permite tratar animales con menos stress de manejo. El ganadero moderno prefiere la presentación de larga acción.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["oxitetraciclina", "larga acción", "aves", "concentrado"],
  },
  {
    id: 45,
    nombre: "TRIPECTIN®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Estreptomicina + Pectina Cítrica + Caolín Coloidal (oral)",
    presentaciones: ["Caja x 50 sobres x 20 g"],
    descripcionTecnica: "Antibiótico oral para diarreas y enteritis infecciosas. Estreptomicina antibacteriana + Pectina y Caolín como protectores de la mucosa intestinal. Dosis: 5 g (1 cucharada) disuelto en agua por cada 10 kg de peso cada 6-12 horas por 4-5 días. Para equinos, bovinos, porcinos, ovinos, caprinos y perros. Reg. ICA No. 7439 MV.",
    descripcionComercial: "La diarrea infecciosa es la primera causa de mortalidad en terneros y lechones. TRIPECTIN lo resuelve vía oral con doble mecanismo: la estreptomicina mata el germen, mientras la pectina y el caolín forman una barrera protectora sobre la mucosa intestinal que frena la pérdida de líquidos. Sobre en polvo: fácil de dosificar, fácil de transportar a campo, sin cadena de frío.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["diarrea", "terneros", "oral", "intestinal"],
  },

  // ─── ANTIPARASITARIOS NUEVOS ─────────────────────────────────────────────────
  {
    id: 46,
    nombre: "ANTRIBAXOL®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Bovinos", "Equinos", "Ovinos", "Mascotas"],
    principioActivo: "Diaceturato de Diminazeno + Oxitetraciclina + Antipirina + Vitamina B12",
    presentaciones: ["Frasco x 30 mL", "Frasco x 100 mL", "Frasco x 250 mL", "Frasco x 500 mL"],
    descripcionTecnica: "Antiprotozoario e-hemoparasitario inyectable IM. Indicado para Anaplasmosis (Anaplasma sp.), Babesiosis (B. bigemina, B. canis) y Tripanosomiasis (T. evansi, T. vivax) en bovinos, ovinos, equinos y perros. Dosis: bovinos/ovinos/equinos 1 mL/10 kg IM. Perros: 1 mL/12 kg, aplicación única. Reg. ICA No. 7559 MV.",
    descripcionComercial: "El tratamiento de choque para Anaplasmosis y Babesiosis — las dos enfermedades que más matan ganado en el trópico colombiano. ANTRIBAXOL combina el antiprotozoario más efectivo contra garrapatas transmisoras con oxitetraciclina y vitamina B12 para la recuperación. Cuando el animal llega temblando, con fiebre alta y mucosas pálidas, ANTRIBAXOL es la primera elección. Tenga siempre en nevera.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["anaplasmosis", "babesiosis", "hemoparásitos", "emergencia"],
  },
  {
    id: 47,
    nombre: "VERMIZOL®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Bovinos", "Equinos", "Ovinos"],
    principioActivo: "Fenbendazol 10% (oral)",
    presentaciones: ["Jeringa x 20 mL", "Frasco x 200 mL", "Garrafa x 500 mL", "Garrafa x 1000 mL", "Garrafa x 2000 mL"],
    descripcionTecnica: "Antihelmíntico oral de amplio espectro a base de Fenbendazol 10%. Actúa en estados adultos, larvarios y huevos de parásitos pulmonares y gastrointestinales. Dosis: bovinos y ovinos 5 mg/kg (5 mL/100 kg); equinos 7.5 mg/kg (7.5 mL/100 kg) oral. Reg. ICA No. 7424 MV.",
    descripcionComercial: "VERMIZOL con Fenbendazol es el desparasitante oral que actúa en las tres etapas del parásito: huevos, larvas y adultos — la mayoría solo actúa contra adultos. Eso significa que con VERMIZOL el ganadero rompe el ciclo de vida del parásito completamente, no solo elimina los que ve. Disponible en garrafa de hasta 2 litros para desparasitación de hatos completos con pistola dosificadora.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["fenbendazol", "larvas", "huevos", "oral"],
  },
  {
    id: 48,
    nombre: "PRECTIMEC®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Bovinos", "Porcinos"],
    principioActivo: "Ivermectina 1% (200 mcg/kg)",
    presentaciones: ["Frasco x 50 mL", "Frasco x 250 mL", "Frasco x 500 mL"],
    descripcionTecnica: "Ivermectina al 1% inyectable SC. En bovinos: 200 mcg/kg (1 mL/50 kg SC). En porcinos: 300 mcg/kg (1 mL/33 kg SC). Controla parásitos gastrointestinales y pulmonares. Hermano menor de PRECTIMEC® 3 — misma molécula, menor concentración, presentación estándar. Reg. ICA No. 7419 MV.",
    descripcionComercial: "La ivermectina clásica al 1%, el desparasitante de referencia de la ganadería colombiana. PRECTIMEC® es la elección para distribuidores que atienden productores con menor poder adquisitivo o que prefieren la presentación estándar. La misma molécula confiable de siempre, en la concentración que el mercado conoce. Ideal para el primer contacto del ganadero con la marca Coaspharma.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["ivermectina", "clásica", "porcinos", "SC"],
  },
  {
    id: 49,
    nombre: "PRONALMISOL®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Bovinos", "Porcinos", "Ovinos"],
    principioActivo: "Levamisol 15% (inyectable/SC)",
    presentaciones: ["Frasco x 500 mL"],
    descripcionTecnica: "Levamisol 15% para tratamiento y control de parásitos gastrointestinales y pulmonares, formas maduras e inmaduras. Dosis: 5 mg/kg (0.5 mL/15 kg) sin exceder 10 mL. Bovinos: IM profunda. Ovinos/caprinos: SC detrás de la paleta. Porcinos: SC detrás de la oreja o IM profunda. Reg. ICA No. 7554 MV.",
    descripcionComercial: "El Levamisol inyectable es el desparasitante de elección cuando se necesita rapidez de acción y el animal no permite administración oral fácilmente. PRONALMISOL también tiene efecto inmunoestimulante — el ganado parasitado que recibe levamisol no solo queda sin parásitos sino que activa su sistema inmune más rápido. Frasco de 500 mL: económico para grandes volúmenes de animales.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["levamisol", "inmunoestimulante", "inyectable", "pulmonares"],
  },
  {
    id: 50,
    nombre: "PURGANTOL®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Bovinos", "Porcinos", "Ovinos"],
    principioActivo: "Levamisol 3.2% (oral líquido)",
    presentaciones: ["Caja x 50 sachets x 30 mL"],
    descripcionTecnica: "Levamisol 3.2% en solución oral. Para bovinos, ovinos, caprinos y porcinos. Dosis: 8 mg/kg (1 mL/4 kg). Un sachet de 30 mL para animal de 120 kg. Administración oral, ideal para pequeños rumiantes y cuando no es posible la inyección. Reg. ICA No. 7449 MV.",
    descripcionComercial: "PURGANTOL es la alternativa oral al levamisol inyectable — mismo principio activo, sin agujas. Los sachet de 30 mL son perfectos para el productor de ovinos y caprinos que maneja decenas de animales pequeños: mide, vierte en la boca y listo. Sin estrés por agujas, sin riesgo de abscesos. La presentación en caja de 50 sachets es un best-seller en regiones de alta producción ovina.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["levamisol", "oral", "ovinos", "sachets"],
  },
  {
    id: 51,
    nombre: "PRONALMETRINA®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Bovinos"],
    principioActivo: "Cipermetrina Técnica 15% (uso externo, baños)",
    presentaciones: ["Frasco x 20 mL", "Frasco x 120 mL", "Garrafa x 500 mL", "Garrafa x 1 L"],
    descripcionTecnica: "Piretroide sintético Cipermetrina 15% para control externo. Rhipicephalus (Boophilus) microplus: baños cada 21 días. Amblyomma cajennense: cada 7 días. Moscas (Stomoxys calcitrans, Liperosia irritans): cada 3-4 semanas. 20 L de mezcla bañan 5 animales de 400 kg con equipo de aspersión. Reg. ICA No. 7823 MV.",
    descripcionComercial: "La garrapata y la mosca son los enemigos silenciosos de la productividad: roban sangre, transmiten enfermedades y estresan al ganado. PRONALMETRINA los controla con baños programados de Cipermetrina — el piretroide más usado en Colombia por su eficacia, bajo costo y facilidad de aplicación. Un litro rinde para muchos baños. Garrafa de 1 litro: el formato que el ganadero prefiere para tener en el botalón.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["garrapata", "mosca", "cipermetrina", "baños"],
  },
  {
    id: 52,
    nombre: "PRONALTRAZ F®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Bovinos"],
    principioActivo: "Amitraz 20.8% (uso externo, baños)",
    presentaciones: ["Frasco x 20 mL", "Frasco x 100 mL", "Frasco x 500 mL"],
    descripcionTecnica: "Formamidina Amitraz 20.8% para control de garrapatas por baño. Rhipicephalus microplus: baños cada 21 días. Amblyomma cajennense: cada 7 días. Dosis: 17 mL en 10 L agua; 33 mL en 20 L; 1000 mL en 600 L. Aplicar 1 L de preparado/100 kg de peso vivo. Preparar al momento del baño — el compuesto se degrada en ~48 h. Reg. ICA No. 7823 MV.",
    descripcionComercial: "Cuando la garrapata ha desarrollado resistencia a los piretroides como la Cipermetrina, el ganadero necesita rotar a otro mecanismo de acción. PRONALTRAZ F con Amitraz es esa alternativa: mecanismo diferente, sin resistencia cruzada. La rotación PRONALMETRINA / PRONALTRAZ es el protocolo recomendado para el manejo efectivo de resistencia en Cundinamarca y Boyacá, donde la garrapata es el problema #1.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["amitraz", "garrapata", "rotación", "resistencia"],
  },

  // ─── VITAMINAS NUEVAS ─────────────────────────────────────────────────────────
  {
    id: 53,
    nombre: "HIERDEX-B12®", laboratorio: "Coaspharma", categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Porcinos"],
    principioActivo: "Hierro Dextrano + Vitamina B12 (IM neonatos)",
    presentaciones: ["Caja x 12 frascos x 10 mL", "Frasco x 50 mL"],
    descripcionTecnica: "Antianémico IM para neonatos. Lechones hasta 10 días de edad: 1-2 mL a los 3 días de vida IM profunda en muslo posterior. Terneros hasta 2 meses: 5 mL/50 kg IM. Bovinos mayores de 2 meses a criterio veterinario. Previene y trata anemias por deficiencia de hierro en crías. Reg. ICA No. 7592 MV.",
    descripcionComercial: "El lechón recién nacido tiene reservas de hierro para apenas 3-4 días — si no recibe suplemento, la anemia lo debilita y aumenta la mortalidad. HIERDEX-B12 es la aplicación estándar en producción porcina tecnificada: una sola inyección a los 3 días de vida y el lechón crece sin anemia. En terneros pequeños también previene la anemia que frena la ganancia de peso en las primeras semanas.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["hierro", "lechones", "terneros", "neonatos", "anemia"],
  },
  {
    id: 54,
    nombre: "ENERVIT®", laboratorio: "Coaspharma", categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Equinos", "Porcinos", "Mascotas"],
    principioActivo: "Vitaminas A, D3, B1, B2, B6 + Nicotinamida + Calcio + Fósforo (oral)",
    presentaciones: ["Caja x 50 sachets x 30 mL", "Frasco x 120 mL", "Frasco x 250 mL"],
    descripcionTecnica: "Reconstituyente oral vitamínico-mineral para terneros, potros, lechones, perros y gatos con deficiencias de calcio, fósforo y vitaminas. Dosis: 2 mL/kg de peso vivo diariamente por 5 días o criterio veterinario. Puede duplicarse en cachorros. Administración oral directa o en lactoreemplazador. Reg. ICA No. 7591 MV.",
    descripcionComercial: "Para el ternero que no quiere tomar leche, el potro débil o el cachorro en crianza artificial, ENERVIT aporta en un solo sachet las vitaminas y los minerales óseos que la cría necesita para arrancar fuerte. Sin agujas — ideal para crianzas donde el estrés de manejo debe ser mínimo. Los sachets de 30 mL son perfectos para dosificación individual en campo sin desperdiciar producto.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["calcio", "terneros", "oral", "cachorros", "crianza"],
  },
  {
    id: 55,
    nombre: "SUPLADE®", laboratorio: "Coaspharma", categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos"],
    principioActivo: "Vitamina A + Vitamina D3 + Vitamina E (oral liposoluble)",
    presentaciones: ["Caja x 50 sachets x 30 mL"],
    descripcionTecnica: "Suplemento oral de vitaminas liposolubles A, D3 y E para terneros, borregos, caprinos jóvenes, porcinos y equinos en crianza artificial o deficiencias. Dosis: terneros/lechones/corderos/caprinos 1 mL/5 kg; potros 10-15 mL; equinos/porcinos adultos 20-40 mL oral. Reg. ICA No. 7427 MV.",
    descripcionComercial: "La tríada vitamínica esencial: Vitamina A para mucosas e inmunidad, D3 para absorción de calcio y desarrollo óseo, E como antioxidante muscular. SUPLADE cubre las tres en formato oral sachet — perfecto para la época seca cuando los pastos pierden su contenido vitamínico o para crías en etapa de destete que necesitan refuerzo. Sin necesidad de veterinario para la aplicación.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["vitamina A", "vitamina D3", "vitamina E", "oral", "crías"],
  },
  {
    id: 56,
    nombre: "VITALIKC®", laboratorio: "Coaspharma", categoria: "Vitaminas y Minerales",
    especie: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Mascotas"],
    principioActivo: "Vitamina K3 + Vitamina C (IM/SC)",
    presentaciones: ["Caja x 12 frascos x 10 mL"],
    descripcionTecnica: "Solución inyectable IM/SC de Vitamina K3 y C. Indicado para deficiencias vitamínicas, síndrome hemorrágico por deficiencia de vitamina K e intoxicaciones con anticoagulantes (rodenticidas). Dosis general: 1 mL/10 kg de vitamina K3, 2 veces al día por 3-5 días o hasta que el tiempo de coagulación sea normal. Para todas las especies. Reg. ICA No. 7586 MV.",
    descripcionComercial: "VITALIKC es el antídoto de primer auxilio en dos situaciones críticas: animales que ingirieron veneno para ratas (anticoagulante rodenticida) o con síndrome hemorrágico espontáneo. La Vitamina K3 restaura la coagulación; la Vitamina C refuerza los capilares. En mascotas que accidentalmente comieron cebos de brodifacouma (como Neo Serpa-Rat), VITALIKC es la respuesta inmediata antes de llegar al veterinario.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["vitamina K", "anticoagulante", "hemorragia", "rodenticida"],
  },

  // ─── MASCOTAS FARMACÉUTICOS NUEVOS ──────────────────────────────────────────
  {
    id: 57,
    nombre: "RESTADERM®", laboratorio: "Coaspharma", categoria: "Dermatología Mascotas",
    especie: ["Bovinos", "Equinos", "Mascotas"],
    principioActivo: "Gentamicina + Dexametasona + Ketoconazol (solución tópica)",
    presentaciones: ["Frasco x 100 mL"],
    descripcionTecnica: "Solución tópica con triple acción: bactericida (Gentamicina), fungicida (Ketoconazol) y antiinflamatoria (Dexametasona). Indicado en afecciones cutáneas en perros, gatos, equinos y bovinos. Distribuir sobre área afectada 2 veces/día por 7 días o hasta desaparición de síntomas. Reg. ICA No. 7509 MV.",
    descripcionComercial: "Tres problemas de piel en uno: la mayoría de las dermatitis tienen un componente bacteriano, fúngico e inflamatorio al mismo tiempo. RESTADERM los ataca a los tres simultáneamente — sin necesidad de combinar tres productos. De alta rotación en clínicas de pequeñas especies y en tiendas de mascotas, especialmente en época de lluvias cuando los hongos cutáneos se disparan.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["dermatitis", "hongos", "bacterias", "tópico", "piel"],
  },
  {
    id: 58,
    nombre: "RESTADERM CREMA®", laboratorio: "Coaspharma", categoria: "Dermatología Mascotas",
    especie: ["Bovinos", "Equinos", "Ovinos", "Mascotas"],
    principioActivo: "Clotrimazol + Neomicina + Dexametasona (crema tópica)",
    presentaciones: ["Tubo x 30 g"],
    descripcionTecnica: "Crema tópica polivalente bactericida, fungicida y antiinflamatoria. Clotrimazol antifúngico + Neomicina antibacteriana + Dexametasona antiinflamatoria. Indicada en prurito, eczemas, dermatitis e infecciones por hongos en perros, gatos, equinos, bovinos y ovinos. Aplicar 2 veces/día hasta resolución completa. Reg. ICA No. 8783 MV.",
    descripcionComercial: "La crema que el veterinario recomienda para irse a casa: el dueño puede aplicarla sin ayuda, el tubo es manejable y los resultados son visibles en días. RESTADERM CREMA es la versión en crema de la solución tópica — mejor adherencia en zonas con pelo largo y para lesiones delimitadas. Alta rotación en tiendas de mascotas como producto de mostrador para dermatitis y hongos.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["crema", "hongos", "eczema", "prurito", "mascotas"],
  },
  {
    id: 59,
    nombre: "CANAPUR PUPPY®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Mascotas"],
    principioActivo: "Pamoato de Pirantel (oral, perros)",
    presentaciones: ["Jeringa x 2.5 mL", "Jeringa x 5 mL"],
    descripcionTecnica: "Antiparasitario oral para cachorros y perros adultos. Activo contra Ancylostoma caninum, Ascaris sp., Toxocara canis, Toxascaris leonina, Uncinaria stenocephala. Dosis: 1 mL/5 kg. Menores de 2.5 kg: 1 mL. Repetir a los 20 días. Reg. ICA No. 7426 MV.",
    descripcionComercial: "Todo cachorro llega al mundo con parásitos internos — la desparasitación temprana es la norma. CANAPUR PUPPY en jeringa lista para usar hace que el dueño pueda desparasitar en casa sin estrés: mide la dosis, aplica en la boca y listo. Sabor aceptable, sin efectos secundarios en cachorros frágiles. Un producto que el dueño compra cada 20 días — alta frecuencia de recompra.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["cachorros", "toxocara", "oral", "jeringa"],
  },
  {
    id: 60,
    nombre: "PRONALPETS®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Mascotas"],
    principioActivo: "Pamoato de Pirantel + Praziquantel (oral perros y gatos)",
    presentaciones: ["Jeringa x 2 mL", "Jeringa x 5 mL", "Jeringa x 10 mL"],
    descripcionTecnica: "Antiparasitario oral doble espectro. Pirantel (10 mg/kg) contra nematodos + Praziquantel (5 mg/kg) contra cestodos (tenias, Dipylidium, Echinococcus). Dosis: 1 mL/5 kg. Repetir 20 días después. Para perros y gatos. Reg. ICA No. 7536 MV.",
    descripcionComercial: "CANAPUR PUPPY elimina los gusanos redondos. Pero los perros y gatos que conviven con pulgas — o que comen presas — también tienen tenias. PRONALPETS agrega el Praziquantel para cubrir ambos grupos de parásitos en una sola dosis. Para el vendedor de mostrador: cuando el dueño llega a desparasitar, recomendar PRONALPETS en lugar de CANAPUR PUPPY es un upgrade natural que el cliente agradece.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["praziquantel", "tenias", "gatos", "doble espectro"],
  },
  {
    id: 61,
    nombre: "TRIPETS®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Mascotas"],
    principioActivo: "Febantel + Pamoato de Pirantel + Praziquantel + Ivermectina (oral)",
    presentaciones: ["Jeringa x 2 mL", "Jeringa x 5 mL", "Jeringa x 10 mL"],
    descripcionTecnica: "El desparasitante oral más completo del portafolio para mascotas. Febantel + Pirantel (nematodos incluyendo Trichuris vulpis y larvas tisulares) + Praziquantel (cestodos) + Ivermectina (Dirofilaria immitis — gusano del corazón). Dosis: 1 mL/5 kg oral. Reg. ICA No. 7555 MV / 9550 MV.",
    descripcionComercial: "El 4x1 de la desparasitación canina: gusanos redondos, tenias, trichuris y hasta gusano del corazón en una sola jeringa. TRIPETS es la elección premium para el perro que tiene todo — el cliente que quiere la protección más completa para su mascota. Alta percepción de valor, se vende solo cuando el vendedor explica lo que contiene. Posicionarlo como la desparasitación anual completa.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["desparasitación completa", "dirofilaria", "4x1", "perros"],
  },
  {
    id: 62,
    nombre: "DOXICICLINA®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Mascotas"],
    principioActivo: "Doxiciclina 100 mg (tableta oral)",
    presentaciones: ["Caja x 10 tabletas"],
    descripcionTecnica: "Antibiótico oral de amplio espectro para perros y gatos. Indicado en Erliquiosis, infecciones bucodentales (gingivitis, periodontitis, halitosis), respiratorias y sistémicas por Mycoplasma, Chlamydia, Rickettsia, Staphylococcus, Leptospira, Bartonella, Bordetella y más. Dosis: 10 mg/kg (1 tableta/10 kg) oral cada 24 h por 3-5 días. Reg. ICA No. 10106 MV.",
    descripcionComercial: "La Erliquiosis canina —transmitida por garrapatas— está en aumento en el territorio PESTAR. DOXICICLINA es el tratamiento de primera línea: una tableta al día y el perro mejora visiblemente en 48-72 horas. También es el antibiótico de elección para mal aliento severo por infección dental y para infecciones respiratorias crónicas. De alta demanda en clínicas urbanas con clientela de mascotas.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["erliquiosis", "garrapatas", "doxiciclina", "tableta"],
  },
  {
    id: 63,
    nombre: "ENROFLOXACINA® (tableta)", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Mascotas"],
    principioActivo: "Enrofloxacina 50 mg (tableta oral)",
    presentaciones: ["Caja x 10 tabletas", "Caja x 100 tabletas"],
    descripcionTecnica: "Fluoroquinolona oral para perros y gatos. Infecciones digestivas, respiratorias, urogenitales, cutáneas y otitis por bacterias grampositivas, gramnegativas y micoplasmas. Dosis perros: 5-20 mg/kg (1 tableta/10 kg estándar o 1 tableta/2.5 kg a dosis alta). Gatos: 5-10 mg/kg (1 tableta/10 kg). Oral cada 24 h por 5-7 días. Reg. ICA No. 10148 MV.",
    descripcionComercial: "Cuando la infección en la mascota no responde a los antibióticos de primera línea o es de origen desconocido, ENROFLOXACINA tableta es la siguiente opción. De amplio espectro, una vez al día, y disponible en caja de 100 tabletas para clínicas con alto volumen. Las infecciones urinarias, de piel y las otitis complicadas son las indicaciones más frecuentes en el mercado de mascotas urbano.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["enrofloxacina", "tableta", "otitis", "infección urinaria"],
  },
  {
    id: 64,
    nombre: "KETOCONAZOL® 200 mg (tableta)", laboratorio: "Coaspharma", categoria: "Dermatología Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Ketoconazol 200 mg (tableta antifúngica oral)",
    presentaciones: ["Caja x 10 tabletas"],
    descripcionTecnica: "Antifúngico oral sistémico para perros y gatos. Indicado en dermatomicosis por Microsporum canis, Trichophyton mentagrophytes, M. gypseum; otitis y dermatitis por Malassezia pachydermatis. Dosis: 5-10 mg/kg/día por 4-6 semanas. Perros: ½ a 1 tableta/20 kg; gatos: ¼ tableta/5 kg. Reg. ICA No. 9245 MV.",
    descripcionComercial: "Los hongos superficiales en mascotas son muy contagiosos — incluyendo para los humanos. KETOCONAZOL oral es el tratamiento sistémico que erradica el hongo desde adentro cuando los champús y cremas no son suficientes. Esencial en casos de tiña por Microsporum (la mancha sin pelo circular que tanto preocupa a los dueños) y en otitis crónica por Malassezia. Tratamiento de 4-6 semanas: alta frecuencia de recompra.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["ketoconazol", "hongos", "tiña", "otitis Malassezia"],
  },
  {
    id: 65,
    nombre: "PREDNISOLONA® 20 mg (tableta)", laboratorio: "Coaspharma", categoria: "Antiinflamatorios",
    especie: ["Mascotas"],
    principioActivo: "Prednisolona 20 mg (corticoide oral)",
    presentaciones: ["Caja x 10 tabletas"],
    descripcionTecnica: "Glucocorticoide sintético oral no fluorado para perros y gatos. Antiinflamatorio e inmunosupresor. Dosis como terapia de sustitución: 0.25 mg/kg/día. Enfermedades autoinmunes/antineoplásico: 2-4 mg/kg/día. Procesos inflamatorios: 0.5-1 mg/kg/día. Administrar oral o con alimento cada 24 h por 5-7 días. Tratamiento prolongado en días alternos. Reg. ICA No. 9742 MV.",
    descripcionComercial: "PREDNISOLONA es el corticoide oral de referencia para el control de alergias severas, dermatitis alérgica, prurito crónico y cuadros autoinmunes en mascotas. Cuando el perro se rasca hasta hacerse heridas o el gato tiene alopecia alérgica, el veterinario receta prednisolona. Alta demanda en consultas dermatológicas y de medicina interna de pequeñas especies. Caja de 10 tabletas: accesible para el cliente.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["corticoide", "alergia", "prurito", "autoinmune"],
  },
  {
    id: 66,
    nombre: "SULFAMETOXAZOL TRIMETOPRIM®", laboratorio: "Coaspharma", categoria: "Antibióticos",
    especie: ["Mascotas"],
    principioActivo: "Sulfametoxazol 400 mg/mL + Trimetoprim 80 mg/mL (suspensión oral)",
    presentaciones: ["Frasco x 60 mL", "Frasco x 120 mL"],
    descripcionTecnica: "Antibacteriano y antiprotozoario sinérgico oral de amplio espectro. Indicado en infecciones dermatológicas, respiratorias, digestivas y genitourinarias en caninos y felinos. Dosis: 15-16 mg/kg cada 12 h por 5 días. Caninos: 5 mL/15 kg cada 12 h. Felinos: 1.5 mL/kg cada 12 h. Reg. ICA No. 9889 MV.",
    descripcionComercial: "La sulfa-trimetoprim es el antibiótico oral más prescrito en medicina de pequeñas especies por su relación costo-eficacia. SULFATRIM en suspensión es ideal para cachorros y gatos que no tragan tabletas — se mezcla con el alimento sin problema. Cubre infecciones urinarias, respiratorias, piel e intestinales. Alta rotación garantizada en cualquier punto de venta de mascotas.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["sulfa", "suspensión", "oral", "cachorros", "gatos"],
  },
  {
    id: 67,
    nombre: "METOCLOPRAMIDA®", laboratorio: "Coaspharma", categoria: "Antieméticos",
    especie: ["Mascotas"],
    principioActivo: "Metoclopramida 40 mg (solución oral gotas)",
    presentaciones: ["Frasco x 30 mL"],
    descripcionTecnica: "Antiemético y procinético oral para perros y gatos. Indicado en vómitos, náuseas, vaciado gástrico retardado y esofagitis por reflujo. Dosis: 0.1-0.5 mg/kg; en práctica 5-25 gotas/10 kg (el gotero entrega 20 gotas/mL). Administrar oral cada 6 horas como antiemético o 30-60 minutos antes de comer como procinético. Reg. ICA No. disponible.",
    descripcionComercial: "El perro o el gato que vomita seguido y no puede retener el alimento necesita METOCLOPRAMIDA. Es el antiemético más usado en mascotas: controla el vómito Y estimula el vaciado gástrico para que el alimento pase más rápido. Las gotas permiten dosificación exacta en cualquier tamaño de animal. Alta demanda en clínicas: los problemas gástricos son la consulta más frecuente en medicina de pequeñas especies.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["vómito", "antiemético", "gotas", "gástrico"],
  },
  {
    id: 68,
    nombre: "VISIVET®", laboratorio: "Coaspharma", categoria: "Dermatología Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Gentamicina + Dexametasona + Lidocaína (gotas oftálmicas/óticas)",
    presentaciones: ["Gotero x 10 mL"],
    descripcionTecnica: "Solución oftálmica y ótica. Indicado en infecciones oculares y óticas por Klebsiella, Pseudomona, Staphylococcus, Streptococcus. Útil en blefaritis, conjuntivitis, queratitis, otitis interna/media/externa. Dosis ocular: 1-2 gotas/ojo 2-3 veces/día. Dosis ótica: 5 gotas/oído previa limpieza, 2-3 veces/día. Reg. ICA No. 7425 MV.",
    descripcionComercial: "La otitis y la conjuntivitis son las dos condiciones más frecuentes en perros y gatos — VISIVET las trata a las dos con el mismo producto. Gentamicina bactericida + Dexametasona antiinflamatoria + Lidocaína analgésica: elimina la infección, reduce la inflamación y alivia el dolor inmediatamente. El animal deja de rascarse desde la primera aplicación. Alta rotación en tiendas de mascotas y veterinarias.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["otitis", "conjuntivitis", "ojos", "oídos", "mascotas"],
  },
  {
    id: 69,
    nombre: "EXTERPUL SPRAY®", laboratorio: "Coaspharma", categoria: "Antiparasitarios",
    especie: ["Mascotas"],
    principioActivo: "Fipronil 2.5 mg/mL (spray externo)",
    presentaciones: ["Spray x 100 mL", "Spray x 250 mL"],
    descripcionTecnica: "Ectoparasiticida spray de Fipronil 2.5 mg/mL para perros y gatos. Control y tratamiento de pulgas (Ctenocephalides sp.) y garrapatas (Rhipicephalus sanguineus, Ixodes sp.) en formas adultas. Dosis: 3-6 mL/kg de peso (0.9 mL = 1 pulsación del atomizador). Uso externo. Reg. ICA No. 9933 MV.",
    descripcionComercial: "La pulga es el parásito #1 de las mascotas urbanas — y la fuente de la tenia Dipylidium. EXTERPUL SPRAY con Fipronil elimina pulgas y garrapatas con una sola aplicación, y la protección dura semanas. El spray es fácil de aplicar en casa: el dueño lo usa él mismo sin ir al veterinario. Alta rotación en tiendas de mascotas, especialmente en temporada de lluvias cuando las pulgas se multiplican.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["pulgas", "garrapatas", "fipronil", "spray", "mascotas"],
  },
  {
    id: 70,
    nombre: "DERKET®", laboratorio: "Coaspharma", categoria: "Dermatología Mascotas",
    especie: ["Equinos", "Mascotas"],
    principioActivo: "Ketoconazol 20 mg/mL (champú antifúngico)",
    presentaciones: ["Frasco x 200 mL"],
    descripcionTecnica: "Champú antifúngico con Ketoconazol 20 mg/mL para perros, gatos y caballos. Indicado en dermatomicosis por Microsporum canis, Trichophyton, Malassezia pachydermatis y Candida albicans. Mojar, aplicar, masajear, dejar actuar 5-10 min, enjuagar. Perros: 20 mL. Gatos: 5-10 mL. Primera semana: diario; luego cada tercer día. Reg. ICA No. 10062 MV.",
    descripcionComercial: "Cuando los hongos atacan la piel del perro o el gato, el champú medicado es el tratamiento externo más efectivo — actúa directamente sobre el hongo en la piel y el pelo. DERKET con Ketoconazol elimina los hongos más comunes incluyendo la temida Malassezia que causa el olor característico y la piel grasa. Ideal como complemento a la tableta de Ketoconazol oral para casos severos.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["champú", "hongos", "ketoconazol", "Malassezia"],
  },

  {
    id: 71,
    nombre: "HIZOL-T", laboratorio: "Tecnocalidad", categoria: "Dermatología Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Ácido Salicílico + Ácido Benzoico + Ácido Bórico (solución ótica)",
    presentaciones: ["Frasco x 120 mL"],
    descripcionTecnica: "Solución ótica queratolítica, antiséptica y antifúngica para higiene del conducto auditivo externo en perros y gatos. Coadyuvante en otitis externa, exceso de cera y mal olor. Dosis preventiva/higiene: 3-5 mL/oído cada semana. Tratamiento: 3-5 mL 2 veces/día por 7 días. Reg. ICA No. 10319 MV.",
    descripcionComercial: "El oído del perro es un ambiente húmedo y cerrado — perfecto para que la cera se acumule y los gérmenes proliferen. HIZOL-T es el limpiador ótico de uso regular: previene la otitis disolviendo la cera, eliminando bacterias y hongos con sus tres ácidos activos. Ideal para recomendación rutinaria en razas con orejas caídas (Beagle, Cocker, Basset) que son las más propensas. Alta fidelización: el dueño lo compra mensualmente.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["oídos", "cera", "limpieza ótica", "otitis preventiva"],
  },
  {
    id: 72,
    nombre: "CICADOG-T", laboratorio: "Tecnocalidad", categoria: "Dermatología Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Gentamicina + Dexametasona + Ketoconazol + Lidocaína + Alantoína (tópico)",
    presentaciones: ["Tubo x 35 g"],
    descripcionTecnica: "Crema tópica 5 en 1 para dermatofitosis e infecciones cutáneas bacterianas en perros y gatos. Gentamicina (bactericida) + Ketoconazol (antifúngico) + Dexametasona (antiinflamatorio) + Lidocaína (analgésico) + Alantoína (cicatrizante). Aplicar 2 veces/día hasta resolución. Reg. ICA No. disponible.",
    descripcionComercial: "CICADOG-T es el producto más completo del portafolio dermatológico: 5 activos en una sola crema. A diferencia de RESTADERM CREMA (3 activos), CICADOG-T agrega Lidocaína para el dolor inmediato y Alantoína para acelerar la cicatrización. Para heridas infectadas, dermatitis severa o zonas muy inflamadas donde el animal no deja que le toquen — la Lidocaína calma el dolor al instante y el animal tolera la aplicación.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["crema 5en1", "cicatrizante", "heridas infectadas", "lidocaína"],
  },
  {
    id: 73,
    nombre: "PERFULL-T®", laboratorio: "Tecnocalidad", categoria: "Dermatología Mascotas",
    especie: ["Equinos", "Mascotas"],
    principioActivo: "Clorhexidina Digluconato + Miconazol Nitrato (jabón líquido medicado)",
    presentaciones: ["Frasco x 120 mL", "Frasco x 250 mL", "Frasco x 1 L"],
    descripcionTecnica: "Jabón líquido medicado con Clorhexidina antibacteriana y Miconazol antifúngico para dermatitis seborreica en perros, gatos y equinos. Aplicar en animal mojado, masajear hasta penetrar, dejar actuar 10 min, enjuagar. 2 veces/semana hasta mejoría. Reg. ICA No. 10262 MV.",
    descripcionComercial: "PERFULL-T es el champú medicado de elección para la dermatitis seborreica — la piel grasa, escamosa y con olor que tantos dueños no saben cómo resolver. Clorhexidina para las bacterias secundarias + Miconazol para los hongos = control completo del cuadro seborreico. El litro es perfecto para peluquerías caninas que lo usan en tratamientos regulares. Alta demanda en Bulldogs, West Highland y Cocker Spaniel.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["seborreico", "clorhexidina", "champú medicado", "escamas"],
  },

  // ─── AVES ─────────────────────────────────────────────────────────────────────
  {
    id: 74,
    nombre: "QUINACILINA C®", laboratorio: "Tecnocalidad", categoria: "Antibióticos",
    especie: ["Aves", "Porcinos"],
    principioActivo: "Ciprofloxacina Clorhidrato (polvo soluble oral)",
    presentaciones: ["Caja x 50 sobres x 20 g"],
    descripcionTecnica: "Fluoroquinolona oral de amplio espectro para aves y porcinos. Indicada para enfermedades respiratorias, diarrea aguda, infecciones óseas y tejidos blandos en aves; síndrome respiratorio porcino. Dosis aves: 1-1.5 g del medicamento/2 L de agua de bebida por 3-5 días. Porcinos: 1 g/L de agua por 3-5 días. Reg. ICA No. 6711-MV.",
    descripcionComercial: "QUINACILINA C con Ciprofloxacina es la alternativa de alta potencia cuando la Enrofloxacina (QUINACILINA E) no da los resultados esperados. Ciprofloxacina es una quinolona de mayor espectro especialmente efectiva en infecciones óseas y tejidos blandos en aves — condiciones que pocas quinolonas cubren bien. En porcinos, es el tratamiento de elección para el síndrome respiratorio complejo. Mismo formato de sobre que facilita la dosificación.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["ciprofloxacina", "aves", "porcinos", "respiratorio"],
  },

  // ─── SALUD PÚBLICA NUEVOS ─────────────────────────────────────────────────────
  {
    id: 75,
    nombre: "ECOGEL®", laboratorio: "Comervet", categoria: "Salud Pública",
    especie: ["Instalaciones pecuarias"],
    principioActivo: "Clorpirifos 2% en gel cebo (cucarachas)",
    presentaciones: ["Jeringa x 5 g"],
    descripcionTecnica: "Gel insecticida cebo para control de cucarachas Blattella germanica, Blatta orientalis y Periplaneta americana. Fórmula extremadamente atrayente incluso en competencia con otros alimentos. Dosis: cucaracha americana/negra: 2-6 gotas/m²; cucaracha rubia: 1-4 gotas/m². Una gota ≈ 0.04 g. Aplicar en pequeñas gotas. Efecto activo por varios meses. Inspeccionar a 1 semana.",
    descripcionComercial: "Las cucarachas en granjas, bodegas de alimento y plantas de proceso son un problema de salud pública y sanidad animal. ECOGEL las atrae y elimina con gel cebo — sin aspersión, sin olor, sin evacuación del local. La jeringa permite aplicar exactamente donde las cucarachas transitan. Una jeringa de 5 g trata decenas de metros cuadrados. Efectivo por meses: alta eficiencia de costo.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["cucarachas", "gel", "bodegas", "salud pública"],
  },
  {
    id: 76,
    nombre: "GARDENCOL®", laboratorio: "Comervet", categoria: "Salud Pública",
    especie: ["Instalaciones pecuarias"],
    principioActivo: "Mezcla de polibutenos (pegamento atrapa insectos y roedores)",
    presentaciones: ["Tubo x 135 g"],
    descripcionTecnica: "Pegamento adhesivo no tóxico, incoloro, inodoro de polibutenos. Actúa por contacto. No es venenoso, no se derrite con calor ni endurece con frío — mantiene adherencia indefinidamente. Aplicar sobre tablilla de madera o cartón, esperar 30 min para extensión, colocar cebo en centro, instalar junto a paredes o detrás de muebles. Eliminar trampa con animal atrapado.",
    descripcionComercial: "GARDENCOL es el complemento perfecto de los productos raticidas: mientras NEO SERPA-RAT envenena, GARDENCOL captura vivos sin químicos. Ideal para instalaciones de alimentos donde el uso de venenos está restringido, o para monitoreo de plagas sin intoxicación. También captura insectos grandes. Sin olor, sin toxicidad — se puede usar en presencia de niños y mascotas sin riesgo.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["pegamento", "no tóxico", "captura", "roedores"],
  },

  // ─── ANTIPARASITARIOS EXTERNOS TECNOCALIDAD ──────────────────────────────────
  {
    id: 77,
    nombre: "AMITOX", laboratorio: "Tecnocalidad", categoria: "Antiparasitarios",
    especie: ["Bovinos", "Mascotas"],
    principioActivo: "Amitraz 20.8% (uso externo, baños)",
    presentaciones: ["Frasco x 20 mL", "Frasco x 120 mL", "Frasco x 1000 mL"],
    descripcionTecnica: "Antiparasitario externo Amitraz 20.8% para control de garrapatas, ácaros y piojos en bovinos y perros. Dosis bovinos: 1 mL/L de agua. Perros: 2.5 mL/2 L de agua. Aplicación por baño. Reg. ICA No. 10258-MV.",
    descripcionComercial: "AMITOX de Tecnocalidad es la versión complementaria del Amitraz para distribuidores que trabajan con ambas líneas. Mismo principio activo que PRONALTRAZ F (Coaspharma) pero de Tecnocalidad — permite ofrecer dos marcas del mismo activo según la preferencia del cliente. En perros con sarna demodécica o sarna sarcóptica, el baño con Amitraz es el tratamiento estándar de referencia.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["amitraz", "sarna", "garrapatas", "baños"],
  },
  {
    id: 78,
    nombre: "HION-T", laboratorio: "Tecnocalidad", categoria: "Antiparasitarios",
    especie: ["Bovinos"],
    principioActivo: "Ethion 83% (organofosforado externo, baños)",
    presentaciones: ["Frasco x 20 mL", "Frasco x 235 mL", "Frasco x 1000 mL"],
    descripcionTecnica: "Organofosforado Ethion 83% para control de garrapatas, piojos y moscas en bovinos. Dosis: 15 mL del producto en 20 L de agua. Aplicar 1 L de preparado/animal por aspersión. Uso externo únicamente. Reg. ICA No. 10344-MV.",
    descripcionComercial: "HION-T con Ethion es el tercer mecanismo de acción en la rotación de ectoparasiticidas: cuando la Cipermetrina (PRONALMETRINA) y el Amitraz (PRONALTRAZ F / AMITOX) ya se usaron, HION-T aporta un organofosforado para completar la rotación y evitar la resistencia. En zonas con alta presión de garrapatas del género Amblyomma, la rotación de tres moléculas es la estrategia recomendada.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["ethion", "organofosforado", "rotación", "amblyomma"],
  },
  {
    id: 79,
    nombre: "CURAZIN-T",
    laboratorio: "Tecnocalidad",
    categoria: "Dermatología Mascotas",
    especie: ["Mascotas"],
    principioActivo: "Gentamicina + Dexametasona + Ketoconazol (solución tópica)",
    presentaciones: ["Frasco x 30 mL", "Frasco x 60 mL"],
    descripcionTecnica: "Solución tópica dermatológica con triple acción: Gentamicina (antibacteriana), Dexametasona (antiinflamatoria) y Ketoconazol (antifúngica). Indicado para el tratamiento de dermatitis bacterianas, fúngicas y mixtas en perros y gatos. Aplicar sobre la zona afectada 2-3 veces al día hasta resolución del cuadro. Laboratorio Tecnocalidad — línea Pets Caniche.",
    descripcionComercial: "CURAZIN-T es el dermatológico tópico 3 en 1 de Tecnocalidad: una sola aplicación cubre bacterias, hongos e inflamación simultáneamente. Ideal para dermatitis de origen mixto — las más frecuentes en clínica — donde el veterinario no quiere arriesgarse a un tratamiento parcial. Alta rotación en tiendas de mascotas y clínicas veterinarias urbanas. Complementa perfectamente la línea de mascotas de Tecnocalidad junto con Hizol-T, Miocan-T, Cicadog-T y Perfull-T.",
    videoUrl: null, fichaUrl: "#",
    etiquetas: ["tópico", "dermatitis", "hongos", "bacterias", "mascotas"],
  },
];


const CATEGORIAS = ["Todas", ...new Set(PRODUCTS.map(p => p.categoria))];
const LABORATORIOS = ["Todos", ...new Set(PRODUCTS.map(p => p.laboratorio))];

// ─── MÓDULOS DE CAPACITACIÓN (28) ───────────────────────────────────────────
const MODULOS = [

  // ══════════════════════════════════════════════════════════════
  // ANALGÉSICOS Y ANTIPIRÉTICOS
  // ══════════════════════════════════════════════════════════════
  {
    id:1, nombre:"PRONALGIN®", laboratorio:"Coaspharma", categoria:"Analgésicos y Antipiréticos", emoji:"💊",
    contenido:{
      queEs:"PRONALGIN® es una solución inyectable de Dipirona sódica. Es un analgésico, antipirético (baja fiebre) y antiespasmódico no esteroideo, no opioide y no narcótico. Sirve para todas las especies.",
      paraQueSirve:"Se usa cuando el animal tiene fiebre alta, dolor por cólico, afecciones musculoesqueléticas o cualquier dolor agudo. Funciona en bovinos, equinos, porcinos, ovinos, perros y gatos.",
      comoSeUsa:"Intramuscular o intravenosa lenta. Bovinos: 2–4 mL/50 kg. Equinos: 4–10 mL/100 kg. Porcinos: 1.5–5 mL/50 kg. Perros/gatos: 0.5 mL/10 kg. El efecto dura hasta 1 hora y se puede repetir cada 8 horas.",
      ventajas:["Actúa rápido — efecto en minutos","Sirve para todas las especies","No es narcótico ni opioide: seguro y sin restricciones especiales","Fácil de recomendar en mostrador para fiebre o dolor"],
      dosificacion:"Bovinos/caprinos/ovinos: 2–4 mL/50 kg IM o IV. Equinos: 4–10 mL/100 kg. Porcinos: 1.5–5 mL/50 kg. Perros/gatos: 0.5 mL/10 kg. Retiro: 12 días carne, 96 h leche.",
    },
    preguntas:[
      {pregunta:"¿Cuál es el principio activo de PRONALGIN®?", opciones:["Meloxicam","Dipirona sódica","Ivermectina","Ampicilina"], correcta:1},
      {pregunta:"¿Cada cuánto se puede repetir la dosis si el dolor vuelve?", opciones:["Cada 2 horas","Cada 4 horas","Cada 8 horas","Solo una vez al día"], correcta:2},
      {pregunta:"¿PRONALGIN® es un opioide o narcótico?", opciones:["Sí, es opioide","Sí, es narcótico","No, es no opioide no narcótico","Depende de la dosis"], correcta:2},
      {pregunta:"¿Qué dosis se usa en perros y gatos?", opciones:["2 mL/10 kg","1 mL/5 kg","0.5 mL/10 kg","5 mL/10 kg"], correcta:2},
      {pregunta:"¿Cuál es el tiempo de retiro en leche?", opciones:["24 horas","48 horas","96 horas","7 días"], correcta:2},
    ],
  },
  {
    id:2, nombre:"MELOXICAM® 2 mg", laboratorio:"Coaspharma", categoria:"Analgésicos y Antipiréticos", emoji:"💊",
    contenido:{
      queEs:"MELOXICAM® 2 mg es una tableta oral sabor a carne de Meloxicam para perros. Es un AINE COX-2 selectivo — inhibe la inflamación con menor riesgo gástrico que los AINEs tradicionales.",
      paraQueSirve:"Indicado en perros para trastornos musculoesqueléticos agudos y crónicos (artritis, displasia, osteoartrosis) y reducción del dolor pre y post-operatorio tras cirugía ortopédica y de tejidos blandos.",
      comoSeUsa:"Oral o mezclado con el alimento cada 24 horas. Día 1: dosis única de 0.2 mg/kg (1 tableta/10 kg). Del día 2 en adelante: 0.1 mg/kg (½ tableta/10 kg) por 5–7 días.",
      ventajas:["COX-2 selectivo: menos riesgo gástrico que ibuprofeno u otros AINEs","Tableta sabor carne: el perro la acepta sola","Una sola dosis diaria — fácil para el dueño","Alta rotación: artritis y displasia son muy frecuentes en clínicas urbanas"],
      dosificacion:"Día 1: 1 tableta/10 kg oral. Día 2+: ½ tableta/10 kg/día por 5–7 días. Presentación: caja x 10 tabletas. Reg. ICA No. 9894 MV.",
    },
    preguntas:[
      {pregunta:"¿Cuál es el mecanismo de acción de MELOXICAM®?", opciones:["Opioide central","AINE COX-2 selectivo","Corticoide","Antibiótico"], correcta:1},
      {pregunta:"¿Cuál es la dosis de mantenimiento (día 2 en adelante)?", opciones:["0.2 mg/kg","0.1 mg/kg","0.5 mg/kg","1 mg/kg"], correcta:1},
      {pregunta:"¿Cada cuánto se administra MELOXICAM®?", opciones:["Cada 6 horas","Cada 12 horas","Cada 24 horas","Cada 48 horas"], correcta:2},
      {pregunta:"¿Por qué MELOXICAM® tiene menos riesgo gástrico que otros AINEs?", opciones:["Porque es más barato","Porque inhibe principalmente COX-2","Porque tiene sabor a carne","Porque es una tableta pequeña"], correcta:1},
      {pregunta:"¿Para cuántas especies está aprobado MELOXICAM® 2 mg tableta?", opciones:["Solo perros","Perros y gatos","Perros, gatos y bovinos","Todas las especies"], correcta:0},
    ],
  },
  {
    id:3, nombre:"MIOCAN T", laboratorio:"Tecnocalidad", categoria:"Analgésicos y Antipiréticos", emoji:"💊",
    contenido:{
      queEs:"MIOCAN T es una solución oral en gotas de Meloxicam 150 mg/100 mL de Tecnocalidad (línea Pets Caniche). Es AINE COX-2 selectivo en presentación líquida para perros y gatos.",
      paraQueSirve:"Manejo del dolor en trastornos inflamatorios musculoesqueléticos agudos y crónicos: displasia, artritis, osteoartrosis, discoespondilitis. También para reducir el dolor pre y post-operatorio en cirugías de tejidos blandos y castraciones.",
      comoSeUsa:"Oral, mezclado con el alimento o directo en la cavidad oral. Perros: día 1 dosis de carga 2 gotas/kg; continuación 1 gota/kg cada 24 h por máximo 5 días. Gatos: dosis única de 3 gotas/kg (solo preoperatorio).",
      ventajas:["Solución oral: dosificación exacta para cualquier tamaño de animal","Gatos: aprobado como dosis única prequirúrgica","Sin agujas — el dueño puede administrar en casa","Frasco de 10 mL: práctico y económico"],
      dosificacion:"Perros: carga 2 gotas/kg, mantenimiento 1 gota/kg/día máx 5 días. Gatos: dosis única 3 gotas/kg prequirúrgico. Frasco x 10 mL. Reg. ICA No. 10262-MV.",
    },
    preguntas:[
      {pregunta:"¿De qué laboratorio es MIOCAN T?", opciones:["Coaspharma","QualiVet","Tecnocalidad","Comervet"], correcta:2},
      {pregunta:"¿Cuál es la dosis de carga en perros el primer día?", opciones:["1 gota/kg","2 gotas/kg","3 gotas/kg","5 gotas/kg"], correcta:1},
      {pregunta:"¿Cuántos días máximo se usa MIOCAN T en mantenimiento?", opciones:["3 días","5 días","7 días","10 días"], correcta:1},
      {pregunta:"¿Para qué se usa MIOCAN T en gatos específicamente?", opciones:["Tratamiento crónico de artritis","Dosis única prequirúrgica","Antiparasitario","Vitamínico"], correcta:1},
      {pregunta:"¿Por qué vía se administra MIOCAN T?", opciones:["Inyectable IM","Subcutáneo","Oral (gotas)","Tópico"], correcta:2},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ANTIBIÓTICOS
  // ══════════════════════════════════════════════════════════════
  {
    id:4, nombre:"TETRAX 200 NF®", laboratorio:"Coaspharma", categoria:"Antibióticos", emoji:"💊",
    contenido:{
      queEs:"TETRAX 200 NF® es Oxitetraciclina 200 mg/mL inyectable — 4 veces más concentrada que la versión estándar (50 mg/mL). NF = Nueva Fórmula. Antibiótico de amplio espectro para múltiples especies.",
      paraQueSirve:"Trata infecciones por Anaplasma, Pasteurella, Clostridium, Leptospira, E. coli y más en bovinos, ovinos, caprinos, porcinos y aves. En aves una sola inyección SC cubre 5 días completos de tratamiento.",
      comoSeUsa:"Bovinos/ovinos/caprinos/porcinos: 1 mL/10 kg IM profunda. No exceder 10 mL/sitio en bovinos. Aves (gallinas/pollos): 0.25 mL/kg SC en región posterior del cuello — una aplicación cubre 5 días.",
      ventajas:["4× más concentrado: menos volumen de inyección, menos estrés","En aves una sola dosis SC = 5 días de tratamiento","Disponible en 50, 250 y 500 mL — económico para hatos grandes","Amplio espectro: cubre más de 15 gérmenes"],
      dosificacion:"Bovinos/ovinos/porcinos: 1 mL/10 kg IM. Aves: 0.25 mL/kg SC en cuello. Presentaciones: 50, 250 y 500 mL. Reg. ICA No. 8934 MV.",
    },
    preguntas:[
      {pregunta:"¿Cuántas veces más concentrado es TETRAX 200 NF® vs la OTC estándar 50 mg/mL?", opciones:["El doble","3 veces","4 veces","5 veces"], correcta:2},
      {pregunta:"¿Cuántos días de cobertura da una sola inyección en aves?", opciones:["1 día","3 días","5 días","7 días"], correcta:2},
      {pregunta:"¿Dónde se aplica la inyección SC en aves?", opciones:["Muslo","Pecho","Región posterior del cuello","Ala"], correcta:2},
      {pregunta:"¿Cuál es la dosis en bovinos?", opciones:["1 mL/5 kg","1 mL/10 kg","1 mL/50 kg","2 mL/10 kg"], correcta:1},
      {pregunta:"¿Cuánto producto máximo se aplica por sitio en bovinos?", opciones:["5 mL","10 mL","20 mL","Sin límite"], correcta:1},
    ],
  },
  {
    id:5, nombre:"ENFLOVET®", laboratorio:"Coaspharma", categoria:"Antibióticos", emoji:"💊",
    contenido:{
      queEs:"ENFLOVET® es Enrofloxacina 50 mg/mL inyectable. Es una fluoroquinolona de amplio espectro que actúa bloqueando el ADN bacteriano. Diferente a QUINACILINA E que es oral para aves, ENFLOVET se inyecta.",
      paraQueSirve:"Cubre E. coli, Salmonella, Pasteurella, Bordetella, Mycoplasma, Staphylococcus y más. Indicado en bovinos, equinos, porcinos, ovinos, caprinos, caninos, felinos y aves para infecciones respiratorias, digestivas, genitourinarias y cutáneas.",
      comoSeUsa:"Bovinos: 5 mL/100 kg SC, IM o IV. Cerdos: 0.5 mL/10 kg IM en cuello. Ovinos/perros/gatos: 0.5 mL/5 kg SC. Pollos: 0.5 mL/2 kg IM. Reg. ICA No. 7503 MV.",
      ventajas:["Amplio espectro: cubre gram-positivos, gram-negativos Y Mycoplasma","Múltiples vías de administración (SC, IM, IV)","Sirve para 7 especies diferentes","Frasco de 10 mL ideal para clínicas pequeñas"],
      dosificacion:"Bovinos: 5 mL/100 kg. Cerdos: 0.5 mL/10 kg IM. Ovinos/perros/gatos: 0.5 mL/5 kg SC. Pollos: 0.5 mL/2 kg IM. Presentaciones: 10 y 50 mL.",
    },
    preguntas:[
      {pregunta:"¿Cuál es el principio activo de ENFLOVET®?", opciones:["Oxitetraciclina","Tilosina","Enrofloxacina","Penicilina"], correcta:2},
      {pregunta:"¿Qué gérmenes especiales cubre la enrofloxacina que las penicilinas NO cubren?", opciones:["Solo gram-positivos","Mycoplasma y gram-negativos resistentes","Solo hongos","Solo anaerobios"], correcta:1},
      {pregunta:"¿Cuál es la dosis en bovinos?", opciones:["1 mL/10 kg","5 mL/100 kg","0.5 mL/5 kg","2 mL/50 kg"], correcta:1},
      {pregunta:"¿En cerdos dónde se aplica la inyección IM?", opciones:["Muslo","Cuello","Paleta","Cola"], correcta:1},
      {pregunta:"¿Para cuántas especies está indicado ENFLOVET®?", opciones:["2 especies","4 especies","7 especies","Solo bovinos"], correcta:2},
    ],
  },
  {
    id:6, nombre:"DOXICICLINA®", laboratorio:"Coaspharma", categoria:"Antibióticos", emoji:"💊",
    contenido:{
      queEs:"DOXICICLINA® 100 mg es una tableta oral para perros y gatos. Es una tetraciclina de segunda generación con mejor biodisponibilidad y menor irritación gástrica que las tetraciclinas clásicas.",
      paraQueSirve:"Primera línea para Erliquiosis canina (transmitida por garrapatas). También para infecciones bucodentales (gingivitis, periodontitis, mal aliento severo), respiratorias por Mycoplasma y Chlamydia, Leptospira y Bordetella.",
      comoSeUsa:"Perros y gatos: 10 mg/kg equivalente a 1 tableta/10 kg oral cada 24 horas por 3–5 días. Puede darse con o sin comida.",
      ventajas:["Primera elección para Erliquiosis — en aumento en Colombia","Cubre Mycoplasma y Chlamydia que las penicilinas no cubren","Una tableta al día — fácil para el dueño","Caja de 10 tabletas: accesible para el cliente"],
      dosificacion:"1 tableta/10 kg oral cada 24 h por 3–5 días. Presentación: caja x 10 tabletas. Reg. ICA No. 10106 MV.",
    },
    preguntas:[
      {pregunta:"¿Para qué enfermedad transmitida por garrapatas es DOXICICLINA® primera elección?", opciones:["Babesiosis","Erliquiosis","Tripanosomiasis","Anaplasmosis"], correcta:1},
      {pregunta:"¿Cuál es la dosis práctica?", opciones:["½ tableta/5 kg","1 tableta/10 kg","2 tabletas/10 kg","1 tableta/20 kg"], correcta:1},
      {pregunta:"¿Con qué frecuencia se administra?", opciones:["Cada 6 horas","Cada 12 horas","Cada 24 horas","Cada 48 horas"], correcta:2},
      {pregunta:"¿Cuál germen cubre DOXICICLINA® que las penicilinas NO cubren?", opciones:["Staphylococcus","Streptococcus","Mycoplasma y Chlamydia","E. coli"], correcta:2},
      {pregunta:"¿Para cuántas especies está indicada DOXICICLINA® 100 mg tableta?", opciones:["Solo perros","Perros y gatos","Perros, gatos y bovinos","Todas"], correcta:1},
    ],
  },
  {
    id:7, nombre:"QUINACILINA E", laboratorio:"Tecnocalidad", categoria:"Antibióticos", emoji:"💊",
    contenido:{
      queEs:"QUINACILINA E es Enrofloxacina 200 mg/mL en solución oral de Tecnocalidad. Se mezcla en el agua de bebida de las aves. Alta concentración = menor volumen de dosificación por animal.",
      paraQueSirve:"Para pollos de engorde, pollas de reemplazo y aves productoras. Trata infecciones por Mycoplasma, Pasteurella, E. coli, Avibacterium, Pseudomona, Staphylococcus y Streptococcus.",
      comoSeUsa:"Oral en agua de bebida. Dosis: 10–20 mg/kg de peso vivo por 5 días. En la práctica: 1–2 mL por cada 4 litros de agua. Verificar consumo de agua del lote para asegurar la dosis correcta.",
      ventajas:["Alta concentración 200 mg/mL: menor volumen = más económico","Fácil administración en agua de bebida — sin manejo individual","Amplio espectro contra los patógenos avícolas más comunes","Retiro de solo 7 días"],
      dosificacion:"1–2 mL por 4 litros de agua por 5 días. Retiro: 7 días. No usar en postura si los huevos son para consumo. Presentaciones: 10 mL, 100–1000 mL. Reg. ICA No. 6837-MV.",
    },
    preguntas:[
      {pregunta:"¿Cuál es la concentración de Enrofloxacina en QUINACILINA E?", opciones:["50 mg/mL","100 mg/mL","200 mg/mL","500 mg/mL"], correcta:2},
      {pregunta:"¿Cómo se administra QUINACILINA E?", opciones:["Inyectable IM","En el agua de bebida","En el alimento sólido","Subcutáneo"], correcta:1},
      {pregunta:"¿Cuántos días dura el tratamiento?", opciones:["3 días","5 días","7 días","10 días"], correcta:1},
      {pregunta:"¿Cuánto es el tiempo de retiro de QUINACILINA E?", opciones:["3 días","5 días","7 días","14 días"], correcta:2},
      {pregunta:"¿Se puede usar QUINACILINA E en aves en postura cuyos huevos son para consumo?", opciones:["Sí, sin restricción","Solo a dosis bajas","No está autorizado","Solo en emergencias"], correcta:2},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ANTIINFLAMATORIOS
  // ══════════════════════════════════════════════════════════════
  {
    id:8, nombre:"MEGLUNIX®", laboratorio:"Coaspharma", categoria:"Antiinflamatorios", emoji:"🩺",
    contenido:{
      queEs:"MEGLUNIX® es un AINE inyectable de Flunixin Meglumina 5% (50 mg/mL). El Flunixin Meglumina es el antiinflamatorio de referencia internacional para equinos y bovinos.",
      paraQueSirve:"Equinos: analgesia y antiinflamación en cólico y trastornos musculoesqueléticos. Bovinos: antipirético de primera línea. Porcinos: coadyuvante en mastitis, metritis y desórdenes musculoesqueléticos. No indicado para mascotas.",
      comoSeUsa:"Bovinos y porcinos: 2 mL/45 kg cada 24 horas IM, IV o SC. Equinos: 1 mL/45 kg cada 24 horas, preferir IM o IV. Puede usarse hasta 5 días consecutivos.",
      ventajas:["El antiinflamatorio de referencia en equinos a nivel mundial","Excelente para fiebre severa en bovinos","Actúa en mastitis y metritis porcina","Alta concentración 50 mg/mL en frasco de 50 mL"],
      dosificacion:"Bovinos/porcinos: 2 mL/45 kg cada 24 h. Equinos: 1 mL/45 kg cada 24 h. Frasco x 50 mL. Reg. ICA No. 7452 MV.",
    },
    preguntas:[
      {pregunta:"¿Cuál es el principio activo de MEGLUNIX®?", opciones:["Ketoprofeno","Meloxicam","Flunixin Meglumina","Dipirona"], correcta:2},
      {pregunta:"¿En qué especie es considerado el antiinflamatorio de referencia mundial?", opciones:["Bovinos","Equinos","Porcinos","Mascotas"], correcta:1},
      {pregunta:"¿Cuál es la dosis práctica en bovinos?", opciones:["1 mL/45 kg","2 mL/45 kg","5 mL/100 kg","0.5 mL/10 kg"], correcta:1},
      {pregunta:"¿Cada cuánto se administra MEGLUNIX®?", opciones:["Cada 6 horas","Cada 12 horas","Cada 24 horas","Cada 48 horas"], correcta:2},
      {pregunta:"¿Está indicado MEGLUNIX® para perros y gatos?", opciones:["Sí, a cualquier dosis","Solo en emergencias","No, no está indicado para mascotas","Solo cachorros"], correcta:2},
    ],
  },
  {
    id:9, nombre:"PREDNISOLONA® 20 mg", laboratorio:"Coaspharma", categoria:"Antiinflamatorios", emoji:"🩺",
    contenido:{
      queEs:"PREDNISOLONA® 20 mg es un corticoide oral sintético no fluorado para perros y gatos. A diferencia de los AINEs, actúa en la raíz de la respuesta inmune e inflamatoria, siendo mucho más potente para alergias y cuadros autoinmunes.",
      paraQueSirve:"Control de alergias severas, dermatitis alérgica, prurito crónico intenso, cuadros autoinmunes, linfomas y como antiinflamatorio potente. Es el corticoide más prescrito en medicina de pequeñas especies.",
      comoSeUsa:"Oral con o sin alimento cada 24 horas. Dosis varía según indicación: procesos inflamatorios 0.5–1 mg/kg/día; enfermedades autoinmunes/antineoplásico 2–4 mg/kg/día. Tratamiento prolongado: días alternos para reducir efectos secundarios.",
      ventajas:["El corticoide más prescrito en medicina de mascotas","Potencia alta para alergias que no responden a AINEs","Tableta: el dueño lo da en casa","Caja de 10 tabletas: accesible y alta rotación"],
      dosificacion:"Inflamatorio: 0.5–1 mg/kg/día oral. Autoinmune: 2–4 mg/kg/día. Administrar cada 24 h o días alternos en tratamientos largos. Caja x 10 tabletas. Reg. ICA No. 9742 MV.",
    },
    preguntas:[
      {pregunta:"¿Qué tipo de fármaco es PREDNISOLONA®?", opciones:["AINE","Antibiótico","Corticoide","Antiparasitario"], correcta:2},
      {pregunta:"¿Para qué condición dermatológica es especialmente útil?", opciones:["Heridas","Hongos","Alergias severas y prurito crónico","Parásitos externos"], correcta:2},
      {pregunta:"¿Qué se recomienda en tratamientos largos con PREDNISOLONA®?", opciones:["Dosis creciente","Administración días alternos","Doblar la dosis","Combinar con otro corticoide"], correcta:1},
      {pregunta:"¿Cuál es la dosis para procesos inflamatorios?", opciones:["0.1 mg/kg","0.5–1 mg/kg","2–4 mg/kg","10 mg/kg"], correcta:1},
      {pregunta:"¿Para cuáles especies está indicada PREDNISOLONA® 20 mg tableta?", opciones:["Solo perros","Perros y gatos","Todas las especies","Solo gatos"], correcta:1},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ANTIPARASITARIOS
  // ══════════════════════════════════════════════════════════════
  {
    id:10, nombre:"PRECTIMEC® 3", laboratorio:"Coaspharma", categoria:"Antiparasitarios", emoji:"🦠",
    contenido:{
      queEs:"PRECTIMEC® 3 es Ivermectina 3.15% inyectable SC — la mayor concentración disponible en el mercado. Es un endectocida: actúa contra parásitos internos (endo) Y externos (ecto) en bovinos.",
      paraQueSirve:"Controla nematodos gastrointestinales y pulmonares, garrapatas, ácaros y piojos en bovinos. Una sola aplicación protege al animal por hasta 120 días — ideal para ganadería extensiva.",
      comoSeUsa:"Subcutánea en la paleta del animal, previa desinfección. Dosis: 1 mL/50 kg. Una sola aplicación. No usar en vacas en lactancia ni 122 días antes del parto.",
      ventajas:["120 días de protección con una sola dosis","Elimina parásitos internos Y externos","Alta concentración: menos volumen, menos estrés al animal","Presentaciones: 50, 250 y 500 mL"],
      dosificacion:"1 mL/50 kg SC en paleta. Retiro: 122 días carne. No usar en lactancia. Presentaciones: 50, 250, 500 mL. Reg. ICA No. 7420 MV.",
    },
    preguntas:[
      {pregunta:"¿Cuál es la concentración de Ivermectina en PRECTIMEC® 3?", opciones:["1%","2%","3.15%","5%"], correcta:2},
      {pregunta:"¿Cuántos días de protección garantiza?", opciones:["30 días","60 días","90 días","120 días"], correcta:3},
      {pregunta:"¿Por qué vía se aplica?", opciones:["Oral","Intramuscular","Subcutánea","Intravenosa"], correcta:2},
      {pregunta:"¿Cuál es la dosis práctica?", opciones:["1 mL/10 kg","1 mL/25 kg","1 mL/50 kg","1 mL/100 kg"], correcta:2},
      {pregunta:"¿Se puede aplicar en vacas en lactancia?", opciones:["Sí, sin restricción","Sí, reduciendo la dosis","No, está contraindicado","Solo en emergencias"], correcta:2},
    ],
  },
  {
    id:11, nombre:"ANTRIBAXOL®", laboratorio:"Coaspharma", categoria:"Antiparasitarios", emoji:"🩸",
    contenido:{
      queEs:"ANTRIBAXOL® combina 4 componentes: Diaceturato de Diminazeno (antiprotozoario), Oxitetraciclina (antibiótico), Antipirina (antipirético) y Vitamina B12 (antianémico). Es el tratamiento de emergencia para hemoparásitos.",
      paraQueSirve:"Tratamiento de Anaplasmosis (fiebre, anemia severa), Babesiosis (orina roja, fiebre alta) y Tripanosomiasis en bovinos, ovinos y equinos. También para Babesia canis en perros.",
      comoSeUsa:"Intramuscular profunda, previa desinfección. Bovinos, ovinos y equinos: 1 mL/10 kg. Perros: 1 mL/12 kg. Una sola aplicación suele ser suficiente en la mayoría de casos.",
      ventajas:["Tratamiento de choque: actúa en pocas horas","4 activos en uno: antiprotozoario + antibiótico + antipirético + B12","La B12 ayuda a recuperar los glóbulos rojos destruidos","Una sola aplicación en la mayoría de casos"],
      dosificacion:"Bovinos/ovinos/equinos: 1 mL/10 kg IM. Perros: 1 mL/12 kg IM. Presentaciones: 30, 100, 250 y 500 mL. Reg. ICA No. 7559 MV.",
    },
    preguntas:[
      {pregunta:"¿Para qué enfermedades se usa ANTRIBAXOL®?", opciones:["Parasitismo intestinal","Anaplasmosis, Babesiosis y Tripanosomiasis","Mastitis","Neumonía"], correcta:1},
      {pregunta:"¿Por qué vía se aplica ANTRIBAXOL®?", opciones:["Oral","Subcutánea","Intramamaria","Intramuscular profunda"], correcta:3},
      {pregunta:"¿Cuál es la dosis en bovinos?", opciones:["1 mL/5 kg","1 mL/10 kg","1 mL/50 kg","5 mL/100 kg"], correcta:1},
      {pregunta:"¿Para qué sirve la B12 en ANTRIBAXOL®?", opciones:["Mata el parásito","Baja la fiebre","Ayuda a recuperar glóbulos rojos","Es antibiótico"], correcta:2},
      {pregunta:"¿Cuántas aplicaciones se necesitan generalmente?", opciones:["5 días seguidos","3 días alternos","Una sola en la mayoría de casos","Una semanal por un mes"], correcta:2},
    ],
  },
  {
    id:12, nombre:"VERMIZOL®", laboratorio:"Coaspharma", categoria:"Antiparasitarios", emoji:"🦠",
    contenido:{
      queEs:"VERMIZOL® es Fenbendazol 10% oral. El Fenbendazol es un bencimidazol que actúa sobre las TRES etapas del parásito: huevos, larvas y adultos — la mayoría de los antiparasitarios solo eliminan adultos.",
      paraQueSirve:"Control de parásitos pulmonares y gastrointestinales en bovinos, ovinos y equinos. Al actuar en las tres etapas, rompe completamente el ciclo de vida del parásito — resultado duradero.",
      comoSeUsa:"Oral. Bovinos y ovinos: 5 mg/kg, en práctica 5 mL/100 kg. Equinos: 7.5 mg/kg, en práctica 7.5 mL/100 kg. Disponible en jeringa o garrafa para grandes volúmenes.",
      ventajas:["Actúa contra huevos, larvas Y adultos — rompe el ciclo completo","Sin agujas: oral, sin estrés de manejo","Garrafa de 2 litros: económico para hatos grandes","Diferente mecanismo a la ivermectina: útil para rotación antiparasitaria"],
      dosificacion:"Bovinos/ovinos: 5 mL/100 kg oral. Equinos: 7.5 mL/100 kg oral. Presentaciones: jeringa 20 mL, frasco 200 mL, garrafa 500/1000/2000 mL. Reg. ICA No. 7424 MV.",
    },
    preguntas:[
      {pregunta:"¿En cuántas etapas del parásito actúa VERMIZOL®?", opciones:["Solo adultos","Larvas y adultos","Huevos y adultos","Huevos, larvas y adultos"], correcta:3},
      {pregunta:"¿Cuál es la dosis en bovinos?", opciones:["1 mL/10 kg","5 mL/100 kg","1 mL/50 kg","10 mL/100 kg"], correcta:1},
      {pregunta:"¿Por qué vía se administra?", opciones:["Inyectable SC","Intramamario","Oral","Tópico"], correcta:2},
      {pregunta:"¿En cuáles especies está indicado?", opciones:["Solo bovinos","Bovinos y porcinos","Bovinos, ovinos y equinos","Todas"], correcta:2},
      {pregunta:"¿Qué ventaja tiene actuar en las 3 etapas del parásito?", opciones:["Es más económico","Rompe el ciclo de vida completamente","Tiene menos efectos secundarios","Se aplica menos veces al año"], correcta:1},
    ],
  },
  {
    id:13, nombre:"PRONALMETRINA®", laboratorio:"Coaspharma", categoria:"Antiparasitarios", emoji:"🪲",
    contenido:{
      queEs:"PRONALMETRINA® es Cipermetrina Técnica 15% para uso externo en bovinos. La Cipermetrina es un piretroide sintético — la familia de insecticidas más usada en ganadería colombiana para garrapatas y moscas.",
      paraQueSirve:"Controla garrapatas Rhipicephalus (Boophilus) microplus y Amblyomma cajennense, y moscas Stomoxys calcitrans y Liperosia irritans en bovinos mediante baños de aspersión.",
      comoSeUsa:"Diluir en agua y aplicar con bomba de aspersión. Rhipicephalus: baños cada 21 días. Amblyomma: cada 7 días. Moscas: cada 3–4 semanas. 20 litros de mezcla bañan 5 animales de 400 kg.",
      ventajas:["Controla garrapatas Y moscas en un solo baño","Económico: garrafa de 1 litro rinde muchos baños","Fácil con bomba de espalda","Disponible desde 20 mL hasta garrafa de 1 L"],
      dosificacion:"Rhipicephalus: baños cada 21 días. Amblyomma: cada 7 días. Moscas: cada 3–4 semanas. Presentaciones: 20 mL, 120 mL, 500 mL, 1 L. Reg. ICA No. 7823 MV.",
    },
    preguntas:[
      {pregunta:"¿Cada cuántos días se aplica para Rhipicephalus (Boophilus)?", opciones:["Cada 7 días","Cada 14 días","Cada 21 días","Cada 30 días"], correcta:2},
      {pregunta:"¿En cuáles animales se usa PRONALMETRINA®?", opciones:["Solo equinos","Solo bovinos","Bovinos y porcinos","Todas las especies"], correcta:1},
      {pregunta:"¿Cuál es el principio activo?", opciones:["Amitraz","Ivermectina","Cipermetrina","Fipronil"], correcta:2},
      {pregunta:"¿Para control de moscas, cada cuánto se aplica?", opciones:["Diario","Cada 7 días","Cada 3–4 semanas","Cada 3 meses"], correcta:2},
      {pregunta:"¿Cuántos bovinos de 400 kg se bañan con 20 litros de mezcla?", opciones:["1 animal","3 animales","5 animales","10 animales"], correcta:2},
    ],
  },
  {
    id:14, nombre:"TRIPETS®", laboratorio:"Coaspharma", categoria:"Antiparasitarios", emoji:"🦟",
    contenido:{
      queEs:"TRIPETS® es el desparasitante oral más completo para perros: 4 principios activos en una sola jeringa — Febantel + Pirantel (nematodos incluyendo Trichuris) + Praziquantel (tenias) + Ivermectina (Dirofilaria/gusano del corazón).",
      paraQueSirve:"Controla todo el espectro parasitario canino: gusanos redondos, tenias, Trichuris y prevención de gusano del corazón (Dirofilaria immitis). Es el único producto del portafolio que los cubre todos.",
      comoSeUsa:"Oral. 1 mL por cada 5 kg de peso vivo. Jeringas listas para usar de 2, 5 y 10 mL. Sin necesidad de medir — el dueño aplica directamente en la boca del animal.",
      ventajas:["4 activos en 1: la desparasitación más completa del mercado","Incluye Dirofilaria (gusano del corazón) que otros no cubren","Jeringa lista: sin errores de dosificación","Alta percepción de valor para el dueño"],
      dosificacion:"1 mL/5 kg PV oral. Jeringas de 2, 5 y 10 mL. Reg. ICA No. 7555 MV / 9550 MV.",
    },
    preguntas:[
      {pregunta:"¿Cuántos principios activos tiene TRIPETS®?", opciones:["1","2","3","4"], correcta:3},
      {pregunta:"¿Qué parásito especial cubre TRIPETS® que otros desparasitantes NO incluyen?", opciones:["Toxocara canis","Tenias","Dirofilaria (gusano del corazón)","Trichuris"], correcta:2},
      {pregunta:"¿Cuál es la dosis?", opciones:["0.5 mL/5 kg","1 mL/5 kg","2 mL/5 kg","1 mL/10 kg"], correcta:1},
      {pregunta:"¿Para qué sirve el Praziquantel en TRIPETS®?", opciones:["Gusanos redondos","Gusano del corazón","Tenias (cestodos)","Parásitos pulmonares"], correcta:2},
      {pregunta:"¿Para cuáles animales está indicado TRIPETS®?", opciones:["Solo perros","Perros y gatos","Perros, gatos y bovinos","Todas las especies"], correcta:0},
    ],
  },
  {
    id:15, nombre:"EXTERPUL SPRAY®", laboratorio:"Coaspharma", categoria:"Antiparasitarios", emoji:"🦟",
    contenido:{
      queEs:"EXTERPUL SPRAY® es un spray de uso externo con Fipronil 2.5 mg/mL para perros y gatos. Fipronil es el activo más efectivo para pulgas y garrapatas en mascotas — bloquea el sistema nervioso del parásito.",
      paraQueSirve:"Elimina pulgas (Ctenocephalides sp.) y garrapatas (Rhipicephalus sanguineus, Ixodes sp.) en formas adultas. Las pulgas transmiten la tenia Dipylidium al animal y potencialmente al humano.",
      comoSeUsa:"Aplicar 3–6 mL de solución por kilogramo de peso. Cada pulsación del atomizador entrega 0.9 mL. Aplicar sobre el pelo en sentido contrario al crecimiento para que llegue a la piel. Uso externo.",
      ventajas:["Elimina pulgas Y garrapatas","El dueño lo aplica en casa: sin visita al veterinario","Protección de semanas por aplicación","Alta rotación en temporadas de lluvia"],
      dosificacion:"3–6 mL/kg (7.5–15 mg/kg). Una pulsación = 0.9 mL. Spray x 100 y 250 mL. Reg. ICA No. 9933 MV.",
    },
    preguntas:[
      {pregunta:"¿Cuál es el principio activo de EXTERPUL SPRAY®?", opciones:["Ivermectina","Cipermetrina","Fipronil","Amitraz"], correcta:2},
      {pregunta:"¿Cuánto entrega cada pulsación del atomizador?", opciones:["0.3 mL","0.5 mL","0.9 mL","1.5 mL"], correcta:2},
      {pregunta:"¿Contra cuáles parásitos actúa?", opciones:["Solo pulgas","Solo garrapatas","Pulgas y garrapatas","Parásitos intestinales"], correcta:2},
      {pregunta:"¿Por qué las pulgas son un problema grave además de molestar?", opciones:["Solo causan comezón","Transmiten tenias al animal y al humano","Solo afectan el pelo","Son difíciles de ver"], correcta:1},
      {pregunta:"¿Cuál es la vía de administración?", opciones:["Oral","Inyectable","Uso externo","Intramamario"], correcta:2},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // DERMATOLOGÍA MASCOTAS
  // ══════════════════════════════════════════════════════════════
  {
    id:16, nombre:"VISIVET®", laboratorio:"Coaspharma", categoria:"Dermatología Mascotas", emoji:"👁",
    contenido:{
      queEs:"VISIVET® es un gotero de USO DOBLE: sirve como gotas oftálmicas (ojos) y óticas (oídos). Contiene Gentamicina (antibiótico), Dexametasona (antiinflamatorio) y Lidocaína (analgésico local).",
      paraQueSirve:"Ojos: blefaritis, conjuntivitis y queratitis. Oídos: otitis interna, media y externa. Es uno de los productos de mayor rotación en tiendas de mascotas — otitis y conjuntivitis son las consultas más frecuentes.",
      comoSeUsa:"Ojos: 1–2 gotas/ojo 2–3 veces/día. Oídos: limpiar el canal primero, luego 5 gotas/oído 2–3 veces/día. La Lidocaína produce alivio inmediato y el animal tolera bien el tratamiento.",
      ventajas:["Un solo producto para ojos Y oídos","Lidocaína: alivio inmediato — el animal deja de rascarse","3 activos: antibiótico + antiinflamatorio + analgésico","Gotero de 10 mL: cómodo para el dueño"],
      dosificacion:"Ocular: 1–2 gotas/ojo 2–3 veces/día. Ótica: 5 gotas/oído 2–3 veces/día previa limpieza. Frasco gotero x 10 mL. Reg. ICA No. 7425 MV.",
    },
    preguntas:[
      {pregunta:"¿Para cuántas condiciones sirve VISIVET®?", opciones:["Solo ojos","Solo oídos","Ojos y oídos","Ojos, oídos y piel"], correcta:2},
      {pregunta:"¿Cuántas gotas se aplican en cada oído?", opciones:["1–2 gotas","3 gotas","5 gotas","10 gotas"], correcta:2},
      {pregunta:"¿Para qué sirve la Lidocaína en VISIVET®?", opciones:["Mata bacterias","Reduce la inflamación","Alivia el dolor local inmediatamente","Es el antifúngico"], correcta:2},
      {pregunta:"¿Qué se debe hacer ANTES de aplicar las gotas en el oído?", opciones:["Calentar el frasco","Limpiar el canal auricular","Agitar vigorosamente","Aplicar anestesia general"], correcta:1},
      {pregunta:"¿Cuántas veces al día se aplica en condiciones normales?", opciones:["1 vez","2–3 veces","5 veces","Cada hora"], correcta:1},
    ],
  },
  {
    id:17, nombre:"RESTADERM®", laboratorio:"Coaspharma", categoria:"Dermatología Mascotas", emoji:"🧴",
    contenido:{
      queEs:"RESTADERM® es solución tópica con triple acción: Gentamicina (antibacteriana), Dexametasona (antiinflamatoria) y Ketoconazol (antifúngica). Indicada para perros, gatos, equinos y bovinos en afecciones cutáneas.",
      paraQueSirve:"Trata dermatitis de origen bacteriano, fúngico e inflamatorio simultáneamente. La mayoría de las dermatitis tienen los tres componentes a la vez. Alta rotación especialmente en temporada de lluvias cuando los hongos se disparan.",
      comoSeUsa:"Distribuir sobre el área afectada asegurando buen contacto con la piel. Aplicar 2 veces al día durante 7 días o hasta que los síntomas desaparezcan. Solo uso tópico.",
      ventajas:["3 activos en 1: bacteriano + fúngico + inflamatorio","Cubre el 90% de las dermatitis del mostrador","Alta rotación: dermatitis son consulta diaria","También sirve en bovinos y equinos"],
      dosificacion:"Aplicar 2 veces/día por 7 días o hasta resolución. Frasco x 100 mL tópico. Reg. ICA No. 7509 MV.",
    },
    preguntas:[
      {pregunta:"¿Cuántos principios activos tiene RESTADERM®?", opciones:["1","2","3","4"], correcta:2},
      {pregunta:"¿Cuál es el componente antifúngico de RESTADERM®?", opciones:["Gentamicina","Dexametasona","Ketoconazol","Lidocaína"], correcta:2},
      {pregunta:"¿Cuántas veces al día se aplica?", opciones:["1 vez","2 veces","3 veces","4 veces"], correcta:1},
      {pregunta:"¿En cuáles especies está indicado RESTADERM®?", opciones:["Solo mascotas","Solo bovinos y equinos","Mascotas, equinos y bovinos","Solo perros"], correcta:2},
      {pregunta:"¿Por qué RESTADERM® cubre la mayoría de dermatitis?", opciones:["Es el más económico","Las dermatitis suelen ser bacterianas, fúngicas e inflamatorias a la vez","Tiene mayor volumen","Se aplica solo una vez"], correcta:1},
    ],
  },
  {
    id:18, nombre:"CICADOG-T", laboratorio:"Tecnocalidad", categoria:"Dermatología Mascotas", emoji:"🧴",
    contenido:{
      queEs:"CICADOG-T es una crema tópica 5 en 1 de Tecnocalidad (línea Pets Caniche): Gentamicina (antibacteriana) + Ketoconazol (antifúngica) + Dexametasona (antiinflamatoria) + Lidocaína (analgésica) + Alantoína (cicatrizante).",
      paraQueSirve:"Para dermatofitosis, infecciones cutáneas bacterianas, prurito, eczema y dermatitis alérgica y no alérgica en perros y gatos. El quinto componente — Alantoína — acelera la cicatrización, lo que lo diferencia de RESTADERM y CURAZIN-T.",
      comoSeUsa:"Aplicar sobre el área afectada 2 veces al día hasta que los síntomas desaparezcan. Asegurar buen contacto con la piel. Tubo de 35 g. Solo uso tópico.",
      ventajas:["5 activos en 1: el dermatológico más completo del portafolio","Alantoína cicatrizante: acelera la recuperación de la piel","Lidocaína: alivio inmediato del dolor e inflamación","Tubo de 35 g: fácil manejo y aplicación precisa"],
      dosificacion:"Aplicar 2 veces/día hasta resolución. Tubo x 35 g. Laboratorio Tecnocalidad — línea Pets Caniche.",
    },
    preguntas:[
      {pregunta:"¿Cuántos principios activos tiene CICADOG-T?", opciones:["2","3","4","5"], correcta:3},
      {pregunta:"¿Cuál componente de CICADOG-T lo diferencia de RESTADERM® y CURAZIN-T?", opciones:["Gentamicina","Ketoconazol","Alantoína (cicatrizante)","Dexametasona"], correcta:2},
      {pregunta:"¿De qué laboratorio es CICADOG-T?", opciones:["Coaspharma","QualiVet","Comervet","Tecnocalidad"], correcta:3},
      {pregunta:"¿Para qué sirve la Lidocaína en CICADOG-T?", opciones:["Mata hongos","Cicatriza","Alivia el dolor e inflamación inmediatamente","Es antibiótico"], correcta:2},
      {pregunta:"¿Cuántas veces al día se aplica CICADOG-T?", opciones:["1 vez","2 veces","3 veces","4 veces"], correcta:1},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // MASTITIS
  // ══════════════════════════════════════════════════════════════
  {
    id:19, nombre:"MASCLOXAM®", laboratorio:"Coaspharma", categoria:"Mastitis", emoji:"🐄",
    contenido:{
      queEs:"MASCLOXAM® es una suspensión intramamaria con Cloxacilina benzatínica 700 mg + Ampicilina trihidrato 350 mg por 10 mL. Diseñado para aplicarse en el período seco (entre lactancias).",
      paraQueSirve:"Controla mastitis en período seco por Streptococcus, Staphylococcus, Corynebacterium y E. coli. Protege la ubre desde el secado hasta el siguiente parto — la vaca arranca la nueva lactancia con la ubre sana.",
      comoSeUsa:"Al finalizar el último ordeño de la lactancia: lavar y desinfectar el pezón, introducir la cánula e inyectar todo el contenido en el cuarto afectado. Después aplicar sellador de pezón.",
      ventajas:["Doble acción: Cloxacilina + Ampicilina","Una sola aplicación protege durante todo el período seco","Elimina mastitis subclínica que el ganadero no ve","La vaca inicia la siguiente lactancia con ubre sana"],
      dosificacion:"Una jeringa/cuarto al inicio del período seco. Retiro: 28 días carne, 96 h leche tras finalizar. Presentación: Frasco 100 mL.",
    },
    preguntas:[
      {pregunta:"¿Cuándo se aplica MASCLOXAM®?", opciones:["Durante la lactancia","Al inicio del período seco","Antes del parto","Diariamente"], correcta:1},
      {pregunta:"¿Cuál es la vía de administración?", opciones:["Intramuscular","Subcutánea","Intramamaria","Oral"], correcta:2},
      {pregunta:"¿Qué se debe hacer DESPUÉS de aplicar MASCLOXAM®?", opciones:["Ordeñar inmediatamente","Aplicar sellador de pezón","Dar antibiótico oral","Nada más"], correcta:1},
      {pregunta:"¿Cuánto es el tiempo de retiro en leche?", opciones:["24 horas","48 horas","96 horas","7 días"], correcta:2},
      {pregunta:"¿Cuántos principios activos tiene MASCLOXAM®?", opciones:["1","2","3","4"], correcta:1},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // REPRODUCTIVOS
  // ══════════════════════════════════════════════════════════════
  {
    id:20, nombre:"LIBIDOSEL®", laboratorio:"Coaspharma", categoria:"Reproductivos", emoji:"🔬",
    contenido:{
      queEs:"LIBIDOSEL® aporta los 4 minerales que más impactan la reproducción: Fósforo, Zinc, Yodo y Selenio, más Vitamina B3. Se aplica IV o IM por 3–5 días. Es el mineral reproductivo de referencia del portafolio.",
      paraQueSirve:"Corrige deficiencias minerales reproductivas en bovinos, equinos, ovinos, caprinos, porcinos y perros. En hembras: mejora ciclicidad y reduce mortalidad embrionaria. En machos: mejora libido y calidad seminal. Clave en trópico colombiano donde los suelos son pobres en estos minerales.",
      comoSeUsa:"1 mL por cada 10–20 kg de peso vivo, diariamente por 3 a 5 días. Vía intravenosa o intramuscular profunda previa desinfección.",
      ventajas:["Los 4 minerales reproductivos en un solo frasco","Actúa en hembras (ciclo, preñez) Y machos (libido, semen)","Especialmente eficaz en suelos tropicales pobres en minerales","Sin tiempo de retiro"],
      dosificacion:"1 mL/10–20 kg PV diario por 3–5 días IV o IM. Presentaciones: 50, 250 y 500 mL.",
    },
    preguntas:[
      {pregunta:"¿Cuáles son los 4 minerales principales de LIBIDOSEL®?", opciones:["Calcio, Magnesio, Fósforo, Zinc","Fósforo, Zinc, Yodo, Selenio","Hierro, Cobre, Cobalto, Zinc","Selenio, Calcio, Hierro, Manganeso"], correcta:1},
      {pregunta:"¿Por cuántos días se aplica?", opciones:["Un solo día","3 a 5 días diarios","7 días alternos","Una vez por semana"], correcta:1},
      {pregunta:"¿Cómo afecta la deficiencia de fósforo en hembras?", opciones:["No tiene efecto","Mejora la fertilidad","Causa baja fertilidad e irregularidad del celo","Solo afecta los huesos"], correcta:2},
      {pregunta:"¿Cómo afecta la deficiencia de zinc en machos?", opciones:["Aumenta la libido","Disminuye la libido y afecta la espermatogénesis","No tiene efecto reproductivo","Solo afecta el crecimiento"], correcta:1},
      {pregunta:"¿Por qué es especialmente importante LIBIDOSEL® en Colombia?", opciones:["Porque es más barato","Porque los suelos tropicales son pobres en estos minerales","Porque tiene mejor sabor","Porque no requiere receta"], correcta:1},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // VITAMINAS Y MINERALES
  // ══════════════════════════════════════════════════════════════
  {
    id:21, nombre:"CALMAYEC®", laboratorio:"Coaspharma", categoria:"Vitaminas y Minerales", emoji:"⚡",
    contenido:{
      queEs:"CALMAYEC® es una bolsa de 500 mL IV con Gluconato de Calcio, Glicerofosfato de Magnesio, Fósforo y Dextrosa. Viene con venoclisis incluida lista para usar.",
      paraQueSirve:"Trata la fiebre de leche (hipocalcemia) en vacas recién paridas — animal caído que no puede pararse, en shock metabólico. También para cetosis, raquitismo y osteomalacia.",
      comoSeUsa:"Intravenoso lento usando el equipo de venoclisis incluido. Bovinos y equinos: 100 mL/100 kg PV. Puede repetirse según criterio veterinario.",
      ventajas:["Respuesta en 20–30 minutos: la vaca se para","Aporta calcio, magnesio, fósforo y energía en una sola bolsa","Venoclisis incluida: lista para usar","Alta demanda en épocas de partos"],
      dosificacion:"Bovinos/equinos: 100 mL/100 kg IV lenta. Porcinos/ovinos/caninos: 50 mL/50 kg. Bolsa x 500 mL con venoclisis.",
    },
    preguntas:[
      {pregunta:"¿Para qué condición se usa principalmente CALMAYEC®?", opciones:["Parasitismo","Fiebre de leche (hipocalcemia)","Diarrea","Heridas"], correcta:1},
      {pregunta:"¿Por qué vía se administra?", opciones:["Oral","Subcutánea","Intramuscular","Intravenosa lenta"], correcta:3},
      {pregunta:"¿Cuánto tiempo tarda en hacer efecto?", opciones:["2 horas","20–30 minutos","6 horas","Al día siguiente"], correcta:1},
      {pregunta:"¿Qué mineral es el principal en CALMAYEC®?", opciones:["Hierro","Zinc","Calcio","Selenio"], correcta:2},
      {pregunta:"¿Qué incluye el empaque de CALMAYEC®?", opciones:["Solo la bolsa","Bolsa + jeringa","Bolsa + venoclisis lista para usar","Solo la venoclisis"], correcta:2},
    ],
  },
  {
    id:22, nombre:"CEBADOR®", laboratorio:"Coaspharma", categoria:"Vitaminas y Minerales", emoji:"⚡",
    contenido:{
      queEs:"CEBADOR® es una solución inyectable SC con complejo B, Vitamina E, 8 aminoácidos esenciales en forma L (Lisina 1000 mg, Metionina 210 mg y más), minerales (Mg, Zn, Cu) y Ácido oleico. Es el reconstituyente más completo del portafolio.",
      paraQueSirve:"Para el animal decaído, sin apetito, con baja condición corporal, en recuperación de enfermedades, posvacunación o bajo estrés. Bovinos, equinos, porcinos, ovinos, caprinos y caninos.",
      comoSeUsa:"Subcutáneo previa desinfección. Bovinos/equinos: 10 mL. Terneros/potros: 5 mL. Porcinos/ovinos: 3 mL. Caninos: 0.5 mL. Tres aplicaciones con intervalo de 30 días.",
      ventajas:["El reconstituyente más completo: vitaminas + aminoácidos + minerales en uno","Aminoácidos forma L: mayor biodisponibilidad","Ácido oleico protege el hígado","Resultados visibles en días"],
      dosificacion:"Bovinos/equinos: 10 mL SC. Terneros/potros: 5 mL. Porcinos/ovinos: 3 mL. Caninos: 0.5 mL. Tres aplicaciones cada 30 días. Presentaciones: 20–500 mL.",
    },
    preguntas:[
      {pregunta:"¿Con qué intervalo se aplican las 3 dosis de CEBADOR®?", opciones:["Cada 7 días","Cada 15 días","Cada 30 días","Cada 60 días"], correcta:2},
      {pregunta:"¿Por qué los aminoácidos de CEBADOR® son más efectivos?", opciones:["Son sintéticos","Están en forma L (levógira) de mayor biodisponibilidad","Son más baratos","Son en polvo"], correcta:1},
      {pregunta:"¿Qué dosis se usa en bovinos adultos?", opciones:["3 mL","5 mL","10 mL","20 mL"], correcta:2},
      {pregunta:"¿Para qué sirve el Ácido oleico en CEBADOR®?", opciones:["Antiparasitario","Protege el hígado y sistema cardiovascular","Baja la fiebre","Aumenta la leche"], correcta:1},
      {pregunta:"¿Cuántos aminoácidos esenciales contiene CEBADOR®?", opciones:["3","5","8","12"], correcta:2},
    ],
  },
  {
    id:23, nombre:"HEMOMIL 600", laboratorio:"Tecnocalidad", categoria:"Vitaminas y Minerales", emoji:"⚡",
    contenido:{
      queEs:"HEMOMIL 600 es una solución inyectable IM antianémica de Tecnocalidad con la mayor concentración de B12 del mercado: 600 mcg/mL, más Hierro Dextrano, Complejo B completo, Metionina y Lidocaína HCl.",
      paraQueSirve:"Antianémico para anemias de diferentes tipos (normocrómicas, megaloblásticas). Coadyuvante en recuperación de Anaplasmosis, Babesiosis y Tripanosomiasis. La Lidocaína reduce el dolor de la inyección.",
      comoSeUsa:"Intramuscular. Bovinos/equinos adultos: 3–5 mL. Terneros/potros: 2–3 mL. Ovinos/porcinos: 1–2 mL. Perros: 0.5–1 mL. Sin tiempo de retiro.",
      ventajas:["600 mcg B12/mL: la concentración más alta del mercado","Lidocaína incluida: la inyección duele menos","Sin tiempo de retiro","Actúa contra anemia y como coadyuvante en hemoparásitos"],
      dosificacion:"Bovinos/equinos: 3–5 mL IM. Terneros/potros: 2–3 mL. Ovinos/porcinos: 1–2 mL. Perros: 0.5–1 mL. Presentaciones: 20, 50, 100, 500, 550 mL. ICA No. 10285-MV.",
    },
    preguntas:[
      {pregunta:"¿Cuántos mcg de B12 tiene HEMOMIL 600 por mL?", opciones:["100 mcg","250 mcg","400 mcg","600 mcg"], correcta:3},
      {pregunta:"¿Para qué sirve la Lidocaína en HEMOMIL 600?", opciones:["Mata parásitos","Reduce el dolor de la inyección","Aumenta la B12","Es antibiótico"], correcta:1},
      {pregunta:"¿De qué laboratorio es HEMOMIL 600?", opciones:["Coaspharma","QualiVet","Comervet","Tecnocalidad"], correcta:3},
      {pregunta:"¿Cuánto es el tiempo de retiro?", opciones:["7 días","14 días","28 días","Sin tiempo de retiro"], correcta:3},
      {pregunta:"¿Cuál es la dosis en bovinos adultos?", opciones:["0.5–1 mL","1–2 mL","3–5 mL","10–15 mL"], correcta:2},
    ],
  },
  {
    id:24, nombre:"VITAMINOCHOCK®", laboratorio:"Tecnocalidad", categoria:"Vitaminas y Minerales", emoji:"⚡",
    contenido:{
      queEs:"VITAMINOCHOCK® es un suplemento oral líquido de Tecnocalidad con vitaminas liposolubles (A, D3, K3, E), complejo B completo, ATP energético y 17 aminoácidos en forma L. Se mezcla en el agua de bebida.",
      paraQueSirve:"Multivitamínico oral para todas las especies en todas las etapas: aves, bovinos, equinos, porcinos, ovinos, caninos, felinos y más. Para períodos de vacunación, estrés por calor, cambios de etapa o recuperación. Sin tiempo de retiro.",
      comoSeUsa:"En agua de bebida. Aves: 1 mL/L agua/día. Bovinos: 1 mL/10 kg/día. Caninos grandes: 1 mL/10 kg/día; razas pequeñas: 1 gota/kg/día. Porcinos: 1 mL/L agua o 1 mL/10 kg/día.",
      ventajas:["Sin agujas: va al agua, llega a todos los animales","17 aminoácidos en forma L: alta biodisponibilidad","ATP: energía celular directa","Sin tiempo de retiro — apto en cualquier etapa productiva","Sirve para TODAS las especies"],
      dosificacion:"Aves: 1 mL/L agua/día. Bovinos/equinos/ovinos: 1 mL/10 kg/día. Sin tiempo de retiro. Presentaciones: 20 mL, 100 mL, 1 L, 5 L, 20 L. Reg. ICA No. 21755AL.",
    },
    preguntas:[
      {pregunta:"¿Cómo se administra VITAMINOCHOCK®?", opciones:["Inyectable IM","En el agua de bebida","En el alimento sólido","Subcutáneo"], correcta:1},
      {pregunta:"¿Cuánto es el tiempo de retiro?", opciones:["7 días","14 días","28 días","Sin tiempo de retiro"], correcta:3},
      {pregunta:"¿Cuántos aminoácidos contiene en forma L?", opciones:["5","10","17","20"], correcta:2},
      {pregunta:"¿Qué molécula energética especial contiene?", opciones:["Glucosa","ATP","Creatina","Glicerol"], correcta:1},
      {pregunta:"¿De qué laboratorio es VITAMINOCHOCK®?", opciones:["Coaspharma","QualiVet","Comervet","Tecnocalidad"], correcta:3},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // SUPLEMENTOS MASCOTAS
  // ══════════════════════════════════════════════════════════════
  {
    id:25, nombre:"ARTRI-VET™", laboratorio:"QualiVet", categoria:"Suplementos Mascotas", emoji:"🐾",
    contenido:{
      queEs:"ARTRI-VET™ de QualiVet es una tableta saborizada para perros y gatos con la combinación más completa para articulaciones: Glucosamina HCl 600 mg + Condroitin Sulfato 500 mg + Colágeno Hidrolizado 50 mg + MSM 100 mg.",
      paraQueSirve:"Para osteoartritis, osteoartrosis, displasia de cadera, inflamación articular, tendinitis y recuperación postoperatoria. También como prevención en animales de edad avanzada o razas predispuestas.",
      comoSeUsa:"Oral, directamente o mezclado con alimento. El animal lo acepta solo por su sabor a tocino. Hasta 5 kg: ½ tableta/día. 6–18 kg: 1 tableta/día. Más de 19 kg: 2 tabletas/día.",
      ventajas:["4 ingredientes activos en 1 tableta","Glucosamina construye cartílago nuevo","Condroitina retiene agua en el cartílago","MSM reduce inflamación naturalmente","Tableta saborizada: fácil administración"],
      dosificacion:"Hasta 5 kg: ½ tab/día. 6–18 kg: 1 tab/día. Más 19 kg: 2 tab/día. Caja x 60 tabletas. Reg. ICA No. 13666 SL.",
    },
    preguntas:[
      {pregunta:"¿De qué laboratorio es ARTRI-VET™?", opciones:["Coaspharma","Tecnocalidad","QualiVet","Comervet"], correcta:2},
      {pregunta:"¿Cuántos ingredientes activos tiene?", opciones:["1","2","3","4"], correcta:3},
      {pregunta:"¿Cuál es la función de la Glucosamina?", opciones:["Reduce la fiebre","Construye cartílago nuevo","Elimina parásitos","Aporta energía"], correcta:1},
      {pregunta:"¿Cuál es la dosis para un perro de 10 kg?", opciones:["½ tableta","1 tableta","2 tabletas","3 tabletas"], correcta:1},
      {pregunta:"¿Por qué el animal acepta ARTRI-VET™ fácilmente?", opciones:["Porque es líquido","Porque tiene sabor a tocino","Porque es pequeña","Sin sabor"], correcta:1},
    ],
  },
  {
    id:26, nombre:"ENZY-PRO™", laboratorio:"QualiVet", categoria:"Suplementos Mascotas", emoji:"🐾",
    contenido:{
      queEs:"ENZY-PRO™ de QualiVet es una tableta saborizada con Pancreatina 4X (Amilasas + Lipasas + Proteasas) y Lactobacillus acidophilus para perros y gatos. Optimiza la digestión de proteínas, grasas y carbohidratos.",
      paraQueSirve:"Para perros y gatos con diarrea crónica intermitente, vómitos recurrentes, delgadez a pesar de comer bien, exceso de flujo digestivo, dolor abdominal o falta de apetito. Previene y trata síntomas de insuficiencia pancreática.",
      comoSeUsa:"Oral, directamente o con el alimento. Perros y gatos menos de 9 kg: 1 tableta/día. Perros de 9 kg o más: 1–2 tabletas/día.",
      ventajas:["Enzimas + probiótico en una tableta","Optimiza la absorción de todos los nutrientes","Previene síntomas de pancreatitis crónica","Fortalece el sistema inmunológico intestinal","Sabor a tocino: fácil administración"],
      dosificacion:"Menos de 9 kg: 1 tab/día. 9 kg o más: 1–2 tab/día. Caja x 60 tabletas. Reg. ICA No. 13524 SL.",
    },
    preguntas:[
      {pregunta:"¿Qué tipo de enzimas contiene ENZY-PRO™?", opciones:["Enzimas hepáticas","Pancreatina 4X (Amilasas, Lipasas, Proteasas)","Solo Lipasas","Enzimas renales"], correcta:1},
      {pregunta:"¿Qué probiótico contiene ENZY-PRO™?", opciones:["Bifidobacterium","Saccharomyces","Lactobacillus acidophilus","Streptococcus thermophilus"], correcta:2},
      {pregunta:"¿Para qué perro es la principal indicación de ENZY-PRO™?", opciones:["Perro con artritis","Perro con diarrea crónica y delgadez","Perro con anemia","Perro con alergia de piel"], correcta:1},
      {pregunta:"¿Cuál es la dosis para un perro de 12 kg?", opciones:["½ tableta","1 tableta","1–2 tabletas","3 tabletas"], correcta:2},
      {pregunta:"¿De qué laboratorio es ENZY-PRO™?", opciones:["Coaspharma","Tecnocalidad","QualiVet","Comervet"], correcta:2},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // SALUD PÚBLICA
  // ══════════════════════════════════════════════════════════════
  {
    id:27, nombre:"NEO SERPA-RAT", laboratorio:"Comervet", categoria:"Salud Pública", emoji:"🪲",
    contenido:{
      queEs:"NEO SERPA-RAT es un cebo fresco rodenticida de dosis única a base de Brodifacouma 0.005% de Comervet. Se presenta en bolsitas de papel filtro biodegradable con pasta de aceites vegetales de alta palatabilidad.",
      paraQueSirve:"Control de ratas y ratones: rata de alcantarilla (Rattus norvegicus), rata de los techos (Rattus rattus), ratón doméstico (Mus musculus) y ratón de campo en instalaciones pecuarias, bodegas y granjas.",
      comoSeUsa:"Colocar las bolsitas cerca de madrigueras y lugares de paso. Usar 2 o más bolsitas por cebadero. Renovar el cebo consumido hasta que cese su consumo — señal de que la plaga está controlada. Los efectos aparecen 3–6 días después de la ingestión.",
      ventajas:["Dosis única es letal: alta efectividad","Los roedores no asocian el cebo con el daño — no generan desconfianza","Bolsita biodegradable: amigable con el ambiente","Disponible desde 30 g hasta 1 kg (100 cebos)"],
      dosificacion:"2 o más bolsitas/cebadero cerca de madrigueras. Renovar hasta que cese el consumo. Presentaciones: sobre 30 g (3 cebos), 50 g (5 cebos), 1 kg (100 cebos). ICA 8590-MV.",
    },
    preguntas:[
      {pregunta:"¿Cuál es el principio activo de NEO SERPA-RAT?", opciones:["Clorpirifos","Brodifacouma","Amitraz","Fipronil"], correcta:1},
      {pregunta:"¿Cuántas bolsitas se usan por cebadero?", opciones:["Solo 1","2 o más","5 mínimo","10 mínimo"], correcta:1},
      {pregunta:"¿Cuántos días después de la ingestión aparecen los efectos?", opciones:["Inmediato","1–2 días","3–6 días","2 semanas"], correcta:2},
      {pregunta:"¿Por qué los roedores no sospechan del cebo NEO SERPA-RAT?", opciones:["Porque tiene mal sabor","Porque no asocian el cebo con el daño — no desconfían","Porque es invisible","Porque actúa instantáneamente"], correcta:1},
      {pregunta:"¿De qué laboratorio es NEO SERPA-RAT?", opciones:["Coaspharma","Tecnocalidad","QualiVet","Comervet"], correcta:3},
    ],
  },
  {
    id:28, nombre:"ECOREX ALFA", laboratorio:"Comervet", categoria:"Salud Pública", emoji:"🪲",
    contenido:{
      queEs:"ECOREX ALFA es una suspoemulsión insecticida concentrada de Comervet con DOBLE acción: efecto choque inmediato (Tetrametrina + PBO) y efecto residual prolongado (Deltametrina en suspensión). Combate casi todos los insectos problema.",
      paraQueSirve:"Control de cucarachas, pulgas, moscas y sus larvas, mosquitos, hormigas, chinches, garrapatas, piojos, tábanos y ácaros en edificios, clínicas, hospitales, instalaciones industriales, granjas y bodegas de alimento.",
      comoSeUsa:"Diluir en agua y aplicar por pulverización o nebulización. Dosis habitual: 25–50 mL en 5 litros de agua para tratar 100 m². Plazo de seguridad recomendado: 12 horas.",
      ventajas:["Doble acción: choque rápido + residual prolongado","Controla más de 15 tipos de insectos","Un litro rinde para 400 m² en infestación habitual","Sin olor: líquido blanco casi inodoro"],
      dosificacion:"Habitual: 25 mL/5 L agua/100 m². Infestación fuerte: 50 mL/5 L/100 m². Nebulización aérea: 100 mL/5 L/500 m³. Presentaciones: 30, 120, 500 y 1000 mL. INVIMA RGSP-0000002-2021.",
    },
    preguntas:[
      {pregunta:"¿Cuáles son los dos tipos de acción de ECOREX ALFA?", opciones:["Solo acción rápida","Solo acción residual","Efecto choque inmediato + efecto residual","Acción oral y tópica"], correcta:2},
      {pregunta:"¿Cuántas horas es el plazo de seguridad recomendado?", opciones:["2 horas","6 horas","12 horas","24 horas"], correcta:2},
      {pregunta:"¿Cuál es la dosis habitual por 100 m²?", opciones:["5 mL/5 L agua","25 mL/5 L agua","100 mL/5 L agua","1 L/5 L agua"], correcta:1},
      {pregunta:"¿De qué laboratorio es ECOREX ALFA?", opciones:["Coaspharma","Tecnocalidad","QualiVet","Comervet"], correcta:3},
      {pregunta:"¿Qué aspecto tiene ECOREX ALFA?", opciones:["Líquido rojo con fuerte olor","Polvo amarillo","Líquido blanco casi inodoro","Gel transparente"], correcta:2},
    ],
  },
];




// ─── CONFIG COMPARTIDA ────────────────────────────────────────────────────────
const CATEGORIAS_CAT = ["Todas", ...new Set(PRODUCTS.map(p => p.categoria))];
const LABS_CAT = ["Todos", ...new Set(PRODUCTS.map(p => p.laboratorio))];
const ESPECIES_LIST = ["Todas","Bovinos","Equinos","Porcinos","Ovinos","Aves","Mascotas","Instalaciones pecuarias"];
const CATEGORIAS_CAP = ["Todas","Analgésicos y Antipiréticos","Antibióticos","Antiinflamatorios","Antiparasitarios","Dermatología Mascotas","Mastitis","Reproductivos","Salud Pública","Suplementos Mascotas","Vitaminas y Minerales"];
const LABS_CAP = ["Todos","Coaspharma","Tecnocalidad","QualiVet","Comervet"];
const TABS_CAP = [
  { id:"queEs",        label:"¿Qué es?",        icon:"📋" },
  { id:"paraQueSirve", label:"¿Para qué sirve?", icon:"🎯" },
  { id:"comoSeUsa",    label:"¿Cómo se usa?",    icon:"💉" },
  { id:"ventajas",     label:"Ventajas",          icon:"✅" },
  { id:"dosificacion", label:"Dosificación",      icon:"⚖️" },
];
const especieColor = {
  Bovinos:"#f59e0b",Porcinos:"#f87171",Aves:"#60a5fa",
  Mascotas:"#a78bfa",Equinos:"#34d399",Ovinos:"#fb923c",
  "Instalaciones pecuarias":"#94a3b8",
};
const catIcon = {
  "Antiparasitarios":"🦠","Antibióticos":"💊","Reproductivos":"🔬",
  "Vitaminas y Minerales":"⚡","Antiinflamatorios":"🩺","Mastitis":"🐄",
  "Biológicos y Probióticos":"🧫","Analgésicos y Antipiréticos":"💊",
  "Anticoccidiales":"🔴","Control de Plagas":"🪲","Salud Pública":"🪲",
  "Suplementos Mascotas":"🐾","Dermatología Mascotas":"🧴",
  "Higiene Mascotas":"🛁","Antieméticos":"💊",
};
const catColors = {
  "Analgésicos y Antipiréticos":"#5c3a1a","Antibióticos":"#1a4a5c",
  "Antiinflamatorios":"#4a1a5c","Antiparasitarios":"#1a5c1a",
  "Dermatología Mascotas":"#5c4a1a","Mastitis":"#2d7a2d",
  "Reproductivos":"#5c1a3a","Salud Pública":"#3a3a1a",
  "Suplementos Mascotas":"#1a3a5c","Vitaminas y Minerales":"#b8860b","Antieméticos":"#1a5c4a",
};

// ─── STORAGE ──────────────────────────────────────────────────────────────────
async function saveResult(r) {
  try { await window.storage.set(`eval_${r.distribuidorId}_${Date.now()}`,JSON.stringify(r),true); } catch(e){}
}
async function loadResults(did) {
  try {
    const list = await window.storage.list("eval_",true);
    const results = [];
    for (const key of (list?.keys||[])) {
      try { const item = await window.storage.get(key,true); if(item?.value){const p=JSON.parse(item.value);if(p.distribuidorId===did)results.push(p);} } catch(e){}
    }
    return results.sort((a,b)=>b.timestamp-a.timestamp);
  } catch(e){ return []; }
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const SpecieChip = ({especie}) => (
  <span style={{background:`${especieColor[especie]||"#94a3b8"}22`,color:especieColor[especie]||"#94a3b8",border:`1px solid ${especieColor[especie]||"#94a3b8"}44`,borderRadius:"6px",padding:"2px 8px",fontSize:"11px",fontWeight:700}}>{especie}</span>
);
const TagBadge = ({tag}) => (
  <span style={{background:"rgba(184,134,11,0.12)",color:"#8B6914",border:"1px solid rgba(184,134,11,0.35)",borderRadius:"999px",padding:"2px 10px",fontSize:"11px",fontWeight:600,textTransform:"uppercase"}}>{tag}</span>
);

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════════════════
function Login({ onLogin }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const digits = ["1","2","3","4","5","6","7","8","9","","0","⌫"];
  const handleDigit = d => {
    if(pin.length>=4) return;
    const next = pin+d;
    setPin(next);
    if(next.length===4){
      const found = DISTRIBUIDORES.find(x=>x.pin===next);
      if(found){ onLogin(found); }
      else { setShake(true); setError("PIN incorrecto. Intenta de nuevo."); setTimeout(()=>{setPin("");setShake(false);setError("");},900); }
    }
  };
  return (
    <div style={{minHeight:"100vh",background:"#f5f5f5",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",padding:"20px"}}>
      <div style={{marginBottom:"32px",textAlign:"center"}}>
        <div style={{width:"72px",height:"72px",margin:"0 auto 14px",background:"linear-gradient(135deg,#2d7a2d,#1a5c1a)",borderRadius:"20px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"36px",boxShadow:"0 8px 32px rgba(45,122,45,0.25)"}}>🌿</div>
        <div style={{fontSize:"28px",fontWeight:900,color:"#1a5c1a",letterSpacing:"-0.02em"}}>PESTAR</div>
        <div style={{fontSize:"12px",color:"#555555",fontWeight:600,letterSpacing:"0.1em",marginTop:"4px"}}>COMERCIALIZADORA DE PRODUCTOS ESPECIALIZADOS</div>
      </div>
      <div style={{background:"#ffffff",border:"1px solid rgba(45,122,45,0.25)",borderRadius:"20px",padding:"32px 28px",width:"100%",maxWidth:"320px",boxShadow:"0 8px 32px rgba(45,122,45,0.12)",animation:shake?"shake 0.4s ease":"none"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800;900&display=swap');*{box-sizing:border-box}@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}`}</style>
        <div style={{textAlign:"center",marginBottom:"24px"}}>
          <div style={{fontSize:"16px",fontWeight:700,color:"#1a1a1a",marginBottom:"4px"}}>Ingresa tu PIN de acceso</div>
          <div style={{fontSize:"12px",color:"#666666"}}>Proporcionado por tu representante comercial</div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"16px",marginBottom:"28px"}}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{width:"16px",height:"16px",borderRadius:"50%",background:i<pin.length?(error?"#f87171":"#2d7a2d"):"rgba(45,122,45,0.2)",transition:"all 0.15s",boxShadow:i<pin.length&&!error?"0 0 8px rgba(45,122,45,0.4)":"none"}}/>
          ))}
        </div>
        {error && <div style={{textAlign:"center",color:"#e53e3e",fontSize:"12px",fontWeight:600,marginBottom:"16px",background:"rgba(248,113,113,0.08)",borderRadius:"8px",padding:"8px"}}>{error}</div>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}}>
          {digits.map((d,i)=>(
            <button key={i} onClick={()=>d==="⌫"?setPin(p=>p.slice(0,-1)):d!==""?handleDigit(d):null} disabled={d===""}
              style={{background:d==="⌫"?"rgba(248,113,113,0.1)":"rgba(45,122,45,0.06)",border:d==="⌫"?"1px solid rgba(248,113,113,0.2)":"1px solid rgba(45,122,45,0.2)",borderRadius:"12px",height:"54px",color:d==="⌫"?"#f87171":"#1a1a1a",fontSize:d==="⌫"?"18px":"22px",fontWeight:700,cursor:d===""?"default":"pointer",opacity:d===""?0:1,fontFamily:"inherit",transition:"transform 0.1s"}}
              onMouseDown={e=>{if(d!=="")e.currentTarget.style.transform="scale(0.93)";}}
              onMouseUp={e=>{e.currentTarget.style.transform="scale(1)";}}
            >{d}</button>
          ))}
        </div>
      </div>
      <div style={{marginTop:"20px",fontSize:"12px",color:"#888888",textAlign:"center"}}>¿No tienes tu PIN? Contacta a tu representante PESTAR.</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME — Menú principal con 2 módulos
// ═══════════════════════════════════════════════════════════════════════════════
function Home({ distribuidor, onGoCatalog, onGoTraining, onSalir }) {
  return (
    <div style={{minHeight:"100vh",background:"#f5f5f5",fontFamily:"'DM Sans',sans-serif"}}>
      {/* Header */}
      <div style={{background:"#1a5c1a",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,0.2)",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px"}}>🌿</div>
          <div>
            <div style={{fontSize:"18px",fontWeight:900,color:"#ffffff",letterSpacing:"-0.01em"}}>PESTAR</div>
            <div style={{fontSize:"11px",color:"rgba(255,255,255,0.75)",fontWeight:600}}>COMERCIALIZADORA DE PRODUCTOS ESPECIALIZADOS</div>
          </div>
        </div>
        <button onClick={onSalir} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#ffffff",borderRadius:"8px",padding:"7px 14px",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Salir</button>
      </div>

      {/* Welcome */}
      <div style={{padding:"28px 24px 16px"}}>
        <div style={{background:"#ffffff",border:"1px solid rgba(45,122,45,0.22)",borderRadius:"16px",padding:"20px 24px",display:"flex",alignItems:"center",gap:"14px",marginBottom:"28px"}}>
          <div style={{width:"48px",height:"48px",borderRadius:"50%",background:"linear-gradient(135deg,#2d7a2d,#1a5c1a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",flexShrink:0}}>👋</div>
          <div>
            <div style={{fontSize:"16px",fontWeight:800,color:"#1a1a1a"}}>Hola, {distribuidor.nombre}</div>
            <div style={{fontSize:"13px",color:"#555555"}}>{distribuidor.ciudad} · ¿Qué quieres hacer hoy?</div>
          </div>
        </div>

        {/* 2 big cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"16px"}}>
          {/* Catálogo */}
          <div onClick={onGoCatalog} style={{background:"#ffffff",border:"2px solid rgba(45,122,45,0.22)",borderRadius:"18px",padding:"28px 24px",cursor:"pointer",transition:"all 0.2s",position:"relative",overflow:"hidden"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#2d7a2d";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(45,122,45,0.15)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(45,122,45,0.22)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            <div style={{position:"absolute",top:-20,right:-20,width:"100px",height:"100px",background:"rgba(45,122,45,0.05)",borderRadius:"50%"}}/>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>📦</div>
            <div style={{fontSize:"20px",fontWeight:900,color:"#1a1a1a",marginBottom:"8px"}}>Catálogo de Productos</div>
            <div style={{fontSize:"14px",color:"#555555",lineHeight:1.6,marginBottom:"16px"}}>Consulta los 79 productos del portafolio con fichas técnicas, argumentos de venta y compartir por WhatsApp.</div>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {["79 productos","4 laboratorios","Filtros avanzados","WhatsApp"].map(t=>(
                <span key={t} style={{background:"rgba(45,122,45,0.08)",color:"#1a5c1a",borderRadius:"999px",padding:"4px 10px",fontSize:"12px",fontWeight:600}}>{t}</span>
              ))}
            </div>
          </div>

          {/* Capacitación */}
          <div onClick={onGoTraining} style={{background:"#ffffff",border:"2px solid rgba(45,122,45,0.22)",borderRadius:"18px",padding:"28px 24px",cursor:"pointer",transition:"all 0.2s",position:"relative",overflow:"hidden"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#b8860b";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(184,134,11,0.15)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(45,122,45,0.22)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            <div style={{position:"absolute",top:-20,right:-20,width:"100px",height:"100px",background:"rgba(184,134,11,0.05)",borderRadius:"50%"}}/>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>🎓</div>
            <div style={{fontSize:"20px",fontWeight:900,color:"#1a1a1a",marginBottom:"8px"}}>Módulo de Capacitación</div>
            <div style={{fontSize:"14px",color:"#555555",lineHeight:1.6,marginBottom:"16px"}}>Aprende sobre los productos clave, realiza evaluaciones y registra tus resultados para seguimiento.</div>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {["28 módulos","5 temas por producto","Evaluación con nota","Registro de resultados"].map(t=>(
                <span key={t} style={{background:"rgba(184,134,11,0.1)",color:"#8B6914",borderRadius:"999px",padding:"4px 10px",fontSize:"12px",fontWeight:600}}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onClick(product)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#f0f7f0" : "#ffffff",
        border: hov ? "1px solid #2d7a2d" : "1px solid rgba(45,122,45,0.25)",
        borderRadius: "16px", padding: "22px", cursor: "pointer",
        transition: "all 0.22s ease", transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? "0 8px 24px rgba(45,122,45,0.18)" : "0 1px 4px rgba(0,0,0,0.07)",
        display: "flex", flexDirection: "column", gap: "12px",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0, width: "80px", height: "80px",
        background: "radial-gradient(circle,rgba(45,122,45,0.07) 0%,transparent 70%)",
        transform: "translate(20px,-20px)",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          background: "rgba(45,122,45,0.2)", border: "1px solid rgba(45,122,45,0.2)",
          borderRadius: "10px", padding: "8px 10px", fontSize: "20px",
        }}>{catIcon[product.categoria] || "📦"}</div>
        <span style={{ fontSize: "10px", color: "#444444", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginTop: "4px" }}>
          {product.laboratorio}
        </span>
      </div>
      <div>
        <div style={{ fontSize: "15px", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.01em", marginBottom: "3px" }}>{product.nombre}</div>
        <div style={{ fontSize: "11px", color: "#444444", fontStyle: "italic", lineHeight: 1.4 }}>{product.principioActivo.substring(0, 60)}{product.principioActivo.length > 60 ? "…" : ""}</div>
      </div>
      <div style={{ fontSize: "13px", color: "#333333", lineHeight: 1.55, flexGrow: 1 }}>
        {product.descripcionComercial.substring(0, 100)}…
      </div>
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {product.especie.slice(0, 4).map(e => <SpecieChip key={e} especie={e} />)}
        {product.especie.length > 4 && <span style={{ fontSize: "11px", color: "#666666", alignSelf: "center" }}>+{product.especie.length - 4}</span>}
      </div>
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {product.etiquetas.slice(0, 3).map(t => <TagBadge key={t} tag={t} />)}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {product.videoUrl && <span style={{ fontSize: "11px", color: "#2d7a2d" }}>▶ Video</span>}
        <span style={{ fontSize: "11px", color: "#666666" }}>📄 Ficha técnica</span>
      </div>
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ product, onClose }) {
  const [tab, setTab] = useState("comercial");
  const overlayRef = useRef();

  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const tabs = [
    { id: "comercial", label: "💬 Para el cliente" },
    { id: "tecnica", label: "🔬 Técnica" },
    { id: "recursos", label: "📦 Recursos" },
  ];

  return (
    <div ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed", inset: 0, background: "rgba(26,92,26,0.6)",
        backdropFilter: "blur(8px)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}
    >
      <div style={{
        background: "#ffffff",
        border: "1px solid rgba(45,122,45,0.2)", borderRadius: "16px",
        width: "100%", maxWidth: "700px", maxHeight: "88vh", overflowY: "auto",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
      }}>
        {/* Header sticky */}
        <div style={{
          padding: "26px 26px 0", borderBottom: "1px solid rgba(45,122,45,0.22)",
          paddingBottom: "18px", position: "sticky", top: 0,
          background: "#ffffff",
          zIndex: 10, borderRadius: "20px 20px 0 0",
        }}>
          <button onClick={onClose} style={{
            position: "absolute", top: "18px", right: "18px",
            background: "rgba(45,122,45,0.2)", border: "1px solid rgba(45,122,45,0.2)",
            color: "#333333", borderRadius: "8px", width: "30px", height: "30px",
            cursor: "pointer", fontSize: "16px", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>×</button>

          <div style={{ display: "flex", gap: "6px", marginBottom: "6px", flexWrap: "wrap" }}>
            {product.especie.map(e => <SpecieChip key={e} especie={e} />)}
            <span style={{ fontSize: "11px", color: "#666666", alignSelf: "center", marginLeft: "4px" }}>{product.laboratorio}</span>
          </div>
          <div style={{ fontSize: "22px", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.02em" }}>{product.nombre}</div>
          <div style={{ fontSize: "12px", color: "#555555", marginTop: "3px", fontStyle: "italic", lineHeight: 1.5 }}>{product.principioActivo}</div>

          <div style={{ display: "flex", gap: "4px", marginTop: "18px" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? "rgba(45,122,45,0.25)" : "transparent",
                border: tab === t.id ? "1px solid rgba(45,122,45,0.4)" : "1px solid transparent",
                color: tab === t.id ? "#2d7a2d" : "#555555",
                borderRadius: "8px", padding: "6px 14px", fontSize: "13px",
                fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: "22px 26px 28px" }}>
          {tab === "comercial" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{
                background: "rgba(45,122,45,0.12)", border: "1px solid rgba(45,122,45,0.14)",
                borderRadius: "12px", padding: "20px",
              }}>
                <div style={{ fontSize: "11px", color: "#2d7a2d", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>🎯 Argumento de venta</div>
                <div style={{ fontSize: "15px", color: "#1a1a1a", lineHeight: 1.75 }}>{product.descripcionComercial}</div>
              </div>

              <div>
                <div style={{ fontSize: "11px", color: "#222222", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "10px" }}>Presentaciones disponibles</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.presentaciones.map(p => (
                    <span key={p} style={{
                      background: "rgba(45,122,45,0.12)", border: "1px solid rgba(45,122,45,0.2)",
                      borderRadius: "8px", padding: "6px 14px", fontSize: "13px", color: "#222222", fontWeight: 600,
                    }}>{p}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "11px", color: "#222222", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "10px" }}>Categoría</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {product.etiquetas.map(t => <TagBadge key={t} tag={t} />)}
                </div>
              </div>

              <button onClick={() => {
                const msg = encodeURIComponent(`*${product.nombre}* — ${product.laboratorio}\n\n${product.descripcionComercial}\n\nPresentaciones: ${product.presentaciones.join(", ")}`);
                window.open(`https://wa.me/?text=${msg}`, "_blank");
              }} style={{
                background: "#25d366", border: "none", borderRadius: "10px",
                padding: "11px 18px", color: "#fff", fontWeight: 700, fontSize: "14px",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                alignSelf: "flex-start", fontFamily: "inherit",
              }}>📲 Compartir por WhatsApp</button>
            </div>
          )}

          {tab === "tecnica" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{
                background: "rgba(45,122,45,0.1)", border: "1px solid rgba(45,122,45,0.25)",
                borderRadius: "12px", padding: "20px",
              }}>
                <div style={{ fontSize: "11px", color: "#222222", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "10px" }}>Descripción técnica</div>
                <div style={{ fontSize: "14px", color: "#222222", lineHeight: 1.75 }}>{product.descripcionTecnica}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[["Categoría", product.categoria], ["Laboratorio", product.laboratorio]].map(([label, val]) => (
                  <div key={label} style={{
                    background: "rgba(45,122,45,0.1)", border: "1px solid rgba(45,122,45,0.25)",
                    borderRadius: "10px", padding: "14px",
                  }}>
                    <div style={{ fontSize: "10px", color: "#555555", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
                    <div style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "recursos" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {product.videoUrl && (
                <div>
                  <div style={{ fontSize: "11px", color: "#222222", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "10px" }}>📹 Video de capacitación</div>
                  <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(45,122,45,0.25)" }}>
                    <iframe width="100%" height="240" src={product.videoUrl} title="Video" frameBorder="0" allowFullScreen style={{ display: "block" }} />
                  </div>
                </div>
              )}
              <div>
                <div style={{ fontSize: "11px", color: "#222222", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "10px" }}>📄 Documentos</div>
                <a href={product.fichaUrl} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  background: "rgba(45,122,45,0.1)", border: "1px solid rgba(45,122,45,0.25)",
                  borderRadius: "10px", padding: "14px 16px", textDecoration: "none",
                  color: "#222222", fontSize: "14px", fontWeight: 600,
                }}>
                  <span style={{ fontSize: "20px" }}>📋</span>
                  Ficha técnica — {product.nombre}.pdf
                </a>
              </div>
              {!product.videoUrl && (
                <div style={{ textAlign: "center", padding: "30px 20px", color: "#666666", fontSize: "13px" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎬</div>
                  Próximamente: video de capacitación para este producto
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
function CatalogApp({ distribuidor, onVolver }) {
  
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [laboratorio, setLaboratorio] = useState("Todos");
  const [especie, setEspecie] = useState("Todas");
  const [selected, setSelected] = useState(null);


  const filtered = PRODUCTS.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.nombre.toLowerCase().includes(q) ||
      p.principioActivo.toLowerCase().includes(q) ||
      p.etiquetas.some(t => t.toLowerCase().includes(q));
    return matchSearch &&
      (categoria === "Todas" || p.categoria === categoria) &&
      (laboratorio === "Todos" || p.laboratorio === laboratorio) &&
      (especie === "Todas" || p.especie.includes(especie));
  });

  const selStyle = {
    background: "rgba(45,122,45,0.12)", border: "1px solid rgba(45,122,45,0.2)",
    borderRadius: "10px", padding: "9px 14px", color: "#333333",
    fontSize: "13px", fontWeight: 600, cursor: "pointer",
    outline: "none", appearance: "none", WebkitAppearance: "none",
    minWidth: "130px", fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0f4f0; }
        ::-webkit-scrollbar-thumb { background: rgba(45,122,45,0.2); border-radius: 3px; }
        select option { background: rgba(45,122,45,0.2); color: #f1f5f9; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "#1a5c1a",
        borderBottom: "1px solid rgba(45,122,45,0.22)",
        padding: "14px 24px", display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: "14px", flexWrap: "wrap",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", background: "linear-gradient(135deg,#2d7a2d,#1a5c1a)",
            borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px",
          }}>🐄</div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "-0.02em" }}>Coaspharma</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: "0.07em" }}>PORTAFOLIO · PESTAR</div>
          </div>
        </div>

        <div style={{ position: "relative", flexGrow: 1, maxWidth: "340px" }}>
          <span style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: "#666666", fontSize: "14px" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre, principio activo o uso…"
            style={{
              width: "100%", background: "rgba(45,122,45,0.15)",
              border: "1px solid rgba(45,122,45,0.2)", borderRadius: "12px",
              padding: "9px 14px 9px 36px", color: "#1a1a1a",
              fontSize: "13px", outline: "none", fontFamily: "inherit",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <select value={categoria} onChange={e => setCategoria(e.target.value)} style={selStyle}>
            {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={laboratorio} onChange={e => setLaboratorio(e.target.value)} style={selStyle}>
            {LABORATORIOS.map(l => <option key={l}>{l}</option>)}
          </select>
          <select value={especie} onChange={e => setEspecie(e.target.value)} style={selStyle}>
            {ESPECIES_LIST.map(e => <option key={e}>{e}</option>)}
          </select>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "10px", padding: "7px 12px", whiteSpace: "nowrap",
        }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#90ee90" }} />
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>{distribuidor.nombre}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>{distribuidor.ciudad}</div>
          </div>
          <button onClick={() => onVolver()} style={{
            background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.5)",
            color: "#ffffff", borderRadius: "6px", padding: "4px 10px",
            fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginLeft: "4px",
          }}>← Menú</button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ padding: "11px 24px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid rgba(45,122,45,0.12)" }}>
        <span style={{ fontSize: "13px", color: "#333333" }}>
          <span style={{ color: "#2d7a2d", fontWeight: 700 }}>{filtered.length}</span> de {PRODUCTS.length} productos
        </span>
        {(search || categoria !== "Todas" || laboratorio !== "Todos" || especie !== "Todas") && (
          <button onClick={() => { setSearch(""); setCategoria("Todas"); setLaboratorio("Todos"); setEspecie("Todas"); }} style={{
            background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)",
            color: "#f87171", borderRadius: "6px", padding: "3px 10px",
            fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>✕ Limpiar filtros</button>
        )}
      </div>

      {/* Grid */}
      <div style={{
        padding: "22px 24px",
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px",
      }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "70px 20px", color: "#666666" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            <div style={{ fontSize: "17px", fontWeight: 700, color: "#555555" }}>Sin resultados</div>
            <div style={{ fontSize: "13px", marginTop: "6px" }}>Intenta con otros filtros o términos</div>
          </div>
        ) : filtered.map(p => <ProductCard key={p.id} product={p} onClick={setSelected} />)}
      </div>

      {selected && <Modal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Menu({ distribuidor, onSelect, onVerResultados, onSalir }) {
  const [cat, setCat] = useState("Todas");
  const [lab, setLab] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const filtrados = MODULOS.filter(m => {
    const matchCat = cat==="Todas" || m.categoria===cat;
    const matchLab = lab==="Todos" || m.laboratorio===lab;
    const matchBus = m.nombre.toLowerCase().includes(busqueda.toLowerCase()) || m.categoria.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchLab && matchBus;
  });

  const selStyle = {background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.4)",borderRadius:"8px",padding:"7px 12px",color:"#ffffff",fontSize:"12px",fontWeight:600,cursor:"pointer",outline:"none",appearance:"none",WebkitAppearance:"none",fontFamily:"inherit"};

  return (
    <div style={{minHeight:"100vh",background:"#f5f5f5",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:"#1a5c1a",padding:"14px 20px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px",marginBottom:"12px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"22px"}}>🎓</span>
            <div>
              <div style={{fontSize:"16px",fontWeight:900,color:"#ffffff"}}>Capacitación PESTAR</div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.7)"}}>{distribuidor.nombre}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={onVerResultados} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",borderRadius:"8px",padding:"6px 14px",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>📊 Mis resultados</button>
            <button onClick={onSalir} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",borderRadius:"8px",padding:"6px 12px",fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>Salir</button>
          </div>
        </div>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
          <div style={{position:"relative",flexGrow:1,maxWidth:"300px"}}>
            <span style={{position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.7)",fontSize:"14px"}}>🔍</span>
            <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar producto..."
              style={{width:"100%",background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:"8px",padding:"7px 12px 7px 32px",color:"#ffffff",fontSize:"12px",outline:"none",fontFamily:"inherit"}}/>
          </div>
          <select value={cat} onChange={e=>setCat(e.target.value)} style={selStyle}>
            {CATEGORIAS_CAP.map(c=><option key={c} style={{background:"#1a5c1a",color:"#ffffff"}}>{c}</option>)}
          </select>
          <select value={lab} onChange={e=>setLab(e.target.value)} style={selStyle}>
            {LABS_CAP.map(l=><option key={l} style={{background:"#1a5c1a",color:"#ffffff"}}>{l}</option>)}
          </select>
        </div>
      </div>

      <div style={{padding:"16px 20px"}}>
        <div style={{fontSize:"13px",color:"#333333",marginBottom:"14px"}}>
          <span style={{color:"#1a5c1a",fontWeight:700}}>{filtrados.length}</span> de {MODULOS.length} módulos disponibles · Cada módulo incluye 5 temas + 5 preguntas de evaluación
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"12px"}}>
          {filtrados.map(m=>(
            <div key={m.id} onClick={()=>onSelect(m)}
              style={{background:"#ffffff",border:"1px solid rgba(45,122,45,0.22)",borderRadius:"14px",padding:"18px",cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#2d7a2d";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(45,122,45,0.15)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(45,122,45,0.22)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
                <div style={{background:"rgba(45,122,45,0.1)",borderRadius:"10px",padding:"8px 10px",fontSize:"20px"}}>{m.emoji}</div>
                <span style={{fontSize:"10px",color:"#ffffff",fontWeight:700,background:catColors[m.categoria]||"#2d7a2d",borderRadius:"6px",padding:"3px 8px",textAlign:"right",maxWidth:"120px",lineHeight:1.3}}>{m.categoria}</span>
              </div>
              <div style={{fontSize:"14px",fontWeight:800,color:"#1a1a1a",marginBottom:"2px"}}>{m.nombre}</div>
              <div style={{fontSize:"12px",color:"#444444",marginBottom:"10px"}}>{m.laboratorio}</div>
              <div style={{fontSize:"11px",color:"#2d7a2d",fontWeight:600}}>📚 5 temas · ✅ 5 preguntas</div>
            </div>
          ))}
        </div>
        {filtrados.length===0 && (
          <div style={{textAlign:"center",padding:"60px 20px",color:"#666666"}}>
            <div style={{fontSize:"36px",marginBottom:"10px"}}>🔍</div>
            <div style={{fontWeight:700,color:"#444444"}}>Sin resultados</div>
            <div style={{fontSize:"13px",marginTop:"6px"}}>Prueba con otros filtros</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── APRENDIZAJE ───────────────────────────────────────────────────────────────
function ModuloAprendizaje({ modulo, onVolver, onEvaluar }) {
  const [tabActiva, setTabActiva] = useState("queEs");
  const tab = TABS.find(t=>t.id===tabActiva);
  const contenido = modulo.contenido[tabActiva];
  return (
    <div style={{minHeight:"100vh",background:"#f5f5f5",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:"#1a5c1a",padding:"14px 20px",display:"flex",alignItems:"center",gap:"12px"}}>
        <button onClick={onVolver} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:"8px",padding:"6px 12px",cursor:"pointer",fontSize:"18px",lineHeight:1}}>←</button>
        <div>
          <div style={{fontSize:"16px",fontWeight:900,color:"#fff"}}>{modulo.nombre}</div>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,0.8)"}}>{modulo.laboratorio} · {modulo.categoria}</div>
        </div>
      </div>
      <div style={{display:"flex",background:"#fff",borderBottom:"2px solid rgba(45,122,45,0.15)",overflowX:"auto"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTabActiva(t.id)}
            style={{background:"none",border:"none",borderBottom:tabActiva===t.id?"3px solid #2d7a2d":"3px solid transparent",color:tabActiva===t.id?"#1a5c1a":"#444444",fontWeight:tabActiva===t.id?700:500,padding:"13px 16px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px",whiteSpace:"nowrap"}}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div style={{padding:"20px",maxWidth:"720px"}}>
        <div style={{background:"#ffffff",border:"1px solid rgba(45,122,45,0.22)",borderRadius:"14px",padding:"22px",marginBottom:"16px"}}>
          <div style={{fontSize:"12px",color:"#2d7a2d",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"12px"}}>{tab.icon} {tab.label}</div>
          {Array.isArray(contenido) ? (
            <ul style={{margin:0,paddingLeft:"20px",display:"flex",flexDirection:"column",gap:"8px"}}>
              {contenido.map((v,i)=><li key={i} style={{fontSize:"15px",color:"#1a1a1a",lineHeight:1.65}}>{v}</li>)}
            </ul>
          ) : (
            <div style={{fontSize:"15px",color:"#1a1a1a",lineHeight:1.75}}>{contenido}</div>
          )}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:"6px"}}>
            {TABS.map(t=><div key={t.id} style={{width:"8px",height:"8px",borderRadius:"50%",background:t.id===tabActiva?"#2d7a2d":"rgba(45,122,45,0.25)"}}/>)}
          </div>
          {tabActiva==="dosificacion" ? (
            <button onClick={onEvaluar} style={{background:"#2d7a2d",border:"none",color:"#fff",borderRadius:"10px",padding:"12px 24px",fontWeight:800,fontSize:"14px",cursor:"pointer",fontFamily:"inherit"}}>
              ✅ Ir a la evaluación →
            </button>
          ) : (
            <button onClick={()=>{const idx=TABS.findIndex(t=>t.id===tabActiva);if(idx<TABS.length-1)setTabActiva(TABS[idx+1].id);}}
              style={{background:"rgba(45,122,45,0.1)",border:"1px solid rgba(45,122,45,0.25)",color:"#1a5c1a",borderRadius:"10px",padding:"10px 20px",fontWeight:700,fontSize:"14px",cursor:"pointer",fontFamily:"inherit"}}>
              Siguiente →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── EVALUACIÓN ────────────────────────────────────────────────────────────────
function Evaluacion({ modulo, distribuidor, onTerminar, onVolver }) {
  const [current, setCurrent] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [confirmada, setConfirmada] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [guardando, setGuardando] = useState(false);
  const pregunta = modulo.preguntas[current];
  const total = modulo.preguntas.length;
  const puntaje = respuestas.filter(r=>r.correcta).length;

  const siguiente = () => {
    const nuevas = [...respuestas,{correcta:seleccionada===pregunta.correcta,seleccionada,correctaIdx:pregunta.correcta}];
    setRespuestas(nuevas);
    if(current+1<total){ setCurrent(c=>c+1); setSeleccionada(null); setConfirmada(false); }
    else setFinalizado(true);
  };

  const guardar = async () => {
    if(!nombre.trim()) return;
    setGuardando(true);
    const result = {distribuidorId:distribuidor.id,distribuidorNombre:distribuidor.nombre,vendedor:nombre.trim(),productoId:modulo.id,productoNombre:modulo.nombre,categoria:modulo.categoria,puntaje,total,porcentaje:Math.round((puntaje/total)*100),aprobado:Math.round((puntaje/total)*100)>=60,timestamp:Date.now(),fecha:new Date().toLocaleDateString("es-CO")};
    await saveResult(result);
    setGuardando(false);
    onTerminar(result);
  };

  if(finalizado) {
    const pct = Math.round((puntaje/total)*100);
    const aprobado = pct>=60;
    return (
      <div style={{minHeight:"100vh",background:"#f5f5f5",fontFamily:"'DM Sans',sans-serif"}}>
        <div style={{background:"#1a5c1a",padding:"14px 20px"}}>
          <div style={{fontSize:"16px",fontWeight:900,color:"#fff"}}>Resultado — {modulo.nombre}</div>
        </div>
        <div style={{padding:"28px 20px",maxWidth:"520px",margin:"0 auto"}}>
          <div style={{background:"#fff",border:`2px solid ${aprobado?"#2d7a2d":"#f87171"}`,borderRadius:"16px",padding:"28px",textAlign:"center",marginBottom:"16px"}}>
            <div style={{fontSize:"52px",marginBottom:"10px"}}>{aprobado?"🏆":"📚"}</div>
            <div style={{fontSize:"44px",fontWeight:900,color:aprobado?"#1a5c1a":"#e53e3e",marginBottom:"4px"}}>{pct}%</div>
            <div style={{fontSize:"15px",fontWeight:700,color:aprobado?"#2d7a2d":"#e53e3e",marginBottom:"4px"}}>{aprobado?"¡Evaluación aprobada!":"No aprobado — repasa el módulo"}</div>
            <div style={{fontSize:"13px",color:"#555555"}}>{puntaje} de {total} correctas · Mínimo: 60%</div>
          </div>
          <div style={{background:"#fff",border:"1px solid rgba(45,122,45,0.22)",borderRadius:"12px",padding:"18px",marginBottom:"16px"}}>
            <div style={{fontSize:"13px",fontWeight:700,color:"#1a5c1a",marginBottom:"10px"}}>📝 Registrar resultado</div>
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre completo"
              style={{width:"100%",border:"1px solid rgba(45,122,45,0.3)",borderRadius:"8px",padding:"10px 14px",fontSize:"14px",fontFamily:"inherit",outline:"none",marginBottom:"10px",color:"#1a1a1a"}}/>
            <button onClick={guardar} disabled={!nombre.trim()||guardando}
              style={{width:"100%",background:nombre.trim()?"#2d7a2d":"rgba(45,122,45,0.3)",border:"none",color:"#fff",borderRadius:"10px",padding:"12px",fontWeight:800,fontSize:"14px",cursor:nombre.trim()?"pointer":"not-allowed",fontFamily:"inherit"}}>
              {guardando?"Guardando...":"💾 Guardar y ver registros"}
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
            <button onClick={onVolver} style={{background:"rgba(45,122,45,0.08)",border:"1px solid rgba(45,122,45,0.25)",color:"#1a5c1a",borderRadius:"10px",padding:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Menú</button>
            <button onClick={()=>{setCurrent(0);setRespuestas([]);setSeleccionada(null);setConfirmada(false);setFinalizado(false);setNombre("");}}
              style={{background:"#2d7a2d",border:"none",color:"#fff",borderRadius:"10px",padding:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>🔄 Repetir</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"#f5f5f5",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:"#1a5c1a",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:"15px",fontWeight:900,color:"#fff"}}>Evaluación: {modulo.nombre}</div>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,0.8)"}}>Pregunta {current+1} de {total}</div>
        </div>
        <div style={{display:"flex",gap:"4px"}}>
          {modulo.preguntas.map((_,i)=>(
            <div key={i} style={{width:"10px",height:"10px",borderRadius:"50%",background:i<current?"#90ee90":i===current?"#ffffff":"rgba(255,255,255,0.3)"}}/>
          ))}
        </div>
      </div>
      <div style={{padding:"20px",maxWidth:"600px"}}>
        <div style={{background:"#fff",border:"1px solid rgba(45,122,45,0.22)",borderRadius:"14px",padding:"22px",marginBottom:"14px"}}>
          <div style={{fontSize:"12px",color:"#555555",fontWeight:600,marginBottom:"10px"}}>Pregunta {current+1}</div>
          <div style={{fontSize:"16px",fontWeight:700,color:"#1a1a1a",lineHeight:1.5,marginBottom:"18px"}}>{pregunta.pregunta}</div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {pregunta.opciones.map((op,i)=>{
              let bg="rgba(45,122,45,0.04)",border="1px solid rgba(45,122,45,0.2)",color="#1a1a1a";
              if(seleccionada===i&&!confirmada){bg="rgba(45,122,45,0.12)";border="2px solid #2d7a2d";}
              if(confirmada){
                if(i===pregunta.correcta){bg="rgba(45,122,45,0.1)";border="2px solid #2d7a2d";color="#1a5c1a";}
                else if(i===seleccionada&&i!==pregunta.correcta){bg="rgba(248,113,113,0.1)";border="2px solid #f87171";color="#e53e3e";}
              }
              return (
                <button key={i} onClick={()=>{if(!confirmada)setSeleccionada(i);}}
                  style={{background:bg,border,borderRadius:"10px",padding:"12px 16px",textAlign:"left",cursor:confirmada?"default":"pointer",color,fontWeight:seleccionada===i?700:500,fontFamily:"inherit",fontSize:"14px",lineHeight:1.4}}>
                  <span style={{fontWeight:700,marginRight:"8px",color:"#666666"}}>{["A","B","C","D"][i]}.</span>{op}
                  {confirmada&&i===pregunta.correcta&&<span style={{marginLeft:"8px"}}>✅</span>}
                  {confirmada&&i===seleccionada&&i!==pregunta.correcta&&<span style={{marginLeft:"8px"}}>❌</span>}
                </button>
              );
            })}
          </div>
          {confirmada&&(
            <div style={{marginTop:"14px",padding:"10px 14px",background:seleccionada===pregunta.correcta?"rgba(45,122,45,0.08)":"rgba(248,113,113,0.08)",borderRadius:"8px",border:`1px solid ${seleccionada===pregunta.correcta?"rgba(45,122,45,0.25)":"rgba(248,113,113,0.25)"}`}}>
              <div style={{fontSize:"13px",fontWeight:700,color:seleccionada===pregunta.correcta?"#1a5c1a":"#e53e3e"}}>
                {seleccionada===pregunta.correcta?"✅ ¡Correcto!":`❌ Respuesta correcta: ${["A","B","C","D"][pregunta.correcta]}. ${pregunta.opciones[pregunta.correcta]}`}
              </div>
            </div>
          )}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          {!confirmada ? (
            <button onClick={()=>setConfirmada(true)} disabled={seleccionada===null}
              style={{background:seleccionada!==null?"#2d7a2d":"rgba(45,122,45,0.3)",border:"none",color:"#fff",borderRadius:"10px",padding:"12px 28px",fontWeight:800,fontSize:"14px",cursor:seleccionada!==null?"pointer":"not-allowed",fontFamily:"inherit"}}>
              Confirmar respuesta
            </button>
          ):(
            <button onClick={siguiente}
              style={{background:"#2d7a2d",border:"none",color:"#fff",borderRadius:"10px",padding:"12px 28px",fontWeight:800,fontSize:"14px",cursor:"pointer",fontFamily:"inherit"}}>
              {current+1<total?"Siguiente →":"Ver resultado →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── RESULTADOS ────────────────────────────────────────────────────────────────
function Resultados({ distribuidor, onVolver }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ loadResults(distribuidor.id).then(r=>{setResults(r);setLoading(false);}); },[distribuidor.id]);
  const promedio = results.length?Math.round(results.reduce((a,r)=>a+r.porcentaje,0)/results.length):0;
  const aprobados = results.filter(r=>r.aprobado).length;
  return (
    <div style={{minHeight:"100vh",background:"#f5f5f5",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:"#1a5c1a",padding:"14px 20px",display:"flex",alignItems:"center",gap:"12px"}}>
        <button onClick={onVolver} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:"8px",padding:"6px 12px",cursor:"pointer",fontSize:"18px"}}>←</button>
        <div>
          <div style={{fontSize:"16px",fontWeight:900,color:"#fff"}}>Registros de evaluación</div>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,0.7)"}}>{distribuidor.nombre}</div>
        </div>
      </div>
      <div style={{padding:"20px"}}>
        {loading ? <div style={{textAlign:"center",padding:"60px",color:"#666666"}}>Cargando...</div>
        : results.length===0 ? (
          <div style={{textAlign:"center",padding:"60px",color:"#666666"}}>
            <div style={{fontSize:"40px",marginBottom:"12px"}}>📋</div>
            <div style={{fontSize:"16px",fontWeight:700,color:"#444444"}}>Aún no hay evaluaciones</div>
            <div style={{fontSize:"13px",marginTop:"6px"}}>Completa una evaluación y guarda tu resultado para verlo aquí.</div>
          </div>
        ) : (
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"10px",marginBottom:"20px"}}>
              {[["Evaluaciones",results.length,"#1a5c1a"],["Aprobadas",aprobados,"#2d7a2d"],["Promedio",`${promedio}%`,"#b8860b"]].map(([l,v,c])=>(
                <div key={l} style={{background:"#fff",border:"1px solid rgba(45,122,45,0.22)",borderRadius:"12px",padding:"14px",textAlign:"center"}}>
                  <div style={{fontSize:"10px",color:"#555555",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"4px"}}>{l}</div>
                  <div style={{fontSize:"24px",fontWeight:900,color:c}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {results.map((r,i)=>(
                <div key={i} style={{background:"#fff",border:`1px solid ${r.aprobado?"rgba(45,122,45,0.25)":"rgba(248,113,113,0.25)"}`,borderRadius:"12px",padding:"14px",display:"flex",alignItems:"center",gap:"12px"}}>
                  <div style={{width:"44px",height:"44px",borderRadius:"50%",background:r.aprobado?"rgba(45,122,45,0.1)":"rgba(248,113,113,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:0}}>{r.aprobado?"🏆":"📚"}</div>
                  <div style={{flexGrow:1}}>
                    <div style={{fontSize:"14px",fontWeight:700,color:"#1a1a1a"}}>{r.vendedor}</div>
                    <div style={{fontSize:"12px",color:"#555555"}}>{r.productoNombre} · {r.fecha}</div>
                    <div style={{marginTop:"4px",background:"rgba(45,122,45,0.1)",borderRadius:"4px",height:"5px",overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${r.porcentaje}%`,background:r.aprobado?"#2d7a2d":"#f87171",borderRadius:"4px"}}/>
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:"20px",fontWeight:900,color:r.aprobado?"#1a5c1a":"#e53e3e"}}>{r.porcentaje}%</div>
                    <div style={{fontSize:"10px",color:r.aprobado?"#2d7a2d":"#e53e3e",fontWeight:700}}>{r.aprobado?"APROBADO":"NO APROBADO"}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
function TrainingApp({ distribuidor, onVolver }) {
  
  const [vista, setVista] = useState("menu");
  const [moduloActivo, setModuloActivo] = useState(null);

  if(vista==="resultados") return <Resultados distribuidor={distribuidor} onVolver={()=>setVista("menu")}/>;
  if(vista==="aprendizaje"&&moduloActivo) return <ModuloAprendizaje modulo={moduloActivo} onVolver={()=>setVista("menu")} onEvaluar={()=>setVista("evaluacion")}/>;
  if(vista==="evaluacion"&&moduloActivo) return <Evaluacion modulo={moduloActivo} distribuidor={distribuidor} onVolver={()=>setVista("menu")} onTerminar={()=>setVista("resultados")}/>;
  return <Menu distribuidor={distribuidor} onSelect={m=>{setModuloActivo(m);setVista("aprendizaje");}} onVerResultados={()=>setVista("resultados")} onSalir={onVolver}/>;
}


// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP — Orquesta todo
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [distribuidor, setDistribuidor] = useState(null);
  const [modulo, setModulo] = useState("home"); // home | catalog | training

  if (!distribuidor) return <Login onLogin={(d) => setDistribuidor(d)} />;
  if (modulo === "catalog") return <CatalogApp distribuidor={distribuidor} onVolver={() => setModulo("home")} />;
  if (modulo === "training") return <TrainingApp distribuidor={distribuidor} onVolver={() => setModulo("home")} />;
  return (
    <Home
      distribuidor={distribuidor}
      onGoCatalog={() => setModulo("catalog")}
      onGoTraining={() => setModulo("training")}
      onSalir={() => { setDistribuidor(null); setModulo("home"); }}
    />
  );
}
