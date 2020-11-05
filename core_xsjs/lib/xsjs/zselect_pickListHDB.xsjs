var conn = $.hdb.getConnection();
$.response.status = 200;
var result = {
	status: "success"
};

try {
	var entity = $.request.parameters.get("entity").trim();
	if ($.request.method !== $.net.http.GET) {
		result = {
			status: "error",
			errmsg: "query Request"
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

	var query_SQL = "";
	var sqlLog = "";
	var queryResult = {
		errorMessage: ""
	};

	var body = $.request.body.asString();
	var obj = JSON.parse(body);
	query_SQL = obj.SQL;

	if (entity === 'ZTAB_LMS_SCH_OFFERING') {
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