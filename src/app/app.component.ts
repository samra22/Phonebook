import { Component, OnInit } from '@angular/core';

interface Contact {
  name: string;
  number: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'samir-app';
  contactList: Contact[];
  contactName: string;
  contactNumber: string;

  constructor() {
    this.contactList = [];
    this.contactName = '';
    this.contactNumber = '';
  }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactList = [];
    const contacts = JSON.parse(localStorage.getItem('contactList') || '{}');
    if (contacts && contacts.length) {
      contacts.forEach((contact: Contact) => {
        this.contactList.push(contact);
      });
    }
  }

  saveContact() {
    const contact: Contact = {
      name: this.contactName,
      number: this.contactNumber
    };
    let contacts = JSON.parse(localStorage.getItem('contactList') || '{}');
    if (!contacts || !contacts.length) {
      contacts = [];
    }
    contacts.push(contact);
    localStorage.setItem('contactList', JSON.stringify(contacts));
    this.getContacts();
  }

  deleteContact(contactNumber: string) {
    this.getContacts();
    const index = this.contactList.findIndex(contact => contact.number === contactNumber);
    this.contactList.splice(index, 1);
    localStorage.setItem('contactList', JSON.stringify(this.contactList));
  }
}
