sap.ui.controller("untitledproject.component.hr.leaverequestlist.view.LeaveRequestList", {

	onShowDetails: function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id: "detailsPage",
			data: {context : evt.oSource.getBindingContext()
			}
		});
	}

});