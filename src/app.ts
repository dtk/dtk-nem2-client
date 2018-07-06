import * as bodyParser from "body-parser";
import * as express from 'express';
import * as dotenv from "dotenv";

import * as accountController from "./controllers/account";

dotenv.config({ path: ".env" });

const app = express();

// app.set("port", process.env.PORT || 3000);
app.set("port", 3003);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/account/check_balance/:address?", accountController.checkBalance);
app.get("/account/create", accountController.create);
app.get("/account/info/:address?", accountController.info);
app.get("/account/list_transactions/:public_key?", accountController.listTransactions);
app.get("/account/open", accountController.open);

module.exports = app;
