import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";


export default function Getstarted(){
let navigate = useNavigate();


function handleclick(){
navigate('/Details');

}





    return (
<>
<div className="container ">
<video autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover absolute top-0 left-0">

<source src="/GetstartedBG.mp4" type="video/mp4" ></source>

</video>
<div className="contentwrapper text-white flex items-center h-screen justify-center flex-col">


<div className="Logo flex z-1 items-center flex-col justify-center">
<img className="h-16" src="/logo.png.png"></img>

<div className="middle z-1">
<h2>NutriGenix</h2></div>
<br></br>
<p>"Start Living Better Today"</p>
<br></br>

<motion.button onClick={handleclick} className=" hover:bg-fuchsia-600 hover:scale-110 transition ease-out 2s cursor-pointer
bg-[#B975D9] w-30 gap-2 h-6 flex justify-center items-center rounded-xl"

> 
   

    Let's Begin
    </motion.button>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<p>"Eat smart • Move better • Live well"</p>
</div>
<footer className="foot z-1 text-[#D084F3]">
<p>Powered by AI,Inspired By You</p>

</footer>

</div>



</div>


</>

)


}