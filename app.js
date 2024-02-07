Vue.createApp({
    data() {
        return {
            newRecipe: {
                name: "",
                ingredients: "",
                preparation: "",
                time: 0,
                people: 0,
            },
            recipes: JSON.parse(localStorage.getItem("recipes")) || [],
        };
    },
    methods: {
        addRecipe() {
            if (this.isValidRecipe(this.newRecipe)) {
                const recipe = { ...this.newRecipe, id: Date.now() };
                this.recipes.push(recipe);
                this.newRecipe = {
                    name: "",
                    ingredients: "",
                    preparation: "",
                    time: 0,
                    people: 0,
                };
                this.saveRecipes();
            } else {
                alert(
                    "Veuillez remplir tous les champs correctement avec des valeurs positives pour le temps et le nombre de personnes."
                );
            }
        },
        deleteRecipe(recipeId) {
            this.recipes = this.recipes.filter(
                (recipe) => recipe.id !== recipeId
            );
            this.saveRecipes();
        },
        saveRecipes() {
            localStorage.setItem("recipes", JSON.stringify(this.recipes));
        },
        isValidRecipe(recipe) {
            return (
                recipe.name &&
                recipe.ingredients &&
                recipe.preparation &&
                recipe.time > 0 &&
                recipe.people > 0
            );
        },
    },
    mounted() {
        window.addEventListener("beforeunload", this.saveRecipes);
    },
    beforeUnmount() {
        window.removeEventListener("beforeunload", this.saveRecipes);
    },
}).mount("#app");
