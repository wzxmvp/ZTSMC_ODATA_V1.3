$.import("xsjs","dataconf_wafertech");
var limitnum = $.xsjs.dataconf_wafertech.limitnum;
var map = $.xsjs.dataconf_wafertech.map;


function getSqlById(queryStr,id, pageno,filter){
    var startnum = ( pageno - 1 ) * limitnum;
    var sql = map[id].sql;
     
    var filters = map[id].where + "'" + filter + "' ";
    var orderby = map[id].orderby;
    sql = sql + filters + queryStr + " "+ orderby +' LIMIT ' + limitnum + ' OFFSET ' + startnum;
    return sql;
}

function sqlQuery(query){
    var conn = $.hdb.getConnection();
    // var pstmt = conn.prepareStatement(query);
    var rs = conn.executeQuery(query);
    conn.close();
    var  tblschedule = [];
    // var  schedule = {};
    var iterator = rs.getIterator();
    while(iterator.next()){
        tblschedule.push(iterator.value());
    }
    return tblschedule;
}