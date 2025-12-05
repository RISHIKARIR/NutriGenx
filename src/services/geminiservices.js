import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);



export async function generateMealPlan(userData){

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

const prompt = `Generate a indian personalized meal plan for:
- Name: ${userData.name}
- Age: ${userData.age}
- Weight: ${userData.weight}kg
- Height: ${userData.heightfeet}ft ${userData.heightinches}in
- Goal: ${userData.goal}
- Diet: ${userData.diet}


Provide exactly 4 Indian meals: Breakfast, Lunch, Snacks, and Dinner.
Each meal should have 2-3 food items with macros and also provide name of the macros before macros.
Add helpful nutritional tips for some meals when relevant.

The data should fit within 100px height

For each food item, provide these exact macros with their names:
- Calories (in kcal)
- Protein (in g)
- Fats (in g)
- Carbs (in g)
- Fiber (in g)
- Energy (in kcal)




Return ONLY valid JSON in this format:
[
  {
    "name": "Breakfast",
    "items": [
      {
        "item": "Oats porridge",
        "macros": {
        "Calories": "270 kcal",
        "Protein": "5g",
         "Fats": "3g",
         "Carbs":"4g",
         "Fiber":"7g",
          "Energy": "150 kcal"
          
        }
      }
    ],
    line:"High in fiber,Keep you full longer & control cravings"
  }
]`;


try{
const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();


const cleantext = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

const mealplan = JSON.parse(cleantext);

return mealplan;

} catch(error){
    console.log("Error generating meal plan:",error);
    throw error;

}








}


