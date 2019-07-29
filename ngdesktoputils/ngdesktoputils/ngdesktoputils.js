angular.module('ngdesktoputils',['servoy'])
.factory("ngdesktoputils",function($services, $q) 
{
	//var scope = $services.getServiceScope('ngdesktoputils');
	var electron = null;
	var childProcess = null;
	if (typeof require == "function") {
		electron = require('electron');
		childProcess = require('child_process');
	}
	if (electron) {
		function makeProgramString(program,args) {
			if (program.indexOf(" ") >= 0) program = "\"" + program + "\"";
			if (args) {
				for(var i=0;i<args.length;i++) {
					program += " " + args[i];
				}
			}
			return program; 
		}
		return {
			/**
			 * This will close the NGDesktop main application.
			 * Be sure you will call this and after this call application.exit() to close also the client directly itself.
			 */
			exit: function() {
				electron.remote.app.exit();
			},
			/**
			 * Executes a command async, the server side call will not block on this call.
			 */
			executeCommand: function(program,args) {
				const child = childProcess.exec(makeProgramString(program,args), null, function(error, stdout, stderr) {
				  if (error) {
				    throw error;
				  }
				});
			},
			/**
			 * This executes a command and returns the result of the stdout 
			 * This will also call reject when a error happens so the call will error out. (will not return correct)
			 * Try to use the async executeCommand so nothing will be blocking.
			 */
			executeCommandSync: function(program,args) {
				const defer = $q.defer();
				const child = childProcess.exec(makeProgramString(program,args), null, function(error, stdout, stderr) {
				  if (error) {
					defer.reject(stderr);
				    throw error;
				  }
				  defer.resolve(stdout);
				});
				return defer.promise;
			}
		}
	}
	else {
		return {
			exit: function() {console.log("not in electron");},
			executeCommand: function(program,args) {console.log("not in electron");},
			executeCommandSync: function(program,args) {console.log("not in electron");}
		}
	}
})