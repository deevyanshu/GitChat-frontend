import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GitService } from '../../service/git-service';
import { error } from 'console';

@Component({
  selector: 'app-repo',
  imports: [FormsModule],
  templateUrl: './repo.html',
  styleUrl: './repo.css',
})
export class Repo {
  repoUrl=''
  isConnecting=signal(false)

  constructor(private router:Router, private service:GitService){}

  action(){
    this.isConnecting.set(true)
    this.service.repositorySub.next(this.repoUrl);
    this.service.loadRepo(this.repoUrl).subscribe((res:string)=>{
      console.log('Repository loaded successfully:', res);
      this.router.navigate(['/chat'])
    },error=>{
      console.error('Error loading repository:', error);
      this.service.repositorySub.next('');
      this.isConnecting.set(false)
    })
    
  }

  ngOnDestroy(): void {
    this.isConnecting.set(false)
  }

  
}
