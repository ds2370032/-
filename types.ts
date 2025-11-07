export enum AnimalType {
  Dog = '犬',
  Cat = '猫',
  Bird = '鳥',
  Hamster = 'ハムスター',
  Rabbit = 'うさぎ',
  Fish = '魚',
  Turtle = '亀',
  Hedgehog = 'ハリネズミ',
  Ferret = 'フェレット',
  Reptile = '爬虫類',
  Other = 'その他',
}

export enum NameStyle {
  Cute = 'かわいい',
  Cool = 'かっこいい',
}

export interface GeneratedNames {
  names: string[];
}
