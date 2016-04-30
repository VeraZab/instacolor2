/*!
 * Color Thief v2.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * License
 * -------
 * Creative Commons Attribution 2.5 License:
 * http://creativecommons.org/licenses/by/2.5/
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 */
function sendDataRequest(){var t,e=document.getElementById("formstyle").value;t="@"===e.charAt(0)?e.substring(1):e;var n=0,r="/search?utf8=\u2713&q="+t,o=new XMLHttpRequest;o.onreadystatechange=function(){4===o.readyState&&200===o.status?createParentComponent(JSON.parse(o.responseText)):500===o.status&&0===n&&(type(": sorry can't find that user",0),n=1)},o.open("GET",r,!0),o.setRequestHeader("Accept","text/javascript"),o.send()}function createParentComponent(t){t.length||type(": sorry, I can't see your pictures",0);var e;t.length<12?(t.length=t.length,window.innerWidth<509?e="30%":window.innerWidth>=509&&window.innerWidth<=900?e="22%":window.innerWidth>900&&(e="15%")):t.length>=12&&t.length<48?(t.length=12,window.innerWidth<509?e="30%":window.innerWidth>=509&&window.innerWidth<=900?e="22%":window.innerWidth>900&&(e="15%")):t.length>=48&&(t.length=48,window.innerWidth<509?e="30%":window.innerWidth>=509&&window.innerWidth<=900?e="14%":window.innerWidth>900&&(e="8%")),t.slice(0,t.length).forEach(function(t){var n=document.createElement("div");n.style.width=e,n.style.paddingBottom=e,n.className="parent",n.appendChild(createImgandColorDiv(t,e)[1]),n.appendChild(createImgandColorDiv(t,e)[0]),document.getElementById("picContainer").appendChild(n)})}function createImgandColorDiv(t,e){var e=parseFloat(e)/100*document.getElementById("picContainer").clientWidth,n=document.createElement("img");n.style.height=e+"px",n.style.width=e+"px",n.style.opacity="0";var r=document.createElement("div");return r.style.height=e+"px",r.style.width=e+"px",r.className="cdiv",n.onload=function(){var t=document.getElementsByClassName("cdiv"),e=getDominantHSLColor(n);COLORS.push(e),r.style.backgroundColor="hsl("+e[0]+","+e[1]+"%,"+e[2]+"%)",COLORS.length===t.length&&setTimeout(function(){type(getAttributes(COLORS),0)},2e3)},n.src=t,[n,r]}function displayButton(){var t=document.getElementById("startOver");t.style.display="block"}function getDominantHSLColor(t){var e=new ColorThief,n=e.getColor(t),r=rgbToHsl(n[0],n[1],n[2]);return r}function rgbToHsl(t,e,n){t/=255,e/=255,n/=255;var r,o,i=Math.max(t,e,n),a=Math.min(t,e,n),u=(i+a)/2;if(i==a)r=o=0;else{var c=i-a;switch(o=u>.5?c/(2-i-a):c/(i+a),i){case t:r=(e-n)/c+(n>e?6:0);break;case e:r=(n-t)/c+2;break;case n:r=(t-e)/c+4}r/=6}return[Math.floor(360*r),Math.floor(100*o),Math.floor(100*u)]}function getAttributes(t){var e=[],n=0;t.forEach(function(t){if(t[1]>50&&t[2]>20){n++;for(var e=0;e<COLOR_DEFINITIONS.length;e++)t[0]<COLOR_DEFINITIONS[e].lowerThan&&t[0]>=COLOR_DEFINITIONS[e].higherThan&&COLOR_DEFINITIONS[e].count++}});for(var r=0;r<COLOR_DEFINITIONS.length;r++)COLOR_DEFINITIONS[r].count=2*Math.floor(COLOR_DEFINITIONS[r].count/n*5);COLOR_DEFINITIONS.sort(function(t,e){return e.count-t.count});for(var o=0;o<COLOR_DEFINITIONS.length;o++)if(0!=COLOR_DEFINITIONS[o].count)for(var i=0;i<COLOR_DEFINITIONS[o].count;i++)e.push(COLOR_DEFINITIONS[o].attributes[i]);return 0===e.length?": you're mysterious":": you're "+e.slice(0,3).join(", ")}function type(t,e){var n=t.charAt(e),r=document.getElementById("formstyle");r.value+=n,e<t.length?setTimeout(function(){type(t,e+1)},100*Math.random()):(r.blur(),setTimeout(function(){displayButton()},500))}function start(){var t=document.getElementById("formstyle"),e=document.getElementById("picContainer"),n=(document.getElementById("attributes"),document.getElementById("startOver"));t.addEventListener("keydown",function(t){13===t.keyCode&&(t.preventDefault(),t.stopPropagation(),e.innerHTML="",sendDataRequest())}),n.addEventListener("click",function(){COLORS=[];for(var e=0;e<COLOR_DEFINITIONS.length;e++)COLOR_DEFINITIONS[e].count=0;for(;document.images.length;){var r=document.images[0].parentNode,o=r.parentNode;o.removeChild(r)}t.value="@",t.focus(),t.setSelectionRange(1,1),n.style.display="none"})}var CanvasImage=function(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.width=this.canvas.width=t.width,this.height=this.canvas.height=t.width,this.context.drawImage(t,0,0,this.width,this.height)};CanvasImage.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)},CanvasImage.prototype.update=function(t){this.context.putImageData(t,0,0)},CanvasImage.prototype.getPixelCount=function(){return this.width*this.height},CanvasImage.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},CanvasImage.prototype.removeCanvas=function(){this.canvas.parentNode.removeChild(this.canvas)};var ColorThief=function(){};/*!
 * quantize.js Copyright 2008 Nick Rabinowitz.
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
/*!
 * Block below copied from Protovis: http://mbostock.github.com/protovis/
 * Copyright 2010 Stanford Visualization Group
 * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
 */
