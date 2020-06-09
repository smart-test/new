$(document).ready(function () {
  var modal = $('.modal'),
      modalBtn = $('[data-toggle="modal"]'),
      closeBtn = $('.modal__close, .modal-nav');

  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  closeBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });


  // Cart
  
  


  let cartBtn = $('button[data-name]');

  let cartData = [];

  if (window.localStorage) {
    if (localStorage.getItem('cart') !== null) {
      cartData = JSON.parse(localStorage.getItem('cart'));
      
      iconCard();
      loadCard();
      // загрузка корзины в модалку + показ иконки
    }
  }

  cartBtn.on('click', function (e) {
    let data = e.target;


    let name = data.getAttribute('data-name'),
      size = data.getAttribute('data-size'),
      type = data.getAttribute('data-type'),
      cap = data.getAttribute('data-cap');

    let searchOrder = cartData.find(order => order.id === name + '_' + size + '_' + cap);

    if (!searchOrder) {
      cartData.push({
        id: name + '_' + size + '_' + cap,
        count: 1,
        name: name,
        size: size,
        type: type,
        cap: cap
      });
    } else {
      searchOrder.count = searchOrder.count + 1;
    }
    
    iconCard();
    loadCard();
  });

  $('.basket-icons').on('click', function () {
    let modal = $('.modal-basket');
    modal.addClass('modal-basket__active');
  });

  function iconCard() {
    let cartCount = 0;
    $.each(cartData,function(index,value){
      cartCount+=value.count;
    });
    
    let cart = $('.basket-icons');


    if (cartCount) {
      cart.addClass( 'basket-icons__active' );
      $('.basket-icons__quantity').text(cartCount);
      $('.basket__quantity').text(cartCount + ' шт');
    } else {
      cart.removeClass( 'basket-icons__active' );
      $('.basket__quantity').text("0 шт");
    }
  }

  $('.backet__remove').on('click', function () {
    cartData.splice(0,cartData.length);

    iconCard();
    loadCard();
  });

  function loadCard() {
    $('.basket-product__wrap').empty();
    
    let list = '<ul>';

    $.each(cartData,function(index,value){

      let card = document.createElement("div");
      let li = `<li>${value.name} – ${value.cap} – ${value.type} – ${value.size} – ${value.count} шт</li>`;

      card.classList.add('basket-product__row');
      card.innerHTML = `
        <div class="product-choice">
          <div class="product-choice__name">${value.name} <span class="product-choice__cap">(${value.cap})</span></div>
          <div class="product-choice__type">${value.type}</div>
          <div class="product-choice__size">${value.size}</div>
        </div>
        <div class="product-choice__quanity">
          <div class="product-choice__close" data-id="${value.id}">
            <img src="../img/mobile/close.svg" alt="удалить">
          </div>
          <div class="product-choice__btn">
            <button class="btn-pieces btn-pieces__minus" data-id="${value.id}">-</button>
            <div class="product-choice__pieces">${value.count}&nbsp;шт</div>
            <button class="btn-pieces btn-pieces__plus" data-id="${value.id}">+</button>
            </div>
        </div>`;

      $('.basket-product__wrap').append(card);
      list+= li;
    });

    list+= '</ul>';
    $('textarea[name="userBasket"]').val(list);

    console.log($('textarea[name="userBasket"]').val());

    $('.btn-pieces__plus').on('click', function (e) {
      let id = e.target.getAttribute('data-id');

      let searchOrder = cartData.find(order => order.id === id);

      searchOrder.count = searchOrder.count + 1;
      iconCard();
      loadCard();
    });


    $('.btn-pieces__minus').on('click', function (e) {
      let id = e.target.getAttribute('data-id');

      let searchOrder = cartData.find(order => order.id === id);

      searchOrder.count = searchOrder.count - 1;

      if (searchOrder.count <= 0) {
        let index = cartData.indexOf(searchOrder);
        cartData.splice(index,1);
      }

      iconCard();
      loadCard();
    });

    $('.product-choice__close').on('click', function (e) {
      let id = e.target.getAttribute('data-id');
  
      if (!id) {
        id = e.target.parentNode.getAttribute('data-id')
      }
  
      let searchOrder = cartData.find(order => order.id === id);
      let index = cartData.indexOf(searchOrder);
  
      cartData.splice(index,1);

      iconCard();
      loadCard();
    });

    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  $('.capItem').on('click', function (e) {
    let cap = e.target.getAttribute('data-cap');
    let container = e.target.parentNode.parentNode.parentNode.parentNode;
  
    if (!cap) {
      cap = e.target.parentNode.getAttribute('data-cap');
      container = container.parentNode;
    }

    container.querySelector('.btn__basket').setAttribute('data-cap', cap)
  })

  

  $('.basket-close').on('click', function () {
    let modal = $('.modal-basket');
    modal.removeClass('modal-basket__active');
  });

});  


