


/********************************* mobile menu */
$.fn.extend({
  
    // Define the threeBarToggle function by extending the jQuery object
    threeBarToggle: function(options){
      
      // Set the default options
      var defaults = {
        color: 'black',
        width: 30,
        height: 25,
        speed: 400,
        animate: true
      }
      var options = $.extend(defaults, options); 
      
      return this.each(function(){
        
        $(this).empty().css({'width': options.width, 'height': options.height, 'background': 'transparent'});
        $(this).addClass('tb-menu-toggle');
        $(this).prepend('<i></i><i></i><i></i>').on('click', function(event) {
          event.preventDefault();
          $(this).toggleClass('tb-active-toggle');
          if (options.animate) { $(this).toggleClass('tb-animate-toggle'); }
          $('.tb-mobile-menu').slideToggle(options.speed);
        });
        $(this).children().css('background', options.color);
      });
    },
    
    // Define the accordionMenu() function that adds the sliding functionality
    accordionMenu: function(options){
      
      // Set the default options
      var defaults = {
        speed: 400
      }
      var options =  $.extend(defaults, options);
  
      return this.each(function(){
        
        $(this).addClass('tb-mobile-menu');
        var menuItems = $(this).children('li');
        menuItems.find('.sub-menu').parent().addClass('tb-parent');
        $('.tb-parent ul').hide();
        $('.tb-parent > a').on('click', function(event) {
          event.stopPropagation();
          event.preventDefault();
          $(this).siblings().slideToggle(options.speed);
        });
        
      });
    }
  });
  
  // Convert any element into a three bar toggle
  // Optional arguments are 'speed' (number in ms, 'slow' or 'fast') and 'animation' (true or false) to disable the animation on the toggle
  $('#menu-toggle').threeBarToggle({color: '#0D99FF', width: 30, height: 25});
  
  // Make any nested ul-based menu mobile
  // Optional arguments are 'speed' and 'accordion' (true or false) to disable the behavior of closing other sub
  $('#menu').accordionMenu();


  // 
  //compressed-pdf-section-two-slider

let isDown = false;
let startX;
let scrollLeft;
const pdfSlider = document.querySelector('.items');

const end = () => {
	isDown = false;
  pdfSlider.classList.remove('pdfactive');
}

const start = (e) => {
  isDown = true;
  pdfSlider.classList.add('pdfactive');
  startX = e.pageX || e.touches[0].pageX - pdfSlider.offsetLeft;
  scrollLeft = pdfSlider.scrollLeft;	
}

const move = (e) => {
	if(!isDown) return;

  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - pdfSlider.offsetLeft;
  const dist = (x - startX);
  pdfSlider.scrollLeft = scrollLeft - dist;
}

(() => {
	pdfSlider.addEventListener('mousedown', start);
	pdfSlider.addEventListener('touchstart', start);

	pdfSlider.addEventListener('mousemove', move);
	pdfSlider.addEventListener('touchmove', move);

	pdfSlider.addEventListener('mouseleave', end);
	pdfSlider.addEventListener('mouseup', end);
	pdfSlider.addEventListener('touchend', end);
})();


window.onload = function(){zoom(1)}
function zoom(zm) {
  img=document.getElementById("pic")
  wid=img.width
  ht=img.height
  img.style.width=(wid*zm)+"px"
  img.style.height=(ht*zm)+"px"
  img.style.marginLeft = -(img.width/2) + "px";
  img.style.marginTop = -(img.height/2) + "px";
}




//radial-progress-bar




// my sccount dropdown

// ✅ Setting checked property
(() => {
  const selectAllCheckbox = document.getElementById("correct-select-all");
  const childCheckboxes = document.querySelectorAll(".correct-child-checkbox");

  const toggleSelectAllCheckbox = () => {
    const areAllChecked = [...childCheckboxes].every((c) => c.checked === true);
    childCheckboxes.forEach((c) => {
      c.checked = !areAllChecked;
    });
    selectAllCheckbox.checked = !areAllChecked;
  };

  selectAllCheckbox.addEventListener("click", toggleSelectAllCheckbox);

  // Handle child click events
  const toggleChildCheckbox = () => {
    const areAllChecked = [...childCheckboxes].every((c) => c.checked === true);
    selectAllCheckbox.checked = areAllChecked;
  };

  childCheckboxes.forEach((c) => {
    c.addEventListener("click", toggleChildCheckbox);
  });
})();
