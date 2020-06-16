const express = require("express");
const projectRouter = express.Router();

const db = require("./data/helpers/projectModel");

projectRouter.get("/", (req, res, next) => {
  db.get()
    .then((projects) => {
      res.status(200).json({ projects });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

projectRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const project = req.body;

  db.get(id, project)
    .then((isProject) => {
      if (isProject) {
        res.status(200).json({ isProject });
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

projectRouter.get("/:id/project", (req, res, next) => {
  const projectId = req.params.id;

  db.get(projectId)
    .then((projproject) => {
      if (projproject) {
        res.status(200).json({ Success: true, projproject });
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ Success: false, err });
    });
});

projectRouter.post("/project", (req, res, next) => {
  const project = req.body;

  db.insert(project)
    .then((insertProject) => {
      if (insertProject) {
        res.status(200).json({ success: true, insertProject });
      } else {
        res.status(404).json({ success: false, message: "invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

projectRouter.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const newproject = req.body;

  db.update(id, newproject)
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

projectRouter.delete("/:id", (req, res) => {
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

module.exports = projectRouter;
