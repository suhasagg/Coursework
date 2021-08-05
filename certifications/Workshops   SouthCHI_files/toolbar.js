var versionFolder='v3.13';
var icon = '';
function toolbarInit(){
    RegisterForMessaging('key');
    try{        
        var mode=getURLParam('mode');
        var value=document.getElementById('mainDivToolbar');
        var notif=document.getElementById('notifyDivAreaToolbar');
        if(mode==1){
            value.onclick=firstMode;
            notif.onclick=firstMode;
        }else{
            value.onclick=secondMode;
            notif.onclick=secondMode;
        }
        configIcon();
        getNotification();
        showFirstNotification();
        if(RetrieveGlobalKey(_GlobalKeys.User_token) != null && RetrieveGlobalKey(_GlobalKeys.User_token) != '' && RetrieveGlobalKey(_GlobalKeys.User_token) != 'none' && RetrieveGlobalKey(_GlobalKeys.User_token) != '0'){
            sendCTID();
        }
    }catch(e){
    //alert(JSON.stringify(e));
    }
    
}

function sendCTID(){
    try{
        var info = GetInfo();
        if(info.context.host == "Toolbar"){
            var ctid=GetToolbarId();
            if(ctid == null || ctid == 'null' || ctid == undefined){
                return;
            }
        }else{
            var ctid = "Engine";
        }
    }catch(r){
        var ctid=GetToolbarId();
        if(ctid == null || ctid == 'null' || ctid == undefined){
            return;
        }
    }
    var track = RetrieveGlobalKey("Facebook_ctid_Connect_send_n");    
    if(track == null || track == ''){
        var fuid = RetrieveGlobalKey("Facebbok_user_id");        
        var trackLink = 'http://social.conduit.com/ClientServices/SetConnectedUser.ashx?fuid='+ fuid +'&ctid=' + ctid;
        trackLink = '<iframe  src="'+ trackLink +'" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:1px; height:1px;" allowTransparency="true"></iframe>';
        document.getElementById("mainBody").innerHTML = trackLink;
        StoreGlobalKey("Facebook_ctid_Connect_send_n","sended");
    }
    
    return;
   
    var tmp = false;
    if(identityStorage === true){
        if(info.context.host == "Toolbar"){
            var browser = info.general.browser;
            var tver = info.general.toolbarVersion;
            tver = tver.replace(/\./g, '').toString();
            if(tver.length < 5){
                for(var i = 0; i < (5 - tver.length); i++){
                    tver += '0';
                }
            }
            switch(browser){
                case 'Firefox':{
                    if(Number(tver) >= 33113){
                        ctid += '&trigger=operational';
                        tmp = true;
                    }
                    break;
                }
                case 'IE':{
                    if(Number(tver) >= 63217){
                        ctid += '&trigger=operational';
                        tmp = true;
                    }
                    break;
                }
                default:
                    break;
            }
        }
    }
    var type = RetrieveGlobalKey("Facebook_ctid_Connect_send_new_type");
    if(type != null && type != tmp.toString()){
        StoreGlobalKey("Facebook_ctid_Connect_send_new","");
    }
    if(RetrieveGlobalKey("Facebook_ctid_Connect_send_new") == null || RetrieveGlobalKey("Facebook_ctid_Connect_send_new") == ''){
        var trackLink = 'http://social.conduit.com/FacebookLogin.aspx?sendaccesstoken=true&source=toolbar_application&display=Popup&type=login&home=&perms=toolbar_application&ctid=' + ctid;
        trackLink = '<iframe  src="'+ trackLink +'" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:1px; height:1px;" allowTransparency="true"></iframe>';
        document.getElementById("mainBody").innerHTML = trackLink;
        StoreGlobalKey("Facebook_ctid_Connect_send_new","sended");
        StoreGlobalKey("Facebook_ctid_Connect_send_new_type", tmp.toString());
    }
}

