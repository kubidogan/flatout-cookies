import type { Cookie } from "../types";

export const mockCookies: Cookie[] = [
  {
    id: "1",
    name: "Classic Chocolate Chip",
    description:
      "Our signature cookie with premium chocolate chips and a hint of vanilla. Soft, chewy, and absolutely irresistible.",
    price: 3.99,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=600&fit=crop",
    ingredients: [
      "Flour",
      "Butter",
      "Chocolate Chips",
      "Sugar",
      "Eggs",
      "Vanilla Extract",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Double Chocolate Fudge",
    description:
      "Rich chocolate cookie loaded with dark chocolate chunks. Perfect for chocolate lovers.",
    price: 4.49,
    category: "Chocolate",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop",
    ingredients: [
      "Flour",
      "Cocoa Powder",
      "Dark Chocolate",
      "Sugar",
      "Eggs",
      "Butter",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Oatmeal Raisin",
    description:
      "Hearty oats mixed with sweet raisins and a touch of cinnamon. A wholesome classic.",
    price: 3.49,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1590080876876-44d9a1f52b47?w=600&h=600&fit=crop",
    ingredients: [
      "Oats",
      "Raisins",
      "Flour",
      "Cinnamon",
      "Brown Sugar",
      "Butter",
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Peanut Butter Delight",
    description:
      "Creamy peanut butter cookies with the perfect balance of sweet and salty.",
    price: 4.29,
    category: "Specialty",
    image:
      "https://images.unsplash.com/photo-1595743618828-4849580e68ef?w=600&h=600&fit=crop",
    ingredients: ["Peanut Butter", "Flour", "Sugar", "Eggs", "Salt", "Vanilla"],
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Sugar Cookie Supreme",
    description:
      "Light, buttery sugar cookies with colorful sprinkles. A timeless favorite.",
    price: 3.29,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop",
    ingredients: ["Flour", "Sugar", "Butter", "Eggs", "Vanilla", "Sprinkles"],
    inStock: true,
  },
  {
    id: "6",
    name: "White Chocolate Macadamia",
    description:
      "Premium white chocolate chunks paired with buttery macadamia nuts.",
    price: 4.99,
    category: "Premium",
    image:
      "https://images.unsplash.com/photo-1618686537093-39e0f258f815?w=600&h=600&fit=crop",
    ingredients: [
      "White Chocolate",
      "Macadamia Nuts",
      "Flour",
      "Butter",
      "Sugar",
      "Vanilla",
    ],
    inStock: true,
  },
  {
    id: "7",
    name: "Snickerdoodle",
    description: "Cinnamon-sugar coated cookies with a soft, chewy center.",
    price: 3.79,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1559225197-6f5c3e60dc2c?w=600&h=600&fit=crop",
    ingredients: [
      "Flour",
      "Cinnamon",
      "Sugar",
      "Butter",
      "Cream of Tartar",
      "Eggs",
    ],
    inStock: true,
  },
  {
    id: "8",
    name: "Red Velvet",
    description: "Luxurious red velvet cookies with cream cheese chips.",
    price: 4.79,
    category: "Premium",
    image:
      "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600&h=600&fit=crop",
    ingredients: [
      "Flour",
      "Cocoa",
      "Red Food Coloring",
      "Cream Cheese Chips",
      "Sugar",
      "Butter",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "9",
    name: "Lemon Zest",
    description: "Refreshing lemon cookies with a tangy glaze.",
    price: 3.99,
    category: "Specialty",
    image:
      "https://images.unsplash.com/photo-1548848981-29f61b4d7c98?w=600&h=600&fit=crop",
    ingredients: [
      "Flour",
      "Lemon Zest",
      "Lemon Juice",
      "Sugar",
      "Butter",
      "Powdered Sugar",
    ],
    inStock: true,
  },
  {
    id: "10",
    name: "Chocolate Mint",
    description: "Rich chocolate cookies with cool mint chocolate chips.",
    price: 4.29,
    category: "Chocolate",
    image:
      "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=600&h=600&fit=crop",
    ingredients: [
      "Flour",
      "Cocoa",
      "Mint Chips",
      "Sugar",
      "Butter",
      "Peppermint Extract",
    ],
    inStock: true,
  },
  {
    id: "11",
    name: "Salted Caramel",
    description: "Sweet caramel cookies with a hint of sea salt.",
    price: 4.49,
    category: "Premium",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop",
    ingredients: [
      "Flour",
      "Caramel",
      "Sea Salt",
      "Brown Sugar",
      "Butter",
      "Vanilla",
    ],
    inStock: true,
  },
  {
    id: "12",
    name: "Gingerbread",
    description: "Spiced gingerbread cookies perfect for any season.",
    price: 3.69,
    category: "Specialty",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&h=600&fit=crop",
    ingredients: [
      "Flour",
      "Molasses",
      "Ginger",
      "Cinnamon",
      "Nutmeg",
      "Brown Sugar",
    ],
    inStock: true,
  },
];

export const categories = [
  "All",
  "Classic",
  "Chocolate",
  "Premium",
  "Specialty",
];
