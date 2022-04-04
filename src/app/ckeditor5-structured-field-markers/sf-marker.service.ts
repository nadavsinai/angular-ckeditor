export interface sfMakerData{
    key: any;
}

class sfMarkerService{
    private markerMap = new Map<string, sfMakerData>();
    getMarkerData(marker: string) {
        return this.markerMap.get(marker);
    }
    setMarkerData(markerName: string, value: sfMakerData){
        this.markerMap.set(markerName, value);
    }
}

export const SfMarkerService = new sfMarkerService();