document.addEventListener('DOMContentLoaded', function () {
    let rValue = 1;

    const rButtons = document.getElementsByClassName('r-button');
    const yInput = document.getElementById('form:y');
    const canvas = document.getElementById('graph');

    console.log(yInput);

    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const rectX = event.clientX - rect.left;
        const rectY = event.clientY - rect.top;

        let realX = (rectX - canvas.width / 2) / (canvas.width / 2) * rValue;
        let realY = (canvas.height / 2 - rectY) / (canvas.height / 2) * rValue;

        const constrX = applyXConstraints(realX);
        const constrY = applyYConstraints(realY);
    });

    function applyXConstraints(x) {
        const possibleXValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
        return possibleXValues.reduce((prev, curr) =>
            Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev
        );
    }

    function applyYConstraints(y) {
        if (y < -5) y = -5;
        if (y > 3) y = 3;
        return Math.round(y * 1000) / 1000;
    }

    const rRadioButtons = document.querySelectorAll('input[name="form:j_idt22"]'); // 'form:r' is the default naming convention in JSF

    rRadioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            const selectedRValue = this.value;
            setR(selectedRValue);
            console.log("Selected R value: " + selectedRValue);
        });
    });

    setDefaults();

    function setDefaults() {
        const xRadioInputs = document.querySelectorAll('input[name="x"]');
        for (let radio of xRadioInputs) {
            if (radio.value === "0") {
                radio.checked = true;
                break;
            }
        }
        yInput.value = 0;
        const rRadioInputs = document.querySelectorAll('input[name="r"]');
        for (let radio of rRadioInputs) {
            if (radio.value === "0") {
                radio.checked = true;
                break;
            }
        }
        console.log(xRadioInputs + " " + rRadioInputs);
    }

    function setR(r) {
        rValue = r;
        refresh(rValue);

        for (let button of rButtons) {
            button.classList.remove('selected');
        }
        for (let button of rButtons) {
            if (button.value == r) {
                button.classList.add('selected');
                break;
            }
        }
    }

    for (let button of rButtons) {
        button.addEventListener('click', function () {
            setR(this.value);
        });
    }

    yInput.addEventListener('input', function () {
        let yValue = yInput.value.replace(/[^0-9.,-]/g, '');

        yValue = yValue.replace(/,/g, '.');

        console.log(yValue);

        if (yValue && (parseFloat(yValue) < -3 || parseFloat(yValue) > 5)) {
            yValue = parseFloat(yValue) > 5 ? '5' : '-3';
        }

        yValue = String(yValue);

        if (yValue.indexOf('.') !== -1 && yValue.split('.')[1].length > 3) {
            yValue = yValue.substring(0, yValue.indexOf('.') + 4);
        }

        if ((yValue.match(/\./g) || []).length > 1) {
            yValue = yValue.substring(0, yValue.lastIndexOf('.'));
        }

        if ((yValue.match(/\./g) || []).length === 1 && yValue.indexOf('.') === 0) {
            yValue = '0' + yValue;
        }

        yInput.value = yValue;
    });
});