if(ColorThief.prototype.getColor=function(t,e){var n=this.getPalette(t,5,e),r=n[0];return r},ColorThief.prototype.getPalette=function(t,e,n){"undefined"==typeof e&&(e=10),("undefined"==typeof n||1>n)&&(n=10);for(var r,o,i,a,u,c=new CanvasImage(t),s=c.getImageData(),h=s.data,l=c.getPixelCount(),f=[],v=0;l>v;v+=n)r=4*v,o=h[r+0],i=h[r+1],a=h[r+2],u=h[r+3],u>=125&&(o>250&&i>250&&a>250||f.push([o,i,a]));var d=MMCQ.quantize(f,e),g=d?d.palette():null;return c.removeCanvas(),g},!pv)var pv={map:function(t,e){var n={};return e?t.map(function(t,r){return n.index=r,e.call(n,t)}):t.slice()},naturalOrder:function(t,e){return e>t?-1:t>e?1:0},sum:function(t,e){var n={};return t.reduce(e?function(t,r,o){return n.index=o,t+e.call(n,r)}:function(t,e){return t+e},0)},max:function(t,e){return Math.max.apply(null,e?pv.map(t,e):t)}};var MMCQ=function(){function t(t,e,n){return(t<<2*c)+(e<<c)+n}function e(t){function e(){n.sort(t),r=!0}var n=[],r=!1;return{push:function(t){n.push(t),r=!1},peek:function(t){return r||e(),void 0===t&&(t=n.length-1),n[t]},pop:function(){return r||e(),n.pop()},size:function(){return n.length},map:function(t){return n.map(t)},debug:function(){return r||e(),n}}}function n(t,e,n,r,o,i,a){var u=this;u.r1=t,u.r2=e,u.g1=n,u.g2=r,u.b1=o,u.b2=i,u.histo=a}function r(){this.vboxes=new e(function(t,e){return pv.naturalOrder(t.vbox.count()*t.vbox.volume(),e.vbox.count()*e.vbox.volume())})}function o(e){var n,r,o,i,a=1<<3*c,u=new Array(a);return e.forEach(function(e){r=e[0]>>s,o=e[1]>>s,i=e[2]>>s,n=t(r,o,i),u[n]=(u[n]||0)+1}),u}function i(t,e){var r,o,i,a=1e6,u=0,c=1e6,h=0,l=1e6,f=0;return t.forEach(function(t){r=t[0]>>s,o=t[1]>>s,i=t[2]>>s,a>r?a=r:r>u&&(u=r),c>o?c=o:o>h&&(h=o),l>i?l=i:i>f&&(f=i)}),new n(a,u,c,h,l,f,e)}function a(e,n){function r(t){var e,r,o,i,a,u=t+"1",s=t+"2",h=0;for(c=n[u];c<=n[s];c++)if(d[c]>v/2){for(o=n.copy(),i=n.copy(),e=c-n[u],r=n[s]-c,a=r>=e?Math.min(n[s]-1,~~(c+r/2)):Math.max(n[u],~~(c-1-e/2));!d[a];)a++;for(h=g[a];!h&&d[a-1];)h=g[--a];return o[s]=a,i[u]=o[s]+1,[o,i]}}if(n.count()){var o=n.r2-n.r1+1,i=n.g2-n.g1+1,a=n.b2-n.b1+1,u=pv.max([o,i,a]);if(1==n.count())return[n.copy()];var c,s,h,l,f,v=0,d=[],g=[];if(u==o)for(c=n.r1;c<=n.r2;c++){for(l=0,s=n.g1;s<=n.g2;s++)for(h=n.b1;h<=n.b2;h++)f=t(c,s,h),l+=e[f]||0;v+=l,d[c]=v}else if(u==i)for(c=n.g1;c<=n.g2;c++){for(l=0,s=n.r1;s<=n.r2;s++)for(h=n.b1;h<=n.b2;h++)f=t(s,c,h),l+=e[f]||0;v+=l,d[c]=v}else for(c=n.b1;c<=n.b2;c++){for(l=0,s=n.r1;s<=n.r2;s++)for(h=n.g1;h<=n.g2;h++)f=t(s,h,c),l+=e[f]||0;v+=l,d[c]=v}return d.forEach(function(t,e){g[e]=v-t}),r(u==o?"r":u==i?"g":"b")}}function u(t,n){function u(t,e){for(var n,r=1,o=0;h>o;)if(n=t.pop(),n.count()){var i=a(c,n),u=i[0],s=i[1];if(!u)return;if(t.push(u),s&&(t.push(s),r++),r>=e)return;if(o++>h)return}else t.push(n),o++}if(!t.length||2>n||n>256)return!1;var c=o(t),s=0;c.forEach(function(){s++});var f=i(t,c),v=new e(function(t,e){return pv.naturalOrder(t.count(),e.count())});v.push(f),u(v,l*n);for(var d=new e(function(t,e){return pv.naturalOrder(t.count()*t.volume(),e.count()*e.volume())});v.size();)d.push(v.pop());u(d,n-d.size());for(var g=new r;d.size();)g.push(d.pop());return g}var c=5,s=8-c,h=1e3,l=.75;return n.prototype={volume:function(t){var e=this;return(!e._volume||t)&&(e._volume=(e.r2-e.r1+1)*(e.g2-e.g1+1)*(e.b2-e.b1+1)),e._volume},count:function(e){var n=this,r=n.histo;if(!n._count_set||e){var o,i,a,u=0;for(o=n.r1;o<=n.r2;o++)for(i=n.g1;i<=n.g2;i++)for(a=n.b1;a<=n.b2;a++)index=t(o,i,a),u+=r[index]||0;n._count=u,n._count_set=!0}return n._count},copy:function(){var t=this;return new n(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(e){var n=this,r=n.histo;if(!n._avg||e){var o,i,a,u,s,h=0,l=1<<8-c,f=0,v=0,d=0;for(i=n.r1;i<=n.r2;i++)for(a=n.g1;a<=n.g2;a++)for(u=n.b1;u<=n.b2;u++)s=t(i,a,u),o=r[s]||0,h+=o,f+=o*(i+.5)*l,v+=o*(a+.5)*l,d+=o*(u+.5)*l;h?n._avg=[~~(f/h),~~(v/h),~~(d/h)]:n._avg=[~~(l*(n.r1+n.r2+1)/2),~~(l*(n.g1+n.g2+1)/2),~~(l*(n.b1+n.b2+1)/2)]}return n._avg},contains:function(t){var e=this,n=t[0]>>s;return gval=t[1]>>s,bval=t[2]>>s,n>=e.r1&&n<=e.r2&&gval>=e.g1&&gval<=e.g2&&bval>=e.b1&&bval<=e.b2}},r.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var e=this.vboxes,n=0;n<e.size();n++)if(e.peek(n).vbox.contains(t))return e.peek(n).color;return this.nearest(t)},nearest:function(t){for(var e,n,r,o=this.vboxes,i=0;i<o.size();i++)n=Math.sqrt(Math.pow(t[0]-o.peek(i).color[0],2)+Math.pow(t[1]-o.peek(i).color[1],2)+Math.pow(t[2]-o.peek(i).color[2],2)),(e>n||void 0===e)&&(e=n,r=o.peek(i).color);return r},forcebw:function(){var t=this.vboxes;t.sort(function(t,e){return pv.naturalOrder(pv.sum(t.color),pv.sum(e.color))});var e=t[0].color;e[0]<5&&e[1]<5&&e[2]<5&&(t[0].color=[0,0,0]);var n=t.length-1,r=t[n].color;r[0]>251&&r[1]>251&&r[2]>251&&(t[n].color=[255,255,255])}},{quantize:u}}(),COLORS=[],COLOR_DEFINITIONS=[{name:"Red",higherThan:350,lowerThan:10,attributes:["sensual","ambitious","extroverted","courageous","egoistic"],count:0},{name:"Orange",higherThan:10,lowerThan:30,attributes:["social","vivacious","unpredictable","assertive","inconsistent"],count:0},{name:"Yellow",higherThan:30,lowerThan:75,attributes:["optimistic","meticulous","nerdy","networker","snob"],count:0},{name:"Green",higherThan:75,lowerThan:135,attributes:["caring","empathetic","practical","gracious","gossip girl"],count:0},{name:"Turquoise",higherThan:135,lowerThan:190,attributes:["wise","independent","idealistic","outspoken","narcissistic"],count:0},{name:"Blue",higherThan:190,lowerThan:240,attributes:["harmonious","trustworthy","loyal","sincere","stubborn"],count:0},{name:"Purple",higherThan:240,lowerThan:310,attributes:["intuitive","futuristic","introspective","eccentric","drama queen"],count:0},{name:"Pink",higherThan:310,lowerThan:350,attributes:["resourceful","loving","generous","romantic","naive"],count:0}];window.onload=function(){start()};