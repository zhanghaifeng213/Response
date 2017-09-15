/* SiteCatalyst code version: H.27.5.
Copyright 1996-2014 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */




/*
 * param : No
 * return : Device Type 
 * Descriptioin : present device type return
 */
function getOmniDeviceType(){
	var deviceType = "";
	var windowWidth = $(window).width();
	if(windowWidth < 768){
		deviceType = "mobile";
	}else if(windowWidth <= 1280){
		deviceType = "tablet";
	}else{
		deviceType = "desktop";
	}
	return deviceType;
}
/**
 * [param description] :  No param
 * return : according to the existence of the instore URL, send the return value;
 * 
 */
function isOmniInstore(){
	if(window.location.pathname.split("/")[2] != undefined && window.location.pathname.split("/")[2].indexOf("instore")!=-1){
		return true;
	}else{
		return false;
	}
}

/*param :No
	return : Each return value according to the section
*/
function getOmniTopSection(){
	splitURL = getOmniSplitUrl();
	
	if(splitURL[2]!=undefined && splitURL[2].indexOf("business")!=-1){
		return "business";
	}else if(splitURL[2]!=undefined && splitURL[2].indexOf("support")!=-1){
		return "support";
	}else{
		return "";
	}
}

/*
* param : No
* return : splitURL return  ex)["stgweb3.samsung.com", "common", "js", "omni", "ng_home.html"]
* Description :  manipulate URL
*/
function getOmniSplitUrl(){
	var URL = window.location.href;
	var splitURL=URL.split(window.location.protocol+"//")[1].split("#")[0].split("?")[0].split("/");
	for(i=0;i<splitURL.length;i++){
		if(splitURL[i]===""){
			splitURL.pop();
		}
	}
	return splitURL;
}

function initVars(){
	s.pageName = s.prop1 = s.prop2 = s.prop3 = s.prop4 = s.prop5 ="";
	s.channel = s.eVar1 = s.eVar2 = s.eVar3 = s.eVar4 =s.eVar5 = s.eVar6 = s.eVar40= s.eVar65 = s.eVar66 = s.eVar69 = "";
	s.prop6 = s.events = s.hier1 = s.prop9 = s.prop10 = s.eVar10 = s.eVar54 = s.prop14 = "";
	s.prop39 = s.prop40=s.eVar38=s.products=s.prop8="";
	s.eVar8=s.eVar11=s.eVar12=s.eVar13=s.eVar14=s.eVar15=s.eVar41=s.events=count="";
	s.eVar43="";
}

function printOmniLog(message){
	var userAgent = window.navigator.userAgent.toLowerCase();
	if( userAgent.indexOf("chrome") != -1 ){
		if (console.debug != undefined) {
			console.debug("[Omniture Log] : " + message);
		}
	}
}

/**
 * parma : No
 * return : instore ShopId
 * Description : instore ShopId in URL will return
 */
function getOmniShopId(){
	var shopId = window.location.pathname.split("/")[3];
	var shopIdParam = "";
	var shopIdCookie = "";
	
	shopIdParam = getOmniUrlParam("sid").toLowerCase();
	
	if(shopIdParam.indexOf("q") != -1){	// QR Code
		printOmniLog("Instore QR CODE");
		s.eVar51 = "qrcode";
		shopId = shopIdParam.split("q")[0];
		s.c_w("instore_omni_shopId", shopId, 0);
	}else if(shopIdParam.indexOf("n") != -1){	// NFC
		printOmniLog("Instore NFC");
		s.eVar51 = "nfc";
		shopId = shopIdParam.split("n")[0];
		s.c_w("instore_omni_shopId", shopId, 0);
	}else if(shopIdParam.indexOf("w") != -1){	// WiFi
		printOmniLog("Instore WiFi");
		s.eVar51 = "wifi";
		shopId = shopIdParam.split("w")[0];
		s.c_w("instore_omni_shopId", shopId, 0);
	}else if(shopIdParam.indexOf("c") != -1){	// Catalog
		printOmniLog("Instore Catalog");
		s.eVar51 = "catalog";
		shopId = shopIdParam.split("c")[0];
		s.c_w("instore_omni_shopId", shopId, 0);
	}else if((shopIdCookie = getOmniCookie("instore_omni_shopId")) != ""){
		printOmniLog("shopId Cookie : " + shopIdCookie);
		shopId = shopIdCookie;
	}
	
	return shopId;
}

 /*
 * param : No
 * return : Site Code
 * Descriptioin : the Site Code part of the URL will return 
 */
function getOmniSiteCd(){
	var siteUrl = document.URL;
	var splitUrl;
	var siteCd;
	try {
		splitUrl = siteUrl.split("#")[0].split("/");
		siteCd = splitUrl[3];
	} catch(e) {
		siteCd = "etc";
	}
	//Live - japan
	if (splitUrl[2]!=undefined && splitUrl[2].indexOf("japan.samsung.com")!=-1) {
		siteCd = "jp";
	}
	
	/* JP - dev.galaxymobile.jp/galaxymobile.jp */
	if (splitUrl[2] != undefined && ( splitUrl[2].indexOf("galaxymobile.jp") != -1))
	{
		siteCd = "jp";
	} 
	
	//stgweb4 - japan
	if (splitUrl[2]!=undefined && splitUrl[2].indexOf("stgweb4.samsung.com")!=-1 && splitUrl[3].indexOf("japan")!=-1) {
		siteCd = "jp";
	}
	//Origin2 - japan
	if (splitUrl[2]!=undefined && splitUrl[2].indexOf("japan-origin.samsung.com")!=-1) {
		siteCd = "jp";
	}
	//live cn support
	if (splitUrl[2]!=undefined && splitUrl[2].indexOf("support-cn.samsung.com")!=-1) {
		siteCd = "cn";
	}
		//mySamsung - EU
	if (splitUrl[2]!=undefined && splitUrl[2].indexOf("my.eu.samsung.com")!=-1)
	{
		siteCd = getOmniUrlParam("language");
	}
			 	//sec local page
	if (splitUrl[2]!=undefined && splitUrl[2].indexOf("local.sec.samsung.com")!=-1)
	{
		siteCd = "sec";
	}
	//live ru support
	if (splitUrl[2]!=undefined && splitUrl[2].indexOf("support.ru.samsung.com")!=-1)
	{
		siteCd = "ru";
	}
	//mySamsung - ca ca_fr
	if (splitUrl[2]!=undefined && splitUrl[2].indexOf("support-ca.samsung.com")!=-1)
	{
		siteCd = getOmniUrlParam("lang");
	}
	
	/* SEC B2B */
	if (splitUrl[2]!=undefined && ( splitUrl[2].indexOf("www.samsungb2b.co.kr")!=-1 || splitUrl[2].indexOf("dev.local.samsungb2b.co.kr")!=-1 ))
	{
		siteCd = "sec";
	}	
	
	/* CN Store */
	if (splitUrl[2] != undefined && ( splitUrl[2].indexOf("samsungshop.com.cn") != -1))
	{
		siteCd = "cn";
	} 

	/* Latin Shop */
	if (splitUrl[2] != undefined && ( splitUrl[2].indexOf("samsunglatin.store") != -1))
	{
		siteCd = "latin";
	} 
	
	return siteCd;
}


/*
 * param :No
 * return : Account Site Code that is used in Omniture code
 * Descriptioin : Site Code that is trasformed ( uk -> uk, ca_fr -> cafr )
 */
function getOmniAccountSiteCd(){
	var siteCd;
	var accountSiteCd;
	try {
		siteCd = getOmniSiteCd();
		siteCd = siteCd.replace("_", "");
		accountSiteCd = siteCd;
	} catch(e) {
		accountSiteCd = "etc";
	}
	return accountSiteCd;
}

/*
 * param : Cookie name
 * return : Cookie Value
 * Descriptioin : Cookie value return
 */
function getOmniCookie(cookieName){
	var cookieVal = "";
	var searchParam = cookieName + "=";
	
	if (document.cookie.length > 0){
		offset = document.cookie.indexOf(searchParam);
		if (offset != -1){
			offset += searchParam.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			cookieVal = unescape(document.cookie.substring(offset, end));
		}
	}
	return cookieVal;
}

/*
 * param :Cookie name, value, duedate
 * return : No
 * Descriptioin : Setting up the Cookie value
 */
function setOmniCookie(cookieName, cookieValue, expireDays){
	var expireDate=new Date();
	expireDate.setDate(expireDate.getDate() + expireDays);
	document.cookie = cookieName + "=" + cookieValue + ((expireDays===null)?";":"; expires="+expireDate.toUTCString());
}

/*
 * param : Country Code
 * return : Currency Unit
 * Descriptioin : Currency Unit return
 */
function getOmniCurrencyCd(siteCd) {
	var arrSiteCd = new Array("ae","ae_ar","africa_en","africa_fr","africa_pt","ar","at","au","baltic","be","be_fr","bg","br","ca","ca_fr","ch","ch_fr","cl","cn","co","cz","de","dk","ee","eg","es","eu","fi","fr","global","gr","hk","hk_en","hr","hu","id","ie","il","in","iran","it","jp","sec","kz_ru","latin","latin_en","levant","lt","lv","mea_ar","mea_en","mx","my","n_africa","nl","no","nz","pe","ph","pk","pl","pt","ro","rs","ru","sa","sa_en","se","sg","sk","th","tr","tw","ua","ua_ru","uk","us","ve","vn","za","py","uy","si", "uk-epp", "uk-epp-networks", "al", "mm", "lb");
	var arrCurrencyCd = new Array("AED","AED","USD","USD","USD","ARS","EUR","AUD","USD","EUR","EUR","BGN","BRL","CAD","CAD","CHF","CHF","CLP","CNY","COP","CZK","EUR","DKK","EUR","EGP","EUR","EUR","EUR","EUR","USD","EUR","HKD","HKD","HRK","HUF","IDR","EUR","ILS","INR","IRR","EUR","JPY","KRW","KZT","PAB","PAB","LBP","LTL","LVL","USD","USD","MXN","MYR","USD","EUR","NOK","NZD","PEN","PHP","PKR","PLN","EUR","RON","RSD","RUB","SAR","SAR","SEK","SGD","EUR","THB","TRY","TWD","UAH","UAH","GBP","USD","VEF","VND","ZAR","PYG","UYU","SIT","GBP","GBP","ALL","MMK","LBP");
	var currencyCd = "";
	try {
		for (var i=0; i<arrSiteCd.length; i++) {
			if (siteCd == arrSiteCd[i]) {
				currencyCd = arrCurrencyCd[i];
				break;
			}
		}
	} catch(e) {
		currencyCd = "USD";
	}
	return currencyCd;
}

/*
 * param : The name of Parameter
 * return : Parameter Value
 * Descriptioin : The specific Query String part of the URL is returned 
 */
function getOmniUrlParam(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results === null )	return "";
	else	return results[1];
}

/*
 * param : Tags id
 * return : The value of the Tag inside 
 * Descriptioin : The value of the Tag inside return
 */
function getOmniInputTag(id)
{
	var tag = "";
	var isTag = document.getElementById(id);
	if( isTag !== undefined && isTag !== null ) {
		tag = document.getElementById(id);
	}else{
		tag = "none";
	}
	return tag;
}

function getOmniInputTagValue(id){
	var value = "";
	var isTag = document.getElementById(id);
	if( isTag !== undefined && isTag !== null ) {
		value = document.getElementById(id).value;
		if(value == ""){
			//printOmniLog([id]+"`s Tag value"+"  must be set");
		}
	}else{
		//printOmniLog([id]+"`s Tag is undefined");
		value = "";
	}

	return value.toLowerCase();
}

/*
 * param : getOmniInputTag`s 매개변수
 * return : The value of the Tag inside 
 * Descriptioin : The value of the Tag inside return
 */
 
/*
function checkValue(id){
	if(getOmniInputTag(id).value==undefined){
		printOmniLog([id]+"`s Tag is undefined");
		return "";
	}else if(getOmniInputTag(id).value==""){
		printOmniLog([id]+"`s Tag value"+"  must be set");
		return "";
	}else{
		return getOmniInputTag(id).value.toLowerCase();
	}
}
*/

// trim() functioin
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "");
};

// replaceAll() function
String.prototype.replaceAll = function(str1, str2){
	var tempStr = this.trim();
	tempStr = tempStr.replace(eval("/" + str1 + "/gi"), str2);
	return tempStr;
};


/*
 * RSID  Set up
 * We can set up the different s_account  according to the server that contain staging, development, live.
 * RSID pattern  : sssamsungtest<Account country code>[dev]
 */
//samsungnexttest, sssamsung3mstglobaldev

var currentUrl = unescape(window.location.href);

var s_account="";
if(window.location.host == "www.samsung.com" && currentUrl.indexOf("/instore/") != -1) {s_account = "sssamsung4instore"+getOmniAccountSiteCd();}
else if(window.location.host == "origin2.samsung.com" && currentUrl.indexOf("/instore/") != -1) {s_account = "sssamsung4instore"+getOmniAccountSiteCd();}
else if(window.location.host == "stgweb4.samsung.com" && currentUrl.indexOf("/instore/") != -1) {s_account = "sssamsung4instore"+getOmniAccountSiteCd();}
else if(window.location.host == "p4.samsung.com" && currentUrl.indexOf("/instore/") != -1) {s_account = "sssamsung4instore"+getOmniAccountSiteCd();}
else if(window.location.host == "ptcweb4.samsung.com" && currentUrl.indexOf("/instore/") != -1) {s_account = "sssamsung4instore"+getOmniAccountSiteCd();}

//IFA2015^^; dong_won.lee
else if(window.location.host == "www.samsung.com" && currentUrl.indexOf("/ifa2015/") != -1) { s_account = "sssamsung3global,sssamsung4mstglobal"; }
//CES2016
else if(window.location.host == "www.samsung.com" && currentUrl.indexOf("/ces2016/") != -1) { s_account = "sssamsung3global,sssamsung4mstglobal"; }	

else if(window.location.host == "www.samsung.com") { s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; }
else if(window.location.host == "japan.samsung.com"){ s_account = "sssamsung4japan"; }
else if(window.location.host == "origin2.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev"; }
else if(window.location.host == "stgweb4.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev"; }
else if(window.location.host == "p4.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev";}
else if(window.location.host == "ptcweb4.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev";}
else if(window.location.host == "www.eumysamsung.com") {s_account = "sssamsungnexttest,sssamsung4mstglobaldev";}
else if(window.location.host == "my.eu.samsung.com") {s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; }
else if(window.location.host == "my-samsung.com") {s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; } /* my-samsung */

// add EPP&EPP NTWORKS validation; chw.park
else if(window.location.host == "shop.samsung.com") { s_account = "sssamsung4"+(getOmniAccountSiteCd().indexOf("uk-epp") < 0 ? getOmniAccountSiteCd() : "ukepp")+",sssamsung4mstglobal"; }
else if(window.location.host == "store.samsung.com") { s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; }
else if(window.location.host == "support-cn.samsung.com") { s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; }
else if(window.location.host == "support.ru.samsung.com") { s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; }
else if(window.location.host == "support-ca.samsung.com") { s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; }
else if(window.location.host == "www.samsungshop.com.cn") { s_account = "sssamsung4cn,sssamsung4mstglobal"; }	/* CN Store */
else if(window.location.host == "stage.samsungshop.com.cn") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev"; }	/* CN Store */
else if(window.location.host == "stg-au.shop.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev"; }	/* AU Store */
else if(window.location.host == "org-kr.shop.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev";}
else if(window.location.host == "org-cn.shop.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev";}
else if(window.location.host == "stg-kr.shop.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev"; }
else if(window.location.host == "stg-cn.shop.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev"; }
else if(window.location.host == "stg.shop.samsung.com") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev"; }
else if(window.location.host == "local.sec.samsung.com") { s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; }
else if(window.location.host == "www.samsungb2b.co.kr") { s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; } /* SEC B2B */	
else if(window.location.host == "galaxymobile.jp") { s_account = "sssamsung4"+getOmniAccountSiteCd()+",sssamsung4mstglobal"; } /* galaxymobile.jp */	
else if(window.location.host == "samsunglatin.store") { s_account = "sssamsungnexttest,sssamsung4mstglobaldev"; } /* Latin shop */
else { s_account = "sssamsungnexttest,sssamsung4mstglobaldev"; }

/* set WA.com RSID when cookie 'from_wa_com' is Y */
if (document.referrer.indexOf('samsungwa.com') > -1 || getOmniCookie('from_wa_com') == "Y" ) {s_account += ",sssamsungwasec";}

var s=s_gi(s_account);

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.debugTracking=false;
s.currencyCode=getOmniCurrencyCd(getOmniSiteCd());
s.charSet="UTF-8";
s.trackInlineStats=true;
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";

// link_d set up
s.trackDownloadLinks=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,msi,djvu,CAB,sit,rom,bin,swf,chm,mht,htm,apk,xlsx,dmg";
// End of link_d  set up

// link_e set up 
//micro site일때 자동 Exit Link track 하지 않음 
      if(getOmniInputTagValue("microsite")=="microsite"){ 
		  s.trackExternalLinks=false; 
      }else{ 
		  s.trackExternalLinks=true; 
	  } 
	  /* SEC B2B, CN Store */
s.linkInternalFilters="JAVA-SCRIPT:,tel:,samsunglatin.store,galaxymobile.jp,my-samsung.com,samsungshop.com.cn,www.samsungb2b.co.kr,www.samsung.com,japan.samsung.com,2.samsung.com,3.samsung.com,4.samsung.com,shop.samsung.com,store.samsung.com,local.sec.samsung.com,ru.samsung.com,eu.samsung.com"; 
// End of link_e set up 

/*
var AMCOrgID = _satellite.getVisitorId().marketingCloudOrgID; 
s.visitor = Visitor.getInstance(AMCOrgID); 
*/

/* MCID code update */
if(typeof _satellite !== "undefined" && _satellite) {
	var AMCOrgID = ((_satellite.getVisitorId()||{}).marketingCloudOrgID)||""; 
	
	if(AMCOrgID != "") {
			s.visitor = Visitor.getInstance(AMCOrgID);
		}
}


//ClickTale Integration Start
function clickTaleGetUID_PID() {
		console.log("loading - clickTaleGetUID_PID");
    if (document.cookie.indexOf("WRUID") > -1 && document.cookie.indexOf("WRIgnore=true") == -1) {
        var ca = document.cookie.split(';');
        var PID = 0, UID = 0;
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf("CT_Data") > -1) PID = c.substring(c.indexOf("apv_")).split("_")[1];
            if (
              ((document.cookie.match(/WRUID/g) || []).length == 1 && c.indexOf("WRUID") > -1) ||
              (c.indexOf("WRUID") > -1 && (document.cookie.match(/WRUID/g) || []).length > 1 && c.indexOf("WRUID=") == -1)
            )
                UID = c.split("=")[1];
        }
        console.log("return value - clickTaleGetUID_PID");
        return (UID == 0 || PID == 0) ? null : (UID + "." + PID);
    }
    else {
    		console.log("return null - clickTaleGetUID_PID");
       	return null;
   	}
}

if("de".indexOf(getOmniSiteCd())!= -1) {
	var clickTaleValues = clickTaleGetUID_PID();
	if (clickTaleValues != null) {
	    s.eVar43 = clickTaleValues;
	}
} 
//ClickTale Integration End


/* Wa.com */
if((window.location.host == "store.samsung.com" || window.location.host == "shop.samsung.com") && currentUrl.indexOf("/sec/") != -1 && typeof(Visitor) != "undefined"){
	s.visitor = Visitor.getInstance("FEF0834558111A970A495CC9@AdobeOrg");
}

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/

s.trackingServer="nmetrics.samsung.com";
s.trackingServerSecure="smetrics.samsung.com";

/******************* End of CONFIG SECTION **************************/

var count = 1;
s.usePlugins=true;
//We can set up the prop Value in this section like below
//the sDoPlugins are used after method was processed
function sDoPlugins(s) {
	if (getOmniInputTagValue("pageTrack") == 'page not found') {
		return;  
	}else{
		s.prop6 = getOmniInputTagValue("pageTrack");
	}
	
	if(!s.campaign)	// Tracking external campaigns or promotions
		s.campaign = s.getQueryParam('cid');
	s.campaign = s.getValOnce(s.campaign,"s_campaign",0);
	

	if(!s.eVar7)	// Tracking internal campaigns or promotions
		s.eVar7=s.getQueryParam('pid');
	s.eVar7=s.getValOnce(s.eVar7,"s_evar7",0);
	
	
//kenshoo Tracking code
	if('th'.indexOf(getOmniSiteCd())!=-1&&s.getQueryParam('k_clickid')!=""){
		s.eVar60 = s.getQueryParam('k_clickid');
		s.eVar60 = s.getValOnce(s.eVar60, "s.eVar", 0);
	}

	//SEBN sci 
	if(!s.eVar65 && ('be,be_fr,nl'.indexOf(getOmniSiteCd())!=-1))	{
		s.eVar65 = s.getQueryParam('sci');		
	}
	//s.eVar65=s.getValOnce(s.eVar65,"s_evar65",0);
	
	/* 20160509 - RU cui tracking */
	if(!s.eVar65 && ('ru'.indexOf(getOmniSiteCd())!=-1))	{
		s.eVar65 = s.getQueryParam('cui');
	}
	s.eVar65=s.getValOnce(s.eVar65,"s_evar65",0);

	if(!s.eVar62){
		if(getOmniSiteCd().indexOf('be')!=-1||getOmniSiteCd().indexOf('be_fr')!=-1||getOmniSiteCd().indexOf('nl')!=-1){
			s.eVar62 = s.getQueryParam('kw');
		}
	}
	s.eVar62=s.getValOnce(s.eVar62,"s_evar62",0);
 	 
	 //GCRM
	 if(!s.eVar67){
		s.eVar67 =  s.getQueryParam('samid');		
	}
 
	// Phase type
    s.prop75 = "P4";
	
	//referrer
	var omniReferrer = document.referrer;
	var omniRedirectionUrl = "";
	//printOmniLog(omniReferrer);
	if (omniReferrer != "" && omniReferrer != undefined) {
		s.eVar42 = omniReferrer;
	}else if("".indexOf(omniReferrer)!=-1 ||omniReferrer==null||omniReferrer == undefined){
		var omniRedirectionUrl = s.getQueryParam("redirectionId"); 
		if (omniRedirectionUrl != "" && omniRedirectionUrl != undefined) {
			s.eVar42 =  omniRedirectionUrl;  	
			s.referrer = s.eVar42;
		}else{
			//if there is no referrer return this block; no s.eVar42
		}
	}

/*START : add an fr country rule by analyticsITC 2017.01.02*/
/*start of the script to add*/

	if('fr'.indexOf(getOmniSiteCd())!=-1)	{
	    //Cookie LifeTime
		var TSFirstVisit=Number(s.c_r("s_CLT"));
		var TSNow=new Date().getTime();
		var TSExpiration=new Date();
		var Privacy=new Date();
		var myMonth=Privacy.getMonth();
		Privacy = new Date().setMonth(myMonth+13);
		TSExpiration.setTime(Privacy);
		
		if(typeof TSFirstVisit=="undefined" || TSFirstVisit==""){
			TSFirstVisit=Privacy;
			s.c_w("s_CLT", Privacy, TSExpiration);
		}
	
		s.cookieLifetime=(TSFirstVisit-TSNow)/1000;
		
		if(s.c_r("s_fid")==""){
			TSExpiration.setTime(TSFirstVisit)
			s.c_w("s_fid", s.c_r("s_vi"), TSExpiration);
		}
	}

/*end of the script to add*/
/*END : ad an fr country rule by analyticsITC 2017.01.02*/


	//===========================SEBN tracking request===========================
		//1. 국가 분기 
			if ('be,be_fr,nl'.indexOf(getOmniSiteCd())!=-1 && 'fr'.indexOf(getOmniSiteCd())==-1) {
				var campaign_type = '';
				var splitCpn = '';
				//2. s.campaign 존재 확인 
				if (s.campaign) {
					splitCpn = s.campaign.split('_')[1]; //s.campaign => <country code>_<campaign type>_<search engine/media type>_<campaign name or keyword>_<date> 
					splitCpn != undefined ? campaign_type = splitCpn : "";
				}else{
					//3. s.campaign값이 존재하지 않는 다면 조건에 맞춰서 셋팅
					var domainVarr =["google","bing","facebook","twitter","linkedin","samsung"];
					var checkNo;
					var matchingDomain = function() {
							
							$.each(domainVarr,function  (index, item) {
							if (domainVarr[index].indexOf(document.referrer.split(".")[1])!=-1 ) {
								//alert(index)
								checkNo =  index;
							}
							if (document.referrer.split(".")[1] == undefined) {
								checkNo = 7;
							}
						})
						
					}
					// 3-1 각각 return checkNo에 따라서 campaign_type 셋팅 
					matchingDomain();
					
					switch(checkNo){
						case 0 : 
						case 1 : 
							campaign_type = "seo"; 
							break;
						case 2 : 
						case 3 : 
						case 4 : 
							campaign_type = "social"; 
							break;
						
						case 5 : 
							campaign_type = "internal"; 
							break;
						
						case 7: 
							campaign_type = "dir";   // referrer 값 X
							break;
						default : 
							campaign_type = "ref"    // referrer 값 O (domainVarr 에 속하지 않음)
							break;
					}
					
				}
				//4. s.eVar66 셋팅 후 분기 조건 닫음. 
				if (count == "") {
				/*
				printOmniLog("=================SEBN Tracking=====================");
				printOmniLog('switchCheckNo = '+checkNo);
				printOmniLog('campaign_type = '+campaign_type);
				printOmniLog("=============End Of SEBN Tracking==================");
				*/
				}
				(count == "" && 'internal'.indexOf(campaign_type)==-1)? s.eVar66=s.crossVisitParticipation(campaign_type,'s_campaign_type','30','10','>') : "";

				
				//5. 사용한 변수 초기화
				count++;
				if (count > 2) {
					 count = "";
				} 
				campaign_type="";
			}
	//===========================End Of SEBN tracking request===========================

	//s_vi(eVar63 setting)
	//MCID 사용 국가 eVar63 값 설정
	s.eVar63 = getOmniCookie("s_vi");
	if(getOmniCookie("s_vi").indexOf('null')==0){
		s.eVar63 = "D=mid";
	} 

	// PZN Target tracking
	if(window.s_tnt_eVar69) {
		s.eVar69 = window.s_tnt_eVar69;
	}

	if(s.prop1) s.eVar1=s.prop1;
	if(s.prop2) s.eVar2=s.prop2;
	if(s.prop2) s.channel=s.prop2;
	if(s.prop3) s.eVar3=s.prop3;
	if(s.prop4) s.eVar4=s.prop4;
	if(s.prop5) s.eVar5=s.prop5;
	
	//s.eVar10 is the visit vlaue that check when the user visits the site
	s.eVar10 = s.getDaysSinceLastVisit('s_lv');
	s.prop39 = window.location.href;

	//b2b poll related
	if(window.location.href.indexOf('business')!=-1&&$('iframe[id=survey]').attr('src')){
        s.prop39="http://www.samsung.com/"+getOmniSiteCd()+"/poll?pollId=2";
    }
	//s.prop12 = "high";
	
	s.prop12 = screen.width + "x" + screen.height;
	
	//Login Check
	var logCheck = document.cookie.match("iPlanetDirectoryPro");
	var logCheckCa = document.cookie.match("prof_id");
	var logCheckBr = document.cookie.match("logged_in");
		
	if(logCheck == undefined && logCheck == null){
		s.prop10 = "logged out";
	}else{
		//login usable countries
		"latin,au,cn,nz,es,fr,it,nl,de,se,uk,sec,ru,be,be_fr,pl,dk,fi,no,ch,ch_fr,pt,in,uk-epp,uk-epp-networks".indexOf(getOmniSiteCd())!=-1? s.prop10 = "logged in": s.prop10 = "logged out";
		//B2B login usable countries
		if ("business".indexOf(getOmniTopSection())!=-1 && getOmniTopSection() != "") {
			"bg,cl,cn,co,id,in,kz_ru,pl,ro,th,tr,tw,ua,ua_ru,vn,za".indexOf(getOmniSiteCd())!=-1? s.prop10 = "logged in": s.prop10 = "logged out";
		}

		//ch,ch_fr,pt
	}
	if(logCheckCa != undefined && logCheckCa != null){
		//login usable countries - ca/ca_fr
		"ca,ca_fr".indexOf(getOmniSiteCd())!=-1? s.prop10 = "logged in": s.prop10 = "logged out";
	}
	
	if(logCheckBr != undefined && logCheckBr != null){
		//login usable countries - br
		"br".indexOf(getOmniSiteCd())!=-1? s.prop10 = "logged in": s.prop10 = "logged out";
	}
	
	

	//e-tore change
	s.prop6 = getOmniInputTagValue("pageTrack");
	if (window.location.host == "store.samsung.com" || window.location.host == "shop.samsung.com") { //store.samsung.com or shop.samsung.com check
		if (s.prop6 != "" && s.prop6 != undefined && s.prop6.indexOf('estore')!=-1 ) {//s.prop6 contain etore
			s.prop6 = s.prop6.replace('estore','shop'); //replace estore -> shop
		}
	}
	if (s.prop6.indexOf('estore')!=-1 && getOmniInputTag("pathindicatorENG") != "none"){
		if(getOmniInputTag("pathindicatorENG").getElementsByTagName("a").item(0).innerHTML.toLowerCase()=="e-shop" || getOmniInputTag("pathindicatorENG").getElementsByTagName("a").item(0).innerHTML.toLowerCase()== "e-store") {//s.prop6 contain etore
			s.prop6 = s.prop6.replace('estore','shop'); //replace estore -> shop
		}
	}


	//b2b poll related
	if(window.location.href.indexOf('business')!=-1&&$('iframe[id=survey]').attr('src')){
		s.prop6='b2b poll';
    }

	if(s.pageName.indexOf(":campaign") != -1){
		s.prop6 = "";
	}
	
	// UK Discover section
	if(s.pageName.indexOf(":discover") != -1){
		s.prop6 = "discover";
	}
	// Global Discover section 
	if(s.pageName.indexOf(":aboutsamsung") != -1){
		s.prop6 = "aboutsamsung";
	}

	//contactus allpage track
	if(s.pageName.indexOf(":info:contactus") != -1 && s.prop6 == ""){
		s.prop6 = "contactus";
	}
	
	//warranty allpage track
	if(s.pageName.indexOf(":support:warranty") != -1 && s.prop6 == ""){
		s.prop6 = "warranty";
	}
	
	/* 20160201 - PDP type */
	var isPdp = getOmniInputTagValue("discontinued");
	var pdpType = "";
	
	if(isPdp == 'y') {
		pdpType = "no sale"; 
	}
	else if(isPdp == 'n') {
		pdpType = "sale"; 
	}
	
	s.prop14 = pdpType; 
	s.eVar54 = s.prop14; /* evar 변수 추가 */
		
	//Devicetype
	s.prop9 = getOmniDeviceType();

	// Previous Page
	s.prop41 = s.getPreviousValue(s.pageName,"s_pv");
	
	// Exception - GNB Locator ( Add event22, eVar22 )
	if("it".indexOf(s.prop7)==-1) {	/* 161121 */
		if("locator,utility menu:store locator".indexOf(s.prop7)!=-1 || "locator,utility menu:storelocator".indexOf(s.prop7) != -1 &&s.prop7!=""){
			if ( s.linkTrackEvents == "none" ){
				  s.linkTrackEvents = "event22";
			}else {
				  s.linkTrackEvents += "," + "event22";
			}
			
			if ( s.linkTrackVars == "none" ) {
				s.linkTrackVars = "events,eVar22";
			} else {
				s.linkTrackVars += ",events,eVar22";
			}
			s.eVar22 = "locator"
			s.events = "event22"
		}
	}
	
	s.enableVideoTracking=true


	if(s.enableVideoTracking){			   
        if( false ){ // Livestream

    		//console.log("livestream");
			s.loadModule("Media");
			s.Media.autoTrack = false;
			s.Media.trackWhilePlaying=true;
			s.Media.playerName = "My Media Player";			
		    s.Media.trackVars = "events,prop16,eVar16,eVar17,eVar18,eVar19,eVar20";
		    s.Media.trackEvents = "event14,event15,event16,event17,event18,event19,event20";
			s.Media.trackSeconds= 600;
			s.Media.segmentByMilestones = false;
			s.Media.trackUsingContextData = true;

			s.Media.contextDataMapping = {
				"a.contentType" : "eVar18",
				"a.media.name" : "eVar16,prop16",
				"a.media.view" : "event15",
				"a.media.timePlayed" : "event14"
			};
			s.Media.monitor = function (s,media) {
				if (media.event == "OPEN") {
					s.eVar20 = document.referrer;
					s.eVar19 = "D=g";
					s.Media.track(media.name);
				};
			};
		}else{
                
			
			s.loadModule("Media");
			s.Media.autoTrack = false;
			s.Media.trackWhilePlaying=false; //140904 updated
			s.Media.playerName = "My Media Player";
			s.Media.trackVars = "events,prop16,eVar16,eVar17,eVar18,eVar19,eVar20";
			s.Media.trackEvents = "event14,event15,event16,event17,event18,event19,event20";
			s.Media.segmentByMilestones = true;
			//s.Media.trackMilestones = "25,50,75,100"; (140904_removed)
			s.Media.trackMilestones = "25,50,75";
			s.Media.trackUsingContextData = true;
			s.Media.contextDataMapping = {
				"a.contentType" : "eVar18",
				"a.media.name" : "eVar16,prop16",
				"a.media.segment" : "eVar17",
				"a.media.view" : "event15",
				"a.media.segmentView" : "event17",
				"a.media.timePlayed" : "event14",
				"a.media.complete" : "event16",
				"a.media.milestones" : {
					25 : "event18",
					50 : "event19",
					75 : "event20"
					//100 : "event16" (140904_removed)
				}
			};
			//console.log("vod222");
			s.Media.monitor = function (s,media) {
				if (media.event == "OPEN") {
					s.eVar20 = document.referrer;   //referrer
					s.eVar19 = "D=g";   //URL
					s.Media.track(media.name);
				};
			}; //close media monitor
		}; //close if live or VOD
	}//close video tracking


	
	/* Page Loading Time */
	var page_load_end = new Date();
	var load_time;
	
	if(typeof(page_load_start) != "undefined"){
		load_time = page_load_end.getTime() - page_load_start.getTime();
		load_time = parseInt(load_time/100)*100;
		
		if ( load_time < 5000 ){
			s.prop13 = "~5";
		}else if ( load_time >= 5000 && load_time < 10000 ) {
			s.prop13 = "5~10";
		}else {
			s.prop13 = "10~";
		}
	}
}
s.doPlugins = sDoPlugins;

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */


