$.import("xsjs", "dataconf_ods");
var limitnum = $.xsjs.dataconf_ods.limitnum;
var map = $.xsjs.dataconf_ods.map;

function getSqlById(id, pageno, filter) {
	var startnum = (pageno - 1) * limitnum;
	var sql = map[id].sql;
	var filters = map[id].where + "'" + filter + "' ";
	var orderby = map[id].orderby;
	sql = sql + filters + orderby + ' LIMIT ' + limitnum + ' OFFSET ' + startnum;
	return sql;
}

// Get Total Pages for ODS
function getCount(id, filter) {

	var table = map[id].table;
	var sql = map[id].sql;
	var filters = map[id].where + "'" + filter + "' ";
	var orderby = map[id].orderby;

	sql = "SELECT COUNT(*) AS TOTAL FROM (" + sql + filters + orderby + ");";
	var conn = $.hdb.getConnection();
	var rs = conn.executeQuery(sql);
	conn.close();
	var jsonStr = rs[0];
	var totalValue = jsonStr['TOTAL'] + "";
	return totalValue;
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