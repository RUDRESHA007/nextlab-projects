
const actions = document.querySelectorAll('.action_btn')
const cancel = document.querySelectorAll('.fa-xmark')
console.log(cancel);

//when click the any option button form is showed

const action_form = document.querySelectorAll('.action')
actions.forEach((ele, i) => {
    // action_form.forEach((form, ix) => {
    ele.addEventListener('click', () => {
        action_form[i].style.display = 'flex'
    })
})
cancel.forEach((ele, i) => {
    // action_form.forEach((form, ix) => {
    ele.addEventListener('click', () => {
        action_form[i].style.display = 'none'
    })
})


