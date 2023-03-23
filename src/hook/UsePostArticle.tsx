import firebase from "../utils/firebase";
import "firebase/compat/storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { setImgFile, setInputValue } from "../reducers/postPublished";
import { useEffect } from "react";

const UsePostArticle = () => {
  const dispatch = useDispatch();
  const imgFile = useSelector(
    (state: RootState) => state.postPublishedSliceReducer.imgFile
  );
  const inputValue = useSelector(
    (state: RootState) => state.postPublishedSliceReducer.inputValue
  );

  const onSubmit = () => {
    // 送發表文章的物件 , 因發文功能有兩個部分,所以邏輯寫在這層
    // 之後可以考慮寫到 reducer 裡面
    //! 先存圖片 取到圖片網址後 , 資料整包寫進 database
    // 取道寫入資料庫所需物件
    const documentRef = firebase
      ?.firestore()
      ?.collection("posts_article")
      ?.doc();
    const usersDocumentRef = firebase?.firestore()?.collection("users");

    let userData: firebase.firestore.DocumentData[] = [];
    usersDocumentRef
      .where("mail", "==", firebase?.auth()?.currentUser?.email)
      .get()
      .then((collectionSnapshot) => {
        userData = collectionSnapshot.docs.map((userItem) => {
          return userItem?.data();
        });
      });

    // storage 物件
    // 傳入資料夾名稱,檔名
    const fireRef = firebase?.storage()?.ref("posts-image/" + documentRef.id);
    // 上傳
    const metadata = {
      contentType: imgFile?.type,
    };

    fireRef.put(imgFile, metadata).then(() => {
      fireRef.getDownloadURL().then((imageUrl) => {
        //使用物件方法 set 寫進 firestore dataBase
        documentRef
          .set({
            imageUrl: imgFile ? imageUrl : "",
            text: inputValue,
            createdAt: firebase?.firestore?.Timestamp?.now(),
            author: {
              userName:
                firebase?.auth()?.currentUser?.displayName || userData[0].name,
              photoURL: firebase?.auth()?.currentUser?.photoURL || "",
              uid: firebase?.auth()?.currentUser?.uid || "",
              email: firebase?.auth()?.currentUser?.email || "",
              membershipNumber: userData[0].membershipNumber,
            },
          })
          .then(() => {
            dispatch(setInputValue(""));
            dispatch(setImgFile(""));
          });
      });
    });
  };
  return onSubmit;
};

export default UsePostArticle;
