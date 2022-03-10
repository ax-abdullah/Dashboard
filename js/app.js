'use strict';
const allDropDown = document.querySelectorAll('.side-dropdown');

const profileImg = document.querySelector('.profile-img');
const profileLinks = document.querySelector('.profile-link');

const progress = document.querySelectorAll('.card__progress');
const label = document.querySelectorAll('.card__label');
/**
 * @param {Iterable} item two ul elements that we select its parent (li) and get the first anchor child element (a) from it 
 * 
 * when this a is clicked we check if it doesn't have the active class.
 * so we loop through the uls again and remove the active class from any other anchors and and hide the li elements 
 * 
 * then we add to this particular anchor the active class and show the hidden li elements
 */
allDropDown.forEach(item => {
    const a = item.parentElement.querySelector('a:first-child');
    a.addEventListener('click', function(e) {
        e.preventDefault();
        if(!this.classList.contains('active')){
            allDropDown.forEach(i => {
                const aLink = i.parentElement.querySelector('a:first-child');
                aLink.classList.remove('active');
                i.classList.remove('show');
            })
        }
        this.classList.toggle('active');
        item.classList.toggle('show');
    })
});

/**
 * display or hide the profile links and settings by clicking on the profile picture.
 * 
 * if we clicked outside of the profile picture while the profile links are visible,then it will be hidden.
 */

profileImg.addEventListener('click', () =>{
    profileLinks.classList.toggle('show');
});
window.addEventListener('click', (e)=>{
    // if((profileLinks == e.target || profileImg == e.target)) return;
    // if(!profileLinks.classList.contains('show')) return;
    if(!(profileLinks == e.target || profileImg == e.target)){
        if(profileLinks.classList.contains('show')){
            profileLinks.classList.remove('show');
        }
    }

    document.querySelectorAll('.menu').forEach(item =>{
        const link = item.querySelector('.menu__link');
        const icon  = item.querySelector('.icon');

        if(e.target !== link){
          if(e.target !== icon ){
            if(link.classList.contains('show')){
              link.classList.remove('show')
            }
          }
        }
    })
})


/**
 * setting the width of the progress bar according to the value of dataset (data-value) property in addition to adding the value of the label via the same dataset
 */
progress.forEach((pro, index, array) =>{
    console.log(pro.dataset.value);
    pro.style.setProperty('--value', `${pro.dataset.value}%`);
    label[index].innerHTML = `${array[index].dataset.value}%`;
});

// Chart 

var options = {
    series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
    chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();


  const menu = document.querySelector('.data');
  
  

  menu.addEventListener('click', (e) =>{
      if(!(e.target.tagName == 'I') ) return;
     
       e.target.parentElement.querySelector('.menu__link').classList.toggle('show')
  });

let clicked = false;
// Toggle sidebar Collabse
const toggler = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');
const sideMenu = document.querySelector('.side-menu');
const allDividers = document.querySelectorAll('.side-menu .divider');
toggler.addEventListener('click', ()=>{
  sidebar.classList.toggle('show');

  allDividers.forEach(item => {
    sidebar.classList.contains('show') ? item.textContent = '-': item.textContent = item.dataset.text;
  });

})

sidebar.addEventListener('mouseenter', function(){
  // allDropDown.forEach(i => {
  //   const aLink = i.parentElement.querySelector('a:first-child');
  //   aLink.classList.remove('active');
  //   i.classList.remove('show');
  // });
  allDividers.forEach(item => {
    if(sidebar.classList.contains('show')) item.textContent = item.dataset.text
  });
})

sidebar.addEventListener('mouseleave', function(){
  if(sidebar.classList.contains('show')){
    allDropDown.forEach(i => {
      const aLink = i.parentElement.querySelector('a:first-child');
      aLink.classList.remove('active');
      i.classList.remove('show');
    });
  
    allDividers.forEach(item => {
     item.textContent ='-'
    });
  }
});


if (window.matchMedia("(max-width: 768px)").matches) {
  sidebar.classList.add('show')
}
else {  sidebar.classList.remove('show')
}