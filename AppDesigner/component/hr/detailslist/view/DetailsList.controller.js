jQuery.sap.require("untitledproject.component.hr.detailslist.control.ListRepeater");
jQuery.sap.require("untitledproject.component.hr.detailslist.control.StateImage");
jQuery.sap.require("untitledproject.util.Types");

sap.ui.controller("untitledproject.component.hr.detailslist.view.DetailsList", {

	onInit : function() {
		var oRepeater = this.byId("pageDetailsListRepeater");
		var oRepeaterListTemplate = oRepeater.getBindingInfo("lists").template;

		oRepeaterListTemplate.getItems()[0].bindProperty("value", {
			path : "from",
			type : untitledproject.util.Types.DATE_FULL
		});

		oRepeaterListTemplate.getItems()[1].bindProperty("value",{
			path : "to",
			type : untitledproject.util.Types.DATE_FULL
		});

		oRepeater.bindAggregation("lists", {path: "items", template:oRepeaterListTemplate, sorter: new sap.ui.model.Sorter("from", true)});
	}

});