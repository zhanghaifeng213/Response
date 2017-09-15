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
;var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){_gsScope._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(z,v,k){var A=function(f){var l,a=[],h=f.length;for(l=0;l!==h;a.push(f[l++])){}return a},b=function(a,h,f){k.call(this,a,h,f),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=b.prototype.render},g=1e-10,w=k._internals,d=w.isSelector,m=w.isArray,j=b.prototype=k.to({},0.1,{}),x=[];b.version="1.16.1",j.constructor=b,j.kill()._gc=!1,b.killTweensOf=b.killDelayedCallsTo=k.killTweensOf,b.getTweensOf=k.getTweensOf,b.lagSmoothing=k.lagSmoothing,b.ticker=k.ticker,b.render=k.render,j.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),k.prototype.invalidate.call(this)},j.updateTo=function(E,C){var F,f=this.ratio,p=this.vars.immediateRender||E.immediateRender;C&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(F in E){this.vars[F]=E[F]}if(this._initted||p){if(C){this._initted=!1,p&&this.render(0,!0,!0)}else{if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&k._onPluginEvent("_onDisable",this),this._time/this._duration>0.998){var D=this._time;this.render(0,!0,!1),this._initted=!1,this.render(D,!0,!1)}else{if(this._time>0||p){this._initted=!1,this._init();for(var i,B=1/(1-f),u=this._firstPT;u;){i=u.s+u.c,u.c*=B,u.s=i-u.c,u=u._next}}}}}return this},j.render=function(O,I,E){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var P,a,B,F,D,N,n,H,K=this._dirty?this.totalDuration():this._totalDuration,C=this._time,J=this._totalTime,G=this._cycle,M=this._duration,L=this._rawPrevTime;if(O>=K?(this._totalTime=K,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=M,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(P=!0,a="onComplete",E=E||this._timeline.autoRemoveChildren),0===M&&(this._initted||!this.vars.lazy||E)&&(this._startTime===this._timeline._duration&&(O=0),(0===O||0>L||L===g)&&L!==O&&(E=!0,L>g&&(a="onReverseComplete")),this._rawPrevTime=H=!I||O||L===O?O:g)):1e-7>O?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==J||0===M&&L>0)&&(a="onReverseComplete",P=this._reversed),0>O&&(this._active=!1,0===M&&(this._initted||!this.vars.lazy||E)&&(L>=0&&(E=!0),this._rawPrevTime=H=!I||O||L===O?O:g)),this._initted||(E=!0)):(this._totalTime=this._time=O,0!==this._repeat&&(F=M+this._repeatDelay,this._cycle=this._totalTime/F>>0,0!==this._cycle&&this._cycle===this._totalTime/F&&this._cycle--,this._time=this._totalTime-this._cycle*F,this._yoyo&&0!==(1&this._cycle)&&(this._time=M-this._time),this._time>M?this._time=M:0>this._time&&(this._time=0)),this._easeType?(D=this._time/M,N=this._easeType,n=this._easePower,(1===N||3===N&&D>=0.5)&&(D=1-D),3===N&&(D*=2),1===n?D*=D:2===n?D*=D*D:3===n?D*=D*D*D:4===n&&(D*=D*D*D*D),this.ratio=1===N?1-D:2===N?D:0.5>this._time/M?D/2:1-D/2):this.ratio=this._ease.getRatio(this._time/M)),C===this._time&&!E&&G===this._cycle){return J!==this._totalTime&&this._onUpdate&&(I||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||x)),void 0}if(!this._initted){if(this._init(),!this._initted||this._gc){return}if(!E&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)){return this._time=C,this._totalTime=J,this._rawPrevTime=L,this._cycle=G,w.lazyTweens.push(this),this._lazy=[O,I],void 0}this._time&&!P?this.ratio=this._ease.getRatio(this._time/M):P&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==C&&O>=0&&(this._active=!0),0===J&&(2===this._initted&&O>0&&this._init(),this._startAt&&(O>=0?this._startAt.render(O,I,E):a||(a="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===M)&&(I||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||x))),B=this._firstPT;B;){B.f?B.t[B.p](B.c*this.ratio+B.s):B.t[B.p]=B.c*this.ratio+B.s,B=B._next}this._onUpdate&&(0>O&&this._startAt&&this._startTime&&this._startAt.render(O,I,E),I||(this._totalTime!==J||P)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||x)),this._cycle!==G&&(I||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||x)),a&&(!this._gc||E)&&(0>O&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(O,I,E),P&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!I&&this.vars[a]&&this.vars[a].apply(this.vars[a+"Scope"]||this,this.vars[a+"Params"]||x),0===M&&this._rawPrevTime===g&&H!==g&&(this._rawPrevTime=0))},b.to=function(f,h,a){return new b(f,h,a)},b.from=function(f,h,a){return a.runBackwards=!0,a.immediateRender=0!=a.immediateRender,new b(f,h,a)},b.fromTo=function(f,l,a,h){return h.startAt=a,h.immediateRender=0!=h.immediateRender&&0!=a.immediateRender,new b(f,l,h)},b.staggerTo=b.allTo=function(J,C,i,G,r,I,h){G=G||0;var B,E,o,D,s=i.delay||0,H=[],F=function(){i.onComplete&&i.onComplete.apply(i.onCompleteScope||this,arguments),r.apply(h||this,I||x)};for(m(J)||("string"==typeof J&&(J=k.selector(J)||J),d(J)&&(J=A(J))),J=J||[],0>G&&(J=A(J),J.reverse(),G*=-1),B=J.length-1,o=0;B>=o;o++){E={};for(D in i){E[D]=i[D]}E.delay=s,o===B&&r&&(E.onComplete=F),H[o]=new b(J[o],C,E),s+=G}return H},b.staggerFrom=b.allFrom=function(l,r,h,p,B,f,u){return h.runBackwards=!0,h.immediateRender=0!=h.immediateRender,b.staggerTo(l,r,h,p,B,f,u)},b.staggerFromTo=b.allFromTo=function(p,B,l,u,D,f,C,r){return u.startAt=l,u.immediateRender=0!=u.immediateRender&&0!=l.immediateRender,b.staggerTo(p,B,u,D,f,C,r)},b.delayedCall=function(f,l,a,h,o){return new b(l,0,{delay:f,onComplete:l,onCompleteParams:a,onCompleteScope:h,onReverseComplete:l,onReverseCompleteParams:a,onReverseCompleteScope:h,immediateRender:!1,useFrames:o,overwrite:0})},b.set=function(a,f){return new b(a,0,f)},b.isTweening=function(a){return k.getTweensOf(a,!0).length>0};var y=function(a,i){for(var f=[],h=0,l=a._first;l;){l instanceof k?f[h++]=l:(i&&(f[h++]=l),f=f.concat(y(l,i)),h=f.length),l=l._next}return f},c=b.getAllTweens=function(a){return y(z._rootTimeline,a).concat(y(z._rootFramesTimeline,a))};b.killAll=function(F,B,G,e){null==B&&(B=!0),null==G&&(G=!0);var p,D,f,C=c(0!=e),u=C.length,E=B&&G&&e;for(f=0;u>f;f++){D=C[f],(E||D instanceof v||(p=D.target===D.vars.onComplete)&&G||B&&!p)&&(F?D.totalTime(D._reversed?0:D.totalDuration()):D._enabled(!1,!1))}},b.killChildTweensOf=function(o,B){if(null!=o){var C,a,i,h,s,r=w.tweenLookup;if("string"==typeof o&&(o=k.selector(o)||o),d(o)&&(o=A(o)),m(o)){for(h=o.length;--h>-1;){b.killChildTweensOf(o[h],B)}}else{C=[];for(i in r){for(a=r[i].target.parentNode;a;){a===o&&(C=C.concat(r[i].tweens)),a=a.parentNode}}for(s=C.length,h=0;s>h;h++){B&&C[h].totalTime(C[h].totalDuration()),C[h]._enabled(!1,!1)}}}};var q=function(E,B,F,e){B=B!==!1,F=F!==!1,e=e!==!1;for(var p,D,f=c(e),C=B&&F&&e,u=f.length;--u>-1;){D=f[u],(C||D instanceof v||(p=D.target===D.vars.onComplete)&&F||B&&!p)&&D.paused(E)}};return b.pauseAll=function(f,h,a){q(!0,f,h,a)},b.resumeAll=function(f,h,a){q(!1,f,h,a)},b.globalTimeScale=function(h){var a=z._rootTimeline,f=k.ticker.time;return arguments.length?(h=h||g,a._startTime=f-(f-a._startTime)*a._timeScale/h,a=z._rootFramesTimeline,f=k.ticker.frame,a._startTime=f-(f-a._startTime)*a._timeScale/h,a._timeScale=z._rootTimeline._timeScale=h,h):a._timeScale},j.progress=function(a){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},j.totalProgress=function(a){return arguments.length?this.totalTime(this.totalDuration()*a,!1):this._totalTime/this.totalDuration()},j.time=function(a,f){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,f)):this._time},j.duration=function(a){return arguments.length?z.prototype.duration.call(this,a):this._duration},j.totalDuration=function(a){return arguments.length?-1===this._repeat?this:this.duration((a-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},j.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},j.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},j.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},b},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(F,z,w){var G=function(c){z.call(this,c),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var a,d,e=this.vars;for(d in e){a=e[d],x(a)&&-1!==a.join("").indexOf("{self}")&&(e[d]=this._swapSelfInParams(a))}x(e.tweens)&&this.add(e.tweens,0,e.align,e.stagger)},b=1e-10,k=w._internals,C=G._internals={},j=k.isSelector,x=k.isArray,v=k.lazyTweens,D=k.lazyRender,E=[],g=_gsScope._gsDefine.globals,y=function(c){var d,a={};for(d in c){a[d]=c[d]}return a},B=C.pauseCallback=function(K,H,r,L){var f,I=K._timeline,d=I._totalTime,u=K._startTime,m=0>K._rawPrevTime||0===K._rawPrevTime&&I._reversed,J=m?0:b,c=m?b:0;if(H||!this._forcingPlayhead){for(I.pause(u),f=K._prev;f&&f._startTime===u;){f._rawPrevTime=c,f=f._prev}for(f=K._next;f&&f._startTime===u;){f._rawPrevTime=J,f=f._next}H&&H.apply(L||I,r||E),(this._forcingPlayhead||!I._paused)&&I.seek(d)}},q=function(c){var f,a=[],d=c.length;for(f=0;f!==d;a.push(c[f++])){}return a},A=G.prototype=new z;return G.version="1.16.1",A.constructor=G,A.kill()._gc=A._forcingPlayhead=!1,A.to=function(a,f,c,d){var h=c.repeat&&g.TweenMax||w;return f?this.add(new h(a,f,c),d):this.set(a,c,d)},A.from=function(a,f,c,d){return this.add((c.repeat&&g.TweenMax||w).from(a,f,c),d)},A.fromTo=function(d,i,f,h,l){var c=h.repeat&&g.TweenMax||w;return i?this.add(c.fromTo(d,i,f,h),l):this.set(d,h,l)},A.staggerTo=function(J,o,c,f,s,m,i,H){var I,d=new G({onComplete:m,onCompleteParams:i,onCompleteScope:H,smoothChildTiming:this.smoothChildTiming});for("string"==typeof J&&(J=w.selector(J)||J),J=J||[],j(J)&&(J=q(J)),f=f||0,0>f&&(J=q(J),J.reverse(),f*=-1),I=0;J.length>I;I++){c.startAt&&(c.startAt=y(c.startAt)),d.to(J[I],o,y(c),I*f)}return this.add(d,s)},A.staggerFrom=function(f,m,d,h,l,u,c,p){return d.immediateRender=0!=d.immediateRender,d.runBackwards=!0,this.staggerTo(f,m,d,h,l,u,c,p)},A.staggerFromTo=function(H,p,l,I,c,f,u,d,m){return I.startAt=l,I.immediateRender=0!=I.immediateRender&&0!=l.immediateRender,this.staggerTo(H,p,I,c,f,u,d,m)},A.call=function(a,f,c,d){return this.add(w.delayedCall(0,a,f,c),d)},A.set=function(a,d,c){return c=this._parseTimeOrLabel(c,0,!0),null==d.immediateRender&&(d.immediateRender=c===this._time&&!this._paused),this.add(new w(a,0,d),c)},G.exportRoot=function(d,h){d=d||{},null==d.smoothChildTiming&&(d.smoothChildTiming=!0);var f,l,c=new G(d),i=c._timeline;for(null==h&&(h=!0),i._remove(c,!0),c._startTime=0,c._rawPrevTime=c._time=c._totalTime=i._time,f=i._first;f;){l=f._next,h&&f instanceof w&&f.target===f.vars.onComplete||c.add(f,f._startTime-f._delay),f=l}return i.add(c,0),c},A.add=function(d,i,H,h){var m,I,J,e,s,t;if("number"!=typeof i&&(i=this._parseTimeOrLabel(i,0,!0,d)),!(d instanceof F)){if(d instanceof Array||d&&d.push&&x(d)){for(H=H||"normal",h=h||0,m=i,I=d.length,J=0;I>J;J++){x(e=d[J])&&(e=new G({tweens:e})),this.add(e,m),"string"!=typeof e&&"function"!=typeof e&&("sequence"===H?m=e._startTime+e.totalDuration()/e._timeScale:"start"===H&&(e._startTime-=e.delay())),m+=h}return this._uncache(!0)}if("string"==typeof d){return this.addLabel(d,i)}if("function"!=typeof d){throw"Cannot add "+d+" into the timeline; it is not a tween, timeline, function, or string."}d=w.delayedCall(0,d)}if(z.prototype.add.call(this,d,i),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration()){for(s=this,t=s.rawTime()>d._startTime;s._timeline;){t&&s._timeline.smoothChildTiming?s.totalTime(s._totalTime,!0):s._gc&&s._enabled(!0,!1),s=s._timeline}}return this},A.remove=function(c){if(c instanceof F){return this._remove(c,!1)}if(c instanceof Array||c&&c.push&&x(c)){for(var a=c.length;--a>-1;){this.remove(c[a])}return this}return"string"==typeof c?this.removeLabel(c):this.kill(null,c)},A._remove=function(c,a){z.prototype._remove.call(this,c,a);var d=this._last;return d?this._time>d._startTime+d._totalDuration/d._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},A.append=function(a,c){return this.add(a,this._parseTimeOrLabel(null,c,!0,a))},A.insert=A.insertMultiple=function(c,f,a,d){return this.add(c,f||0,a,d)},A.appendMultiple=function(c,f,a,d){return this.add(c,this._parseTimeOrLabel(null,f,!0,c),a,d)},A.addLabel=function(a,c){return this._labels[a]=this._parseTimeOrLabel(c),this},A.addPause=function(a,f,c,d){var h=w.delayedCall(0,B,["{self}",f,c,d],this);return h.data="isPause",this.add(h,a)},A.removeLabel=function(a){return delete this._labels[a],this},A.getLabelTime=function(a){return null!=this._labels[a]?this._labels[a]:-1},A._parseTimeOrLabel=function(f,a,c,d){var h;if(d instanceof F&&d.timeline===this){this.remove(d)}else{if(d&&(d instanceof Array||d.push&&x(d))){for(h=d.length;--h>-1;){d[h] instanceof F&&d[h].timeline===this&&this.remove(d[h])}}}if("string"==typeof a){return this._parseTimeOrLabel(a,c&&"number"==typeof f&&null==this._labels[a]?f-this.duration():0,c)}if(a=a||0,"string"!=typeof f||!isNaN(f)&&null==this._labels[f]){null==f&&(f=this.duration())}else{if(h=f.indexOf("="),-1===h){return null==this._labels[f]?c?this._labels[f]=this.duration()+a:a:this._labels[f]+a}a=parseInt(f.charAt(h-1)+"1",10)*Number(f.substr(h+1)),f=h>1?this._parseTimeOrLabel(f.substr(0,h-1),0,c):this.duration()}return Number(f)+a},A.seek=function(a,c){return this.totalTime("number"==typeof a?a:this._parseTimeOrLabel(a),c!==!1)},A.stop=function(){return this.paused(!0)},A.gotoAndPlay=function(a,c){return this.play(a,c)},A.gotoAndStop=function(a,c){return this.pause(a,c)},A.render=function(P,L,I){this._gc&&this._enabled(!0,!1);var Q,u,O,r,J,l=this._dirty?this.totalDuration():this._totalDuration,K=this._time,N=this._startTime,H=this._timeScale,M=this._paused;if(P>=l){this._totalTime=this._time=l,this._reversed||this._hasPausedChild()||(u=!0,r="onComplete",J=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===P||0>this._rawPrevTime||this._rawPrevTime===b)&&this._rawPrevTime!==P&&this._first&&(J=!0,this._rawPrevTime>b&&(r="onReverseComplete"))),this._rawPrevTime=this._duration||!L||P||this._rawPrevTime===P?P:b,P=l+0.0001}else{if(1e-7>P){if(this._totalTime=this._time=0,(0!==K||0===this._duration&&this._rawPrevTime!==b&&(this._rawPrevTime>0||0>P&&this._rawPrevTime>=0))&&(r="onReverseComplete",u=this._reversed),0>P){this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(J=u=!0,r="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(J=!0),this._rawPrevTime=P}else{if(this._rawPrevTime=this._duration||!L||P||this._rawPrevTime===P?P:b,0===P&&u){for(Q=this._first;Q&&0===Q._startTime;){Q._duration||(u=!1),Q=Q._next}}P=0,this._initted||(J=!0)}}else{this._totalTime=this._time=this._rawPrevTime=P}}if(this._time!==K&&this._first||I||J){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==K&&P>0&&(this._active=!0),0===K&&this.vars.onStart&&0!==this._time&&(L||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||E)),this._time>=K){for(Q=this._first;Q&&(O=Q._next,!this._paused||M);){(Q._active||Q._startTime<=this._time&&!Q._paused&&!Q._gc)&&(Q._reversed?Q.render((Q._dirty?Q.totalDuration():Q._totalDuration)-(P-Q._startTime)*Q._timeScale,L,I):Q.render((P-Q._startTime)*Q._timeScale,L,I)),Q=O}}else{for(Q=this._last;Q&&(O=Q._prev,!this._paused||M);){(Q._active||K>=Q._startTime&&!Q._paused&&!Q._gc)&&(Q._reversed?Q.render((Q._dirty?Q.totalDuration():Q._totalDuration)-(P-Q._startTime)*Q._timeScale,L,I):Q.render((P-Q._startTime)*Q._timeScale,L,I)),Q=O}}this._onUpdate&&(L||(v.length&&D(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||E))),r&&(this._gc||(N===this._startTime||H!==this._timeScale)&&(0===this._time||l>=this.totalDuration())&&(u&&(v.length&&D(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!L&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||E)))}},A._hasPausedChild=function(){for(var a=this._first;a;){if(a._paused||a instanceof G&&a._hasPausedChild()){return !0}a=a._next}return !1},A.getChildren=function(d,i,f,h){h=h||-9999999999;for(var m=[],c=this._first,l=0;c;){h>c._startTime||(c instanceof w?i!==!1&&(m[l++]=c):(f!==!1&&(m[l++]=c),d!==!1&&(m=m.concat(c.getChildren(!0,i,f)),l=m.length))),c=c._next}return m},A.getTweensOf=function(d,i){var f,h,m=this._gc,c=[],l=0;for(m&&this._enabled(!0,!0),f=w.getTweensOf(d),h=f.length;--h>-1;){(f[h].timeline===this||i&&this._contains(f[h]))&&(c[l++]=f[h])}return m&&this._enabled(!1,!0),c},A.recent=function(){return this._recent},A._contains=function(a){for(var c=a.timeline;c;){if(c===this){return !0}c=c.timeline}return !1},A.shiftChildren=function(c,h,a){a=a||0;for(var d,f=this._first,l=this._labels;f;){f._startTime>=a&&(f._startTime+=c),f=f._next}if(h){for(d in l){l[d]>=a&&(l[d]+=c)}}return this._uncache(!0)},A._kill=function(c,h){if(!c&&!h){return this._enabled(!1,!1)}for(var a=h?this.getTweensOf(h):this.getChildren(!0,!0,!1),d=a.length,f=!1;--d>-1;){a[d]._kill(c,h)&&(f=!0)}return f},A.clear=function(c){var d=this.getChildren(!1,!0,!0),a=d.length;for(this._time=this._totalTime=0;--a>-1;){d[a]._enabled(!1,!1)}return c!==!1&&(this._labels={}),this._uncache(!0)},A.invalidate=function(){for(var a=this._first;a;){a.invalidate(),a=a._next}return F.prototype.invalidate.call(this)},A._enabled=function(c,a){if(c===this._gc){for(var d=this._first;d;){d._enabled(c,!0),d=d._next}}return z.prototype._enabled.call(this,c,a)},A.totalTime=function(){this._forcingPlayhead=!0;var a=F.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,a},A.duration=function(a){return arguments.length?(0!==this.duration()&&0!==a&&this.timeScale(this._duration/a),this):(this._dirty&&this.totalDuration(),this._duration)},A.totalDuration=function(c){if(!arguments.length){if(this._dirty){for(var h,a,d=0,f=this._last,l=999999999999;f;){h=f._prev,f._dirty&&f.totalDuration(),f._startTime>l&&this._sortChildren&&!f._paused?this.add(f,f._startTime-f._delay):l=f._startTime,0>f._startTime&&!f._paused&&(d-=f._startTime,this._timeline.smoothChildTiming&&(this._startTime+=f._startTime/this._timeScale),this.shiftChildren(-f._startTime,!1,-9999999999),l=0),a=f._startTime+f._totalDuration/f._timeScale,a>d&&(d=a),f=h}this._duration=this._totalDuration=d,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==c&&this.timeScale(this._totalDuration/c),this},A.paused=function(d){if(!d){for(var a=this._first,c=this._time;a;){a._startTime===c&&"isPause"===a.data&&(a._rawPrevTime=0),a=a._next}}return F.prototype.paused.apply(this,arguments)},A.usesFrames=function(){for(var a=this._timeline;a._timeline;){a=a._timeline}return a===F._rootFramesTimeline},A.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},G},!0),_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(q,k,g){var u=function(a){q.call(this,a),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},b=1e-10,d=[],m=k._internals,c=m.lazyTweens,j=m.lazyRender,f=new g(null,null,1,0),p=u.prototype=new q;return p.constructor=u,p.kill()._gc=!1,u.version="1.16.1",p.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),q.prototype.invalidate.call(this)},p.addCallback=function(e,a,h,l){return this.add(k.delayedCall(0,e,h,l),a)},p.removeCallback=function(h,o){if(h){if(null==o){this._kill(null,h)}else{for(var a=this.getTweensOf(h,!1),l=a.length,n=this._parseTimeOrLabel(o);--l>-1;){a[l]._startTime===n&&a[l]._enabled(!1,!1)}}}return this},p.removePause=function(a){return this.removeCallback(q._internals.pauseCallback,a)},p.tweenTo=function(l,h){h=h||{};var n,v,e,w={ease:f,useFrames:this.usesFrames(),immediateRender:!1};for(v in h){w[v]=h[v]}return w.time=this._parseTimeOrLabel(l),n=Math.abs(Number(w.time)-this._time)/this._timeScale||0.001,e=new k(this,n,w),w.onStart=function(){e.target.paused(!0),e.vars.time!==e.target.time()&&n===e.duration()&&e.duration(Math.abs(e.vars.time-e.target.time())/e.target._timeScale),h.onStart&&h.onStart.apply(h.onStartScope||e,h.onStartParams||d)},e},p.tweenFromTo=function(h,n,a){a=a||{},h=this._parseTimeOrLabel(h),a.startAt={onComplete:this.seek,onCompleteParams:[h],onCompleteScope:this},a.immediateRender=a.immediateRender!==!1;var l=this.tweenTo(n,a);return l.duration(Math.abs(l.vars.time-h)/this._timeScale||0.001)},p.render=function(E,N,K){this._gc&&this._enabled(!0,!1);var F,V,I,W,D,G,M=this._dirty?this.totalDuration():this._totalDuration,Q=this._duration,H=this._time,O=this._totalTime,L=this._startTime,C=this._timeScale,z=this._rawPrevTime,h=this._paused,B=this._cycle;if(E>=M){this._locked||(this._totalTime=M,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(V=!0,W="onComplete",D=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===E||0>z||z===b)&&z!==E&&this._first&&(D=!0,z>b&&(W="onReverseComplete"))),this._rawPrevTime=this._duration||!N||E||this._rawPrevTime===E?E:b,this._yoyo&&0!==(1&this._cycle)?this._time=E=0:(this._time=Q,E=Q+0.0001)}else{if(1e-7>E){if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==H||0===Q&&z!==b&&(z>0||0>E&&z>=0)&&!this._locked)&&(W="onReverseComplete",V=this._reversed),0>E){this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(D=V=!0,W="onReverseComplete"):z>=0&&this._first&&(D=!0),this._rawPrevTime=E}else{if(this._rawPrevTime=Q||!N||E||this._rawPrevTime===E?E:b,0===E&&V){for(F=this._first;F&&0===F._startTime;){F._duration||(V=!1),F=F._next}}E=0,this._initted||(D=!0)}}else{0===Q&&0>z&&(D=!0),this._time=this._rawPrevTime=E,this._locked||(this._totalTime=E,0!==this._repeat&&(G=Q+this._repeatDelay,this._cycle=this._totalTime/G>>0,0!==this._cycle&&this._cycle===this._totalTime/G&&this._cycle--,this._time=this._totalTime-this._cycle*G,this._yoyo&&0!==(1&this._cycle)&&(this._time=Q-this._time),this._time>Q?(this._time=Q,E=Q+0.0001):0>this._time?this._time=E=0:E=this._time))}}if(this._cycle!==B&&!this._locked){var A=this._yoyo&&0!==(1&B),U=A===(this._yoyo&&0!==(1&this._cycle)),r=this._totalTime,n=this._cycle,J=this._rawPrevTime,o=this._time;if(this._totalTime=B*Q,B>this._cycle?A=!A:this._totalTime+=Q,this._time=H,this._rawPrevTime=0===Q?z-0.0001:z,this._cycle=B,this._locked=!0,H=A?0:Q,this.render(H,N,0===Q),N||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||d),U&&(H=A?Q+0.0001:-0.0001,this.render(H,!0,!1)),this._locked=!1,this._paused&&!h){return}this._time=o,this._totalTime=r,this._cycle=n,this._rawPrevTime=J}if(!(this._time!==H&&this._first||K||D)){return O!==this._totalTime&&this._onUpdate&&(N||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||d)),void 0}if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==O&&E>0&&(this._active=!0),0===O&&this.vars.onStart&&0!==this._totalTime&&(N||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||d)),this._time>=H){for(F=this._first;F&&(I=F._next,!this._paused||h);){(F._active||F._startTime<=this._time&&!F._paused&&!F._gc)&&(F._reversed?F.render((F._dirty?F.totalDuration():F._totalDuration)-(E-F._startTime)*F._timeScale,N,K):F.render((E-F._startTime)*F._timeScale,N,K)),F=I}}else{for(F=this._last;F&&(I=F._prev,!this._paused||h);){(F._active||H>=F._startTime&&!F._paused&&!F._gc)&&(F._reversed?F.render((F._dirty?F.totalDuration():F._totalDuration)-(E-F._startTime)*F._timeScale,N,K):F.render((E-F._startTime)*F._timeScale,N,K)),F=I}}this._onUpdate&&(N||(c.length&&j(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||d))),W&&(this._locked||this._gc||(L===this._startTime||C!==this._timeScale)&&(0===this._time||M>=this.totalDuration())&&(V&&(c.length&&j(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!N&&this.vars[W]&&this.vars[W].apply(this.vars[W+"Scope"]||this,this.vars[W+"Params"]||d)))},p.getActive=function(B,z,x){null==B&&(B=!0),null==z&&(z=!0),null==x&&(x=!1);var C,l,w=[],A=this.getChildren(B,z,x),v=0,y=A.length;for(C=0;y>C;C++){l=A[C],l.isActive()&&(w[v++]=l)}return w},p.getLabelAfter=function(h){h||0!==h&&(h=this._time);var n,a=this.getLabelsArray(),l=a.length;for(n=0;l>n;n++){if(a[n].time>h){return a[n].name}}return null},p.getLabelBefore=function(h){null==h&&(h=this._time);for(var l=this.getLabelsArray(),a=l.length;--a>-1;){if(h>l[a].time){return l[a].name}}return null},p.getLabelsArray=function(){var h,l=[],a=0;for(h in this._labels){l[a++]={time:this._labels[h],name:h}}return l.sort(function(i,n){return i.time-n.time}),l},p.progress=function(a,h){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),h):this._time/this.duration()},p.totalProgress=function(a,h){return arguments.length?this.totalTime(this.totalDuration()*a,h):this._totalTime/this.totalDuration()},p.totalDuration=function(a){return arguments.length?-1===this._repeat?this:this.duration((a-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(q.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},p.time=function(a,h){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,h)):this._time},p.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},p.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},p.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},p.currentLabel=function(a){return arguments.length?this.seek(a,!0):this.getLabelBefore(this._time+1e-8)},u},!0),function(){var F=180/Math.PI,z=[],w=[],G=[],b={},k=_gsScope._gsDefine.globals,C=function(c,f,a,d){this.a=c,this.b=f,this.c=a,this.d=d,this.da=d-c,this.ca=a-c,this.ba=f-c},j=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",x=function(Q,M,J,R){var c={a:Q},H={},N={},m={c:R},K=(Q+M)/2,I=(M+J)/2,O=(J+R)/2,P=(K+I)/2,d=(I+O)/2,L=(d-P)/8;return c.b=K+(Q-K)/4,H.b=P+L,c.c=H.a=(c.b+H.b)/2,H.c=N.a=(P+d)/2,N.b=d-L,m.b=O+(R-O)/4,N.c=m.a=(N.b+m.b)/2,[c,H,N,m]},v=function(K,L,O,Y,N){var R,Z,J,M,U,W,Q,V,S,I,i,e,H,s=K.length-1,X=0,h=K[0].a;for(R=0;s>R;R++){U=K[X],Z=U.a,J=U.d,M=K[X+1].d,N?(i=z[R],e=w[R],H=0.25*(e+i)*L/(Y?0.5:G[R]||0.5),W=J-(J-Z)*(Y?0.5*L:0!==i?H/i:0),Q=J+(M-J)*(Y?0.5*L:0!==e?H/e:0),V=J-(W+((Q-W)*(3*i/(i+e)+0.5)/4||0))):(W=J-0.5*(J-Z)*L,Q=J+0.5*(M-J)*L,V=J-(W+Q)/2),W+=V,Q+=V,U.c=S=W,U.b=0!==R?h:h=U.a+0.6*(U.c-U.a),U.da=J-Z,U.ca=S-Z,U.ba=h-Z,O?(I=x(Z,h,S,J),K.splice(X,1,I[0],I[1],I[2],I[3]),X+=4):X++,h=Q}U=K[X],U.b=h,U.c=h+0.4*(U.d-h),U.da=U.d-U.a,U.ca=U.c-U.a,U.ba=h-U.a,O&&(I=x(U.a,h,U.c,U.d),K.splice(X,1,I[0],I[1],I[2],I[3]))},D=function(K,L,a,e){var d,m,i,I,J,c,H=[];if(e){for(K=[e].concat(K),m=K.length;--m>-1;){"string"==typeof(c=K[m][L])&&"="===c.charAt(1)&&(K[m][L]=e[L]+Number(c.charAt(0)+c.substr(2)))}}if(d=K.length-2,0>d){return H[0]=new C(K[0][L],0,0,K[-1>d?0:1][L]),H}for(m=0;d>m;m++){i=K[m][L],I=K[m+1][L],H[m]=new C(i,0,0,I),a&&(J=K[m+2][L],z[m]=(z[m]||0)+(I-i)*(I-i),w[m]=(w[m]||0)+(J-I)*(J-I))}return H[m]=new C(K[m][L],0,0,K[m+1][L]),H},E=function(R,i,N,r,Q,e){var H,J,l,I,s,P,L,o,O={},M=[],K=e||R[0];Q="string"==typeof Q?","+Q+",":j,null==i&&(i=1);for(J in R[0]){M.push(J)}if(R.length>1){for(o=R[R.length-1],L=!0,H=M.length;--H>-1;){if(J=M[H],Math.abs(K[J]-o[J])>0.05){L=!1;break}}L&&(R=R.concat(),e&&R.unshift(e),R.push(R[1]),e=R[R.length-3])}for(z.length=w.length=G.length=0,H=M.length;--H>-1;){J=M[H],b[J]=-1!==Q.indexOf(","+J+","),O[J]=D(R,J,b[J],e)}for(H=z.length;--H>-1;){z[H]=Math.sqrt(z[H]),w[H]=Math.sqrt(w[H])}if(!r){for(H=M.length;--H>-1;){if(b[J]){for(l=O[M[H]],P=l.length-1,I=0;P>I;I++){s=l[I+1].da/w[I]+l[I].da/z[I],G[I]=(G[I]||0)+s*s}}}for(H=G.length;--H>-1;){G[H]=Math.sqrt(G[H])}}for(H=M.length,I=N?4:1;--H>-1;){J=M[H],l=O[J],v(l,i,N,r,b[J]),L&&(l.splice(0,I),l.splice(l.length-I,I))}return O},g=function(I,U,Q){U=U||"soft";var J,K,N,M,R,P,X,H,L,T,W,O={},V="cubic"===U?3:2,S="soft"===U,a=[];if(S&&Q&&(I=[Q].concat(I)),null==I||V+1>I.length){throw"invalid Bezier data"}for(L in I[0]){a.push(L)}for(P=a.length;--P>-1;){for(L=a[P],O[L]=R=[],T=0,H=I.length,X=0;H>X;X++){J=null==Q?I[X][L]:"string"==typeof(W=I[X][L])&&"="===W.charAt(1)?Q[L]+Number(W.charAt(0)+W.substr(2)):Number(W),S&&X>1&&H-1>X&&(R[T++]=(J+R[T-2])/2),R[T++]=J}for(H=T-V+1,T=0,X=0;H>X;X+=V){J=R[X],K=R[X+1],N=R[X+2],M=2===V?0:R[X+3],R[T++]=W=3===V?new C(J,K,N,M):new C(J,(2*K+J)/3,(2*K+N)/3,N)}R.length=T}return O},y=function(U,P,M){for(var V,d,J,R,I,N,L,S,T,H,O,Q=1/M,K=U.length;--K>-1;){for(H=U[K],J=H.a,R=H.d-J,I=H.c-J,N=H.b-J,V=d=0,S=1;M>=S;S++){L=Q*S,T=1-L,V=d-(d=(L*L*R+3*T*(L*I+T*N))*L),O=K*M+S-1,P[O]=(P[O]||0)+V*V}}},B=function(O,K){K=K>>0||6;var I,P,c,m,L=[],f=[],J=0,H=0,M=K-1,N=[],d=[];for(I in O){y(O[I],L,K)}for(c=L.length,P=0;c>P;P++){J+=Math.sqrt(L[P]),m=P%K,d[m]=J,m===M&&(H+=J,m=P/K>>0,N[m]=d,f[m]=H,J=0,d=[])}return{length:H,lengths:f,segments:N}},q=_gsScope._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.4",API:2,global:!0,init:function(O,L,I){this._target=O,L instanceof Array&&(L={values:L}),this._func={},this._round={},this._props=[],this._timeRes=null==L.timeResolution?6:parseInt(L.timeResolution,10);var P,c,p,M,d,J=L.values||[],H={},N=J[0],K=L.autoRotate||I.vars.orientToBezier;this._autoRotate=K?K instanceof Array?K:[["x","y","rotation",K===!0?0:Number(K)||0]]:null;for(P in N){this._props.push(P)}for(p=this._props.length;--p>-1;){P=this._props[p],this._overwriteProps.push(P),c=this._func[P]="function"==typeof O[P],H[P]=c?O[P.indexOf("set")||"function"!=typeof O["get"+P.substr(3)]?P:"get"+P.substr(3)]():parseFloat(O[P]),d||H[P]!==J[0][P]&&(d=H)}if(this._beziers="cubic"!==L.type&&"quadratic"!==L.type&&"soft"!==L.type?E(J,isNaN(L.curviness)?1:L.curviness,!1,"thruBasic"===L.type,L.correlate,d):g(J,L.type,H),this._segCount=this._beziers[P].length,this._timeRes){var u=B(this._beziers,this._timeRes);this._length=u.length,this._lengths=u.lengths,this._segments=u.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(K=this._autoRotate){for(this._initialRotations=[],K[0] instanceof Array||(this._autoRotate=K=[K]),p=K.length;--p>-1;){for(M=0;3>M;M++){P=K[p][M],this._func[P]="function"==typeof O[P]?O[P.indexOf("set")||"function"!=typeof O["get"+P.substr(3)]?P:"get"+P.substr(3)]:!1}P=K[p][2],this._initialRotations[p]=this._func[P]?this._func[P].call(this._target):this._target[P]}}return this._startRatio=I.vars.runBackwards?1:0,!0},set:function(Y){var U,M,N,Q,ac,P,V,S,ad,L,O=this._segCount,X=this._func,aa=this._target,R=Y!==this._startRatio;if(this._timeRes){if(ad=this._lengths,L=this._curSeg,Y*=this._length,N=this._li,Y>this._l2&&O-1>N){for(S=O-1;S>N&&Y>=(this._l2=ad[++N]);){}this._l1=ad[N-1],this._li=N,this._curSeg=L=this._segments[N],this._s2=L[this._s1=this._si=0]}else{if(this._l1>Y&&N>0){for(;N>0&&(this._l1=ad[--N])>=Y;){}0===N&&this._l1>Y?this._l1=0:N++,this._l2=ad[N],this._li=N,this._curSeg=L=this._segments[N],this._s1=L[(this._si=L.length-1)-1]||0,this._s2=L[this._si]}}if(U=N,Y-=this._l1,N=this._si,Y>this._s2&&L.length-1>N){for(S=L.length-1;S>N&&Y>=(this._s2=L[++N]);){}this._s1=L[N-1],this._si=N}else{if(this._s1>Y&&N>0){for(;N>0&&(this._s1=L[--N])>=Y;){}0===N&&this._s1>Y?this._s1=0:N++,this._s2=L[N],this._si=N}}P=(N+(Y-this._s1)/(this._s2-this._s1))*this._prec}else{U=0>Y?0:Y>=1?O-1:O*Y>>0,P=(Y-U*(1/O))*O}for(M=1-P,N=this._props.length;--N>-1;){Q=this._props[N],ac=this._beziers[Q][U],V=(P*P*ac.da+3*M*(P*ac.ca+M*ac.ba))*P+ac.a,this._round[Q]&&(V=Math.round(V)),X[Q]?aa[Q](V):aa[Q]=V}if(this._autoRotate){var Z,W,K,H,t,J,I,ab=this._autoRotate;for(N=ab.length;--N>-1;){Q=ab[N][2],J=ab[N][3]||0,I=ab[N][4]===!0?1:F,ac=this._beziers[ab[N][0]],Z=this._beziers[ab[N][1]],ac&&Z&&(ac=ac[U],Z=Z[U],W=ac.a+(ac.b-ac.a)*P,H=ac.b+(ac.c-ac.b)*P,W+=(H-W)*P,H+=(ac.c+(ac.d-ac.c)*P-H)*P,K=Z.a+(Z.b-Z.a)*P,t=Z.b+(Z.c-Z.b)*P,K+=(t-K)*P,t+=(Z.c+(Z.d-Z.c)*P-t)*P,V=R?Math.atan2(t-K,H-W)*I+J:this._initialRotations[N],X[Q]?aa[Q](V):aa[Q]=V)}}}}),A=q.prototype;q.bezierThrough=E,q.cubicToQuadratic=x,q._autoCSS=!0,q.quadraticToCubic=function(c,d,a){return new C(c,(2*d+c)/3,(2*d+a)/3,a)},q._cssRegister=function(){var c=k.CSSPlugin;if(c){var h=c._internals,a=h._parseToProxy,d=h._setPluginRatio,f=h.CSSPropTween;h._registerComplexSpecialProp("bezier",{parser:function(P,J,r,M,m,H){J instanceof Array&&(J={values:J}),H=new q;var s,N,O,i=J.values,I=i.length-1,L=[],K={};if(0>I){return m}for(s=0;I>=s;s++){O=a(P,i[s],M,m,H,I!==s),L[s]=O.end}for(N in J){K[N]=J[N]}return K.values=L,m=new f(P,"bezier",0,0,O.pt,2),m.data=O,m.plugin=H,m.setRatio=d,0===K.autoRotate&&(K.autoRotate=!0),!K.autoRotate||K.autoRotate instanceof Array||(s=K.autoRotate===!0?0:Number(K.autoRotate),K.autoRotate=null!=O.end.left?[["left","top","rotation",s,!1]]:null!=O.end.x?[["x","y","rotation",s,!1]]:!1),K.autoRotate&&(M._transform||M._enableTransforms(!1),O.autoRotate=M._target._gsTransform),H._onInitTween(O.proxy,K,M._tween),m}})}},A._roundProps=function(c,f){for(var a=this._overwriteProps,d=a.length;--d>-1;){(c[a[d]]||c.bezier||c.bezierThrough)&&(this._round[a[d]]=f)}},A._kill=function(c){var f,a,d=this._props;for(f in this._beziers){if(f in c){for(delete this._beziers[f],delete this._func[f],a=d.length;--a>-1;){d[a]===f&&d.splice(a,1)}}}return this._super._kill.call(this,c)}}(),_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(au,aN){var aI,av,aw,aB,aT=function(){au.call(this,"css"),this._overwriteProps.length=0,this.setRatio=aT.prototype.setRatio},aA=_gsScope._gsDefine.globals,aJ={},aF=aT.prototype=new au("css");aF.constructor=aT,aT.version="1.16.1",aT.API=2,aT.defaultTransformPerspective=0,aT.defaultSkewType="compensated",aF="px",aT.suffixMap={top:aF,right:aF,bottom:aF,left:aF,width:aF,height:aF,fontSize:aF,padding:aF,margin:aF,perspective:aF,lineHeight:""};var aU,at,az,aM,aP,aC,aO=/(?:\d|\-\d|\.\d|\-\.\d)+/g,aL=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,ar=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,ao=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,a1=/(?:\d|\-|\+|=|#|\.)*/g,aq=/opacity *= *([^)]*)/i,ap=/opacity:([^;]*)/i,aS=/alpha\(opacity *=.+?\)/i,a6=/^(rgb|hsl)/,a3=/([A-Z])/g,aG=/-([a-z])/gi,a4=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,bs=function(a,b){return b.toUpperCase()},a7=/(?:Left|Right|Width)/i,bq=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,bn=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,bb=/,(?=[^\)]*(?:\(|$))/gi,an=Math.PI/180,bg=180/Math.PI,bl={},bm=document,a9=function(a){return bm.createElementNS?bm.createElementNS("http://www.w3.org/1999/xhtml",a):bm.createElement(a)},bc=a9("div"),aX=a9("img"),a0=aT._internals={_specialProps:aJ},aW=navigator.userAgent,aH=function(){var a=aW.indexOf("Android"),b=a9("a");return az=-1!==aW.indexOf("Safari")&&-1===aW.indexOf("Chrome")&&(-1===a||Number(aW.substr(a+8,1))>3),aP=az&&6>Number(aW.substr(aW.indexOf("Version/")+8,1)),aM=-1!==aW.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(aW)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(aW))&&(aC=parseFloat(RegExp.$1)),b?(b.style.cssText="top:1px;opacity:.55;",/^0.55/.test(b.style.opacity)):!1}(),br=function(a){return aq.test("string"==typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100:1},ay=function(a){window.console&&console.log(a)},aZ="",bk="",aY=function(b,f){f=f||bc;var a,c,d=f.style;if(void 0!==d[b]){return b}for(b=b.charAt(0).toUpperCase()+b.substr(1),a=["O","Moz","ms","Ms","Webkit"],c=5;--c>-1&&void 0===d[a[c]+b];){}return c>=0?(bk=3===c?"ms":a[c],aZ="-"+bk.toLowerCase()+"-",bk+b):null},aV=bm.defaultView?bm.defaultView.getComputedStyle:function(){},a5=aT.getStyle=function(b,f,a,c,d){var g;return aH||"opacity"!==f?(!c&&b.style[f]?g=b.style[f]:(a=a||aV(b))?g=a[f]||a.getPropertyValue(f)||a.getPropertyValue(f.replace(a3,"-$1").toLowerCase()):b.currentStyle&&(g=b.currentStyle[f]),null==d||g&&"none"!==g&&"auto"!==g&&"auto auto"!==g?g:d):br(b)},bA=a0.convertToPixels=function(v,g,w,a,d){if("px"===a||!a){return w}if("auto"===a||!w){return 0}var c,j,e,m=a7.test(g),q=v,b=bc.style,k=0>w;if(k&&(w=-w),"%"===a&&-1!==g.indexOf("border")){c=w/100*(m?v.clientWidth:v.clientHeight)}else{if(b.cssText="border:0 solid red;position:"+a5(v,"position")+";line-height:0;","%"!==a&&q.appendChild){b[m?"borderLeftWidth":"borderTopWidth"]=w+a}else{if(q=v.parentNode||bm.body,j=q._gsCache,e=aN.ticker.frame,j&&m&&j.time===e){return j.width*w/100}b[m?"width":"height"]=w+a}q.appendChild(bc),c=parseFloat(bc[m?"offsetWidth":"offsetHeight"]),q.removeChild(bc),m&&"%"===a&&aT.cacheWidths!==!1&&(j=q._gsCache=q._gsCache||{},j.time=e,j.width=100*(c/w)),0!==c||d||(c=bA(v,g,w,a,!0))}return k?-c:c},bj=a0.calculateOffset=function(b,f,a){if("absolute"!==a5(b,"position",a)){return 0}var c="left"===f?"Left":"Top",d=a5(b,"margin"+c,a);return b["offset"+c]-(bA(b,f,parseFloat(d),d.replace(a1,""))||0)},bd=function(b,f){var a,c,d,g={};if(f=f||aV(b,null)){if(a=f.length){for(;--a>-1;){d=f[a],(-1===d.indexOf("-transform")||a2===d)&&(g[d.replace(aG,bs)]=f.getPropertyValue(d))}}else{for(a in f){(-1===a.indexOf("Transform")||bI===a)&&(g[a]=f[a])}}}else{if(f=b.currentStyle||b.style){for(a in f){"string"==typeof a&&void 0===g[a]&&(g[a.replace(aG,bs)]=f[a])}}}return aH||(g.opacity=br(b)),c=bH(b,f,!1),g.rotation=c.rotation,g.skewX=c.skewX,g.scaleX=c.scaleX,g.scaleY=c.scaleY,g.x=c.x,g.y=c.y,bJ&&(g.z=c.z,g.rotationX=c.rotationX,g.rotationY=c.rotationY,g.scaleZ=c.scaleZ),g.filters&&delete g.filters,g},bf=function(p,k,g,q,b){var d,m,c,j={},f=p.style;for(m in g){"cssText"!==m&&"length"!==m&&isNaN(m)&&(k[m]!==(d=g[m])||b&&b[m])&&-1===m.indexOf("Origin")&&("number"==typeof d||"string"==typeof d)&&(j[m]="auto"!==d||"left"!==m&&"top"!==m?""!==d&&"auto"!==d&&"none"!==d||"string"!=typeof k[m]||""===k[m].replace(ao,"")?d:0:bj(p,m),void 0!==f[m]&&(c=new bD(f,m,f[m],c)))}if(q){for(m in q){"className"!==m&&(j[m]=q[m])}}return{difs:j,firstMPT:c}},bo={width:["Left","Right"],height:["Top","Bottom"]},ab=["marginLeft","marginRight","marginTop","marginBottom"],aD=function(b,f,a){var c=parseFloat("width"===f?b.offsetWidth:b.offsetHeight),d=bo[f],g=d.length;for(a=a||aV(b,null);--g>-1;){c-=parseFloat(a5(b,"padding"+d[g],a,!0))||0,c-=parseFloat(a5(b,"border"+d[g]+"Width",a,!0))||0}return c},by=function(b,f){(null==b||""===b||"auto"===b||"auto auto"===b)&&(b="0 0");var a=b.split(" "),c=-1!==b.indexOf("left")?"0%":-1!==b.indexOf("right")?"100%":a[0],d=-1!==b.indexOf("top")?"0%":-1!==b.indexOf("bottom")?"100%":a[1];return null==d?d="center"===c?"50%":"0":"center"===d&&(d="50%"),("center"===c||isNaN(parseFloat(c))&&-1===(c+"").indexOf("="))&&(c="50%"),b=c+" "+d+(a.length>2?" "+a[2]:""),f&&(f.oxp=-1!==c.indexOf("%"),f.oyp=-1!==d.indexOf("%"),f.oxr="="===c.charAt(1),f.oyr="="===d.charAt(1),f.ox=parseFloat(c.replace(ao,"")),f.oy=parseFloat(d.replace(ao,"")),f.v=b),f||b},bG=function(a,b){return"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(b)},bh=function(a,b){return null==a?b:"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2))+b:parseFloat(a)},bv=function(p,k,g,q){var b,d,m,c,j,f=0.000001;return null==p?c=k:"number"==typeof p?c=p:(b=360,d=p.split("_"),j="="===p.charAt(1),m=(j?parseInt(p.charAt(0)+"1",10)*parseFloat(d[0].substr(2)):parseFloat(d[0]))*(-1===p.indexOf("rad")?1:bg)-(j?0:k),d.length&&(q&&(q[g]=k+m),-1!==p.indexOf("short")&&(m%=b,m!==m%(b/2)&&(m=0>m?m+b:m-b)),-1!==p.indexOf("_cw")&&0>m?m=(m+9999999999*b)%b-(0|m/b)*b:-1!==p.indexOf("ccw")&&m>0&&(m=(m-9999999999*b)%b-(0|m/b)*b)),c=k+m),f>c&&c>-f&&(c=0),c},aK={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},a8=function(b,c,a){return b=0>b?b+1:b>1?b-1:b,0|255*(1>6*b?c+6*(a-c)*b:0.5>b?a:2>3*b?c+6*(a-c)*(2/3-b):c)+0.5},bF=aT.parseColor=function(d){var h,c,f,g,j,b;return d&&""!==d?"number"==typeof d?[d>>16,255&d>>8,255&d]:(","===d.charAt(d.length-1)&&(d=d.substr(0,d.length-1)),aK[d]?aK[d]:"#"===d.charAt(0)?(4===d.length&&(h=d.charAt(1),c=d.charAt(2),f=d.charAt(3),d="#"+h+h+c+c+f+f),d=parseInt(d.substr(1),16),[d>>16,255&d>>8,255&d]):"hsl"===d.substr(0,3)?(d=d.match(aO),g=Number(d[0])%360/360,j=Number(d[1])/100,b=Number(d[2])/100,c=0.5>=b?b*(j+1):b+j-b*j,h=2*b-c,d.length>3&&(d[3]=Number(d[3])),d[0]=a8(g+1/3,h,c),d[1]=a8(g,h,c),d[2]=a8(g-1/3,h,c),d):(d=d.match(aO)||aK.transparent,d[0]=Number(d[0]),d[1]=Number(d[1]),d[2]=Number(d[2]),d.length>3&&(d[3]=Number(d[3])),d)):aK.black},aa="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(aF in aK){aa+="|"+aF+"\\b"}aa=RegExp(aa+")","gi");var aQ=function(v,k,g,w){if(null==v){return function(a){return a}}var b,d=k?(v.match(aa)||[""])[0]:"",m=v.split(d).join("").match(ar)||[],c=v.substr(0,v.indexOf(m[0])),j=")"===v.charAt(v.length-1)?")":"",f=-1!==v.indexOf(" ")?" ":",",p=m.length,q=p>0?m[0].replace(aO,""):"";return p?b=k?function(a){var l,i,h,n;if("number"==typeof a){a+=q}else{if(w&&bb.test(a)){for(n=a.replace(bb,"|").split("|"),h=0;n.length>h;h++){n[h]=b(n[h])}return n.join(",")}}if(l=(a.match(aa)||[d])[0],i=a.split(l).join("").match(ar)||[],h=i.length,p>h--){for(;p>++h;){i[h]=g?i[0|(h-1)/2]:m[h]}}return c+i.join(f)+f+l+j+(-1!==a.indexOf("inset")?" inset":"")}:function(a){var i,l,h;if("number"==typeof a){a+=q}else{if(w&&bb.test(a)){for(l=a.replace(bb,"|").split("|"),h=0;l.length>h;h++){l[h]=b(l[h])}return l.join(",")}}if(i=a.match(ar)||[],h=i.length,p>h--){for(;p>++h;){i[h]=g?i[0|(h-1)/2]:m[h]}}return c+i.join(f)+j}:function(a){return a}},al=function(a){return a=a.split(","),function(k,g,p,b,d,m,c){var j,f=(g+"").split(" ");for(c={},j=0;4>j;j++){c[a[j]]=f[j]=f[j]||f[(j-1)/2>>0]}return b.parse(k,c,d,m)}},bD=(a0._setPluginRatio=function(l){this.plugin.setRatio(l);for(var j,f,m,b,d=this.data,k=d.proxy,c=d.firstMPT,g=0.000001;c;){j=k[c.v],c.r?j=Math.round(j):g>j&&j>-g&&(j=0),c.t[c.p]=j,c=c._next}if(d.autoRotate&&(d.autoRotate.rotation=k.rotation),1===l){for(c=d.firstMPT;c;){if(f=c.t,f.type){if(1===f.type){for(b=f.xs0+f.s+f.xs1,m=1;f.l>m;m++){b+=f["xn"+m]+f["xs"+(m+1)]}f.e=b}}else{f.e=f.s+f.xs0}c=c._next}}},function(b,f,a,c,d){this.t=b,this.p=f,this.v=a,this.r=d,c&&(c._prev=this,this._next=c)}),ax=(a0._parseToProxy=function(D,y,v,E,b,j){var A,g,w,q,B,C=E,d={},x={},z=v._transform,k=bl;for(v._transform=null,bl=y,E=B=v.parse(D,y,E,b),bl=k,j&&(v._transform=z,C&&(C._prev=null,C._prev&&(C._prev._next=null)));E&&E!==C;){if(1>=E.type&&(g=E.p,x[g]=E.s+E.c,d[g]=E.s,j||(q=new bD(E,"s",g,q,E.r),E.c=0),1===E.type)){for(A=E.l;--A>0;){w="xn"+A,g=E.p+"_"+w,x[g]=E.data[w],d[g]=E[w],j||(q=new bD(E,w,g,q,E.rxp[w]))}}E=E._next}return{proxy:d,end:x,firstMPT:q,pt:B}},a0.CSSPropTween=function(n,i,q,b,j,d,g,f,k,m,c){this.t=n,this.p=i,this.s=q,this.c=b,this.n=g||i,n instanceof ax||aB.push(this.n),this.r=f,this.type=d||0,k&&(this.pr=k,aI=!0),this.b=void 0===m?q:m,this.e=void 0===c?q+b:c,j&&(this._next=j,j._prev=this)}),bx=aT.parseComplex=function(F,W,Q,G,H,L,Z,K,U,N){Q=Q||L||"",Z=new ax(F,W,0,0,Z,N?2:1,null,!1,K,Q,G),G+="";var E,J,V,X,M,D,z,d,C,B,Y,g,P=Q.split(", ").join(",").split(" "),j=G.split(", ").join(",").split(" "),I=P.length,q=aU!==!1;for((-1!==G.indexOf(",")||-1!==Q.indexOf(","))&&(P=P.join(" ").replace(bb,", ").split(" "),j=j.join(" ").replace(bb,", ").split(" "),I=P.length),I!==j.length&&(P=(L||"").split(" "),I=P.length),Z.plugin=U,Z.setRatio=N,E=0;I>E;E++){if(X=P[E],M=j[E],d=parseFloat(X),d||0===d){Z.appendXtra("",d,bG(M,d),M.replace(aL,""),q&&-1!==M.indexOf("px"),!0)}else{if(H&&("#"===X.charAt(0)||aK[X]||a6.test(X))){g=","===M.charAt(M.length-1)?"),":")",X=bF(X),M=bF(M),C=X.length+M.length>6,C&&!aH&&0===M[3]?(Z["xs"+Z.l]+=Z.l?" transparent":"transparent",Z.e=Z.e.split(j[E]).join("transparent")):(aH||(C=!1),Z.appendXtra(C?"rgba(":"rgb(",X[0],M[0]-X[0],",",!0,!0).appendXtra("",X[1],M[1]-X[1],",",!0).appendXtra("",X[2],M[2]-X[2],C?",":g,!0),C&&(X=4>X.length?1:X[3],Z.appendXtra("",X,(4>M.length?1:M[3])-X,g,!1)))}else{if(D=X.match(aO)){if(z=M.match(aL),!z||z.length!==D.length){return Z}for(V=0,J=0;D.length>J;J++){Y=D[J],B=X.indexOf(Y,V),Z.appendXtra(X.substr(V,B-V),Number(Y),bG(z[J],Y),"",q&&"px"===X.substr(B+Y.length,2),0===J),V=B+Y.length}Z["xs"+Z.l]+=X.substr(V)}else{Z["xs"+Z.l]+=Z.l?" "+X:X}}}}if(-1!==G.indexOf("=")&&Z.data){for(g=Z.xs0+Z.data.s,E=1;Z.l>E;E++){g+=Z["xs"+E]+Z.data["xn"+E]}Z.e=g+Z["xs"+E]}return Z.l||(Z.type=-1,Z.xs0=Z.e),Z.xfirst||Z},aj=9;for(aF=ax.prototype,aF.l=aF.pr=0;--aj>0;){aF["xn"+aj]=0,aF["xs"+aj]=""}aF.xs0="",aF._next=aF._prev=aF.xfirst=aF.data=aF.plugin=aF.setRatio=aF.rxp=null,aF.appendXtra=function(d,h,c,f,g,k){var b=this,j=b.l;return b["xs"+j]+=k&&j?" "+d:d||"",c||0===j||b.plugin?(b.l++,b.type=b.setRatio?2:1,b["xs"+b.l]=f||"",j>0?(b.data["xn"+j]=h+c,b.rxp["xn"+j]=g,b["xn"+j]=h,b.plugin||(b.xfirst=new ax(b,"xn"+j,h,c,b.xfirst||b,0,b.n,g,b.pr),b.xfirst.xs0=0),b):(b.data={s:h+c},b.rxp={},b.s=h,b.c=c,b.r=g,b)):(b["xs"+j]+=h+(f||""),b)};var bw=function(a,b){b=b||{},this.p=b.prefix?aY(a)||a:a,aJ[a]=aJ[this.p]=this,this.format=b.formatter||aQ(b.defaultValue,b.color,b.collapsible,b.multi),b.parser&&(this.parse=b.parser),this.clrs=b.color,this.multi=b.multi,this.keyword=b.keyword,this.dflt=b.defaultValue,this.pr=b.priority||0},am=a0._registerComplexSpecialProp=function(d,h,c){"object"!=typeof h&&(h={parser:c});var f,g,j=d.split(","),b=h.defaultValue;for(c=c||[b],f=0;j.length>f;f++){h.prefix=0===f&&h.prefix,h.defaultValue=c[f]||b,g=new bw(j[f],h)}},bB=function(a){if(!aJ[a]){var b=a.charAt(0).toUpperCase()+a.substr(1)+"Plugin";am(a,{parser:function(g,f,h,j,k,d,c){var e=aA.com.greensock.plugins[b];return e?(e._cssRegister(),aJ[h].parse(g,f,h,j,k,d,c)):(ay("Error: "+b+" js file not loaded."),k)}})}};aF=bw.prototype,aF.parseComplex=function(x,m,j,y,b,f){var q,d,k,g,v,w,c=this.keyword;if(this.multi&&(bb.test(j)||bb.test(m)?(d=m.replace(bb,"|").split("|"),k=j.replace(bb,"|").split("|")):c&&(d=[m],k=[j])),k){for(g=k.length>d.length?k.length:d.length,q=0;g>q;q++){m=d[q]=d[q]||this.dflt,j=k[q]=k[q]||this.dflt,c&&(v=m.indexOf(c),w=j.indexOf(c),v!==w&&(-1===w?d[q]=d[q].split(c).join(""):-1===v&&(d[q]+=" "+c)))}m=d.join(", "),j=k.join(", ")}return bx(x,this.p,m,j,this.clrs,this.dflt,y,this.pr,b,f)},aF.parse=function(d,g,c,f,h,b){return this.parseComplex(d.style,this.format(a5(d,this.p,aw,!1,this.dflt)),this.format(g),h,b)},aT.registerSpecialProp=function(b,c,a){am(b,{parser:function(e,g,i,k,d,j){var f=new ax(e,i,0,0,d,2,i,!1,a);return f.plugin=j,f.setRatio=c(e,g,k._tween,i),f},priority:a})},aT.useSVGTransformAttr=az;var bC,ag="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),bI=aY("transform"),a2=aZ+"transform",aR=aY("transformOrigin"),bJ=null!==aY("perspective"),ac=a0.Transform=function(){this.perspective=parseFloat(aT.defaultTransformPerspective)||0,this.force3D=aT.defaultForce3D!==!1&&bJ?aT.defaultForce3D||"auto":!1},ah=window.SVGElement,bE=function(b,f,a){var c,d=bm.createElementNS("http://www.w3.org/2000/svg",b),g=/([a-z])([A-Z])/g;for(c in a){d.setAttributeNS(null,c.replace(g,"$1-$2").toLowerCase(),a[c])}return f.appendChild(d),d},bp=bm.documentElement,ba=function(){var b,d,a,c=aC||/Android/i.test(aW)&&!window.chrome;return bm.createElementNS&&!c&&(b=bE("svg",bp),d=bE("rect",b,{width:100,height:50,x:100}),a=d.getBoundingClientRect().width,d.style[aR]="50% 50%",d.style[bI]="scaleX(0.5)",c=a===d.getBoundingClientRect().width&&!(aM&&bJ),bp.removeChild(b)),c}(),aE=function(b,f,a,c){var d,g;c&&(g=c.split(" ")).length||(d=b.getBBox(),f=by(f).split(" "),g=[(-1!==f[0].indexOf("%")?parseFloat(f[0])/100*d.width:parseFloat(f[0]))+d.x,(-1!==f[1].indexOf("%")?parseFloat(f[1])/100*d.height:parseFloat(f[1]))+d.y]),a.xOrigin=parseFloat(g[0]),a.yOrigin=parseFloat(g[1]),b.setAttribute("data-svg-origin",g.join(" "))},bH=a0.getTransform=function(b1,cf,cb,b2){if(b1._gsTransform&&cb&&!b2){return b1._gsTransform}var b6,b5,cc,b8,cj,b0,b4,ce,ch,b7,cg=cb?b1._gsTransform||new ac:new ac,cd=0>cg.scaleX,bZ=0.00002,bW=100000,K=bJ?parseFloat(a5(b1,aR,cf,!1,"0 0 0").split(" ")[2])||cg.zOrigin||0:0,bY=parseFloat(aT.defaultTransformPerspective)||0;if(bI?b5=a5(b1,a2,cf,!0):b1.currentStyle&&(b5=b1.currentStyle.filter.match(bq),b5=b5&&4===b5.length?[b5[0].substr(4),Number(b5[2].substr(4)),Number(b5[1].substr(4)),b5[3].substr(4),cg.x||0,cg.y||0].join(","):""),b6=!b5||"none"===b5||"matrix(1, 0, 0, 1, 0, 0)"===b5,cg.svg=!!(ah&&"function"==typeof b1.getBBox&&b1.getCTM&&(!b1.parentNode||b1.parentNode.getBBox&&b1.parentNode.getCTM)),cg.svg&&(b6&&-1!==(b1.style[bI]+"").indexOf("matrix")&&(b5=b1.style[bI],b6=!1),aE(b1,a5(b1,aR,aw,!1,"50% 50%")+"",cg,b1.getAttribute("data-svg-origin")),bC=aT.useSVGTransformAttr||ba,cc=b1.getAttribute("transform"),b6&&cc&&-1!==cc.indexOf("matrix")&&(b5=cc,b6=0)),!b6){for(cc=(b5||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],b8=cc.length;--b8>-1;){cj=Number(cc[b8]),cc[b8]=(b0=cj-(cj|=0))?(0|b0*bW+(0>b0?-0.5:0.5))/bW+cj:cj}if(16===cc.length){var bX,ci,be,Q,b9,ae=cc[0],bT=cc[1],bK=cc[2],bR=cc[3],bM=cc[4],bV=cc[5],bP=cc[6],bQ=cc[7],bL=cc[8],bN=cc[9],C=cc[10],J=cc[12],r=cc[13],ca=cc[14],bS=cc[11],b3=Math.atan2(bP,C);cg.zOrigin&&(ca=-cg.zOrigin,J=bL*ca-cc[12],r=bN*ca-cc[13],ca=C*ca+cg.zOrigin-cc[14]),cg.rotationX=b3*bg,b3&&(Q=Math.cos(-b3),b9=Math.sin(-b3),bX=bM*Q+bL*b9,ci=bV*Q+bN*b9,be=bP*Q+C*b9,bL=bM*-b9+bL*Q,bN=bV*-b9+bN*Q,C=bP*-b9+C*Q,bS=bQ*-b9+bS*Q,bM=bX,bV=ci,bP=be),b3=Math.atan2(bL,C),cg.rotationY=b3*bg,b3&&(Q=Math.cos(-b3),b9=Math.sin(-b3),bX=ae*Q-bL*b9,ci=bT*Q-bN*b9,be=bK*Q-C*b9,bN=bT*b9+bN*Q,C=bK*b9+C*Q,bS=bR*b9+bS*Q,ae=bX,bT=ci,bK=be),b3=Math.atan2(bT,ae),cg.rotation=b3*bg,b3&&(Q=Math.cos(-b3),b9=Math.sin(-b3),ae=ae*Q+bM*b9,ci=bT*Q+bV*b9,bV=bT*-b9+bV*Q,bP=bK*-b9+bP*Q,bT=ci),cg.rotationX&&Math.abs(cg.rotationX)+Math.abs(cg.rotation)>359.9&&(cg.rotationX=cg.rotation=0,cg.rotationY+=180),cg.scaleX=(0|Math.sqrt(ae*ae+bT*bT)*bW+0.5)/bW,cg.scaleY=(0|Math.sqrt(bV*bV+bN*bN)*bW+0.5)/bW,cg.scaleZ=(0|Math.sqrt(bP*bP+C*C)*bW+0.5)/bW,cg.skewX=0,cg.perspective=bS?1/(0>bS?-bS:bS):0,cg.x=J,cg.y=r,cg.z=ca,cg.svg&&(cg.x-=cg.xOrigin-(cg.xOrigin*ae-cg.yOrigin*bM),cg.y-=cg.yOrigin-(cg.yOrigin*bT-cg.xOrigin*bV))}else{if(!(bJ&&!b2&&cc.length&&cg.x===cc[4]&&cg.y===cc[5]&&(cg.rotationX||cg.rotationY)||void 0!==cg.x&&"none"===a5(b1,"display",cf))){var I=cc.length>=6,bO=I?cc[0]:1,H=cc[1]||0,a=cc[2]||0,bU=I?cc[3]:1;cg.x=cc[4]||0,cg.y=cc[5]||0,b4=Math.sqrt(bO*bO+H*H),ce=Math.sqrt(bU*bU+a*a),ch=bO||H?Math.atan2(H,bO)*bg:cg.rotation||0,b7=a||bU?Math.atan2(a,bU)*bg+ch:cg.skewX||0,Math.abs(b7)>90&&270>Math.abs(b7)&&(cd?(b4*=-1,b7+=0>=ch?180:-180,ch+=0>=ch?180:-180):(ce*=-1,b7+=0>=b7?180:-180)),cg.scaleX=b4,cg.scaleY=ce,cg.rotation=ch,cg.skewX=b7,bJ&&(cg.rotationX=cg.rotationY=cg.z=0,cg.perspective=bY,cg.scaleZ=1),cg.svg&&(cg.x-=cg.xOrigin-(cg.xOrigin*bO-cg.yOrigin*H),cg.y-=cg.yOrigin-(cg.yOrigin*bU-cg.xOrigin*a))}}cg.zOrigin=K;for(b8 in cg){bZ>cg[b8]&&cg[b8]>-bZ&&(cg[b8]=0)}}return cb&&(b1._gsTransform=cg,cg.svg&&(bC&&b1.style[bI]?ak(b1.style,bI):!bC&&b1.getAttribute("transform")&&b1.removeAttribute("transform"))),cg},bt=function(C){var O,K,D=this.data,E=-D.rotation*an,H=E+D.skewX*an,V=100000,G=(0|Math.cos(E)*D.scaleX*V)/V,L=(0|Math.sin(E)*D.scaleX*V)/V,I=(0|Math.sin(H)*-D.scaleY*V)/V,W=(0|Math.cos(H)*D.scaleY*V)/V,B=this.t.style,F=this.t.currentStyle;if(F){K=L,L=-I,I=-K,O=F.filter,B.filter="";var N,T,Q=this.t.offsetWidth,M=this.t.offsetHeight,A="absolute"!==F.position,w="progid:DXImageTransform.Microsoft.Matrix(M11="+G+", M12="+L+", M21="+I+", M22="+W,z=D.x+Q*D.xPercent/100,U=D.y+M*D.yPercent/100;if(null!=D.ox&&(N=(D.oxp?0.01*Q*D.ox:D.ox)-Q/2,T=(D.oyp?0.01*M*D.oy:D.oy)-M/2,z+=N-(N*G+T*L),U+=T-(N*I+T*W)),A?(N=Q/2,T=M/2,w+=", Dx="+(N-(N*G+T*L)+z)+", Dy="+(T-(N*I+T*W)+U)+")"):w+=", sizingMethod='auto expand')",B.filter=-1!==O.indexOf("DXImageTransform.Microsoft.Matrix(")?O.replace(bn,w):w+" "+O,(0===C||1===C)&&1===G&&0===L&&0===I&&1===W&&(A&&-1===w.indexOf("Dx=0, Dy=0")||aq.test(O)&&100!==parseFloat(RegExp.$1)||-1===O.indexOf("gradient("&&O.indexOf("Alpha"))&&B.removeAttribute("filter")),!A){var q,j,J,m=8>aC?1:-1;for(N=D.ieOffsetX||0,T=D.ieOffsetY||0,D.ieOffsetX=Math.round((Q-((0>G?-G:G)*Q+(0>L?-L:L)*M))/2+z),D.ieOffsetY=Math.round((M-((0>W?-W:W)*M+(0>I?-I:I)*Q))/2+U),aj=0;4>aj;aj++){j=ab[aj],q=F[j],K=-1!==q.indexOf("px")?parseFloat(q):bA(this.t,j,parseFloat(q),q.replace(a1,""))||0,J=K!==D[j]?2>aj?-D.ieOffsetX:-D.ieOffsetY:2>aj?N-D.ieOffsetX:T-D.ieOffsetY,B[j]=(D[j]=Math.round(K-J*(0===aj||2===aj?1:m)))+"px"}}}},bi=a0.set3DTransformRatio=a0.setTransformRatio=function(bN){var bZ,bW,bO,bP,bS,b3,bR,bX,bU,b4,bM,bQ,b1,bT,b0,bY,bL,ae,j,bK,be,b2,B,q=this.data,bV=this.t.style,z=q.rotation,Z=q.rotationX,G=q.rotationY,Y=q.scaleX,W=q.scaleY,J=q.scaleZ,Q=q.x,U=q.y,V=q.z,H=q.svg,K=q.perspective,f=q.force3D;if(!(((1!==bN&&0!==bN||"auto"!==f||this.tween._totalTime!==this.tween._totalDuration&&this.tween._totalTime)&&f||V||K||G||Z)&&(!bC||!H)&&bJ)){return z||q.skewX||H?(z*=an,b2=q.skewX*an,B=100000,bZ=Math.cos(z)*Y,bP=Math.sin(z)*Y,bW=Math.sin(z-b2)*-W,bS=Math.cos(z-b2)*W,b2&&"simple"===q.skewType&&(bL=Math.tan(b2),bL=Math.sqrt(1+bL*bL),bW*=bL,bS*=bL,q.skewY&&(bZ*=bL,bP*=bL)),H&&(Q+=q.xOrigin-(q.xOrigin*bZ+q.yOrigin*bW),U+=q.yOrigin-(q.xOrigin*bP+q.yOrigin*bS),bT=0.000001,bT>Q&&Q>-bT&&(Q=0),bT>U&&U>-bT&&(U=0)),j=(0|bZ*B)/B+","+(0|bP*B)/B+","+(0|bW*B)/B+","+(0|bS*B)/B+","+Q+","+U+")",H&&bC?this.t.setAttribute("transform","matrix("+j):bV[bI]=(q.xPercent||q.yPercent?"translate("+q.xPercent+"%,"+q.yPercent+"%) matrix(":"matrix(")+j):bV[bI]=(q.xPercent||q.yPercent?"translate("+q.xPercent+"%,"+q.yPercent+"%) matrix(":"matrix(")+Y+",0,0,"+W+","+Q+","+U+")",void 0}if(aM&&(bT=0.0001,bT>Y&&Y>-bT&&(Y=J=0.00002),bT>W&&W>-bT&&(W=J=0.00002),!K||q.z||q.rotationX||q.rotationY||(K=0)),z||q.skewX){z*=an,b0=bZ=Math.cos(z),bY=bP=Math.sin(z),q.skewX&&(z-=q.skewX*an,b0=Math.cos(z),bY=Math.sin(z),"simple"===q.skewType&&(bL=Math.tan(q.skewX*an),bL=Math.sqrt(1+bL*bL),b0*=bL,bY*=bL,q.skewY&&(bZ*=bL,bP*=bL))),bW=-bY,bS=b0}else{if(!(G||Z||1!==J||K||H)){return bV[bI]=(q.xPercent||q.yPercent?"translate("+q.xPercent+"%,"+q.yPercent+"%) translate3d(":"translate3d(")+Q+"px,"+U+"px,"+V+"px)"+(1!==Y||1!==W?" scale("+Y+","+W+")":""),void 0}bZ=bS=1,bW=bP=0}bU=1,bO=b3=bR=bX=b4=bM=0,bQ=K?-1/K:0,b1=q.zOrigin,bT=0.000001,bK=",",be="0",z=G*an,z&&(b0=Math.cos(z),bY=Math.sin(z),bR=-bY,b4=bQ*-bY,bO=bZ*bY,b3=bP*bY,bU=b0,bQ*=b0,bZ*=b0,bP*=b0),z=Z*an,z&&(b0=Math.cos(z),bY=Math.sin(z),bL=bW*b0+bO*bY,ae=bS*b0+b3*bY,bX=bU*bY,bM=bQ*bY,bO=bW*-bY+bO*b0,b3=bS*-bY+b3*b0,bU*=b0,bQ*=b0,bW=bL,bS=ae),1!==J&&(bO*=J,b3*=J,bU*=J,bQ*=J),1!==W&&(bW*=W,bS*=W,bX*=W,bM*=W),1!==Y&&(bZ*=Y,bP*=Y,bR*=Y,b4*=Y),(b1||H)&&(b1&&(Q+=bO*-b1,U+=b3*-b1,V+=bU*-b1+b1),H&&(Q+=q.xOrigin-(q.xOrigin*bZ+q.yOrigin*bW),U+=q.yOrigin-(q.xOrigin*bP+q.yOrigin*bS)),bT>Q&&Q>-bT&&(Q=be),bT>U&&U>-bT&&(U=be),bT>V&&V>-bT&&(V=0)),j=q.xPercent||q.yPercent?"translate("+q.xPercent+"%,"+q.yPercent+"%) matrix3d(":"matrix3d(",j+=(bT>bZ&&bZ>-bT?be:bZ)+bK+(bT>bP&&bP>-bT?be:bP)+bK+(bT>bR&&bR>-bT?be:bR),j+=bK+(bT>b4&&b4>-bT?be:b4)+bK+(bT>bW&&bW>-bT?be:bW)+bK+(bT>bS&&bS>-bT?be:bS),Z||G?(j+=bK+(bT>bX&&bX>-bT?be:bX)+bK+(bT>bM&&bM>-bT?be:bM)+bK+(bT>bO&&bO>-bT?be:bO),j+=bK+(bT>b3&&b3>-bT?be:b3)+bK+(bT>bU&&bU>-bT?be:bU)+bK+(bT>bQ&&bQ>-bT?be:bQ)+bK):j+=",0,0,0,0,1,0,",j+=Q+bK+U+bK+V+bK+(K?1+-V/K:1)+")",bV[bI]=j};aF=ac.prototype,aF.x=aF.y=aF.z=aF.skewX=aF.skewY=aF.rotation=aF.rotationX=aF.rotationY=aF.zOrigin=aF.xPercent=aF.yPercent=0,aF.scaleX=aF.scaleY=aF.scaleZ=1,am("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",{parser:function(r,I,E,x,B,A,F){if(x._lastParsedTransform===F){return B}x._lastParsedTransform=F;var D,L,q,z,H,K,C,J=x._transform=bH(r,aw,!0,F.parseTransform),G=r.style,k=0.000001,b=ag.length,a=F,j={};if("string"==typeof a.transform&&bI){q=bc.style,q[bI]=a.transform,q.display="block",q.position="absolute",bm.body.appendChild(bc),D=bH(bc,null,!1),bm.body.removeChild(bc)}else{if("object"==typeof a){if(D={scaleX:bh(null!=a.scaleX?a.scaleX:a.scale,J.scaleX),scaleY:bh(null!=a.scaleY?a.scaleY:a.scale,J.scaleY),scaleZ:bh(a.scaleZ,J.scaleZ),x:bh(a.x,J.x),y:bh(a.y,J.y),z:bh(a.z,J.z),xPercent:bh(a.xPercent,J.xPercent),yPercent:bh(a.yPercent,J.yPercent),perspective:bh(a.transformPerspective,J.perspective)},C=a.directionalRotation,null!=C){if("object"==typeof C){for(q in C){a[q]=C[q]}}else{a.rotation=C}}"string"==typeof a.x&&-1!==a.x.indexOf("%")&&(D.x=0,D.xPercent=bh(a.x,J.xPercent)),"string"==typeof a.y&&-1!==a.y.indexOf("%")&&(D.y=0,D.yPercent=bh(a.y,J.yPercent)),D.rotation=bv("rotation" in a?a.rotation:"shortRotation" in a?a.shortRotation+"_short":"rotationZ" in a?a.rotationZ:J.rotation,J.rotation,"rotation",j),bJ&&(D.rotationX=bv("rotationX" in a?a.rotationX:"shortRotationX" in a?a.shortRotationX+"_short":J.rotationX||0,J.rotationX,"rotationX",j),D.rotationY=bv("rotationY" in a?a.rotationY:"shortRotationY" in a?a.shortRotationY+"_short":J.rotationY||0,J.rotationY,"rotationY",j)),D.skewX=null==a.skewX?J.skewX:bv(a.skewX,J.skewX),D.skewY=null==a.skewY?J.skewY:bv(a.skewY,J.skewY),(L=D.skewY-J.skewY)&&(D.skewX+=L,D.rotation+=L)}}for(bJ&&null!=a.force3D&&(J.force3D=a.force3D,K=!0),J.skewType=a.skewType||J.skewType||aT.defaultSkewType,H=J.force3D||J.z||J.rotationX||J.rotationY||D.z||D.rotationX||D.rotationY||D.perspective,H||null==a.scale||(D.scaleZ=1);--b>-1;){E=ag[b],z=D[E]-J[E],(z>k||-k>z||null!=a[E]||null!=bl[E])&&(K=!0,B=new ax(J,E,J[E],z,B),E in j&&(B.e=j[E]),B.xs0=0,B.plugin=A,x._overwriteProps.push(B.n))}return z=a.transformOrigin,J.svg&&(z||a.svgOrigin)&&(aE(r,by(z),D,a.svgOrigin),B=new ax(J,"xOrigin",J.xOrigin,D.xOrigin-J.xOrigin,B,-1,"transformOrigin"),B.b=J.xOrigin,B.e=B.xs0=D.xOrigin,B=new ax(J,"yOrigin",J.yOrigin,D.yOrigin-J.yOrigin,B,-1,"transformOrigin"),B.b=J.yOrigin,B.e=B.xs0=D.yOrigin,z=bC?null:"0px 0px"),(z||bJ&&H&&J.zOrigin)&&(bI?(K=!0,E=aR,z=(z||a5(r,E,aw,!1,"50% 50%"))+"",B=new ax(G,E,0,0,B,-1,"transformOrigin"),B.b=G[E],B.plugin=A,bJ?(q=J.zOrigin,z=z.split(" "),J.zOrigin=(z.length>2&&(0===q||"0px"!==z[2])?parseFloat(z[2]):q)||0,B.xs0=B.e=z[0]+" "+(z[1]||"50%")+" 0px",B=new ax(J,"zOrigin",0,0,B,-1,B.n),B.b=q,B.xs0=B.e=J.zOrigin):B.xs0=B.e=z):by(z+"",J)),K&&(x._transformType=J.svg&&bC||!H&&3!==this._transformType?2:3),B},prefix:!0}),am("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),am("borderRadius",{defaultValue:"0px",parser:function(B,L,H,E,Q){L=this.format(L);var D,I,G,R,A,C,K,N,F,M,J,z,q,j,s,r,O=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],k=B.style;for(F=parseFloat(B.offsetWidth),M=parseFloat(B.offsetHeight),D=L.split(" "),I=0;O.length>I;I++){this.p.indexOf("border")&&(O[I]=aY(O[I])),A=R=a5(B,O[I],aw,!1,"0px"),-1!==A.indexOf(" ")&&(R=A.split(" "),A=R[0],R=R[1]),C=G=D[I],K=parseFloat(A),z=A.substr((K+"").length),q="="===C.charAt(1),q?(N=parseInt(C.charAt(0)+"1",10),C=C.substr(2),N*=parseFloat(C),J=C.substr((N+"").length-(0>N?1:0))||""):(N=parseFloat(C),J=C.substr((N+"").length)),""===J&&(J=av[H]||z),J!==z&&(j=bA(B,"borderLeft",K,z),s=bA(B,"borderTop",K,z),"%"===J?(A=100*(j/F)+"%",R=100*(s/M)+"%"):"em"===J?(r=bA(B,"borderLeft",1,"em"),A=j/r+"em",R=s/r+"em"):(A=j+"px",R=s+"px"),q&&(C=parseFloat(A)+N+J,G=parseFloat(R)+N+J)),Q=bx(k,O[I],A+" "+R,C+" "+G,!1,"0px",Q)}return Q},prefix:!0,formatter:aQ("0px 0px 0px 0px",!1,!0)}),am("backgroundPosition",{defaultValue:"0 0",parser:function(D,x,q,E,k,A){var j,r,m,B,C,b,w="background-position",z=aw||aV(D,null),y=this.format((z?aC?z.getPropertyValue(w+"-x")+" "+z.getPropertyValue(w+"-y"):z.getPropertyValue(w):D.currentStyle.backgroundPositionX+" "+D.currentStyle.backgroundPositionY)||"0 0"),v=this.format(x);if(-1!==y.indexOf("%")!=(-1!==v.indexOf("%"))&&(b=a5(D,"backgroundImage").replace(a4,""),b&&"none"!==b)){for(j=y.split(" "),r=v.split(" "),aX.setAttribute("src",b),m=2;--m>-1;){y=j[m],B=-1!==y.indexOf("%"),B!==(-1!==r[m].indexOf("%"))&&(C=0===m?D.offsetWidth-aX.width:D.offsetHeight-aX.height,j[m]=B?parseFloat(y)/100*C+"px":100*(parseFloat(y)/C)+"%")}y=j.join(" ")}return this.parseComplex(D.style,y,v,k,A)},formatter:by}),am("backgroundSize",{defaultValue:"0 0",formatter:by}),am("perspective",{defaultValue:"0px",prefix:!0}),am("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),am("transformStyle",{prefix:!0}),am("backfaceVisibility",{prefix:!0}),am("userSelect",{prefix:!0}),am("margin",{parser:al("marginTop,marginRight,marginBottom,marginLeft")}),am("padding",{parser:al("paddingTop,paddingRight,paddingBottom,paddingLeft")}),am("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(m,j,f,p,c,k){var b,g,d;return 9>aC?(g=m.currentStyle,d=8>aC?" ":",",b="rect("+g.clipTop+d+g.clipRight+d+g.clipBottom+d+g.clipLeft+")",j=this.format(j).split(",").join(d)):(b=this.format(a5(m,this.p,aw,!1,this.dflt)),j=this.format(j)),this.parseComplex(m.style,b,j,c,k)}}),am("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),am("autoRound,strictUnits",{parser:function(b,f,a,c,d){return d}}),am("border",{defaultValue:"0px solid #000",parser:function(d,g,c,f,h,b){return this.parseComplex(d.style,this.format(a5(d,"borderTopWidth",aw,!1,"0px")+" "+a5(d,"borderTopStyle",aw,!1,"solid")+" "+a5(d,"borderTopColor",aw,!1,"#000")),this.format(g),h,b)},color:!0,formatter:function(a){var b=a.split(" ");return b[0]+" "+(b[1]||"solid")+" "+(a.match(aa)||["#000"])[0]}}),am("borderWidth",{parser:al("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),am("float,cssFloat,styleFloat",{parser:function(d,h,c,f,g){var j=d.style,b="cssFloat" in j?"cssFloat":"styleFloat";return new ax(j,b,0,0,g,-1,c,!1,0,j[b],h)}});var ad=function(b){var f,a=this.t,c=a.filter||a5(this.data,"filter")||"",d=0|this.s+this.c*b;100===d&&(-1===c.indexOf("atrix(")&&-1===c.indexOf("radient(")&&-1===c.indexOf("oader(")?(a.removeAttribute("filter"),f=!a5(this.data,"filter")):(a.filter=c.replace(aS,""),f=!0)),f||(this.xn1&&(a.filter=c=c||"alpha(opacity="+d+")"),-1===c.indexOf("pacity")?0===d&&this.xn1||(a.filter=c+" alpha(opacity="+d+")"):a.filter=c.replace(aq,"opacity="+d))};am("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(m,j,f,p,c,k){var b=parseFloat(a5(m,"opacity",aw,!1,"1")),g=m.style,d="autoAlpha"===f;return"string"==typeof j&&"="===j.charAt(1)&&(j=("-"===j.charAt(0)?-1:1)*parseFloat(j.substr(2))+b),d&&1===b&&"hidden"===a5(m,"visibility",aw)&&0!==j&&(b=0),aH?c=new ax(g,"opacity",b,j-b,c):(c=new ax(g,"opacity",100*b,100*(j-b),c),c.xn1=d?1:0,g.zoom=1,c.type=2,c.b="alpha(opacity="+c.s+")",c.e="alpha(opacity="+(c.s+c.c)+")",c.data=m,c.plugin=k,c.setRatio=ad),d&&(c=new ax(g,"visibility",0,0,c,-1,null,!1,0,0!==b?"inherit":"hidden",0===j?"hidden":"inherit"),c.xs0="inherit",p._overwriteProps.push(c.n),p._overwriteProps.push(f)),c}});var ak=function(a,b){b&&(a.removeProperty?(("ms"===b.substr(0,2)||"webkit"===b.substr(0,6))&&(b="-"+b),a.removeProperty(b.replace(a3,"-$1").toLowerCase())):a.removeAttribute(b))},bz=function(b){if(this.t._gsClassPT=this,1===b||0===b){this.t.setAttribute("class",0===b?this.b:this.e);for(var c=this.data,a=this.t.style;c;){c.v?a[c.p]=c.v:ak(a,c.p),c=c._next}1===b&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else{this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)}};am("className",{parser:function(z,r,A,g,w,d,k){var j,x,y,b,q,v=z.getAttribute("class")||"",i=z.style.cssText;if(w=g._classNamePT=new ax(z,A,0,0,w,2),w.setRatio=bz,w.pr=-11,aI=!0,w.b=v,x=bd(z,aw),y=z._gsClassPT){for(b={},q=y.data;q;){b[q.p]=1,q=q._next}y.setRatio(1)}return z._gsClassPT=w,w.e="="!==r.charAt(1)?r:v.replace(RegExp("\\s*\\b"+r.substr(2)+"\\b"),"")+("+"===r.charAt(0)?" "+r.substr(2):""),z.setAttribute("class",w.e),j=bf(z,x,bd(z),k,b),z.setAttribute("class",v),w.data=j.firstMPT,z.style.cssText=i,w=w.xfirst=g.parse(z,j.difs,w,d)}});var af=function(d){if((1===d||0===d)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var h,c,f,g,k,b=this.t.style,j=aJ.transform.parse;if("all"===this.e){b.cssText="",g=!0}else{for(h=this.e.split(" ").join("").split(","),f=h.length;--f>-1;){c=h[f],aJ[c]&&(aJ[c].parse===j?g=!0:c="transformOrigin"===c?aR:aJ[c].p),ak(b,c)}}g&&(ak(b,bI),k=this.t._gsTransform,k&&(k.svg&&this.t.removeAttribute("data-svg-origin"),delete this.t._gsTransform))}};for(am("clearProps",{parser:function(a,d,b,c,f){return f=new ax(a,b,0,0,f,2),f.setRatio=af,f.e=d,f.pr=-10,f.data=c._tween,aI=!0,f}}),aF="bezier,throwProps,physicsProps,physics2D".split(","),aj=aF.length;aj--;){bB(aF[aj])}aF=aT.prototype,aF._firstPT=aF._lastParsedTransform=aF._transform=null,aF._onInitTween=function(x,n,a){if(!x.nodeType){return !1}this._target=x,this._tween=a,this._vars=n,aU=n.autoRound,aI=!1,av=n.suffixMap||aT.suffixMap,aw=aV(x,""),aB=this._overwriteProps;var h,k,c,p,j,u,r,i,s,q=x.style;if(at&&""===q.zIndex&&(h=a5(x,"zIndex",aw),("auto"===h||""===h)&&this._addLazySet(q,"zIndex",0)),"string"==typeof n&&(p=q.cssText,h=bd(x,aw),q.cssText=p+";"+n,h=bf(x,h,bd(x)).difs,!aH&&ap.test(n)&&(h.opacity=parseFloat(RegExp.$1)),n=h,q.cssText=p),this._firstPT=k=n.className?aJ.className.parse(x,n.className,"className",this,null,null,n):this.parse(x,n,null),this._transformType){for(s=3===this._transformType,bI?az&&(at=!0,""===q.zIndex&&(r=a5(x,"zIndex",aw),("auto"===r||""===r)&&this._addLazySet(q,"zIndex",0)),aP&&this._addLazySet(q,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(s?"visible":"hidden"))):q.zoom=1,c=k;c&&c._next;){c=c._next}i=new ax(x,"transform",0,0,null,2),this._linkCSSP(i,null,c),i.setRatio=bI?bi:bt,i.data=this._transform||bH(x,aw,!0),i.tween=a,i.pr=-1,aB.pop()}if(aI){for(;k;){for(u=k._next,c=p;c&&c.pr>k.pr;){c=c._next}(k._prev=c?c._prev:j)?k._prev._next=k:p=k,(k._next=c)?c._prev=k:j=k,k=u}this._firstPT=p}return !0},aF.parse=function(D,x,r,j){var A,h,q,C,b,w,z,k,y,s,B=D.style;for(A in x){w=x[A],h=aJ[A],h?r=h.parse(D,w,A,this,r,j,x):(b=a5(D,A,aw)+"",y="string"==typeof w,"color"===A||"fill"===A||"stroke"===A||-1!==A.indexOf("Color")||y&&a6.test(w)?(y||(w=bF(w),w=(w.length>3?"rgba(":"rgb(")+w.join(",")+")"),r=bx(B,A,b,w,!0,"transparent",r,0,j)):!y||-1===w.indexOf(" ")&&-1===w.indexOf(",")?(q=parseFloat(b),z=q||0===q?b.substr((q+"").length):"",(""===b||"auto"===b)&&("width"===A||"height"===A?(q=aD(D,A,aw),z="px"):"left"===A||"top"===A?(q=bj(D,A,aw),z="px"):(q="opacity"!==A?0:1,z="")),s=y&&"="===w.charAt(1),s?(C=parseInt(w.charAt(0)+"1",10),w=w.substr(2),C*=parseFloat(w),k=w.replace(a1,"")):(C=parseFloat(w),k=y?w.replace(a1,""):""),""===k&&(k=A in av?av[A]:z),w=C||0===C?(s?C+q:C)+k:x[A],z!==k&&""!==k&&(C||0===C)&&q&&(q=bA(D,A,q,z),"%"===k?(q/=bA(D,A,100,"%")/100,x.strictUnits!==!0&&(b=q+"%")):"em"===k?q/=bA(D,A,1,"em"):"px"!==k&&(C=bA(D,A,C,k),k="px"),s&&(C||0===C)&&(w=C+q+k)),s&&(C+=q),!q&&0!==q||!C&&0!==C?void 0!==B[A]&&(w||"NaN"!=w+""&&null!=w)?(r=new ax(B,A,C||q||0,0,r,-1,A,!1,0,b,w),r.xs0="none"!==w||"display"!==A&&-1===A.indexOf("Style")?w:b):ay("invalid "+A+" tween value: "+x[A]):(r=new ax(B,A,q,C-q,r,0,A,aU!==!1&&("px"===k||"zIndex"===A),0,b,w),r.xs0=k)):r=bx(B,A,b,w,!0,null,r,0,j)),j&&r&&!r.plugin&&(r.plugin=j)}return r},aF.setRatio=function(b){var f,a,c,d=this._firstPT,g=0.000001;if(1!==b||this._tween._time!==this._tween._duration&&0!==this._tween._time){if(b||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-0.000001){for(;d;){if(f=d.c*b+d.s,d.r?f=Math.round(f):g>f&&f>-g&&(f=0),d.type){if(1===d.type){if(c=d.l,2===c){d.t[d.p]=d.xs0+f+d.xs1+d.xn1+d.xs2}else{if(3===c){d.t[d.p]=d.xs0+f+d.xs1+d.xn1+d.xs2+d.xn2+d.xs3}else{if(4===c){d.t[d.p]=d.xs0+f+d.xs1+d.xn1+d.xs2+d.xn2+d.xs3+d.xn3+d.xs4}else{if(5===c){d.t[d.p]=d.xs0+f+d.xs1+d.xn1+d.xs2+d.xn2+d.xs3+d.xn3+d.xs4+d.xn4+d.xs5}else{for(a=d.xs0+f+d.xs1,c=1;d.l>c;c++){a+=d["xn"+c]+d["xs"+(c+1)]}d.t[d.p]=a}}}}}else{-1===d.type?d.t[d.p]=d.xs0:d.setRatio&&d.setRatio(b)}}else{d.t[d.p]=f+d.xs0}d=d._next}}else{for(;d;){2!==d.type?d.t[d.p]=d.b:d.setRatio(b),d=d._next}}}else{for(;d;){2!==d.type?d.t[d.p]=d.e:d.setRatio(b),d=d._next}}},aF._enableTransforms=function(a){this._transform=this._transform||bH(this._target,aw,!0),this._transformType=this._transform.svg&&bC||!a&&3!==this._transformType?2:3};var ai=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};aF._addLazySet=function(b,d,a){var c=this._firstPT=new ax(b,d,0,0,this._firstPT,2);c.e=a,c.setRatio=ai,c.data=this},aF._linkCSSP=function(b,d,a,c){return b&&(d&&(d._prev=b),b._next&&(b._next._prev=b._prev),b._prev?b._prev._next=b._next:this._firstPT===b&&(this._firstPT=b._next,c=!0),a?a._next=b:c||null!==this._firstPT||(this._firstPT=b),b._next=d,b._prev=a),b},aF._kill=function(d){var a,b,c,f=d;if(d.autoAlpha||d.alpha){f={};for(b in d){f[b]=d[b]}f.opacity=1,f.autoAlpha&&(f.visibility=1)}return d.className&&(a=this._classNamePT)&&(c=a.xfirst,c&&c._prev?this._linkCSSP(c._prev,a._next,c._prev._prev):c===this._firstPT&&(this._firstPT=a._next),a._next&&this._linkCSSP(a._next,a._next._next,c._prev),this._classNamePT=null),au.prototype._kill.call(this,f)};var bu=function(d,h,c){var f,g,j,b;if(d.slice){for(g=d.length;--g>-1;){bu(d[g],h,c)}}else{for(f=d.childNodes,g=f.length;--g>-1;){j=f[g],b=j.type,j.style&&(h.push(bd(j)),c&&c.push(j)),1!==b&&9!==b&&11!==b||!j.childNodes.length||bu(j,h,c)}}};return aT.cascadeTo=function(x,j,y){var b,e,q,d,k=aN.to(x,j,y),g=[k],v=[],w=[],c=[],m=aN._internals.reservedProps;for(x=k._targets||k.target,bu(x,v,c),k.render(j,!0,!0),bu(x,w),k.render(0,!0,!0),k._enabled(!0),b=c.length;--b>-1;){if(e=bf(c[b],v[b],w[b]),e.firstMPT){e=e.difs;for(q in y){m[q]&&(e[q]=y[q])}d={};for(q in e){d[q]=v[b][q]}g.push(aN.fromTo(c[b],j,d,e))}}return g},au.activate([aT]),aT},!0),function(){var a=_gsScope._gsDefine.plugin({propName:"roundProps",priority:-1,API:2,init:function(d,f,c){return this._tween=c,!0}}),b=a.prototype;b._onInitAllProps=function(){for(var f,j,d,g=this._tween,h=g.vars.roundProps instanceof Array?g.vars.roundProps:g.vars.roundProps.split(","),l=h.length,c={},k=g._propLookup.roundProps;--l>-1;){c[h[l]]=1}for(l=h.length;--l>-1;){for(f=h[l],j=g._firstPT;j;){d=j._next,j.pg?j.t._roundProps(c,!0):j.n===f&&(this._add(j.t,f,j.s,j.c),d&&(d._prev=j._prev),j._prev?j._prev._next=d:g._firstPT===j&&(g._firstPT=d),j._next=j._prev=null,g._propLookup[f]=k),j=d}}return !1},b._add=function(d,g,c,f){this._addTween(d,g,c,c+f,g,!0),this._overwriteProps.push(g)}}(),_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.3.3",init:function(b,f){var a,c,d;if("function"!=typeof b.setAttribute){return !1}this._target=b,this._proxy={},this._start={},this._end={};for(a in f){this._start[a]=this._proxy[a]=c=b.getAttribute(a),d=this._addTween(this._proxy,a,parseFloat(c),f[a],a),this._end[a]=d?d.s+d.c:f[a],this._overwriteProps.push(a)}return !0},set:function(b){this._super.setRatio.call(this,b);for(var f,a=this._overwriteProps,c=a.length,d=1===b?this._end:b?this._proxy:this._start;--c>-1;){f=a[c],this._target.setAttribute(f,d[f]+"")}}}),_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(p,k){"object"!=typeof k&&(k={rotation:k}),this.finals={};var g,q,b,d,m,c,j=k.useRadians===!0?2*Math.PI:360,f=0.000001;for(g in k){"useRadians"!==g&&(c=(k[g]+"").split("_"),q=c[0],b=parseFloat("function"!=typeof p[g]?p[g]:p[g.indexOf("set")||"function"!=typeof p["get"+g.substr(3)]?g:"get"+g.substr(3)]()),d=this.finals[g]="string"==typeof q&&"="===q.charAt(1)?b+parseInt(q.charAt(0)+"1",10)*Number(q.substr(2)):Number(q)||0,m=d-b,c.length&&(q=c.join("_"),-1!==q.indexOf("short")&&(m%=j,m!==m%(j/2)&&(m=0>m?m+j:m-j)),-1!==q.indexOf("_cw")&&0>m?m=(m+9999999999*j)%j-(0|m/j)*j:-1!==q.indexOf("ccw")&&m>0&&(m=(m-9999999999*j)%j-(0|m/j)*j)),(m>f||-f>m)&&(this._addTween(p,g,b,b+m,g),this._overwriteProps.push(g)))}return !0},set:function(a){var b;if(1!==a){this._super.setRatio.call(this,a)}else{for(b=this._firstPT;b;){b.f?b.t[b.p](this.finals[b.p]):b.t[b.p]=this.finals[b.p],b=b._next}}}})._autoCSS=!0,_gsScope._gsDefine("easing.Back",["easing.Ease"],function(F){var z,w,G,b=_gsScope.GreenSockGlobals||_gsScope,k=b.com.greensock,C=2*Math.PI,j=Math.PI/2,x=k._class,v=function(f,a){var c=x("easing."+f,function(){},!0),d=c.prototype=new F;return d.constructor=c,d.getRatio=a,c},D=F.register||function(){},E=function(c,h,a,d){var f=x("easing."+c,{easeOut:new h,easeIn:new a,easeInOut:new d},!0);return D(f,c),f},g=function(c,d,a){this.t=c,this.v=d,a&&(this.next=a,a.prev=this,this.c=a.v-d,this.gap=a.t-c)},y=function(f,a){var c=x("easing."+f,function(e){this._p1=e||0===e?e:1.70158,this._p2=1.525*this._p1},!0),d=c.prototype=new F;return d.constructor=c,d.getRatio=a,d.config=function(e){return new c(e)},c},B=E("Back",y("BackOut",function(a){return(a-=1)*a*((this._p1+1)*a+this._p1)+1}),y("BackIn",function(a){return a*a*((this._p1+1)*a-this._p1)}),y("BackInOut",function(a){return 1>(a*=2)?0.5*a*a*((this._p2+1)*a-this._p2):0.5*((a-=2)*a*((this._p2+1)*a+this._p2)+2)})),q=x("easing.SlowMo",function(c,d,a){d=d||0===d?d:0.7,null==c?c=0.7:c>1&&(c=1),this._p=1!==c?d:0,this._p1=(1-c)/2,this._p2=c,this._p3=this._p1+this._p2,this._calcEnd=a===!0},!0),A=q.prototype=new F;return A.constructor=q,A.getRatio=function(a){var c=a+(0.5-a)*this._p;return this._p1>a?this._calcEnd?1-(a=1-a/this._p1)*a:c-(a=1-a/this._p1)*a*a*a*c:a>this._p3?this._calcEnd?1-(a=(a-this._p3)/this._p1)*a:c+(a-c)*(a=(a-this._p3)/this._p1)*a*a*a:this._calcEnd?1:c},q.ease=new q(0.7,0.7),A.config=q.config=function(c,d,a){return new q(c,d,a)},z=x("easing.SteppedEase",function(a){a=a||1,this._p1=1/a,this._p2=a+1},!0),A=z.prototype=new F,A.constructor=z,A.getRatio=function(a){return 0>a?a=0:a>=1&&(a=0.999999999),(this._p2*a>>0)*this._p1},A.config=z.config=function(a){return new z(a)},w=x("easing.RoughEase",function(O){O=O||{};for(var K,U,p,H,R,t,L=O.taper||"none",J=[],S=0,T=0|(O.points||20),N=T,Q=O.randomize!==!1,I=O.clamp===!0,P=O.template instanceof F?O.template:null,M="number"==typeof O.strength?0.4*O.strength:0.4;--N>-1;){K=Q?Math.random():1/T*N,U=P?P.getRatio(K):K,"none"===L?p=M:"out"===L?(H=1-K,p=H*H*M):"in"===L?p=K*K*M:0.5>K?(H=2*K,p=0.5*H*H*M):(H=2*(1-K),p=0.5*H*H*M),Q?U+=Math.random()*p-0.5*p:N%2?U+=0.5*p:U-=0.5*p,I&&(U>1?U=1:0>U&&(U=0)),J[S++]={x:K,y:U}}for(J.sort(function(a,c){return a.x-c.x}),t=new g(1,1,null),N=T;--N>-1;){R=J[N],t=new g(R.x,R.y,t)}this._prev=new g(0,0,0!==t.t?t:t.next)},!0),A=w.prototype=new F,A.constructor=w,A.getRatio=function(a){var c=this._prev;if(a>c.t){for(;c.next&&a>=c.t;){c=c.next}c=c.prev}else{for(;c.prev&&c.t>=a;){c=c.prev}}return this._prev=c,c.v+(a-c.t)/c.gap*c.c},A.config=function(a){return new w(a)},w.ease=new w,E("Bounce",v("BounceOut",function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+0.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375}),v("BounceIn",function(a){return 1/2.75>(a=1-a)?1-7.5625*a*a:2/2.75>a?1-(7.5625*(a-=1.5/2.75)*a+0.75):2.5/2.75>a?1-(7.5625*(a-=2.25/2.75)*a+0.9375):1-(7.5625*(a-=2.625/2.75)*a+0.984375)}),v("BounceInOut",function(a){var c=0.5>a;return a=c?1-2*a:2*a-1,a=1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+0.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375,c?0.5*(1-a):0.5*a+0.5})),E("Circ",v("CircOut",function(a){return Math.sqrt(1-(a-=1)*a)}),v("CircIn",function(a){return -(Math.sqrt(1-a*a)-1)}),v("CircInOut",function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)})),G=function(f,a,c){var d=x("easing."+f,function(i,l){this._p1=i>=1?i:1,this._p2=(l||c)/(1>i?i:1),this._p3=this._p2/C*(Math.asin(1/this._p1)||0),this._p2=C/this._p2},!0),h=d.prototype=new F;return h.constructor=d,h.getRatio=a,h.config=function(i,l){return new d(i,l)},d},E("Elastic",G("ElasticOut",function(a){return this._p1*Math.pow(2,-10*a)*Math.sin((a-this._p3)*this._p2)+1},0.3),G("ElasticIn",function(a){return -(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2))},0.3),G("ElasticInOut",function(a){return 1>(a*=2)?-0.5*this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2):0.5*this._p1*Math.pow(2,-10*(a-=1))*Math.sin((a-this._p3)*this._p2)+1},0.45)),E("Expo",v("ExpoOut",function(a){return 1-Math.pow(2,-10*a)}),v("ExpoIn",function(a){return Math.pow(2,10*(a-1))-0.001}),v("ExpoInOut",function(a){return 1>(a*=2)?0.5*Math.pow(2,10*(a-1)):0.5*(2-Math.pow(2,-10*(a-1)))})),E("Sine",v("SineOut",function(a){return Math.sin(a*j)}),v("SineIn",function(a){return -Math.cos(a*j)+1}),v("SineInOut",function(a){return -0.5*(Math.cos(Math.PI*a)-1)})),x("easing.EaseLookup",{find:function(a){return F.map[a]}},!0),D(b.SlowMo,"SlowMo","ease,"),D(w,"RoughEase","ease,"),D(z,"SteppedEase","ease,"),B},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(aC,aR){var aN=aC.GreenSockGlobals=aC.GreenSockGlobals||aC;if(!aN.TweenLite){var aD,aE,aI,aV,aH,aO=function(a){var d,b=a.split("."),c=aN;for(d=0;b.length>d;d++){c[b[d]]=c=c[b[d]]||{}}return c},aK=aO("com.greensock"),aW=1e-10,aB=function(b){var d,a=[],c=b.length;for(d=0;d!==c;a.push(b[d++])){}return a},aG=function(){},aQ=function(){var a=Object.prototype.toString,b=a.call([]);return function(c){return null!=c&&(c instanceof Array||"object"==typeof c&&!!c.push&&a.call(c)===b)}}(),aT={},aJ=function(c,d,f,b){this.sc=aT[c]?aT[c].sc:[],aT[c]=this,this.gsClass=null,this.func=f;var e=[];this.check=function(a){for(var i,h,m,k,n=d.length,j=n;--n>-1;){(i=aT[d[n]]||new aJ(d[n],[])).gsClass?(e[n]=i.gsClass,j--):a&&i.sc.push(this)}if(0===j&&f){for(h=("com.greensock."+c).split("."),m=h.pop(),k=aO(h.join("."))[m]=this.gsClass=f.apply(f,e),b&&(aN[m]=k,"function"==typeof define&&define.amd?define((aC.GreenSockAMDPath?aC.GreenSockAMDPath+"/":"")+c.split(".").pop(),[],function(){return k}):c===aR&&"undefined"!=typeof module&&module.exports&&(module.exports=k)),n=0;this.sc.length>n;n++){this.sc[n].check()}}},this.check(!0)},aS=aC._gsDefine=function(b,d,a,c){return new aJ(b,d,a,c)},aP=aK._class=function(b,c,a){return c=c||function(){},aS(b,[],function(){return c},a),c};aS.globals=aN;var aA=[0,0,1,1],ax=[],ad=aP("easing.Ease",function(b,d,a,c){this._func=b,this._type=a||0,this._power=c||0,this._params=d?aA.concat(d):aA},!0),az=ad.map={},ay=ad.register=function(p,j,f,q){for(var b,d,k,c,g=j.split(","),l=g.length,m=(f||"easeIn,easeOut,easeInOut").split(",");--l>-1;){for(d=g[l],b=q?aP("easing."+d,null,!0):aK.easing[d]||{},k=m.length;--k>-1;){c=m[k],az[d+"."+c]=az[c+d]=b[c]=p.getRatio?p:p[c]||new p}}};for(aI=ad.prototype,aI._calcEnd=!1,aI.getRatio=function(b){if(this._func){return this._params[0]=b,this._func.apply(null,this._params)}var d=this._type,a=this._power,c=1===d?1-b:2===d?b:0.5>b?2*b:2*(1-b);return 1===a?c*=c:2===a?c*=c*c:3===a?c*=c*c*c:4===a&&(c*=c*c*c*c),1===d?1-c:2===d?c:0.5>b?c/2:1-c/2},aD=["Linear","Quad","Cubic","Quart","Quint,Strong"],aE=aD.length;--aE>-1;){aI=aD[aE]+",Power"+aE,ay(new ad(null,null,1,aE),aI,"easeOut",!0),ay(new ad(null,null,2,aE),aI,"easeIn"+(0===aE?",easeNone":"")),ay(new ad(null,null,3,aE),aI,"easeInOut")}az.linear=aK.easing.Linear.easeIn,az.swing=aK.easing.Quad.easeInOut;var aU=aP("events.EventDispatcher",function(a){this._listeners={},this._eventTarget=a||this});aI=aU.prototype,aI.addEventListener=function(k,g,d,m,a){a=a||0;var b,f,c=this._listeners[k],j=0;for(null==c&&(this._listeners[k]=c=[]),f=c.length;--f>-1;){b=c[f],b.c===g&&b.s===d?c.splice(f,1):0===j&&a>b.pr&&(j=f+1)}c.splice(j,0,{c:g,s:d,up:m,pr:a}),this!==aV||aH||aV.wake()},aI.removeEventListener=function(b,d){var a,c=this._listeners[b];if(c){for(a=c.length;--a>-1;){if(c[a].c===d){return c.splice(a,1),void 0}}}},aI.dispatchEvent=function(b){var f,a,c,d=this._listeners[b];if(d){for(f=d.length,a=this._eventTarget;--f>-1;){c=d[f],c&&(c.up?c.c.call(c.s||a,{type:b,target:a}):c.c.call(c.s||a))}}};var ah=aC.requestAnimationFrame,ae=aC.cancelAnimationFrame,aL=Date.now||function(){return(new Date).getTime()},af=aL();for(aD=["ms","moz","webkit","o"],aE=aD.length;--aE>-1&&!ah;){ah=aC[aD[aE]+"RequestAnimationFrame"],ae=aC[aD[aE]+"CancelAnimationFrame"]||aC[aD[aE]+"CancelRequestAnimationFrame"]}aP("Ticker",function(A,w){var o,B,a,b,p,k=this,z=aL(),v=w!==!1&&ah,y=500,j=33,x="tick",q=function(d){var f,c,g=aL()-af;g>y&&(z+=g-j),af+=g,k.time=(af-z)/1000,f=k.time-p,(!o||f>0||d===!0)&&(k.frame++,p+=f+(f>=b?0.004:b-f),c=!0),d!==!0&&(a=B(q)),c&&k.dispatchEvent(x)};aU.call(k),k.time=k.frame=0,k.tick=function(){q(!0)},k.lagSmoothing=function(c,d){y=c||1/aW,j=Math.min(d,y,0)},k.sleep=function(){null!=a&&(v&&ae?ae(a):clearTimeout(a),B=aG,a=null,k===aV&&(aH=!1))},k.wake=function(){null!==a?k.sleep():k.frame>10&&(af=aL()-y+5),B=0===o?aG:v&&ah?ah:function(c){return setTimeout(c,0|1000*(p-k.time)+1)},k===aV&&(aH=!0),q(2)},k.fps=function(c){return arguments.length?(o=c,b=1/(o||60),p=this.time+b,k.wake(),void 0):o},k.useRAF=function(c){return arguments.length?(k.sleep(),v=c,k.fps(o),void 0):v},k.fps(A),setTimeout(function(){v&&5>k.frame&&k.useRAF(!1)},1500)}),aI=aK.Ticker.prototype=new aK.events.EventDispatcher,aI.constructor=aK.Ticker;var au=aP("core.Animation",function(b,c){if(this.vars=c=c||{},this._duration=this._totalDuration=b||0,this._delay=Number(c.delay)||0,this._timeScale=1,this._active=c.immediateRender===!0,this.data=c.data,this._reversed=c.reversed===!0,at){aH||aV.wake();var a=this.vars.useFrames?aM:at;a.add(this,a._time),this.vars.paused&&this.paused(!0)}});aV=au.ticker=new aK.Ticker,aI=au.prototype,aI._dirty=aI._gc=aI._initted=aI._paused=!1,aI._totalTime=aI._time=0,aI._rawPrevTime=-1,aI._next=aI._last=aI._onUpdate=aI._timeline=aI.timeline=null,aI._paused=!1;var ai=function(){aH&&aL()-af>2000&&aV.wake(),setTimeout(ai,2000)};ai(),aI.play=function(a,b){return null!=a&&this.seek(a,b),this.reversed(!1).paused(!1)},aI.pause=function(a,b){return null!=a&&this.seek(a,b),this.paused(!0)},aI.resume=function(a,b){return null!=a&&this.seek(a,b),this.paused(!1)},aI.seek=function(a,b){return this.totalTime(Number(a),b!==!1)},aI.restart=function(a,b){return this.reversed(!1).paused(!1).totalTime(a?-this._delay:0,b!==!1,!0)},aI.reverse=function(a,b){return null!=a&&this.seek(a||this.totalDuration(),b),this.reversed(!0).paused(!1)},aI.render=function(){},aI.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},aI.isActive=function(){var b,c=this._timeline,a=this._startTime;return !c||!this._gc&&!this._paused&&c.isActive()&&(b=c.rawTime())>=a&&a+this.totalDuration()/this._timeScale>b},aI._enabled=function(a,b){return aH||aV.wake(),this._gc=!a,this._active=this.isActive(),b!==!0&&(a&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!a&&this.timeline&&this._timeline._remove(this,!0)),!1},aI._kill=function(){return this._enabled(!1,!1)},aI.kill=function(a,b){return this._kill(a,b),this},aI._uncache=function(a){for(var b=a?this:this.timeline;b;){b._dirty=!0,b=b.timeline}return this},aI._swapSelfInParams=function(b){for(var c=b.length,a=b.concat();--c>-1;){"{self}"===b[c]&&(a[c]=this)}return a},aI.eventCallback=function(b,f,a,c){if("on"===(b||"").substr(0,2)){var d=this.vars;if(1===arguments.length){return d[b]}null==f?delete d[b]:(d[b]=f,d[b+"Params"]=aQ(a)&&-1!==a.join("").indexOf("{self}")?this._swapSelfInParams(a):a,d[b+"Scope"]=c),"onUpdate"===b&&(this._onUpdate=f)}return this},aI.delay=function(a){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay),this._delay=a,this):this._delay},aI.duration=function(a){return arguments.length?(this._duration=this._totalDuration=a,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0),this):(this._dirty=!1,this._duration)},aI.totalDuration=function(a){return this._dirty=!1,arguments.length?this.duration(a):this._totalDuration},aI.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(a>this._duration?this._duration:a,b)):this._time},aI.totalTime=function(b,f,a){if(aH||aV.wake(),!arguments.length){return this._totalTime}if(this._timeline){if(0>b&&!a&&(b+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var c=this._totalDuration,d=this._timeline;if(b>c&&!a&&(b=c),this._startTime=(this._paused?this._pauseTime:d._time)-(this._reversed?c-b:b)/this._timeScale,d._dirty||this._uncache(!1),d._timeline){for(;d._timeline;){d._timeline._time!==(d._startTime+d._totalTime)/d._timeScale&&d.totalTime(d._totalTime,!0),d=d._timeline}}}this._gc&&this._enabled(!0,!1),(this._totalTime!==b||0===this._duration)&&(this.render(b,f,!1),am.length&&ab())}return this},aI.progress=aI.totalProgress=function(a,b){return arguments.length?this.totalTime(this.duration()*a,b):this._time/this.duration()},aI.startTime=function(a){return arguments.length?(a!==this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,a-this._delay)),this):this._startTime},aI.endTime=function(a){return this._startTime+(0!=a?this.totalDuration():this.duration())/this._timeScale},aI.timeScale=function(b){if(!arguments.length){return this._timeScale}if(b=b||aW,this._timeline&&this._timeline.smoothChildTiming){var c=this._pauseTime,a=c||0===c?c:this._timeline.totalTime();this._startTime=a-(a-this._startTime)*this._timeScale/b}return this._timeScale=b,this._uncache(!1)},aI.reversed=function(a){return arguments.length?(a!=this._reversed&&(this._reversed=a,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},aI.paused=function(b){if(!arguments.length){return this._paused}var d,a,c=this._timeline;return b!=this._paused&&c&&(aH||b||aV.wake(),d=c.rawTime(),a=d-this._pauseTime,!b&&c.smoothChildTiming&&(this._startTime+=a,this._uncache(!1)),this._pauseTime=b?d:null,this._paused=b,this._active=this.isActive(),!b&&0!==a&&this._initted&&this.duration()&&this.render(c.smoothChildTiming?this._totalTime:(d-this._startTime)/this._timeScale,!0,!0)),this._gc&&!b&&this._enabled(!0,!1),this};var ar=aP("core.SimpleTimeline",function(a){au.call(this,0,a),this.autoRemoveChildren=this.smoothChildTiming=!0});aI=ar.prototype=new au,aI.constructor=ar,aI.kill()._gc=!1,aI._first=aI._last=aI._recent=null,aI._sortChildren=!1,aI.add=aI.insert=function(b,d){var a,c;if(b._startTime=Number(d||0)+b._delay,b._paused&&this!==b._timeline&&(b._pauseTime=b._startTime+(this.rawTime()-b._startTime)/b._timeScale),b.timeline&&b.timeline._remove(b,!0),b.timeline=b._timeline=this,b._gc&&b._enabled(!0,!0),a=this._last,this._sortChildren){for(c=b._startTime;a&&a._startTime>c;){a=a._prev}}return a?(b._next=a._next,a._next=b):(b._next=this._first,this._first=b),b._next?b._next._prev=b:this._last=b,b._prev=a,this._recent=b,this._timeline&&this._uncache(!0),this},aI._remove=function(a,b){return a.timeline===this&&(b||a._enabled(!1,!0),a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),a._next=a._prev=a.timeline=null,a===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},aI.render=function(b,f,a){var c,d=this._first;for(this._totalTime=this._time=this._rawPrevTime=b;d;){c=d._next,(d._active||b>=d._startTime&&!d._paused)&&(d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(b-d._startTime)*d._timeScale,f,a):d.render((b-d._startTime)*d._timeScale,f,a)),d=c}},aI.rawTime=function(){return aH||aV.wake(),this._totalTime};var aq=aP("TweenLite",function(j,c,f){if(au.call(this,c,f),this.render=aq.prototype.render,null==j){throw"Cannot tween a null target."}this.target=j="string"!=typeof j?j:aq.selector(j)||j;var g,l,b,k=j.jquery||j.length&&j!==aC&&j[0]&&(j[0]===aC||j[0].nodeType&&j[0].style&&!j.nodeType),d=this.vars.overwrite;if(this._overwrite=d=null==d?J[aq.defaultOverwrite]:"number"==typeof d?d>>0:J[d],(k||j instanceof Array||j.push&&aQ(j))&&"number"!=typeof j[0]){for(this._targets=b=aB(j),this._propLookup=[],this._siblings=[],g=0;b.length>g;g++){l=b[g],l?"string"!=typeof l?l.length&&l!==aC&&l[0]&&(l[0]===aC||l[0].nodeType&&l[0].style&&!l.nodeType)?(b.splice(g--,1),this._targets=b=b.concat(aB(l))):(this._siblings[g]=an(l,this,!1),1===d&&this._siblings[g].length>1&&H(l,this,null,1,this._siblings[g])):(l=b[g--]=aq.selector(l),"string"==typeof l&&b.splice(g+1,1)):b.splice(g--,1)}}else{this._propLookup={},this._siblings=an(j,this,!1),1===d&&this._siblings.length>1&&H(j,this,null,1,this._siblings)}(this.vars.immediateRender||0===c&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-aW,this.render(-this._delay))},!0),ak=function(a){return a&&a.length&&a!==aC&&a[0]&&(a[0]===aC||a[0].nodeType&&a[0].style&&!a.nodeType)},aw=function(b,d){var a,c={};for(a in b){ac[a]||a in d&&"transform"!==a&&"x"!==a&&"y"!==a&&"width"!==a&&"height"!==a&&"className"!==a&&"border"!==a||!(!aj[a]||aj[a]&&aj[a]._autoCSS)||(c[a]=b[a],delete b[a])}b.css=c};aI=aq.prototype=new au,aI.constructor=aq,aI.kill()._gc=!1,aI.ratio=0,aI._firstPT=aI._targets=aI._overwrittenProps=aI._startAt=null,aI._notifyPluginsOfEnabled=aI._lazy=!1,aq.version="1.16.1",aq.defaultEase=aI._ease=new ad(null,null,1,1),aq.defaultOverwrite="auto",aq.ticker=aV,aq.autoSleep=120,aq.lagSmoothing=function(a,b){aV.lagSmoothing(a,b)},aq.selector=aC.$||aC.jQuery||function(b){var a=aC.$||aC.jQuery;return a?(aq.selector=a,a(b)):"undefined"==typeof document?b:document.querySelectorAll?document.querySelectorAll(b):document.getElementById("#"===b.charAt(0)?b.substr(1):b)};var am=[],ao={},ap=aq._internals={isArray:aQ,isSelector:ak,lazyTweens:am},aj=aq._plugins={},al=ap.tweenLookup={},K=0,ac=ap.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1},J={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},aM=au._rootFramesTimeline=new ar,at=au._rootTimeline=new ar,aF=30,ab=ap.lazyRender=function(){var a,b=am.length;for(ao={};--b>-1;){a=am[b],a&&a._lazy!==!1&&(a.render(a._lazy[0],a._lazy[1],!0),a._lazy=!1)}am.length=0};at._startTime=aV.time,aM._startTime=aV.frame,at._active=aM._active=!0,setTimeout(ab,1),au._updateRoot=aq.render=function(){var b,c,a;if(am.length&&ab(),at.render((aV.time-at._startTime)*at._timeScale,!1,!1),aM.render((aV.frame-aM._startTime)*aM._timeScale,!1,!1),am.length&&ab(),aV.frame>=aF){aF=aV.frame+(parseInt(aq.autoSleep,10)||120);for(a in al){for(c=al[a].tweens,b=c.length;--b>-1;){c[b]._gc&&c.splice(b,1)}0===c.length&&delete al[a]}if(a=at._first,(!a||a._paused)&&aq.autoSleep&&!aM._first&&1===aV._listeners.tick.length){for(;a&&a._paused;){a=a._next}a||aV.sleep()}}},aV.addEventListener("tick",au._updateRoot);var an=function(b,f,a){var c,d,g=b._gsTweenID;if(al[g||(b._gsTweenID=g="t"+K++)]||(al[g]={target:b,tweens:[]}),f&&(c=al[g].tweens,c[d=c.length]=f,a)){for(;--d>-1;){c[d]===f&&c.splice(d,1)}}return al[g].tweens},aa=function(d,h,c,f){var g,j,b=d.vars.onOverwrite;return b&&(g=b(d,h,c,f)),b=aq.onOverwrite,b&&(j=b(d,h,c,f)),g!==!1&&j!==!1},H=function(A,w,m,B,b){var j,y,g,q;if(1===B||B>=4){for(q=b.length,j=0;q>j;j++){if((g=b[j])!==w){g._gc||aa(g,w)&&g._enabled(!1,!1)&&(y=!0)}else{if(5===B){break}}}return y}var k,z=w._startTime+aW,d=[],v=0,x=0===w._duration;for(j=b.length;--j>-1;){(g=b[j])===w||g._gc||g._paused||(g._timeline!==w._timeline?(k=k||ag(w,0,x),0===ag(g,k,x)&&(d[v++]=g)):z>=g._startTime&&g._startTime+g.totalDuration()/g._timeScale>z&&((x||!g._initted)&&2e-10>=z-g._startTime||(d[v++]=g)))}for(j=v;--j>-1;){if(g=d[j],2===B&&g._kill(m,A,w)&&(y=!0),2!==B||!g._firstPT&&g._initted){if(2!==B&&!aa(g,w)){continue}g._enabled(!1,!1)&&(y=!0)}}return y},ag=function(b,f,a){for(var c=b._timeline,d=c._timeScale,g=b._startTime;c._timeline;){if(g+=c._startTime,d*=c._timeScale,c._paused){return -100}c=c._timeline}return g/=d,g>f?g-f:a&&g===f||!b._initted&&2*aW>g-f?aW:(g+=b.totalDuration()/b._timeScale/d)>f+aW?0:g-f-aW};aI._init=function(){var p,k,g,q,b,d=this.vars,m=this._overwrittenProps,c=this._duration,j=!!d.immediateRender,f=d.ease;if(d.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),b={};for(q in d.startAt){b[q]=d.startAt[q]}if(b.overwrite=!1,b.immediateRender=!0,b.lazy=j&&d.lazy!==!1,b.startAt=b.delay=null,this._startAt=aq.to(this.target,0,b),j){if(this._time>0){this._startAt=null}else{if(0!==c){return}}}}else{if(d.runBackwards&&0!==c){if(this._startAt){this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null}else{0!==this._time&&(j=!1),g={};for(q in d){ac[q]&&"autoCSS"!==q||(g[q]=d[q])}if(g.overwrite=0,g.data="isFromStart",g.lazy=j&&d.lazy!==!1,g.immediateRender=j,this._startAt=aq.to(this.target,0,g),j){if(0===this._time){return}}else{this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}}}}if(this._ease=f=f?f instanceof ad?f:"function"==typeof f?new ad(f,d.easeParams):az[f]||aq.defaultEase:aq.defaultEase,d.easeParams instanceof Array&&f.config&&(this._ease=f.config.apply(f,d.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets){for(p=this._targets.length;--p>-1;){this._initProps(this._targets[p],this._propLookup[p]={},this._siblings[p],m?m[p]:null)&&(k=!0)}}else{k=this._initProps(this.target,this._propLookup,this._siblings,m)}if(k&&aq._onPluginEvent("_onInitAllProps",this),m&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),d.runBackwards){for(g=this._firstPT;g;){g.s+=g.c,g.c=-g.c,g=g._next}}this._onUpdate=d.onUpdate,this._initted=!0},aI._initProps=function(k,g,q,b){var d,m,c,j,f,p;if(null==k){return !1}ao[k._gsTweenID]&&ab(),this.vars.css||k.style&&k!==aC&&k.nodeType&&aj.css&&this.vars.autoCSS!==!1&&aw(this.vars,k);for(d in this.vars){if(p=this.vars[d],ac[d]){p&&(p instanceof Array||p.push&&aQ(p))&&-1!==p.join("").indexOf("{self}")&&(this.vars[d]=p=this._swapSelfInParams(p,this))}else{if(aj[d]&&(j=new aj[d])._onInitTween(k,this.vars[d],this)){for(this._firstPT=f={_next:this._firstPT,t:j,p:"setRatio",s:0,c:1,f:!0,n:d,pg:!0,pr:j._priority},m=j._overwriteProps.length;--m>-1;){g[j._overwriteProps[m]]=this._firstPT}(j._priority||j._onInitAllProps)&&(c=!0),(j._onDisable||j._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else{this._firstPT=g[d]=f={_next:this._firstPT,t:k,p:d,f:"function"==typeof k[d],n:d,pg:!1,pr:0},f.s=f.f?k[d.indexOf("set")||"function"!=typeof k["get"+d.substr(3)]?d:"get"+d.substr(3)]():parseFloat(k[d]),f.c="string"==typeof p&&"="===p.charAt(1)?parseInt(p.charAt(0)+"1",10)*Number(p.substr(2)):Number(p)-f.s||0}}f&&f._next&&(f._next._prev=f)}return b&&this._kill(b,k)?this._initProps(k,g,q,b):this._overwrite>1&&this._firstPT&&q.length>1&&H(k,this,g,this._overwrite,q)?(this._kill(g,k),this._initProps(k,g,q,b)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(ao[k._gsTweenID]=!0),c)},aI.render=function(y,v,k){var z,b,g,w,d=this._time,m=this._duration,j=this._rawPrevTime;if(y>=m){this._totalTime=this._time=m,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(z=!0,b="onComplete",k=k||this._timeline.autoRemoveChildren),0===m&&(this._initted||!this.vars.lazy||k)&&(this._startTime===this._timeline._duration&&(y=0),(0===y||0>j||j===aW&&"isPause"!==this.data)&&j!==y&&(k=!0,j>aW&&(b="onReverseComplete")),this._rawPrevTime=w=!v||y||j===y?y:aW)}else{if(1e-7>y){this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==d||0===m&&j>0)&&(b="onReverseComplete",z=this._reversed),0>y&&(this._active=!1,0===m&&(this._initted||!this.vars.lazy||k)&&(j>=0&&(j!==aW||"isPause"!==this.data)&&(k=!0),this._rawPrevTime=w=!v||y||j===y?y:aW)),this._initted||(k=!0)}else{if(this._totalTime=this._time=y,this._easeType){var x=y/m,c=this._easeType,q=this._easePower;(1===c||3===c&&x>=0.5)&&(x=1-x),3===c&&(x*=2),1===q?x*=x:2===q?x*=x*x:3===q?x*=x*x*x:4===q&&(x*=x*x*x*x),this.ratio=1===c?1-x:2===c?x:0.5>y/m?x/2:1-x/2}else{this.ratio=this._ease.getRatio(y/m)}}}if(this._time!==d||k){if(!this._initted){if(this._init(),!this._initted||this._gc){return}if(!k&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)){return this._time=this._totalTime=d,this._rawPrevTime=j,am.push(this),this._lazy=[y,v],void 0}this._time&&!z?this.ratio=this._ease.getRatio(this._time/m):z&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==d&&y>=0&&(this._active=!0),0===d&&(this._startAt&&(y>=0?this._startAt.render(y,v,k):b||(b="_dummyGS")),this.vars.onStart&&(0!==this._time||0===m)&&(v||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||ax))),g=this._firstPT;g;){g.f?g.t[g.p](g.c*this.ratio+g.s):g.t[g.p]=g.c*this.ratio+g.s,g=g._next}this._onUpdate&&(0>y&&this._startAt&&y!==-0.0001&&this._startAt.render(y,v,k),v||(this._time!==d||z)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||ax)),b&&(!this._gc||k)&&(0>y&&this._startAt&&!this._onUpdate&&y!==-0.0001&&this._startAt.render(y,v,k),z&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!v&&this.vars[b]&&this.vars[b].apply(this.vars[b+"Scope"]||this,this.vars[b+"Params"]||ax),0===m&&this._rawPrevTime===aW&&w!==aW&&(this._rawPrevTime=0))}},aI._kill=function(v,k,g){if("all"===v&&(v=null),null==v&&(null==k||k===this.target)){return this._lazy=!1,this._enabled(!1,!1)}k="string"!=typeof k?k||this._targets||this.target:aq.selector(k)||k;var w,b,d,m,c,j,f,p,q;if((aQ(k)||ak(k))&&"number"!=typeof k[0]){for(w=k.length;--w>-1;){this._kill(v,k[w])&&(j=!0)}}else{if(this._targets){for(w=this._targets.length;--w>-1;){if(k===this._targets[w]){c=this._propLookup[w]||{},this._overwrittenProps=this._overwrittenProps||[],b=this._overwrittenProps[w]=v?this._overwrittenProps[w]||{}:"all";break}}}else{if(k!==this.target){return !1}c=this._propLookup,b=this._overwrittenProps=v?this._overwrittenProps||{}:"all"}if(c){if(f=v||c,p=v!==b&&"all"!==b&&v!==c&&("object"!=typeof v||!v._tempKill),g&&(aq.onOverwrite||this.vars.onOverwrite)){for(d in f){c[d]&&(q||(q=[]),q.push(d))}if(!aa(this,g,k,q)){return !1}}for(d in f){(m=c[d])&&(m.pg&&m.t._kill(f)&&(j=!0),m.pg&&0!==m.t._overwriteProps.length||(m._prev?m._prev._next=m._next:m===this._firstPT&&(this._firstPT=m._next),m._next&&(m._next._prev=m._prev),m._next=m._prev=null),delete c[d]),p&&(b[d]=1)}!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return j},aI.invalidate=function(){return this._notifyPluginsOfEnabled&&aq._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],au.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-aW,this.render(-this._delay)),this},aI._enabled=function(b,d){if(aH||aV.wake(),b&&this._gc){var a,c=this._targets;if(c){for(a=c.length;--a>-1;){this._siblings[a]=an(c[a],this,!0)}}else{this._siblings=an(this.target,this,!0)}}return au.prototype._enabled.call(this,b,d),this._notifyPluginsOfEnabled&&this._firstPT?aq._onPluginEvent(b?"_onEnable":"_onDisable",this):!1},aq.to=function(b,c,a){return new aq(b,c,a)},aq.from=function(b,c,a){return a.runBackwards=!0,a.immediateRender=0!=a.immediateRender,new aq(b,c,a)},aq.fromTo=function(b,d,a,c){return c.startAt=a,c.immediateRender=0!=c.immediateRender&&0!=a.immediateRender,new aq(b,d,c)},aq.delayedCall=function(b,f,a,c,d){return new aq(f,0,{delay:b,onComplete:f,onCompleteParams:a,onCompleteScope:c,onReverseComplete:f,onReverseCompleteParams:a,onReverseCompleteScope:c,immediateRender:!1,lazy:!1,useFrames:d,overwrite:0})},aq.set=function(a,b){return new aq(a,0,b)},aq.getTweensOf=function(b,f){if(null==b){return[]}b="string"!=typeof b?b:aq.selector(b)||b;var a,c,d,g;if((aQ(b)||ak(b))&&"number"!=typeof b[0]){for(a=b.length,c=[];--a>-1;){c=c.concat(aq.getTweensOf(b[a],f))}for(a=c.length;--a>-1;){for(g=c[a],d=a;--d>-1;){g===c[d]&&c.splice(a,1)}}}else{for(c=an(b).concat(),a=c.length;--a>-1;){(c[a]._gc||f&&!c[a].isActive())&&c.splice(a,1)}}return c},aq.killTweensOf=aq.killDelayedCallsTo=function(b,f,a){"object"==typeof f&&(a=f,f=!1);for(var c=aq.getTweensOf(b,f),d=c.length;--d>-1;){c[d]._kill(a,b)}};var av=aP("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(","),this._propName=this._overwriteProps[0],this._priority=b||0,this._super=av.prototype},!0);if(aI=av.prototype,av.version="1.10.1",av.API=2,aI._firstPT=null,aI._addTween=function(d,h,c,f,g,k){var b,j;return null!=f&&(b="number"==typeof f||"="!==f.charAt(1)?Number(f)-c:parseInt(f.charAt(0)+"1",10)*Number(f.substr(2)))?(this._firstPT=j={_next:this._firstPT,t:d,p:h,s:c,c:b,f:"function"==typeof d[h],n:g||h,r:k},j._next&&(j._next._prev=j),j):void 0},aI.setRatio=function(b){for(var d,a=this._firstPT,c=0.000001;a;){d=a.c*b+a.s,a.r?d=Math.round(d):c>d&&d>-c&&(d=0),a.f?a.t[a.p](d):a.t[a.p]=d,a=a._next}},aI._kill=function(b){var d,a=this._overwriteProps,c=this._firstPT;if(null!=b[this._propName]){this._overwriteProps=[]}else{for(d=a.length;--d>-1;){null!=b[a[d]]&&a.splice(d,1)}}for(;c;){null!=b[c.n]&&(c._next&&(c._next._prev=c._prev),c._prev?(c._prev._next=c._next,c._prev=null):this._firstPT===c&&(this._firstPT=c._next)),c=c._next}return !1},aI._roundProps=function(b,c){for(var a=this._firstPT;a;){(b[this._propName]||null!=a.n&&b[a.n.split(this._propName+"_").join("")])&&(a.r=c),a=a._next}},aq._onPluginEvent=function(d,h){var c,f,g,k,b,j=h._firstPT;if("_onInitAllProps"===d){for(;j;){for(b=j._next,f=g;f&&f.pr>j.pr;){f=f._next}(j._prev=f?f._prev:k)?j._prev._next=j:g=j,(j._next=f)?f._prev=j:k=j,j=b}j=h._firstPT=g}for(;j;){j.pg&&"function"==typeof j.t[d]&&j.t[d]()&&(c=!0),j=j._next}return c},av.activate=function(a){for(var b=a.length;--b>-1;){a[b].API===av.API&&(aj[(new a[b])._propName]=a[b])}return !0},aS.plugin=function(d){if(!(d&&d.propName&&d.init&&d.API)){throw"illegal plugin definition."}var h,c=d.propName,f=d.priority||0,g=d.overwriteProps,k={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},b=aP("plugins."+c.charAt(0).toUpperCase()+c.substr(1)+"Plugin",function(){av.call(this,c,f),this._overwriteProps=g||[]},d.global===!0),j=b.prototype=new av(c);j.constructor=b,b.API=d.API;for(h in k){"function"==typeof d[h]&&(j[k[h]]=d[h])}return b.version=d.version,av.activate([b]),b},aD=aC._gsQueue){for(aE=0;aD.length>aE;aE++){aD[aE]()}for(aI in aT){aT[aI].func||aC.console.log("GSAP encountered missing dependency: com.greensock."+aI)}}aH=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenMax");(function(d){function e(g,f){return function(h){f.call(g,h)}}var b=d.isPlainObject,a=CSSPlugin._internals.getTransform,c=["{self}"];d.fn.__css=function(h,f){var i;if(b(h)){TweenMax.set(this,h)}else{if(void 0!==f){i={},i[h]=f,TweenMax.set(this,i)}else{if(-1!=="scale,scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,rotationZ,perspective,xPercent,yPercent,zOrigin,".indexOf(h+",")){var g=this[0];i=h;g=g._gsTransform||a(g);"rotationZ"==i?i="rotation":"scale"==i&&(i="scaleX");return g[i]}return this.css(h)}}return this};d.fn.__animate=function(k,g,l,j){var h={},i;for(i in k){h[i]=k[i]}if(b(g)){for(i in g){h[i]=g[i]}}else{"function"==typeof j?(h.duration=g,h.easing=l,h.complete=j):"function"==typeof l?("number"==typeof g?h.duration=g:h.easing=g,h.complete=l):"number"==typeof g?h.duration=g:"string"==typeof g?h.easing=g:"function"==typeof g&&(h.complete=g)}h.duration=(void 0!==h.duration?h.duration:400)/1000;void 0!==h.delay&&(h.delay/=1000);void 0!==h.repeatDelay&&(h.repeatDelay/=1000);h.start&&(h.onStart=e(this,h.start),h.onStartParams=c,delete h.start);if(h.step||h.progress){h.onUpdate=e(this,h.step||h.progress),h.onUpdateParams=c,delete h.step,delete h.progress}h.repeatStep&&(h.onRepeat=e(this,h.repeatStep),h.onRepeatParams=c,delete h.repeatStep);h.complete&&(h.onComplete=e(this,h.complete),h.onCompleteParams=c,delete h.complete);h.easing&&(h.ease=h.easing,delete h.easing);delete h.queue;k=h.duration;delete h.duration;this.data("TweenMax",TweenMax.to(this,k,h));return this};d.fn.__stop=function(g,f){var h=this.data("TweenMax");h&&h.kill(g,f);return this};(function(){function m(f){return function(g){return f.getRatio(g)}}var h,n,l,i,k,j;if(d.easing&&window.GreenSockGlobals&&window.GreenSockGlobals.Ease&&window.GreenSockGlobals.Ease.map){for(h="Quad Cubic Quart Quint Sine Expo Circ Elastic Back Bounce".split(" "),n=["In","Out","InOut"],l=window.GreenSockGlobals.Ease.map,k=0;k<h.length;k++){for(j=0;j<n.length;j++){i="ease"+n[j]+h[k],l[i]&&!d.easing[i]&&(d.easing[i]=m(l[i]))}}}})()})(window.jQuery);
/*! iScroll v5.1.3 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
(function(e,k,h){function i(f,d){this.wrapper="string"==typeof f?k.querySelector(f):f;this.scroller=this.wrapper.children[0];this.scrollerStyle=this.scroller.style;this.options={resizeScrollbars:!0,mouseWheelSpeed:20,snapThreshold:0.334,startX:0,startY:0,scrollY:!0,directionLockThreshold:5,momentum:!0,bounce:!0,bounceTime:600,bounceEasing:"",preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0};for(var g in d){this.options[g]=d[g]}this.translateZ=this.options.HWCompositing&&j.hasPerspective?" translateZ(0)":"";this.options.useTransition=j.hasTransition&&this.options.useTransition;this.options.useTransform=j.hasTransform&&this.options.useTransform;this.options.eventPassthrough=!0===this.options.eventPassthrough?"vertical":this.options.eventPassthrough;this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault;this.options.scrollY="vertical"==this.options.eventPassthrough?!1:this.options.scrollY;this.options.scrollX="horizontal"==this.options.eventPassthrough?!1:this.options.scrollX;this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough;this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold;this.options.bounceEasing="string"==typeof this.options.bounceEasing?j.ease[this.options.bounceEasing]||j.ease.circular:this.options.bounceEasing;this.options.resizePolling=void 0===this.options.resizePolling?60:this.options.resizePolling;!0===this.options.tap&&(this.options.tap="tap");"scale"==this.options.shrinkScrollbars&&(this.options.useTransition=!1);this.options.invertWheelDirection=this.options.invertWheelDirection?-1:1;this.directionY=this.directionX=this.y=this.x=0;this._events={};this._init();this.refresh();this.scrollTo(this.options.startX,this.options.startY);this.enable()}function c(g,f,n){var l=k.createElement("div"),m=k.createElement("div");!0===n&&(l.style.cssText="position:absolute;z-index:9999",m.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px");m.className="iScrollIndicator";"h"==g?(!0===n&&(l.style.cssText+=";height:7px;left:2px;right:2px;bottom:0",m.style.height="100%"),l.className="iScrollHorizontalScrollbar"):(!0===n&&(l.style.cssText+=";width:7px;bottom:2px;top:2px;right:1px",m.style.width="100%"),l.className="iScrollVerticalScrollbar");l.style.cssText+=";overflow:hidden";f||(l.style.pointerEvents="none");l.appendChild(m);return l}function b(f,d){this.wrapper="string"==typeof d.el?k.querySelector(d.el):d.el;this.wrapperStyle=this.wrapper.style;this.indicator=this.wrapper.children[0];this.indicatorStyle=this.indicator.style;this.scroller=f;this.options={listenX:!0,listenY:!0,interactive:!1,resize:!0,defaultScrollbars:!1,shrink:!1,fade:!1,speedRatioX:0,speedRatioY:0};for(var g in d){this.options[g]=d[g]}this.sizeRatioY=this.sizeRatioX=1;this.maxPosY=this.maxPosX=0;this.options.interactive&&(this.options.disableTouch||(j.addEvent(this.indicator,"touchstart",this),j.addEvent(e,"touchend",this)),this.options.disablePointer||(j.addEvent(this.indicator,j.prefixPointerEvent("pointerdown"),this),j.addEvent(e,j.prefixPointerEvent("pointerup"),this)),this.options.disableMouse||(j.addEvent(this.indicator,"mousedown",this),j.addEvent(e,"mouseup",this)));this.options.fade&&(this.wrapperStyle[j.style.transform]=this.scroller.translateZ,this.wrapperStyle[j.style.transitionDuration]=j.isBadAndroid?"0.001s":"0ms",this.wrapperStyle.opacity="0")}var a=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(d){e.setTimeout(d,1000/60)},j=function(){function g(d){return !1===l?!1:""===l?d:l+d.charAt(0).toUpperCase()+d.substr(1)}var f={},n=k.createElement("div").style,l=function(){for(var p=["t","webkitT","MozT","msT","OT"],o,q=0,r=p.length;q<r;q++){if(o=p[q]+"ransform",o in n){return p[q].substr(0,p[q].length-1)}}return !1}();f.getTime=Date.now||function(){return(new Date).getTime()};f.extend=function(o,d){for(var p in d){o[p]=d[p]}};f.addEvent=function(o,d,q,p){o.addEventListener&&o.addEventListener(d,q,!!p)};f.removeEvent=function(o,d,q,p){o.removeEventListener&&o.removeEventListener(d,q,!!p)};f.prefixPointerEvent=function(d){return e.MSPointerEvent?"MSPointer"+d.charAt(9).toUpperCase()+d.substr(10):d};f.momentum=function(p,o,u,s,t,q){o=p-o;u=h.abs(o)/u;var r;q=void 0===q?0.0006:q;r=p+u*u/(2*q)*(0>o?-1:1);q=u/q;r<s?(r=t?s-t/2.5*(u/8):s,o=h.abs(r-p),q=o/u):0<r&&(r=t?t/2.5*(u/8):0,o=h.abs(p)+r,q=o/u);return{destination:h.round(r),duration:q}};var m=g("transform");f.extend(f,{hasTransform:!1!==m,hasPerspective:g("perspective") in n,hasTouch:"ontouchstart" in e,hasPointer:e.PointerEvent||e.MSPointerEvent,hasTransition:g("transition") in n});f.isBadAndroid=/Android /.test(e.navigator.appVersion)&&!/Chrome\/\d/.test(e.navigator.appVersion);f.extend(f.style={},{transform:m,transitionTimingFunction:g("transitionTimingFunction"),transitionDuration:g("transitionDuration"),transitionDelay:g("transitionDelay"),transformOrigin:g("transformOrigin")});f.hasClass=function(o,d){return(new RegExp("(^|\\s)"+d+"(\\s|$)")).test(o.className)};f.addClass=function(d,p){if(!f.hasClass(d,p)){var o=d.className.split(" ");o.push(p);d.className=o.join(" ")}};f.removeClass=function(d,o){f.hasClass(d,o)&&(d.className=d.className.replace(new RegExp("(^|\\s)"+o+"(\\s|$)","g")," "))};f.offset=function(o){for(var d=-o.offsetLeft,p=-o.offsetTop;o=o.offsetParent;){d-=o.offsetLeft,p-=o.offsetTop}return{left:d,top:p}};f.preventDefaultException=function(o,d){for(var p in d){if(d[p].test(o[p])){return !0}}return !1};f.extend(f.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2,pointerdown:3,pointermove:3,pointerup:3,MSPointerDown:3,MSPointerMove:3,MSPointerUp:3});f.extend(f.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(d){return d*(2-d)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(d){return h.sqrt(1- --d*d)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(d){return --d*d*(5*d+4)+1}},bounce:{style:"",fn:function(d){return(d/=1)<1/2.75?7.5625*d*d:d<2/2.75?7.5625*(d-=1.5/2.75)*d+0.75:d<2.5/2.75?7.5625*(d-=2.25/2.75)*d+0.9375:7.5625*(d-=2.625/2.75)*d+0.984375}},elastic:{style:"",fn:function(d){return 0===d?0:1==d?1:0.4*h.pow(2,-10*d)*h.sin(2*(d-0.055)*h.PI/0.22)+1}}});f.tap=function(o,d){var p=k.createEvent("Event");p.initEvent(d,!0,!0);p.pageX=o.pageX;p.pageY=o.pageY;o.target.dispatchEvent(p)};f.click=function(o){var d=o.target,p;/(SELECT|INPUT|TEXTAREA)/i.test(d.tagName)||(p=k.createEvent("MouseEvents"),p.initMouseEvent("click",!0,!0,o.view,1,d.screenX,d.screenY,d.clientX,d.clientY,o.ctrlKey,o.altKey,o.shiftKey,o.metaKey,0,null),p._constructed=!0,d.dispatchEvent(p))};return f}();i.prototype={version:"5.1.3",_init:function(){this._initEvents();(this.options.scrollbars||this.options.indicators)&&this._initIndicators();this.options.mouseWheel&&this._initWheel();this.options.snap&&this._initSnap();this.options.keyBindings&&this._initKeys()},destroy:function(){this._initEvents(!0);this._execEvent("destroy")},_transitionEnd:function(d){d.target==this.scroller&&this.isInTransition&&(this._transitionTime(),this.resetPosition(this.options.bounceTime)||(this.isInTransition=!1,this._execEvent("scrollEnd")))},_start:function(f){if(!(1!=j.eventType[f.type]&&0!==f.button||!this.enabled||this.initiated&&j.eventType[f.type]!==this.initiated)){!this.options.preventDefault||j.isBadAndroid||j.preventDefaultException(f.target,this.options.preventDefaultException)||f.preventDefault();var d=f.touches?f.touches[0]:f;this.initiated=j.eventType[f.type];this.moved=!1;this.directionLocked=this.directionY=this.directionX=this.distY=this.distX=0;this._transitionTime();this.startTime=j.getTime();this.options.useTransition&&this.isInTransition?(this.isInTransition=!1,f=this.getComputedPosition(),this._translate(h.round(f.x),h.round(f.y)),this._execEvent("scrollEnd")):!this.options.useTransition&&this.isAnimating&&(this.isAnimating=!1,this._execEvent("scrollEnd"));this.startX=this.x;this.startY=this.y;this.absStartX=this.x;this.absStartY=this.y;this.pointX=d.pageX;this.pointY=d.pageY;this._execEvent("beforeScrollStart")}},_move:function(f){if(this.enabled&&j.eventType[f.type]===this.initiated){this.options.preventDefault&&f.preventDefault();var d=f.touches?f.touches[0]:f,n=d.pageX-this.pointX,m=d.pageY-this.pointY,g=j.getTime(),l;this.pointX=d.pageX;this.pointY=d.pageY;this.distX+=n;this.distY+=m;d=h.abs(this.distX);l=h.abs(this.distY);if(!(300<g-this.endTime&&10>d&&10>l)){this.directionLocked||this.options.freeScroll||(this.directionLocked=d>l+this.options.directionLockThreshold?"h":l>=d+this.options.directionLockThreshold?"v":"n");if("h"==this.directionLocked){if("vertical"==this.options.eventPassthrough){f.preventDefault()}else{if("horizontal"==this.options.eventPassthrough){this.initiated=!1;return}}m=0}else{if("v"==this.directionLocked){if("horizontal"==this.options.eventPassthrough){f.preventDefault()}else{if("vertical"==this.options.eventPassthrough){this.initiated=!1;return}}n=0}}n=this.hasHorizontalScroll?n:0;m=this.hasVerticalScroll?m:0;f=this.x+n;d=this.y+m;if(0<f||f<this.maxScrollX){f=this.options.bounce?this.x+n/3:0<f?0:this.maxScrollX}if(0<d||d<this.maxScrollY){d=this.options.bounce?this.y+m/3:0<d?0:this.maxScrollY}this.directionX=0<n?-1:0>n?1:0;this.directionY=0<m?-1:0>m?1:0;this.moved||this._execEvent("scrollStart");this.moved=!0;this._translate(f,d);300<g-this.startTime&&(this.startTime=g,this.startX=this.x,this.startY=this.y)}}},_end:function(m){if(this.enabled&&j.eventType[m.type]===this.initiated){this.options.preventDefault&&!j.preventDefaultException(m.target,this.options.preventDefaultException)&&m.preventDefault();var d,r;r=j.getTime()-this.startTime;var q=h.round(this.x),n=h.round(this.y),o=h.abs(q-this.startX),p=h.abs(n-this.startY);d=0;var f="";this.initiated=this.isInTransition=0;this.endTime=j.getTime();if(!this.resetPosition(this.options.bounceTime)){if(this.scrollTo(q,n),this.moved){if(this._events.flick&&200>r&&100>o&&100>p){this._execEvent("flick")}else{if(this.options.momentum&&300>r&&(d=this.hasHorizontalScroll?j.momentum(this.x,this.startX,r,this.maxScrollX,this.options.bounce?this.wrapperWidth:0,this.options.deceleration):{destination:q,duration:0},r=this.hasVerticalScroll?j.momentum(this.y,this.startY,r,this.maxScrollY,this.options.bounce?this.wrapperHeight:0,this.options.deceleration):{destination:n,duration:0},q=d.destination,n=r.destination,d=h.max(d.duration,r.duration),this.isInTransition=1),this.options.snap&&(this.currentPage=f=this._nearestSnap(q,n),d=this.options.snapSpeed||h.max(h.max(h.min(h.abs(q-f.x),1000),h.min(h.abs(n-f.y),1000)),300),q=f.x,n=f.y,this.directionY=this.directionX=0,f=this.options.bounceEasing),q!=this.x||n!=this.y){if(0<q||q<this.maxScrollX||0<n||n<this.maxScrollY){f=j.ease.quadratic}this.scrollTo(q,n,d,f)}else{this._execEvent("scrollEnd")}}}else{this.options.tap&&j.tap(m,this.options.tap),this.options.click&&j.click(m),this._execEvent("scrollCancel")}}}},_resize:function(){var d=this;clearTimeout(this.resizeTimeout);this.resizeTimeout=setTimeout(function(){d.refresh()},this.options.resizePolling)},resetPosition:function(f){var d=this.x,g=this.y;!this.hasHorizontalScroll||0<this.x?d=0:this.x<this.maxScrollX&&(d=this.maxScrollX);!this.hasVerticalScroll||0<this.y?g=0:this.y<this.maxScrollY&&(g=this.maxScrollY);if(d==this.x&&g==this.y){return !1}this.scrollTo(d,g,f||0,this.options.bounceEasing);return !0},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},refresh:function(){this.wrapperWidth=this.wrapper.clientWidth;this.wrapperHeight=this.wrapper.clientHeight;this.scrollerWidth=this.scroller.offsetWidth;this.scrollerHeight=this.scroller.offsetHeight;this.maxScrollX=this.wrapperWidth-this.scrollerWidth;this.maxScrollY=this.wrapperHeight-this.scrollerHeight;this.hasHorizontalScroll=this.options.scrollX&&0>this.maxScrollX;this.hasVerticalScroll=this.options.scrollY&&0>this.maxScrollY;this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth);this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight);this.directionY=this.directionX=this.endTime=0;this.wrapperOffset=j.offset(this.wrapper);this._execEvent("refresh");this.resetPosition()},on:function(f,d){this._events[f]||(this._events[f]=[]);this._events[f].push(d)},off:function(f,d){if(this._events[f]){var g=this._events[f].indexOf(d);-1<g&&this._events[f].splice(g,1)}},_execEvent:function(f){if(this._events[f]){var d=0,g=this._events[f].length;if(g){for(;d<g;d++){this._events[f][d].apply(this,[].slice.call(arguments,1))}}}},scrollBy:function(f,d,l,g){f=this.x+f;d=this.y+d;this.scrollTo(f,d,l||0,g)},scrollTo:function(f,d,l,g){g=g||j.ease.circular;this.isInTransition=this.options.useTransition&&0<l;!l||this.options.useTransition&&g.style?(this._transitionTimingFunction(g.style),this._transitionTime(l),this._translate(f,d)):this._animate(f,d,l,g.fn)},scrollToElement:function(f,d,n,m,g){if(f=f.nodeType?f:this.scroller.querySelector(f)){var l=j.offset(f);l.left-=this.wrapperOffset.left;l.top-=this.wrapperOffset.top;!0===n&&(n=h.round(f.offsetWidth/2-this.wrapper.offsetWidth/2));!0===m&&(m=h.round(f.offsetHeight/2-this.wrapper.offsetHeight/2));l.left-=n||0;l.top-=m||0;l.left=0<l.left?0:l.left<this.maxScrollX?this.maxScrollX:l.left;l.top=0<l.top?0:l.top<this.maxScrollY?this.maxScrollY:l.top;d=void 0===d||null===d||"auto"===d?h.max(h.abs(this.x-l.left),h.abs(this.y-l.top)):d;this.scrollTo(l.left,l.top,d,g)}},_transitionTime:function(f){f=f||0;this.scrollerStyle[j.style.transitionDuration]=f+"ms";!f&&j.isBadAndroid&&(this.scrollerStyle[j.style.transitionDuration]="0.001s");if(this.indicators){for(var d=this.indicators.length;d--;){this.indicators[d].transitionTime(f)}}},_transitionTimingFunction:function(f){this.scrollerStyle[j.style.transitionTimingFunction]=f;if(this.indicators){for(var d=this.indicators.length;d--;){this.indicators[d].transitionTimingFunction(f)}}},_translate:function(f,d){this.options.useTransform?this.scrollerStyle[j.style.transform]="translate("+f+"px,"+d+"px)"+this.translateZ:(f=h.round(f),d=h.round(d),this.scrollerStyle.left=f+"px",this.scrollerStyle.top=d+"px");this.x=f;this.y=d;if(this.indicators){for(var g=this.indicators.length;g--;){this.indicators[g].updatePosition()}}},_initEvents:function(f){f=f?j.removeEvent:j.addEvent;var d=this.options.bindToWrapper?this.wrapper:e;f(e,"orientationchange",this);f(e,"resize",this);this.options.click&&f(this.wrapper,"click",this,!0);this.options.disableMouse||(f(this.wrapper,"mousedown",this),f(d,"mousemove",this),f(d,"mousecancel",this),f(d,"mouseup",this));j.hasPointer&&!this.options.disablePointer&&(f(this.wrapper,j.prefixPointerEvent("pointerdown"),this),f(d,j.prefixPointerEvent("pointermove"),this),f(d,j.prefixPointerEvent("pointercancel"),this),f(d,j.prefixPointerEvent("pointerup"),this));j.hasTouch&&!this.options.disableTouch&&(f(this.wrapper,"touchstart",this),f(d,"touchmove",this),f(d,"touchcancel",this),f(d,"touchend",this));f(this.scroller,"transitionend",this);f(this.scroller,"webkitTransitionEnd",this);f(this.scroller,"oTransitionEnd",this);f(this.scroller,"MSTransitionEnd",this)},getComputedPosition:function(){var f=e.getComputedStyle(this.scroller,null),d;this.options.useTransform?(f=f[j.style.transform].split(")")[0].split(", "),d=+(f[12]||f[4]),f=+(f[13]||f[5])):(d=+f.left.replace(/[^-\d.]/g,""),f=+f.top.replace(/[^-\d.]/g,""));return{x:d,y:f}},_initIndicators:function(){function l(f){for(var d=m.indicators.length;d--;){f.call(m.indicators[d])}}var g=this.options.interactiveScrollbars,p="string"!=typeof this.options.scrollbars,n=[],o,m=this;this.indicators=[];this.options.scrollbars&&(this.options.scrollY&&(o={el:c("v",g,this.options.scrollbars),interactive:g,defaultScrollbars:!0,customStyle:p,resize:this.options.resizeScrollbars,shrink:this.options.shrinkScrollbars,fade:this.options.fadeScrollbars,listenX:!1},this.wrapper.appendChild(o.el),n.push(o)),this.options.scrollX&&(o={el:c("h",g,this.options.scrollbars),interactive:g,defaultScrollbars:!0,customStyle:p,resize:this.options.resizeScrollbars,shrink:this.options.shrinkScrollbars,fade:this.options.fadeScrollbars,listenY:!1},this.wrapper.appendChild(o.el),n.push(o)));this.options.indicators&&(n=n.concat(this.options.indicators));for(g=n.length;g--;){this.indicators.push(new b(this,n[g]))}this.options.fadeScrollbars&&(this.on("scrollEnd",function(){l(function(){this.fade()})}),this.on("scrollCancel",function(){l(function(){this.fade()})}),this.on("scrollStart",function(){l(function(){this.fade(1)})}),this.on("beforeScrollStart",function(){l(function(){this.fade(1,!0)})}));this.on("refresh",function(){l(function(){this.refresh()})});this.on("destroy",function(){l(function(){this.destroy()});delete this.indicators})},_initWheel:function(){j.addEvent(this.wrapper,"wheel",this);j.addEvent(this.wrapper,"mousewheel",this);j.addEvent(this.wrapper,"DOMMouseScroll",this);this.on("destroy",function(){j.removeEvent(this.wrapper,"wheel",this);j.removeEvent(this.wrapper,"mousewheel",this);j.removeEvent(this.wrapper,"DOMMouseScroll",this)})},_wheel:function(g){if(this.enabled){g.preventDefault();g.stopPropagation();var f,n,l,m=this;void 0===this.wheelTimeout&&m._execEvent("scrollStart");clearTimeout(this.wheelTimeout);this.wheelTimeout=setTimeout(function(){m._execEvent("scrollEnd");m.wheelTimeout=void 0},400);if("deltaX" in g){1===g.deltaMode?(f=-g.deltaX*this.options.mouseWheelSpeed,g=-g.deltaY*this.options.mouseWheelSpeed):(f=-g.deltaX,g=-g.deltaY)}else{if("wheelDeltaX" in g){f=g.wheelDeltaX/120*this.options.mouseWheelSpeed,g=g.wheelDeltaY/120*this.options.mouseWheelSpeed}else{if("wheelDelta" in g){f=g=g.wheelDelta/120*this.options.mouseWheelSpeed}else{if("detail" in g){f=g=-g.detail/3*this.options.mouseWheelSpeed}else{return}}}}f*=this.options.invertWheelDirection;g*=this.options.invertWheelDirection;this.hasVerticalScroll||(f=g,g=0);this.options.snap?(n=this.currentPage.pageX,l=this.currentPage.pageY,0<f?n--:0>f&&n++,0<g?l--:0>g&&l++,this.goToPage(n,l)):(n=this.x+h.round(this.hasHorizontalScroll?f:0),l=this.y+h.round(this.hasVerticalScroll?g:0),0<n?n=0:n<this.maxScrollX&&(n=this.maxScrollX),0<l?l=0:l<this.maxScrollY&&(l=this.maxScrollY),this.scrollTo(n,l,0))}},_initSnap:function(){this.currentPage={};"string"==typeof this.options.snap&&(this.options.snap=this.scroller.querySelectorAll(this.options.snap));this.on("refresh",function(){var u=0,t,s=0,q,r,o,p=0,n;q=this.options.snapStepX||this.wrapperWidth;var f=this.options.snapStepY||this.wrapperHeight;this.pages=[];if(this.wrapperWidth&&this.wrapperHeight&&this.scrollerWidth&&this.scrollerHeight){if(!0===this.options.snap){for(r=h.round(q/2),o=h.round(f/2);p>-this.scrollerWidth;){this.pages[u]=[];for(n=t=0;n>-this.scrollerHeight;){this.pages[u][t]={x:h.max(p,this.maxScrollX),y:h.max(n,this.maxScrollY),width:q,height:f,cx:p-r,cy:n-o},n-=f,t++}p-=q;u++}}else{for(f=this.options.snap,t=f.length,q=-1;u<t;u++){if(0===u||f[u].offsetLeft<=f[u-1].offsetLeft){s=0,q++}this.pages[s]||(this.pages[s]=[]);p=h.max(-f[u].offsetLeft,this.maxScrollX);n=h.max(-f[u].offsetTop,this.maxScrollY);r=p-h.round(f[u].offsetWidth/2);o=n-h.round(f[u].offsetHeight/2);this.pages[s][q]={x:p,y:n,width:f[u].offsetWidth,height:f[u].offsetHeight,cx:r,cy:o};p>this.maxScrollX&&s++}}this.goToPage(this.currentPage.pageX||0,this.currentPage.pageY||0,0);0===this.options.snapThreshold%1?this.snapThresholdY=this.snapThresholdX=this.options.snapThreshold:(this.snapThresholdX=h.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width*this.options.snapThreshold),this.snapThresholdY=h.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height*this.options.snapThreshold))}});this.on("flick",function(){var d=this.options.snapSpeed||h.max(h.max(h.min(h.abs(this.x-this.startX),1000),h.min(h.abs(this.y-this.startY),1000)),300);this.goToPage(this.currentPage.pageX+this.directionX,this.currentPage.pageY+this.directionY,d)})},_nearestSnap:function(g,f){if(!this.pages.length){return{x:0,y:0,pageX:0,pageY:0}}var n=0,l=this.pages.length,m=0;if(h.abs(g-this.absStartX)<this.snapThresholdX&&h.abs(f-this.absStartY)<this.snapThresholdY){return this.currentPage}0<g?g=0:g<this.maxScrollX&&(g=this.maxScrollX);0<f?f=0:f<this.maxScrollY&&(f=this.maxScrollY);for(;n<l;n++){if(g>=this.pages[n][0].cx){g=this.pages[n][0].x;break}}for(l=this.pages[n].length;m<l;m++){if(f>=this.pages[0][m].cy){f=this.pages[0][m].y;break}}n==this.currentPage.pageX&&(n+=this.directionX,0>n?n=0:n>=this.pages.length&&(n=this.pages.length-1),g=this.pages[n][0].x);m==this.currentPage.pageY&&(m+=this.directionY,0>m?m=0:m>=this.pages[0].length&&(m=this.pages[0].length-1),f=this.pages[0][m].y);return{x:g,y:f,pageX:n,pageY:m}},goToPage:function(l,f,p,o){o=o||this.options.bounceEasing;l>=this.pages.length?l=this.pages.length-1:0>l&&(l=0);f>=this.pages[l].length?f=this.pages[l].length-1:0>f&&(f=0);var n=this.pages[l][f].x,m=this.pages[l][f].y;p=void 0===p?this.options.snapSpeed||h.max(h.max(h.min(h.abs(n-this.x),1000),h.min(h.abs(m-this.y),1000)),300):p;this.currentPage={x:n,y:m,pageX:l,pageY:f};this.scrollTo(n,m,p,o)},next:function(g,f){var m=this.currentPage.pageX,l=this.currentPage.pageY;m++;m>=this.pages.length&&this.hasVerticalScroll&&(m=0,l++);this.goToPage(m,l,g,f)},prev:function(g,f){var m=this.currentPage.pageX,l=this.currentPage.pageY;m--;0>m&&this.hasVerticalScroll&&(m=0,l--);this.goToPage(m,l,g,f)},_initKeys:function(f){f={pageUp:33,pageDown:34,end:35,home:36,left:37,up:38,right:39,down:40};var d;if("object"==typeof this.options.keyBindings){for(d in this.options.keyBindings){"string"==typeof this.options.keyBindings[d]&&(this.options.keyBindings[d]=this.options.keyBindings[d].toUpperCase().charCodeAt(0))}}else{this.options.keyBindings={}}for(d in f){this.options.keyBindings[d]=this.options.keyBindings[d]||f[d]}j.addEvent(e,"keydown",this);this.on("destroy",function(){j.removeEvent(e,"keydown",this)})},_key:function(f){if(this.enabled){var d=this.options.snap,q=d?this.currentPage.pageX:this.x,o=d?this.currentPage.pageY:this.y,m=j.getTime(),l=this.keyTime||0,p;this.options.useTransition&&this.isInTransition&&(p=this.getComputedPosition(),this._translate(h.round(p.x),h.round(p.y)),this.isInTransition=!1);this.keyAcceleration=200>m-l?h.min(this.keyAcceleration+0.25,50):0;switch(f.keyCode){case this.options.keyBindings.pageUp:this.hasHorizontalScroll&&!this.hasVerticalScroll?q+=d?1:this.wrapperWidth:o+=d?1:this.wrapperHeight;break;case this.options.keyBindings.pageDown:this.hasHorizontalScroll&&!this.hasVerticalScroll?q-=d?1:this.wrapperWidth:o-=d?1:this.wrapperHeight;break;case this.options.keyBindings.end:q=d?this.pages.length-1:this.maxScrollX;o=d?this.pages[0].length-1:this.maxScrollY;break;case this.options.keyBindings.home:o=q=0;break;case this.options.keyBindings.left:q+=d?-1:5+this.keyAcceleration>>0;break;case this.options.keyBindings.up:o+=d?1:5+this.keyAcceleration>>0;break;case this.options.keyBindings.right:q-=d?-1:5+this.keyAcceleration>>0;break;case this.options.keyBindings.down:o-=d?1:5+this.keyAcceleration>>0;break;default:return}d?this.goToPage(q,o):(0<q?this.keyAcceleration=q=0:q<this.maxScrollX&&(q=this.maxScrollX,this.keyAcceleration=0),0<o?this.keyAcceleration=o=0:o<this.maxScrollY&&(o=this.maxScrollY,this.keyAcceleration=0),this.scrollTo(q,o,0),this.keyTime=m)}},_animate:function(x,w,v,u){function t(){var g=j.getTime(),f;g>=d?(s.isAnimating=!1,s._translate(x,w),s.resetPosition(s.options.bounceTime)||s._execEvent("scrollEnd")):(g=(g-q)/v,f=u(g),g=(x-o)*f+o,f=(w-r)*f+r,s._translate(g,f),s.isAnimating&&a(t))}var s=this,o=this.x,r=this.y,q=j.getTime(),d=q+v;this.isAnimating=!0;t()},handleEvent:function(d){switch(d.type){case"touchstart":case"pointerdown":case"MSPointerDown":case"mousedown":this._start(d);break;case"touchmove":case"pointermove":case"MSPointerMove":case"mousemove":this._move(d);break;case"touchend":case"pointerup":case"MSPointerUp":case"mouseup":case"touchcancel":case"pointercancel":case"MSPointerCancel":case"mousecancel":this._end(d);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(d);break;case"wheel":case"DOMMouseScroll":case"mousewheel":this._wheel(d);break;case"keydown":this._key(d);break;case"click":d._constructed||(d.preventDefault(),d.stopPropagation())}}};b.prototype={handleEvent:function(d){switch(d.type){case"touchstart":case"pointerdown":case"MSPointerDown":case"mousedown":this._start(d);break;case"touchmove":case"pointermove":case"MSPointerMove":case"mousemove":this._move(d);break;case"touchend":case"pointerup":case"MSPointerUp":case"mouseup":case"touchcancel":case"pointercancel":case"MSPointerCancel":case"mousecancel":this._end(d)}},destroy:function(){this.options.interactive&&(j.removeEvent(this.indicator,"touchstart",this),j.removeEvent(this.indicator,j.prefixPointerEvent("pointerdown"),this),j.removeEvent(this.indicator,"mousedown",this),j.removeEvent(e,"touchmove",this),j.removeEvent(e,j.prefixPointerEvent("pointermove"),this),j.removeEvent(e,"mousemove",this),j.removeEvent(e,"touchend",this),j.removeEvent(e,j.prefixPointerEvent("pointerup"),this),j.removeEvent(e,"mouseup",this));this.options.defaultScrollbars&&this.wrapper.parentNode.removeChild(this.wrapper)},_start:function(f){var d=f.touches?f.touches[0]:f;f.preventDefault();f.stopPropagation();this.transitionTime();this.initiated=!0;this.moved=!1;this.lastPointX=d.pageX;this.lastPointY=d.pageY;this.startTime=j.getTime();this.options.disableTouch||j.addEvent(e,"touchmove",this);this.options.disablePointer||j.addEvent(e,j.prefixPointerEvent("pointermove"),this);this.options.disableMouse||j.addEvent(e,"mousemove",this);this.scroller._execEvent("beforeScrollStart")},_move:function(f){var d=f.touches?f.touches[0]:f,l,g;j.getTime();this.moved||this.scroller._execEvent("scrollStart");this.moved=!0;l=d.pageX-this.lastPointX;this.lastPointX=d.pageX;g=d.pageY-this.lastPointY;this.lastPointY=d.pageY;this._pos(this.x+l,this.y+g);f.preventDefault();f.stopPropagation()},_end:function(f){if(this.initiated){this.initiated=!1;f.preventDefault();f.stopPropagation();j.removeEvent(e,"touchmove",this);j.removeEvent(e,j.prefixPointerEvent("pointermove"),this);j.removeEvent(e,"mousemove",this);if(this.scroller.options.snap){f=this.scroller._nearestSnap(this.scroller.x,this.scroller.y);var d=this.options.snapSpeed||h.max(h.max(h.min(h.abs(this.scroller.x-f.x),1000),h.min(h.abs(this.scroller.y-f.y),1000)),300);if(this.scroller.x!=f.x||this.scroller.y!=f.y){this.scroller.directionX=0,this.scroller.directionY=0,this.scroller.currentPage=f,this.scroller.scrollTo(f.x,f.y,d,this.scroller.options.bounceEasing)}}this.moved&&this.scroller._execEvent("scrollEnd")}},transitionTime:function(d){d=d||0;this.indicatorStyle[j.style.transitionDuration]=d+"ms";!d&&j.isBadAndroid&&(this.indicatorStyle[j.style.transitionDuration]="0.001s")},transitionTimingFunction:function(d){this.indicatorStyle[j.style.transitionTimingFunction]=d},refresh:function(){this.transitionTime();this.indicatorStyle.display=this.options.listenX&&!this.options.listenY?this.scroller.hasHorizontalScroll?"block":"none":this.options.listenY&&!this.options.listenX?this.scroller.hasVerticalScroll?"block":"none":this.scroller.hasHorizontalScroll||this.scroller.hasVerticalScroll?"block":"none";this.scroller.hasHorizontalScroll&&this.scroller.hasVerticalScroll?(j.addClass(this.wrapper,"iScrollBothScrollbars"),j.removeClass(this.wrapper,"iScrollLoneScrollbar"),this.options.defaultScrollbars&&this.options.customStyle&&(this.options.listenX?this.wrapper.style.right="8px":this.wrapper.style.bottom="8px")):(j.removeClass(this.wrapper,"iScrollBothScrollbars"),j.addClass(this.wrapper,"iScrollLoneScrollbar"),this.options.defaultScrollbars&&this.options.customStyle&&(this.options.listenX?this.wrapper.style.right="2px":this.wrapper.style.bottom="2px"));this.options.listenX&&(this.wrapperWidth=this.wrapper.clientWidth,this.options.resize?(this.indicatorWidth=h.max(h.round(this.wrapperWidth*this.wrapperWidth/(this.scroller.scrollerWidth||this.wrapperWidth||1)),8),this.indicatorStyle.width=this.indicatorWidth+"px"):this.indicatorWidth=this.indicator.clientWidth,this.maxPosX=this.wrapperWidth-this.indicatorWidth,"clip"==this.options.shrink?(this.minBoundaryX=-this.indicatorWidth+8,this.maxBoundaryX=this.wrapperWidth-8):(this.minBoundaryX=0,this.maxBoundaryX=this.maxPosX),this.sizeRatioX=this.options.speedRatioX||this.scroller.maxScrollX&&this.maxPosX/this.scroller.maxScrollX);this.options.listenY&&(this.wrapperHeight=this.wrapper.clientHeight,this.options.resize?(this.indicatorHeight=h.max(h.round(this.wrapperHeight*this.wrapperHeight/(this.scroller.scrollerHeight||this.wrapperHeight||1)),8),this.indicatorStyle.height=this.indicatorHeight+"px"):this.indicatorHeight=this.indicator.clientHeight,this.maxPosY=this.wrapperHeight-this.indicatorHeight,"clip"==this.options.shrink?(this.minBoundaryY=-this.indicatorHeight+8,this.maxBoundaryY=this.wrapperHeight-8):(this.minBoundaryY=0,this.maxBoundaryY=this.maxPosY),this.maxPosY=this.wrapperHeight-this.indicatorHeight,this.sizeRatioY=this.options.speedRatioY||this.scroller.maxScrollY&&this.maxPosY/this.scroller.maxScrollY);this.updatePosition()},updatePosition:function(){var f=this.options.listenX&&h.round(this.sizeRatioX*this.scroller.x)||0,d=this.options.listenY&&h.round(this.sizeRatioY*this.scroller.y)||0;this.options.ignoreBoundaries||(f<this.minBoundaryX?("scale"==this.options.shrink&&(this.width=h.max(this.indicatorWidth+f,8),this.indicatorStyle.width=this.width+"px"),f=this.minBoundaryX):f>this.maxBoundaryX?"scale"==this.options.shrink?(this.width=h.max(this.indicatorWidth-(f-this.maxPosX),8),this.indicatorStyle.width=this.width+"px",f=this.maxPosX+this.indicatorWidth-this.width):f=this.maxBoundaryX:"scale"==this.options.shrink&&this.width!=this.indicatorWidth&&(this.width=this.indicatorWidth,this.indicatorStyle.width=this.width+"px"),d<this.minBoundaryY?("scale"==this.options.shrink&&(this.height=h.max(this.indicatorHeight+3*d,8),this.indicatorStyle.height=this.height+"px"),d=this.minBoundaryY):d>this.maxBoundaryY?"scale"==this.options.shrink?(this.height=h.max(this.indicatorHeight-3*(d-this.maxPosY),8),this.indicatorStyle.height=this.height+"px",d=this.maxPosY+this.indicatorHeight-this.height):d=this.maxBoundaryY:"scale"==this.options.shrink&&this.height!=this.indicatorHeight&&(this.height=this.indicatorHeight,this.indicatorStyle.height=this.height+"px"));this.x=f;this.y=d;this.scroller.options.useTransform?this.indicatorStyle[j.style.transform]="translate("+f+"px,"+d+"px)"+this.scroller.translateZ:(this.indicatorStyle.left=f+"px",this.indicatorStyle.top=d+"px")},_pos:function(f,d){0>f?f=0:f>this.maxPosX&&(f=this.maxPosX);0>d?d=0:d>this.maxPosY&&(d=this.maxPosY);f=this.options.listenX?h.round(f/this.sizeRatioX):this.scroller.x;d=this.options.listenY?h.round(d/this.sizeRatioY):this.scroller.y;this.scroller.scrollTo(f,d)},fade:function(f,d){if(!d||this.visible){clearTimeout(this.fadeTimeout);this.fadeTimeout=null;var l=f?250:500,g=f?0:300;this.wrapperStyle[j.style.transitionDuration]=l+"ms";this.fadeTimeout=setTimeout(function(m){this.wrapperStyle.opacity=m;this.visible=+m}.bind(this,f?"1":"0"),g)}}};i.utils=j;"undefined"!=typeof module&&module.exports?module.exports=i:e.IScroll=i})(window,document,Math);(function(){if(!Array.prototype.indexOf){Array.prototype.indexOf=function(b){var c=-1;for(var a=0;a<this.length;a++){if(this[a]===b){c=a}}return c}}})();(function($){var ua=navigator.userAgent,div=document.createElement("div"),ie=ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),prefix=["Webkit","Moz","O"],transition="transition",transform="transform",requestanimationframe="requestAnimationFrame",cancelanimationframe="CancelAnimationFrame",transforms={translate3d:"translate3d(0px, 0px, 0px)",translate:"translate(0px, 0px)",scale3d:"scale3d(1, 1, 1)",scale:"scale(1, 1)"},browser=$.browser,support=$.support,version,i;if(!browser){$.browser=browser={}}browser.local=!(/^http:\/\//).test(location.href);browser.firefox=(/firefox/i).test(ua);browser.webkit=(/applewebkit/i).test(ua);browser.chrome=(/chrome/i).test(ua);browser.opera=(/opera/i).test(ua);browser.ios=(/ip(ad|hone|od)/i).test(ua);browser.android=(/android/i).test(ua);browser.safari=browser.webkit&&!browser.chrome;support.touch=browser.ios||browser.android||(document.ontouchstart!==undefined&&document.ontouchstart!==null);browser.mobile=support.touch&&(browser.ios||browser.android);for(i in browser){if(!browser[i]){delete browser[i]}}browser.os=(navigator.appVersion).match(/(mac|win|linux)/i);browser.os=(browser.os)?browser.os[1].toLowerCase():"";if(browser.ios||browser.android){version=ua.match(/applewebkit\/([0-9.]+)/i);if(version&&version.length>1){browser.webkitversion=version[1]}if(browser.ios){version=ua.match(/version\/([0-9.]+)/i);if(version&&version.length>1){browser.ios=version[1]}}else{if(browser.android){version=ua.match(/android ([0-9.]+)/i);if(version&&version.length>1){browser.android=parseInt(version[1].replace(/\./g,""))}}}}support.svgimage=true;support.pointerevents=true;if(ie){browser.ie=ie=parseInt(ie[1]||ie[2]);if(9>ie){browser.oldie=true}else{if(9==ie){prefix.push("ms")}}if(11>ie){support.pointerevents=false}if(9>ie){support.svgimage=false}}support.pushstate=!!history.pushState;support.mediaquery=typeof(window.matchMedia)=="function"||!browser.oldie;support.video=document.createElement("video").canPlayType!==undefined;support.backgroundsize="backgroundSize" in div.style;if(support.backgroundsize){div.style.backgroundSize="cover";support.backgroundsize=div.style.backgroundSize=="cover"}try{div.style.background="rgba(0, 0, 0, 0)";support.rgba=div.style.background=="rgba(0, 0, 0, 0)"}catch(e){support.rgba=false}support.canvas=document.createElement("canvas");support.canvas=support.canvas.getContext&&support.canvas.getContext("2d");if(div.style[transform]!=undefined){support.transform=transform}else{transform="Transform";for(i=0;i<4;i++){if(div.style[prefix[i]+transform]!==undefined){support.transform=prefix[i]+transform;break}}}if(support.transform){transform=support.transform;for(i in transforms){div.style[transform]="";div.style[transform]=transforms[i];support[i]=div.style[transform]}if(browser.ie&&10>browser.ie){}if(browser.android&&430>browser.android){}}if(div.style[transition]!=undefined){support.transition=transition}else{transition="Transition";for(i=0;i<4;i++){if(div.style[prefix[i]+transition]!==undefined){support.transition=prefix[i]+transition;break}}}if(window[requestanimationframe]){support.requestanimationframe=true}else{requestanimationframe="RequestAnimationFrame";for(i=0;i<4;i++){if(window[prefix[i]+requestanimationframe]!==undefined){window.requestAnimationFrame=window[prefix[i]+requestanimationframe];window.cancelAnimationFrame=window[prefix[i]+cancelanimationframe];support.requestanimationframe=true;break}}}if(!support.requestanimationframe){window.requestAnimationFrame=(function(){var lasttime=0;return function(callback){var currenttime=gettime();var timetocall=Math.max(0,16-(currenttime-lasttime));lasttime=currenttime+timetocall;return setTimeout(function(){callback(currenttime+timetocall)},timetocall)}})();window.cancelAnimationFrame=function(id){clearTimeout(id)}}$._cookie={set:function(name,value,term,path,domain){var cookieset=name+"="+value+";",expdate;if(term){expdate=new Date();expdate.setTime(expdate.getTime()+term*1000*60*60*24);cookieset+="expires="+expdate.toGMTString()+";"}if(path){cookieset+="path="+path+";"}if(domain){cookieset+="domain="+domain+";"}document.cookie=cookieset},get:function(name){var match=(document.cookie||" ").match(new RegExp(name+" *= *([^;]+)"));return(match)?match[1]:null}};$._query={parse:(function(){var matches,i,max;function resetdata(v){if(v){v=decodeURIComponent(v).replace(/\+/g," ");if(v.indexOf(",")!=-1){v=v.split(",");for(i=0,max=v.length;i<max;i++){v[i]=resetdata(v[i])}}else{if(expint.test(v)){v=parseFloat(v)}}}return v}return function(query){var rv={};query=((/^#/).test(query))?query.substring(query.lastIndexOf("#")+1):(!query||(/\?/).test(query))?(query||location.href).split("?")[1]:query;if(query){query=query.split("#")[0];while(matches=expqueries.exec(query)){rv[matches[1]]=resetdata(matches[2])}return rv}else{return false}}})(),make:function(data){var key,newdata,datatype=typeof(data);if(datatype=="string"){return data}else{if(datatype=="object"){newdata=[];for(key in data){newdata.push(key+"="+encodeURIComponent(data[key]))}return newdata.join("&")}}}};var easings={linear:function(t,b,c,d){return c*t/d+b},easeInQuad:function(t,b,c,d){return c*(t/=d)*t+b},easeOutQuad:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOutQuad:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b},easeOutInQuad:function(t,b,c,d){if(t<d/2){return easings.easeOutQuad(t*2,b,c/2,d)}return easings.easeInQuad((t*2)-d,b+c/2,c/2,d)},easeInCubic:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOutCubic:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOutCubic:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b},easeOutInCubic:function(t,b,c,d){if(t<d/2){return easings.easeOutCubic(t*2,b,c/2,d)}return easings.easeInCubic((t*2)-d,b+c/2,c/2,d)},easeInQuart:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutQuart:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOutQuart:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b},easeOutInQuart:function(t,b,c,d){if(t<d/2){return easings.easeOutQuart(t*2,b,c/2,d)}return easings.easeInQuart((t*2)-d,b+c/2,c/2,d)},easeInQuint:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOutQuint:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOutQuint:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b},easeOutInQuint:function(t,b,c,d){if(t<d/2){return easings.easeOutQuint(t*2,b,c/2,d)}return easings.easeInQuint((t*2)-d,b+c/2,c/2,d)},easeInSine:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOutSine:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOutSine:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b},easeOutInSine:function(t,b,c,d){if(t<d/2){return easings.easeOutSine(t*2,b,c/2,d)}return easings.easeInSine((t*2)-d,b+c/2,c/2,d)},easeInExpo:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b-c*0.001},easeOutExpo:function(t,b,c,d){return(t==d)?b+c:c*1.001*(-Math.pow(2,-10*t/d)+1)+b},easeInOutExpo:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b-c*0.0005}return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b},easeOutInExpo:function(t,b,c,d){if(t<d/2){return easings.easeOutExpo(t*2,b,c/2,d)}return easings.easeInExpo((t*2)-d,b+c/2,c/2,d)},easeInCirc:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOutCirc:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOutCirc:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b},easeOutInCirc:function(t,b,c,d){if(t<d/2){return easings.easeOutCirc(t*2,b,c/2,d)}return easings.easeInCirc((t*2)-d,b+c/2,c/2,d)},easeInElastic:function(t,b,c,d,a,p){if(!t){return b}if((t/=d)==1){return b+c}var s,p=(!p||typeof(p)!="number")?d*0.3:p,a=(!a||typeof(a)!="number")?0:a;if(!a||a<Math.abs(c)){a=c;s=p/4}else{s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOutElastic:function(t,b,c,d,a,p){if(!t){return b}if((t/=d)==1){return b+c}var s,p=(!p||typeof(p)!="number")?d*0.3:p,a=(!a||typeof(a)!="number")?0:a;if(!a||a<Math.abs(c)){a=c;s=p/4}else{s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOutElastic:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}var s,p=d*(0.3*1.5),a=0;var s,p=(!p||typeof(p)!="number")?d*(0.3*1.5):p,a=(!a||typeof(a)!="number")?0:a;if(!a||a<Math.abs(c)){a=c;s=p/4}else{s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b},easeOutInElastic:function(t,b,c,d,a,p){if(t<d/2){return easings.easeOutElastic(t*2,b,c/2,d,a,p)}return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p)},easeInBack:function(t,b,c,d,s){var s=(!s||typeof(s)!="number")?1.70158:s;return c*(t/=d)*t*((s+1)*t-s)+b},easeOutBack:function(t,b,c,d,s){var s=(!s||typeof(s)!="number")?1.70158:s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOutBack:function(t,b,c,d,s){var s=(!s||typeof(s)!="number")?1.70158:s;if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},easeOutInBack:function(t,b,c,d,s){if(t<d/2){return easings.easeOutBack(t*2,b,c/2,d,s)}return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s)},easeInBounce:function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b},easeOutBounce:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOutBounce:function(t,b,c,d){if(t<d/2){return easings.easeInBounce(t*2,0,c,d)*0.5+b}else{return easings.easeOutBounce(t*2-d,0,c,d)*0.5+c*0.5+b}},easeOutInBounce:function(t,b,c,d){if(t<d/2){return easings.easeOutBounce(t*2,b,c/2,d)}return easings.easeInBounce((t*2)-d,b+c/2,c/2,d)}},easing,cubicbeziers={linear:"0.250, 0.250, 0.750, 0.750",ease:"0.250, 0.100, 0.250, 1.000","ease-in":"0.420, 0.000, 1.000, 1.000","ease-out":"0.000, 0.000, 0.580, 1.000","ease-in-out":"0.420, 0.000, 0.580, 1.000",easeInQuad:"0.550, 0.085, 0.680, 0.530",easeInCubic:"0.550, 0.055, 0.675, 0.190",easeInQuart:"0.895, 0.030, 0.685, 0.220",easeInQuint:"0.755, 0.050, 0.855, 0.060",easeInSine:"0.470, 0.000, 0.745, 0.715",easeInExpo:"0.950, 0.050, 0.795, 0.035",easeInCirc:"0.600, 0.040, 0.980, 0.335",easeInBack:"0.600, -0.280, 0.735, 0.045",easeOutQuad:"0.250, 0.460, 0.450, 0.940",easeOutCubic:"0.215, 0.610, 0.355, 1.000",easeOutQuart:"0.165, 0.840, 0.440, 1.000",easeOutQuint:"0.230, 1.000, 0.320, 1.000",easeOutSine:"0.390, 0.575, 0.565, 1.000",easeOutExpo:"0.190, 1.000, 0.220, 1.000",easeOutCirc:"0.075, 0.820, 0.165, 1.000",easeOutBack:"0.175, 0.885, 0.320, 1.275",easeInOutQuad:"0.455, 0.030, 0.515, 0.955",easeInOutCubic:"0.645, 0.045, 0.355, 1.000",easeInOutQuart:"0.770, 0.000, 0.175, 1.000",easeInOutQuint:"0.860, 0.000, 0.070, 1.000",easeInOutSine:"0.445, 0.050, 0.550, 0.950",easeInOutExpo:"1.000, 0.000, 0.000, 1.000",easeInOutCirc:"0.785, 0.135, 0.150, 0.860",easeInOutBack:"0.680, -0.550, 0.265, 1.550"};for(easing in easings){$.easing[easing]=(function(easingname){return function(x,t,b,c,d){return easings[easingname](t,b,c,d)}})(easing)}var poorbrowser=browser.ie&&9>browser.ie,expint=/^-?[0-9\.]+$/,exprgb=/rgba?\(/,expisbody=/body/i,expiscolor=/color/i,expgetrgb=/rgba?\(([0-9]+), *([0-9]+), *([0-9]+)/,expqueries=/([^=&]+)=?([^=&]*)/g,transitionname=support.transition,transitionable=!!transitionname,transitionendnames="transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd msTransitionEnd",gettime=function(){return new Date().getTime()},isobject=$.isPlainObject,color={getcode:function(target,property){return this.tohex.apply(null,this.torgb(target,property,style.get(target,property)))},torgb:function(target,property,v){var temp;if(v=="transparent"||v=="rgba(0, 0, 0, 0)"){while(!expisbody.test(target.nodeName)){target=target.parentNode;temp=style.get(target,property);if(temp!="transparent"&&temp!="rgba(0, 0, 0, 0)"){return this.torgb(target,property,temp)}}return[255,255,255]}else{if(v.match(exprgb)){v=v.match(expgetrgb);return[parseInt(v[1]),parseInt(v[2]),parseInt(v[3])]}else{if(v.length>5){v=[v.substr(1,2),v.substr(3,2),v.substr(5,2)]}else{v=[v.substr(1,1),v.substr(2,1),v.substr(3,1)];v=[v[0]+v[0],v[1]+v[1],v[2]+v[2]]}return[parseInt((eval("0x"+v[0])).toString(10)),parseInt((eval("0x"+v[1])).toString(10)),parseInt((eval("0x"+v[2])).toString(10))]}}},tohex:function(){var temp,i=0,rv="";for(;i<3;i++){temp=Math.max(Math.min(255,arguments[i]),0).toString(16);rv+=(2>temp.length)?"0"+temp:temp}return"#"+rv}},style=(function(){var supporttransform=support.transform,transforms=["translate3d","translate","scale3d","scale","skew","skewX","skewY","rotate","rotateX","rotateY","rotateZ"],nex="[e0-9-.]+",pxex="(?:px)?",vex="(?:(?:px|deg))?",xyzex=/(X|Y|Z)$/,expressions={isxyztarget:/^(scale|scale3d|translate|translate3d)$/,nopx:/(zIndex)/},is3dtransform=/3d/,istranslate=/^translate/,isscale=/^scale/,isrotate=/^rotate/,isx=/X$/,isy=/Y$/,isstupidbrowser=browser.ie==9,i=0,max=transforms.length;for(;i<max;i++){expressions[transforms[i]]=[new RegExp(transforms[i]+"\\(("+nex+")"+vex+"(?:, ("+nex+")"+vex+"(?:, ("+nex+")"+vex+")?)?"),new RegExp("("+transforms[i]+"\\()"+nex+vex)];if(!isrotate.test(transforms[i])){expressions[transforms[i]][2]=new RegExp("("+transforms[i]+"\\("+nex+vex+", )"+nex+vex),expressions[transforms[i]][3]=new RegExp("("+transforms[i]+"\\("+nex+vex+", "+nex+vex+", )"+nex+vex)}}function istransform(property){property=css3(property);if((/^(matrix|translate|scale|rotate|skew|perspective)/).test(property)){return true}return false}function isxyztarget(property){var check=property.match(expressions.isxyztarget);return(check)?check[1]:false}function issvg(target){return window.SVGElement&&target instanceof SVGElement}function css3(property){if(istranslate.test(property)){if(!support.translate){return(/X$/).test(property)?"left":"top"}else{if(is3dtransform.test(property)&&!support.translate3d){return property.replace("3d","")}}}else{if(isscale.test(property)){if(is3dtransform.test(property)&&!support.scale3d){return property.replace("3d","")}}}return property}function ie9scale(target,property,value){var temp=target.style[supporttransform].match(expressions.scale[0]),x,y;if(!temp){return 1}else{x=parseFloat(temp[1]);y=(temp[2]!==undefined)?parseFloat(temp[2]):x;if(value!==undefined){if(isx.test(property)){x=value}else{y=value}target.style[supporttransform]=target.style[supporttransform].replace(expressions.scale[0],"scale("+x+", "+y)}else{return(isx.test(property))?x:y}}}function get(target,property){var rv,transform,xyz;property=css3(property);if(istransform(property)){xyz=isxyztarget(property);if(xyz){return get(target,xyz+"X")}transform=property;property=supporttransform}if(property=="opacity"&&!support.opacity){property="filter"}else{if(property=="scrollTop"){return target.scrollTop}}rv=(target)?(issvg(target)&&target.attributes[property])?parseInt(target.attributes[property].value):(!target.style)?target[property]:(target.style[property])?target.style[property]:(target.currentStyle)?target.currentStyle[property]:document.defaultView.getComputedStyle(target,null)[property]:0;if(transform&&supporttransform){xyz=transform.match(xyzex);xyz=(xyz)?xyz[0]:"";if(isrotate.test(transform)){rv=rv.match(expressions[transform][0]);return(!rv)?0:parseFloat(rv[1])}else{if(isstupidbrowser&&isscale.test(transform)){return ie9scale(target,transform)}else{if(rv){rv=rv.match(expressions[transform.replace(xyzex,"")][0]);return(!rv)?(isscale.test(transform))?1:0:parseFloat(rv[(xyz=="X")?1:(xyz=="Y")?2:3])}}}}if(property=="opacity"){return parseFloat(rv)}if(property=="filter"){rv=rv.match(/alpha *\( *opacity *[=:] *([0-9\.]+) *\)/i);rv=(rv)?parseFloat(rv[1]):1;return(rv||rv===0)?rv/100:1}return(rv=="auto")?0:((/(pt|px)$/).test(rv))?parseInt(rv):rv}function set(target,property,value){var i,exist,transform,xyz;if(typeof(property)=="object"){for(i in property){style.set(target,i,property[i])}return}if(value!==undefined){if(issvg(target)&&target.attributes[property]){target.attributes[property].value=value}else{if(!target.style){target[property]=value}else{property=css3(property);if(istransform(property)&&supporttransform){xyz=isxyztarget(property);if(xyz){set(target,xyz+"X",value);set(target,xyz+"Y",value);set(target,xyz+"Z",value);return}exist=target.style[supporttransform]||style.get(target,supporttransform);if(exist.indexOf("(")==-1){exist=""}if(isrotate.test(property)){if(!expressions[property][0].test(exist)){exist+=property+"(0)"}target.style[supporttransform]=exist.replace(expressions[property][1],"$1"+value+"deg")}else{transform=property.replace(xyzex,"");if(!expressions[transform][0].test(exist)){exist+=support[transform]}if(isstupidbrowser&&isscale.test(property)){ie9scale(target,property,value)}else{target.style[supporttransform]=exist.replace(expressions[transform][isx.test(property)?1:isy.test(property)?2:3],"$1"+value+(isscale.test(transform)?"":"px"))}}}else{if(property=="opacity"){if(!support.opacity){target.style.filter=(value==="")?"":"alpha(opacity="+(value*100)+")"}else{target.style.opacity=value}}else{if(property=="scrollTop"){target.scrollTop=value}else{try{target.style[property]=(value&&!isNaN(value)&&!expressions.nopx.test(property))?value+"px":value}catch(e){window.console&&console.log(e.message+"("+target+' : id="'+target.id+'", class="'+target.className+'", property="'+property+'", value : "'+value+'")')}}}}}}}}return{get:get,set:set,istransform:istransform}})(),ani=(function(){var tweens=[],_fps=60,_time=1,_easing="easeOutCubic",nowframe=0,totalframes=0,starttime=0,playing=false,getstyle=style.get,setstyle=style.set,torgb=color.torgb,tocolorcode=color.tohex,istransform=style.istransform,issplitxyztarget=style.issplitxyztarget,timer=null,timerdelay=1000/_fps,isemptytween,i,max;function set(target,property,_option){if(!target){return}if(target.constructor==Array){for(i=0,max=target.length;i<max;i++){set(target[i],property,_option)}return}var tween,option=_option||{},time=option.time||_time,frames=Math.round(_fps*time),delay=Math.round(_fps*(option.delay||0)),easing=option.easing||_easing,p,rounding,fromcolor,tocolor,rgb,i,temp,values={};for(p in property){rounding=(option.rounding===false||p=="opacity")?false:!istransform(p);if(property[p].constructor==Array){values[p]=property[p];frames=Math.max(frames,Math.round(_fps*values[p].length/_fps))}else{if(expiscolor.test(p)){fromcolor=torgb(target,p,getstyle(target,p));tocolor=torgb(target,p,property[p]);rgb=[];for(i=0;i<3;i++){rgb[i]=getvalues(p,fromcolor[i],tocolor[i],frames,easing,true)}values[p]=[];for(i=0;i<frames;i++){values[p][i]=tocolorcode(rgb[0][i],rgb[1][i],rgb[2][i])}}else{values[p]=getvalues(p,getstyle(target,p),property[p],frames,easing,rounding)}}}stop(target,property);tweens.push({el:target,vs:values,sf:option.bystep?-1-delay:nowframe+delay,tf:frames,bs:option.bystep,es:option.onstart,eu:option.onupdate,ee:option.onend,lp:option.loop});totalframes=Math.max(totalframes,nowframe+delay+frames+_fps);if(!playing){starttime=gettime();timer=window.requestAnimationFrame(action);playing=true}}function stop(target,property,_jumptoend){var i=0,max=tweens.length,tween,p,properties;if(property){if(typeof(property)!="string"){properties=[];for(p in property){properties.push(p)}properties=properties.join(" ")+" "}else{properties=property+" "}}isemptytween=true;for(;i<max;i++){tween=tweens[i];if(tween&&tween.el==target){if(property){for(p in tween.vs){if(properties.indexOf(p+" ")!=-1){if(_jumptoend){setstyle(tween.el,p,tween.vs[p][tween.tf-1])}delete tween.vs[p]}else{isemptytween=false}}}if(isemptytween){if(_jumptoend){jumptoend(tweens[i])}tweens[i]=null}}}}function jumptoend(tween){var p,lastframe=tween.tf-1;for(p in tween.vs){setstyle(tween.el,p,tween.vs[p][lastframe])}tween.eu&&tween.eu.call(tween.el,geteventvalue(tween,"update",lastframe,lastframe));tween.ee&&tween.ee.call(tween.el,geteventvalue(tween,"end",lastframe,lastframe))}function sprite(target,framewidth,totalframe,property,time,loop){var currentframe,temp={};totalframe--;function onupdate(e){var frame=Math.round(totalframe*e.v);if(currentframe!=frame){style.set(target,property,-framewidth*frame);currentframe=frame}}function play(){_stop();set(temp,{v:1},{time:time,loop:loop,rounding:false,easing:"linear",onupdate:onupdate})}function _stop(){stop(temp);currentframe=-1;temp.v=0}return{play:play,stop:_stop}}function action(){nowframe=Math.floor((gettime()-starttime)/timerdelay);if(totalframes>nowframe){setproperties(nowframe);timer=window.requestAnimationFrame(action)}else{window.cancelAnimationFrame(timer);setproperties(totalframes);nowframe=totalframes=0;tweens=[];playing=false}}function setproperties(step){var tween,mystep,myframes,p,i=0,max=tweens.length;for(;i<max;i++){tween=tweens[i];if(tween&&step>=tween.sf){myframes=tween.tf-1;if(tween.bs){mystep=tween.sf=tween.sf+1}else{mystep=Math.min(myframes,step-tween.sf)}if(mystep>-1){if(tween.es){tween.es.call(tween.el,geteventvalue(tween,"start",0,myframes));delete tween.es}if(!tweens[i]){continue}for(p in tween.vs){setstyle(tween.el,p,tween.vs[p][mystep])}tween.eu&&tween.eu.call(tween.el,geteventvalue(tween,"update",mystep,myframes));if(mystep==myframes){tween.ee&&tween.ee.call(tween.el,geteventvalue(tween,"end",mystep,myframes));if(tween.lp){tween.sf=tween.bs?-1:nowframe;totalframes+=tweens[i].tf+_fps;if(tween.lp=="yoyo"){for(p in tween.vs){tween.vs[p].reverse()}}}else{tweens[i]=null}}}}}}function geteventvalue(tween,type,step,totalstep){var values=tween.vs,eventvalue={type:type,percent:step/totalstep},p;for(p in values){eventvalue[p]=values[p][step]}return eventvalue}function getvalues(property,from,to,totalframe,easing,rounding){var nv,rv=[],gap=to-from,i=0;totalframe--;for(;i<=totalframe;i++){nv=easings[easing](i,from,gap,totalframe);rv.push((rounding)?Math.round(nv):nv)}return rv}return{set:set,stop:stop,sprite:sprite,getvalues:getvalues}})();$.fn._css=function(property,value){var p;if(isobject(property)){for(p in property){this._css(p,property[p])}}else{if(value!==undefined){this.each(function(){style.set(this,property,value)})}else{return style.get(this[0],property)}}return this};$.fn._animate=function(properties,d,e,c){var delaybase,options=assignanimationoptions(d,e,c);if(options.autodelay){delaybase=options.delay}return this.each(function(i){if(i){options.step=options.complete=null}if(delaybase){options.delay=i*delaybase}ani.set(this,properties,options)})};$.fn._spriteanimation=function sprite(framewidth,totalframe,property,time,loop){return this.each(function(i){$(this).data("spriteanimation",ani.sprite(this,framewidth,totalframe,property,time,loop))})};$._getanimationvalues=ani.getvalues;$.fn._stop=function(property,jumptoend){if(property===true||property===false){jumptoend=property;property=null}return this._css(transitionname,"").each(function(){ani.stop(this,property,jumptoend)})};$.fn._transition=function(properties,d,e,c){var $target=this,options=assignanimationoptions(d,e,c),p,setting,onend,onendfired;if(transitionable){setting=[];for(p in properties){if(style.istransform(p)){p=support.transform}setting.push([killcamels(p)," ",options.time,"s ",(options.delay)?options.delay+"s ":"","cubic-bezier(",(cubicbeziers[options.easing]||cubicbeziers.ease),")"].join(""))}setting=setting.join(",");onend=options.onend;options.onend=function(){if(!onendfired){$target.css(transitionname,"").unbind(transitionendnames,options.onend);setTimeout(function(){onend&&onend.call($target[0])},0);onendfired=true}};setTimeout(function(){$target.each(function(){$(this).css(transitionname,setting)._css(properties).bind(transitionendnames,options.onend)})},0);return this}else{return this.each(function(){ani.set(this,properties,options)})}};$.fn._fill=function($area,sizes){return this.each(function(){filling(this,$area,sizes)})};$.fn.decideClass=function(classname,condition){return this[condition?"addClass":"removeClass"](classname)};function filling(target,$area,_sizes){if(!$area){$area=$(target.parentNode)}if(!$area.length){return false}var position,sizes=_sizes||{},targetwidth=sizes.width||target.offsetWidth,targetheight=sizes.height||target.offsetHeight,areawidth=sizes.areawidth||$area[0].offsetWidth,areaheight=sizes.areaheight||$area[0].offsetHeight,rate,newwidth,newheight,marginleft,margintop;if(!targetwidth||!targetheight||!areawidth||!areaheight){return false}position=$area._css("backgroundPosition");if(position){position=position.split(" ");position[0]=position[0]=="center"?0.5:position[0].indexOf("%")!=-1?parseInt(position[0])/100:0;position[1]=position[1]=="center"?0.5:position[1].indexOf("%")!=-1?parseInt(position[1])/100:0}rate=(targetwidth>targetheight)?areaheight/targetheight:areawidth/targetwidth;rate=(areaheight>Math.round(targetheight*rate))?areaheight/targetheight:(areawidth>targetwidth*rate)?areawidth/targetwidth:rate;newwidth=Math.max(areawidth,Math.round(targetwidth*rate));newheight=Math.max(areaheight,Math.round(targetheight*rate));if(position){if(position[0]){marginleft=(areawidth-newwidth)*position[0]}if(position[1]){margintop=(areaheight-newheight)*position[1]}}$(target).css({width:newwidth,height:newheight,marginLeft:marginleft||"",marginTop:margintop||""})}function assignanimationoptions(d,e,c){var options;if(isobject(d)){options={time:d.duration,loop:d.loop,delay:d.delay,bystep:d.bystep,rounding:d.rounding,easing:d.easing,onstart:d.start,onupdate:d.step,onend:d.complete}}else{if(typeof(c)=="function"){options={time:d,easing:e,onend:c}}else{if(typeof(e)=="function"){options=(typeof(d)=="number")?{time:d}:{easing:d};options.onend=e}else{if(typeof(d)=="function"){options={onend:d}}}}}if(options.time===undefined){options.time=400}options.time/=1000;if(options.delay&&!isNaN(parseInt(options.delay))){if(typeof(options.delay)=="string"){options.autodelay=true}options.delay=parseInt(options.delay)/1000}return options}function killcamels(property){return property.replace(/([A-Z])/g,"-$1").toLowerCase()}$._event=(function(){var supporttouch=support.touch,typemap=supporttouch?{mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"}:{};return{gettype:function(types){var type,newtypes;if(supporttouch){newtypes={};for(type in types){newtypes[typemap[type]||type]=types[type]}return newtypes}return types},getpoint:function(e){e=e.originalEvent;if(e.touches||e.changedTouches){return[e.touches[0]?e.touches[0].pageX:e.changedTouches[0].pageX,e.touches[0]?e.touches[0].pageY:e.changedTouches[0].pageY]}return[e.clientX,e.clientY]}}})();div=null;$(document.documentElement).addClass(browser.os).addClass(browser.chrome?"chrome":browser.firefox?"firefox":browser.opera?"opera":browser.safari?"safari":browser.ie?"ie ie"+browser.ie:"").addClass(browser.webkit?"webkit":"").addClass(browser.ie&&8>browser.ie?"ie8":"").addClass(browser.ios?"ios":browser.android?"android":"").addClass(support.transition?"transition":"notransition").addClass(support.transform?"transform":"notransform").addClass(support.backgroundsize?"backgroundsize":"nobackgroundsize").addClass(support.rgba?"rgba":"norgba").addClass(support.svgimage?"svg":"nosvg").addClass(support.pointerevents?"pointerevents":"nopointerevents").addClass(support.opacity?"opacity":"noopacity");if(!window.console){window.console={};window.console.log=window.console.table=window.console.error=window.console.clear=function(){}}window.trace=(function(){var box=null,number=1;function tostring(v){var rv,i,max;if(v===null){return"null"}else{if(v===undefined){return"undefined"}else{if(v==window){return"[object Window]"}else{if(v==document){return"[object HTMLDocument]"}else{if(v===true||v===false||typeof(v)=="number"||typeof(v)=="function"){return v}else{if(typeof(v)=="object"){if(v.constructor==Array){rv=[];for(i=0,max=v.length;i<max;i++){rv.push(tostring(v[i]))}return"["+rv.join(",")+"]"}else{if(v.constructor==String){return'"'+v.replace(/\</g,"<")+'"'}else{if(v.constructor==Boolean||v.constructor===Number||v.constructor==RegExp){return v}else{if(v.constructor==Date){return"Date("+v.getTime()+", "+v+")"}else{if(v.each&&v.bind){rv=[];for(i=0,max=v.length;i<max;i++){rv.push(i+":"+tostring(v[i]))}rv.push("length:"+max);return"${"+rv.join(",")+"}"}else{if(v.nodeType){return"[object "+v.nodeName.toUpperCase()+" Element]"}else{rv=[];for(i in v){rv.push("'"+i+"':"+tostring(v[i]))}return"{"+rv.join(",")+"}"}}}}}}}else{return'"'+((v.replace)?v.replace(/\</g,"<"):v)+'"'}}}}}}}function create(){if(!box){box=document.createElement("ol");box.style.cssText="position:absolute;left:5px;top:5px;max-width:75%;font-family:verdana;font-size:9px;color:#000;line-height:1.35em;margin:0;padding:3px 3px 2px 38px;border:1px solid #000;background:#fff;display:none;z-index:10000;opacity:0.75;filter:alpha(opacity=75);";box.onclick=clear;addbox()}}function addbox(){if(document.body){document.body.appendChild(box)}else{setTimeout(addbox,10)}}function clear(){if(box){box.innerHTML="";box.style.display="none";number=1}}return{log:function(){for(var i=0,max=arguments.length,v=[],li=document.createElement("li");i<max;i++){v.push(tostring(arguments[i]))}li.style.cssText="list-style:decimal;margin-bottom:1px;padding:2px 3px 3px;background:"+((number%2)?"#eee;":"#ddd;");li.innerHTML=v.join(", ");create();box.appendChild(li);box.style.display="block";number++},fixed:function(flag){create();box.style.position=(flag===false)?"absolute":"fixed"},clear:clear}})()})(window.jQuery);(function(e){if(!e||e.fn.xlider){return}var b=e(window),d=e(document.documentElement),c=e(document.body),n=e.browser.mobile,j=e.browser.ios,i=e.browser.android,f=e.support.transform,o=e.support.transition,m=e._event.gettype,p=e._event.getpoint,l=/ul/i,a,k=[],q;e.fn.xlider=function(v,u,t,s){var r;if(!v||e.isPlainObject(v)){this.each(function(){h(e(this),v)})}else{if(typeof(v)=="string"){if(v=="prev"||v=="next"){s=u}else{if(v=="toggleAuto"){r={v:0,value:u};e(this).trigger("xlider-"+v,r,u);return r.v}else{if(v=="change"||typeof t!="string"){s=t}}}this.trigger("xlider-"+v,{to:u,pretendTo:t,noAnimation:s})}}return this};b.resize(function(){a=d[0].clientWidth;e.each(k,function(){this()})});function h(M,Z){var Z=Z||{},aF=Z.endless,L=Z.arrows,T=L?L.constructor==Array?"pre":typeof L=="string"?L:"button":"",J=Z.paging,aQ=J?J.length&&J[0].nodeType?"pre":typeof J=="string"?J:"button":"",Y=Z.swipe!==false,B=Z.fade,aq=Z.animate!==false,A=Z.duration,aY=Z.autoPlay,ay=Z.useTransition&&o,aE=Z.numDisplay||1,ad=Z.newstyle||false,aS=Z.maxview||5,aD=Z.mode||"all",ak=Z.onMove,a5=Z.onChange,S=Z.onChangeEnd,aU=Z.reset,au,aP,ax,aT,aO,aL,ag=M.children(),z,ai,af,N,u,r,a4,aC,aI,Q,aN,D,aw,al=aE>1,aa=false,aW=true,G=false,at=false,t=false,a0=true,y=!!aY,aA=null,w="xlider-wrapper",s=0,aG=1,R=0,v,ap=true,X=false,aj=0,K=ag.length,C=Z.defaultPage&&Z.defaultPage>-1?Math.min(K-1,Z.defaultPage):0,ac={slide:{queue:false,step:ah,easing:"easeOutCubic",complete:am},back:{queue:false,step:ah,easing:"easeOutCubic",complete:am},fade:{queue:false,easing:"easeOutSine",complete:am}};if(P5_APPS.isPoorBrowser){ad=false}if(!c.length){c=e(document.body)}if(!K){return}if(B){Y=true;aF=true}if(l.test(M[0].nodeName)){au=M.addClass(w);M=au.parent()}else{if(2>K&&l.test(ag[0].nodeName)){au=ag.addClass(w);ag=ag.find("> li");K=ag.length}}if(!au){au=e('<div class="'+w+'" />').appendTo(M)}if(au.css("position")=="static"){au.css("position","relative")}if(au.css("zIndex")=="auto"){au.css("zIndex",0)}M.css("overflow","hidden");if(!B&&aF&&2>K){aF=false}if(L&&K>1){if(T=="pre"){ax=L[0];aT=L[1]}else{aP=e('<p class="arrows" />').appendTo(M);ax=e("<"+L+' class="prev">Prev</'+L+">").appendTo(aP);aT=e("<"+L+' class="next">Next</'+L+">").appendTo(aP)}ax.attr("data-flag","prev").click(aJ);aT.attr("data-flag","next").click(a2)}else{if(2>K){if(L=="pre"){L[0].remove();L[1].remove()}L=null}}if(J){if(aQ=="pre"){aO=e(J);aL=aO.children()}else{aO=e('<p class="paging" />').appendTo(M);aL=[];for(aj=0;aj<K;aj++){aL[aj]=e("<"+aQ+" />");aL[aj][0].innerHTML=aj+1}}}for(aj=0;aj<K;aj++){ag[aj]=e(ag[aj]);if(!ad){ag[aj]=e(ag[aj]).css({left:B?0:"200%",top:0,width:"100%",display:aj==C?"":"none"});ag[aj].appendTo(au);ag[aj].find("a, button, input, textarea").attr("data-xlider-page",aj).focus(W)}if(ag[0].parent().parent().hasClass("g-contents")){ag[aj].addClass("hide")}if(J){aL[aj]=e(aL[aj]).attr("data-page",aj).click(av).appendTo(aO)}}function V(){if(ad){if(e("html").hasClass("s"+aD)||(aD=="all")){if(!X){if(au&&au.length){for(aj=0;aj<K;aj++){var a6=Math.ceil(aS/2);ag[aj]=e(ag[aj]).attr("data-call",aj);if(aj<a6){var a7=Math.ceil((K-1)-aj);au.prepend(ag[a7])}}}X=true}if(au&&au.length){ao()}}else{if(X){if(au&&au.length){au.html("");for(aj=0;aj<K;aj++){ag[aj]=e(ag[aj]).attr("data-call",aj);ag[aj].appendTo(au);if(aj==K-1){aU&&aU.call()}}}X=false}}}}function av(){if(!ad){aR({to:parseInt(this.getAttribute("data-page"))})}else{var a8=e(this).attr("data-page");if(!aW||a8==C){return false}var a6=au.find("> li.show").index();var ba=[];var a7=aL.length;for(aj=0;aj<a7;aj++){ba[aj]=au.find("> li").eq(aj).attr("data-call")}var a9=ba.indexOf(a8);var bb=a9-a6;if(ap){az(bb)}}return false}function az(bj){ap=false;var bl=Math.floor(au.find(" > li").eq(K-1).css("marginLeft").replace("px",""));var bc=au.find(" > li").eq(K-1).innerWidth()+(bl*2);var bb=au.find(" > li.show").index();var ba=au.find(" > li").eq(bb+bj).attr("data-call");var bi;var bd;var a9=1;var bk=bc/2;var bg;var be=Math.ceil(au.css("transform").split(",")[4]);if(e.browser.ie>9){be=Math.ceil(au.css("transform").split(",")[12])}var bh=Math.abs(bj);var bf=0;var a6=false;var a8=0;if(e.browser.mobile){a8=10}var a7=function(){if(bj>0){bi=0}else{bi=K-1}var bm=au.find("> li").eq(bi).attr("data-call");au.find("> li").eq(bi).remove();if(bi!=0){au.prepend(ag[bm])}else{au.append(ag[bm])}if(bj>0){bf=be+(Math.abs(bc))}else{bf=be-(Math.abs(bc))}a9++;a6=true};bg=setInterval(function(){var bm=Math.ceil(au.css("transform").split(",")[4]);if(e.browser.ie>9){bm=Math.ceil(au.css("transform").split(",")[12])}if(a6){bd=be;a6=false}else{if(bj>0){bd=bm-(20)}else{bd=bm+(20)}}au._css({translate3dX:bd});var bn=Math.ceil(au.css("transform").split(",")[4]);if(e.browser.ie>9){bn=Math.ceil(au.css("transform").split(",")[12])}var bo=bn-be;if(n&&t){bo=Math.abs(bo)+Math.abs(aw-be)}if((bc)<Math.abs(bo)){a7()}if(a9==bh+1){clearInterval(bg);if(n&&t){au._css({translate3dX:aw})}else{au._css({translate3dX:be})}C=ba;a3();am();t=false;if(n){setTimeout(function(){ap=true;a0=true},100)}else{ap=true;a0=true}}},a8)}if(Y){if(window.navigator.pointerEnabled){au[0].style.cssText+="touch-action: pan-y;"}else{if(window.navigator.msPointerEnabled){au[0].style.cssText+="-ms-touch-action: pan-y;"}}au.bind(m({mousedown:O}));au.bind("selectstart dragstart",function(){return false})}function ao(a8){if(ad){var bc=Math.ceil(au.css("transform").split(",")[4]);if(e.browser.ie>9){bc=Math.ceil(au.css("transform").split(",")[12])}var a6=b.width()/2;var ba=Math.floor(au.find(" > li").eq(K-1).css("marginLeft").replace("px",""));var a7=au.find(" > li").eq(K-1).innerWidth();var bb=au.find(" > li.show").offset().left;var a9=bb+a7/2-a6;if(at){a9=bb+a7/2-a6-bc}au._animate({translate3dX:-a9},{duration:550,easing:"easeOutCubic",force3D:true});at=true}}M.bind("xlider-prev",function(a7,a6){aJ(a7,false,a6.noAnimation)});M.bind("xlider-next",function(a7,a6){a2(a7,false,a6.noAnimation)});M.bind("xlider-jump",function(a7,a6){aR(a6)});M.bind("xlider-change",function(a7,a6){aH(a6)});M.bind("xlider-toggleAuto",function(a7,a6){a6.v=an(a6.value)});M.bind("xlider-remove",function(a6){for(aj=0;aj<K;aj++){ag[aj].find("a, button, input, textarea").removeAttr("data-xlider-page");if(!l.test(au[0].nodeName)){ag[aj].appendTo(M)}if(J){if(aQ!="pre"){aL[aj].remove()}else{aL[aj].unbind("click")}}}au._css({position:"",translate3dX:""}).removeClass(w);au.unbind(m({mousedown:O}));if(!l.test(au[0].nodeName)){au.remove()}if(J&&aQ!="pre"){aO.remove()}if(L){if(T!="pre"){ax.remove();aT.remove()}else{ax.unbind("click");aT.unbind("click")}}z&&z.remove();ai.remove();M.unbind("xlider-prev xlider-next xlider-jump xlider-change xlider-toggleAuto xlider-remove");M=au=ax=aT=aL=null;for(aj=0,K=k.length;aj<K;aj++){if(k[aj]==E){k.splice(aj,1);break}}});ai=e('<div class="blocker" style="position:absolute;left:0;top:0;width:100%;height:100%;background:#000;" />').css("opacity",0);a3();E();am();k.push(E);function O(a6){U();if(!aW){ap}r=aC=p(a6)[0];aM=r;if(j&&(15>r||r>a-15)){return true}a4=p(a6)[1];Q=new Date().getTime();aN=0;aI=false;if(!ap&&n){return false}if(!a0){return false}if(e.support.transform){D=Math.ceil(au.css("transform").split(",")[4]);aw=Math.ceil(au.css("transform").split(",")[4]);if(e.browser.ie>9){D=Math.ceil(au.css("transform").split(",")[12]);aw=Math.ceil(au.css("transform").split(",")[12])}}if(D==undefined){D=0;aw=0}d.bind(m({mousemove:aK,mouseup:ae}))}var H="",ar=true,aM;function aK(bb){var be=p(bb)[0],bd=p(bb)[1],bf=new Date().getTime();if(aI===false){aI=Math.abs((Math.atan2(r-be,a4-bd)*180)/Math.PI);if(45>aI||aI>135){d.unbind(m({mousemove:aK,mouseup:ae}));return true}}if(ag[0].parent().parent().hasClass("g-contents")){if(C!=0){ag[C-1].addClass("show");if((K-1)!=C){ag[C+1].addClass("show")}else{ag[0].addClass("show")}}else{ag[C+1].addClass("show");ag[K-1].addClass("show")}}aN=be-r;if(ad){var a7=be-aM;var a9=be-R;var bi=D;var bh=Math.floor(au.find(" > li").eq(K-1).css("marginLeft").replace("px",""));var a8=au.find(" > li").eq(K-1).innerWidth()+(bh*2);var bg=a8/2;if((a9>0)&&(R!=0)&&(!n)){if(H=="left"){ar=true;H="right"}if(ar){aG=1;ar=false;aM=be}a7=be-aM;var bc=Math.abs(Math.floor((Math.abs(a7)+a8)/a8)-aG+1);var a6=function(){var bj=au.find("> li").eq(K-1).attr("data-call");au.find("> li").eq(K-1).remove();au.prepend(ag[bj]);aG++;D=bi-(Math.abs(a8)*bc)};if((a8*aG)<(Math.abs(a7)+bg)){for(aj=0;aj<bc;aj++){a6()}}H="right"}else{if((a9<0)&&(R!=0)&&(!n)){if(H=="right"){ar=true;H="left"}if(ar){aG=1;ar=false;aM=be}a7=be-aM;var bc=Math.abs(Math.floor((Math.abs(a7)+a8)/a8)-aG+1);var ba=function(){var bj=au.find("> li").eq(0).attr("data-call");au.find("> li").eq(0).remove();au.append(ag[bj]);aG++;D=bi+(Math.abs(a8)*bc)};if((a8*aG)<(Math.abs(a7)+bg)){for(aj=0;aj<bc;aj++){ba()}}H="left"}}aN=D+(be-r)}if(!aF&&(!C||C==K-1)){aN/=2}if(!B){au._css("translate3dX",aN)}ah(aN);if(bf-300>Q){Q=bf;aC=be}if(!n&&!G){ai.appendTo(M);G=true}R=be;e(document).on("mouseleave",function(){if(e("html").hasClass("firefox")){ae(bb)}});bb.preventDefault()}function ah(a6,a8){var a7=e.isPlainObject(a6)?a6.translate3dX:a6;a8!==true&&ak&&ak.call(M,a7)}function ae(a7){var a6=p(a7)[0],a8=a6-aC;if(a6!=r){if(!ad){if(10>Math.abs(a6-r)){aX()}else{if(!a8||new Date().getTime()-Q>300){if(aN>af/2&&(aF||C)){aJ(false,true)}else{if(-af/2>aN&&(aF||C!=K-1)){a2(false,true)}else{aX()}}}else{if(a8>0&&(aF||C)){aJ(false,true)}else{if(0>a8&&(aF||C!=K-1)){a2(false,true)}else{aX()}}}}}else{a0=false;aG=1;if(n){if(Math.abs(a8)>10){if(a8>0){if(ap){az(-1)}}else{if(ap){az(1)}}t=true}else{au._animate({translate3dX:aw},{duration:300,easing:"easeOutCubic",force3D:true,complete:ab})}}else{au._animate({translate3dX:aw},{duration:300,easing:"easeOutCubic",force3D:true,complete:ab})}}}else{F()}if(!n&&G){ai.detach();G=false}d.unbind(m({mousemove:aK,mouseup:ae}))}function ab(){var a7=b.width()/2;var bc=[];var a6=[];var a9=au.find(" > li").length;for(a8=0;a8<a9;a8++){bc[a8]=Math.abs(au.find(" > li").eq(a8).offset().left+(au.find(" > li").eq(a8).innerWidth()/2)-a7);a6[a8]=Math.ceil(au.find(" > li").eq(a8).offset().left+(au.find(" > li").eq(a8).innerWidth()/2)-a7)}var ba=Math.min.apply(null,bc);var bb;if(!Array.indexOf){for(var a8=0;a8<bc.length;a8++){if(bc[a8]==ba){bb=a8}}}else{bb=bc.indexOf(ba)}C=au.find(" > li").eq(bb).attr("data-call");a3();am();a0=true}function aX(){I(0,"back")}function aH(a8){var a7,a6,a9=parseInt(a8.to);if(!aW){return false}a7=typeof a9=="number"&&!isNaN(a9)?a9:this.getAttribute?parseInt(this.getAttribute("data-page")):null;if(ag[0].parent().parent().hasClass("g-contents")){if(a7!=0){ag[a7-1].addClass("show");if((K-1)!=a7){ag[a7+1].addClass("show")}}else{ag[a7+1].addClass("show")}}if(a7!==null&&a7!=C&&a7>-1&&K>a7){E();if(B){aV(a7,a8.noAnimation)}else{a6=(C-a7)*u;a1(a7);I(a6,"slide",a8.noAnimation)}}return false}function aJ(a9,a8,a7){var a6;if(!aW||(!aF&&!C)){return false}if(!ad){a6=!C?K-1:C-1;if(B){aV(a6,a7)}else{a1(a6,"prev",a8);I(u,"slide",a7)}}else{if(ap){az(-1)}}a9&&a9.preventDefault();return false}function a2(a9,a8,a7){var a6;if(!aW||(!aF&&C==K-1)){return false}if(!ad){a6=C==K-1?0:C+1;if(B){aV(a6,a7)}else{a1(a6,"next",a8);I(-u,"slide",a7)}}else{if(ap){az(1)}}a9&&a9.preventDefault();return false}function aR(a6){var a8,a7=a6.to;if(!aW||a7==C){return false}if(B){aH(a6)}else{for(aj=0;aj<K;aj++){if(!ag[0].parent().parent().hasClass("g-contents")){aj!=a7&&aj!=C&&ag[aj].hide()}else{aj!=a7&&aj!=C&&ag[aj].removeClass("show")}}a8=a6.pretendTo?a6.pretendTo:C>a7?"prev":"next";a1(a7,a8);I(a8=="prev"?u:-u,"slide",a6.noAnimation)}return false}function a1(a6,a7,a8){var ba,a9;if(!a8){if(a7){aB(a6,a7=="next"?"100%":"-100%")}else{ba=Math.min(C,a6);a9=Math.max(C,a6);for(aj=ba;aj<=a9;aj++){if(aj!=C){aB(aj,(aj-C)*100+"%")}}}}P(a6)}function P(a6){U();aW=false;C=a6;a3();a5&&a5.call(M,C,K);E()}function aB(a7,a6){if(!ad){(typeof a7=="number"?ag[a7]:a7).css({position:"absolute",left:a6}).show()}if((!ag[0].parent().parent().hasClass("g-contents"))&&(!ad)){(typeof a7=="number"?ag[a7]:a7).addClass("show")}}function aV(a6,a7){var a8;clearTimeout(a8);if(aq&&!a7){aB(C,0);if(ay){ag[C]._animate({opacity:0},ac.fade);a8=setTimeout(function(){ag[a6].show()._animate({opacity:1},ac.fade)},500)}else{ag[C]._animate({opacity:0},ac.fade);a8=setTimeout(function(){ag[a6].show()._animate({opacity:1},ac.fade)},500)}C=a6;a3()}else{am()}}function I(a8,a7,a6){if(ag[0].parent().parent().hasClass("g-contents")){ag[C].addClass("show")}if(aq&&!a6){if(ay){au._transition({translate3dX:a8},ac[a7])}else{au._animate({translate3dX:a8},ac[a7])}}else{am()}}function a3(){for(aj=0;aj<K;aj++){if(J){aL[aj][(aj==C)?"addClass":"removeClass"]("on")}}if(!aF&&L){ax[!C?"addClass":"removeClass"]("disabled");aT[C==K-1?"addClass":"removeClass"]("disabled")}}function am(){var a8,a7,a6;for(aj=0;aj<K;aj++){if(aj==C){ag[aj].css({position:"relative",left:0}).addClass("xlider-current show");a8=ag[!C?aF?K-1:-1:C-1],a7=ag[C==K-1?aF?0:K:C+1]}else{if((!ag[0].parent().parent().hasClass("g-contents"))&&(!ad)){ag[aj].hide().removeClass("xlider-current")}else{ag[aj].removeClass("xlider-current show")}}}if((!B)&&(!ad)){if(z){z.remove();z=null}au._css("translate3dX",0);a8=ag[!C?aF?K-1:-1:C-1],a7=ag[C==K-1?aF?0:K:C+1],a6=ag[C];if(aF&&a8[0]==a7[0]){z=a8.clone().addClass("xlider-fake");z.appendTo(au);aB(z,N,true)}for(aj=0;aj<K;aj++){if(a8&&ag[aj][0]==a8[0]){aB(aj,"-"+N)}else{if(a7&&ag[aj][0]==a7[0]){aB(aj,N)}}}}if(ad){a8=ag[!C?aF?K-1:-1:C-1],a7=ag[C==K-1?aF?0:K:C+1],a6=ag[C]}aW=true;S&&S.call(M,C,K);F()}function x(){aR({to:C==K-1?0:C+1,pretendTo:"next"})}function U(){clearTimeout(aA)}function F(){U();if(y){aA=setTimeout(x,aY)}}function an(a6){y=typeof(a6)=="boolean"?a6:!y;if(!y){U()}else{F()}return y}function aZ(){if(aq){ac.slide.duration=A||Math.max(450,Math.min(u,750));ac.back.duration=(A||ac.slide.duration)*0.75;ac.fade.duration=A||200}}function W(){var a6;if(M){a6=parseInt(this.getAttribute("data-xlider-page"));M[0].scrollLeft=0;setTimeout(function(){M[0].scrollLeft=0},0);M.xlider("change",a6,true)}}function E(){af=M[0].offsetWidth;N=al?ag[0][0].offsetWidth:"100%";u=al?N:af;if(ad){clearTimeout(v);v=setTimeout(function(){V()},100)}aZ()}}function g(r){r.preventDefault()}})(window.jQuery);


/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button" onclick="sendClickCode(\'content_click_count\',\'rolling:left arrow\');">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button" onclick="sendClickCode(\'content_click_count\',\'rolling:right arrow\');">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').find('a, input, button, select').attr({
            'tabindex': '0'
        });
        // .attr({
        //     'aria-hidden': 'false'
        // })

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<div><ul /></div>').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.find('ul').append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            // _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }


        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }

        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick',
                '*:not(.slick-arrow)', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            // 'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

         _.$slideTrack.attr('data-role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
            // $(this).attr({
            //     'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            // });
            $(this).attr({
                'data-role': 'option'
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('data-role', 'tablist').find('li').each(function(i) { //.attr('role', 'tablist')
                $(this).attr({
                    'data-role': 'presentation',
                    // 'aria-selected': 'false',
                    // 'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            })
                // .first().attr('aria-selected', 'true').end();
                .find('button').attr('data-role', 'button').end()
                .closest('div').attr('data-role', 'toolbar');
        }
        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            _.setPosition();

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current');
            // .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current').attr('tabindex', '0');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active');
                        // .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active');
                        // .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active');
                    // .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active');
                    // .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active');
                        // .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active');
                        // .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .css('width', '');
            // .attr('aria-hidden', 'true')

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active');
                // .attr('aria-hidden', 'true');

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');
                // .attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));

/**
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars:
 * {@link http://kottenator.github.io/jquery-circle-progress/}
 *
 * @author Rostyslav Bryzgunov <kottenator@gmail.com>
 * @version 1.2.2
 * @licence MIT
 * @preserve
 */
// UMD factory - https://github.com/umdjs/umd/blob/d31bb6ee7098715e019f52bdfe27b3e4bfd2b97e/templates/jqueryPlugin.js
// Uses AMD, CommonJS or browser globals to create a jQuery plugin.
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD - register as an anonymous module
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    var $ = require('jquery');
    factory($);
    module.exports = $;
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  /**
   * Inner implementation of the circle progress bar.
   * The class is not exposed _yet_ but you can create an instance through jQuery method call.
   *
   * @param {object} config - You can customize any class member (property or method).
   * @class
   * @alias CircleProgress
   */
  function CircleProgress(config) {
    this.init(config);
  }

  CircleProgress.prototype = {
    //--------------------------------------- public options ---------------------------------------
    /**
     * This is the only required option. It should be from `0.0` to `1.0`.
     * @type {number}
     * @default 0.0
     */
    value: 0.0,

    /**
     * Size of the canvas in pixels.
     * It's a square so we need only one dimension.
     * @type {number}
     * @default 100.0
     */
    size: 100.0,

    /**
     * Initial angle for `0.0` value in radians.
     * @type {number}
     * @default -Math.PI
     */
    startAngle: -Math.PI,

    /**
     * Width of the arc in pixels.
     * If it's `'auto'` - the value is calculated as `[this.size]{@link CircleProgress#size} / 14`.
     * @type {number|string}
     * @default 'auto'
     */
    thickness: 'auto',

    /**
     * Fill of the arc. You may set it to:
     *
     *   - solid color:
     *     - `'#3aeabb'`
     *     - `{ color: '#3aeabb' }`
     *     - `{ color: 'rgba(255, 255, 255, .3)' }`
     *   - linear gradient _(left to right)_:
     *     - `{ gradient: ['#3aeabb', '#fdd250'], gradientAngle: Math.PI / 4 }`
     *     - `{ gradient: ['red', 'green', 'blue'], gradientDirection: [x0, y0, x1, y1] }`
     *     - `{ gradient: [["red", .2], ["green", .3], ["blue", .8]] }`
     *   - image:
     *     - `{ image: 'http://i.imgur.com/pT0i89v.png' }`
     *     - `{ image: imageObject }`
     *     - `{ color: 'lime', image: 'http://i.imgur.com/pT0i89v.png' }` -
     *       color displayed until the image is loaded
     *
     * @default {gradient: ['#3aeabb', '#fdd250']}
     */
    fill: {
      gradient: ['#3aeabb', '#fdd250']
    },

    /**
     * Color of the "empty" arc. Only a color fill supported by now.
     * @type {string}
     * @default 'rgba(0, 0, 0, .1)'
     */
    emptyFill: 'rgba(0, 0, 0, .1)',

    /**
     * jQuery Animation config.
     * You can pass `false` to disable the animation.
     * @see http://api.jquery.com/animate/
     * @type {object|boolean}
     * @default {duration: 1200, easing: 'circleProgressEasing'}
     */
    animation: {
      duration: 400,
      easing: 'circleProgressEasing'
    },

    /**
     * Default animation starts at `0.0` and ends at specified `value`. Let's call this _direct animation_.
     * If you want to make _reversed animation_ - set `animationStartValue: 1.0`.
     * Also you may specify any other value from `0.0` to `1.0`.
     * @type {number}
     * @default 0.0
     */
    animationStartValue: 0.0,

    /**
     * Reverse animation and arc draw.
     * By default, the arc is filled from `0.0` to `value`, _clockwise_.
     * With `reverse: true` the arc is filled from `1.0` to `value`, _counter-clockwise_.
     * @type {boolean}
     * @default false
     */
    reverse: false,

    /**
     * Arc line cap: `'butt'`, `'round'` or `'square'` -
     * [read more]{@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineCap}.
     * @type {string}
     * @default 'butt'
     */
    lineCap: 'butt',

    /**
     * Canvas insertion mode: append or prepend it into the parent element?
     * @type {string}
     * @default 'prepend'
     */
    insertMode: 'prepend',

    //------------------------------ protected properties and methods ------------------------------
    /**
     * Link to {@link CircleProgress} constructor.
     * @protected
     */
    constructor: CircleProgress,

    /**
     * Container element. Should be passed into constructor config.
     * @protected
     * @type {jQuery}
     */
    el: null,

    /**
     * Canvas element. Automatically generated and prepended to [this.el]{@link CircleProgress#el}.
     * @protected
     * @type {HTMLCanvasElement}
     */
    canvas: null,

    /**
     * 2D-context of [this.canvas]{@link CircleProgress#canvas}.
     * @protected
     * @type {CanvasRenderingContext2D}
     */
    ctx: null,

    /**
     * Radius of the outer circle. Automatically calculated as `[this.size]{@link CircleProgress#size} / 2`.
     * @protected
     * @type {number}
     */
    radius: 0.0,

    /**
     * Fill of the main arc. Automatically calculated, depending on [this.fill]{@link CircleProgress#fill} option.
     * @protected
     * @type {string|CanvasGradient|CanvasPattern}
     */
    arcFill: null,

    /**
     * Last rendered frame value.
     * @protected
     * @type {number}
     */
    lastFrameValue: 0.0,

    /**
     * Init/re-init the widget.
     *
     * Throws a jQuery event:
     *
     * - `circle-inited(jqEvent)`
     *
     * @param {object} config - You can customize any class member (property or method).
     */
    init: function(config) {
      $.extend(this, config);
      this.radius = this.size / 2;
      this.initWidget();
      this.initFill();
      this.draw();
      this.el.trigger('circle-inited');
    },

    /**
     * Initialize `<canvas>`.
     * @protected
     */
    initWidget: function() {
      if (!this.canvas)
        this.canvas = $('<canvas>')[this.insertMode == 'prepend' ? 'prependTo' : 'appendTo'](this.el)[0];

      var canvas = this.canvas;
      canvas.width = this.size;
      canvas.height = this.size;
      this.ctx = canvas.getContext('2d');

      if (window.devicePixelRatio > 1) {
        var scaleBy = window.devicePixelRatio;
        canvas.style.width = canvas.style.height = this.size + 'px';
        canvas.width = canvas.height = this.size * scaleBy;
        this.ctx.scale(scaleBy, scaleBy);
      }
    },

    /**
     * This method sets [this.arcFill]{@link CircleProgress#arcFill}.
     * It could do this async (on image load).
     * @protected
     */
    initFill: function() {
      var self = this,
        fill = this.fill,
        ctx = this.ctx,
        size = this.size;

      if (!fill)
        throw Error("The fill is not specified!");

      if (typeof fill == 'string')
        fill = {color: fill};

      if (fill.color)
        this.arcFill = fill.color;

      if (fill.gradient) {
        var gr = fill.gradient;

        if (gr.length == 1) {
          this.arcFill = gr[0];
        } else if (gr.length > 1) {
          var ga = fill.gradientAngle || 0, // gradient direction angle; 0 by default
            gd = fill.gradientDirection || [
                size / 2 * (1 - Math.cos(ga)), // x0
                size / 2 * (1 + Math.sin(ga)), // y0
                size / 2 * (1 + Math.cos(ga)), // x1
                size / 2 * (1 - Math.sin(ga))  // y1
              ];

          var lg = ctx.createLinearGradient.apply(ctx, gd);

          for (var i = 0; i < gr.length; i++) {
            var color = gr[i],
              pos = i / (gr.length - 1);

            if ($.isArray(color)) {
              pos = color[1];
              color = color[0];
            }

            lg.addColorStop(pos, color);
          }

          this.arcFill = lg;
        }
      }

      if (fill.image) {
        var img;

        if (fill.image instanceof Image) {
          img = fill.image;
        } else {
          img = new Image();
          img.src = fill.image;
        }

        if (img.complete)
          setImageFill();
        else
          img.onload = setImageFill;
      }

      function setImageFill() {
        var bg = $('<canvas>')[0];
        bg.width = self.size;
        bg.height = self.size;
        bg.getContext('2d').drawImage(img, 0, 0, size, size);
        self.arcFill = self.ctx.createPattern(bg, 'no-repeat');
        self.drawFrame(self.lastFrameValue);
      }
    },

    /**
     * Draw the circle.
     * @protected
     */
    draw: function() {
      if (this.animation)
        this.drawAnimated(this.value);
      else
        this.drawFrame(this.value);
    },

    /**
     * Draw a single animation frame.
     * @protected
     * @param {number} v - Frame value.
     */
    drawFrame: function(v) {
      this.lastFrameValue = v;
      this.ctx.clearRect(0, 0, this.size, this.size);
      this.drawEmptyArc(v);
      this.drawArc(v);
    },

    /**
     * Draw the arc (part of the circle).
     * @protected
     * @param {number} v - Frame value.
     */
    drawArc: function(v) {
      if (v === 0)
        return;

      var ctx = this.ctx,
        r = this.radius,
        t = this.getThickness(),
        a = this.startAngle;

      ctx.save();
      ctx.beginPath();

      if (!this.reverse) {
        ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v);
      } else {
        ctx.arc(r, r, r - t / 2, a - Math.PI * 2 * v, a);
      }

      ctx.lineWidth = t;
      ctx.lineCap = this.lineCap;
      ctx.strokeStyle = this.arcFill;
      ctx.stroke();
      ctx.restore();
    },

    /**
     * Draw the _empty (background)_ arc (part of the circle).
     * @protected
     * @param {number} v - Frame value.
     */
    drawEmptyArc: function(v) {
      var ctx = this.ctx,
        r = this.radius,
        t = this.getThickness(),
        a = this.startAngle;

      if (v < 1) {
        ctx.save();
        ctx.beginPath();

        if (v <= 0) {
          ctx.arc(r, r, r - t / 2, 0, Math.PI * 2);
        } else {
          if (!this.reverse) {
            ctx.arc(r, r, r - t / 2, a + Math.PI * 2 * v, a);
          } else {
            ctx.arc(r, r, r - t / 2, a, a - Math.PI * 2 * v);
          }
        }

        ctx.lineWidth = t;
        ctx.strokeStyle = this.emptyFill;
        ctx.stroke();
        ctx.restore();
      }
    },

    /**
     * Animate the progress bar.
     *
     * Throws 3 jQuery events:
     *
     * - `circle-animation-start(jqEvent)`
     * - `circle-animation-progress(jqEvent, animationProgress, stepValue)` - multiple event
     *   animationProgress: from `0.0` to `1.0`; stepValue: from `0.0` to `value`
     * - `circle-animation-end(jqEvent)`
     *
     * @protected
     * @param {number} v - Final value.
     */
    drawAnimated: function(v) {
      var self = this,
        el = this.el,
        canvas = $(this.canvas);

      // stop previous animation before new "start" event is triggered
      canvas.stop(true, false);
      el.trigger('circle-animation-start');

      canvas
        .css({animationProgress: 0})
        .animate({animationProgress: 1}, $.extend({}, this.animation, {
          step: function(animationProgress) {
            var stepValue = self.animationStartValue * (1 - animationProgress) + v * animationProgress;
            self.drawFrame(stepValue);
            el.trigger('circle-animation-progress', [animationProgress, stepValue]);
          }
        }))
        .promise()
        .always(function() {
          // trigger on both successful & failure animation end
          el.trigger('circle-animation-end');
        });
    },

    /**
     * Get the circle thickness.
     * @see CircleProgress#thickness
     * @protected
     * @returns {number}
     */
    getThickness: function() {
      return $.isNumeric(this.thickness) ? this.thickness : this.size / 14;
    },

    /**
     * Get current value.
     * @protected
     * @return {number}
     */
    getValue: function() {
      return this.value;
    },

    /**
     * Set current value (with smooth animation transition).
     * @protected
     * @param {number} newValue
     */
    setValue: function(newValue) {
      if (this.animation)
        this.animationStartValue = this.lastFrameValue;
      this.value = newValue;
      this.draw();
    }
  };

  //----------------------------------- Initiating jQuery plugin -----------------------------------
  $.circleProgress = {
    // Default options (you may override them)
    defaults: CircleProgress.prototype
  };

  // ease-in-out-cubic
  $.easing.circleProgressEasing = function(x) {
    if (x < 0.5) {
      x = 2 * x;
      return 0.5 * x * x * x;
    } else {
      x = 2 - 2 * x;
      return 1 - 0.5 * x * x * x;
    }
  };

  /**
   * Creates an instance of {@link CircleProgress}.
   * Produces [init event]{@link CircleProgress#init} and [animation events]{@link CircleProgress#drawAnimated}.
   *
   * @param {object} [configOrCommand] - Config object or command name.
   *
   * Config example (you can specify any {@link CircleProgress} property):
   *
   * ```js
   * { value: 0.75, size: 50, animation: false }
   * ```
   *
   * Commands:
   *
   * ```js
   * el.circleProgress('widget'); // get the <canvas>
   * el.circleProgress('value'); // get the value
   * el.circleProgress('value', newValue); // update the value
   * el.circleProgress('redraw'); // redraw the circle
   * el.circleProgress(); // the same as 'redraw'
   * ```
   *
   * @param {string} [commandArgument] - Some commands (like `'value'`) may require an argument.
   * @see CircleProgress
   * @alias "$(...).circleProgress"
   */
  $.fn.circleProgress = function(configOrCommand, commandArgument) {
    var dataName = 'circle-progress',
      firstInstance = this.data(dataName);

    if (configOrCommand == 'widget') {
      if (!firstInstance)
        throw Error('Calling "widget" method on not initialized instance is forbidden');
      return firstInstance.canvas;
    }

    if (configOrCommand == 'value') {
      if (!firstInstance)
        throw Error('Calling "value" method on not initialized instance is forbidden');
      if (typeof commandArgument == 'undefined') {
        return firstInstance.getValue();
      } else {
        var newValue = arguments[1];
        return this.each(function() {
          $(this).data(dataName).setValue(newValue);
        });
      }
    }

    return this.each(function() {
      var el = $(this),
        instance = el.data(dataName),
        config = $.isPlainObject(configOrCommand) ? configOrCommand : {};

      if (instance) {
        instance.init(config);
      } else {
        var initialConfig = $.extend({}, el.data());
        if (typeof initialConfig.fill == 'string')
          initialConfig.fill = JSON.parse(initialConfig.fill);
        if (typeof initialConfig.animation == 'string')
          initialConfig.animation = JSON.parse(initialConfig.animation);
        config = $.extend(initialConfig, config);
        config.el = el;
        instance = new CircleProgress(config);
        el.data(dataName, instance);
      }
    });
  };
});