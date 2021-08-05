var _defaultHost="http://"+window.location.host+"/v3.13/";
//var _defaultHost="http://"+window.location.host+"/facebook/qa/v3.6/";
function LoadCSSFile(filename){
    var fileref=document.createElement("link");
    fileref.setAttribute("rel","stylesheet");
    fileref.setAttribute("type","text/css");
    fileref.setAttribute("href","css/"+filename);
    if(typeof fileref!="undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref)
        }
    }
var _token="";
var _user_name="";
var _user_id="";
var _GlobalKeys={
    User_name:"Facebook_user_name",
    User_id:"Facebbok_user_id",
    User_token:"Facebook_User_token",
    Last_Visit_Tab:"Facebook_Last_Visit_Tab",
    LoginStatus:"Facebook_Login_Status",
    LastMessageChoise:"Facebook_Last_Message_Choice",
    User_locale:"Facebook_User_Locale"
};

var _BrowserType={
    IE6:"IE6",
    IE7:"IE7",
    IE8:"IE8",
    IE9: "IE9",
    IE10: "IE10",
    IE7Vista:"IE7Vista",
    Firefox:"Firefox",
    FirefoxLinux:"FirefoxLinux",
    FirefoxMac:"FirefoxMac",
    Safari:"Safari",
    Chrome:"Google Chrome",
    ChromeMac:"Google Chrome Mac",
    ChromeLinux:"Google Chrome Linux"
};

function GetBrowserType(){
    var strAgent=navigator.userAgent;
    if(strAgent.indexOf("MSIE")!=-1){
        var version=parseFloat(strAgent.split("MSIE")[1]);
        if(version=="6"){
            return _BrowserType.IE6;
        }
        else if(version=="7"){
            if(strAgent.indexOf('Windows NT 6.0')!=-1){
                return _BrowserType.IE7Vista;
            }else{
                return _BrowserType.IE7;
            }
        }
    else if(version=="8"){
        return _BrowserType.IE8;
    }else if(version=="9"){
        return _BrowserType.IE9;
    }
    else if (version == "10") {
        return _BrowserType.IE10;
    }
}
else if(strAgent.indexOf("Firefox")!=-1){
    if(navigator.platform.indexOf("Linux")!=-1){
        return _BrowserType.FirefoxLinux
        }
    else if(navigator.platform.indexOf("Mac")!=-1){
        return _BrowserType.FirefoxMac;
    }else{
        return _BrowserType.Firefox;
    }
}
else if(window.devicePixelRatio)
{
    if(escape(navigator.javaEnabled.toString())=='function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D')

    {
        if(navigator.platform.indexOf("Mac")!=-1){
            return _BrowserType.ChromeMac;
        }else if(navigator.platform.indexOf("Linux")!=-1){
            return _BrowserType.ChromeLinux
            }else{
            return _BrowserType.Chrome;
        }
    }
else if(escape(navigator.javaEnabled.toString())!='function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D')
{
    return _BrowserType.Safari;
}
}
return _BrowserType.IE8;
}
var _browserType=GetBrowserType();
function returnDocument(){
    var file_name=document.location.href;
    var end=(file_name.indexOf("?")==-1)?file_name.length:file_name.indexOf("?");
    return file_name.substring(file_name.lastIndexOf("/")+1,end);
}
if(returnDocument()=='gadget.html'){
    if(_browserType==_BrowserType.IE7||_browserType==_BrowserType.IE8||_browserType==_BrowserType.IE7Vista){
        LoadCSSFile('ie.css');
    }
}
function getURLParam(strParamName){
    var strReturn="";
    var strHref=window.location.href;
    if(strHref.indexOf("?")>-1){
        var strQueryString=strHref.substr(strHref.indexOf("?")).toLowerCase();
        var aQueryString=strQueryString.split("&");
        for(var iParam=0;iParam<aQueryString.length;iParam++){
            if(aQueryString[iParam].indexOf(strParamName.toLowerCase()+"=")>-1){
                var aParam=aQueryString[iParam].split("=");
                strReturn=aParam[1];
                break;
            }
        }
        }
return strReturn;
}
function toUnicode(theString){
    var unicodeString='';
    for(var i=0;i<theString.length;i++){
        var theUnicode=theString.charCodeAt(i).toString(16).toUpperCase();
        while(theUnicode.length<4){
            theUnicode='0'+theUnicode;
        }
        theUnicode='0x'+theUnicode;
        if(i<theString.length-1)theUnicode+=",";
        unicodeString+=theUnicode;
    }
    return unicodeString;
}
function fromUnicode(theString){
    var arr=theString.split(',');
    var rez=String.fromCharCode.apply(this,arr);
    return rez;
}