new Vue({el:"#app",data:{quoteLang:"",quoteQuote:"",quoteTitle:"",qlang:"",alang:"",qlang_options:[{value:"",text:"(Question Language)"}],alang_options:[{value:"",text:"(Answers Language)"}],aLeximap:[],qLeximap:[],q_title:"",q_title_en:"",q_id:0,q_hypernym:0,lvl:1,board:{},choices:[],answer:-1,score:-1,windowWidth:window.innerWidth,windowHeight:window.innerHeight,isCollapsingBomb:!0,displayTitleImage:!0,displayTopQuote:!0,displayHypernymTree:!1,startBtnDisabled:!1,progressAnimate:!1,touchTimer:null,touchTimerLong:null,hypernyms:[],hypernym_list:[],hypernym_tree:[],hypernym_lang:[],hypernym_index:1,match_mode:0,difficulty:4,difficultyLvl:4,difficulties:[{value:1,icon:"1️⃣",tooltip:"Wanderer",keymap:{7:0,8:0,9:0}},{value:2,icon:"2️⃣",tooltip:"Picnic",keymap:{7:0,8:0,9:0,4:1,5:1,6:1,g:1,u:1,c:1,i:1,r:1,o:1}},{value:3,icon:"3️⃣",tooltip:"Casual",keymap:{7:0,8:0,9:0,4:1,5:1,6:1,g:1,u:1,c:1,i:1,r:1,o:1,1:2,2:2,3:2,h:2,j:2,t:2,k:2,n:2,l:2}},{value:4,icon:"4️⃣",tooltip:"Easy",keymap:{7:0,8:1,4:2,g:2,u:2,5:3,c:3,i:3}},{value:6,icon:"6️⃣",tooltip:"Mild",keymap:{7:0,8:1,4:2,g:2,u:2,5:3,c:3,i:3,1:4,h:4,j:4,2:5,t:5,k:5}},{value:8,icon:"8️⃣",tooltip:"Moderate",keymap:{7:0,8:1,4:2,g:2,u:2,5:3,c:3,i:3,1:4,h:4,j:4,2:5,t:5,k:5,0:6,m:6,".":7,w:7,",":7}},{value:9,icon:"9️⃣",tooltip:"Intricate",keymap:{7:0,8:1,9:2,4:3,g:3,u:3,5:4,c:4,i:4,6:5,r:5,o:5,1:6,h:6,j:6,2:7,t:7,k:7,3:8,n:8,l:8}},{value:12,icon:"1️⃣2️⃣",tooltip:"Devious",keymap:{}},{value:16,icon:"1️⃣6️⃣",tooltip:"Fiendish",keymap:{}},{value:24,icon:"2️⃣4️⃣",tooltip:"Mephistophelian",keymap:{}},{value:36,icon:"3️⃣6️⃣",tooltip:"Diabolical",keymap:{}},{value:54,icon:"5️⃣4️⃣",tooltip:"Maelstrom",keymap:{}}]},mounted:function(){var t;3<=(t=this.getCookieValue("l").split("+")).length?(this.alang=t[0],this.qlang=t[1],this.match_mode=t[2]):(t=[...window.navigator.languages.reduce((t,e)=>(t.add(e.slice(0,2)),t),new Set)],this.alang=t[0]||"",this.qlang=t[1]||""),this.alang_options.push({value:this.alang}),this.qlang_options.push({value:this.qlang}),fetch(window.location.origin+"/language").then(t=>t.json()).then(t=>{this.alang_options=t,this.aLeximap=t.filter(t=>0<t.coord_x).map(t=>({value:t.value,text:t.text,coord_x:t.coord_x,coord_y:t.coord_y})),1200<this.windowWidth&&950<this.windowHeight&&document.querySelector(".dropdown-lang .dropdown-toggle").click()}).then(()=>{this.popHypernym(!0)}).catch(t=>{console.error(t)}),(t=this.getCookieValue("d"))&&(this.difficultyLvl=parseInt(t.slice(t.length-1),16)||this.difficultyLvl),window.addEventListener("keydown",t=>{if(this.quizStarted){const i=(t,e)=>this.difficulties[e].keymap[t];const s=(e=t.key,e=i(e,this.difficultyIndex-1),document.getElementById("choice-"+e));s&&s.click(),"a"!=t.key&&"Escape"!=t.key||document.getElementById("btn-bomb").click(),"*"!=t.key&&"y"!=t.key||this.speakTitle(),"/"!=t.key&&"s"!=t.key||this.speakQuote(),"-"!=t.key&&"d"!=t.key||this.toggleDisplayTitleImg(),"+"!=t.key&&"f"!=t.key||document.getElementsByClassName("title-link")[0].click()}var e}),window.onresize=()=>{this.windowWidth=window.innerWidth},window.onbeforeunload=()=>{if(this.quizStarted)return""}},watch:{alang:function(){this.alang&&this.fetchLeadQuote()}},computed:{showScore(){return 0<=this.score},quizStarted(){return this.choices&&0<this.choices.length&&this.score<0},qlangOptions(){return 1===this.match_mode?this.qlang_options:this.qlang_options.filter(t=>t.value!=this.alang)},alangOptions(){return this.alang_options},alangOpt(){return this.alang_options.find(t=>t.value===this.alang)||{value:"",text:"",label_a:"",label_q:"",label_s:"",label_t:"",label_m0:"",label_m1:""}},qlangOpt(){return this.qlang_options.find(t=>t.value===this.qlang)||{value:"",text:"",label_a:"",label_q:"",label_s:"",label_t:"",label_m0:"",label_m1:""}},quotelangOpt(){return this.qlang_options.find(t=>t.value===this.quoteLang)},labelQuestion(){return this.alangOpt.label_q||this.alang_options[0].label_q},labelAnswer(){return this.alangOpt.label_a||this.alang_options[0].label_a},labelGameStart(){return this.alangOpt.label_s||this.alang_options[0].label_s},labelPageTitle(){return this.quizStarted?"":this.alangOpt.label_t||this.alang_options[0].label_t},match_mode_options(){return[{text:`🙂 ${this.alangOpt.label_m0||this.alang_options[0].label_m0||""} `+this.qlangOpt.text,value:0},{text:`😎 ${this.alangOpt.label_m1||this.alang_options[0].label_m1||""} `+this.qlangOpt.text,value:1}]},difficultyIndex(){return this.difficulties.findIndex(t=>t.value==this.difficulty)+1},levelMaxCap(){return Object.keys(this.board).length},levelPlayed(){return Object.values(this.board).filter(t=>0<t.length).length},quizPlayed(){return Object.values(this.board).reduce((t,e)=>t+e.length,0)},quizCorrect(){return Object.values(this.board).reduce((t,e)=>t+e.filter(t=>0<t).length,0)},qHypernymTexts(){var t=this.hypernym_list.find(t=>t.value===this.q_hypernym);return t?t.texts:[null,null,null]},choiceHeight(){this.windowWidth;var t=document.getElementsByClassName("choices")[0],t=window.getComputedStyle(t).width.slice(0,-2);return Math.ceil(t/this.difficulty*Math.floor(Math.sqrt(this.difficulty)))},choiceFontSize(){this.windowWidth&&this.difficulty;var t=document.getElementsByClassName("choices")[0],t=window.getComputedStyle(t).width.slice(0,-2);return Math.ceil(t/10/Math.sqrt(this.difficulty)*(1+(Math.sqrt(this.difficulty)-1)/12))},showBottomAlert(){return!this.getCookieValue("lang")},showDifficulties(){return this.difficulties.slice(0,this.difficultyLvl+1).map((t,e)=>{const i=JSON.parse(JSON.stringify(t));return e===this.difficultyLvl&&e!==this.difficulties.length&&(i.disabled=!0,i.icon="️??",i.tooltip="Reach all levels in the previous difficulty to unlock"),0===e&&this.difficultyLvl<=+this.difficulties.length&&(i.disabled=!0,i.icon="??",i.hide=this.difficultyLvl<this.difficulties.length,i.tooltip="Finish the last difficulty to unlock"),i}).sort((t,e)=>t.value-e.value)},hotkeyTable(){var i,s,t=(t=Object.entries(this.difficulties[this.difficultyIndex-1].keymap),i=1,s=t=>t[0],t.reduce((t,e)=>((t[e[i]]=t[e[i]]||[]).push(s(e)),t),{})),t=Object.entries(t).map(([t,e])=>({Key:e.map(t=>1==t.length?t.toUpperCase():t),Description:`choose "${this.choices[t]}"`}));return[{Key:["A","Esc"],Description:"toggle category selector"},{Key:["-","D"],Description:"dispaly or hide image"},{Key:["/","S"],Description:"say <quote> in "+(this.quotelangOpt||this.alangOpt).text},{Key:["*","Y"],Description:`yell "${this.q_title}" in `+this.qlangOpt.text},{Key:["+","F"],Description:`find "${this.q_title}" on ${this.qlang}.wikipedia.org`},...t]}},asyncComputed:{async titleImageUrl(){if(!this.displayTitleImage)return"javascript:void(0)";const t=["collage","trid","schem","chem","pic","dist","locator","taxnrg","flag","logo","icon","rimg"];var e=`
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
}`;const i=await fetch("https://query.wikidata.org/sparql?query="+e,{headers:{Accept:"application/json"}}),s=await i.json(),a=t.map(e=>{var t=s.results.bindings.filter(t=>t[e]);return 0<t.length?t[Math.floor(t.length*Math.random())][e].value:null});return a.find(t=>t)||"#"},async qLeximap(){if(this.alang){const t=await fetch(window.location.origin+"/language?lang="+this.alang),e=await t.json();return this.qlang_options=e,e.filter(t=>0<t.coord_x)}}},methods:{setDifficulty:function(t){this.difficulty=t,this.newGame()},newGame:async function(){this.qlang&&this.alang||alert("no language selected"),this.score=-1,this.startBtnDisabled=!0;try{const e=await fetch(window.location.origin+"/next",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.packPayload(-1,0,{},!0))});var t=await e.json();this.lvl=t.lvl,this.board=t.board,0<=t.score?this.gameOverAction(t.score):(this.popHypernym(),0==this.match_mode?(this.unpackRespData(t),this.gameStartAction()):1==this.match_mode&&(await this.fetchFuzzyAnswer(t),this.gameStartAction()))}catch(t){console.error(t)}finally{this.startBtnDisabled=!1,fetch(window.location.origin+"/save-languages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({alang:this.alang,qlang:this.qlang,mode:this.match_mode})})}},endGame:async function(){try{const t=await fetch(window.location.origin+"/next",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.packPayload(0,0,this.board,!1))}),e=await t.json();setTimeout(()=>{this.board=e.board,this.gameOverAction(e.score)},200)}catch(t){console.error(t)}},selectChoice:async function(t,e){t.preventDefault(),t.target.classList.remove("btn-secondary"),1<this.difficulty&&t.target.classList.add(this.answer===e?"btn-success":"btn-danger"),document.querySelectorAll(".btn-choice").forEach(t=>t.disabled=!0),this.progressAnimate=!0;try{const s=await fetch(window.location.origin+"/next",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.packPayload(this.lvl,this.q_id,this.board,this.answer===e))});var i=await s.json();this.lvl=i.lvl,this.board=i.board,0<=i.score?this.gameOverAction(i.score):0==this.match_mode?this.unpackRespData(i):1==this.match_mode&&await this.fetchFuzzyAnswer(i),this.displayTopQuote&&this.fetchLeadQuote([this.choices[this.answer],this.qHypernymTexts[1],this.q_title_en,this.qHypernymTexts[0]])}catch(t){console.error(t)}finally{document.querySelectorAll(".btn-choice").forEach(t=>t.disabled=!1),t.target.classList.add("btn-secondary"),1<this.difficulty&&(t.target.classList.remove("btn-success"),t.target.classList.remove("btn-danger")),t.target.blur(),t.handled=!0,this.progressAnimate=!1}},fetchFuzzyAnswer:async function(t){var e=await this.queryFuzzyAnswer(t.q_id,this.alang);console.log(t.q_id,t.q_title,e),e.aid&&e.atitle,this.unpackRespData(t),this.choices=[e.atitle,...t.choices],this.shuffleArray(this.choices),this.answer=this.choices.indexOf(e.atitle)},queryFuzzyAnswer:async function(t,e){let i=await this.sparqlGetSiblings(t,e,"","",!0);return i.isFuzzy?{aid:i.aid,atitle:i.atitle}:(console.info("Expand Class...",t,e,i),i=await this.sparqlGetSiblings(t,e,"wdt:P31?","wdt:P31?"),i.isFuzzy?{aid:i.aid,atitle:i.atitle}:(console.info("Expand SubClass...",t,e,i),i=await this.sparqlGetSiblings(t,e,"wdt:P31?","wdt:P31?/wdt:P279"),i.isFuzzy?{aid:i.aid,atitle:i.atitle}:(console.info("Expand SuperClass...",t,e,i),i=await this.sparqlGetSiblings(t,e,"wdt:P31?/wdt:P279","wdt:P31?/wdt:P279?"),i.isFuzzy?{aid:i.aid,atitle:i.atitle}:(console.info("Expand SuperSuperClass...",t,e,i),i=await this.sparqlGetSiblings(t,e,"wdt:P31?/wdt:P279/wdt:P279","wdt:P31?/wdt:P279?"),i.isFuzzy||console.info("Expand scopes failure...",t,e,i),{aid:i.aid,atitle:i.atitle}))))},sparqlGetSiblings:async function(e,i,t="wdt:P31?",s="wdt:P31?",a=!1){let n=0,l="",o=!1;var h,s=a?`SELECT DISTINCT * WHERE {
{
  SELECT DISTINCT
  ?sim ?simLabelA  
    WHERE {
    wd:Q${e} wdt:P361? ?whole .
    ?sim wdt:P361? ?whole .
    ?sim rdfs:label ?simLabelA filter (lang(?simLabelA) = '${i}').
    }
}
UNION
{
  SELECT DISTINCT
  ?sim ?simLabelA 
    WHERE {
    wd:Q${e} wdt:P527? ?part .
    ?sim wdt:P527? ?part .
    ?sim rdfs:label ?simLabelA filter (lang(?simLabelA) = '${i}').
    }
}
UNION
{
  SELECT DISTINCT
  ?sim ?simLabelA 
    WHERE {
    wd:Q${e} wdt:P366? ?use .
    ?sim wdt:P366? ?use .
    ?sim rdfs:label ?simLabelA filter (lang(?simLabelA) = '${i}').
    }
}
UNION
{
  SELECT DISTINCT
  ?sim ?simLabelA 
    WHERE {
    wd:Q${e} wdt:P1535? ?useby .
    ?sim wdt:P1535? ?useby .
    ?sim rdfs:label ?simLabelA filter (lang(?simLabelA) = '${i}').
    }
}
UNION
{
  SELECT DISTINCT
  ?sim ?simLabelA 
    WHERE {
    wd:Q${e} wdt:P2283? ?uses .
    ?sim wdt:P2283? ?uses .
    ?sim rdfs:label ?simLabelA filter (lang(?simLabelA) = '${i}').
    }
}
UNION
{
  SELECT DISTINCT
  ?sim ?simLabelA 
    WHERE {
    wd:Q${e} wdt:P171? ?ptax .
    ?sim wdt:P171? ?ptax .
    ?sim rdfs:label ?simLabelA filter (lang(?simLabelA) = '${i}').
    }
}
UNION
{
  SELECT DISTINCT
  ?sim ?simLabelA 
    WHERE {
    wd:Q${e} wdt:P4969? ?deriv .
    ?sim wdt:P4969? ?deriv .
    ?sim rdfs:label ?simLabelA filter (lang(?simLabelA) = '${i}').
    }
}
UNION
{
  SELECT DISTINCT
  ?sim ?simLabelA 
    WHERE {
    wd:Q${e} wdt:P1659? ?see .
    ?sim wdt:P1659? ?see .
    ?sim rdfs:label ?simLabelA filter (lang(?simLabelA) = '${i}').
    }
}
}
ORDER BY UUID() 
LIMIT 2`:`SELECT DISTINCT ?sim ?simLabelA 
WHERE
{
    wd:Q${e} ${t} ?class.
    FILTER (?class not in (wd:Q151885, wd:Q1969448, wd:Q4925178, wd:Q12812139))
    ?sim ${s} ?class .
    ?sim rdfs:label ?simLabelA filter (lang(?simLabelA) = '${i}').
}
ORDER BY uuid()
LIMIT 2`;try{const r=await fetch("https://query.wikidata.org/sparql?query="+s,{headers:{Accept:"application/json"}});for(h of(await r.json()).results.bindings)if(n=parseInt(h.sim.value.split("Q")[1])||n,l=h.simLabelA.value||l,n!=e){o=!0;break}}catch(t){console.error(e,i,t,s)}finally{return l=l&&l.charAt(0).toUpperCase()+l.substring(1),{aid:n,atitle:l,isFuzzy:o}}},packPayload:function(t,e,i,s){return{lvl:t,board:i,qid:e,qlang:this.qlang,alang:this.alang,hypernym:this.hypernyms,is_correct:s,difficulty:this.difficulty,match_mode:this.match_mode}},unpackRespData:function(t){this.q_id=t.q_id,this.q_hypernym=t.q_hypernym,this.q_title=t.q_title,this.q_title_en=t.q_title_en,this.choices=t.choices,this.answer=t.answer},gameStartAction:function(){this.windowWidth<=576&&document.getElementById("btn-toggle-quote").click(),document.getElementById("page-header").classList.add("py-0","mb-0")},gameOverAction:function(t){this.score=t,this.choices=[],this.q_id=0,this.q_title="",this.q_title_en="",this.q_hypernym="",document.getElementById("page-header").classList.remove("py-0","mb-0"),this.displayTopQuote=!0,this.difficultyLvl===this.difficultyIndex&&0<this.score&&this.levelPlayed===Object.keys(this.board).length&&(this.difficultyLvl=Math.min(this.difficulties.length+1,this.difficultyLvl+1)),fetch(window.location.origin+"/save-difficulty-level",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({difficultyLvl:this.difficultyLvl})})},scoreBar:function(t){return JSON.parse(JSON.stringify(t)).reduce((t,e)=>{return 0<(t[t.length-1]||0)*e?t[t.length-1]+=Math.sign(e):t.push(Math.sign(e)),t},[])},onClickLeximapBtnAlang:function(t,e){this.alang=e.value,t.target.parentElement.previousSibling.click()},onClickLeximapBtnQlang:function(t,e){this.qlang=e.value,t.target.parentElement.previousSibling.click()},speakTitle:function(t,e){var i=0<=e?this.choices[e]:this.q_title,e=0<=e?this.alang:this.qlang,e=this.toMajorLang(e,!0),e=this.getSpeechSynthesisVoices(e);let s=new SpeechSynthesisUtterance(i);s.voice=e[Math.floor(Math.random()*e.length)],speechSynthesis.cancel(),speechSynthesis.speak(s)},touchStart:function(t,i){var e=this;this.touchTimer=setTimeout(()=>{e.speakTitle(t,i)},400),this.touchTimerLong=setTimeout(()=>{var t=this.choices[i]||this.q_title,e=this.choices[i]?this.alang:this.qlang;window.open(`https://${e}.wikipedia.org/wiki/`+t,"_blank")},2e3)},touchEnd:function(t){clearTimeout(this.touchTimer),clearTimeout(this.touchTimerLong)},fetchLeadQuote:function(e,t){e=e&&e.filter(t=>!!t).map(t=>t.replace(/\(/m,"|").replace(/\)/m,""));let i=t?this.quoteLang:this.toMajorLang(this.alang),s=0;const a=t=>{s++,t.quote?(this.quoteLang=i,this.quoteQuote=t.quote,this.quoteTitle="—— "+t.titles):Wikiquote(i).getRandomQuote(s<10?e:[],a,n)},n=t=>{["nosuchsection","noPageCategories","unPageCategories"].includes(t.code)||(i="en"),Wikiquote(i).getRandomQuote("queryGeneratorLinksNoAlang"!=t.code&&"queryGeneratorLinksNoResultAlang"!=t.code||"en"==this.alang?[]:e,a,n)};Wikiquote(i).getRandomQuote(e,a,n,t)},speakQuote:function(){const t=new SpeechSynthesisUtterance(this.quoteQuote);var e=this.toMajorLang("en"==this.quoteLang?"en":this.alang,!0),e=this.getSpeechSynthesisVoices(e);t.voice=e[Math.floor(Math.random()*e.length)],speechSynthesis.cancel(),speechSynthesis.speak(t)},popHypernym:function(e){fetch(`${window.location.origin}/hypernym?al=${this.alang}&ql=`+this.qlang).then(t=>t.json()).then(t=>{t.forEach(e=>{e.texts=e.texts.map(t=>t||e.texts[0]).map(t=>t.replace(/ *\([^)]*\) */g,"")),e.text=e.texts[this.hypernym_index]}),this.hypernym_lang=["en",this.alang,this.qlang],this.hypernym_tree=t,this.hypernym_list=t.map(t=>({value:t.value,texts:t.texts,text:t.text})),this.sortHypernymTree(),e?this.hypernyms=t.filter(t=>315!==t.value).map(t=>t.value):this.sortHypernymList()})},sortHypernymList:function(){this.hypernym_list.sort((t,e)=>t.text.localeCompare(e.text,this.toMajorLang(2==this.hypernym_index?this.qlang:this.alang)))},sortHypernymTree:function(){this.hypernym_tree.sort((t,e)=>t.place-e.place),setTimeout(()=>{this.hypernym_tree.forEach(t=>{const e=document.querySelector(`.tree-hypernyms input[value="${t.value}"]`);e.parentElement.style["margin-left"]=+t.depth+"rem"})},1)},switchHypernymLang:function(){this.hypernym_index=(this.hypernym_index+1)%3,this.hypernym_list.forEach(t=>t.text=t.texts[this.hypernym_index]),this.hypernym_tree.forEach(t=>t.text=t.texts[this.hypernym_index]),this.quizStarted||this.hypernym_lang[1]==this.alang&&this.hypernym_lang[2]==this.qlang?this.displayHypernymTree||this.sortHypernymList():this.popHypernym()},reverseHypernymSelect:function(){this.hypernyms=this.hypernym_list.map(t=>t.value).filter(t=>this.hypernyms.indexOf(t)<0)},toggleDisplayHypernymTree:function(){this.displayHypernymTree=!this.displayHypernymTree,document.getElementById("btn-toggle-hypernym-tree").textContent=this.displayHypernymTree?"🎄":"🌲",document.getElementById("btn-toggle-hypernym-tree").title=this.displayHypernymTree?"to list":"to tree",this.displayHypernymTree||this.sortHypernymList()},toggleDisplayQuote:function(t){this.displayTopQuote=!this.displayTopQuote,document.getElementById("btn-toggle-quote").textContent=this.displayTopQuote?"🧙💬":"🧙🔇",document.getElementById("btn-toggle-quote").title=this.displayTopQuote?"If you can't keep quiet, shut up!":"shut up and shine"},toggleCollapseBomb:function(t){this.isCollapsingBomb=!this.isCollapsingBomb,document.getElementById("btn-bomb").textContent=this.isCollapsingBomb?"💣":"💥",document.getElementById("btn-bomb").title=this.isCollapsingBomb?"detonator":`B${"o".repeat(Math.max(2,this.quizCorrect))}m!`},toggleDisplayTitleImg:function(){this.displayTitleImage=!this.displayTitleImage,document.getElementById("btn-toggle-image").textContent=this.displayTitleImage?"🖼":"⬜",document.getElementById("btn-toggle-image").title=this.displayTitleImage?"hide image":"hint image"},getCookieValue:function(t){const e=document.cookie.match("(^|;)\\s*"+t+"\\s*=\\s*([^;]+)");return e?e.pop()||"":"4"},toMajorLang:function(t,e){const i={nl:["fy","frr","af","nds-nl","li","vls"],de:["lb","bar","als","nds","stq","pdc","got"],es:["an","ast","ext"],pt:["mwl"],fr:["oc","co","wa","nrm","pcd","frp","ht","gcr"],it:["sc","vec","lmo","scn","pms","fur","nap","lij"],ru:["be","ce","inh","os","cv","tt","crh","ba","xal","kk","ky","sah","tyv","tg","bxr","rue"],hi:["pa","gu","bh","mr","si","sa","ne","bn","kn","or","te","ml","ta"],zh:["zh-yue","hak","cdo","wuu","gan","zh-classical"],id:["ms","jv","su","mg"]};if(e){i.es.push("ca","eu"),i.pt.push("gl"),i.it.push("eo","la"),i.ru.push("uk","bg","sr"),i.pl=["cs","sk","sl","hr","bs"],i.zh=[],i["zh-CN"]=["zh","wuu","gan","zh-classical"],i["zh-HK"]=["zh-yue","hak"],i["zh-TW"]=["zh-min-nan","cdo"];const n=new Set(speechSynthesis.getVoices().map(t=>t.lang.slice(0,2)));for(var s of Object.keys(i))i[s]=i[s].filter(t=>!n.has(t))}for(var a of Object.entries(i))if(0<=a[1].indexOf(t))return a[0];return t||"en"},transLangCode:function(t){return{"be-x-old":"be-tarask",bh:"bho","cbk-sam":"cbk","fiu-vro":"vro","zh-min-nan":"nan","zh-yue":"yue"}[t]||t},getSpeechSynthesisVoices:function(e){const i=e.startsWith("zh-")?5:2;let t=speechSynthesis.getVoices().filter(t=>t.lang.slice(0,i)==e);return 0==t.length&&(t=speechSynthesis.getVoices().filter(t=>"en"==t.lang.slice(0,2))),t},shuffleArray:function(e){for(let t=e.length-1;0<t;t--){var i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}}});
