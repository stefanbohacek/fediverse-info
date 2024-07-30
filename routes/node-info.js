import fs from "fs";
import express from "express";
import rejectRequest from "../modules/rejectRequest.js";
import getNodeInfo from "../modules/getNodeInfo.js";

const fediverseSoftwareData = JSON.parse(
  fs.readFileSync("./data/software.json")
);

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.query.domain) {
    let nodeInfo;

    if (req.query.onlysoftware) {
      if (fediverseSoftwareData[req.query.domain]) {
        nodeInfo = {
          domain: req.query.domain,
          software: {
            name: fediverseSoftwareData[req.query.domain]["software"],
          },
        };
      } else {
        nodeInfo = await getNodeInfo(req.query.domain, req.query.full);
      }
    } else {
      nodeInfo = await getNodeInfo(req.query.domain, req.query.full);
    }

    res.json(nodeInfo);
  } else {
    rejectRequest(req, res, 422);
  }
});

export default router;
