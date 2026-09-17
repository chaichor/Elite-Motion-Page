export type Media = {
  kind: 'image' | 'video';
  src: string;
  alt: string;
  /** width / height — used to letterbox the viewer before the file loads. */
  ratio: number;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  services: string[];
  cover: Media;
  media: Media[];
};

const pub = (path: string) => encodeURI(path).replace(/#/g, '%23');

const img = (src: string, alt: string, ratio = 0.8): Media => ({
  kind: 'image',
  src: pub(src),
  alt,
  ratio,
});

const vid = (src: string, alt: string, ratio = 0.5625): Media => ({
  kind: 'video',
  src: pub(src),
  alt,
  ratio,
});

export const projects: Project[] = [
  {
    slug: 'froozy',
    title: 'Froozy',
    client: 'Froozy',
    category: 'Producto & Video',
    year: '2026',
    summary:
      'Fotografía de producto y un video vertical para una marca de bebidas. Una pieza para el feed, otra para que el producto se mueva solo.',
    services: ['Fotografía de producto', 'Video vertical', 'Colorización'],
    cover: img('/img_portafolio/froozy/1.jpg', 'Froozy — fotografía de producto'),
    media: [
      img('/img_portafolio/froozy/1.jpg', 'Froozy — producto'),
      vid('/videos_vertical_portafolio/video_froozy/FROZZY (1).mp4', 'Froozy — video de producto'),
    ],
  },
  {
    slug: 'andybeauty',
    title: 'Andy Beauty',
    client: 'Andy Beauty',
    category: 'Belleza & Marca',
    year: '2026',
    summary:
      'Expediente visual para un estudio de belleza: retrato de marca en el local, piezas de feed e historias y un video vertical listo para publicar. El servicio, el espacio y la dueña se leen como una sola marca.',
    services: ['Retrato de marca', 'Diseño de piezas', 'Historias', 'Video vertical'],
    cover: img(
      '/img_portafolio/andybeauty/_DSC6890.jpg',
      'Andy Beauty — retrato de marca',
      0.667
    ),
    media: [
      img('/img_portafolio/andybeauty/_DSC6890.jpg', 'Andy Beauty — retrato 01', 0.667),
      img('/img_portafolio/andybeauty/_DSC6893.jpg', 'Andy Beauty — retrato 02', 0.667),
      img('/img_portafolio/andybeauty/_DSC6900.jpg', 'Andy Beauty — retrato 03', 0.667),
      img('/img_portafolio/andybeauty/_DSC6924.jpg', 'Andy Beauty — retrato 04', 0.64),
      img('/img_portafolio/andybeauty/_DSC6926.jpg', 'Andy Beauty — retrato 05', 0.667),
      img('/img_portafolio/andybeauty/_DSC6956.jpg', 'Andy Beauty — retrato 06', 0.667),
      img('/img_portafolio/andybeauty/DSC_1155.jpg', 'Andy Beauty — estudio 01', 1.5),
      img('/img_portafolio/andybeauty/_DSC6904.jpg', 'Andy Beauty — estudio 02', 1.5),
      img('/img_portafolio/andybeauty/_DSC6930.jpg', 'Andy Beauty — estudio 03', 1.5),
      img('/img_portafolio/andybeauty/_DSC6931.jpg', 'Andy Beauty — estudio 04', 1.5),
      img('/img_portafolio/andybeauty/_DSC6934.jpg', 'Andy Beauty — estudio 05', 1.5),
      img('/artes_y_historias/andybeauty/POST #1.jpg', 'Andy Beauty — post 01', 0.75),
      img('/artes_y_historias/andybeauty/HISTORIA #1.jpg', 'Andy Beauty — historia 01', 0.5625),
      img('/artes_y_historias/andybeauty/HISTORIA #2.jpg', 'Andy Beauty — historia 02', 0.5625),
      vid(
        '/videos_vertical_portafolio/videos_andybeauty/video 1 - andy beauty.mp4',
        'Andy Beauty — video de marca'
      ),
    ],
  },
  {
    slug: 'jalisco',
    title: 'Taquería Jalisco',
    client: 'Taquería Jalisco',
    category: 'Producto & Contenido social',
    year: '2026',
    summary:
      'Expediente completo para un restaurante: artes de feed e historias, sesión de platos y videos cortos listos para publicar. La marca se reconoce en gráfico, en foto y en movimiento.',
    services: ['Fotografía de producto', 'Video', 'Diseño de piezas', 'Historias'],
    cover: img('/artes_y_historias/post/POST #1.jpg', 'Taquería Jalisco — pieza de feed', 1),
    media: [
      img('/artes_y_historias/post/POST #1.jpg', 'Jalisco — post 01', 1),
      img('/artes_y_historias/post/POST #2.jpg', 'Jalisco — post 02', 1),
      img('/artes_y_historias/post/POST #3.jpg', 'Jalisco — post 03', 1),
      img('/artes_y_historias/post/POST #4.jpg', 'Jalisco — post 04', 1),
      img('/artes_y_historias/post/POST #5.jpg', 'Jalisco — post 05', 1),
      img('/artes_y_historias/historias/HISTORIA #1.jpg', 'Jalisco — historia 01', 0.5625),
      img('/artes_y_historias/historias/HISTORIA #2.jpg', 'Jalisco — historia 02', 0.5625),
      img('/artes_y_historias/historias/HISTORIA #3.jpg', 'Jalisco — historia 03', 0.5625),
      img('/artes_y_historias/historias/HISTORIA #4.jpg', 'Jalisco — historia 04', 0.5625),
      img('/artes_y_historias/historias/HISTORIA #5.jpg', 'Jalisco — historia 05', 0.5625),
      img('/artes_y_historias/historias/HISTORIA #6.jpg', 'Jalisco — historia 06', 0.5625),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #1.jpg',
        'Jalisco — plato 01'
      ),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #2.jpg',
        'Jalisco — plato 02'
      ),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #3.jpg',
        'Jalisco — plato 03'
      ),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #4.jpg',
        'Jalisco — plato 04'
      ),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #5.jpg',
        'Jalisco — plato 05'
      ),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #6.jpg',
        'Jalisco — plato 06'
      ),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #7.jpg',
        'Jalisco — plato 07'
      ),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #8.jpg',
        'Jalisco — plato 08'
      ),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #9.jpg',
        'Jalisco — plato 09'
      ),
      img(
        '/img_portafolio/sesion_fotos_de_platos_de_comida/taqueriajalisco/FOTO #10.jpg',
        'Jalisco — plato 10'
      ),
      vid(
        '/videos_vertical_portafolio/videos_taqueriajalisco/TACOS_1 (1) (1).mp4',
        'Jalisco — tacos'
      ),
      vid(
        '/videos_vertical_portafolio/videos_taqueriajalisco/TAQUIZA (1) (1).mp4',
        'Jalisco — taquiza'
      ),
    ],
  },
  {
    slug: 'zepeda',
    title: 'Zepeda',
    client: 'Sesión Zepeda',
    category: 'Retrato & Editorial',
    year: '2026',
    summary:
      'Sesión de retrato con luz controlada y colorización propia. Entregables listos para marca personal, feed y prensa.',
    services: ['Retrato', 'Colorización', 'Retoque'],
    cover: img(
      '/img_portafolio/sesiondefotos_zepeda/_DSC7031 (1).jpg',
      'Zepeda — retrato de sesión'
    ),
    media: [
      img('/img_portafolio/sesiondefotos_zepeda/_DSC7031 (1).jpg', 'Zepeda — 01'),
      img('/img_portafolio/sesiondefotos_zepeda/_DSC7038 (1).jpg', 'Zepeda — 02'),
      img('/img_portafolio/sesiondefotos_zepeda/_DSC7056 (1).jpg', 'Zepeda — 03'),
      img('/img_portafolio/sesiondefotos_zepeda/_DSC7062 (1).jpg', 'Zepeda — 04'),
      img('/img_portafolio/sesiondefotos_zepeda/_DSC7077 (1).jpg', 'Zepeda — 05'),
      img('/img_portafolio/sesiondefotos_zepeda/_DSC7086.jpg', 'Zepeda — 06'),
    ],
  },
  {
    slug: 'yaxhe',
    title: 'Yaxhe',
    client: 'Sombreros personalizados',
    category: 'Producto & Marca',
    year: '2026',
    summary:
      'Catálogo visual completo para un emprendimiento de sombreros pintados a mano: fotografía de producto, dirección de arte y un video vertical para lanzar la colección en redes.',
    services: ['Fotografía de producto', 'Dirección de arte', 'Video vertical'],
    cover: img('/img_portafolio/yaxhe_1.webp', 'Sombrero personalizado Yaxhe'),
    media: [
      img('/img_portafolio/yaxhe_1.webp', 'Yaxhe — pieza 01'),
      img('/img_portafolio/yaxhe 2 (1).webp', 'Yaxhe — pieza 02'),
      img('/img_portafolio/yaxhe 3 (1).webp', 'Yaxhe — pieza 03'),
      img('/img_portafolio/yaxhe 4 (1).webp', 'Yaxhe — pieza 04'),
      img('/img_portafolio/yaxhe 5 (1).webp', 'Yaxhe — pieza 05'),
      img('/img_portafolio/yaxhe 6 (1).webp', 'Yaxhe — pieza 06'),
      img('/img_portafolio/yaxhe 7 (1).webp', 'Yaxhe — pieza 07'),
      img('/img_portafolio/yaxhe 8 (1).webp', 'Yaxhe — pieza 08'),
      img('/img_portafolio/yaxhe 9 (1).webp', 'Yaxhe — pieza 09'),
      vid(
        '/videos_vertical_portafolio/yaxhe_emprendimiento_sombreros_personalizados.mp4',
        'Yaxhe — video de lanzamiento'
      ),
    ],
  },
  {
    slug: 'retrato',
    title: 'Retrato de marca',
    client: 'Sesiones de autor',
    category: 'Retrato & Editorial',
    year: '2026',
    summary:
      'Serie de retratos para perfiles profesionales y campañas de marca personal. Luz controlada, colorización propia y entregables listos para feed, web y prensa.',
    services: ['Retrato', 'Colorización', 'Retoque'],
    cover: img('/img_portafolio/Post 07.webp', 'Retrato de marca'),
    media: [
      img('/img_portafolio/Post 01.webp', 'Retrato 01'),
      img('/img_portafolio/Post 02.webp', 'Retrato 02'),
      img('/img_portafolio/Post 03.webp', 'Retrato 03'),
      img('/img_portafolio/Post 04.webp', 'Retrato 04'),
      img('/img_portafolio/Post 05.webp', 'Retrato 05'),
      img('/img_portafolio/Post 06.webp', 'Retrato 06'),
      img('/img_portafolio/Post 07.webp', 'Retrato 07'),
      img('/img_portafolio/Post 08.webp', 'Retrato 08'),
      img('/img_portafolio/Post 09.webp', 'Retrato 09'),
      img('/img_portafolio/Post 10.webp', 'Retrato 10'),
      img('/img_portafolio/Post 11.webp', 'Retrato 11'),
      img('/img_portafolio/Posts 12.webp', 'Retrato 12'),
    ],
  },
  {
    slug: 'punta-mango',
    title: 'Punta Mango',
    client: 'Cobertura aérea',
    category: 'Dron & Paisaje',
    year: '2026',
    summary:
      'Vuelo de reconocimiento y tomas aéreas en la costa salvadoreña. Material base para campañas de turismo, hospedaje y proyectos inmobiliarios frente al mar.',
    services: ['Dron', 'Video aéreo', 'Colorización'],
    cover: vid(
      '/videos_vertical_portafolio/videos_dron/Videos dron punta mango.mp4',
      'Punta Mango — toma aérea'
    ),
    media: [
      vid(
        '/videos_vertical_portafolio/videos_dron/Videos dron punta mango.mp4',
        'Punta Mango — vuelo 01'
      ),
      vid('/videos_vertical_portafolio/videos_dron/second.mp4', 'Punta Mango — vuelo 02'),
    ],
  },
];

/** First still of a project — home never autoplays video in the cluster or the index. */
export function coverStill(project: Project): Media | null {
  if (project.cover.kind === 'image') return project.cover;
  return project.media.find((item) => item.kind === 'image') ?? null;
}

const HOME_SLUGS = ['jalisco', 'yaxhe', 'zepeda', 'andybeauty'] as const;

/** Featured on the home index — the rest live on /portafolio. */
export const homeProjects = HOME_SLUGS.map(
  (slug) => projects.find((project) => project.slug === slug)!
).filter(Boolean);

/** Stills only — keep the collage light: skip RAW session files and cap each project. */
export const clusterStills = homeProjects.flatMap((project) => {
  const images = project.media.filter((item) => item.kind === 'image');
  const picked =
    project.slug === 'zepeda'
      ? images.slice(0, 2)
      : project.slug === 'jalisco'
        ? images.filter((item) => item.src.includes('artes_y_historias')).slice(0, 5)
        : project.slug === 'andybeauty'
          ? images.filter((item) => item.src.includes('img_portafolio/andybeauty')).slice(0, 4)
          : images.slice(0, 4);

  return picked.map((item) => ({
    src: item.src,
    title: project.title,
    tag: project.category,
  }));
});
