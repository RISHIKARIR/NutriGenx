import { useLocation } from "react-router-dom"
import { useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { generateMealPlan } from "./services/geminiservices";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";




// console.log(import.meta.env.VITE_GEMINI_API_KEY);

export default function Results(){


const location = useLocation();
    const userdata = location.state;




const goals = {
    Weightloss:`Diet:Low-calorie , High-fiber [${userdata.diet}]`,
    Weightgain: `Diet:High-calorie , Nutrient-dense [${userdata.diet}]`,
    Musclegain:`Diet:High-protein , Moderate-carb [${userdata.diet}]`,
    Maintainweight:`Diet:-Balanced nutrition, Portion-controlled [${userdata.diet}]`,
    Generalwellness:`Diet:-Wholesome , Well-balanced [${userdata.diet}]`
};


const generatePdf = ()=>{
  try{
  const doc = new jsPDF();

  //Header of the pdf
  doc.setFontSize(20);



  try{
  const logo = "/logo.png.png";
  doc.addImage(logo,"PNG",35,12,15,15);
  }catch(err){
    console.log("Logo error",err);
  }



  doc.setFontSize(18);
  doc.text("Nutrigenx Personalised Meal Plan",50,23);




  doc.setFontSize(12);
  doc.text(`Name : ${userdata.name}`,20,30);
  doc.text(`Goal : ${userdata.goal}`,20,36);


  let y = 50;

  meals.forEach(meal => {
    doc.setFontSize(16);
    doc.text(meal.name,20,y);
    y = y+8;


  const rows = meal.items.map(food =>[
    food.item,
    food.macros.Calories,
    food.macros.Protein,
    food.macros.Fats,
    food.macros.Carbs,
    food.macros.Fiber,
    food.macros.Energy
]);




  autoTable(doc,{
    startY: y,
    head: [["Food","Calories","Protein","Fats","Carbs","Fiber","Energy"]],
    body: rows,
    theme:"grid",
    styles: {fontSize:10,cellPadding:2},
    headStyles:{fillColor:[100,0,150]}
});


  y = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(10);
    doc.text(meal.line,20,y);
    y = y+15;

});


  doc.save("NutriGenx-plan.pdf");
}catch(error){


  console.error("PDF generation error:", error);
    alert(`Failed to generate PDF: ${error.message}`);
}
}

useEffect(()=>{
AOS.init({
     duration: 800,  
        once: false,  
        offset: 100    

})

},[])



const [generating,setisgenerating] = useState(false);
const [showsuccess,setisshowsuccess] = useState(false);


 
  const aimeal = userdata?.meals || [];

const [meals,updatemeals] = useState(aimeal);


const handlegenerate = async ()=>{
setisgenerating(true);


try{
  const newplan = await generateMealPlan(userdata);

  updatemeals(newplan);



setisgenerating(false);
setisshowsuccess(true);


setTimeout(()=>{
  AOS.refresh();
  });

setTimeout(() => setisshowsuccess(false),1500);
}catch(error){
  console.log("Failed to regenerate",error);
  alert("Failed to regenerate meal plan");
  setisgenerating(false);
}

}


 


return(
<>
<div className=" md:min-h-screen  text-white bg-black">

<div className="flex md:justify-self-center items-center font-semibold">
    <div className="flex items-center mt-6">
<img src="/logo.png.png" className="h-16 ">
</img>
NutriGenx
</div>
</div>
<div className=" md:justify-self-center  ml-4 mt-2 username flex gap-2">


<p className="font-semibold text-base">Hey , </p> <p className="bg-gradient-to-r from-white to-purple-500 bg-clip-text text-transparent font-bold text-lg">{userdata.name}</p>

</div>
<div className="ml-4 md:justify-self-center mt-2">
  
  <p>Here's your personalized nutrition <span className="bg-gradient-to-r from-white to-purple-500 bg-clip-text text-transparent font-bold text-base">{userdata.goal} </span> plan !</p>
   
<p></p>

</div>
 

<p className="justify-self-center text-stone-400 mt-4">
    {userdata.goal == "Weight Loss"? goals.Weightloss :
    userdata.goal == "Muscle Building"? goals.Musclegain :
    userdata.goal == "Maintain Weight"? goals.Maintainweight :
    userdata.goal == "Weight Gain"? goals.Weightgain:
     goals.Generalwellness}</p>
    



<div className="mt-2 ml-2">

   <div id="cards" className="items-center justify-center  gap-4 flex flex-wrap">
        {meals.map((meal,idx)=>(
    <div key={idx}
      data-aos="fade-up"
        data-aos-delay={idx * 100}  
      className="flex flex-wrap border px-5 py-2 w-45   min-h-100 flex-col justify-self-center rounded-xl mt-5 bg-gradient-to-br from-violet-800 to-purple-400">
        
        <p className="font-extrabold  text-sm mt-2 ml-2">{meal.name}</p>
      {meal.items.map((food,index)=>(   
              <div key={index}>
                <p className="text-xs font-bold ml-2"> ➤{food.item}</p>
    <div className="flex text-xs scale-70  gap-2 justify-evenly">
       


        <div className="flex gap-1 flex-col items-start">
     <span>Calories: {food.macros.Calories}</span>
    <span>Protein: {food.macros.Protein}</span>
    <span>Fats: {food.macros.Fats}</span>

    </div>

      <div className="flex gap-1 flex-col items-start">
        <span>Carbs: {food.macros.Carbs}</span>
     <span>Fiber: {food.macros.Fiber}</span>
     <span>Energy: {food.macros.Energy}</span>
     
     </div>

    
     </div>



     </div>
     ))}

     <span className="text-xs scale-70 ">{meal.line}</span>
     </div>
    


))}





    </div>
  







</div>

<div className="footer mt-5 flex gap-2 items-center flex-col ">

<button  onClick={handlegenerate} disabled = {generating} className={`text-white font-medium text-sm  bg-purple-500 cursor-pointer px-2 py-1 rounded-full items-center gap-2 flex flex-1 ${showsuccess ? 'bg-green-500': generating ? 'bg-purple-600 animate-pulse':'bg-purple-500 hover:bg-purple-600'}`}> {generating? '⏳ Generating...': showsuccess?' ✓ Done!': ( <>  <IoReloadOutline/> Regenerate</>)}</button>
<button onClick={generatePdf} className=" cursor-pointer text-black font-medium text-sm flex items-center gap-2 rounded-full bg-white px-2 py-1">Download<FaCloudDownloadAlt/></button>

</div>

</div>


</>

)



}