/*
 * Plugin: YouTube plugin v1.54
// 2016-05-12 YouTube plugin 삭제
window.s_YTO={s_name:'s'}
window.onYouTubePlayerReady=function(id){if(id&&document.getElementById(id)&&!s_YTO.v[id])s_YTO.v[id]=new s_YTv(id,1)}
window.s_YTp=function(){try{var D=document,f=D.getElementsByTagName('iframe'),k,id,t,i,j,I=function(n){var i=0;try{eval('var '+n)}catch(e){i=1};return i};if(s_YTisa())s_YTO.ya=2;for(i=0;i<f.length;i++){k=s_YTgk(f[i].src);id=f[i].id;if(k){if(!id||I(id)){id='YouTubeV';for(j=1;j<99;j++)if(!D.getElementById(id+j))break;id=j<99?id+j:'';f[i].id=id}if(id)if(!s_YTO.ya){s_YTO.ya=1;t=D.createElement('script'),f;t.src='//www.youtube.com/player_api';f=D.getElementsByTagName('script')[0];f.parentNode.insertBefore(t,f)}else if(s_YTO.ya==2&&!s_YTO.v[id])s_YTO.v[id]=new s_YTv(id)}}}catch(e){};s_YTO.ut=setTimeout('s_YTp()',1000)}
window.s_YTisa=function(){return typeof window.YT=='object'&&YT.Player}
window.s_YTism=function(){var s=s_YTO.s=window[s_YTO.s_name||'s']||0;return typeof s=='object'&&typeof s.Media=='object'&&s.Media.open?s:0}
window.s_YTgk=function(u){var r='',a,f='',v=u.toLowerCase();if(v.indexOf('//www.youtube.com')>-1){if(v.indexOf('/watch')>-1)f='v';if(!f&&v.indexOf('/apiplayer')>-1)f='video_id';if(!f&&v.indexOf('/v/')>-1)f='/v/';if(!f&&v.indexOf('/embed/')>-1)f='/embed/';if(f>'A'){a=v.indexOf('?'+f+'=');if(a<0)a=v.indexOf('&'+f+'=');if(a>-1)r=u.substring(a+f.length+2)}else if(f){a=v.indexOf(f);r=u.substring(a+f.length)}if(r){a=r.indexOf('?');if(a<0)a=r.indexOf('&');if(a<0)a=r.indexOf('#');if(a>-1)r=r.substring(0,a)}}return r}
window.onYouTubePlayerAPIReady=function(){try{s_YTO.ya=2;if(s_YTO.ut)clearTimeout(s_YTO.ut);s_YTp()}catch(e){}}
window.s_YTdi=function(){var s=s_YTism();if(s){if(typeof s.Media.trackWhilePlaying!='undefined'){s_YTO.twp=s.Media.trackWhilePlaying;s.Media.trackWhilePlaying=false}if(typeof s.Media.trackSeconds!='undefined'){s_YTO.ts=s.Media.trackSeconds;delete s.Media.trackSeconds}}}
window.s_YTei=function(){var s=s_YTism();if(s){if(typeof s_YTO.twp!='undefined'){s.Media.trackWhilePlaying=s_YTO.twp;delete s_YTO.twp}if(typeof s_YTO.ts!='undefined'){s.Media.trackSeconds=s_YTO.ts;delete s_YTO.ts}}}
window.s_YTut=function(){s_YTO.uf=0;s_YTei()}
window.s_YTdv=function(id){try{if(!id)return;var v=s_YTO.v[id]||0;if(v){if(v.ss){if(s_YTism())s_YTO.s.Media.close(v.sv);v.ss=0}}v.vc()}catch(e){}}
window.s_YTv=function(id){var t=this;t.vc=function(){var t=this;t.id=t.sn=t.sl=t.yt=t.yk=t.kl='';t.yd=t.yp=t.ys=t.pt=t.ss=t.ts=t.qs=t.ql=0};t.vg=function(yp){var t=this,D=document,N='number',u='',a,b,c,i,x=0,y;if(yp){if(yp.getVideoUrl)u=yp.getVideoUrl();if(!u)u=yp.a.src||'';if(yp.getVideoData)x=yp.getVideoData();if(x&&x.title)t.yt=x.title;y=x&&x.video_id?x.video_id:s_YTgk(u);if(y&&y!=t.yk){t.kl=t.yk;t.yk=y;t.ts=t.qs=t.ys=0;if(t.yd){delete t.yd;t.yd=0}t.yt='';a='s_YTdata_'+t.id+'_'+t.yk;b=D.getElementById(a);if(b)b.parentNode.removeChild(b);b=D.createElement('script');b.id=a;b.src='//gdata.youtube.com/feeds/api/videos/'+t.yk+'?v=2&alt=json-in-script&callback=window.s_YTO.v.'+t.id+'.fc';a=D.getElementsByTagName('script')[0];a.parentNode.insertBefore(b,a)}if(yp.getDuration){x=yp.getDuration();t.ts=typeof x==N?Math.round(x):0}t.qs=0;if(yp.getCurrentTime){x=yp.getCurrentTime();t.qs=typeof x==N?Math.round(x):0}if(yp.getPlayerState){x=yp.getPlayerState();t.ys=x||0}}};t.ve=function(){var s=s_YTism();if(s){var t=this,d,O=function(){t.sl=t.sn;t.sn='YouTube|'+(t.yk||t.id||'')+'|'+(t.yt||'');s.Media.open(t.sn,t.ts,s_YTO.vp);t.ss=1},P=function(){s.Media.play(t.sn,t.qs);t.ql=t.qs;t.ss=2},S=function(n,q){s.Media.stop(n||t.sn,q||t.qs);t.ss=1;t.ql=t.qs},C=function(n){s.Media.close(n||t.sn);t.ss=t.qs=t.ql=0};t.vg(t.yp);if(t.sk&&t.sk!=t.kl){if(t.ss){if(t.ss==2)S(t.sl,t.ql);C(t.sl)}}switch(t.ys){case 1:if(t.ss==2){d=Math.abs(t.qs-t.ql);if(d>1)S(t.sn,t.ql)}if(!t.ss){O();t.qs=t.ql=0}P();break;case 0:if(t.ss){if(t.ss!=1){if(Math.abs(t.qs-t.ts)<=1)t.qs=t.ts;S()}C()}break;case 2:if(!t.ss)O();if(t.ss!=1)S();break;case 3:if(s_YTO.uf)clearTimeout(s_YTO.uf);else s_YTdi();s_YTO.uf=setTimeout('s_YTut()',3000);break;case-1:case 5:default:break}}};t.fsc=function(ye){try{t.ys=ye;t.vg(t.yp);setTimeout('s_YTO.v["'+t.id+'"].ve()',10)}catch(e){}};t.isc=function(ye){try{t.ys=ye.data;t.vg(ye.target);setTimeout('s_YTO.v["'+t.id+'"].ve()',10)}catch(e){}};t.fc=function(d){try{t.yd=d;var T=d.entry&&d.entry.title?t.sn=d.entry.title.$t:'';if(T)t.yt=T}catch(e){}};try{var o=id&&typeof id=='string'?document.getElementById(id):'';if(!o)return null;t.vc();t.id=id;var W=window,ar=arguments;if(ar.length>1&&ar[1]==1){t.pt=1;t.yp=o;if(W.addEventListener)t.yp.addEventListener('onStateChange','s_YTO.v.'+id+'.fsc',false);else if(W.attachEvent)W.attachEvent('onStateChange','s_YTO.v.'+id+'.fsc')}else{t.pt=2;var a=new Object();if(ar.length>1)a.videoId=ar[1];if(ar.length>3){a.width=w;a.height=h}a.events=new Object();a.events.onStateChange=t.isc;t.yp=new YT.Player(id,a);t.vg(t.yp)}}catch(e){}return t}
window.s_aE=function(o,e,f){if(arguments.length<3){f=e;e=o;o=window}if(o.attachEvent){o['e'+e+f]=f;o[e+f]=function(){o['e'+e+f](window.event)};o.attachEvent('on'+e,o[e+f])}else o.addEventListener(e,f,false)}
window.s_YTi=function(){if(typeof s_YTO.v!='object')s_YTO.v={};s_YTO.ya=s_YTisa()?2:0;s_YTO.ut=s_YTO.uf=0;s_YTO.vp='YouTube Player';s_YTp()}
window.s_aE('load',s_YTi);
 */

/*
 * Plugin: getValOnce_v1.0 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
 /* 쿠키 유효기간 13개월 변경(390 day) */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+390*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");

/*
 * Plugin: getQueryParam 2.3 - return query string parameter(s) 
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"escp(v)}return ''");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Utility: escp 0.1 - ensures decodeURI will be used to decode URL parameters if it exists
 */
s.escp=new Function("x",""
+"var s=this;if(typeof(decodeURI)=='function'&&x)return decodeURI(s.r"
+"ep(''+x,'+',' '));else return unescape(s.rep(''+x,'+',' '));");

/*
 * Utility Function: vpr - set the variable vs with value v
 */
s.vpr=new Function("vs","v",
"if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x.substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin: getPercentPageViewed v1.2
 */
s.getPercentPageViewed=new Function("",""
+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
s.getPPVCalc=new Function("",""
+"var s=s_c_il["+s._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,"
+"s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s."
+"d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d."
+"documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentE"
+"lement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s"
+".wd.document.documentElement.scrollTop||s.wd.document.body.scrollTo"
+"p),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){"
+"s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");
s.getPPVSetup=new Function("",""
+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"
+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"
+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"
+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"
+"lc);}");
s.getPPVSetup();

/*
 * s.join: 1.0 - Joins an array into a string
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 *  Plug-in: crossVisitParticipation v1.7 - stacks values from
 *  specified variable in cookie and returns value
 */
 
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

/*
 * Custom Code: Brightcove Smart Analytics v2.2
 */
var player;var modVP;var modExp;var modCon;var mediaFriendly;var mediaName;var mediaID=0;var mediaLength;var mediaOffset=0;var mediaTagsArray = [];var mediaTagsArray2 = [];var mediaRefID;var mediaPlayerType;
var mediaPlayerName="Brightcove Smart Player"; //Required hard code player name here.  
var players = {}, playerArr = []; // 2015-01-13 수정

function myTemplateLoaded(experienceID) {

	/* 2016-08-29 주석처리
	player = brightcove.api.getExperience(experienceID);   
    modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    modCon = player.getModule(brightcove.api.modules.APIModules.CONTENT);

	playerArr.push(players[experienceID]);   // 2015-01-08 異붽� 泥섎━ 
	modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, function (evt) {
		onTemplateReady(modVP);
	});
	*/

	//2016-08-29 브라우저 환경에 따른 Brightcove API 변경 
	//if : APIModules_all.js call (웹 접근성 키보드 패널 구현)
	//else : SmartPlayerAPI.js call
	if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){

		if(typeof APIModules == "object" && typeof BrightcoveExperience == "function"){//Flash-Only Player API
			player = brightcove.getExperience( experienceID);
			modVP = player.getModule( APIModules.VIDEO_PLAYER );	
			modExp = player.getModule( APIModules.EXPERIENCE );
			modCon = player.getModule( APIModules.CONTENT );
		}else{//Smart Player API
			player = brightcove.api.getExperience(experienceID);   
			modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
			modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
			modCon = player.getModule(brightcove.api.modules.APIModules.CONTENT);
		}
	}else{//Smart Player API
		player = brightcove.api.getExperience(experienceID);   
		modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
		modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
		modCon = player.getModule(brightcove.api.modules.APIModules.CONTENT);

	}
	playerArr.push(players[experienceID]);   // 2015-01-08 異붽� 泥섎━ 
	modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, function (evt) {
		onTemplateReady(modVP);
	});
	if (typeof bccTemplateLoaded == 'function') { 
	  bccTemplateLoaded(experienceID);//in brightcove.player.module.js 
	}
	//2016-08-25 브라우저 환경에 따른 Brightcove API 변경 End!!
}

function onTemplateReady(modVP) {// 2015-01-13 �섏젙
	modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, function(evt){
		  //printOmniLog(evt.type + " PLAY triggered for player " + modVP.experience.id);
		  onPlay(evt);
	});
	modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, function(evt){
		  //printOmniLog(evt.type + " STOP triggered for player " + modVP.experience.id);
		  onStop(evt);
	});
	modVP.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, function(evt){
		  //printOmniLog(evt.type + " onProgress triggered for player " + modVP.experience.id);
		  onProgress(evt);
	});
}

	//modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, onTemplateReady);}      2015-01-08 삭제 처리 
/*
function onTemplateReady(evt) {
    modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, onPlay);
    modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, onStop);
	modVP.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, onProgress);}
*/
function onPlay(evt){
mediaLength=evt.duration;  //Required video duration
mediaOffset=Math.floor(evt.position); //Required video position
mediaID=(evt.media.id).toString();  //Required video id
mediaFriendly=evt.media.displayName; //Required video title
mediaName=mediaID+":"+mediaFriendly; //Required Format video name
//mediaRefID=evt.media.referenceId;  //Optional reference id
//mediaPlayerType=player.type; //Optional player type
//mediaTagsArray=evt.media.tags; //Optional tags
//or (i=0;i<mediaTagsArray.length;i++) {mediaTagsArray2[i]=mediaTagsArray[i]['name'];}
/* Check for start of video */
if (mediaOffset==0){
/* These data points are optional. If using SC14, change context data variables to hard coded variable names and change trackVars above. */
//s.contextData['bc_tags']=mediaTagsArray2.toString(); //Optional returns list of tags for current video.  Flash only.
//s.contextData['bc_refid']=mediaRefID; //Optional returns reference id
//s.contextData['bc_player']=mediaPlayerName; //Optional player name is currently hard coded.  Will be dynamic in later releases.
//s.contextData['bc_playertype']=mediaPlayerType; //Optional returns flash or html
s.Media.open(mediaName,mediaLength,mediaPlayerName);
s.Media.play(mediaName,mediaOffset);}else{
s.Media.play(mediaName,mediaOffset);}}
function onStop(evt){
mediaOffset=Math.floor(evt.position);
if (mediaOffset==mediaLength) {
s.Media.stop(mediaName,mediaOffset);
s.Media.close(mediaName);}else{
s.Media.stop(mediaName,mediaOffset);}}
function onProgress(evt){
s.Media.monitor = function (s,media) {
if (media.event == "MILESTONE") {
/* Use to set additional data points during milestone calls */
//s.Media.track(media.name); Uncomment if setting extra milestone data.
}}}

/************* MEDIA MODULE **************/
s.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+"this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+"if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.ad=0;i.adpn;i.adpp;i.adppp;i.clk;i.CPM;i.co=0;i.cot=0;i.lm=0;i.l"
+"om=0;m.l[n]=i}};m.openAd=function(n,l,p,pn,pp,ppp,CPM,b){var m=this,i=new Object;n=m.cn(n);m.open(n,l,p,b);i=m.l[n];if(i){i.ad=1;i.adpn=m.cn(pn);i.adpp=pp;i.adppp=ppp;i.CPM=CPM}};m._delete=function"
+"(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new "
+"Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.click=function(n,o"
+"){this.e(n,7,o)};m.complete=function(n,o){this.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=v"
+"o.linkTrackEvents,pe='m_i',pev3,c=vo.contextData,x;if(i.ad){ns+='ad.';if(i.adpn){c['a.media.name']=i.adpn;c[ns+'pod']=i.adpp;c[ns+'podPosition']=i.adppp;}if(!i.vt)c[ns+'CPM']=i.CPM;}if (i.clk) {c[n"
+"s+'clicked']=true;i.clk=0}c['a.contentType']='video'+(i.ad?'Ad':'');c['a.media.channel']=m.channel;c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0)c[ns+'length']=i.l;if(Math.floor(i.ts)>0)c[ns+'ti"
+"mePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView'"
+"]=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3=c['a.contentType'];vo.pe="
+"pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='strin"
+"g'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y=='view'||y=='segmentView'||y=='clicked'||y=='complete'||y=='timePlayed'||y=='CPM'){if("
+"e)e+=','+a;if(y=='timePlayed'||y=='CPM'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x"
+"+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.even"
+"ts2?',':'')+d[x+'s'][c[x]]}}if(c[x])c[x]=undefined;if(y=='segment'&&c[x+'Num'])c[x+\"Num\"]=undefined}}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='"
+"--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!"
+"=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.tr"
+"ackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;if(!m.channel)m.channel=m.s.wd.location.hostnam"
+"e;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(i.ad){ti=m.adTrackSeconds;tp=m.adTrackMilestones;to=m.adTrackOffsetMilestones;sm=m.adSegmentByMilestones;so=m.adSegmentByOffsetMilestones}if(o<0){if(i"
+".lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.ad=i.ad;w.length=i.l;w.openTi"
+"me=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?"
+"'TRACK':(x==5?'COMPLETE':(x==7?'CLICK':('CLOSE')))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if("
+"(x<=3||x>=5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c"
+"&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w"
+".mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0"
+";if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=="
+"'E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if((x>=2||i.x>=100)&&i.lo<o){i.t+=o-i.lo;i.ts+"
+"=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||("
+"x<=3&&i.x>=100)){if(i.lx!=2)i.e+='E'+Math.floor(o);x=0;v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==7){w.clicked=i.clk=1;t=1}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m."
+"completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}ek=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime"
+"=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new "
+"Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i)"
+";else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,"
+"pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){"
+"var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7"
+"='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new"
+" Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch("
+"e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p="
+"'Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8"
+")x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x."
+"type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p=="
+"2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTime"
+"Scale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x"
+"!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c"
+");o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetL"
+"ength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10|"
+"|!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new"
+" Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack"
+"&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd."
+"addEventListener)s.wd.addEventListener('load',m.as,false);if(m.onLoad)m.onLoad(s,m)";s.m_i("Media");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27.5';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.tagContainerMarker='';s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingS"
+"erverSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net"
+"';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobi"
+"le?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+(s.tagContainerMarker?\"-\"+s.tagContainerMarker:\"\")+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv"
+">=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+"
+"'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;fo"
+"r(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=windo"
+"w,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s."
+"forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_"
+"top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'"
+"};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v)"
+"{var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLo"
+"werCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google'"
+")>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(',"
+"'+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf"
+",vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',"
+"')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk]"
+";if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(ty"
+"peof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else "
+"if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.subs"
+"tring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv="
+"','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[m"
+"n].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x"
+"=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q"
+"='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocatio"
+"nHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='authState')q='as';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k"
+"=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=functi"
+"on(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFi"
+"lters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.inde"
+"xOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.ln"
+"k=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct."
+"href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForce"
+"dLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcEl"
+"ement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a"
+".parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent"
+"\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var"
+" x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n"
+"=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=t"
+"his,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.p"
+"rotocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagN"
+"ame;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t"
+"=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toL"
+"owerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if"
+"(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.inde"
+"xOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=funct"
+"ion(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s"
+".epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s"
+".sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]"
+"]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var "
+"s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf("
+"\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclic"
+"k',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTrackin"
+"g=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s"
+"_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m)"
+"{if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}retu"
+"rn 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m"
+";l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s"
+".un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl"
+"=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e'"
+",'_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m["
+"l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))r"
+"eturn;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).ind"
+"exOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s."
+"m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).i"
+"ndexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.l"
+"oadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}"
+"else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._i"
+"n+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250"
+";if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/"
+"javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,"
+"u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){v"
+"ar s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=fu"
+"nction(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i"
+"=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s"
+".maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.d"
+"lt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketingCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloud"
+"VisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID "
+"= false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck("
+");};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._audienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s."
+"audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWa"
+"itingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;"
+"s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.visitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisito"
+"rID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s._waitingForMarketingCloudVisitorID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marke"
+"tingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnaly"
+"ticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalytics"
+"VisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;"
+"s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint ="
+" true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudience"
+"ManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._doneWaitingForAudienceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarke"
+"tingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingF"
+"orAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceMa"
+"nagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToT"
+"rack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;i"
+"f (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWh"
+"enReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack())"
+" {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._call"
+"backWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrac"
+"k=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {}"
+";for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s"
+".callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexO"
+"f('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));"
+"if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),s"
+"ess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '"
+"+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if (s.visitor) {if (s.visitor.getAuthState) {s.authState = s.visitor.getAuthState();}if ((!s.supplementalDataID) && ("
+"s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}}if(s.mpc('t',arguments))return;s.g"
+"l(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='"
+"',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.to"
+"Precision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';"
+"if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv"
+">=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.of"
+"fsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return h"
+"p');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30)"
+"{ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectio"
+"nType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);"
+"if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer)s.referrer=r;s._1_referrer=1;s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s."
+"eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if"
+"(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeav"
+"eQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else t"
+"rk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-o"
+"bject-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;"
+"if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt("
+"oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','"
+"var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+("
+"x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('"
+"t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageURLRest=s.lnk=s.eo"
+"=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=th"
+"is;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagCo"
+"ntainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y"
+"='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='functio"
+"n'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply("
+"y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagNam"
+"e){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('O"
+"pera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseF"
+"loat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;i"
+"f(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='supplementalData"
+"ID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,p"
+"pu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLi"
+"ghtProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightInc"
+"rementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,authState,linkName,linkType';var n;for(n=1"
+";n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,res"
+"olution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',track"
+"ingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccount"
+"Match,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightT"
+"rackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=functio"
+"n(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


/*
 * param : No
 * return : No
 * Descriptioin : Check the pathindicatorENG tag, select the method  which we call
 * 
 */
function callPageView(){
	initVars();
	var isPathindicatorEng = "";
	var currentUrl = unescape(window.location.href);
	
	// Exception part
	if(getOmniInputTagValue("pid")=="no"){
		initVars();
		return;
	}

/*  exception code will be used in the future...
	if (("fr".indexOf(getOmniSiteCd())!=-1 && currentUrl.indexOf("http://"+window.location.host+"/fr/business/smart-printers/") !=-1)) {
		initVars();
		return;
	}
*/
	//microsite && 라운치 피플 페이지 일경우 s_code에서 call 발생 x dong_won.lee ^_^
	if (getOmniInputTagValue("microsite")=="microsite" && (window.location.pathname.indexOf('/launching-people') > 0 /*|| window.location.pathname.indexOf('/launchingpeople') > 0 */ )) {
		return;
	}
	
	if(getOmniInputTagValue("microsite")=="microsite"){
		initVars();
		s.linkTrackVars="none";
		s.linkTrackEvents="none";
		//s.pageName = getOmniSiteCd() + ":campaign";
		//var s_code=s.t();if(s_code)document.write(s_code);  /* 161116 - 주석 처리 */
		return;
	}
	
	if(currentUrl.indexOf('/sns/login') != -1){
		return;
	}
	
	if(currentUrl.indexOf('/_ui/desktop/static/') != -1){
		return;
	}
	
	if(currentUrl.indexOf('support-ca.samsung.com/cyber/mysamsung/') != -1){
		console.log("ca mySamsung");
		return;
	}
	
	if(currentUrl.indexOf('/ng/') != -1){//Store Page
		isPathindicatorEng = "STORE";
	}else if(( currentUrl.indexOf('store.samsung.com/') != -1 || currentUrl.indexOf('shop.samsung.com/') != -1 ) && currentUrl.indexOf('/ng/') == -1) {
		switch(getOmniSiteCd()) {
			case 'dk' : 
			case 'no' : 
			case 'fi' :
			case 'se' : /* 170221 add */
			case 'au' : 
			case 'nl' :
			case 'de' :
			case 'latin' : /* Latin Shop */
			case 'fr' : isPathindicatorEng = 'HYBRIS'; break; /* 161125 - Hybris 6.0 */
			case 'br' : isPathindicatorEng = 'BRSTORE'; break; 
			default : isPathindicatorEng = 'HYBRIS'; break;		/* 170314 - UKSTORE -> HYBRIS */
		}
	}else if(getOmniInputTag("pathindicatorENG")!="none"){//Check the pathindicatorENG tag
		if(getOmniInputTag("pathindicatorENG").getElementsByTagName("a").item(0).innerHTML){
			isPathindicatorEng="Y"
		}else{
			isPathindicatorEng="N";
		}
	} else if( currentUrl.indexOf('samsungshop.com.cn') != -1 ){	/* CN Store */

		isPathindicatorEng = 'CNSTORE'; 
		
	} else if (currentUrl.indexOf('samsunglatin.store') != -1) {
		isPathindicatorEng = 'HYBRIS'; 
		
	}else{
		isPathindicatorEng = "N";
	}
	
	switch(isPathindicatorEng){
		case "STORE" : sendPageCodeStore(); break;
		case "UKSTORE" : sendPageCodeStoreUk(); break;
		case "HYBRIS" : sendPageCodeStoreHy(); break; 
		case "BRSTORE" : sendPageCodeStoreBr(); break;
		case "CNSTORE" : sendPageCodeStoreCn(); break; 
		case "Y" : sendPageCode(); break;
		case "N" : sendPageCodeUrl(); break;
	}
}

function sendPageCodeStore(){
	initVars();
	var pageUrl = unescape(window.location.href.replace(window.location.protocol+"//"+window.location.host+"/"+getOmniSiteCd()+"/ng/","")).split("/index.html")[0];
	if (pageUrl.indexOf("?")!=-1){
		pageUrl = pageUrl.split("?")[0];
	}


	var pageName = pageName = s.prop1 = getOmniSiteCd();
	pageName += ":shop:" + pageUrl.split("/").join(":"); //e-store -> shop
	if(getOmniUrlParam("eventCode")){
		pageName += ":" + getOmniUrlParam("eventCode");
	}
	s.pageName = pageName.toLowerCase();  
	s.prop40 = s.pageName;
	s.hier1 = pageName.replace(/:/gi, ">");
	
	if(s.pageName.indexOf(":error") != -1 || s.pageName.indexOf(":page not found") != -1){
		initVars();
		
		if($('#notfound_url').val() && $('#notfound_url').val() != ""){
			s.pageURL = $('#notfound_url').val();
		}
		
		if(s.pageName.indexOf(":sns:login") != -1){ // login popup - iFrame : sns button section
			initVars();
			return;
		}
		
		s.pageType = "errorPage";
		var s_code=s.t();if(s_code)document.write(s_code);
		return;
	}
	
	var depth = pageName.split(":").length;	
	if(depth >= 2) s.prop2 = s.prop1 +":"+pageName.split(":")[1];
	if(depth >= 3) s.prop3 = s.prop2 +":"+pageName.split(":")[2];
	if(depth >= 4) s.prop4 = s.prop3 +":"+pageName.split(":")[3];
	if(depth >= 5) s.prop5 = s.prop4 +":"+pageName.split(":")[4];
	
	if(s.events){
		s.events = s.events + ",event1";
	}else{
		s.events = "event1";
	}
	
	var s_code=s.t();if(s_code)document.write(s_code);
}

