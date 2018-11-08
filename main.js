$(document).ready(function () {
    $('select').formSelect();

    let total = 0;

    $("#prog-type").hide();
    $("#prog-type").hide();
    $(".std-prog-list").hide();
    $("#prem-prog-name").hide();
    $("#prem-prog-price").hide();
    $("#ar-price").hide();
    $("#additional-dropdowns").hide();

    //checks for type of progressive
    let selectedLensType = document.getElementById("base-lens");
    let selectedArType = document.getElementById("ar-type");
    let selectedProg = document.getElementById("prog-type");

    selectedLensType.addEventListener("change", function (event) {
        selectedLensType = event.target.value;
        showDropdowns();
    })

    selectedArType.addEventListener("change", function (event) {
        selectedArType = event.target.value;
        if (selectedArType === "Premium Anti-Reflective") {
            $("#ar-price").show(1000);
        }
    });

    //displays dropdowns
    function showDropdowns() {
        if (selectedLensType === "Progressive") {
            $("#prog-type").show(1500);
            selectedProg.addEventListener("change", function (event) {
                selectedProg = event.target.value;
                if (selectedProg === "Standard Progressive") {
                    $(".std-prog-list").show(1000);
                    $("#prem-prog-name").hide();
                    $("#prem-prog-price").hide();

                } else if (selectedProg === "Premium Progressive") {
                    $("#std-prog-list").hide();
                    $("#prem-prog-name").show(1000);
                    $("#prem-prog-price").show(1000);
                }
            })
        }

    };
    //end of function

    $("#add").on("click", function (event) {
        let newDropdown = ($("#other-options")[0].outerHTML);
        $('#additional-dropdowns').append(newDropdown);
        $('#additional-dropdowns').show(100);
        $('select').formSelect();
    });

    $("#calculate").on("click", function () {
        confirm("Are you finished with your order?")
        let framePrice = $("#frame-price").val();
        let baseLensPrice = $("#base-lens").find(":selected").data("value");
        let arPrice = 89
        let lensMaterial = $("#lens-material").find(":selected").data("value");
        if (selectedLensType === "Progressive" && selectedProg === "Standard Progressive") {
            baseLensPrice = $('#std-prog-list').find(":selected").data("value");

        } else if (selectedLensType === "Progressive" && selectedProg === "Premium Progressive") {
            baseLensPrice = parseInt($("#prem-prog-price").val());
        }

        if (selectedArType === "Premium Anti-Reflective"){
            arPrice = $("#ar-price").val();

        }

        
        console.log(framePrice*.7, baseLensPrice, arPrice*.7, lensMaterial);
    });


});
