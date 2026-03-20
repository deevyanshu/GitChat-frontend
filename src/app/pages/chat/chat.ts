import { Component,signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GitService } from '../../service/git-service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  repoUrl=''
  userInput=''
  isTyping=signal(false)
  messages = signal<{role: 'user' | 'assistant', text: string}[]>([]);

  constructor(private service:GitService, private router:Router){}

  ngOnInit(): void {
    this.service.repositorySub.subscribe((repo:string)=>{
      this.repoUrl=repo;
    })
    this.service.messagesSub.subscribe(msgs=>{
      this.messages.set(msgs)
    })
  }

  reset(){
    this.service.repositorySub.next('');
    this.service.messagesSub.next([{ role: 'assistant', text: "Hello! I've finished analyzing the repository. What would you like to know about the codebase?" }])
    this.router.navigate(['/repo'])
  }

  send(){
    const question=this.userInput
    this.userInput='';
    this.isTyping.set(true);
    this.service.messagesSub.next([...this.messages(),{role:'user',text:question}])
    //this.messages.update(msgs=>[...msgs,{role:'user',text:question}])    
    this.service.chatRepo(question,this.repoUrl).subscribe((res:string)=>{
      this.service.messagesSub.next([...this.messages(),{role:'assistant',text:res}])
      //this.messages.update(msgs=>[...msgs,{role:'assistant',text:res}])
      this.isTyping.set(false);
    },error=>{
      this.messages.update(msgs=>[...msgs,{role:'assistant',text:"Sorry, something went wrong while processing your request."}])
      this.isTyping.set(false);
    })
  }

  
}
