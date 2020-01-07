interface MessingCardInterface {
  name?: string;
  state?: string;
  city?: string;
  photo?: string;
  weight?: number;
  height?: number;
  haircolor?: string;
  eyecolor?: string;
  issueDate?: Date;
  birthday?: Date;
  missingDate?: Date;
  contact1?: string,
  contact2?: string,
  medical?: string;
  note?: string;
  gender?: string;
  istemp?: boolean;
}
interface MissingCardStatusInterface {
  name?: boolean;
  statecity?: boolean;
  photo?: boolean;
  weightheight?: boolean;
  haireyescolor?: boolean;
  missingDate?: boolean;
  issueDate?: boolean;
  birthday?: boolean;
  contact?: boolean,
  medical?: boolean;
  note?: boolean;
  gender?: boolean;
}
