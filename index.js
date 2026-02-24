import{a as P,S as R,i as n}from"./assets/vendor-D8JM3d_r.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const $="54606407-cd906ecd7aeac5d34d8006dc4",M="https://pixabay.com/api/",u=15;async function h(r,t){const s={key:$,q:r,per_page:u,page:t,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await P(M,{params:s})).data}catch(i){throw i}}const m=document.querySelector(".gallery"),y=document.querySelector("#loader"),f=document.querySelector("#load-more-btn"),B=new R(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function g(r){const t=r.map(({webformatURL:s,largeImageURL:i,tags:e,likes:o,views:c,comments:E,downloads:S})=>{const q=e.split(",").slice(0,5).join(", ");return`
                <li class="gallery-item">
                <a href="${i}">
                    <img src="${s}" alt="${q}" loading="lazy" class="gallery-image" />
                </a>
          <div class="image-info">
            <div class="info-item">
              <p class="info-title"><b>❤️ likes:</b></p>
              <p class="info-value">${o}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>👁️ views:</b></p>
              <p class="info-value">${c}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>💬 comments:</b></p>
              <p class="info-value">${E}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>⬇️ downloads:</b></p>
              <p class="info-value">${S}</p>
            </div>
          </div>
            </li>`}).join("");m.insertAdjacentHTML("beforeend",t),B.refresh()}function O(){m.innerHTML=""}function v(){y.hidden=!1}function b(){y.hidden=!0}function L(){f.hidden=!1}function a(){f.hidden=!0}const w=document.querySelector(".form"),p=w.querySelector("input[name='search-text']");let d="",l=1;w.addEventListener("submit",x);f.addEventListener("click",A);a();async function x(r){if(r.preventDefault(),d=p.value.trim(),l=1,!d){n.warning({message:"Please enter a search query.",position:"topRight"});return}O(),a(),v();try{const t=await h(d,l);t.hits.length===0?(n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a()):(g(t.hits),p.value="",t.totalHits<=u?(n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a()):L())}catch(t){n.error({message:`Error: ${t.message}`,position:"topRight"}),a()}finally{b()}}async function A(){l++,v(),a();try{const r=await h(d,l);g(r.hits);const t=r.totalHits,s=Math.ceil(t/u);l>=s?(n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a()):L();const i=document.querySelector(".gallery-item");if(i){const e=i.getBoundingClientRect().height;window.scrollBy({left:0,top:e*2,behavior:"smooth"})}}catch(r){n.error({message:`Error: ${r.message}`,position:"topRight"})}finally{b()}}
//# sourceMappingURL=index.js.map
