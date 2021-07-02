angular.module('ngdesktoputils',['servoy','ngdesktopfile'])
.factory("ngdesktoputils",function($services, $q,ngdesktopfile) 
{
	//var scope = $services.getServiceScope('ngdesktoputils');
	var electron = null;
	var childProcess = null;
    var printer = null;
	if (typeof require == "function") {
		electron = require('electron');
		childProcess = require('child_process');
        printer = require('pdf-to-printer');
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
				ngdesktopfile.waitForDefered(function() {
					electron.remote.app.exit();
				})
			},
			/**
			 * Executes a command async, the server side call will not block on this call.
			 */
			executeCommand: function(program,args) {
				ngdesktopfile.waitForDefered(function() {
					const child = childProcess.exec(makeProgramString(program,args), null, function(error, stdout, stderr) {
					  if (error) {
					    throw error;
					  }
					});
				})
			},
			/**
			 * This executes a command and returns the result of the stdout 
			 * This will also call reject when a error happens so the call will error out. (will not return correct)
			 * Try to use the async executeCommand so nothing will be blocking.
			 */
			executeCommandSync: function(program,args) {
				const defer = $q.defer();
				ngdesktopfile.waitForDefered(function() {
					const child = childProcess.exec(makeProgramString(program,args), null, function(error, stdout, stderr) {
					  if (error) {
						defer.reject(stderr);
					    throw error;
					  }
					  defer.resolve(stdout);
					});
				})
				return defer.promise;
			},
			/**
			 * Set clipboard text. 
			 *
			 * @param {string} text to be set in clipboard
			 */
			setClipboardContent: function(text)
			{
			     electron.clipboard.writeText(text);
			},
			
			/**
			 * Get clipboard text. 
			 */
			getClipboardContent: function()
			{
			     return electron.clipboard.readText();
			},
			
			/**
			 * Whether application is running as NGDesktop. 
			 */
			isNGDesktop: function()
			{
			     return true;
			},
            
             /**
             * Prints a pdf document specified by path. Optionally, specify printer or unix print options (lp command) or windows print options(SumatraPDF). 
             */
            printPDF : function(path, options) 
            {
               printer.print(path, options);
            },
            
            /**
             * Returns installed printers on local machine.
             */
            getPrinters : function() 
            {
                return printer.getPrinters();
            },
            
            /**
             * Returns default printer on local machine.
             */
            getDefaultPrinter : function() 
            {
               return printer.getDefaultPrinter();
            }
		}
	}
	else {
		return {
			exit: function() {console.log("not in electron");},
			executeCommand: function(program,args) {console.log("not in electron");},
			executeCommandSync: function(program,args) {console.log("not in electron");},
			setClipboardContent : function() {console.log("not in electron");},
			getClipboardContent : function() {console.log("not in electron");},
			isNGDesktop : function() {return false;},
            printPDF : function() {console.log("not in electron");},
            getPrinters : function() {console.log("not in electron");},
            getDefaultPrinter : function() {console.log("not in electron");}
		}
	}
})