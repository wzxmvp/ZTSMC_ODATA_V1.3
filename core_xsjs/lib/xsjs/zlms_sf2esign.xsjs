$.import("xsjs", "jdbcutil_eSign");
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

		var queryStr = '';
		//sql conf in file dataconf.xsjslib
		if (id === 'LMS_CHECK_HW_GRADE_RECORDS') {
			var parameter_ID = sync_dateTime.split("|");
			var STUD_ID = parameter_ID[0];
			var CPNT_ID = parameter_ID[1];

			queryStr = $.xsjs.jdbcutil_eSign.getSql_CHECK_HW_GRADE_RECORDS(id, pageno, STUD_ID, CPNT_ID);
		} else {
			queryStr = $.xsjs.jdbcutil_eSign.getSqlById(id, pageno, sync_dateTime);
		}

		var rsdata = $.xsjs.jdbcutil_eSign.sqlQuery(queryStr);
		result.data = rsdata;
		$.response.setBody(JSON.stringify(result));
	}

} catch (err) {
	// $.response.contentType = "text/plain";
	result.status = "error";
	result.code = err.toString();
	$.response.setBody(JSON.stringify(result));
}