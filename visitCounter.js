var _storageName = "siteVisits";
var _cookieDomain = ".domain.com";
var _cookieDuration = 365; // days
var _visitLifetime = 30; // minutes
var _allowLocalStorage = true;

var _storageEnabled = (_allowLocalStorage && typeof Storage !== void(0)) ? true : false;
function getWeekNumber(e){e=new Date(+e),e.setHours(0,0,0),e.setDate(e.getDate()+4-(e.getDay()||7));var t=new Date(e.getFullYear(),0,1),a=Math.ceil(((e-t)/864e5+1)/7);return a}
function setCookie(e,t,i,o){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3);var a="expires="+n.toUTCString();document.cookie=e+"="+t+"; "+a+";domain="+o+";path=/"}
function getCookie(t){for(var n=t+"=",r=document.cookie.split(";"),e=0;e<r.length;e++){for(var i=r[e];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(n))return i.substring(n.length,i.length)}return""}

var storedVisits = (function(){
  // get current cookie value
  var initContent = (_storageEnabled) ? localStorage.getItem(_storageName) : getCookie(_storageName);
  var d = new Date();
  var currentYear = d.getFullYear();
  var currentMonth = d.getMonth();
  var currentWeek = getWeekNumber(d);
  
  // default visits info
  var siteVisits = {
    "lastpage": d,
    "lastvisitstart": d,
    "visits": {
      "all": 1,
      "week": 1,
      "month": 1
    }
  };
  
  // cookie exists
  if(initContent != "" && initContent != null) {
    oldVisits = JSON.parse(initContent);
    oldLastPage = new Date(oldVisits.lastpage);
    oldLastVisit = new Date(oldVisits.lastvisitstart);
  
    // check time difference between last page and current one
    timeDiff = (d.getTime() - oldLastPage.getTime());
    
    // if it's a new visit
    if(timeDiff > _visitLifetime*60*1000) {
      var oldYear = oldLastVisit.getFullYear();
      var oldMonth = oldLastVisit.getMonth();
      var oldWeek = getWeekNumber(oldLastVisit);
    
      siteVisits.visits.all = oldVisits.visits.all +1;
      // same week ? then increment the counter, else start a new counter
      siteVisits.visits.week = (currentWeek == oldWeek && currentYear == oldYear) ? oldVisits.visits.week +1 : 1;
      // same month ? then increment the counter, else start a new counter
      siteVisits.visits.month = (currentMonth == oldMonth && currentYear == oldYear) ? oldVisits.visits.month +1 : 1;
    } else {
      siteVisits = oldVisits;
      siteVisits.lastpage = d;
      siteVisits.lastvisitstart = oldLastVisit;
    }
  }
  
  // set cookie with new values
  (_storageEnabled) ? localStorage.setItem(_storageName, JSON.stringify(siteVisits)) : setCookie(_storageName, JSON.stringify(siteVisits), _cookieDuration, _cookieDomain);
  
  return siteVisits.visits;
})();