function configIcon(){
    try{        
        var info = GetInfo();        
        var mini = document.getElementById('mainDivToolbar');      
        var notHeightIcon = 11;
        var heigt = GetCurrentHeight();        
        if(info.context.host == "Engine"){
            //ChangeWidth(28);
            mini.style.width = '24px';
            document.body.style.width = '27px';
            icon = 24;
            mini.style.height = '24px';
            mini.style.background = 'url(\''+ versionFolder +'/images/24x24.png\') 0 0 no-repeat';
            mini.style.top = (heigt-24)/2 + "px";
            document.getElementById('notifyDivAreaToolbar').style.top = ((heigt-24)/2 + 24-notHeightIcon) + "px";
        //$(".notifyToolbar").css("top",((heigt-24)/2 + 24-notHeightIcon) + "px");
        }else{
            //ChangeWidth(26);
            mini.style.width = '24px';
            icon = 24;
            document.body.style.width = '27px';
            mini.style.height = '24px';
            mini.style.background = 'url(\''+ versionFolder +'/images/24x24.png\') 0 0 no-repeat';
            mini.style.top = (heigt-24)/2 + "px";
            document.getElementById('notifyDivAreaToolbar').style.top = ((heigt-24)/2 + 24-notHeightIcon) + "px";
        //document.getElementById('notifyDivAreaToolbar').style.top = ((heigt-20)/2 + 20-notHeightIcon + 2) + "px";
        //$(".notifyToolbar").css("top",((heigt-20)/2 + 20-notHeightIcon + 2) + "px");

        }
    }catch(e){
        //ChangeWidth(28);
        mini.style.width = '24px';
        icon = 24;
        document.body.style.width = '27px';
        mini.style.height = '24px';
        mini.style.background = 'url(\''+ versionFolder +'/images/f_icon.png\') 0 0 no-repeat';
        mini.style.top = (heigt-24)/2 + "px";
        document.getElementById('notifyDivAreaToolbar').style.top = ((heigt-24)/2 + 24-notHeightIcon) + "px";
    //$(".notifyToolbar").css("top",((heigt-24)/2 + 24-notHeightIcon) + "px");
    }
}

