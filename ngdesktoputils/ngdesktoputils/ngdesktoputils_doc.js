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
 */
function getClipboardContent()
{
}

/**
 * Whether application is running as NGDesktop. 
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
 */
function getPrinters () 
{
}
/**
 * Returns default printer on local machine.
 */
function getDefaultPrinter () 
{
}
/**
 * Manage URLs using their default applications
 * 
 * @param {String} url 
 */
function showExternal (url)
{
}

/**
 * Retrieve information from the ngdesktop client
 * 
 * @return an object containing the client's system information:
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

    sysinfo: {

        electronVersion : null,

        ngDesktopVersion : null,

        osPlatform : null,

        osRelease : null,

        osTotalMem : null,

        osFreeMem : null,

    },

    printer: {

        deviceId : null,

        name : null,

        paperSizes : null,

    },

    printoptions: {

        printer : null,

        unix : null,

        win32 : null,

    }
}
