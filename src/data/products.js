export const products = [
  {
    id: 1,
    name: "Donat Kentang",
    variants: [
      {
        id: 1.1,
        name: "Donat Meises",
        description: "Donat klasik dengan taburan coklat meises yang lumer.",
        price: 5000,
        image: "/menu/meises.jpg",
      },
      {
        id: 1.2,
        name: "Donat Coklat Kacang",
        description: "Manis dan gurih! Topping coklat plus kacang renyah.",
        price: 5000,
        image: "/menu/kacang.jpg",
      },
      {
        id: 1.3,
        name: "Donat Gula Min",
        description: "Simpel & manis. Taburan gula halus yang ringan banget.",
        price: 5000,
        image: "/menu/min.jpeg",
      },
      {
        id: 1.4,
        name: "Donat Krim Keju",
        description: "Donat lembut dengan isian krim keju creamy yang nagih.",
        price: 5000,
        image: "/menu/krimkeju.jpg",
      },
      {
        id: 1.4,
        name: "Donat Oreo",
        description: "Donat lembut dengan taburan Oreo yang crunchy.",
        price: 5000,
        image: "/menu/oreo.jpeg",
      },
    ],
  },

  {
    id: 2,
    name: "Bundle Donat Kentang",
    variants: [
      {
        id: 2.1,
        name: "Manis Duo: Meses & Mint",
        description:
          "3 coklat meses + 3 gula mint. Manis & segar, pas buat ngemil santai~",
        price: 30000,
        stock: 6,
        image: "/thumbnail.jpg",
      },
      {
        id: 2.2,
        name: "Meses & Creamy",
        description:
          "3 coklat meses + 3 cream keju. Perpaduan coklat dan lembutnya keju yang bikin nagih~",
        price: 30000,
        stock: 6,
        image: "/thumbnail.jpg",
      },
      {
        id: 2.3,
        name: "Campur Seru 2-2-2",
        description:
          "2 meses, 2 mint, 2 cream keju. Campuran lengkap buat kamu yang susah milih 😄",
        price: 30000,
        stock: 6,
        image: "/thumbnail.jpg",
      },
      {
        id: 2.4,
        name: "Kacang & Meses",
        description:
          "3 coklat kacang + 3 coklat meses. Kombinasi crunchy dan chocolaty yang pas banget!",
        price: 30000,
        stock: 6,
        image: "/thumbnail.jpg",
      },
      {
        id: 2.5,
        name: "Oreo & Creamy",
        description:
          "3 coklat Oreo + 3 cream keju. Duo creamy favorit semua umur~",
        price: 30000,
        stock: 6,
        image: "/thumbnail.jpg",
      },
      {
        id: 2.6,
        name: "Full Meses!",
        description:
          "Semua coklat meses! Buat kamu yang gak pernah bosen sama topping legend satu ini 🍫",
        price: 30000,
        stock: 6,
        image: "/thumbnail.jpg",
      },
      {
        id: 2.7,
        name: "Full Gila Min!",
        description: "Semua topping gula halus! Manisnya lembut, cocok buat yang suka yang ringan~",
        price: 30000,
        stock: 6,
        image: "/thumbnail.jpg",
      },
    ],
  },
  // {
  //   id: 2,
  //   name: "Brownies Panggang",
  //   variants: [
  //     {
  //       id: 2.1,
  //       name: "Brownies Panggang Coklat Chip",
  //       description: "Brownies klasik dengan topping chip coklat yang meleleh.",
  //       price: 20000,
  //       image:
  //         "https://dummyimage.com/600x400/000/fff",
  //     },
  //     {
  //       id: 2.2,
  //       name: "Brownies Panggang Almond",
  //       description: "Gurihnya almond panggang nambah tekstur di tiap gigitan.",
  //       price: 20000,
  //       image:
  //         "https://dummyimage.com/600x400/000/fff",
  //     },
  //     {
  //       id: 2.3,
  //       name: "Brownies Panggang Keju",
  //       description:
  //         "BBrownies panggang dengan taburan keju asin-manis yang pas.",
  //       price: 20000,
  //       image:
  //         "https://dummyimage.com/600x400/000/fff",
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   name: "Bolu",
  //   variants: [
  //     {
  //       id: 3.1,
  //       name: "Bolu Marmer",
  //       description:
  //         "Bolu marmer klasik dengan pola cantik & rasa vanila-coklat seimbang.",
  //       price: 20000,
  //       image:
  //         "https://dummyimage.com/600x400/000/fff",
  //     },
  //     {
  //       id: 3.2,
  //       name: "Bolu Pandan",
  //       description:
  //         "Wangi pandan yang lembut dan legit, cocok buat temen ngopi.",
  //       price: 20000,
  //       image:
  //         "https://dummyimage.com/600x400/000/fff",
  //     },
  //     {
  //       id: 3.3,
  //       name: "Bolu Jadul",
  //       description:
  //         "Bolu jadul dengan rasa telur manis khas nostalgia rumah nenek.",
  //       price: 20000,
  //       image:
  //         "https://dummyimage.com/600x400/000/fff",
  //     },
  //     {
  //       id: 3.4,
  //       name: "Bolu Tape",
  //       description:
  //         "Lembut dan wangi tape singkong, khas banget dan bikin pengen lagi.",
  //       price: 20000,
  //       image:
  //         "https://dummyimage.com/600x400/000/fff",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   name: "Brownies Kukus",
  //   variants: [
  //     {
  //       id: 4.1,
  //       name: "Brownies Kukus",
  //       description:
  //         "Lembut, moist, dan manisnya pas! Brownies kukus favorit banyak orang 🎂",
  //       price: 30000,
  //       image:
  //         "https://dummyimage.com/600x400/000/fff",
  //     },
  //   ],
  // },
];
