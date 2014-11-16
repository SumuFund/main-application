Partnerships = new Meteor.Collection('partnerships');

Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
    	email : 'me@schonne.com',
    	password : 'Bella2004!',
    	profile  : {
    	    firstName: 'Schonne',
    	    lastName: 'Eldridge',
    	    role: 'Admin',
    	    photo: 'schonne.jpg'
    	}
    });
}

Router.route('/', function () {
	var isLoggedIn = Session.get('isLoggedIn');
	if (isLoggedIn) {
		this.layout('layout');
		this.render('launchboard', {
			data: function() {
				return Partnerships.findOne({_id: Session.get('currentPartnershipID')});
			}
		});
	}
	else
		this.render('logIn')
}, {
  name: 'Homepage'
});

Router.route('/companies', function () {
	var isLoggedIn = Session.get('isLoggedIn');
	if (isLoggedIn) {
		this.layout('layout');
		this.render('companies');
	}
	else
		this.render('logIn')
});

Router.route('/portfolio', function () {
	var isLoggedIn = Session.get('isLoggedIn');
	if (isLoggedIn) {
		this.layout('layout');
		this.render('portfolio');
	}
	else
		this.render('logIn')
});

Router.route('/knowledge-base', function () {
	var isLoggedIn = Session.get('isLoggedIn');
	if (isLoggedIn) {
		this.layout('layout');
		this.render('knowledge-base');
	}
	else
		this.render('logIn')
});

Router.route('/company-profile/:_id', function () {
	var isLoggedIn = Session.get('isLoggedIn');

	if (isLoggedIn) {
		this.layout('layout');
		this.render('company-profile', {
			data: function() {
				Session.set("currentUserId", this.params._id);
				return Meteor.users.findOne({_id: this.params._id});
			}
		});

	}
	else
		this.render('logIn')
});

Router.route('/contact', function () {
	var isLoggedIn = Session.get('isLoggedIn');
	if (isLoggedIn) {
		this.layout('layout');
		this.render('contact');
	}
	else
		this.render('logIn')
});