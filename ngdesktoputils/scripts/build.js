var AdmZip = require('adm-zip');

// creating archives
var zip = new AdmZip();

zip.addLocalFolder("./META-INF/", "/META-INF/");
zip.addLocalFolder("./dist/servoy/ngdesktoputils/", "/dist/servoy/ngdesktoputils/");
zip.addLocalFolder("./ngdesktoputils/", "/ngdesktoputils/");
zip.writeZip("ngdesktoputils.zip");