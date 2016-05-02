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
function sendDataRequest(){var t,e=document.getElementById("formstyle").value;t="@"===e.charAt(0)?e.substring(1):e;var n=0,r="/search?utf8=\u2713&q="+t,o=new XMLHttpRequest;o.onreadystatechange=function(){4===o.readyState&&200===o.status?createParentComponent(JSON.parse(o.responseText)):500===o.status&&0===n&&(type(": sorry can't find that user",0),n=1)},o.open("GET",r,!0),o.setRequestHeader("Accept","text/javascript"),o.send()}function createParentComponent(t){t.length||type(": sorry, I can't see your pictures",0);var e;t.length<12?(t.length=t.length,window.innerWidth<509?e="30%":window.innerWidth>=509&&window.innerWidth<=900?e="22%":window.innerWidth>900&&(e="16%")):t.length>=12&&t.length<48?(t.length=12,window.innerWidth<509?e="30%":window.innerWidth>=509&&window.innerWidth<=900?e="22%":window.innerWidth>900&&(e="16%")):t.length>=48&&(t.length=48,window.innerWidth<509?e="30%":window.innerWidth>=509&&window.innerWidth<=900?e="14%":window.innerWidth>900&&(e="8%")),t.forEach(function(t){var n=document.createElement("div");n.style.width=e,n.style.paddingBottom=e,n.className="parent";var r=createImgandColorDiv(t,e);n.appendChild(r[1]),n.appendChild(r[0]),document.getElementById("picContainer").appendChild(n)})}function createImgandColorDiv(t,e){var e=parseFloat(e)/100*document.getElementById("picContainer").clientWidth,n=document.createElement("img");n.style.height=e+"px",n.style.width=e+"px",n.style.opacity="0";var r=document.createElement("div");return r.style.height=e+"px",r.style.width=e+"px",r.className="cdiv",n.onload=function(){var t=document.getElementsByClassName("cdiv"),e=getDominantHSLColor(n);COLORS.push(e),r.style.backgroundColor="hsl("+e[0]+","+e[1]+"%,"+e[2]+"%)",COLORS.length===t.length&&type(getAttributes(COLORS),0)},n.src=t,[n,r]}function displayButton(){var t=document.getElementById("startOver");t.style.display="block"}function getDominantHSLColor(t){var e=new ColorThief,n=e.getColor(t),r=rgbToHsl(n[0],n[1],n[2]);return r}function rgbToHsl(t,e,n){t/=255,e/=255,n/=255;var r,o,a=Math.max(t,e,n),i=Math.min(t,e,n),u=(a+i)/2;if(a==i)r=o=0;else{var s=a-i;switch(o=u>.5?s/(2-a-i):s/(a+i),a){case t:r=(e-n)/s+(n>e?6:0);break;case e:r=(n-t)/s+2;break;case n:r=(t-e)/s+4}r/=6}return[Math.floor(360*r),Math.floor(100*o),Math.floor(100*u)]}function getAttributes(t){var e=[],n=0;t.forEach(function(t){if(t[1]>=40&&t[2]>20){n++;for(var e=0;e<COLOR_DEFINITIONS.length;e++)t[0]<COLOR_DEFINITIONS[e].lowerThan&&t[0]>=COLOR_DEFINITIONS[e].higherThan&&(COLOR_DEFINITIONS[e].saturation+=t[1],COLOR_DEFINITIONS[e].count++)}}),COLOR_DEFINITIONS.sort(function(t,e){return e.saturation-t.saturation});for(var r=0;r<COLOR_DEFINITIONS.length;r++)COLOR_DEFINITIONS[r].count=Math.floor(COLOR_DEFINITIONS[r].count/n*5*2);for(var o=0;o<COLOR_DEFINITIONS.length;o++)if(0!=COLOR_DEFINITIONS[o].count)for(var a=0;a<COLOR_DEFINITIONS[o].count;a++)e.push(COLOR_DEFINITIONS[o].attributes[a]);return 0===e.length?": you're mysterious":": you're "+e.slice(0,3).join(", ")}function type(t,e){var n=t.charAt(e),r=document.getElementById("formstyle"),o=window.getComputedStyle(r,null).getPropertyValue("font-size"),a=parseFloat(o);r.value+=n,e<t.length?(setTimeout(function(){type(t,e+1)},100*Math.random()),40===e&&window.innerWidth<=900&&(r.style.fontSize=a-5+"px")):(r.disabled=!0,setTimeout(function(){displayButton()},300))}function start(){var t=document.getElementById("formstyle"),e=document.getElementById("picContainer"),n=(document.getElementById("attributes"),document.getElementById("startOver"));t.addEventListener("keydown",function(t){13===t.keyCode&&(t.preventDefault(),t.stopPropagation(),e.innerHTML="",sendDataRequest())}),n.addEventListener("click",function(){COLORS=[];for(var e=0;e<COLOR_DEFINITIONS.length;e++)COLOR_DEFINITIONS[e].count=0,COLOR_DEFINITIONS[e].saturation=0;for(;document.images.length;){var r=document.images[0].parentNode,o=r.parentNode;o.removeChild(r)}var a=document.getElementsByTagName("h1")[0],i=window.getComputedStyle(a,null).getPropertyValue("font-size"),u=parseFloat(i);t.style.fontSize=u+"px",t.disabled=!1,t.value="@",t.focus(),t.setSelectionRange(1,1),n.style.display="none"})}var CanvasImage=function(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.width=this.canvas.width=t.width,this.height=this.canvas.height=t.width,this.context.drawImage(t,0,0,this.width,this.height)};CanvasImage.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)},CanvasImage.prototype.update=function(t){this.context.putImageData(t,0,0)},CanvasImage.prototype.getPixelCount=function(){return this.width*this.height},CanvasImage.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},CanvasImage.prototype.removeCanvas=function(){this.canvas.parentNode.removeChild(this.canvas)};var ColorThief=function(){};/*!
 * quantize.js Copyright 2008 Nick Rabinowitz.
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
/*!
 * Block below copied from Protovis: http://mbostock.github.com/protovis/
 * Copyright 2010 Stanford Visualization Group
 * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
 */
