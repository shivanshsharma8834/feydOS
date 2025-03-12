import { useCounterStore } from "@/stores/demoStore";

const HomePage = () => {
    const count = useCounterStore((state) => state.count);
    const increment = useCounterStore((state) => state.increment);
    const decrement = useCounterStore((state) => state.decrement);



    return (
        <div className="h-[1000px]">
           <div className="font-bold text-xl">Hello! I&apos;m Felishelis</div>
           {count}
           <button onClick={increment}>Increase</button>
           <button onClick={decrement}>Decrease</button>
        </div>
    )
}

export default HomePage; 