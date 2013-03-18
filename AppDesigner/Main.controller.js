jQuery.sap.require("jquery.sap.history");


/**
 * Main Controller. Handles all events of the Main views. 
 */
sap.ui.controller("untitledproject.Main", {

	/**
	* Called when a controller is instantiated and its View controls (if available) are already created.
	* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	*/
	onInit: function() {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.subscribe("nav", "to", this.navHandler.bind(this));
		oBus.subscribe("nav", "back", this.navHandler.bind(this));		

	},

	/**
	 * Navigates to certain page.
	 * 
	 * @param id
	 * @param writeHistory
	 * @param navType
	 */
	navTo : function(id, writeHistory, navType) {
		var app = this.byId("app");
		app.to(id);
	},
	
	
	navHandler : function(chan, evt, inf){
		var _id = this.byId(inf.id) ? this.byId(inf.id).getId() : inf.id;
		if (inf.data) {
//			this.getView().setBindingContext(inf.data.context);
// see internal message 1045613/2013 			
			sap.ui.getCore().byId(_id).setBindingContext(inf.data.context);
			if(inf.data._context){
				sap.ui.getCore().byId(_id).setBindingContext(inf.data._context.context, inf.data._context.name);
			}
		}
		this.navTo(_id, true, jQuery.sap.history.NavType.Forward);

	},
});