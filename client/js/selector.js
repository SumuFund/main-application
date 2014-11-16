
Template.selector.rendered = function() {
	setTimeout(function(){$('.selector').css('top', '80px').css('opacity', 1).css('z-index', '0')}, 1500);
	setTimeout(function(){$('.selector').css('z-index', '1');loadPartnerDOM(Session.get('currentPartnershipID'), 1000)}, 3000);
	var dropdown = document.querySelectorAll('.dropdown');
	var dropdownArray = Array.prototype.slice.call(dropdown,0);
	dropdownArray.forEach(function(el){
		var button = el.querySelector('a[data-toggle="dropdown"]'),
				menu = el.querySelector('.dropdown-menu'),
				arrow = button.querySelector('i.icon-arrow');

		button.onclick = function(event) {
			if(!menu.hasClass('show')) {
				menu.classList.add('show');
				menu.classList.remove('hide');
				arrow.classList.add('open');
				arrow.classList.remove('close');
				event.preventDefault();
			}
			else {
				menu.classList.remove('show');
				menu.classList.add('hide');
				arrow.classList.remove('open');
				arrow.classList.add('close');
				event.preventDefault();
			}
		};
	})

	Element.prototype.hasClass = function(className) {
	    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
	};
}

Template.selector.partnerships = function () {
  return Partnerships.find({}, {sort: {'partnerName' : 1}});
};

Template.selector.events({
	'click .dropdown-menu li a': function (e, template) {
		if(typeof this.logo != 'undefined'){
			var partnerID = this._id;
			$('.selector .dropdown i.icon-arrow').addClass('close');
			$('.sidebar + section').fadeOut();
			if (window.location.pathname === '/') {
				$('.launchboard').fadeOut('slow', function(){
					loadPartnerDOM(partnerID);
					$('.launchboard').fadeIn();
				});
			} else {
				loadPartnerDOM(this._id);
			}
			$('.selector .dropdown-menu').removeClass('show');
			$('.selector .dropdown-menu').addClass('hide');
 		}
 		if (!window.location.pathname === '/') {
			setTimeout(function(){
				Router.go('Homepage');
			}, 1000);			
 		}
	}
})

function loadPartnerDOM(partnerID, timer){
	Session.set('currentPartnershipID', partnerID);
	var partner = Partnerships.findOne({_id : Session.get('currentPartnershipID')});
	var partnerName = partner.partnerName;
	var logo = partner.logo;
	$('.schoolname').fadeOut( "slow", function() {
		$('.schoolname').html(partnerName);
		$('.schoolname').fadeIn();
		});
		if ($('.schoollogo').css('opacity') === "1") {
			$('.schoollogo').css("opacity", 0);
			setTimeout(function(){
				$('.schoollogo').css('background-image', 'url(' + logo + ')');
				$('.schoollogo').css("opacity", 1);
			}, 1000);
		} else {
			$('.schoollogo').css('background-image', 'url(' + logo + ')');
			setTimeout(function(){$('.schoollogo').css("opacity", 1)}, timer);		
		}

		$('.changeform').removeClass('show-nav');
		$('.tableau .changeform .searchTerm').val('');
	$('.sliders').css('opacity', '0');
	$('.sliders').html('');
	$('.docname').html('');
	$('.sidebar .tableau-link').fadeIn();
	documents = [];	
}