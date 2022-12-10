document.addEventListener("DOMContentLoaded", function (event) {
    $(".delete").click(function () {
        var phonenum = $(this).data("id");
        console.log(phonenum);
        /*var url = '/deleteModerator?phonenum=' + phonenum;
        $.get(url, (data, status, xhr) => {
            alert(status);
            if (status == "success") {
                window.location.href = "/load_moderators";
            }
        });*/

        $.get('deleteModerator', {phonenum: phonenum}, function (result) {
            if (result){
                alert("Moderator successfuly deleted");
                window.location.href ="/load_moderators";
            }
            else{
                alert("There is an error in deleting moderator");
            }
        })
    });

    $(".edit").click(function(){
        console.log($(this).data("phonenum"));
        console.log($(this).data("lastname"));
        console.log($(this).data("firstname"));
        console.log($(this).data("password"));
        var phonenum = $(this).data("phonenum");
        var lastname = $(this).data("lastname");
        var firstname = $(this).data("firstname");
        document.getElementById("spanlastname").textContent=lastname;
        document.getElementById("spanfirstname").textContent=firstname;
        $("#phonenum").attr('value', phonenum);
        $("#firstname").attr('value', firstname);
        $("#lastname").attr('value', lastname);
        var a = $("#update").data("phonenum");
        $("#update").attr('data-phonenum', phonenum);
    })

    $("#clear, #cancel").click(function(){
        document.getElementById("spanlastname").textContent=null;
        document.getElementById("spanfirstname").textContent=null;
        $("#phonenum").attr('value', null);
        $("#firstname").attr('value', null);
        $("#lastname").attr('value', null);
        $("#new-password").attr('value', null);
        $("#confirm-new-password").attr('value', null);
        var a = $("#update").data("phonenum");
        $("#update").attr('data-phonenum', null);
    });

    $("#update").click(function () {
        var origphonenum = $(this).attr('data-phonenum');
        var phonenum = $("#phonenum").val()
        var lastname = $("#lastname").val();
        var firstname = $("#firstname").val();
        var password1 = $("#new-password").val();
        var password2 = $("#confirm-new-password").val();
        console.log("Old PN:\n" + origphonenum);
        console.log("New:\n" + phonenum + "\n" + lastname + "\n" + firstname + "\n" + password1 + "\n" + password2);
        if (phonenum == "" || lastname == "" || firstname == "" || password1 == "" || password2 == ""){
            document.querySelector("#password-error").innerHTML = "";
			document.querySelector("#password-error").innerHTML += "Fill up all fields.";
        }
        else if (password1 != password2){
            document.querySelector("#password-error").innerHTML = "";
			document.querySelector("#password-error").innerHTML += "The passwords don't seem to match. Type it again?";
        }
        else{
            document.querySelector("#password-error").innerHTML = "";
            $.get('updateModerator', {origphonenum: origphonenum, phonenum: phonenum, lastname:lastname, firstname:firstname, password:password1}, function (result) {
				console.log(result);
				if (result){
					alert(lastname + ", " + firstname + "'s Data is successfuly updated");
					window.location.href ="/load_moderators";
				}
				else{
					alert("There is an error in updating " + lastname + ", " + firstname + "'s data");
				}
			});
        }
    });
});