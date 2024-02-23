import { Injectable } from '@angular/core';
import { NGDesktopFileService } from '@servoy/ngdesktopfile';
import { LoggerFactory, LoggerService, Deferred, WindowRefService } from '@servoy/public';

import * as child_process from 'child_process';
import * as os from 'os';
import * as electron from 'electron';

@Injectable()
export class NGDesktopUtilsService {

    private log: LoggerService;
    private os: typeof os;
    private electron: typeof electron;
    private childProcess: typeof child_process;
    private printer: any;
    private remote: typeof electron.remote;
    private shell: electron.Shell;
    private ipcRenderer: typeof electron.ipcRenderer;

    constructor(private ngdesktopfile: NGDesktopFileService,
        windowRef: WindowRefService, logFactory: LoggerFactory) {
        this.log = logFactory.getLogger('NGDesktopUtilsService');
        const userAgent = navigator.userAgent.toLowerCase();
        const r = windowRef.nativeWindow['require'];
        if (userAgent.indexOf(' electron/') > -1 && r) {
            this.os = r('os');
            this.electron = r('electron');
            this.remote = r('@electron/remote');
            this.childProcess = r('child_process');
             if (this.os.platform() === 'win32' ) {
                 this.printer = r('@servoy/pdf-to-printer');
            } else {
               this.printer = r('unix-print');
            }
            this.shell = r('electron').shell;
            this.ipcRenderer = r('electron').ipcRenderer;
        } else {
            this.log.warn('ngdesktopuils service/plugin loaded in a none electron environment');
        }
    }

    /**
     * This will close the NGDesktop main application.
     * Be sure you will call this and after this call application.exit() to close also the client directly itself.
     */
    exit() {
        this.ngdesktopfile.waitForDefered(() => {
            this.remote.app.exit();
        });
    }

    /**
     * Executes a command async, the server side call will not block on this call.
     */
    executeCommand(program: string, args) {
        this.ngdesktopfile.waitForDefered(() => {
            this.childProcess.exec(this.makeProgramString(program, args), null, (error) => {
                if (error) {
                    throw error;
                }
            });
        });
    }

    /**
     * This executes a command and returns the result of the stdout
     * This will also call reject when a error happens so the call will error out. (will not return correct)
     * Try to use the async executeCommand so nothing will be blocking.
     */
    executeCommandSync(program: string, args) {
        const defer = new Deferred<any>();
        this.ngdesktopfile.waitForDefered(() => {
            this.childProcess.exec(this.makeProgramString(program, args), null, (error, stdout, stderr) => {
                if (error) {
                    defer.reject(stderr);
                    throw error;
                }
                defer.resolve(stdout);
            });
        });
        return defer.promise;
    }

    /**
     * Set clipboard text.
     *
     * @param text to be set in clipboard
     */
    setClipboardContent(text: string) {
        this.electron.clipboard.writeText(text);
    }


    /**
     * Get clipboard text.
     */
    getClipboardContent() {
        return this.electron.clipboard.readText();
    }

    /**
     * Whether application is running as NGDesktop.
     */
    isNGDesktop() {
        return this.electron !== null && this.electron !== undefined;;
    }

    printPDF(path: string, options) {
        this.printer.print(path, options).catch(err => {
            console.log(err);
        });
    }

    /**
     * Returns installed printers on local machine.
     */
    getPrinters() {
        const platform = this.os.platform();
        const printerDefer = new Deferred();
		this.printer.getPrinters().then(printers => {
			if (platform === 'win32') {
				printerDefer.resolve(printers);
			} else {
				const printerList = [];
				printers.forEach(printer => {
					printerList.push({deviceId: printer.printer, name: printer.description});
				});
				printerDefer.resolve(printerList);
			}
		}).catch(err => {
			console.log(err);
			printerDefer.resolve([]);
		});
		return printerDefer.promise;
    }

    /**
     * Returns default printer on local machine.
     */
    getDefaultPrinter() {
        const platform = this.os.platform();
        const printerDefer = new Deferred();
		this.printer.getDefaultPrinter().then(printer => {
			if (platform === 'win32') {
				printerDefer.resolve(printer);
			} else {
				printerDefer.resolve({ deviceId: printer.printer, name: printer.description});
			}
		}).catch(err => {
			console.log(err);
		    printerDefer.resolve(null);
		});
		return printerDefer.promise;
    }

    /**
	 * Manage URLs using their default applications
	 */
    showExternal(url: string) {
        this.shell.openExternal(url);
    }

    /**
	 * Retrieve information from the ngdesktop client
	 * 
	 * @returns a list with client's system information:
	 * 
	 * 		ngDesktopVersion	- string: ngdesktop version
	 * 		osPlatform			- string: can be 'darwin', 'linux', 'freebsd', 'openbsd' and 'win32'
	 * 		osRelease,			- string: kernel release number
	 * 		osTotalMem			- long: total system's memory
	 * 		osFreeMem			- long: total available memory
	 */
	getSystemInformation() 
	{
		const defer = new Deferred<any>();
		this.ngdesktopfile.waitForDefered(() => {
		try {
				this.ipcRenderer.on('get-info-response', (_event, data)  => {
					defer.resolve(data);
				});
				this.ipcRenderer.send('get-info', null);
			} catch (e) {
				defer.resolve(null);
			}
		});
		return defer.promise;
	}

    private makeProgramString(program: string, args: Array<string>) {
        if (program.indexOf(' ') >= 0) program = '"' + program + '"';
        if (args) {
            for (const arg  of args) {
                program += ' ' + arg;
            }
        }
        return program;
    }
}
