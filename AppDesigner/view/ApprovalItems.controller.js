jQuery.sap.require("untitledproject.util.Conversions");
jQuery.sap.require("untitledproject.Application");
jQuery.sap.require("sap.m.MessageToast");

/**
 * Approval Items Controller. Handles all events of the Approval Items view. 
 */
sap.ui.controller("untitledproject.view.ApprovalItems", {

	onInit : function() {
		localStorage.clear("lastAction");
		this.byId("TypeIcon").bindProperty("src", {path: "Type", formatter: untitledproject.util.Conversions.Type2Icon});
		this.byId("PriorityIcon").bindProperty("src", {path: "Priority", formatter: untitledproject.util.Conversions.Priority2Icon});
		this.byId("DueDate").bindProperty("text", {path: "DueOn", formatter: untitledproject.util.Conversions.DateShortYTTInText("view.Detail.dueDate")});
		this.byId("vBox1").setLayoutData(new sap.m.FlexItemData({growFactor: 1}));
		this.byId("vBox2").setLayoutData(new sap.m.FlexItemData({growFactor: 3}));
		this.byId("CreatorName").addStyleClass("styleCreatorName");
		this.byId("RequestType").addStyleClass("styleRequestType");
		this.byId("DueDate").addStyleClass("styleDueDate");
//		this.byId("ItemInList").bindProperty("icon", {path: "Type", formatter: untitledproject.util.Conversions.Type2Icon});
//		this.byId("ItemInList").bindProperty("description", {path: "Type"});
//	    this.byId("ItemInList").bindProperty("info", {path: "DueOn", formatter: untitledproject.util.Conversions.DateShortYTTInText("view.Detail.dueDate")});
		this.getView("DetailPage").addEventDelegate({	 
		 onBeforeShow: function() {
			 if (localStorage.getItem("lastAction") != null){ 
				sap.m.MessageToast.show(localStorage.getItem("lastAction"));
				localStorage.clear("lastAction");
			   };
		 }  
		});		
	},
		
	onHistory: function(oEvt) {
		var oModel = untitledproject.Application.getHistoryModel();
		sap.ui.getCore().setModel(oModel, "history");
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", { id: "HistoryPage" });
	},
	
	onCurrent: function(oEvt) {
		jQuery.sap.log.error("Navigation to current page on current page impossible");
	},
	
	onShowDetails: function(oEvt) {		
		var oBus = sap.ui.getCore().getEventBus();
		var sId = oEvt.getSource().getBindingContext().getProperty("Id");
		jQuery.sap.log.debug("Id " + sId + " selected");
		untitledproject.Application.setCurrentId(sId);
		oBus.publish("nav", "to", {
			id: "DetailPage",
			data: {context : oEvt.oSource.getBindingContext()
			}
		});		
	},	

});