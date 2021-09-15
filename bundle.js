(()=>{var t={362:t=>{const e=document.getElementById("benchmark-results"),r=document.getElementById("restart"),n=document.getElementById("loader"),a="hidden";function o(t){e.innerText+=`${t}\n`}t.exports={clear:function(){e.innerText=""},print:o,printArray:function(t,e){o(`${t} = [${e.slice(0,10).map(Number).join(", ")}, ...]`)},printCalculationTime:function(t){o(`Calculation time: ${t} ms\n`)},restartButton:r,showStart:function(){r.disabled=!0,n.classList.remove(a)},showEnd:function(){r.disabled=!1,n.classList.add(a)}}},759:t=>{t.exports={generateInput:function(t,e){const r=[];for(let n=0;n<e;n++)r.push(Math.floor(Math.random()*t)+1);return r},factorial:function(t){let e=1n;for(let r=2n;r<=t;r++)e*=r;return e}}},10:t=>{const e={handleError:console.error,numberOfWorkers:(globalThis.navigator||navigator).hardwareConcurrency||4,ArrayConstructor:Array};function r(t,r,{handleError:n=e.handleError,numberOfWorkers:a=e.numberOfWorkers,ArrayConstructor:o=e.ArrayConstructor}=e){let s,i,c=[];function l(){s=0,i=[]}this.threads=a;const u=()=>{let t,e=0;for(let t=0;t<this.threads;t++)e+=i[t].length;let n=0;if(o===Array)t=[].concat(...i);else{t=new o(e);for(let e=0;e<this.threads;e++){const r=i[e];t.set(r,n),n+=r.length}}r(t),l()},d=t=>({data:e})=>{i[t]=e,s+=1,s===this.threads&&u()};this.terminate=()=>(c.forEach((t=>{t.terminate()})),c=[],this);const h=t=>{this.terminate(),l(),n(t)},f=()=>{for(let e=0;e<this.threads;e++)c[e]=new t,c[e].addEventListener("message",d(e)),c[e].addEventListener("error",h)};this.start=(t,e)=>{let r=e%this.threads;const n=(e-r)/this.threads;l(),c.length||f();for(let e=0;e<this.threads;e++){const a=r+n;if(!c[e])break;c[e].postMessage({...t,from:0===e?0:r,to:a}),r=a}return this}}r.DEFAULTS=e,t.exports=r},628:(t,e,r)=>{"use strict";function n(){return new Worker(r.p+"bundle.worker.js")}r.d(e,{Z:()=>n})},995:(t,e,r)=>{const n=r(10);t.exports=(t,e,r,a)=>new Promise((o=>{const s=new n(t,(t=>{s.terminate(),o(t)}),a);s.start(e,r)}))}},e={};function r(n){var a=e[n];if(void 0!==a)return a.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.p="",(()=>{const{clear:t,print:e,printArray:n,printCalculationTime:a,restartButton:o,showStart:s,showEnd:i}=r(362),{generateInput:c,factorial:l}=r(759),u=r(995),{DEFAULTS:d}=r(10),h=r(628).Z,f=t=>new Promise((e=>{setTimeout(e,t)}));function m(){s(),t(),e(`There'll be ${5e4.toLocaleString("en-US")} numbers in range 1–${300..toLocaleString("en-US")} in the original array. It will be calculated in BigNum and converted to Number for display.\n`),async function(){await f(0);let t=new Date;const r=c(300,5e4);n("input",r),e(`Generation time: ${new Date-t} ms\n`),await f(700),t=new Date;const o=r.map(l),s=new Date-t;n("synchronous factorials calculating",o),a(s),await f(700),t=new Date,e(`Start ${d.numberOfWorkers} workers`);const m=await u(h,{input:r},r.length),p=new Date-t;n("web workers factorials calculating",m),a(p);const w=Math.round(s/p*10)/10;e(`Parallel calculations were ~${w} times faster.`),i()}()}o.addEventListener("click",m),m()})()})();