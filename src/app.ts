import * as bodyParser from "body-parser";
import * as express from 'express';
import * as dotenv from "dotenv";

import * as accountController from "./controllers/account";
import * as transactionController from "./controllers/transaction";

dotenv.config({ path: ".env" });

const app = express();

app.set("port", process.env.NEM2_CLIENT_PORT || 3003);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/account/check_balance/:address?", accountController.checkBalance);
app.get("/account/create", accountController.create);
app.get("/account/info/:address?", accountController.info);
app.get("/account/list_transactions/:public_key?", accountController.listTransactions);
app.get("/account/open", accountController.open);

app.get("/transaction/info/:hash", transactionController.info);
app.post("/transaction/transfer", transactionController.transfer);
app.post("/transaction/namespace", transactionController.namespace);

module.exports = app;
