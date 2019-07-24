{
	"name": "ngdesktoputils",
	"displayName": "ngdesktoputils",
	"version": 1,
 	"definition": "ngdesktoputils/ngdesktoputils/ngdesktoputils.js",
	"libraries": [],
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
		}
 	}
}