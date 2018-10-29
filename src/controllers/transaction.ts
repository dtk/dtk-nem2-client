import {
  TransactionHttp,
  Address,
  Deadline,
  XEM,
  NetworkType,
  PlainMessage,
  TransferTransaction,
  Account,
  NamespaceHttp,
  NamespaceId,
  RegisterNamespaceTransaction,
  UInt64
} from 'nem2-sdk';

import { Request, Response } from "express";

const url = process.env.BLOCKCHAIN_APP_URL;

export let info = (req: Request, res: Response) => {
  var transactionHash = req.params.hash;

  const transactionHttp = new TransactionHttp(url);

  let transactionInfo = transactionHttp.getTransaction(transactionHash).subscribe(
    (transaction: any) => {
      console.log('Transaction info', transaction.transactionInfo);
      res.status(200).send({ status: 'ok', data: [{transactionInfo: transaction.transactionInfo, recipient: transaction.recipient, mosaics: transaction.mosaics, signer: transaction.signer, deadline: transaction.deadline}] });
    },
    err => {
      console.error(err);
      res.send({ status: 'notok', errors: [JSON.parse(err['response']['text'])] });
    }
  );
};

export let transfer = (req: Request, res: Response) => {
  const recipientAddress = req.body.recipient;
  const amount = req.body.amount;

  const transferTransaction = TransferTransaction.create(
      Deadline.create(),
      Address.createFromRawAddress(recipientAddress),
      [XEM.createRelative(parseInt(amount))],
      PlainMessage.create('Transfer through dtk-client'),
      NetworkType.MIJIN_TEST,
  );

  const privateKey = process.env.NEM2_ACCOUNT_PRIVATE_KEY as string;

  if (!privateKey) {
    return res.send({ status: 'notok', errors: [{message: 'You cannot send transactions without private key. Please set environment variable NEM2_ACCOUNT_PRIVATE_KEY in .env file'}] });
  }

  const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

  const signedTransaction = account.sign(transferTransaction);

  const transactionHttp = new TransactionHttp(url);

  transactionHttp.announce(signedTransaction).subscribe(
    (x: any) => {
      console.log(x),
      res.status(200).send({ status: 'ok', data: [{ message: x.message, hash: signedTransaction.hash, type: signedTransaction.type, signer: signedTransaction.signer }] });
    },
    err => {
      console.error(err),
      res.send({ status: 'notok', errors: [JSON.parse(err['response']['text'])] });
    }
  );
};

export let namespace = (req: Request, res: Response) => {
  const namespace_name = req.body.namespace;
  const duration = req.body.duration || 100000;

  if (namespace_name === "") {
    return res.send({ status: 'notok', errors: [{message: 'Please provide namespace name'}] });
  }

  const privateKey = process.env.NEM2_ACCOUNT_PRIVATE_KEY as string;
  const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

  if (namespace_exists(namespace_name)) {
    res.send({ status: 'notok', errors: ['Namespace with name' + namespace_name + 'exists already'] });
  } else {
    const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
      Deadline.create(),
      namespace_name,
      UInt64.fromUint(duration),
      NetworkType.MIJIN_TEST,
    );

    const signedTransaction = account.sign(registerNamespaceTransaction);

    const transactionHttp = new TransactionHttp(url);

    transactionHttp.announce(signedTransaction).subscribe(
      (x: any) => {
        console.log(namespace),
        res.status(200).send({ status: 'ok', data: [{ message: x }] });
      },
      err => {
        console.error(err),
        res.send({ status: 'notok', errors: [JSON.parse(err['response']['text'])] });
      }
    );
  }
};

function namespace_exists(namespace_name: any): boolean {
  const namespaceHttp = new NamespaceHttp(url);
  const namespace = new NamespaceId(namespace_name);

  let exist = false;

  namespaceHttp.getNamespace(namespace).subscribe(
    (namespace: any) => {
      exist = true;
    },
    err => {
      console.error(err);
      exist = false;
    }
  );

  return exist;
}

export let namespace_exist = (req: Request, res: Response) => {
  const namespaceHttp = new NamespaceHttp(url);

  const namespace_name = req.body.namespace;

  const namespace = new NamespaceId(namespace_name);

  namespaceHttp.getNamespace(namespace).subscribe(
    (namespace: any) => {
      console.log(namespace),
      res.status(200).send({ status: 'ok', data: [{ message: namespace }] });
    },
    err => {
      console.error(err),
      res.send({ status: 'notok', errors: [JSON.parse(err['response']['text'])] });
    }
  );
};