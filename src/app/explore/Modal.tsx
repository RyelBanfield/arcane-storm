import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Doc } from "../../../convex/_generated/dataModel";
import { Location } from "./WorldExploration";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  location: Location | null;
  onExplore: () => void;
  character: Doc<"characters">;
  event: string | null;
};

const Modal = ({
  isOpen,
  onClose,
  location,
  onExplore,
  character,
  event,
}: ModalProps) => {
  const [displayedEvent, setDisplayedEvent] = useState(event);
  const [animationKey, setAnimationKey] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (event) {
      setDisplayedEvent(event);
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [event]);

  useEffect(() => {
    if (buttonDisabled) {
      const interval = setInterval(() => {
        setButtonDisabled(false);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [buttonDisabled]);

  if (!isOpen || !location) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        className="flex h-64 w-96 flex-col justify-between rounded-lg bg-neutral-950 p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-xl font-bold">{location.name}</h2>
          <p className="text-sm text-neutral-500">{location.faction}</p>
        </div>

        <motion.p
          key={animationKey}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-neutral-300"
        >
          {displayedEvent}
        </motion.p>

        <Button
          disabled={buttonDisabled}
          size={"sm"}
          onClick={() => {
            onExplore();
            setButtonDisabled(true);
          }}
        >
          Explore {location.name} as {character.name}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