/*For BR Store*/
function sendPageCodeStoreBr(){
	initVars();
	var pageUrl = unescape(window.location.href.replace(window.location.protocol+"//"+window.location.host+"/"+getOmniSiteCd()+"/","")).split("/index.html")[0];
	
	if(pageUrl != null) {
		pageUrl = unescape(window.location.href.replace(window.location.protocol+"//"+window.location.host+"/"+getOmniSiteCd(),"")).split("/index.html")[0];
	}
	
	if (pageUrl.indexOf("?")!=-1){
		pageUrl = pageUrl.split("?")[0];
	}


	var pageName = pageName = s.prop1 = getOmniSiteCd();
	pageName += ":shop" + pageUrl.split("/").join(":"); //e-store -> shop
	if(getOmniUrlParam("eventCode")){
		pageName += ":" + getOmniUrlParam("eventCode");
	}
	s.pageName = pageName.toLowerCase();  
	s.prop40 = s.pageName;
	s.hier1 = pageName.replace(/:/gi, ">");
	
	if(s.pageName.indexOf(":error") != -1 || s.pageName.indexOf(":page not found") != -1){
		initVars();
		
		if($('#notfound_url').val() && $('#notfound_url').val() != ""){
			s.pageURL = $('#notfound_url').val();
		}
		
		if(s.pageName.indexOf(":sns:login") != -1){ // login popup - iFrame : sns button section
			initVars();
			return;
		}
		
		s.pageType = "errorPage";
		var s_code=s.t();if(s_code)document.write(s_code);
		return;
	}
	
		var pageType = getOmniInputTagValue("pageTrack");
		var tagFind = getOmniInputTag("pathindicatorENG").childNodes;
		
		if(pageType.indexOf("page not found") != -1 && tagFind != ""){
			var result = [];
			
			for(i=0; i<tagFind.length; i++){
				if(tagFind[i].nodeType == 1 && tagFind[i].innerHTML!=undefined && tagFind[i].innerHTML!=""){
					result.push(tagFind[i].innerHTML.replace(/\//gi, '-').replace(/&amp;/gi, 'and').toLowerCase());
				}
			}
			
			//check setup the <a> tag value
			for(k=1;k<result.length;k++){
				if(result[k]==""){
					printOmniLog("P4 Must Set up the Value of <a> tag in pathindicatorENG!!!!!!!");
					break;
				}
			}
			//end of check
			
			if(result.indexOf("page not found") != -1) {
				initVars();
				s.pageType = "errorPage";
				var s_code=s.t();if(s_code)document.write(s_code);
				return;
			}
		}
	
	
	var depth = pageName.split(":").length;	
	if(depth >= 2) s.prop2 = s.prop1 +":"+pageName.split(":")[1];
	if(depth >= 3) s.prop3 = s.prop2 +":"+pageName.split(":")[2];
	if(depth >= 4) s.prop4 = s.prop3 +":"+pageName.split(":")[3];
	if(depth >= 5) s.prop5 = s.prop4 +":"+pageName.split(":")[4];
	
	if(s.events){
		s.events = s.events + ",event1";
	}else{
		s.events = "event1";
	}
	
	var s_code=s.t();if(s_code)document.write(s_code);
}

/*For UK Store*/
function sendPageCodeStoreUk(){
	initVars();
	
	var pageUrl = unescape(window.location.href.replace(window.location.protocol+"//"+window.location.host+"/"+getOmniSiteCd()+"/","")).split("/index.html")[0];

	if(pageUrl != null) {
		pageUrl = unescape(window.location.href.replace(window.location.protocol+"//"+window.location.host+"/"+getOmniSiteCd(),"")).split("/index.html")[0];
	}

	//alert(pageUrl);
	
	if (pageUrl.indexOf("?")!=-1){
		pageUrl = pageUrl.split("?")[0];
	}
	
	// 마지막 슬래시 제거 로직
	
	var tempVar = [];
	tempVar = pageUrl.split("/");
	for (var i=0; i<tempVar.length; i++) {
	if (tempVar[i]=="") {
		tempVar.pop();
		}
	}
	pageUrl = tempVar.join("/")


	var pageName = pageName = s.prop1 = getOmniSiteCd();
	pageName += ":shop" + pageUrl.split("/").join(":"); //e-store -> shop
	if(getOmniUrlParam("eventCode")){
		pageName += ":" + getOmniUrlParam("eventCode");
	}
	s.pageName = pageName.toLowerCase();  
	s.prop40 = s.pageName;
	s.hier1 = pageName.replace(/:/gi, ">");
	
	if(s.pageName.indexOf(":error") != -1 || s.pageName.indexOf(":page not found") != -1){
		initVars();
		
		if($('#notfound_url').val() && $('#notfound_url').val() != ""){
			s.pageURL = $('#notfound_url').val();
		}
		
		if(s.pageName.indexOf(":sns:login") != -1){ // login popup - iFrame : sns button section
			initVars();
			return;
		}
		
		s.pageType = "errorPage";
		var s_code=s.t();if(s_code)document.write(s_code);
		return;
	}
	
	var depth = pageName.split(":").length;	
	if(depth >= 2) s.prop2 = s.prop1 +":"+pageName.split(":")[1];
	if(depth >= 3) s.prop3 = s.prop2 +":"+pageName.split(":")[2];
	if(depth >= 4) s.prop4 = s.prop3 +":"+pageName.split(":")[3];
	if(depth >= 5) s.prop5 = s.prop4 +":"+pageName.split(":")[4];
	
	if(s.events){
		s.events = s.events + ",event1";
	}else{
		s.events = "event1";
	}
	
	var s_code=s.t();if(s_code)document.write(s_code);
}

/*For Hybris 6.0 Store*/
function sendPageCodeStoreHy(){
	initVars();
	
	var pageUrl; 
	var split_PN = window.location.pathname.split(".")[0].split("/");
	var result=[];
	
	/* shop.samsung.com/{site code} : i=2 */
	for(i=2;i<split_PN.length;i++){
		if(split_PN[i]!=""){
			result.push(split_PN[i]);
		}
	}
	
	result.unshift("shop"); 
	result.unshift(getOmniSiteCd()); 

	var pageName = result.join(":"); 
		
	if(getOmniUrlParam("eventCode")){
		pageName += ":" + getOmniUrlParam("eventCode");
	}
	
	s.pageName = pageName.toLowerCase();  
	s.prop40 = s.pageName;
	s.hier1 = pageName.replace(/:/gi, ">");
	
	if(s.pageName.indexOf(":error") != -1 || s.pageName.indexOf(":page not found") != -1){
		initVars();
		
		if($('#notfound_url').val() && $('#notfound_url').val() != ""){
			s.pageURL = $('#notfound_url').val();
		}
		
		if(s.pageName.indexOf(":sns:login") != -1){ // login popup - iFrame : sns button section
			initVars();
			return;
		}
		
		s.pageType = "errorPage";
		var s_code=s.t();if(s_code)document.write(s_code);
		
		return;
	}
	
	var pageType = getOmniInputTagValue("pageTrack");
	var tagFind = getOmniInputTag("pathindicatorENG").childNodes;
		
	if(pageType.indexOf("page not found") != -1 && tagFind != ""){
		var result = [];
		
		for(i=0; i<tagFind.length; i++){
			if(tagFind[i].nodeType == 1 && tagFind[i].innerHTML!=undefined && tagFind[i].innerHTML!=""){
				result.push(tagFind[i].innerHTML.replace(/\//gi, '-').replace(/&amp;/gi, 'and').toLowerCase());
			}
		}
		
		//check setup the <a> tag value
		for(k=1;k<result.length;k++){
			if(result[k]==""){
				printOmniLog("P4 Must Set up the Value of <a> tag in pathindicatorENG!!!!!!!");
				break;
			}
		}
		//end of check
		
		if(result.indexOf("page not found") != -1) {
			initVars();
			s.pageType = "errorPage";
			var s_code=s.t();if(s_code)document.write(s_code);
			return;
		}
	}
	
	//s.prop1 = getOmniSiteCd();
	s.prop1 = result[0];
	if(result[1]) s.prop2 =  s.prop1 +":"+ result[1];
	if(result[2]) s.prop3 =  s.prop2 +":"+ result[2];
	if(result[3]) s.prop4 =  s.prop3 +":"+ result[3];
	if(result[4]) s.prop5 =  s.prop4 +":"+ result[4];

	if(s.events){
		s.events = s.events + ",event1";
	}else{
		s.events = "event1";
	}
	
	var s_code=s.t();if(s_code)document.write(s_code);
}


/*For CN Store*/
function sendPageCodeStoreCn(){
	initVars();
	var pageUrl = unescape(window.location.href.replace(window.location.protocol+"//"+window.location.host+"/","")).split(".htm")[0];

	if(pageUrl != "") {
		pageUrl = unescape(window.location.href.replace(window.location.protocol+"//"+window.location.host,"")).split(".htm")[0];
	}
	
	if (pageUrl.indexOf("?")!=-1){
		pageUrl = pageUrl.split("?")[0];
	}

	var pageName = pageName = s.prop1 = getOmniSiteCd();
	pageName += ":shop" + pageUrl.split("/").join(":"); //e-store -> shop
		
	if(getOmniUrlParam("eventCode")){
		pageName += ":" + getOmniUrlParam("eventCode");
	}
	s.pageName = pageName.toLowerCase();  
	s.prop40 = s.pageName;
	s.hier1 = pageName.replace(/:/gi, ">");
	
	if(s.pageName.indexOf(":error") != -1 || s.pageName.indexOf(":page not found") != -1){
		initVars();
		
		if($('#notfound_url').val() && $('#notfound_url').val() != ""){
			s.pageURL = $('#notfound_url').val();
		}
		
		if(s.pageName.indexOf(":sns:login") != -1){ // login popup - iFrame : sns button section
			initVars();
			return;
		}
		
		s.pageType = "errorPage";
		var s_code=s.t();if(s_code)document.write(s_code);
		return;
	}
	
	var depth = pageName.split(":").length;	
	if(depth >= 2) s.prop2 = s.prop1 +":"+pageName.split(":")[1];
	if(depth >= 3) s.prop3 = s.prop2 +":"+pageName.split(":")[2];
	if(depth >= 4) s.prop4 = s.prop3 +":"+pageName.split(":")[3];
	if(depth >= 5) s.prop5 = s.prop4 +":"+pageName.split(":")[4];
	
	if(s.events){
		s.events = s.events + ",event1";
	}else{
		s.events = "event1";
	}
	
	var s_code=s.t();if(s_code)document.write(s_code);
}


/*
 * param : No
 * return : No
 * Descriptioin : Using pathindicatorENG tag and  Omniture PV call
*/
function sendPageCode(group, category){
	if(group!=null){
		return;
	}
	
	try{
		var tagFind = getOmniInputTag("pathindicatorENG").childNodes;
		var result = [];
		
		for(i=0; i<tagFind.length; i++){
			if(tagFind[i].nodeType == 1 && tagFind[i].innerHTML!=undefined && tagFind[i].innerHTML!=""){
				result.push(tagFind[i].innerHTML.replace(/\//gi, '-').replace(/&amp;/gi, 'and').toLowerCase());
			}
		}
		
		//check setup the <a> tag value
		for(k=1;k<result.length;k++){
			if(result[k]==""){
				printOmniLog("P4 Must Set up the Value of <a> tag in pathindicatorENG!!!!!!!");
				break;
			}
		}
		//end of check
		
		//according to the URL, control setting the vlaue of s.prop1
		if(isOmniInstore()){
			s.prop1 = getOmniShopId();
		}else{
			s.prop1 = getOmniSiteCd();
	    }
		//end fo the setting
		
		if(getOmniInputTagValue("pageTrack")=="product detail" || getOmniInputTagValue("pageTrack")=="support detail" || getOmniInputTagValue("pageTrack")=="business product detail" || getOmniInputTagValue("pageTrack")=="instore product detail"){
			s.pageName = s.prop1 + ":" + result.join(":") + ":" + getOmniInputTagValue("model_code");
		}else if(getOmniInputTagValue("pageTrack") == "business insights detail" && result.length == 3 && result[0] == "business"&& (result[1] == "resources" || result[1] == "resource")){ //business insights detail 
			(getOmniInputTagValue("resource_name")) ? result.push(getOmniInputTagValue("resource_name")):"";
			s.pageName = s.prop1 + ":" + result.join(":");
			//(getOmniInputTagValue("resource_name")) ? s.pageName = s.prop1 + ":" + result.join(":") + ":" + getOmniInputTagValue("resource_name") : s.pageName = s.prop1 + ":" + result.join(":")
		}else if(getOmniInputTagValue("pageTrack") == "business resource detail" && result.length == 3 && result[0] == "business"&& result[1] == "resource"){ //business resource detail 
			(getOmniInputTagValue("resource_name")) ? result.push(getOmniInputTagValue("resource_name")):"";
			s.pageName = s.prop1 + ":" + result.join(":");
		}else if(getOmniInputTagValue("pageTrack") == "support category" && result.length == 2 && result[0] == "support"){ //support category
			(getOmniInputTagValue("type")) ? result.push(getOmniInputTagValue("type")):"";
			s.pageName = s.prop1 + ":" + result.join(":");
        }else if(getOmniInputTagValue("pageTrack") == "news detail" && result.length == 2 && result[0] == "news"){ //news detail
			(getOmniInputTagValue("new_alert_name")) ? result.push(getOmniInputTagValue("new_alert_name")):"";
			s.pageName = s.prop1 + ":" + result.join(":");
        }else if(getOmniInputTagValue("pageTrack") == "estore" && result.length == 1 ){ //estore main
		    result[0] = result[0].replace('e-store','shop');
		    result[0] = result[0].replace('e-shop','shop');
			s.pageName = s.prop1 + ":" + result.join(":");
        }else{
			s.pageName = s.prop1 + ":" + result.join(":");
		}
		
		if(s.pageName.indexOf(":error") != -1 || s.pageName.indexOf(":page not found") != -1){
			initVars();
			s.pageType = "errorPage";
			var s_code=s.t();if(s_code)document.write(s_code);
			return;
		}
		
		if(result[0]) s.prop2 = s.prop1 +":"+result[0];
		if(result[1]) s.prop3 = s.prop2 +":"+result[1];
		if(result[2]) s.prop4 = s.prop3 +":"+result[2];
		if(result[3]) s.prop5 = s.prop4 +":"+result[3];
		
		s.hier1 = s.pageName.replace(/:/gi, ">");
		s.prop40 = s.pageName;
		
	}catch(e){
		printOmniLog("Error occurs in sendPageCode`s Top");
	}
	
	try{
		var pageType = getOmniInputTagValue("pageTrack");
		
		if(pageType != ""){
			if (pageType.indexOf("product article")!=-1){
				if (pageType.indexOf("detail")!=-1) {
					var articleVal = [];
					var articleValNo;

					if(getOmniInputTagValue("artice_id")!=""||getOmniInputTagValue("article_id")!=""){
						articleVal.push(getOmniInputTagValue("artice_id"));
						articleVal.push(getOmniInputTagValue("article_id"));	
					}else{
						printOmniLog("You must set up the artice_id!!!!!!");
					}
				
					if(getOmniInputTagValue("artice_name")!=""||getOmniInputTagValue("article_name")!=""){
						articleVal.push(getOmniInputTagValue("artice_name"));
						articleVal.push(getOmniInputTagValue("article_name"));
					}else{
						printOmniLog("You must set up the artice_name!!!!!!");
					}
						
						articleValNo = articleVal.length;
						for (var i=0; i<articleValNo; i++) {
							if (articleVal[0]=="") {
								articleVal.shift();
							}
						}
						s.eVar38 = "article:"+articleVal[0];
				}else{
						s.eVar38 = "article";
                }
			}else if(pageType.indexOf("product offer detail")!=-1 || pageType.indexOf("instore offer detail")!=-1){
				var offerVal = [];
				
				if(getOmniInputTagValue("offer_id")!=""){
					offerVal.push(getOmniInputTagValue("offer_id"));
				}else{
					printOmniLog("You must set up the offer_id!!!!!!");
				}
				
				if(getOmniInputTagValue("offer_name")!=""){
					offerVal.push(getOmniInputTagValue("offer_name"));
				}else{
					printOmniLog("You must set up the offer_name!!!!!!");
				}
				
				s.eVar38 = "offer:"+offerVal[0];
			}else if(pageType.indexOf("business solution detail")!=-1){
				s.eVar11 = getOmniInputTagValue("pvi_type_name");
				s.eVar12 = getOmniInputTagValue("pvi_subtype_name");
				s.eVar13 =  getOmniInputTagValue("pvi_project_name");
				
				var solutionVal = [];
				
				if(getOmniInputTagValue("solution_id")!=""){
					solutionVal.push(getOmniInputTagValue("solution_id"));
				}else{
					printOmniLog("You must set up the solution_id!!!!!!");
				}
				
				if(getOmniInputTagValue("solution_name")!=""){
					solutionVal.push(getOmniInputTagValue("solution_name"));
				}else{
					printOmniLog("You must set up the solution_name!!!!!!");
				}
				s.eVar38 = solutionVal.join(":");
			}else if(pageType.indexOf("support detail")!=-1){
				s.eVar14 = getOmniInputTagValue("model_code");
				s.eVar15 = getOmniInputTagValue("display_name");
				
				s.events = "event2";
				if(getOmniInputTagValue("model_name")!=""){
					s.products =";"+ getOmniInputTagValue("model_name").toUpperCase();
				}else{
					printOmniLog("You Must set up the input tag value about model_name!!!!!!!")
				}
			}else if(pageType.indexOf("business product detail")!=-1){
				s.eVar11 = getOmniInputTagValue("pvi_type_name");
				s.eVar12 = getOmniInputTagValue("pvi_subtype_name");
				s.eVar13 = getOmniInputTagValue("pvi_project_name");
				s.eVar14 = getOmniInputTagValue("model_code");
				s.eVar15 = getOmniInputTagValue("display_name");
				
				s.events = "prodView,event2";
				if(getOmniInputTagValue("model_name")!=""){
					s.products =";"+getOmniInputTagValue("model_name").toUpperCase();
				}else{
					printOmniLog("You Must set up the input tag value about !!!!!!model_name!!!!!!!")
				}
			}else if(pageType.indexOf("product detail") != -1 || pageType.indexOf("instore product detail")!=-1 || pageType.indexOf("flagship pdp")!=-1 ){
				s.eVar11 = getOmniInputTagValue("pvi_type_name");
				s.eVar12 = getOmniInputTagValue("pvi_subtype_name");
				s.eVar13 = getOmniInputTagValue("pvi_project_name");
				s.eVar14 = getOmniInputTagValue("model_code");
				s.eVar15 = getOmniInputTagValue("display_name");

				s.events="prodView,event2";
				if(getOmniInputTagValue("model_name")!=""){
					s.products = ";"+getOmniInputTagValue("model_name").toUpperCase();
				}else{
					printOmniLog("You must setup the input tag value about !!!!!!model_name!!!!!!!");
				}
			}else if(pageType.indexOf("product category") != -1 || pageType.indexOf("support category")!=-1 || (pageType.indexOf("business")!=-1 && pageType.indexOf("landing")!=-1) && pageType.indexOf("business support landing")==-1 || "support sub category".indexOf(pageType)!=-1){
				//B2B prop8 setting correction
				var groupVal = [];
				if(getOmniTopSection()!="") groupVal.push(getOmniTopSection());
				if(pageType=="business product category"){//BUSINESS
					groupVal.push(getOmniInputTagValue("type").toLowerCase());
					s.eVar8 = s.prop8 = groupVal.join(":");
				}else if("support category,support sub category,product category,business product category".indexOf(pageType)!=-1) {//B2C, SUPPORT
					groupVal.push(getOmniInputTagValue("group").toLowerCase());
					s.eVar8 = s.prop8 = groupVal.join(":");
				}
			}
		}
	}catch(e){
		printOmniLog("Error occurs in sendPageCode`s Bottom");
	}
	
	if(s.events){
		s.events = s.events + ",event1";
	}else{
		s.events = "event1";
	}
	
	var s_code=s.t();if(s_code)document.write(s_code);
}


/*
 * param : No
 * return : No
 * Descriptioin : Using URL and  Omniture PV 콜 발생
 */
function sendPageCodeUrl(){
	initVars();
	
	//according to the URL, control setting the vlaue of s.prop1
	if(isOmniInstore()){
		s.prop1 = getOmniShopId();
	}else{
		s.prop1 = getOmniSiteCd();
	}
	//end fo the setting
	
	var split_PN = window.location.pathname.split(".")[0].split("/");
	var result=[];
	
	for(i=1;i<split_PN.length;i++){
		if(split_PN[i]!=""){
			result.push(split_PN[i]);
		}
	}
	
	/* JP galaxymobile.jp" */
	if((window.location.host.indexOf("galaxymobile.jp") != -1) || (window.location.host.indexOf("dev.galaxymobile.jp") != -1)) {

		result.unshift(getOmniSiteCd()); 
	}
	
	/* SEC B2B */
	if(("www.samsungb2b.co.kr".indexOf(window.location.host) != -1) || ("dev.local.samsungb2b.co.kr".indexOf(window.location.host) != -1)) {
  
	  if(result[0].toLowerCase() != "support") {				// sec:business:support:Support:Main 중복 노출 예외 처리 
	  	result.unshift("support");
	  }
  	result.unshift("business"); 
  	result.unshift(getOmniSiteCd()); 
	}
  
	//ru mysamsung exception
	if ("support.ru.samsung.com".indexOf(window.location.host)!=-1) {
		result.unshift(getOmniSiteCd());
		"mysamsung4".indexOf(result[1])!=-1 ? result[1] = "mysamsung" : result[1] = result[1];
	}
		  	//sec local page track
	if(result[0].indexOf("comLocal") != -1 ){
		result[0] = s.prop1;
	}

	//cn estore landing page
	if(result.length >= 2)
	{
   if(result[0].indexOf("cn") != -1 &&result[1].indexOf("estore") != -1 ){
	   result[1] = result[1].replace('estore','shop');
   }
	}
	
	s.pageName = result.join(":"); 
	s.hier1 = s.pageName.replace(/:/gi, ">");
	s.prop40 = s.pageName;
	
	if(s.pageName.indexOf(":error") != -1 || s.pageName.indexOf(":page not found") != -1){
		initVars();
		s.pageType = "errorPage";
		var s_code=s.t();if(s_code)document.write(s_code);
		return;
	}
	
	if(result[1]) s.prop2 =  s.prop1 +":"+ result[1];
	if(result[2]) s.prop3 =  s.prop2 +":"+ result[2];
	if(result[3]) s.prop4 =  s.prop3 +":"+ result[3];
	if(result[4]) s.prop5 =  s.prop4 +":"+ result[4];
	
	try{
		var pageType = getOmniInputTagValue("pageTrack");
		
		if(pageType != ""){
			if (pageType.indexOf("product article")!=-1){
				if (pageType.indexOf("detail")!=-1) {
					var articleVal = [];
					var articleValNo;

					if(getOmniInputTagValue("artice_id")!=""||getOmniInputTagValue("article_id")!=""){
						articleVal.push(getOmniInputTagValue("artice_id"));
						articleVal.push(getOmniInputTagValue("article_id"));	
					}else{
						printOmniLog("You must set up the artice_id!!!!!!");
					}
				
					if(getOmniInputTagValue("artice_name")!=""||getOmniInputTagValue("article_name")!=""){
						articleVal.push(getOmniInputTagValue("artice_name"));
						articleVal.push(getOmniInputTagValue("article_name"));
					}else{
						printOmniLog("You must set up the artice_name!!!!!!");
					}
						
						articleValNo = articleVal.length;
						for (var i=0; i<articleValNo; i++) {
							if (articleVal[0]=="") {
								articleVal.shift();
							}
						}
						s.eVar38 = "article:"+articleVal[0];
				}else{
						s.eVar38 = "article";
                }
			}else if(pageType.indexOf("product offer detail")!=-1 || pageType.indexOf("instore offer detail")!=-1){
				var offerVal = [];
				
				if(getOmniInputTagValue("offer_id")!=""){
					offerVal.push(getOmniInputTagValue("offer_id"));
				}else{
					printOmniLog("You must set up the offer_id!!!!!!");
				}
				
				if(getOmniInputTagValue("offer_name")!=""){
					offerVal.push(getOmniInputTagValue("offer_name"));
				}else{
					printOmniLog("You must set up the offer_name!!!!!!");
				}
				
				s.eVar38 = "offer:"+offerVal[0];
			}else if(pageType.indexOf("business solution detail")!=-1){
				s.eVar11 = getOmniInputTagValue("pvi_type_name");
				s.eVar12 = getOmniInputTagValue("pvi_subtype_name");
				s.eVar13 =  getOmniInputTagValue("pvi_project_name");
				
				var solutionVal = [];
				
				if(getOmniInputTagValue("solution_id")!=""){
					solutionVal.push(getOmniInputTagValue("solution_id"));
				}else{
					printOmniLog("You must set up the solution_id!!!!!!");
				}
				
				if(getOmniInputTagValue("solution_name")!=""){
					solutionVal.push(getOmniInputTagValue("solution_name"));
				}else{
					printOmniLog("You must set up the solution_name!!!!!!");
				}
				s.eVar38 = solutionVal.join(":");
			}else if(pageType.indexOf("support detail")!=-1){   /* SEC B2B */
				if(("www.samsungb2b.co.kr".indexOf(window.location.host) == -1) && ("dev.local.samsungb2b.co.kr".indexOf(window.location.host) == -1))
				{
					s.eVar14 = getOmniInputTagValue("model_code");
					s.eVar15 = getOmniInputTagValue("display_name");
					s.events = "event2";
					if(getOmniInputTagValue("model_name")!=""){
						s.products =";"+ getOmniInputTagValue("model_name").toUpperCase();
					}else{
						printOmniLog("You Must set up the input tag value about model_name!!!!!!!")
					}
				}
			}else if(pageType.indexOf("business product detail")!=-1){
				s.eVar11 = getOmniInputTagValue("pvi_type_name");
				s.eVar12 = getOmniInputTagValue("pvi_subtype_name");
				s.eVar13 = getOmniInputTagValue("pvi_project_name");
				s.eVar14 = getOmniInputTagValue("model_code");
				s.eVar15 = getOmniInputTagValue("display_name");
				s.events = "prodView,event2";
				if(getOmniInputTagValue("model_name")!=""){
					s.products =";"+getOmniInputTagValue("model_name").toUpperCase();
				}else{
					printOmniLog("You Must set up the input tag value about !!!!!!model_name!!!!!!!")
				}
			}else if(pageType.indexOf("product detail") != -1 || pageType.indexOf("instore product detail")!=-1 || pageType.indexOf("flagship pdp")!=-1){
				s.eVar11 = getOmniInputTagValue("pvi_type_name");
				s.eVar12 = getOmniInputTagValue("pvi_subtype_name");
				s.eVar13 = getOmniInputTagValue("pvi_project_name");
				s.eVar14 = getOmniInputTagValue("model_code");
				s.eVar15 = getOmniInputTagValue("display_name");
				s.events="prodView,event2";
				if(getOmniInputTagValue("model_name")!=""){
					s.products = ";"+getOmniInputTagValue("model_name").toUpperCase();
				}else{
					printOmniLog("You must setup the input tag value about !!!!!!model_name!!!!!!!");
				}
			}else if(pageType.indexOf("product category") != -1 || pageType.indexOf("support category")!=-1 || (pageType.indexOf("business")!=-1 && pageType.indexOf("landing")!=-1) && pageType.indexOf("business support landing")==-1|| "support sub category".indexOf(pageType)!=-1){
				//B2B prop8 setting correction
				var groupVal = [];
				if(getOmniTopSection()!="") groupVal.push(getOmniTopSection());
				if(pageType=="business product category"){//BUSINESS
					groupVal.push(getOmniInputTagValue("type").toLowerCase());
					s.eVar8 = s.prop8 = groupVal.join(":");
				}else if("support category,support sub category,product category,business product category".indexOf(pageType)!=-1) {//B2C, SUPPORT
					groupVal.push(getOmniInputTagValue("group").toLowerCase());
					s.eVar8 = s.prop8 = groupVal.join(":");
				}
			}
		}
	}catch(e){
		printOmniLog("Error occurs in sendPageCodeUrl`s Bottom");
	}
	
	if(s.events){
		s.events = s.events + ",event1";
	}else{
		s.events = "event1";
	}
	
	var s_code=s.t();if(s_code)document.write(s_code);
}


function sendStaticPageCode(){
	var pageName = "";
	var pageTrack = "";
	
	var siteCode = window.location.href.replace(window.location.protocol+"//"+window.location.host+"/_ui/desktop/static/", "").split("/")[0];
	
	s.sa("sssamsung4"+siteCode+",sssamsung4mstglobal");
	
	//Gear2/index.html
	//Gear2/
	var pageUrl = unescape(window.location.href.replace(window.location.protocol+"//"+window.location.host+"/_ui/desktop/static/"+siteCode+"/","")).split(".")[0];
	var pageName = s.prop1 = siteCode;
	pageName += ":" + pageUrl.split("/").join(":");
	pageName = pageName.toLowerCase();
	
	initVars();
	
	s.pageName = pageName;
	
	s.hier1 = pageName.replace(/:/gi, ">");
	
	pageTrack = "p4 static page";
	s.prop6 = pageTrack;
	s.events = "event1";
	
	if ( pageName.split(":")[0] != undefined ) {
		s.prop1 = s.eVar1 = pageName.split(":")[0];
	}
	
	if ( pageName.split(":")[1] != undefined ) {
		s.prop2 = s.prop1 + ":"+ pageName.split(":")[1];
		s.channel = s.prop2;
	}
	
	if ( pageName.split(":")[2] != undefined ) {
		s.prop3 = s.prop2 + ":"+ pageName.split(":")[2];
	}
	
	if ( pageName.split(":")[3] != undefined ) {
		s.prop4 = s.prop3 + ":" + pageName.split(":")[3];
	}
	
	if ( pageName.split(":")[4] != undefined ) {
		s.prop5 = s.prop4 + ":" + pageName.split(":")[4];
	}
	
	var s_code=s.t();if(s_code)document.write(s_code);
}


/*
 * param : No
 * return : No
 * Descriptioin : Call the pid tagging
 */
function getPid(data){
	var siteCd = getOmniSiteCd();

	//(mean : addition of condition) Each call of the getPid() below var set up every Click;
	// 20160211 v63 변수 추가 (visitor)
	s.linkTrackVars = "eVar6,eVar9,eVar39,eVar40,eVar7,eVar63";
	s.eVar6 = getOmniInputTagValue("pageTrack");
	s.eVar9 = getOmniDeviceType();
	s.eVar39 = window.location.href;
	s.eVar40 = s.pageName;
	//MCID 사용 국가 eVar63 값 설정
	s.eVar63 = getOmniCookie("s_vi");
	if(getOmniCookie("s_vi").indexOf('null')==0){
		s.eVar63 = "D=mid";
	} 
	//End of the set up var
	
	/*var v7Cookie = getOmniCookie("s_evar7");
	if ((v7Cookie != null) && (v7Cookie != "")) {
		if ( v7Cookie.indexOf(data) != -1 ){
			printOmniLog("second click of PID : " + data);
			return;
		}
	}*/

	s.linkTrackEvents='none';
	//s.linkTrackVars="eVar7";
	s.eVar7 = data.toLowerCase();
	//s.tl(true, "o", "internal_campaign_tracking");
	s.tl(this, "o", "internal_campaign_tracking");	/* 20160223 - call option 변경 (true->this)*/

	s.linkTrackVars='none';
}
		

/*
/*The things that are not used well 
/*for example, if the microsite is called, the below moethod will be processed
*/
function recallClickCode(trackName,tempData,optionType){
	//variable initiation
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
	var splitvars="";
	var events = "";	var eVar = "";	var prop = "";	var products = "";	var type = ""; var name = ""; var tempEvar="";
	var tempProp="";
	//end of variable initiation
	
	//split tempData by using "|"
	var splitvars = tempData.split("|");
	
	for (var i = 0; i <splitvars.length; i++) {
		if(splitvars[i].indexOf("=")!=-1){
			if(splitvars[i].split("=")[0].indexOf("v")!=-1){
				if(eVar=="none"||eVar==""){
					eVar ="eVar".concat(splitvars[i].substring(1,splitvars[i].indexOf("=")));
					s[eVar]=splitvars[i].split("=")[1];
				}else{
					tempEvar = "eVar".concat(splitvars[i].substring(1,splitvars[i].indexOf("=")));
					s[tempEvar]=splitvars[i].split("=")[1];
					eVar+=","+tempEvar;
				}
			}else if(splitvars[i].split("=")[0].indexOf("c")!=-1){
				if(prop!=""){
					tempProp = "prop".concat(splitvars[i].substring(1,splitvars[i].indexOf("=")));
					s[tempProp]=splitvars[i].split("=")[1];
					prop+= ","+tempProp;
				}else{
					prop="prop".concat(splitvars[i].substring(1,splitvars[i].indexOf("=")));
					s[prop]=splitvars[i].split("=")[1];
				}
			}else if(splitvars[i].split("=")[0].indexOf("e")!=-1){
				if(events!=""){
					s.events=events+","+splitvars[i].split("=")[1];
				}else{
					s.events=splitvars[i].split("=")[1];
				}
				
			}else if(splitvars[i].split("=")[0].indexOf("t")!=-1){
				type = splitvars[i].split("=")[1];
			}else if(splitvars[i].split("=")[0].indexOf("n")!=-1){
				name = splitvars[i].split("=")[1];
			}
			
			//linkTrackVars, linkTrackEvents setting
			//Check existence of prop
			if(prop!=""){
				//Check existence of events
				if(s.events!=""){
					s.linkTrackVars=eVar+","+prop+",events";
					s.linkTrackEvents=s.events;
				}else{
					s.linkTrackVars=eVar+","+prop;
				}
			}else{
				if(s.events!=""){
					s.linkTrackVars=eVar+",events";
					s.linkTrackEvents=s.events;
				}else{
					s.linkTrackVars=eVar;
				}
			}
		}
	}
	s.tl(true, type, name);
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
	initVars();
}

//about purchase
// 20160211 v63 변수 추가 (visitor)
function setClickVar(){
	if ( s.linkTrackVars == "none" ) {
		s.linkTrackVars = "eVar6,eVar39,eVar40,eVar9,eVar63";			
	} else {
		s.linkTrackVars += ",eVar6,eVar39,eVar40,eVar9,eVar63";	
	}
	
	s.eVar6 = getOmniInputTagValue("pageTrack");
	s.eVar39 = window.location.href;
	s.eVar40 = s.pageName;
	s.eVar9 = getOmniDeviceType();
	//MCID 사용 국가 eVar63 값 설정
	s.eVar63 = getOmniCookie("s_vi");
	if(getOmniCookie("s_vi").indexOf('null')==0){
		s.eVar63 = "D=mid";
	} 
}

function sendScCheckOutApply(order){
	s.linkTrackVars="eVar36,products";
	s.linkTrackEvents="";
	s.eVar36="check out:card information:apply";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	setClickVar();
	s.tl(true,"o","sendScCheckOutApply");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScCheckOutPayment(order){
	s.linkTrackVars="eVar36,products";
	s.linkTrackEvents="";
	s.eVar36="check out:review:payment";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	setClickVar();
	s.tl(true,"o","scCheckOutPayment");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}
 
//함수 추가 
function sendScCheckOutPaymentOpt(order, dOption, pMethod){
	s.linkTrackVars="eVar36,eVar37,products";
	s.linkTrackEvents="";
	s.eVar36="check out:review:payment";
	if (order.indexOf(",")!=-1){
		s.eVar37 = "multi options:"+ pMethod;
	}else{
		s.eVar37=dOption+":"+pMethod;
	}
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	setClickVar();
	s.tl(true,"o","scCheckOutPayment");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}
//
function sendScCheckOutModify(order){
	s.linkTrackVars="eVar36,products";
	s.linkTrackEvents="";
	s.eVar36="check out:review:modify";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	setClickVar();
	s.tl(true,"o","sendScCheckOutModify");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScAdd(order){
	s.linkTrackVars = "events,products";
	s.linkTrackEvents = "scAdd";
	s.events="scAdd";
	s.products=";"+order.toUpperCase();
	s.products=s.products.replace(/;;/gi, ';');
	setClickVar();
	s.tl(true, "o", "scAdd");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScAddPrd(mname, mcode){
	s.linkTrackVars = "eVar41,events,products";
	s.linkTrackEvents = "scAdd";
	if(mcode) {
		s.eVar41 = mcode.toUpperCase();
	} 
	s.events="scAdd";
	s.products=";"+mname.toUpperCase();
	s.products=s.products.replace(/;;/gi, ';');
	setClickVar();
	s.tl(true, "o", "scAddPrd");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScRemove(order){
	s.linkTrackVars = "events,products";
	s.linkTrackEvents = "scRemove";
	s.events="scRemove";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	if ( getOmniInputTagValue("pageTrack").indexOf("product detail") != -1 || getOmniInputTagValue("pageTrack").indexOf("support detail") != -1){
		if (s.linkTrackVars.indexOf("eVar41") < 0){
			s.linkTrackVars += ",eVar41";
		}
		if(getOmniInputTagValue("model_name") != ""){
			s["products"]=";"+getOmniInputTagValue("model_name").toUpperCase();
			s["eVar41"] = getOmniInputTagValue("model_code");
		}else{
			printOmniLog("You Must setup the input tag value about !!!!!!model_name!!!!!!!")
		}
	}
	setClickVar();
	s.tl(true, "o", "scRemove");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}


function sendScView(order){
	s.linkTrackVars = "events,products";
	s.linkTrackEvents="scView";
	s.events="scView";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	if ( getOmniInputTagValue("pageTrack").indexOf("product detail") != -1 || getOmniInputTagValue("pageTrack").indexOf("support detail") != -1){
		if (s.linkTrackVars.indexOf("eVar41") < 0){
			s.linkTrackVars += ",eVar41";
		}
		if(getOmniInputTagValue("model_name") != ""){
			s["products"]=";"+getOmniInputTagValue("model_name").toUpperCase();
			s["eVar41"] = getOmniInputTagValue("model_code");
		}else{
			printOmniLog("You Must setup the input tag value about !!!!!!model_name!!!!!!!")
		}
	}

	setClickVar();
	s.tl(true,"o","scView");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScViewCat(order,mCode){
	s.linkTrackVars = "events,products,eVar41";
	s.linkTrackEvents="scView";
	s.events="scView";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	s.eVar41 = mCode;
	setClickVar();
	s.tl(true,"o","scView");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScUpdate(order){
	s.linkTrackVars = "events,products";
	s.linkTrackEvents = "event43";
	s.events = "event43";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	setClickVar();
	s.tl(true,"o","scUpdate");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

//프로모 코드 발급 함수 추가 
function sendScApplyOpt(order,pCode){
	var siteCd = getOmniSiteCd();
	s.eVar26 = "cart:"+pCode;//26 setting ?
	s.linkTrackVars="events,eVar26,products";
	s.products=order.toUpperCase().replace(/;;/gi, ';');
	s.linkTrackEvents="event26";
	s.events="event26";
	setClickVar();
	s.tl(true, "o", "scApply");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}


function sendScApply(order){
	var siteCd = getOmniSiteCd();
	s.eVar26 = "cart:promo/coupon code";//26 setting ?
	s.linkTrackVars="events,eVar26,products";
	s.products=order.toUpperCase().replace(/;;/gi, ';');
	s.linkTrackEvents="event26";
	s.events="event26";
	setClickVar();
	s.tl(true, "o", "scApply");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScCheckout(order){
	s.linkTrackVars="events,products";
	s.linkTrackEvents="scCheckout";
	s.events="scCheckout";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	setClickVar();
	s.tl(true,"o","scCheckout");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}
function sendScCheckoutOpt(order,dOption,pMethod){
	s.linkTrackVars="events,eVar37,products";
	s.linkTrackEvents="scCheckout";
	s.events="scCheckout";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	s.eVar37=dOption+":"+pMethod;
	setClickVar();
	s.tl(true,"o","scCheckout");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScPurchase(order,pId,dOption,pMethod){
	var productNo="";
	var tempNo=null;
	var splitOrder="";
	if(order.indexOf(",")!=-1){
		
		splitOrder = order.split(",");
		for(i=0;i<splitOrder.length;i++){
			
			tempNo = tempNo+ parseInt(splitOrder[i].split(";")[2]);	
		}
		productNo = tempNo.toString();
		
	}else{
		productNo=order.split(";")[2]
	}
	s.eVar37=dOption+":"+pMethod;
	s.products=order.toUpperCase().replace(/;;/gi, ';');
	s.purchaseID=pId;
	s.eVar50=pId;
	s.linkTrackVars="eVar37,events,products,purchaseID,eVar50";
	s.linkTrackEvents="purchase";
	s.events="purchase";
	setClickVar();
	s.tl(true,"o","scPurchase");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';

}
//sendMsOrderReturn
function sendMsOrderReturn(order, revenue){
	s.linkTrackVars="events,products";
	s.events="event36,event37,event38";
	s.linkTrackEvents=s.events;
	s.products=order.toUpperCase().replace(/EVENT/gi, 'event');
	setClickVar();
	s.tl(true, "o", "order return");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}
function sendMsOrderCancel(order, revenue){
	s.linkTrackVars="events,products";
	s.events="event39,event40,event41";
	s.linkTrackEvents=s.events;
	s.products=order.toUpperCase().replace(/EVENT/gi, 'event');
	setClickVar();
	s.tl(true, "o", "order cancel");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}
   

//checkout process update 20141210 ************************************************************************************************************
function sendScBasket(mname,mcode){
	s.linkTrackVars = "events,products,eVar41";
	s.events="scAdd,scView";
	s.linkTrackEvents = s.events;
	s.products= ";"+mname.toUpperCase();
	s.products= s.products.replace(/;;/gi, ';');
	s.eVar41=mcode.toUpperCase();
	setClickVar();
	s.tl(true, "o", "scBasket");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScBasketAdd(mname, mcode){
	s.linkTrackVars = "eVar41,eVar36,events,products";
	s.linkTrackEvents = "scAdd";
	s.eVar41 = mcode.toUpperCase();
    s.eVar36 = "basket:recommended product";
	s.events="scAdd";
	s.products=";"+mname.toUpperCase();
	s.products=s.products.replace(/;;/gi, ';');
	setClickVar();
	s.tl(true, "o", "scBasketAdd");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScOrderApply(order,pCode){
	s.eVar26 = "cart:"+pCode;
	s.linkTrackVars="events,eVar26,products";
	s.products=order.toUpperCase().replace(/;;/gi, ';');
	s.linkTrackEvents="event26";
	s.events="event26";
	setClickVar();
	s.tl(true, "o", "scOrderApply");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScOrderEdit(step){
	s.linkTrackVars="eVar36";
	s.linkTrackEvents="";
	s.eVar36="checkout:"+step+":edit";
	setClickVar();
	s.tl(true,"o","scOrderEdit");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScPaymentOrder(order, dOption, pMethod){
 s.linkTrackVars="eVar36,products";
 s.linkTrackEvents="";
 s.eVar36="checkout:place order";

 if(dOption || pMethod) {
    s.linkTrackVars += ",eVar37";
  	s.eVar37=dOption+":"+pMethod; 
 }
 s.products = order.toUpperCase().replace(/;;/gi, ';');
 setClickVar();
 s.tl(true,"o","scPaymentOrder");
 s.linkTrackVars='none';
 s.linkTrackEvents='none';
}


function sendScPaymentOrderSucc(order, dOption, pMethod ){
	s.linkTrackVars="eVar36,eVar37,products";
	s.linkTrackEvents="";
	s.eVar36="checkout:place order success";
	s.eVar37=dOption+":"+pMethod;
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	setClickVar();
	s.tl(true,"o","scPaymentOrder");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScPaymentOrderFr(order, dOption, pMethod ,sType){
	s.linkTrackVars="eVar36,eVar37,products,prop37";
	s.linkTrackEvents="";
	s.eVar36="checkout:place order";
	s.eVar37=dOption+":"+pMethod;
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	setClickVar();
	s.tl(true,"o","scPaymentOrderFr");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScPreviewPaynow(order,dOption,pMethod,pOption){//prop37 (fr only?)
    var pOptions = "";
	s.linkTrackVars="events,eVar37,products,prop38";
	s.linkTrackEvents="scCheckout";
	s.events="scCheckout";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	s.eVar37=dOption+":"+pMethod;
	pOptions = pOption.split(":");
	s.prop38 = "promo code_" + pOptions[0] + ":coupon_" + pOptions[1] + ":point_" + pOptions[2] ;
	setClickVar();
	s.tl(true,"o","scPreviewPaynow");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

/* Shop Checkout Process 함수 추가 */
function sendScPreviewPaynowNew(order,dOption,pMethod,pOption){
  var pOptions = "";
	s.linkTrackVars="eVar36,eVar37,products,prop38";
	s.linkTrackEvents="";
	s.eVar36="checkout:payment";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	s.eVar37=dOption+":"+pMethod;
	pOptions = pOption.split(":");
	s.prop38 = "promo code_" + pOptions[0] + ":coupon_" + pOptions[1] + ":point_" + pOptions[2] ;
	setClickVar();
	s.tl(true,"o","scPreviewPaynowNew");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScPurchaseSucc(order,pId,dOption,pMethod,pOption,oGroup){
	//var productNo="";
	var tempNo=null;
	var splitOrder="";
    var pOptions = "";
	/*
	if(order.indexOf(",")!=-1){
		
		splitOrder = order.split(",");
		for(i=0;i<splitOrder.length;i++){
			
			tempNo = tempNo+ parseInt(splitOrder[i].split(";")[2]);	
		}
		productNo = tempNo.toString();
		
	}else{
		productNo=order.split(";")[2]
	}*/
	s.eVar37=dOption+":"+pMethod;
	pOptions = pOption.split(":");
	s.prop38 = "promo code_" + pOptions[0] + ":coupon_" + pOptions[1] + ":point_" + pOptions[2] ;
	s.products=order.toUpperCase().replace(/;;/gi, ';');
	s.purchaseID=pId;
	s.eVar50=pId;
	s.eVar53=oGroup;
	s.linkTrackVars="eVar37,events,products,purchaseID,prop38,eVar50,eVar53";
	s.linkTrackEvents="purchase";
	s.events="purchase";
	setClickVar();
	s.tl(true,"o","scPurchase");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';

}
function sendScPurchaseFail(order,pId,tValue){
	//var productNo="";
	var tempNo=null;
	var splitOrder="";
	/*
	if(order.indexOf(",")!=-1){
		
		splitOrder = order.split(",");
		for(i=0;i<splitOrder.length;i++){
			
			tempNo = tempNo+ parseInt(splitOrder[i].split(";")[2]);	
		}
		productNo = tempNo.toString();
		
	}else{
		productNo=order.split(";")[2]
	}*/
	s.products=order.toUpperCase().replace(/;;/gi, ';');
	s.purchaseID=pId; 
    s.eVar50=pId;
	s.linkTrackVars="eVar36,products,purchaseID,eVar50";
	s.linkTrackEvents="";
	s.eVar36 = "order fail:" + tValue;
	setClickVar();
	s.tl(true,"o","scPurchaseFail");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';

}

function sendScCheckoutStep(step,order,code){
    if(order || code){
		if(order.indexOf(";")==-1){
			order = ";"+order;
		}
		s.products=order.toUpperCase().replace(/;;/gi, ';');
		s.eVar41=code;
	}
	
	if ( getOmniInputTagValue("pageTrack").indexOf("product detail") != -1 || getOmniInputTagValue("pageTrack").indexOf("support detail") != -1){
		if(getOmniInputTagValue("model_name") != ""){
			s["products"]=";"+getOmniInputTagValue("model_name").toUpperCase();
			s["eVar41"] = getOmniInputTagValue("model_code");
		}else{
			printOmniLog("You Must setup the input tag value about !!!!!!model_name!!!!!!!")
		}
	}
	s.linkTrackVars="eVar36,products,eVar41";
	s.linkTrackEvents="";
	s.eVar36 = step;
	setClickVar();
	s.tl(true,"o","scCheckoutStep");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

/* 20160229 - UK Basket */
function sendScCheckoutView(step,order,code){
    if(order || code){
  if(order.indexOf(";")==-1){
   order = ";"+order;
  }
  s.products=order.toUpperCase().replace(/;;/gi, ';');
  s.eVar41=code;
 }

 if ( getOmniInputTagValue("pageTrack").indexOf("product detail") != -1 || getOmniInputTagValue("pageTrack").indexOf("support detail") != -1){
  if(getOmniInputTagValue("model_name") != ""){
   s["products"]=";"+getOmniInputTagValue("model_name").toUpperCase();
   s["eVar41"] = getOmniInputTagValue("model_code");
  }else{
   printOmniLog("You Must setup the input tag value about !!!!!!model_name!!!!!!!")
  }
 }
 s.linkTrackVars="events,eVar36,products,eVar41";
 s.linkTrackEvents="scView";
 s.events="scView";
 s.eVar36 = step;
 setClickVar();
 s.tl(true,"o","scCheckoutStepView");
 s.linkTrackVars='none';
 s.linkTrackEvents='none';
}


function sendScMultiOption(order){
	s.linkTrackVars="prop37";
	s.linkTrackEvents="";
	s.prop37= "delivery options:" + order;
	setClickVar();
	s.tl(true,"o","scMultiOption");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScTelePaynow(order,dOption,pMethod,pOption){
    var pOptions = "";
	s.linkTrackVars="eVar37,products,prop38,eVar36";
	s.linkTrackEvents="";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	s.eVar36="telesales:checkout";
	s.eVar37=dOption+":"+pMethod;
	pOptions = pOption.split(":");
	s.prop38 = "promo code_" + pOptions[0] + ":coupon_" + pOptions[1] + ":point_" + pOptions[2] ;
	setClickVar();
	s.tl(true,"o","scTelePaynow");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScTeleSucc(order,pId,dOption,pMethod,pOption){
	//var productNo="";
	var tempNo=null;
	var splitOrder="";
    var pOptions = "";
	s.eVar37=dOption+":"+pMethod;
	s.eVar36 = "telesales:order success:" + pId;
	pOptions = pOption.split(":");
	s.prop38 = "promo code_" + pOptions[0] + ":coupon_" + pOptions[1] + ":point_" + pOptions[2] ;
	s.products=order.toUpperCase().replace(/;;/gi, ';');
	s.purchaseID=pId;
	s.eVar50=pId;
	s.linkTrackVars="eVar36,eVar37,products,purchaseID,prop38,eVar50";
	s.linkTrackEvents="";
	setClickVar();
	s.tl(true,"o","scTeleSucc");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';

}
function sendScTeleFail(order,pId,tValue){
	//var productNo="";
	var tempNo=null;
	var splitOrder="";
	s.products=order.toUpperCase().replace(/;;/gi, ';');
	s.linkTrackVars="eVar36,products";
	s.linkTrackEvents="";
	s.eVar36 = "telesales:order fail:" +pId +":" + tValue;
	setClickVar();
	s.tl(true,"o","scTeleFail");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';

}
//***********SEC next gen **************************************************************************************************************************************************
function sendScTeleSecPaynow(order,dOption,pMethod,pOption,cMethod){
    var pOptions = "";
	s.linkTrackVars="eVar37,products,prop38,eVar36";
	s.linkTrackEvents="";
	s.products = order.toUpperCase().replace(/;;/gi, ';');
	s.eVar36="telesales:" + cMethod;
	s.eVar37=dOption+":"+pMethod;
	pOptions = pOption.split(":");
	s.prop38 = "promo code_" + pOptions[0] + ":coupon_" + pOptions[1] + ":point_" + pOptions[2] +":shipping_" + pOptions[3];
	setClickVar();
	s.tl(true,"o","scTeleSecPaynow");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
}

function sendScTeleSecSucc(order,pId,dOption,pMethod,pOption){
	//var productNo="";
	var tempNo=null;
	var splitOrder="";
    var pOptions = "";
	s.eVar37=dOption+":"+pMethod;
	s.eVar36 = "telesales:order success:" + pId;
	pOptions = pOption.split(":");
	s.prop38 = "promo code_" + pOptions[0] + ":coupon_" + pOptions[1] + ":point_" + pOptions[2] +":shipping_" + pOptions[3];
	s.products=order.toUpperCase().replace(/;;/gi, ';');
	s.purchaseID=pId;
	s.eVar50=pId;
	s.linkTrackVars="eVar36,eVar37,products,purchaseID,prop38,eVar50";
	s.linkTrackEvents="";
	setClickVar();
	s.tl(true,"o","scTeleSecSucc");
	s.linkTrackVars='none';
	s.linkTrackEvents='none';

}

//****************************************************************************

function sendPageCodeCart(order){
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function(){};
	//console.log("sendPageCodeCart");
	return;
}

function sendPageCodeCartLogin(order){
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function(){};
	//console.log("sendPageCodeCartLogin");
	return;
}

function sendPageCodeShipping(order){
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function(){};
	//console.log("sendPageCodeShipping");
	return;
}

function sendPageCodeBilling(order){
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function(){};
	//console.log("sendPageCodeBilling");
	return;
}

function sendPageCodeReview(order){
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function(){};
	//console.log("sendPageCodeReview");
	return;
}

function sendPageCodeConfirmation(order,pId,dOption,pMethod){
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function(){};
	//console.log("sendPageCodeConfirmation");
	sendScPurchase(order,pId,dOption,pMethod);
}

function sendScPromoCode(order){
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function(){};
	//console.log("sendScPromoCode");
	sendScApply(order);
}

function sendScCoupon(order){
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function(){};
	//console.log("sendScCoupon");
	sendScApply(order);
}


//sendClickCode('create_account', 'login:' + omnitureTagForSignUp + ':main');
//sendClickCode('sign_in', 'login:' + omnitureTagForSignIn + ':main');
//sendClickCode('wish_list', productName.toLowerCase());

//end of the purchase function
function sendClickCode( typeName, data, option ){
	// Exception
	//if(data.indexOf("submit a review") != -1){
	//	return;
	//}
	
	if(typeName.indexOf("TEMPORARY")!=-1){
		recallClickCode(typeName, data, option);
		return;
	}
	
	if (typeName.indexOf("pid")!=-1 ){
		getPid(data);
		return;
	}	
	if(option=="REPLACE"){
		data = data.replace(/,/gi,"").toLowerCase();
	}
	
	var trackVar = 	{ 
		/*
		< Options >
		1. section : business, support
		2. sitecode : define country code that you want to call this function.
		
		"example" : "events=event1|eVar43=data#0|prop30=data#1|type=o|trackname=example tracking|section=support|sitecode=uk,sg,in",
		*/
		
		
		//< Ko ga-young >
		"account" : "events=event31|eVar31=data#0|eVar64=data#1|type=o|trackname=account event",
		"locator" : "events=event22|eVar22=data#0|products=data#1|type=o|trackname=locator",
		"locator_noresult" : "events=event22|prop22=data#0|products=data#1|type=o|trackname=locator search noresult",
		"search_success" : "events=event21|eVar21=data#0|type=o|trackname=search success",
		"pop_rct_search" : "events=event21|eVar61=data#0|type=o|trackname=popular_recent search", 
		"search_fail" : "events=event21|prop21=data#0|type=o|trackname=search fail",
		"search_suggest" : "eVar61=data#0|type=o|trackname=search popup suggestions", 
		"share" : "events=event29|eVar29=data#0|type=o|trackname=share button click",
		"spt_search_success" : "events=event23|eVar23=data#0|type=o|trackname=support search success",
		"spt_search_fail" : "events=event23|prop23=data#0|type=o|trackname=support search fail",
		//"support_content" : "events=event34|eVar34=data#0|type=o|trackname=get tips click",
		"support_content" : "events=event34|eVar34=data#0|products=data#1|type=o|trackname=get tips click", 
		"reviews" : "events=event68|eVar68=data#0|type=o|trackname=reviews action",
		"support_submit" : "events=event30|eVar30=data#0|eVar38=data#1|type=o|trackname=content submit action",
		"finding_method" : "events=event25|eVar25=data#0|products=data#1|eVar41=data#2|type=o|trackname=product finding method",
		"option_click" : "prop27=data#0|type=o|trackname=jump to tracking",
		"content_click_extra" : "prop25=data#0|eVar41=data#1|products=data#2|type=o|trackname=gbm category button",

		//< Kim yu-kyeong >
		"jumpto" : "prop11=data#0|type=o|trackname=jump to tracking",
		"view_more" : "prop11=data#0|type=o|trackname=view more tracking",
		"view more" : "prop11=data#0|type=o|trackname=view more tracking",
		"pdp_gallery" : "events=event27|eVar27=data#0|type=o|trackname=pdp gallery tracking",
		"pdp_360" : "events=event27|eVar27=data#0|type=o|trackname=pdp 360 tracking",
		"pdp_wishlist" : "events=event31|eVar31=data#0|type=o|trackname=pdp wishlist add",
		"instore_pdp_findproduct" : "events=event26|eVar26=data#0|type=o|trackname=instore pdp find product",
		"content" : "eVar38=data#0|type=o|trackname=content item",
		"content_click" : "events=event26|eVar26=data#0|products=data#1|eVar41=data#2|type=o|trackname=content interaction",
		"gnb" : "prop7=data#0|type=o|trackname=gnb tracking",
		"download_b2b" : "events=event33|eVar32=data#0|eVar38=data#1|type=o|trackname=b2b download resources",
		
		//< Jeong eui-tak >
		"contact" : "events=event30|eVar30=data#0|type=o|trackname=contact",
		"compare" : "events=event28|eVar28=data#0+data#1|prop74=data#1|type=o|trackname=compare",
		"compare_new" : "events=event28|eVar28=data#0+data#1|products=data#2|type=o|trackname=compare_new",
		"addto_compare" : "events=event28|products=data#0|eVar41=data#1|type=o|trackname=add to compare",
		"category_filter" : "events=event44|eVar44=data#0|type=o|trackname=category filter",
		//"download" : "events=event32|eVar32=data#0|products=data#1|type=o|trackname=download",
		"download" : "events=event32|eVar32=data#0|products=data#1|eVar41=data#2|type=o|trackname=download",
		"warranty_menu" : "eVar34=data#0|type=o|trackname=warranty",
		//"finding_method" : "events=event25|eVar25=data#0|products=data#1|type=o|trackname=product finding method",
		"finding method" : "events=event25|eVar25=data#0|products=data#1|type=o|trackname=product finding method",
		"service_locator_success" : "events=event24|eVar24=data#0|type=o|trackname=service locator search",
		"service_locator_fail" : "events=event24|prop24=data#0|type=o|trackname=service locator search",
		"resource_content" : "eVar38=data#0|type=o|trackname=resource content",
		"pre_order" : "events=event35|eVar35=data#0|type=o|trackname=pdp pre order",
		//"wishlist" : "events=event35|eVar35=data#0|eVar41=data#1|type=o|trackname=wish list click event",
		"wishlist" : "events=event35|eVar35=data#0|eVar41=data#1|products=data#2|type=o|trackname=wish list click event",
		"wishlist_step2" : "events=event35,event55|eVar35=data#0|eVar41=data#1|products=data#2|type=o|trackname=wish list click event",
		"shopping_faq_type" : "prop11=data#0|type=o|trackname=shopping faq type select",
		"shopping_faq_question" : "events=event26|eVar26=data#0|type=o|trackname=shopping faq question",
		"pdp_scroll_down" : "events=event46|eVar46=data#0|type=o|trackname=pdp scroll down",
		
		// store
		//"sign_in" : "events=event62|eVar64=data#0|type=o|trackname=login",
		"wish_list" : "events=event31|eVar31=data#0|products=data#1|type=o|trackname=wish list click event",
		"wish_list_cat" : "events=event31|eVar31=data#0|products=data#1|eVar41=data#2|type=o|trackname=content interaction",
		"content_click_count" : "prop26=data#0|type=o|trackname=content interaction count",
		//"promotion" : "events=event45|eVar33=data#0|type=o|trackname=promotion",
		//"promotion_product" : "events=event45|eVar33=data#0|products=data#1|type=o|trackname=promotion",
		"footer" : "prop17=data#0|type=o|trackname=footer link click",
		
		//promotion
		"microsite_action" : "events=event45|eVar33=data#0|type=o|trackname=staticpage action tracking",
		//my samsung
		"mys_account": "events=event31|eVar31=data#0|eVar64=data#1|type=o|trackname=my samsung account event",
		"mys_account_prd": "events=event31|eVar31=data#0|products=data#1|type=o|trackname=my samsung account event",

		//for B2B
		"b2b_search_success" : "events=event47|eVar47=data#0|type=o|trackname=b2b search success",
		"b2b_search_fail" : "events=event47|prop21=data#0|type=o|trackname=b2b search fail",
		"b2b_index" : "prop11=data#0|type=o|trackname=b2b tab index click",
		"b2b_resource_related" : "events=event25|eVar25=data#0|eVar38=data#1|type=o|trackname=related resource click",
		"b2b_product_related" : "events=event25|eVar25=data#0|products=data#1|type=o|trackname=related product click",
		"b2b_insights_related" : "events=event25|eVar25=data#0|eVar38=data#1|type=o|trackname=related insights click",
		"b2b_insights_related_download" : "events=event33|prop26=data#0|eVar38=data#1|eVar32=data#2|type=o|trackname=related insights download click",
		"b2b_solution_related" : "events=event25|eVar25=data#0|eVar38=data#1|type=o|trackname=related insights click",
		"b2b_solution_related_download" : "events=event33|prop26=data#0|eVar38=data#1|eVar32=data#2|type=o|trackname=related solution download click",
		"content_click_count_share" : "events=event29|prop26=data#0|eVar29=data#1|type=o|trackname=share button click",
		"poll_submit" : "prop57=data#0|prop58=data#1|type=o|trackname=poll submit",
		
		"b2b_category_filter" : "prop7=data#0|type=o|trackname=b2b category filter",
		"download_b2b_pdp" : "events=event33|eVar32=data#0|prop32=data#1|type=o|trackname=b2b download resources",
		"b2b_find_device" : "prop47=data#0|type=o|trackname=b2b search success",
		"b2b_content_click" : "events=event26|eVar26=data#0|prop26=data#1|type=o|trackname=b2b cotent click",
		"b2b_change_account" : "events=event31|eVar31=data#0|prop26=data#1|type=o|trackname=b2b change account",
	    "b2b_play_video_popup" : "prop26=data#0|eVar38=data#1|type=o|trackname=play video click",

		//for SEC NextGen
		"sec_store_action" :  "events=event45|eVar33=data#0|products=data#1|type=o|trackname=staticpage action tracking",
		"mixed_task" :  "events=event31|prop31=data#0|products=data#1|type=o|trackname=staticpage action tracking",
	    "category_colorchip" : "events=event27|eVar27=data#0|eVar41=data#1|products=data#2|type=o|trackname=category color chip",
	    "category_button" : "events=event25|eVar25=data#0|eVar41=data#1|products=data#2|type=o|trackname=category button",
		"download_insights" : "events=event33|eVar32=data#0|prop26=data#1|type=o|trackname=b2b insights download",
	    "target_marketing" : "events=event75|eVar75=data#0|type=o|trackname=target marketing tracking",

		//added
		"survey_click" : "eVar51=data#0|type=o|trackname=survey click",
		"cookie" : "prop28=data#0|type=o|trackname=cookie tracking",
		"us_style" : "events=event48|eVar48=data#0|type=o|trackname=us style contents",
		
		//for JP
		"search_click" : "events=event11|eVar61=data#0|products=data#1|eVar41=data#2|type=o|trackname=search result click"



	};
	
	var businessTrackVar = {
		
	};
	
	var supportTrackVar = {
		
	};
	
	//Value initiation
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
	var trackValue = "";
	var splitedTrackValue = "";
	//Value initiation end
	
	//trackData is the specific value of the trackVar Array
	var trackData = trackVar[typeName.trim()];
	var topSection = getOmniTopSection();
	
	if( trackData != undefined){
		if( trackData.indexOf("|section=business") != -1 ){
			if ( topSection == "business" )	trackData = businessTrackVar[typeName.trim()];
		}else if( trackData.indexOf("|section=support") != -1 ){
			if ( topSection == "support" )	trackData = supportTrackVar[typeName.trim()];
		}
	}else{
		printOmniLog("trackData is undefined. Add [" + typeName + "] tag in sendClickCode() function!!!!" );
		return;
	}
	
	//trackValue is the split value of the trackData
	if ( trackData ){trackValue = trackData.split("|");	}else{	return false;	}
	
	// Variables definition
	var events = "";
	var eVar = "";
	var prop = "";
	var products = "";
	var type = "";
	var name = "";
	var countryCode = "";
	var number = 0;
	// End of Variables definition
	
	//(mean : addition of condition) Each call of the SendClickCode below var set up every Click;
	// 20160211 v63 변수 추가 (visitor)
	s.linkTrackVars = "eVar6,eVar39,eVar40,eVar9,eVar63";
	s.eVar6 = getOmniInputTagValue("pageTrack");
	s.eVar39 = window.location.href;
	s.eVar40 = s.pageName;
	s.eVar9 = getOmniDeviceType();
	//MCID 사용 국가 eVar63 값 설정
	s.eVar63 = getOmniCookie("s_vi");
	if(getOmniCookie("s_vi").indexOf('null')==0){
		s.eVar63 = "D=mid";
	} 
	//End of the set up var
			
	for ( var i = 0 ; i < trackValue.length ; i++ ) {
		splitedTrackValue = trackValue[i].split("=")[0];
		
		if ( splitedTrackValue.indexOf("events") != -1 ){	// s.events
			events = trackValue[i].split("=")[1];
			
			if ( s.linkTrackEvents == "none" ){
				  s.linkTrackEvents = events;
			}else {
				  s.linkTrackEvents += "," + events;
			}
			
			if ( s.linkTrackVars == "none" ) {
				s.linkTrackVars = "events";
			} else {
				s.linkTrackVars += ",events";
			}
			s["events"] = events;
		}else if ( splitedTrackValue.indexOf("eVar") != -1 ){	// s.eVar#
			eVar = splitedTrackValue;
			if ( s.linkTrackVars == "none" ) {
				s.linkTrackVars = eVar;
			} else {
				s.linkTrackVars += "," + eVar;
			}
			
			// If typeNmae = 'compare', then concat the data value(ex;"allGT-i9100^GT-i3000^GT-i9500")
			if(trackValue[i].split("=")[1].indexOf("+")>=0){
				s[eVar]=data.split("|")[0].concat(data.split("|")[1])
			}else if ( trackValue[i].split("=")[1].indexOf("data#") != -1 ) {
				if ( data != undefined ){
					number = trackValue[i].split("=")[1].split("#")[1];
					s[eVar] = data.split("|")[number];
					number = 0;
				}
			} else{
				s[eVar] = trackValue[i].split("=")[1];
			}
		}else if ( splitedTrackValue.indexOf("prop") != -1 ){	// s.prop#
			prop = splitedTrackValue;
			if ( s.linkTrackVars == "none" ) {
				s.linkTrackVars = prop;
			} else {
				s.linkTrackVars += "," + prop;
			}
			if ( trackValue[i].split("=")[1].indexOf("data#") != -1 ) {
				number = trackValue[i].split("=")[1].split("#")[1];
				s[prop] = data.split("|")[number];
				number = 0;
			} else {
				s[prop] = trackValue[i].split("=")[1];
			}
		}else if ( splitedTrackValue.indexOf("products") != -1 ){	// s.products
			products = splitedTrackValue;
			if(data.split("|")[1]!=undefined){ //data존재시 
				if ( trackValue[i].split("=")[1].indexOf("data#") != -1 ) { //products = data#존재시
					number = trackValue[i].split("=")[1].split("#")[1];
					if (data.split("|")[number]!=undefined) {
							if ( s.linkTrackVars == "none" ) {
								s.linkTrackVars = "products";
							}else{
								s.linkTrackVars += ",products";
							}
							
							s["products"] = ";"+data.split("|")[number].trim().toUpperCase();
							

					}
					number = 0;
				}else {
					s["products"] = ";"+trackValue[i].split("=")[1].toUpperCase(); //products='abc'존재시 
				}	
				s["products"] = s["products"].replace(/;;/gi, ';');
			}		
		}else if ( splitedTrackValue.indexOf("type") != -1 ){	
				type = trackValue[i].split("=")[1];
		}else if ( splitedTrackValue.indexOf("trackname") != -1 ){//s.trackname
				if ( trackValue[i].split("=")[1].indexOf("data#") != -1 ) {
						number = trackValue[i].split("=")[1].split("#")[1];
						name = ";"+data.split("|")[number].trim();
						number = 0;
				} else {
						name = trackValue[i].split("=")[1];
				}
		}else if ( splitedTrackValue.indexOf("sitecode") != -1 ){
				countryCode = trackValue[i].split("=")[1];
				var thisCountry = getOmniSiteCd();
					if ( countryCode.indexOf( thisCountry ) == -1 ){
						initOmniVars();
						s.linkTrackVars='none';
						s.linkTrackEvents='none';
				return;
			}
		}
	}
	
	// Product Detail Page, Business Detail Page, Support Detail Page
	if ( getOmniInputTagValue("pageTrack").indexOf("product detail") != -1 || getOmniInputTagValue("pageTrack").indexOf("support detail") != -1){
		if (s.linkTrackVars.indexOf("products") < 0){
			s.linkTrackVars += ",products";
		}
		if (s.linkTrackVars.indexOf("eVar41") < 0){
			s.linkTrackVars += ",eVar41";
		}
		
		if(getOmniInputTagValue("model_name") != ""){
			s["products"]=";"+getOmniInputTagValue("model_name").toUpperCase();
			s["eVar41"] = getOmniInputTagValue("model_code");
		}else{
			printOmniLog("You Must setup the input tag value about !!!!!!model_name!!!!!!!")
		}
	}
	
	/* 20160223 - call option 변경 (outgoing link - this)*/
	if(option != "REPLACE" && option == "move") {
		s.tl(this, type, name);
		//printOmniLog("s.tl(this)");
	} else {
		s.tl(true, type, name);
		//printOmniLog("s.tl(true)");
	}
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
	return true;
}

//B2B Carousal 
$(document).ready(function() {
	if (getOmniSiteCd() != undefined && getOmniSiteCd() != ""){
		//closer로 인한 global 변수화
		var targetNo = '';
		
if(('sec,cn,uk,sg,si,hk,hk_en,tw,ie,it,es,hu,de,se,dk,fi,no,fr,pt,pl,gr,cz,sk,ro,bg,at,ch,ch_fr,be,be_fr,nl,lv,lt,ee,rs,hr,iran,ca_fr,ca,mx,br,latin,latin_en,ve,co,ar,cl,pe,au,nz,id,th,vn,my,ru,ua,ua_ru,kz_ru,in,ae,il,sa,sa_en,tr,levant,pk,eg,n_africa,africa_en,africa_fr,africa_pt,za,py,uy,al,lb'.indexOf(getOmniSiteCd())!=-1) && 'business'.indexOf(getOmniTopSection())!=-1){
		//if(('cn,uk'.indexOf(getOmniSiteCd())!=-1) && 'business'.indexOf(getOmniTopSection())!=-1){
			//B2B carousal arrow 
			$('.ctl-carousel > button').on('click',function(){
				
					var name = $(this).attr('class');
					
					if('play'.indexOf($(this).attr('class'))!=-1){
					   name = 'stop';
					}else if('pause'.indexOf($(this).attr('class'))!=-1){
					   name = 'play';
					}else if('next'.indexOf($(this).attr('class'))!=-1){
						name = 'rightarrow';
					}else if('prev'.indexOf($(this).attr('class'))!=-1){
						name = 'leftarrow';
					}
					targetNo = getCurrentCarousalNo();			

				   if ('play,stop'.indexOf(name)!=-1) {
						sendClickCode('content_click_count','kv rolling:'+name);
				   }else{
						sendClickCode('content_click_count','kv rolling:'+name+'_'+targetNo);
				   }
				   
				
			});

			//B2B carousal dot
			$('.ctl-carousel > ul > li').each(function(){
				$(this).click(function(){
					var targetName =  Number($(this).index()) + 1;
					sendClickCode('content_click_count', 'kv rolling:index_' +  targetName);
				})
			})
		}
		
	}
	function getCurrentCarousalNo () {
			$('.ctl-carousel > ul > li').each(function(idx){
						$(this).hasClass('current') ? targetNo = Number($(this).index()) + 1: ""
			})
				return targetNo;
		}
});
//VersaTagging
$(document).ready(function() {
	if (getOmniSiteCd() != undefined && getOmniSiteCd() != "") {
	
		if(getOmniSiteCd() == 'ae' || getOmniSiteCd() == 'ae_ar'){
			if ('SM-N910CZDEXSG,SM-A500FZWAXSG,SM-A300FZWAXSG,SM-G920FZDAXSG,SM-G925FZDAXSG,UA78JS9500KXZN,SM-N920CZDAXSG'.indexOf($('#modelCode').val())!=-1){		  
					$('.features-wrapper > div').eq(2).find('div').eq(0).waypoint(function(direction){
						if(direction == "down"){
							if ('SM-G925FZDAXSG'.indexOf($('#modelCode').val())!=-1) {
								versaTagObj.generateRequest('https://www.samsung.com/aux/s6edge/PageScroll.htm');													
							}else{
								versaTagObj.generateRequest('https://www.samsung.com/ps/PageScroll.htm');							
							}

						}

					})
					$('.middle.section').waypoint(function(direction){
						if(direction == "down"){
							if ('SM-G925FZDAXSG'.indexOf($('#modelCode').val())!=-1) {
								versaTagObj.generateRequest('https://www.samsung.com/aux/s6edge/eop/PageScroll.htm');						
							}else{
								versaTagObj.generateRequest('https://www.samsung.com/ps/eop/PageScroll.htm');
							}
							
						}
					},{offset: 'bottom-in-view'})

					$('.features-wrapper > div').eq(8).find('div').eq(1).waypoint(function(direction){
						if(direction == "down"){
							if ('UA78JS9500KXZN'.indexOf($('#modelCode').val())!=-1) {
								printOmniLog('UA78JS9500KXZN VersaTag Fire');
								versaTagObj.generateRequest('https://www.samsung.com/aux/s6edge/PageScroll.htm');													
							}else{
								//versaTagObj.generateRequest('https://www.samsung.com/ps/PageScroll.htm');							
							}

						}

					})
					$('.feature-module > div > #content > #Accessories > .inner-box').waypoint(function(direction) {
						if(direction == "down"){
							if ('SM-N920CZDAXSG'.indexOf($('#modelCode').val())!=-1) {
								printOmniLog('SM-N920CZDAXSG VersaTag Fire');
								versaTagObj.generateRequest('https://www.samsung.com/ps/SM-N920CZDAXSG/PageScroll.htm');													
							}else{
								//versaTagObj.generateRequest('https://www.samsung.com/ps/PageScroll.htm');							
							}
						}
					})
			}
		}
	}
});


//Home & Apps Main
$(document).ready(function() {
	//sec exception
	if (getOmniSiteCd() != undefined && getOmniSiteCd() != "") {
		var pageLocation = window.location.pathname.split(getOmniSiteCd())[1];
		if ($('.col2a').length != 0 && $('.col2b').length != 0 ) {
		
		if ("/home/,/apps/mobile/".indexOf(pageLocation)!=-1 ) {
			//home (se site added)
			if ("/home/".indexOf(pageLocation)!=-1 && ("cn,sec".indexOf(getOmniSiteCd())==-1 || "se".indexOf(getOmniSiteCd())!=-1)) {
				//UPPER LINE
					$('.col2a').eq(0).find('div').eq(0).waypoint(function(direction){
						if(direction == "down"){
							sendClickCode('pdp_scroll_down','home:scroll:top');
						}

					})

					//BOTTOM LINE + SE국가 분기 
					if ("mobile".indexOf(getOmniDeviceType())!=-1) {
						if ("se".indexOf(getOmniSiteCd())!=-1) {
							$('.col2b').eq(1).waypoint(function(direction){
								if(direction == "down"){
									sendClickCode('pdp_scroll_down','home:scroll:bottom');
								}
							})
						}else{
							$('.col2b').eq(3).waypoint(function(direction){
								if(direction == "down"){
									sendClickCode('pdp_scroll_down','home:scroll:bottom');
								}
							})
						}
						
					}else{
							//SE국가 분기 
						if ("se,jp".indexOf(getOmniSiteCd())!=-1) {
							$('.col2b').eq(1).waypoint(function(direction){
								if(direction == "down"){
									sendClickCode('pdp_scroll_down','home:scroll:bottom');
								}
							})
						}else{
							$('.col2b').eq(2).waypoint(function(direction){
								if(direction == "down"){
									sendClickCode('pdp_scroll_down','home:scroll:bottom');
								}
							})
						}
						
					}

			//Apps main
			}else if("/apps/mobile/".indexOf(pageLocation)!=-1){
				//UPPER LINE
					$('.w100_visual').last().find('div').eq(0).waypoint(function(direction){
						if(direction == "down"){
							sendClickCode('pdp_scroll_down','apps:scroll:top');
						}

					})

					//BOTTOM LINE
					if ("mobile".indexOf(getOmniDeviceType())!=-1) {
						if ($('.banner_col2 > .col').length >= 4) {
								$('.banner_col2 > .col').last().waypoint(function(direction){
								if(direction == "down"){
									sendClickCode('pdp_scroll_down','apps:scroll:bottom');
								}
							})
						
						}else{
							$('.banner_col3 >.col').last().waypoint(function(direction){
								if(direction == "down"){
									sendClickCode('pdp_scroll_down','apps:scroll:bottom');
								}
							})
						}
						
					}else{
						if ($('.banner_col2 > .col').length >= 4) {
							if ($('.banner_col3 >.col').length == 0) {
										$('.banner_col2 > .col').first().waypoint(function(direction){
										if(direction == "down"){
											sendClickCode('pdp_scroll_down','apps:scroll:bottom');
										}
								})
							}else{
										$('.banner_col2 > .col').last().waypoint(function(direction){
										if(direction == "down"){
											sendClickCode('pdp_scroll_down','apps:scroll:bottom');
										}
								})	
							}

							
						}else{
							if ($('.banner_col3 >.col').length == 0) {
										$('.banner_col2 > .col').first().waypoint(function(direction){
										if(direction == "down"){
											sendClickCode('pdp_scroll_down','apps:scroll:bottom');
										}
								})
							}else{
										$('.banner_col2 > .col').last().waypoint(function(direction){
										if(direction == "down"){
											sendClickCode('pdp_scroll_down','apps:scroll:bottom');
										}
								})	
							}
								
						}
					}		
				}
			}			
		}
	}
});



$(document).ready(function() {
	var scrollUrl = unescape(window.location.href);
	if((scrollUrl.indexOf("uk/consumer/tv-audio-video/televisions") != -1 )
		|| (scrollUrl.indexOf("uk/consumer/tv-audio-video/smart-signage-tv") != -1)
		|| (scrollUrl.indexOf("in/consumer/tv-audio-video/television") != -1)
		|| (scrollUrl.indexOf("ru/consumer/televisions/televisions") != -1 )){
		$(window).scroll(function() {
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				sendClickCode( "pdp_scroll_down", "end of page" );
			}
		});
	}
});



$(document).ready(function() {
	if($.waypoints && getOmniSiteCd() == "uk"){
		var scrollUrl = unescape(window.location.href);//productListContainer category-group
		if(scrollUrl.indexOf("uk/consumer/tv-audio-video/televisions") != -1) {//uk tv category
			if($('#pageTrack').val() && $('#pageTrack').val() == "product category" ){
				$ ("#resultBar").waypoint(function(direction)   {
					if(direction == "down"){
							sendClickCode( "pdp_scroll_down", "product category" );
					}	
				}, {offset : 0});
				$('#offerContainer').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "offer" );
					}
				}, { offset : 0 });		
				$('#recommennd-items > .inner-x').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "recommend items" );
					}
				}, { offset : 0 });
			}
		}
		if(scrollUrl.indexOf("uk/consumer/tv-audio-video/smart-signage-tv") != -1) {//uk smart tv category
			if($('#pageTrack').val() && $('#pageTrack').val() == "product category" ){
				$ ("#resultBar").waypoint(function(direction)   {
					if(direction == "down"){
							sendClickCode( "pdp_scroll_down", "product category" );
					}	
				}, {offset : 0});
				$('#recommennd-items > .inner-x').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "recommend items" );
					}
				}, { offset : 0 });
			}
		}
	}
	if($.waypoints && getOmniSiteCd() == "in"){
		var scrollUrl = unescape(window.location.href);//productListContainer category-group
		if(scrollUrl.indexOf("in/consumer/tv-audio-video/television") != -1) {//in tv category
			if($('#pageTrack').val() && $('#pageTrack').val() == "product category" ){
				$ ("#resultBar").waypoint(function(direction)   {
					if(direction == "down"){
							sendClickCode( "pdp_scroll_down", "product category" );
					}	
				}, {offset : 0});	
				$('#offerContainer').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "offer" );
					}
				}, { offset : 0 });	
				$('#offerContainer').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "recommend items" );
					}
				}, { offset : -300 });
			}
		}
	}
	if($.waypoints && getOmniSiteCd() == "ru"){
		var scrollUrl = unescape(window.location.href);//productListContainer category-group
		if(scrollUrl.indexOf("ru/consumer/televisions/televisions") != -1) {//ru tv category
			if($('#pageTrack').val() && $('#pageTrack').val() == "product category" ){
				$ ("#resultBar").waypoint(function(direction)   {
					if(direction == "down"){
							sendClickCode( "pdp_scroll_down", "product category" );
					}	
				}, {offset : 0});	
				$('#offerContainer').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "offer" );
					}
				}, { offset : 0 });	
				$('#recommennd-items > .inner-x').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "recommend items" );
					}
				}, { offset : 0 });
			}
		}
	}
});


