/**
 * This will close the NGDesktop main application.
 * Be sure you will call this and after this call application.exit() to close also the client directly itself.
 */
function exit() {
}
/**
 * Executes a command async, the server side call will not block on this call.
 */
function executeCommand(program,args) {
}
/**
 * This executes a command and returns the result of the stdout 
 * This will also call reject when a error happens so the call will error out. (will not return correct)
 * Try to use the async executeCommand so nothing will be blocking.
 * 
 * @param {String} program The command to be executed
 * @param {Array<Object>} args The command arguments
 * 
 * @return {String} The result from standard output.
 */
function executeCommandSync(program,args) {
}

/**
 * Set clipboard text. 
 *
 * @param {string} text to be set in clipboard
 */
function setClipboardContent(text)
{
}

/**
 * Get clipboard text. 
 * 
 * @return {String} The clipboard text.
 */
function getClipboardContent()
{
}

/**
 * Whether application is running as NGDesktop. 
 * 
 * @return {Boolean} True if app running inside NGDesktop, false otherwise.
 */
function isNGDesktop()
{
}

 /**
 * Prints a pdf document specified by path. Optionally, specify printer or unix print options (lp command) or windows print options see: https://github.com/Servoy/pdf-to-printer
 */
function printPDF (path, options) 
{
}

/**
 * Returns installed printers on local machine.
 * 
 * @return {Array<CustomType<ngdesktoputils.printer>>} An array of printer objects.
 */
function getPrinters()
{
}
/**
 * Returns default printer on local machine.
 * 
 * @return {CustomType<ngdesktoputils.printer>} The default printer object.
 */
function getDefaultPrinter() 
{
}
/**
 * Manage URLs using their default applications
 * 
 * @param {String} url The URL to be opened.
 */
function showExternal(url)
{
}

/**
 * Retrieve information from the ngdesktop client
 * 
 * @return {CustomType<ngdesktoputils.sysinfo>} an object containing the client's system information:
 * 
 *     ngDesktopVersion    - string: ngdesktop version
 *     osPlatform          - string: can be 'darwin', 'linux', 'freebsd', 'openbsd' and 'win32'
 *     osRelease           - string: kernel release number
 *     osTotalMem          - long: total system's memory
 *     osFreeMem           - long: total available memory
 */
function getSystemInformation() 
{
}


var svy_types = {

    /**
   * Contains system information from the NGDesktop client.
   */
  sysinfo: {
    /**
     * The version of Electron used by NGDesktop.
     */
    electronVersion: null,
    /**
     * The NGDesktop version.
     */
    ngDesktopVersion: null,
    /**
     * The operating system platform (e.g. 'darwin', 'win32', etc.).
     */
    osPlatform: null,
    /**
     * The operating system release version.
     */
    osRelease: null,
    /**
     * The total system memory in bytes.
     */
    osTotalMem: null,
    /**
     * The available (free) system memory in bytes.
     */
    osFreeMem: null,
  },
  
  /**
   * Contains printer information.
   */
  printer: {
    /**
     * The device identifier for the printer.
     */
    deviceId: null,
    /**
     * The name of the printer.
     */
    name: null,
    /**
     * An array of supported paper sizes.
     */
    paperSizes: null,
  },
  
  /**
   * Contains print options for different platforms.
   */
  printoptions: {
    /**
     * The printer identifier or name to use.
     */
    printer: null,
    /**
     * An array of Unix-specific printing options.
     */
    unix: null,
    /**
     * An array of Windows-specific printing options.
     */
    win32: null,
  }
}
