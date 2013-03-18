sap.ui.controller("untitledproject.view.Forward", {
	
  onInit : function() { 
		this.byId("SendItem").bindProperty("icon", {path: "Type", formatter: untitledproject.util.Conversions.Type2Icon});
		this.byId("SendItem").bindProperty("description", {path: "DueOn", formatter: untitledproject.util.Conversions.DateShortYTTInText("view.Detail.dueDate")});		
		this.byId("agentName").addStyleClass("styleAgentName");
		this.byId("forwardTo").addStyleClass("styleForwardTo");
		this.getView().addEventDelegate({
			onBeforeShow: function(){
				oAgentName = this.getView().getBindingContext("search").getProperty("Name");
				this.byId("agentName").setText(oAgentName);
			}	
		}, this);				
	},	
	
  onCancel: function() {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", { id: "DetailPage" });
		this.byId("ForwardComment").setValue("");
	  },

  onSend: function() {
		localStorage.clear("lastAction"); 
	  	var oText = sap.ui.getCore().getModel("i18n").getResourceBundle().getText("view.ApprovalItems.LastActionForwarded");
	  	localStorage.setItem("lastAction", oText + " " + oAgentName);
// After following state change, a new request with another Id and Creator shall be handled  
  	    untitledproject.Application.changeState(sap.ui.getCore().getModel("i18n").getResourceBundle().getText("state.Forwarded"));
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", { id: "ApprovalItemsPage" });
		this.byId("ForwardComment").setValue("");
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