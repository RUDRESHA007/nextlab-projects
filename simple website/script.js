
const signup = document.querySelector('.signup')
const cancel = document.querySelector('i')
const modal = document.querySelector('.madel')
const plan = document.querySelector('.plan')
const btn = document.querySelectorAll('button')
const submit = document.querySelectorAll('.submit')
const success = document.querySelectorAll('.success')
const cardheader = document.querySelectorAll('.card-header')
const slider = document.querySelector("#users-slider");
const slider_div = document.querySelector(".slider");

btn.forEach((e, i) => {
    btn[i].addEventListener('click', () => {
        modal.style.display = 'flex';
        const selected_plan = cardheader[i].children[0].textContent
        plan.value = selected_plan

    })
})
cancel.addEventListener('click', () => {
    modal.style.display = 'none';
    success.style.display = 'flex';

})
signup.addEventListener('click', () => {
    modal.style.display = 'flex';

})

alert(window.location);



// slider 

slider.oninput = () => {
    var val = slider.value;
    var card = document.querySelectorAll(".card");

    card.forEach((crd) => {
        // remove privious highlight
        crd.classList.remove("highlight");
        if (val <= 10) {
            slider_div.textContent = '0-10'

            card[0].classList.add("highlight");
        } else if (val <= 20) {
            card[1].classList.add("highlight");
            slider_div.textContent = '10-20'

        } else if (val <= 30) {
            card[2].classList.add("highlight");
            slider_div.textContent = '20-30'

        }
    });
}





