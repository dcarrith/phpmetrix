/* global describe, it, before, after */
'use strict'

var chai = require('chai');
var wrapper = require('../');
var binCheck = require('bin-check');
var phpmetrix = wrapper.phpmetrix;
var cli = wrapper.cli;

var configFilePath = __dirname + '/config.yml';
var nonConfigFilePath = __dirname + '/nonconfig.yml';

chai.should();

describe('phpmetrix', function () {

  describe( 'using Node', function() {

    it( 'should NOT throw an error if file is analyzed', function( done ) {
      phpmetrix( configFilePath, function( err, stdout, stderr ) {
        done( err );
      });
    });

    it('should throw an error if config.yml does not exist', function( done ) {
      phpmetrix( nonConfigFilePath, function( err, stdout, stderr ) {
        ( err !== undefined ).should.be.true;
        done();
      });
    });
  });

  describe( 'cli', function() {

    var initialArgs = process.argv;

    before( function( done ) {
      process.argv = 'phpmetrix';
      done();
    })

    after( function( done ) {
      process.argv = initialArgs;
      done();
    })

    it('should be exectuable', function( done ) {
        binCheck(__dirname + '../cli.js', ['--version']).then( function( works ) {
            works.should.equal( true );
        });
        done();
    });

    it('should throw an error when config.yml does not exist', function (done) {
        cli(nonConfigFilePath, {}, function (err) {
            (err !== undefined).should.be.true;
        });
        done();
    });

    it('should NOT throw an error when config.yml exists', function (done) {
        cli(configFilePath, {}, function (err) {
            (err === undefined).should.be.true;
        });
        done();
    });
  });
});