/*
jQuery Waypoints - v2.0.4
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var b=[].indexOf||function(c){for(var d=0,e=this.length;d<e;d++){if(d in this&&this[d]===c){return d}}return -1},a=[].slice;(function(d,c){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(e){return c(e,d)})}else{return c(d.jQuery,d)}})(this,function(s,h){var m,f,n,t,o,p,c,l,g,e,d,j,i,q,k,r;m=s(h);l=b.call(h,"ontouchstart")>=0;t={horizontal:{},vertical:{}};o=1;c={};p="waypoints-context-id";d="resize.waypoints";j="scroll.waypoints";i=1;q="waypoints-waypoint-ids";k="waypoint";r="waypoints";f=(function(){function u(v){var w=this;this.$element=v;this.element=v[0];this.didResize=false;this.didScroll=false;this.id="context"+o++;this.oldScroll={x:v.scrollLeft(),y:v.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[p]=this.id;c[this.id]=this;v.bind(j,function(){var x;if(!(w.didScroll||l)){w.didScroll=true;x=function(){w.doScroll();return w.didScroll=false};return h.setTimeout(x,s[r].settings.scrollThrottle)}});v.bind(d,function(){var x;if(!w.didResize){w.didResize=true;x=function(){s[r]("refresh");return w.didResize=false};return h.setTimeout(x,s[r].settings.resizeThrottle)}})}u.prototype.doScroll=function(){var w,v=this;w={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(l&&(!w.vertical.oldScroll||!w.vertical.newScroll)){s[r]("refresh")}s.each(w,function(x,z){var A,y,B;B=[];y=z.newScroll>z.oldScroll;A=y?z.forward:z.backward;s.each(v.waypoints[x],function(E,C){var F,D;if((z.oldScroll<(F=C.offset)&&F<=z.newScroll)){return B.push(C)}else{if((z.newScroll<(D=C.offset)&&D<=z.oldScroll)){return B.push(C)}}});B.sort(function(D,C){return D.offset-C.offset});if(!y){B.reverse()}return s.each(B,function(C,D){if(D.options.continuous||C===B.length-1){return D.trigger([A])}})});return this.oldScroll={x:w.horizontal.newScroll,y:w.vertical.newScroll}};u.prototype.refresh=function(){var v,y,w,x=this;w=s.isWindow(this.element);y=this.$element.offset();this.doScroll();v={horizontal:{contextOffset:w?0:y.left,contextScroll:w?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:w?0:y.top,contextScroll:w?0:this.oldScroll.y,contextDimension:w?s[r]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return s.each(v,function(A,z){return s.each(x.waypoints[A],function(G,B){var C,D,E,F,H;C=B.options.offset;E=B.offset;D=s.isWindow(B.element)?0:B.$element.offset()[z.offsetProp];if(s.isFunction(C)){C=C.apply(B.element)}else{if(typeof C==="string"){C=parseFloat(C);if(B.options.offset.indexOf("%")>-1){C=Math.ceil(z.contextDimension*C/100)}}}B.offset=D-z.contextOffset+z.contextScroll-C;if((B.options.onlyOnScroll&&(E!=null))||!B.enabled){return}if(E!==null&&(E<(F=z.oldScroll)&&F<=B.offset)){return B.trigger([z.backward])}else{if(E!==null&&(E>(H=z.oldScroll)&&H>=B.offset)){return B.trigger([z.forward])}else{if(E===null&&z.oldScroll>=B.offset){return B.trigger([z.forward])}}}})})};u.prototype.checkEmpty=function(){if(s.isEmptyObject(this.waypoints.horizontal)&&s.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([d,j].join(" "));return delete c[this.id]}};return u})();n=(function(){function u(x,w,y){var z,v;y=s.extend({},s.fn[k].defaults,y);if(y.offset==="bottom-in-view"){y.offset=function(){var A;A=s[r]("viewportHeight");if(!s.isWindow(w.element)){A=w.$element.height()}return A-s(this).outerHeight()}}this.$element=x;this.element=x[0];this.axis=y.horizontal?"horizontal":"vertical";this.callback=y.handler;this.context=w;this.enabled=y.enabled;this.id="waypoints"+i++;this.offset=null;this.options=y;w.waypoints[this.axis][this.id]=this;t[this.axis][this.id]=this;z=(v=this.element[q])!=null?v:[];z.push(this.id);this.element[q]=z}u.prototype.trigger=function(v){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,v)}if(this.options.triggerOnce){return this.destroy()}};u.prototype.disable=function(){return this.enabled=false};u.prototype.enable=function(){this.context.refresh();return this.enabled=true};u.prototype.destroy=function(){delete t[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};u.getWaypointsByElement=function(v){var w,x;x=v[q];if(!x){return[]}w=s.extend({},t.horizontal,t.vertical);return s.map(x,function(y){return w[y]})};return u})();e={init:function(u,v){var w;if(v==null){v={}}if((w=v.handler)==null){v.handler=u}this.each(function(){var x,y,A,z;x=s(this);A=(z=v.context)!=null?z:s.fn[k].defaults.context;if(!s.isWindow(A)){A=x.closest(A)}A=s(A);y=c[A[0][p]];if(!y){y=new f(A)}return new n(x,y,v)});s[r]("refresh");return this},disable:function(){return e._invoke.call(this,"disable")},enable:function(){return e._invoke.call(this,"enable")},destroy:function(){return e._invoke.call(this,"destroy")},prev:function(v,u){return e._traverse.call(this,v,u,function(y,w,x){if(w>0){return y.push(x[w-1])}})},next:function(v,u){return e._traverse.call(this,v,u,function(y,w,x){if(w<x.length-1){return y.push(x[w+1])}})},_traverse:function(v,x,u){var y,w;if(v==null){v="vertical"}if(x==null){x=h}w=g.aggregate(x);y=[];this.each(function(){var z;z=s.inArray(this,w[v]);return u(y,z,w[v])});return this.pushStack(y)},_invoke:function(u){this.each(function(){var v;v=n.getWaypointsByElement(this);return s.each(v,function(w,x){x[u]();return true})});return this}};s.fn[k]=function(){var v,u;u=arguments[0],v=2<=arguments.length?a.call(arguments,1):[];if(e[u]){return e[u].apply(this,v)}else{if(s.isFunction(u)){return e.init.apply(this,arguments)}else{if(s.isPlainObject(u)){return e.init.apply(this,[null,u])}else{if(!u){return s.error("jQuery Waypoints needs a callback function or handler option.")}else{return s.error("The "+u+" method does not exist in jQuery Waypoints.")}}}}};s.fn[k].defaults={context:h,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};g={refresh:function(){return s.each(c,function(u,v){return v.refresh()})},viewportHeight:function(){var u;return(u=h.innerHeight)!=null?u:m.height()},aggregate:function(u){var w,v,x;w=t;if(u){w=(x=c[s(u)[0][p]])!=null?x.waypoints:void 0}if(!w){return[]}v={horizontal:[],vertical:[]};s.each(v,function(y,z){s.each(w[y],function(B,A){return z.push(A)});z.sort(function(B,A){return B.offset-A.offset});v[y]=s.map(z,function(A){return A.element});return v[y]=s.unique(v[y])});return v},above:function(u){if(u==null){u=h}return g._filter(u,"vertical",function(v,w){return w.offset<=v.oldScroll.y})},below:function(u){if(u==null){u=h}return g._filter(u,"vertical",function(v,w){return w.offset>v.oldScroll.y})},left:function(u){if(u==null){u=h}return g._filter(u,"horizontal",function(v,w){return w.offset<=v.oldScroll.x})},right:function(u){if(u==null){u=h}return g._filter(u,"horizontal",function(v,w){return w.offset>v.oldScroll.x})},enable:function(){return g._invoke("enable")},disable:function(){return g._invoke("disable")},destroy:function(){return g._invoke("destroy")},extendFn:function(v,u){return e[v]=u},_invoke:function(u){var v;v=s.extend({},t.vertical,t.horizontal);return s.each(v,function(x,w){w[u]();return true})},_filter:function(y,x,u){var w,v;w=c[s(y)[0][p]];if(!w){return[]}v=[];s.each(w.waypoints[x],function(z,A){if(u(w,A)){return v.push(A)}});v.sort(function(A,z){return A.offset-z.offset});return s.map(v,function(z){return z.element})}};s[r]=function(){var v,u;u=arguments[0],v=2<=arguments.length?a.call(arguments,1):[];if(g[u]){return g[u].apply(null,v)}else{return g.aggregate.call(null,u)}};s[r].settings={resizeThrottle:100,scrollThrottle:30};return m.load(function(){return s[r]("refresh")})})}).call(this);
/*end of waypoint.js*/


