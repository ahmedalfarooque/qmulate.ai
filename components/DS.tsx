"use client";
/**
 * QMULATE Design System — Shared Components
 * All reusable UI primitives live here.
 */
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { StrataMark } from "./StrataMark";

/* ─────────────── Animation Presets ─────────────── */
export const FU = (delay=0, distance=28) => ({
  initial:{opacity:0,y:distance},
  whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:"-80px"},
  transition:{duration:.85,delay,ease:[.25,.46,.45,.94] as [number,number,number,number]},
});
export const FI = (delay=0) => ({
  initial:{opacity:0},
  whileInView:{opacity:1},
  viewport:{once:true,margin:"-60px"},
  transition:{duration:.7,delay},
});
export const FS = (delay=0) => ({
  initial:{opacity:0,scale:.92},
  whileInView:{opacity:1,scale:1},
  viewport:{once:true,margin:"-60px"},
  transition:{duration:.9,delay,ease:[.25,.46,.45,.94] as [number,number,number,number]},
});
export const FL = (delay=0) => ({
  initial:{opacity:0,x:-32},
  whileInView:{opacity:1,x:0},
  viewport:{once:true,margin:"-60px"},
  transition:{duration:.85,delay,ease:[.25,.46,.45,.94] as [number,number,number,number]},
});

/* ─────────────── Animated Counter ─────────────── */
export function Counter({
  to, prefix="", suffix="", decimals=0, duration=2.2, className="",
}:{to:number;prefix?:string;suffix?:string;decimals?:number;duration?:number;className?:string}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once:true, margin:"-100px"});

  useEffect(()=>{
    if (!inView) return;
    const steps = 60 * duration;
    const step = to / steps;
    let current = 0;
    const timer = setInterval(()=>{
      current = Math.min(current + step, to);
      setValue(current);
      if (current >= to) clearInterval(timer);
    }, 1000/60);
    return ()=>clearInterval(timer);
  },[inView, to, duration]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
  return <span ref={ref} className={className}>{prefix}{display}{suffix}</span>;
}

