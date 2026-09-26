let ctx = document.querySelector('#cash-flow-chart')
let registerLink = document.querySelector('.register-link')
let loginLink = document.querySelector('.login-link')
let loginSection = document.querySelector('.login-section')
let registerSection = document.querySelector('.register-section')
let registerForm = document.querySelector('.register-form')
let loginForm = document.querySelector('.login-form')
let nav = document.querySelector('nav')
let aside = document.querySelector('aside')
let mainContent = document.querySelector('.main-content')
let cardsSection = document.querySelector('.cards-section')
let addTransectionBtn = document.querySelector('.add-transection-btn')
let addTransectionSection = document.querySelector('.add-transaction-section')
let addTransectionForm = document.querySelector('.add-transection-form')
let dateInput = document.querySelector('#date')
let close = document.querySelector('.close')
let userHeaderName = document.querySelector('.user-header-name')
let nameFirstChar = document.querySelector('.first-char')
let showTableData = document.querySelector('.show-table-data')
let resetAllTransactionBtn = document.querySelector('.reset-all-transection')
let search = document.querySelector('.search')
let type = document.querySelector('.type')
let logOutBtn = document.querySelector('.log-out')
let prefrencesCurrencyIcon = document.querySelector('.prefrences-currency')
let prefrencesSection = document.querySelector('.prefrences-section')
let prefrencesBtn = document.querySelector('.prefrences-aside-btn')
let dashboardBtn = document.querySelector('.dashboard-btn')
let profileForm = document.querySelector('.profile-details-form')


let userNmae = JSON.parse(localStorage.getItem('user'))

let editIndex = null


var cashFlowChart = new Chart(ctx, {
    type: "bar",

    data: {
        labels: ['Income vs Expenses'],

        datasets: [
            {
                label: 'Income',
                data: [0],
                backgroundColor: 'darkgreen',
                borderRadius: 5
            },

            {
                label: 'Expenses',
                data: [0],
                backgroundColor: 'darkred',
                borderRadius: 5
            }
        ]
    }
})


const showDate = () => {

    const today = new Date().toISOString().split("T")[0]

    dateInput.value = today
}

const cards = [

    {
        title: "CURRENT BALANCE",
        value: 0,
        description: "",
        icon: "ri-bank-fill",
        valueColor: "text-black",
        textColor: "text-teal-600",
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-50"
    },

    {
        title: "TOTAL INCOME",
        value: 0,
        description: "Overall incoming revenue",
        icon: "ri-arrow-up-circle-fill",
        valueColor: "text-emerald-600",
        textColor: "text-zinc-500",
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-50"
    },

    {
        title: "TOTAL EXPENSE",
        value: 0,
        description: "Overall outgoing expenses",
        icon: "ri-arrow-down-circle-fill",
        valueColor: "text-rose-600",
        textColor: "text-zinc-500",
        iconColor: "text-rose-600",
        iconBg: "bg-rose-50"
    },

    {
        title: "TOTAL TRANSACTIONS",
        value: 0,
        description: "Logged financial records",
        icon: "ri-file-list-3-fill",
        valueColor: "text-black",
        textColor: "text-zinc-500",
        iconColor: "text-sky-600",
        iconBg: "bg-sky-50"
    }

]


function card() {

    cardsSection.innerHTML = ''

    let currency = userNmae ? userNmae.currency : ''

    cards.forEach((elem) => {

        cardsSection.innerHTML += `
            <div class="w-[25%] hover:shadow-lg hover:shadow-indigo-500/10 bg-white border border-zinc-300 rounded-xl p-5">

                <div class="w-full flex justify-between">

                    <span class="text-zinc-600 font-semibold uppercase text-sm">
                        ${elem.title}
                    </span>

                    <i class="${elem.icon} px-2 py-1 ${elem.iconBg} text-2xl ${elem.iconColor} rounded-xl"></i>

                </div>

                <div>

                    <h3 class="text-3xl ${elem.valueColor} font-bold">

                        ${
                            elem.title === 'TOTAL TRANSACTIONS'
                                ? elem.value
                                : `${currency}${elem.value}`
                        }

                    </h3>

                    <span class="text-[0.8rem] text-zinc-600">
                        ${elem.description}
                    </span>

                </div>

            </div>
        `
    })


    if (userNmae) {

        let char = userNmae.username

        nameFirstChar.textContent =
            char[0].toUpperCase()

    }
}


