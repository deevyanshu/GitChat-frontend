import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitService {

  private baseUrl=`http://localhost:8080/api/v1/`;

  repositorySub=new BehaviorSubject<string>('')
  messagesSub=new BehaviorSubject<{role: 'user' | 'assistant', text: string}[]>([{ role: 'assistant', text: "Hello! I've finished analyzing the repository. What would you like to know about the codebase?" }])

  constructor(private http:HttpClient) {}

  loadRepo(repo:string):Observable<string>{
    const params=new HttpParams().set('q',repo);
    return this.http.post<string>(`${this.baseUrl}load`,null,{params,responseType:'text' as 'json'});
  }

  chatRepo(ques:string,url:string):Observable<string>{
    const params=new HttpParams().set('q',ques).set('w',url);
    return this.http.post<string>(`${this.baseUrl}chat`,null,{params,responseType:'text' as 'json'});
  }

}
