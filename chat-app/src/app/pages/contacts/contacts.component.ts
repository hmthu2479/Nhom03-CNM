import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  standalone: true,
  selector: 'app-contacts',
  imports: [ModalComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent {
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