/*
$(document).ready(function() {
	if($.waypoints  && getOmniSiteCd() == "uk"){
		if($('#pageTrack').val() && ( $('#pageTrack').val() == "product detail" || $('#pageTrack').val() == "support detail" )){
			if($('#model_name').val() && "GT-I8190,SM-V700,UE55F8000ST,NXF1,WF80F7E6U6X/EU,GT-I9300".indexOf($('#model_name').val()) != -1){
			
				// Common PDP 
				$('#features').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "features" );
					}
				}, { offset : 120 });
				
				$('.product-specs-module').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "spec" );
					}
				}, { offset : 120 });
				
				$('#reviews').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "review" );
					}
				}, { offset : 120 });
				
				$('.support-module').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "support" );
					}
				}, { offset : 120 });
				
				$('#accessories-heading').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "accessories" );
					}
				}, { offset : 120 });
				
				$('#similar-items').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "similar items" );
					}
				}, { offset : 120 });
				
				$('#recommennd-items').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "recommend items" );
					}
				}, { offset : 300 });
				
				// PDP WOW 
				$('.sub-hero-module').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "wow contents" );
					}
				}, { offset : 120 });
				
				$('.a-closer-look').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "closer look" );
					}
				}, { offset : 120 });
				
				// Support PDP 
				$('.get-menu-buttons').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "get tips or get help" );
					}
				}, { offset : 120 });
				
				$('.manuals-module').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "downloads and manuals" );
					}
				}, { offset : 120 });
				
				$('.ask-the-community').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "ask the community" );
					}
				}, { offset : 120 });
				
				$('.contact-information').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "contact information" );
					}
				}, { offset : 300 });
			}
		}
		
		var scrollUrl = unescape(window.location.href);
		
		if(scrollUrl.indexOf("uk/home") != -1){	// Home page 
			if($('#pageTrack').val() && $('#pageTrack').val() == "home" ){
				$('.dealer-loc').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "find a local retailer" );
					}
				}, { offset : 120 });
				
				$('#recommennd-items > .inner-x').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "recommend items" );
					}
				}, { offset : 300 });
			}
		}else if(scrollUrl.indexOf("uk/consumer/mobile-devices/smartphones") != -1){	// Category page 
			if($('#pageTrack').val() && $('#pageTrack').val() == "product category" ){
				$('#resultBar').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "your results" );
					}
				}, { offset : 120 });
				
				$('#recommennd-items > .inner-x').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "recommend items" );
					}
				}, { offset : 300 });
			}
		}else if(scrollUrl.indexOf("uk/support") != -1){	// support landing 
			if($('#pageTrack').val() && $('#pageTrack').val() == "support home" ){
				$('.search-by').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "search" );
					}
				}, { offset : 120 });
				
				$('.featured-topics').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "featured topics" );
					}
				}, { offset : 120 });
			}
			
		}else if(scrollUrl.indexOf("uk/estore") != -1){	// estore landing
			if($('#pageTrack').val() && $('#pageTrack').val() == "estore" ){
				$('.hero1').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "small module" );
					}
				}, { offset : '-110%' });
				
				$('.filterSort').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "check out the latest from samsung" );
					}
				}, { offset : 120 });
			}
		}else if(scrollUrl.indexOf("uk/ng/mobile-tablets/smartphones/galaxy-s4/c/SM0101") != -1){	// etore category
			if($('#pageTrack').val() && $('#pageTrack').val() == "estore SUBTYPE" ){
				$('.category_visual').waypoint(function(direction) {
					if(direction == "down"){
						sendClickCode( "pdp_scroll_down", "estore category" );
					}
				}, { offset : '-200%' });
			}
		}
	}
});
*/ //waypoint old version end



