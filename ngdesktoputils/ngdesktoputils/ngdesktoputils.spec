{
	"name": "ngdesktoputils",
	"displayName": "NGDesktop Utils",
	"version": 1,
 	"definition": "ngdesktoputils/ngdesktoputils/ngdesktoputils.js",
	"libraries": [],
	"ng2Config": {
       "packageName": "@servoy/ngdesktoputils",
       "serviceName": "NGDesktopUtilsService",
       "entryPoint": "dist/servoy/ngdesktoputils"
    },
 	"api":
 	{
	   	"exit": 
	   	{
		},
		"executeCommand": {
			"parameters" : [
				{"name":"program", "type":"string"},
				{"name":"args", "type":"object[]"}
			]
		},
		"executeCommandSync": {
			"parameters" : [
				{"name":"program", "type":"string"},
				{"name":"args", "type":"object[]"}
			],
			"returns":"string"
		},
		"setClipboardContent": {
			"parameters": [{ "name": "text", "type": "string" }]
		},
		"getClipboardContent": {
			"returns":"string"
		},
		"isNGDesktop": {
			"returns":"boolean"
		},
		"printPDF": {
            "parameters" : [
                {"name":"path", "type":"string"},
                {"name":"options ", "type":"printoptions", "optional":true}
            ]
        },
        "getPrinters": {
            "returns":"printer[]"
        },
        "getDefaultPrinter": {
            "returns":"printer"
        }
 	},
 	"types": {
        "printer": {
            "deviceId": { "type": "string" },
            "name": { "type": "string" }
        },
        "printoptions": {
            "printer": { "type": "string" },
            "unix": { "type": "string[]" },
            "win32": { "type": "string[]" }
        }
    }
}