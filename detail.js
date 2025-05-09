
let basketArr = JSON.parse(localStorage.getItem("basketArr")) || []
const params= new URLSearchParams(location.search)
const id = params.get('id')
const loading= document.getElementById('loadingOverlay')
console.log(id)
const bars = document.querySelectorAll(".bar");

const detailImg= document.getElementById('detailImg')
const detailContent = document.getElementById('detailContent')
const pathName = document.getElementById('pathName')
const basketModal =document.getElementById('basketModal')
const basketItems =document.getElementById('basketItems')
const basketCount = document.getElementById('basketCount')
let detail=[]
async function getDetail() {
    const response = await fetch("https://starbucks-data-nine.vercel.app/menus")
    const data = await response.json()
    detail.push(...data)
    if (!detail.length) loading.classList.add("block")
    else {
      loading.classList.remove("block");
      loading.classList.add("hidden");
    }
    nanay()
}
getDetail()
let selctedProduct
let pathName1
let pathName2
function nanay() {
 detail.forEach(category =>{
    category.children.forEach(group =>{
        group.children.forEach(type =>{
            const searched = type.products.find(item => item.productNumber == id )
            if(searched){
                selctedProduct=searched
                pathName1=category.name
                pathName2 =group.name
            }
        })
    })
 })
 //console.log(selctedProduct)
 if(selctedProduct){
    pathName.innerHTML = `
    <ul class="flex gap-1">
      <li><a href="menu.htm" class="text-[#000000DE] text-[14px] leading-snug tracking-wider">Menu</a></li>
      <span class="text-[#00000094]">/</span>
      <li><a href="menu.htm" class="text-[#000000DE]  text-[14px] leading-snug tracking-wider">${pathName2}</a></li>
      <span class="text-[#00000094]">/</span>
       <li><a href="" class="text-[#000000DE] font-bold text-[14px] leading-snug tracking-wider">${selctedProduct.name}</a></li>
      </ul>
    `
    detailImg.innerHTML = `<img class="object-cover" src="${selctedProduct.imageURL}" alt=""> `
    detailContent.innerHTML = `
    <button onclick="addBasket()" class="mt-4 bg-[#CBA258] text-black font-medium  px-4 py-2 rounded-2xl mb-3">Add to Order</button>
     <h1 class="text-white text-[22px] font-extrabold  md:text-[28px] lg:text-4xl">${selctedProduct.name}</h1>
    `
  }}
function addBasket(){
const existingProduct = basketArr.find( item => item.id === selctedProduct.productNumber)
if(existingProduct){
  existingProduct.count ++
} else{
  basketArr.push({
    name : selctedProduct.name,
    image : selctedProduct.imageURL,
    count : 1,
    id :selctedProduct.productNumber
  })
}
localStorage.setItem('basketArr' ,JSON.stringify(basketArr))
console.log(basketArr)
updateCount()
}
function openBasket(){
  let code = "";
  if(basketArr.length){
    basketArr.forEach(item =>{
      code += `
      <div class="flex items-center gap-4  pb-2">
                    <img src="${item.image}" class="w-[50px] h-[50px] object-cover rounded-full">
                    <div>
                        <h4 class="font-bold text-sm tracking-wider">${item.name}</h4>
                        <span class="text-xs text-gray-600">Count: ${item.count}</span>
                        <div class="flex gap-2 items-center">
                        <button onclick="productCount(${item.id} ,1)" class="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xl flex items-center justify-center hover:bg-gray-300 transition">+</button>
                        <button onclick="productCount(${item.id} ,-1)" class="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xl flex items-center justify-center hover:bg-gray-300 transition">-</button>
                        <button onclick="removeProduct(${item.id})"  class="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xl flex items-center justify-center hover:bg-gray-300 transition"><span class="text-xl text-red-600  cursor-pointer">&times;</span></button>
                        </div>
                    </div>
                </div>
      `
    })
  }else code = `<p class="text-center text-gray-500 text-xl">Ne baxirsan bos bos.</p>`;
   basketItems.innerHTML = code
  basketModal.classList.remove("hidden")
}
function closeBasket(){ basketModal.classList.toggle('hidden')}
function productCount(id ,arg){
 const product = basketArr.find( item => item.id === id)
 if(product) product.count += arg
  if (product.count <= 0)  basketArr = basketArr.filter((item) => item.id !== id)
  localStorage.setItem("basketArr", JSON.stringify(basketArr))
  openBasket()
  updateCount()
}
function removeProduct(id){
  basketArr = basketArr.filter((item) => item.id !== id)
  localStorage.setItem("basketArr" , JSON.stringify(basketArr))
  openBasket()
  updateCount()
}
function updateCount(){
  const totalCount = basketArr.length
  basketCount.innerHTML = totalCount
}
updateCount()
function toggleMenu() {
  bars[0].classList.toggle("rotate-45")
  bars[0].classList.toggle("translate-y-[11px]")
  bars[1].classList.toggle("opacity-0")
  bars[2].classList.toggle("-rotate-45")
  bars[2].classList.toggle("-translate-y-[11px]")
  flags ? hiddenList.classList.add("translate-x-full") && hiddenList.classList.remove("translate-x-0") 
  : hiddenList.classList.remove("translate-x-full") && hiddenList.classList.add("translate-x-0")
  flags = !flags
}