const { Router } = require("express");
const LogEntry = require("../src/models/LogEntry");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    //get all entries
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    //insert it to the db
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }

  console.log(req.body);
});

router.get("/:id", async (req, res) => {
  try {
    const { id: spotID } = req.params;
    const spot = await LogEntry.findOne({ id: spotID });

    if (!spot) {
      return res.status(404).json({ msg: `No spot with ID: ${spotID}` });
    }
    res.status(200).json({ spot });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id: spotID } = req.params;
    const spot = await LogEntry.findOneAndDelete({ _id: spotID });
    if (!spot) {
      res.status(404).json({ msg: `Can not find task with ID ${spotID}` });
    }
    res.status(200).json({ spot });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
module.exports = router;
