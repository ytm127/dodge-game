(this["webpackJsonpdodge-game"]=this["webpackJsonpdodge-game"]||[]).push([[0],{39:function(e,t,n){e.exports=n(83)},44:function(e,t,n){},65:function(e,t){},67:function(e,t){},82:function(e,t,n){},83:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),i=n(38),a=n.n(i),c=(n(44),r.a.createContext(),n(2));function l(e){var t=Object(o.useState)(!1),n=Object(c.a)(t,2),r=n[0],i=n[1];function a(t){t.key===e&&i(!0)}var l=function(t){t.key===e&&i(!1)};return Object(o.useEffect)((function(){return window.addEventListener("keydown",a),window.addEventListener("keyup",l),function(){window.removeEventListener("keydown",a),window.removeEventListener("keyup",l)}}),[]),r}var u=function(e,t,n){"left"===e&&n({top:t.top,left:t.left-40}),"right"===e&&n({top:t.top,left:t.left+40}),"up"===e&&n({top:t.top-40,left:t.left}),"down"===e&&n({top:t.top+40,left:t.left})},f=["up","right","down","left"],s=function(){return f[Math.floor(Math.random()*Math.floor(3))]},d=function(e){var t=e.playerPosition,n=e.collisionHappened;return r.a.createElement("div",{style:{width:40,height:40,background:n?"#e8eb34":"grey",position:"absolute",top:t.top,left:t.left,transition:"all 0.1s ease",zIndex:3,borderRadius:2}})},p=function(e){var t=e.pos;return r.a.createElement("div",{style:{width:40,height:40,background:"#eb4034",position:"absolute",top:t&&t.top,left:t&&t.left,zIndex:1,transition:"all 0.1s linear",overflow:"hidden",display:t&&"outOfView"===t.direction?"none":"",borderRadius:2}})},h=n(17),m=n.n(h),b=new m.a.Client({secret:"fnADxzwD3yACEtY2k9ayOVyOAugajEmdPXEGv8F-"}),g=m.a.query,v=(n(81),function(){var e={top:200,left:200},t=Object(o.useRef)(null),n=Object(o.useState)(e),i=Object(c.a)(n,2),a=i[0],f=i[1],h=Object(o.useState)([]),m=Object(c.a)(h,2),v=m[0],w=m[1],E=Object(o.useState)(0),y=Object(c.a)(E,2),O=y[0],j=y[1],k=Object(o.useState)(10),S=Object(c.a)(k,2),A=S[0],T=S[1],x=Object(o.useState)(0),z=Object(c.a)(x,2),L=z[0],B=z[1],C=Object(o.useState)(!1),M=Object(c.a)(C,2),H=M[0],I=M[1],R=Object(o.useState)(0),q=Object(c.a)(R,2),P=q[0],V=q[1],D=Object(o.useState)(null),G=Object(c.a)(D,2),W=G[0],J=G[1],U=l("ArrowLeft"),Y=l("ArrowRight"),F=l("ArrowUp"),N=l("ArrowDown"),X=function(){b.query(g.Paginate(g.Match(g.Ref("indexes/getAllHighscores")))).then((function(e){var t=e.data.map((function(e){return g.Get(e)}));return b.query(t).then((function(e){return e}))})).catch((function(e){return console.error("Error: ",e.message)})).then((function(e){var t=e.map((function(e){return{name:e.data.name,score:e.data.score}})),n={name:null,score:0};t.forEach((function(e){e.score>n.score&&(n.name=e.name,n.score=e.score)})),J(n)}))};Object(o.useEffect)((function(){X()}),[]),Object(o.useEffect)((function(){var t=setTimeout((function(){var e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"up"===e?{top:440+t,left:a.left,direction:e}:"right"===e?{top:a.top,left:-40-t,direction:e}:"down"===e?{top:-40-t,left:a.left,direction:e}:"left"===e?{top:a.top,left:440+t,direction:e}:void 0},t=v&&v.map((function(e){return"outOfView"===e.direction?{}:{top:"down"===e.direction?e.top+A:"up"===e.direction?e.top-A:e.top,left:"left"===e.direction?e.left-A:"right"===e.direction?e.left+A:e.left,direction:e.top>560||e.top<-160||e.left<-160||e.left>560?"outOfView":e.direction}}));if(j(O+1),O<=100&&15!==A&&T(15),150===O&&T(20),200===O&&T(25),250===O&&T(30),350===O&&T(35),400===O&&T(40),O%15===0&&O>20)if(O>100&&O%30===0){var n=e(s()),o=e(s(),119);w(t.concat(n).concat(o))}else{var r=e(s());w(t.concat(r))}else w(t)}),80);1e4===O&&(alert("YOU BEAT THE GAME"),clearTimeout(t)),H&&(clearTimeout(t),setTimeout((function(){j(0),B(null),f(e),w([]),I(!1)}),1e3))}),[v]),Object(o.useEffect)((function(){!L&&B(0);var e=setTimeout((function(){B(L+1)}),100);H&&(clearTimeout(e),(0===P||L>P)&&V(L))}),[L]),Object(o.useEffect)((function(){!O&&j(0)}),[O]),Object(o.useEffect)((function(){U&&u("left",a,f),Y&&u("right",a,f),F&&u("up",a,f),N&&u("down",a,f)}),[U,F,Y,N]),Object(o.useEffect)((function(){var e,t;e=a,t=I,v.forEach((function(n){e.left<n.left+40&&e.top<n.top+40&&e.left+40>n.left&&e.top+40>n.top&&(console.log("collision!"),t(!0))}))}),[a,v]);return r.a.createElement("div",null,r.a.createElement(d,{playerPosition:a,collisionHappened:H}),r.a.createElement("div",{style:{background:"lightgrey",height:400,width:400,paddingLeft:0,border:"black solid thin"}}),r.a.createElement("div",{style:{background:"white",zIndex:2,position:"absolute",left:400,top:0,height:400,width:300,paddingLeft:0,paddingTop:20}},"Best global score: ",r.a.createElement("div",{style:{fontWeight:"bold"}},W&&"".concat(W.name," : ").concat(W.score))),v.map((function(e,t){return r.a.createElement(p,{pos:e,key:t})})),r.a.createElement("div",{style:{position:"absolute",width:400,background:"white",zIndex:2,margin:0,fontSize:30}},r.a.createElement("div",{style:{transition:"all 0.1s linear",height:30,color:"grey",fontSize:20}},L),r.a.createElement("div",{style:{transition:"all 0.1s linear",height:50}},"Session Best: ",P),r.a.createElement("div",{style:{transition:"all 0.1s linear",height:150}},r.a.createElement("input",{type:"input",ref:t,style:{marginBottom:20}}),r.a.createElement("button",{type:"button",onClick:function(){(function(e,t){return b.query(g.Create(g.Collection("Highscore"),{data:{name:e,score:t}})).then((function(e){return e})).catch((function(e){return console.error("Error: ",e.message)}))})(t.current.value,P).then((function(e){return X()}))}},"Save score"))))});n(82);var w=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.6cc8e64d.chunk.js.map