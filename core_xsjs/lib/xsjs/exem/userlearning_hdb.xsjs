	var superid = $.request.parameters.get("super");
	var conn = $.hdb.getConnection();
	if ($.request.method === $.net.http.GET) {
		//handle get request
		if (superid !== undefined || superid !== null) {
			var query = 'select * FROM   "ZSCH_ODATA"."ZTAB_LMS_EXE_LEARNING_PLAN" ' +
				'where SUPER = \'' +
				superid + '\' and  SC_RTYP_ID = \'01\'   and  ( EXEMPTION is null or EXEMPTION = \'\' ) ' +
				'and  ( COMPL_DTE is null or  COMPL_DTE = \'\') ' + 'order by stud_id,QUAL_ID,SUB_RECORD_LRNGEVT desc ';
			var rs = conn.executeQuery(query);
			$.response.setBody(JSON.stringify(rs));
			$.response.contentType = "application/json";
			$.response.status = $.net.http.OK;
		} else {

		}
	} else if ($.request.method === $.net.http.POST) {
		//handle post request
		/*	
		comments: null
		completionDate: 1599544857000
		completionStatusID: "0103" 
		componentID: "7"
		componentTypeID: "01"*/
		var body = $.request.body.asString();
		var obj = JSON.parse(body);
		var componentID = obj.componentID,
			componentTypeID = obj.componentTypeID,
			studentID = obj.studentID;
		var completionDate = obj.completionDate;
		var com_ple = new Date(parseInt(completionDate));

		var curr_date = com_ple.getDate();
		var curr_month = com_ple.getMonth() + 1; //Months are zero based
		var curr_year = com_ple.getFullYear();
		var hours = com_ple.getHours();
		var minutes = com_ple.getMinutes();
		var comple = curr_year + "-" + curr_month + "-" + curr_date + " " + hours + ":" + minutes + ":00";
		//read fisrt then update
		var updatequery = 'UPDATE "ZSCH_ODATA"."ZTAB_LMS_EXE_LEARNING_PLAN" ' +
			'SET EXEMPTION =\'X\' , COMPL_DTE =\'' + comple + '\' where STUD_ID = \'' +
			studentID + '\' and  SC_CPNT_ID = \'' +
			componentID + '\' and SC_CPNT_TYP_ID = \'' +
			componentTypeID +
			'\' and SUB_RECORD_LRNGEVT = \'Y\' and ( COMPL_DTE is null or  COMPL_DTE = \'\') ';
		conn.executeUpdate(updatequery);
		conn.commit();

		$.response.setBody(obj);
		$.response.contentType = "application/json";
		$.response.status = $.net.http.OK;
	}