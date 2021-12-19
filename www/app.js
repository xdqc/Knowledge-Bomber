new Vue({el:"#app",data:{quoteLang:"",quoteQuote:"",quoteTitle:"",qlang:"",alang:"",qlang_options:[{value:"",text:"(Question Language)"}],alang_options:[{value:"",text:"(Answers Language)"}],aLeximap:[],qLeximap:[],q_title:"",q_title_en:"",q_id:0,q_hypernym:0,lvl:1,board:{},choices:[],answer:-1,score:-1,windowWidth:window.innerWidth,windowHeight:window.innerHeight,isCollapsingBomb:!0,displayTitleImage:!0,displayTopQuote:!0,startBtnDisabled:!1,progressAnimate:!1,touchTimer:null,touchTimerLong:null,hypernyms:[],hypernym_options:[],hypernym_index:1,difficulty:4,difficultyLvl:4,difficulties:[{value:1,icon:"1️⃣",tooltip:"Wanderer",keymap:{7:0,g:0,u:0,4:0,h:0,j:0}},{value:2,icon:"2️⃣",tooltip:"Picnic",keymap:{7:0,g:0,u:0,8:0,c:0,i:0,4:1,h:1,j:1,5:1,t:1,k:1}},{value:3,icon:"3️⃣",tooltip:"Casual",keymap:{7:0,g:0,u:0,8:0,c:0,i:0,4:1,h:1,j:1,5:1,t:1,k:1,1:2,m:2,2:2,w:2,",":2}},{value:4,icon:"4️⃣",tooltip:"Simple",keymap:{7:0,g:0,u:0,8:1,c:1,i:1,4:2,h:2,j:2,5:3,t:3,k:3}},{value:6,icon:"6️⃣",tooltip:"Moderate",keymap:{7:0,g:0,u:0,8:1,c:1,i:1,4:2,h:2,j:2,5:3,t:3,k:3,1:4,m:4,2:5,w:5,",":5}},{value:8,icon:"8️⃣",tooltip:"Intricate",keymap:{7:0,8:1,4:2,g:2,u:2,5:3,c:3,i:3,1:4,h:4,j:4,2:5,t:5,k:5,0:6,m:6,".":7,w:7,",":7}},{value:9,icon:"9️⃣",tooltip:"Devious",keymap:{7:0,g:0,u:0,8:1,c:1,i:1,9:2,r:2,o:2,4:3,h:3,j:3,5:4,t:4,k:4,6:5,n:5,l:5,1:6,m:6,2:7,w:7,",":7,3:8,v:8,".":8}},{value:12,icon:"1️⃣2️⃣",tooltip:"Fiendish",keymap:{7:0,8:1,9:2,4:3,g:3,u:3,5:4,c:4,i:4,6:5,r:5,o:5,1:6,h:6,j:6,2:7,t:7,k:7,3:8,n:8,l:8,0:9,m:9,".":10,w:10,",":10,v:11,Enter:11}},{value:16,icon:"1️⃣6️⃣",tooltip:"Nightmare",keymap:{7:0,8:1,9:2,0:3,g:4,u:4,c:5,i:5,r:6,o:6,l:7,p:7,h:8,j:8,t:9,k:9,n:10,s:11,";":11,m:12,w:13,",":13,v:14,".":14,z:15}},{value:24,icon:"2️⃣4️⃣",tooltip:"Mephistophelian",keymap:{}},{value:36,icon:"3️⃣6️⃣",tooltip:"Diabolical",keymap:{}},{value:54,icon:"5️⃣4️⃣",tooltip:"Maelstrom",keymap:{}}]},mounted:function(){var t;2<=(t=this.getCookieValue("lang").split("+")).length?(this.alang=t[0],this.qlang=t[1]):(t=[...window.navigator.languages.reduce((t,e)=>(t.add(e.slice(0,2)),t),new Set)],this.alang=t[0]||"",this.qlang=t[1]||""),this.alang_options.push({value:this.alang}),this.qlang_options.push({value:this.qlang}),fetch(window.location.origin+"/language").then(t=>t.json()).then(t=>{this.alang_options=t,this.aLeximap=t.filter(t=>0<t.coord_x).map(t=>({value:t.value,text:t.text,coord_x:t.coord_x,coord_y:t.coord_y})),1200<this.windowWidth&&960<this.windowHeight&&document.querySelector(".dropdown-lang .dropdown-toggle").click()}).then(()=>{this.popHypernym(!0)}).catch(t=>{console.log(t)}),(t=this.getCookieValue("d"))&&(this.difficultyLvl=parseInt(t.slice(t.length-1),16)),window.addEventListener("keydown",t=>{if(this.quizStarted){const i=(t,e)=>this.difficulties[e].keymap[t];const n=(e=t.key,e=i(e,this.difficultyIndex-1),document.getElementById("choice-"+e));n&&n.click(),"a"==t.key&&document.getElementById("btn-bomb").click(),"-"!=t.key&&"y"!=t.key||this.speakTitle(),"/"!=t.key&&"q"!=t.key||this.speakQuote(),"*"!=t.key&&"d"!=t.key||this.toggleDisplayTitleImg(),"+"!=t.key&&"f"!=t.key||document.getElementsByClassName("title-link")[0].click()}var e}),window.onresize=()=>{this.windowWidth=window.innerWidth},window.onbeforeunload=()=>{if(this.quizStarted)return""}},watch:{alang:function(){this.alang&&this.fetchLeadQuote()}},computed:{showScore(){return 0<=this.score},quizStarted(){return this.choices&&0<this.choices.length&&this.score<0},qlangOptions(){return this.qlang_options.filter(t=>t.value!=this.alang)},alangOptions(){return this.alang_options},alangOpt(){return this.alang_options.find(t=>t.value===this.alang)||{label_a:"",label_q:"",label_s:"",label_t:""}},qlangOpt(){return this.qlang_options.find(t=>t.value===this.qlang)||{label_a:"",label_q:"",label_s:"",label_t:""}},labelQuestion(){return this.alangOpt.label_q||this.alang_options[0].label_q},labelAnswer(){return this.alangOpt.label_a||this.alang_options[0].label_a},labelGameStart(){return this.alangOpt.label_s||this.alang_options[0].label_s},labelPageTitle(){return this.quizStarted?"":this.alangOpt.label_t||this.alang_options[0].label_t},showDifficulties(){return this.difficulties.slice(0,this.difficultyLvl+1).map((t,e)=>{const i=JSON.parse(JSON.stringify(t));return e===this.difficultyLvl&&e!==this.difficulties.length&&(i.disabled=!0,i.icon="️??",i.tooltip="Reach all levels in the previous difficulty to unlock"),0===e&&this.difficultyLvl<=+this.difficulties.length&&(i.disabled=!0,i.icon="??",i.hide=this.difficultyLvl<this.difficulties.length-4,i.tooltip="Finish the last difficulty to unlock"),i}).sort((t,e)=>t.value-e.value)},difficultyIndex(){return this.difficulties.findIndex(t=>t.value==this.difficulty)+1},levelMaxCap(){return Object.keys(this.board).length},levelPlayed(){return Object.values(this.board).filter(t=>0<t.length).length},quizPlayed(){return Object.values(this.board).reduce((t,e)=>t+e.length,0)},quizCorrect(){return Object.values(this.board).reduce((t,e)=>t+e.filter(t=>0<t).length,0)},qHypernymTexts(){var t=this.hypernym_options.find(t=>t.value===this.q_hypernym);return t?t.texts:[null,null,null]},choiceHeight(){this.windowWidth;var t=document.getElementsByClassName("choices")[0],t=window.getComputedStyle(t).width.slice(0,-2);return Math.ceil(t/this.difficulty*Math.floor(Math.sqrt(this.difficulty)))},choiceFontSize(){this.windowWidth&&this.difficulty;var t=document.getElementsByClassName("choices")[0],t=window.getComputedStyle(t).width.slice(0,-2);return Math.ceil(t/10/Math.sqrt(this.difficulty)*(1+(Math.sqrt(this.difficulty)-1)/12))},hotkeyTable(){var i,n,t=(t=Object.entries(this.difficulties[this.difficultyIndex-1].keymap),i=1,n=t=>t[0],t.reduce((t,e)=>((t[e[i]]=t[e[i]]||[]).push(n(e)),t),{})),t=Object.entries(t).map(([t,e])=>({Key:e.map(t=>1==t.length?t.toUpperCase():t),Description:`choose "${this.choices[t]}"`}));return[{Key:["A"],Description:"toggle menu collapse"},{Key:["*","D"],Description:"toggle image display"},{Key:["/","Q"],Description:"speak quote in "+this.qlang_options.find(t=>t.value===this.quoteLang)?.text},{Key:["-","Y"],Description:`speak "${this.q_title}" in `+this.qlangOpt.text},{Key:["+","F"],Description:`lookup "${this.q_title}" on ${this.qlang}.wikipedia.org`},...t]},showBottomAlert(){return!this.getCookieValue("lang")}},asyncComputed:{async titleImageUrl(){if(!this.displayTitleImage)return"javascript:void(0)";const t=["collage","trid","schem","chem","pic","dist","locator","taxnrg","flag","logo","icon","rimg"];var e=`
SELECT ?item ${t.map(t=>"?"+t).join(" ")} {
  VALUES (?item) {(wd:Q${this.q_id})}
  OPTIONAL { ?item wdt:P2716 ?collage }
  OPTIONAL { ?item wdt:P4896 ?trid }
  OPTIONAL { ?item wdt:P5555 ?schem }
  OPTIONAL { ?item wdt:P117 ?chem }
  OPTIONAL { ?item wdt:P18 ?pic }
  OPTIONAL { ?item wdt:P1846 ?dist }
  OPTIONAL { ?item wdt:P242 ?locator }
  OPTIONAL { ?item wdt:P181 ?taxnrg }
  OPTIONAL { ?item wdt:P41 ?flag }
  OPTIONAL { ?item wdt:P154 ?logo }
  OPTIONAL { ?item wdt:P2910 ?icon }
  OPTIONAL { ?item wdt:P6802 ?rimg }
}`;const i=await fetch("https://query.wikidata.org/sparql?query="+e,{headers:{Accept:"application/json"}}),n=await i.json(),s=t.map(e=>{var t=n.results.bindings.filter(t=>t[e]);return 0<t.length?t[Math.floor(t.length*Math.random())][e].value:null});return s.find(t=>t)||"#"},async qLeximap(){if(this.alang){const t=await fetch(window.location.origin+"/language?lang="+this.alang),e=await t.json();return this.qlang_options=e,e.filter(t=>0<t.coord_x)}},async pageTitle(){if(this.quizStarted)return"";var t="Knowledge bomb";const e=await fetch("https://translate.api.skitzen.com/translate",{method:"POST",body:JSON.stringify({q:t,source:"en",target:this.alang,format:"text"}),headers:{"Content-Type":"application/json"}});return(await e.json()).translatedText||t}},methods:{setDifficulty:function(t){this.difficulty=t,this.newGame()},newGame:function(){this.qlang&&this.alang||alert("no language selected"),this.startBtnDisabled=!0,fetch(window.location.origin+"/next",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.packPayload(-1,0,{},!0))}).then(t=>t.json()).then(t=>{this.lvl=t.lvl,this.board=t.board,this.unpackRespData(t),this.gameStart(),0<=t.score?this.gameOver(t.score):this.popHypernym()}).finally(()=>{this.startBtnDisabled=!1}),this.score=-1,fetch(window.location.origin+"/save-languages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({alang:this.alang,qlang:this.qlang})})},endGame:function(){fetch(window.location.origin+"/next",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.packPayload(0,0,this.board,!1))}).then(t=>t.json()).then(t=>{setTimeout(()=>{this.board=t.board,this.gameOver(t.score)},200)})},selectChoice:function(e,t){e.preventDefault(),e.target.classList.remove("btn-secondary"),e.target.classList.add("disabled"),1<this.difficulty&&e.target.classList.add(this.answer===t?"btn-success":"btn-danger"),this.progressAnimate=!0;let i=0;setTimeout(()=>{i=1},200),fetch(window.location.origin+"/next",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.packPayload(this.lvl,this.q_id,this.board,this.answer===t))}).then(t=>t.json()).then(e=>{if(this.lvl=e.lvl,this.board=e.board,0<=e.score)this.gameOver(e.score);else{let t=setInterval(()=>{1==i&&(this.unpackRespData(e),clearInterval(t))},10)}this.displayTopQuote&&this.fetchLeadQuote([this.choices[this.answer],this.qHypernymTexts[1],this.q_title_en,this.qHypernymTexts[0]])}).catch(t=>{console.log(t)}).finally(()=>{let t=setInterval(()=>{1==i&&(e.target.classList.add("btn-secondary"),e.target.classList.remove("disabled"),1<this.difficulty&&(e.target.classList.remove("btn-success"),e.target.classList.remove("btn-danger")),e.target.blur(),e.handled=!0,this.progressAnimate=!1,clearInterval(t))},10)})},packPayload:function(t,e,i,n){return{lvl:t,board:i,qid:e,qlang:this.qlang,alang:this.alang,hypernym:this.hypernyms,is_correct:n,difficulty:this.difficulty}},unpackRespData:function(t){this.q_id=t.q_id,this.q_hypernym=t.q_hypernym,this.q_title=t.q_title,this.q_title_en=t.q_title_en,this.choices=t.choices,this.answer=t.answer},gameStart:function(){this.windowWidth<=576&&document.getElementById("btn-toggle-display-quote").click(),document.getElementById("page-header").classList.add("py-0","mb-0"),document.getElementById("wikiquote").classList.remove("justify-content-center")},gameOver:function(t){this.score=t,this.choices=[],this.q_id=0,this.q_title="",this.q_title_en="",this.q_hypernym="",document.getElementById("page-header").classList.remove("py-0","mb-0"),document.getElementById("wikiquote").classList.add("justify-content-center"),this.displayTopQuote=!0,this.difficultyLvl===this.difficultyIndex&&0<this.score&&this.levelPlayed===Object.keys(this.board).length&&(this.difficultyLvl=Math.min(this.difficulties.length+1,this.difficultyLvl+1)),fetch(window.location.origin+"/save-difficulty-level",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({difficultyLvl:this.difficultyLvl})})},scoreBar:function(t){return JSON.parse(JSON.stringify(t)).reduce((t,e)=>{return 0<(t[t.length-1]||0)*e?t[t.length-1]+=Math.sign(e):t.push(Math.sign(e)),t},[])},onClickLeximapBtnAlang:function(t,e){this.alang=e.value,t.target.parentElement.previousSibling.click()},onClickLeximapBtnQlang:function(t,e){this.qlang=e.value,t.target.parentElement.previousSibling.click()},speakTitle:function(t,e){var i=0<=e?this.choices[e]:this.q_title,e=0<=e?this.alang:this.qlang,e=this.toMajorLang(e,!0),e=this.getSpeechSynthesisVoices(e);let n=new SpeechSynthesisUtterance(i);n.voice=e[Math.floor(Math.random()*e.length)],speechSynthesis.cancel(),speechSynthesis.speak(n)},touchStart:function(t,i){var e=this;this.touchTimer=setTimeout(()=>{e.speakTitle(t,i)},400),this.touchTimerLong=setTimeout(()=>{var t=this.choices[i]||this.q_title,e=this.choices[i]?this.alang:this.qlang;window.open(`https://${e}.wikipedia.org/wiki/`+t,"_blank")},2e3)},touchEnd:function(t){clearTimeout(this.touchTimer),clearTimeout(this.touchTimerLong)},toggleDisplayTitleImg:function(){this.displayTitleImage=!this.displayTitleImage},popHypernym:function(e){fetch(`${window.location.origin}/hypernym?ql=${this.qlang}&al=`+this.alang).then(t=>t.json()).then(t=>{this.hypernym_options=t.filter(t=>t.texts[0]).map(e=>({value:e.value,texts:e.texts.map(t=>t||e.texts[0]).map(t=>t.replace(/ *\([^)]*\) */g,""))})).map(t=>({value:t.value,texts:t.texts,text:t.texts[this.hypernym_index]})).sort((t,e)=>t.text.localeCompare(e.text,this.toMajorLang(this.alang))),e&&(this.hypernyms=t.filter(t=>315!==t.value).map(t=>t.value))})},switchHypernymLang:function(){this.hypernym_index=(this.hypernym_index+1)%3,this.hypernym_options.forEach(t=>t.text=t.texts[this.hypernym_index]),this.hypernym_options.sort((t,e)=>t.text.localeCompare(e.text,this.toMajorLang(2==this.hypernym_index?this.qlang:this.alang)))},reverseHypernymSelect:function(){this.hypernyms=this.hypernym_options.map(t=>t.value).filter(t=>this.hypernyms.indexOf(t)<0)},fetchLeadQuote:function(e,t){e=e&&e.filter(t=>!!t).map(t=>t.replace(/\(/m,"|").replace(/\)/m,""));let i=t?this.quoteLang:this.toMajorLang(this.alang),n=0;const s=t=>{n++,t.quote?(this.quoteLang=i,this.quoteQuote=t.quote,this.quoteTitle="—— "+t.titles):Wikiquote(i).getRandomQuote(n<10?e:[],s,a)},a=t=>{["nosuchsection","noPageCategories","unPageCategories"].includes(t.code)||(i="en"),Wikiquote(i).getRandomQuote("queryGeneratorLinksNoAlang"!=t.code&&"queryGeneratorLinksNoResultAlang"!=t.code||"en"==this.alang?[]:e,s,a)};Wikiquote(i).getRandomQuote(e,s,a,t)},toggleDisplayQuote:function(t){this.displayTopQuote=!this.displayTopQuote,t.target.textContent=this.displayTopQuote?"🧙💬":"🧙🔇",t.target.title=this.displayTopQuote?"Mute me, improve your performance (less network traffic, less laggy)":"I'll be back"},toggleCollapseBomb:function(t){this.isCollapsingBomb=!this.isCollapsingBomb,t.target.textContent=this.isCollapsingBomb?"💣":"💥",t.target.title=this.isCollapsingBomb?"Detonator":`B${"o".repeat(Math.max(2,this.quizCorrect))}m!`},speakQuote:function(){const t=new SpeechSynthesisUtterance(this.quoteQuote);var e=this.toMajorLang("en"==this.quoteLang?"en":this.alang,!0),e=this.getSpeechSynthesisVoices(e);t.voice=e[Math.floor(Math.random()*e.length)],speechSynthesis.cancel(),speechSynthesis.speak(t)},toMajorLang:function(t,e){const i={es:["an","ast"],pt:["mwl"],fr:["oc","co","wa","nrm","pcd","frp","ht"],it:["sc","vec","lmo","scn","pms","fur","nap"],nl:["fy","af","nds-nl","li"],de:["lb","bar","als","nds","stq","pdc"],ru:["be","ce","inh","os","cv","tt","crh","ba","xal","kk","ky","sah","tyv","tg","bxr","rue"],hi:["pa","gu","bh","mr","si","sa","ne","bn","kn","or","te","ml","ta"],zh:["zh-yue","hak","cdo","wuu","gan","zh-classical"],id:["ms","jv","su","mg"]};e&&(i.es.push("ca","eu"),i.pt.push("gl"),i.it.push("eo","la"),i.ru.push("uk","bg","sr"),i.pl=["cs","sk","sl","hr","bs"],i.zh=[],i["zh-CN"]=["zh","wuu","gan","zh-classical"],i["zh-HK"]=["zh-yue","hak"],i["zh-TW"]=["zh-min-nan","cdo"]);for(var n of Object.entries(i))if(0<=n[1].indexOf(t))return n[0];return t||"en"},getSpeechSynthesisVoices:function(e){const i=e.startsWith("zh-")?5:2;let t=speechSynthesis.getVoices().filter(t=>t.lang.slice(0,i)==e);return 0==t.length&&(t=speechSynthesis.getVoices().filter(t=>"en"==t.lang.slice(0,2))),t},getCookieValue:function(t){const e=document.cookie.match("(^|;)\\s*"+t+"\\s*=\\s*([^;]+)");return e&&e.pop()||""}}});
