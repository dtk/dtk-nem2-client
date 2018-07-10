Dtk Nem2 Client
==============================


### Description

Dtk Nem2 Client is a NodeJS based library for communication between Dtk Client and Nem2 blockchain.
It's using nem2-sdk to communicate with the blockchain.

### Development

##### Setup

In top level directory create .env file based on .env.template

##### required .env varibales
* BLOCKCHAIN_APP_URL = 'http://localhost:3000' # this is the endpoint of catapult blockchain application that Dtk Nem2 Client will comunicate with

##### optional .env variables
* NEM2_ACCOUNT_ADDRESS =        # address for default nem2 account you want to use

* NEM2_ACCOUNT_PRIVATE_KEY =    # private key for default nem2 account you want to use - you will not be able to execute transactions without this variable

* NEM2_ACCOUNT_PUBLIC_KEY =     # public key for default nem2 account you want to use

* NEM2_CLIENT_PORT =            # port on which Dtk Nem2 Client will be running and Dtk Client will connect to (if not set, default is 3003)



##### Build and start the application

```npm install ``` # install dependencies
```tsc``` # to build dist directory content
```node dist/server.js``` # to run the application on localhost and port NEM2_CLIENT_PORT
