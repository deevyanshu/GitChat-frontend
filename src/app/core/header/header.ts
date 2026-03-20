import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GitService } from '../../service/git-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    'class': 'force-blur block sticky top-0 z-50 w-full h-16 border-b border-slate-800'
  }
})
export class Header {

  repoUrl=''

  constructor(private router:Router, private service:GitService){}

  ngOnInit(): void {
    this.service.repositorySub.subscribe((repo:string)=>{
      this.repoUrl=repo;
    })
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goToRepo(){
    if(this.repoUrl.length===0)
    {
      this.router.navigate(['/repo']);
    }else{
      this.router.navigate(['/chat']);
    }
    
  }
}
