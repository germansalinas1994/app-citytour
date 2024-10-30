export const markers = [
    {
        id: 1,
        title: "Casa de Gobierno",
        description: "Edificio emblemático que alberga oficinas administrativas y se destaca por su arquitectura y patrimonio histórico.",
        image: require('./images/markers/gobernacion.jpg'),
        latitude: -34.914469395647906,
        longitude: -57.947065517191724,
        sitioOficial: "https://www.gba.gob.ar/casadegobierno",
        linkDeInteres: "https://es.wikipedia.org/wiki/Casa_de_Gobierno_de_la_Provincia_de_Buenos_Aires"
    },
    {
        id: 2,
        title: "Pasaje Rodrigo",
        description: "Combina tiendas y cafeterías en un ambiente de arquitectura clásica, siendo un atractivo tanto para los locales como para los turistas.",
        image: require('./images/markers/pasaje_rodrigo.jpg'),
        latitude: -34.91297511107016,
        longitude: -57.946918876534625,
        instagram: "https://www.instagram.com/pasajerodrigo/?hl=es"
    },
    {
        id: 3,
        title: "Sede del Club Gimnasia y Esgrima La Plata",
        description: "Se desarrollan diversas actividades deportivas y culturales. Es un ícono del deporte en la región.",
        image: require('./images/markers/sede_gelp.jpg'),
        latitude: -34.91293732591926,
        longitude: -57.94541790537067,
        sitioOficial: "https://www.gimnasia.org.ar/sedes/"
    },
    {
        id: 4,
        title: "Ministerio de Seguridad",
        description: "Sede encargada de la seguridad provincial y la coordinación de servicios de protección. Su edificio es frecuentado para gestiones y consultas ciudadanas.",
        image: require('./images/markers/ministerio_seguridad.jpg'),
        latitude: -34.91149923030202,
        longitude: -57.943944866772604,
        sitioOficial: "https://www.gba.gob.ar/seguridad"
    },
    {
        id: 5,
        title: "Plaza Rivadavia",
        description: "Lugar de encuentro familiar y recreación, con juegos infantiles, senderos y sectores de descanso, enmarcado por edificios históricos.",
        image: require('./images/markers/plaza_rivadavia.jpg'),
        latitude: -34.91055731727482,
        longitude: -57.942824139763154
    },
    {
        id: 6,
        title: "Casa Curutchet",
        description: "Una obra maestra de la arquitectura moderna diseñada por Le Corbusier. Es la única obra del arquitecto en América y está declarada Patrimonio de la Humanidad.",
        image: require('./images/markers/casa_curutchet.jpg'),
        latitude: -34.91120153567593,
        longitude: -57.94174882444485,
        instagram: "https://www.instagram.com/casacurutchet.capba/",
        sitioOficial: "https://es.wikiarquitectura.com/edificio/casa-curutchet/"
    },
    {
        id: 7,
        title: "Estadio UNO - Club Estudiantes de La Plata",
        description: "Conocido por su diseño moderno y tecnología avanzada. Ofrece un espacio para eventos deportivos y culturales de gran envergadura.",
        image: require('./images/markers/estadio.jpg'),
        latitude: -34.91180895002351,
        longitude: -57.9389311408224,
        sitioOficial: "https://estudiantesdelaplata.com/"
    },
    {
        id: 8,
        title: "Lago del Bosque",
        description: "Parte del Parque Pereyra Iraola, este lago es un destino natural popular para actividades recreativas al aire libre, como paseos en bote y picnics.",
        image: require('./images/markers/lago_bosque.jpg'),
        latitude: -34.910269715076815,
        longitude: -57.938017388174345
    },
    {
        id: 9,
        title: "Av Iraola",
        description: "Una avenida arbolada que cruza el Bosque de La Plata y es ideal para caminatas, ciclismo y actividades recreativas, rodeada de naturaleza y puntos de interés.",
        image: require('./images/markers/av_iraola.jpg'),
        latitude: -34.90953810444135,
        longitude: -57.93530914584664
    },
    {
        id: 10,
        title: "Gruta",
        description: "Ubicada en el Bosque de La Plata, la Gruta es un espacio natural y espiritual, popular para paseos y actividades recreativas en familia.",
        //image: require('./images/markers/gruta.jpg'),
        latitude: -34.910309452003894,
        longitude: -57.93591793482458
    },
    {
        id: 11,
        title: "Anfiteatro Martín Fierro",
        description: "Este anfiteatro al aire libre alberga eventos culturales y artísticos, con una acústica destacada que ofrece una experiencia única para los espectadores.",
        image: require('./images/markers/anfiteatro.jpg'),
        latitude: -34.91093869859924,
        longitude: -57.935794166178475
    },
    {
        id: 12,
        title: "Monumento 5 Sabios",
        description: "Un homenaje a los cinco sabios que diseñaron la ciudad de La Plata, representa la herencia cultural e histórica de la ciudad y su carácter educativo.",
        image: require('./images/markers/monumento.jpg'),
        latitude: -34.908877009947105,
        longitude: -57.93659450351869
    },
    {
        id: 13,
        title: "Museo",
        description: "El Museo de Ciencias Naturales de La Plata es uno de los más importantes de América Latina, con una vasta colección de fósiles y exposiciones sobre ciencias naturales e historia.",
        image: require('./images/markers/museo.jpg'),
        latitude: -34.90875377900324,
        longitude: -57.935307043388924,
        sitioOficial: "https://www.museo.fcnym.unlp.edu.ar/"
    }
];


/*

    Plaza moreno
-34.921318948621305, -57.9545853647122
    Gobernación
-34.914469395647906, -57.947065517191724
    Pasaje Rodrigo
-34.91297511107016, -57.946918876534625
    Sede GELP
-34.91293732591926, -57.94541790537067
    Ministerio de Seguridad
-34.91149923030202, -57.943944866772604
    Plaza rivadavia
-34.91055731727482, -57.942824139763154
    Casa Curutchet
-34.91120153567593, -57.94174882444485
    Estadio uno
-34.91180895002351, -57.9389311408224
    Lago del Bosque
-34.910269715076815, -57.938017388174345
    Av Iraola
-34.90953810444135, -57.93530914584664
    Gruta
-34.910309452003894, -57.93591793482458
    AnfiTeatro Martín Fierro
-34.91093869859924, -57.935794166178475
    Monumento 5 sabios
-34.908877009947105, -57.93659450351869 
    Museo
-34.90875377900324, -57.935307043388924
   
    
    */