import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { generateMealPlan } from '/src/services/geminiservices.js';



export default function Generating(){

const lines = ["Analyzing height/weight...",
"Understanding your diet...",
"Designing your diet..."]



const [words,updatewords] = useState([]);

const [mealplan,setmealplan] = useState(null);



useEffect(()=>{
lines.forEach((elem,idx)=>{
    setTimeout(() => {
        updatewords((prev)=>[...prev,elem])
    }, idx*2000);
});


},[])

const navigate = useNavigate();

const location = useLocation();
const userdata = location.state;



useEffect(()=>{
async function fetchmealdata(){
try{
    console.log("API Key:", import.meta.env.VITE_GEMINI_API_KEY);
    const plan = await generateMealPlan(userdata);
    setmealplan(plan);

navigate("/Result",{state:{...userdata,meals: plan}})


}catch(error){
            console.error("Error:", error);
            alert("Failed to generate meal plan!");
}


}

fetchmealdata();

},[])




    return(
<>

<div className="min-h-screen flex flex-col bg-cover text-white"
style={{backgroundImage: "url('/GeneratingBG.gif')"}}

>         


<div className="icon flex items-center">
<img src="/logo.png.png" className="h-16"></img>
NutriGenx
</div>



<div className="centered flex flex-col flex-1 justify-center items-center">


<div className="flex  text-2xl flex-row gap-2" >
<p style={{animationDelay: "0.2s"}} className="animate-bounce">🥪</p>
<p style={{animationDelay: "0.4s"}} className="animate-bounce">🍲</p>
<p style={{animationDelay: "0.6s"}} className="animate-bounce">🥗</p>
<p style={{animationDelay: "0.8s"}} className="animate-bounce">🍛</p>
<p style={{animationDelay: "0.10s"}} className="animate-bounce">🍅</p>
</div>




{words.map((element,idx)=>(

 <p key={idx} style={{animation:"fall 0.6s ease-out"}}>{element}</p>

))}

</div>
</div>

<style>{
    ` @keyframes fall{
          0%{transform: 
            translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
}
    }`
    }
</style>


</>
)


}