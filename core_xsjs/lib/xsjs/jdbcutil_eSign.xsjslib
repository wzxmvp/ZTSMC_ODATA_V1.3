$.import("xsjs", "dataconf_eSign");
var limitnum = $.xsjs.dataconf_eSign.limitnum;
var map = $.xsjs.dataconf_eSign.map;

function getSqlById(id, pageno, filter) {
	var startnum = (pageno - 1) * limitnum;
	var sql = map[id].sql;
	var filters = map[id].where + "'" + filter + "' ";
	var orderby = map[id].orderby;
	sql = sql + filters + orderby + ' LIMIT ' + limitnum + ' OFFSET ' + startnum;
	return sql;
}

function sqlQuery(query) {
	var conn = $.hdb.getConnection();
	// var pstmt = conn.prepareStatement(query);
	var rs = conn.executeQuery(query);
	conn.close();
	var tblschedule = [];
	// var  schedule = {};
	var iterator = rs.getIterator();
	while (iterator.next()) {
		tblschedule.push(iterator.value());
	}
	return tblschedule;
}

// 2.10eSign判斷何時可停止重複上傳API 
function getSql_CHECK_HW_GRADE_RECORDS(id, pageno, STUD_ID, CPNT_ID) {
	var startnum = (pageno - 1) * limitnum;
	var sql = map[id].sql;
	var filters = " WHERE STUD_ID = '" + STUD_ID + "' AND CPNT_ID = '" + CPNT_ID + "'";
	sql = sql + filters + ' LIMIT ' + limitnum + ' OFFSET ' + startnum;
	return sql;
}