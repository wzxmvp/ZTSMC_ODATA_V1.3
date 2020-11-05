$.import("xsjs", "jdbcutil_wafertech");
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
	//new add 20200807
	var studId = $.request.parameters.get("stud_id");
	var statu = $.request.parameters.get("status");
	var compldatefrom = $.request.parameters.get("compldatefrom");
	var compldateto = $.request.parameters.get("compldateto");

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
		var queryStr = "";
		if (studId !== undefined && studId !== "") {
			queryStr = 'and stud_id =\'' + studId + '\'';
		}

		if (statu !== undefined && statu !== "") {
			queryStr = "and ACTIVE_USER ='" + statu + "'";
		}
		if ((compldatefrom !== undefined && compldatefrom !== "") && (compldateto !== undefined && compldateto !== "")) {
			queryStr = "and COMPLDATE between '" + compldatefrom + "' and '" + compldateto + "'";
		}

		queryStr = $.xsjs.jdbcutil_wafertech.getSqlById(queryStr, id, pageno, sync_dateTime);

		var rsdata = $.xsjs.jdbcutil_wafertech.sqlQuery(queryStr);
		result.data = rsdata;
		$.response.setBody(JSON.stringify(result));
	}

} catch (err) {
	// $.response.contentType = "text/plain";
	result.status = "error";
	result.code = err.toString();
	$.response.setBody(JSON.stringify(result));
}