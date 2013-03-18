sap.ui.controller("untitledproject.view.Reject", {
	
  onInit : function() {
		this.byId("RejectItem").bindProperty("icon", {path: "Type", formatter: untitledproject.util.Conversions.Type2Icon});
	},	
	
  onCancel: function() {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", { id: "DetailPage" });
		this.byId("RejectComment").setValue("");
	  },

  onConfirm: function(oEvt) {
	localStorage.clear("lastAction"); 
  	var oText = sap.ui.getCore().getModel("i18n").getResourceBundle().getText("view.ApprovalItems.LastActionRejected");
	var oCreator = oEvt.getSource().getBindingContext().getProperty("Creator");
  	localStorage.setItem("lastAction", oText + " " + oCreator);
 // After following state change, a new request with another Id and Creator shall be handled  	  	
  	untitledproject.Application.changeState(sap.ui.getCore().getModel("i18n").getResourceBundle().getText("state.Rejected"));
	var oBus = sap.ui.getCore().getEventBus();
	oBus.publish("nav", "to", { id: "ApprovalItemsPage" });
	this.byId("RejectComment").setValue("");	
	},	
    	
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//   onInit: function() {
//
//   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }

});