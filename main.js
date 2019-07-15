

document.addEventListener('DOMContentLoaded', function(){

    // const lang = navigator.language || navigator.userLanguage; 
    // return lang.substring(0, 2);
    const birthday = Math.floor((Date.now() - new Date(1990, 05, 22)) / 1000 / 60 / 60 / 24 / 365);
    document.getElementById('birthday').innerText = birthday;
})