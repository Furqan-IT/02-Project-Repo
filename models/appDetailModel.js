import mongoose from "mongoose";

const AppDetailSchema = new mongoose.Schema(
  {
    onlineupi: { type: String, default: "" },
    upiqr: { type: String, default: "" },
    app_url: { type: String, default: "" },
    app_version: { type: String, default: "" },
    is_indpay_gateway: { type: Boolean, default: false },
    is_upi_gateway: { type: Boolean, default: false },
    is_pay_offline: { type: Boolean, default: false },
    is_ref: { type: Boolean, default: false },
    is_ref_per: { type: Boolean, default: false },
    max_jodi: { type: String, default: "" },
    max_harup: { type: String, default: "" },
    min_bid: { type: String, default: "" },
    min_harup_bid: { type: String, default: "" },
    mindeposit: { type: String, default: "" },
    minwithdraw: { type: String, default: "" },
    ref_bounus: { type: String, default: "" },
    ref_bounus_per: { type: String, default: "" },
    stipulated_am: { type: String, default: "" },
    terms: { type: String, default: "" },
    upi_gateway_key: { type: String, default: "" },
    indpay_api_token: { type: String, default: "" },
    indpay_api_pw_token: { type: String, default: "" },
    indpay_marchant_id: { type: String, default: "" },
    indpay_wallet_id: { type: String, default: "" },
    video_link: { type: String, default: "" },
    whatsappno: { type: String, default: "" },
    is_online_withdraw: { type: Boolean, default: false },
    is_offline_withdraw: { type: Boolean, default: false },
    isphonelogin: { type: Boolean, default: false },
    isgooglelogin: { type: Boolean, default: false },
    isresultbtnlink: { type: Boolean, default: false },
    resultbtnlink: { type: String, default: "" },
    privacy_url: { type: String, default: "" },
    aboutus_url: { type: String, default: "" },
    joining_bonus: { type: String, default: "" },
    commission_5k: { type: String, default: "" },
    commission: { type: String, default: "" },
  },
  { timestamps: true }
);

const App = mongoose.model("App", AppDetailSchema);

export default App;
