import { useState } from 'react'
import { FaCircleCheck, FaTriangleExclamation, FaCircleExclamation } from "react-icons/fa6";

// Notification Popup

const notificationPopup = (notiType, message) => {
  const [notifyIcon, setNotifyIcon] = useState()
  const [notifyText, setNotifyText] = useState()

  const noti = document.getElementById('s_notifications')

  switch (notiType) {
    case "ok":
      setNotifyIcon(
        <div id="ntf_icon" className="ntf_icon">
          <FaCircleCheck style={{ color: 'green' }} />
        </div>
      )
      break
    case "err":
      setNotifyIcon(
        <div id="ntf_icon" className="ntf_icon" >
          <FaTriangleExclamation style={{ color: 'red' }} />
        </div>
      )
      break
    case "inf":
      setNotifyIcon(
        <div id="ntf_icon" className="ntf_icon">
          <FaCircleExclamation style={{ color: 'yellow' }} />
        </div>
      )
      break
    default:
  }

  setNotifyText(message)
  noti.style['transform'] = 'translate(-3%)';
  setTimeout(() => {
    noti.style['transform'] = 'translate(102%)';
  }, 3500);

return (
      <>  
          <section className="s_notifications" id="s_notifications">
            <div className="ntf_box" id="ntf_box">
              <div className="ntf_msg" id="ntf_msg">
                <div className="ntf_icon">{notifyIcon}</div>
                <div className="ntf_text">
                  {notifyText}
                </div>
              </div>
            </div>
          </section>
    </>
)
}

export default notificationPopup