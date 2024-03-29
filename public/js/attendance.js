document.addEventListener("DOMContentLoaded", function (event) {
	selectVal()
	time();

	function time() {
		var date = new Date();
		var s = date.getSeconds();
		var m = date.getMinutes();
		var h = date.getHours();
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        document.getElementById('currentdt').innerHTML =  date.getFullYear() + ", " + monthNames[date.getMonth()] + " " + date.getDate() + " " + ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
	};
	
	setInterval(time, 1000);
	
	function selectVal(){
		var selectVal = window.location.search.substring(1).split("=")[1];
		console.log(selectVal);
		document.getElementById("session").value=selectVal;
	}; 

	$("#phonenum").keyup(function () {
        var input = this;
        var url = `/getCheckPhone?q=${input.value}`;
		$.get("getCheckPhone", {q: input.value}, function (result) {
			if (!result){
				document.querySelector("#errorText").innerHTML = "Phone Number not in the database";
                document.querySelector("#submit").disabled = true;
				document.querySelector("#name").value = "";
			}
			else{
				document.querySelector("#errorText").innerHTML = "";
				input.style.backgroundColor = "#e3e3e3";
                document.querySelector("#submit").disabled = false;
				document.querySelector("#name").value = result.lastname + ", " + result.firstname;
			}
		});
    });
	
	$("#submit").click(function () {
        var phonenum = document.querySelector("#phonenum").value;
		var session = document.querySelector("#session").value;
		console.log(phonenum);
		console.log(session);
		if (phonenum == "" || session == "Select Session"){
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
        else {
			$.get("getCheckAttendance", {phonenum: phonenum, session: session}, function (result) {
				if (!result){
					console.log(result);
					$.get("addAttendance", {phonenum: phonenum, session: session});
					$.get("addSession", {session: session});
					var form = document.getElementById("attendance");
					form.reset();
					document.querySelector("#errorText").innerHTML = "";

					var toastElList = [].slice.call(document.querySelectorAll('.toast'))
					var toastList = toastElList.map(function(toastEl) {
						return new bootstrap.Toast(toastEl)
					});

					toastList.forEach(toast => toast.show());
					// window.location.href = `/attendance?session=${session}`;
				}
				else{
					document.querySelector("#errorText").innerHTML = "";
					document.querySelector("#errorText").innerHTML += "Phone Number is already in the specified Attendance.";
					console.log("error");
				}
			});
        }
    });   
});
