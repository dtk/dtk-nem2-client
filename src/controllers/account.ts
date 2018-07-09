import {
  AccountHttp,
  Address,
  MosaicHttp,
  MosaicService,
  NamespaceHttp,
  Account,
  NetworkType,
  PublicAccount,
  QueryParams
} from 'nem2-sdk';

import { Request, Response } from "express";

const url = process.env.BLOCKCHAIN_APP_URL;

const accountHttp = new AccountHttp(url);
const mosaicHttp = new MosaicHttp(url);
const namespaceHttp = new NamespaceHttp(url);
const mosaicService = new MosaicService(accountHttp, mosaicHttp, namespaceHttp);

export let checkBalance = (req: Request, res: Response) => {
  var address = req.params.address || process.env.NEM2_ACCOUNT_ADDRESS;

  if (!address) {
    res.status(500).send({ status: 'notok', errors: [{code: 'error', message: 'You have to specify address'}] });
  }

  mosaicService.mosaicsAmountViewFromAddress(Address.createFromRawAddress(address))
    .flatMap((_: any) => _)
    .subscribe(
      (mosaic: any) => {
        console.log('You have', mosaic.relativeAmount(), mosaic.fullName());
        res.status(200).send({ status: 'ok', data: [{address: address, ammount: mosaic.relativeAmount(), type: mosaic.fullName()}] });
      },
      err => {
        console.error(err);
        res.send({ status: 'notok', errors: [JSON.parse(err['response']['text'])] });
      }
    );
};

export let create = (req: Request, res: Response) => {
  try {
    const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);

    console.log('Your new account address is:', account.address.pretty());//, 'and its private key', account.privateKey);
    res.status(200).send({ status: 'ok', data: [{ address: account.address.pretty(), private_key: account.privateKey }] });
  } catch(err) {
    console.log(err);
    res.send({ status: 'notok', errors: [{ code: err.code, message: err.message }] });
  }
};

export let info = (req: Request, res: Response) => {
  var address = req.params.address || process.env.NEM2_ACCOUNT_ADDRESS;

  try {
    accountHttp.getAccountInfo(Address.createFromRawAddress(address)).subscribe(
        (accountInfo: any) => {
          console.log(accountInfo);
          res.status(200).send({ status: 'ok', data: [{ accountInfo: accountInfo }] });
        },
        err => {
          console.error(err);
          res.send({ status: 'notok', errors: [JSON.parse(err['response']['text'])] });
        }
    );
  } catch(err) {
    console.log(err);
    res.send({ status: 'notok', errors: [{ code: err.code, message: err.message }] });
  }
};

export let listTransactions = (req: Request, res: Response) => {
  const publicKey = req.params.public_key || process.env.NEM2_ACCOUNT_PUBLIC_KEY as string;

  const pageSize = 10;

  accountHttp.transactions(
      PublicAccount.createFromPublicKey(publicKey, NetworkType.MIJIN_TEST),
      new QueryParams(pageSize)
  ).subscribe(
      (transactions: any) => {
        console.log(transactions);
        res.status(200).send({ status: 'ok', data: [{ transactions: transactions }] });
      },
      err => {
        console.error(err);
        res.send({ status: 'notok', errors: [JSON.parse(err['response']['text'])] });
      }
  );
};

export let open = (req: Request, res: Response) => {
  const privateKey = process.env.NEM2_ACCOUNT_PRIVATE_KEY as string;

  try {
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

    console.log('Your account address is:', account.address.pretty());//, 'and its private key', account.privateKey);
    res.status(200).send({ status: 'ok', data: [{ address: account.address.pretty(), private_key: account.privateKey }] });
  } catch(err) {
    console.log(err);
    res.send({ status: 'notok', errors: [{ code: err.code, message: err.message }] });
  }
};