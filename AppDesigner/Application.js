jQuery.sap.declare("untitledproject.Application");
jQuery.sap.require("sap.ui.app.Application");

sap.ui.app.Application.extend("untitledproject.Application", {

	metadata : {
		properties : {
			leaveRequestModelUri : "string",
			imageModelUri : "string",
			locale: "string"
		}
	},

	_oView : null,

	setLeaveRequestModelUri : function(value) {
		this.setProperty("leaveRequestModelUri", value);
		if (this._oModel) {
			this._oModel.destroy();
		}
		this._oModel = new sap.ui.model.json.JSONModel(value);
		sap.ui.getCore().setModel(this._oModel);
	},


	setImageModelUri : function(value) {
		this.setProperty("imageModelUri", value);
		if (this._oImageModel) {
			this._oImageModel.destroy();
		}
		this._oImageModel = new sap.ui.model.json.JSONModel(this.getImageModelUri());
		sap.ui.getCore().setModel(this._oImageModel, "image");
	},


	setLocale : function(value) {
		this.setProperty("locale", value);
		if (this._oI18nModel) {
			this._oI18nModel.destroy();
		}
		this._oI18nModel = new sap.ui.model.resource.ResourceModel({bundleName:"untitledproject.i18n.i18n", bundleLocale: this.getLocale()});
		sap.ui.getCore().setModel(this._oI18nModel, "i18n");
	},


	main : function() {
		if (!jQuery.device.is.tablet) {
			this._oView = sap.ui.htmlview("main", "untitledproject.Main");	
		} else {
			// this is just for demonstration:
			// if different views are needed for tablets, otherwise the app will switch automatically between mobile and tablet
			this._oView = sap.ui.htmlview("main", "untitledproject.Main");
		}

		this._oView.placeAt(this.getRoot());
	},

	/*onError : function(sMessage, sFile, iLine) {
		console.log("Error", sMessage);
	},*/

	onBeforeExit : function(oEvt) {
		console.log("BeforeExit");
	},

	onExit : function(oEvt) {
		console.log("Exit");
	}
});
