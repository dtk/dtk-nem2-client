import { AccountHttp, Address, MosaicHttp, MosaicService, NamespaceHttp } from 'nem2-sdk';
import { Request, Response } from "express";

const url = 'http://localhost:3000';

const accountHttp = new AccountHttp(url);
const mosaicHttp = new MosaicHttp(url);
const namespaceHttp = new NamespaceHttp(url);

const mosaicService = new MosaicService(accountHttp, mosaicHttp, namespaceHttp);

// Replace with address
const address = "SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54";

export let checkBalance = (req: Request, res: Response) => {
  // var id = req.params.id;
  // "SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54";
  var address = "SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54";
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