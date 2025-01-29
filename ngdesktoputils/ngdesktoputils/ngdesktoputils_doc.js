/**
 * This will close the NGDesktop main application.
 * Be sure you will call this and after this call application.exit() to close also the client directly itself.
 */
function exit() {
}
/**
 * Executes a command async, the server side call will not block on this call.
 * 
 * @param {String} program The executable or command to run.
 * @param {Array<Object>} args An array of arguments to pass to the command.
 */
function executeCommand(program,args) {
}
/**
 * This executes a command and returns the result of the stdout 
 * This will also call reject when a error happens so the call will error out. (will not return correct)
 * Try to use the async executeCommand so nothing will be blocking.
 * 
 * @param {String} program The executable or command to run.
 * @param {Array<Object>} args An array of arguments to pass to the command.
 * @return {String} The standard output result of the executed command.
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
 * @return {String} The current text content stored in the clipboard.
 */
function getClipboardContent()
{
}

/**
 * Whether application is running as NGDesktop. 
 * 
 * @return {Boolean} True if the application is running in NGDesktop mode; otherwise, false.
 */
function isNGDesktop()
{
}

 /**
 * Prints a pdf document specified by path. Optionally, specify printer or unix print options (lp command) or windows print options see: https://github.com/Servoy/pdf-to-printer
 * 
 * @param {String} path The file path of the PDF document to be printed.
 * @param {CustomType<ngdesktoputils.printoptions>} [options] Optional print settings, including printer selection and specific print parameters for Unix (lp command) or Windows.
 */
function printPDF (path, options) 
{
}

/**
 * Returns installed printers on local machine.
 * 
 * @return {Array<CustomType<ngdesktoputils.printer>>} An array of printer objects representing installed printers.
 */
function getPrinters () 
{
}
/**
 * Returns default printer on local machine.
 * 
 * @return {CustomType<ngdesktoputils.printer>} The default printer object.
 */
function getDefaultPrinter () 
{
}
/**
 * Manage URLs using their default applications
 * 
 * @param {String} url The URL to be opened in the default web browser or application.
 */
function showExternal (url)
{
}

/**
 * Retrieve information from the ngdesktop client
 * 
 * @return {CustomType<ngdesktoputils.sysinfo>} An object containing the client's system information:
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