if(ColorThief.prototype.getColor=function(t,e){var n=this.getPalette(t,5,e),r=n[0];return r},ColorThief.prototype.getPalette=function(t,e,n){"undefined"==typeof e&&(e=10),("undefined"==typeof n||1>n)&&(n=10);for(var r,o,a,i,u,s=new CanvasImage(t),c=s.getImageData(),h=c.data,l=s.getPixelCount(),f=[],d=0;l>d;d+=n)r=4*d,o=h[r+0],a=h[r+1],i=h[r+2],u=h[r+3],u>=125&&(o>250&&a>250&&i>250||f.push([o,a,i]));var v=MMCQ.quantize(f,e),p=v?v.palette():null;return s.removeCanvas(),p},!pv)var pv={map:function(t,e){var n={};return e?t.map(function(t,r){return n.index=r,e.call(n,t)}):t.slice()},naturalOrder:function(t,e){return e>t?-1:t>e?1:0},sum:function(t,e){var n={};return t.reduce(e?function(t,r,o){return n.index=o,t+e.call(n,r)}:function(t,e){return t+e},0)},max:function(t,e){return Math.max.apply(null,e?pv.map(t,e):t)}};var MMCQ=function(){function t(t,e,n){return(t<<2*s)+(e<<s)+n}function e(t){function e(){n.sort(t),r=!0}var n=[],r=!1;return{push:function(t){n.push(t),r=!1},peek:function(t){return r||e(),void 0===t&&(t=n.length-1),n[t]},pop:function(){return r||e(),n.pop()},size:function(){return n.length},map:function(t){return n.map(t)},debug:function(){return r||e(),n}}}function n(t,e,n,r,o,a,i){var u=this;u.r1=t,u.r2=e,u.g1=n,u.g2=r,u.b1=o,u.b2=a,u.histo=i}function r(){this.vboxes=new e(function(t,e){return pv.naturalOrder(t.vbox.count()*t.vbox.volume(),e.vbox.count()*e.vbox.volume())})}function o(e){var n,r,o,a,i=1<<3*s,u=new Array(i);return e.forEach(function(e){r=e[0]>>c,o=e[1]>>c,a=e[2]>>c,n=t(r,o,a),u[n]=(u[n]||0)+1}),u}function a(t,e){var r,o,a,i=1e6,u=0,s=1e6,h=0,l=1e6,f=0;return t.forEach(function(t){r=t[0]>>c,o=t[1]>>c,a=t[2]>>c,i>r?i=r:r>u&&(u=r),s>o?s=o:o>h&&(h=o),l>a?l=a:a>f&&(f=a)}),new n(i,u,s,h,l,f,e)}function i(e,n){function r(t){var e,r,o,a,i,u=t+"1",c=t+"2",h=0;for(s=n[u];s<=n[c];s++)if(v[s]>d/2){for(o=n.copy(),a=n.copy(),e=s-n[u],r=n[c]-s,i=r>=e?Math.min(n[c]-1,~~(s+r/2)):Math.max(n[u],~~(s-1-e/2));!v[i];)i++;for(h=p[i];!h&&v[i-1];)h=p[--i];return o[c]=i,a[u]=o[c]+1,[o,a]}}if(n.count()){var o=n.r2-n.r1+1,a=n.g2-n.g1+1,i=n.b2-n.b1+1,u=pv.max([o,a,i]);if(1==n.count())return[n.copy()];var s,c,h,l,f,d=0,v=[],p=[];if(u==o)for(s=n.r1;s<=n.r2;s++){for(l=0,c=n.g1;c<=n.g2;c++)for(h=n.b1;h<=n.b2;h++)f=t(s,c,h),l+=e[f]||0;d+=l,v[s]=d}else if(u==a)for(s=n.g1;s<=n.g2;s++){for(l=0,c=n.r1;c<=n.r2;c++)for(h=n.b1;h<=n.b2;h++)f=t(c,s,h),l+=e[f]||0;d+=l,v[s]=d}else for(s=n.b1;s<=n.b2;s++){for(l=0,c=n.r1;c<=n.r2;c++)for(h=n.g1;h<=n.g2;h++)f=t(c,h,s),l+=e[f]||0;d+=l,v[s]=d}return v.forEach(function(t,e){p[e]=d-t}),r(u==o?"r":u==a?"g":"b")}}function u(t,n){function u(t,e){for(var n,r=1,o=0;h>o;)if(n=t.pop(),n.count()){var a=i(s,n),u=a[0],c=a[1];if(!u)return;if(t.push(u),c&&(t.push(c),r++),r>=e)return;if(o++>h)return}else t.push(n),o++}if(!t.length||2>n||n>256)return!1;var s=o(t),c=0;s.forEach(function(){c++});var f=a(t,s),d=new e(function(t,e){return pv.naturalOrder(t.count(),e.count())});d.push(f),u(d,l*n);for(var v=new e(function(t,e){return pv.naturalOrder(t.count()*t.volume(),e.count()*e.volume())});d.size();)v.push(d.pop());u(v,n-v.size());for(var p=new r;v.size();)p.push(v.pop());return p}var s=5,c=8-s,h=1e3,l=.75;return n.prototype={volume:function(t){var e=this;return(!e._volume||t)&&(e._volume=(e.r2-e.r1+1)*(e.g2-e.g1+1)*(e.b2-e.b1+1)),e._volume},count:function(e){var n=this,r=n.histo;if(!n._count_set||e){var o,a,i,u=0;for(o=n.r1;o<=n.r2;o++)for(a=n.g1;a<=n.g2;a++)for(i=n.b1;i<=n.b2;i++)index=t(o,a,i),u+=r[index]||0;n._count=u,n._count_set=!0}return n._count},copy:function(){var t=this;return new n(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(e){var n=this,r=n.histo;if(!n._avg||e){var o,a,i,u,c,h=0,l=1<<8-s,f=0,d=0,v=0;for(a=n.r1;a<=n.r2;a++)for(i=n.g1;i<=n.g2;i++)for(u=n.b1;u<=n.b2;u++)c=t(a,i,u),o=r[c]||0,h+=o,f+=o*(a+.5)*l,d+=o*(i+.5)*l,v+=o*(u+.5)*l;h?n._avg=[~~(f/h),~~(d/h),~~(v/h)]:n._avg=[~~(l*(n.r1+n.r2+1)/2),~~(l*(n.g1+n.g2+1)/2),~~(l*(n.b1+n.b2+1)/2)]}return n._avg},contains:function(t){var e=this,n=t[0]>>c;return gval=t[1]>>c,bval=t[2]>>c,n>=e.r1&&n<=e.r2&&gval>=e.g1&&gval<=e.g2&&bval>=e.b1&&bval<=e.b2}},r.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var e=this.vboxes,n=0;n<e.size();n++)if(e.peek(n).vbox.contains(t))return e.peek(n).color;return this.nearest(t)},nearest:function(t){for(var e,n,r,o=this.vboxes,a=0;a<o.size();a++)n=Math.sqrt(Math.pow(t[0]-o.peek(a).color[0],2)+Math.pow(t[1]-o.peek(a).color[1],2)+Math.pow(t[2]-o.peek(a).color[2],2)),(e>n||void 0===e)&&(e=n,r=o.peek(a).color);return r},forcebw:function(){var t=this.vboxes;t.sort(function(t,e){return pv.naturalOrder(pv.sum(t.color),pv.sum(e.color))});var e=t[0].color;e[0]<5&&e[1]<5&&e[2]<5&&(t[0].color=[0,0,0]);var n=t.length-1,r=t[n].color;r[0]>251&&r[1]>251&&r[2]>251&&(t[n].color=[255,255,255])}},{quantize:u}}(),COLORS=[],COLOR_DEFINITIONS=[{name:"Red",higherThan:350,lowerThan:10,attributes:["sensual","ambitious","extroverted","courageous","egoistic"],saturation:0,count:0},{name:"Orange",higherThan:10,lowerThan:30,attributes:["social","vivacious","unpredictable","assertive","inconsistent"],saturation:0,count:0},{name:"Yellow",higherThan:30,lowerThan:75,attributes:["optimistic","meticulous","nerdy","networker","snob"],saturation:0,count:0},{name:"Green",higherThan:75,lowerThan:135,attributes:["caring","empathetic","practical","gracious","gossip girl"],saturation:0,count:0},{name:"Turquoise",higherThan:135,lowerThan:190,attributes:["wise","independent","idealistic","outspoken","narcissistic"],saturation:0,count:0},{name:"Blue",higherThan:190,lowerThan:240,attributes:["harmonious","trustworthy","loyal","sincere","stubborn"],saturation:0,count:0},{name:"Purple",higherThan:240,lowerThan:310,attributes:["intuitive","futuristic","introspective","eccentric","drama queen"],saturation:0,count:0},{name:"Pink",higherThan:310,lowerThan:350,attributes:["resourceful","loving","generous","romantic","naive"],saturation:0,count:0}];window.onload=function(){start()};