function updateCards() {

    if (!userNmae) {

        cards[0].value = 0
        cards[1].value = 0
        cards[2].value = 0
        cards[3].value = 0

        card()

        return
    }


    let allTransection =
        JSON.parse(localStorage.getItem(`transections_${userNmae.username}`)) || []

    cards[0].value = 0
    cards[1].value = 0
    cards[2].value = 0
    cards[3].value = allTransection.length


    allTransection.forEach((elem) => {

        if (elem.type === 'Income') {

            cards[0].value += Number(elem.amount)

            cards[1].value += Number(elem.amount)

        }

        else{

            cards[2].value += Number(elem.amount)

            cards[0].value -= Number(elem.amount)

        }

    })

    cashFlowChart.data.datasets[0].data[0] = cards[1].value

    cashFlowChart.data.datasets[1].data[0] = cards[2].value

    cashFlowChart.update()

    card()
}


const prefrenceButton = () => {

    prefrencesSection.style.display = 'flex'

    mainContent.style.display = 'none'


    prefrencesBtn.style.backgroundColor = '#EEF2FF'
    prefrencesBtn.style.color = '#4F46E5'
    prefrencesBtn.style.border = '1px solid #BFDBFE'


    dashboardBtn.style.backgroundColor = 'transparent'
    dashboardBtn.style.color = '#52525B'
    dashboardBtn.style.border = 'none'
}


const dashboardButton = () => {

    prefrencesSection.style.display = 'none'

    mainContent.style.display = 'flex'


    dashboardBtn.style.backgroundColor = '#EEF2FF'
    dashboardBtn.style.color = '#4F46E5'
    dashboardBtn.style.border = '1px solid #BFDBFE'


    prefrencesBtn.style.backgroundColor = 'transparent'
    prefrencesBtn.style.color = '#52525B'
    prefrencesBtn.style.border = 'none'
}


const tableData = (data = null) => {

    if (!userNmae) return


    if (!data) {

        data = JSON.parse(localStorage.getItem(`transections_${userNmae.username}`)) || []

    }

    showTableData.innerHTML = ''
    data.forEach((elem, idx) => {
        showTableData.innerHTML += `<tr class="hover:bg-zinc-100/50">
                <td class="px-6 py-4 font-medium text-gray-400">
                    ${elem.date}
                </td>
                <td class="px-6 py-4 font-medium text-gray-900">
                    ${elem.descreption}
                </td>
                <td class="px-6 py-4 font-medium">
                    <span class="px-2 py-1 bg-zinc-100 text-zinc-500 border border-zinc-300 rounded-full">
                        ${elem.cetagory}
                    </span>
                </td>
                <td class="px-6 py-4 font-medium">
                    <span class="px-3 py-1 flex items-center justify-center gap-1 w-fit
                        ${elem.type === 'Income' ? 'bg-green-100 text-green-500': 'bg-red-100 text-red-500'} rounded-full">
                        <i class="${elem.type === 'Income'? 'ri-arrow-up-line': 'ri-arrow-down-line'}"></i>${elem.type}</span>
                </td>
                <td class="px-6 py-4 font-medium ${elem.type === 'Income'? 'text-green-500': 'text-red-500'} text-right">
                    <i class="${elem.type === 'Income'? 'ri-add-fill': 'ri-subtract-fill'}"></i>${userNmae.currency}${elem.amount}
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 flex gap-2 items-center justify-center">
                    <i class="ri-edit-box-line text-xl text-blue-800 cursor-pointer" onclick="editData(${idx})"></i>
                    <i class="ri-delete-bin-6-line text-xl text-red-800 cursor-pointer" onclick="deleteData(${idx})"></i>
                </td>
            </tr>`
    })
}

