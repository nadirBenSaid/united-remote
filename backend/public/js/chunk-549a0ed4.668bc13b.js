(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-549a0ed4"],{"218e":function(e,t,a){"use strict";var n=a("350d"),r=a.n(n);r.a},"2fef":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("mdb-row",{staticClass:"justify-content-center"},[a("mdb-col",{attrs:{sm:"4"}},[a("mdb-card",[a("mdb-card-body",[a("form",{attrs:{novalidate:""},on:{submit:function(t){return t.preventDefault(),e.checkSignupForm(t)}}},[a("p",{staticClass:"h4 text-center py-4"},[e._v("Sign up")]),a("div",{staticClass:"grey-text"},[a("mdb-input",{attrs:{label:"Your name",invalidFeedback:"Please enter your name",type:"text",error:"wrong",success:"right",required:""},model:{value:e.signupData.name,callback:function(t){e.$set(e.signupData,"name",t)},expression:"signupData.name"}}),a("mdb-input",{attrs:{label:"Your email",invalidFeedback:"Please enter a valid email",type:"email",required:""},model:{value:e.signupData.email,callback:function(t){e.$set(e.signupData,"email",t)},expression:"signupData.email"}}),a("mdb-input",{attrs:{label:"Your password",invalidFeedback:"Please enter a password",type:"password",required:""},model:{value:e.signupData.password,callback:function(t){e.$set(e.signupData,"password",t)},expression:"signupData.password"}})],1),a("div",{staticClass:"text-center py-4 mt-3"},[a("mdb-btn",{attrs:{color:"cyan"}},[e._v("Register")])],1)])])],1)],1),a("mdb-col",{attrs:{sm:"1"}}),a("mdb-col",{attrs:{sm:"4"}},[a("mdb-card",[a("mdb-card-body",[a("form",{attrs:{novalidate:""},on:{submit:function(t){return t.preventDefault(),e.checkLoginForm(t)}}},[a("p",{staticClass:"h4 text-center py-4"},[e._v("Sign in")]),a("div",{staticClass:"grey-text"},[a("mdb-input",{attrs:{invalidFeedback:"Please enter a valid email",label:"Your email",type:"email",required:""},model:{value:e.loginData.email,callback:function(t){e.$set(e.loginData,"email",t)},expression:"loginData.email"}}),a("mdb-input",{attrs:{label:"Your password",type:"password",invalidFeedback:"Please enter a password",required:""},model:{value:e.loginData.password,callback:function(t){e.$set(e.loginData,"password",t)},expression:"loginData.password"}})],1),a("div",{staticClass:"text-center py-4 mt-3"},[a("mdb-btn",[e._v("Login")])],1)])])],1)],1)],1)},r=[],s=(a("a4d3"),a("4de4"),a("4160"),a("1d1c"),a("7a82"),a("e439"),a("dbb4"),a("b64b"),a("159b"),a("2fa7")),i=a("91c9"),o=a("2f62");function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(Object(a),!0).forEach((function(t){Object(s["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var l={name:"Auth",components:{mdbInput:i["mdbInput"],mdbBtn:i["mdbBtn"],mdbCard:i["mdbCard"],mdbCardBody:i["mdbCardBody"],mdbRow:i["mdbRow"],mdbCol:i["mdbCol"]},data:function(){return{loginData:{email:"",password:""},signupData:{name:"",email:"",password:""}}},methods:c({},Object(o["b"])(["login","signup"]),{checkLoginForm:function(e){e.target.classList.add("was-validated"),this.login(this.loginData)},checkSignupForm:function(e){e.target.classList.add("was-validated"),this.signup(this.signupData)}}),computed:c({},Object(o["c"])(["getToken"]))},u=l,p=(a("218e"),a("2877")),b=Object(p["a"])(u,n,r,!1,null,"7fc00a59",null);t["default"]=b.exports},"350d":function(e,t,a){}}]);
//# sourceMappingURL=chunk-549a0ed4.668bc13b.js.map