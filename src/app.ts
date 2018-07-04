import * as bodyParser from "body-parser";
import * as express from 'express';

import * as accountController from "./controllers/account";

const app = express();

// app.set("port", process.env.PORT || 3000);
app.set("port", 3003);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/account/check_balance", accountController.checkBalance);

/**
 * Primary app routes.
 */
// app.get("/", passportConfig.isAuthenticated, homeController.index);
// app.get("/community", passportConfig.isAuthenticated, homeController.getCommunity);
// app.get("/slack", passportConfig.isAuthenticated, homeController.getSlack);
// app.get("/docs_sdk", passportConfig.isAuthenticated, homeController.getSDKDocs);

// app.get("/test_mail", passportConfig.isAuthenticated, homeController.getTestMail);

// app.get("/login", userController.getLogin);
// app.post("/login", userController.postLogin);
// app.get("/logout", userController.logout);
// app.get("/forgot", userController.getForgot);
// app.post("/forgot", userController.postForgot);
// app.get("/reset/:token", userController.getReset);
// app.post("/reset/:token", userController.postReset);
// app.get("/signup", userController.getSignup);
// app.post("/signup", userController.postSignup);

// app.get("/catapult/accounts", catapultController.getAcounts);
// app.post("/catapult/faucet/:address", catapultController.postFaucet);

// app.get("/account/accept_invite/:token", userController.getInvite);
// app.post("/account/accept_invite/:token", userController.postInvite);

// app.get("/docs", passportConfig.isAuthenticated, docController.index);
// app.get("/faucet", passportConfig.isAuthenticated, faucetController.index);
// app.post("/faucet", passportConfig.isAuthenticated, faucetController.postFaucet);
// app.get("/explorer", passportConfig.isAuthenticated, explorerController.index);

// app.get("/dashboard", passportConfig.isAuthenticated, dashboardController.index);
// app.post("/dashboard", dashboardController.postDashboard);

// app.get("/deployments", passportConfig.isAuthenticated, setupController.deployments);
// app.post("/deployments", setupController.postSetup);

// app.use("/lang/:lang", passportConfig.isAuthenticated, langController.index);

// app.get("/admin/xyz1w3", passportConfig.isAuthenticated, adminController.getRegister);
// app.post("/admin/xyz1w3", passportConfig.isAuthenticated, adminController.postRegister);

module.exports = app;
