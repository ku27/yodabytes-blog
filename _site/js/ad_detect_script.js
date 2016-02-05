



angular.module('devHarness', [])
    .value('config', {
        adHostList: {
            "showads.pubmatic.com": true,
            "aktrack.pubmatic.com": true
        }
        

    })
    .controller('controller', ['$scope','$location', 'config', function($scope, $location, config) {
        
        function buildAdList(){
            angular.forEach(iframeList, function(each){

                var parser = document.createElement('a');
                parser.href = each.src;

                if (config.adHostList[parser.host]){
                    var attributeList = parser.search.split("&");
                    
                    var adId;
                    var attributeObject = {};

                    angular.forEach(attributeList, function(eachAttr){
                        var key = eachAttr.split("=")[0];
                        var value = eachAttr.split("=")[1];
                        attributeObject[key] = value;

                    });

                    if (attributeObject["pubId"]){
                        requestObject.pubId = attributeObject["pubId"];

                    }
                        
                    if (attributeObject["adId"]){
                        var adObject = {};
                        adObject["adId"] = attributeObject["adId"]

                        if (attributeObject["kaxefact"]){
                            adObject.ecpm = attributeObject["kaxefact"];
                        }

                        if (attributeObject["kadwidth"] && attributeObject["kadheight"] ){
                            adObject.adSize = attributeObject["kadwidth"] + " x "+ attributeObject["kadheight"];
                        }

                        if (attributeObject["siteId"]){
                            adObject.siteId = attributeObject["siteId"];
                        }

                        requestObject.adList.push(adObject);

                    }
                    
                }

            });
        }

        function getBrowserName(){
            var isIE;
            if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0){
                return "opera";
            }
            else if (typeof InstallTrigger !== 'undefined') {
                return"firefox";
            }
            else if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0){
                return "safari";
            }
            else if (/*@cc_on!@*/false || !!document.documentMode){
                isIE = true;
                return "ie";
            }
            else if (!isIE && !!window.StyleMedia){
                return "edge";
            }
            else if (!!window.chrome && !!window.chrome.webstore){
                return "chrome";
            }
            else if ((isChrome || isOpera) && !!window.CSS){
                return "blink";
            }
            else {
                return "";
            }
        }

        function buildMainValue(){
            var parser = document.createElement('a');
            parser.href = window.location.href;
            requestObject.pageURL = parser.href;
            requestObject.ip = parser.host;
            
            requestObject.timestamp = new Date().getTime();


            var userLang = navigator.language || navigator.userLanguage; 
            requestObject.language = userLang;
            requestObject.browserName = getBrowserName();
            requestObject.adBlockFlag = 0;

        }


        var iframeList = document.querySelectorAll("iframe");
        var requestObject = {};
        requestObject.adList = [];


        buildAdList();
        buildMainValue();

  
        console.log(requestObject);


    }]);


