import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from '@angular/fire/auth';
import {
  collection,
  Firestore,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import { updateProfile } from '@firebase/auth';
import { updateDoc } from '@firebase/firestore';
import { user } from 'rxfire/auth';
import { docData } from 'rxfire/firestore';
import { from, map, of, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private db: Firestore) {}

  firebaseUser: FirebaseUser | null = null;

  get logged() {
    return user(this.auth).pipe(
      tap((user) => {
        this.firebaseUser = user;
      })
    );
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(email: string, password: string, payload: User) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap((creds) => {
        payload.uid = creds.user.uid;

        updateProfile(creds.user, {
          displayName: payload.username,
          photoURL: payload.profile,
        });

        const users = collection(this.db, 'users');
        const userDoc = doc(users, payload.uid);

        setDoc(userDoc, payload);
      })
    );
  }

  get user() {
    return user(this.auth).pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserData(user.uid);
        }
        return of(undefined);
      })
    );
  }

  getUserData(uid?: string) {
    const users = collection(this.db, 'users');
    const userDoc = doc(users, uid ? uid : this.firebaseUser?.uid);

    return docData(userDoc).pipe(
      map(
        (data) => ({ ...data, birthdate: data['birthdate'].toDate() } as User)
      )
    );
  }

  update(user: User) {
    const users = collection(this.db, 'users');
    const userDoc = doc(users, user.uid);

    updateProfile(this.firebaseUser!, {
      photoURL: user.profile,
      displayName: user.username,
    });

    return from(updateDoc(userDoc, user as any));
  }

  logout() {
    this.auth.signOut();
  }
}
