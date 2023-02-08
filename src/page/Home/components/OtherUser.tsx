import { ReactComponent as Message } from "../../../img/otherUser/message.svg";
import { ReactComponent as Transfer } from "../../../img/otherUser/transfer.svg";
import { ReactComponent as View } from "../../../img/otherUser/view.svg";
import { ReactComponent as Like } from "../../../img/otherUser/like.svg";
const OtherUser = () => {
  return (
    <div className="other-user-content">
      <div className="client-data-img"></div>
      <div className="other-data-container">
        <div className="other-user-block">
          <div className="other-user-name">Gordon Wong</div>
          <div className="other-user-account">@GordonW39222837</div>·
          <div className="other-user-date">31m</div>
        </div>

        <div className="other-user-text">
          過陣子要搬家了 <br></br>
          重新適應新環境 <br></br>
          新工作 新朋友 我相信我可以越來越好
        </div>
        <div className="other-user-image">
          <img src={"https://picsum.photos/500/370?grayscale"} alt=""></img>
        </div>
        <div className="other-user-icon">
          <div className="other-user-icon-item">
            <Message />
            33
          </div>
          <div className="other-user-icon-item">
            <Transfer />2
          </div>
          <div className="other-user-icon-item">
            <View />
            152
          </div>
          <div className="other-user-icon-item">
            <Like />
            4,401
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUser;
