import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamDataService {
  partnerData: any;
  loginRole : any ;
  constructor() { }

  setPartnerData(val: string[] = []) {
    this.partnerData = val;
  }

  getPartnerData() {
    return this.partnerData;
  }

  setLoginRoleData(val: any){
    this.loginRole = val;
  }
  getLoginRoleData(){
    return this.loginRole;

  }
}