const deleteData = (index) => {

    if (!userNmae) return


    let allTransection = JSON.parse(localStorage.getItem(`transections_${userNmae.username}`)) || []

    allTransection.splice(index, 1)

    localStorage.setItem(`transections_${userNmae.username}`,JSON.stringify(allTransection))

    updateCards()
    tableData()
}


const editData = (index) => {

    if (!userNmae) return


    let allTransection = JSON.parse(localStorage.getItem(`transections_${userNmae.username}`)) || []


    addTransectionSection.style.display = 'flex'
 
    addTransectionForm[0].value = allTransection[index].type
    addTransectionForm[1].value = allTransection[index].descreption
    addTransectionForm[2].value = allTransection[index].amount
    addTransectionForm[3].value = allTransection[index].date
    addTransectionForm[4].value = allTransection[index].cetagory

    editIndex = index
}



registerLink.addEventListener('click', (event) => {

    event.preventDefault()

    loginSection.style.display = 'none'

    registerSection.style.display = 'flex'
})


loginLink.addEventListener('click', (event) => {

    event.preventDefault()

    loginSection.style.display = 'flex'

    registerSection.style.display = 'none'
})


registerForm.addEventListener('submit', (event) => {

    event.preventDefault()


    let regesterdUser = JSON.parse(localStorage.getItem('regesterdUser')) || []


    let username = registerForm[0].value.trim()

    let password = registerForm[1].value


    if (username === '' || password.trim() === '') {
        return
    }

    let regesterdUserObj = {
        username,
        password,
        currency: '$'
    }

    regesterdUser.push(regesterdUserObj)

    localStorage.setItem('regesterdUser',JSON.stringify(regesterdUser))

    alert('Registration Successfull! You can now login.')

    loginSection.style.display = 'flex'
    registerSection.style.display = 'none'

    registerForm.reset()

})


loginForm.addEventListener('submit', (event) => {

    event.preventDefault()

    let username = loginForm[0].value.trim()

    let password = loginForm[1].value


    let match = JSON.parse(localStorage.getItem('regesterdUser')) || []

    let user = match.find((elem) => {
        return (elem.username === username && elem.password === password)
    })


    if (!user) {
        alert('Invalid Credentials')
        return
    }

    let currency = user.currency || '$'

    let loginUser = {
        username,
        currency
    }


    localStorage.setItem('user',JSON.stringify(loginUser))

    userNmae = loginUser

    userHeaderName.textContent = username.toUpperCase()

    nameFirstChar.textContent = username[0].toUpperCase()

    prefrencesCurrencyIcon.textContent = currency

    updateCards()

    tableData()

    localStorage.setItem('appearWindow',JSON.stringify(true))

    loginSection.style.display = 'none'
    registerSection.style.display = 'none'
    nav.style.display = 'flex'
    aside.style.display = 'flex'
    mainContent.style.display = 'flex'

    loginForm.reset()

})



addTransectionBtn.addEventListener('click', () => {

    if (!userNmae) return

    addTransectionSection.style.display = 'flex'

    showDate()
})


addTransectionForm.addEventListener('submit', (event) => {

    event.preventDefault()


    if (!userNmae) return


    let allTransection = JSON.parse(localStorage.getItem(`transections_${userNmae.username}`)) || []


    let type = addTransectionForm[0].value
    let descreption = addTransectionForm[1].value
    let amount = addTransectionForm[2].value
    let date = addTransectionForm[3].value
    let cetagory = addTransectionForm[4].value

    if (descreption.trim() === '' || amount.trim() === '' || cetagory.trim() === '') {
        return
    }


    let transection = {
        type,
        descreption,
        amount,
        date,
        cetagory
    }

    if (editIndex !== null) {
        allTransection[editIndex] = transection
        editIndex = null
    }

    else {
        allTransection.push(transection)
    }


    localStorage.setItem(`transections_${userNmae.username}`,JSON.stringify(allTransection))

    addTransectionForm.reset()
    showDate()

    addTransectionSection.style.display = 'none'

    updateCards()

    tableData()

})


