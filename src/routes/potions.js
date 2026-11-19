const express = require("express");
const { eq } = require("drizzle-orm");

const db = require("../db/db");
const { potions } = require("../db/schema");
const renderErrorHandler = require("../utilitys/renderErrorHandler");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allPotions = await db.select().from(potions);
    return res.status(200).json(allPotions);
  } catch (error) {
    return renderErrorHandler(res, err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [potion] = await db
      .select()
      .from(potions)
      .where(eq(potions.id, req.params.id));
    if (!potion) {
      return res.status(404).json({ error: "Potion not found" });
    }
    return res.status(200).json(potion);
  } catch (error) {
    return renderErrorHandler(res, err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, effect, isDangerous } = req.body;

    await db.insert(potions).values({
      name,
      effect,
      isDangerous,
    });
    return res.status(201).json({ message: "Potion created successfully" });
  } catch (error) {
    return renderErrorHandler(res, err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [exist] = await db
      .select()
      .from(potions)
      .where(eq(potions.id, req.params.id));
    if (!exist){
        return res.status(404).json({ error: "Potion not found" });
    }
    await db
        .delete(potions)
        .where(eq(potions.id, req.params.id));
    return res.status(200).json({ message: "Potion deleted successfully" });
  } catch (error) {
    return renderErrorHandler(res, err);
  }
});

module.exports = router;
