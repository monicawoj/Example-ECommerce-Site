document.addEventListener('DOMContentLoaded', function() {

    //define elements that we will be manipulating
    var showCalculatorButton = document.querySelector('.showCalculator');
    var calculator = document.querySelector('.application');
    var dropDownLists = document.querySelectorAll('.drop_down_list');
    var summaryPanel = document.querySelector('.summary_panel');
    var leftPanel = summaryPanel.querySelector('.panel_left');
    var rightPanel = summaryPanel.querySelector('.panel_right');
    var rightPanelPrices = summaryPanel.querySelector('.panel_right_prices');
    var totalPriceContainer = document.querySelector('.sum').querySelector('strong');
    var checkbox = document.querySelector('.checkbox');

    //show calculator when "Build Custom Chair" button is clicked
    showCalculatorButton.addEventListener('click', function(event) {
        if (this.value !== 'HIDE CHAIR BUILDER') {
            calculator.style.display = 'block';
            this.value = 'HIDE CHAIR BUILDER';
        } else {
            calculator.style.display = 'none';
            this.value = 'BUILD CUSTOM CHAIR';
        }
    });

    [...dropDownLists].forEach(function (element) {
        element.querySelector('.list_arrow').addEventListener('click', function (event) {

            //select drop-down panels
            var listPanel = this.parentElement.querySelector('.list_panel');
            listPanel.style.display = 'block';
            var listItems = listPanel.querySelectorAll('li');

            //highlight option on mouseover
            [...listItems].forEach(function (element) {
                element.addEventListener('mouseover', function (event) {
                    element.style.backgroundColor = '#24baa0';
                    element.style.color = 'white';
                });
            });

            //return option to normal styling on mouseout
            [...listItems].forEach(function (element) {
                element.addEventListener('mouseout', function (event) {
                    element.style.backgroundColor = 'initial';
                    element.style.color = 'initial';
                });
            });

            //when option is selected
            [...listItems].forEach(function (element) {
                element.addEventListener('click', function (event) {
                    listPanel.parentElement.querySelector('.list_label').innerText = element.innerText;
                    listPanel.parentElement.querySelector('.list_label').style.color = 'black';
                    listPanel.style.display = 'none';
                    console.log(element.parentElement.parentElement);
                    console.log(dropDownLists[0]);

                    //update summary table for each dropdown menu
                    if (element.parentElement.parentElement === dropDownLists[0]) {
                        rightPanel.querySelector('.title.value').innerText = element.innerText;
                        rightPanelPrices.querySelector('.title.price').innerText = element.dataset.price;
                    }
                    else if (element.parentElement.parentElement === dropDownLists[1]) {
                        leftPanel.querySelector('.color').innerText = 'Color';
                        rightPanel.querySelector('.color.value').innerText = element.innerText;
                        rightPanelPrices.querySelector('.color.price').innerText = element.dataset.price;
                    } else if (element.parentElement.parentElement === dropDownLists[2]) {
                        leftPanel.querySelector('.pattern').innerText = 'Pattern';
                        rightPanel.querySelector('.pattern.value').innerText = element.innerText;
                        rightPanelPrices.querySelector('.pattern.price').innerText = element.dataset.price;
                    }

                    //sum prices of each selected feature
                    var pricesToAdd = rightPanelPrices.querySelectorAll('h4, span');
                    var typePrice = parseInt(pricesToAdd[0].innerText);
                    var colorPrice = parseInt(pricesToAdd[1].innerText);
                    var patternPrice = parseInt(pricesToAdd[2].innerText);
                    var chairPrice = typePrice + colorPrice + patternPrice;

                    //if user selected type, color, and fabric, show "Transport" checkbox and total price
                    if (chairPrice > 0) {
                        totalPriceContainer.innerText = chairPrice;
                        checkbox.style.display = 'block';
                    }
                });
            });
        });

    });

    //add functionality to "Transport" checkbox
    var checkboxInput = checkbox.querySelector('input');
    checkboxInput.addEventListener('change', function (event) {
        if (checkboxInput.checked) {
            this.parentElement.querySelector('label').style.color = 'black';
            leftPanel.querySelector('.transport').innerText = 'Transport:';
            rightPanel.querySelector('.transport.value').innerText = 'Yes';
            rightPanelPrices.querySelector('.transport.price').innerText = this.dataset.price;
            //add transport cost to total price
            totalPriceContainer.innerText = parseInt(totalPriceContainer.innerText) + parseInt(this.dataset.price);
        }
        else {
            this.parentElement.querySelector('label').style.color = '#cecece';
            rightPanel.querySelector('.transport.value').innerText = 'None';
            rightPanelPrices.querySelector('.transport.price').innerText = 0;
            //subtract transport cost from total price
            totalPriceContainer.innerText = parseInt(totalPriceContainer.innerText) - this.dataset.price;
        }
    });
});