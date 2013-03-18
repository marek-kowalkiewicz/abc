
/**
 * History Controller. Handles all events of the History view. 
 */
sap.ui.controller("untitledproject.view.History", {

	onInit : function() {
		this.byId("HistoryItem").bindProperty("icon", {path: "history>Type", formatter: untitledproject.util.Conversions.Type2Icon});
		this.byId("HistoryItem").bindProperty("info", {path: "history>ProceededOn", formatter: untitledproject.util.Conversions.DateShortYTT});
		untitledproject.Application.oHistoryView = this.getView();
	},
	
	onHistory: function(oEvt) {
		jQuery.sap.log.error("Navigation to history page on current page impossible");
	},
	
	onCurrent: function(oEvt) {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", { id: "ApprovalItemsPage" });
	},
});