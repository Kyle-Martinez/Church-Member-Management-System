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

