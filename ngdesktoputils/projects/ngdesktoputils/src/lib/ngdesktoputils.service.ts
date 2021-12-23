import { Injectable } from '@angular/core';
import { NGDesktopFileService } from '@servoy/ngdesktopfile';
import { Deferred, WindowRefService } from '@servoy/public';

import { LoggerFactory, LoggerService } from '@servoy/public';

import * as child_process from 'child_process';
import * as electron from 'electron';

@Injectable()
export class NGDesktopUtilsService {

    private log: LoggerService;
    private electron: typeof electron;
    private childProcess: typeof child_process;
    private printer: any;
    private remote: typeof electron.remote;
    private shell: electron.Shell;

    constructor(private ngdesktopfile: NGDesktopFileService,
        windowRef: WindowRefService, logFactory: LoggerFactory) {
        this.log = logFactory.getLogger('NGDesktopUtilsService');
        const userAgent = navigator.userAgent.toLowerCase();
        const r = windowRef.nativeWindow['require'];
        if (userAgent.indexOf(' electron/') > -1 && r) {
            this.electron = r('electron');
            this.remote = r('@electron/remote');
            this.childProcess = r('child_process');
            this.printer = r('pdf-to-printer');
            this.shell = r('electron').shell;
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
        this.printer.print(path, options);
    }

    getPrinters() {
        return this.printer.getPrinters();
    }

    getDefaultPrinter() {
        return this.printer.getDefaultPrinter();
    }

    /**
	 * Manage URLs using their default applications
	 */
    showExternal(url: string) {
        this.shell.openExternal(url);
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
