(this["webpackJsonpjamesroberts.github.io"]=this["webpackJsonpjamesroberts.github.io"]||[]).push([[4],{11:function(n,e,o){"use strict";o.r(e);var t=o(1),c=o(0),i=o.p+"static/media/logo.6ce24c58.svg",a=(o(44),o(108)),l=o(45),s=o.n(l);function r(){return Object(t.jsx)(a.a,{variant:"contained",color:"primary",onClick:u,children:" Get "})}function u(){s.a.get("https://jsonplaceholder.typicode.com/todos/1").then((function(n){console.log(n)})).catch((function(n){console.log(n)})).then((function(){}))}var j=o(92),d=o(72),b=o.n(d),f=o(109),g=o(74),O=o.n(g);function h(){var n=Object(c.useState)(""),e=Object(j.a)(n,2),o=e[0],i=e[1],l=Object(c.useState)(new b.a),s=Object(j.a)(l,2),r=s[0],u=(s[1],Object(c.useState)("")),d=Object(j.a)(u,2),g=d[0],h=d[1],p=Object(c.useState)(null),v=Object(j.a)(p,2),m=v[0],x=v[1],C=Object(c.useState)(null),k=Object(j.a)(C,2),w=k[0],y=k[1];return Object(c.useEffect)((function(){r.on("open",(function(n){i(n)})),r.on("connection",(function(n){n.on("data",(function(n){console.log(n)})),n.on("open",(function(){console.log("Connection opened"),console.log("Connected to :"+n.peer)})),x(n),h(n.peer)})),r.on("call",(function(n){h(n.peer),navigator.mediaDevices.getUserMedia({audio:!1,video:!0}).then((function(e){console.log("Answering media stream.."),console.log(e),n.answer(e),n.on("stream",(function(n){y(n)}))})).catch((function(n){console.log(n)}))})),console.log("Peer initialized")}),[r]),Object(t.jsxs)("div",{children:[Object(t.jsx)(f.a,{onChange:function(n){return h(n.target.value)}}),Object(t.jsx)(a.a,{variant:"contained",color:"primary",onClick:function(){m&&m.send("Hello!")},children:" Send "}),Object(t.jsx)(a.a,{variant:"contained",color:"primary",onClick:function(){console.log("Connecting...");var n=r.connect(g);n.on("data",(function(n){console.log(n)})),x(n)},children:" Conect "}),Object(t.jsx)(a.a,{variant:"contained",color:"primary",onClick:function(){console.log("Calling..."),navigator.mediaDevices.getUserMedia({audio:!1,video:!0}).then((function(n){var e=r.call(g,n);x(e)})).catch((function(n){console.log(n)}))},children:" Call "}),Object(t.jsxs)("div",{children:["MY ID: "+o,Object(t.jsx)("br",{}),"Connecting to: "+g]}),Object(t.jsx)("div",{children:Object(t.jsx)(O.a,{url:w,playing:!0})})]})}e.default=function(){return Object(t.jsx)("div",{className:"App",children:Object(t.jsxs)("header",{className:"App-header",children:[Object(t.jsx)("img",{src:i,className:"App-logo",alt:"logo"}),Object(t.jsx)("p",{children:" Hello James "}),Object(t.jsx)(r,{}),Object(t.jsx)(h,{})]})})}},44:function(n,e,o){},73:function(n,e){function o(n){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}o.keys=function(){return[]},o.resolve=o,n.exports=o,o.id=73}}]);
//# sourceMappingURL=4.dbb5a801.chunk.js.map