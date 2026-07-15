"use client"; // Required for state and hooks in Next.js

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Changed from react-router-dom
import { ArrowLeft, QrCode, Download, Loader2, Wifi, Type, AlertCircle } from "lucide-react";
import InfoSection from "./InfoSection";
import RelatedTools from "./RelatedTools";
import RelatedBlogs from "./RelatedBlogs";
import { TOOLS_CONFIG } from "@/utils/constants";
 
const QrGenerator = ({ toolId }) => {
  const tool = TOOLS_CONFIG.find((t) => t.id === toolId);
  const router = useRouter(); // Next.js router instance

  // Modes and States
  const [mode, setMode] = useState("text"); // 'text' or 'wifi'
  const [text, setText] = useState("");

  // Wi-Fi Specific States
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA"); // WPA, WEP, or nopass
  const [wifiHidden, setWifiHidden] = useState(false);

  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrLibReady, setQrLibReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Output options — 256px was blurry when printed on posters/menus
  const [qrSize, setQrSize] = useState(512);
  const [qrLevel, setQrLevel] = useState("H"); // M | Q | H (error correction)

  useEffect(() => {
    if (window.QRCode) {
      setQrLibReady(true);
      return;
    }
    const existing = document.querySelector("script[data-qrcode]");
    const script = existing || document.createElement("script");
    const onLoad = () => setQrLibReady(true);
    const onError = () =>
      setErrorMsg(
        "QR engine could not load. Check your internet connection (or disable an ad-blocker) and refresh the page.",
      );
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    if (!existing) {
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
      script.async = true;
      script.setAttribute("data-qrcode", "true");
      document.body.appendChild(script);
    }
    return () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
  }, []);

  const generateQR = () => {
    setErrorMsg(null);

    if (!window.QRCode || !qrLibReady) {
      setErrorMsg(
        "QR engine is still loading — please wait a moment and try again.",
      );
      return;
    }

    let finalString = "";
    if (mode === "text") {
      if (!text) return;
      finalString = text;
    } else if (mode === "wifi") {
      if (!wifiSsid) return;
      // WIFI URI spec: backslash-escape  \  ;  ,  :  "
      const esc = (s) => String(s).replace(/([\\;,:"])/g, "\\$1");
      finalString = `WIFI:S:${esc(wifiSsid)};T:${wifiEncryption};P:${esc(
        wifiPassword,
      )};H:${wifiHidden};;`;
    }

    const container = document.getElementById("qr-code-container");
    if (!container) {
      setErrorMsg("Something went wrong rendering the QR. Please refresh.");
      return;
    }

    setLoading(true);
    container.innerHTML = "";

    try {
      new window.QRCode(container, {
        text: finalString,
        width: qrSize,
        height: qrSize,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel:
          window.QRCode.CorrectLevel[qrLevel] || window.QRCode.CorrectLevel.H,
      });

      setTimeout(() => {
        const canvas = container.querySelector("canvas");
        const img = container.querySelector("img");
        if (canvas) setQrUrl(canvas.toDataURL("image/png"));
        else if (img) setQrUrl(img.src);
        else setErrorMsg("Could not generate the QR image. Please try again.");
        setLoading(false);
      }, 120);
    } catch (e) {
      console.error(e);
      setErrorMsg("Could not generate the QR code. Try a shorter/simpler input.");
      setLoading(false);
    }
  };

  const isGenerateDisabled =
    !qrLibReady || loading || (mode === "text" ? !text : !wifiSsid);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 animate-rise">
      <div className="mb-6">
        <button
          onClick={() =>
            document.referrer.startsWith(window.location.origin)
              ? router.back()
              : router.push("/")
          } // Changed from navigate(-1)
          className="text-slate-500 hover:text-[#FF9933] flex items-center gap-1 text-sm font-medium mb-3 transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Tools
        </button>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <tool.icon size={28} className="text-purple-500" /> {/* Ensure icon renders properly */}
          {tool.title}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-125">
        <div className="p-4 sm:p-6 md:p-8 border-r border-slate-200 bg-slate-50">
          {/* Mode Selector Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-slate-200 rounded-lg">
            <button
              onClick={() => setMode("text")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition active:scale-95 touch-manipulation ${
                mode === "text"
                  ? "bg-white text-[#FF9933] shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <Type size={16} /> Text / URL
            </button>
            <button
              onClick={() => setMode("wifi")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition active:scale-95 touch-manipulation ${
                mode === "wifi"
                  ? "bg-white text-[#FF9933] shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <Wifi size={16} /> Wi-Fi
            </button>
          </div>

          {mode === "text" ? (
            <div className="animate-fade-in">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Enter Text or URL
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com or Hello World"
                className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none resize-none mb-4"
              ></textarea>
            </div>
          ) : (
            <div className="animate-fade-in space-y-4 mb-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Network Name (SSID) *
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="e.g., Home_Network_5G"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Network Password"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Security Type
                  </label>
                  <select
                    value={wifiEncryption}
                    onChange={(e) => setWifiEncryption(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none bg-white"
                  >
                    <option value="WPA">WPA/WPA2/WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open)</option>
                  </select>
                </div>

                <div className="flex items-center mt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={(e) => setWifiHidden(e.target.checked)}
                      className="w-4 h-4 text-[#FF9933] rounded focus:ring-[#FF9933]"
                    />
                    Hidden Network
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Output options */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Size
              </label>
              <div className="flex gap-1.5">
                {[
                  { v: 256, label: "S" },
                  { v: 512, label: "M" },
                  { v: 1024, label: "L" },
                ].map((s) => (
                  <button
                    key={s.v}
                    onClick={() => setQrSize(s.v)}
                    title={`${s.v}×${s.v}px`}
                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition active:scale-95 touch-manipulation cursor-pointer ${
                      qrSize === s.v
                        ? "bg-[#FF9933] text-white shadow"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-[#FF9933]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                L (1024px) prints sharpest on posters &amp; menus
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Error correction
              </label>
              <div className="flex gap-1.5">
                {[
                  { v: "M", label: "M" },
                  { v: "Q", label: "Q" },
                  { v: "H", label: "H" },
                ].map((l) => (
                  <button
                    key={l.v}
                    onClick={() => setQrLevel(l.v)}
                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition active:scale-95 touch-manipulation cursor-pointer ${
                      qrLevel === l.v
                        ? "bg-[#FF9933] text-white shadow"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-[#FF9933]"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                H survives scratches/dirt best (default)
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-100">
              <AlertCircle size={16} className="shrink-0" /> {errorMsg}
            </div>
          )}

          <button
            onClick={generateQR}
            disabled={isGenerateDisabled}
            className={`w-full text-white font-bold py-3 rounded-lg shadow-md transition active:scale-[0.98] touch-manipulation flex items-center justify-center gap-2 cursor-pointer ${
              isGenerateDisabled
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-[#FF9933] hover:bg-[#e68a2e]"
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <QrCode size={20} /> Generate QR Code
              </>
            )}
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center bg-white">
          <div id="qr-code-container" className="hidden"></div>

          {qrUrl ? (
            <div className="text-center animate-fade-in">
              <div className="bg-white p-4 border-2 border-slate-100 rounded-xl shadow-lg mb-6 inline-block">
                <img src={qrUrl} alt="QR Code" className="w-64 h-64" />
              </div>
              <a
                href={qrUrl}
                download={
                  mode === "wifi" ? `${wifiSsid}-wifi-qr.png` : "qrcode.png"
                }
                className="bg-slate-800 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-slate-900 transition flex items-center justify-center gap-2 mx-auto w-fit cursor-pointer"
              >
                <Download size={18} /> Download PNG
              </a>
            </div>
          ) : (
            <div className="text-slate-400 text-center">
              <QrCode size={64} className="mx-auto mb-4 opacity-20" />
              <p>QR Code will appear here</p>
            </div>
          )}
        </div>
      </div>

      <InfoSection info={tool.info} />
      <RelatedTools currentToolId={tool.id} toolType={tool.type} />
      <RelatedBlogs toolId={tool.id} />
    </div>
  );
};

export default QrGenerator;