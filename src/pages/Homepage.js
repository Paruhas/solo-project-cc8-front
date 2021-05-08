import axios from "../configs/axios";
import React, { useEffect, useState } from "react";

import Header from "../components/headerBar/Header";
import HomepageItem from "../components/homepage/HomepageItem";
import HomepageItemDummy from "../components/homepage/HomepageItemDummy";
import HomepageItemDummyRespon from "../components/homepage/HomepageItemDummyRespon";

import { getToken } from "../services/localStorageService";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";

function Homepage() {
  const [availableItem, setAvailableItem] = useState();

  const history = useHistory();

  useEffect(async () => {
    await roleIsAdmin();
    await fetchAvailableItem();
  }, []);

  async function roleIsAdmin() {
    try {
      const decodedUserData = await jwt_decode(getToken());
      console.log(decodedUserData.roleAdmin);
      if (decodedUserData.roleAdmin === "ADMIN") {
        history.push("/admin");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchAvailableItem() {
    try {
      const resAvailableItem = await axios.get("/card-products/in-use");
      // console.log(resAvailableItem.data.availableCardProducts)
      // console.log(resAvailableItem.data.availableCardProducts[0].CardCodes)
      setAvailableItem(resAvailableItem.data.availableCardProducts);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="root">
      <Header />

      <div className="content-outside">
        <div className="content-left"></div>

        <div className="content-center">
          {availableItem?.map((item, index) => {
            return (
              <HomepageItem
                key={item.id}
                img={item.img}
                price={item.price}
                CardCodes={item.CardCodes}
              />
            );
          })}

          {/* สร้าง Dummy ดันกล่อง Item ให้อยู่ตรงกลาง */}
          {availableItem?.length === 3 && (
            <>
              <HomepageItemDummyRespon />
            </>
          )}
          {availableItem?.length < 4 && availableItem?.length !== 3 && <></>}
          {availableItem?.length > 4 && availableItem?.length % 4 === 1 && (
            <>
              <HomepageItemDummy />
              <HomepageItemDummy />
              <HomepageItemDummy />
            </>
          )}
          {availableItem?.length > 4 && availableItem?.length % 4 === 2 && (
            <>
              <HomepageItemDummy />
              <HomepageItemDummy />
            </>
          )}
          {availableItem?.length > 4 && availableItem?.length % 4 === 3 && (
            <>
              <HomepageItemDummy />
            </>
          )}
        </div>

        <div className="content-right"></div>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default Homepage;
