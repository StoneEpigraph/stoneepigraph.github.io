(()=>{(()=>{var $e="https://stoneepigraph.github.io/index.json",Ze=new Intl.Collator("en",{numeric:!0,sensitivity:"base"}).compare,Ie=1/0,Re=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Me="eexxaacctt",Pe=/\p{P}/gu,He="A-Z",Ue="a-z",fe=(e,s,p)=>e.replace(He,s).replace(Ue,p),Be={unicode:!1,alpha:null,interSplit:"[^A-Za-z\\d']+",intraSplit:"[a-z][A-Z]",interBound:"[^A-Za-z\\d]",intraBound:"[A-Za-z]\\d|\\d[A-Za-z]|[a-z][A-Z]",interLft:0,interRgt:0,interChars:".",interIns:Ie,intraChars:"[a-z\\d']",intraIns:null,intraContr:"'[a-z]{1,2}\\b",intraMode:0,intraSlice:[1,Ie],intraSub:null,intraTrn:null,intraDel:null,intraFilt:(e,s,p)=>!0,sort:(e,s,p)=>{let{idx:r,chars:l,terms:o,interLft2:E,interLft1:$,start:ne,intraIns:W,interIns:V}=e;return r.map((B,S)=>S).sort((B,S)=>l[S]-l[B]||W[B]-W[S]||o[S]+E[S]+.5*$[S]-(o[B]+E[B]+.5*$[B])||V[B]-V[S]||ne[B]-ne[S]||Ze(s[r[B]],s[r[S]]))}},ve=(e,s)=>s==0?"":s==1?e+"??":s==Ie?e+"*?":e+`{0,${s}}?`,De="(?:\\b|_)";function Ee(e){e=Object.assign({},Be,e);let{unicode:s,interLft:p,interRgt:r,intraMode:l,intraSlice:o,intraIns:E,intraSub:$,intraTrn:ne,intraDel:W,intraContr:V,intraSplit:B,interSplit:S,intraBound:ce,interBound:de,intraChars:le}=e;E??=l,$??=l,ne??=l,W??=l;let M=e.letters??e.alpha;if(M!=null){let t=M.toLocaleUpperCase(),a=M.toLocaleLowerCase();S=fe(S,t,a),B=fe(B,t,a),de=fe(de,t,a),ce=fe(ce,t,a),le=fe(le,t,a),V=fe(V,t,a)}let c=s?"u":"",h='".+?"',y=new RegExp(h,"gi"+c),U=new RegExp(`(?:\\s+|^)-(?:${le}+|${h})`,"gi"+c),{intraRules:Z}=e;Z==null&&(Z=t=>{let a=Be.intraSlice,d=0,f=0,x=0,u=0;if(/[^\d]/.test(t)){let m=t.length;m<=4?m>=3&&(x=Math.min(ne,1),m==4&&(d=Math.min(E,1))):(a=o,d=E,f=$,x=ne,u=W)}return{intraSlice:a,intraIns:d,intraSub:f,intraTrn:x,intraDel:u}});let z=!!B,j=new RegExp(B,"g"+c),q=new RegExp(S,"g"+c),J=new RegExp("^"+S+"|"+S+"$","g"+c),he=new RegExp(V,"gi"+c),G=t=>{let a=[];t=t.replace(y,f=>(a.push(f),Me)),t=t.replace(J,"").toLocaleLowerCase(),z&&(t=t.replace(j,f=>f[0]+" "+f[1]));let d=0;return t.split(q).filter(f=>f!="").map(f=>f===Me?a[d++]:f)},Ce=/[^\d]+|\d+/g,we=(t,a=0,d=!1)=>{let f=G(t);if(f.length==0)return[];let x=Array(f.length).fill("");f=f.map((C,g)=>C.replace(he,F=>(x[g]=F,"")));let u;if(l==1)u=f.map((C,g)=>{if(C[0]==='"')return Re(C.slice(1,-1));let F="";for(let I of C.matchAll(Ce)){let i=I[0],{intraSlice:n,intraIns:v,intraSub:L,intraTrn:R,intraDel:w}=Z(i);if(v+L+R+w==0)F+=i+x[g];else{let[N,ge]=n,Q=i.slice(0,N),se=i.slice(ge),D=i.slice(N,ge);v==1&&Q.length==1&&Q!=D[0]&&(Q+="(?!"+Q+")");let ae=D.length,re=[i];if(L)for(let _=0;_<ae;_++)re.push(Q+D.slice(0,_)+le+D.slice(_+1)+se);if(R)for(let _=0;_<ae-1;_++)D[_]!=D[_+1]&&re.push(Q+D.slice(0,_)+D[_+1]+D[_]+D.slice(_+2)+se);if(w)for(let _=0;_<ae;_++)re.push(Q+D.slice(0,_+1)+"?"+D.slice(_+1)+se);if(v){let _=ve(le,1);for(let X=0;X<ae;X++)re.push(Q+D.slice(0,X)+_+D.slice(X)+se)}F+="(?:"+re.join("|")+")"+x[g]}}return F});else{let C=ve(le,E);a==2&&E>0&&(C=")("+C+")("),u=f.map((g,F)=>g[0]==='"'?Re(g.slice(1,-1)):g.split("").map((I,i,n)=>(E==1&&i==0&&n.length>1&&I!=n[i+1]&&(I+="(?!"+I+")"),I)).join(C)+x[F])}let m=p==2?De:"",O=r==2?De:"",Y=O+ve(e.interChars,e.interIns)+m;return a>0?d?u=m+"("+u.join(")"+O+"|"+m+"(")+")"+O:(u="("+u.join(")("+Y+")(")+")",u="(.??"+m+")"+u+"("+O+".*)"):(u=u.join(Y),u=m+u+O),[new RegExp(u,"i"+c),f,x]},Le=(t,a,d)=>{let[f]=we(a);if(f==null)return null;let x=[];if(d!=null)for(let u=0;u<d.length;u++){let m=d[u];f.test(t[m])&&x.push(m)}else for(let u=0;u<t.length;u++)f.test(t[u])&&x.push(u);return x},je=!!ce,Ae=new RegExp(de,c),Te=new RegExp(ce,c),ze=(t,a,d)=>{let[f,x,u]=we(d,1),[m]=we(d,2),O=x.length,Y=t.length,C=Array(Y).fill(0),g={idx:Array(Y),start:C.slice(),chars:C.slice(),terms:C.slice(),interIns:C.slice(),intraIns:C.slice(),interLft2:C.slice(),interRgt2:C.slice(),interLft1:C.slice(),interRgt1:C.slice(),ranges:Array(Y)},F=p==1||r==1,I=0;for(let i=0;i<t.length;i++){let n=a[t[i]],v=n.match(f),L=v.index+v[1].length,R=L,w=!1,N=0,ge=0,Q=0,se=0,D=0,ae=0,re=0,_=0,X=[];for(let A=0,b=2;A<O;A++,b+=2){let ie=v[b].toLocaleLowerCase(),K=x[A],ee=K[0]=='"'?K.slice(1,-1):K+u[A],P=ee.length,H=ie.length,k=ie==ee;if(!k&&v[b+1].length>=P){let T=v[b+1].toLocaleLowerCase().indexOf(ee);T>-1&&(X.push(R,H,T,P),R+=Se(v,b,T,P),ie=ee,H=P,k=!0,A==0&&(L=R))}if(F||k){let T=R-1,te=R+H,ue=!1,me=!1;if(T==-1||Ae.test(n[T]))k&&N++,ue=!0;else{if(p==2){w=!0;break}if(je&&Te.test(n[T]+n[T+1]))k&&ge++,ue=!0;else if(p==1){let _e=v[b+1],pe=R+H;if(_e.length>=P){let oe=0,xe=!1,Je=new RegExp(ee,"ig"+c),Fe;for(;Fe=Je.exec(_e);){oe=Fe.index;let ke=pe+oe,be=ke-1;if(be==-1||Ae.test(n[be])){N++,xe=!0;break}else if(Te.test(n[be]+n[ke])){ge++,xe=!0;break}}xe&&(ue=!0,X.push(R,H,oe,P),R+=Se(v,b,oe,P),ie=ee,H=P,k=!0,A==0&&(L=R))}if(!ue){w=!0;break}}}if(te==n.length||Ae.test(n[te]))k&&Q++,me=!0;else{if(r==2){w=!0;break}if(je&&Te.test(n[te-1]+n[te]))k&&se++,me=!0;else if(r==1){w=!0;break}}k&&(D+=P,ue&&me&&ae++)}if(H>P&&(_+=H-P),A>0&&(re+=v[b-1].length),!e.intraFilt(ee,ie,R)){w=!0;break}A<O-1&&(R+=H+v[b+1].length)}if(!w){g.idx[I]=t[i],g.interLft2[I]=N,g.interLft1[I]=ge,g.interRgt2[I]=Q,g.interRgt1[I]=se,g.chars[I]=D,g.terms[I]=ae,g.interIns[I]=re,g.intraIns[I]=_,g.start[I]=L;let A=n.match(m),b=A.index+A[1].length,ie=X.length,K=ie>0?0:1/0,ee=ie-4;for(let T=2;T<A.length;){let te=A[T].length;if(K<=ee&&X[K]==b){let ue=X[K+1],me=X[K+2],_e=X[K+3],pe=T,oe="";for(let xe=0;xe<ue;pe++)oe+=A[pe],xe+=A[pe].length;A.splice(T,pe-T,oe),b+=Se(A,T,me,_e),K+=4}else b+=te,T++}b=A.index+A[1].length;let P=g.ranges[I]=[],H=b,k=b;for(let T=2;T<A.length;T++){let te=A[T].length;b+=te,T%2==0?k=b:te>0&&(P.push(H,k),H=k=b)}k>H&&P.push(H,k),I++}}if(I<t.length)for(let i in g)g[i]=g[i].slice(0,I);return g},Se=(t,a,d,f)=>{let x=t[a]+t[a+1].slice(0,d);return t[a-1]+=x,t[a]=t[a+1].slice(d,d+f),t[a+1]=t[a+1].slice(d+f),x.length},Qe=5,We=(t,a,d,f=1e3,x)=>{d=d?d===!0?Qe:d:0;let u=null,m=null,O=[];a=a.replace(U,i=>{let n=i.trim().slice(1);return n=n[0]==='"'?Re(n.slice(1,-1)):n.replace(Pe,""),n!=""&&O.push(n),""});let Y=G(a),C;if(O.length>0){if(C=new RegExp(O.join("|"),"i"+c),Y.length==0){let i=[];for(let n=0;n<t.length;n++)C.test(t[n])||i.push(n);return[i,null,null]}}else if(Y.length==0)return[null,null,null];if(d>0){let i=G(a);if(i.length>1){let n=i.slice().sort((L,R)=>R.length-L.length);for(let L=0;L<n.length;L++){if(x?.length==0)return[[],null,null];x=Le(t,n[L],x)}if(i.length>d)return[x,null,null];u=ye(i).map(L=>L.join(" ")),m=[];let v=new Set;for(let L=0;L<u.length;L++)if(v.size<x.length){let R=x.filter(N=>!v.has(N)),w=Le(t,u[L],R);for(let N=0;N<w.length;N++)v.add(w[N]);m.push(w)}else m.push([])}}u==null&&(u=[a],m=[x?.length>0?x:Le(t,a)]);let g=null,F=null;if(O.length>0&&(m=m.map(i=>i.filter(n=>!C.test(t[n])))),m.reduce((i,n)=>i+n.length,0)<=f){g={},F=[];for(let i=0;i<m.length;i++){let n=m[i];if(n==null||n.length==0)continue;let v=u[i],L=ze(n,t,v),R=e.sort(L,t,v);if(i>0)for(let w=0;w<R.length;w++)R[w]+=F.length;for(let w in L)g[w]=(g[w]??[]).concat(L[w]);F=F.concat(R)}}return[[].concat(...m),g,F]};return{search:(...t)=>We(...t),split:G,filter:Le,info:ze,sort:e.sort}}var qe=(()=>{let e={A:"\xC1\xC0\xC3\xC2\xC4\u0104",a:"\xE1\xE0\xE3\xE2\xE4\u0105",E:"\xC9\xC8\xCA\xCB\u0116",e:"\xE9\xE8\xEA\xEB\u0119",I:"\xCD\xCC\xCE\xCF\u012E",i:"\xED\xEC\xEE\xEF\u012F",O:"\xD3\xD2\xD4\xD5\xD6",o:"\xF3\xF2\xF4\xF5\xF6",U:"\xDA\xD9\xDB\xDC\u016A\u0172",u:"\xFA\xF9\xFB\xFC\u016B\u0173",C:"\xC7\u010C\u0106",c:"\xE7\u010D\u0107",L:"\u0141",l:"\u0142",N:"\xD1\u0143",n:"\xF1\u0144",S:"\u0160\u015A",s:"\u0161\u015B",Z:"\u017B\u0179",z:"\u017C\u017A"},s=new Map,p="";for(let o in e)e[o].split("").forEach(E=>{p+=E,s.set(E,o)});let r=new RegExp(`[${p}]`,"g"),l=o=>s.get(o);return o=>{if(typeof o=="string")return o.replace(r,l);let E=Array(o.length);for(let $=0;$<o.length;$++)E[$]=o[$].replace(r,l);return E}})();function ye(e){e=e.slice();let s=e.length,p=[e.slice()],r=new Array(s).fill(0),l=1,o,E;for(;l<s;)r[l]<l?(o=l%2&&r[l],E=e[l],e[l]=e[o],e[o]=E,++r[l],l=1,p.push(e.slice())):(r[l]=0,++l);return p}var Oe=(e,s)=>s?`<mark>${e}</mark>`:e,Ne=(e,s)=>e+s;function Xe(e,s,p=Oe,r="",l=Ne){r=l(r,p(e.substring(0,s[0]),!1))??r;for(let o=0;o<s.length;o+=2){let E=s[o],$=s[o+1];r=l(r,p(e.substring(E,$),!0))??r,o<s.length-3&&(r=l(r,p(e.substring(s[o+1],s[o+2]),!1))??r)}return r=l(r,p(e.substring(s[s.length-1]),!1))??r,r}Ee.latinize=qe,Ee.permute=e=>ye([...Array(e.length).keys()]).sort((p,r)=>{for(let l=0;l<p.length;l++)if(p[l]!=r[l])return p[l]-r[l];return 0}).map(p=>p.map(r=>e[r])),Ee.highlight=Xe;async function Ge(){let e=fetch($e),s=document.getElementById("search_btn"),p=document.getElementById("search_menu_wrapper"),r=document.getElementById("search_menu_close_btn"),l=document.getElementById("search_menu_input"),o=document.getElementById("search_menu_results");s.addEventListener("click",function(){p.classList.remove("hidden"),l.focus()}),r.addEventListener("click",function(){p.classList.add("hidden")});let E=await(await e).json(),$={unicode:!0,interSplit:"[^\\p{L}\\d']+",intraSplit:"\\p{Ll}\\p{Lu}",intraBound:"\\p{L}\\d|\\d\\p{L}|\\p{Ll}\\p{Lu}",intraChars:"[\\p{L}\\d']",intraContr:"'\\p{L}{1,2}\\b"},ne=new Ee($),W=[];E.forEach(M=>{W.push(M.title,M.content)});let V=(M,c,h)=>`<a href="${c}">
                    <div class="search-menu-result-item">
                        <div class="search-menu-result-item-title">${M}</div>
                        <div class="search-menu-result-item-content">${h}</div>
                    </div>
                </a>`,B=()=>{o.innerHTML=E.reduce((M,c)=>{let h=c.content.length>100?c.content.substring(0,100)+"...":c.content;return M+V(c.title,c.permalink,h)},"")},S=M=>"<mark>"+M+"</mark>",ce=(M,c)=>{let h="",y=W[M],U=0;for(let Z=0;Z<c.length;Z+=2){let z=c[Z],j=c[Z+1];h=h+y.substring(U,z)+S(y.substring(z,j)),U=j}return h=h+y.substring(U,y.length),h},de=(M,c)=>{let h="",y=W[M],U=20,Z=100,z=-1,j=-1;for(let q=0;q<c.length;q+=2){let J=Math.max(c[q]-U,0),he=Math.min(c[q+1]+Z,y.length),G=c[q],Ce=c[q+1];J<=z?h=h+y.substring(j,G):(J!==0&&(h=h+"..."),h=h+y.substring(J,G)),h=h+S(y.substring(G,Ce)),z=he,j=Ce}return h=h+y.substring(j,z),z<y.length&&(h=h+"..."),h},le=M=>{let[c,h,y]=ne.search(W,M),U=[],Z=new Map;for(let z=0;z<y.length;z++){let j=y[z],q=h.idx[j],J=Math.floor(q/2),he=q%2;Z.has(J)||(Z.set(J,U.length),U.push({...E[J]}));let G=U[Z.get(J)];he===0?G.title=ce(q,h.ranges[j]):he===1&&(G.content=de(q,h.ranges[j]))}U.length==0?o.innerHTML="":o.innerHTML=U.reduce((z,j)=>z+V(j.title,j.permalink,j.content),"")};l.addEventListener("input",function(){this.value===""?B():le(this.value.trim())}),B()}window.addEventListener("DOMContentLoaded",Ge)})();})();
