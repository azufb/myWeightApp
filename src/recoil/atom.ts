import { atom } from 'recoil';

const dynamoDbItemCountAtom = atom({
  key: 'dynamoDbItemCountAtom',
  default: 0,
});

const dynamoDBItemListAtom = atom({
  key: 'dynamoDBItemListAtom',
  default: [],
});

export { dynamoDbItemCountAtom, dynamoDBItemListAtom };
