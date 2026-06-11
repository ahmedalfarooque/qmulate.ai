"use client";
import { usePathname } from "next/navigation";

export function WhatsApp() {
  const path = usePathname();
  return (
    <a href="https://wa.me/966533339052" target="_blank" rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{
        position:"fixed",bottom:24,right:24,zIndex:9000,
        width:52,height:52,borderRadius:"50%",
        background:"linear-gradient(135deg,#25D366,#128C7E)",
        display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 4px 24px rgba(37,211,102,.45),0 1px 0 rgba(255,255,255,.2) inset",
        fontSize:24,transition:"transform .25s,box-shadow .25s",
      }}
      onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.transform="scale(1.1)";(e.currentTarget as HTMLAnchorElement).style.boxShadow="0 8px 32px rgba(37,211,102,.65),0 1px 0 rgba(255,255,255,.2) inset"}}
      onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.transform="scale(1)";(e.currentTarget as HTMLAnchorElement).style.boxShadow="0 4px 24px rgba(37,211,102,.45),0 1px 0 rgba(255,255,255,.2) inset"}}
    >💬</a>
  );
}
