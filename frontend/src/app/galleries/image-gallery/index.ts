import set1 from "./1";
import set2 from "./2"; 
import set3 from "./3";
import set4 from "./4";
import set6 from "./6";
import set5 from "./5";
import set7 from "./7";
import set8 from "./8";
import set9 from "./9";
import set10 from "./10";

const galleries: Record<string, { src: string; width: number; height: number; alt?: string }[]> = {
  "1": set1,
  "2": set2,
  "3": set3,
  "5": set5,
  "4": set4,
  "6": set6,
  "7": set7,
  "8": set8,
  "9": set9,
  "10": set10
};

export default galleries;
