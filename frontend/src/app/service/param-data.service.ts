import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamDataService {
  partnerData: any;
  constructor() { }

  setPartnerData(val: string[] = []) {
    this.partnerData = val;
  }

  getPartnerData() {
    return this.partnerData;
  }
}
