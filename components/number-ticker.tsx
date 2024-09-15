import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  decimals?: number; // Optional prop to specify the number of decimals
  delay?: number; // Optional prop to specify the delay in milliseconds
}

const Counter: React.FC<CounterProps> = ({
  value,
  direction = "up",
  decimals = 0,
  delay = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [motionValue, isInView, direction, value, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, decimals]);

  return <span ref={ref} />;
};

export default Counter;
