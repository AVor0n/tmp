export type TId = string;

export type TTodo = {
  id: TId,
  title: string,
  complete: boolean,
  deleted: boolean,
};

export type TTodoCategory = 'active' | 'completed' | 'deleted';