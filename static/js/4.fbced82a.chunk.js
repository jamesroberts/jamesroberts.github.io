(this["webpackJsonpjamesroberts.github.io"]=this["webpackJsonpjamesroberts.github.io"]||[]).push([[4],{29:function(e,n,t){"use strict";t.r(n);var r=t(7),c=t(0),o=(t(62),t(63)),a=t.n(o),i=t(93),s=t(65),l=t(94),u=t(66),d=t.n(u),j=t(113),b=t(111),p=t(68),f=t.n(p);function h(e){var n;console.log(e.peerStreams);var t="100%",c="100%";return e.peerStreams.length>0&&(t="".concat(100/e.peerStreams.length,"%"),c="".concat(100/e.peerStreams.length,"%")),Object(r.jsxs)("div",{style:{position:"relative",top:0,right:0,marginBottom:25,marginTop:25},children:[Object(r.jsx)("ul",{children:null===(n=e.peerStreams)||void 0===n?void 0:n.map((function(e){return Object(r.jsx)("li",{children:Object(r.jsx)(f.a,{url:e,playing:!0,width:t,height:c})},e.id)}))}),Object(r.jsx)("div",{style:{position:"absolute",top:0,right:0},children:Object(r.jsx)(f.a,{url:e.userStream,playing:!0,width:"25%",height:"25%"})})]})}var O=t(114),v=t(89),g=t.n(v),x=t(91),m=t.n(x),S=t(1);function k(){var e=Object(c.useState)(""),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(c.useState)(new d.a),p=Object(l.a)(u,2),f=p[0],v=(p[1],Object(c.useState)("")),x=Object(l.a)(v,2),k=x[0],w=x[1],y=Object(c.useState)(!1),C=Object(l.a)(y,2),D=C[0],E=C[1],M=Object(c.useState)(null),T=Object(l.a)(M,2),U=(T[0],T[1]),z=Object(c.useState)(null),N=Object(l.a)(z,2),L=N[0],P=N[1],A=Object(c.useState)([]),B=Object(l.a)(A,2),F=B[0],I=B[1],J=Object(c.useState)(null),_=Object(l.a)(J,2),G=_[0],H=_[1],R=Object(c.useState)(!1),Y=Object(l.a)(R,2),q=Y[0],K=Y[1];var Q=new URLSearchParams(Object(S.d)().search).get("friend");function V(e){o(e)}function W(e){e=$(e),U(e),w(e.peer)}function X(e){return Z.apply(this,arguments)}function Z(){return(Z=Object(s.a)(a.a.mark((function e(n){var t,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(w(n.peer),t={audio:!1,video:!0},e.prev=2,!q){e.next=9;break}return e.next=6,navigator.mediaDevices.getDisplayMedia(t);case 6:r=e.sent,e.next=12;break;case 9:return e.next=11,navigator.mediaDevices.getUserMedia(t);case 11:r=e.sent;case 12:n.answer(r),H(r),n=ee(n),P(n),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(2),console.log(e.t0);case 21:case"end":return e.stop()}}),e,null,[[2,18]])})))).apply(this,arguments)}function $(e){return e.on("open",(function(){console.log("Connected opened with peer: "+e.peer)})),e.on("data",(function(e){console.log(e)})),e.on("close",(function(){console.log("Connection closed.")})),e.on("error",(function(e){console.log(e)})),e}function ee(e){return e.on("stream",(function(e){return I((function(n){return[].concat(Object(i.a)(n),[e])}))})),e.on("error",(function(e){return console.log(e)})),e.on("close",(function(){I((function(){return[]})),P(null)})),e}function ne(){return(ne=Object(s.a)(a.a.mark((function e(){var n,t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!q){e.next=7;break}return e.next=4,navigator.mediaDevices.getDisplayMedia({audio:!1,video:!0});case 4:n=e.sent,e.next=10;break;case 7:return e.next=9,navigator.mediaDevices.getUserMedia({audio:!1,video:!0});case 9:n=e.sent;case 10:t=ee(t=f.call(k,n)),P(t),H(n),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})))).apply(this,arguments)}Q&&""==k&&w(Q),Object(c.useEffect)((function(){f.on("open",V),f.on("connection",W),f.on("call",X),console.log("Peer initialized")}),[f]);return Object(r.jsxs)("div",{children:[Object(r.jsx)(j.a,{onChange:function(e){return w(e.target.value)},placeholder:"Caller ID"}),Object(r.jsxs)(b.a,{variant:"contained",color:"primary",onClick:function(){return ne.apply(this,arguments)},style:{margin:10},children:[" ",Object(r.jsx)(g.a,{fontSize:"large"})," "]}),Object(r.jsxs)(b.a,{variant:"contained",color:"primary",onClick:function(){if(t){var e=window.location.protocol+"//"+window.location.host+"/?friend="+t;navigator.clipboard.writeText("Hey Friend! Give me a call using this link :\n"+e),E(!0)}},children:[" ",Object(r.jsx)(m.a,{fontSize:"large"})," "]}),D?Object(r.jsx)("div",{style:{fontSize:15,color:"green"},children:"Link copied to clipboard"}):null,Object(r.jsx)("br",{}),Object(r.jsx)(O.a,{checked:q,onChange:function(e){K(e.target.checked)},color:"primary",name:"checkedB",inputProps:{"aria-label":"primary checkbox"}})," Share Screen",Object(r.jsxs)("div",{children:["Your Caller ID: "+t,Object(r.jsx)("br",{}),""!=k?"Connecting to: "+k:null]}),Object(r.jsx)(h,{peerStreams:F,userStream:G}),Object(r.jsx)("div",{children:L?Object(r.jsx)(b.a,{variant:"contained",color:"secondary",onClick:function(){null===L||void 0===L||L.close(),P(null),null===G||void 0===G||G.getTracks().forEach((function(e){return e.stop()})),null===F||void 0===F||F.forEach((function(e){return e.getTracks().forEach((function(e){return e.stop()}))})),H(null),I((function(){return[]}))},children:" Disconnect "}):null})]})}n.default=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)("header",{className:"App-header",children:Object(r.jsx)(k,{})})})}},62:function(e,n,t){},67:function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=67}}]);
//# sourceMappingURL=4.fbced82a.chunk.js.map