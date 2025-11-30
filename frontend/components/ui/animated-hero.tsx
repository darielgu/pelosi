import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InteractiveHoverButton } from "./interactive-hover-button";
import { useId } from "react";

function Hero({}) {
  async function handleSubscribe(email: string) {
    console.log(`Subscribing ${email}`);
  }

  const id = useId();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["get money", "make returns", "have motion", "get paid", "bag gains"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-3xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">
                {" "}
                Trail Pelosi's trades &
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Enter your email to get access and never miss another Pelosi
              trade. Our bot tracks and notifies you of Nancy Pelosi's stock
              trades in real-time.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex gap-2">
              <Input
                size={50}
                id={id}
                className="flex-1"
                placeholder="Email"
                type="email"
              />
              <Button
                variant="default"
                color="black"
                size="sm"
                onClick={() => console.log("subscribed")}
              >
                Subscribe
              </Button>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <InteractiveHoverButton text="View Trades" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
