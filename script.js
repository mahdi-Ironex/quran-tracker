const hifd = document.body.querySelector(".hifd");
const hifdScreen = document.body.querySelector(".first__hifd");
const hifdAdd = document.body.querySelector(".hifd__add__btn");
const hifdDecrease = document.body.querySelector(".hifd__decrease__btn");
const group = document.body.querySelector(".group__first__hifd");
const enter = document.body.querySelector(".first__hifd__btn");
const hifdCounter = document.body.querySelector(".hifd__counter");
const between = document.querySelectorAll(".between");

let count1 = 0;

enter.addEventListener("click", () => {
    let counterValue = hifdScreen.value;

    if (counterValue.trim() === "") {
        counterValue = -1;
    }

    counterValue = Number(counterValue);

    if (
        counterValue <= 60 &&
        counterValue >= 0 &&
        !Number.isNaN(counterValue)
    ) {
        group.style.display = "none";
        hifdCounter.textContent = counterValue;

        hifd.style.background =
            `linear-gradient(to right, #D4A84F ${percent(counterValue)}%, #20242D ${percent(counterValue)}%)`;

        count1 = counterValue;
    }

    if (
        counterValue <= 60 &&
        counterValue >= 0 &&
        !Number.isNaN(counterValue)
    ) {
        between.forEach(element => {
            element.style.display = "flex";
        });
    }
});


hifdAdd.addEventListener("click", () => {
    if (count1 < 60) {
        count1++;

        hifdCounter.textContent = count1;

        hifd.style.background =
            `linear-gradient(to right, #D4A84F ${percent(count1)}%, #20242D ${percent(count1)}%)`;
    }
});


hifdDecrease.addEventListener("click", () => {
    if (count1 > 0) {
        count1--;

        hifdCounter.textContent = count1;

        hifd.style.background =
            `linear-gradient(to right, #D4A84F ${percent(count1)}%, #20242D ${percent(count1)}%)`;
    }
});


let row = [];

const wardStep = document.body.querySelector(".ward__step");
const addWard = document.body.querySelector(".ward__add__btn");
const decreaseWard = document.body.querySelector(".ward__decrease__btn");

let count = 0;

addWard.addEventListener("click", () => {
    if (count < 15 && count >= 0) {
        count++;
        wardStep.textContent = count;
    }
});


decreaseWard.addEventListener("click", () => {
    if (count > 0) {
        count--;
        wardStep.textContent = count;
    }
});


let a = 0;
let b = 0;

const push = document.body.querySelector(".push__ward__btn");
const progress = document.body.querySelector(".Progress");

push.addEventListener("click", () => {

    if (count1 !== 0 && count !== 0) {

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

        a = b;
        b = b + count;

        if (b > count1 && a === count1) {
            a = 0;
            b = count;
        }
        else if (count1 - a < count && count1 - a !== 0) {
            b = count1;
        }


        let tr = document.createElement("tr");
        progress.append(tr);


        let td = document.createElement("td");
        td.textContent = new Date().toLocaleDateString("en-GB");
        tr.append(td);


        let tdward = document.createElement("td");
        tdward.textContent = `from ${a} hizb to ${b}`;
        tr.append(tdward);


        let tdhifd = document.createElement("td");
        tdhifd.textContent = count1;
        tr.append(tdhifd);


        let tdtext = document.createElement("td");

        let input = document.createElement("textarea");

        tdtext.append(input);
        tr.append(tdtext);


        let data = {
            date: td.textContent,
            hifd: tdhifd.textContent,
            ward: tdward.textContent,
            text: tdtext.textContent,
        };


        input.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                tdtext.textContent = input.value;

                data.text = input.value;

                row.push(data);

                localStorage.setItem(
                    "row",
                    JSON.stringify(row)
                );
            }
        });


        let del = document.createElement("td");

        let delbtn = document.createElement("button");

        delbtn.textContent = "❌";

        del.append(delbtn);
        tr.append(del);

        del.classList.add("del");


        delbtn.addEventListener("click", () => {

            tr.remove();

            row = row.filter(element => {
                return element !== data;
            });

            localStorage.setItem(
                "row",
                JSON.stringify(row)
            );
        });
    }


    let p = percent(Number(count1));

    hifd.style.background =
        `linear-gradient(to right, #D4A84F ${p}%, #20242D ${p}%)`;

    localStorage.setItem(
        "bar",
        JSON.stringify(p)
    );


    let saves = {
        displa: "none",
        counter: Number(count1),
        displa_betweem: "flex",
    };

    localStorage.setItem(
        "saves",
        JSON.stringify(saves)
    );
});


let r = localStorage.getItem("bar");

if (!isNaN(r)) {

    hifd.style.background =
        `linear-gradient(to right, #D4A84F ${r}%, #20242D ${r}%)`;

}
else {

    hifd.style.background = "#8ACC9D";

}


let saves = JSON.parse(
    localStorage.getItem("saves")
) || {
    displa: "flex",
    counter: "",
    displa_betweem: "none",
};


group.style.display = saves.displa;

hifdCounter.textContent = Number(saves.counter);

count1 = Number(saves.counter);


between.forEach(element => {
    return element.style.display = saves.displa_betweem;
});


row = JSON.parse(
    localStorage.getItem("row")
) || [];


for (let i of row) {

    let tr = document.createElement("tr");


    let date = document.createElement("td");
    date.textContent = i.date;
    tr.append(date);


    let ward = document.createElement("td");
    ward.textContent = i.ward;
    tr.append(ward);


    let hifd = document.createElement("td");
    hifd.textContent = i.hifd;
    tr.append(hifd);


    let correction = document.createElement("td");
    correction.textContent = i.text;
    tr.append(correction);


    let del = document.createElement("td");

    del.classList.add("del");

    tr.append(del);

    progress.append(tr);
}


const reset = document.body.querySelector(".delete__btn");

reset.addEventListener("click", () => {

    hifd.style.background = "#8ACC9D";

    localStorage.removeItem("saves");

    progress.innerHTML = "<tbody></tbody>";

    row.splice(0, row.length);

    localStorage.removeItem("row");

    localStorage.removeItem("bar");

    count1 = 0;
    count = 0;

    a = b = 0;

    hifdScreen.value = "";

    wardStep.textContent = 0;

    hifdCounter.textContent = "";

    group.style.display = "flex";

    between.forEach(element => {
        element.style.display = "none ";
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


function percent(x) {
    return x * 100 / 60;
}