const express = require("express");
const actionRouter = express.Router();

const db = require("./data/helpers/actionModel");
const db2 = require("./data/helpers/projectModel");

actionRouter.get("/", (req, res, next) => {
    db.get()
      .then((actions) => {
        res.status(200).json({ actions });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  });

actionRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;

  db.get(id)
    .then((userId) => {
      if (userId) {
        res.status(200).json({ action });
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

actionRouter.get("/:id/action", (req, res, next) => {
  const actionId = req.params.project_id;

  db2
    .getProjectActions(actionId)
    .then((projAction) => {
      if (projAction) {
        res.status(200).json({ Success: true, projAction });
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ Success: false, err });
    });
});

actionRouter.post("/action", (req, res, next) => {
  const action = req.body;

  db.insert(action)
    .then((insertAction) => {
      if (insertAction) {
        res.status(200).json({ success: true, insertAction });
      } else {
        res.status(404).json({ success: false, message: "invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

actionRouter.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const newAction = req.body;

  db.update(id, newAction)
    .then((updated) => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

actionRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

module.exports = actionRouter;
