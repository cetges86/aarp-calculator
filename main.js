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

    let framePrice = 0
    let arPrice = 89
    let baseLensPrice = 0

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
        baseLensPrice = $("#base-lens").find(":selected").data("value");
        if (selectedLensType === "Progressive" && selectedProg === "Standard Progressive") {
            baseLensPrice = $('#std-prog-list').find(":selected").data("value");

        } else if (selectedLensType === "Progressive" && selectedProg === "Premium Progressive") {
            baseLensPrice = parseInt($("#prem-prog-price").val());
        }

        $("#lens-start").text(`Base Lens Price: $${baseLensPrice}.00`);
        if (selectedArType === "Premium Anti-Reflective") {
            arPrice = $("#ar-price").val();
        }
        $("#ar-start").text(`Anti-Reflective Price: $${arPrice}.00`);
    
        let lensMaterial = $("#lens-material").find(":selected").data("value");
        $("#material-start").text(`Lens Material Price: $${lensMaterial}.00`);
        
        let transChoice = 0
        if ($('#transitions:checked').val()=== "on"){
            transChoice = 140
            console.log("Transitions checked")
            $('#trans-start').text(`Transitions: $${transChoice}.00`)
        } else {
            transChoice = 0
            $('#trans-start').text(`Transitions: $${transChoice}.00`)
        }

        let prism = 0
        if ($('#prism:checked').val()=== "on"){
            prism = 5*$('#prism-num').val()
            console.log("Transitions checked")
            $('#prism-start').text(`Prism: $${prism}.00`)
        } else if($('#prism:checked').val()=== "off")  {
            console.log($('#prism:checked').val())
            prism = 0
            $('prism-start').text(`Prism: $${prism}.00`)
        }
    }
    
    $('.input-group').on('change', function(){
        displayPrices();
    })

    $("#add").on("click", function (event) {
        let newDropdown = ($("#other-options")[0].outerHTML);
        $('#additional-dropdowns').append(newDropdown);
        $('#additional-dropdowns').show(100);
        $('select').formSelect();
    });

    $("#calculate").on("click", function () {
        confirm("Are you finished with your order?")

        console.log(framePrice * .7, baseLensPrice, arPrice * .7, lensMaterial);
    });


});
