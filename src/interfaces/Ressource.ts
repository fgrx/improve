export interface iRessource {
  id?: string;
  title: string;
  description: string;
  url: string;
  date_start?: string;
  date_end?: string;
  important: boolean;
  over?: boolean;
  public: boolean;
}
