var conn = $.hdb.getConnection();
$.response.status = 200;
var result = {
	status: "success"
};

try {
	var entity = $.request.parameters.get("entity").trim();
	if ($.request.method !== $.net.http.POST) {
		result = {
			status: "error",
			errmsg: "POST Request"
		};
		$.response.setBody(JSON.stringify(result));
	} else if ($.request.headers.get("content-type") !== "application/json") {
		result = {
			status: "error",
			errmsg: "Content-Type is application/json"
		};
		$.response.setBody(JSON.stringify(result));
	} else if (entity === undefined || entity === "") {
		result = {
			status: "error",
			errmsg: "Entity is Null"
		};
		$.response.setBody(JSON.stringify(result));
	}

	var upsert_SQL = "";
	var sqlLog = "";
	var upsertResult = {
		errorMessage: ""
	};

	var body = $.request.body.asString();
	var obj = JSON.parse(body);
	upsert_SQL = obj.SQL;

	if (entity === 'ZTAB_LMS_SCH_OFFERING' || entity === 'ZTAB_LMS_SCH_ENROLL' || entity === 'ZTAB_LMS_LEARNING_HIS' || entity ===
		'ZTAB_LMS_ITEM' || entity === 'ZTAB_LMS_ITEM_TW' || entity === 'ZTAB_LMS_ITEM_CN' || entity === 'ZTAB_LMS_ITEM_EN' || entity === 'ZTAB_LMS_EMP_IDP' || entity ===
		'ZTAB_LMS_INSTRUCTOR' || entity === 'ZTAB_LMS_EMP_TRAIN' || entity === 'ZTAB_LMS_EXE_PROGRAM_STATUS' || entity ===
		'ZTAB_LMS_EXE_LEARNING_PLAN' || entity === 'ZTAB_LMS_TRECORD' || entity === 'ZTAB_LMS_TEACHER' || entity ===
		'ZTAB_LMS_PROGRAM_CURRICULUM' || entity === 'ZTAB_LMS_SURVEYRATING' || entity === 'ZTAB_LMS_SURVEY' || entity ===
		'ZTAB_LMS_DOMAIN_RELATION') {
		try {

			conn.executeUpdate(upsert_SQL);
		} catch (err) {
			result.status = "error";
			var errorMessageLog = upsert_SQL + "----Error Messages:" + err.message.toString();
			upsertResult.errorMessage = errorMessageLog;
			console.log("[#ERROR LMS2HDB LOG -  " + entity + "#]: % s ", errorMessageLog.toString());
		}

		console.log("[#SQL UPSERT LMS2HDB LOG - " + entity + "#]: %s", body.toString());
		conn.commit();
		conn.close();
	}

	result.data = upsertResult;

	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json;charset=utf-8";
	$.response.setBody(JSON.stringify(result));

} catch (err) {
	// $.response.contentType = "text/plain";
	result.status = "error";
	result.code = err.toString();
	$.response.setBody(JSON.stringify(result));
}