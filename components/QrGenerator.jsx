"use client"; // Required for state and hooks in Next.js

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Changed from react-router-dom
import { ArrowLeft, QrCode, Download, Loader2, Wifi, Type } from "lucide-react";
import InfoSection from "./InfoSection";
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

  useEffect(() => {
    if (!window.QRCode) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const generateQR = () => {
    let finalString = "";

    if (mode === "text") {
      if (!text) return;
      finalString = text;
    } else if (mode === "wifi") {
      if (!wifiSsid) return;
      finalString = `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};H:${wifiHidden};;`;
    }

    setLoading(true);
    setTimeout(() => {
      const container = document.getElementById("qr-code-container");
      container.innerHTML = "";

      try {
        new window.QRCode(container, {
          text: finalString,
          width: 256,
          height: 256,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: window.QRCode.CorrectLevel.H,
        });

        setTimeout(() => {
          const canvas = container.querySelector("canvas");
          if (canvas) {
            setQrUrl(canvas.toDataURL("image/png"));
          }
          setLoading(false);
        }, 100);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }, 500);
  };

  const isGenerateDisabled =
    mode === "text" ? !text || loading : !wifiSsid || loading;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 animate-fade-in-up">
      <div className="mb-6">
        <button
          onClick={() => router.back()} // Changed from navigate(-1)
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
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition ${
                mode === "text"
                  ? "bg-white text-[#FF9933] shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <Type size={16} /> Text / URL
            </button>
            <button
              onClick={() => setMode("wifi")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition ${
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

          <button
            onClick={generateQR}
            disabled={isGenerateDisabled}
            className={`w-full text-white font-bold py-3 rounded-lg shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
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
    </div>
  );
};

export default QrGenerator;