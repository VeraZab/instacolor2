function sendDataRequest(){var t,e=document.getElementById("formstyle").value;t="@"===e.charAt(0)?e.substring(1):e;var n=0,a="/search?utf8=\u2713&q="+t,o=new XMLHttpRequest;o.onreadystatechange=function(){4===o.readyState&&200===o.status?createParentComponent(JSON.parse(o.responseText)):500===o.status&&0===n&&(type(": sorry can't find that user",0),n=1)},o.open("GET",a,!0),o.setRequestHeader("Accept","text/javascript"),o.send()}function createParentComponent(t){t.length||type(": sorry, I can't see your pictures",0);var e;t.length<12?(t.length=t.length,window.innerWidth<509?e="30%":window.innerWidth>=509&&window.innerWidth<=900?e="22%":window.innerWidth>900&&(e="16%")):t.length>=12&&t.length<48?(t.length=12,window.innerWidth<509?e="30%":window.innerWidth>=509&&window.innerWidth<=900?e="22%":window.innerWidth>900&&(e="16%")):t.length>=48&&(t.length=48,window.innerWidth<509?e="30%":window.innerWidth>=509&&window.innerWidth<=900?e="14%":window.innerWidth>900&&(e="8%")),t.forEach(function(t){var n=document.createElement("div");n.style.width=e,n.style.paddingBottom=e,n.className="parent";var a=createImgandColorDiv(t,e);n.appendChild(a[1]),n.appendChild(a[0]),document.getElementById("picContainer").appendChild(n)})}function createImgandColorDiv(t,e){var e=parseFloat(e)/100*document.getElementById("picContainer").clientWidth,n=document.createElement("img");n.style.height=e+"px",n.style.width=e+"px",n.style.opacity="0";var a=document.createElement("div");return a.style.height=e+"px",a.style.width=e+"px",a.className="cdiv",n.onload=function(){var t=document.getElementsByClassName("cdiv"),e=getDominantHSLColor(n);COLORS.push(e),a.style.backgroundColor="hsl("+e[0]+","+e[1]+"%,"+e[2]+"%)",COLORS.length===t.length&&type(getAttributes(COLORS),0)},n.src=t,[n,a]}function displayButton(){var t=document.getElementById("startOver");t.style.display="block"}function getDominantHSLColor(t){var e=new ColorThief,n=e.getColor(t),a=rgbToHsl(n[0],n[1],n[2]);return a}function rgbToHsl(t,e,n){t/=255,e/=255,n/=255;var a,o,r=Math.max(t,e,n),i=Math.min(t,e,n),s=(r+i)/2;if(r==i)a=o=0;else{var u=r-i;switch(o=s>.5?u/(2-r-i):u/(r+i),r){case t:a=(e-n)/u+(n>e?6:0);break;case e:a=(n-t)/u+2;break;case n:a=(t-e)/u+4}a/=6}return[Math.floor(360*a),Math.floor(100*o),Math.floor(100*s)]}function getAttributes(t){var e=[],n=0;t.forEach(function(t){if(t[1]>=40&&t[2]>20){n++;for(var e=0;e<COLOR_DEFINITIONS.length;e++)t[0]<COLOR_DEFINITIONS[e].lowerThan&&t[0]>=COLOR_DEFINITIONS[e].higherThan&&(COLOR_DEFINITIONS[e].saturation+=t[1],COLOR_DEFINITIONS[e].count++)}}),COLOR_DEFINITIONS.sort(function(t,e){return e.saturation-t.saturation});for(var a=0;a<COLOR_DEFINITIONS.length;a++)COLOR_DEFINITIONS[a].count=Math.floor(COLOR_DEFINITIONS[a].count/n*5*2);for(var o=0;o<COLOR_DEFINITIONS.length;o++)if(0!=COLOR_DEFINITIONS[o].count)for(var r=0;r<COLOR_DEFINITIONS[o].count;r++)e.push(COLOR_DEFINITIONS[o].attributes[r]);return 0===e.length?": you're mysterious":": you're "+e.slice(0,3).join(", ")}function type(t,e){var n=t.charAt(e),a=document.getElementById("formstyle"),o=window.getComputedStyle(a,null).getPropertyValue("font-size"),r=parseFloat(o);a.value+=n,e<t.length?(setTimeout(function(){type(t,e+1)},100*Math.random()),40===e&&window.innerWidth<=900&&(a.style.fontSize=r-5+"px")):(a.disabled=!0,setTimeout(function(){displayButton()},300))}function start(){var t=document.getElementById("formstyle"),e=document.getElementById("picContainer"),n=(document.getElementById("attributes"),document.getElementById("startOver"));t.addEventListener("keydown",function(t){13===t.keyCode&&(t.preventDefault(),t.stopPropagation(),e.innerHTML="",sendDataRequest())}),n.addEventListener("click",function(){COLORS=[];for(var e=0;e<COLOR_DEFINITIONS.length;e++)COLOR_DEFINITIONS[e].count=0,COLOR_DEFINITIONS[e].saturation=0;for(;document.images.length;){var a=document.images[0].parentNode,o=a.parentNode;o.removeChild(a)}var r=document.getElementsByTagName("h1")[0],i=window.getComputedStyle(r,null).getPropertyValue("font-size"),s=parseFloat(i);t.style.fontSize=s+"px",t.disabled=!1,t.value="@",t.focus(),t.setSelectionRange(1,1),n.style.display="none"})}var COLORS=[],COLOR_DEFINITIONS=[{name:"Red",higherThan:350,lowerThan:10,attributes:["sensual","ambitious","extroverted","courageous","egoistic"],saturation:0,count:0},{name:"Orange",higherThan:10,lowerThan:30,attributes:["social","vivacious","unpredictable","assertive","inconsistent"],saturation:0,count:0},{name:"Yellow",higherThan:30,lowerThan:75,attributes:["optimistic","meticulous","nerdy","networker","snob"],saturation:0,count:0},{name:"Green",higherThan:75,lowerThan:135,attributes:["caring","empathetic","practical","gracious","gossip girl"],saturation:0,count:0},{name:"Turquoise",higherThan:135,lowerThan:190,attributes:["wise","independent","idealistic","outspoken","narcissistic"],saturation:0,count:0},{name:"Blue",higherThan:190,lowerThan:240,attributes:["harmonious","trustworthy","loyal","sincere","stubborn"],saturation:0,count:0},{name:"Purple",higherThan:240,lowerThan:310,attributes:["intuitive","futuristic","introspective","eccentric","drama queen"],saturation:0,count:0},{name:"Pink",higherThan:310,lowerThan:350,attributes:["resourceful","loving","generous","romantic","naive"],saturation:0,count:0}];window.onload=function(){start()};