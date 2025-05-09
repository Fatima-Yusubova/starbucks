const hiddenList= document.getElementById('hiddenList')
const bars = document.querySelectorAll('.bar')
const menus = document.getElementById("menus")
const menuLi = document.getElementById("menuLi")
const menuAd = document.getElementById('menuAd')
const loading = document.getElementById("loadingOverlay")
const basketCount =document.getElementById('basketCount')
let flags = false
function toggleMenu() {
     bars[0].classList.toggle("rotate-45")
     bars[0].classList.toggle("translate-y-[11px]")
    bars[1].classList.toggle('opacity-0')
    bars[2].classList.toggle("-rotate-45")
    bars[2].classList.toggle("-translate-y-[11px]")

  flags ? hiddenList.classList.add("translate-x-full") && hiddenList.classList.remove("translate-x-0")
  : hiddenList.classList.remove("translate-x-full") &&  hiddenList.classList.add("translate-x-0")
  flags = !flags
}
 let menuData=[] 
 async function getData(){
  const response = await fetch("https://starbucks-data-nine.vercel.app/menus")
  const data = await response.json()
  menuData.push(...data)
  console.log(menuData)
  if(!menuData.length)
   loading.classList.add('block')
  else{
    loading.classList.remove('block')
    loading.classList.add('hidden')
  }
  getMenu()
   getChildren()
   getMenuLi()
}
getData()
function getMenu(){
  let code=''
  menuData.forEach(item =>{
    code += `
    <section  class="py-4">
                <h2 class="text-2xl text-[#000000DE] font-extrabold tracking-wider pb-6" >${item.name}</h2>
                <hr class="text-gray-200">
                <ul class="menuList grid md:grid-cols-2 gap-4" class="py-8">
                </ul>
            </section>
    `;
  })
  menus.innerHTML= code
}

function getMenuLi(){
  let code=''
  menuData.forEach(item =>{
    code += `
    <li class="pb-4">
        <h3 class="text-[19px] text-[#000000DE] font-bold">${item.name}</h3>
        <ul>${item.children.map((product) => `<li onclick="showNextChildren('${product.id}')" class="text-[16px] py-3 text-[#00000094] font-medium">${product.name}</li>`).join("")}
        </ul>
    </li>
    `
  })
  menuLi.innerHTML= code
}

function getChildren(){
  const menuList = document.querySelectorAll(".menuList")
   menuData.forEach((item ,index) => {
     let code = ""
    item.children.forEach(product => {
        code += `
        <li class="flex gap-3 items-center py-4">
                         <div class="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden">
                             <img class="object-cover w-full h-full " style="transform: scale(2.2);"  src="${product.categoryImageURL}" alt="">
                         </div>
                         <h3 onclick="showNextChildren('${product.id}')"  class="text-[18px] text-[#000000DE] font-medium tracking-wider">${product.name}</h3>
                     </li>
        `;
    })
     menuList[index].innerHTML = code
  })
}
function showNextChildren(id){
 menuData.forEach((category) => {
   const found = category.children.find((product) => product.id === id)
    if(found){
      console.log(found)
      console.log(found.children)
    found.children.map((item) => item.name)
    let found2 = found.children.map((item) => item.products)
    console.log(found2)
    menuAd.classList.add('hidden')
    
    menus.innerHTML = `
  <section class="py-4">
      <ul class="flex gap-2">
      <li><a href="menu.htm" class="text-[#00000094] text-[16px]">Menu</a></li>
      <span class="text-[#00000094]">/</span>
      <li><a href="" class="text-[#00000094] font-bold text-[16px]">${found.name}</a></li>
      </ul>
    <h1 class="text-[28px] text-[#000000DE] font-extrabold tracking-wider py-6">${found.name}</h1>
    <div class="py-8">
      ${found.children.map(type => `
        <div class="mb-8">
          <h2 class="text-2xl text-[#000000DE] font-extrabold tracking-wider pb-6">${type.name}</h2>
      <hr class="text-gray-200 py-4">
          <ul class="menuList grid grid-cols-2  md:grid-cols-4 gap-4">
            ${type.products.map(product => `
              <li class="flex flex-col items-center">
              <div class="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden mb-6">
              <a href="detail.htm?id=${product.productNumber}">
              <img src="${product.imageURL}" class="object-cover w-full h-full " style="transform: scale(2.2);" rounded-full mb-2">
              </a>
              </div>
                <h4 class="text-sm md:text-xl font-medium">${product.name}</h4>
              </li> `).join("")}
          </ul>
        </div>
      `).join("")}
    </div>
  </section>
`
       console.log(found.name) }
 })
}
function openBasket(){
}
 function toggleAccardion(button) {
  const icon = button.querySelector("span")
  const content = button.parentNode.querySelector("ul")
  const open = content.classList.contains("hidden")

    if(open) {
      content.classList.remove("hidden")
      content.classList.add("max-h-[500px]")
      icon.classList.add("rotate-180")
    } else {
      content.classList.add("hidden")
      content.classList.remove("max-h-[500px]")
      icon.classList.remove("rotate-180")
    }
 }
// let basketArr = JSON.parse(localStorage.getItem("basketArr")) || []
// function updateCount() {
//   const totalCount = basketArr.length
//   basketCount.innerHTML = totalCount
// }
// updateCount()