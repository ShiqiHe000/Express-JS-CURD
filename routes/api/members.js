const { v4: uuidv4 } = require("uuid");
const express = require("express");
const appRouter = express.Router();

let members = require("../../Members.js");

// get all members
appRouter.get("/", (req, res) => {
  res.json(members);
});

// get one member
appRouter.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({
      message: `Member ${req.params.id} is not found.`,
    });
  }
});

// create new member
appRouter.post("/", (req, res) => {
  const newMember = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ message: "Missing member info." });
  }

  members.push(newMember);
  // res.json(newMember);
  res.redirect('/');
});

// update members
appRouter.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    console.log("find");
    const updatedMember = req.body;
    members.forEach((member) => {
      if (member.id.toString() === req.params.id) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;

        res.json({ message: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({
      message: `Member ${req.params.id} is not found.`,
    });
  }
});

// delete member
appRouter.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    let newMembers = members.filter(
      (member) => member.id.toString() !== req.params.id
    );
    members = newMembers;
    res.json({ message: `Member ${req.params.id} deleted.` });
  } else {
    res.status(400).json({
      message: `Member ${req.params.id} is not found.`,
    });
  }
});

module.exports = appRouter;
