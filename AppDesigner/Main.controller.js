jQuery.sap.require("untitledproject.util.Types");
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
		var bus = sap.ui.getCore().getEventBus();

		// TODO: MOVE THIS TO A BETTER PLACE
		var oDateType = untitledproject.util.Types.DATE;

		bus.subscribe("nav", "to", function(chan, evt, inf){
			var _id = this.byId(inf.id) ? this.byId(inf.id).getId() : inf.id;
			
			if (inf.id === "createPage") {
				var oCreateModel = null;
				oCreateModel = new sap.ui.model.json.JSONModel();

				oCreateModel.setData({
					"type": "Vacation",
					"from": oDateType.formatValue(new Date(), "string"),
					"to": oDateType.formatValue(new Date(), "string"),
					"length": "1 day",
					"state": "Pending",
					"description": ""
				});
				this.getView().setModel(oCreateModel, "create");

				// TODO
				/*
				if (bSetContext && oListMaster.getItems().length > 0) {
					oPageCreate.setBindingContext(oListMaster.getItems()[0].getBindingContext());
				}
				*/
			}
			if (inf.data) {
				this.getView().setBindingContext(inf.data.context);
			}

			this.navTo(_id, true, jQuery.sap.history.NavType.Forward);
		}, this);
		bus.subscribe("nav", "back", function(chan, evt, inf){
			var _id;
			if(inf.id) {
				_id = this.byId(inf.id) ? this.byId(inf.id).getId() : inf.id;
			}
			this.navTo(_id, false, jQuery.sap.history.NavType.Back);
		}, this);
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
		// check param
		if (navType === jQuery.sap.history.NavType.Back) {
			if(id) {
				app.backToPage(id);
			}else {
				if(!app.backDetail) {
					app.back();
				} else {
					app.backDetail();
				}
			}
			return;
		} else {
			app.to(id);
		}

		// this is the lazy loading of views (based on identical ids for view and view-instance)
	/*	if (sap.ui.getCore().byId(id) === undefined) {
			jQuery.sap.log.info("now loading view '" + id + "'");
			var view = sap.ui.jsview(id, id);
			app.addPage(view);
		} 		*/
		// tell app control to navigate forward

		// write browser history
		if (writeHistory === undefined || writeHistory) {
			var bookmarkable = false;
			var stateData = { id : id };
			jQuery.sap.history.addHistory("page", stateData, bookmarkable);
		}

		// log
		jQuery.sap.log.info("navTo '" + id + "' (" + writeHistory + "," + navType + ")");
	}
});