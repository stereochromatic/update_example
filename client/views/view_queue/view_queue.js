Template.view_queue.orders = function () {
	return Order.prototype.load()
}

// Remove order handler
Template.view_queue.events = {
  'click input.delete': function () {
    Order.prototype.remove(this._id);
  }
};