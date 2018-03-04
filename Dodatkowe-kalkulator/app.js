document.addEventListener('DOMContentLoaded', function() {

    var dropDownLists = document.querySelectorAll('.drop_down_list');
    var summaryPanel = document.querySelector('.summary_panel');
    var leftPanel = summaryPanel.querySelector('.panel_left');
    var rightPanel = summaryPanel.querySelector('.panel_right');

    console.log(dropDownLists);

    [...dropDownLists].forEach(function (element) {
        element.querySelector('.list_arrow').addEventListener('click', function (event) {

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
                    console.log(element);

                    if (element == element.parentElement.querySelector('li:nth-of-type(2)')) {
                        console.log('hello');
                        leftPanel.querySelector('.color').innerText = 'Color';
                        rightPanel.querySelector('.color.value').innerText = element.innerText;
                    }
                    else if (element.className.indexOf('pattern') !== -1) {
                        leftPanel.querySelector('.pattern').innerText = 'Pattern';
                        rightPanel.querySelector('.pattern.value').innerText = element.innerText;
                    } else if (element.className.indexOf('pattern') !== -1) {
                        rightPanel.querySelector('.title.value').innerText = element.innerText;
                    }
                });
            });
        });

        //change text to black when checkbox checked
        var checkboxInput = document.querySelector('.checkbox input');
        checkboxInput.addEventListener('change', function (event) {
            if (checkboxInput.checked) {
                this.parentElement.querySelector('label').style.color = 'black';
                leftPanel.querySelector('.transport').innerText = 'Transport:';
                rightPanel.querySelector('.transport.value').innerText = 'Yes';
            }
            else {
                this.parentElement.querySelector('label').style.color = '#cecece';
            }
        });

    });

});