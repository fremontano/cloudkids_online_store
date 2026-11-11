export interface Product {
  _id: string;
  name: string;
  details: string[];
  color: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export const formatPriceCLP = (price: number): string =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);

const products: Product[] = [
  {
    _id: "1",
    details: ["Forro térmico para días fríos", "Acolchado y resistente al viento", "Diseño de osito"],
    color: "#B68A65",
    name: "Chaqueta Térmica Invierno Oso",
    image:
      "https://www.bfgcdn.com/1500_1500_90/703-3518/reima-kids-teisko-winter-jacket-bf-detail-3.jpg",
    description:
      "Chaqueta acolchada de invierno con forro térmico y diseño de osito. Resistente al viento y perfecta para días fríos.",
    brand: "CoolKidOk",
    category: "Chaquetas",
    price: 34990,
    countInStock: 15,
    rating: 5.0,
    numReviews: 18,
  },
  {
    _id: "2",
    details: ["Algodón liviano", "Cierre frontal y bolsillos laterales", "Ideal para uso diario"],
    color: "#D97B4D",
    name: "Chaqueta Algodón Dulce Rosa",
    image:
      "https://static.riachuelo.com.br/RCHLO/14370484003/portrait/ba363993b8aa30601d761983608f4f85a3438694.jpg",
    description:
      "Chaqueta liviana de algodón con cierre frontal y bolsillos laterales. Estilo dulce e ideal para uso diario.",
    brand: "CoolKidOk",
    category: "Chaquetas",
    price: 29990,
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
  },
  {
    _id: "3",
    details: ["Franela suave y transpirable", "Capucha cómoda", "Estampado de dinosaurios"],
    color: "#22283A",
    name: "Polerón Dinosaurio Creativo",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_865267-MLC78045207017_072024-O.webp",
    description:
      "Polerón con capucha y estampados de dinosaurios. Confeccionado en franela suave y transpirable para máxima comodidad.",
    brand: "CoolKidOk",
    category: "Polerones",
    price: 19990,
    countInStock: 12,
    rating: 4.8,
    numReviews: 24,
  },
  {
    _id: "4",
    details: ["Cuello alto", "Botones a presión", "Diseño urbano"],
    color: "#C99A24",
    name: "Chaqueta Atrevida Mostaza",
    image:
      "https://image.made-in-china.com/2f0j00BRnoFlwJNicd/Kid-s-Boy-Fake-Down-with-Hooded-Jacket-Outdoor-Jacket.jpg",
    description:
      "Chaqueta de diseño urbano con botones a presión y cuello alto. Ideal para combinar con un look moderno y colorido.",
    brand: "CoolKidOk",
    category: "Chaquetas",
    price: 39990,
    countInStock: 0,
    rating: 4.2,
    numReviews: 7,
  },
  {
    _id: "5",
    details: ["Conjunto de dos piezas", "Algodón elastizado", "Libertad para moverse"],
    color: "#536B84",
    name: "Conjunto Deportivo Kid Explorer",
    image:
      "https://tenlittle.com/cdn/shop/files/ten-little-kids-wear-primary-fleece-crew-sweatshirt-heather-cherry1.jpg?v=1738612269",
    description:
      "Conjunto de dos piezas (polerón y pantalón de buzo) fabricado en algodón elastizado. Permite total libertad de movimiento.",
    brand: "CoolKidOk",
    category: "Conjuntos",
    price: 24990,
    countInStock: 20,
    rating: 4.7,
    numReviews: 15,
  },
  {
    _id: "6",
    details: ["Tela impermeable", "Capucha ajustable", "Para días lluviosos"],
    color: "#6EA9C7",
    name: "Impermeable Lluvia Caritas",
    image:
      "https://ficcus.vtexassets.com/arquivos/ids/407136/26202670202_1.jpg?v=639101481003500000",
    description:
      "Chaqueta corta viento e impermeable con capucha ajustable. Mantiene a los niños secos en los días más lluviosos.",
    brand: "CoolKidOk",
    category: "Impermeables",
    price: 19990,
    countInStock: 0,
    rating: 4.0,
    numReviews: 9,
  },
  {
    _id: "7",
    details: ["Estampado floral pastel", "Forro interior suave", "Protección contra viento y lluvia"],
    color: "#D9A1B1",
    name: "Chaqueta Impermeable Flores Niña",
    image:
      "https://assets.theplace.com/image/upload/t_plp_img_m,f_auto,q_auto/v1/ecom/assets/products/tcp/3056680/3056680_01.png",
    description:
      "Chaqueta cortaviento e impermeable con estampado floral pastel y forro interno suave. Diseñada para proteger del viento y la lluvia con estilo.",
    brand: "CoolKidOk",
    category: "Chaquetas",
    price: 29990,
    countInStock: 10,
    rating: 4.9,
    numReviews: 14,
  },
  {
    _id: "8",
    details: ["Acolchado tipo puffer", "Capucha desmontable", "Cierre reforzado"],
    color: "#3F607A",
    name: "Chaqueta Puffer Acolchada Niño",
    image:
      "https://i5.walmartimages.com/seo/PatPat-Kid-Boys-Girls-Puffer-Jacket-Lightweight-Zipper-Winter-Coat-Size-4-13_2d001706-06cc-4f72-a39e-bbb31e94d646.8bccef71bb20a95929579a09bb022c0a.jpeg",
    description:
      "Chaqueta térmica tipo puffer para niño con capucha desmontable y cierre reforzado. Máxima insulación para temperaturas bajo cero.",
    brand: "CoolKidOk",
    category: "Chaquetas",
    price: 34990,
    countInStock: 6,
    rating: 4.6,
    numReviews: 11,
  },
  {
    _id: "9",
    details: ["Pack de tres pares", "Largo hasta la rodilla", "Algodón elastizado"],
    color: "#E9D9D5",
    name: "Pack 3 Medias Largas Algodón Niña",
    image:
      "https://www.boston.com.pe/wp-content/uploads/2026/01/boston-ropa-interior-tienda-online-medias-deportivas-algodon-ninos-kids-gris-1.png",
    description:
      "Pack de 3 pares de medias altas hasta la rodilla con detalles de encaje y tonos rosa y blanco. Algodón peinado elastizado que no aprieta.",
    brand: "CoolKidOk",
    category: "Medias",
    price: 6990,
    countInStock: 25,
    rating: 4.8,
    numReviews: 30,
  },
  {
    _id: "10",
    details: ["Pack de cinco pares", "Puntos antideslizantes", "Diseños de autos y dinosaurios"],
    color: "#7D8A54",
    name: "Pack 5 Calcetines Antideslizantes Niño",
    image:
      "https://thegreencrib.com/cdn/shop/files/FrugiSocksDinosaur.jpg?v=1741983356",
    description:
      "Set de 5 pares de calcetines tobilleros con puntos de silicona antideslizante en la planta. Diseños divertidos de autitos y dinosaurios.",
    brand: "CoolKidOk",
    category: "Medias",
    price: 7990,
    countInStock: 18,
    rating: 4.7,
    numReviews: 22,
  },
  {
    _id: "11",
    details: ["Algodón suave", "Ala para proteger del sol", "Estilo bucket"],
    color: "#C9B59B",
    name: "Gorro Infantil de Algodón",
    image:
      "https://www.notanotherbill.com/cdn/shop/files/Kids-Bucket-Hat-Sand-1200W.jpg?v=1722510924",
    description:
      "Gorro tipo bucket de algodón suave, ideal para proteger del sol durante paseos y juegos al aire libre.",
    brand: "CoolKidOk",
    category: "Gorros",
    price: 8990,
    countInStock: 14,
    rating: 4.7,
    numReviews: 8,
  },
  {
    _id: "12",
    details: ["Cintura elasticada", "Terminación con volantes", "Tela liviana"],
    color: "#E58AA2",
    name: "Falda Infantil con Volantes",
    image:
      "https://www.littleolin.com/cdn/shop/files/PhotoRoom_20240110_1145411.jpg?v=1724610527",
    description:
      "Falda liviana con cintura elasticada y terminación de volantes, cómoda para jugar y combinar.",
    brand: "CoolKidOk",
    category: "Faldas",
    price: 14990,
    countInStock: 9,
    rating: 4.8,
    numReviews: 12,
  },
  {
    _id: "13",
    details: ["Cintura ajustable", "Puños elasticados", "Calce jogger"],
    color: "#252525",
    name: "Pantalón Jogger Infantil",
    image:
      "https://dedoles.es/cdn/shop/files/b739265f3b3c09c316be63c586792b50ab5fcf8a.webp?v=1771896779&width=1946",
    description:
      "Pantalón jogger de estilo casual con cintura ajustable y puños elasticados para mayor comodidad.",
    brand: "CoolKidOk",
    category: "Pantalones",
    price: 16990,
    countInStock: 16,
    rating: 4.6,
    numReviews: 10,
  },
  {
    _id: "14",
    details: ["Compartimentos organizados", "Correas ajustables", "Para escuela y paseos"],
    color: "#253F69",
    name: "Mochila Escolar Infantil",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_777350-MLU70680402090_072023-O.webp",
    description:
      "Mochila esencial para niños con compartimentos organizados y correas ajustables.",
    brand: "CoolKidOk",
    category: "Accesorios",
    price: 19990,
    countInStock: 11,
    rating: 4.5,
    numReviews: 7,
  },
  {
    _id: "15",
    details: ["Cierre de velcro", "Interior cómodo", "Diseñadas para días fríos"],
    color: "#76543C",
    name: "Botas Infantiles de Invierno",
    image:
      "https://4kidspoint.es/cdn/shop/files/img_front_1240x1240_68dda12d-e06f-4da1-aa36-e85cae2bfdd1.webp?v=1783420742",
    description:
      "Botas resistentes con interior cómodo y cierre de velcro, ideales para acompañar aventuras en días fríos.",
    brand: "CoolKidOk",
    category: "Calzado",
    price: 29990,
    countInStock: 7,
    rating: 4.9,
    numReviews: 13,
  },
  {
    _id: "16",
    details: ["Compartimentos amplios", "Diseño liviano", "Para la escuela y salidas"],
    color: "#F2C94C",
    name: "Mochila Infantil con Personajes",
    image:
      "https://cdnx.jumpseller.com/tienda-ruta-outdoor/image/71824951/thumb/960/1141?1768335519",
    description:
      "Mochila liviana con compartimentos amplios y estampados de personajes favoritos. Ideal para la escuela o salidas.",
    brand: "CoolKidOk",
    category: "Accesorios",
    price: 19990,
    countInStock: 12,
    rating: 4.7,
    numReviews: 9,
  },
];

export default products;
