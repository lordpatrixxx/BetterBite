import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { X, Camera, Zap, Check, Search, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function BarcodeScanner({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      stopScanner();
      return;
    }
    startScanner();
  }, [isOpen]);

  const startScanner = async () => {
    setError(null);
    setScannedCode(null);
    
    // Cleanup any existing scanner before starting a new one
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
        console.error("Error stopping scanner during restart:", e);
      }
    }

    try {
      // Clear scanner reference if it exists but is not scanning according to state
      if (scannerRef.current) {
        try {
          await scannerRef.current.clear();
        } catch (e) {
          // ignore
        }
      }

      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;
      
      const config = { 
        fps: 15, 
        qrbox: { width: 250, height: 180 },
        verbose: false,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.CODE_128,
        ]
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure
      );
      
      setHasPermission(true);
      setIsScanning(true);
      setError(null);
    } catch (err: any) {
      console.error("Scanner Error:", err);
      // More robust check for NotAllowedError
      const errorMessage = err?.message || String(err);
      const isPermissionDenied = errorMessage.includes("Permission denied") || 
                                 errorMessage.includes("NotAllowedError") ||
                                 errorMessage.includes("PermissionDeniedError");
      
      setHasPermission(false);
      
      if (isPermissionDenied) {
        setError("Camera permission denied. To use the scanner, you must allow camera access in your browser settings for this site.");
      } else if (errorMessage.includes("NotFound") || errorMessage.includes("Requested device not found")) {
        setError("No camera detected. Please ensure your device has a working camera or scan manually.");
      } else {
        setError(`Scanner Error: ${errorMessage}`);
      }
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Stop Error:", err);
      }
    }
    setIsScanning(false);
  };

  const onScanSuccess = (decodedText: string) => {
    setScannedCode(decodedText);
    stopScanner();
    // Brief success animation before redirect
    setTimeout(() => {
      onClose();
      navigate(`/product/${decodedText}`);
    }, 1000);
  };

  const onScanFailure = (error: any) => {
    // Mostly harmless, just can't find a barcode in the frame
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode) {
      onClose();
      navigate(`/product/${manualCode}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-bg w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="p-6 border-b border-border flex justify-between items-center bg-surface">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              scannedCode ? "bg-score-good text-white" : "bg-primary/10 text-primary"
            )}>
              {scannedCode ? <Check className="w-6 h-6" /> : <Camera className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-display font-bold text-lg leading-tight">
                {scannedCode ? "Barcode Detected!" : "Scan Barcode"}
              </h2>
              <p className="text-xs text-text-muted">Hold camera steady over the barcode</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-2 rounded-full transition-colors">
            <X className="w-6 h-6 text-text-muted" />
          </button>
        </div>

        <div className="relative aspect-[4/3] bg-black flex items-center justify-center h-full">
          {!scannedCode && (
             <>
              <div id="reader" className="w-full h-full" />
              {/* Custom Overlay Frame */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                 <div className="w-[250px] h-[180px] border-4 border-primary rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 right-0 h-1 bg-primary/40 shadow-[0_0_15px_var(--color-primary)]"
                    />
                 </div>
              </div>
            </>
          )}

          {scannedCode && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-score-good flex flex-col items-center justify-center text-white p-8 text-center"
            >
               <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-12 h-12" />
               </div>
               <h3 className="text-2xl font-display font-black mb-1">{scannedCode}</h3>
               <p className="opacity-80">Finding product details...</p>
            </motion.div>
          )}

          {error && !scannedCode && (
            <div className="absolute inset-0 bg-surface p-8 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-4">
                <X className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-danger mb-2">Scanner Error</h3>
              <p className="text-sm text-text-muted mb-6 max-w-xs">{error}</p>
              <div className="flex flex-col gap-3 w-full max-w-sm">
                <button 
                  onClick={startScanner}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-bold btn-hover"
                >
                  Retry Camera
                </button>
                <button 
                  onClick={handleReload}
                  className="bg-surface-2 text-text px-6 py-3 rounded-xl font-bold border border-border"
                >
                  Reload App
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-surface border-t border-border">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-warning mt-0.5" />
              <p className="text-[10px] text-text-muted font-medium">Works on most 1D and 2D barcodes</p>
            </div>
             <div className="flex items-start gap-2">
              <Sun className="w-4 h-4 text-warning mt-0.5" />
              <p className="text-[10px] text-text-muted font-medium">Ensure good lighting for best results</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-border" />
              <span className="px-3 text-xs text-text-faint font-medium">OR ENTER MANUALLY</span>
              <div className="flex-1 border-t border-border" />
            </div>

            <form onSubmit={handleManualSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter barcode manually"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="bg-primary text-white p-2 px-4 rounded-xl btn-hover flex items-center gap-2 font-bold text-sm"
              >
                <Search className="w-4 h-4" /> Go
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
