$(document).ready(function () {

  var BrowserDetect = {
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || "unknown-browser";
      this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        || "unknown-browser-version";
      this.OS = this.searchString(this.dataOS) || "unknown-os";
    },
    searchString: function (data) {
      for (var i = 0; i < data.length; i++) {
        var dataString = data[i].string;
        var dataProp = data[i].prop;
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1)
            return data[i].identity;
        }
        else if (dataProp)
          return data[i].identity;
      }
    },
    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return;
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
      {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      },
      {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
      },
      {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      },
      {
        prop: window.opera,
        identity: "Opera"
      },
      {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
      },
      {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      },
      {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      },
      {   // for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
      },
      {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
      },
      {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
      },
      {     // for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
      }
    ],
    dataOS: [
      {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
      },
      {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
      },
      {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone"
      },
      {
        string: navigator.userAgent,
        subString: "iPod",
        identity: "iPod"
      },
      {
        string: navigator.userAgent,
        subString: "iPad",
        identity: "iPad"
      },
      {
        string: navigator.userAgent,
        subString: "Andriod",
        identity: "Andriod"
      },
      {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
      }
    ]

  };
  BrowserDetect.init();

  var browser_str = '' + BrowserDetect.browser + '';
  var browser_str_lower = browser_str.toLowerCase();

  var browser_ver_str = '' + BrowserDetect.browser + '-' + BrowserDetect.version + '';
  var browser_ver_str_lower = browser_ver_str.toLowerCase();

  var os_str = '' + BrowserDetect.OS + '';
  var os_str_lower = os_str.toLowerCase();

  $('body').addClass(browser_str_lower);
  $('body').addClass(browser_ver_str_lower);
  $('body').addClass(os_str_lower);

});

/*
     FILE ARCHIVED ON 04:00:11 Aug 14, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:48:31 Jul 26, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 84.905 (3)
  esindex: 0.018
  captures_list: 104.023
  CDXLines.iter: 13.145 (3)
  PetaboxLoader3.datanode: 99.267 (4)
  exclusion.robots: 0.176
  exclusion.robots.policy: 0.164
  RedisCDXSource: 1.686
  PetaboxLoader3.resolve: 170.596
  load_resource: 189.779
*/