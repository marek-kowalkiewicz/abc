jQuery.sap.declare("untitledproject.Application");

jQuery.sap.require("sap.ui.base.Object");

sap.ui.base.Object.extend("untitledproject.Application", {
	
	
	main : function() {
		var oView = sap.ui.htmlview("main", "untitledproject.Main");
		var oI18nModel = new sap.ui.model.resource.ResourceModel({bundleName:"untitledproject.i18n.i18n", bundleLocale: untitledproject.Application.Locale});
	  sap.ui.getCore().setModel(oI18nModel, "i18n");
		oView.placeAt("content");
		var oModel = new sap.ui.model.json.JSONModel("mockdata/Items.json");
		sap.ui.getCore().setModel(oModel);
	}
	
});

untitledproject.Application.Locale = new sap.ui.core.Locale(sap.ui.getCore().getConfiguration().getFormatLocale());

untitledproject.Application.sId = null;

untitledproject.Application.setCurrentId = function(sId){
	untitledproject.Application.sId = sId;
};

untitledproject.Application.aHistoryBuffer = [];
untitledproject.Application.oHistoryView = null;

untitledproject.Application.changeState = function(sNewState){
	var oModel = sap.ui.getCore().getModel();
	var aDataOld = oModel.getData();
	var aDataNew = [];
	for (var i = 0; i < aDataOld.length; i++){
		if (aDataOld[i].Id == untitledproject.Application.sId){
			aDataOld[i].StatusText = sNewState;
			aDataOld[i].ProceededOn = new Date();
			untitledproject.Application.aHistoryBuffer.push(aDataOld[i]);
		} else {
			aDataNew.push(aDataOld[i]);
		}
	}
	oModel.setData(aDataNew);
	if (untitledproject.Application.oHistoryView){
	}
};

untitledproject.Application.oHistoryModel = null;

untitledproject.Application.getHistoryModel = function(){
  if (!untitledproject.Application.oHistoryModel){
  	var oModel = new sap.ui.model.json.JSONModel("mockdata/HistoryItems.json");
  	oModel.loadData("mockdata/HistoryItems.json", "", false);
  	untitledproject.Application.oHistoryModel = new sap.ui.model.json.JSONModel(oModel.getData());
  }
  if (untitledproject.Application.aHistoryBuffer.length > 0){
  	var aData = untitledproject.Application.oHistoryModel.getData();
  	var aDataNew = untitledproject.Application.aHistoryBuffer.slice();
  	for (var i = 0; i < aData.length; i++){
  		aDataNew.push(aData[i]);
  	}
  	untitledproject.Application.oHistoryModel.setData(aDataNew);
  	untitledproject.Application.aHistoryBuffer = [];
  }
  return untitledproject.Application.oHistoryModel;
};