import React from 'react'

import Header from "../components/headerBar/Header"
import EditProfile from '../components/profilePage/EditProfile'
import EditPassword from '../components/profilePage/EditPassword'
import OrderHistoryBox from '../components/orderHistory/OrderHistoryBox'

function ProfilePage() {
  return (
    <div className="root">
      <Header />

        <div className="content-outside">

          <div className="content-left"></div>

          <div className="content-center-profile">

            <div className="content-center-profile-editBox">

              <EditProfile />
              <EditPassword />

            </div>

            <div className="content-center-profile-historyBox">
              <div className="content-center-profile-historyBox-inside">
                <h2>ประวัติการทำรายการ</h2>
                <hr className="loginPage-form-div-hr"/>

                <OrderHistoryBox />

              </div>
            </div>

          </div>

          <div className="content-right"></div>

        </div>

      <div className="footer"></div>
    </div>
  )
}

export default ProfilePage
