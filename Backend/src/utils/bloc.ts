// blochq.io -- this is an api service that allows you to buy data and airtime form your app.

import axios from "axios";
import { TELCOS } from "./utils";

export async function buyAirtimeFromBloc(
  amount: number,
  phoneNumber: string,
  network: string
) {
  try {
    const baseUrl = "https://api.blochq.io/v1/bills";
    const authorization = `Bearer ${process.env.BLOCHQ_TOKEN}`;
    const url = `${baseUrl}/payment?bill=telco`;
    const headers = {
      accept: "application/json",
      authorization,
      "content-type": "application/json",
    };

    const operator_id = TELCOS.find(
      (telco) => telco.name.toLowerCase() === network.toLowerCase()
    )?.id;
    if (!operator_id) return { success: false, message: "Invalid network" };

    const products = await axios.get(
      `${baseUrl}/operators/${operator_id}/products?bill=telco`,
      { headers }
    );
    const product_id = products.data.data[0].id;

    const data = {
      device_details: {
        beneficiary_msisdn: phoneNumber,
      },
      amount: amount,
      product_id: product_id,
      operator_id: operator_id,
    };

    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export interface NetworkItem {
  desc: string;
  id: string;
  name: string;
  sector: string;
}

export interface Network {
  name: string;
  id: string;
}

interface DataMeta {
  data_expiry: string;
  currency: string;
  data_value: string;
  fee: string;
}

export interface PlanReturn {
  id: string;
  meta: DataMeta;
}

export interface DataPlan {
  category: string;
  desc?: string | null;
  fee_type: string;
  id: string;
  meta: DataMeta;
  name: string;
  operator: string;
}

export async function fetchDataPlan(network: string, productId: string) {
  try {
    const baseUrl = "https://api.blochq.io/v1/bills";
    const authorization = `Bearer ${process.env.BLOCHQ_TOKEN}`;
    const headers = {
      accept: "application/json",
      authorization,
      "content-type": "application/json",
    };

    const operator_id = TELCOS.find(
      (telco) => telco.name.toLowerCase() === network.toLowerCase()
    )?.id;
    if (!operator_id) return "";

    const products = await axios.get(
      `${baseUrl}/operators/${operator_id}/products?bill=telco`,
      { headers }
    );
    console.log("products: ", products);
    const dataPlan = products.data.data
      .filter((product: DataPlan) => product.fee_type !== "RANGE")
      .find((product: DataPlan) => product.id === productId);

    console.log(dataPlan);
    return dataPlan;
  } catch (error: any) {
    console.log(error);
    return {
      error: "could not get product",
    };
  }
}

export async function buyDataFromBloc(
  productId: string,
  phoneNumber: string,
  network: string
) {
  try {
    const baseUrl = "https://api.blochq.io/v1/bills";
    const authorization = `Bearer ${process.env.BLOCHQ_TOKEN}`;
    const url = `${baseUrl}/payment?bill=telco`;
    const headers = {
      accept: "application/json",
      authorization,
      "content-type": "application/json",
    };

    const operator_id = TELCOS.find(
      (telco) => telco.name.toLowerCase() === network.toLowerCase()
    )?.id;
    if (!operator_id) return { success: false, message: "Invalid network" };

    const data = {
      device_details: {
        beneficiary_msisdn: phoneNumber,
      },
      product_id: productId,
      operator_id: operator_id,
    };

    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}
