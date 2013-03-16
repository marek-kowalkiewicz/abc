jQuery.sap.declare("untitledproject.component.hr.detailslist.control.ListRepeater");

/**
 * ListRepeater custom control. Used to repeat and render mobile lists.
 */
sap.ui.core.Control.extend("untitledproject.component.hr.detailslist.control.ListRepeater", {
	
	metadata: {
		properties: {
			"title": "string"
		},
		aggregations : {
			"lists" : {type:"sap.m.List", multiple : true}
		},
		defaultAggregation : "lists"
	},

	renderer: function(oRm, oControl) {
		oRm.write("<div ");
		oRm.writeControlData(oControl);
		oRm.write(">");
		oRm.renderControl(new sap.m.Label({text:oControl.getTitle()}));
		var lists = oControl.getLists();
		for(var i = 0; i < lists.length; i++){
			oRm.renderControl(lists[i]);
		}
		oRm.write("</div>");
	}
});