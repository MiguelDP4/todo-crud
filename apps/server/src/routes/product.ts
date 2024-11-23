import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router: Router = Router();

// Create a product
router.post("/", async (req, res) => {
  const { name, description, price, variants, collections } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        variants: {
          create: variants,
        },
        collections: {
          connect: collections.map((id: number) => ({ id })),
        },
      },
    });
    res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message }); // Handle error properly
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// Read all products
router.get("/", async (_, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { variants: true, collections: true },
    });
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price },
    });
    res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

export default router;
