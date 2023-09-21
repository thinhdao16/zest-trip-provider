export interface StateTour {
  tour: {
    tours: [];
    otherData: [];
    loading: false;
    error: string | null;
    tourDetail: [];
    tourGetDetail: [];
    tagTour: [];
    vehicleTour: [];
    loadingDetail: false;
    errorDetail: string | null;
    loadingCreateTour: false;
    errorCreateTour: boolean | null;
  };
}
export interface DataSelectCard {
  id: number;
  name: string;
}
