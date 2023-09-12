(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();const d="9843a344764c7816f2325b732271f5e4",e={months:["Janv","Févr","Mars","Avril","Mai","Juin","Juil","Aout","Sept","Oct","Nov","Dec"],counterRefresh:0,actualCity:"Paris",actualCityTitle:document.querySelector("#now h2"),actualWeatherTxt:document.getElementById("actual-weather_txt"),actualWeatherImg:document.getElementById("actual-weather_img"),actualTempTxt:document.getElementById("actual-temp_txt"),actualFeelTxt:document.getElementById("actual-feel_txt"),actualWindTxt:document.getElementById("actual-wind_txt"),actualHumidityTxt:document.getElementById("actual-humidity_txt"),actualSunTxt:document.getElementById("actual-sun_txt"),actualSunImg:document.getElementById("actual-sun_img"),forecastHoursDiv:document.getElementById("forecastHours"),forecastDaysDiv:document.getElementById("forecastDays"),cityForm:document.getElementById("city-form"),cityInput:document.getElementById("city"),notificationsDiv:document.getElementById("notifications"),init:async()=>{console.log("Initialisation de l'application en cours..."),e.cityForm.addEventListener("submit",e.handleFormSubmit),e.refreshApp(),console.log("Application initialisée."),e.notify("Bienvenue, veuillez choisir votre ville")},refreshApp:async()=>{console.log("Réception du formulaire...");const t=await e.getLocation();if(t.lat===0&&t.lon===0||t.lat===void 0||t.lon===void 0)e.notify("Aucune ville n'a été trouvée à ce nom... 😢",5,"error");else{const o=await e.getWeather(t);e.showWeatherInDom(o);const n=await e.getForecast(t);e.showForecastHoursInDom(n),e.showForecastDaysInDom(n),e.cityInput.value="",e.counterRefresh>0&&e.notify(`Voici la météo pour ${e.actualCity} 😄`,5,"nice"),e.counterRefresh++}},getLocation:async()=>{console.log(`Récupération des coordonnées en cours pour la ville de ${e.actualCity}...`);try{const t=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${e.actualCity.toLowerCase()},fr&limit=2&appid=${d}`);if(t.status!==200)throw new Error("Problème API");const o=await t.json(),n={lat:0,lon:0};return o.length===0?(console.log("Ville non trouvée..."),n):(e.actualCity=o[0].name,n.lat=o[0].lat,n.lon=o[0].lon,n)}catch(t){console.error(t);return}},getWeather:async t=>{const{lat:o,lon:n}=t;console.log(`Recherche de la météo pour la lattitude : ${o} et longitude : ${n}`);try{const a=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${o}&lon=${n}&lang=fr&units=metric&appid=${d}`);if(a.status!==200)throw new Error("Problème API");const r=await a.json();return console.log("Données réceptionnées"),r}catch(a){console.error(a);return}},getForecast:async t=>{const{lat:o,lon:n}=t;console.log(`Recherche des prévisions météo pour la lattitude : ${o} et longitude : ${n}`);try{const a=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${o}&lon=${n}&lang=fr&units=metric&appid=${d}`);if(a.status!==200)throw new Error("Problème API");const r=await a.json();return console.log("Données réceptionnées"),r.list}catch(a){console.error(a);return}},showWeatherInDom:t=>{console.log("Affichage des données en cours..."),e.actualCityTitle.textContent=`Actuellement à ${e.actualCity}`;const o=t.weather[0].description;e.actualWeatherTxt.textContent=o[0].toUpperCase()+o.slice(1),e.actualWeatherImg.src=`https://openweathermap.org/img/wn/${t.weather[0].icon}.png`,e.actualTempTxt.textContent=`${t.main.temp.toFixed(1)}°C`,e.actualFeelTxt.textContent=`Ressenti : ${t.main.feels_like.toFixed(1)}°C`,e.actualWindTxt.textContent=`${(t.wind.speed*3.6).toFixed(2)} km/h`,e.actualHumidityTxt.textContent=`${Math.round(t.main.humidity)}% d'humitité`;const n="0"+new Date(t.sys.sunrise*1e3).getHours()+"h"+new Date(t.sys.sunrise*1e3).getMinutes(),a=new Date(t.sys.sunset*1e3).getHours()+"h"+new Date(t.sys.sunset*1e3).getMinutes();e.actualSunTxt.textContent=`Levé à ${n} couché à ${a}`,t.weather[0].id.toString()[0]==="7"?document.body.style.background="url('../img/Fog.jpg') no-repeat center/cover fixed":document.body.style.background=`url('../img/${t.weather[0].main}.jpg') no-repeat center/cover fixed`,console.log("Données actualisées dans le DOM.")},showForecastHoursInDom:t=>{console.log("Affichage des prévisions des 9 prochaines heures en cours..."),e.forecastHoursDiv.textContent="";for(let o=0;o<3;o++){const n=t[o],a=document.createElement("div");a.className="card";const r=document.createElement("div");r.className="date";const c=new Date(n.dt*1e3);r.textContent=`${c.getDate()}-${e.months[c.getMonth()]} ${c.getHours()}h`;const i=document.createElement("div");i.className="card__weather";const s=document.createElement("img");s.src=`https://openweathermap.org/img/wn/${n.weather[0].icon}.png`,s.alt=n.weather[0].main;const l=document.createElement("div");l.textContent=`${n.main.temp.toFixed(1)}°C`,i.append(s,l),a.append(r,i),e.forecastHoursDiv.appendChild(a)}},showForecastDaysInDom:t=>{console.log("Affichage des prévisions des 9 prochaines heures en cours..."),e.forecastDaysDiv.textContent="";for(let o=1;o<5;o++){const n=e.getForecastPerDay(o,t),a=document.createElement("div");a.className="card";const r=document.createElement("div");r.className="date",r.textContent=n.date;const c=document.createElement("div"),i=document.createElement("div");i.textContent="Matin";const s=document.createElement("div");s.className="card__weather";const l=document.createElement("img");l.src=n.am.weatherIcon,l.alt=n.am.altIcon;const p=document.createElement("div");p.textContent=n.am.temp,s.append(l,p),c.append(i,s);const h=document.createElement("div"),g=document.createElement("div");g.textContent="Après-midi";const u=document.createElement("div");u.className="card__weather";const m=document.createElement("img");m.src=n.pm.weatherIcon,m.alt=n.pm.altIcon;const f=document.createElement("div");f.textContent=n.pm.temp,u.append(m,f),h.append(g,u),a.append(r,c,h),e.forecastDaysDiv.appendChild(a)}},getForecastPerDay:(t,o)=>{console.log(`Récupération des prévisions pour J+${t}`);const n=new Date,a=new Date;a.setDate(n.getDate()+t);const r=o.find(i=>{const s=new Date(i.dt*1e3);return s.getDate()===a.getDate()&&s.getHours()>7&&s.getHours()<12}),c=o.find(i=>{const s=new Date(i.dt*1e3);return s.getDate()===a.getDate()&&s.getHours()>13&&s.getHours()<18});return{date:`${a.getDate()}-${e.months[a.getMonth()]}`,am:{weatherIcon:`https://openweathermap.org/img/wn/${r.weather[0].icon}.png`,altIcon:r.weather[0].main,temp:`${r.main.temp.toFixed(1)}°C`},pm:{weatherIcon:`https://openweathermap.org/img/wn/${c.weather[0].icon}.png`,altIcon:c.weather[0].main,temp:`${c.main.temp.toFixed(1)}°C`}}},handleFormSubmit:t=>{var a;t.preventDefault(),console.log("Soumission du formulaire. Récupération des données...");const n=(a=new FormData(e.cityForm).get("city"))==null?void 0:a.toString();isNaN(n)&&n.match(/^[a-zA-ZÀ-ÿ\s'-]+$/)?(e.actualCity=n,e.refreshApp()):e.notify("Vous avez saisit des caractères incorrects ! Veuillez saisir une ville française 😄",5,"error")},notify:(t,o=3,n="neutral")=>{e.notificationsDiv.className=n,e.notificationsDiv.textContent=t,setTimeout(()=>{e.notificationsDiv.className=""},o*1e3)}};document.addEventListener("DOMContentLoaded",e.init);
