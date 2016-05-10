(function(e){e.widget("thomaskahn.smoothDivScroll",{options:{scrollingHotSpotLeftClass:"scrollingHotSpotLeft",scrollingHotSpotRightClass:"scrollingHotSpotRight",scrollingHotSpotLeftVisibleClass:"scrollingHotSpotLeftVisible",scrollingHotSpotRightVisibleClass:"scrollingHotSpotRightVisible",scrollableAreaClass:"scrollableArea",scrollWrapperClass:"scrollWrapper",hiddenOnStart:false,getContentOnLoad:{},countOnlyClass:"",startAtElementId:"",hotSpotScrolling:true,hotSpotScrollingStep:1500,hotSpotScrollingInterval:10,hotSpotMouseDownSpeedBooster:3,visibleHotSpotBackgrounds:"hover",hotSpotsVisibleTime:5e3,easingAfterHotSpotScrolling:true,easingAfterHotSpotScrollingDistance:10,easingAfterHotSpotScrollingDuration:300,easingAfterHotSpotScrollingFunction:"easeOutQuart",mousewheelScrolling:"",mousewheelScrollingStep:70,easingAfterMouseWheelScrolling:true,easingAfterMouseWheelScrollingDuration:300,easingAfterMouseWheelScrollingFunction:"easeOutQuart",manualContinuousScrolling:false,autoScrollingMode:"",autoScrollingDirection:"endlessLoopRight",autoScrollingStep:1,autoScrollingInterval:10,touchScrolling:false,scrollToAnimationDuration:1e3,scrollToEasingFunction:"easeOutQuart"},_create:function(){var t=this,n=this.options,r=this.element;if(!r.data){return false}r.data("scrollWrapper",r.find("."+n.scrollWrapperClass));r.data("scrollingHotSpotRight",r.find("."+n.scrollingHotSpotRightClass));r.data("scrollingHotSpotLeft",r.find("."+n.scrollingHotSpotLeftClass));r.data("scrollableArea",r.find("."+n.scrollableAreaClass));if(r.data("scrollingHotSpotRight").length>0){r.data("scrollingHotSpotRight").detach()}if(r.data("scrollingHotSpotLeft").length>0){r.data("scrollingHotSpotLeft").detach()}if(r.data("scrollableArea").length===0&&r.data("scrollWrapper").length===0){r.wrapInner("<div class='"+n.scrollableAreaClass+"'>").wrapInner("<div class='"+n.scrollWrapperClass+"'>");r.data("scrollWrapper",r.find("."+n.scrollWrapperClass));r.data("scrollableArea",r.find("."+n.scrollableAreaClass))}else if(r.data("scrollWrapper").length===0){r.wrapInner("<div class='"+n.scrollWrapperClass+"'>");r.data("scrollWrapper",r.find("."+n.scrollWrapperClass))}else if(r.data("scrollableArea").length===0){r.data("scrollWrapper").wrapInner("<div class='"+n.scrollableAreaClass+"'>");r.data("scrollableArea",r.find("."+n.scrollableAreaClass))}if(r.data("scrollingHotSpotRight").length===0){r.prepend("<div class='"+n.scrollingHotSpotRightClass+"'></div>");r.data("scrollingHotSpotRight",r.find("."+n.scrollingHotSpotRightClass))}else{r.prepend(r.data("scrollingHotSpotRight"))}if(r.data("scrollingHotSpotLeft").length===0){r.prepend("<div class='"+n.scrollingHotSpotLeftClass+"'></div>");r.data("scrollingHotSpotLeft",r.find("."+n.scrollingHotSpotLeftClass))}else{r.prepend(r.data("scrollingHotSpotLeft"))}r.data("speedBooster",1);r.data("scrollXPos",0);r.data("hotSpotWidth","300");r.data("scrollableAreaWidth",0);r.data("startingPosition",0);r.data("rightScrollingInterval",null);r.data("leftScrollingInterval",null);r.data("autoScrollingInterval",null);r.data("hideHotSpotBackgroundsInterval",null);r.data("previousScrollLeft",0);r.data("pingPongDirection","right");r.data("getNextElementWidth",true);r.data("swapAt",null);r.data("startAtElementHasNotPassed",true);r.data("swappedElement",null);r.data("originalElements",r.data("scrollableArea").children(n.countOnlyClass));r.data("visible",true);r.data("enabled",true);r.data("scrollableAreaHeight",r.data("scrollableArea").height());r.data("scrollerOffset",r.offset());if(n.touchScrolling&&r.data("enabled")){r.data("scrollWrapper").kinetic({y:false,moved:function(e){if(n.manualContinuousScrolling){if(r.data("scrollWrapper").scrollLeft()<=0){t._checkContinuousSwapLeft()}else{t._checkContinuousSwapRight()}}t._trigger("touchMoved")},stopped:function(e){r.data("scrollWrapper").stop(true,false);t.stopAutoScrolling();t._trigger("touchStopped")}})}r.data("scrollingHotSpotRight").bind("mousemove",function(e){if(n.hotSpotScrolling){var t=1;r.data("scrollXPos",Math.round(t/r.data("hotSpotWidth")*n.hotSpotScrollingStep));if(r.data("scrollXPos")===Infinity||r.data("scrollXPos")<1){r.data("scrollXPos",1)}}});r.data("scrollingHotSpotRight").bind("mouseover",function(){if(n.hotSpotScrolling){r.data("scrollWrapper").stop(true,false);t.stopAutoScrolling();r.data("rightScrollingInterval",setInterval(function(){if(r.data("scrollXPos")>0&&r.data("enabled")){r.data("scrollWrapper").scrollLeft(r.data("scrollWrapper").scrollLeft()+r.data("scrollXPos")*r.data("speedBooster"));if(n.manualContinuousScrolling){t._checkContinuousSwapRight()}t._showHideHotSpots()}},n.hotSpotScrollingInterval));t._trigger("mouseOverRightHotSpot")}});r.data("scrollingHotSpotRight").bind("mouseout",function(){if(n.hotSpotScrolling){clearInterval(r.data("rightScrollingInterval"));r.data("scrollXPos",0);if(n.easingAfterHotSpotScrolling&&r.data("enabled")){r.data("scrollWrapper").animate({scrollLeft:r.data("scrollWrapper").scrollLeft()+n.easingAfterHotSpotScrollingDistance},{duration:n.easingAfterHotSpotScrollingDuration,easing:n.easingAfterHotSpotScrollingFunction})}}});r.data("scrollingHotSpotRight").bind("mousedown",function(){r.data("speedBooster",n.hotSpotMouseDownSpeedBooster)});e("body").bind("mouseup",function(){r.data("speedBooster",1)});r.data("scrollingHotSpotLeft").bind("mousemove",function(e){if(n.hotSpotScrolling){var t=1;r.data("scrollXPos",Math.round(t/r.data("hotSpotWidth")*n.hotSpotScrollingStep));if(r.data("scrollXPos")===Infinity||r.data("scrollXPos")<1){r.data("scrollXPos",1)}}});r.data("scrollingHotSpotLeft").bind("mouseover",function(){if(n.hotSpotScrolling){r.data("scrollWrapper").stop(true,false);t.stopAutoScrolling();r.data("leftScrollingInterval",setInterval(function(){if(r.data("scrollXPos")>0&&r.data("enabled")){r.data("scrollWrapper").scrollLeft(r.data("scrollWrapper").scrollLeft()-r.data("scrollXPos")*r.data("speedBooster"));if(n.manualContinuousScrolling){t._checkContinuousSwapLeft()}t._showHideHotSpots()}},n.hotSpotScrollingInterval));t._trigger("mouseOverLeftHotSpot")}});r.data("scrollingHotSpotLeft").bind("mouseout",function(){if(n.hotSpotScrolling){clearInterval(r.data("leftScrollingInterval"));r.data("scrollXPos",0);if(n.easingAfterHotSpotScrolling&&r.data("enabled")){r.data("scrollWrapper").animate({scrollLeft:r.data("scrollWrapper").scrollLeft()-n.easingAfterHotSpotScrollingDistance},{duration:n.easingAfterHotSpotScrollingDuration,easing:n.easingAfterHotSpotScrollingFunction})}}});r.data("scrollingHotSpotLeft").bind("mousedown",function(){r.data("speedBooster",n.hotSpotMouseDownSpeedBooster)});r.data("scrollableArea").mousewheel(function(e,i,s,u){if(r.data("enabled")&&n.mousewheelScrolling.length>0){var a;if(n.mousewheelScrolling==="vertical"&&u!==0){t.stopAutoScrolling();e.preventDefault();a=Math.round(n.mousewheelScrollingStep*u*-1);t.move(a)}else if(n.mousewheelScrolling==="horizontal"&&s!==0){t.stopAutoScrolling();e.preventDefault();a=Math.round(n.mousewheelScrollingStep*s*-1);t.move(a)}else if(n.mousewheelScrolling==="allDirections"){t.stopAutoScrolling();e.preventDefault();a=Math.round(n.mousewheelScrollingStep*i*-1);t.move(a)}}});if(n.mousewheelScrolling){r.data("scrollingHotSpotLeft").add(r.data("scrollingHotSpotRight")).mousewheel(function(e){e.preventDefault()})}e(window).bind("resize",function(){t._showHideHotSpots();t._trigger("windowResized")});if(!jQuery.isEmptyObject(n.getContentOnLoad)){t[n.getContentOnLoad.method](n.getContentOnLoad.content,n.getContentOnLoad.manipulationMethod,n.getContentOnLoad.addWhere,n.getContentOnLoad.filterTag)}if(n.hiddenOnStart){t.hide()}e(window).load(function(){if(!n.hiddenOnStart){t.recalculateScrollableArea()}if(n.autoScrollingMode.length>0&&!n.hiddenOnStart){t.startAutoScrolling()}if(n.autoScrollingMode!=="always"){switch(n.visibleHotSpotBackgrounds){case"always":t.showHotSpotBackgrounds();break;case"onStart":t.showHotSpotBackgrounds();r.data("hideHotSpotBackgroundsInterval",setTimeout(function(){t.hideHotSpotBackgrounds(250)},n.hotSpotsVisibleTime));break;case"hover":r.mouseenter(function(e){if(n.hotSpotScrolling){e.stopPropagation();t.showHotSpotBackgrounds(250)}}).mouseleave(function(e){if(n.hotSpotScrolling){e.stopPropagation();t.hideHotSpotBackgrounds(250)}});break;default:break}}t._showHideHotSpots();t._trigger("setupComplete")})},_init:function(){var e=this,t=this.element;e.recalculateScrollableArea();e._showHideHotSpots();e._trigger("initializationComplete")},_setOption:function(e,t){var n=this,r=this.options,i=this.element;r[e]=t;if(e==="hotSpotScrolling"){if(t===true){n._showHideHotSpots()}else{if(!i.data){return false}i.data("scrollingHotSpotLeft").hide();i.data("scrollingHotSpotRight").hide()}}else if(e==="autoScrollingStep"||e==="easingAfterHotSpotScrollingDistance"||e==="easingAfterHotSpotScrollingDuration"||e==="easingAfterMouseWheelScrollingDuration"){r[e]=parseInt(t,10)}else if(e==="autoScrollingInterval"){r[e]=parseInt(t,10);n.startAutoScrolling()}},showHotSpotBackgrounds:function(e){var t=this,n=this.element,r=this.options;if(e!==undefined){n.data("scrollingHotSpotLeft").addClass(r.scrollingHotSpotLeftVisibleClass);n.data("scrollingHotSpotRight").addClass(r.scrollingHotSpotRightVisibleClass);n.data("scrollingHotSpotLeft").add(n.data("scrollingHotSpotRight")).fadeTo(e,.35)}else{n.data("scrollingHotSpotLeft").addClass(r.scrollingHotSpotLeftVisibleClass);n.data("scrollingHotSpotLeft").removeAttr("style");n.data("scrollingHotSpotRight").addClass(r.scrollingHotSpotRightVisibleClass);n.data("scrollingHotSpotRight").removeAttr("style")}t._showHideHotSpots()},hideHotSpotBackgrounds:function(e){var t=this.element,n=this.options;if(e!==undefined){t.data("scrollingHotSpotLeft").fadeTo(e,0,function(){t.data("scrollingHotSpotLeft").removeClass(n.scrollingHotSpotLeftVisibleClass)});t.data("scrollingHotSpotRight").fadeTo(e,0,function(){t.data("scrollingHotSpotRight").removeClass(n.scrollingHotSpotRightVisibleClass)})}else{t.data("scrollingHotSpotLeft").removeClass(n.scrollingHotSpotLeftVisibleClass).removeAttr("style");t.data("scrollingHotSpotRight").removeClass(n.scrollingHotSpotRightVisibleClass).removeAttr("style")}},_showHideHotSpots:function(){var e=this,t=this.element,n=this.options;if(!t.data){return false}if(!n.hotSpotScrolling){t.data("scrollingHotSpotLeft").hide();t.data("scrollingHotSpotRight").hide()}else{if(n.hotSpotScrolling&&n.autoScrollingMode!=="always"&&t.data("autoScrollingInterval")!==null){if(t.data("scrollingHotSpotLeft")){t.data("scrollingHotSpotLeft").show()}if(t.data("scrollingHotSpotRight")){t.data("scrollingHotSpotRight").show()}}else if(n.autoScrollingMode!=="always"&&n.hotSpotScrolling){if(t.data("scrollableAreaWidth")<=t.data("scrollWrapper").innerWidth()){t.data("scrollingHotSpotLeft").hide();t.data("scrollingHotSpotRight").hide()}else if(t.data("scrollWrapper").scrollLeft()===0){t.data("scrollingHotSpotLeft").hide();t.data("scrollingHotSpotRight").show();e._trigger("scrollerLeftLimitReached");clearInterval(t.data("leftScrollingInterval"));t.data("leftScrollingInterval",null)}else if(t.data("scrollableAreaWidth")<=t.data("scrollWrapper").innerWidth()+t.data("scrollWrapper").scrollLeft()){t.data("scrollingHotSpotLeft").show();t.data("scrollingHotSpotRight").hide();e._trigger("scrollerRightLimitReached");clearInterval(t.data("rightScrollingInterval"));t.data("rightScrollingInterval",null)}else{t.data("scrollingHotSpotLeft").show();t.data("scrollingHotSpotRight").show()}}else{t.data("scrollingHotSpotLeft").hide();t.data("scrollingHotSpotRight").hide()}}},_setElementScrollPosition:function(t,n){var r=this.element,i=this.options,s=0;switch(t){case"first":r.data("scrollXPos",0);return true;case"start":if(i.startAtElementId!==""){if(r.data("scrollableArea").has("#"+i.startAtElementId)){s=e("#"+i.startAtElementId).position().left;r.data("scrollXPos",s);return true}}return false;case"last":r.data("scrollXPos",r.data("scrollableAreaWidth")-r.data("scrollWrapper").innerWidth());return true;case"number":if(!isNaN(n)){s=r.data("scrollableArea").children(i.countOnlyClass).eq(n-1).position().left;r.data("scrollXPos",s);return true}return false;case"id":if(n.length>0){if(r.data("scrollableArea").has("#"+n)){s=e("#"+n).position().left;r.data("scrollXPos",s);return true}}return false;default:return false}},jumpToElement:function(e,t){var n=this,r=this.element;if(r.data("enabled")){if(n._setElementScrollPosition(e,t)){r.data("scrollWrapper").scrollLeft(r.data("scrollXPos"));n._showHideHotSpots();switch(e){case"first":n._trigger("jumpedToFirstElement");break;case"start":n._trigger("jumpedToStartElement");break;case"last":n._trigger("jumpedToLastElement");break;case"number":n._trigger("jumpedToElementNumber",null,{elementNumber:t});break;case"id":n._trigger("jumpedToElementId",null,{elementId:t});break;default:break}}}},scrollToElement:function(e,t){var n=this,r=this.element,i=this.options,s=false;if(r.data("enabled")){if(n._setElementScrollPosition(e,t)){if(r.data("autoScrollingInterval")!==null){n.stopAutoScrolling();s=true}r.data("scrollWrapper").stop(true,false);r.data("scrollWrapper").animate({scrollLeft:r.data("scrollXPos")},{duration:i.scrollToAnimationDuration,easing:i.scrollToEasingFunction,complete:function(){if(s){n.startAutoScrolling()}n._showHideHotSpots();switch(e){case"first":n._trigger("scrolledToFirstElement");break;case"start":n._trigger("scrolledToStartElement");break;case"last":n._trigger("scrolledToLastElement");break;case"number":n._trigger("scrolledToElementNumber",null,{elementNumber:t});break;case"id":n._trigger("scrolledToElementId",null,{elementId:t});break;default:break}}})}}},move:function(e){var t=this,n=this.element,r=this.options;n.data("scrollWrapper").stop(true,true);if(e<0&&n.data("scrollWrapper").scrollLeft()>0||e>0&&n.data("scrollableAreaWidth")>n.data("scrollWrapper").innerWidth()+n.data("scrollWrapper").scrollLeft()||r.manualContinuousScrolling){var i=n.data("scrollableArea").width()-n.data("scrollWrapper").width();var s=n.data("scrollWrapper").scrollLeft()+e;if(s<0){var o=function(){n.data("swappedElement",n.data("scrollableArea").children(":last").detach());n.data("scrollableArea").prepend(n.data("swappedElement"));n.data("scrollWrapper").scrollLeft(n.data("scrollWrapper").scrollLeft()+n.data("swappedElement").outerWidth(true))};while(s<0){o();s=n.data("scrollableArea").children(":first").outerWidth(true)+s}}else if(s-i>0){var u=function(){n.data("swappedElement",n.data("scrollableArea").children(":first").detach());n.data("scrollableArea").append(n.data("swappedElement"));var e=n.data("scrollWrapper").scrollLeft();n.data("scrollWrapper").scrollLeft(e-n.data("swappedElement").outerWidth(true))};while(s-i>0){u();s=s-n.data("scrollableArea").children(":last").outerWidth(true)}}if(r.easingAfterMouseWheelScrolling){n.data("scrollWrapper").animate({scrollLeft:n.data("scrollWrapper").scrollLeft()+e},{duration:r.easingAfterMouseWheelScrollingDuration,easing:r.easingAfterMouseWheelFunction,complete:function(){t._showHideHotSpots();if(r.manualContinuousScrolling){if(e>0){t._checkContinuousSwapRight()}else{t._checkContinuousSwapLeft()}}}})}else{n.data("scrollWrapper").scrollLeft(n.data("scrollWrapper").scrollLeft()+e);t._showHideHotSpots();if(r.manualContinuousScrolling){if(e>0){t._checkContinuousSwapRight()}else{t._checkContinuousSwapLeft()}}}}},getFlickrContent:function(t,n){var r=this,i=this.element;e.getJSON(t,function(t){function c(t,a){var p=t.media.m;var d=p.replace("_m",s[a].letter);var v=e("<img />").attr("src",d);v.load(function(){if(this.height<i.data("scrollableAreaHeight")){if(a+1<s.length){c(t,a+1)}else{h(this)}}else{h(this)}if(l===f){switch(n){case"addFirst":i.data("scrollableArea").children(":first").before(o);break;case"addLast":i.data("scrollableArea").children(":last").after(o);break;default:i.data("scrollableArea").html(o);break}r.recalculateScrollableArea();r._showHideHotSpots();r._trigger("addedFlickrContent",null,{addedElementIds:u})}})}function h(t){var n=i.data("scrollableAreaHeight")/t.height;var r=Math.round(t.width*n);var s=e(t).attr("src").split("/");var a=s.length-1;s=s[a].split(".");e(t).attr("id",s[0]);e(t).css({height:i.data("scrollableAreaHeight"),width:r});u.push(s[0]);o.push(t);l++}var s=[{size:"small square",pixels:75,letter:"_s"},{size:"thumbnail",pixels:100,letter:"_t"},{size:"small",pixels:240,letter:"_m"},{size:"medium",pixels:500,letter:""},{size:"medium 640",pixels:640,letter:"_z"},{size:"large",pixels:1024,letter:"_b"}];var o=[];var u=[];var a;var f=t.items.length;var l=0;if(i.data("scrollableAreaHeight")<=75){a=0}else if(i.data("scrollableAreaHeight")<=100){a=1}else if(i.data("scrollableAreaHeight")<=240){a=2}else if(i.data("scrollableAreaHeight")<=500){a=3}else if(i.data("scrollableAreaHeight")<=640){a=4}else{a=5}e.each(t.items,function(e,t){c(t,a)})})},getAjaxContent:function(t,n,r){var i=this,s=this.element;e.ajaxSetup({cache:false});e.get(t,function(o){var u;if(r!==undefined){if(r.length>0){u=e("<div>").html(o).find(r)}else{u=t}}else{u=o}switch(n){case"addFirst":s.data("scrollableArea").children(":first").before(u);break;case"addLast":s.data("scrollableArea").children(":last").after(u);break;default:s.data("scrollableArea").html(u);break}i.recalculateScrollableArea();i._showHideHotSpots();i._trigger("addedAjaxContent")})},getHtmlContent:function(t,n,r){var i=this,s=this.element;var o;if(r!==undefined){if(r.length>0){o=e("<div>").html(t).find(r)}else{o=t}}else{o=t}switch(n){case"addFirst":s.data("scrollableArea").children(":first").before(o);break;case"addLast":s.data("scrollableArea").children(":last").after(o);break;default:s.data("scrollableArea").html(o);break}i.recalculateScrollableArea();i._showHideHotSpots();i._trigger("addedHtmlContent")},recalculateScrollableArea:function(){var t=0,n=false,r=this.options,i=this.element;i.data("scrollableArea").children(r.countOnlyClass).each(function(){if(r.startAtElementId.length>0&&e(this).attr("id")===r.startAtElementId){i.data("startingPosition",t);n=true}t=t+e(this).outerWidth(true)});if(!n){i.data("startAtElementId","")}i.data("scrollableAreaWidth",t);i.data("scrollableArea").width(i.data("scrollableAreaWidth"));i.data("scrollWrapper").scrollLeft(i.data("startingPosition"));i.data("scrollXPos",i.data("startingPosition"))},getScrollerOffset:function(){var e=this.element;return e.data("scrollWrapper").scrollLeft()},stopAutoScrolling:function(){var e=this,t=this.element;if(t.data("autoScrollingInterval")!==null){clearInterval(t.data("autoScrollingInterval"));t.data("autoScrollingInterval",null);e._showHideHotSpots();e._trigger("autoScrollingStopped")}},startAutoScrolling:function(){var e=this,t=this.element,n=this.options;if(t.data("enabled")){e._showHideHotSpots();clearInterval(t.data("autoScrollingInterval"));t.data("autoScrollingInterval",null);e._trigger("autoScrollingStarted");t.data("autoScrollingInterval",setInterval(function(){if(!t.data("visible")||t.data("scrollableAreaWidth")<=t.data("scrollWrapper").innerWidth()){clearInterval(t.data("autoScrollingInterval"));t.data("autoScrollingInterval",null)}else{t.data("previousScrollLeft",t.data("scrollWrapper").scrollLeft());switch(n.autoScrollingDirection){case"right":t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft()+n.autoScrollingStep);if(t.data("previousScrollLeft")===t.data("scrollWrapper").scrollLeft()){e._trigger("autoScrollingRightLimitReached");e.stopAutoScrolling()}break;case"left":t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft()-n.autoScrollingStep);if(t.data("previousScrollLeft")===t.data("scrollWrapper").scrollLeft()){e._trigger("autoScrollingLeftLimitReached");e.stopAutoScrolling()}break;case"backAndForth":if(t.data("pingPongDirection")==="right"){t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft()+n.autoScrollingStep)}else{t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft()-n.autoScrollingStep)}if(t.data("previousScrollLeft")===t.data("scrollWrapper").scrollLeft()){if(t.data("pingPongDirection")==="right"){t.data("pingPongDirection","left");e._trigger("autoScrollingRightLimitReached")}else{t.data("pingPongDirection","right");e._trigger("autoScrollingLeftLimitReached")}}break;case"endlessLoopRight":t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft()+n.autoScrollingStep);e._checkContinuousSwapRight();break;case"endlessLoopLeft":t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft()-n.autoScrollingStep);e._checkContinuousSwapLeft();break;default:break}}},n.autoScrollingInterval))}},_checkContinuousSwapRight:function(){var t=this.element,n=this.options;if(t.data("getNextElementWidth")){if(n.startAtElementId.length>0&&t.data("startAtElementHasNotPassed")){t.data("swapAt",e("#"+n.startAtElementId).outerWidth(true));t.data("startAtElementHasNotPassed",false)}else{t.data("swapAt",t.data("scrollableArea").children(":first").outerWidth(true))}t.data("getNextElementWidth",false)}if(t.data("swapAt")<=t.data("scrollWrapper").scrollLeft()){t.data("swappedElement",t.data("scrollableArea").children(":first").detach());t.data("scrollableArea").append(t.data("swappedElement"));var r=t.data("scrollWrapper").scrollLeft();t.data("scrollWrapper").scrollLeft(r-t.data("swappedElement").outerWidth(true));t.data("getNextElementWidth",true)}},_checkContinuousSwapLeft:function(){var t=this.element,n=this.options;if(t.data("getNextElementWidth")){if(n.startAtElementId.length>0&&t.data("startAtElementHasNotPassed")){t.data("swapAt",e("#"+n.startAtElementId).outerWidth(true));t.data("startAtElementHasNotPassed",false)}else{t.data("swapAt",t.data("scrollableArea").children(":first").outerWidth(true))}t.data("getNextElementWidth",false)}if(t.data("scrollWrapper").scrollLeft()===0){t.data("swappedElement",t.data("scrollableArea").children(":last").detach());t.data("scrollableArea").prepend(t.data("swappedElement"));t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft()+t.data("swappedElement").outerWidth(true));t.data("getNextElementWidth",true)}},restoreOriginalElements:function(){var e=this,t=this.element;t.data("scrollableArea").html(t.data("originalElements"));e.recalculateScrollableArea();e.jumpToElement("first")},show:function(){var e=this.element;e.data("visible",true);e.show()},hide:function(){var e=this.element;e.data("visible",false);e.hide()},enable:function(){var e=this.element;if(this.options.touchScrolling){e.data("scrollWrapper").kinetic("attach")}e.data("enabled",true)},disable:function(){var e=this,t=this.element;e.stopAutoScrolling();clearInterval(t.data("rightScrollingInterval"));clearInterval(t.data("leftScrollingInterval"));clearInterval(t.data("hideHotSpotBackgroundsInterval"));if(this.options.touchScrolling){t.data("scrollWrapper").kinetic("detach")}t.data("enabled",false)},destroy:function(){var t=this,n=this.element;t.stopAutoScrolling();clearInterval(n.data("rightScrollingInterval"));clearInterval(n.data("leftScrollingInterval"));clearInterval(n.data("hideHotSpotBackgroundsInterval"));n.data("scrollingHotSpotRight").unbind("mouseover");n.data("scrollingHotSpotRight").unbind("mouseout");n.data("scrollingHotSpotRight").unbind("mousedown");n.data("scrollingHotSpotLeft").unbind("mouseover");n.data("scrollingHotSpotLeft").unbind("mouseout");n.data("scrollingHotSpotLeft").unbind("mousedown");n.unbind("mousenter");n.unbind("mouseleave");n.data("scrollingHotSpotRight").remove();n.data("scrollingHotSpotLeft").remove();n.data("scrollableArea").remove();n.data("scrollWrapper").remove();n.html(n.data("originalElements"));e.Widget.prototype.destroy.apply(this,arguments)}})})(jQuery);
