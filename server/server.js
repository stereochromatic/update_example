/* server/server.js */

//if(Station.prototype.load()==0){
	Station.prototype.create( 'Prepping' );
	Station.prototype.create( 'Molding' );
	Station.prototype.create( 'Curing' );
	Station.prototype.create( 'Finishing' );
	Station.prototype.create( 'Inspection' );
	Station.prototype.create( 'Shipping' );
//}

if(Customer.prototype.load()==0){
	Customer.prototype.create( 'H Products', '124 Red Street', '937-561-5884' );
	Customer.prototype.create( 'PJ\'s Tool & Die', '4887 Troy Street', '937-460-8070' );
	Customer.prototype.create( 'P Hydro', '7800 Green Ave', '937-241-4987' );
}

if(Order.prototype.load()==0){
	Order.prototype.create( '101', '11/20/13', '5000/box', 'P Hydro' );
	Order.prototype.create( '201', '11/30/13', '3000/bag', 'H Products' );
	Order.prototype.create( '301', '12/6/13', '500/box', 'PJ\'s Tool & Die' );
}
// Declare server Materials collection
Materials = new Meteor.Collection("materials");

// Declare server Materials Log collection
MaterialsLog = new Meteor.Collection("materialsLog");

// Declare server Scan Log collection
ScanLog = new Meteor.Collection("scanLog");
 
// Seed the materials database with a few Materials
Meteor.startup(function () {
    if (Materials.find().count() == 0) {
        Materials.insert({ material_number: "A", material_qty: "5000", comment: "Something useful here"});
        Materials.insert({ material_number: "B", material_qty: "7000", comment: "Something else useful here"});
        Materials.insert({ material_number: "C", material_qty: "3000", comment: "Something really useful here"});
    }
    if (this.userId){
        console.log(this.userId);
    }
});

//Accounts.ui.config({ passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL' });

 
// Seed the materials log
Meteor.startup(function () {
   if (MaterialsLog.find().count() == 0) {
        MaterialsLog.insert({ log_number: "A", qty_added: "5000", time: "Timestamp", name: "Dan", supplier: "Humphrey", comment: "Something really useful here"});
        MaterialsLog.insert({ log_number: "B", qty_added: "7000", time: "Timestamp", name: "Dan", supplier: "Humphrey", comment: "Something really useful here"});
        MaterialsLog.insert({ log_number: "C", qty_added: "3000", time: "Timestamp", name: "PJ", supplier: "Humphrey", comment: "Something really useful here"});
    }
});

//Roles.addUsersToRoles(Meteor.user().userId, 'admin');

//Add users to roles
 /* var users = [
      {name:"HTEI Shop",email:"shop@htei.com",roles:['shop']}
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "password",
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }

  });*/
