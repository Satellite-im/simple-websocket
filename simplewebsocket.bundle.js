!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.SimpleWebsocket=e()}}(function(){return function e(t,n,r){function s(o,h){if(!n[o]){if(!t[o]){var u="function"==typeof require&&require;if(!h&&u)return u(o,!0);if(i)return i(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({"./":[function(e,t){function n(e,t){return this instanceof n?(r.call(this),t||(t={}),this._url=e,this._reconnect=void 0!==t.reconnect?t.reconnect:o,void this._init()):new n(e,t)}t.exports=n;var r=e("events").EventEmitter,s=e("inherits"),i=e("once"),o=5e3;s(n,r),n.prototype.send=function(e){this._ws&&this._ws.readyState===WebSocket.OPEN&&("object"==typeof e&&(e=JSON.stringify(e)),this._ws.send(e))},n.prototype.destroy=function(e){e&&this.once("close",e);try{this._ws.close()}catch(t){this._onclose()}},n.prototype._init=function(){this._errored=!1,this._ws=new WebSocket(this._url),this._ws.onopen=this._onopen.bind(this),this._ws.onmessage=this._onmessage.bind(this),this._ws.onclose=this._onclose.bind(this),this._ws.onerror=i(this._onerror.bind(this))},n.prototype._onopen=function(){this.emit("ready")},n.prototype._onerror=function(e){this._errored=!0,this.destroy(),this._reconnect?(this._timeout=setTimeout(this._init.bind(this),this._reconnect),this.emit("warning",e)):this.emit("error",e)},n.prototype._onmessage=function(e){var t=e.data;try{t=JSON.parse(e.data)}catch(n){}this.emit("message",t)},n.prototype._onclose=function(){clearTimeout(this._timeout),this._ws&&(this._ws.onopen=null,this._ws.onerror=null,this._ws.onmessage=null,this._ws.onclose=null),this._ws=null,this._errored||this.emit("close")}},{events:1,inherits:2,once:4}],1:[function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function s(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function o(e){return void 0===e}t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!s(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,s,h,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length))throw t=arguments[1],t instanceof Error?t:TypeError('Uncaught, unspecified "error" event.');if(n=this._events[e],o(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(s=arguments.length,h=new Array(s-1),u=1;s>u;u++)h[u-1]=arguments[u];n.apply(this,h)}else if(i(n)){for(s=arguments.length,h=new Array(s-1),u=1;s>u;u++)h[u-1]=arguments[u];for(c=n.slice(),s=c.length,u=0;s>u;u++)c[u].apply(this,h)}return!0},n.prototype.addListener=function(e,t){var s;if(!r(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned){var s;s=o(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,s&&s>0&&this._events[e].length>s&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),s||(s=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var s=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,s,o,h;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],o=n.length,s=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(n)){for(h=o;h-->0;)if(n[h]===t||n[h].listener&&n[h].listener===t){s=h;break}if(0>s)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(s,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?r(e._events[t])?1:e._events[t].length:0}},{}],2:[function(e,t){t.exports="function"==typeof Object.create?function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],3:[function(e,t){function n(e,t){function r(){for(var t=new Array(arguments.length),n=0;n<t.length;n++)t[n]=arguments[n];var r=e.apply(this,t),s=t[t.length-1];return"function"==typeof r&&r!==s&&Object.keys(s).forEach(function(e){r[e]=s[e]}),r}if(e&&t)return n(e)(t);if("function"!=typeof e)throw new TypeError("need wrapper function");return Object.keys(e).forEach(function(t){r[t]=e[t]}),r}t.exports=n},{}],4:[function(e,t){function n(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}var r=e("wrappy");t.exports=r(n),n.proto=n(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return n(this)},configurable:!0})})},{wrappy:3}]},{},[])("./")});