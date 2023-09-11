let x, y, r;

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
    document.getElementById("outputContainer").innerHTML = localStorage.getItem("session");

};


document.getElementById("check-button").onclick = function () {
    if (validateX() && validateY() && validateR()) {
        const coordinates = {
            x: x,
            y: y,
            r: r,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        fetch("./php/script.php?", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(coordinates)
        })
            .then(response => response.text())
            .then(function (serverAnswer) {
                setPointer(serverAnswer);
                localStorage.setItem("session", serverAnswer);
                document.getElementById("outputContainer").innerHTML = serverAnswer;
            })
            .catch(err => alert("HTTP error " + err.status + ". Try again later. " + err));
    }
};

function setPointer(serverAnswer) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(serverAnswer, "text/html");
    const row = doc.querySelectorAll('tr')[1];
    const cells = row.getElementsByTagName("td");
    const last = cells[3];

    let pointer = document.getElementById("pointer");
    pointer.style.visibility = "visible";
    pointer.style.fill = last.innerHTML.includes("success") ? "#09a53d" : "#a50909";
    pointer.setAttribute("cx", x * 60 * 2 / r + 150);
    pointer.setAttribute("cy", -y * 60 * 2 / r + 150);
}

function validateX() {
    x = document.getElementById("x-select")[0].value;
    if (x.value === "") {
        alert("X value is not selected");
        return false;
    } else return true;
}

function validateY() {
    y = document.querySelector("input[name=Y-input]").value.replace(",", ".");
    if (y === undefined) {
        alert("The y parameter is not entered");
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
        x = document.querySelector("input[type=radio]:checked").value;
        return true;
    } catch (err) {
        alert("The R value is not selected");
        return false;
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

