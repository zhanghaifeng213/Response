/*!
 * VERSION: 1.16.1
 * DATE: 2015-03-13
 * UPDATES AND DOCS AT: http://greensock.com
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},r=function(t,e,s){i.call(this,t,e,s),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=r.prototype.render},n=1e-10,a=i._internals,o=a.isSelector,h=a.isArray,l=r.prototype=i.to({},.1,{}),_=[];r.version="1.16.1",l.constructor=r,l.kill()._gc=!1,r.killTweensOf=r.killDelayedCallsTo=i.killTweensOf,r.getTweensOf=i.getTweensOf,r.lagSmoothing=i.lagSmoothing,r.ticker=i.ticker,r.render=i.render,l.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),i.prototype.invalidate.call(this)},l.updateTo=function(t,e){var s,r=this.ratio,n=this.vars.immediateRender||t.immediateRender;e&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(s in t)this.vars[s]=t[s];if(this._initted||n)if(e)this._initted=!1,n&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&i._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var a=this._time;this.render(0,!0,!1),this._initted=!1,this.render(a,!0,!1)}else if(this._time>0||n){this._initted=!1,this._init();for(var o,h=1/(1-r),l=this._firstPT;l;)o=l.s+l.c,l.c*=h,l.s=o-l.c,l=l._next}return this},l.render=function(t,e,i){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var s,r,o,h,l,u,p,f,c=this._dirty?this.totalDuration():this._totalDuration,m=this._time,d=this._totalTime,g=this._cycle,v=this._duration,y=this._rawPrevTime;if(t>=c?(this._totalTime=c,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=v,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(s=!0,r="onComplete",i=i||this._timeline.autoRemoveChildren),0===v&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>y||y===n)&&y!==t&&(i=!0,y>n&&(r="onReverseComplete")),this._rawPrevTime=f=!e||t||y===t?t:n)):1e-7>t?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==d||0===v&&y>0)&&(r="onReverseComplete",s=this._reversed),0>t&&(this._active=!1,0===v&&(this._initted||!this.vars.lazy||i)&&(y>=0&&(i=!0),this._rawPrevTime=f=!e||t||y===t?t:n)),this._initted||(i=!0)):(this._totalTime=this._time=t,0!==this._repeat&&(h=v+this._repeatDelay,this._cycle=this._totalTime/h>>0,0!==this._cycle&&this._cycle===this._totalTime/h&&this._cycle--,this._time=this._totalTime-this._cycle*h,this._yoyo&&0!==(1&this._cycle)&&(this._time=v-this._time),this._time>v?this._time=v:0>this._time&&(this._time=0)),this._easeType?(l=this._time/v,u=this._easeType,p=this._easePower,(1===u||3===u&&l>=.5)&&(l=1-l),3===u&&(l*=2),1===p?l*=l:2===p?l*=l*l:3===p?l*=l*l*l:4===p&&(l*=l*l*l*l),this.ratio=1===u?1-l:2===u?l:.5>this._time/v?l/2:1-l/2):this.ratio=this._ease.getRatio(this._time/v)),m===this._time&&!i&&g===this._cycle)return d!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||_)),void 0;if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=m,this._totalTime=d,this._rawPrevTime=y,this._cycle=g,a.lazyTweens.push(this),this._lazy=[t,e],void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/v):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==m&&t>=0&&(this._active=!0),0===d&&(2===this._initted&&t>0&&this._init(),this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===v)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||_))),o=this._firstPT;o;)o.f?o.t[o.p](o.c*this.ratio+o.s):o.t[o.p]=o.c*this.ratio+o.s,o=o._next;this._onUpdate&&(0>t&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||(this._totalTime!==d||s)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||_)),this._cycle!==g&&(e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||_)),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||_),0===v&&this._rawPrevTime===n&&f!==n&&(this._rawPrevTime=0))},r.to=function(t,e,i){return new r(t,e,i)},r.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new r(t,e,i)},r.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new r(t,e,s)},r.staggerTo=r.allTo=function(t,e,n,a,l,u,p){a=a||0;var f,c,m,d,g=n.delay||0,v=[],y=function(){n.onComplete&&n.onComplete.apply(n.onCompleteScope||this,arguments),l.apply(p||this,u||_)};for(h(t)||("string"==typeof t&&(t=i.selector(t)||t),o(t)&&(t=s(t))),t=t||[],0>a&&(t=s(t),t.reverse(),a*=-1),f=t.length-1,m=0;f>=m;m++){c={};for(d in n)c[d]=n[d];c.delay=g,m===f&&l&&(c.onComplete=y),v[m]=new r(t[m],e,c),g+=a}return v},r.staggerFrom=r.allFrom=function(t,e,i,s,n,a,o){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,r.staggerTo(t,e,i,s,n,a,o)},r.staggerFromTo=r.allFromTo=function(t,e,i,s,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,r.staggerTo(t,e,s,n,a,o,h)},r.delayedCall=function(t,e,i,s,n){return new r(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,useFrames:n,overwrite:0})},r.set=function(t,e){return new r(t,0,e)},r.isTweening=function(t){return i.getTweensOf(t,!0).length>0};var u=function(t,e){for(var s=[],r=0,n=t._first;n;)n instanceof i?s[r++]=n:(e&&(s[r++]=n),s=s.concat(u(n,e)),r=s.length),n=n._next;return s},p=r.getAllTweens=function(e){return u(t._rootTimeline,e).concat(u(t._rootFramesTimeline,e))};r.killAll=function(t,i,s,r){null==i&&(i=!0),null==s&&(s=!0);var n,a,o,h=p(0!=r),l=h.length,_=i&&s&&r;for(o=0;l>o;o++)a=h[o],(_||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&(t?a.totalTime(a._reversed?0:a.totalDuration()):a._enabled(!1,!1))},r.killChildTweensOf=function(t,e){if(null!=t){var n,l,_,u,p,f=a.tweenLookup;if("string"==typeof t&&(t=i.selector(t)||t),o(t)&&(t=s(t)),h(t))for(u=t.length;--u>-1;)r.killChildTweensOf(t[u],e);else{n=[];for(_ in f)for(l=f[_].target.parentNode;l;)l===t&&(n=n.concat(f[_].tweens)),l=l.parentNode;for(p=n.length,u=0;p>u;u++)e&&n[u].totalTime(n[u].totalDuration()),n[u]._enabled(!1,!1)}}};var f=function(t,i,s,r){i=i!==!1,s=s!==!1,r=r!==!1;for(var n,a,o=p(r),h=i&&s&&r,l=o.length;--l>-1;)a=o[l],(h||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&a.paused(t)};return r.pauseAll=function(t,e,i){f(!0,t,e,i)},r.resumeAll=function(t,e,i){f(!1,t,e,i)},r.globalTimeScale=function(e){var s=t._rootTimeline,r=i.ticker.time;return arguments.length?(e=e||n,s._startTime=r-(r-s._startTime)*s._timeScale/e,s=t._rootFramesTimeline,r=i.ticker.frame,s._startTime=r-(r-s._startTime)*s._timeScale/e,s._timeScale=t._rootTimeline._timeScale=e,e):s._timeScale},l.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},l.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},l.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},l.duration=function(e){return arguments.length?t.prototype.duration.call(this,e):this._duration},l.totalDuration=function(t){return arguments.length?-1===this._repeat?this:this.duration((t-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},l.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},l.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},l.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},r},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],h(i)&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));h(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,n=i._internals,a=s._internals={},o=n.isSelector,h=n.isArray,l=n.lazyTweens,_=n.lazyRender,u=[],p=_gsScope._gsDefine.globals,f=function(t){var e,i={};for(e in t)i[e]=t[e];return i},c=a.pauseCallback=function(t,e,i,s){var n,a=t._timeline,o=a._totalTime,h=t._startTime,l=0>t._rawPrevTime||0===t._rawPrevTime&&a._reversed,_=l?0:r,p=l?r:0;if(e||!this._forcingPlayhead){for(a.pause(h),n=t._prev;n&&n._startTime===h;)n._rawPrevTime=p,n=n._prev;for(n=t._next;n&&n._startTime===h;)n._rawPrevTime=_,n=n._next;e&&e.apply(s||a,i||u),(this._forcingPlayhead||!a._paused)&&a.seek(o)}},m=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},d=s.prototype=new e;return s.version="1.16.1",d.constructor=s,d.kill()._gc=d._forcingPlayhead=!1,d.to=function(t,e,s,r){var n=s.repeat&&p.TweenMax||i;return e?this.add(new n(t,e,s),r):this.set(t,s,r)},d.from=function(t,e,s,r){return this.add((s.repeat&&p.TweenMax||i).from(t,e,s),r)},d.fromTo=function(t,e,s,r,n){var a=r.repeat&&p.TweenMax||i;return e?this.add(a.fromTo(t,e,s,r),n):this.set(t,r,n)},d.staggerTo=function(t,e,r,n,a,h,l,_){var u,p=new s({onComplete:h,onCompleteParams:l,onCompleteScope:_,smoothChildTiming:this.smoothChildTiming});for("string"==typeof t&&(t=i.selector(t)||t),t=t||[],o(t)&&(t=m(t)),n=n||0,0>n&&(t=m(t),t.reverse(),n*=-1),u=0;t.length>u;u++)r.startAt&&(r.startAt=f(r.startAt)),p.to(t[u],e,f(r),u*n);return this.add(p,a)},d.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},d.staggerFromTo=function(t,e,i,s,r,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,h)},d.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},d.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},d.add=function(r,n,a,o){var l,_,u,p,f,c;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&h(r)){for(a=a||"normal",o=o||0,l=n,_=r.length,u=0;_>u;u++)h(p=r[u])&&(p=new s({tweens:p})),this.add(p,l),"string"!=typeof p&&"function"!=typeof p&&("sequence"===a?l=p._startTime+p.totalDuration()/p._timeScale:"start"===a&&(p._startTime-=p.delay())),l+=o;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(f=this,c=f.rawTime()>r._startTime;f._timeline;)c&&f._timeline.smoothChildTiming?f.totalTime(f._totalTime,!0):f._gc&&f._enabled(!0,!1),f=f._timeline;return this},d.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&h(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},d._remove=function(t,i){e.prototype._remove.call(this,t,i);var s=this._last;return s?this._time>s._startTime+s._totalDuration/s._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},d.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},d.insert=d.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},d.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},d.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},d.addPause=function(t,e,s,r){var n=i.delayedCall(0,c,["{self}",e,s,r],this);return n.data="isPause",this.add(n,t)},d.removeLabel=function(t){return delete this._labels[t],this},d.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},d._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&h(r)))for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},d.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},d.stop=function(){return this.paused(!0)},d.gotoAndPlay=function(t,e){return this.play(t,e)},d.gotoAndStop=function(t,e){return this.pause(t,e)},d.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,h,p=this._dirty?this.totalDuration():this._totalDuration,f=this._time,c=this._startTime,m=this._timeScale,d=this._paused;if(t>=p)this._totalTime=this._time=p,this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",h=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(h=!0,this._rawPrevTime>r&&(o="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=p+1e-4;else if(1e-7>t)if(this._totalTime=this._time=0,(0!==f||0===this._duration&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(o="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(h=n=!0,o="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(h=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,0===t&&n)for(s=this._first;s&&0===s._startTime;)s._duration||(n=!1),s=s._next;t=0,this._initted||(h=!0)}else this._totalTime=this._time=this._rawPrevTime=t;if(this._time!==f&&this._first||i||h){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==f&&t>0&&(this._active=!0),0===f&&this.vars.onStart&&0!==this._time&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||u)),this._time>=f)for(s=this._first;s&&(a=s._next,!this._paused||d);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||d);)(s._active||f>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;this._onUpdate&&(e||(l.length&&_(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||u))),o&&(this._gc||(c===this._startTime||m!==this._timeScale)&&(0===this._time||p>=this.totalDuration())&&(n&&(l.length&&_(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this.vars[o].apply(this.vars[o+"Scope"]||this,this.vars[o+"Params"]||u)))}},d._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},d.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},d.getTweensOf=function(t,e){var s,r,n=this._gc,a=[],o=0;for(n&&this._enabled(!0,!0),s=i.getTweensOf(t),r=s.length;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(a[o++]=s[r]);return n&&this._enabled(!1,!0),a},d.recent=function(){return this._recent},d._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},d.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},d._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},d.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},d.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},d._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},d.totalTime=function(){this._forcingPlayhead=!0;var e=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},d.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},d.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},d.paused=function(e){if(!e)for(var i=this._first,s=this._time;i;)i._startTime===s&&"isPause"===i.data&&(i._rawPrevTime=0),i=i._next;return t.prototype.paused.apply(this,arguments)},d.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},d.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0),_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(t,e,i){var s=function(e){t.call(this,e),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},r=1e-10,n=[],a=e._internals,o=a.lazyTweens,h=a.lazyRender,l=new i(null,null,1,0),_=s.prototype=new t;return _.constructor=s,_.kill()._gc=!1,s.version="1.16.1",_.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),t.prototype.invalidate.call(this)},_.addCallback=function(t,i,s,r){return this.add(e.delayedCall(0,t,s,r),i)},_.removeCallback=function(t,e){if(t)if(null==e)this._kill(null,t);else for(var i=this.getTweensOf(t,!1),s=i.length,r=this._parseTimeOrLabel(e);--s>-1;)i[s]._startTime===r&&i[s]._enabled(!1,!1);return this},_.removePause=function(e){return this.removeCallback(t._internals.pauseCallback,e)},_.tweenTo=function(t,i){i=i||{};var s,r,a,o={ease:l,useFrames:this.usesFrames(),immediateRender:!1};for(r in i)o[r]=i[r];return o.time=this._parseTimeOrLabel(t),s=Math.abs(Number(o.time)-this._time)/this._timeScale||.001,a=new e(this,s,o),o.onStart=function(){a.target.paused(!0),a.vars.time!==a.target.time()&&s===a.duration()&&a.duration(Math.abs(a.vars.time-a.target.time())/a.target._timeScale),i.onStart&&i.onStart.apply(i.onStartScope||a,i.onStartParams||n)},a},_.tweenFromTo=function(t,e,i){i=i||{},t=this._parseTimeOrLabel(t),i.startAt={onComplete:this.seek,onCompleteParams:[t],onCompleteScope:this},i.immediateRender=i.immediateRender!==!1;var s=this.tweenTo(e,i);return s.duration(Math.abs(s.vars.time-t)/this._timeScale||.001)},_.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,a,l,_,u,p,f=this._dirty?this.totalDuration():this._totalDuration,c=this._duration,m=this._time,d=this._totalTime,g=this._startTime,v=this._timeScale,y=this._rawPrevTime,T=this._paused,w=this._cycle;if(t>=f)this._locked||(this._totalTime=f,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(a=!0,_="onComplete",u=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>y||y===r)&&y!==t&&this._first&&(u=!0,y>r&&(_="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,this._yoyo&&0!==(1&this._cycle)?this._time=t=0:(this._time=c,t=c+1e-4);else if(1e-7>t)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==m||0===c&&y!==r&&(y>0||0>t&&y>=0)&&!this._locked)&&(_="onReverseComplete",a=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(u=a=!0,_="onReverseComplete"):y>=0&&this._first&&(u=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=c||!e||t||this._rawPrevTime===t?t:r,0===t&&a)for(s=this._first;s&&0===s._startTime;)s._duration||(a=!1),s=s._next;t=0,this._initted||(u=!0)}else 0===c&&0>y&&(u=!0),this._time=this._rawPrevTime=t,this._locked||(this._totalTime=t,0!==this._repeat&&(p=c+this._repeatDelay,this._cycle=this._totalTime/p
;(function($) {

	'use strict';

	var
		ua = navigator.userAgent,
		div = document.createElement('div'),

		ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),

		prefix = ['Webkit', 'Moz', 'O'],
		transition = 'transition',
		transform = 'transform',
		requestanimationframe = 'requestAnimationFrame',
		cancelanimationframe = 'CancelAnimationFrame',

		transforms = {
			translate3d: 'translate3d(0px, 0px, 0px)',
			translate: 'translate(0px, 0px)',
			scale3d: 'scale3d(1, 1, 1)',
			scale: 'scale(1, 1)'
		},

		browser = $.browser,
		support = $.support,
		version, i;


	if ( !browser ) {
		$.browser = browser = {};
	}
	browser.local = !(/^http:\/\//).test(location.href);
	browser.firefox = (/firefox/i).test(ua);
	browser.webkit = (/applewebkit/i).test(ua);
	browser.chrome = (/chrome/i).test(ua);
	browser.opera = (/opera/i).test(ua);
	browser.ios = (/ip(ad|hone|od)/i).test(ua);
	browser.crios = (/crios/i).test(ua);
	browser.android = (/android/i).test(ua);
	browser.safari = browser.webkit && !browser.chrome;

	support.touch = browser.ios || browser.android || (document.ontouchstart !== undefined && document.ontouchstart !== null);
	browser.mobile = support.touch && ( browser.ios || browser.android );

	for ( i in browser ) {
		if( !browser[i] ) {
			delete browser[i];
		}
	}
	browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
	browser.os = ( browser.os )? browser.os[1].toLowerCase() : '';

	if ( browser.ios || browser.android ) {
		version = ua.match(/applewebkit\/([0-9.]+)/i);
		if ( version && version.length > 1 ) {
			browser.webkitversion = version[1];
		}
		if ( browser.ios ) {
			version = ua.match(/version\/([0-9.]+)/i);
			if ( version && version.length > 1 ) {
				browser.ios = version[1];
			}
		} else if ( browser.android ) {
			version = ua.match(/android ([0-9.]+)/i);
			if ( version && version.length > 1 ) {
				browser.android = parseInt(version[1].replace(/\./g, ''));
			}
		}
	}

	support.svgimage = true;
	support.pointerevents = true;
	if ( ie ) {
		browser.ie = ie = parseInt( ie[1] || ie[2] );
		if ( 9 > ie ) {
			browser.oldie = true;
		} else if ( 9 == ie ) {
			prefix.push('ms');
		}
		if ( 11 > ie ) {
			support.pointerevents = false;
		}
		if ( 9 > ie ) {
			support.svgimage = false;
		}
	}

	support.pushstate = !!history.pushState;
	support.mediaquery = typeof(window.matchMedia) == 'function' || !browser.oldie;
	support.video = document.createElement('video').canPlayType !== undefined;
	support.backgroundsize = 'backgroundSize' in div.style;
	if ( support.backgroundsize ) {
		div.style.backgroundSize = 'cover';
		support.backgroundsize = div.style.backgroundSize == 'cover';
	}
	try {
		div.style.background = 'rgba(0, 0, 0, 0)';
		support.rgba = div.style.background == 'rgba(0, 0, 0, 0)';
	} catch(e) {
		support.rgba = false;
	}
	support.canvas = document.createElement('canvas');
	support.canvas = support.canvas.getContext && support.canvas.getContext('2d');

	if ( div.style[transform] != undefined ) {
		support.transform = transform;
	} else {
		transform = 'Transform';
		for ( i = 0; i < 4; i++ ) {
			if ( div.style[prefix[i]+transform] !== undefined ) {
				support.transform = prefix[i]+transform;
				break;
			}
		}
	}
	if ( support.transform ) {
		transform = support.transform;
		for ( i in transforms ) {
			div.style[transform] = '';
			div.style[transform] = transforms[i];
			support[i] = div.style[transform];
		}
		if ( browser.ie && 10 > browser.ie ) {
		}
		if ( browser.android && 430 > browser.android ) {
		}
	}
	if ( div.style[transition] != undefined ) {
		support.transition = transition;
	} else {
		transition = 'Transition';
		for ( i = 0; i < 4; i++ ) {
			if ( div.style[prefix[i]+transition] !== undefined ) {
				support.transition = prefix[i]+transition;
				break;
			}
		}
	}
	if ( window[requestanimationframe] ) {
		support.requestanimationframe = true;
	} else {
		requestanimationframe = 'RequestAnimationFrame';
		for ( i = 0; i < 4; i++ ) {
			if ( window[prefix[i]+requestanimationframe] !== undefined ) {
				window.requestAnimationFrame = window[prefix[i]+requestanimationframe];
				window.cancelAnimationFrame = window[prefix[i]+cancelanimationframe];
				support.requestanimationframe = true;
				break;
			}
		}
	}
	if ( !support.requestanimationframe ) {
		window.requestAnimationFrame = (function() {
			var lasttime = 0;
			return function(callback) {
				var currenttime = gettime();
				var timetocall = Math.max(0, 16-(currenttime-lasttime));
				lasttime = currenttime+timetocall;
				return setTimeout(function() { callback(currenttime+timetocall); }, timetocall);
			}
		})();
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		}
	}
	$._cookie = {
		set: function(name, value, term, path, domain) {
			var cookieset = name + '=' + value + ';',
				expdate;
			if ( term ) {
				expdate = new Date();
				expdate.setTime( expdate.getTime()+term*1000*60*60*24 ); // term 1 is a day
				cookieset += 'expires=' + expdate.toGMTString() + ';';
			}
			if ( path ) {
				cookieset += 'path=' + path + ';';
			}
			if ( domain ) {
				cookieset += 'domain=' + domain + ';';
			}
			document.cookie = cookieset;
		},
		get: function(name) {
			var match = ( document.cookie || ' ' ).match( new RegExp(name+' *= *([^;]+)') );
			return ( match )? match[1] : null;
		}
	};
	$._query = {
		parse: (function() {
			var matches, i, max;
			function resetdata(v) {
				if ( v ) {
					v = decodeURIComponent(v).replace(/\+/g, ' ');
					if ( v.indexOf(',') != -1 ) {
						v = v.split(',');
						for ( i = 0, max = v.length; i < max; i++ ) {
							v[i] = resetdata(v[i]);
						}
					} else if ( expint.test(v) ) {
						v = parseFloat(v);
					}
				}
				return v;
			}
			return function(query) {
				var rv = {};
				query = ( (/^#/).test(query) )? query.substring(query.lastIndexOf('#')+1)
						: ( !query || (/\?/).test(query) )? ( query || location.href ).split('?')[1]
						: query;
				if ( query ) {
					query = query.split('#')[0];
					while ( matches = expqueries.exec(query) ) {
						rv[matches[1]] = resetdata(matches[2]);
					}
					return rv;
				} else {
					return false;
				}
			}
		})(),
		make: function(data) {
			var key, newdata, datatype = typeof(data);
			if ( datatype == 'string' ) {
				return data;
			} else if ( datatype == 'object' ) {
				newdata = [];
				for ( key in data ) {
					newdata.push( key +'='+ encodeURIComponent(data[key]));
				}
				return newdata.join('&');
			}
		}
	};
/*
* easings.
* Convert to JS from "Robert Penner's Easing Functions" http://www.robertpenner.com/easing/
*/
	var easings = {
			linear : function(t,b,c,d){return c*t/d+b;},
			easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
			easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
			easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
			easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
			easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
			easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
			easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
			easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
			easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
			easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
			easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
			easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
			easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
			easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
			easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
			easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
			easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
			easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
			easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
			easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
			easeInExpo : function(t,b,c,d){return (t==0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
			easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
			easeInOutExpo : function(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
			easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
			easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
			easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
			easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
			easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},
			easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
			easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
			easeInOutElastic : function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
			easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
			easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
			easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
			easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
			easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},
			easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
			easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
			easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
			easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
		},
		easing,
/*
* css transition cubic-bezier
* from "Ceaser - CSS Easing Animation Tool - Matthew Lein" http://matthewlein.com/ceaser/
*/
		cubicbeziers = {
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			'ease-in': '0.420, 0.000, 1.000, 1.000',
			'ease-out': '0.000, 0.000, 0.580, 1.000',
			'ease-in-out': '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		};

	for ( easing in easings ) {
		$.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			}
		})(easing);
	}
	var
		poorbrowser = browser.ie && 9 > browser.ie,

		expint = /^-?[0-9\.]+$/,
		exprgb = /rgba?\(/,
		expisbody = /body/i,
		expiscolor = /color/i,
		expgetrgb = /rgba?\(([0-9]+), *([0-9]+), *([0-9]+)/,
		expqueries = /([^=&]+)=?([^=&]*)/g,

		transitionname = support.transition,
		transitionable = !!transitionname,
		transitionendnames = 'transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd msTransitionEnd',

		gettime = function() {
			return new Date().getTime();
		},

		isobject = $.isPlainObject,

		color = {
			getcode: function(target, property) {
				return this.tohex.apply( null, this.torgb( target, property, style.get(target, property) ) );
			},
			torgb: function(target, property, v) {
				var temp;
				if ( v == 'transparent' || v == 'rgba(0, 0, 0, 0)' ) {
					while ( !expisbody.test(target.nodeName) ) {
						target = target.parentNode;
						temp = style.get(target, property);
						if ( temp != 'transparent' && temp != 'rgba(0, 0, 0, 0)' ) {
							return this.torgb(target, property, temp);
						}
					}
					return [ 255, 255, 255 ];
				} else if ( v.match(exprgb) ) {
					v = v.match(expgetrgb);
					return [ parseInt(v[1]), parseInt(v[2]), parseInt(v[3]) ];
				} else {
					if ( v.length>5 ) {
						v = [ v.substr(1, 2), v.substr(3, 2), v.substr(5, 2) ];
					} else {
						v = [ v.substr(1, 1), v.substr(2, 1), v.substr(3, 1) ];
						v = [ v[0]+v[0], v[1]+v[1], v[2]+v[2] ];
					}
					return [
						parseInt( ( eval('0x'+v[0]) ).toString(10) ),
						parseInt( ( eval('0x'+v[1]) ).toString(10) ),
						parseInt( ( eval('0x'+v[2]) ).toString(10) )
					];
				}
			},
			tohex: function() {
				var temp, i = 0, rv = '';
				for ( ; i < 3; i++ ) {
					temp = Math.max( Math.min(255, arguments[i]), 0 ).toString(16);
					rv += ( 2 > temp.length )? '0'+temp : temp;
				}
				return '#'+rv;
			}
		},

		style = (function() {

			var
				supporttransform = support.transform,
				transforms = ['translate3d', 'translate', 'scale3d', 'scale', 'skew', 'skewX', 'skewY', 'rotate', 'rotateX', 'rotateY', 'rotateZ'],
				nex = '[e0-9\-\.]+', pxex = '(?:px)?', vex = '(?:(?:px|deg))?', xyzex = /(X|Y|Z)$/,
				expressions = {
					isxyztarget: /^(scale|scale3d|translate|translate3d)$/,
					nopx: /(zIndex)/
				},
				is3dtransform = /3d/, istranslate = /^translate/,
				isscale = /^scale/, isrotate = /^rotate/,
				isx = /X$/, isy = /Y$/,
				isstupidbrowser = browser.ie == 9,
				i = 0, max = transforms.length;

			for ( ; i < max; i++ ) {
				expressions[transforms[i]] = [
					new RegExp(transforms[i] + '\\(('+ nex +')'+ vex +'(?:, ('+ nex +')'+ vex +'(?:, ('+ nex +')'+ vex +')?)?'),
					new RegExp('('+transforms[i] + '\\()'+ nex + vex)
				];
				if ( !isrotate.test(transforms[i]) ) {
					expressions[transforms[i]][2] = new RegExp('('+transforms[i] + '\\('+ nex + vex +', )'+ nex + vex),
					expressions[transforms[i]][3] = new RegExp('('+transforms[i] + '\\('+ nex + vex +', '+ nex + vex +', )'+ nex + vex);
				}
			}

			function istransform(property) {
				property = css3(property);
				if ( (/^(matrix|translate|scale|rotate|skew|perspective)/).test(property) ) {
					return true;
				}
				return false;
			}

			function isxyztarget(property) {
				var check = property.match(expressions.isxyztarget);
				return ( check )? check[1] : false;
			}

			function issvg(target) {
				return window.SVGElement && target instanceof SVGElement;
			}

			function css3(property) {
				if ( istranslate.test(property) ) {
					if ( !support.translate ) {
						return (/X$/).test(property)? 'left' : 'top';
					} else if ( is3dtransform.test(property) && !support.translate3d ) {
						return property.replace('3d', '');
					}
				} else if ( isscale.test(property) ) {
					if ( is3dtransform.test(property) && !support.scale3d ) {
						return property.replace('3d', '');
					}
				}
				return property;
			}

			function ie9scale(target, property, value) {
				var temp = target.style[supporttransform].match(expressions.scale[0]),
					x, y;
				if ( !temp ) {
					return 1;
				} else {
					x = parseFloat(temp[1]);
					y = ( temp[2] !== undefined )? parseFloat(temp[2]) : x;
					if ( value !== undefined ) {
						if ( isx.test(property) ) {
							x = value;
						} else {
							y = value;
						}
						target.style[supporttransform] = target.style[supporttransform].replace(expressions.scale[0], 'scale('+ x +', '+ y);
					} else {
						return ( isx.test(property) )? x : y;
					}
				}
			}

			function get(target, property) {
				var rv, transform, xyz;
				property = css3(property);
				if ( istransform(property) ) {
					xyz = isxyztarget(property);
					if ( xyz ) {
						return get(target, xyz+'X');
					}
					transform = property;
					property = supporttransform;
				}
				if ( property == 'opacity' && !support.opacity ){
					property = 'filter';
				} else if ( property == 'scrollTop' ) {
					return target.scrollTop;
				}
				rv = (target) ? (issvg(target) && target.attributes[property]) ? parseInt(target.attributes[property].value) :
						(!target.style)? target[property] :
						(target.style[property])? target.style[property] :
							(target.currentStyle)? target.currentStyle[property] :
								document.defaultView.getComputedStyle(target, null)[property] : 0;
				if ( transform && supporttransform ) {
					xyz = transform.match(xyzex);
					xyz = ( xyz )? xyz[0] : '';
					if ( isrotate.test(transform) ) {
						rv = rv.match(expressions[transform][0]);
						return (!rv)? 0 : parseFloat(rv[1]);
					} else if ( isstupidbrowser && isscale.test(transform) ) {
						return ie9scale(target, transform);
					} else if( rv ) {
						rv = rv.match( expressions[transform.replace(xyzex, '')][0] );
						return (!rv)? ( isscale.test(transform) )? 1 : 0 : parseFloat(rv[( xyz == 'X' )? 1 : ( xyz == 'Y' )? 2 : 3]);
					}
				}
				if ( property == 'opacity' ) {
					return parseFloat(rv);
				}
				if ( property == 'filter' ) {
					rv = rv.match(/alpha *\( *opacity *[=:] *([0-9\.]+) *\)/i);
					rv = (rv)? parseFloat(rv[1]) : 1;
					return (rv || rv===0)? rv/100 : 1;
				}
				return (rv=='auto')? 0 : ((/(pt|px)$/).test(rv))? parseInt(rv) : rv;
			}

			function set(target, property, value) {
				var i, exist, transform, xyz;
				if ( typeof(property) == 'object' ) {
					for ( i in property) {
						style.set(target, i, property[i]);
					}
					return;
				}
				if ( value !== undefined ) {
					if ( issvg(target) && target.attributes[property] ) {
						target.attributes[property].value = value;
					} else if ( !target.style ) {
						target[property] = value;
					} else {
						property = css3(property);
						if ( istransform(property) && supporttransform ) {
							xyz = isxyztarget(property);
							if ( xyz ) {
								set(target, xyz+'X', value);
								set(target, xyz+'Y', value);
								set(target, xyz+'Z', value);
								return;
							}
							exist = target.style[supporttransform] || style.get(target, supporttransform);
							if (exist.indexOf('(') == -1) {
								exist = '';
							}
							if ( isrotate.test(property) ) {
								if ( !expressions[property][0].test(exist) ) {
									exist += property+'(0)';
								}
								target.style[supporttransform] = exist.replace(expressions[property][1], '$1'+ value +'deg');
							} else {
								transform = property.replace(xyzex, '');
								if ( !expressions[transform][0].test(exist) ) {
									exist += support[transform];
								}
								if ( isstupidbrowser && isscale.test(property) ) {
									ie9scale(target, property, value);
								} else {
									target.style[supporttransform] = exist.replace(
										expressions[transform][isx.test(property)? 1 : isy.test(property)? 2 : 3],
										'$1'+ value + ( isscale.test(transform)? '' : 'px' )
									);
								}
							}
						} else if ( property == 'opacity' ) {
							if ( !support.opacity ) {
								target.style.filter = ( value === '' )? '' : 'alpha(opacity='+(value*100)+')';
							} else {
								target.style.opacity = value;
							}
						} else if ( property == 'scrollTop' ) {
							target.scrollTop = value;
						} else {
							try {
								target.style[property] = ( value && !isNaN(value) && !expressions.nopx.test(property) )? value+'px' : value;
							} catch(e) {
								window.console && console.log(e.message+'('+target + ' : id="'+ target.id +'", class="'+ target.className +'", property="'+ property +'", value : "'+ value +'")');
							}

						}
					}
				}
			}

			return { get: get, set: set, istransform: istransform };

		})(),

		ani = (function() {

			var tweens = [],

				_fps = 60, _time = 1, _easing = 'easeOutCubic',

				nowframe = 0,
				totalframes = 0,
				starttime = 0,
				playing = false,

				getstyle = style.get, setstyle = style.set,

				torgb = color.torgb, tocolorcode = color.tohex,

				istransform = style.istransform,
				issplitxyztarget = style.issplitxyztarget,

				timer = null,
				timerdelay = 1000/_fps,

				isemptytween,

				i, max;

			function set(target, property, _option) {

				if ( !target ) {
					return;
				}

				if ( target.constructor == Array ) {
					for ( i = 0, max = target.length; i < max; i++ ) {
						set(target[i], property, _option);
					}
					return;
				}

				var tween,
					option = _option || {},
					time = option.time || _time,
					frames = Math.round( _fps*time ),
					delay = Math.round( _fps*( option.delay || 0 ) ),
					easing = option.easing || _easing,
					p, rounding, fromcolor, tocolor, rgb, i, temp,
					values = {};

				for ( p in property ) {
					rounding = ( option.rounding === false || p == 'opacity' )? false : !istransform(p);
					if ( property[p].constructor == Array ) {
						values[p] = property[p];
						frames = Math.max(frames, Math.round( _fps*values[p].length/_fps ));
					} else if ( expiscolor.test(p) ) {
						fromcolor = torgb(target, p, getstyle(target, p));
						tocolor = torgb(target, p, property[p]);
						rgb = [];
						for ( i = 0; i < 3; i++ ) {
							rgb[i] = getvalues(p, fromcolor[i], tocolor[i], frames, easing, true);
						}
						values[p] = [];
						for ( i = 0; i < frames; i++ ) {
							values[p][i] = tocolorcode(rgb[0][i], rgb[1][i], rgb[2][i]);
						}
					} else {
						values[p] = getvalues(p, getstyle(target, p), property[p], frames, easing, rounding);
					}
				}

				stop(target, property);

				tweens.push({
					el: target,
					vs: values,
					sf: option.bystep ? -1-delay : nowframe + delay,
					tf: frames,
					bs: option.bystep,
					es: option.onstart,
					eu: option.onupdate,
					ee: option.onend,
					lp: option.loop
				});

				totalframes = Math.max( totalframes, nowframe + delay + frames + _fps );

				if ( !playing ) {
					starttime = gettime();
					timer = window.requestAnimationFrame(action);
					playing = true;
				}

			}

			function stop(target, property, _jumptoend) {

				var i = 0, max = tweens.length,
					tween, p, properties;

				if ( property ) {
					if ( typeof(property) != 'string' ) {
						properties = [];
						for ( p in property ) {
							properties.push(p);
						}
						properties = properties.join(' ')+' ';
					} else {
						properties = property+' ';
					}
				}

				isemptytween = true;
				for ( ; i < max; i++ ) {
					tween = tweens[i];
					if ( tween && tween.el == target ) {
						if ( property ) {
							for ( p in tween.vs ) {
								if ( properties.indexOf(p+' ') != -1 ) {
									if ( _jumptoend ) {
										setstyle(tween.el, p, tween.vs[p][tween.tf-1]);
									}
									delete tween.vs[p];
								} else {
									isemptytween = false;
								}
							}
						}
						if ( isemptytween ) {
							if ( _jumptoend ) {
								jumptoend(tweens[i]);
							}
							tweens[i] = null;
						}
					}
				}

			}

			function jumptoend(tween) {
				var p, lastframe = tween.tf-1;
				for ( p in tween.vs ) {
					setstyle(tween.el, p, tween.vs[p][lastframe]);
				}
				tween.eu && tween.eu.call( tween.el, geteventvalue(tween, 'update', lastframe, lastframe) );
				tween.ee && tween.ee.call( tween.el, geteventvalue(tween, 'end', lastframe, lastframe) );
			}

			function sprite(target, framewidth, totalframe, property, time, loop) {
				var currentframe, temp = { };
				totalframe--;
				function onupdate(e) {
					var frame = Math.round(totalframe*e.v);
					if ( currentframe != frame ) {
						style.set(target, property, -framewidth*frame);
						currentframe = frame;
					}
				}
				function play() {
					_stop();
					set(temp, { v: 1 }, { time: time, loop: loop, rounding: false, easing: 'linear', onupdate: onupdate });
				}
				function _stop() {
					stop(temp);
					currentframe = -1;
					temp.v = 0;
				}
				return { play: play, stop: _stop }
			}

			function action() {
				nowframe = Math.floor( ( gettime()-starttime ) / timerdelay );
				if ( totalframes > nowframe ) {
					setproperties(nowframe);
					timer = window.requestAnimationFrame(action);
				} else {
					window.cancelAnimationFrame(timer);
					setproperties(totalframes);
					nowframe = totalframes = 0;
					tweens = [];
					playing = false;
				}
			}

			function setproperties(step) {

				var tween, mystep, myframes,
					p, i = 0, max = tweens.length;

				for ( ; i < max; i++ ) {

					tween = tweens[i];

					if ( tween && step >= tween.sf ) {

						myframes = tween.tf-1;

						if (tween.bs) {
							mystep = tween.sf = tween.sf+1;
						} else {
							mystep = Math.min( myframes, step-tween.sf );
						}

						if (mystep > -1) {

							if ( tween.es ) {
								tween.es.call( tween.el, geteventvalue(tween, 'start', 0, myframes) );
								delete tween.es;
							}

							if (!tweens[i]) {
								continue;
							}

							for ( p in tween.vs ) {
								setstyle(tween.el, p, tween.vs[p][mystep]);
							}

							tween.eu && tween.eu.call( tween.el, geteventvalue(tween, 'update', mystep, myframes) );

							if ( mystep == myframes ) {
								tween.ee && tween.ee.call( tween.el, geteventvalue(tween, 'end', mystep, myframes) );
								if ( tween.lp ) {
									tween.sf = tween.bs ? -1 : nowframe;
									totalframes += tweens[i].tf+_fps;
									if ( tween.lp == 'yoyo' ) {
										for ( p in tween.vs ) {
											tween.vs[p].reverse();
										}
									}
								} else {
									tweens[i] = null;
								}
							}
						}

					}
				}

			}

			function geteventvalue(tween, type, step, totalstep) {
				var values = tween.vs,
					eventvalue = { type: type, percent: step/totalstep },
					p;
				for ( p in values ) {
					eventvalue[p] = values[p][step];
				}
				return eventvalue;
			}

			function getvalues(property, from, to, totalframe, easing, rounding) {
				var nv, rv = [], gap = to-from, i = 0;
				totalframe--;
				for ( ; i <= totalframe; i++ ) {
					nv = easings[easing](i, from, gap, totalframe);
					rv.push( ( rounding )? Math.round(nv) : nv );
				}
				return rv;
			}

			return { set: set, stop: stop, sprite: sprite, getvalues: getvalues };

		})();


	$.fn._css = function(property, value) {
		var p;
		if ( isobject(property) ) {
			for ( p in property ) {
				this._css(p, property[p]);
			}
		} else if ( value !== undefined ) {
			this.each(function() {
				style.set(this, property, value);
			});
		} else {
			return style.get(this[0], property);
		}
		return this;
	}

	$.fn._animate = function(properties, d, e, c) {
		var delaybase, options = assignanimationoptions(d, e, c);
		if (options.autodelay) {
			delaybase = options.delay;
		}
		return this.each(function(i) {
			if (i) {
				options.step = options.complete = null;
			}
			if (delaybase) {
				options.delay = i*delaybase;
			}
			ani.set(this, properties, options);
		});
	}

	$.fn._spriteanimation = function sprite(framewidth, totalframe, property, time, loop) {
		return this.each(function(i) {
			$(this).data('spriteanimation', ani.sprite(this, framewidth, totalframe, property, time, loop));
		});
	}

	$._getanimationvalues = ani.getvalues;

	$.fn._stop = function(property, jumptoend) {
		if ( property === true || property === false ) {
			jumptoend = property;
			property = null;
		}
		return this._css(transitionname, '').each(function() {
			ani.stop(this, property, jumptoend);
		});
	}

	$.fn._transition = function(properties, d, e, c) {
		var $target = this,
			options = assignanimationoptions(d, e, c),
			p, setting, onend, onendfired;
		if ( transitionable ) {
			setting = [];
			for ( p in properties ) {
				if ( style.istransform(p) ) {
					p = support.transform;
				}
				setting.push([killcamels(p), ' ', options.time, 's ', (options.delay)? options.delay+'s ' : '', 'cubic-bezier(', ( cubicbeziers[options.easing] || cubicbeziers.ease ), ')'].join(''));
			}
			setting = setting.join(',');
			onend = options.onend;
			options.onend = function() {
				if ( !onendfired ) {
					$target.css(transitionname, '').unbind(transitionendnames, options.onend);
					setTimeout(function() {
						onend && onend.call($target[0]);
					}, 0);
					onendfired = true;
				}
			}
			setTimeout(function() {
				$target.each(function() {
					$(this).css(transitionname, setting)._css(properties).bind(transitionendnames, options.onend);
				});
			}, 0);
			return this;
		} else {
			return this.each(function() {
				ani.set(this, properties, options);
			});
		}
	}

	$.fn._fill = function($area, sizes) {
		return this.each(function() {
			filling(this, $area, sizes);
		});
	}

	$.fn.decideClass = function(classname, condition) {
		return this[condition ? 'addClass' : 'removeClass'](classname);
	}

	function filling(target, $area, _sizes) {

		if ( !$area ) {
			$area = $(target.parentNode);
		}
		if ( !$area.length ) {
			return false;
		}

		var position,
			sizes = _sizes || {},
			targetwidth = sizes.width || target.offsetWidth, targetheight = sizes.height || target.offsetHeight,
			areawidth = sizes.areawidth || $area[0].offsetWidth, areaheight = sizes.areaheight || $area[0].offsetHeight,
			rate, newwidth, newheight, marginleft, margintop;

		if (!targetwidth || !targetheight || !areawidth || !areaheight) {
			return false;
		}

		position = $area._css('backgroundPosition');
		if ( position ) {
			position = position.split(' ');
			position[0] = position[0] == 'center' ? 0.5 : position[0].indexOf('%') != -1 ? parseInt(position[0])/100 : 0;
			position[1] = position[1] == 'center' ? 0.5 : position[1].indexOf('%') != -1 ? parseInt(position[1])/100 : 0;
		}

		rate = ( targetwidth > targetheight )? areaheight/targetheight : areawidth/targetwidth;
		rate = ( areaheight > Math.round(targetheight*rate) )? areaheight/targetheight : ( areawidth > targetwidth*rate )? areawidth/targetwidth : rate;

		newwidth = Math.max(areawidth, Math.round(targetwidth*rate));
		newheight = Math.max(areaheight, Math.round(targetheight*rate));

		if (position) {
			if (position[0]) {
				marginleft = (areawidth-newwidth)*position[0];
			}
			if (position[1]) {
				margintop = (areaheight-newheight)*position[1];
			}
		}

		$(target).css({
			width: newwidth,
			height: newheight,
			marginLeft: marginleft || '',
			marginTop: margintop || ''
		});

	}

	function assignanimationoptions(d, e, c) {
		var options;
		if ( isobject(d) ) {
			options = { time: d.duration, loop: d.loop, delay: d.delay, bystep: d.bystep, rounding: d.rounding, easing: d.easing, onstart: d.start, onupdate: d.step, onend: d.complete };
		} else if ( typeof(c) == 'function' ) {
			options = { time: d, easing: e, onend: c };
		} else if ( typeof(e) == 'function' ) {
			options = ( typeof(d) == 'number' )? { time: d } : { easing: d }
			options.onend = e;
		} else if ( typeof(d) == 'function' ) {
			options = { onend: d };
		}
		if ( options.time === undefined ) {
			options.time = 400;
		}
		options.time /= 1000;
		if (options.delay && !isNaN(parseInt(options.delay))) {
			if (typeof(options.delay) == 'string') {
				options.autodelay = true;
			}
			options.delay = parseInt(options.delay)/1000;
		}
		return options;
	}

	function killcamels(property) {
		return property.replace(/([A-Z])/g, '-$1').toLowerCase();
	}

	$._event = (function() {

		var
			supporttouch = support.touch,
			typemap = supporttouch ? {mousedown: 'touchstart', mousemove: 'touchmove', mouseup: 'touchend'} : {};

		return {
			gettype: function(types) {
				var type, newtypes;
				if (supporttouch) {
					newtypes = {};
					for (type in types) {
						newtypes[typemap[type] || type] = types[type];
					}
					return newtypes;
				}
				return types;
			},
			getpoint: function(e) {
				e = e.originalEvent;
				if (e.touches || e.changedTouches) {
					return [
						e.touches[0] ? e.touches[0].pageX : e.changedTouches[0].pageX,
						e.touches[0] ? e.touches[0].pageY : e.changedTouches[0].pageY
					];
				}
				return [e.clientX, e.clientY];
			}
		}

	})();

	div = null;

	$(document.documentElement)
		.addClass(browser.os)
		.addClass(browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie'+browser.ie : '')
		.addClass(browser.webkit ? 'webkit' : '')
		.addClass(browser.ie && 8 > browser.ie ? 'ie8' : '')
		.addClass(browser.ios ? 'ios' : browser.android ? 'android' : '')
		.addClass(support.transition ? 'transition' : 'notransition')
		.addClass(support.transform ? 'transform' : 'notransform')
		.addClass(support.backgroundsize ? 'backgroundsize' : 'nobackgroundsize')
		.addClass(support.rgba ? 'rgba' : 'norgba')
		.addClass(support.svgimage ? 'svg' : 'nosvg')
		.addClass(support.pointerevents ? 'pointerevents' : 'nopointerevents')
		.addClass(support.opacity ? 'opacity' : 'noopacity');

	if (!window.console) {
		window.console = {};
		window.console.log = window.console.table = window.console.error = window.console.clear = function() {};
	}

	window.trace = (function() {

		var box = null,
			number = 1;

		function tostring(v) {
			var rv, i, max;
			if ( v === null ) {
				return 'null';
			} else if ( v === undefined ) {
				return 'undefined';
			} else if ( v == window ) {
				return '[object Window]';
			} else if ( v == document ) {
				return '[object HTMLDocument]';
			} else if ( v === true || v === false || typeof(v) == 'number' || typeof(v) == 'function' ) {
				return v;
			} else if ( typeof(v) == 'object' ) {
				if ( v.constructor == Array ) {
					rv = [];
					for ( i = 0, max = v.length; i < max; i++ ) {
						rv.push(tostring(v[i]));
					}
					return '['+ rv.join(',') +']';
				} else if ( v.constructor == String ) {
					return '"'+ v.replace(/\</g, '<') +'"';
				} else if ( v.constructor == Boolean || v.constructor === Number || v.constructor == RegExp ) {
					return v;
				} else if ( v.constructor == Date ) {
					return 'Date('+ v.getTime() +', '+ v +')';
				} else if ( v.each && v.bind ) {
					rv = [];
					for ( i = 0, max = v.length; i < max; i++ ) {
						rv.push(i +':'+ tostring(v[i]));
					}
					rv.push('length:'+ max);
					return '${'+ rv.join(',') +'}';
				} else if ( v.nodeType ) {
					return '[object '+ v.nodeName.toUpperCase() +' Element]';
				} else {
					rv = [];
					for ( i in v ) {
						rv.push('\''+ i +'\':'+ tostring(v[i]));
					}
					return '{'+ rv.join(',') +'}';
				}
			} else {
				return '"'+ ((v.replace)? v.replace(/\</g, '<') : v) +'"';
			}
		}

		function create() {
			if ( !box ) {
				box = document.createElement('ol');
				box.style.cssText = 'position:absolute;left:5px;top:5px;max-width:75%;font-family:verdana;font-size:9px;color:#000;line-height:1.35em;margin:0;padding:3px 3px 2px 38px;border:1px solid #000;background:#fff;display:none;z-index:10000;opacity:0.75;filter:alpha(opacity=75);';
				box.onclick = clear;
				addbox();
			}
		}

		function addbox() {
			if ( document.body ) {
				document.body.appendChild(box);
			} else {
				setTimeout(addbox, 10);
			}
		}

		function clear(){
			if ( box ) {
				box.innerHTML = '';
				box.style.display = 'none';
				number = 1;
			}
		}

		return {
			log: function() {
				for ( var i = 0, max = arguments.length, v = [], li = document.createElement('li'); i < max; i++ ) {
					v.push(tostring(arguments[i]));
				}
				li.style.cssText = 'list-style:decimal;margin-bottom:1px;padding:2px 3px 3px;background:'+ ((number%2)? '#eee;' : '#ddd;');
				li.innerHTML = v.join(', ');
				create();
				box.appendChild(li);
				box.style.display = 'block';
				number++;
			},
			fixed: function(flag) {
				create();
				box.style.position = ( flag === false )? 'absolute' : 'fixed';
			},
			clear: clear
		}

	})();

})(window.jQuery);
/*
* x slider with jquery-d
* by @psyonline ( http://www.psyonline.kr/, majorartist@gmail.com )
*/
;(function($) {

	'use strict';

	if ( !$ || $.fn.xlider ) {
		return;
	}

	var
		$win = $(window),
		$doc = $(document.documentElement),
		$body = $(document.body),

		isMobile = $.browser.mobile,
		isIOS = $.browser.ios,
		isAndroid = $.browser.android,
		supportTransform = $.support.transform,
		supportTransition = $.support.transition,

		getEventType = $._event.gettype,
		getEventPoint = $._event.getpoint,

		regExpIsUL = /ul/i,

		windowWidth,
		resizeFunctions = [],

		last;

	$.fn.xlider = function(_option, value, pretendTo, noAnimation) {
		var forState;
		if (!_option || $.isPlainObject(_option)) {
			this.each(function() {
				$(this).data('xlider', new xlider($(this), _option) );
			});
		} else if (typeof(_option) == 'string') {
			if (_option == 'prev' || _option == 'next') {
				noAnimation = value;
			} else if (_option == 'toggleAuto') {
				forState = {v: 0, value: value};
				$(this).trigger('xlider-'+_option, forState, value);
				return forState.v;
			} else if (_option == 'change' || typeof pretendTo != 'string') {
				noAnimation = pretendTo;
			}
			this.trigger('xlider-'+_option, {to: value, pretendTo: pretendTo, noAnimation: noAnimation});
		}
		return this;
	}

	$win.resize(function() {
		windowWidth = $doc[0].clientWidth;
		$.each(resizeFunctions, function() {
			this();
		});
	});

	function xlider($box, option) {

		var option = option || {},

			endless = option.endless,
			arrows = option.arrows,
			arrowsTag = arrows ? arrows.constructor == Array ? 'pre' : typeof arrows == 'string' ? arrows : 'button' : '',
			paging = option.paging,
			pagingTag = paging ? paging.length && paging[0].nodeType ? 'pre' : typeof paging == 'string' ? paging : 'button' : '',
			useSwipe = option.swipe !== false,
			useFade = option.fade,
			animate = option.animate !== false,
			animateDuration = option.duration,
			autoPlay = option.autoPlay,
			useTransition = option.useTransition && supportTransition,
			numDisplay = option.numDisplay || 1,
			newstyle = option.newstyle || false,
			maxview = option.maxview || 5,
			mode = option.mode || 'all',

			eventMove = option.onMove,
			eventChange = option.onChange,
			eventChangeEnd = option.onChangeEnd,
			eventreset = option.reset,

			$wrapper,
			$arrows, $prev, $next,
			$paging, $pagingItems,

			$items = $box.children(),
			$fakeItem,

			$blocker,

			boxWidth, itemWidth, moveSize,
			downX, downY, baseX, swipeAngle, startTime, moved, realX, setX,

			multiMode = numDisplay > 1,
			classicMode = false,

			clickAble = true,
			blockerAdded = false,
			checkStart = false,
			changePhone = false,
			dragPoint = true,

			autoPlaying = !!autoPlay,
			autoPlayTimer = null,

			wrapperClassName = 'xlider-wrapper',

			zIndex = 0,
			limitCount = 1,
			lastX = 0,
			resetMover,
			realAni = true,
			resetting = false,

			i = 0, max = $items.length,

			nowPage = option.defaultPage && option.defaultPage > -1 ? Math.min(max-1, option.defaultPage) : 0,

			aniOption = {
				slide: {queue: false, step: onMove, easing: 'easeOutCubic', complete: changeEnd},
				back: {queue: false, step: onMove, easing: 'easeOutCubic', complete: changeEnd},
				fade: {queue: false, easing: 'easeOutSine', complete: changeEnd}
			};

		if (GALAXY.isPoorBrowser) {
			newstyle = false;
		}


		if (!$body.length) {
			$body = $(document.body);
		}

		if (!max) {
			return;
		}

		if (useFade) {
			useSwipe = true;
			endless = true;
		}

		if (regExpIsUL.test($box[0].nodeName)) {
			$wrapper = $box.addClass(wrapperClassName);
			$box = $wrapper.parent();
		} else if (2 > max && regExpIsUL.test($items[0].nodeName)) {
			$wrapper = $items.addClass(wrapperClassName);
			$items = $items.find('> li');
			max = $items.length;
		}
		if (!$wrapper) {
			$wrapper = $('<div class="'+ wrapperClassName +'" />').appendTo($box);
		}
		if ($wrapper.css('position') == 'static') {
			$wrapper.css('position', 'relative');
		}
		if ($wrapper.css('zIndex') == 'auto') {
			$wrapper.css('zIndex', 0);
		}
		$box.css('overflow', 'hidden');

		if (!useFade && endless && 2 > max) {
			endless = false;
		}

		if (arrows && max > 1) {
			if (arrowsTag == 'pre') {
				$prev = arrows[0];
				$next = arrows[1];
			} else {
				$arrows = $('<p class="arrows" />').appendTo($box);
				$prev = $('<'+ arrows +' class="prev">Prev</'+ arrows +'>').appendTo($arrows);
				$next = $('<'+ arrows +' class="next">Next</'+ arrows +'>').appendTo($arrows);
			}
			$prev.attr('data-flag', 'prev').click(toPrev);
			$next.attr('data-flag', 'next').click(toNext);
		} else if (2 > max) {
			if (arrows == 'pre') {
				arrows[0].remove();
				arrows[1].remove();
			}
			arrows = null;
		}

		if (paging) {
			if (pagingTag == 'pre') {
				$paging = $(paging);
				$pagingItems = $paging.children();
			} else {
				$paging = $('<p class="paging" />').appendTo($box);
				$pagingItems = [];
				for (i = 0; i < max; i++) {
					$pagingItems[i] = $('<'+pagingTag+' />');
					$pagingItems[i][0].innerHTML = i+1;
				}
			}
		}

		for (i = 0; i < max; i++) {
			$items[i] = $($items[i]);
			if (!newstyle) {
				$items[i] = $($items[i]).css({left: useFade ? 0 : '200%', top: 0, width: '100%', display: i == nowPage ? '' : 'none'});
				$items[i].appendTo($wrapper);
				$items[i].find('a, button, input, textarea').attr('data-xlider-page', i).focus(itemFocusablesFocused);
			}
			if ($items[0].parent().parent().hasClass('g-contents')) {
				$items[i].addClass('hide');
			}
			if (paging) {
				$pagingItems[i] = $($pagingItems[i]).attr('data-page', i)
					.click(pagingClick)
					.appendTo($paging);
			}
		}

		function settingView() {
			if (newstyle) {
				if ($('html').hasClass('s'+mode) || (mode == 'all')) {
					if (!resetting) {
						if ($wrapper&&$wrapper.length) {
							for (i = 0; i < max; i++) {
								var actCounr = Math.ceil(maxview / 2);
								$items[i] =  $($items[i]).attr('data-call', i);
								if (i < actCounr) {
									var count = Math.ceil((max - 1) - i);
									$wrapper.prepend($items[count]);
								}
							}
						}
						resetting = true;
					}
					if ($wrapper&&$wrapper.length) {
						newcenterSet();
					}
				} else {
					if (resetting) {
						if ($wrapper&&$wrapper.length) {
							$wrapper.html('');
							for (i = 0; i < max; i++) {
								$items[i] =  $($items[i]).attr('data-call', i);
								$items[i].appendTo($wrapper);
								if (i == max-1) {
									eventreset && eventreset.call();
								}
							}
						}
						resetting = false;
					}
				}
			}

		}

		function pagingClick(idx) {
			idx = (typeof idx === 'number') ? idx+'' : null;
			if (!newstyle) {
				jump({to: parseInt(idx) || parseInt(this.getAttribute('data-page'))});
			} else {
				var page = idx || $(this).attr('data-page');
				page+='';
				if (!clickAble || page == nowPage) {
					return false;
				}
				var center = $wrapper.find('> li.show').index();
				var allC = [];
				var full = $wrapper.find('> li').length;
				for (i = 0;i<full;i++) {
					allC[i] = $wrapper.find('> li').eq(i).attr('data-call');
				}
				var clickPAge = allC.indexOf(page);
				var countPage = clickPAge - center;
				if (realAni) {
					changeNew(countPage);
				}
			}
			return false;
		}

		function changeNew(idx) {
			realAni = false;
			var limitMg = Math.floor($wrapper.find(' > li').eq(max-1).css('marginLeft').replace('px', ''));
			var limit = $wrapper.find(' > li').eq(max-1).outerWidth() + (limitMg * 2);
			var thisinDex = $wrapper.find(' > li.show').index();
			var currinDex = $wrapper.find(' > li').eq(thisinDex+idx).attr('data-call');
			var field;
			var movedRe;
			var limitNew = 1;
			var half = limit / 2;
			var newCall;
			var transX = Math.ceil($wrapper.css('transform').split(',')[4]);
			if ($.browser.ie > 9) {
				transX = Math.ceil($wrapper.css('transform').split(',')[12]);
			}
			var caseOne = Math.abs(idx);
			var noX = 0;
			var fakeX = false;
			var time = 0;
			if ($.browser.mobile) {
				time = 10;
			}
			var remake = function () {
				if (idx > 0) {
					field = 0;
				} else {
					field = max - 1;
				}
				var lastCont = $wrapper.find('> li').eq(field).attr('data-call');
				$wrapper.find('> li').eq(field).remove();
				if (field != 0) {
					$wrapper.prepend($items[lastCont]);
				} else {
					$wrapper.append($items[lastCont]);
				}
				if (idx > 0) {
					noX = transX + (Math.abs(limit));
				} else {
					noX = transX - (Math.abs(limit));
				}
				limitNew++;
				fakeX = true;
			}
			newCall = setInterval(function () {
				var noWtransX = Math.ceil($wrapper.css('transform').split(',')[4]);
				if ($.browser.ie > 9) {
					noWtransX = Math.ceil($wrapper.css('transform').split(',')[12]);
				}
				if (fakeX) {
					movedRe = transX;
					fakeX = false;
				} else {
					if (idx > 0) {
						movedRe = noWtransX-(20);
					} else {
						movedRe = noWtransX+(20);
					}
				}
				$wrapper._css({translate3dX:movedRe});
				var noWtransX2 = Math.ceil($wrapper.css('transform').split(',')[4]);
				if ($.browser.ie > 9) {
					noWtransX2 = Math.ceil($wrapper.css('transform').split(',')[12]);
				}
				var movedRecheck = noWtransX2-transX;
				if (isMobile && changePhone) {
					movedRecheck = Math.abs(movedRecheck)+Math.abs(setX-transX);
				}
				if ((limit) < Math.abs(movedRecheck)) {
					remake();
				}
				if (limitNew == caseOne+1) {
					clearInterval(newCall);
					if (isMobile && changePhone) {
						$wrapper._css({translate3dX:setX});
					} else {
						$wrapper._css({translate3dX:transX});
					}
					nowPage = currinDex;
					setButtons();
					changeEnd();
					changePhone = false;
					if (isMobile) {
						setTimeout(function () {
							realAni = true;
							dragPoint = true;
						}, 100);
					} else {
						realAni = true;
						dragPoint = true;
					}
				}
			}, time);
		}

		if (useSwipe) {
			if (window.navigator.pointerEnabled) {
				$wrapper[0].style.cssText += 'touch-action: pan-y;';
			} else if (window.navigator.msPointerEnabled ){
				$wrapper[0].style.cssText += '-ms-touch-action: pan-y;';
			}
			$wrapper.bind(getEventType({mousedown: down}));
			$wrapper.bind('selectstart dragstart', function() {
				return false;
			});
		}

		function loadImageCheck($image, callback) {
			if ($image[0].complete) {
				$image.unbind({load: callback});
				callback.call($image);
			} else {
				if ($image[0].src==$image[0].src) {
					if ($image[0].complete) {
						$image.unbind({load: callback});
						callback.call($image);
					} else {
						$image.unbind({load: callback}).bind({load: callback});
					}
				} else {
					$image.bind({load: callback});
					$image[0].src = $image[0].src;
				}
			}
		}

		function newcenterSet(idt) {
			if (newstyle) {
				var settingX = Math.ceil($wrapper.css('transform').split(',')[4]);
				if ($.browser.ie > 9) {
					settingX = Math.ceil($wrapper.css('transform').split(',')[12]);
				}
				var center = $win.width() / 2;
				var limitMg = Math.floor($wrapper.find(' > li').eq(max-1).css('marginLeft').replace('px', ''));
				var limit = $wrapper.find(' > li').eq(max-1).innerWidth();
				var thisIndex = $wrapper.find(' > li.show').offset().left;
				var moveAni = thisIndex + limit/2 - center;

				if (checkStart) {
					moveAni = thisIndex + limit/2 - center - settingX;
				} else {
					if ( $wrapper.find('img').length ) {
						var lens = $wrapper.find('img').length,
							k = 0;
						$wrapper.find('img').each(function() {
							loadImageCheck($(this), function() {
								if ( ++k >= lens) {
									resize();
								}
							});	
						});
					}
				}
				$wrapper._animate({translate3dX:-moveAni}, {duration: 550, easing: 'easeOutCubic', force3D: true});
				checkStart = true;
			}
		}

		$box.bind('xlider-prev', function(e, option) {
			toPrev(e, false, option.noAnimation);
		});
		$box.bind('xlider-next', function(e, option) {
			toNext(e, false, option.noAnimation);
		});
		$box.bind('xlider-jump', function(e, option) {
			jump(option);
		});
		$box.bind('xlider-change', function(e, option) {
			change(option);
		});
		$box.bind('xlider-toggleAuto', function(e, forState) {
			forState.v = toggleAuto(forState.value);
		});
		$box.bind('xlider-remove', remove);

		$blocker = $('<div class="blocker" style="position:absolute;left:0;top:0;width:100%;height:100%;background:#000;" />').css('opacity', 0);

		setButtons();
		resize();
		changeEnd();

		resizeFunctions.push(resize);

		function remove(e) {
			for (i = 0; i < max; i++) {
				$items[i].find('a, button, input, textarea').removeAttr('data-xlider-page');
				if (!regExpIsUL.test($wrapper[0].nodeName)) {
					$items[i].appendTo($box);
				}
				if (paging) {
					if (pagingTag != 'pre') {
						$pagingItems[i].remove();
					} else {
						$pagingItems[i].unbind('click');
					}
				}
			}
			$wrapper._css({position: '', translate3dX: ''}).removeClass(wrapperClassName);
			$wrapper.unbind(getEventType({mousedown: down}));
			if (!regExpIsUL.test($wrapper[0].nodeName)) {
				$wrapper.remove();
			}
			if (paging && pagingTag != 'pre') {
				$paging.remove();
			}
			if (arrows) {
				if (arrowsTag != 'pre') {
					$prev.remove();
					$next.remove();
				} else {
					$prev.unbind('click');
					$next.unbind('click');
				}
			}
			$fakeItem && $fakeItem.remove();
			$blocker.remove();
			$box.unbind('xlider-prev xlider-next xlider-jump xlider-change xlider-toggleAuto xlider-remove');
			$box = $wrapper = $prev = $next = $pagingItems = null;
			for (i = 0, max = resizeFunctions.length; i < max; i++) {
				if (resizeFunctions[i] == resize) {
					resizeFunctions.splice(i, 1);
					break;
				}
			}
		}

		function down(e) {

			clearAutoPlay();

			if (!clickAble) {
				realAni
			}

			if (newstyle) {
				if ((mode != 'all')&&!$('html').hasClass('s'+mode)) {
					return;
				}
			}

			downX = baseX = getEventPoint(e)[0];
			returnX = downX;

			if (isIOS && (15 > downX || downX > windowWidth-15)) {
				return true;
			}

			downY = getEventPoint(e)[1];
			startTime = new Date().getTime();

			moved = 0;
			swipeAngle = false;
			if  (!realAni && isMobile) {
				return false;
			}
			if (!dragPoint) {
				return false;
			}
			if ($.support.transform) {
				realX = Math.ceil($wrapper.css('transform').split(',')[4]);
				setX = Math.ceil($wrapper.css('transform').split(',')[4]);
				if ($.browser.ie > 9) {
					realX = Math.ceil($wrapper.css('transform').split(',')[12]);
					setX = Math.ceil($wrapper.css('transform').split(',')[12]);
				}
			}
			if (realX == undefined) {
				realX = 0;
				setX = 0;
			}
			$doc.bind(getEventType({mousemove: move, mouseup: up}));

		}

		/* newStyle */
		var mapword = '',
			recount = true,
			returnX;

		function move(e) {
			var x = getEventPoint(e)[0],
				y = getEventPoint(e)[1],
				nowTime = new Date().getTime();


			if (swipeAngle === false) {
				swipeAngle = Math.abs((Math.atan2(downX-x, downY-y)*180)/Math.PI);
				if (45 > swipeAngle || swipeAngle > 135) {
					$doc.unbind(getEventType({mousemove: move, mouseup: up}));
					return true;
				}
			}
			if ($items[0].parent().parent().hasClass('g-contents')) {
				if (nowPage != 0) {
					$items[nowPage - 1].addClass('show');
					if ((max - 1) != nowPage) {
						$items[nowPage + 1].addClass('show');
					} else {
						$items[0].addClass('show');
					}
				} else {
					$items[nowPage + 1].addClass('show');
					$items[max - 1].addClass('show');
				}
			}


			moved = x-downX;

			if (newstyle) {

				var movedcheck = x-returnX;
				var mapCheck = x-lastX;
				var faker = realX;
				var limitMg = Math.floor($wrapper.find(' > li').eq(max-1).css('marginLeft').replace('px', ''));
				var limit = $wrapper.find(' > li').eq(max-1).innerWidth() + (limitMg * 2);
				var half = limit / 2;
				if ((mapCheck > 0) && (lastX != 0) && (!isMobile)) {//right
					if (mapword == 'left') {
						recount = true;
						mapword = 'right';
					}
					if (recount) {
						limitCount = 1;
						recount = false;
						returnX = x;
					}
					movedcheck = x-returnX;
					var caseOne = Math.abs(Math.floor((Math.abs(movedcheck) + limit) / limit) - limitCount + 1);
 					var remakeRi = function () {
						var lastCont = $wrapper.find('> li').eq(max-1).attr('data-call');
						$wrapper.find('> li').eq(max-1).remove();
						$wrapper.prepend($items[lastCont]);
						limitCount++;
						realX = faker - (Math.abs(limit) * caseOne);
					}
					if ((limit * limitCount) < (Math.abs(movedcheck) + half)) {
						for (i=0;i<caseOne;i++) {
							remakeRi();
						}
					}
					mapword = 'right';
				} else if ((mapCheck < 0) && (lastX != 0) && (!isMobile)) {//left
					if (mapword == 'right') {
						recount = true;
						mapword = 'left';
					}
					if (recount) {
						limitCount = 1;
						recount = false;
						returnX = x;
					}
					movedcheck = x-returnX;
					var caseOne = Math.abs(Math.floor((Math.abs(movedcheck) + limit) / limit) - limitCount + 1);
					var remakeLe = function () {
						var lastCont = $wrapper.find('> li').eq(0).attr('data-call');
						$wrapper.find('> li').eq(0).remove();
						$wrapper.append($items[lastCont]);
						limitCount++;
						realX = faker + (Math.abs(limit) * caseOne);
					}
					if ((limit * limitCount) < (Math.abs(movedcheck) + half)) {
						for (i=0;i<caseOne;i++) {
							remakeLe();
						}
					}
					mapword = 'left';
				}
				moved = realX+(x-downX);
			}
			if (!endless && (!nowPage || nowPage == max-1)) {
				moved /= 2;
			}

			if (!useFade) $wrapper._css('translate3dX', moved);
			onMove(moved);

			if (nowTime-300 > startTime) {
				startTime = nowTime;
				baseX = x;
			}

			if (!isMobile && !blockerAdded) {
				$blocker.appendTo($box);
				blockerAdded = true;
			}

			lastX = x;
			$(document).on('mouseleave', function () {
				if ($('html').hasClass('firefox')) {
					up(e)
				}
			});
			e.preventDefault();
		}

		function onMove(v, moveOnly) {
			var now = $.isPlainObject(v) ? v.translate3dX : v;
			moveOnly !== true && eventMove && eventMove.call($box, now);
		}

		function up(e) {

			var x = getEventPoint(e)[0],
				movedvalue = x - baseX;

			if (x != downX) {
				if (!newstyle) {
					if (10 > Math.abs(x-downX)) {
						back();
					} else if (!movedvalue || new Date().getTime()-startTime > 300) {
						if (moved > boxWidth/2 && (endless || nowPage)) {
							toPrev(false, true);
						} else if (-boxWidth/2 > moved && (endless || nowPage != max-1)) {
							toNext(false, true);
						} else {
							back();
						}
					} else {
						if (movedvalue > 0 && (endless || nowPage)) {
							toPrev(false, true);
						} else if (0 > movedvalue && (endless || nowPage != max-1)) {
							toNext(false, true);
						} else {
							back();
						}
					}
				} else {
					dragPoint = false;

					limitCount = 1;
					if (isMobile) {
						if (Math.abs(movedvalue) > 10) {
							if (movedvalue > 0) {
								if (realAni) {
									changeNew(-1);
								}
							} else {
								if (realAni) {
									changeNew(1);
								}
							}
							changePhone = true;
						} else {
							$wrapper._animate({translate3dX:setX}, {duration: 300, easing: 'easeOutCubic', force3D: true, complete: callEnd});
						}
					} else {
						$wrapper._animate({translate3dX:setX}, {duration: 300, easing: 'easeOutCubic', force3D: true, complete: callEnd});
					}
				}
			} else {
				setAutoPlay();
			}

			if (!isMobile && blockerAdded) {
				$blocker.detach();
				blockerAdded = false;
			}

			$doc.unbind(getEventType({mousemove: move, mouseup: up}));

		}
		function callEnd() {
			var center = $win.width() / 2;
			var allC = [];
			var allCsma = [];
			var full = $wrapper.find(' > li').length;
			for (i = 0;i<full;i++) {
				allC[i] = Math.abs($wrapper.find(' > li').eq(i).offset().left + ($wrapper.find(' > li').eq(i).innerWidth() / 2) - center);
				allCsma[i] = Math.ceil($wrapper.find(' > li').eq(i).offset().left + ($wrapper.find(' > li').eq(i).innerWidth() / 2) - center);
			}
			var currin = Math.min.apply(null, allC);
    		var curr;
    		if(!Array.indexOf){
		        for(var i=0; i<allC.length; i++){
		            if(allC[i]==currin){
		                curr = i;
		            }
		        }
			} else {
				curr = allC.indexOf(currin);
			}
			nowPage = $wrapper.find(' > li').eq(curr).attr('data-call');
			setButtons();
			changeEnd();
			dragPoint = true;
		}

		function back() {
			wrapperMove(0, 'back');
		}

		function change(option) {
			var nextPage, moveTo, page = parseInt(option.to);
			if (!clickAble) {
				return false;
			}
			nextPage = typeof page == 'number' && !isNaN(page) ? page : this.getAttribute ? parseInt(this.getAttribute('data-page')) : null;
			if ($items[0].parent().parent().hasClass('g-contents')) {
				if (nextPage != 0) {
					$items[nextPage - 1].addClass('show');
					if ((max - 1) != nextPage) {
						$items[nextPage + 1].addClass('show');
					}
				} else {
					$items[nextPage + 1].addClass('show');
				}
			}
			if (nextPage !== null && nextPage != nowPage && nextPage > -1 && max > nextPage) {

				resize();
				if (useFade) {
					fade(nextPage, option.noAnimation);
				} else {
					moveTo = (nowPage-nextPage)*moveSize;
					readyToMove(nextPage);
					wrapperMove(moveTo, 'slide', option.noAnimation);
				}
			}
			return false;
		}

		function toPrev(e, fromSwipe, noAnimation) {
			var nextPage;
			if (!clickAble || (!endless && !nowPage)) {
				return false;
			}
			if (!newstyle) {
				nextPage = !nowPage ? max-1 : nowPage-1;
				if (useFade) {
					fade(nextPage, noAnimation);
				} else {
					readyToMove(nextPage, 'prev', fromSwipe);
					wrapperMove(moveSize, 'slide', noAnimation);
				}
			} else {
				if (realAni) {
					changeNew(-1);
				}
			}
			e && e.preventDefault();
			return false;
		}

		function toNext(e, fromSwipe, noAnimation) {
			var nextPage;
			if (!clickAble || (!endless && nowPage == max-1)) {
				return false;
			}
			if (!newstyle) {
				nextPage = nowPage == max-1 ? 0 : nowPage+1;
				if (useFade) {
					fade(nextPage, noAnimation);
				} else {
					readyToMove(nextPage, 'next', fromSwipe);
					wrapperMove(-moveSize, 'slide', noAnimation);
				}
			} else {
				if (realAni) {
					changeNew(1);
				}
			}
			e && e.preventDefault();
			return false;
		}

		function jump(option) {
			var direction, page = option.to;
			if (!clickAble || page == nowPage) {
				return false;
			}
			if (useFade) {
				change(option);
			} else {
				for (i = 0; i < max; i++) {
					if (!$items[0].parent().parent().hasClass('g-contents')) {
						i != page && i != nowPage && $items[i].hide();
					} else {
						i != page && i != nowPage && $items[i].removeClass('show');
					}
				}
				direction = option.pretendTo ? option.pretendTo : nowPage > page ? 'prev' : 'next';
				readyToMove(page, direction);
				wrapperMove(direction == 'prev' ? moveSize : -moveSize, 'slide', option.noAnimation);
			}
			return false;
		}

		function readyToMove(nextPage, prevOrNext, withoutDisplays) {
			var from, to;
			if (!withoutDisplays) {
				if (prevOrNext) {
					appendItem(nextPage, prevOrNext == 'next' ? '100%' : '-100%');
				} else {
					from = Math.min(nowPage, nextPage);
					to = Math.max(nowPage, nextPage);
					for (i = from; i <= to; i++) {
						if (i != nowPage) {
							appendItem(i, (i-nowPage)*100+'%');
						}
					}
				}
			}

			ready(nextPage);
		}

		function ready(nextPage) {
			clearAutoPlay();
			clickAble = false;
			nowPage = nextPage;
			setButtons();			
			eventChange && eventChange.call($box, nowPage, max);
			resize();
		}

		function appendItem(target, left) {
			if (!newstyle) {
				(typeof target == 'number' ? $items[target] : target).css({position: 'absolute', left: left}).show();
			}
			if ((!$items[0].parent().parent().hasClass('g-contents')) && (!newstyle)) {
				(typeof target == 'number' ? $items[target] : target).addClass('show');
			}

		}

		function fade(nextPage, noAnimation) {
			var fadeDelay;
			clearTimeout(fadeDelay);

			if (animate && !noAnimation) {
				appendItem(nowPage, 0);
				if (useTransition) {
					$items[nowPage]._animate({opacity: 0}, aniOption.fade);
					fadeDelay = setTimeout(function () {
						$items[nextPage].show()._animate({opacity: 1}, aniOption.fade);
					},500);
				} else {
					$items[nowPage]._animate({opacity: 0}, aniOption.fade);
					fadeDelay = setTimeout(function () {
						$items[nextPage].show()._animate({opacity: 1}, aniOption.fade);
					},500);
				}
				nowPage = nextPage;
				setButtons();
			} else {
				changeEnd();
			}
		}

		function wrapperMove(value, aniOptionKey, noAnimation) {
			if ($items[0].parent().parent().hasClass('g-contents')) {
				$items[nowPage].addClass('show');
			}
			if (animate && !noAnimation) {
				if (useTransition) {
					$wrapper._transition({translate3dX: value}, aniOption[aniOptionKey]);
				} else {
					$wrapper._animate({translate3dX: value}, aniOption[aniOptionKey]);
				}
			} else {
				changeEnd();
			}
		}

		function setButtons() {
			for (i = 0; i < max; i++) {
				if (paging) {
					$pagingItems[i][ ( i == nowPage )? 'addClass' : 'removeClass' ]('on');
				}
			}
			if (!endless && arrows) {
				$prev[!nowPage ? 'addClass' : 'removeClass' ]('disabled');
				$next[nowPage == max-1 ? 'addClass' : 'removeClass' ]('disabled');
			}
		}

		function changeEnd() {
			var $prevItem, $nextItem, $nowItem;
			for (i = 0; i < max; i++) {
				if (i == nowPage) {
					$items[i].css({position: 'relative', left: 0}).addClass('xlider-current show');
					$prevItem = $items[!nowPage ? endless ? max-1 : -1 : nowPage-1],
					$nextItem = $items[nowPage == max-1 ? endless ? 0 : max : nowPage+1];
				} else {
					if ((!$items[0].parent().parent().hasClass('g-contents')) && (!newstyle)) {
						$items[i].hide().removeClass('xlider-current');
					} else {
						$items[i].removeClass('xlider-current show');
					}
				}
			}

			if ((!useFade) && (!newstyle)) {

				if ($fakeItem) {
					$fakeItem.remove();
					$fakeItem = null;
				}

				$wrapper._css('translate3dX', 0);

				$prevItem = $items[!nowPage ? endless ? max-1 : -1 : nowPage-1],
				$nextItem = $items[nowPage == max-1 ? endless ? 0 : max : nowPage+1],
				$nowItem = $items[nowPage];

				if (endless && $prevItem[0] == $nextItem[0]) {
					$fakeItem = $prevItem.clone().addClass('xlider-fake');
					$fakeItem.appendTo($wrapper);
					appendItem($fakeItem, itemWidth, true);
				}

				for (i = 0; i < max; i++) {
					if ($prevItem && $items[i][0] == $prevItem[0]) {
						appendItem(i, '-'+ itemWidth);
					} else if ($nextItem && $items[i][0] == $nextItem[0]) {
						appendItem(i, itemWidth);
					}
				}

			}
			if (newstyle) {
				$prevItem = $items[!nowPage ? endless ? max-1 : -1 : nowPage-1],
				$nextItem = $items[nowPage == max-1 ? endless ? 0 : max : nowPage+1],
				$nowItem = $items[nowPage];
			}


			clickAble = true;

			eventChangeEnd && eventChangeEnd.call($box, nowPage, max);

			setAutoPlay();

		}

		function autoPlayAction() {
			jump({to: nowPage == max-1 ? 0 : nowPage+1, pretendTo: 'next'});
		}

		function clearAutoPlay() {
			clearTimeout(autoPlayTimer);
		}

		function setAutoPlay() {
			clearAutoPlay();
			if (autoPlaying) {
				autoPlayTimer = setTimeout(autoPlayAction, autoPlay);
			}
		}

		function toggleAuto(value) {
			autoPlaying = typeof(value) == 'boolean' ? value : !autoPlaying;
			if (!autoPlaying) {
				clearAutoPlay();
			} else {
				setAutoPlay();
			}
			return autoPlaying;
		}

		function setWrapperMS() {
			if (animate) {
				aniOption.slide.duration = animateDuration || Math.max(450, Math.min(moveSize, 750));
				aniOption.back.duration = (animateDuration || aniOption.slide.duration)*0.75;
				aniOption.fade.duration = animateDuration || 200;
			}
		}

		function itemFocusablesFocused() {
			var index;
			if ($box) {
				index = parseInt(this.getAttribute('data-xlider-page'));
				$box[0].scrollLeft = 0;
				setTimeout(function() {
					$box[0].scrollLeft = 0;
				}, 0);
				$box.xlider('change', index, true);
			}
		}

		function resize() {
			if ( $box && $box.length ) {
				boxWidth = $box[0].offsetWidth;
				itemWidth = multiMode ? $items[0][0].offsetWidth : '100%';
				moveSize = multiMode ? itemWidth : boxWidth;
				if (newstyle) {
					clearTimeout(resetMover);
					resetMover = setTimeout(function() {
						settingView();
					}, 100);
				}
				setWrapperMS();
			}
		}

		return  {
			jump   : function(val) {
				if ( val instanceof Object ) {
					jump(val);	
				} else if ( typeof val === 'number' ) {
					jump({to:val})
				} else {
					return console.warn('xlider variable Type Error!!');
				}
			},
			change : change,
			changeNew : pagingClick,
			toNext : toNext,
			toPrev : toPrev,
			resize : resize,
			remove : remove,
			changeEnd : changeEnd
		}
	}

	function cancelEvent(e) {
		e.preventDefault();
	}



})(window.jQuery);
