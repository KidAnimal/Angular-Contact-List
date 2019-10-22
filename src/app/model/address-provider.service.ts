import { Injectable, OnInit } from '@angular/core';

import { Contact } from './contact';
import { CONTACTS } from './mock-data';

@Injectable({
	providedIn: 'root'
})
export class AddressProviderService implements OnInit {

	constructor() {
		this.friends = [];
		if (!localStorage.getItem('Friends')) {
			localStorage.setItem('Friends', JSON.stringify(CONTACTS));
			this.friends.push(...CONTACTS);
		}
		else {
			this.friends.push(...JSON.parse(localStorage.getItem('Friends')));
		}
	}
	friends: Array<Contact>;

	ngOnInit() {
		this.friends = [];
		if (!localStorage.getItem('Friends')) {
			localStorage.setItem('Friends', JSON.stringify(CONTACTS));
			this.friends.push(...CONTACTS);
		}
		else {
			this.friends.push(...JSON.parse(localStorage.getItem('Friends')));
		}
	}

	getFriends(): Contact[] {
		return this.friends;
	}

	getFriend(id: number): Contact {
		let friends: Contact[] = this.getFriends();
		let friend: Contact = friends.find(
			f => { return (f.id == id) });
		return friend;
	}

	addFriend(): Contact {
		//	let friends:Contact[] = this.getFriends();
		let maxId: number;

		if (this.friends && this.friends.length > 0) {
			maxId = this.friends[this.friends.length - 1].id;
		} else {
			maxId = 0;
		}

		let friend: Contact = new Contact();
		friend.id = maxId + 1;
		this.friends.push(friend);
		return friend;
	}

	save() {
		{
			//let friend: Contact = new Contact();
			localStorage.setItem("Friends", JSON.stringify(this.friends));
		}
	}

	cancel() {
		this.friends.splice(this.friends.length - 1, 1);
	}

	delete(contactId: number) {
		var t = confirm("Are You Sure You Want to Delete This Contact?");
		if (t) {
			this.friends = this.friends.filter(x => x.id != contactId);
			this.save();
		}
	}
}
