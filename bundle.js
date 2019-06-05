!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){n(1),t.exports=n(6)},function(t,e,n){const{startQueue:r,clear:o,print:i,printArray:s,printCalculationTime:a,restartButton:c,showStart:u,showEnd:l}=n(2),{generateInput:f,isSimple:d}=n(3),h=n(4),m=n(5),p=1e5,y=1e5;function g(){u(),o(),i(`There'll be ${y.toLocaleString("en-US")} numbers in range 1–${p.toLocaleString("en-US")} in the original array.\n`),r(t=>{const e=new Date,n=f(p,y);s("input",n),i(`Generation time: ${new Date-e} ms\n`),t(n)},(t,e)=>{const n=new Date,r=e.map(d),o=new Date-n;s("synchronous simplicity checking",r),a(o),t({input:e,syncTime:o})},(t,{input:e,syncTime:n})=>{const r=new Date,o=new h(m,e=>{t({result:e,syncTime:n,start:r})});o.start({input:e},e.length),i(`Start ${o.threads} workers.`)},(t,{result:e,syncTime:n,start:r})=>{const o=new Date-r;s("web workers simplicity checking",e),a(o);const c=Math.round(n/o*10)/10;i(`Parallel calculations were ~${c} times faster.`),l()})}c.addEventListener("click",g),g()},function(t,e){const n=10,r=document.getElementById("benchmark-results"),o=document.getElementById("restart"),i=document.getElementById("loader"),s="hidden";function a(t){r.innerText+=`${t}\n`}t.exports={startQueue:function(...t){const e=[];t.forEach((t,n)=>{e[n]=r=>{setTimeout(()=>{t(n===arguments.length-1?()=>void 0:t=>{e[n+1](t)},r)})}}),e[0]()},clear:function(){r.innerText=""},print:a,printArray:function(t,e){a(`${t} = [${e.slice(0,n).join(", ")}, ...]`)},printCalculationTime:function(t){a(`Calculation time: ${t} ms\n`)},restartButton:o,showStart:function(){o.disabled=!0,i.classList.remove(s)},showEnd:function(){o.disabled=!1,i.classList.add(s)}}},function(t,e){t.exports={generateInput:function(t,e){const n=[];for(let r=0;r<e;r++)n.push(Math.floor(Math.random()*t)+1);return n},isSimple:function(t){for(let e=2;e<=t;e++)if(!(t%e))return!1;return!0}}},function(t,e){const n={handleError:console.error,numberOfWorkers:navigator.hardwareConcurrency,ArrayConstructor:Array};t.exports=function(t,e,{handleError:r=n.handleError,numberOfWorkers:o=n.numberOfWorkers,ArrayConstructor:i=n.ArrayConstructor}=n){let s,a,c=[];function u(){s=0,a=[]}this.threads=o;const l=()=>{let t=0;for(let e=0;e<this.threads;e++)t+=a[e].length;let n=0,r=i===Array?[]:new i(t);for(let t=0;t<this.threads;t++)r.concat?r=r.concat(a[t]):r.set(a[t],n),n+=a[t].length;e(r),u()},f=t=>({data:e})=>{a[t]=e,(s+=1)===this.threads&&l()};this.terminate=()=>(c.forEach(t=>{t.terminate()}),c=[],this);const d=t=>{this.terminate(),u(),r(t)},h=()=>{for(let e=0;e<this.threads;e++)c[e]=new t,c[e].addEventListener("message",f(e)),c[e].addEventListener("error",d)};this.start=(t,e)=>{let n=e%this.threads;const r=(e-n)/this.threads;u(),c.length||h();for(let e=0;e<this.threads;e++){const o=n+r;c[e].postMessage({...t,from:0===e?0:n,to:o}),n=o}return this}}},function(t,e,n){t.exports=function(){return new Worker(n.p+"5af2c8ff1179ccbbaf92.worker.js")}},function(t,e,n){}]);