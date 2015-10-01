/**
 * Created by wir_wolf on 01.10.15.
 */
var winston = require('winston');
var Jii = require('jii');

Jii.defineClass('Jii.Log', {

	__extends: Jii.base.Object,

	__static:{

		silly:function(massage){
			this.getlogger().silly(massage);
		},
		debug:   function(massage){
			this.getlogger().debug(massage);
		},
		verbose: function(massage){
			this.getlogger().verbose(massage);
		},
		info:function(massage){
			this.getlogger().info(massage);
		},
		warn:function(massage){
			this.getlogger().warn(massage);
		},
		error:function(massage){
			this.getlogger().error(massage);
		},

		getlogger:function(){
			var winstonConsole = Jii.app.getComponent('Log').winstonConsole;
			winstonConsole.transports.console.label = this.getTrace()[3].getFileName().split('/').slice(-2).join('/');
			return winstonConsole;
		},
		getTrace: function (belowFn) {
			var oldLimit          = Error.stackTraceLimit;
			Error.stackTraceLimit = Infinity;

			var dummyObject = {};

			var v8Handler           = Error.prepareStackTrace;
			Error.prepareStackTrace = function (dummyObject, v8StackTrace) {
				return v8StackTrace;
			};
			Error.captureStackTrace(dummyObject, belowFn || exports.get);

			var v8StackTrace        = dummyObject.stack;
			Error.prepareStackTrace = v8Handler;
			Error.stackTraceLimit   = oldLimit;

			return v8StackTrace;
		}

	},

	winstonConsole:null,
	level:'debug',
	levels:{
		silly:   0,
		debug:   1,
		verbose: 2,
		info:    3,
		warn:    4,
		error:   5
	},


	constructor:function(){
		var self = this;
		this.winstonConsole =  new winston.Logger({
			transports: [
				new winston.transports.Console({
					colorize: true,
					level: self.level
				})
			]
		});
		console.log('Start winston Logger. Level:'+self.level);
	}
});