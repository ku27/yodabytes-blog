



angular.module('detectAd', [])
    .value('config', {
        adHostList: {
            "showads.pubmatic.com": true,
            "aktrack.pubmatic.com": true
        },

        defaultPubId: 37880,
        defaultSiteId: 37881
        

    })
    .controller('mainCtrl', ['$scope','$location', 'config', '$http', function($scope, $location, config, $http) {
        
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
                        requestObject.pubId = parseInt(attributeObject["pubId"]);

                    }
                        
                    if (attributeObject["adId"]){
                        var adObject = {};
                        adObject["adId"] = parseInt(attributeObject["adId"]);

                        if (attributeObject["kaxefact"]){
                            adObject.ecpm = parseFloat(attributeObject["kaxefact"]);
                        }

                        if (attributeObject["kadwidth"] && attributeObject["kadheight"] ){
                            adObject.adSize = attributeObject["kadwidth"] + " x "+ attributeObject["kadheight"];
                        }

                        if (attributeObject["siteId"]){
                            siteIdList.push(parseInt(attributeObject["siteId"]));


                            // adObject.siteId = attributeObject["siteId"];
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
        }

        function callApi(requestObject){
            var api = "http://10.0.3.222/Logger/AdServerLogger?operId";
            $http.post(api,{ data:requestObject
                
            })

            .then(function (res) {
                console.log(res);
            }, function () {
                console.log("fail");
            });
             
        }



        var iframeList = document.querySelectorAll("iframe");
        var requestObject = {};
        var siteIdList = [];
        requestObject.adList = [];


        buildAdList();
        buildMainValue();

  
        requestObject.adBlockFlag = (requestObject.adList.length === 0 )? 1 :0;


        if (siteIdList.length !== 0){
            requestObject.siteId = siteIdList[Math.floor(Math.random() * siteIdList.length)];
        }
        else {
            requestObject.siteId = config.defaultSiteId;
        }


        if (!requestObject.pubId || angular.isUndefined(requestObject.pubId)) {
            requestObject.pubId = config.defaultPubId;
        }






        console.log(requestObject);

        callApi(requestObject);

    }]);


