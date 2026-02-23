import{a as q,S as P,i as a}from"./assets/vendor-D8JM3d_r.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const $="54606407-cd906ecd7aeac5d34d8006dc4",R="https://pixabay.com/api/";function p(i,t){const n={key:$,q:i,per_page:15,page:t,image_type:"photo",orientation:"horizontal",safesearch:!0};return q.get(R,{params:n}).then(r=>r.data).catch(r=>{console.error("Error fetching images:",r)})}const m=document.querySelector(".gallery"),g=document.querySelector("#loader"),c=document.querySelector("#load-more-btn"),x=new P(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function h(i){const t=i.map(({webformatURL:n,largeImageURL:r,tags:e,likes:o,views:s,comments:E,downloads:w})=>{const S=e.split(",").slice(0,5).join(", ");return`
                <li class="gallery-item">
                <a href="${r}">
                    <img src="${n}" alt="${S}" loading="lazy" class="gallery-image" />
                </a>
          <div class="image-info">
            <div class="info-item">
              <p class="info-title"><b>❤️ likes:</b></p>
              <p class="info-value">${o}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>👁️ views:</b></p>
              <p class="info-value">${s}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>💬 comments:</b></p>
              <p class="info-value">${E}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>⬇️ downloads:</b></p>
              <p class="info-value">${w}</p>
            </div>
          </div>
            </li>`}).join("");m.insertAdjacentHTML("beforeend",t),x.refresh()}function B(){m.innerHTML=""}function y(){g.hidden=!1}function v(){g.hidden=!0}function b(){c.hidden=!1}function u(){c.hidden=!0}const L=document.querySelector(".form"),f=L.querySelector("input[name='search-text']");let d="",l=0;L.addEventListener("submit",M);c.addEventListener("click",O);u();async function M(i){if(i.preventDefault(),d=f.value.trim(),l=1,!d){a.warning({message:"Please enter a search query.",position:"topRight"});return}B(),y();try{const t=await p(d,l);t.hits.length===0?(a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u()):(h(t.hits),f.value="",b())}catch(t){a.error({message:`Error: ${t.message}`,position:"topRight"})}finally{v()}}async function O(i){l++,c.textContent="Loading...",y();try{const t=await p(d,l);h(t.hits);const n=t.totalHits,r=t.hits.length,e=n/r;b(),l>=e&&(u(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:s,behavior:"smooth"}),console.log()}catch(t){a.error({message:`Error: ${t.message}`,position:"topRight"})}finally{c.textContent="Load more",v()}}
//# sourceMappingURL=index.js.map
