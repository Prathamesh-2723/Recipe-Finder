const recipes = [
  {
    id: "r1",
    title: "Garlic chicken rice bowl",
    time: 25,
    icon: "🍛",
    ingredients: ["chicken", "garlic", "rice"],
    steps: [
      "Cook the rice according to package instructions.",
      "Sauté minced garlic in oil until fragrant.",
      "Add diced chicken and cook through.",
      "Serve chicken and garlic over the rice."
    ]
  },
  {
    id: "r2",
    title: "Chicken fried rice",
    time: 20,
    icon: "🍚",
    ingredients: ["chicken", "rice", "egg", "onion"],
    steps: [
      "Scramble the egg in a hot pan, set aside.",
      "Cook diced chicken and onion until browned.",
      "Add cold rice and stir-fry for 3–4 minutes.",
      "Mix in the scrambled egg and serve."
    ]
  },
  {
    id: "r3",
    title: "Roast garlic rice pilaf",
    time: 35,
    icon: "🍲",
    ingredients: ["rice", "garlic", "onion"],
    steps: [
      "Sauté onion and garlic until soft.",
      "Add rice and toast for 2 minutes.",
      "Add water or stock, cover, and simmer 18 minutes.",
      "Fluff with a fork before serving."
    ]
  },
  {
    id: "r4",
    title: "Tomato garlic pasta",
    time: 20,
    icon: "🍝",
    ingredients: ["pasta", "tomato", "garlic"],
    steps: [
      "Boil pasta until al dente.",
      "Sauté garlic in olive oil, add chopped tomato.",
      "Simmer sauce for 10 minutes.",
      "Toss pasta with sauce and serve."
    ]
  },
  {
    id: "r5",
    title: "Spinach cheese omelette",
    time: 12,
    icon: "🍳",
    ingredients: ["egg", "spinach", "cheese"],
    steps: [
      "Beat the eggs in a bowl.",
      "Wilt spinach in a pan, push to one side.",
      "Pour in eggs, sprinkle cheese on top.",
      "Fold and cook until set."
    ]
  },
  {
    id: "r6",
    title: "Lemon garlic potatoes",
    time: 30,
    icon: "🥔",
    ingredients: ["potato", "garlic", "lemon"],
    steps: [
      "Chop potatoes into chunks and boil until just tender.",
      "Toss with minced garlic, lemon juice, and oil.",
      "Roast at 200°C for 20 minutes until golden."
    ]
  },
  {
    id: "r7",
    title: "Bean and tomato stew",
    time: 25,
    icon: "🍲",
    ingredients: ["beans", "tomato", "onion", "garlic"],
    steps: [
      "Sauté onion and garlic until soft.",
      "Add chopped tomato and simmer 5 minutes.",
      "Stir in beans and simmer 15 minutes.",
      "Season and serve warm."
    ]
  },
  {
    id: "r8",
    title: "Cheesy spinach rice",
    time: 22,
    icon: "🧀",
    ingredients: ["rice", "spinach", "cheese"],
    steps: [
      "Cook rice according to package instructions.",
      "Wilt spinach in a pan with a little oil.",
      "Stir cooked rice and spinach together.",
      "Mix in cheese until melted and creamy."
    ]
  }
];
let searchinput = document.querySelector("#recipe-search");
let selectedtray = document.querySelector("#selected-tray");
let ingredientfilter = document.querySelector("#ingredient-filter");
let btn = document.querySelectorAll(".chip");
let para = document.querySelector(".empty-hint");
let recipegrid = document.querySelector(".recipe-grid");
let clearbtn = document.querySelector("#clear-ingredients-btn");
let clicked;
let searched ;
let filters = document.querySelector("#sort-select");
let value = searchinput.value;

function cardcreater(recipe) {
  let article = document.createElement("article");
  article.className = "recipe-card";

  let icon = document.createElement("div");
  icon.className = "recipe-thumb";
  icon.innerText = recipe.icon;

  let body = document.createElement("div");
  body.className = "recipe-body";

  let title = document.createElement("h3");
  title.className = "recipe-title";
  title.innerText = recipe.title;

  let meta = document.createElement("p");
  meta.className = "recipe-meta";
  meta.innerText = "⏱ " + recipe.time + " min";

  let badge = document.createElement("span");
  badge.className = "match-badge";
  badge.innerText = recipe.ingredients.length + " ingredients";

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(badge);

  article.appendChild(icon);
  article.appendChild(body);

  return article; 
}


let result = searchinput.addEventListener("keydown" ,(event)=>{
    if(event.key == "Enter"){
      recipegrid.innerHTML = "";
      query = searchinput.value.trim().replace(/\s+/g, " ").toLowerCase();
      applyfilter(filters);

      
    }
})

function applyfilter(selectElement) {
  console.log(selectElement.value);
  if(selectElement.value){
      let query = searchinput.value.trim().replace(/\s+/g, " ").toLowerCase();
      for(let i = 0 ; i<recipes.length ; i++){
          let title = recipes[i].title.toLowerCase().replace(/\s+/g, " ");
          if (title.includes(query)){
                let card = cardcreater(recipes[i]);
                console.log(card)
                recipegrid.appendChild(card);
                  
                // break;
          }
      }
    }
  selectElement.addEventListener("change", (event) => {
    console.log(event.target.value);
    
    if(event.target.value === "time") {
      
      let arr = [];
      for(ingr of recipes){
        arr.push(ingr.time);
      }
      console.log(Math.min(...arr));
    }
    
    
  });
  
}



//ingredients list 
let ingredientresult = ingredientfilter.addEventListener("keydown" ,(event)=>{
    
        if(event.key == "Enter"){
            selected = ingredientfilter.value;
            let newbtn = document.createElement("button");
            newbtn.className = 'chip';
            newbtn.innerText = selected;
            selectedtray.appendChild(newbtn);
            if(selectedtray.contains(para)){
                selectedtray.removeChild(para);
            }
            ingredientfilter.value = "";
        }
    
    
})

for(let btns of btn){
    btns.onclick =function(event){
        clicked = event.target;
        const clone = clicked.cloneNode(true);
        if (selectedtray.childElementCount === 1) {
                para.style.setProperty('display','none');
            }
        clone.addEventListener("click", function () {
            clone.remove();
            if (selectedtray.childElementCount === 1) {
                para.style.setProperty('display','inline');
            }
            else{
                para.style.setProperty('display','none');
            }
        });
      selectedtray.appendChild(clone);
    };
}

clearbtn.addEventListener("click", () => {
    if (selectedtray.childElementCount >= 1) {
        while (selectedtray.firstChild) {
            selectedtray.removeChild(selectedtray.firstChild);
            console.log(selectedtray.childElementCount);
        }

        
    }
    if(selectedtray.childElementCount == 0){
            selectedtray.appendChild(para);
            para.style.setProperty('display','inline');
        }
    
});
