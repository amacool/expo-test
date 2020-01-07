interface IDCardInterface {
  name?: string;
  state?: string;
  photo?: string;
  issueDate?: Date;
  birthday?: Date;
  contact1?: {name: string, phone: string},
  contact2?: {name: string, phone: string},
  medical?: string;
  note?: string;
  gender?: string;
  istemp?: boolean;
}
interface IDCardStatusInterface {
  name?: boolean;
  state?: boolean;
  photo?: boolean;
  issueDate?: boolean;
  birthday?: boolean;
  contact1?: boolean,
  contact2?: boolean,
  medical?: boolean;
  note?: boolean;
  gender?: boolean;
}
