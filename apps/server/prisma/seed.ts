import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Collections
  const collections = await prisma.collection.createMany({
    data: [
      { name: "Electronics" },
      { name: "Clothing" },
      { name: "Home Appliances" },
      { name: "Books" },
      { name: "Outdoor Gear" },
    ],
  });

  console.log(`Inserted ${collections.count} collections.`);

  // Create Products
  const productsData = [
    {
      name: "Smartphone",
      description: "A high-performance smartphone with stunning display.",
      price: 999.99,
      variants: [
        { name: "128GB Storage", stock: 50 },
        { name: "256GB Storage", stock: 30 },
      ],
      collection: "Electronics",
    },
    {
      name: "Laptop",
      description: "A lightweight laptop perfect for work and travel.",
      price: 1200.0,
      variants: [
        { name: "16GB RAM", stock: 20 },
        { name: "32GB RAM", stock: 10 },
      ],
      collection: "Electronics",
    },
    {
      name: "Wireless Headphones",
      description: "Noise-cancelling over-ear headphones.",
      price: 200.0,
      variants: [
        { name: "Black", stock: 40 },
        { name: "White", stock: 35 },
      ],
      collection: "Electronics",
    },
    {
      name: "T-Shirt",
      description: "A comfortable cotton t-shirt available in multiple sizes.",
      price: 19.99,
      variants: [
        { name: "Small", stock: 100 },
        { name: "Medium", stock: 80 },
        { name: "Large", stock: 60 },
      ],
      collection: "Clothing",
    },
    {
      name: "Jeans",
      description: "Durable denim jeans in classic fit.",
      price: 49.99,
      variants: [
        { name: "30 Waist", stock: 40 },
        { name: "32 Waist", stock: 50 },
        { name: "34 Waist", stock: 45 },
      ],
      collection: "Clothing",
    },
    {
      name: "Refrigerator",
      description: "Energy-efficient refrigerator with large capacity.",
      price: 800.0,
      variants: [
        { name: "Silver", stock: 15 },
        { name: "Black", stock: 10 },
      ],
      collection: "Home Appliances",
    },
    {
      name: "Microwave Oven",
      description: "Compact microwave oven with smart cooking presets.",
      price: 150.0,
      variants: [
        { name: "700W", stock: 25 },
        { name: "1000W", stock: 20 },
      ],
      collection: "Home Appliances",
    },
    {
      name: "Cooking Pan Set",
      description: "Non-stick cooking pan set, perfect for everyday use.",
      price: 69.99,
      variants: [
        { name: "5-piece Set", stock: 30 },
        { name: "10-piece Set", stock: 20 },
      ],
      collection: "Home Appliances",
    },
    {
      name: "Fantasy Novel",
      description: "A bestselling fantasy novel with thrilling adventures.",
      price: 12.99,
      variants: [
        { name: "Paperback", stock: 100 },
        { name: "Hardcover", stock: 50 },
      ],
      collection: "Books",
    },
    {
      name: "Science Fiction Book",
      description: "A collection of short science fiction stories.",
      price: 15.99,
      variants: [
        { name: "Paperback", stock: 80 },
        { name: "Hardcover", stock: 40 },
      ],
      collection: "Books",
    },
    {
      name: "Camping Tent",
      description: "Waterproof camping tent for up to 4 people.",
      price: 129.99,
      variants: [
        { name: "Green", stock: 15 },
        { name: "Blue", stock: 10 },
      ],
      collection: "Outdoor Gear",
    },
    {
      name: "Sleeping Bag",
      description: "Lightweight and compact sleeping bag for all seasons.",
      price: 59.99,
      variants: [
        { name: "Single", stock: 30 },
        { name: "Double", stock: 20 },
      ],
      collection: "Outdoor Gear",
    },
    {
      name: "Electric Kettle",
      description: "Fast-boil electric kettle with automatic shutoff.",
      price: 39.99,
      variants: [
        { name: "1L Capacity", stock: 25 },
        { name: "2L Capacity", stock: 15 },
      ],
      collection: "Home Appliances",
    },
    {
      name: "Running Shoes",
      description: "Comfortable running shoes with excellent grip.",
      price: 89.99,
      variants: [
        { name: "Size 8", stock: 20 },
        { name: "Size 9", stock: 25 },
        { name: "Size 10", stock: 15 },
      ],
      collection: "Clothing",
    },
    {
      name: "Smartwatch",
      description: "Feature-packed smartwatch with heart rate monitoring.",
      price: 250.0,
      variants: [
        { name: "Black Strap", stock: 40 },
        { name: "Silver Strap", stock: 35 },
      ],
      collection: "Electronics",
    },
    {
      name: "Desk Lamp",
      description: "Adjustable desk lamp with touch controls.",
      price: 29.99,
      variants: [
        { name: "Warm Light", stock: 30 },
        { name: "Cool Light", stock: 25 },
      ],
      collection: "Home Appliances",
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with rich sound.",
      price: 59.99,
      variants: [
        { name: "Black", stock: 40 },
        { name: "Blue", stock: 35 },
      ],
      collection: "Electronics",
    },
    {
      name: "Yoga Mat",
      description: "Eco-friendly yoga mat with non-slip surface.",
      price: 24.99,
      variants: [
        { name: "Purple", stock: 50 },
        { name: "Green", stock: 40 },
      ],
      collection: "Outdoor Gear",
    },
    {
      name: "Blender",
      description: "High-speed blender for smoothies and shakes.",
      price: 99.99,
      variants: [
        { name: "Silver", stock: 20 },
        { name: "Black", stock: 15 },
      ],
      collection: "Home Appliances",
    },
    {
      name: "Backpack",
      description: "Durable backpack with multiple compartments.",
      price: 69.99,
      variants: [
        { name: "25L", stock: 30 },
        { name: "50L", stock: 20 },
      ],
      collection: "Outdoor Gear",
    },
  ];

  // Insert Products
  for (const product of productsData) {
    const collection = await prisma.collection.findFirst({
      where: { name: product.collection },
    });

    if (collection) {
      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          collections: {
            connect: { id: collection.id },
          },
          variants: {
            create: product.variants,
          },
        },
      });
    }
  }

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
