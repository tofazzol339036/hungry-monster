

const searchFoodName = document.getElementById("search_foodInput");
const searchButton = document.getElementById("search_button");
const allFoodMenueList =  document.getElementById("all_foodMenues");
const recipeItemBlocks =document.getElementById("recipe_Item_blocks");
const ul = document.getElementById("ingredient_list");
let recipeImageItem = document.getElementById("recipe_image_Item");
let recipeName = document.getElementById("recipe_name");
let ingredients = document.getElementById("ingredients");
let errorMessagesAlertDiv =document.getElementById("error_messages_alert_section");
let errorButton =document.getElementById("error_meggase_button");
//html elements in variables end here...



searchButton.addEventListener("click",()=>{
    errorMessagesAlertDiv.style.display="none";
    allFoodMenueList.innerHTML="";
    recipeItemBlocks.style.display="none";
    let foodName = searchFoodName.value;
    if (foodName === "") {
        getErrorMessageAlert();
    } else {
        getFoodListMenu(foodName);
    }
})
//adding event handler to search menu by name

let getFoodListMenu = foodName =>{
    let menuLink=`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(menuLink)
    .then(responce=>responce.json())
    .then(data=>{
        showMenu(data);
    })
}
//function to  get food name and image from api 

let showMenu= data =>{
    let menuItems =data.meals;
    try {
        menuItems.forEach(item => {
            let mealName= item.strMeal;
            let menuImage =item.strMealThumb;
            let oneMenu=document.createElement("div");
            oneMenu.className="one_menu";
            var singleMenu=`<div class="image_menu_div">
                                <img class="image_menuItem" src="${menuImage}" alt="">
                            </div>
                            <div class="name_menu_div">
                                <h3 class="name_menu">${mealName}</h3>
                            </div>`
            oneMenu.innerHTML=singleMenu;
            
            allFoodMenueList.appendChild(oneMenu);
    
            //added evend handler on specific menu to see the ingredients
            oneMenu.addEventListener("click",function(e){
                ul.innerHTML="";
                let menuLink=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`
                fetch(menuLink)
                .then(responce=>responce.json())
                .then(data=>{
                    getImageAndHeader(data);
                    getIngredientList(data);
                    scrolltop();
                    recipeItemBlocks.style.display="grid"
                })
            })                 
        });  
    } catch (error) {
        getErrorMessageAlert();
    }    
}
//function to show all matched items in food list menu 

let getImageAndHeader = data =>{
    console.log(data.meals);
    recipeImageItem.src = data.meals[0].strMealThumb;
    recipeName.innerHTML = data.meals[0].strMeal;
    ingredients.innerText = "Ingredients";
}
//function to get image and header for specific(clicked) recipe

let getIngredientList = data =>{
    let mealObject = data.meals[0];
        let size = Object.keys(mealObject).length;
        for (let i = 1; i < size; i++) {
            let index = i +"";
            let newMeasure="strMeasure"+index;
            let newIngredient="strIngredient"+index;
            let eachIngredient=`${mealObject[newMeasure]} ${mealObject[newIngredient]}`;
            if(mealObject[newMeasure]!==""&& mealObject[newIngredient]!==""){
                 if ( eachIngredient!=="undefined undefined" && eachIngredient!==null) {
                     let li= document.createElement("li");
                     li.style.listStyle="none";
                     li.innerHTML=`<i class="fas fa-check-square"></i>  ${eachIngredient}`;
                     ul.appendChild(li);
                }
            }
        }
}   // ingredients function of specific(clicked) recipe end here...


// generate error message function
let getErrorMessageAlert =()=>{
    errorMessagesAlertDiv.style.display="block";
    errorButton.addEventListener("click",(e)=>{
        errorMessagesAlertDiv.style.display="none";
        searchFoodName.value="";
    })
}


let scrolltop=()=>{
    window.scroll({
        top: 70, 
        left: 0, 
        behavior: 'smooth' 
       });
}
//scrolling function end here...