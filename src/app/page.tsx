import Window from "@/components/Window";
import Image from "next/image";

export default function Desktop() {
  return (
    <>
      <div className="relative h-screen w-full">
      
        <Image
          src="/background2.png"
          alt="Background Wallpaper" 
          fill
          className="-z-20 object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10">
          <Window title="New window"> 
            <h1>Content</h1>
          </Window>
        </div>
</div>
    </>
    
  );
}
