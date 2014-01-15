/* lib/models/Order.js */

//Creating the Orders collection
Orders = new Meteor.Collection( "orders" );

//order object and constructor
Order = function ( attr ) { _.extend( this, attr ) };

//Creates orders
Order.prototype.create = function ( part_number, due_date, quantity, customer, station) {
	
	var attr = {
		part_number : part_number, 
		due_date : due_date, 
		quantity : quantity, 
		customer : customer,
		station : station
	};

	//creates or updates
	Orders.upsert( Orders.maybeFindOne( attr )._id, attr );
	
	var result = new Order( attr );

	//Passed "receiving" on create from the form handler
	result.update_station( 'Receiving' );
	return result;
};

Order.prototype.load = function ( customer ) {
	
	var result = Orders.find( customer ? { customer : customer } : {}, { customer : 1, due_date : -1 } );

	//Super l33t 
	return result.map( function ( record ) { return new Order( record ) } );
};

Order.prototype.update_station = function ( station ) {

	var record = Orders.maybeFindOne( {
			part_number : this.part_number,
			due_date : this.due_date,
			quantity : this.quantity,
			customer : this.customer 	
		} );

	return Orders.upsert( record._id, {
			part_number : this.part_number,
			due_date : this.due_date,
			quantity : this.quantity,
			customer : this.customer,
			station : station
		}, function () { this.station = station } );
};

Order.prototype.toString = function () {

	return JSON.stringify( this )
}

//Remove function
Order.prototype.remove = function ( part_number ) {

    return Orders.remove( part_number );

}