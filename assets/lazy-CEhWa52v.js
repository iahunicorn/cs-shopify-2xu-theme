const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./-KWFP7TC7-CR2kcSzk.js","./cart-DKxWLRSb.js","./index-CZL3JN3d.js","./custom-media-element-BTc9lN-c.js"])))=>i.map(i=>d[i]);
import{x as e,_ as p,h as i,y as d,D as u}from"./cart-DKxWLRSb.js";var m=({condition:r,fallback:l,children:o,...a})=>r?e.createElement(u,{fallback:l,...a},o):e.createElement(e.Fragment,null,l),y=m,b=()=>{let[r,l]=i(!1);return d(()=>{typeof window<"u"&&l(!0)},[]),r},v=b,f=(r,l)=>{let[o,a]=i(!1);return d(()=>{if(typeof IntersectionObserver=="function"){let t=new IntersectionObserver(([n])=>{a(n.isIntersecting)},l);return r.current&&t.observe(r.current),()=>{t.disconnect()}}},[r,l]),o},E=f,g=e.lazy(()=>p(()=>import("./-KWFP7TC7-CR2kcSzk.js"),__vite__mapDeps([0,1,2,3]),import.meta.url)),h=r=>{let{style:l,className:o,onIntersection:a,placeholder:t}=r,n=e.useRef(null),c=E(n);return d(()=>{c&&a&&a()},[c,a]),e.createElement(e.Fragment,null,e.createElement("mux-player",{ref:n,"data-mux-player-react-lazy-placeholder":!0,placeholder:t??"",style:{"--mux-player-react-lazy-placeholder":t?`url('${t}');`:"",...l},className:o||"",nohotkeys:!0,"aria-hidden":!0,tabIndex:-1},e.createElement("div",{"data-mux-player-react-lazy-placeholder-overlay":!0})),e.createElement("style",null,`
        mux-player[data-mux-player-react-lazy-placeholder] {
          aspect-ratio: 16/9;
          display: block;
          background-color: var(--media-background-color, #000);
          width: 100%;
          position: relative;
          background-image: var(--mux-player-react-lazy-placeholder);
          background-repeat: no-repeat;
          background-size: var(--media-object-fit, contain);
          background-position: var(--media-object-position, 50% 50%);
          --controls: none;
          --controls-backdrop-color: rgba(0, 0, 0, 0.6);
        }
        mux-player [data-mux-player-react-lazy-placeholder-overlay] {
          position: absolute;
          inset: 0;
          background-color: var(--controls-backdrop-color);
        }
      `))},s={PAGE:"page",VIEWPORT:"viewport"},k=e.forwardRef((r,l)=>{let{loading:o=s.VIEWPORT,...a}=r,t=v(),[n,c]=i(()=>o!==s.VIEWPORT);return e.createElement(y,{condition:t&&n,fallback:e.createElement(h,{style:a.style,className:a.className,placeholder:a.placeholder,onIntersection:()=>c(!0)})},e.createElement(g,{...a,ref:l}))}),I=k;export{I as default};
