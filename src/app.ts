import * as bodyParser from "body-parser";
import * as express from 'express';

import * as accountController from "./controllers/account";

const app = express();

// app.set("port", process.env.PORT || 3000);
app.set("port", 3003);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/account/check_balance", accountController.checkBalance);

module.exports = app;
