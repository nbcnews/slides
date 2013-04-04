var requirejs,require,define;(function(global){function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var n;for(n=0;e.length>n&&(!e[n]||!t(e[n],n,e));n+=1);}}function eachReverse(e,t){if(e){var n;for(n=e.length-1;n>-1&&(!e[n]||!t(e[n],n,e));n-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var n;for(n in e)if(hasProp(e,n)&&t(e[n],n))break}function mixin(e,t,n,r){return t&&eachProp(t,function(t,i){(n||!hasProp(e,i))&&(r&&"string"!=typeof t?(e[i]||(e[i]={}),mixin(e[i],t,n,r)):e[i]=t)}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,n,r){var i=Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return i.requireType=e,i.requireModules=r,n&&(i.originalError=n),i}function newContext(e){function t(e){var t,n;for(t=0;e[t];t+=1)if(n=e[t],"."===n)e.splice(t,1),t-=1;else if(".."===n){if(1===t&&(".."===e[2]||".."===e[0]))break;t>0&&(e.splice(t-1,2),t-=2)}}function n(e,n,r){var i,o,a,s,c,l,u,d,f,p,h,m=n&&n.split("/"),v=m,g=L.map,y=g&&g["*"];if(e&&"."===e.charAt(0)&&(n?(v=getOwn(L.pkgs,n)?m=[n]:m.slice(0,m.length-1),e=v.concat(e.split("/")),t(e),o=getOwn(L.pkgs,i=e[0]),e=e.join("/"),o&&e===i+"/"+o.main&&(e=i)):0===e.indexOf("./")&&(e=e.substring(2))),r&&g&&(m||y)){for(s=e.split("/"),c=s.length;c>0;c-=1){if(u=s.slice(0,c).join("/"),m)for(l=m.length;l>0;l-=1)if(a=getOwn(g,m.slice(0,l).join("/")),a&&(a=getOwn(a,u))){d=a,f=c;break}if(d)break;!p&&y&&getOwn(y,u)&&(p=getOwn(y,u),h=c)}!d&&p&&(d=p,f=h),d&&(s.splice(0,f,d),e=s.join("/"))}return e}function r(e){isBrowser&&each(scripts(),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===w.contextName?(t.parentNode.removeChild(t),!0):void 0})}function i(e){var t=getOwn(L.paths,e);return t&&isArray(t)&&t.length>1?(r(e),t.shift(),w.require.undef(e),w.require([e]),!0):void 0}function o(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function a(e,t,r,i){var a,s,c,l,u=null,d=t?t.name:null,f=e,p=!0,h="";return e||(p=!1,e="_@r"+(O+=1)),l=o(e),u=l[0],e=l[1],u&&(u=n(u,d,i),s=getOwn(A,u)),e&&(u?h=s&&s.normalize?s.normalize(e,function(e){return n(e,d,i)}):n(e,d,i):(h=n(e,d,i),l=o(h),u=l[0],h=l[1],r=!0,a=w.nameToUrl(h))),c=!u||s||r?"":"_unnormalized"+(P+=1),{prefix:u,name:h,parentMap:t,unnormalized:!!c,url:a,originalName:f,isDefine:p,id:(u?u+"!"+h:h)+c}}function s(e){var t=e.id,n=getOwn(S,t);return n||(n=S[t]=new w.Module(e)),n}function c(e,t,n){var r=e.id,i=getOwn(S,r);!hasProp(A,r)||i&&!i.defineEmitComplete?s(e).on(t,n):"defined"===t&&n(A[r])}function l(e,t){var n=e.requireModules,r=!1;t?t(e):(each(n,function(t){var n=getOwn(S,t);n&&(n.error=e,n.events.error&&(r=!0,n.emit("error",e)))}),r||req.onError(e))}function u(){globalDefQueue.length&&(apsp.apply(M,[M.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function d(e){delete S[e],delete q[e]}function f(e,t,n){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,each(e.depMaps,function(r,i){var o=r.id,a=getOwn(S,o);!a||e.depMatched[i]||n[o]||(getOwn(t,o)?(e.defineDep(i,A[o]),e.check()):f(a,t,n))}),n[r]=!0)}function p(){var e,t,n,o,a=1e3*L.waitSeconds,s=a&&w.startTime+a<(new Date).getTime(),c=[],u=[],d=!1,h=!0;if(!y){if(y=!0,eachProp(q,function(n){if(e=n.map,t=e.id,n.enabled&&(e.isDefine||u.push(n),!n.error))if(!n.inited&&s)i(t)?(o=!0,d=!0):(c.push(t),r(t));else if(!n.inited&&n.fetched&&e.isDefine&&(d=!0,!e.prefix))return h=!1}),s&&c.length)return n=makeError("timeout","Load timeout for modules: "+c,null,c),n.contextName=w.contextName,l(n);h&&each(u,function(e){f(e,{},{})}),s&&!o||!d||!isBrowser&&!isWebWorker||x||(x=setTimeout(function(){x=0,p()},50)),y=!1}}function h(e){hasProp(A,e[0])||s(a(e[0],null,!0)).init(e[1],e[2])}function m(e,t,n,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(n,t,!1)}function v(e){var t=e.currentTarget||e.srcElement;return m(t,w.onScriptLoad,"load","onreadystatechange"),m(t,w.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function g(){var e;for(u();M.length;){if(e=M.shift(),null===e[0])return l(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));h(e)}}var y,b,w,E,x,L={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},S={},q={},k={},M=[],A={},T={},O=1,P=1;return E={require:function(e){return e.require?e.require:e.require=w.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?e.exports:e.exports=A[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return L.config&&getOwn(L.config,e.map.id)||{}},exports:A[e.map.id]}}},b=function(e){this.events=getOwn(k,e.id)||{},this.map=e,this.shim=getOwn(L.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(e,t,n,r){r=r||{},this.inited||(this.factory=t,n?this.on("error",n):this.events.error&&(n=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=n,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,w.startTime=(new Date).getTime();var e=this.map;return this.shim?(w.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})),void 0):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;T[e]||(T[e]=!0,w.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,n=this.map.id,r=this.depExports,i=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,1>this.depCount&&!this.defined){if(isFunction(o)){if(this.events.error)try{i=w.execCb(n,o,r,i)}catch(a){e=a}else i=w.execCb(n,o,r,i);if(this.map.isDefine&&(t=this.module,t&&void 0!==t.exports&&t.exports!==this.exports?i=t.exports:void 0===i&&this.usingExports&&(i=this.exports)),e)return e.requireMap=this.map,e.requireModules=[this.map.id],e.requireType="define",l(this.error=e)}else i=o;this.exports=i,this.map.isDefine&&!this.ignore&&(A[n]=i,req.onResourceLoad&&req.onResourceLoad(w,this.map,this.depMaps)),d(n),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,r=a(e.prefix);this.depMaps.push(r),c(r,"defined",bind(this,function(r){var i,o,u,f=this.map.name,p=this.map.parentMap?this.map.parentMap.name:null,h=w.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(r.normalize&&(f=r.normalize(f,function(e){return n(e,p,!0)})||""),o=a(e.prefix+"!"+f,this.map.parentMap),c(o,"defined",bind(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),u=getOwn(S,o.id),u&&(this.depMaps.push(o),this.events.error&&u.on("error",bind(this,function(e){this.emit("error",e)})),u.enable()),void 0):(i=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),i.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(S,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&d(e.map.id)}),l(e)}),i.fromText=bind(this,function(n,r){var o=e.name,c=a(o),u=useInteractive;r&&(n=r),u&&(useInteractive=!1),s(c),hasProp(L.config,t)&&(L.config[o]=L.config[t]);try{req.exec(n)}catch(d){return l(makeError("fromtexteval","fromText eval for "+t+" failed: "+d,d,[t]))}u&&(useInteractive=!0),this.depMaps.push(c),w.completeLoad(o),h([o],i)}),r.load(e.name,h,i,L),void 0)})),w.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){q[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var n,r,i;if("string"==typeof e){if(e=a(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,i=getOwn(E,e.id))return this.depExports[t]=i(this),void 0;this.depCount+=1,c(e,"defined",bind(this,function(e){this.defineDep(t,e),this.check()})),this.errback&&c(e,"error",this.errback)}n=e.id,r=S[n],hasProp(E,n)||!r||r.enabled||w.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(S,e.id);t&&!t.enabled&&w.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var n=this.events[e];n||(n=this.events[e]=[]),n.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},w={config:L,contextName:e,registry:S,defined:A,urlFetched:T,defQueue:M,Module:b,makeModuleMap:a,nextTick:req.nextTick,onError:l,configure:function(e){e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");var t=L.pkgs,n=L.shim,r={paths:!0,config:!0,map:!0};eachProp(e,function(e,t){r[t]?"map"===t?(L.map||(L.map={}),mixin(L[t],e,!0,!0)):mixin(L[t],e,!0):L[t]=e}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=w.makeShimExports(e)),n[t]=e}),L.shim=n),e.packages&&(each(e.packages,function(e){var n;e="string"==typeof e?{name:e}:e,n=e.location,t[e.name]={name:e.name,location:n||e.name,main:(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),L.pkgs=t),eachProp(S,function(e,t){e.inited||e.map.unnormalized||(e.map=a(t))}),(e.deps||e.callback)&&w.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,r){function i(n,o,c){var u,d,f;return r.enableBuildCallback&&o&&isFunction(o)&&(o.__requireJsBuild=!0),"string"==typeof n?isFunction(o)?l(makeError("requireargs","Invalid require call"),c):t&&hasProp(E,n)?E[n](S[t.id]):req.get?req.get(w,n,t,i):(d=a(n,t,!1,!0),u=d.id,hasProp(A,u)?A[u]:l(makeError("notloaded",'Module name "'+u+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(g(),w.nextTick(function(){g(),f=s(a(null,t)),f.skipMap=r.skipMap,f.init(n,o,c,{enabled:!0}),p()}),i)}return r=r||{},mixin(i,{isBrowser:isBrowser,toUrl:function(e){var r,i=e.lastIndexOf("."),o=e.split("/")[0],a="."===o||".."===o;return-1!==i&&(!a||i>1)&&(r=e.substring(i,e.length),e=e.substring(0,i)),w.nameToUrl(n(e,t&&t.id,!0),r,!0)},defined:function(e){return hasProp(A,a(e,t,!1,!0).id)},specified:function(e){return e=a(e,t,!1,!0).id,hasProp(A,e)||hasProp(S,e)}}),t||(i.undef=function(e){u();var n=a(e,t,!0),r=getOwn(S,e);delete A[e],delete T[n.url],delete k[e],r&&(r.events.defined&&(k[e]=r.events),d(e))}),i},enable:function(e){var t=getOwn(S,e.id);t&&s(e).enable()},completeLoad:function(e){var t,n,r,o=getOwn(L.shim,e)||{},a=o.exports;for(u();M.length;){if(n=M.shift(),null===n[0]){if(n[0]=e,t)break;t=!0}else n[0]===e&&(t=!0);h(n)}if(r=getOwn(S,e),!t&&!hasProp(A,e)&&r&&!r.inited){if(!(!L.enforceDefine||a&&getGlobal(a)))return i(e)?void 0:l(makeError("nodefine","No define call for "+e,null,[e]));h([e,o.deps||[],o.exportsFn])}p()},nameToUrl:function(e,t,n){var r,i,o,a,s,c,l,u,d;if(req.jsExtRegExp.test(e))u=e+(t||"");else{for(r=L.paths,i=L.pkgs,s=e.split("/"),c=s.length;c>0;c-=1){if(l=s.slice(0,c).join("/"),o=getOwn(i,l),d=getOwn(r,l)){isArray(d)&&(d=d[0]),s.splice(0,c,d);break}if(o){a=e===o.name?o.location+"/"+o.main:o.location,s.splice(0,c,a);break}}u=s.join("/"),u+=t||(/\?/.test(u)||n?"":".js"),u=("/"===u.charAt(0)||u.match(/^[\w\+\.\-]+:/)?"":L.baseUrl)+u}return L.urlArgs?u+((-1===u.indexOf("?")?"?":"&")+L.urlArgs):u},load:function(e,t){req.load(w,e,t)},execCb:function(e,t,n,r){return t.apply(r,n)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=v(e);w.completeLoad(t.id)}},onScriptError:function(e){var t=v(e);return i(t.id)?void 0:l(makeError("scripterror","Script error",e,[t.id]))}},w.require=w.makeRequire(),w}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){return"interactive"===e.readyState?interactiveScript=e:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.5",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||!navigator||!document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"==""+opera,contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(void 0===define){if(requirejs!==void 0){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,n,r){var i,o,a=defContextName;return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=n,n=r):e=[]),o&&o.context&&(a=o.context),i=getOwn(contexts,a),i||(i=contexts[a]=req.s.newContext(a)),o&&i.configure(o),i.require(e,t,n)},req.config=function(e){return req(e)},req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=function(e){throw e},req.load=function(e,t,n){var r,i=e&&e.config||{};if(isBrowser)return r=i.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),r.type=i.scriptType||"text/javascript",r.charset="utf-8",r.async=!0,r.setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",t),!r.attachEvent||r.attachEvent.toString&&0>(""+r.attachEvent).indexOf("[native code")||isOpera?(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)),r.src=n,currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{importScripts(n),e.completeLoad(t)}catch(o){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+n,o,[t]))}},isBrowser&&eachReverse(scripts(),function(e){return head||(head=e.parentNode),dataMain=e.getAttribute("data-main"),dataMain?(cfg.baseUrl||(src=dataMain.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath,dataMain=mainScript),dataMain=dataMain.replace(jsSuffixRegExp,""),cfg.deps=cfg.deps?cfg.deps.concat(dataMain):[dataMain],!0):void 0}),define=function(e,t,n){var r,i;"string"!=typeof e&&(n=t,t=e,e=null),isArray(t)||(n=t,t=[]),!t.length&&isFunction(n)&&n.length&&((""+n).replace(commentRegExp,"").replace(cjsRequireRegExp,function(e,n){t.push(n)}),t=(1===n.length?["require"]:["require","exports","module"]).concat(t)),useInteractive&&(r=currentlyAddingScript||getInteractiveScript(),r&&(e||(e=r.getAttribute("data-requiremodule")),i=contexts[r.getAttribute("data-requirecontext")])),(i?i.defQueue:globalDefQueue).push([e,t,n])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}})(this),define("requireLib",function(){}),function(e){function t(){p||(p=!0,c(m,function(e){d(e)}))}function n(t,n){var r=e.createElement("script");r.type="text/"+(t.type||"javascript"),r.src=t.src||t,r.async=!1,r.onreadystatechange=r.onload=function(){var e=r.readyState;!n.done&&(!e||/loaded|complete/.test(e))&&(n.done=!0,n())},(e.body||h).appendChild(r)}function r(e,t){return e.state==q?t&&t():e.state==S?E.ready(e.name,t):e.state==L?e.onpreload.push(function(){r(e,t)}):(e.state=S,n(e.url,function(){e.state=q,t&&t(),c(g[e.name],function(e){d(e)}),a()&&p&&c(g.ALL,function(e){d(e)})}),void 0)}function i(e){void 0===e.state&&(e.state=L,e.onpreload=[],n({src:e.url,type:"cache"},function(){o(e)}))}function o(e){e.state=x,c(e.onpreload,function(e){e.call()})}function a(e){e=e||y;var t;for(var n in e){if(e.hasOwnProperty(n)&&e[n].state!=q)return!1;t=!0}return t}function s(e){return"[object Function]"==Object.prototype.toString.call(e)}function c(e,t){if(e){"object"==typeof e&&(e=[].slice.call(e));for(var n=0;e.length>n;n++)t.call(e,e[n],n)}}function l(e){var t;if("object"==typeof e)for(var n in e)e[n]&&(t={name:n,url:e[n]});else t={name:u(e),url:e};var r=y[t.name];return r&&r.url===t.url?r:(y[t.name]=t,t)}function u(e){var t=e.split("/"),n=t[t.length-1],r=n.indexOf("?");return-1!=r?n.substring(0,r):n}function d(e){e._done||(e(),e._done=1)}var f,p,h=e.documentElement,m=[],v=[],g={},y={},b=e.createElement("script").async===!0||"MozAppearance"in e.documentElement.style||window.opera,w=window.head_conf&&head_conf.head||"head",E=window[w]=window[w]||function(){E.ready.apply(null,arguments)},x=1,L=2,S=3,q=4;if(E.js=b?function(){var e=arguments,t=e[e.length-1],n={};return s(t)||(t=null),c(e,function(i,o){i!=t&&(i=l(i),n[i.name]=i,r(i,t&&o==e.length-2?function(){a(n)&&d(t)}:null))}),E}:function(){var e=arguments,t=[].slice.call(e,1),n=t[0];return f?(n?(c(t,function(e){s(e)||i(l(e))}),r(l(e[0]),s(n)?n:function(){E.js.apply(null,t)})):r(l(e[0])),E):(v.push(function(){E.js.apply(null,e)}),E)},E.ready=function(t,n){if(t==e)return p?d(n):m.push(n),E;if(s(t)&&(n=t,t="ALL"),"string"!=typeof t||!s(n))return E;var r=y[t];if(r&&r.state==q||"ALL"==t&&a()&&p)return d(n),E;var i=g[t];return i?i.push(n):i=g[t]=[n],E},E.ready(e,function(){a()&&c(g.ALL,function(e){d(e)}),E.feature&&E.feature("domloaded",!0)}),window.addEventListener)e.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1);else if(window.attachEvent){e.attachEvent("onreadystatechange",function(){"complete"===e.readyState&&t()});var k=1;try{k=window.frameElement}catch(M){}!k&&h.doScroll&&function(){try{h.doScroll("left"),t()}catch(e){return setTimeout(arguments.callee,1),void 0}}(),window.attachEvent("onload",t)}!e.readyState&&e.addEventListener&&(e.readyState="loading",e.addEventListener("DOMContentLoaded",handler=function(){e.removeEventListener("DOMContentLoaded",handler,!1),e.readyState="complete"},!1)),setTimeout(function(){f=!0,c(v,function(e){e()})},300)}(document),define("head",function(e){return function(){var t;return t||e.head}}(this));var Reveal=function(){function e(e){return St||Lt?(window.addEventListener("load",v,!1),c(vt,e),n(),r(),void 0):(document.body.setAttribute("class","no-transforms"),void 0)}function t(){if(xt.theme=document.querySelector("#theme"),xt.wrapper=document.querySelector(".reveal"),xt.slides=document.querySelector(".reveal .slides"),!xt.wrapper.querySelector(".progress")&&vt.progress){var e=document.createElement("div");e.classList.add("progress"),e.innerHTML="<span></span>",xt.wrapper.appendChild(e)}if(!xt.wrapper.querySelector(".controls")&&vt.controls){var t=document.createElement("aside");t.classList.add("controls"),t.innerHTML='<div class="navigate-left"></div><div class="navigate-right"></div><div class="navigate-up"></div><div class="navigate-down"></div>',xt.wrapper.appendChild(t)}if(!xt.wrapper.querySelector(".state-background")){var n=document.createElement("div");n.classList.add("state-background"),xt.wrapper.appendChild(n)}if(!xt.wrapper.querySelector(".pause-overlay")){var r=document.createElement("div");r.classList.add("pause-overlay"),xt.wrapper.appendChild(r)}xt.progress=document.querySelector(".reveal .progress"),xt.progressbar=document.querySelector(".reveal .progress span"),vt.controls&&(xt.controls=document.querySelector(".reveal .controls"),xt.controlsLeft=l(document.querySelectorAll(".navigate-left")),xt.controlsRight=l(document.querySelectorAll(".navigate-right")),xt.controlsUp=l(document.querySelectorAll(".navigate-up")),xt.controlsDown=l(document.querySelectorAll(".navigate-down")),xt.controlsPrev=l(document.querySelectorAll(".navigate-prev")),xt.controlsNext=l(document.querySelectorAll(".navigate-next")))}function n(){/iphone|ipod|android/gi.test(navigator.userAgent)&&!/crios/gi.test(navigator.userAgent)&&(window.addEventListener("load",d,!1),window.addEventListener("orientationchange",d,!1))}function r(){function e(){n.length&&head.js.apply(null,n),i()}for(var t=[],n=[],r=0,o=vt.dependencies.length;o>r;r++){var a=vt.dependencies[r];(!a.condition||a.condition())&&(a.async?n.push(a.src):t.push(a.src),"function"==typeof a.callback&&head.ready(a.src.match(/([\w\d_\-]*)\.?js$|[^\\\/]*$/i)[0],a.callback))}t.length?(head.ready(e),head.js.apply(null,t)):e()}function i(){t(),a(),o(),j(),setTimeout(function(){f("ready",{indexh:yt,indexv:bt,currentSlide:dt})},1)}function o(e){if(xt.wrapper.classList.remove(vt.transition),"object"==typeof e&&c(vt,e),Lt===!1&&(vt.transition="linear"),xt.wrapper.classList.add(vt.transition),xt.controls&&(xt.controls.style.display=vt.controls&&xt.controls?"block":"none"),xt.progress&&(xt.progress.style.display=vt.progress&&xt.progress?"block":"none"),vt.rtl?xt.wrapper.classList.add("rtl"):xt.wrapper.classList.remove("rtl"),vt.center?xt.wrapper.classList.add("center"):xt.wrapper.classList.remove("center"),vt.mouseWheel?(document.addEventListener("DOMMouseScroll",V,!1),document.addEventListener("mousewheel",V,!1)):(document.removeEventListener("DOMMouseScroll",V,!1),document.removeEventListener("mousewheel",V,!1)),vt.rollingLinks?p():h(),vt.theme&&xt.theme){var t=xt.theme.getAttribute("href"),n=/[^\/]*?(?=\.css)/,r=t.match(n)[0];vt.theme!==r&&(t=t.replace(n,vt.theme),xt.theme.setAttribute("href",t))}v(),gt=vt.autoSlide,I()}function a(){Ot=!0,window.addEventListener("hashchange",st,!1),window.addEventListener("resize",ct,!1),vt.touch&&(xt.wrapper.addEventListener("touchstart",Q,!1),xt.wrapper.addEventListener("touchmove",$,!1),xt.wrapper.addEventListener("touchend",K,!1),window.navigator.msPointerEnabled&&(xt.wrapper.addEventListener("MSPointerDown",G,!1),xt.wrapper.addEventListener("MSPointerMove",Z,!1),xt.wrapper.addEventListener("MSPointerUp",J,!1))),vt.keyboard&&document.addEventListener("keydown",H,!1),vt.progress&&xt.progress&&xt.progress.addEventListener("click",et,!1),vt.controls&&xt.controls&&["touchstart","click"].forEach(function(e){xt.controlsLeft.forEach(function(t){t.addEventListener(e,tt,!1)}),xt.controlsRight.forEach(function(t){t.addEventListener(e,nt,!1)}),xt.controlsUp.forEach(function(t){t.addEventListener(e,rt,!1)}),xt.controlsDown.forEach(function(t){t.addEventListener(e,it,!1)}),xt.controlsPrev.forEach(function(t){t.addEventListener(e,ot,!1)}),xt.controlsNext.forEach(function(t){t.addEventListener(e,at,!1)})})}function s(){Ot=!1,document.removeEventListener("keydown",H,!1),window.removeEventListener("hashchange",st,!1),window.removeEventListener("resize",ct,!1),vt.touch&&(xt.wrapper.removeEventListener("touchstart",Q,!1),xt.wrapper.removeEventListener("touchmove",$,!1),xt.wrapper.removeEventListener("touchend",K,!1),window.navigator.msPointerEnabled&&(xt.wrapper.removeEventListener("MSPointerDown",G,!1),xt.wrapper.removeEventListener("MSPointerMove",Z,!1),xt.wrapper.removeEventListener("MSPointerUp",J,!1))),vt.progress&&xt.progress&&xt.progress.removeEventListener("click",et,!1),vt.controls&&xt.controls&&["touchstart","click"].forEach(function(e){xt.controlsLeft.forEach(function(t){t.removeEventListener(e,tt,!1)}),xt.controlsRight.forEach(function(t){t.removeEventListener(e,nt,!1)}),xt.controlsUp.forEach(function(t){t.removeEventListener(e,rt,!1)}),xt.controlsDown.forEach(function(t){t.removeEventListener(e,it,!1)}),xt.controlsPrev.forEach(function(t){t.removeEventListener(e,ot,!1)}),xt.controlsNext.forEach(function(t){t.removeEventListener(e,at,!1)})})}function c(e,t){for(var n in t)e[n]=t[n]}function l(e){return Array.prototype.slice.call(e)}function u(e,t){var n=e.x-t.x,r=e.y-t.y;return Math.sqrt(n*n+r*r)}function d(){0===window.orientation?(document.documentElement.style.overflow="scroll",document.body.style.height="120%"):(document.documentElement.style.overflow="",document.body.style.height="100%"),setTimeout(function(){window.scrollTo(0,1)},10)}function f(e,t){var n=document.createEvent("HTMLEvents",1,2);n.initEvent(e,!0,!0),c(n,t),xt.wrapper.dispatchEvent(n)}function p(){if(Lt&&!("msPerspective"in document.body.style))for(var e=document.querySelectorAll(ft+" a:not(.image)"),t=0,n=e.length;n>t;t++){var r=e[t];if(!(!r.textContent||r.querySelector("*")||r.className&&r.classList.contains(r,"roll"))){var i=document.createElement("span");i.setAttribute("data-title",r.text),i.innerHTML=r.innerHTML,r.classList.add("roll"),r.innerHTML="",r.appendChild(i)}}}function h(){for(var e=document.querySelectorAll(ft+" a.roll"),t=0,n=e.length;n>t;t++){var r=e[t],i=r.querySelector("span");i&&(r.classList.remove("roll"),r.innerHTML=i.innerHTML)}}function m(e){var t=l(e);return t.forEach(function(e,t){e.hasAttribute("data-fragment-index")||e.setAttribute("data-fragment-index",t)}),t.sort(function(e,t){return e.getAttribute("data-fragment-index")-t.getAttribute("data-fragment-index")}),t}function v(){if(xt.wrapper){var e=xt.wrapper.offsetWidth,t=xt.wrapper.offsetHeight;e-=t*vt.margin,t-=t*vt.margin;var n=vt.width,r=vt.height;if("string"==typeof n&&/%$/.test(n)&&(n=parseInt(n,10)/100*e),"string"==typeof r&&/%$/.test(r)&&(r=parseInt(r,10)/100*t),xt.slides.style.width=n+"px",xt.slides.style.height=r+"px",Et=Math.min(e/n,t/r),Et=Math.max(Et,vt.minScale),Et=Math.min(Et,vt.maxScale),void 0===xt.slides.style.zoom||navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi)){var i="translate(-50%, -50%) scale("+Et+") translate(50%, 50%)";xt.slides.style.WebkitTransform=i,xt.slides.style.MozTransform=i,xt.slides.style.msTransform=i,xt.slides.style.OTransform=i,xt.slides.style.transform=i}else xt.slides.style.zoom=Et;for(var o=l(document.querySelectorAll(ft)),a=0,s=o.length;s>a;a++){var c=o[a];"none"!==c.style.display&&(c.style.top=vt.center?c.classList.contains("stack")?0:Math.max(-(c.offsetHeight/2)-20,-r/2)+"px":"")}}}function g(e,t){"object"==typeof e&&"function"==typeof e.setAttribute&&e.setAttribute("data-previous-indexv",t||0)}function y(e){return"object"==typeof e&&"function"==typeof e.setAttribute&&e.classList.contains("stack")?parseInt(e.getAttribute("data-previous-indexv")||0,10):0}function b(){if(vt.overview){z();var e=xt.wrapper.classList.contains("overview");xt.wrapper.classList.add("overview"),xt.wrapper.classList.remove("exit-overview"),clearTimeout(At),clearTimeout(Tt),At=setTimeout(function(){for(var t=document.querySelectorAll(pt),n=0,r=t.length;r>n;n++){var i=t[n],o="translateZ(-2500px) translate("+105*(n-yt)+"%, 0%)";if(i.setAttribute("data-index-h",n),i.style.display="block",i.style.WebkitTransform=o,i.style.MozTransform=o,i.style.msTransform=o,i.style.OTransform=o,i.style.transform=o,i.classList.contains("stack"))for(var a=i.querySelectorAll("section"),s=0,c=a.length;c>s;s++){var l=n===yt?bt:y(i),u=a[s],d="translate(0%, "+105*(s-l)+"%)";u.setAttribute("data-index-h",n),u.setAttribute("data-index-v",s),u.style.display="block",u.style.WebkitTransform=d,u.style.MozTransform=d,u.style.msTransform=d,u.style.OTransform=d,u.style.transform=d,u.addEventListener("click",lt,!0)}else i.addEventListener("click",lt,!0)}v(),e||f("overviewshown",{indexh:yt,indexv:bt,currentSlide:dt})},10)}}function w(){if(vt.overview){clearTimeout(At),clearTimeout(Tt),xt.wrapper.classList.remove("overview"),xt.wrapper.classList.add("exit-overview"),Tt=setTimeout(function(){xt.wrapper.classList.remove("exit-overview")},10);for(var e=l(document.querySelectorAll(ft)),t=0,n=e.length;n>t;t++){var r=e[t];r.style.display="",r.style.WebkitTransform="",r.style.MozTransform="",r.style.msTransform="",r.style.OTransform="",r.style.transform="",r.removeEventListener("click",lt,!0)}A(yt,bt),I(),f("overviewhidden",{indexh:yt,indexv:bt,currentSlide:dt})}}function E(e){"boolean"==typeof e?e?b():w():x()?w():b()}function x(){return xt.wrapper.classList.contains("overview")}function L(){var e=document.body,t=e.requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullScreen;t&&t.apply(e)}function S(){var e=xt.wrapper.classList.contains("paused");z(),xt.wrapper.classList.add("paused"),e===!1&&f("paused")}function q(){var e=xt.wrapper.classList.contains("paused");I(),xt.wrapper.classList.remove("paused"),e&&f("resumed")}function k(){M()?q():S()}function M(){return xt.wrapper.classList.contains("paused")}function A(e,t,n,r){ut=dt;var i=document.querySelectorAll(pt);void 0===t&&(t=y(i[e])),ut&&ut.parentNode&&ut.parentNode.classList.contains("stack")&&g(ut.parentNode,bt);var o=wt.concat();wt.length=0;var a=yt,s=bt;yt=T(pt,void 0===e?yt:e),bt=T(ht,void 0===t?bt:t),v();e:for(var c=0,u=wt.length;u>c;c++){for(var d=0;o.length>d;d++)if(o[d]===wt[c]){o.splice(d,1);continue e}document.documentElement.classList.add(wt[c]),f(wt[c])}for(;o.length;)document.documentElement.classList.remove(o.pop());x()&&b(),C(1500);var p=i[yt],h=p.querySelectorAll("section");if(dt=h[bt]||p,n!==void 0){var w=m(dt.querySelectorAll(".fragment"));l(w).forEach(function(e,t){n>t?e.classList.add("visible"):e.classList.remove("visible")})}yt!==a||bt!==s?f("slidechanged",{indexh:yt,indexv:bt,previousSlide:ut,currentSlide:dt,origin:r}):ut=null,ut&&(ut.classList.remove("present"),document.querySelector(mt).classList.contains("present")&&setTimeout(function(){var e,t=l(document.querySelectorAll(pt+".stack"));for(e in t)t[e]&&g(t[e],0)},0)),P(),O()}function T(e,t){var n=l(document.querySelectorAll(e)),r=n.length;if(r){vt.loop&&(t%=r,0>t&&(t=r+t)),t=Math.max(Math.min(t,r-1),0);for(var i=0;r>i;i++){var o=n[i];if(x()===!1){var a=Math.abs((t-i)%(r-3))||0;o.style.display=a>3?"none":"block"}n[i].classList.remove("past"),n[i].classList.remove("present"),n[i].classList.remove("future"),t>i?n[i].classList.add("past"):i>t&&n[i].classList.add("future"),o.querySelector("section")&&n[i].classList.add("stack")}n[t].classList.add("present");var s=n[t].getAttribute("data-state");s&&(wt=wt.concat(s.split(" ")));var c=n[t].getAttribute("data-autoslide");gt=c?parseInt(c,10):vt.autoSlide}else t=0;return t}function O(){if(vt.progress&&xt.progress){var e=l(document.querySelectorAll(pt)),t=document.querySelectorAll(ft+":not(.stack)").length,n=0;e:for(var r=0;e.length>r;r++){for(var i=e[r],o=l(i.querySelectorAll("section")),a=0;o.length>a;a++){if(o[a].classList.contains("present"))break e;n++}if(i.classList.contains("present"))break;i.classList.contains("stack")===!1&&n++}xt.progressbar.style.width=n/(t-1)*window.innerWidth+"px"}}function P(){if(vt.controls&&xt.controls){var e=D();xt.controlsLeft.concat(xt.controlsRight).concat(xt.controlsUp).concat(xt.controlsDown).concat(xt.controlsPrev).concat(xt.controlsNext).forEach(function(e){e.classList.remove("enabled")}),e.left&&xt.controlsLeft.forEach(function(e){e.classList.add("enabled")}),e.right&&xt.controlsRight.forEach(function(e){e.classList.add("enabled")}),e.up&&xt.controlsUp.forEach(function(e){e.classList.add("enabled")}),e.down&&xt.controlsDown.forEach(function(e){e.classList.add("enabled")}),(e.left||e.up)&&xt.controlsPrev.forEach(function(e){e.classList.add("enabled")}),(e.right||e.down)&&xt.controlsNext.forEach(function(e){e.classList.add("enabled")
})}}function D(){var e=document.querySelectorAll(pt),t=document.querySelectorAll(ht);return{left:yt>0||vt.loop,right:e.length-1>yt||vt.loop,up:bt>0,down:t.length-1>bt}}function j(){var e=window.location.hash,t=e.slice(2).split("/"),n=e.replace(/#|\//gi,"");if(isNaN(parseInt(t[0],10))&&n.length){var r=document.querySelector("#"+n);if(r){var i=Reveal.getIndices(r);A(i.h,i.v)}else A(yt,bt)}else{var o=parseInt(t[0],10)||0,a=parseInt(t[1],10)||0;A(o,a)}}function C(e){if(vt.history)if(clearTimeout(Mt),"number"==typeof e)Mt=setTimeout(C,e);else{var t="/";dt&&"string"==typeof dt.getAttribute("id")?t="/"+dt.getAttribute("id"):((yt>0||bt>0)&&(t+=yt),bt>0&&(t+="/"+bt)),window.location.hash=t}}function N(e){var t=yt,n=bt;if(e){var r=!!e.parentNode.nodeName.match(/section/gi),i=r?e.parentNode:e,o=l(document.querySelectorAll(pt));t=Math.max(o.indexOf(i),0),r&&(n=Math.max(l(e.parentNode.querySelectorAll("section")).indexOf(e),0))}return{h:t,v:n}}function R(){if(document.querySelector(ht+".present")){var e=m(document.querySelectorAll(ht+".present .fragment:not(.visible)"));if(e.length)return e[0].classList.add("visible"),f("fragmentshown",{fragment:e[0]}),!0}else{var t=m(document.querySelectorAll(pt+".present .fragment:not(.visible)"));if(t.length)return t[0].classList.add("visible"),f("fragmentshown",{fragment:t[0]}),!0}return!1}function U(){if(document.querySelector(ht+".present")){var e=m(document.querySelectorAll(ht+".present .fragment.visible"));if(e.length)return e[e.length-1].classList.remove("visible"),f("fragmenthidden",{fragment:e[e.length-1]}),!0}else{var t=m(document.querySelectorAll(pt+".present .fragment.visible"));if(t.length)return t[t.length-1].classList.remove("visible"),f("fragmenthidden",{fragment:t[t.length-1]}),!0}return!1}function I(){clearTimeout(kt),!gt||M()||x()||(kt=setTimeout(X,gt))}function z(){clearTimeout(kt)}function B(){D().left&&(x()||U()===!1)&&A(yt-1)}function F(){D().right&&(x()||R()===!1)&&A(yt+1)}function Y(){(D().up&&x()||U()===!1)&&A(yt,bt-1)}function _(){(D().down&&x()||R()===!1)&&A(yt,bt+1)}function W(){if(U()===!1)if(D().up)Y();else{var e=document.querySelector(pt+".past:nth-child("+yt+")");e&&(bt=e.querySelectorAll("section").length+1||void 0,yt--,A())}}function X(){R()===!1&&(D().down?_():F()),I()}function H(e){document.activeElement;var t=!(!document.activeElement||!document.activeElement.type&&!document.activeElement.href&&"inherit"===document.activeElement.contentEditable);if(!(t||e.shiftKey||e.altKey||e.ctrlKey||e.metaKey)){var n=!0;if(M()&&-1===[66,190,191].indexOf(e.keyCode))return!1;switch(e.keyCode){case 80:case 33:W();break;case 78:case 34:X();break;case 72:case 37:B();break;case 76:case 39:F();break;case 75:case 38:Y();break;case 74:case 40:_();break;case 36:A(0);break;case 35:A(Number.MAX_VALUE);break;case 32:x()?w():X();break;case 13:x()?w():n=!1;break;case 66:case 190:case 191:k();break;case 70:L();break;default:n=!1}n?e.preventDefault():27===e.keyCode&&Lt&&(E(),e.preventDefault()),I()}}function Q(e){Pt.startX=e.touches[0].clientX,Pt.startY=e.touches[0].clientY,Pt.startCount=e.touches.length,2===e.touches.length&&vt.overview&&(Pt.startSpan=u({x:e.touches[1].clientX,y:e.touches[1].clientY},{x:Pt.startX,y:Pt.startY}))}function $(e){if(Pt.handled)navigator.userAgent.match(/android/gi)&&e.preventDefault();else{var t=e.touches[0].clientX,n=e.touches[0].clientY;if(2===e.touches.length&&2===Pt.startCount&&vt.overview){var r=u({x:e.touches[1].clientX,y:e.touches[1].clientY},{x:Pt.startX,y:Pt.startY});Math.abs(Pt.startSpan-r)>Pt.threshold&&(Pt.handled=!0,Pt.startSpan>r?b():w()),e.preventDefault()}else if(1===e.touches.length&&2!==Pt.startCount){var i=t-Pt.startX,o=n-Pt.startY;i>Pt.threshold&&Math.abs(i)>Math.abs(o)?(Pt.handled=!0,B()):-Pt.threshold>i&&Math.abs(i)>Math.abs(o)?(Pt.handled=!0,F()):o>Pt.threshold?(Pt.handled=!0,Y()):-Pt.threshold>o&&(Pt.handled=!0,_()),e.preventDefault()}}}function K(){Pt.handled=!1}function G(e){e.pointerType===e.MSPOINTER_TYPE_TOUCH&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],Q(e))}function Z(e){e.pointerType===e.MSPOINTER_TYPE_TOUCH&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],$(e))}function J(e){e.pointerType===e.MSPOINTER_TYPE_TOUCH&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],K(e))}function V(e){clearTimeout(qt),qt=setTimeout(function(){var t=e.detail||-e.wheelDelta;t>0?X():W()},100)}function et(e){e.preventDefault();var t=l(document.querySelectorAll(pt)).length,n=Math.floor(e.clientX/xt.wrapper.offsetWidth*t);A(n)}function tt(e){e.preventDefault(),B()}function nt(e){e.preventDefault(),F()}function rt(e){e.preventDefault(),Y()}function it(e){e.preventDefault(),_()}function ot(e){e.preventDefault(),W()}function at(e){e.preventDefault(),X()}function st(){j()}function ct(){v()}function lt(e){if(Ot&&x()){e.preventDefault();for(var t=e.target;t&&!t.nodeName.match(/section/gi);)t=t.parentNode;if(t&&!t.classList.contains("disabled")&&(w(),t.nodeName.match(/section/gi))){var n=parseInt(t.getAttribute("data-index-h"),10),r=parseInt(t.getAttribute("data-index-v"),10);A(n,r)}}}var ut,dt,ft=".reveal .slides section",pt=".reveal .slides>section",ht=".reveal .slides>section.present>section",mt=".reveal .slides>section:first-child",vt={width:960,height:700,margin:.1,minScale:.2,maxScale:1,controls:!0,progress:!0,history:!1,keyboard:!0,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,autoSlide:0,mouseWheel:!1,rollingLinks:!0,theme:null,transition:"default",dependencies:[]},gt=0,yt=0,bt=0,wt=[],Et=1,xt={},Lt="WebkitPerspective"in document.body.style||"MozPerspective"in document.body.style||"msPerspective"in document.body.style||"OPerspective"in document.body.style||"perspective"in document.body.style,St="WebkitTransform"in document.body.style||"MozTransform"in document.body.style||"msTransform"in document.body.style||"OTransform"in document.body.style||"transform"in document.body.style,qt=0,kt=0,Mt=0,At=0,Tt=0,Ot=!1,Pt={startX:0,startY:0,startSpan:0,startCount:0,handled:!1,threshold:80};return{initialize:e,configure:o,slide:A,left:B,right:F,up:Y,down:_,prev:W,next:X,prevFragment:U,nextFragment:R,navigateTo:A,navigateLeft:B,navigateRight:F,navigateUp:Y,navigateDown:_,navigatePrev:W,navigateNext:X,layout:v,toggleOverview:E,togglePause:k,isOverview:x,isPaused:M,addEventListeners:a,removeEventListeners:s,getIndices:N,getSlide:function(e,t){var n=document.querySelectorAll(pt)[e],r=n&&n.querySelectorAll("section");return t!==void 0?r?r[t]:void 0:n},getPreviousSlide:function(){return ut},getCurrentSlide:function(){return dt},getScale:function(){return Et},getConfig:function(){return vt},getQueryHash:function(){var e={};return location.search.replace(/[A-Z0-9]+?=(\w*)/gi,function(t){e[t.split("=").shift()]=t.split("=").pop()}),e},isFirstSlide:function(){return null==document.querySelector(ft+".past")?!0:!1},isLastSlide:function(){return dt&&dt.classList.contains(".stack")?null==dt.querySelector(ft+".future")?!0:!1:null==document.querySelector(ft+".future")?!0:!1},addEventListener:function(e,t,n){"addEventListener"in window&&(xt.wrapper||document.querySelector(".reveal")).addEventListener(e,t,n)},removeEventListener:function(e,t,n){"addEventListener"in window&&(xt.wrapper||document.querySelector(".reveal")).removeEventListener(e,t,n)}}}();define("reveal",["head"],function(e){return function(){var t;return t||e.Reveal}}(this)),require(["reveal"],function(e){e.initialize({controls:!0,progress:!0,history:!0,center:!0,theme:"default",transition:"default",dependencies:[{src:"../../components/reveal.js/plugin/notes/notes.js",async:!0,condition:function(){return!!document.body.classList}}]})}),define("main",function(){});
//@ sourceMappingURL=main.js.map