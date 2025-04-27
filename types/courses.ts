interface ICourse {
  _id: string;
  name: string;
  description: string;
  subject: string;
  students?: number;
  assignments?: number;
}