$(document).ready(function() {
	if(getOmniSiteCd() == "uk" && ( $('#pageTrack').val() && $('#pageTrack').val()=="product detail" )){
		if($('#model_code').val() && ($('#model_code').val() == "SM-G900FZKABTU" || $('#model_code').val() == "SM-N9005ZWEBTU")){
			var output = "";
			output += '<input id="b1index" type="hidden" value="1">';
			output += '<input id="b2index" type="hidden" value="1">';
			output += '<input id="b3index" type="hidden" value="1">';
			output += '<input id="b4index" type="hidden" value="1">';
			$('#pageTrack').after(output);

			//공통 KV - play 버튼
			$('.hero-stage').find('.play-media.controls').bind('click', function(){ sendClickCode('content_click_count', 'pdp wow:kv:play'); });

			// 공통 SUB KV - play 버튼
			$('.sub-hero-module.hero-cc').find('.play-media.controls').bind('click', function(){ sendClickCode('content_click_count', 'pdp wow:sub_kv:play'); });

			//Feature - 화살표 버튼

			// Galaxy Note - arrow
			$('div.ss-benefit.b1 > a.arrow.prev.controls').bind('click', function(){
				var number = Number($('#b1index').val());
				number = number - 1;
				$('#b1index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature1:index'+number+':left arrow');
			});
			$('div.ss-benefit.b1 > a.arrow.next.controls').bind('click', function(){
				var number = Number($('#b1index').val());
				number = number + 1;
				$('#b1index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature1:index'+number+':right arrow');
			});
			$('div.ss-benefit.b2 > a.arrow.prev.controls').bind('click', function(){
				var number = Number($('#b2index').val());
				number = number - 1;
				$('#b2index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature2:index'+number+':left arrow');
			});
			$('div.ss-benefit.b2 > a.arrow.next.controls').bind('click', function(){
				var number = Number($('#b2index').val());
				number = number + 1;
				$('#b2index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature2:index'+number+':right arrow');
			});
			$('div.ss-benefit.b3 > a.arrow.prev.controls').bind('click', function(){
				var number = Number($('#b3index').val());
				number = number - 1;
				$('#b3index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature3:index'+number+':left arrow');
			});
			$('div.ss-benefit.b3 > a.arrow.next.controls').bind('click', function(){
				var number = Number($('#b3index').val());
				number = number + 1;
				$('#b3index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature3:index'+number+':right arrow');
			});
			$('div.ss-benefit.b4 > a.arrow.prev.controls').bind('click', function(){
				var number = Number($('#b4index').val());
				number = number - 1;
				$('#b4index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature4:index'+number+':left arrow');
			});
			$('div.ss-benefit.b4 > a.arrow.next.controls').bind('click', function(){
				var number = Number($('#b4index').val());
				number = number + 1;
				$('#b4index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature4:index'+number+':right arrow');
			});


			// Galaxy S5 - arrow
			$('div.ss-benefit.b1 > div.arrows > a.arrow.prev.controls').bind('click', function(){
				var number = Number($('#b1index').val());
				number = number - 1;
				$('#b1index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature1:index'+number+':left arrow');
			});
			$('div.ss-benefit.b1 > div.arrows > a.arrow.next.controls').bind('click', function(){
				var number = Number($('#b1index').val());
				number = number + 1;
				$('#b1index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature1:index'+number+':right arrow');
			});
			$('div.ss-benefit.b2 > div.arrows > a.arrow.prev.controls').bind('click', function(){
				var number = Number($('#b2index').val());
				number = number - 1;
				$('#b2index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature2:index'+number+':left arrow');
			});
			$('div.ss-benefit.b2 > div.arrows > a.arrow.next.controls').bind('click', function(){
				var number = Number($('#b2index').val());
				number = number + 1;
				$('#b2index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature2:index'+number+':right arrow');
			});
			$('div.ss-benefit.b3 > div.arrows > a.arrow.prev.controls').bind('click', function(){
				var number = Number($('#b3index').val());
				number = number - 1;
				$('#b3index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature3:index'+number+':left arrow');
			});
			$('div.ss-benefit.b3 > div.arrows > a.arrow.next.controls').bind('click', function(){
				var number = Number($('#b3index').val());
				number = number + 1;
				$('#b3index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature3:index'+number+':right arrow');
			});
			$('div.ss-benefit.b4 > div.arrows > a.arrow.prev.controls').bind('click', function(){
				var number = Number($('#b4index').val());
				number = number - 1;
				$('#b4index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature4:index'+number+':left arrow');
			});
			$('div.ss-benefit.b4 > div.arrows > a.arrow.next.controls').bind('click', function(){
				var number = Number($('#b4index').val());
				number = number + 1;
				$('#b4index').val(number);
				sendClickCode('content_click_count', 'pdp wow:feature4:index'+number+':right arrow');
			});

			// Galaxy Note3 - dots
			$('div.ss-benefit.b1 > div.dots.pag.controls > ul > li').each(function(index){
				var number = index+1;
				$(this).find('a').bind('click', function(){
					$('#b1index').val(number);
					sendClickCode('content_click_count', 'pdp wow:feature1:index'+number);
				});
			});
			$('div.ss-benefit.b2 > div.dots.pag.controls > ul > li').each(function(index){
				var number = index+1;
				$(this).find('a').bind('click', function(){
					$('#b2index').val(number);
					sendClickCode('content_click_count', 'pdp wow:feature2:index'+number);
				});
			});
			$('div.ss-benefit.b3 > div.dots.pag.controls > ul > li').each(function(index){
				var number = index+1;
				$(this).find('a').bind('click', function(){
					$('#b3index').val(number);
					sendClickCode('content_click_count', 'pdp wow:feature3:index'+number);
				});
			});
			$('div.ss-benefit.b4 > div.dots.pag.controls > ul > li').each(function(index){
				var number = index+1;
				$(this).find('a').bind('click', function(){
					$('#b4index').val(number);
					sendClickCode('content_click_count', 'pdp wow:feature4:index'+number);
				});
			});

			// Galaxy S5 - Closer look
			$('#a-closer-look > div.stage > div.thumbs > a').each(function(index){
				var number = index + 1;
				$(this).bind('click', function(){
					sendClickCode('content_click_count', 'pdp wow:closer_look'+number+':zoom');
				});
			});

			// Galaxy Note3 - Closer look
			var item1Cnt = 0;
			var item2Cnt = 0;
			var item3Cnt = 0;
			var item4Cnt = 0;
			var item5Cnt = 0;

			$('#a-closer-look > ul > li.item-1').bind('click', function(){
				if( item1Cnt == 0 ){
					sendClickCode('content_click_count', 'pdp wow:closer_look1:zoom');
					item1Cnt = item1Cnt + 1;
				}else{
					item1Cnt = item1Cnt - 1;
				}
			});
			$('#a-closer-look > ul > li.item-2').bind('click', function(){
				if( item2Cnt == 0 ){
					sendClickCode('content_click_count', 'pdp wow:closer_look2:zoom');
					item2Cnt = item2Cnt + 1;
				}else{
					item2Cnt = item2Cnt - 1;
				}
			});
			$('#a-closer-look > ul > li.item-3').bind('click', function(){
				if( item3Cnt == 0 ){
					sendClickCode('content_click_count', 'pdp wow:closer_look3:zoom');
					item3Cnt = item3Cnt + 1;
				}else{
					item3Cnt = item3Cnt - 1;
				}
			});
			$('#a-closer-look > ul > li.item-4').bind('click', function(){
				if( item4Cnt == 0 ){
					sendClickCode('content_click_count', 'pdp wow:closer_look3:zoom');
					item4Cnt = item4Cnt + 1;
				}else{
					item4Cnt = item4Cnt - 1;
				}
			});
			$('#a-closer-look > ul > li.item-5').bind('click', function(){
				if( item5Cnt == 0 ){
					sendClickCode('content_click_count', 'pdp wow:closer_look3:zoom');
					item5Cnt = item5Cnt + 1;
				}else{
					item5Cnt = item5Cnt - 1;
				}
			});
		}
	}
});

//callPageView();


/* Tag for tagging that is in the P3 code */
/********************************* P3 *******************************/
function s_control_click(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName) {
	//For galaxy note4
	var omni_url =  document.URL;
        var omni_split_url;
        var site_cd = "";
        try{
          omni_split_url =  omni_url.split("/");
          site_cd = omni_split_url[3];
        }catch(e){
           
        }
	var vSplitLinkTrackVars = vLinkTrackVars.split(',');
	var vSplitLinkTrackValues = vLinkTrackValues.split(',');
	var tempProducts = "";
	if (typeof(vLinkTrackValues)!="string")  vSplitLinkTrackValues = vLinkTrackValues ;
	else vSplitLinkTrackValues = vLinkTrackValues.split(',');
	s.linkTrackVars = vLinkTrackVars;
	s.linkTrackEvents = vLinkTrackEvents;
	for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
  		if(vSplitLinkTrackVars[xFI] == "products") { 
   			tempProducts = vSplitLinkTrackValues[xFI].replace(";","");
   			if(tempProducts.indexOf(":") != -1){
    			s[vSplitLinkTrackVars[xFI]]= ";" + tempProducts.split(":")[1];
   			}else{
    			s[vSplitLinkTrackVars[xFI]]= ";" + tempProducts;
   			}
  		} else {
			if(vSplitLinkTrackValues[xFI].indexOf("note4hub") != -1){
				s[vSplitLinkTrackVars[xFI]]= site_cd + ":" + vSplitLinkTrackValues[xFI].trim();
			}else {
				s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
			}
  		}
	}
	s.tl(this, vType, vTypeName);
	s.linkTrackVars   ='none';
	s.linkTrackEvents ='none';
}
//For galaxy note4
/*
if(window.location.pathname.split("/").indexOf("galaxynote4")!=-1&&window.location.pathname.split("/").indexOf("video")!=-1){
 if("tablet,desktop".indexOf(getOmniDeviceType())!=-1){
   $('#n4_video_list>li>a').eq(8).click(function(){
   setTimeout(function(){$('.n4_video_place>div>iframe').attr('id','pzO5Ac3-YBA')},1000)
  });
   $('#n4_video_list>li>a').eq(9).click(function(){
   setTimeout(function(){$('.n4_video_place>div>iframe').attr('id','Z42CZr4-qWg')},1000)
  }) 

 }

}
*/


//For it site 
/*
if ("it".indexOf(getOmniSiteCd())!=-1 && window.location.href.indexOf('business')==-1) {
	
		var checkPath = window.location.pathname.split('/');


		function makeComma(num) {     // ?レ옄??肄ㅻ쭏 ?쎌엯  
				var len, point, str;  
		  
				num = num + "";  
				point = num.length % 2  
				len = num.length;  
		  
				str = num.substring(0, point);  
				
				//while (point < len) {  
					if (str != "") str += ",";  
					str += num.substring(point, point + 2);  
					point += 2;  
				//}  
				return str; 
				
			  };



		if ('it'.indexOf(getOmniSiteCd())!=-1 && checkPath.length ==3 && 'home'.indexOf(checkPath[2]) !=-1) {   //Home
				var google_tag_params = {
				ecomm_prodid: '',
				ecomm_pagetype: 'home',
				ecomm_totalvalue: ''
				};
		}else if('it'.indexOf(getOmniSiteCd())!=-1 && checkPath.length ==5 && 'consumer'.indexOf(checkPath[2]) !=-1){  //Category
				var google_tag_params = {
				ecomm_prodid: '',
				ecomm_pagetype: 'category',
				ecomm_totalvalue: ''
				};
		}else{
			if('it'.indexOf(getOmniSiteCd())!=-1 && checkPath.length ==7 && 'consumer'.indexOf(checkPath[2]) !=-1 &&('SM-R7500ZKAITV'.indexOf($('#model_code').val())!=-1)||('EB-B600BEBECWW'.indexOf($('#model_code').val())!=-1)){  //PDP
				var google_tag_params = {
				ecomm_pagetype: 'product'
				}
				google_tag_params.ecomm_prodid = $('#model_code').val();
				 //var ecomm_totalvalue_temp = makeComma($('#promotionPrice').text().replace("??,"").replace(" ","").replace("\/",""));
				 google_tag_params.ecomm_totalvalue=$('#promotionPrice').text().replace("€ ","").replace(" ","").replace(",",".");

			}else{ //ELSE PDP 
				var google_tag_params = {
				ecomm_pagetype: 'product',
				}
				google_tag_params.ecomm_prodid = $('#model_code').val();
				google_tag_params.ecomm_totalvalue='';
			}

		}

			var google_conversion_id = 1061961408;
			var google_custom_params = window.google_tag_params;
			var google_remarketing_only = true;	

}

*/	


function sendPollPageView() {

	if(window.location.href.indexOf('business')!=-1&&$('iframe[id=survey]').attr('src')){
		console.log('b2b poll pop up');
		initVars();
		s.prop1=getOmniSiteCd();
		s.prop2=getOmniSiteCd()+":poll"
		//s.prop14="high"    /* 20160201 삭제 */
		s.prop6="b2b poll"
		s.prop39=window.location.host;
		s.channel=getOmniSiteCd()+":poll"
		s.hier1=getOmniSiteCd()+">poll"
		s.pageName=getOmniSiteCd()+":poll"
		s.prop40=s.pageName;
		s.eVar1=s.prop1
		s.eVar2=s.prop2
		s.events="event1"
		var s_code=s.t();if(s_code)document.write(s_code)
	}
}


//For Ifa2014
if("mobile,tablet".indexOf(getOmniDeviceType())!=-1){
	if(window.location.pathname.indexOf("ifa2014")!=-1){

					window.onload = function  () {
					$('.ifa-nav-list>li>a').eq(0).click(function(){
					$('#ifa-photo-content1>div>ul>li>a').each(function(){
					/* TRACKING */
						function traking() {
							var trakingname = IFA_2014_TRACKING_SITE_CODE +':ifa2014hub:'+ this.getAttribute(IFA_2014_TRACKING_ATTRIBUTE_NAME);
							window.omni_call && omni_call('hub', trakingname);
							// window.console && console.log(trakingname);
						}
						$(this).click(traking);
					});
					});




					$('.ifa-nav-list>li>a').eq(1).click(function(){
					$('#ifa-photo-content2>div>ul>li>a').each(function(){
					/* TRACKING */
						function traking() {
							var trakingname = IFA_2014_TRACKING_SITE_CODE +':ifa2014hub:'+ this.getAttribute(IFA_2014_TRACKING_ATTRIBUTE_NAME);
							window.omni_call && omni_call('hub', trakingname);
							// window.console && console.log(trakingname);
						}
						$(this).click(traking);
					});
					});



					$('.ifa-nav-list>li>a').eq(2).click(function(){
					$('#ifa-photo-content3>div>ul>li>a').each(function(){
					/* TRACKING */
						function traking() {
							var trakingname = IFA_2014_TRACKING_SITE_CODE +':ifa2014hub:'+ this.getAttribute(IFA_2014_TRACKING_ATTRIBUTE_NAME);
							window.omni_call && omni_call('hub', trakingname);
							// window.console && console.log(trakingname);
						}
						$(this).click(traking);
					});
					});



					$('.ifa-nav-list>li>a').eq(3).click(function(){
					$('#ifa-photo-content4>div>ul>li>a').each(function(){
					/* TRACKING */
						function traking() {
							var trakingname = IFA_2014_TRACKING_SITE_CODE +':ifa2014hub:'+ this.getAttribute(IFA_2014_TRACKING_ATTRIBUTE_NAME);
							window.omni_call && omni_call('hub', trakingname);
							// window.console && console.log(trakingname);
						}
						$(this).click(traking);
					});
					});



					$('.ifa-nav-list>li>a').eq(4).click(function(){
					$('#ifa-photo-content5>div>ul>li>a').each(function(){
					/* TRACKING */
						function traking() {
							var trakingname = IFA_2014_TRACKING_SITE_CODE +':ifa2014hub:'+ this.getAttribute(IFA_2014_TRACKING_ATTRIBUTE_NAME);
							window.omni_call && omni_call('hub', trakingname);
							// window.console && console.log(trakingname);
						}
						$(this).click(traking);
					});
					});



					$('.ifa-nav-list>li>a').eq(5).click(function(){
					$('#ifa-photo-content6>div>ul>li>a').each(function(){
					/* TRACKING */
						function traking() {
							var trakingname = IFA_2014_TRACKING_SITE_CODE +':ifa2014hub:'+ this.getAttribute(IFA_2014_TRACKING_ATTRIBUTE_NAME);
							window.omni_call && omni_call('hub', trakingname);
							// window.console && console.log(trakingname);
						}
						$(this).click(traking);
					});
					});

				}

		}
}



function omni_call( typeName, data, option ){
	if ( typeName == "pid" ){
		getPid(data);
		return;
	}
	
	var URL = unescape(window.location.href.replace( "http://", "" ));
	var SplitedURL = URL.split("#")[0].split("?")[0].split("/");
	
	var trackVar = 	{
						/*
							< Options >
							1. b2bfilter : change the variables for B2B.
							2. ex_sitecode : define country code that you want to call this function.
						*/
						
						//"apps link tracking" : "eVar43=data#0|type=o|trackname=apps link tracking"
						"example" : "eVar43=data#0|type=o|trackname=apps link tracking",
						//When E-mail Pop up 1step page(erms page) load
						"erms_step1" : "events=event14|eVar26=data#0|type=o|trackname=contact us click",
						//Addthis
						"addthis" : "events=event15|eVar17=data#0|type=o|trackname=data#1|b2bfilter",
						//SNS_Icon which is located beside addthis icon
						"sns_icon" : "events=event15|eVar17=data#0|type=o|trackname=social media|b2bfilter",
						//Gallery UI Improvement
						"overview:pdp:color" : "events=event47|eVar47=overview:pdp:color|type=o|trackname=gallery",
						"overview:pdp:image" : "events=event47|eVar47=overview:pdp:image|type=o|trackname=gallery",
						"overview:pdp:360" : "events=event47|eVar47=overview:pdp:360|type=o|trackname=gallery",
						"overview:pdp:3DVR" : "events=event47|eVar47=overview:pdp:3DVR|type=o|trackname=gallery",
						"overview:pdp:video" : "events=event47|eVar47=overview:pdp:video|type=o|trackname=gallery",
						"overview:pdp:viewlarger" : "events=event47|eVar47=overview:pdp:viewlarger|type=o|trackname=gallery",
						"overview:pdp:flyoutzoom" : "events=event47|eVar47=overview:pdp:flyoutzoom|type=o|trackname=gallery",
						"overview:popup:color" : "events=event47|eVar47=overview:popup:color|type=o|trackname=gallery",
						"overview:popup:image" : "events=event47|eVar47=overview:popup:image|type=o|trackname=gallery",
						"overview:popup:360" : "events=event47|eVar47=overview:popup:360|type=o|trackname=gallery",
						"overview:popup:3DVR" : "events=event47|eVar47=overview:popup:3DVR|type=o|trackname=gallery",
						"overview:popup:video" : "events=event47|eVar47=overview:popup:video|type=o|trackname=gallery",
						"overview:popup:download" : "events=event47|eVar47=overview:popup:download|type=o|trackname=gallery",
						"overview:popup:zoom" : "events=event47|eVar47=overview:popup:zoom|type=o|trackname=gallery",
						"gallery:pdp:color" : "events=event47|eVar47=gallery:pdp:color|type=o|trackname=gallery",
						"gallery:pdp:image" : "events=event47|eVar47=gallery:pdp:image|type=o|trackname=gallery",
						"gallery:pdp:360" : "events=event47|eVar47=gallery:pdp:360|type=o|trackname=gallery",
						"gallery:pdp:3DVR" : "events=event47|eVar47=gallery:pdp:3DVR|type=o|trackname=gallery",
						"gallery:pdp:video" : "events=event47|eVar47=gallery:pdp:video|type=o|trackname=gallery",
						"gallery:pdp:download" : "events=event47|eVar47=gallery:pdp:download|type=o|trackname=gallery",
						"gallery:pdp:zoom" : "events=event47|eVar47=gallery:pdp:zoom|type=o|trackname=gallery",
						"gallery:pdp:viewlarger" : "events=event47|eVar47=gallery:pdp:viewlarger|type=o|trackname=gallery",
						"gallery:popup:color" : "events=event47|eVar47=gallery:popup:color|type=o|trackname=gallery",
						"gallery:popup:image" : "events=event47|eVar47=gallery:popup:image|type=o|trackname=gallery",
						"gallery:popup:360" : "events=event47|eVar47=gallery:popup:360|type=o|trackname=gallery",
						"gallery:popup:3DVR" : "events=event47|eVar47=gallery:popup:3DVR|type=o|trackname=gallery",
						"gallery:popup:video" : "events=event47|eVar47=gallery:popup:video|type=o|trackname=gallery",
						"gallery:popup:download" : "events=event47|eVar47=gallery:popup:download|type=o|trackname=gallery",
						"gallery:popup:zoom" : "events=event47|eVar47=gallery:popup:zoom|type=o|trackname=gallery",
						"sampleimage:popup:image" : "events=event47|eVar47=sampleimage:popup:image|type=o|trackname=gallery",
						"sampleimage:popup:download" : "events=event47|eVar47=sampleimage:popup:download|type=o|trackname=gallery",
						
						"subtype_color" : "events=event47|eVar47=subtype:product list:color|products=data#0|type=o|trackname=gallery",
						"quickview_image" : "events=event47|eVar47=subtype:quick view:image|products=data#0|type=o|trackname=gallery",
						
						"pdp_quickview_image" : "events=event47|eVar47=data#1|products=data#0|type=o|trackname=gallery",
						"pdp_color" : "events=event47|eVar47=data#1|products=data#0|type=o|trackname=gallery",
						
						//SENA e-commerce button on PDP
						"pdp_ecommerce" : "events=scAdd|products=data#0|type=o|trackname=pdp ecommerce",
						"se_pdp_dealer" : "events=event31|eVar45=pdp_lef:dealer locator step1|type=o|trackname=Sena dealer&buy",
						"se_show_dealer_button" : "events=event65|type=o|trackname=Sena eccomerce button",
						"cart_view"		: "events=scView|products=data#0|type=o|trackname=gnb_cartview",
						
						//buy now step2
						"buy_now_step2" : "events=event33|eVar27=data#0|type=o|trackname=buy now step2",
						
						//B2B
						"link_detail" : "eVar44=data#0|products=data#1|type=o|trackname=b2b product finding method",
						"lineup_detail" : "eVar44=data#0|products=data#1|type=o|trackname=b2b product finding method",
						"retail_search" : "events=event22|eVar32=data#0|type=o|trackname=b2b retailer search",
						"retail_search_noresult" : "events=event22|prop11=data#0|type=o|trackname=b2b retailer search",
						"visit_store" : "events=event51|eVar27=data#0|products=data#1|type=o|trackname=b2b visit store",
						"email_friend" : "events=event19|eVar9=B2B_email a friend_send|type=o|trackname=b2b email a friend",
						"email_support" : "eVar9=gnb:email support|type=o|trackname=b2b email support",
						"recently_viewed" : "eVar44=gnb:recently viewed|type=o|trackname=b2b recently viewed",
						"support_search" : "eVar8=data#0|eVar43=data#1|type=o|trackname=b2b support search",
						"compare_products" : "events=event38|eVar48=data#0|type=o|trackname=b2b compare products",
						"compare_products_add" : "events=event38|eVar48=data#0|type=o|trackname=b2b compare products",
						"spec_download" : "events=event19|eVar9=data#0|products=data#1|type=o|trackname=b2b spec download",
						"resources_download" : "events=event18|eVar11=data#0|type=o|trackname=b2b download",
						"download" : "events=event18|eVar11=data#0|type=o|trackname=b2b download",
						"accessory_check" : "events=event49|eVar6=data#0|type=o|trackname=b2b accessory check",
						"print_friendly" : "events=event19|eVar9=data#0|products=data#1|type=o|trackname=b2b print friendly",
						"print_friendly_middle" : "events=event19|eVar9=data#0|type=o|trackname=b2b print friendly",
						"make_request" : "events=event19|eVar9=data#0|type=o|trackname=b2b make a request",
						"buy_now" : "events=event51|eVar27=data#0|type=o|trackname=b2b buy now",
  						
  						// B2B GRO1
  						"resources_webservice" : "eVar75=data#0|type=o|trackname=resource_unique_id",
					    "download_resources" : "events=event18|eVar11=data#0|eVar75=data#1|type=o|trackname=b2b download resources",
  						
						// RU - where to buy button
						"ru_wheretobuy_step1" : "events=event21|eVar45=pdp_support:offline shop:where to buy|type=o|trackname=ru where to buy",
						"ru_wheretobuy_step2" : "events=event22|eVar32=data#0|type=o|trackname=ru where to buy step2",
						"ru_brandshop" : "events=event36|eVar45=data#0|products=data#1|type=o|trackname=ru where to buy",
  						
  						// nl - product selector
						"product_selector" : "events=event12|eVar70=data#0|type=o|trackname=product selector|ex_sitecode=xx",
  						
  						//uk - product detail page - buy accessories direct tab - shop at samsung direct button
  						"pdp_samsungdirect" : "events=event58|eVar45=pdp_buy-accessories-direct:shop at samsung direct|type=o|trackname=buy direct_uk",
  						
  						//in - gnb - SAMSUNG ESTORE Link
  						"in_gnb_estore" : "events=event20|eVar45=gnb util:buy now step1|type=o|trackname=buy now step1",
  						
  						//Search Improvement
  						"related_keyword" : "eVar18=search result page:related keyword|type=o|trackname=General Product Finding Method",
  						"view_by_page" : "eVar18=search result page:view by page|type=o|trackname=General Product Finding Method",
  						"view_by_image" : "eVar18=search result page:view by image|type=o|trackname=General Product Finding Method",
  						
  						//SAR information
  						"sar_information" : "prop31=data#0|products=data#1|type=o|trackname=sar_information",

						//NZ dealer 
						"dealer_step2" : "events=event35|eVar32=data#0|type=o|trackname=nz dealer",
						"buy_online_step2" : "events=event33|eVar27=data#0|type=o|trackname=nz dealer",

						//support search (manual download, trouble shooting)
						"support_m_d_search_result" : "events=event1|eVar8=manuals&download:model number|products=data#0|type=o|trackname=support search",
						"support_m_d_search_noresult" : "events=event1|eVar8=manuals&download:model number|prop9=data#0|type=o|trackname=support search no result terms",
						"support_h_t_search_result" : "events=event1|eVar8=help&troubleshooting:model number|products=data#0|type=o|trackname=support search",
						"support_h_t_search_noresult" : "events=event1|eVar8=help&troubleshooting:model number|prop9=data#0|type=o|trackname=support search no result terms",
						
						//nl - cookie policy popup
						"cookie_policy" : "prop15=data#0|type=o|trackname=cookie policy",
						
						//de - live chat : www.samsung.com/de/support/main/supportMain.do, www.samsung.com/de/info/contactus.html
						"livechat" : "events=event14|eVar26=data#0|type=o|trackname=livechat",
						
						//wheretobuy exception
						"etc_online_step1" : "events=event20|eVar45=data#0|products=data#1|type=o|trackname=buy now step1",
						"etc_dealer_step1" : "events=event36|eVar45=data#0|products=data#1|type=o|trackname=dealer locator step1",
						
						//NBX
						"text_links" : "eVar50=data#0|type=o|trackname=b2b home landing",
						
						//PID
						"pid" : "eVar7=data#0|type=o|trackname=pid",
						
				        //Video Enhancement
			            "video_click" : "eVar18=data#0|type=o|trackname=video layer click",
			            "video_result" : "eVar18=data#0|type=o|trackname=video search result layer click",
			            "view_by_video" : "eVar18=data#0|type=o|trackname=view by video",
			            "video_home" : "eVar18=data#0|type=o|trackname=home video click",
			            
			            //au in home service
			            "au_inhomeservice" : "events=event14|eVar26=premium in home service|type=o|trackname=support search",
			            
			            "best_match" : "events=event60|eVar62=data#0|type=o|trackname=site search best match",
			            
			            "gnb" : "eVar50=data#0|type=o|trackname=gnb|ex_sitecode=xx",
			            
			            //CN main recommnend products
			            "main_recommend" : "events=event20|eVar45=data#0|products=data#1|type=o|trackname=cn main recommend",
			            
			            //Samsung Experience Store (-brandstore)
			            "ses_yes" : "events=event35|products=data#0|eVar32=data#1|type=o|trackname=ses_search result",
			            "ses_no" : "events=event35|products=data#0|prop11=data#1|type=o|trackname=ses_search noresult",
						
      					//DE Feature tab (13.12.12)
						"de_pdp_feature" : "events=event60|eVar62=data#0|products=data#1|type=o|trackname=de pdp feature",
			            
			            //dealerlocator.do (GNB)
			            "dealer_locator_no" : "events=event35|prop11=data#0|type=o|trackname=dealer locator zero result",
			            "local_retailer_step2" : "events=event35|eVar32=data#0|type=o|trackname=local retailers step2",
						
			            //dealer locator
			            "dealer_search_no" : "events=event35|prop11=data#0|type=o|trackname=dealer search zero result terms",
						"local_retailer_search_step2" : "events=event35|products=data#0|eVar32=data#1|type=o|trackname=local retailers step2",
						
						//search_category_2013Dec
						"search_category" : "prop62=data#0|type=o|trackname=site search terms_category",
						
						//support dealer search by product 
						"support_dealer_product" : "events=event35|eVar32=data#0|type=o|trackname=dealer search terms_support_by product",
						"support_dealer_product_no" : "events=event35|prop11=data#0|type=o|trackname=dealer search zero result terms_support_by product",
						
						//SEC about samsung (14.1.7)
						"sec_aboutss_download" : "events=event4|eVar11=data#0|type=d|trackname=aboutsamsung",
						"sec_aboutss_stockinfo" : "events=event60|eVar62=data#0|type=o|trackname=aboutsamsung stockinfo",
						"sec_aboutss_ir" : "events=event60|eVar62=data#0|type=o|trackname=aboutsamsung ir",
						
						//SEC support down
						"guarantee_download" : "events=event4|eVar11=data#0|type=d|trackname=support guarantee download",
						//promotion
						"microsite_action" : "events=event45|eVar33=data#0|type=o|trackname=staticpage action tracking",
						//promotion
						"hub" : "events=event45|eVar33=data#0|type=o|trackname=hub click event",
						"note4hub" : "events=event45|eVar33=data#0|type=o|trackname=hub click event",
						"suhd" : "events=event45|eVar33=data#0|type=o|trackname=suhd click event",
						"audio360" : "events=event45|eVar33=data#0|type=o|trackname=suhd click event",
						"galaxyzero" : "events=event45|eVar33=data#0|type=o|trackname=galaxyzero click event",
						"share_unpacked2015ep1" : "events=event45|eVar33=data#0|type=o|trackname=galaxyzero click event",
						"s6landing" : "events=event45|eVar33=data#0|type=o|trackname=s6 landing click event",

 					    "share_ces2015" : "events=event29|eVar29=data#0|type=o|trackname=social media",
						"ifa2015" : "events=event45|eVar33=data#0|type=o|trackname=ifa 2015 page",
						"ces2016" : "events=event45|eVar33=data#0|type=o|trackname=ces 2016 page",
						"launchingpeople" : "events=event45|eVar33=data#0|type=o|trackname=Launching People page"
	
					};

	var b2bTrackVar = { 
						"sns_icon" : "events=event17|eVar17=data#0|type=o|trackname=social media",
						"addthis" : "events=event17|eVar17=data#0|type=o|trackname=data#1"
					};

	s.linkTrackVars='none';
	s.linkTrackEvents='none';

	var trackValue = "";
	var splitedTrackValue = "";
	var trackData = "";
	var topSection = "";
	//For galaxy note4
	var omni_url =  document.URL;
        var omni_split_url;
        var site_cd = "";
        try{
          omni_split_url =  omni_url.split("/");
		  if (omni_url.indexOf("ifa2015")!=-1 || omni_url.indexOf("ces2016") != -1) {
				site_cd = omni_split_url[5];
				if(site_cd == "") {
					site_cd = "en";
				}
		  }else{
				site_cd = omni_split_url[3];
		  }
        }catch(e){
           
        }
        
	trackData = trackVar[typeName.trim()];
	
	if ( SplitedURL.length > 3 ){ topSection = SplitedURL[2].toLowerCase().trim(); }
	
	if( trackData != undefined){
		if( trackData.indexOf("|b2bfilter") != -1 ){
			if ( topSection == "business" ){
					trackData = b2bTrackVar[typeName.trim()];
			}
		}
	}else{
		printOmniLog("trackData is undefined. Add [" + typeName + "] tag in omni_call() function!!!!" );
		return;
	}
	
	if ( trackData ){	trackValue = trackData.split("|");	}else{	return false;	}
	
	// Variables definition
	var events = "";	var eVar = "";	var prop = "";	var products = "";	var type = "";	var name = "";	var number = 0; var countryCode = "";
	// End of Variables definition
	
	for ( var i = 0 ; i < trackValue.length ; i++ ) {
		splitedTrackValue = trackValue[i].split("=")[0];
		if ( splitedTrackValue.indexOf("events") != -1 ){	// s.events
			events = trackValue[i].split("=")[1];
			if ( s.linkTrackEvents == "none" ){
				s.linkTrackEvents = events;
			}else {
				s.linkTrackEvents += "," + events;
			}
			if ( s.linkTrackVars == "none" ) {
				s.linkTrackVars = "events";
			} else {
				s.linkTrackVars += ",events";
			}
			s["events"] = events;
		}else if ( splitedTrackValue.indexOf("eVar") != -1 ){	// s.eVar#
			eVar = splitedTrackValue;
			if ( s.linkTrackVars == "none" ) {
				s.linkTrackVars = eVar;
			} else {
				s.linkTrackVars += "," + eVar;
			}
			if ( trackValue[i].split("=")[1].indexOf("data#") != -1 ) {
				number = trackValue[i].split("=")[1].split("#")[1];
				
				if(typeName == "note4hub"){
					s[eVar] = site_cd + ":" + data.split(",")[number];
				}else if(typeName == "suhd"){
					s[eVar] = site_cd + ":suhd:" + data.split(",")[number];
				}else if(typeName == "microsite_action" && data.split(",")[number].indexOf("unpacked2014ep2:pollsubmit")){
					s[eVar] = data.split(",")[number].replaceAll("'","");//galaxyzero
			   }else if(typeName == "share_ces2015"){
					s[eVar] = site_cd + ":ces2015:" + data.split(",")[number];
			   }else if(typeName == "share_unpacked2015ep1"){
					s[eVar] = site_cd + ":unpacked2015ep1:" + data.split(",")[number];
				}else if(typeName == "galaxyzero"){
					s[eVar] = site_cd + ":galaxyzero:" + data.split(",")[number];
				}else if(typeName == "audio360"){
					s[eVar] = site_cd + ":audio360:" + data.split(",")[number];
				}else if(typeName == "s6landing"){
					s[eVar] = site_cd + ":s6landing:" + data.split(",")[number];
				}else if(typeName == "ifa2015"){
					s[eVar] = "global:ifa2015:" +site_cd+":"+ data.split(",")[number];
				}else if(typeName == "ces2016"){
					s[eVar] = "global:ces2016:" +site_cd+":"+ data.split(",")[number];
				}else if(typeName == "launchingpeople") {
					s[eVar] = site_cd + ":launching people:" + data.split(",")[number];
				}else {
					s[eVar] = data.split(",")[number];
				}
				number = 0;
			} else {
				s[eVar] = trackValue[i].split("=")[1];
			}
		}else if ( splitedTrackValue.indexOf("prop") != -1 ){	// s.prop#
			prop = splitedTrackValue;
			if ( s.linkTrackVars == "none" ) {
				s.linkTrackVars = prop;
			} else {
				s.linkTrackVars += "," + prop;
			}
			if ( trackValue[i].split("=")[1].indexOf("data#") != -1 ) {
				number = trackValue[i].split("=")[1].split("#")[1];
				s[prop] = data.split(",")[number];
				number = 0;
			} else {
				s[prop] = trackValue[i].split("=")[1];
			}
		}else if ( splitedTrackValue.indexOf("products") != -1 ){	// s.products
			products = splitedTrackValue;
			if ( s.linkTrackVars == "none" ) {
				s.linkTrackVars = products;
			} else {
				s.linkTrackVars += "," + products;
			}
			if ( trackValue[i].split("=")[1].indexOf("data#") != -1 ) {
				number = trackValue[i].split("=")[1].split("#")[1];
				if( topSection == "business" ){
					s[products] = ";"+ data.split(",")[number].trim();
				}else if( topSection == "support" ){
					s[products] = ";"+data.split(",")[number].trim();
				}else {
					s[products] = ";"+data.split(",")[number].trim();
					
					if ( typeName == "pdp_ecommerce" ) // Exception of SENA E-commerce button on PDP
						s.products = s.products.replace(";","");
				}
				number = 0;
			} else {
				if( topSection == "business" ){
					s[products] = ";"+trackValue[i].split("=")[1];
				}else if( topSection == "support" ){
					s[products] = ";"+trackValue[i].split("=")[1];
				}else {
					s[products] = ";"+trackValue[i].split("=")[1];
				}
			}
		}else if ( splitedTrackValue.indexOf("type") != -1 ){
			type = trackValue[i].split("=")[1];
		}else if ( splitedTrackValue.indexOf("trackname") != -1 ){
			if ( trackValue[i].split("=")[1].indexOf("data#") != -1 ) {
				number = trackValue[i].split("=")[1].split("#")[1];
				name = ";"+data.split(",")[number].trim();
				number = 0;
			} else {
				name = trackValue[i].split("=")[1];
			}
		}else if ( splitedTrackValue.indexOf("ex_sitecode") != -1 ){
			countryCode = trackValue[i].split("=")[1];
			var thisCountry = getAccountSiteCode();
			if ( countryCode.indexOf( thisCountry ) == -1 ){
				initVar();
				s.linkTrackVars='none';
				s.linkTrackEvents='none';
				return;
			} 
		}
	}
	// s.products
	if ( s.linkTrackVars.indexOf("products") == -1 ){
		var model_name = document.getElementById( "model_name" );
		if( model_name != undefined && model_name != null){
			model_name = document.getElementById( "model_name" ).value;
			var pageTrack = document.getElementById( "pageTrack" );
			if ( pageTrack != undefined && pageTrack != null ){
				pageTrack = document.getElementById( "pageTrack" ).value;
				if ( pageTrack.indexOf("detail") != -1 && model_name != "" ){
					if ( s.linkTrackVars == "none" ) {
						s.linkTrackVars = "products";
					} else {
						s.linkTrackVars += ",products";
					}
					if ( pageTrack.indexOf( "support" ) != -1 ) {
						s["products"] = ";"+model_name;
					} else if ( pageTrack.indexOf( "b2b" ) != -1 ) {
						s["products"] = ";"+ model_name;
					} else {
						s["products"] = ";" + model_name;
					}
				}
			}
		}
	}

	setClickVar();

	//s.tl(true, type, name);	/* 20160223 - call option 변경 (true->this)*/
	s.tl(this, type, name);
	s.linkTrackVars='none';
	s.linkTrackEvents='none';
	return true;
}