$(document).ready(function () {
  var mySwiper = new Swiper ('.swiper-container', {
    speed: 900,
    loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  }, 
});
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets =$('.swiper-pagination');

    $(window).scroll(function() {
      var height = $(window).scrollTop();
      if(height > 100){
      $('header').addClass('header__scroll');
      } else{
      $('header').removeClass('header__scroll');
      }
      
      });  	
        var header = $(".header");
        var scrollPrev = 0;
        
        $(window).scroll(function() {
          var scrolled = $(window).scrollTop(); 
          var firstScrollUp = false;
          var firstScrollDown = false;
          var topPosition = header.offset().top;
          
          if ( scrolled > 0 ) {
            if ( scrolled > scrollPrev ) {
              firstScrollUp = false;
              if ( scrolled < header.height() + header.offset().top ) {
                if ( firstScrollDown === false ) {
                  
                  header.css({
                    "top": topPosition + "px"
                  });
                  firstScrollDown = true;
                }
                header.css({
                  "position": "absolute"
                });
              } else {
                header.css({
                  "position": "fixed",
                  "top": "-" + header.height() + "px"
                });
              }
            } else {
              firstScrollDown = false; 
              if ( scrolled > header.offset().top ) {
                if ( firstScrollUp === false ) {
                  header.css({
                    "top": topPosition + "px"
                  });
                  firstScrollUp = true;
                }
                header.css({
                  "position": "absolute"
                });
              } else {
                header.removeAttr("style");
              }
            }
            scrollPrev = scrolled;
          }
          
        });

        new WOW().init();

});

$('.nav__menu').on('click', function () {
  const el = $(this);
  let dest = el.attr('href'); // получаем направление
  if (dest !== undefined && dest !== '') { // проверяем существование
    $('html').animate({
        scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
      }, 900 // скорость прокрутки
    );
  }
  return false;
});

$(document).ready(function(){
  $('#capSelect .capItem').on('click', function(){
    var imgPath;
    imgPath = $(this).attr('data-img-path');
    $('#imgHolder img').fadeOut(500, function(){
      $('#imgHolder img').attr('src', imgPath).fadeIn(300);
    });
  });
});

$(document).ready(function(){
  $('#capSelect1 .capItem').on('click', function(){
    var imgPath;
    imgPath = $(this).attr('data-img-path');
    $('#imgHolder1 img').fadeOut(500, function(){
      $('#imgHolder1 img').attr('src', imgPath).fadeIn(300);
    });
    
  });
});

$(".opacity").click(function(e) {
  e.preventDefault();
  $(".opacity").removeClass('active');
  $(this).addClass('active');
});
$(".opacity1").click(function(e) {
  e.preventDefault();
  $(".opacity1").removeClass('active');
  $(this).addClass('active');
});
$('.capItem').hover(
  function () {
    $(this).addClass('active1');
  },
  function () {
    $(this).removeClass('active1');
  }
);


/* Скролл вверх */
$(document).ready(function(){

  $(function (){
  $("#back-top").hide();

  $(window).scroll(function (){
    if ($(this).scrollTop() > 700){
      $("#back-top").fadeIn();
    } else{
      $("#back-top").fadeOut();
    }
  });
  $("#back-top").click(function (){
    $("body,html").animate({
      scrollTop:0
    }, 800);
    return false;
  });
});
});
$(document).ready(function() { // Ждём загрузки страницы
	
	$(".popup-start").click(function(){	// Событие клика на маленькое изображение
	  	var img = $(this);	// Получаем изображение, на которое кликнули
		var src = img.attr('src'); // Достаем из этого изображения путь до картинки
		$("body").append("<div class='popup'>"+ //Добавляем в тело документа разметку всплывающего окна
             "<div class='popup_bg'></div>"+ // Блок, который будет служить фоном затемненным
             "<button class='popup_close'></button>"+ // Блок, который будет служить фоном затемненным
             "<img src='"+src+"' class='popup_img' />"+ // Само увеличенное фото
						 "</div>"); 
		$(".popup").fadeIn(800); // Медленно выводим изображение
    $(".popup_close").click(function(){	// Событие клика на затемненный фон	  
			$(".popup").fadeOut(800);	// Медленно убираем всплывающее окно
			setTimeout(function() {	// Выставляем таймер
        $(".popup").remove(); // Удаляем разметку всплывающего окна
			}, 800);
    });
    $(".popup_bg").click(function(){	// Событие клика на затемненный фон	  
			$(".popup").fadeOut(800);	// Медленно убираем всплывающее окно
			setTimeout(function() {	// Выставляем таймер
        $(".popup").remove(); // Удаляем разметку всплывающего окна
			}, 800);
		});
  });
    
	
});

$(document).ready(function() {
	$('.news-headlines__item').click(function(event) {
		$('.news-content').removeClass('top-content')
		var num = $(this).attr('data-num');
		$('#new'+num).addClass('top-content')
		$('.news-headlines__item').removeClass('selected')
    $('#item'+num).addClass('selected')
  });
  
  $('.content_toggle').click(function(){
    $('.content_toggle').removeClass('content_visible')
    var num = $(this).attr('data-new');
    $('#new-mobile'+num).addClass('content_visible')
  });

  $('.new-close').click(function(){
    var num = $(this).attr('data-new-close');
    $('#new-mobile'+num).removeClass('content_visible')
	});
});