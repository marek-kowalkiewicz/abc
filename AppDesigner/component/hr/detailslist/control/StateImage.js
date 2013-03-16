jQuery.sap.declare("untitledproject.component.hr.detailslist.control.StateImage");

/**
 * StateImage custom control. Displays icons based on a state.
 */
sap.ui.core.Control.extend("untitledproject.component.hr.detailslist.control.StateImage", {

	constructor : function() {
		sap.ui.core.Control.apply(this, arguments);
		this._oImage = new sap.m.Image();
		this._oImage.addStyleClass("appdesignerApprovalStateImg");
		
		this._oText = new sap.m.Label();
		this._oText.addStyleClass("appdesignerApprovalStateImgText");
	},

	_oImage : null,
	_oText : null,

	metadata: {
		properties: {
			"state": "string"
		}
	},

	onExit : function() {
		this._oImage.destroy();
		this._oImage = null;
		this._oText.destroy();
		this._oImage = null;
	},

	renderer: function(oRm, oControl) {
		var _oModel = oControl.getModel("image");
		oRm.write("<div ");
		oRm.writeControlData(oControl);
		oRm.write(">");
		var sState = oControl.getState();
		var sImage = "";
		if(sState=="Approved"){
			sImage = _oModel.getProperty("/icon/check");
		} else if(sState=="Rejected"){
			sImage = _oModel.getProperty("/icon/rejected");
		} else if(sState=="Pending"){
			sImage = _oModel.getProperty("/icon/pending");
		}
		oControl._oImage.setSrc(sImage);
		oRm.renderControl(oControl._oImage);
		oControl._oText.setText(sState);
		oRm.renderControl(oControl._oText);
		oRm.write("</div>");
	}
});