let x, y, r;
table = document.getElementById("result");

window.onload = function () {
    function setOnClick(element) {
        element.onclick = function () {
            r = this.value;
            buttons.forEach(function (element) {
                element.style.boxShadow = "";
                element.style.transform = "";
            });
            this.style.boxShadow = "0 0 40px 5px #f41c52";
            this.style.transform = "scale(1.05)";
        }
    }

    let buttons = document.querySelectorAll("input[name=R-button]");
    buttons.forEach(setOnClick);
    table.innerHTML = localStorage.getItem("results");

};


document.getElementById("check-button").onclick = function () {
    if (validateX() && validateY() && validateR()) {
        $.ajax({
            type: "POST",
            url: "/php/script.php",
            dataType: "html",
            data: "&x=" + x +
                "&y=" + y +
                "&r=" + r +
                "&timezone" + new Date().toTimeString(),

            success: function (data) {
                table.innerHTML += data
                localStorage.setItem("results", table.innerHTML)
            }

        });
    }
};

function validateX() {
    x = document.getElementById("x-select").value;
    if (x === "") {
        alert("X value is not selected");
        return false;
    } else return true;

}

function validateY() {
    y = document.querySelector("input[name=Y-input]").value.replace(",", ".");
    if (y === "") {
        alert("The y parameter is not entered");
        return false;
    } else if (y === "+0" || y === "-0") {
        alert("Zero cannot have a sign");
        return false;
    } else if (!isNumeric(y)) {
        alert("Y is not a number");
        return false;
    } else if (!((y > -5) && (y < 5))) {
        alert("The Y value is not within the scope of acceptable values");
        return false;
    } else return true;
}

function validateR() {
    try {
        r = document.querySelector("input[type=radio]:checked").value;
        return true;
    } catch (err) {
        alert("The R value is not selected");
        return false;
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


