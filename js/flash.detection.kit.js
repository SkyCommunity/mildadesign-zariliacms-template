// Source: http://www.adobe.com/products/flashplayer/download/detection_kit/

// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright 2006 Adobe Systems, Inc. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
    // NS/Opera version >= 3 check for Flash plugin in plugin array
    var flashVer = -1;
    if (navigator.plugins != null && navigator.plugins.length > 0) {
            if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave
    Flash"]) {
                 var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
                 var flashDescription = navigator.plugins["Shockwave Flash" +
    swVer2].description;
                 var descArray = flashDescription.split(" ");
                 var tempArrayMajor = descArray[2].split(".");
                 var versionMajor = tempArrayMajor[0];
                 var versionMinor = tempArrayMajor[1];
                 if ( descArray[3] != "" ) {
                      tempArrayMinor = descArray[3].split("r");
                 } else {
                      tempArrayMinor = descArray[4].split("r");
                 }
                 var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
                 var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
            }
    }
    // MSN/WebTV 2.6 supports Flash 4
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
    // WebTV 2.5 supports Flash 3
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
    // older WebTV supports Flash 2
    else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
    else if ( isIE && isWin && !isOpera ) {
            flashVer = ControlVersion();
    }
    return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater
is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
               versionStr = GetSwfVer();
               if (versionStr == -1 ) {
                    return false;
               } else if (versionStr != 0) {
                    if(isIE && isWin && !isOpera) {
                         // Given "WIN 2,0,0,11"
                         tempArray         = versionStr.split(" "); // ["WIN", "2,0,0,11"]
                         tempString        = tempArray[1];          // "2,0,0,11"
                         versionArray      = tempString.split(","); // ['2', '0', '0', '11']
                    } else {
                         versionArray      = versionStr.split(".");
                    }
                    var versionMajor      = versionArray[0];
                    var versionMinor      = versionArray[1];
                    var versionRevision   = versionArray[2];
// is the major.revision >= requested major.revision AND the minor version >= requested minor
                    if (versionMajor > parseFloat(reqMajorVer)) {
                         return true;
                    } else if (versionMajor == parseFloat(reqMajorVer)) {
                         if (versionMinor > parseFloat(reqMinorVer))
                              return true;
                         else if (versionMinor == parseFloat(reqMinorVer)) {
                              if (versionRevision >= parseFloat(reqRevision))
                                   return true;
                         }
                    }
                    return false;
               }
}
