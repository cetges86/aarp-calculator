$(document).ready(function () {
    $('select').formSelect();


    $("#prog-type").hide();
    $("#prog-type").hide();
    $(".std-prog-list").hide();
    $("#prem-prog-fields").hide();
    $("#ar-fields").hide();
    $("#additional-dropdowns").hide();

    //checks for type of progressive
    let selectedLensType = $('#base-lens');
    let selectedArType = $("#ar-type");
    let selectedProg = $("#prog-type");

    let framePrice = 0;
    let finalFrame = 0;

    let arPrice = 0;
    let finalAR = 0;

    let baseLensPrice = 0;
    let finalLensPrice = 0;

    let transChoice = 0;
    let prism = 0;

    let lensMaterial = 0;
    let finalMat = 0

    let sum = 0;

    let lensOptions = []
    let otherOptions = [];

    let subTotal = 0;
    let adjTotal = 0
    let finalTotal = 0;


    selectedLensType.on("change", function (event) {
        selectedLensType = event.target.value;
        showDropdowns();
    })

    selectedArType.on("change", function (event) {
        selectedArType = event.target.value;
        if (selectedArType === "Premium Anti-Reflective") {
            $("#ar-fields").show(1000);
        } else {
            $("#ar-fields").hide(500);
        }
    });


    //displays dropdowns
    function showDropdowns() {
        if (selectedLensType === "Progressive") {
            $("#prog-type").show(1500);
            selectedProg.on("change", function (event) {
                selectedProg = event.target.value;
                if (selectedProg === "Standard Progressive") {
                    $(".std-prog-list").show(1000);
                    $("#prem-prog-fields").hide();

                } else if (selectedProg === "Premium Progressive") {
                    $(".std-prog-list").hide();
                    $("#prem-prog-fields").show(1000);
                }

            })
        } else {
            $("#prog-type").hide(500);
            $(".std-prog-list").hide(500);
            $("#prem-prog-fields").hide(500);
        }

    };
    //end of function
    function displayPrices() {

        framePrice = parseInt($("#frame-price").val());
        finalFrame = (framePrice * .7).toFixed(2)

        $("#frame-start").text(`Frame Price: $${framePrice}.00`);
        $("#frame-adj").text(`Frame Adjustment: $${(framePrice * .3).toFixed(2)}`);
        $("#frame-end").text(`Frame Price: $${finalFrame}`);
        adjTotal = adjTotal + (framePrice * .3).toFixed(2);

        baseLensPrice = $("#base-lens").find(":selected").data("value");
        if (selectedLensType === "Progressive" && selectedProg === "Standard Progressive") {
            baseLensPrice = $('#std-prog-list').find(":selected").data("value");
            finalLensPrice = (baseLensPrice * .7).toFixed(2);
            $("#lens-start").text(`Base Lens Price: $${baseLensPrice}.00`);
            $("#lens-adj").text(`Base Lens Adj.: $${(baseLensPrice * .3).toFixed(2)}`);
            $("#lens-end").text(`Base Lens Final Price: $${finalLensPrice}`);
            finalTotal = finalTotal + finalLensPrice;

        } else if (selectedLensType === "Progressive" && selectedProg === "Premium Progressive") {
            baseLensPrice = parseInt($("#prem-prog-price").val());
            finalLensPrice = ((131 * .7) + ((baseLensPrice - 131) * .85)).toFixed(2)
            $("#lens-start").text(`Base Lens Price: $${baseLensPrice}.00`);
            $("#lens-adj").text(`Base Lens Adj.: $${(baseLensPrice - finalLensPrice).toFixed(2)}`);
            $("#lens-end").text(`Base Lens Final Price: $${finalLensPrice}`);
        } else {
            $("#lens-start").text(`Base Lens Price: $${baseLensPrice}.00`);
            finalLensPrice = (baseLensPrice * .7).toFixed(2);
            $("#lens-adj").text(`Base Lens Adj.: $${(baseLensPrice - finalLensPrice).toFixed(2)}`);
            $("#lens-end").text(`Base Lens Final Price: $${finalLensPrice}`);
        }

        if (selectedArType === "Premium Anti-Reflective") {
            arPrice = parseInt($("#ar-price").val());
            finalAR = (arPrice * .85).toFixed(2);
            $("#ar-adj").text(`Anti-Reflective Adj.: $${(arPrice * .15).toFixed(2)}`);
            $("#ar-end").text(`Anti-Reflective Final Price: $${finalAR}`);
        } else if (selectedArType === "Standard Anti-Reflective ($89)") {
            arPrice = 89;
            finalAR = (arPrice * .7).toFixed(2);
            $("#ar-adj").text(`Anti-Reflective Adj.: $${(arPrice * .3).toFixed(2)}`);
            $("#ar-end").text(`Anti-Reflective Final Price: $${finalAR}`);
        } else {
            $("#ar-adj").text(`Anti-Reflective Adj.: $${(arPrice * .3).toFixed(2)}`);
            $("#ar-end").text(`Anti-Reflective Final Price: $${finalAR}`);
        }
        $("#ar-start").text(`Anti-Reflective Price: $${arPrice}.00`);

        lensMaterial = $("#lens-material").find(":selected").data("value");
        $("#material-start").text(`Lens Material Price: $${lensMaterial}.00`);

        if (lensMaterial == 60) {
            finalMat = (lensMaterial * .7).toFixed(2)
            $("#material-adj").text(`Lens Material Adj.: $${(lensMaterial * .3).toFixed(2)}`);
            $("#material-end").text(`Lens Material Final Price: $${finalMat}`);
        } else {
            finalMat = (lensMaterial * .85).toFixed(2)
            $("#material-adj").text(`Lens Material Adj.: $${(lensMaterial * .15).toFixed(2)}`);
            $("#material-end").text(`Lens Material Final Price: $${finalMat}`);
        }


        if ($('#transitions:checked').val() === "on") {
            transChoice = 160

            $('#trans-start').text(`Transitions: $${transChoice}.00`)
            $('#trans-adj').text(`Transitions Adj: $${transChoice * .4}.00`)
            $('#trans-end').text(`Transitions Final Price: $${transChoice * .6}.00`)
        } else {
            transChoice = 0
            $('#trans-start').text(`Transitions: $${transChoice}.00`)
            $('#trans-adj').text(`Transitions Adj: $${transChoice * .4}.00`)
            $('#trans-end').text(`Transitions Final Price: $${transChoice * .6}.00`)
        }

        if ($('#prism').prop('checked')) {
            prism = 5 * $('#prism-num').val()
            $('#err-message').text("")
            if ($('#prism-num').val() % 1 === 0 || $('#prism-num').val() === 0) {
                $('#prism-start').text(`Prism: $${prism}.00`)
                $('#prism-adj').text(`Prism Adj: $${(prism * .15).toFixed(2)}`)
                $('#prism-end').text(`Prism Final Price: $${(prism * .85).toFixed(2)}`)

            } else {
                $('#err-message').text("Invalid value, please type a whole number.")
            }
        }

        if ($('#no-prism:checked').prop('checked')) {
            prism = 0
            $('#prism-start').text(`Prism: $0.00`)
            $('#prism-adj').text(`Prism Adj: $0.00`)
            $('#prism-end').text(`Prism Final Price: $0.00`)
        }



        $('#other-options').on('change', function () {
            lensOptions = $('#other-options').val();
        })

        otherOptions = $.map(lensOptions, Number);


        if (otherOptions.length > 0) {
            const add = (a, b) => {
                return a + b
            }

            sum = otherOptions.reduce(add);
            $("#other-start").text(`Sum of Other Options: $${sum}.00`)
            $("#other-adj").text(`Total Adj for Other Options: $${(sum * .15).toFixed(2)}`);
            $("#other-end").text(`Final Price of Other Options: $${(sum * .85).toFixed(2)}`);
        } else if (otherOptions.length === 0) {
            $("#other-start").text(`Sum of Other Options: $0.00`)
            $("#other-adj").text(`Total Adj for Other Options: $0.00`);
            $("#other-end").text(`Final Price of Other Options: $0.00`);
        }

        subTotal = parseFloat(framePrice) + parseFloat(baseLensPrice) + parseFloat(arPrice) + parseFloat(lensMaterial) + parseFloat(transChoice) + parseFloat(prism)
        console.log(prism);
        for (let i = 0; i < otherOptions.length; i++) {
            subTotal = subTotal + otherOptions[i];
        }
        finalTotal = parseFloat(finalFrame) + parseFloat(finalLensPrice) + parseFloat(finalAR) + parseFloat(finalMat) + parseFloat(transChoice * .6) + parseFloat((prism * .85).toFixed(2)) + (sum * .85.toFixed(2));
        adjTotal = subTotal - finalTotal

        $("#total-start").text(`Sub Total: $${subTotal}.00`);
        $("#total-adj").text(`Total Adj: $${(adjTotal).toFixed(2)}`);
        $("#total-end").text(`Final Total: $${(finalTotal).toFixed(2)}`);
    }

    $('.input-group').on('change', function () {
        if (finalFrame != NaN) {
            displayPrices();
        } else if (($('#prism').prop('checked')) && finalFrame != NaN) {
            displayPrices();
        }
    });
});
