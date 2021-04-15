{
	"name": "ngdesktoputils",
	"displayName": "NGDesktop Utils",
	"version": 1,
 	"definition": "ngdesktoputils/ngdesktoputils/ngdesktoputils.js",
	"libraries": [],
	"ng2Config": {
       "packageName": "@servoy/ngdesktoputils",
       "serviceName": "NGDesktopUtilsService"
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
		}
 	}
}