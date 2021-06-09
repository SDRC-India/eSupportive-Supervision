$(document).ready(function(){
	$('#sucessAlert').hide();
	$('#dangerAlert').hide();
	
//	$('#pendingUserTable tbody').on( 'click', 'tr', function () {
//	    $(this).toggleClass('tableSelected');
//	} );
});

function customReloadPedingUserTable() {
	oTable_pendingUserTable_params.sAjaxSource = 'getAllPendingUsers';
	oTable_pendingUserTable.fnDestroy();
	oTable_pendingUserTable.dataTable(oTable_pendingUserTable_params);
};

function customReloadRejectedUserTable() {
	oTable_rejectedUserTable_params.sAjaxSource = 'getAllRejectedUsers';
	oTable_rejectedUserTable.fnDestroy();
	oTable_rejectedUserTable.dataTable(oTable_rejectedUserTable_params);
};

function approveUserMethod(data, type, full) {
	return '<button onclick="approveAnUser(\''
			+ full.userId
			+ '\')" class="btn btn-primary margin-top-5 margin-bottom-5 user-xform-map"><i class="fa fa-trash"></i>&nbsp;&nbsp;Approve</button>';
};

function approveUser(id) {
	$("#deleteLabel").text("Are you sure you want to delete the user xform mapping?");
	$('#deleteModal').modal('show');
	
	$.ajax({
		url : 'approveAnUser?userId=' + id,
		type : "GET",
		success : function(data) {
			alert("approved")
		}
	});
};

function selectBox(data, type, full) {
	return '<input onclick="selectRows(\''
	+ full.userId
	+ '\',\''
	+ this
	+ '\')" type="checkbox" value='+full.userId+' name="checkbox" class="checkbox_check">';
};

var arr= [];
function selectRows(id,obj){
	/*if ($('input.checkbox_check').is(':checked')) */{
		if(arr.indexOf(id)==-1)
			{
		arr.push(id);
			}
		else
			{
				arr.splice(arr.indexOf(id),1);
			}
		}
	
	console.log(arr)
}

