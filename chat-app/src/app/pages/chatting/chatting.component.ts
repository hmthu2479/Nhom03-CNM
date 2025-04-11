import { Component, inject} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { formatDistanceToNow, parse } from 'date-fns';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule } from '@angular/forms';

interface Message {
  content: string;
  sender: 'me' | 'them';
  timestamp: string;
  read: boolean;
}


interface Conversation {
  id: number;
  name: string;
  messages: Message[];
  avatar: string;
  lastActive: string;
  sendAtTime: string;
  sendAtDate: string;
  unread: boolean;
  unreadCount: number;
  timeAgo?: string;
}

@Component({
  selector: 'app-chatting',
  standalone:true,
  imports: [
    RouterModule, ModalComponent, CommonModule,PickerModule,FormsModule],
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.css'
})


export class ChattingComponent {
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  conversations: Conversation[] = [
    {
      id: 1,
      name: 'Megan Leib',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?...',
      lastActive: 'Just now',
      sendAtTime: '15:20',
      sendAtDate: 'Thu, 10/4/2025',
      unread: false,
      unreadCount: 0,
      messages: [
        { content: "Hey Megan! It's been a while 😜", sender: 'me', timestamp: '15:20', read: true },
        { content: "When can we meet?", sender: 'me', timestamp: '15:20', read: true },
        { content: "Okeyyyy!", sender: 'them', timestamp: '15:21' , read: true}
      ]
    },
    {
      id: 2,
      name: 'Megan B',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?...',
      lastActive: '2 min ago',
      sendAtTime: '12:20',
      sendAtDate: 'Tue, 8/4/2025',
      unread: true,
      unreadCount: 2,
      messages: [
        { content: "Hey, are you coming to the party? 🎉", sender: 'them', timestamp: '12:20', read: true },
        { content: "Good night !!! :v", sender: 'me', timestamp: '12:21' , read: false}
      ]
    }
  ];
  
  
  get activeConversation() {
    return this.conversations.find(c => c.id === this.selectedConversationId);
  }

  selectedConversationId: number | null = null;
  selectConversation(id: number) {
    this.selectedConversationId = id;
  
    const convo = this.conversations.find(c => c.id === id);
    if (convo) {
      convo.messages?.forEach(msg => {
        if (msg.sender === 'them') {
          msg.read = true;
        }
      });
  
      convo.unreadCount = 0;
      convo.unread = false;
    }
  }

  isLastOfSenderGroup(index: number): boolean {
    const messages = this.activeConversation?.messages;
    if (!messages || index >= messages.length - 1) return true;
  
    return messages[index].sender !== messages[index + 1].sender;
  }
  
  getLastMessage(convo: Conversation): string {
    const last = convo.messages[convo.messages.length - 1];
    return last ? last.content : '';
  }
  
  updateTimeAgoForConversations() {
    this.conversations.forEach(convo => {
      const [hours, minutes] = convo.sendAtTime.split(':').map(Number);
      const [dayStr, dateStr] = convo.sendAtDate.split(',').map(s => s.trim());
      const dateParts = dateStr.split('/');
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const year = new Date().getFullYear(); // Adjust if needed

      const messageDate = new Date(year, month, day, hours, minutes);
      convo.timeAgo = formatDistanceToNow(messageDate, { addSuffix: true });
    });
  }

  ngOnInit() {
    this.updateTimeAgoForConversations();
  }
  updateUnreadCounts() {
    this.conversations.forEach(convo => {
      convo.unreadCount = convo.messages.filter(msg => msg.sender === 'them' && !msg.read).length;
      convo.unread = convo.unreadCount > 0;
    });
  }
  

  showEmojiPicker = false;
  messageText: string = '';

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native; // Get emoji char
    this.messageText += emoji;
  }

}



