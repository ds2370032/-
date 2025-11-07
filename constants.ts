import { AnimalType, NameStyle } from './types';

export const ANIMAL_TYPE_OPTIONS = [
  { value: AnimalType.Dog, label: '犬 (Dog)' },
  { value: AnimalType.Cat, label: '猫 (Cat)' },
  { value: AnimalType.Bird, label: '鳥 (Bird)' },
  { value: AnimalType.Hamster, label: 'ハムスター (Hamster)' },
  { value: AnimalType.Rabbit, label: 'うさぎ (Rabbit)' },
  { value: AnimalType.Fish, label: '魚 (Fish)' },
  { value: AnimalType.Turtle, label: '亀 (Turtle)' },
  { value: AnimalType.Hedgehog, label: 'ハリネズミ (Hedgehog)' },
  { value: AnimalType.Ferret, label: 'フェレット (Ferret)' },
  { value: AnimalType.Reptile, label: '爬虫類 (Reptile)' },
  { value: AnimalType.Other, label: 'その他 (Other)' },
];

export const NAME_STYLE_OPTIONS = [
  { value: NameStyle.Cute, label: 'かわいい (Cute)' },
  { value: NameStyle.Cool, label: 'かっこいい (Cool)' },
];
