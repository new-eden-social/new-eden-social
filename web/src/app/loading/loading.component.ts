import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  showMessage = false;

  message = "";

  messages = [
    "If this takes too long, try refreshing the page",
    "We are running on donations, this servers are all we can afford :/",
    "Hmm, still here?",
    "You should probably refresh the page",
    "Something is broken, i don't think this will ever load",
    "...",
    "..."
  ];

  ngOnInit(): void {
    // Select first message
    this.message = this.messages[0];

    // After 2.5s show message
    setTimeout(() => this.showMessage = true, 3000);
    // Every 5s switch between messages
    setInterval(() => this.nextMessage(), 10000);
  }

  nextMessage(): void {
    let newIndex = this.messages.indexOf(this.message) + 1;
    // If we reached the end, start from begging
    if (newIndex === this.messages.length) newIndex = 0;

    this.message = this.messages[newIndex];
  }

}