close.addEventListener('click', () => {

    addTransectionSection.style.display = 'none'

    editIndex = null

    addTransectionForm.reset()

})


resetAllTransactionBtn.addEventListener('click', () => {

    if (!userNmae) return

    localStorage.setItem(`transections_${userNmae.username}`,JSON.stringify([]))

    tableData()

    updateCards()

})


search.addEventListener('input', (event) => {

    if (!userNmae) return

    let allTransection = JSON.parse(localStorage.getItem(`transections_${userNmae.username}`)) || []

    let searchValue = event.target.value.toLowerCase()

    let filterdData = allTransection.filter((elem) => {
            return elem.descreption.toLowerCase().includes(searchValue)
        })
    tableData(filterdData)

})


type.addEventListener('change', (event) => {
    if (!userNmae) return

    let allTransection = JSON.parse(localStorage.getItem(`transections_${userNmae.username}`)) || []

    let selectedType = event.target.value

    let filterdData =
        allTransection.filter((elem) => {

            if (selectedType === 'All Type') {
                return true
            }
            return elem.type === selectedType
        })

    tableData(filterdData)

})


logOutBtn.addEventListener('click', () => {

    localStorage.removeItem('user')

    localStorage.removeItem('appearWindow')

    userNmae = null

    nav.style.display = 'none'
    aside.style.display = 'none'
    mainContent.style.display = 'none'
    prefrencesSection.style.display = 'none'
    loginSection.style.display = 'flex'

    cards[0].value = 0
    cards[1].value = 0
    cards[2].value = 0
    cards[3].value = 0

    card()

})



prefrencesBtn.addEventListener('click', () => {

    prefrenceButton()

})


dashboardBtn.addEventListener('click', () => {
    dashboardButton()
})

profileForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (!userNmae) return

    let oldUsername = userNmae.username

    let newUsername = profileForm[0].value.trim()

    let newCurrency = profileForm[1].value

    if (newUsername === '') return

    let oldTransactions = JSON.parse(localStorage.getItem(`transections_${oldUsername}`)) || []

    let registeredUser = JSON.parse(localStorage.getItem('regesterdUser')) || []

    let userIndex =registeredUser.findIndex((elem) =>elem.username === oldUsername)

    // Update current user

    userNmae.username = newUsername

    userNmae.currency = newCurrency

    // Username changed

    if (oldUsername !== newUsername) {localStorage.setItem(`transections_${newUsername}`,JSON.stringify(oldTransactions))
        localStorage.removeItem(`transections_${oldUsername}`)
    }

    // Update registered user

    if (userIndex !== -1) {
        registeredUser[userIndex].username = newUsername
        registeredUser[userIndex].currency = newCurrency
    }

    localStorage.setItem('regesterdUser',JSON.stringify(registeredUser))

    localStorage.setItem('user',JSON.stringify(userNmae))

    userHeaderName.textContent = newUsername.toUpperCase()

    nameFirstChar.textContent = newUsername[0].toUpperCase()

    prefrencesCurrencyIcon.textContent = newCurrency

    profileForm.reset()

    tableData()
    updateCards()

})


if (userNmae) {

    loginSection.style.display = 'none'
    registerSection.style.display = 'none'
    nav.style.display = 'flex'
    aside.style.display = 'flex'
    mainContent.style.display = 'flex'

    userHeaderName.textContent = userNmae.username.toUpperCase()
    nameFirstChar.textContent = userNmae.username[0].toUpperCase()
    prefrencesCurrencyIcon.textContent = userNmae.currency

    tableData()

    updateCards()

}
else {
    card()
}