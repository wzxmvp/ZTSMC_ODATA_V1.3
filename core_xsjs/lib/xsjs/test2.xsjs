var conn = $.hdb.getConnection();
var query = 'select * FROM "ZTSMC_ODATA_ODATA_HDI_1"."ZTSMC_ODATA.db::ZTAB_EC_USER" ';

var rs = conn.executeQuery(query);
$.response.setBody(JSON.stringify(rs));
$.response.contentType = "application/json";
$.response.status = $.net.http.OK;