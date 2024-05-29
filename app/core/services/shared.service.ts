import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtHelper } from 'angular2-jwt';
// import { SharedUserService } from './shared-user.service';
import { APPStorage } from '../constants/storage';
// import { CommonFunctions } from '../common-functions';
// import { AccountRoutes } from '../constants/admin-route';
import { BehaviorSubject, Observable } from 'rxjs';
// import { ToastType } from "../constants/base-constants";
// import { Privilege, User } from "../shared-model/user.model";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //   jwtHelper: JwtHelper = new JwtHelper();
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _theme_settings: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /* Shared Loader Param */
  private taskCount = 0;
  /* Shared Token Param */
  private _token = '';
  /* Shared Env Language */
  private _env_language: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  /* Shared Data Param */
  private msgBody: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  //   private _privilege: Privilege[] = [];
  /* Token Expire params */
  private _userDetail: any;
  /* LoggedIn Param */
  private isLoginRequired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _farmerData: any;
  private _companyData: any;
  private _userFilterData: any;
  private _headerArray: any;
  private _masterSettingArray: any;
  // Code ID
  private codeId!: number;
  // Bank ID
  private bankId!: number;
  // Branch ID
  private branchId!: number;
  // Master Product
  private loanProductId!: number;
  private savingsProductId!: number;
  private fdProductId!: number;
  private rdProductId!: number;
  // Account
  private savingsAccountId!: number;
  private rdAccountId!: number;
  private fdAccountId!: number;
  // CIF
  private cifId!: number;

  constructor(private router: Router) {
    // super();
  }
  /**
   * Getter $codeId
   * @return {number}
   */
  public getcodeId(): number {
    this.codeId = Number(localStorage.getItem(APPStorage.CODE_ID));
    return this.codeId;
  }

  /**
   * Setter $codeId
   * @param {number} value
   */
  public setcodeId(value: number) {
    localStorage.setItem(APPStorage.CODE_ID, value.toString());
    this.codeId = value;
  }

  /**
   * Getter $bankId
   * @return {number}
   */
  public getbankId(): number {
    this.bankId = Number(localStorage.getItem(APPStorage.BANK_ID));
    return this.bankId;
  }

  /**
   * Setter $bankId
   * @param {number} value
   */
  public setbankId(value: number) {
    localStorage.setItem(APPStorage.BANK_ID, value.toString());
    this.bankId = value;
  }

  /**
   * Getter $branchId
   * @return {number}
   */
  public getbranchId(): number {
    this.branchId = Number(localStorage.getItem(APPStorage.BRANCH_ID));
    return this.branchId;
  }

  /**
   * Setter $branchId
   * @param {number} value
   */
  public setbranchId(value: number) {
    localStorage.setItem(APPStorage.BRANCH_ID, value.toString());
    this.branchId = value;
  }

  /**
   * Getter $loanProductId
   * @return {number}
   */
  public getLoanProductId(): number {
    this.loanProductId = Number(localStorage.getItem(APPStorage.LOAN_PRODUCT));
    return this.loanProductId;
  }

  /**
   * Setter $loanProductId
   * @param {number} value
   */
  public setLoanProductId(value: number) {
    localStorage.setItem(APPStorage.LOAN_PRODUCT, value.toString());
    this.loanProductId = value;
  }

  /**
   * Getter $savingsProductId
   * @return {number}
   */
  public getSavingsProductId(): number {
    this.savingsProductId = Number(localStorage.getItem(APPStorage.SAVINGS_PRODUCT));
    return this.savingsProductId;
  }

  /**
   * Setter $savingsProductId
   * @param {number} value
   */
  public setSavingsProductId(value: number) {
    localStorage.setItem(APPStorage.SAVINGS_PRODUCT, value.toString());
    this.savingsProductId = value;
  }

  /**
   * Getter $fdProductId
   * @return {number}
   */
  public getFDProductId(): number {
    this.fdProductId = Number(localStorage.getItem(APPStorage.FD_PRODUCT));
    return this.fdProductId;
  }

  /**
   * Setter $fdProductId
   * @param {number} value
   */
  public setFDProductId(value: number) {
    localStorage.setItem(APPStorage.FD_PRODUCT, value.toString());
    this.fdProductId = value;
  }

  /**
   * Getter $rdProductId
   * @return {number}
   */
  public getRDProductId(): number {
    this.rdProductId = Number(localStorage.getItem(APPStorage.RD_PRODUCT));
    return this.rdProductId;
  }

  /**
   * Setter $rdProductId
   * @param {number} value
   */
  public setRDProductId(value: number) {
    localStorage.setItem(APPStorage.RD_PRODUCT, value.toString());
    this.rdProductId = value;
  }

  /**
   * Getter $savingsAccountId
   * @return {number}
   */
  public getSavingsAccountId(): number {
    this.savingsAccountId = Number(localStorage.getItem(APPStorage.SAVINGS_ACCOUNT));
    return this.savingsAccountId;
  }

  /**
   * Setter $savingsAccountId
   * @param {number} value
   */
  public setSavingsAccountId(value: number) {
    localStorage.setItem(APPStorage.SAVINGS_ACCOUNT, value.toString());
    this.savingsAccountId = value;
  }

  /**
   * Getter $rdAccountId
   * @return {number}
   */
  public getRDAccountId(): number {
    this.rdAccountId = Number(localStorage.getItem(APPStorage.RD_ACCOUNT));
    return this.rdAccountId;
  }

  /**
   * Setter $rdAccountId
   * @param {number} value
   */
  public setRDAccountId(value: number) {
    localStorage.setItem(APPStorage.RD_ACCOUNT, value.toString());
    this.rdAccountId = value;
  }

  /**
   * Getter $fdAccountId
   * @return {number}
   */
  public getFDAccountId(): number {
    this.fdAccountId = Number(localStorage.getItem(APPStorage.FD_ACCOUNT));
    return this.fdAccountId;
  }

  /**
   * Setter $fdAccountId
   * @param {number} value
   */
  public setFDAccountId(value: number) {
    localStorage.setItem(APPStorage.FD_ACCOUNT, value.toString());
    this.fdAccountId = value;
  }

  /**
   * Getter $cifId
   * @return {number}
   */
  public getCIFId(): number {
    this.cifId = Number(localStorage.getItem(APPStorage.CIF_ID));
    return this.cifId;
  }

  /**
   * Setter $cifId
   * @param {number} value
   */
  public setCIFId(value: number) {
    localStorage.setItem(APPStorage.CIF_ID, value.toString());
    this.cifId = value;
  }

  /**
   * Get Login Info
   */
  getLoginRequired(): Observable<boolean> {
    return this.isLoginRequired.asObservable();
  }

  /**
   * Set Login Data
   * @param val
   */
  setLoginRequired(val: boolean): void {
    this.isLoginRequired.next(val);
  }

  // Get Loader
  getLoader(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  /**
   * Set Loader
   * @param val
   */
  setLoader(val: boolean): void {
    if (val) {
      this.taskCount += 1;
    } else {
      this.taskCount -= 1;
      this.taskCount !== 0 ? (val = true) : false;
    }
    this.isLoading.next(val);
  }

  /**
   * Set User Token
   * @param value
   */
  //   setToken(value: string): void {
  //     localStorage.setItem(APPStorage.TOKEN, CommonFunctions.ENCRYPT_OBJ(value));
  //     this._token = value;
  //   }

  /**
   * Get User Token
   */
  //   getToken(): string {
  //     this._token = CommonFunctions.DECRYPT_OBJ(localStorage.getItem(APPStorage.TOKEN));
  //     return this._token;
  //   }

  /**
   * Set User Privilege
   * @param value
   */
  //   setPrivilege(value: Privilege[]): void {
  //     localStorage.setItem(APPStorage.USER_PRIVILEGE, CommonFunctions.ENCRYPT_OBJ(value));
  //     this._privilege = value;
  //   }

  /**
   * Get User Privilege
   */
  //   getPrivilege(): Privilege[] {
  //     this._privilege = CommonFunctions.DECRYPT_OBJ(localStorage.getItem(APPStorage.USER_PRIVILEGE));
  //     return this._privilege;
  //   }

  /**
   * Check Token Is Valid
   * @param token
   * @constructor
   */
  //   IsValidToken(token: string): boolean {
  //     let isValid = true;
  //     try {
  //       const isTokenExpired = this.jwtHelper.isTokenExpired(this.getToken());
  //       if (isTokenExpired) {
  //         isValid = false;
  //         this.logout(AccountRoutes.LOGIN);
  //       }
  //     } catch (e) {
  //       isValid = false;
  //     }
  //     return isValid;
  //   }

  /**
   * Check User is Logged In or Not
   */
  //   isLoggedIn(): boolean {
  //     return (this.getToken()) ? true : false;
  //   }

  /**
   * Check User is valid or Not
   * @param user
   */
  //   isValidUser(user: User): boolean {
  //     return (user) ? true : false;
  //   }

  /**
   * Get Toast Message
   */
  getToastMessage(): Observable<any> {
    return this.msgBody.asObservable();
  }

  /**
   * Set Toast Message
   * @param message
   * @param type
   */
  //   setToastMessage(message: any, type: ToastType) {
  //     let body = null;
  //     if (message) {
  //       body = {
  //         message: message,
  //         type: type
  //       };
  //     }
  //     this.msgBody.next(body);
  //   }

  /**
   * Get User Details
   */
  //   getUserDetail(): any {
  //     if (!this._userDetail) {
  //       this._userDetail = CommonFunctions.DECRYPT_OBJ(localStorage.getItem(APPStorage.USERDETAIL));
  //     }
  //     return this._userDetail;
  //   }

  /**
   * Set User Details
   * @param value
   */
  //   setUserDetail(value: any): void {
  //     localStorage.setItem(APPStorage.USERDETAIL, CommonFunctions.ENCRYPT_OBJ(value));
  //     this._userDetail = value;
  //   }

  /**
   * Get Header Details
   */
  //   getHeaderArray(): any {
  //     if (!this._headerArray) {
  //       this._headerArray = CommonFunctions.DECRYPT_OBJ(localStorage.getItem(APPStorage.HEADER_ARRAY));
  //     }
  //     return this._headerArray;
  //   }

  /**
   * Set Header Details
   * @param value
   */
  //   setHeaderArray(value: any): void {
  //     localStorage.setItem(APPStorage.HEADER_ARRAY, CommonFunctions.ENCRYPT_OBJ(value));
  //     this._headerArray = value;
  //   }

  /**
   * Get Master Setting Details
   */
  //   getMasterSettingArray(): any {
  //     if (!this._masterSettingArray) {
  //       this._masterSettingArray = CommonFunctions.DECRYPT_OBJ(localStorage.getItem(APPStorage.MASTER_SETTING_ARRAY));
  //     }
  //     return this._masterSettingArray;
  //   }

  /**
   * Set Master Setting Details
   * @param value
   */
  //   setMasterSettingArray(value: any): void {
  //     localStorage.setItem(APPStorage.MASTER_SETTING_ARRAY, CommonFunctions.ENCRYPT_OBJ(value));
  //     this._masterSettingArray = value;
  //   }

  /**
   * Get Farmer data
   * @param key
   * @returns {any}
   */
  //   getFarmerData(key: any): any {
  //     this._farmerData = CommonFunctions.DECRYPT_OBJ(localStorage.getItem(APPStorage.FARMERDETAIL));
  //     return this._farmerData[key];
  //   }

  /**
   * Set Farmer data
   * @param key
   * @param value
   */
  //   setFarmerData(key: any, value: any): void {
  //     const setData: { [key: string]: any } = {};
  //     setData[key] = value;
  //     localStorage.setItem(APPStorage.FARMERDETAIL, CommonFunctions.ENCRYPT_OBJ(setData));
  //     this._farmerData = setData;
  //   }

  /**
   * Get Company data
   * @param key
   * @returns {any}
   */
  //   getCompanyData(key: any): any {
  //     this._companyData = CommonFunctions.DECRYPT_OBJ(localStorage.getItem(APPStorage.COMPANY_DATA));
  //     return this._companyData[key];
  //   }

  /**
   * Set Company data
   * @param key
   * @param value
   */
  //   setCompanyData(key: any, value: any): void {
  //     const setData: { [key: string]: any } = {};
  //     setData[key] = value;
  //     localStorage.setItem(APPStorage.COMPANY_DATA, CommonFunctions.ENCRYPT_OBJ(setData));
  //     this._companyData = setData;
  //   }

  /**
   * Get User Filter
   * @param key
   * @returns {any}
   */
  //   getUserFilter(key: any): any {
  //     this._userFilterData = CommonFunctions.DECRYPT_OBJ(localStorage.getItem(APPStorage.FILTERDATA));
  //     return this._userFilterData[key];
  //   }

  /**
   * Set User Filter
   * @param key
   * @param value
   */
  //   setUserFilter(key: any, value: any): void {
  //     const setData: { [key: string]: any } = {};
  //     setData[key] = value;
  //     localStorage.setItem(APPStorage.FILTERDATA, CommonFunctions.ENCRYPT_OBJ(setData));
  //     this._userFilterData = setData;
  //   }

  /**
   * Clear All Session Data
   */
  clearSession() {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.removeItem(APPStorage.TOKEN);
    localStorage.removeItem(APPStorage.USER);
    localStorage.removeItem(APPStorage.USER_PRIVILEGE);
    this.setLoginRequired(false);
  }

  /**
   * Logout
   */
  //   logout(route: string = AccountRoutes.LOGIN): void {
  //     this.clearSession();
  //     this.router.navigate(['/' + route]);
  //   }

  /**
   * Get Env Language
   */
  getEnvLanguage(): Observable<any> {
    return this._env_language.asObservable();
  }

  /**
   * Set Env Language
   * @param message
   * @param type
   */
  setEnvLanguage(message: any) {
    const language = message;
    this._env_language.next(language);
  }
  /**
   * Get Env Language
   */
  getThemeSettings(): Observable<any> {
    return this._theme_settings.asObservable();
  }

  /**
   * Set Env Language
   * @param message
   * @param type
   */
  setThemeSettings(message: any) {
    const language = message;
    this._theme_settings.next(language);
  }
}
