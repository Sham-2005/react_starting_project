import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import data from "./data.json"

function notify(val){
   if(val)return(
        <div className='notify'>
            <h3>{val}</h3>
            <div className="line"></div>
        </div>
    )
}
export const Button4=({val,...rest})=><button className="button4" {...rest}>{val}</button>;
export const Ecom=()=>{
    const [noty,setNoty]=useState("");
    const [sollu,setsollu]=useState("");
    const [cart,setcart]=useState([]);
    const [box,setBox]=useState(null);
    const [prod,setProd]=useState([]);
    const [load,setload]=useState(false);
    useEffect(()=>{
        if(!noty)return;
        let t;
        if(noty)t=setTimeout(()=>setNoty(""),6000);
        return ()=>clearTimeout(t);
    },[noty]);
    useEffect(()=>{
        if(load)localStorage.setItem("cart",JSON.stringify(cart));
    },[cart,load])
    useEffect(()=>{
            // fetch("https://fakestoreapi.com/products")
            // .then(r=>r.json())
            // .then(y=>setProd(y))
            // .catch(e=>alert(e));
            setProd(data);
            let c=localStorage.getItem("cart");
            if(c)setcart(JSON.parse(c));
            setload(true);
    },[]);
    const close=()=>setBox(null)
    function body(){
        if(sollu==="cart")return (<Cart/>);
        return (<Product/>)
    }
    function Box(){
        return (<center className='ebox'>
            <img src={prod[box].image} alt="net on pannu" style={{"width":"90%","height":"50%"}}/>
            <h2>{prod[box].title}</h2>
            <h4 style={{"height":"50px","overflowY":"auto"}}>{prod[box].description}</h4>
            <h3>{prod[box].price}</h3>
            <h3>{prod[box].category}</h3>
            <h4>{prod[box].rating.rate}</h4>
            <Button4 onClick={close} val="close"/>
            <Button4 val="Buy now"/>
        </center>)
    }
function Product(){
  return (
    <div>
        <div className="eprods">
            {prod.map((p,i)=>
            <center key={i} className='eprod'>
                <img src={p.image} alt="load agala" width={"275px"} height={"300px"}/>
                <h3>{p.title}</h3>
                <h3>{p.price}</h3>
                <div className="ebutt">
                    <Button4 val="Buy now" onClick={()=>setBox(i)}/>
                    {cart.includes(p.id) ?<Button4 val="Already on cart"/>:<Button4 val="Add to Cart" onClick={()=>{setcart(c=>[...c,p.id]);setNoty("product add to Cart")}}/>}
                </div>
            </center>)}
        </div>
        {box !==null && Box()}
    </div>
  )
}
function Cart(){
    if(cart.length!==0)
    return(
        <div className="eprods">
           {prod.filter(p=>cart.includes(p.id)).map((p,i)=><center key={i} className='eprod'>
                <img src={p.image} alt="load agala" width={"275px"} height={"300px"}/>
                <h3>{p.title}</h3>
                <h3>{p.price}</h3>
                <div>
                <Button4 val="Buy now" onClick={()=>setBox(i)}/>
                <Button4 val="Remove from Cart" onClick={()=>{setcart(c=>c.filter(v=>v!==p.id));setNoty("Product removed from cart")}}/>
                </div>
            </center> )}
            {box !==null && Box()}
        </div>)
    return (<h1>Cart la onnum ella</h1>)
}
return (
    <div>
        {noty && notify(noty)}
        <Button4 val="Product" onClick={()=>setsollu("product")}/>
        <div className="nav">
            <div className="cartno">{cart.length}</div>
            <Button4 val="Cart" onClick={()=>setsollu("cart")}/>
        </div>
        {body()}
    </div>
)
}