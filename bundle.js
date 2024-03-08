(()=>{var t={223:t=>{const e=document.getElementById("benchmark-results"),r=document.getElementById("restart"),n=document.getElementById("loader"),o="hidden";function a(t){e.innerText+=`${t}\n`}t.exports={clear:function(){e.innerText=""},print:a,printArray:function(t,e){a(`${t} = [${e.slice(0,10).map(Number).join(", ")}, ...]`)},printCalculationTime:function(t){a(`Calculation time: ${t} ms\n`)},restartButton:r,showStart:function(){r.disabled=!0,n.classList.remove(o)},showEnd:function(){r.disabled=!1,n.classList.add(o)}}},736:t=>{t.exports={generateInput:function(t,e){const r=[];for(let n=0;n<e;n++)r.push(Math.floor(Math.random()*t)+1);return r},factorial:function(t){let e=1n;for(let r=2n;r<=t;r++)e*=r;return e}}},237:t=>{const e={onError:()=>{},numberOfWorkers:(globalThis.navigator||navigator).hardwareConcurrency||4,ArrayConstructor:Array};function r(t,r,{onError:n=e.onError,numberOfWorkers:o=e.numberOfWorkers,ArrayConstructor:a=e.ArrayConstructor}=e){let s,i,c=[];this.threads=o,this.working=!1;const l=()=>{s=0,i=[]},u=()=>{let t,e=0;for(let t=0;t<this.threads;t++)e+=i[t].length;let n=0;if(a===Array)t=[].concat(...i);else{t=new a(e);for(let e=0;e<this.threads;e++){const r=i[e];t.set(r,n),n+=r.length}}r(t),l()};this.terminate=()=>(c.forEach((t=>{t.terminate()})),c=[],this.working=!1,this);const h=t=>({data:e})=>{i[t]=e,s+=1,s===this.threads&&(this.working=!1,u())},d=t=>{this.terminate(),l(),n(t)},f=()=>{for(let e=0;e<this.threads;e++)c[e]=new t,c[e].addEventListener("message",h(e)),c[e].addEventListener("error",d)};this.start=(t,e)=>{if(this.working)return n("Workers have already started!"),this;this.working=!0;let r=e%this.threads;const o=(e-r)/this.threads;l(),c.length||f();for(let e=0;e<this.threads;e++){const n=r+o;if(!c[e])break;c[e].postMessage({...t,from:0===e?0:r,to:n}),r=n}return this}}r.DEFAULTS=e,t.exports=r},574:(t,e,r)=>{"use strict";function n(){return new Worker(r.p+"bundle.worker.js")}r.d(e,{A:()=>n})},672:(t,e,r)=>{const n=r(237);t.exports=(t,e,r,o)=>new Promise((a=>{const s=new n(t,(t=>{s.terminate(),a(t)}),o);s.start(e,r)}))}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.p="",(()=>{const{clear:t,print:e,printArray:n,printCalculationTime:o,restartButton:a,showStart:s,showEnd:i}=r(223),{generateInput:c,factorial:l}=r(736),u=r(672),{DEFAULTS:h}=r(237),d=r(574).A,f=t=>new Promise((e=>{setTimeout(e,t)}));function m(){s(),t(),e(`There'll be ${5e4.toLocaleString("en-US")} numbers in range 1–${300..toLocaleString("en-US")} in the original array. It will be calculated in BigNum and converted to Number for display.\n`),async function(){await f(0);let t=new Date;const r=c(300,5e4);n("input",r),e(`Generation time: ${new Date-t} ms\n`),await f(700),t=new Date;const a=r.map(l),s=new Date-t;n("synchronous factorials calculating",a),o(s),await f(700),t=new Date,e(`Start ${h.numberOfWorkers} workers`);const m=await u(d,{input:r},r.length),w=new Date-t;n("web workers factorials calculating",m),o(w);const p=Math.round(s/w*10)/10;e(`Parallel calculations were ~${p} times faster.`),i()}()}a.addEventListener("click",m),m()})()})();