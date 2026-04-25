// Static lookup data for province names, communities, ranks and Spike messages.
// Browser globals (no module system) so the file can be served without a bundler.

// The TopoJSON ships province names in their official/bilingual form.
// We normalize them to the common Spanish names the game asks the player for.
const NAME_MAP = {
    "Alacant/Alicante": "Alicante",
    "Almería": "Almería",
    "Ávila": "Ávila",
    "Cáceres": "Cáceres",
    "Cádiz": "Cádiz",
    "Castelló/Castellón": "Castellón",
    "Córdoba": "Córdoba",
    "A Coruña": "A Coruña",
    "Gipuzkoa": "Guipúzcoa",
    "Jaén": "Jaén",
    "León": "León",
    "Málaga": "Málaga",
    "València/Valencia": "Valencia",
    "València/Valencia": "Valencia",
    "Bizkaia": "Vizcaya",
    "Araba/Álava": "Álava",
    "Illes Balears": "Islas Baleares",
    "Principado de Asturias": "Asturias",
};

function normalizeName(name) {
    return NAME_MAP[name] || name;
}

// Province INE code → autonomous community.
const ID_TO_COMMUNITY = {
    "01": "País Vasco", "48": "País Vasco", "20": "País Vasco",
    "02": "Castilla-La Mancha", "13": "Castilla-La Mancha", "16": "Castilla-La Mancha", "19": "Castilla-La Mancha", "45": "Castilla-La Mancha",
    "03": "C. Valenciana", "12": "C. Valenciana", "46": "C. Valenciana",
    "04": "Andalucía", "11": "Andalucía", "14": "Andalucía", "18": "Andalucía", "21": "Andalucía", "23": "Andalucía", "29": "Andalucía", "41": "Andalucía",
    "05": "Castilla y León", "09": "Castilla y León", "24": "Castilla y León", "34": "Castilla y León", "37": "Castilla y León", "40": "Castilla y León", "42": "Castilla y León", "47": "Castilla y León", "49": "Castilla y León",
    "06": "Extremadura", "10": "Extremadura",
    "07": "Islas Baleares",
    "08": "Cataluña", "17": "Cataluña", "25": "Cataluña", "43": "Cataluña",
    "15": "Galicia", "27": "Galicia", "32": "Galicia", "36": "Galicia",
    "22": "Aragón", "44": "Aragón", "50": "Aragón",
    "26": "La Rioja",
    "28": "Madrid",
    "30": "Murcia",
    "31": "Navarra",
    "33": "Asturias",
    "35": "Canarias", "38": "Canarias",
    "39": "Cantabria",
};

const COMMUNITY_CLASSES = {
    "Galicia": "com-galicia", "Asturias": "com-asturias", "Cantabria": "com-cantabria",
    "País Vasco": "com-pais-vasco", "Navarra": "com-navarra", "La Rioja": "com-la-rioja",
    "Castilla y León": "com-castilla-leon", "Aragón": "com-aragon", "Cataluña": "com-cataluna",
    "Madrid": "com-madrid", "Castilla-La Mancha": "com-castilla-mancha",
    "C. Valenciana": "com-valencia", "Murcia": "com-murcia", "Extremadura": "com-extremadura",
    "Andalucía": "com-andalucia", "Islas Baleares": "com-baleares", "Canarias": "com-canarias",
};

const COMMUNITY_HINTS = {
    "Galicia": "🌊 Noroeste, tierra de marisco",
    "Asturias": "⛰️ Costa norte, entre Galicia y Cantabria",
    "Cantabria": "🏔️ Costa norte, junto a País Vasco",
    "País Vasco": "🌧️ Norte, junto a Francia",
    "Navarra": "🏰 Norte, junto a los Pirineos",
    "La Rioja": "🍷 Norte, tierra de vinos",
    "Castilla y León": "🦁 Centro-norte, la más grande",
    "Aragón": "👑 Noreste, entre Navarra y Cataluña",
    "Cataluña": "🏖️ Noreste, costa mediterránea",
    "Madrid": "🏛️ Centro de España",
    "Castilla-La Mancha": "🌾 Centro-sur, tierra de Don Quijote",
    "C. Valenciana": "🍊 Costa este, mediterránea",
    "Murcia": "☀️ Sureste, la huerta de España",
    "Extremadura": "🐂 Oeste, frontera con Portugal",
    "Andalucía": "💃 Sur de España",
    "Islas Baleares": "🏝️ Islas en el Mediterráneo",
    "Canarias": "🌋 Islas en el Atlántico",
};

const SPIKE_MESSAGES = {
    welcome: [
        "¡Guille, hoy vamos a conquistar provincias! 🌵",
        "¡Spike está listo para la batalla! ¿Y tú? 💚",
        "¡Las provincias no se van a aprender solas! ¡Vamos! 🔥",
        "¡Guille! ¡Hora de subir trofeos! 🏆",
        "¡Spike cree en ti! ¡A por todas! ⭐",
    ],
    goodResult: [
        "¡BRUTAL, Guille! ¡Spike está orgulloso! 🌵💚",
        "¡Eso es jugar como un PRO! ¡GG! 🏆",
        "¡Racha imparable! ¡Eres una LEYENDA! 🔥",
        "¡Spike quiere ser como tú de mayor! ⭐",
    ],
    okResult: [
        "¡Buen intento! ¡La próxima arrasamos! 💪",
        "¡Vas mejorando, Guille! ¡Sigue así! 🌵",
        "¡Cada partida aprendes más! ¡No pares! 📈",
    ],
    badResult: [
        "¡No te rindas! ¡Spike nunca se rinde! 🌵💪",
        "¡Prueba la Revancha de Fallos! ¡Así se aprende! 🎯",
        "¡A entrenar! ¡Los campeones se hacen practicando! 💚",
    ],
};

const RANKS = [
    { name: "Recluta", min: 0, color: "#44dd55", bg: "#225522" },
    { name: "Guerrero", min: 50, color: "#4dabf7", bg: "#224455" },
    { name: "Gladiador", min: 150, color: "#b197fc", bg: "#332255" },
    { name: "Campeón", min: 300, color: "#ff922b", bg: "#553322" },
    { name: "Maestro", min: 500, color: "#ff4655", bg: "#552222" },
    { name: "Leyenda", min: 800, color: "#ffd700", bg: "#554400" },
    { name: "Mítico", min: 1200, color: "#ff44ff", bg: "#552255" },
    { name: "Brawler Supremo", min: 2000, color: "#ffffff", bg: "#333" },
];

function getRank(trophies) {
    let rank = RANKS[0];
    for (const r of RANKS) {
        if (trophies >= r.min) rank = r;
    }
    return rank;
}

function randomMsg(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
