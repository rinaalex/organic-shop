import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const key = action.payload.key;
          const data = action.payload.val();
          return { key, title: data['title'], price: data['price'] }
        }))
      )
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }
}
