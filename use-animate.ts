import { CSSProperties, useCallback, useEffect, useState } from "react";
import {UseAnimateProps} from "./use-animate.model";


export const useAnimate = (config: UseAnimateProps) => {
  const {mount, unMount} = config;
  const [style, setStyle] = useState<CSSProperties>(unMount.style);

  /** un-mount */
  const handleClose = useCallback(
      (handleClick: () => void) => {
        setStyle(unMount.style);

        let timer = setTimeout(() => handleClick(), unMount.delay);
        return () => clearTimeout(timer);
      },
      [unMount]
  );

  /** mount */
  useEffect(() => {
    let timer = setTimeout(() => setStyle(mount.style), mount.delay);

    return () => clearTimeout(timer);
  }, []);

  return {handleClose, style};
};
