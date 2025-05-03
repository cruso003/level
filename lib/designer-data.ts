// lib/designer-data.ts
import { DesignerCollection, DesignerDesign } from "./types";

export const designerCollections: DesignerCollection[] = [
  {
    id: "basketball-2024",
    name: "Basketball 2024",
    description:
      "Celebrating basketball teams and tournaments in 2024, including special designs for South Sudan Basketball.",
    coverImage: "/collections/basketball-2024/cover.jpg",
    featured: true,
  },
  {
    id: "covid-21",
    name: "Covid 21st Century",
    description:
      "Unique designs reflecting the impact of COVID-19 in the 21st century.",
    coverImage: "/collections/covid-21/cover.jpg",
    featured: true,
  },
  {
    id: "best-of-it-all",
    name: "Best of It All",
    description:
      "A collection of the cartoonish designs from various themes and styles.",
    coverImage: "/collections/best-of-it-all/cover.jpg",
    featured: true,
  },
];

export const designerDesigns: DesignerDesign[] = [
  {
    id: "south-sudan-basketball-2024",
    name: "South Sudan Basketball 2024",
    description:
      "Special edition design celebrating South Sudan's basketball achievements in 2024.",
    collectionId: "basketball-2024",
    imageUrl: "/designs/south-sudan-basketball-2024.jpg",
    featured: true,
    tags: ["basketball", "sports", "south sudan", "limited edition"],
  },
  {
    id: "south-sudan-basketball-2024-2",
    name: "South Sudan Basketball 2024 - Team Spirit",
    description:
      "Team spirit design for South Sudan basketball fans, celebrating the 2024 season.",
    collectionId: "basketball-2024",
    imageUrl: "/designs/ssd1.jpg",
    featured: true,
    tags: ["basketball", "sports", "south sudan", "team spirit"],
  },
    {
        id: "south-sudan-basketball-2024-3",
        name: "South Sudan Basketball 2024 - Game Day",
        description:
        "Game day design for South Sudan basketball fans, celebrating the 2024 season.",
        collectionId: "basketball-2024",
        imageUrl: "/designs/ssd2.jpg",
        featured: true,
        tags: ["basketball", "sports", "south sudan", "game day"],
    },
  {
    id: "covid-19-impact",
    name: "Starry Night - COVID-19",
    description: "A cartoonish design of a couple stargazing during the pandemic.",
    collectionId: "covid-21",
    imageUrl: "/designs/covid2.jpg",
    featured: true,
    tags: ["covid", "pandemic", "art", "impact"],
  },
  {
    id: "best-of-it-all-design",
    name: "DJ Yours Truly",
    description:
      "Cartoonish design of DJ Yours Truly, a popular DJ in South Sudan.",
    collectionId: "best-of-it-all",
    imageUrl: "/designs/yours-truly.jpg",
    featured: true,
    tags: ["dj", "cartoon", "south sudan", "music"],
  },
  {
    id: "best-of-it-all-design-2",
    name: "Tupac Shakur",
    description: "Cartoonish design of Tupac Shakur, a legendary rapper.",
    collectionId: "best-of-it-all",
    imageUrl: "/designs/tupac.jpg",
    featured: true,
    tags: ["tupac", "cartoon", "rap", "music"],
  },
];

// Helper functions to fetch data
export const getCollectionById = (
  id: string
): DesignerCollection | undefined => {
  return designerCollections.find((collection) => collection.id === id);
};

export const getDesignById = (id: string): DesignerDesign | undefined => {
  return designerDesigns.find((design) => design.id === id);
};

export const getDesignsByCollectionId = (
  collectionId: string
): DesignerDesign[] => {
  return designerDesigns.filter(
    (design) => design.collectionId === collectionId
  );
};

export const getFeaturedDesigns = (): DesignerDesign[] => {
  return designerDesigns.filter((design) => design.featured);
};

export const getFeaturedCollections = (): DesignerCollection[] => {
  return designerCollections.filter((collection) => collection.featured);
};
