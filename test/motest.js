
var assert = require('assert');
var mocha  = require('mocha');

var suite         = mocha.suite;
var setup         = mocha.setup;
var suiteSetup    = mocha.suiteSetup;
var test          = mocha.test;
var teardown      = mocha.teardown;
var suiteTeardown = mocha.suiteTeardown;

 //test case
 suite('Array', function() {

   suiteSetup(function () {
     //suiteSetup will run only 1 time in suite Array, before all suite
     //...
     console.log('suitSetup...');
   });

   setup(function () {
     //setup will run 1 time before every suite runs in suite Array
     //...
     console.log('setup...');
   });

   suite('indexOf()', function () {
     test('should return -1 when not present', function () {
       assert.equal(-1, [1, 2, 3].indexOf(4));
     });
   });

   suite('indexOf2()', function () {
     test('should return not -1 when present', function () {
       assert.equal(0, [1, 2, 3].indexOf(1));
     });
   });

   teardown(function () {
     //teardown will run 1 time after every suite runs in suite Array
     //...
     console.log('teardown...');
   });

   suiteTeardown(function () {
     //suiteTeardown will run 1 time in suite Array, after all suits run over.
     //...
     console.log('suiteTeardown...');
   })
 })