var conn = $.hdb.getConnection();

function executeUpdateSQL(entity, body) {
	var obj = JSON.parse(body);
	var arrayData = obj.data;
	var upsert_SQL = "";
	var sqlLog = "";
	var upsertResult = [];

	switch (entity) {

		// RCM NEW REPORTS OData
	case 'ZTAB_RCM_NEW_REPORTS':
		for (let index in arrayData) {
			//var TAB_CREATE_TIME = arrayData[index].TAB_CREATE_TIME;
			var TAB_LASTMODIFIED_TIME = arrayData[index].TAB_LASTMODIFIED_TIME;
			var CANDIDATE_ID = arrayData[index].CANDIDATE_ID;
			//var IDENTITY = arrayData[index].IDENTITY;
			//var RETURN_DATE = arrayData[index].RETURN_DATE;
			var CANDIDATE_NAME = arrayData[index].CANDIDATE_NAME;
			//var REPORT_DATE = arrayData[index].REPORT_DATE;
			//var POSITION_LEVEL_GROUP = arrayData[index].POSITION_LEVEL_GROUP;
			//var TRAINING_ADDRESS = arrayData[index].TRAINING_ADDRESS;
			//var OFFICE_ADDRESS = arrayData[index].OFFICE_ADDRESS;
			var PASSPORT_NATIONALITY = arrayData[index].PASSPORT_NATIONALITY;
			//var APPLIED = arrayData[index].APPLIED;
			//var APPLIED_DATE = arrayData[index].APPLIED_DATE;
			//var EMPLYEEID = arrayData[index].EMPLYEEID;
			var EXTERNALCODE = arrayData[index].EXTERNALCODE;
			var USERSSYSID = arrayData[index].USERSSYSID;
			var RECRUITER_NAME = arrayData[index].RECRUITER_NAME;
			var RECRUITER_PHONE = arrayData[index].RECRUITER_PHONE;
			//var BUDDY_ID = arrayData[index].BUDDY_ID;
			//var BUDDY_NAME = arrayData[index].BUDDY_NAME;
			//var BUDDY_PHONE = arrayData[index].BUDDY_PHONE;
			upsert_SQL =
				//"UPSERT ZSCH_ODATA.ZTAB_RCM_NEW_REPORTS(TAB_CREATE_TIME,TAB_LASTMODIFIED_TIME,CANDIDATE_ID,IDENTITY,RETURN_DATE,CANDIDATE_NAME,REPORT_DATE,POSITION_LEVEL_GROUP,TRAINING_ADDRESS,OFFICE_ADDRESS,PASSPORT_NATIONALITY,APPLIED,APPLIED_DATE,EMPLYEEID,EXTERNALCODE,USERSSYSID,RECRUITER_NAME,RECRUITER_PHONE,BUDDY_ID,BUDDY_NAME,BUDDY_PHONE) VALUES(" +
				"UPSERT ZSCH_ODATA.ZTAB_RCM_NEW_REPORTS(TAB_LASTMODIFIED_TIME,CANDIDATE_ID,CANDIDATE_NAME,PASSPORT_NATIONALITY,EXTERNALCODE,USERSSYSID,RECRUITER_NAME,RECRUITER_PHONE) VALUES(" +
				//"TO_SECONDDATE('" + TAB_CREATE_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + CANDIDATE_ID + "'," +
				//"'" + IDENTITY + "'," +
				//"TO_SECONDDATE('" + RETURN_DATE + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + CANDIDATE_NAME + "'," +
				//"TO_SECONDDATE('" + REPORT_DATE + "','YYYY-MM-DD HH24:MI:SS')," +
				//"'" + POSITION_LEVEL_GROUP + "'," +
				//"'" + TRAINING_ADDRESS + "'," +
				//"'" + OFFICE_ADDRESS + "'," +
				"'" + PASSPORT_NATIONALITY + "'," +
				//"'" + APPLIED + "'," +
				//"TO_SECONDDATE('" + APPLIED_DATE + "','YYYY-MM-DD HH24:MI:SS')," +
				//"'" + EMPLYEEID + "'," +
				"'" + EXTERNALCODE + "'," +
				"'" + USERSSYSID + "'," +
				"'" + RECRUITER_NAME + "'," +
				"'" + RECRUITER_PHONE + "') WITH PRIMARY KEY;";
			//"'" + RECRUITER_PHONE + "'," +
			//"'" + BUDDY_ID + "'," +
			//"'" + BUDDY_NAME + "'," +
			//"'" + BUDDY_PHONE + "'

			sqlLog = sqlLog + index + ":[upsert sql: " + upsert_SQL + " ]" + "\r\n";
			var data = {};
			data.CANDIDATE_ID = CANDIDATE_ID;
			try {
				conn.executeUpdate(upsert_SQL);
				data.errorMessage = "";
			} catch (err) {
				var errorMessageLog = "CANDIDATE_ID:" + CANDIDATE_ID + ";Error Messages:" + err.message
					.toString();
				data.errorMessage = err.message.toString();
				console.log("[#UPSERT ERROR LOG - ZTAB_RCM_NEW_REPORTS#]: %s", errorMessageLog.toString());
			}
			upsertResult.push(data);
		}
		console.log("[#SQL LOG - ZTAB_RCM_NEW_REPORTS#]: %s", sqlLog.toString());
		conn.commit();
		conn.close();
		break;

	default:
		break;
	}
	return upsertResult;
}