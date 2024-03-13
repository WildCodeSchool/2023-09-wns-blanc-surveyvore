// id;
// title;
// description;
// link;
// archived;
// private;
// collectingUserData;
// startDate;
// endDate;
// deleteDate;
// creationDate;
// publicationDate;
// archiveDate;

export type Survey = {
  id: number;
  title: string;
  description?: string;
  link: string;
  archived: boolean;
  private: boolean;
  collectingUserData: boolean;
  startDate?: Date;
  endDate?: Date;
  deleteDate?: Date;
  creationDate: Date;
  publicationDate?: Date;
  archiveDate?: Date;
};