/* ─────────────── Section Heading ─────────────── */
export function SectionHeading({
  eyebrow, title, subtitle, center=false, light=false, className="",
}:{eyebrow?:string;title:React.ReactNode;subtitle?:string;center?:boolean;light?:boolean;className?:string}) {
  return (
    <div className={className} style={{textAlign:center?"center":"left",maxWidth:center?680:720}}>
      {eyebrow && (
        <motion.div {...FI(0)} style={{marginBottom:16}}>
          <span className="pill pill-c">
            <span className="dot-live"/>
            {eyebrow}
          </span>
        </motion.div>
      )}
      <motion.h2 {...FU(0.05)} className={`t-h2 ${light?"gt-ghost":"gt-w"}`} style={{marginBottom:subtitle?16:0}}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p {...FU(0.12)} className="t-lg" style={{color:"#64748B",marginTop:16,lineHeight:1.75}}>
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ─────────────── Glass Card ─────────────── */
export function GlassCard({
  children, className="", style={}, hover=true, onClick,
}:{children:React.ReactNode;className?:string;style?:React.CSSProperties;hover?:boolean;onClick?:()=>void}) {
  return (
    <motion.div
      className={`gc noise ${className}`}
      style={style}
      whileHover={hover?{y:-6,scale:1.008}:undefined}
      transition={{type:"spring",stiffness:300,damping:20}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────── Metric Card ─────────────── */
export function MetricCard({
  value, label, sub, prefix="", suffix="", accent="#00D4FF",
}:{value:number;label:string;sub?:string;prefix?:string;suffix?:string;accent?:string}) {
  return (
    <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center"}}>
      <div style={{
        fontSize:"clamp(36px,4.5vw,64px)",fontWeight:900,letterSpacing:"-0.04em",
        color:accent,filter:`drop-shadow(0 0 24px ${accent}66)`,
        fontVariantNumeric:"tabular-nums",lineHeight:1,marginBottom:8,
      }}>
        <Counter to={value} prefix={prefix} suffix={suffix}/>
      </div>
      <div className="t-sm" style={{color:"#94A3B8",fontWeight:500,marginBottom:sub?4:0}}>{label}</div>
      {sub && <div className="t-xs" style={{color:"#475569"}}>{sub}</div>}
    </GlassCard>
  );
}

/* ─────────────── Feature Card ─────────────── */
export function FeatureCard({
  icon, title, desc, accent="#00D4FF", index=0,
}:{icon:string;title:string;desc:string;accent?:string;index?:number}) {
  return (
    <motion.div {...FU(index*0.08)}>
      <GlassCard style={{padding:"clamp(24px,3vw,36px)",height:"100%"}}>
        <div style={{
          width:52,height:52,borderRadius:14,marginBottom:20,
          background:`${accent}14`,border:`1px solid ${accent}30`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:24,animation:`float-y ${4+index}s ease-in-out infinite`,
        }}>{icon}</div>
        <h3 className="t-h4" style={{marginBottom:10,color:"#F1F5F9"}}>{title}</h3>
        <p className="t-sm" style={{color:"#64748B",lineHeight:1.72}}>{desc}</p>
      </GlassCard>
    </motion.div>
  );
}

/* ─────────────── Floating Orbs Background ─────────────── */
export function OrbBg({cyan=true, violet=true, blue=false, warm=false}:{
  cyan?:boolean;violet?:boolean;blue?:boolean;warm?:boolean
}) {
  return (
    <div className="bg-mesh" style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"}}>
      <div className="bg-aurora"/>
      {cyan && <div className="orb orb-c" style={{width:700,height:700,top:"-10%",left:"-5%",animation:"float-y 22s ease-in-out infinite"}}/>}
      {violet && <div className="orb orb-v" style={{width:600,height:600,bottom:"-15%",right:"-8%",animation:"float-y 28s ease-in-out 8s infinite"}}/>}
      {blue && <div className="orb orb-b" style={{width:500,height:500,top:"40%",left:"45%",animation:"float-y 18s ease-in-out 4s infinite"}}/>}
      {warm && <div className="orb orb-g" style={{width:400,height:400,top:"20%",right:"20%",animation:"float-y 24s ease-in-out 6s infinite"}}/>}
    </div>
  );
}

/* ─────────────── Iridescent Blob ─────────────── */
export function IrisBlob({size=400, top, left, right, bottom, delay=0, morph="blob-morph", opacity=0.55}:{
  size?:number;top?:string;left?:string;right?:string;bottom?:string;delay?:number;morph?:string;opacity?:number
}) {
  return (
    <div style={{
      position:"absolute",width:size,height:size,borderRadius:"50%",
      top:top||"auto",left:left||"auto",right:right||"auto",bottom:bottom||"auto",
      pointerEvents:"none",zIndex:0,
    }}>
      <div className={`blob blob-iris ${morph}`} style={{
        width:"100%",height:"100%",borderRadius:"50%",opacity,
        filter:"blur(2px) saturate(180%)",animationDelay:`${delay}s`,
      }}/>
    </div>
  );
}

/* ─────────────── Gold Blob ─────────────── */
export function GoldBlobComp({size=300, top, left, right, bottom, delay=0}:{
  size?:number;top?:string;left?:string;right?:string;bottom?:string;delay?:number
}) {
  return (
    <div style={{
      position:"absolute",width:size,height:size,borderRadius:"50%",
      top:top||"auto",left:left||"auto",right:right||"auto",bottom:bottom||"auto",
      pointerEvents:"none",zIndex:0,
    }}>
      <div className={`blob blob-gold blob-morph-b`} style={{
        width:"100%",height:"100%",borderRadius:"50%",opacity:0.5,
        filter:"blur(60px) saturate(160%)",animationDelay:`${delay}s`,
      }}/>
    </div>
  );
}

/* ─────────────── Floating Bubbles ─────────────── */
export function Bubbles() {
  const sizes = [220,160,110,280,80,140,190];
  const positions = [
    {top:"8%",left:"5%"},{top:"70%",left:"2%"},{top:"18%",left:"85%"},
    {top:"75%",left:"80%"},{top:"45%",left:"92%"},{top:"35%",left:"8%"},{top:"55%",left:"50%"},
  ];
  const classes = ["bubble-a","bubble-b","bubble-c","bubble-d","bubble-a","bubble-b","bubble-c"];
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
      {sizes.map((s,i)=>(
        <div key={i} className={`bubble ${classes[i]}`} style={{
          width:s,height:s,...positions[i],opacity:.45+i*.04,
        }}/>
      ))}
    </div>
  );
}

/* ─────────────── Ripple Sphere ─────────────── */
export function RippleSphere({size=160, style={}}:{size?:number;style?:React.CSSProperties}) {
  return (
    <div style={{position:"relative",width:size,height:size,...style}}>
      {[1,2,3].map(i=>(
        <div key={i} className="ripple-ring" style={{
          width:size*(0.9+i*.5),height:size*(0.9+i*.5),
          borderColor:`rgba(0,212,255,${.4-.12*i})`,
          boxShadow:`0 0 ${8+i*6}px rgba(0,212,255,${.25-.07*i})`,
        }}/>
      ))}
      <div className="sphere" style={{
        position:"absolute",inset:0,zIndex:2,
        background:"radial-gradient(circle at 35% 30%,rgba(200,240,255,.4),transparent 55%),radial-gradient(circle,#6EE7FF,#4D8DFF,#0040FF)",
      }}/>
    </div>
  );
}

/* ─────────────── Mouse Glow ─────────────── */
export function MouseGlow() {
  const [pos, setPos] = useState({x:-500, y:-500});
  useEffect(()=>{
    const fn = (e:MouseEvent) => setPos({x:e.clientX, y:e.clientY});
    window.addEventListener("mousemove",fn,{passive:true});
    return ()=>window.removeEventListener("mousemove",fn);
  },[]);
  return (
    <div style={{
      position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9990,
      width:400,height:400,borderRadius:"50%",
      background:"radial-gradient(circle,rgba(0,212,255,.055) 0%,transparent 70%)",
      transform:`translate(${pos.x-200}px,${pos.y-200}px)`,
      transition:"transform .12s ease-out",filter:"blur(20px)",
    }}/>
  );
}

/* ─────────────── Section Reveal Wrapper ─────────────── */
export function Reveal({
  children, delay=0, direction="up",
}:{children:React.ReactNode;delay?:number;direction?:"up"|"left"|"right"|"scale"}) {
  const map = {
    up: {initial:{opacity:0,y:28},animate:{opacity:1,y:0}},
    left: {initial:{opacity:0,x:-28},animate:{opacity:1,x:0}},
    right: {initial:{opacity:0,x:28},animate:{opacity:1,x:0}},
    scale: {initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1}},
  };
  return (
    <motion.div
      {...FU(delay)}
      initial={map[direction].initial}
      whileInView={map[direction].animate}
    >{children}</motion.div>
  );
}

/* ─────────────── Glow Button ─────────────── */
export function GlowButton({
  children, href, variant="primary", className="", onClick, style={},
}:{children:React.ReactNode;href?:string;variant?:"primary"|"ghost"|"violet";className?:string;onClick?:()=>void;style?:React.CSSProperties}) {
  const cls = `btn btn-${variant} ${className}`;
  if (href) return <Link href={href} className={cls} style={style}>{children}</Link>;
  return <button className={cls} style={style} onClick={onClick}>{children}</button>;
}

/* ─────────────── Parallax wrapper ─────────────── */
export function Parallax({children, speed=0.3}:{children:React.ReactNode;speed?:number}) {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({target:ref, offset:["start end","end start"]});
  const y = useTransform(scrollYProgress,[0,1],["-10%","10%"]);
  return (
    <motion.div ref={ref} style={{y,willChange:"transform"}}>
      {children}
    </motion.div>
  );
}

/* ─────────────── Staggered List ─────────────── */
export function StaggerList({
  children, delay=0, stagger=0.08, className="",
}:{children:React.ReactNode[];delay?:number;stagger?:number;className?:string}) {
  return (
    <div className={className}>
      {children.map((child, i)=>(
        <motion.div key={i} {...FU(delay + i*stagger)}>
          {child}
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────── Hero Glass Panel ─────────────── */
export function HeroGlass({children, style={}}:{children:React.ReactNode;style?:React.CSSProperties}) {
  return (
    <motion.div
      initial={{opacity:0,scale:.82,filter:"blur(8px)"}}
      animate={{opacity:1,scale:1,filter:"blur(0px)"}}
      transition={{duration:1.1,ease:[.34,1.08,.64,1]}}
      className="gf noise"
      style={{position:"relative",overflow:"hidden",...style}}
    >
      {/* Shimmer top border */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,
        background:"linear-gradient(90deg,transparent 5%,rgba(255,255,255,.28) 35%,rgba(0,212,255,.35) 65%,transparent 95%)",zIndex:10}}/>
      {/* Scan line */}
      <div className="scan-line"/>
      {/* Inner light streak */}
      <div style={{position:"absolute",top:"-20%",left:"-10%",width:"40%",height:"180%",
        background:"linear-gradient(135deg,rgba(77,141,255,.08),transparent 80%)",
        transform:"rotate(-15deg)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"relative",zIndex:5}}>{children}</div>
    </motion.div>
  );
}

/* ─────────────── Floating Badge ─────────────── */
export function FloatingBadge({
  children, accent="#00D4FF", top, right, left, bottom, delay=0, rotate=0,
}:{children:React.ReactNode;accent?:string;top?:string;right?:string;left?:string;bottom?:string;delay?:number;rotate?:number}) {
  return (
    <motion.div
      initial={{opacity:0,scale:.7,y:20}}
      animate={{opacity:1,scale:1,y:0}}
      transition={{duration:.9,delay,ease:[.34,1.56,.64,1]}}
      style={{
        position:"absolute",top,right,left,bottom,
        background:"rgba(6,11,20,.88)",
        backdropFilter:"blur(32px)",WebkitBackdropFilter:"blur(32px)",
        border:`1px solid ${accent}44`,
        borderRadius:16,padding:"12px 16px",
        boxShadow:`0 8px 32px rgba(0,0,0,.5),0 0 20px ${accent}22`,
        animation:`float-y ${5+delay}s ease-in-out infinite`,
        transform:`rotate(${rotate}deg)`,zIndex:10,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────── Section Divider ─────────────── */
export function Divider({style={}}:{style?:React.CSSProperties}) {
  return <div className="hr-glow" style={{margin:"0",opacity:.6,...style}}/>;
}

/* ─────────────── Tab Switcher ─────────────── */
export function TabSwitch({
  tabs, active, onChange, accent="#00D4FF",
}:{tabs:string[];active:number;onChange:(i:number)=>void;accent?:string}) {
  return (
    <div style={{display:"inline-flex",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:100,padding:4,gap:2}}>
      {tabs.map((t,i)=>(
        <button key={t} onClick={()=>onChange(i)} style={{
          padding:"7px 20px",borderRadius:100,fontSize:13,fontWeight:500,
          background:active===i?accent:"transparent",
          color:active===i?"#020408":"#64748B",
          transition:"all .25s",border:"none",cursor:"pointer",
        }}>{t}</button>
      ))}
    </div>
  );
}
