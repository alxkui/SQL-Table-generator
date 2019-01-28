$(document).ready(function() {
var column = [];

$('#tblDt').change(function() {
	if($(this).val() === "TEXT" || $(this).val() === "BOOLEAN" || $(this).val() === "DATE") {
		$('#tblAmount').prop("disabled", true);
		$('#sizeHead').html("Disabled for this data type");
	} else {
		$('#sizeHead').html("Allowed Size (Between 0 and 255)<span class='red'>*</span>: ");
		$('#tblAmount').prop("disabled", false);
	}
});

		$('#btnNext').click(function() {
			var sqlString = "CREATE TABLE ";
			var tableName = $('#tblName').val();
			var colName = $('#tblCol').val();
			var colDataType = $('#tblDt').val();
			var colDataAmount = $('#tblAmount').val();
			var sqlColumn = colName + " " + colDataType + "(" + colDataAmount + ")" ;

			console.log(sqlString + tableName);

			$('#btnCopy').fadeIn(500);

			$('#query').html( sqlString + tableName.toLowerCase() + "(" + column.toString() +  ")" + ";" );
		});

			$('#btnAdd').click(function() {
				var tableName = $('#tblName').val();
				var colName = $('#tblCol').val();
				var colDataType = $('#tblDt').val();
				var colDataAmount = $('#tblAmount').val();

				var colAmount = colDataAmount;

				var isNull = $('input[name="tblNull"]:checked').length > 0;
				var isAuto = $('input[name="tblAuto"]:checked').length > 0;
				var isKey = $('input[name="tblKey"]:checked').length > 0;
				var checkNull;
				var checkAuto;
				var checkKey;

					if (colName.length > 0 && tableName.length > 0) {

						if ($('#tblAmount').is(':disabled') || colDataAmount.length > 0) {

							if(colDataAmount >= 0 && colDataAmount <= 255) {

								if (isNull == false) {
									checkNull = "NOT NULL";
								} else {
									checkNull = "";
								}

								if (isAuto == false) {
									checkAuto = "";
								} else {
									checkAuto = "AUTO_INCREMENT";
								}

								if (isKey == false) {
									checkKey = "";
								} else {
									checkKey = "PRIMARY KEY";
									$('input[name="tblKey"]').prop('disabled', true);
								}

								// Check if brackets are needed
								if($('#tblDt').val() === "TEXT" || $('#tblDt').val() === "BOOLEAN" || $('#tblDt').val() === "DATE") {
									var sqlColumn = colName + " " + colDataType + colAmount + " " + checkNull + " " + checkKey + " " + checkAuto;
								} else {
									var sqlColumn = colName + " " + colDataType + "(" + colAmount + ") " + checkNull + " " + checkKey + " " + checkAuto;
								}
								

								column.push(sqlColumn);
								$('#current').append("<li>" + sqlColumn + "</li>");
								console.log(column.toString());

								$("#tblCol").val("");
								$("#tblAmount").val("");
								$("input[name='tblAuto']").prop("checked", false);
								$("input[name='tblNull']").prop("checked", false);
								$("input[name='tblKey']").prop("checked", false);
							} else {
								alert("Please make sure that the Allowed Size is between 0 and 255");
							}
						} else {
							alert("The box is disabled");
						}
					} else {
						alert("Please fill in the required fields");
					}

			});

});

//Copy to clipboard
function copyToClipboard() {
	var element = $('#query');
  var $temp = $('<input>');
  $("body").append($temp);
  $temp.val(element.text()).select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
  $temp.remove();
}