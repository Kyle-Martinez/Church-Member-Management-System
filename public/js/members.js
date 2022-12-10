document.addEventListener("DOMContentLoaded", function (event) {
    $(".delete").click(function () {
        var phonenum = $(this).val();
        console.log("hello");
        console.log(phonenum);
        var url = '/deleteMember?phonenum=' + phonenum;
        $.get(url, (data, status, xhr) => {
            alert(status);
            if (status == "success") {
                window.location.href = "/loadMembers";
            }
        });
    });
});

    $(".btn").click(function () { 
        //console.log("SEARCH!");
        var phonenum = document.querySelector('.form-control');
        
        var url = `/searchPhone?phonenum=${phonenum.value}`;
        $.post(url, (data, status, xhr) => {
            if (status == "success") {
                if (!data) {
                    console.log("Does not Exist!");
                }
                else {
                    console.log("Exist!");
                    window.location.href =`/profile?phonenum=${phonenum.value}`;
                }
            }
        });
        
    });

/*$(document).ready(() => {
    let phonenum;

    $("#trigger-delete-modal").click(function () {
        console.log($(this))
        phonenum = $(this).attr("data-id")
        $("#delete-modal").modal('show');
        console.log(phonenum);
    });

    $("#delete").click(function () {
        var url = '/deleteMember?phonenum=' + phonenum;
        $.get(url, (data, status, xhr) => {
            // alert(status);
            if (status == "success") {
                window.location.href = "/loadMembers";
            }
        });
    });
})*/

