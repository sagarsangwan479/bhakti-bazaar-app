import { get } from "../config/apiCall";
import { Endpoints } from "../config/endpoints";

export const getUserDetail = async () => {
  try {
    const res = await get(Endpoints.GET_USER);
    if (res.data.status === "success") {
      console.log('res >>>>', res.data.data);
      return res.data.data;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

