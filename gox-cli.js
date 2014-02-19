#! /usr/bin/env node

var program = require('commander');
var currency = require('mtgox-currency');
var HttpGoxClient = require('mtgox-http-client');
var httpGoxClient = new HttpGoxClient({ key: 'MTGOX_API_KEY', secret: 'MTGOX_API_SECRET' });

program
  .command('add')
  .option('-t --type [type]', 'Type of order')
  .option('-a --amount-int [amount_int]', 'Amount of the order', currency.btcFloat2btcInt)
  .option('-p --price-int [price_int]', 'Price of the order', currency.usdFloat2UsdInt)
  .action(function(options) {
    httpGoxClient.add(options.type, options.amountInt, options.priceInt).pipe(process.stdout);
  });

program
  .command('cancel')
  .option('-o --order-id [oid]', 'Order id')
  .action(function(options) {
    httpGoxClient.cancel(options.orderId).pipe(process.stdout);
  });

program
  .command('idkey')
  .action(function () {
    httpGoxClient.idKey().pipe(process.stdout);
  });

program
  .command('info')
  .action(function () {
    httpGoxClient.info().pipe(process.stdout);
  });

program
  .command('lag')
  .action(function () {
    httpGoxClient.lag().pipe(process.stdout);
  });

program
  .command('orders')
  .action(function () {
    httpGoxClient.orders().pipe(process.stdout);
  });

program
  .command('result')
  .option('-t --type [type]', 'Trade type')
  .option('-o --order [oid]', 'Order id')
  .action(function(options) {
    httpGoxClient.result(options.type, options.order).pipe(process.stdout);
  });

program
  .command('tickerFast')
  .action(function () {
    httpGoxClient.tickerFast().pipe(process.stdout);
  });

program
  .command('trades')
  .option('-s --since [since]', 'Timestamp', (Date.now() - 60 * 60 * 1000) * 1000)
  .action(function (options) {
    httpGoxClient.trades(options.since).pipe(process.stdout);
  });

program.parse(process.argv);
