/* client/views/view_scan/view_scan.js */

var order_selected, station_selected;

Template.view_scan.orders = function () {

	return Order.prototype.load()
};

Template.view_scan.stations = function () {

	return Station.prototype.load()
};

// Declare client scanLog collection
ScanLog = new Meteor.Collection("scanLog");

// Bind viewScan to Scanlog collection
Template.view_scan.scanLog = function () {
    return ScanLog.find();
};


Template.view_scan.events( {

	'change #scanner' : function () {
		order_selected = order.value ? new Order( JSON.parse( order.value ) ) : undefined;
		
		if ( station.value ) {
			station_selected = new Station( Stations.findOne( { name : station.value } ) );
		}
		else if ( station ) {
			station_selected = new Station( Stations.findOne( { name : station } ) );
		}
		else {
			station_selected = undefined;
		}

		console.log( 'scanner options changed:' );
		console.log( order_selected );
		console.log( station_selected );
	},

	'click #submit' : function () {
		var partNumber = order.value;
		//console.log(weight.value);
		//console.log( partNumber );
		//console.log( Order.part_number );

		if ( station_selected && station_selected._id && order_selected ) {
			station_selected.scan( order_selected );
			station_selected = order_selected = undefined;
			order.value = 'Select an Order';
			station.value = 'Select a Station';
			alert( 'Check-in successful' );
		}

		// create the scanlog entry
        var newScan = {
            scan_number: partNumber,
            scan_station: station,
            time: moment().format('LLLL'),
            name: Meteor.user().profile.name
        };

        console.log( newScan.scan_number );
        console.log( newScan.scan_station );


		//Insert into scan log
		ScanLog.insert(newScan);
        alert("Item has been checked in. Thanks!");
	}
} );