/*
 * param : No
 * return : useDilYNCountry 
 * Descriptioin : return country that read the DilCode 
 */
/* Audience Manager DIL*/
function getdil_Local_Account(){
	//국가 등록
	/*=======================================================================================*/
	// 1. register the country like /*ru*/
	var useDilCountry =  ['sa','sa_en','uk','ae','ae_ar','fr','de','it','au','se','fi','no','dk','pl','nl','be','be_fr','id','th','tr','levant','lb','es','br'];
	var useDilYNCountry = "";
	$.each(useDilCountry , function(idx){
		if(getOmniSiteCd() == useDilCountry[idx]){
			//case 별 함수 return case별 return 값 

			//2. register case like 'ru'
			switch(useDilCountry[idx]){
				case 'uk'    : useDilYNCountry = 'samsung';         
					       			 break;
				case 'sa':
				case 'sa_en':
				case 'ae'    :
				case 'ae_ar' : useDilYNCountry ='samsung-mena';    
				               break;
				case 'fr'    : useDilYNCountry ='samsung-france';  
				               break;
				case 'de'    : useDilYNCountry ='samsung-germany'; 
				               break;
				case 'it'    : useDilYNCountry ='samsung-italy';   
				               break;
				case 'au'    : useDilYNCountry ='samsungau';       
				               break;
				case 'se'    : 
				case 'fi'    : 
				case 'no'    : 
				case 'dk'    : useDilYNCountry = 'samsung-nordics' 
				               break;
				case 'pl'		 : useDilYNCountry ='samsung-poland';       /* AM 코드 추가 */
				               break;	
				case 'nl'		 : useDilYNCountry ='samsung-benelux';       
				               break;	
				case 'be'		 : useDilYNCountry ='samsung-benelux';       
				               break;	
				case 'be_fr' : useDilYNCountry ='samsung-benelux';       
				               break;  
				case 'id'		 : useDilYNCountry ='samsungindonesia';			/* AM DIL code 추가 (ID) */
											 break;
				case 'th'    : useDilYNCountry = 'samsungthailand';			/* AM DIL code 추가 (TH/TR) */
											 break; 
				case 'tr'    : useDilYNCountry = 'samsungturkey';		
											 break; 	
				case 'levant' :                                            /* AM DIL code 추가 (levant) */
				case 'lb'     :	useDilYNCountry = 'samsunglevant'; 		   /* AM DIL code 추가 (lb) */
											 break;
				case 'es'     :	useDilYNCountry = 'samsungspain'; 		   /* AM DIL code �߰� (es) */
											 break;  
				case 'br'     : useDilYNCountry = 'samsungbrazil';                  /* AM DIL code �߰� (br) */
                                                                                         break;
				default     : useDilYNCountry = "";
							   			 break;

				
			}
		}
	});
	return useDilYNCountry;
	/*=======================================================================================*/
}




