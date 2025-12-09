// cardData.ts
import { conf1, conf2, conf3 } from './index';

export interface CardItem {
  number: string;
  title: string;
  img: string; // or use StaticImageData if you're using next/image
}

export const cardData: CardItem[] = [
  {
    number: "01",
    title: "Selected Image From Maiden Edition",
    img: conf1,
  },
  {
    number: "02",
    title: "Selected Image From Maiden Edition",
    img: conf2,
  },
  {
    number: "03",
    title: "Selected Image From Maiden Edition",
    img: conf3,
  },
  {
    number: "04",
    title: "Selected Image From 2nd Conference",
    img: conf1,
  },
  {
    number: "05",
    title: "Selected Image From 2nd Conference",
    img: conf2,
  },
  {
    number: "06",
    title: "Selected Image From 2nd Conference",
    img: conf3,
  },
];
