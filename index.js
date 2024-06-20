function get() {
    const btnser = document.getElementById("btnser");


    btnser.addEventListener("click", () => {
        const serVal = document.querySelector("input").value;
        if (serVal == "") {
            alert("enter a value first")
        } else {
            console.log(serVal);
        }

    })
    return serVal;
}
module.exports = get;