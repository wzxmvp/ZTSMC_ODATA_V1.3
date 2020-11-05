$.import("xsjs", "jdbcutil_LMS_upsert_entity");

$.response.contentType = "application/json;charset=UTF-8";
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

	var body = $.request.body.asString();
	var upsertResult = $.xsjs.jdbcutil_LMS_upsert_entity.executeUpdateSQL(entity, body);
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