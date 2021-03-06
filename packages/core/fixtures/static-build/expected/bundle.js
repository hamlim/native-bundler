(function(modules){
  function require(id) {
    const [fn, mapping] = modules[id];
    function localRequire(name) {
      return require(mapping[name])
    }
    const module = { exports: {} }
    fn(localRequire, module, module.exports);
  
    return module.exports;
  }
  require(0);
  })({0: [
  function(require, module, exports) {
    "use strict";
  
  var _reactProductionMin = _interopRequireDefault(require("fixtures/static-build/actual/_vendor_/react.production.min.js"));
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  console.log(_reactProductionMin.default.version);
  },
  {"fixtures/static-build/actual/_vendor_/react.production.min.js":1}
  ],1: [
  function(require, module, exports) {
    /** @license React v16.5.1
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  'use strict';(function(F,l){"object"===typeof exports&&"undefined"!==typeof module?module.exports=l():"function"===typeof define&&define.amd?define(l):F.React=l()})(this,function(){function F(a,b,c,d,e,m,f,g){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var ia=[c,d,e,m,f,g],h=0;a=Error(b.replace(/%s/g,function(){return ia[h++]}));a.name="Invariant Violation"}a.framesToPop=
  1;throw a;}}function l(a){for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++)c+="&args[]="+encodeURIComponent(arguments[d+1]);F(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c)}function p(a,b,c){this.props=a;this.context=b;this.refs=P;this.updater=c||Q}function R(){}function G(a,b,c){this.props=a;this.context=b;this.refs=P;this.updater=c||Q}
  function S(a,b,c){var d=void 0,e={},m=null,f=null;if(null!=b)for(d in void 0!==b.ref&&(f=b.ref),void 0!==b.key&&(m=""+b.key),b)T.call(b,d)&&!U.hasOwnProperty(d)&&(e[d]=b[d]);var g=arguments.length-2;if(1===g)e.children=c;else if(1<g){for(var h=Array(g),l=0;l<g;l++)h[l]=arguments[l+2];e.children=h}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===e[d]&&(e[d]=g[d]);return{$$typeof:r,type:a,key:m,ref:f,props:e,_owner:v.current}}function ja(a,b){return{$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,
  _owner:a._owner}}function H(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}function ka(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}function V(a,b,c,d){if(w.length){var e=w.pop();e.result=a;e.keyPrefix=b;e.func=c;e.context=d;e.count=0;return e}return{result:a,keyPrefix:b,func:c,context:d,count:0}}function W(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>w.length&&w.push(a)}function I(a,b,c,d){var e=typeof a;if("undefined"===
  e||"boolean"===e)a=null;var m=!1;if(null===a)m=!0;else switch(e){case "string":case "number":m=!0;break;case "object":switch(a.$$typeof){case r:case la:m=!0}}if(m)return c(d,a,""===b?"."+J(a,0):b),1;m=0;b=""===b?".":b+":";if(Array.isArray(a))for(var f=0;f<a.length;f++){e=a[f];var g=b+J(e,f);m+=I(e,g,c,d)}else if(null===a||"object"!==typeof a?g=null:(g=X&&a[X]||a["@@iterator"],g="function"===typeof g?g:null),"function"===typeof g)for(a=g.call(a),f=0;!(e=a.next()).done;)e=e.value,g=b+J(e,f++),m+=I(e,
  g,c,d);else"object"===e&&(c=""+a,l("31","[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return m}function K(a,b,c){return null==a?0:I(a,"",b,c)}function J(a,b){return"object"===typeof a&&null!==a&&null!=a.key?ka(a.key):b.toString(36)}function ma(a,b,c){a.func.call(a.context,b,a.count++)}function na(a,b,c){var d=a.result,e=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?L(a,d,c,function(a){return a}):null!=a&&(H(a)&&(a=ja(a,e+(!a.key||b&&b.key===a.key?
  "":(""+a.key).replace(Y,"$&/")+"/")+c)),d.push(a))}function L(a,b,c,d,e){var f="";null!=c&&(f=(""+c).replace(Y,"$&/")+"/");b=V(b,f,d,e);K(a,na,b);W(b)}function oa(a,b){var c=v.currentDispatcher;null===c?l("277"):void 0;return c.readContext(a,b)}var f="function"===typeof Symbol&&Symbol.for,r=f?Symbol.for("react.element"):60103,la=f?Symbol.for("react.portal"):60106,n=f?Symbol.for("react.fragment"):60107,M=f?Symbol.for("react.strict_mode"):60108,pa=f?Symbol.for("react.profiler"):60114,qa=f?Symbol.for("react.provider"):
  60109,ra=f?Symbol.for("react.context"):60110,sa=f?Symbol.for("react.async_mode"):60111,ta=f?Symbol.for("react.forward_ref"):60112;f&&Symbol.for("react.placeholder");var X="function"===typeof Symbol&&Symbol.iterator,Z=Object.getOwnPropertySymbols,ua=Object.prototype.hasOwnProperty,va=Object.prototype.propertyIsEnumerable,x=function(){try{if(!Object.assign)return!1;var a=new String("abc");a[5]="de";if("5"===Object.getOwnPropertyNames(a)[0])return!1;var b={};for(a=0;10>a;a++)b["_"+String.fromCharCode(a)]=
  a;if("0123456789"!==Object.getOwnPropertyNames(b).map(function(a){return b[a]}).join(""))return!1;var c={};"abcdefghijklmnopqrst".split("").forEach(function(a){c[a]=a});return"abcdefghijklmnopqrst"!==Object.keys(Object.assign({},c)).join("")?!1:!0}catch(d){return!1}}()?Object.assign:function(a,b){if(null===a||void 0===a)throw new TypeError("Object.assign cannot be called with null or undefined");var c=Object(a);for(var d,e=1;e<arguments.length;e++){var f=Object(arguments[e]);for(var h in f)ua.call(f,
  h)&&(c[h]=f[h]);if(Z){d=Z(f);for(var g=0;g<d.length;g++)va.call(f,d[g])&&(c[d[g]]=f[d[g]])}}return c},Q={isMounted:function(a){return!1},enqueueForceUpdate:function(a,b,c){},enqueueReplaceState:function(a,b,c,d){},enqueueSetState:function(a,b,c,d){}},P={};p.prototype.isReactComponent={};p.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?l("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};p.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,
  a,"forceUpdate")};R.prototype=p.prototype;f=G.prototype=new R;f.constructor=G;x(f,p.prototype);f.isPureReactComponent=!0;var y=!("undefined"===typeof window||!window.document||!window.document.createElement),wa=Date,aa="function"===typeof setTimeout?setTimeout:void 0,ba="function"===typeof clearTimeout?clearTimeout:void 0,xa="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,ya="function"===typeof cancelAnimationFrame?cancelAnimationFrame:void 0,k=void 0;if("object"===typeof performance&&
  "function"===typeof performance.now){var za=performance;k=function(){return za.now()}}else k=function(){return wa.now()};var z=f=void 0;if(y){var h=null,A=null,q=-1,B=!1,t=!1,ca=void 0,da=void 0,ea=function(a){ca=xa(function(b){ba(da);a(b)});da=aa(function(){ya(ca);a(k())},100)},C=0,D=33,u=33,E={didTimeout:!1,timeRemaining:function(){var a=C-k();return 0<a?a:0}},fa=function(a,b){var c=a.scheduledCallback,d=!1;try{c(b),d=!0}finally{z(a),d||(B=!0,window.postMessage(N,"*"))}},N="__reactIdleCallback$"+
  Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===N&&(B=!1,null!==h)){if(null!==h){var b=k();if(!(-1===q||q>b)){a=-1;for(var c=[],d=h;null!==d;){var e=d.timeoutTime;-1!==e&&e<=b?c.push(d):-1!==e&&(-1===a||e<a)&&(a=e);d=d.next}if(0<c.length)for(E.didTimeout=!0,b=0,d=c.length;b<d;b++)fa(c[b],E);q=a}}for(a=k();0<C-a&&null!==h;)a=h,E.didTimeout=!1,fa(a,E),a=k();null===h||t||(t=!0,ea(ha))}},!1);var ha=function(a){t=!1;var b=a-C+u;b<u&&D<u?
  (8>b&&(b=8),u=b<D?D:b):D=b;C=a+u;B||(B=!0,window.postMessage(N,"*"))};f=function(a,b){var c=-1;null!=b&&"number"===typeof b.timeout&&(c=k()+b.timeout);if(-1===q||-1!==c&&c<q)q=c;a={scheduledCallback:a,timeoutTime:c,prev:null,next:null};null===h?h=a:(b=a.prev=A,null!==b&&(b.next=a));A=a;t||(t=!0,ea(ha));return a};z=function(a){if(null!==a.prev||h===a){var b=a.next,c=a.prev;a.next=null;a.prev=null;null!==b?null!==c?(c.next=b,b.prev=c):(b.prev=null,h=b):null!==c?(c.next=null,A=c):A=h=null}}}else{var O=
  new Map;f=function(a,b){b={scheduledCallback:a,timeoutTime:0,next:null,prev:null};var c=aa(function(){a({timeRemaining:function(){return Infinity},didTimeout:!1})});O.set(a,c);return b};z=function(a){var b=O.get(a.scheduledCallback);O.delete(a);ba(b)}}var Aa=0,v={current:null,currentDispatcher:null};y={ReactCurrentOwner:v,assign:x};x(y,{Schedule:{unstable_cancelScheduledWork:z,unstable_now:k,unstable_scheduleWork:f},ScheduleTracking:{__interactionsRef:null,__subscriberRef:null,unstable_clear:function(a){return a()},
  unstable_getCurrent:function(){return null},unstable_getThreadID:function(){return++Aa},unstable_subscribe:function(a){},unstable_track:function(a,b,c){return c()},unstable_unsubscribe:function(a){},unstable_wrap:function(a){return a}}});var T=Object.prototype.hasOwnProperty,U={key:!0,ref:!0,__self:!0,__source:!0},Y=/\/+/g,w=[];n={Children:{map:function(a,b,c){if(null==a)return a;var d=[];L(a,d,null,b,c);return d},forEach:function(a,b,c){if(null==a)return a;b=V(null,null,b,c);K(a,ma,b);W(b)},count:function(a){return K(a,
  function(){return null},null)},toArray:function(a){var b=[];L(a,b,null,function(a){return a});return b},only:function(a){H(a)?void 0:l("143");return a}},createRef:function(){return{current:null}},Component:p,PureComponent:G,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:ra,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,Provider:null,Consumer:null,unstable_read:null};a.Provider={$$typeof:qa,_context:a};a.Consumer=a;a.unstable_read=oa.bind(null,a);return a},forwardRef:function(a){return{$$typeof:ta,
  render:a}},Fragment:n,StrictMode:M,unstable_AsyncMode:sa,unstable_Profiler:pa,createElement:S,cloneElement:function(a,b,c){null===a||void 0===a?l("267",a):void 0;var d=void 0,e=x({},a.props),f=a.key,h=a.ref,g=a._owner;if(null!=b){void 0!==b.ref&&(h=b.ref,g=v.current);void 0!==b.key&&(f=""+b.key);var k=void 0;a.type&&a.type.defaultProps&&(k=a.type.defaultProps);for(d in b)T.call(b,d)&&!U.hasOwnProperty(d)&&(e[d]=void 0===b[d]&&void 0!==k?k[d]:b[d])}d=arguments.length-2;if(1===d)e.children=c;else if(1<
  d){k=Array(d);for(var n=0;n<d;n++)k[n]=arguments[n+2];e.children=k}return{$$typeof:r,type:a.type,key:f,ref:h,props:e,_owner:g}},createFactory:function(a){var b=S.bind(null,a);b.type=a;return b},isValidElement:H,version:"16.5.1",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:y};n=(M={default:n},n)||M;return n.default||n});
  
  },
  {}
  ],})
    