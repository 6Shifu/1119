const express = require("express");
const { eq } = require("drizzle-orm");

const db = require("../db/db");
const { potions } = require("../db/schema");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allPotions = await db.select().from(potions);
    return res.status(200).json(allPotions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [potion] = await db
      .select()
      .from(potions)
      .where(eq(potions.id, req.params.id));
      if (!potion){
        return res.status(404).json({ error: "NICS" });
      }
      return res.status(200).json(potion);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
module.exports = router;