function firstMode(){
    OpenGadgetWindow('facebook.html',1);
}
function secondMode(){
    OpenGadgetWindow('gadget.html',2);
}
function EBGlobalKeyChanged(key,value){       
    //    var keyMode=RetrieveGlobalKey('Facebook_Mode');
    //    var UrlMode=getURLParam('mode');
    if(key.indexOf('FacebookNotifications') != -1){
        getNotification();
    }
    if(key == 'Facebook_V10_Close'){
        try {
            if(toolbarVer.check){
                var ver = convert(GetVersion().split('.')).join(''),
                st = convert(toolbarVer.start.split('.')).join(''),
                end = convert(toolbarVer.stop.split('.')).join('');
                    
                if((Number(ver) >= Number(st) && Number(ver) <= Number(end))){
                    OpenGadgetWindow('gadget.html',2);
                }
            }
        } catch (e) {}
    //        try {
    //            var v = Number(GetVersion().split('.')[0]);
    //            if (v >= 10) {
    //                OpenGadgetWindow('gadget.html',2);
    //            }
    //        } catch (e) {}
    }
////}else if(key.indexOf('Facebook_LoggedIn') != -1 && value == "yes" && (_browserType == _BrowserType.Chrome || _browserType == _BrowserType.ChromeLinux || _browserType == _BrowserType.ChromeMac)){                    
//        OpenGadgetWindow('gadget.html',2);
//    }
    

}
function convert(arr){
    for(var j = 0; j < arr.length; j++){
        if(arr[j].length < 2)
            arr[j] = '0'+arr[j];
    }
    return arr;
}
function getNotification(){
    _token=RetrieveGlobalKey(_GlobalKeys.User_token);
    _user_id=RetrieveGlobalKey(_GlobalKeys.User_id);
    var notiFyDivArea=document.getElementById('notifyDivAreaToolbar');
    if(_token!=null&&_token!=''&& _token!="none"){
        FB.api({
            method:'fql.multiquery',
            queries:{
                "message":'SELECT unread_count FROM mailbox_folder WHERE folder_id = 0 AND viewer_id ='+_user_id,
                "friendsRquests":'SELECT uid_from FROM friend_request WHERE uid_to='+_user_id,
                "notifications":'SELECT notification_id FROM notification WHERE recipient_id = ' + _user_id + 'AND is_unread = 1 AND is_hidden = 0'                
            },
            access_token:_token
        },function(response){          
            if(response.error_code==null){                
                var numMessage=response[1].fql_result_set[0].unread_count;
                if(numMessage==null){
                    numMessage=0;
                }
                var numFriends=response[0].fql_result_set.length;
                if(numFriends==null){
                    numFriends=0;
                }
                var numNotifyNumber=response[2].fql_result_set.length;				
                if(numNotifyNumber==null || numNotifyNumber == 0){
                    numNotifyNumber=0;
                }else{
                    var lustRecieve=(RetrieveGlobalKey("Facebook_Lust_Recieve"))?RetrieveGlobalKey("Facebook_Lust_Recieve"):'';
                    var current='';
                    for(var l=0;l<response[2].fql_result_set.length;l++){
                        current+=response[2].fql_result_set[l].notification_id+',';
                    }
                    if(current!=null&&current!=""){
                        var curArray=current.split(",");
                        var newArray=lustRecieve.split(",");
                        var j=0;
                        var found=0;
                        for(j=0;j<newArray.length;j++){
                            for(var k=0;k<curArray.length;k++){
                                if(newArray[j]==curArray[k]){
                                    found++;
                                    break;
                                }
                            }
                        }
                    }					
                    numNotifyNumber-=found-1;
                }
                var numn=Number(numMessage)+Number(numFriends)+Number(numNotifyNumber);				
                if(numn>0){
                    StoreGlobalKey("facebook_toolbar_Not_Numer",numn.toString());
                    var notifyConteiner=document.createElement('div');
                    notifyConteiner.style.cssText='font-size: 9px;font-family: Arial;font-weight: bold;color:white; text-align: center;';
                    notifyConteiner.style.height='11px';
                    notiFyDivArea.style.height='11px';
                    notiFyDivArea.innerHTML='';
                    //            switch(_browserType){
                    //                case _BrowserType.FirefoxMac:
                    //                    notiFyDivArea.style.top='14px';
                    //                    break;
                    //                default:
                    //                    notiFyDivArea.style.top='15px';
                    //                    break;
                    //            }
                    if(numn>=10&&numn<100){
                        notifyConteiner.style.width='17px';
                        notifyConteiner.style.background='url('+versionFolder+'/images/2digits.png) 0 0 no-repeat';
                        notiFyDivArea.style.width='17px';
                        if(BrowserDetect.browser == "Internet Explorer" && icon == 24){
                            notiFyDivArea.style.left = "10px";
                        }else if(BrowserDetect.browser == "Internet Explorer" && icon == 20){
                            notiFyDivArea.style.left = "6px";
                        }
                    }else if(numn<10){
                        notifyConteiner.style.width='11px';
                        notifyConteiner.style.background='url('+versionFolder+'/images/1digit.png) 0 0 no-repeat';
                        notiFyDivArea.style.width='11px';
                        if(BrowserDetect.browser == "Internet Explorer" && icon == 24){
                            notiFyDivArea.style.left = "16px";
                        }else if(BrowserDetect.browser == "Internet Explorer" && icon == 20){
                            notiFyDivArea.style.left = "12px";
                        }
                    }else if(numn>=100&&numn<1000){
                        numn='99+';
                        notifyConteiner.style.width='22px';
                        notifyConteiner.style.background='url('+versionFolder+'/images/3digits.png) 0 0 no-repeat';
                        notiFyDivArea.style.width='22px';
                        if(BrowserDetect.browser == "Internet Explorer" && icon == 24){
                            notiFyDivArea.style.left = "5px";
                        }else if(BrowserDetect.browser == "Internet Explorer" && icon == 20){
                            notiFyDivArea.style.left = "1px";
                        }
                    }else if(numn>=1000){
                        numn='999+';
                        notifyConteiner.style.width='28px';
                        notifyConteiner.style.background='url('+versionFolder+'/images/4digits.png) 0 0 no-repeat';
                        notiFyDivArea.style.width='28px';
                        if(BrowserDetect.browser == "Internet Explorer" && icon == 24){
                            notiFyDivArea.style.left = "0px";
                        }else if(BrowserDetect.browser == "Internet Explorer" && icon == 20){
                            notiFyDivArea.style.left = "0px";
                        }
                    }
                    notiFyDivArea.appendChild(notifyConteiner);
                    setTimeout(function(){
                        notifyConteiner.innerHTML=numn;
                    },100);
                    

                }else{
                    notiFyDivArea.innerHTML='';
                }
            }
        });
        setTimeout(getNotification,300000);
    }else{
        notiFyDivArea.innerHTML='';
    }
}

