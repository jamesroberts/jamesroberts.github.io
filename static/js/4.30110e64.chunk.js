(this["webpackJsonpjamesroberts.github.io"]=this["webpackJsonpjamesroberts.github.io"]||[]).push([[4],{29:function(e,t,n){"use strict";n.r(t);var r=n(7),o=n(0),c=(n(62),n(63)),a=n.n(c),i=n(94),s=n(65),l=n(95),u=n(66),p=n.n(u),d=n(114),f=n(111),j=n(68),b=n.n(j),h=n(89),g=n.n(h);function O(e){var t="100%",n="100%";return e.peerStreams.length>0&&(t="".concat(100/e.peerStreams.length,"%"),n="".concat(100/e.peerStreams.length,"%")),Object(r.jsxs)("div",{style:{position:"relative",top:0,right:0,marginBottom:25,marginTop:25},children:[Object(r.jsx)("div",{style:{position:"absolute",top:7,right:7},children:Object(r.jsx)(b.a,{url:e.userStream,playing:!0,width:"25%",height:"25%",style:{borderRadius:100}})}),Object(r.jsx)(b.a,{url:e.peerStreams[0],playing:!0,width:t,height:n}),Object(r.jsx)("div",{style:{position:"absolute",bottom:0,right:0,left:0,marginBottom:25},children:e.userStream?Object(r.jsxs)(f.a,{style:{borderRadius:100},variant:"contained",color:"secondary",onClick:function(){e.onDisconnect()},children:[" ",Object(r.jsx)(g.a,{fontSize:"large"})," "]}):null})]})}var v=n(115),m=n(91),x=n.n(m),S=n(92),k=n.n(S),y=n(1);function w(){var e=Object(o.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],u=Object(o.useState)(new p.a),j=Object(l.a)(u,2),b=j[0],h=(j[1],Object(o.useState)("")),g=Object(l.a)(h,2),m=g[0],S=g[1],w=Object(o.useState)(!1),C=Object(l.a)(w,2),E=C[0],D=C[1],T=Object(o.useState)(null),z=Object(l.a)(T,2),N=z[0],U=z[1],P=Object(o.useState)(null),R=Object(l.a)(P,2),B=R[0],L=R[1],M=Object(o.useState)([]),V=Object(l.a)(M,2),A=V[0],F=V[1],H=Object(o.useState)(null),I=Object(l.a)(H,2),J=I[0],_=I[1],G=Object(o.useState)(!1),Y=Object(l.a)(G,2),q=Y[0],K=Y[1],Q=Object(o.useState)(!1),W=Object(l.a)(Q,2),X=(W[0],W[1]);var Z=new URLSearchParams(Object(y.d)().search).get("friend");function $(e){c(e)}function ee(e){e=ce(e),U(e),S(e.peer)}function te(){return ne.apply(this,arguments)}function ne(){return(ne=Object(s.a)(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t={audio:!1,video:{frameRate:{ideal:30,exact:30}}},e.prev=1,!q){e.next=8;break}return e.next=5,navigator.mediaDevices.getDisplayMedia(t);case 5:n=e.sent,e.next=11;break;case 8:return e.next=10,navigator.mediaDevices.getUserMedia(t);case 10:n=e.sent;case 11:return _(n),e.abrupt("return",n);case 15:e.prev=15,e.t0=e.catch(1),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[1,15]])})))).apply(this,arguments)}function re(e){return oe.apply(this,arguments)}function oe(){return(oe=Object(s.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Handling call"),X(!0),S(t.peer),e.next=5,te();case 5:(n=e.sent)&&(_(n),t.answer(n),t=ae(t),L(t));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ce(e){return e.on("open",(function(){console.log("Connected opened with peer: "+e.peer),console.log(J)})),e.on("data",(function(e){console.log(e)})),e.on("close",(function(){var t;console.log("Connection closed."),console.log(J),t=e.peer,null===A||void 0===A||A.forEach((function(e){e.id===t&&(e.getTracks().forEach((function(e){return e.stop()})),e.getVideoTracks().forEach((function(e){return e.stop()})))})),F((function(e){return e.filter((function(e){return e.id!==t}))})),0==A.length&&(console.log("No more peer streams"),ie()),S("")})),e.on("error",(function(e){console.log(e)})),e}function ae(e){return e.on("stream",(function(e){return F((function(t){return[].concat(Object(i.a)(t),[e])}))})),e.on("error",(function(e){return console.log(e)})),e}function ie(){J&&(J.getTracks().forEach((function(e){return e.stop()})),J.getVideoTracks().forEach((function(e){return e.stop()})),console.log("User stream tracks stopped"),_(null)),A&&(A.forEach((function(e){e.getTracks().forEach((function(e){return e.stop()})),e.getVideoTracks().forEach((function(e){return e.stop()}))})),console.log("Peer streams stopped"),L(null),F((function(){return[]}))),_(null)}function se(){var e=b.connect(m);e=ce(e),U(e)}function le(){return ue.apply(this,arguments)}function ue(){return(ue=Object(s.a)(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,te();case 2:(t=e.sent)&&(n=ae(n=b.call(m,t)),L(n),_(t),se());case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Z&&""===m&&S(Z),Object(o.useEffect)((function(){b.on("open",$),b.on("connection",ee),b.on("call",re),console.log("Peer initialized")}),[]);var pe=function(e){K(e.target.checked)};function de(){if(n){var e=window.location.protocol+"//"+window.location.host+"/?friend="+n;navigator.clipboard.writeText("Hey Friend! Give me a call using this link :\n"+e),D(!0)}}return Object(r.jsxs)("div",{children:[A.length>0?null:Object(r.jsxs)("div",{children:[Object(r.jsx)(d.a,{onChange:function(e){return S(e.target.value)},placeholder:"Caller ID"}),Object(r.jsxs)(f.a,{variant:"contained",color:"primary",onClick:le,style:{margin:10},children:[" ",Object(r.jsx)(x.a,{fontSize:"large"})," "]}),Object(r.jsxs)(f.a,{variant:"contained",color:"primary",onClick:de,children:[" ",Object(r.jsx)(k.a,{fontSize:"large"})," "]}),E?Object(r.jsx)("div",{style:{fontSize:15,color:"green"},children:"Link copied to clipboard"}):null,Object(r.jsx)("br",{}),Object(r.jsx)(v.a,{checked:q,onChange:pe,color:"primary",name:"checkedB",inputProps:{"aria-label":"primary checkbox"}})," Share Screen",Object(r.jsxs)("div",{children:["Your Caller ID: "+n,Object(r.jsx)("br",{}),""!==m?"Connecting to: "+m:null]})]}),Object(r.jsx)(O,{peerStreams:A,userStream:J,onDisconnect:function(){null===B||void 0===B||B.close(),null===N||void 0===N||N.close(),L(null),ie(),S("")}})]})}t.default=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)("header",{className:"App-header",children:Object(r.jsx)(w,{})})})}},62:function(e,t,n){},67:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=67}}]);
//# sourceMappingURL=4.30110e64.chunk.js.map