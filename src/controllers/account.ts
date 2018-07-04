import { AccountHttp, Address, MosaicHttp, MosaicService, NamespaceHttp } from 'nem2-sdk';
import { Request, Response } from "express";

const url = 'http://localhost:3000';

const accountHttp = new AccountHttp(url);
const mosaicHttp = new MosaicHttp(url);
const namespaceHttp = new NamespaceHttp(url);

const mosaicService = new MosaicService(accountHttp, mosaicHttp, namespaceHttp);

export let checkBalance = (req: Request, res: Response) => {
  var address = req.body.address;
  var test = mosaicService.mosaicsAmountViewFromAddress(Address.createFromRawAddress(address))
    .flatMap((_: any) => _)
    .subscribe(
        //@ts-ignore
        mosaic => console.log('You have', mosaic.relativeAmount(), mosaic.fullName()),
        //@ts-ignore
        err => console.error(err)
    );

  return res.send(test);
  // console.log(req.url.)

  // if (req.user) {
  //   return res.redirect("/");
  // }
  // res.render("account/login", {
  //   title: "Login"
  // });
};