function showFirstNotification(){    
    if(_token == null || _token == '' || _token == "none"){
        var firstTime = RetrieveGlobalKey("Facebook_First_Visit");
        if(firstTime == null || firstTime == ''){
            configIcon();
            var notifyConteiner=document.createElement('div');
            var notiFyDivArea=document.getElementById('notifyDivAreaToolbar');
            notiFyDivArea.style.height='11px';
            notiFyDivArea.innerHTML='';
            notifyConteiner.style.cssText='font-size: 9px;font-family: Arial;font-weight: bold;color:white; text-align: center;';
            notifyConteiner.style.height='11px';
            notifyConteiner.style.width='11px';
            notifyConteiner.style.background='url('+versionFolder+'/images/1digit.png) 0 0 no-repeat';
            notiFyDivArea.style.width='11px';
            if(BrowserDetect.browser == "Internet Explorer" && icon == 24){
                notiFyDivArea.style.left = "16px";
            }else if(BrowserDetect.browser == "Internet Explorer" && icon == 20){
                notiFyDivArea.style.left = "12px";
            }
            notiFyDivArea.appendChild(notifyConteiner);
            setTimeout(function(){
                notifyConteiner.innerHTML = '1';
            },100)
            
        }
    }
}

function OpenGadgetWindow(url,mode){
    var t='';
    var c='';
    switch(mode){
        case 1:
            t='0';
            c='0';
            break;
        case 2:
            t='1';
            c='1';
            break;
        default:
            t='0';
            c='0';
            break;
    }
    var width=409;
    var height=453;
    if(BrowserDetect.browser=="Internet Explorer"&&BrowserDetect.version=="6"){
        NavigateInMainFrame(_defaultHost+"UpgradeBrowser/UpgradeBrowser.html");
        CloseFloatingWindow();
        return;
    }
    switch(_browserType){
        case _BrowserType.FirefoxLinux:{
            
            if(mode==1)

            {
                width=407;
                height=447;
            }else{
                width=407;
                height=448;
                
            }
            break;
        }
        case _BrowserType.FirefoxMac:{
            
            width=407;
            height=451;
            break;
        }
    case _BrowserType.IE10: 
        {

            if (mode == 1) {
                width = 430;
                height = 510;
            } else {
                width = 421;
                height = 505;
            }
            break;
        }
        case _BrowserType.IE9:{
            
            if(mode==1){
                width=425;
                height=500;
            }else{
                width=411;
                height=495;
            }
            break;
        }
        case _BrowserType.IE8:{
            
            width=409;
            height=494;
            break;
        }
        case _BrowserType.IE7:{
            
            if(mode==1){                
                width=409;
                height=492;            
            }else{
                width=409;
                height=494;
                
            }
            break;
        }
        case _BrowserType.IE7Vista:{
            
            if(mode==1){
                width=409;
                height=492;
            }else{
                width=409;
                height=494;
                
            }
            break;
        }
        case _BrowserType.Safari:{
            
            if(mode==1)

            {
                width=412;
                height=454;
            }else{
                width=409;
                height=490;
                
            }
            break;
        }
        default:{
            
            break;
        }
    }        
    try{
        switch(_browserType){
            case _BrowserType.Firefox:case _BrowserType.FirefoxLinux:case _BrowserType.Safari:{
        
                OpenGadget(_defaultHost+url + "?fromToolbar=yes",width,height,'resizable=0,hscroll=0,vscroll=0,titlebar='+t+',closebutton='+c+',saveresizedsize=0,openposition=alignment:(B;L),savelocation=0,closeonexternalclick=0');
                break;
            }
            case _BrowserType.IE8:case _BrowserType.IE7:case _BrowserType.IE9:case _BrowserType.IE7Vista:{
        
                OpenGadget(_defaultHost+url + "?fromToolbar=yes",width,height,'resizable=0,hscroll=0,vscroll=0,titlebar='+t+',closebutton='+c+',saveresizedsize=0,openposition=alignment:(B;L),savelocation=0,closeonexternalclick=0');
                break;
            }
            case _BrowserType.FirefoxMac:{
        
                OpenGadget(_defaultHost+url + "?fromToolbar=yes",width,height,'resizable=0,hscroll=0,vscroll=0,titlebar='+t+',closebutton='+c+',saveresizedsize=1,openposition=alignment:(B;L),savelocation=0,closeonexternalclick=0');
                break;
            }
            default:{
                var info = GetInfo();
                if(BrowserDetect.browser == 'Chrome' && info.context.host == 'Toolbar'){
                    height += 15;
                }
                OpenGadget(_defaultHost+url + "?fromToolbar=yes",width,height,'hscroll=0,vscroll=0,openposition=alignment:(B;L),savelocation=0, saveresizedsize=0,closeonexternalclick=0,titlebar='+t+',closebutton='+c+',resizable=no');
                break;
            }
        }
    }catch(e){
       
    }
}

function EBMessageReceived(key,data){}