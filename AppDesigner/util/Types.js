jQuery.sap.declare("untitledproject.util.Types");

untitledproject.util.Types = function() {
};

untitledproject.util.Types.DATE = new sap.ui.model.type.Date({
	pattern : "yyyy-MM-dd"
});

untitledproject.util.Types.DATE_FULL = new sap.ui.model.type.Date({
	source : {
		pattern : "yyyy-MM-dd"
	},
	pattern : "EEE dd MMM. yyyy"
});