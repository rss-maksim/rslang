export const filterParts = {
  hard: '"userWord.difficulty":"hard"',
  deleted: '"userWord.difficulty":"deleted"',
  learning: '"userWord.difficulty":"learning"',
  notUserWord: '"userWord":null',
};

export const filters: IFilter = {
  hard: `{"$or":[{${filterParts.hard}}]}`,
  learning: `{"$or":[{${filterParts.hard}}, {${filterParts.learning}}]}`,
  deleted: `{"$or":[{${filterParts.deleted}}]}`,
  textBook: `{"$or":[{${filterParts.hard}}, {${filterParts.learning}}, {${filterParts.notUserWord}}]}`,
};

interface IFilter {
  [key: string]: string;
}
