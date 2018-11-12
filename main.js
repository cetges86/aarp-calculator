$(document).ready(function () {
    $('select').formSelect();


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

    let framePrice = 0
    let arPrice = 0
    let baseLensPrice = 0
    let finalLensPrice = 0
    let transChoice = 0
    let prism = 0
    let lensMaterial = 0
    let lensOptions = []
    let otherOptions = [];
    let total = 0;


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
    function displayPrices() {
        framePrice = $("#frame-price").val();
        $("#frame-start").text(`Frame Price: $${framePrice}.00`);
        $("#frame-adj").text(`Frame Adjustment: $${(framePrice*.3).toFixed(2)}`);
        $("#frame-end").text(`Frame Price: $${(framePrice*.7).toFixed(2)}`);

        baseLensPrice = $("#base-lens").find(":selected").data("value");
        $("#lens-start").text(`Base Lens Price: $${baseLensPrice}.00`);

        if (selectedLensType === "Progressive" && selectedProg === "Standard Progressive") {
            baseLensPrice = $('#std-prog-list').find(":selected").data("value");
            $("#lens-adj").text(`Base Lens Adjustment: $${baseLensPrice *.3}`);
            $("#lens-end").text(`Base Lens Final Price: $${baseLensPrice *.7}`);

        } else if (selectedLensType === "Progressive" && selectedProg === "Premium Progressive") {
            baseLensPrice = parseInt($("#prem-prog-price").val());
            finalLensPrice = ((131*.7) + ((baseLensPrice - 131)*.85)).toFixed(2)
            $("#lens-adj").text(`Base Lens Adjustment: $${(baseLensPrice - finalLensPrice).toFixed(2)}`);
            $("#lens-end").text(`Base Lens Final Price: $${finalLensPrice}`);
        } else {
            finalLensPrice = (baseLensPrice*.7).toFixed(2);
            $("#lens-adj").text(`Base Lens Adjustment: $${(baseLensPrice - finalLensPrice).toFixed(2)}`);
            $("#lens-end").text(`Base Lens Final Price: $${finalLensPrice}`);
        }



        $("#lens-start").text(`Base Lens Price: $${baseLensPrice}.00`);


        $("#lens-start").text(`Base Lens Price: $${baseLensPrice}.00`);

        if (selectedArType === "Premium Anti-Reflective") {
            arPrice = $("#ar-price").val();
        } else if (selectedArType === "Standard Anti-Reflective ($89)") {
            arPrice = 89;
        }
        $("#ar-start").text(`Anti-Reflective Price: $${arPrice}.00`);

        lensMaterial = $("#lens-material").find(":selected").data("value");
        $("#material-start").text(`Lens Material Price: $${lensMaterial}.00`);

        if ($('#transitions:checked').val() === "on") {
            transChoice = 140
            console.log("Transitions checked")
            $('#trans-start').text(`Transitions: $${transChoice}.00`)
        } else {
            transChoice = 0
            $('#trans-start').text(`Transitions: $${transChoice}.00`)
        }

        if ($('#prism:checked').val() === "on") {
            prism = 5 * $('#prism-num').val()
            console.log("Transitions checked")
            $('#prism-start').text(`Prism: $${prism}.00`)
        } else if ($('#prism:checked').val() === "off") {
            console.log($('#prism:checked').val())
            prism = 0
            $('prism-start').text(`Prism: $${prism}.00`)
        }

        $('#other-options').on('change', function () {
            lensOptions = $('#other-options').val();
        })

        otherOptions = $.map(lensOptions, Number);

        total = parseInt(framePrice) + parseInt(baseLensPrice) + parseInt(arPrice) + parseInt(lensMaterial) + parseInt(transChoice) + parseInt(prism)
        for (let i = 0; i < otherOptions.length; i++) {
            total = total + otherOptions[i];
        }
        
        $("#total-start").text(`Total: $${total}.00`);

    }

    $('.input-group').on('change', function () {
        displayPrices();
    });

    $("#calculate").on("click", function () {
        confirm("Are you finished with your order?")

        });


});