/* Audience Manager DIL 5.7 */
function callDilCode() {
	try {
		
		if(getdil_Local_Account() != ""){
	printOmniLog("getdil_Local_Account() : " + getdil_Local_Account());
	/*if("uk".indexOf(getOmniSiteCd())!=-1 && document.location.href && document.location.href.indexOf('/uk/')>-1){ */
		printOmniLog("["+getOmniSiteCd()+" DIL tagging] code proccessed");
	"function"!==typeof window.DIL&&(window.DIL=function(a,c){var d=[],b,g;a!==Object(a)&&(a={});var e,h,k,q,p,n,l,D,m,J,K,E;e=a.partner;h=a.containerNSID;k=a.iframeAttachmentDelay;q=!!a.disableDestinationPublishingIframe;p=a.iframeAkamaiHTTPS;n=a.mappings;l=a.uuidCookie;D=!0===a.enableErrorReporting;m=a.visitorService;J=a.declaredId;K=!0===a.removeFinishedScriptsAndCallbacks;E=!0===a.delayAllUntilWindowLoad;var L,M,N,F,C,O,P;L=!0===a.disableScriptAttachment;M=!0===a.disableCORSFiring;N=!0===a.disableDefaultRequest;
	F=a.afterResultForDefaultRequest;C=a.dpIframeSrc;O=!0===a.testCORS;P=!0===a.useJSONPOnly;D&&DIL.errorModule.activate();var Q=!0===window._dil_unit_tests;(b=c)&&d.push(b+"");if(!e||"string"!==typeof e)return b="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:b,filename:"dil.js"}),Error(b);b="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(h||"number"===typeof h)h=parseInt(h,10),!isNaN(h)&&0<=h&&(b="");
	b&&(h=0,d.push(b),b="");g=DIL.getDil(e,h);if(g instanceof DIL&&g.api.getPartner()===e&&g.api.getContainerNSID()===h)return g;if(this instanceof DIL)DIL.registerDil(this,e,h);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+e+" and containerNSID = "+h);var y={IS_HTTPS:"https:"===document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},G={stuffed:{}},u={},r={firingQueue:[],
	fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_cors_responses:0,num_of_cors_errors:0,corsErrorSources:[],num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:h+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,
	d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,mid:null,noVisitorAPI:!1,instance:null,releaseType:"no VisitorAPI",admsProcessingStarted:!1,process:function(f){try{if(!this.admsProcessingStarted){var s=this,a,x,b,d,c;if("function"===typeof f&&"function"===typeof f.getInstance){if(m===Object(m)&&(a=m.namespace)&&"string"===typeof a)x=f.getInstance(a);else{this.releaseType="no namespace";this.releaseRequests();return}if(x===Object(x)&&"function"===
	typeof x.isAllowed&&"function"===typeof x.getMarketingCloudVisitorID){if(!x.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=x;this.admsProcessingStarted=!0;b=function(f){"VisitorAPI"!==s.releaseType&&(s.mid=f,s.releaseType="VisitorAPI",s.releaseRequests())};Q&&(d=m.server)&&"string"===typeof d&&(x.server=d);c=x.getMarketingCloudVisitorID(b);if("string"===typeof c&&c.length){b(c);return}setTimeout(function(){"VisitorAPI"!==s.releaseType&&(s.releaseType=
	"timeout",s.releaseRequests())},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(e){this.releaseRequests()}},releaseRequests:function(){this.calledBack=!0;r.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var f=v.isPopulatedString,s=this.getMarketingCloudVisitorID();f(this.mid)&&this.mid===s||(this.mid=
	s);return f(this.mid)?"d_mid="+this.mid+"&":""}},declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},setDeclaredId:function(f,s){var a=v.isPopulatedString,x=encodeURIComponent;if(f===Object(f)&&a(s)){var b=f.dpid,d=f.dpuuid,c=null;if(a(b)&&a(d)){c=x(b)+"$"+x(d);if(!0===this.declaredIdCombos[c])return"setDeclaredId: combo exists for type '"+s+"'";this.declaredIdCombos[c]=!0;this.declaredId[s]={dpid:b,dpuuid:d};return"setDeclaredId: succeeded for type '"+s+"'"}}return"setDeclaredId: failed for type '"+
	s+"'"},getDeclaredIdQueryString:function(){var f=this.declaredId.request,s=this.declaredId.init,a="";null!==f?a="&d_dpid="+f.dpid+"&d_dpuuid="+f.dpuuid:null!==s&&(a="&d_dpid="+s.dpid+"&d_dpuuid="+s.dpuuid);return a}},registerRequest:function(f){var s=this.firingQueue;f===Object(f)&&s.push(f);this.firing||!s.length||E&&!DIL.windowLoaded||(this.adms.calledBack?(f=s.shift(),f.src=f.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.adms.getMIDQueryString()+"d_nsid="),v.isPopulatedString(f.corsPostData)&&
	(f.corsPostData=f.corsPostData.replace(/^d_nsid=/,this.adms.getMIDQueryString()+"d_nsid=")),A.fireRequest(f),this.firstRequestHasFired||"script"!==f.tag&&"cors"!==f.tag||(this.firstRequestHasFired=!0)):this.processVisitorAPI())},processVisitorAPI:function(){this.adms.process(window.Visitor)},requestRemoval:function(f){if(!K)return"removeFinishedScriptsAndCallbacks is not boolean true";var s=this.toRemove,a,b;f===Object(f)&&(a=f.script,b=f.callbackName,(a===Object(a)&&"SCRIPT"===a.nodeName||"no script created"===
	a)&&"string"===typeof b&&b.length&&s.push(f));if(this.readyToRemove&&s.length){b=s.shift();a=b.script;b=b.callbackName;"no script created"!==a?(f=a.src,a.parentNode.removeChild(a)):f=a;window[b]=null;try{delete window[b]}catch(d){}this.removed.push({scriptSrc:f,callbackName:b});DIL.variables.scriptsRemoved.push(f);DIL.variables.callbacksRemoved.push(b);return this.requestRemoval()}return"requestRemoval() processed"}};g=function(){var f="http://fast.",a="?d_nsid="+h+"#"+encodeURIComponent(document.location.href);
	if("string"===typeof C&&C.length)return C+a;y.IS_HTTPS&&(f=!0===p?"https://fast.":"https://");return f+e+".demdex.net/dest4.html"+a};var z={THROTTLE_START:3E4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+e+"_"+h,url:g(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:y.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var f=this,a=document.createElement("iframe");a.id=this.id;a.style.cssText="display: none; width: 0; height: 0;";
	a.src=this.url;t.addListener(a,"load",function(){f.iframeHasLoaded=!0;f.requestToProcess()});document.body.appendChild(a);this.iframe=a},requestToProcess:function(f,a){var b=this;f&&!v.isEmptyObject(f)&&this.process(f,a);this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){b.messageSendingInterval=y.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},process:function(f,
	a){var b=encodeURIComponent,d,c,e,g,h,n;a===Object(a)&&(n=t.encodeAndBuildRequest(["",a.dpid||"",a.dpuuid||""],","));if((d=f.dests)&&d instanceof Array&&(c=d.length))for(e=0;e<c;e++)g=d[e],g=[b("dests"),b(g.id||""),b(g.y||""),b(g.c||"")],this.addMessage(g.join("|"));if((d=f.ibs)&&d instanceof Array&&(c=d.length))for(e=0;e<c;e++)g=d[e],g=[b("ibs"),b(g.id||""),b(g.tag||""),t.encodeAndBuildRequest(g.url||[],","),b(g.ttl||""),"",n],this.addMessage(g.join("|"));if((d=f.dpcalls)&&d instanceof Array&&(c=
	d.length))for(e=0;e<c;e++)g=d[e],h=g.callback||{},h=[h.obj||"",h.fn||"",h.key||"",h.tag||"",h.url||""],g=[b("dpm"),b(g.id||""),b(g.tag||""),t.encodeAndBuildRequest(g.url||[],","),b(g.ttl||""),t.encodeAndBuildRequest(h,","),n],this.addMessage(g.join("|"));this.jsonProcessed.push(f)},addMessage:function(f){var a=encodeURIComponent,a=D?a("---destpub-debug---"):a("---destpub---");this.messages.push(a+f)},sendMessages:function(){var f=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,
	this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){f.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},I={traits:function(f){v.isValidPdata(f)&&(u.sids instanceof Array||(u.sids=[]),t.extendArray(u.sids,f));return this},pixels:function(f){v.isValidPdata(f)&&(u.pdata instanceof Array||(u.pdata=[]),t.extendArray(u.pdata,f));return this},logs:function(f){v.isValidLogdata(f)&&(u.logdata!==Object(u.logdata)&&(u.logdata={}),t.extendObject(u.logdata,
	f));return this},customQueryParams:function(f){v.isEmptyObject(f)||t.extendObject(u,f,r.reservedKeys);return this},signals:function(f,a){var b,d=f;if(!v.isEmptyObject(d)){if(a&&"string"===typeof a)for(b in d={},f)f.hasOwnProperty(b)&&(d[a+b]=f[b]);t.extendObject(u,d,r.reservedKeys)}return this},declaredId:function(f){r.declaredId.setDeclaredId(f,"request");return this},result:function(f){"function"===typeof f&&(u.callback=f);return this},afterResult:function(f){"function"===typeof f&&(u.postCallbackFn=
	f);return this},useImageRequest:function(){u.useImageRequest=!0;return this},clearData:function(){u={};return this},submit:function(){A.submitRequest(u);u={};return this},getPartner:function(){return e},getContainerNSID:function(){return h},getEventLog:function(){return d},getState:function(){var f={},a={};t.extendObject(f,r,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});t.extendObject(a,z,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:u,otherRequestInfo:f,
	destinationPublishingInfo:a}},idSync:function(f){if(f!==Object(f)||"string"!==typeof f.dpid||!f.dpid.length)return"Error: config or config.dpid is empty";if("string"!==typeof f.url||!f.url.length)return"Error: config.url is empty";var a=f.url,b=f.minutesToLive,d=encodeURIComponent,c,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"===typeof b)b=20160;else if(b=parseInt(b,10),isNaN(b)||0>=b)return"Error: config.minutesToLive needs to be a positive number";c=t.encodeAndBuildRequest(["",
	f.dpid,f.dpuuid||""],",");f=["ibs",d(f.dpid),"img",d(a),b,"",c];z.addMessage(f.join("|"));r.firstRequestHasFired&&z.requestToProcess();return"Successfully queued"},aamIdSync:function(f){if(f!==Object(f)||"string"!==typeof f.dpuuid||!f.dpuuid.length)return"Error: config or config.dpuuid is empty";f.url="//dpm.demdex.net/ibs:dpid="+f.dpid+"&dpuuid="+f.dpuuid;return this.idSync(f)},passData:function(f){if(v.isEmptyObject(f))return"Error: json is empty or not an object";A.defaultCallback(f);return"json submitted for processing"},
	getPlatformParams:function(){return r.platformParams},getEventCallConfigParams:function(){var f=r,a=f.modStatsParams,b=f.platformParams,d;if(!a){a={};for(d in b)b.hasOwnProperty(d)&&!f.nonModStatsParams[d]&&(a[d.replace(/^d_/,"")]=b[d]);f.modStatsParams=a}return a}},A={corsMetadata:function(){var f="none",a=!0;"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?f="XMLHttpRequest":(new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/"))()?
	f="XMLHttpRequest":"undefined"!==typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(a=!1),0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&(a=!1));return{corsType:f,corsCookiesEnabled:a}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new window[this.corsMetadata.corsType]},submitRequest:function(f){r.registerRequest(A.createQueuedRequest(f));return!0},createQueuedRequest:function(f){var a=r,b,d=f.callback,c="img",g;if(!v.isEmptyObject(n)){var e,
	m,l;for(e in n)n.hasOwnProperty(e)&&(m=n[e],null!=m&&""!==m&&e in f&&!(m in f||m in r.reservedKeys)&&(l=f[e],null!=l&&""!==l&&(f[m]=l)))}v.isValidPdata(f.sids)||(f.sids=[]);v.isValidPdata(f.pdata)||(f.pdata=[]);v.isValidLogdata(f.logdata)||(f.logdata={});f.logdataArray=t.convertObjectToKeyValuePairs(f.logdata,"=",!0);f.logdataArray.push("_ts="+(new Date).getTime());"function"!==typeof d&&(d=this.defaultCallback);a.useJSONP=!0!==f.useImageRequest;a.useJSONP&&(c="script",b=a.callbackPrefix+"_"+h+"_"+
	(new Date).getTime());a=this.makeRequestSrcData(f,b);!P&&(g=this.getCORSInstance())&&a.truncated&&(this.corsMetadata.corsCookiesEnabled||a.isDeclaredIdCall)&&(c="cors");return{tag:c,src:a.src,corsSrc:a.corsSrc,internalCallbackName:b,callbackFn:d,postCallbackFn:f.postCallbackFn,useImageRequest:!!f.useImageRequest,requestData:f,corsInstance:g,corsPostData:a.corsPostData,hasCORSError:!1}},defaultCallback:function(f,a){var b,d,c,e,g,h,m,n,w;if((b=f.stuff)&&b instanceof Array&&(d=b.length))for(c=0;c<d;c++)if((e=
	b[c])&&e===Object(e)){g=e.cn;h=e.cv;m=e.ttl;if("undefined"===typeof m||""===m)m=Math.floor(t.getMaxCookieExpiresInMinutes()/60/24);n=e.dmn||"."+document.domain.replace(/^www\./,"");w=e.type;g&&(h||"number"===typeof h)&&("var"!==w&&(m=parseInt(m,10))&&!isNaN(m)&&t.setCookie(g,h,1440*m,"/",n,!1),G.stuffed[g]=h)}b=f.uuid;v.isPopulatedString(b)&&!v.isEmptyObject(l)&&(d=l.path,"string"===typeof d&&d.length||(d="/"),c=parseInt(l.days,10),isNaN(c)&&(c=100),t.setCookie(l.name||"aam_did",b,1440*c,d,l.domain||
	"."+document.domain.replace(/^www\./,""),!0===l.secure));q||r.abortRequests||z.requestToProcess(f,a)},makeRequestSrcData:function(f,a){f.sids=v.removeEmptyArrayValues(f.sids||[]);f.pdata=v.removeEmptyArrayValues(f.pdata||[]);var b=r,d=b.platformParams,c=t.encodeAndBuildRequest(f.sids,","),g=t.encodeAndBuildRequest(f.pdata,","),m=(f.logdataArray||[]).join("&");delete f.logdataArray;var n=y.IS_HTTPS?"https://":"http://",l=b.declaredId.getDeclaredIdQueryString(),k;k=[];var w,q,p,u;for(w in f)if(!(w in
	b.reservedKeys)&&f.hasOwnProperty(w))if(q=f[w],w=encodeURIComponent(w),q instanceof Array)for(p=0,u=q.length;p<u;p++)k.push(w+"="+encodeURIComponent(q[p]));else k.push(w+"="+encodeURIComponent(q));k=k.length?"&"+k.join("&"):"";w=!1;c="d_nsid="+d.d_nsid+l+(c.length?"&d_sid="+c:"")+(g.length?"&d_px="+g:"")+(m.length?"&d_ld="+encodeURIComponent(m):"");d="&d_rtbd="+d.d_rtbd+"&d_jsonv="+d.d_jsonv+"&d_dst="+d.d_dst;n=n+e+".demdex.net/event";g=b=n+"?"+c+(b.useJSONP?d+"&d_cb="+(a||""):"")+k;2048<b.length&&
	(b=b.substring(0,b.lastIndexOf("&")),w=!0);return{corsSrc:n+"?"+(O?"testcors=1&d_nsid="+h+"&":"")+"_ts="+(new Date).getTime(),src:b,originalSrc:g,truncated:w,corsPostData:c+d+k,isDeclaredIdCall:""!==l}},fireRequest:function(f){if("img"===f.tag)this.fireImage(f);else{var a=r.declaredId,a=a.declaredId.request||a.declaredId.init||{},a={dpid:a.dpid||"",dpuuid:a.dpuuid||""};"script"===f.tag?this.fireScript(f,a):"cors"===f.tag&&this.fireCORS(f,a)}},fireImage:function(a){var c=r,e,g;c.abortRequests||(c.firing=
	!0,e=new Image(0,0),c.sent.push(a),e.onload=function(){c.firing=!1;c.fired.push(a);c.num_of_img_responses++;c.registerRequest()},g=function(e){b="imgAbortOrErrorHandler received the event of type "+e.type;d.push(b);c.abortRequests=!0;c.firing=!1;c.errored.push(a);c.num_of_img_errors++;c.registerRequest()},e.addEventListener?(e.addEventListener("error",g,!1),e.addEventListener("abort",g,!1)):e.attachEvent&&(e.attachEvent("onerror",g),e.attachEvent("onabort",g)),e.src=a.src)},fireScript:function(a,
	c){var g=this,h=r,m,n,l=a.src,k=a.postCallbackFn,q="function"===typeof k,p=a.internalCallbackName;h.abortRequests||(h.firing=!0,window[p]=function(g){try{g!==Object(g)&&(g={});var m=a.callbackFn;h.firing=!1;h.fired.push(a);h.num_of_jsonp_responses++;m(g,c);q&&k(g,c)}catch(l){l.message="DIL jsonp callback caught error with message "+l.message;b=l.message;d.push(b);l.filename=l.filename||"dil.js";l.partner=e;DIL.errorModule.handleError(l);try{m({error:l.name+"|"+l.message},c),q&&k({error:l.name+"|"+
	l.message},c)}catch(H){}}finally{h.requestRemoval({script:n,callbackName:p}),h.registerRequest()}},L?(h.firing=!1,h.requestRemoval({script:"no script created",callbackName:p})):(n=document.createElement("script"),n.addEventListener&&n.addEventListener("error",function(d){h.requestRemoval({script:n,callbackName:p});b="jsonp script tag error listener received the event of type "+d.type+" with src "+l;g.handleScriptError(b,a)},!1),n.type="text/javascript",n.src=l,m=DIL.variables.scriptNodeList[0],m.parentNode.insertBefore(n,
	m)),h.sent.push(a),h.declaredId.declaredId.request=null)},fireCORS:function(a,c){function g(n){var l;try{if(l=JSON.parse(n),l!==Object(l)){h.handleCORSError(a,c,"Response is not JSON");return}}catch(k){h.handleCORSError(a,c,"Error parsing response as JSON");return}try{var H=a.callbackFn;m.firing=!1;m.fired.push(a);m.num_of_cors_responses++;H(l,c);t&&q(l,c)}catch(p){p.message="DIL handleCORSResponse caught error with message "+p.message;b=p.message;d.push(b);p.filename=p.filename||"dil.js";p.partner=
	e;DIL.errorModule.handleError(p);try{H({error:p.name+"|"+p.message},c),t&&q({error:p.name+"|"+p.message},c)}catch(r){}}finally{m.registerRequest()}}var h=this,m=r,n=this.corsMetadata.corsType,l=a.corsSrc,k=a.corsInstance,p=a.corsPostData,q=a.postCallbackFn,t="function"===typeof q;if(!m.abortRequests){m.firing=!0;if(M)m.firing=!1;else try{k.open("post",l,!0),"XMLHttpRequest"===n?(k.withCredentials=!0,k.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),k.onreadystatechange=function(){4===
	this.readyState&&(200===this.status?g(this.responseText):h.handleCORSError(a,c,"onreadystatechange"))}):"XDomainRequest"===n&&(k.onload=function(){g(this.responseText)}),k.onerror=function(){h.handleCORSError(a,c,"onerror")},k.ontimeout=function(){h.handleCORSError(a,c,"ontimeout")},k.send(p)}catch(u){this.handleCORSError(a,c,"try-catch")}m.sent.push(a);m.declaredId.declaredId.request=null}},handleCORSError:function(a,b,c){a.hasCORSError||(a.hasCORSError=!0,r.num_of_cors_errors++,r.corsErrorSources.push(c),
	a.tag="script",this.fireScript(a,b))},handleScriptError:function(a,b){r.num_of_jsonp_errors++;this.handleRequestError(a,b)},handleRequestError:function(a,b){var c=r;d.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.registerRequest()}},v={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;
	return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,g=[],b=0;b<c;b++)d=a[b],"undefined"!==typeof d&&null!==d&&""!==d&&g.push(d);return g},isPopulatedString:function(a){return"string"===typeof a&&a.length}},t={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"===typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+b,function(a){"function"===typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,
	b,c){var d=[],g,e;b||(b="=");for(g in a)a.hasOwnProperty(g)&&(e=a[g],"undefined"!==typeof e&&null!==e&&""!==e&&d.push(g+b+(c?encodeURIComponent(e):e)));return d},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var g=Array(d),e=0;e<d;e++)e in c&&(g[e]=b.call(b,c[e],
	e,c));return g},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var g=[],e=0;e<d;e++)if(e in c){var h=c[e];b.call(b,h,e,c)&&g.push(h)}return g}return a.filter(b)},getCookie:function(a){a+="=";var b=document.cookie.split(";"),c,d,e;c=0;for(d=b.length;c<d;c++){for(e=b[c];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(a))return decodeURIComponent(e.substring(a.length,
	e.length))}return null},setCookie:function(a,b,c,d,e,g){var h=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(c?";expires="+(new Date(h.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(g?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,b),!0):!1},extendObject:function(a,b,c){var d;if(a===Object(a)&&b===Object(b)){for(d in b)!b.hasOwnProperty(d)||!v.isEmptyObject(c)&&d in c||(a[d]=b[d]);return!0}return!1},
	getMaxCookieExpiresInMinutes:function(){return((new Date(y.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1E3/60}};"error"===e&&0===h&&t.addListener(window,"load",function(){DIL.windowLoaded=!0});var B=function(){r.registerRequest();S();q||r.abortRequests||z.attachIframe();r.readyToRemove=!0;r.requestRemoval()},S=function(){q||setTimeout(function(){N||r.firstRequestHasFired||r.adms.admsProcessingStarted||r.adms.calledBack||("function"===typeof F?I.afterResult(F).submit():I.submit())},
	DIL.constants.TIME_TO_DEFAULT_REQUEST)},R=document;"error"!==e&&(DIL.windowLoaded?B():"complete"!==R.readyState&&"loaded"!==R.readyState?t.addListener(window,"load",B):DIL.isAddedPostWindowLoadWasCalled?t.addListener(window,"load",B):E||(k="number"===typeof k?parseInt(k,10):0,0>k&&(k=0),setTimeout(B,k||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));r.declaredId.setDeclaredId(J,"init");this.api=I;this.getStuffedVariable=function(a){var b=G.stuffed[a];b||"number"===typeof b||(b=t.getCookie(a))||
	"number"===typeof b||(b="");return b};this.validators=v;this.helpers=t;this.constants=y;this.log=d;Q&&(this.pendingRequest=u,this.requestController=r,this.setDestinationPublishingUrl=g,this.destinationPublishing=z,this.requestProcs=A,this.variables=G,this.callWindowLoadFunctions=B)},function(){var a=document,c;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",c=function(){a.removeEventListener("DOMContentLoaded",c,!1);a.readyState="complete"},!1))}(),
	DIL.extendStaticPropertiesAndMethods=function(a){var c;if(a===Object(a))for(c in a)a.hasOwnProperty(c)&&(this[c]=a[c])},DIL.extendStaticPropertiesAndMethods({version:"5.7",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,isAddedPostWindowLoad:function(a){this.isAddedPostWindowLoadWasCalled=
	!0;this.windowLoaded="function"===typeof a?!!a():"boolean"===typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(c){return(new Image(0,0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(a,c,d){c=c+"$"+
	d;c in this.dils||(this.dils[c]=a)},getDil:function(a,c){var d;"string"!==typeof a&&(a="");c||(c=0);d=a+"$"+c;return d in this.dils?this.dils[d]:Error("The DIL instance with partner = "+a+" and containerNSID = "+c+" was not found")},dexGetQSVars:function(a,c,d){c=this.getDil(c,d);return c instanceof this?c.getStuffedVariable(a):""},xd:{postMessage:function(a,c,d){var b=1;c&&(window.postMessage?d.postMessage(a,c.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):c&&(d.location=c.replace(/#.*$/,"")+"#"+ +new Date+
	b++ +"&"+a))}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),c={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},d=!1;return{activate:function(){d=!0},handleError:function(b){if(!d)return"DIL error module has not been activated";b!==Object(b)&&(b={});var g=b.name?(b.name+"").toLowerCase():
	"",e=[];b={name:g,filename:b.filename?b.filename+"":"",partner:b.partner?b.partner+"":"no_partner",site:b.site?b.site+"":document.location.href,message:b.message?b.message+"":""};e.push(g in c?c[g]:c.noerrortypedefined);a.api.pixels(e).logs(b).useImageRequest().submit();return"DIL error report sent"},pixelMap:c}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,c,d){var b="";c=c||"Error caught in DIL module/submodule: ";a===Object(a)?b=c+(a.message||"err has no message"):(b=c+"err is not a valid object",
	a={});a.message=b;d instanceof DIL&&(a.partner=d.api.getPartner());DIL.errorModule.handleError(a);return this.errorMessage=b}}});
	DIL.tools.getSearchReferrer=function(a,c){var d=DIL.getDil("error"),b=DIL.tools.decomposeURI(a||document.referrer),g="",e="",h={queryParam:"q"};return(g=d.helpers.filter([c===Object(c)?c:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!b.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:b.hostname,keywords:(d.helpers.extendObject(h,g),e=h.queryPattern?
	(g=(""+b.search).match(h.queryPattern))?g[1]:"":b.uriParams[h.queryParam],decodeURIComponent(e||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
	DIL.tools.decomposeURI=function(a){var c=DIL.getDil("error"),d=document.createElement("a");d.href=a||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(a,d){c.helpers.map(d.split("&"),function(c){c=c.split("=");a[c.shift()]=c.shift()});return a}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
	DIL.tools.getMetaTags=function(){var a={},c=document.getElementsByTagName("meta"),d,b,g,e,h;d=0;for(g=arguments.length;d<g;d++)if(e=arguments[d],null!==e)for(b=0;b<c.length;b++)if(h=c[b],h.name===e){a[e]=h.content;break}return a};
	DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,d,b){try{var g=this,e={name:"DIL Site Catalyst Module Error"},h=function(a){e.message=a;DIL.errorModule.handleError(e);return a};this.options=b===Object(b)?b:{};this.dil=null;if(c instanceof DIL)this.dil=c;else return h("dilInstance is not a valid instance of DIL");e.partner=c.api.getPartner();if(a!==Object(a))return h("siteCatalystReportingSuite is not an object");window.AppMeasurement_Module_DIL=a.m_DIL=
	function(a){var b="function"===typeof a.m_i?a.m_i("DIL"):this;if(b!==Object(b))return h("m is not an object");b.trackVars=g.constructTrackVars(d);b.d=0;b.s=a;b._t=function(){var a,b,c=","+this.trackVars+",",d=this.s,e,k=[];e=[];var p={},q=!1;if(d!==Object(d))return h("Error in m._t function: s is not an object");if(this.d){if("function"===typeof d.foreachVar)d.foreachVar(function(a,b){"undefined"!==typeof b&&(p[a]=b,q=!0)},this.trackVars);else{if(!(d.va_t instanceof Array))return h("Error in m._t function: s.va_t is not an array");
	if(d.lightProfileID)(a=d.lightTrackVars)&&(a=","+a+","+d.vl_mr+",");else if(d.pe||d.linkType)a=d.linkTrackVars,d.pe&&(b=d.pe.substring(0,1).toUpperCase()+d.pe.substring(1),d[b]&&(a=d[b].trackVars)),a&&(a=","+a+","+d.vl_l+","+d.vl_l2+",");if(a){b=0;for(k=a.split(",");b<k.length;b++)0<=c.indexOf(","+k[b]+",")&&e.push(k[b]);e.length&&(c=","+e.join(",")+",")}e=0;for(b=d.va_t.length;e<b;e++)a=d.va_t[e],0<=c.indexOf(","+a+",")&&"undefined"!==typeof d[a]&&null!==d[a]&&""!==d[a]&&(p[a]=d[a],q=!0)}g.includeContextData(d,
	p).store_populated&&(q=!0);q&&this.d.api.signals(p,"c_").submit()}}};a.loadModule("DIL");a.DIL.d=c;return e.message?e.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(k){return this.handle(k,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var c=[],d,b,g,e,h;if(a===Object(a)){d=a.names;if(d instanceof Array&&(g=d.length))for(b=0;b<g;b++)e=d[b],"string"===typeof e&&e.length&&c.push(e);a=a.iteratedNames;if(a instanceof Array&&
	(g=a.length))for(b=0;b<g;b++)if(d=a[b],d===Object(d)&&(e=d.name,h=parseInt(d.maxIndex,10),"string"===typeof e&&e.length&&!isNaN(h)&&0<=h))for(d=0;d<=h;d++)c.push(e+d);if(c.length)return c.join(",")}return this.constructTrackVars({names:"pageName channel campaign products events pe pev1 pev2 pev3".split(" "),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:250}]})},includeContextData:function(a,c){var d={},b=!1;if(a.contextData===Object(a.contextData)){var g=a.contextData,e=this.options.replaceContextDataPeriodsWith,
	h=this.options.filterFromContextVariables,k={},q,p,n,l;"string"===typeof e&&e.length||(e="_");if(h instanceof Array)for(q=0,p=h.length;q<p;q++)n=h[q],this.dil.validators.isPopulatedString(n)&&(k[n]=!0);for(l in g)!g.hasOwnProperty(l)||k[l]||!(h=g[l])&&"number"!==typeof h||(l=("contextData."+l).replace(/\./g,e),c[l]=h,b=!0)}d.store_populated=b;return d}};
	DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,d){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var b={name:"DIL GA Module Error"},g="";c instanceof DIL?(this.dil=c,b.partner=this.dil.api.getPartner()):(g="dilInstance is not a valid instance of DIL",
	b.message=g,DIL.errorModule.handleError(b));a instanceof Array&&a.length?this.arr=a:(g="gaArray is not an array or is empty",b.message=g,DIL.errorModule.handleError(b));this.tv=this.constructTrackVars(d);this.errorMessage=g}catch(e){this.handle(e,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var c=[],d,b,g,e;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){g=this.defaultTrackVars;e={};d=0;for(b=g.length;d<b;d++)e[g[d]]=
	!0;this.defaultTrackVarsObj=e}else e=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(b=a.length))for(d=0;d<b;d++)g=a[d],"string"===typeof g&&g.length&&g in e&&c.push(g);if(c.length)return c}return this.defaultTrackVars},constructGAObj:function(a){var c={};a=a instanceof Array?a:this.arr;var d,b,g,e;d=0;for(b=a.length;d<b;d++)g=a[d],g instanceof Array&&g.length&&(g=[],e=a[d],g instanceof Array&&e instanceof Array&&Array.prototype.push.apply(g,e),e=g.shift(),"string"===
	typeof e&&e.length&&(c[e]instanceof Array||(c[e]=[]),c[e].push(g)));return c},addToSignals:function(a,c){if("string"!==typeof a||""===a||null==c||""===c)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(c);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),c={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c){"string"===typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,
	e,g){this.addToSignals("c_itemOrderId",a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",e);this.addToSignals("c_itemQuantity",g)},_addTrans:function(a,b,c,d,e,g,h,k){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",e);this.addToSignals("c_transCity",g);this.addToSignals("c_transState",
	h);this.addToSignals("c_transCountry",k)},_trackSocial:function(a,b,c,d){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},d=this.tv,b,g,e,h,k,q;b=0;for(g=d.length;b<g;b++)if(e=d[b],a.hasOwnProperty(e)&&c.hasOwnProperty(e)&&(q=a[e],q instanceof Array))for(h=0,k=q.length;h<k;h++)c[e].apply(this,q[h])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();
	return this.hasSignals?(this.dil.api.signals(this.signals).submit(),"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,c,d){try{this.callback=this.dil=null,this.errorMessage=
	"",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,this.cookieName=this.v(c)?c:"aam_ga",this.delimiter=this.v(d)?d:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(b){this.handle(b,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var c,d,b,g,e,h;h=!1;var k=1;if(a===Object(a)&&(c=a.stuff)&&c instanceof Array&&(d=c.length))for(a=0;a<d;a++)if((b=
	c[a])&&b===Object(b)&&(g=b.cn,e=b.cv,g===this.cookieName&&this.v(e))){h=!0;break}if(h){c=e.split(this.delimiter);"undefined"===typeof window._gaq&&(window._gaq=[]);b=window._gaq;a=0;for(d=c.length;a<d&&!(h=c[a].split("="),e=h[0],h=h[1],this.v(e)&&this.v(h)&&b.push(["_setCustomVar",k++,e,h,1]),k>this.LIMIT);a++);this.errorMessage=1<k?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"===typeof this.callback)return this.callback()},
	submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;this.dil.api.afterResult(function(c){a.process(c)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(c){return this.handle(c,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
	DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,c,d){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=d===Object(d)?d:{};d={name:"DIL Peer39 Module Error"};var b=[],g="";this.isSecurePageButNotEnabled(document.location.protocol)&&(g="Module has not been enabled for a secure page",b.push(g),d.message=g,DIL.errorModule.handleError(d));c instanceof
	DIL?(this.dil=c,d.partner=this.dil.api.getPartner()):(g="dilInstance is not a valid instance of DIL",b.push(g),d.message=g,DIL.errorModule.handleError(d));"string"===typeof a&&a.length?this.aid=a:(g="aid is not a string or is empty",b.push(g),d.message=g,DIL.errorModule.handleError(d));this.errorMessage=b.join("\n")}catch(e){this.handle(e,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"===a&&!0!==this.optionals.enableHTTPS?
	!0:!1},constructSignals:function(){var a=this,c=this.constructScript(),d=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(c){}finally{a.calledBack=!0,"function"===typeof a.optionals.afterResult&&a.optionals.afterResult()}};d.parentNode.insertBefore(c,d);this.scriptsSent.push(c);return"Request sent to Peer39"},processData:function(a){var c,d,b,g,e={},h=
	!1;this.returnedData.push(a);if(a instanceof Array)for(c=0,d=a.length;c<d;c++)b=a[c].split("="),g=b[0],b=b[1],g&&isFinite(b)&&!isNaN(parseInt(b,10))&&(e[g]instanceof Array||(e[g]=[]),e[g].push(b),h=!0);return{hasSignals:h,signals:e}},constructScript:function(){var a=document.createElement("script"),c=this.optionals,d=c.scriptId,b=c.scriptSrc,c=c.scriptParams;a.id="string"===typeof d&&d.length?d:"peer39ScriptLoader";a.type="text/javascript";"string"===typeof b&&b.length?a.src=b:(a.src=(this.dil.constants.IS_HTTPS?
	"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"===typeof c&&c.length&&(a.src+="?"+c));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};
	
		/************** BEGIN - UPDATED AAM DIL CONFIG******************************************************/
	// Obtain URL params for ID sync, use case being user ID in EDM url to be picked up on site
	  function getParameterByName(name, url) {
	      if (!url) url = window.location.href;
	      name = name.replace(/[\[\]]/g, "\\$&");
	      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
	          results = regex.exec(url);
	      if (!results) return null;
	      if (!results[2]) return '';
	      return decodeURIComponent(results[2].replace(/\+/g, " "));
	  }


	  // Picks up cookie for declaring ID
	  function getCookie(cname) {
	      var name = cname + "=";
	      var ca = document.cookie.split(';');
	      for(var i=0; i<ca.length; i++) {
	          var c = ca[i];
	          while (c.charAt(0)==' ') c = c.substring(1);
	          if (c.indexOf(name) == 0) {
	              return c.substring(name.length, c.length);
	          }
	      }
	      return "";
	  }


	  var edm_samid = getParameterByName('samid') || "";   //picks up url query string param 'samid'
	  var jv_samid = (typeof samid == "string" && samid.length > 0) ? samid : "";                          //picks up var 'samid' set by client dev team above
	  var ck_samid = String(getCookie("samid")) || "";    //picks up cookie named 'samid'
	  var aam_samid = jv_samid || edm_samid || ck_samid ;



		//Create dil_Local_Account variable to be used for setting the AAM Partner//
	
		var samsungDil = DIL.create({
			partner: getdil_Local_Account(),
			visitorService: {
				namespace: AMCOrgID
				},
			uuidCookie:{
		     name:'aam_uuid',
		     days:30
			 }
		});
	

	// declares customer ID via CID method for cross device data source
		if (aam_samid !== "") {
    		    var c = decodeURIComponent('%01'),
		        cidObj = {
		        cid_ic : 'samsungid_gcrm' + c + aam_samid + c + '0'
		    };		    
		    samsungDil.api.signals(cidObj, 'd_');
		};

		//Data Collection Plugins

		//get the listed search engine name
		if (samsungDil)
		{
			var se = DIL.tools.getSearchReferrer();
			if (se && se.valid) {
				samsungDil.api.signals({
				c_se : se.name,
				c_st : se.keywords
				});
			}
		}
	
		//URL data collection
		function objIsEmpty(obj) { 
			for(var prop in obj) { 
				if(obj.hasOwnProperty(prop) && prop !== "") 
	                return false; 
				} 
	        return true; 
			}
			var uriData = DIL.tools.decomposeURI(document.URL);
			delete uriData.search;
			delete uriData.href;
			if(! objIsEmpty(uriData.uriParams)){ 
				samsungDil.api.signals(uriData.uriParams, 'c_');
			};
			delete uriData.uriParams;
			samsungDil.api.signals(uriData, 'c_');
		
	
		//Site Catalyst Plugin	
			var _scDilObj = s_gi(s_account);
		DIL.modules.siteCatalyst.init(_scDilObj, samsungDil, {
			names : ['pageName', 'channel', 'campaign', 'products', 'events', 'pe', 'referrer', 'server', 'purchaseID', 'zip', 'state'],
			iteratedNames : [{
					name : 'eVar',
					maxIndex : 75
				}, {
					name : 'prop',
					maxIndex : 75
				}, {
					name : 'pev',
					maxIndex : 3
				}, {
					name : 'hier',
					maxIndex : 4
				}
			]
		});


/************** END - UPDATED AAM DIL CONFIG******************************************************/
	}
	
	}catch (e) {
		printOmniLog("Error Occured in [UK DIL tagging]");
	}finally {
		printOmniLog("Final : [DIL Account Setting] code proccessed completely");
	}
};

if(getOmniSiteCd().indexOf('nl') == -1) {
	callDilCode();
	//printOmniLog("callDilCode() call");
} else if ((getOmniCookie("interestischecked") == "true") && (getOmniCookie("cookiesaccepted") == "true")) {
	//else if (($.cookies.get("interestischecked") == true) && ($.cookies.get("cookiesaccepted") == true)) {
	callDilCode();
	//printOmniLog("NL - callDilCode() call");
}

callPageView();




//2014.01.24 Dev version 1
//2014.01.28 Dev version 1.1(recallClickCode Dev)
//2014.02.03 Dev version 1.2(support PDP, B2B PDP, solution detail)
//2014.02.05 Dev version 1.3(f()isOmniInstore, getOmnishopId)
//2014.02.06 Dev version 1.31(according to the existence of s.products, control the setting of s.products)
//2014.02.20 Dev version 1.4(purchase function)
//2014.02.26 Dev version 1.41(correct the sendpageCode fucntion(try~catch))
//2014.03.10 Opr version 1.5(correction products call in sendpagecode + if pdp, always call the products)
//2014.03.11 Opr version 1.51(correction of instore site)
//2014.03.12 Opr version 1.52(correction of product detail=> do not call the event23)
//2014.03.12 Opr version 1.53(CheckPoint about a tag value, s.link Value)
//2014.03.14 Opr version 1.54
//	- change of eVar41
//	-addtion of prop8, eVar8
//	-setting of eVar38
//	-change of eVar90, s.eVar40
//	-REPLACE  toLowerCaser()
//	-addtion of linkFiter, accrording to topsection setting different products ex)business, support
//2014.03.18 Opr version 1.55
//	-eVar38 setting //확인해보기
//	-구분 삭제 s.products //해결
//	-prop8, eVar8 tracking
//	-business category!!!!!, support category valuable setting
//	-RSID correction
//2014.03.19 Opr version 1.56
//	-account setting
//	-addtion of debug code (getOmniInputTagValue)
//2014.03.25 Opr version 1.57
//	-구매 취소, 반품 함수 추가
//2014.03.25 Opr version 1.58
//	-sendPageCodeUrl() 수정
//	-비디오 수정
//2014.03.27 Opr version 1.59
//	-RSID
//	-pageName 치환
//	-store 관련 함수 추가
//2014.0411 Opr version 1.60
//	-sns login call block
//2014.0415 Opr Version 1.61
//	-sendStaticPageCode, Video tracking
//2014.0417 Opr Version 1.62
//	-PDP Wow Contents Tagging
//2014.0507 Opr Version 1.63
//	-business product detail event2
//2014.0522 Opr Version 1.7
//	-getOmniInputTag correction, s.prop41 no call correction, sendPageCodeUrl, finding_method correction
//2014.0527 Opr Version 2.0
//	-Error Fix
//2014.0710 Opr Version 2.1
//	-eStore function make & prop40 setting 
//2014.0711 Opr Version 2.2
//	-eStore function make (sendScApplyOpt)
//2014.0717 Opr Version 2.2
//	-sendScAdd : eVar41 추가
//2014.0725 Opr Version 2.3
// aboutsamsung추가 
//2014.0728 Opr Version 2.31  - offer/article 트래킹 수정
//2014.0729 Opr Version 2.32  - article landing트래킹 s.eVar38 setting
//2014.0801 Opr Version 2.33  - wishlist
//2014.0801 Opr Version 2.34  - japan Tracking
//2014-08-18 Opr Version 2.35 - UK DISCOVER Tracking
//2014-08-18 Opr Version 2.36 - s.prop7 locator correction
//2014-09-05 Opr Version 2.37 - Video Tracking plug-in correction
//2014-09-06 Opr Version 2.38 - galaxy note4, ifa2014 ++
//2014-09-18 Opr Version 2.39 - trackVar 추가 b2b_insights_related_download, b2b_solution_related
//2014-09-24 Opr Version 2.40 - B2B PV관련 수정
//2014-09-29 Opr Version 2.41 - B2B PV관련 수정(prodView)
//2014-11-04 Opr Version 2.42 - kenshoo Tracking code		 
//2014-12-11 Opr Version 3.0 - shop.samsung.com과 merging				  
//2014-12-11 Opr Version 3.1 - store checkout process update 
//2014-12-12 Opr Version 3.2 - tele sales process update 
//2014-12-23 Opr Version 3.3 - mySamsung sitecode logic update
//2015-01-02 Opr Version 3.31- mySamsung [ru] exception 
//2015-01-05 Opr Version 3.32- mySamsung [ru] exception (pagecodeurl)
//2015-01-05 Opr Version 3.4 - shop 용 s_code와 sync
//2015-01-05 Opr Version 3.5 qu->au 변경
//2015-01-08 Opr Version 3.6 BrightCove api correction 
//2015-01-12 Opr Version 3.7 sendScPaymentOrderSucc() 추가
//2015-01-15 Opr Version 3.8 SEC online store 관련 함수 추가
//2015-02-02 Opr Version 4.0 prop10 국가 추가 (ga0.ko)
//2015-02-25 Opr Version 4.1 resource, support category pageName 수정 
//2015-03-03 Opr Version 4.2 //news detail pageName 수정 
//2015-03-04 Opr Version 4.3 store checkout track value 추가
//2015-04-08 Opr Version 4.4 store tagging 수정
//2015-06-05 Opr Version 4.5 splitUrl 수정
//2015-06-09 Opr Version 4.6 b2b carousal global 반영 
//2015-06-17 Opr Version 4.7 SEBN eVar66 setting 
//2015-08-31 Opr Version 4.8 DIL 코드 작업  
//2015-09-01 Opr Version 4.9 IFA2015 ^^; dong_won...
//2015-09-03 Opr Version 5.0 SE SITE SCROLL ^^a dong_won...
//2015-09-25 Opr Version 5.1 microsite 처리 ,py/uy 처리 dong_won.lee
//2015-10-30 Opr Version 5.2 store 분기처리 (sendPageCodeStoreUk 함수 추가)
//2015-12-17 Opr Version 5.3 CES2016 지원
//2016-01-21 Opr Version 5.4 SEC B2B 지원
//2016-02-01 Opr Version 5.5 p14 변수 추가(PDP type)
//2016-02-11 Opr Version 5.6 v63 변수 추가 (visitor)
//2016-02-23 Opr Version 5.7 CN Store 지원
//2016-02-23 Opr Version 5.8 Call option 변경
//2016-02-29 Opr Version 5.9 UK Basket 함수 추가(sendScCheckoutView)
//2016-03-31 Opr Version 6.0 MCID 지원을 위한 s_code 엔진 업데이트
//2016-05-09 Opr Version 6.1 RU cui tracking
//2016-05-12 Opr Version 6.2 YouTube plugin 삭제
//2016-05-12 Opr Version 6.3 AM 코드 추가
//2016-06-02 Opr Version 6.4 NL 쿠키 적용
//2016-06-29 Opr Version 6.5 PLZ Target tracking (v69)
//2016-07-04 Opr Version 6.6 AM DIL code 추가 (ID)
//2016-07-07 Opr Version 6.7 screen resolution tracking (p12)
//2016-07-25 Opr Version 6.8 Shop Checkout Process 함수 추가 (sendScPreviewPaynowNew)
//2016-08-04 Opr Version 6.9 trackname변경(staticpage action tracking) 및 flagship pdp 변수 추가 (prodView, event2) 
//2016-08-16 Opr Version 7.0 EPP Shop tracking update(s_account 분기 처리)
//2016-08-29 Opr Version 7.1 브라우저 환경에 따른 Brightcove API 변경, 검색 Layer 자동완성어 태깅 trackVar 추가
//2016-08-30 Opr Version 7.2 AAM DIL CONFIG update
//2016-09-19 Opr Version 7.3 MCID code update
//2016-09-28 Opr Version 7.4 AM DIL code 추가 (TH/TR)
//2016-10-07 Opr Version 7.5 eVar54 추가
//2016-10-14 Opr Version 7.6 EPP NETWORKS s_account 분기 처리 로직 및 Currency Code 추가
//2016-10-18 Opr Version 7.7 BR Cookie 추가(prop10), track var 추가(compare_new, addto_compare)
//2016-10-20 Opr Version 7.8 Hybris 6.0 Store 사이트 추가(pagetracking)
//2016-10-25 Opr Version 7.9 s_lv cookie 유효기간 변경(13개월)
//2016-10-28 Opr Version 8.0 FR store 사이트 추가(pagetracking), uk-epp/networks prop10 트래킹 추가
//2016-11-10 Opr Version 8.1 Launching People tracking
//2016-11-11 Opr Version 8.2 shop - page not found tracking
//2016-11-16 Opr Version 8.3 microsite 콜 주석 처리 
//2016-11-21 Opr Version 8.4 gnb(it) 예외처리 적용
//2016-11-23 Opr Version 8.5 set WA.com RSID
//2016-11-25 Opr Version 8.6 Hybris 6.0 fn 추가 & nl 쿠키 로직 수정
//2016-11-30 Opr Version 8.7 MCID 사용 국가 eVar63 값 D=mid 처리
//2016-12-08 Opr Version 8.8 AM DIL code 추가 (levant)
//2016-12-26 Opr Version 8.9 Wa.com 지원 s.visitor 코드 추가
//2017-01-10 Opr Version 9.0 FR AMC 사용시 visitorID 트랙을 위한 s.cookieLifetime 추가
//2017-02-06 Opr Version 9.1 my-samsung rsid 지원
//2017-02-06 Opr Verison 9.2 Clicktale 지원(de)
//2017-02-21 Opr Version 9.3 SE/DK/NO/FI Shop 지원 (sendPageCodeStoreHy)
//2017-03-14 Opr Version 9.4 Shop Pagetracking 수정 (callPageView)
//2017-03-27 Opr Version 9.5 P4 잔존 페이지 tracking위한 Phase Type 변수 추가(prop75)
//2017-03-28 Opr Version 9.6 al, mm, lb 사이트 확산 (getOmniCurrencyCd, B2B Carousal(al,lb) 분기 처리 추가)
//2017-04-19 Opr Version 9.7 JP 지원 (galaxymobile.jp)
//2017-05-04 Opr Version 9.8 JP 지원 위한 search_click TrackVar 추가 
//2017-05-10 Opr Version 9.9 검색 개선 위한 변수 수정 (locator_noresult, spt_search_fail, service_locator_fail)
//2017-06-05 Opr Version 10.0 AAM(DIL) code adding for LB 
//2017-06-13 Opr Version 10.1 AAM(DIL) code adding for ES
//2017-06-13 Opr Version 10.2 AAM(DIL) code adding for BR
//2017-06-26 Opr Version 10.3 Latin Shop , sendScPurchaseSucc에 oGroup 추가, GCRM 변수 추가