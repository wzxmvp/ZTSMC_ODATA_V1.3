var conn = $.hdb.getConnection();

function executeUpdateSQL(entity, body) {
	var obj = JSON.parse(body);
	var arrayData = obj.data;
	var upsert_SQL = "";
	var sqlLog = "";
	var upsertResult = [];

	switch (entity) {

		// SF Basic Picklist 寫入HANA DB 
	case 'ZTAB_BASIC_PICKLISTV2':
		for (let index in arrayData) {
			var TAB_CREATE_TIME = arrayData[index].TAB_CREATE_TIME;
			var TAB_LASTMODIFIED_TIME = arrayData[index].TAB_LASTMODIFIED_TIME;
			var EFFECTIVE_START_DATE = arrayData[index].EFFECTIVE_START_DATE;
			var PICKLISTV2_ID = arrayData[index].PICKLISTV2_ID;
			var EXTERNAL_CODE = arrayData[index].EXTERNAL_CODE;
			var OPTION_ID = arrayData[index].OPTION_ID;
			var STATUS = arrayData[index].STATUS;
			var LABEL_ZH_TW = arrayData[index].LABEL_ZH_TW;
			var LABEL_ZH_CN = arrayData[index].LABEL_ZH_CN;
			var LABEL_EN_US = arrayData[index].LABEL_EN_US;
			var LABEL_JA_JP = arrayData[index].LABEL_JA_JP;
			var LABEL_DEFAULT = arrayData[index].LABEL_DEFAULT;
			upsert_SQL =
				"UPSERT ZSCH_ODATA.ZTAB_BASIC_PICKLISTV2(TAB_CREATE_TIME,TAB_LASTMODIFIED_TIME,EFFECTIVE_START_DATE,PICKLISTV2_ID,EXTERNAL_CODE,OPTION_ID,STATUS,LABEL_ZH_TW,LABEL_ZH_CN,LABEL_EN_US,LABEL_JA_JP,LABEL_DEFAULT) VALUES(" +
				"TO_SECONDDATE('" + TAB_CREATE_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + EFFECTIVE_START_DATE + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + PICKLISTV2_ID + "'," +
				"'" + EXTERNAL_CODE + "'," +
				"'" + OPTION_ID + "'," +
				"'" + STATUS + "'," +
				"'" + LABEL_ZH_TW + "'," +
				"'" + LABEL_ZH_CN + "'," +
				"'" + LABEL_EN_US + "'," +
				"'" + LABEL_JA_JP + "'," +
				"'" + LABEL_DEFAULT + "') WITH PRIMARY KEY;";
			sqlLog = sqlLog + index + ":" + upsert_SQL + "\r\n";
			var data = {};
			data.EFFECTIVE_START_DATE = EFFECTIVE_START_DATE;
			data.PICKLISTV2_ID = PICKLISTV2_ID;
			data.EXTERNAL_CODE = EXTERNAL_CODE;
			try {
				conn.executeUpdate(upsert_SQL);
				data.status = "OK";
				data.messages = "";
			} catch (err) {
				data.status = "Failed";
				var errorMessageLog = "EFFECTIVE_START_DATE:" + EFFECTIVE_START_DATE + ";PICKLISTV2_ID:" + PICKLISTV2_ID + ";EXTERNAL_CODE:" +
					EXTERNAL_CODE +
					";Error Messages:" + err.message.toString();
				data.messages = err.message.toString();
				console.log("[#ERROR LOG - ZTAB_BASIC_PICKLISTV2#]: %s", errorMessageLog.toString());
			}
			upsertResult.push(data);
		}
		console.log("[#SQL UPSERT LOG - ZTAB_BASIC_PICKLISTV2#]: %s", sqlLog.toString());
		conn.commit();
		conn.close();
		break;

		// 現場報名/報名未出席,eSign->HANA DB
	case 'ZTAB_APP_LMS_HW_ENROLLMENTS':
		for (let index in arrayData) {
			var TAB_LASTMODIFIED_TIME = arrayData[index].TAB_LASTMODIFIED_TIME;
			var TAB_LASTMODIFIED_TIME_UTC = arrayData[index].TAB_LASTMODIFIED_TIME_UTC;
			var SCHEDULE_ID = arrayData[index].SCHEDULE_ID;
			var CPNT_ID = arrayData[index].CPNT_ID;
			var CPNT_TYP_ID = arrayData[index].CPNT_TYP_ID;
			var STUD_NAME = arrayData[index].STUD_NAME;
			var STUDENT_ID = arrayData[index].STUDENT_ID;
			var ENROLLMENT_STATUS_ID = arrayData[index].ENROLLMENT_STATUS_ID;
			var COMMENTS = arrayData[index].COMMENTS;
			upsert_SQL =
				"UPSERT ZSCH_ODATA.ZTAB_APP_LMS_HW_ENROLLMENTS(TAB_LASTMODIFIED_TIME,TAB_LASTMODIFIED_TIME_UTC,SCHEDULE_ID,CPNT_ID,CPNT_TYP_ID,STUD_NAME,STUDENT_ID,ENROLLMENT_STATUS_ID,NOTIFY_USER,COMMENTS,NOTIFY_INSTRUCTOR,NOTIFY_SUPERVISOR,NOTIFY_CONTACTS) VALUES(" +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME_UTC + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + SCHEDULE_ID + "'," +
				"'" + CPNT_ID + "'," +
				"'" + CPNT_TYP_ID + "'," +
				"'" + STUD_NAME + "'," +
				"'" + STUDENT_ID + "'," +
				"'" + ENROLLMENT_STATUS_ID + "'," +
				"'false'," +
				"'" + COMMENTS + "'," +
				"'false'," +
				"'false'," +
				"'false') WITH PRIMARY KEY;";
			sqlLog = sqlLog + index + ":" + upsert_SQL + "\r\n";
			var enrollments = {};
			enrollments.SCHEDULE_ID = SCHEDULE_ID;
			enrollments.CPNT_ID = CPNT_ID;
			enrollments.CPNT_TYP_ID = CPNT_TYP_ID;
			enrollments.STUD_NAME = STUD_NAME;
			enrollments.STUDENT_ID = STUDENT_ID;

			try {
				conn.executeUpdate(upsert_SQL);
				enrollments.errorMessage = "";
			} catch (err) {
				var errorMessageLog = "SCHEDULE_ID:" + SCHEDULE_ID + ";CPNT_ID:" + CPNT_ID + ";CPNT_TYP_ID:" + CPNT_TYP_ID + ";STUD_NAME" + STUD_NAME +
					";STUDENT_ID:" + STUDENT_ID + ";Error Messages:" + err.message.toString();
				enrollments.errorMessage = err.message.toString();
				console.log("[#ERROR LOG - ZTAB_APP_LMS_HW_ENROLLMENTS#]: %s", errorMessageLog.toString());
			}
			upsertResult.push(enrollments);
		}
		console.log("[#SQL UPSERT LOG - ZTAB_APP_LMS_HW_ENROLLMENTS#]: %s", sqlLog.toString());
		conn.commit();
		conn.close();
		break;

		// EC ORG UNIT OData
	case 'ZTAB_EC_ORG_UNIT':
		for (let index in arrayData) {
			var TAB_LASTMODIFIED_TIME = arrayData[index].TAB_LASTMODIFIED_TIME;
			var TAB_LASTMODIFIED_TIME_UTC = arrayData[index].TAB_LASTMODIFIED_TIME_UTC;
			var PARENTDEPARTMENT = arrayData[index].PARENTDEPARTMENT;
			var COSTCENTER = arrayData[index].COSTCENTER;
			var CUST_SECRETARY1 = arrayData[index].CUST_SECRETARY1;
			var CUST_SECRETARY2 = arrayData[index].CUST_SECRETARY2;
			var CUST_SECRETARY3 = arrayData[index].CUST_SECRETARY3;
			var CUST_CM = arrayData[index].CUST_CM;
			var CUST_CM1 = arrayData[index].CUST_CM1;
			var CUST_GM = arrayData[index].CUST_GM;
			var CUST_GM1 = arrayData[index].CUST_GM1;
			var CUST_AREA = arrayData[index].CUST_AREA;
			var CUST_AREA1 = arrayData[index].CUST_AREA1;
			var CUST_FUNCTION = arrayData[index].CUST_FUNCTION;
			var CUST_FUNCTION1 = arrayData[index].CUST_FUNCTION1;
			var CUST_DIVISION = arrayData[index].CUST_DIVISION;
			var CUST_DIVISION1 = arrayData[index].CUST_DIVISION1;
			var CUST_DEPARTMENT = arrayData[index].CUST_DEPARTMENT;
			var CUST_DEPARTMENT1 = arrayData[index].CUST_DEPARTMENT1;
			var CUST_SECTION = arrayData[index].CUST_SECTION;
			var CUST_SECTION1 = arrayData[index].CUST_SECTION1;
			var CUST_CHANGEREASON = arrayData[index].CUST_CHANGEREASON;
			var EXTERNALCODE = arrayData[index].EXTERNALCODE; // Primary Key 
			var CUST_TYPE = arrayData[index].CUST_TYPE;
			var NAME_ZH_CN = arrayData[index].NAME_ZH_CN;
			var NAME_ZH_TW = arrayData[index].NAME_ZH_TW;
			var NAME_ZH_US = arrayData[index].NAME_ZH_US;
			var NAME_DEFAULT = arrayData[index].NAME_DEFAULT;
			var DESC_ZH_CN = arrayData[index].DESC_ZH_CN;
			var DESC_ZH_TW = arrayData[index].DESC_ZH_TW;
			var DESC_ZH_US = arrayData[index].DESC_ZH_US;
			var DESC_DEFAULT = arrayData[index].DESC_DEFAULT;
			var EFFECTIVESTATUS = arrayData[index].EFFECTIVESTATUS;
			var EFFECTIVESTARTDATE = arrayData[index].EFFECTIVESTARTDATE; // Primary Key 
			var EFFECTIVEENDDATE = arrayData[index].EFFECTIVEENDDATE;
			var MANAGERTYPE = arrayData[index].MANAGERTYPE;
			var CUST_HEAD1 = arrayData[index].CUST_HEAD1;
			var CUST_HEAD2 = arrayData[index].CUST_HEAD2;
			var CUST_HEAD3 = arrayData[index].CUST_HEAD3;
			var CUST_HEAD4 = arrayData[index].CUST_HEAD4;
			var CUST_HEAD5 = arrayData[index].CUST_HEAD5;
			var CUST_HEAD6 = arrayData[index].CUST_HEAD6;
			var HEADOFUNIT = arrayData[index].HEADOFUNIT;
			var CREATEON = arrayData[index].CREATEON;
			var CREATE_DATE_TIME_UTC = arrayData[index].CREATE_DATE_TIME_UTC;
			var CREATE_BY = arrayData[index].CREATE_BY;
			var LASTMODIFIED_DATE_ON = arrayData[index].LASTMODIFIED_DATE_ON;
			var LASTMODIFIED_DATE_TIME_UTC = arrayData[index].LASTMODIFIED_DATE_TIME_UTC;

			var AREA1_REPORT = arrayData[index].AREA1_REPORT;
			var AREA_REPORT = arrayData[index].AREA_REPORT;
			var CM1_REPORT = arrayData[index].CM1_REPORT;
			var CM_REPORT = arrayData[index].CM_REPORT;
			var DEPARTMENT1_REPORT = arrayData[index].DEPARTMENT1_REPORT;
			var DEPARTMENT_REPORT = arrayData[index].DEPARTMENT_REPORT;
			var DIVISION1_REPORT = arrayData[index].DIVISION1_REPORT;
			var DIVISION_REPORT = arrayData[index].DIVISION_REPORT;
			var FUNCTION1_REPORT = arrayData[index].FUNCTION1_REPORT;
			var FUNCTION_REPORT = arrayData[index].FUNCTION_REPORT;
			var GM1_REPORT = arrayData[index].GM1_REPORT;
			var GM_REPORT = arrayData[index].GM_REPORT;
			var SECTION1_REPORT = arrayData[index].SECTION1_REPORT;
			var SECTION_REPORT = arrayData[index].SECTION_REPORT;
			var CUST_LEGALENTITY = arrayData[index].cust_LegalEntity;
			var cust_jobfamily = arrayData[index].cust_jobfamily;
			var cust_location = arrayData[index].cust_location;
			var cust_jobfunction = arrayData[index].cust_jobfunction;

			upsert_SQL =
				"UPSERT ZSCH_ODATA.ZTAB_EC_ORG_UNIT(TAB_LASTMODIFIED_TIME,TAB_LASTMODIFIED_TIME_UTC,PARENTDEPARTMENT,COSTCENTER,CUST_SECRETARY1,CUST_SECRETARY2,CUST_SECRETARY3,CUST_CM,CUST_CM1,CUST_GM,CUST_GM1,CUST_AREA,CUST_AREA1,CUST_FUNCTION,CUST_FUNCTION1,CUST_DIVISION,CUST_DIVISION1,CUST_DEPARTMENT,CUST_DEPARTMENT1,CUST_SECTION,CUST_SECTION1,CUST_CHANGEREASON,EXTERNALCODE,CUST_TYPE,NAME_ZH_CN,NAME_ZH_TW,NAME_ZH_US,NAME_DEFAULT,DESC_ZH_CN,DESC_ZH_TW,DESC_ZH_US,DESC_DEFAULT,EFFECTIVESTATUS,EFFECTIVESTARTDATE,EFFECTIVEENDDATE,MANAGERTYPE,CUST_HEAD1,CUST_HEAD2,CUST_HEAD3,CUST_HEAD4,CUST_HEAD5,CUST_HEAD6,HEADOFUNIT,CREATEON,CREATE_DATE_TIME_UTC,CREATE_BY,LASTMODIFIED_DATE_ON,LASTMODIFIED_DATE_TIME_UTC,AREA1_REPORT,AREA_REPORT,CM1_REPORT,CM_REPORT,DEPARTMENT1_REPORT,DEPARTMENT_REPORT,DIVISION1_REPORT,DIVISION_REPORT,FUNCTION1_REPORT,FUNCTION_REPORT,GM1_REPORT,GM_REPORT,SECTION1_REPORT,SECTION_REPORT,CUST_LEGALENTITY,CUST_LOCATION,CUST_JOBFUNCTION,CUST_JOBFAMILY) VALUES(" +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME_UTC + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + PARENTDEPARTMENT + "'," +
				"'" + COSTCENTER + "'," +
				"'" + CUST_SECRETARY1 + "'," +
				"'" + CUST_SECRETARY2 + "'," +
				"'" + CUST_SECRETARY3 + "'," +
				"'" + CUST_CM + "'," +
				"'" + CUST_CM1 + "'," +
				"'" + CUST_GM + "'," +
				"'" + CUST_GM1 + "'," +
				"'" + CUST_AREA + "'," +
				"'" + CUST_AREA1 + "'," +
				"'" + CUST_FUNCTION + "'," +
				"'" + CUST_FUNCTION1 + "'," +
				"'" + CUST_DIVISION + "'," +
				"'" + CUST_DIVISION1 + "'," +
				"'" + CUST_DEPARTMENT + "'," +
				"'" + CUST_DEPARTMENT1 + "'," +
				"'" + CUST_SECTION + "'," +
				"'" + CUST_SECTION1 + "'," +
				"'" + CUST_CHANGEREASON + "'," +
				"'" + EXTERNALCODE + "'," +
				"'" + CUST_TYPE + "'," +
				"'" + NAME_ZH_CN + "'," +
				"'" + NAME_ZH_TW + "'," +
				"'" + NAME_ZH_US + "'," +
				"'" + NAME_DEFAULT + "'," +
				"'" + DESC_ZH_CN + "'," +
				"'" + DESC_ZH_TW + "'," +
				"'" + DESC_ZH_US + "'," +
				"'" + DESC_DEFAULT + "'," +
				"'" + EFFECTIVESTATUS + "'," +
				"TO_SECONDDATE('" + EFFECTIVESTARTDATE + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + EFFECTIVEENDDATE + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + MANAGERTYPE + "'," +
				"'" + CUST_HEAD1 + "'," +
				"'" + CUST_HEAD2 + "'," +
				"'" + CUST_HEAD3 + "'," +
				"'" + CUST_HEAD4 + "'," +
				"'" + CUST_HEAD5 + "'," +
				"'" + CUST_HEAD6 + "'," +
				"'" + HEADOFUNIT + "'," +
				"TO_SECONDDATE('" + CREATEON + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + CREATE_DATE_TIME_UTC + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + CREATE_BY + "'," +
				"TO_SECONDDATE('" + LASTMODIFIED_DATE_ON + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + LASTMODIFIED_DATE_TIME_UTC + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + AREA1_REPORT + "'," +
				"'" + AREA_REPORT + "'," +
				"'" + CM1_REPORT + "'," +
				"'" + CM_REPORT + "'," +
				"'" + DEPARTMENT1_REPORT + "'," +
				"'" + DEPARTMENT_REPORT + "'," +
				"'" + DIVISION1_REPORT + "'," +
				"'" + DIVISION_REPORT + "'," +
				"'" + FUNCTION1_REPORT + "'," +
				"'" + FUNCTION_REPORT + "'," +
				"'" + GM1_REPORT + "'," +
				"'" + GM_REPORT + "'," +
				"'" + SECTION1_REPORT + "'," +
				"'" + SECTION_REPORT + "'," +
				"'" + CUST_LEGALENTITY + "'," +
				"'" + cust_location + "'," +
				"'" + cust_jobfunction + "'," +
				"'" + cust_jobfamily + "'" + ") WITH PRIMARY KEY;";

			sqlLog = sqlLog + index + ":[upsert sql: " + upsert_SQL + " ]" + "\r\n";

			var data = {};
			data.EXTERNALCODE = EXTERNALCODE;
			data.EFFECTIVESTARTDATE = EFFECTIVESTARTDATE;
			data.EFFECTIVEENDDATE = EFFECTIVEENDDATE;
			try {
				conn.executeUpdate(upsert_SQL);
				data.errorMessage = "";
			} catch (err) {
				var errorMessageLog = "EXTERNALCODE:" + EXTERNALCODE + ";EFFECTIVESTARTDATE:" + EFFECTIVESTARTDATE + ";EFFECTIVEENDDATE:" +
					EFFECTIVEENDDATE + ";Error Messages:" + err.message.toString();
				data.errorMessage = err.message.toString();
				console.log("[#UPSERT ERROR LOG - ZTAB_EC_ORG_UNIT#]: %s", errorMessageLog.toString());
			}

			upsertResult.push(data);
		}
		console.log("[#SQL LOG - ZTAB_EC_ORG_UNIT#]: %s", sqlLog.toString());
		conn.commit();
		conn.close();
		break;

		// EC USER OData
	case 'ZTAB_EC_USER':
		for (let index in arrayData) {
			var TAB_LASTMODIFIED_TIME = arrayData[index].TAB_LASTMODIFIED_TIME;
			var TAB_LASTMODIFIED_TIME_UTC = arrayData[index].TAB_LASTMODIFIED_TIME_UTC;
			var STATUS = arrayData[index].STATUS;
			var USERID = arrayData[index].USERID;
			var USERNAME = arrayData[index].USERNAME;
			var FIRSTNAME = arrayData[index].FIRSTNAME;
			var LASTNAME = arrayData[index].LASTNAME;
			var EMAIL = arrayData[index].EMAIL;
			var TITLE = arrayData[index].TITLE;
			if (TITLE === "N/A") {
				TITLE = "";
			}
			var GENDER = arrayData[index].GENDER;
			var MANAGER = arrayData[index].MANAGER;
			var HR = arrayData[index].HR;
			var DEPARTMENT = arrayData[index].DEPARTMENT;
			if (DEPARTMENT === "N/A") {
				DEPARTMENT = "";
			}
			var JOBCODE = arrayData[index].JOBCODE;
			if (JOBCODE === "N/A") {
				JOBCODE = "";
			}
			var JOBLEVEL = arrayData[index].JOBLEVEL;
			if (JOBLEVEL === "N/A") {
				JOBLEVEL = "";
			}
			var LOCATION = arrayData[index].LOCATION;
			if (LOCATION === "N/A") {
				LOCATION = "";
			}
			var TIMEZONE = arrayData[index].TIMEZONE;
			var HIREDATE = arrayData[index].HIREDATE;
			var EMPID = arrayData[index].EMPID;
			var BIZ_PHONE = arrayData[index].BIZ_PHONE;
			var COUNTRY = arrayData[index].COUNTRY;
			var MATRIX_MANAGER = arrayData[index].MATRIX_MANAGER; // Primary Key 
			var CUSTOM_MANAGER = arrayData[index].CUSTOM_MANAGER;
			var SECOND_MANAGER = arrayData[index].SECOND_MANAGER;
			var DEFAULT_LOCALE = arrayData[index].DEFAULT_LOCALE;
			var LOGINMETHOD = arrayData[index].LOGINMETHOD;
			var LASTMODIFIED = arrayData[index].LASTMODIFIED;
			var LASTMODIFIEDDATE_UTC = arrayData[index].LASTMODIFIEDDATE;
			var CUSTOM01 = arrayData[index].CUSTOM01;
			var CUSTOM02 = arrayData[index].CUSTOM02;
			var CUSTOM03 = arrayData[index].CUSTOM03;
			var CUSTOM04 = arrayData[index].CUSTOM04;
			var CUSTOM05 = arrayData[index].CUSTOM05;
			var LEVEL = arrayData[index].LEVEL;
			var zFullName = arrayData[index].zFullName;

			var TITLE_CODE = '';
			if (TITLE !== '' && TITLE.indexOf("(") !== -1) {
				var tileTemp1 = TITLE.split("(");
				var tileTemp2 = tileTemp1[1].split(")");
				TITLE_CODE = tileTemp2[0];
			}

			var DEPARTMENT_CODE = '';
			if (DEPARTMENT !== '' && DEPARTMENT.indexOf("(") !== -1) {
				var DEPARTMENTTemp1 = DEPARTMENT.split("(");
				var DEPARTMENTTemp2 = DEPARTMENTTemp1[1].split(")");
				DEPARTMENT_CODE = DEPARTMENTTemp2[0];
			}

			var JOBCODE_CODE = '';
			if (JOBCODE !== '' && JOBCODE.indexOf("(") !== -1) {
				var JOBCODETemp1 = JOBCODE.split("(");
				var JOBCODETemp2 = JOBCODETemp1[1].split(")");
				JOBCODE_CODE = JOBCODETemp2[0];
			}

			var LOCATION_CODE = '';
			if (LOCATION !== '') {
				if (LOCATION.indexOf("(") !== -1) {
					var LOCATIONTemp1 = LOCATION.split("(");
					var LOCATIONTemp2 = LOCATIONTemp1[1].split(")");
					LOCATION_CODE = LOCATIONTemp2[0];
				}
			}

			var JOBLEVEL_CODE = '';
			if (JOBLEVEL !== '' && JOBLEVEL.indexOf("(") !== -1) {
				var JOBLEVELTemp1 = JOBLEVEL.split("(");
				var JOBLEVELTemp2 = JOBLEVELTemp1[1].split(")");
				JOBLEVEL_CODE = JOBLEVELTemp2[0];
			}

			var LEVEL_CODE = "";
			if (LEVEL !== '' && LEVEL.indexOf("(") !== -1) {
				var LEVELTemp1 = LEVEL.split("(");
				var LEVELTemp2 = LEVELTemp1[1].split(")");
				LEVEL_CODE = LEVELTemp2[0];
			}

			upsert_SQL =
				"UPSERT ZSCH_ODATA.ZTAB_EC_USER(TAB_LASTMODIFIED_TIME,TAB_LASTMODIFIED_TIME_UTC,STATUS,USERID,USERNAME,FIRSTNAME,LASTNAME,EMAIL,TITLE,GENDER,MANAGER,HR,DEPARTMENT,JOBCODE,JOBLEVEL,LOCATION,TIMEZONE,HIREDATE,EMPID,BIZ_PHONE,COUNTRY,MATRIX_MANAGER,CUSTOM_MANAGER,SECOND_MANAGER,DEFAULT_LOCALE,LOGINMETHOD,LASTMODIFIED,LASTMODIFIEDDATE_UTC,CUSTOM01,CUSTOM02,CUSTOM03,CUSTOM04,TITLE_CODE,DEPARTMENT_CODE,JOBCODE_CODE,LOCATION_CODE,JOBLEVEL_CODE,CUSTOM05,LEVEL,LEVEL_CODE,zFullName) VALUES(" +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME_UTC + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + STATUS + "'," +
				"'" + USERID + "'," +
				"'" + USERNAME + "'," +
				"'" + FIRSTNAME + "'," +
				"'" + LASTNAME + "'," +
				"'" + EMAIL + "'," +
				"'" + TITLE + "'," +
				"'" + GENDER + "'," +
				"'" + MANAGER + "'," +
				"'" + HR + "'," +
				"'" + DEPARTMENT + "'," +
				"'" + JOBCODE + "'," +
				"'" + JOBLEVEL + "'," +
				"'" + LOCATION + "'," +
				"'" + TIMEZONE + "'," +
				"TO_SECONDDATE('" + HIREDATE + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + EMPID + "'," +
				"'" + BIZ_PHONE + "'," +
				"'" + COUNTRY + "'," +
				"'" + MATRIX_MANAGER + "'," +
				"'" + CUSTOM_MANAGER + "'," +
				"'" + SECOND_MANAGER + "'," +
				"'" + DEFAULT_LOCALE + "'," +
				"'" + LOGINMETHOD + "'," +
				"TO_SECONDDATE('" + LASTMODIFIED + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + LASTMODIFIEDDATE_UTC + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + CUSTOM01 + "'," +
				"'" + CUSTOM02 + "'," +
				"'" + CUSTOM03 + "'," +
				"'" + CUSTOM04 + "'," +
				"'" + TITLE_CODE + "'," +
				"'" + DEPARTMENT_CODE + "'," +
				"'" + JOBCODE_CODE + "'," +
				"'" + LOCATION_CODE + "'," +
				"'" + JOBLEVEL_CODE + "'," +
				"'" + CUSTOM05 + "'," +
				"'" + LEVEL + "'," +
				"'" + LEVEL_CODE + "'," +
				"'" + zFullName + "') WITH PRIMARY KEY;";

			sqlLog = sqlLog + index + ":[upsert sql: " + upsert_SQL + " ]" + "\r\n";

			var data = {};
			data.USERID = USERID;

			try {
				conn.executeUpdate(upsert_SQL);
				data.errorMessage = "";
			} catch (err) {
				var errorMessageLog = "USERID:" + USERID + ";TAB_LASTMODIFIED_TIME:" + TAB_LASTMODIFIED_TIME + ";Error Messages:" + err.message.toString();
				data.errorMessage = err.message.toString();
				console.log("[#UPSERT ERROR LOG - ZTAB_EC_USER#]: %s", errorMessageLog.toString());
			}

			upsertResult.push(data);
		}
		console.log("[#SQL LOG - ZTAB_EC_USER#]: %s", sqlLog.toString());
		conn.commit();
		conn.close();
		break;

		// LMS  eSign2HANA DB 成績記錄回传
	case 'ZTAB_APP_LMS_HW_GRADE_RECORDS':
		for (let index in arrayData) {
			var TAB_LASTMODIFIED_TIME = arrayData[index].TAB_LASTMODIFIED_TIME;
			var TAB_LASTMODIFIED_TIME_UTC = arrayData[index].TAB_LASTMODIFIED_TIME_UTC;
			var STUD_ID = arrayData[index].STUD_ID;
			var SCHD_ID = arrayData[index].SCHD_ID;
			var CPNT_TYP_ID = arrayData[index].CPNT_TYP_ID;
			var CPNT_ID = arrayData[index].CPNT_ID;
			var CMPL_STAT_ID = arrayData[index].CMPL_STAT_ID;
			var COMPL_DTE = arrayData[index].COMPL_DTE;
			var COMPL_DTE_TIMEZONE = arrayData[index].COMPL_DTE_TIMEZONE;
			var GRADE_HOMEWORK = arrayData[index].GRADE_HOMEWORK;
			var GRADE = arrayData[index].GRADE;
			var TOTAL_HRS = arrayData[index].TOTAL_HRS;
			var COMMENTS = arrayData[index].COMMENTS;
			var FLAG = arrayData[index].FLAG;

			upsert_SQL =
				"UPSERT ZSCH_ODATA.ZTAB_APP_LMS_HW_GRADE_RECORDS(TAB_LASTMODIFIED_TIME,TAB_LASTMODIFIED_TIME_UTC,STUD_ID,SCHD_ID,CPNT_TYP_ID,CPNT_ID,CMPL_STAT_ID,COMPL_DTE,COMPL_DTE_TIMEZONE,GRADE_HOMEWORK,GRADE,TOTAL_HRS,COMMENTS,FLAG) VALUES(" +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME_UTC + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + STUD_ID + "'," +
				"'" + SCHD_ID + "'," +
				"'" + CPNT_TYP_ID + "'," +
				"'" + CPNT_ID + "'," +
				"'" + CMPL_STAT_ID + "'," +
				"TO_SECONDDATE('" + COMPL_DTE + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + COMPL_DTE_TIMEZONE + "'," +
				+GRADE_HOMEWORK + "," +
				+GRADE + "," +
				+TOTAL_HRS + "," +
				"'" + COMMENTS + "'," +
				"'" + FLAG + "'" + ") WITH PRIMARY KEY;";

			sqlLog = sqlLog + index + ":[upsert sql: " + upsert_SQL + " ]" + "\r\n";

			var data = {};
			try {
				conn.executeUpdate(upsert_SQL);
				data.STATUS = "success";
				data.MESSAGES = "";
			} catch (err) {
				var errorMessageLog = "STUD_ID:" + STUD_ID + ";SCHD_ID:" + SCHD_ID + ";CPNT_TYP_ID:" + CPNT_TYP_ID + ";CPNT_ID" + CPNT_ID +
					";TAB_LASTMODIFIED_TIME:" + TAB_LASTMODIFIED_TIME + ";TAB_LASTMODIFIED_TIME_UTC:" + TAB_LASTMODIFIED_TIME_UTC + ";Error Messages:" +
					err.message.toString();
				data.STATUS = "error";
				data.MESSAGES = err.message.toString();
				console.log("[#UPSERT ERROR LOG - ZTAB_EC_USER#]: %s", errorMessageLog.toString());
			}

			data.STUD_ID = STUD_ID;
			data.SCHD_ID = SCHD_ID;
			data.CPNT_TYP_ID = CPNT_TYP_ID;
			data.CPNT_ID = CPNT_ID;

			upsertResult.push(data);
		}
		console.log("[#SQL LOG - ZTAB_EC_USER#]: %s", sqlLog.toString());
		conn.commit();
		conn.close();
		break;

		// SF Basic FOPayGrade
	case 'ZTAB_BASIC_FOPAYGRADE':
		for (let index in arrayData) {
			var TAB_LASTMODIFIED_TIME = arrayData[index].TAB_LASTMODIFIED_TIME;
			var TAB_LASTMODIFIED_TIME_UTC = arrayData[index].TAB_LASTMODIFIED_TIME_UTC;
			var externalCode = arrayData[index].externalCode;
			var startDate = arrayData[index].startDate;

			var lastModifiedDateTime = arrayData[index].lastModifiedDateTime;

			var endDate = arrayData[index].endDate;
			var lastModifiedBy = arrayData[index].lastModifiedBy;
			var createdDateTime = arrayData[index].createdDateTime;

			var description = arrayData[index].description;
			var customString3 = arrayData[index].customString3;
			var customString2 = arrayData[index].customString2;
			var createdOn = arrayData[index].createdOn;

			var lastModifiedOn = arrayData[index].lastModifiedOn;

			var paygradeLevel = arrayData[index].paygradeLevel;
			var customString1 = arrayData[index].customString1;
			var createdBy = arrayData[index].createdBy;
			var name = arrayData[index].name;
			var status = arrayData[index].status;

			upsert_SQL =
				"UPSERT ZSCH_ODATA.ZTAB_BASIC_FOPAYGRADE(TAB_LASTMODIFIED_TIME,TAB_LASTMODIFIED_TIME_UTC,EXTERNAL_CODE,START_DATE,LAST_MODIFIE_DDATE_TIME,END_DATE,LAST_MODIFIED_BY,CREATED_DATE_TIME,DESCRIPTION,CUSTOMTRING3,CUSTOMTRING2,CREATED_ON,LAST_MODIFIED_ON,PAYGRADE_LEVEL,CUSTOMTRING1,CREATED_BY,NAME,STATUS) VALUES(" +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME_UTC + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + externalCode + "'," +
				"TO_SECONDDATE('" + startDate + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + lastModifiedDateTime + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + endDate + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + lastModifiedBy + "'," +
				"TO_SECONDDATE('" + createdDateTime + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + description + "'," +
				"'" + customString3 + "'," +
				"'" + customString2 + "'," +
				"'" + createdOn + "'," +
				"'" + lastModifiedOn + "'," +
				"'" + paygradeLevel + "'," +
				"'" + customString1 + "'," +
				"'" + createdBy + "'," +
				"'" + name + "'," +
				"'" + status + "') WITH PRIMARY KEY;";
			sqlLog = sqlLog + index + ":" + upsert_SQL + "\r\n";
			var data = {};
			data.externalCode = externalCode;
			data.startDate = startDate;
			data.TAB_LASTMODIFIED_TIME = TAB_LASTMODIFIED_TIME;
			data.TAB_LASTMODIFIED_TIME_UTC = TAB_LASTMODIFIED_TIME_UTC;
			try {
				conn.executeUpdate(upsert_SQL);
				data.status = "OK";
				data.messages = "";
			} catch (err) {
				data.status = "Failed";
				var errorMessageLog = "externalCode:" + externalCode + ";startDate:" + startDate + ";TAB_LASTMODIFIED_TIME:" +
					TAB_LASTMODIFIED_TIME + ";TAB_LASTMODIFIED_TIME_UTC:" + TAB_LASTMODIFIED_TIME_UTC +
					";Error Messages:" + err.message.toString();
				data.messages = err.message.toString();
				console.log("[#ERROR LOG - ZTAB_BASIC_FOPayGrade#]: %s", errorMessageLog.toString());
			}
			upsertResult.push(data);
		}
		console.log("[#SQL UPSERT LOG - ZTAB_BASIC_FOPayGrade#]: %s", sqlLog.toString());
		conn.commit();
		conn.close();
		break;

		// SF Basic FOCompany  (Legal Entity)
	case 'ZTAB_BASIC_FOCOMPANY':

		for (let index in arrayData) {
			var TAB_LASTMODIFIED_TIME = arrayData[index].TAB_LASTMODIFIED_TIME;
			var TAB_LASTMODIFIED_TIME_UTC = arrayData[index].TAB_LASTMODIFIED_TIME_UTC;
			var externalCode = arrayData[index].externalCode;
			var startDate = arrayData[index].startDate;
			var COUNTRY = arrayData[index].country;
			var CREATED_BY = arrayData[index].createdBy;
			var CREATED_DATE_TIME = arrayData[index].createdDateTime;
			var CREATED_ON = arrayData[index].createdOn;
			var CURRENCY = arrayData[index].currency;
			var CUST_ADDRESS = arrayData[index].cust_address;
			var CUST_EMAIL_SUFFIX = arrayData[index].cust_emailsuffix;
			var CUST_PHONE = arrayData[index].cust_phone;
			var DEFAULT_PAYGROP = arrayData[index].defaultPayGroup;
			var DESCRIPTION = arrayData[index].description;
			var DESCRIPTION_DEFAULT_VALUE = arrayData[index].description_defaultValue;
			var DESCRIPTION_EN_US = arrayData[index].description_en_US;
			var DESCRIPTION_ZH_CN = arrayData[index].description_zh_CN;
			var DESCRIPTION_ZH_TW = arrayData[index].description_zh_TW;
			var END_DATE = arrayData[index].endDate;
			var LAST_MODIFIED_BY = arrayData[index].lastModifiedBy;
			var LAST_MODIFIE_DDATE_TIME = arrayData[index].lastModifiedDateTime;
			var LAST_MODIFIED_ON = arrayData[index].lastModifiedOn;
			var NAME = arrayData[index].name;
			var NAME_DEFAULT_VALUE = arrayData[index].name_defaultValue;
			var NAME_EN_US = arrayData[index].name_en_US;
			var NAME_ZH_CN = arrayData[index].name_zh_CN;
			var NAME_ZH_TW = arrayData[index].name_zh_TW;
			var STATUS = arrayData[index].status;

			upsert_SQL =
				"UPSERT ZSCH_ODATA.ZTAB_BASIC_FOCOMPANY(TAB_LASTMODIFIED_TIME,TAB_LASTMODIFIED_TIME_UTC,EXTERNAL_CODE,START_DATE,COUNTRY,CREATED_BY,CREATED_DATE_TIME,CREATED_ON,CURRENCY,CUST_ADDRESS,CUST_EMAIL_SUFFIX,CUST_PHONE,DEFAULT_PAYGROP,DESCRIPTION,DESCRIPTION_DEFAULT_VALUE,DESCRIPTION_EN_US,DESCRIPTION_ZH_CN,DESCRIPTION_ZH_TW,END_DATE,LAST_MODIFIED_BY,LAST_MODIFIE_DDATE_TIME,LAST_MODIFIED_ON,NAME,NAME_DEFAULT_VALUE,NAME_EN_US,NAME_ZH_CN,NAME_ZH_TW,STATUS) VALUES(" +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + TAB_LASTMODIFIED_TIME_UTC + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + externalCode + "'," +
				"TO_SECONDDATE('" + startDate + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + COUNTRY + "'," +
				"'" + CREATED_BY + "'," +
				"TO_SECONDDATE('" + CREATED_DATE_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + CREATED_ON + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + CURRENCY + "'," +
				"'" + CUST_ADDRESS + "'," +
				"'" + CUST_EMAIL_SUFFIX + "'," +
				"'" + CUST_PHONE + "'," +
				"'" + DEFAULT_PAYGROP + "'," +
				"'" + DESCRIPTION + "'," +
				"'" + DESCRIPTION_DEFAULT_VALUE + "'," +
				"'" + DESCRIPTION_EN_US + "'," +
				"'" + DESCRIPTION_ZH_CN + "'," +
				"'" + DESCRIPTION_ZH_TW + "'," +
				"'" + END_DATE + "'," +
				"'" + LAST_MODIFIED_BY + "'," +
				"TO_SECONDDATE('" + LAST_MODIFIE_DDATE_TIME + "','YYYY-MM-DD HH24:MI:SS')," +
				"TO_SECONDDATE('" + LAST_MODIFIED_ON + "','YYYY-MM-DD HH24:MI:SS')," +
				"'" + NAME + "'," +
				"'" + NAME_DEFAULT_VALUE + "'," +
				"'" + NAME_EN_US + "'," +
				"'" + NAME_ZH_CN + "'," +
				"'" + NAME_ZH_TW + "'," +
				"'" + STATUS + "') WITH PRIMARY KEY;";
			sqlLog = sqlLog + index + ":" + upsert_SQL + "\r\n";
			var data = {};
			data.externalCode = externalCode;
			data.startDate = startDate;
			data.TAB_LASTMODIFIED_TIME = TAB_LASTMODIFIED_TIME;
			data.TAB_LASTMODIFIED_TIME_UTC = TAB_LASTMODIFIED_TIME_UTC;
			try {
				conn.executeUpdate(upsert_SQL);
				data.status = "OK";
				data.messages = "";
			} catch (err) {
				data.status = "Failed";
				var errorMessageLog = "externalCode:" + externalCode + ";startDate:" + startDate + ";TAB_LASTMODIFIED_TIME:" +
					TAB_LASTMODIFIED_TIME + ";TAB_LASTMODIFIED_TIME_UTC:" + TAB_LASTMODIFIED_TIME_UTC +
					";Error Messages:" + err.message.toString();
				data.messages = err.message.toString();
				console.log("[#ERROR LOG - ZTAB_BASIC_FOCOMPANY#]: %s", errorMessageLog.toString());
			}
			upsertResult.push(data);
		}
		console.log("[#SQL UPSERT LOG - ZTAB_BASIC_FOCOMPANY#]: %s", sqlLog.toString());
		conn.commit();
		conn.close();
		break;

	default:
		break;
	}
	return upsertResult;
}