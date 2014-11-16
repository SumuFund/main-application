Template.header.rendered = function() {
	setTimeout(function(){$('header').css('width', '100%').css('opacity', 1);}, 750);
	setTimeout(function(){$('.user, .pagetitle, .logo').css('opacity', 1);}, 1500);
	$('header').css('z-index', '1')
	setTimeout(function(){$('header').css('z-index', '0')}, 3000);
	var show = 0;
	$('body').on('click','.user',function() {
		$('ul.settings').css('z-index', 2);
		if (show == 0) {
			$('ul.settings').css('z-index', 2)
			 $('ul.settings').animate({
			   'opacity':1
			 },600);
			 $('ul.settings').animate({
			   'margin-top':'35px'
			 }, {
			   duration: 800,
			   queue: false
			 });
			 show = 1;
			}
		else {
			$('ul.settings').animate({'opacity':0},600);
			$('ul.settings').animate({'margin-top':'0'}, {duration: 800,queue: false});
			setTimeout(function(){$('ul.settings').css('z-index', 0)}, 1000);
			show = 0;
		}
	});

	$('body').on('click','section', function() {
		$('ul.settings').animate({'opacity':0},600);
		$('ul.settings').animate({'margin-top':'0'}, {duration: 800,queue: false});
		setTimeout(function(){$('ul.settings').css('z-index', 1)}, 1000);
		show = 0;
	});
}

// 

Template.header.helpers({
  firstName: function() {
  	if (Meteor.user())
    return Meteor.user().profile.firstName;
  },
  lastName: function() {
  	if (Meteor.user())
    return Meteor.user().profile.lastName;
  },
  photo: function() {
  	if (Meteor.user())
    return Meteor.user().profile.photo;
  },
  role: function() {
  	if (Meteor.user())
    return Meteor.user().profile.role;
  },
  _id: function() {
  	if (Meteor.user())
  	return Meteor.user()._id;
  }
});

Template.header.events({
    "click .logout": function(){
	Session.set('isLoggedIn', false)
    }
})