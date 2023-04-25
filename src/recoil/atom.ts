import { atom } from 'recoil';

const dynamoDbItemCountAtom = atom({
  key: 'dynamoDbItemCountAtom',
  default: 0,
});

export { dynamoDbItemCountAtom };
