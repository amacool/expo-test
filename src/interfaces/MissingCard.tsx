interface MessingCardInterface {
  name?: string;
  birthday?: Date;
  breed: string,
  color: string,
  gender?: string;
  contact?: string;
  contactoth?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  note?: string;
  issueDate?: Date;
  photo?: string;
  istemp?: boolean;
  missingDate?: Date;
}
interface MissingCardStatusInterface {
  name?: boolean;
  birthday?: boolean;
  breed?: boolean;
  gender?: boolean;
  color?: boolean,
  contact?: boolean;
  contactoth?: boolean;
  address?: boolean,
  city?: boolean;
  state?: boolean;
  zipcode?: boolean;
  country?: boolean;
  note?: boolean;
  issueDate?: boolean;
  photo?: boolean;
  istemp?: boolean;
  missingDate?: boolean;
}
