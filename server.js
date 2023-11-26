#!/usr/bin/env node

import minimist from "minimist";
import express from "express";
import { rps, rpsls } from "./lib/rpsls.js";

const args = minimist(process.argv.slice(2));
const port = args["port"] || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** get
 * /app/ -> 200 OK
 */
app.get("/app/", (req, res) => res.status(200).send("200 OK"));

/** get
 * /app/rps/
 */
app.get("/app/rps/", (req, res) =>
  res.status(200).send(JSON.stringify(rps(req.body.shot)))
);

/** get
 * /app/rpsls
 */
app.get("/app/rpsls/", (req, res) =>
  res.status(200).send(JSON.stringify(rpsls(req.body.shot)))
);

/** get
 * /app/rps/play
 */
app.get("/app/rps/play", (req, res) =>
  res.status(200).send(JSON.stringify(rps(req.query.shot)))
);

/** get
 * /app/rpsls/play
 */
app.get("/app/rpsls/play", (req, res) =>
  res.status(200).send(JSON.stringify(rpsls(req.query.shot)))
);

/** post
 * /app/rps/play
 */
app.post("/app/rps/play", (req, res) =>
  res.status(200).send(JSON.stringify(rps(req.body.shot)))
);

/** post
 * /app/rpsls/play
 */
app.post("/app/rpsls/play", (req, res) =>
  res.status(200).send(JSON.stringify(rpsls(req.body.shot)))
);

/** get
 * /app/rps/play/:shot
 */
app.get("/app/rps/play/:shot", (req, res) =>
  res.status(200).send(JSON.stringify(rps(req.params.shot)))
);

/** get
 * /app/rpsls/play/:shot
 */
app.get("/app/rpsls/play/:shot", (req, res) =>
  res.status(200).send(JSON.stringify(rpsls(req.params.shot)))
);

/** get
 * default
 */
app.get("*", (req, res) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(port);
