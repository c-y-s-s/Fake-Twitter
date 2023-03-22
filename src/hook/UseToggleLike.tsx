import "firebase/compat/auth";
import "firebase/compat/firestore";

import firebase from "../utils/firebase";

const UseToggleLike = (articleId: string) => {
  const uid = firebase.auth().currentUser?.uid;

  firebase
    .firestore()
    .collection("posts_article")
    .doc(articleId)
    .get()
    .then((collectionSnapshot) => {
      if (collectionSnapshot?.data()?.likeBy?.includes(uid)) {
        firebase
          .firestore()
          .collection("posts_article")
          .doc(articleId)
          .update({
            // 避免舊職被蓋掉,使用 fieldvalue.arrayRemove
            likeBy: firebase.firestore.FieldValue.arrayRemove(uid),
          })
          .then(() => {});
      } else {
        firebase
          .firestore()
          .collection("posts_article")
          .doc(articleId)
          .update({
            // 避免舊職被蓋掉,使用 fieldvalue.arrayUnion
            likeBy: firebase.firestore.FieldValue.arrayUnion(uid),
          })
          .then(() => {});
      }
    });
};

export default UseToggleLike;
