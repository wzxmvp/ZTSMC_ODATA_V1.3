$.import("xsjs", "jdbcutil_ods");
$.import("xsjs", "commonutil");
$.response.contentType = "application/json;charset=UTF-8";
$.response.status = 200;

var result = {
	status: "success"
};

try {
	var pageno = $.request.parameters.get("pageno");
	var id = $.request.parameters.get("id");
	var sync_dateTime = $.request.parameters.get("sync_dateTime");

	if (!$.xsjs.commonutil.isRealNum(pageno) || pageno < 1) {
		result = {
			status: "error",
			errmsg: "pageno is not a number or less than 1"
		};
		$.response.setBody(JSON.stringify(result));

	} else if (id === undefined || id === "") {
		result = {
			status: "error",
			errmsg: "id is null "
		};
		$.response.setBody(JSON.stringify(result));

	} else if (sync_dateTime === undefined || sync_dateTime === "") {
		result = {
			status: "error",
			errmsg: "sync_dateTime is null "
		};
		$.response.setBody(JSON.stringify(result));
	} else {

		//sql conf in file dataconf.xsjslib

		var queryStr = $.xsjs.jdbcutil_ods.getSqlById(id, pageno, sync_dateTime);
		result.total = $.xsjs.jdbcutil_ods.getCount(id, sync_dateTime);
		var rsdata = $.xsjs.jdbcutil_ods.sqlQuery(queryStr);
		result.data = rsdata;
		$.response.setBody(JSON.stringify(result));
	}

} catch (err) {
	// $.response.contentType = "text/plain";
	result.status = "error";
	result.code = err.toString();
	$.response.setBody(JSON.stringify(result));
}