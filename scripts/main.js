

document.addEventListener('DOMContentLoaded', function(){

    const lang = (navigator.language || navigator.userLanguage).substring(0, 2); 
    document.body.classList.add('lang-' + lang);


    const birthday = Math.floor((Date.now() - new Date(1990, 05, 22)) / 1000 / 60 / 60 / 24 / 365);
    document.getElementById('js-birthday').innerText = birthday;
    
    document.getElementById('js-current-year').innerText = new Date().getFullYear();

    
    const elements = document.querySelectorAll('.balloon, .section-title, .radial, .timeline, .timeline-skills');			   
    new ShowByScroll(elements, {});
    
})