import { useEffect, useState ,useRef} from 'react'
import './App.css'
import {MapContainer,TileLayer,Marker,Popup, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {Ecom,Button4} from './ecom';

function App() {
  const [body,setbody]=useState("");
  const bodyval=()=>{
    if(body==="clock")return (<Task1clock/>)
    if(body==="todo")return (<Task2todo/>)
    if(body==="weather")return (<Task3weather/>)
    if(body==="notes")return (<Task4notes/>)
    if(body==="movie")return (<Task5/>)
    return (<Ecom/>)
  }
return (
  <div>
  <Button4 onClick={()=>setbody("clock")} val="Clock"/>
  <Button4 onClick={()=>setbody("todo")} val="Todo"/>
  <Button4 onClick={()=>setbody("weather")} val="weather"/>
  <Button4 onClick={()=>setbody("notes")} val="notes"/>
  <Button4 onClick={()=>setbody("movie")} val="Movies List"/>
  <Button4 onClick={()=>setbody("ecom")} val="ecom"/>
  {bodyval()}
  </div>
)
}
export default App
function Task5(){
  const [list,setlist]=useState([]);
  const [name,setname]=useState("Master");
  useEffect(()=>{
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=30d1ced3&s=${name}`)
    .then(r=>r.json())
    .then(r=>setlist(r.Search))
    .catch(e=>alert(e));
  },[name]);
  return (
    <div>
      <input type="text" value={name} onChange={e=>setname(e.target.value)} />
      {list && list.map((p,i)=><div key={i}>
        <h2>{p.Title}</h2>
        <h3>{p.Year}</h3>
        <h3>{p.Type}</h3>
        <img src={p.Poster} alt="illa" />
      </div>)
    }</div>
  );
}
function Task1clock(){
  let [d,setd]=useState(new Date())
  let [f,setf]=useState(true)
 useEffect(()=>{
const t=setInterval(()=>setd(new Date()),1000);
  return ()=>clearInterval(t);
 },[]) 
 useEffect(()=>{
  document.documentElement.style.setProperty("--hours",d.getHours()%12);
  document.documentElement.style.setProperty("--min",d.getMinutes());
  document.documentElement.style.setProperty("--sec",d.getSeconds());
 },[d]);
  return (
    <div id="tbody">{
      f===true?d.toLocaleTimeString():d.toTimeString().split(" ")[0]}<br/>
    {d.toDateString()}<br/>
    <button id="tbutton" onClick={(e)=>{setf(!f);e.target.style.color=f?"green":"yellow"}}>{f===true?"24 Hours":"12 Hours"}</button>
    <div className="clock">
      <div className="sec"></div>
      <div className="min"></div>
      <div className="hours"></div>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
      <p>8</p>
      <p>9</p>
      <p>10</p>
      <p>11</p>
      <p>12</p>
    </div>
  </div>
  )
}
function Task2todo(){
 const [l,setl]=useState([]);
  const [d,setd]=useState("");
  const [s,sets]=useState("");
  const [load,setload]=useState(false);
  useEffect(()=>{
    let r=localStorage.getItem("item2");
    if(r)setl(JSON.parse(r));
    setload(true);
  },[]);
  useEffect(()=>{
    if(load)
      localStorage.setItem("item2",JSON.stringify(l))
  },[l,load]);
  console.log(l);
return (
  <div>
  <h2>This is an todo list</h2>
  <input type="text" value={d} onChange={e=>setd(e.target.value)}/>
  <button onClick={()=>{if(d=="")sets("Enter value"); else{setl([...l,d]);setd("");sets("");}}}>Add</button>
  <span>{s}</span>
  <br />
  {
    l.map((p,i)=>{
      return(
        <div id='item' key={i}>
        <input type="checkbox" />
        <h3>{p}</h3>
        <button onClick={()=>setl(l.filter((_,y)=>y!==i))}>x</button>
        </div>
      )
    })
  }
  </div>
)
}
function CenterMarker({onchange ,p,setp}){
 const map=useMapEvents({
    // move:()=>{
    //   let center=map.getCenter();
    //   onChange([center.lat,center.lng]);
    // },
    click(e){
      setp([e.latlng.lat,e.latlng.lng]);
    }
  });
  return null;
}
function Task3weather(){
  const [t,sett]=useState([]);
const [p,setp]=useState([0,0]);
const [w,setw]=useState();
const [loc,setloc]=useState();
//use this for by city name
//https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid=10a29492e9395f342f02a2da51a19159&units=metric

useEffect(()=>navigator.geolocation.getCurrentPosition(
  h=>{
    sett([h.coords.latitude,h.coords.longitude]);
  setp([h.coords.latitude,h.coords.longitude]);
  setw([h.coords.latitude,h.coords.longitude]);
},
  e=>alert("location acsess denied",e),
   {
          enableHighAccuracy: true
   }
),[]);
useEffect(()=>{
  if(w)
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${w[0]}&lon=${w[1]}&appid=10a29492e9395f342f02a2da51a19159&units=metric`)
  .then(k=>k.json())
  .then(k=>setloc(k))
  .catch(e=>alert(e));
},[w]);
 return (<>{
t.length !=0 &&<MapContainer center={t} zoom={10} style={{ height: "500px", width: "700px" }}>
  {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
  {/* <TileLayer  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2t5dHJhY2tyIiwiYSI6ImNtaGMyeHJnODBhYWgyanNheXF0am5sbmoifQ.ZwI8EqRTrjMz2MjelzQhgQ`} tileSize={512} zoomOffset={-1} /> */}
  {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"/> */}
  {/* <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/> */}
  <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2t5dHJhY2tyIiwiYSI6ImNtaGMyeHJnODBhYWgyanNheXF0am5sbmoifQ.ZwI8EqRTrjMz2MjelzQhgQ`} tileSize={512} zoomOffset={-1}/>
  <Marker position={p} />
  <CenterMarker p={p} setp={setp}/>
  {/* <CenterMarker onchange={h=>setp(h)}/> */}
</MapContainer>
 }
  <button onClick={()=>setw(p)}>Drop Here</button>
  <button onClick={()=>setw(t)}>Use My Location</button>
  {loc && <div>
    <h2>City : {loc.name}</h2>
    <h3>Humidity : {loc.main.humidity}%</h3> 
    <h3>Weather : {loc.weather[0].description}</h3>
    <h3>Temprature : {loc.main.temp} °C</h3> 
    <h3>Deg : {loc.wind.deg}</h3>
    <h3>Wind Speed : {loc.wind.speed} m/s</h3>
  </div>}
 </>)
}
function Task4notes(){
  const [t,sett]=useState("");
  const [c,setc]=useState("");
  const [st,setst]=useState("");
  const [sc,setsc]=useState("");
  const [list,setlist]=useState([]);
  const [load,setload]=useState(false);
  const [box,setbox]=useState(false);
  const [cli,setcli]=useState("");
  const [edit,setedit]=useState(null);
  const tref=useRef(null);
  const cref=useRef(null);
  const [sollu,setsollu]=useState("save");
  useEffect(()=>{
    if(box && tref.current)tref.current.focus();
  },[box]);
  const tk=(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      if(cref.current)cref.current.focus();
    }
  }
  const ck=(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      test();
    }
  }
  let test=()=>{
    let s=true;
    if(t==""){setst("tittle enter pannu");s=false;}
    else if(t!="")setst("");
    if(c==""){setsc("content enter pannu");s=false;}
    else if(c!="")setsc("");
    if(!s)return;
    let q=new Date();
    q=q.toLocaleDateString()+" "+q.toLocaleTimeString();
    if(edit!==null){
      setlist(list.map((p,m)=>m===edit?{t,c,q}:p));
      setedit(null);
    }
    else setlist([...list,{t,c,q}]);
    close();
  }
  let edit2=(y,u,i)=>{
     sett(y);
    setc(u);
    setcli("Save");
    setedit(i);
    setsollu("save");
    setbox(true);
  }
  useEffect(()=>{
    let r=localStorage.getItem("item");
    if(r)setlist(JSON.parse(r));
    setload(true);
  },[]);
  useEffect(()=>{
    if(load)localStorage.setItem("item",JSON.stringify(list));
  },[load,list]);
  let close=()=>{
    setbox(false);
    sett("");
    setc("");
    setcli("");
  }
  const rem=()=>{
    if(sollu==="save")return(<center className="box" onClick={e=>e.stopPropagation()}>
                            <h2>Title</h2>
                            <input id='input4' type="text" onKeyDown={tk} ref={tref} value={t} onChange={e=>sett(e.target.value)}/>
                            <span>{st}</span>
                            <h2>Content</h2>
                            <input id='input4' type='text' onKeyDown={ck} ref={cref} value={c} onChange={e=>setc(e.target.value)}/>
                            <span>{sc}</span><br/>
                            <Button4 id="cancel4" val="cancel" onClick={close}/>
                            <Button4 id="Add4" val={cli===""?"ADD":cli} onClick={test}/>
                      </center>);
    else if(sollu==="Clear")return(<center className="box" onClick={e=>e.stopPropagation()}>
                              <h2>Do you want to remove All</h2>
                              <Button4 id="cancel4" val="Cancel" onClick={close}/>
                              <Button4 id="delet4" val="Yes" onClick={()=>{setlist([]);close()}}/>
                            </center>)
    else return (<center className="box" onClick={e=>e.stopPropagation()}>
                                <h2>Do you want to delete this</h2>
                                <Button4 id="cancel4" val="Cancel" onClick={close}/>
                                <Button4 id="delet4" val="Delete" onClick={()=>{setlist(list.filter((p,o)=>sollu!==o));close()}}/>
                              </center>)
  }
  let rc=()=>`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.random().toFixed(2)})`;
  return (
  <div>
    <h2>This is an notes app add a values using add button</h2>
    {box && <div className="box4" onClick={close}>{rem()}</div>}
    <br />
    <div className="top4">
      <Button4 val="Add" onClick={()=>{setbox(true);setsollu("save")}} id='add4'/>
      <Button4 val="ClearAll" onClick={()=>{setbox(true);setsollu("Clear")}} id="clear4"/>
     </div>
     <br />
     <div className="note4">
  {list.map((p,i)=><div className='listbox' key={i} onClick={()=>edit2(p.t,p.c,i)} style={{backgroundColor:rc()}}>
    <p id="time4" onClick={e=>e.stopPropagation()}>{p.q}</p>
    <h3 id='t4'>{p.t}</h3>
    <p id='c4'>{p.c}</p>
    <div className="side4">
    <Button4 val="Edit" id='edit4'/>
    <Button4 val="Delete" id="delete4" onClick={(e)=>{setbox(true);e.stopPropagation();setsollu(i)}}/></div>
    </div>)}</div>
  </div>)
}