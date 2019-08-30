import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private workers: AuthData[] = [];
  private workersUpdated = new Subject<AuthData[]>();
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userType: string;
  private userName: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){}

  createUser(email: string, name: string, type: string, password: string){
    const authData: AuthData = {id: null, email: email, name: name, type: type, password: password};
    console.log(type);
    this.http.post("http://localhost:3000/api/users/signup", authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      })
  }

  login(email: string, password: string){
    const authData: AuthData = {id: null, email:email, name: null, type: null ,password:password};
    this.http.post<{token: string, expiresIn: number, userId: string, userType: string, userName: string}>("http://localhost:3000/api/users/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.userType = response.userType;
          this.userName = response.userName;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate  = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId, this.userType, this.userName);
          this.router.navigate(['/']);
        }
      })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userType = authInformation.userType;
      this.userName = authInformation.userName;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUser() {
    return {userId: this.userId, userType: this.userType , userName: this.userName};
  }

  getAuthStatusListner() {
    return this.authStatusListener.asObservable();
  }

  private setAuthTimer(duration: number){
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userType: string, userName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userName', userName);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');
    const userName = localStorage.getItem('userName');
    if(!token || !expirationDate){
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userType: userType,
      userName: userName

    }
  }

  getWorkers(){
    this.http.get<{message: string, users: any}>("http://localhost:3000/api/users/")
      .pipe(map((userData) => {
        return userData.users.map(user => {
          return {
            name: user.name,
            type: user.type,
            id: user._id
          }
        });
      }))
      .subscribe(usersData => {
        this.workers = usersData;
        this.workersUpdated.next([...this.workers])
      })
  }

  getWorkersUpdateListener() {
    return this.workersUpdated.asObservable();
  }


  deleteWorker(id: string){
    this.http.delete("http://localhost:3000/api/users/" + id)
      .subscribe(() => {
        const updatedWorkers = this.workers.filter(worker => worker.id !== id);
        this.workers = updatedWorkers;
        this.workersUpdated.next([...this.workers]);
      })
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
}



