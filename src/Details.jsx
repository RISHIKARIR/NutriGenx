import { useState } from "react"
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";




export default function Details(){
const [formdata,formfunc] = useState({name:"",age:"",gender:""
    ,weight:"",heightfeet:"",heightinches:"",goal:"",diet:""
})
const min= 1;
const max = 99;


function feethandle(e,type){
  const {name,value} = e.target;
const reg = /^[0-9]*$/;

if(!reg.test(value))return;

  const numm = parseInt(value);


if(type === "heightfeet"){
if(numm<0 || numm > 10)return;
}



if( type === "heightinches"){
  if(numm<-1 || numm >12)return;
}



  formfunc((prev)=>({...prev,[name]:value}))



}


function handlechange(e,type){
const {name,value} = e.target;

const regex =/^[0-9]*$/; 
if(type=="age" || type =="heightfeet"|| type =="heightinches"|| type== "weight"){
if(value === "" && regex.test(value)){
  formfunc((prev)=>({...prev,[name]:value}))
}

const numval = parseInt(value);



  if (numval < min || numval > max){
    return;
  }

}


formfunc((prev)=>({...prev,[name]:value}))

}




function selected(e){

const tempgoal = e.target.textContent;
  formfunc((prev)=>({...prev, goal: prev.goal === tempgoal ? "":tempgoal}));

}

 function Dietgoal(e){

const tempdiet = e.target.textContent;
formfunc((prev)=>({...prev,diet: prev.diet === tempdiet ? "" : tempdiet }));

 }

const navigate = useNavigate();
 

function submitform(e){
  e.preventDefault();
  navigate("/Generate", {state : formdata});
}




return(
<>

<style>{`
        select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a855f7' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 14px;
          padding-right: 40px;
          transition: all 0.3s ease;
        }

        select:hover {
          border-color: #a855f7;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
        }

        

        select option {
          background: #1f2937;
          color: white;
          padding: 12px;
          font-weight: 500;
        }

        select option:hover {
          background: #374151;
        }

       
      `}</style>

  

<div className="min-h-screen bg-cover bg-center"
style={{backgroundImage: "url('/DetailsBg.jpeg')",
    
}}>

<div className="head text-white flex items-center justify-center flex-col">  
<h1 className="font-medium mt-4 font-extrabold text-2xl">Tell Us About You</h1>
<p className="text-xs font-semibold text-center mt-2">"We'll personalize your diet plan based on these details"</p>
</div>

<div className="flex justify-center mt-4" >
<form onSubmit={submitform}>
<div className="rounded-3xl border-1 border-transparent bg-gradient-to-r from-white to-purple-500 p-[2px]">
  <div className="rounded-3xl bg-gray-800 px-4 py-2">
    <label className="text-white text-sm flex"><FaUser/>Name</label>
    <input type="text" className="w-full text-white outline-none mt-1"
    placeholder="Enter Your Name"
    name = "name"
    value={formdata.name}
    onChange={handlechange}
    required
    />
  </div>
</div>


<div className="rounded-3xl mt-4 border-1 border-transparent bg-gradient-to-r from-white to-purple-500 p-[2px]">
  <div className="rounded-3xl bg-gray-800 px-4 py-2">
    <label className="text-white text-sm flex">📅 Age</label>
    <input type="number" className="w-full text-white outline-none mt-1 [appearance:textfield]
    [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none"
    placeholder="Enter Your Age"
    name = "age"
    value={formdata.age}
    required
    onChange={(e)=>handlechange(e,"age")}
    />
  </div>
</div>



<div className="rounded-3xl mt-4 border-1 border-transparent bg-gradient-to-r from-white to-purple-500 p-[2px]">
  <div className="rounded-3xl bg-gray-800 px-4 py-2">
    <label className="text-white text-sm flex">⚤Gender</label>
    <select name="gender" className="w-full text-white outline-none mt-1 rounded-3xl"
    value={formdata.gender}
    required
    onChange={handlechange}
>

<option value={""}>Select</option>
<option value={"Male"}>Male ♂️</option>
<option value={"Female"}>Female♀️</option>
<option value={"Other"}>Other⚧️</option>

</select>

  </div>
  
</div>





<div className="rounded-3xl mt-4 border-1 border-transparent bg-gradient-to-r from-white to-purple-500 p-[2px]">
  <div className="rounded-3xl bg-gray-800 px-4  py-2">
    <label className="text-white text-sm flex ">📏Height</label>

    <div className="flex ml-2 gap-2 ">
    <input type="number" className="w-10   text-white outline-white mt-1  [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none"
    placeholder="FT"
    name="heightfeet"
    value={formdata.heightfeet}
    required
    onChange={(e)=>{feethandle(e,"heightfeet")}}
    /> 
        <input type="number" className="w-10 text-white outline-white mt-1  [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none"
    placeholder="IN"
    name="heightinches"
    value={formdata.heightinches}
    required
    onChange={(e)=>{feethandle(e,"heightinches")}}
/>

</div>
  </div>
</div>


<div className="rounded-3xl mt-4 border-1 border-transparent bg-gradient-to-r from-white to-purple-500 p-[2px]">
  <div className="rounded-3xl bg-gray-800 px-4 py-2">
    <label className="text-white text-sm flex">⏲️ Weight (in Kg)</label>
    <input type="number" className="w-full text-white outline-none mt-1 [appearance:textfield]
    [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none"
    placeholder="Enter Your weight"
    name = "weight"
    value={formdata.weight}
    required
    onChange={(e)=>handlechange(e,"weight")}
    />
  </div>
</div>

 

<div className="rounded-3xl mt-4 border-1 border-transparent bg-gradient-to-r from-white to-purple-500 p-[2px]">
  
  <div className="rounded-3xl  bg-gray-800 px-6 py-3">
    <p className="text-white text-sm flex">🎯Goals</p>
    <div className="flex mt-2 text-center items-start gap-2">
    <button type="button" onClick={selected} name="goal" className={`cursor-pointer text-white text-xs px-3 py-0.5 rounded-full ${formdata.goal === "Weight Loss" ? "bg-purple-700 rounded-full":"bg-purple-500 rounded-full"  }`}>Weight Loss</button>
      <button type="button" onClick={selected} name="goal" className={`cursor-pointer text-white text-xs px-3 py-0.5 rounded-full ${formdata.goal === "Muscle Building" ? "bg-purple-700 rounded-full":"bg-purple-500 rounded-full"  }`}>Muscle Building</button>
  </div>

<div className="flex gap-2 mt-2">
    <button type="button" onClick={selected} name="goal" className={`cursor-pointer text-white text-xs px-3 py-0.5 rounded-full ${formdata.goal === "Maintain Weight" ? "bg-purple-700 rounded-full":"bg-purple-500 rounded-full"  }`}>Maintain Weight</button>
    <button type="button" onClick={selected} name="goal" className={`cursor-pointer text-white text-xs px-3 py-0.5 rounded-full ${formdata.goal === "Weight Gain" ? "bg-purple-700 rounded-full":"bg-purple-500 rounded-full"  }`}>Weight Gain</button>
 </div>
    <button type="button" onClick={selected} name="goal" className={`cursor-pointer text-white text-xs px-3 py-0.5 rounded-full ${formdata.goal === "General Wellness" ? "bg-purple-700 rounded-full":"bg-purple-500 rounded-full"  }`}>General Wellness</button>


  </div>
</div>



<div className="rounded-3xl mt-2 border-1 border-transparent bg-gradient-to-r from-white to-purple-500 p-[2px]">
  <div className="rounded-3xl bg-gray-800 px-4 py-2">
    <label className="text-white text-sm flex">🍽️ Diet</label>
    
    <div className="flex gap-2 mt-2">
   <button type="button" onClick={Dietgoal} name="diet" className={`cursor-pointer text-white text-xs px-3 py-0.5 rounded-full ${formdata.diet === "Vegetarian" ? "bg-purple-700 rounded-full":"bg-purple-500 rounded-full"  }`}>Vegetarian</button>
 <button type="button" onClick={Dietgoal} name="diet" className={`cursor-pointer text-white text-xs px-3 py-0.5 rounded-full ${formdata.diet === "Non Vegetarian" ? "bg-purple-700 rounded-full":"bg-purple-500 rounded-full"  }`}>Non Vegetarian</button>
</div>

    
  </div>
</div>


<div className=" mt-6 justify-self-center">

<button type="submit"  className = "py-1 text-base rounded-full outline-2 cursor-pointer outline-solid outline-white text-white font-medium px-6 bg-purple-500 ">Generate</button>

</div>


</form>
</div>




</div>
</>
)


}
