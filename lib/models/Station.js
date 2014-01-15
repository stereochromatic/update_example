/* lib/models/Station.js */
Stations = new Meteor.Collection( "stations" );

Station = function ( attr ) { _.extend( this, attr ) };

Station.prototype.create = function ( name ) {

	var attr = { name : name };

	Stations.upsert( Stations.maybeFindOne( attr )._id, attr );

	return new Station( attr );
};

Station.prototype.load = function ( name ) {

	var result = Stations.find( name ? { name : name } : {}, { name : 1 } );

	return result.map( function ( record ) { return new Station( record ); } )
}

Station.prototype.scan = function ( order ) {
			
	console.log( 'attempting to scan...' );
	console.log( 'order: ' + order );
	console.log( 'station: ' + this );
	return order.update_station( this.name );
};

Station.prototype.toString = function () {

	return JSON.stringify( this )
}